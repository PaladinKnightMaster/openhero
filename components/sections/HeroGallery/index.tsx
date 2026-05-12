"use client";

import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import type { HeroVideo } from "@/lib/videos";
import CategoryFilter from "./CategoryFilter";
import EmptyState from "./EmptyState";
import VideoCard from "./VideoCard";
import VideoCardSkeleton from "./VideoCardSkeleton";

// ─── Responsive page sizes ────────────────────────────────────
// These match the Tailwind grid breakpoints used below.
const PAGE_SIZES = {
  sm: 6,   // <640px  — 1 col  → 6 rows
  md: 8,   // <1024px — 2 cols → 4 rows
  lg: 12,  // ≥1024px — 3-4 cols → 3-4 rows
} as const;

function usePageSize(): number {
  // SSR-safe default: largest size so we never under-render on server
  const [size, setSize] = useState<number>(PAGE_SIZES.lg);

  useEffect(() => {
    const update = () => {
      if (window.innerWidth < 640)  setSize(PAGE_SIZES.sm);
      else if (window.innerWidth < 1024) setSize(PAGE_SIZES.md);
      else setSize(PAGE_SIZES.lg);
    };
    update();
    // Passive listener — won't block scroll/paint
    window.addEventListener("resize", update, { passive: true });
    return () => window.removeEventListener("resize", update);
  }, []);

  return size;
}

// ─── Types ────────────────────────────────────────────────────
interface HeroGalleryProps {
  videos: HeroVideo[];
  categories: string[];
}

// ─── Component ───────────────────────────────────────────────
export default function HeroGallery({ videos, categories }: HeroGalleryProps) {
  const pageSize = usePageSize();

  const [activeCategory, setActiveCategory] = useState("all");
  const [displayCount, setDisplayCount]     = useState<number>(PAGE_SIZES.lg);
  const [isTransitioning, setIsTransitioning] = useState(false); // category change
  const [isLoadingMore, setIsLoadingMore]     = useState(false); // scroll load

  const sentinelRef   = useRef<HTMLDivElement>(null);
  const observerRef   = useRef<IntersectionObserver | null>(null);
  const loadingRef    = useRef(false); // avoid double-trigger without re-render

  // ── Derived — memoised to prevent recompute on unrelated renders ──
  const filtered = useMemo(
    () =>
      activeCategory === "all"
        ? videos
        : videos.filter((v) => v.category === activeCategory),
    [videos, activeCategory],
  );

  const displayed = useMemo(
    () => filtered.slice(0, displayCount),
    [filtered, displayCount],
  );

  const hasMore = displayCount < filtered.length;

  // How many skeletons to show at the bottom when loading next batch
  const nextBatchSize = Math.min(pageSize, filtered.length - displayCount);

  // ── Category change ───────────────────────────────────────────
  // Shows a skeleton grid for 250ms before committing the new category,
  // giving a polished transition feel.
  const handleCategoryChange = useCallback(
    (cat: string) => {
      if (cat === activeCategory) return;
      setIsTransitioning(true);
      // Brief skeleton phase, then swap content
      setTimeout(() => {
        setActiveCategory(cat);
        setDisplayCount(pageSize);
        setIsTransitioning(false);
      }, 250);
    },
    [activeCategory, pageSize],
  );

  // ── Infinite scroll ───────────────────────────────────────────
  // Re-create the observer whenever relevant state changes.
  useEffect(() => {
    // Clean up previous observer
    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
    }

    if (!hasMore || isTransitioning) return;

    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || loadingRef.current) return;
        loadingRef.current = true;

        // 1. Show skeleton cards at the bottom immediately
        setIsLoadingMore(true);

        // 2. After ~350ms (1–2 paint frames + perceptible pause),
        //    commit the real cards and hide skeletons.
        setTimeout(() => {
          setDisplayCount((c) => Math.min(c + pageSize, filtered.length));
          setIsLoadingMore(false);
          loadingRef.current = false;
        }, 350);
      },
      {
        // Pre-load one viewport-height before user reaches the bottom
        rootMargin: "0px 0px 80% 0px",
      },
    );

    observerRef.current.observe(sentinel);

    return () => {
      observerRef.current?.disconnect();
      observerRef.current = null;
    };
  }, [hasMore, isTransitioning, pageSize, filtered.length]);

  // ── Render helpers ────────────────────────────────────────────
  const skeletonGrid = (count: number) =>
    Array.from({ length: count }, (_, i) => (
      <VideoCardSkeleton key={`sk-${i}`} />
    ));

  // ── Render ────────────────────────────────────────────────────
  return (
    <section
      id="gallery"
      className="min-h-screen px-6 pb-24 pt-6 font-sans text-white animate-fade-in"
    >
      {/* Category filter bar */}
      <div className="mb-6 flex items-center justify-between gap-4">
        <CategoryFilter
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
        />
      </div>

      {/* Grid — shows skeletons during category transition */}
      {isTransitioning ? (
        <div className="grid gap-x-4 gap-y-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {skeletonGrid(pageSize)}
        </div>
      ) : filtered.length === 0 ? (
        <EmptyState category={activeCategory} />
      ) : (
        <>
          <div className="grid gap-x-4 gap-y-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {/* Real cards */}
            {displayed.map((video) => (
              <VideoCard key={`${video.category}-${video.slug}`} video={video} />
            ))}

            {/* Skeleton cards appended at the bottom while loading next batch */}
            {isLoadingMore && skeletonGrid(nextBatchSize)}
          </div>

          {/* Invisible sentinel — IntersectionObserver target */}
          {hasMore && (
            <div
              ref={sentinelRef}
              className="h-px w-full"
              aria-hidden="true"
            />
          )}

          {/* Remaining count hint (only once all skeletons are hidden) */}
          {!hasMore && filtered.length > PAGE_SIZES.sm && (
            <p className="mt-10 text-center text-xs text-neutral-600">
              {filtered.length} video{filtered.length !== 1 ? "s" : ""}
            </p>
          )}
        </>
      )}
    </section>
  );
}

