"use client";

import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { Icon } from "@iconify/react";
import { AssetCard } from "./AssetCard";
import { AssetModal } from "./AssetModal";
import { capitalize } from "@/lib/utils";
import { Asset, ASSET_CATEGORIES } from "@/lib/assets";

const PAGE_SIZE = 30;

const CATEGORY_ICONS: Record<string, string> = {
  all: "solar:apps-linear",
  desktop: "solar:monitor-linear",
  gradient: "solar:pallete-2-linear",
  minimal: "solar:minimalistic-magnifer-linear",
  pattern: "solar:texture-linear",
};

interface BentoGridProps {
  assets: Asset[];
  loading: boolean;
  onSelect: (asset: Asset) => void;
  priorityCount: number;
}

function BentoGrid({ assets, loading, onSelect, priorityCount }: BentoGridProps) {
  if (loading) {
    return (
      <div className="bento-mosaic-grid">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="h-full w-full animate-pulse rounded-2xl bg-neutral-900 border border-white/5"
          />
        ))}
      </div>
    );
  }

  if (!assets.length) {
    return (
      <div className="flex flex-col items-center gap-3 py-24 text-white/30">
        <Icon icon="solar:gallery-linear" width="32" className="opacity-50" />
        <span className="text-sm">No backgrounds in this category</span>
      </div>
    );
  }

  return (
    <div className="bento-mosaic-grid">
      {assets.map((asset, index) => (
        <div key={asset.id} className="bento-item">
          <AssetCard
            asset={asset}
            priority={index < priorityCount}
            onClick={() => onSelect(asset)}
          />
        </div>
      ))}
    </div>
  );
}

interface AssetsGalleryProps {
  assets: Asset[];
}

export default function AssetsGallery({ assets }: AssetsGalleryProps) {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [page, setPage] = useState(1);
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);

  const sentinelRef = useRef<HTMLDivElement>(null);
  const loadingRef = useRef(false);

  const filteredAssets = useMemo(
    () => (activeCategory === "all" ? assets : assets.filter((a) => a.category === activeCategory)),
    [assets, activeCategory]
  );

  const visibleAssets = useMemo(
    () => filteredAssets.slice(0, page * PAGE_SIZE),
    [filteredAssets, page]
  );

  const hasMore = visibleAssets.length < filteredAssets.length;

  function handleCategoryChange(cat: string) {
    setActiveCategory(cat);
    setPage(1);
  }

  // Infinite Scroll logic
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel || !hasMore) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !loadingRef.current) {
          loadingRef.current = true;
          setPage((p) => p + 1);
          setTimeout(() => {
            loadingRef.current = false;
          }, 400);
        }
      },
      { rootMargin: "600px" }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasMore, filteredAssets.length]);

  const categoryCounts = useMemo(() => {
    const m: Record<string, number> = { all: assets.length };
    for (const cat of ASSET_CATEGORIES) {
      m[cat] = assets.filter((a) => a.category === cat).length;
    }
    return m;
  }, [assets]);

  const handleNavigate = useCallback((asset: Asset) => setSelectedAsset(asset), []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .bento-mosaic-grid {
          display: grid;
          gap: 12px; /* Gaps pequeños para un estilo minimalista */
          /* Móvil: 2 columnas, altura pequeña */
          grid-template-columns: repeat(2, 1fr);
          grid-auto-rows: 140px; 
        }

        /* Variación para móvil para que no sea tan aburrido */
        @media (max-width: 639px) {
          .bento-mosaic-grid > div:nth-child(5n + 1) {
            grid-column: span 2;
            grid-row: span 2;
          }
        }

        /* Desktop: Basado exactamente en tus anchos (25%, 30%, 15%, 25%) */
        @media (min-width: 640px) {
          .bento-mosaic-grid {
            grid-template-columns: 25fr 30fr 15fr 25fr;
            grid-auto-rows: 180px; /* Altura minimalista, ajusta según prefieras */
            gap: 16px;
          }
          /* El patrón se repite cada 6 elementos, logrando el loop infinito */
          .bento-mosaic-grid > div:nth-child(6n + 2) {
            grid-column: 2 / 3;
            grid-row: span 2;
          }
          .bento-mosaic-grid > div:nth-child(6n + 3) {
            grid-column: span 2;
          }
        }
      `}} />

      <div className="sticky top-16 z-30 border-b border-white/8 bg-black/85 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <nav className="flex items-center gap-1.5 overflow-x-auto py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" aria-label="Filter by category">
            {(["all", ...ASSET_CATEGORIES] as string[]).map((cat) => {
              const active = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full px-4 py-1.5 text-[13px] font-medium transition-all duration-150 ${
                    active ? "bg-white text-black" : "text-neutral-400 hover:bg-neutral-800 hover:text-white"
                  }`}
                >
                  <Icon icon={CATEGORY_ICONS[cat] ?? "solar:image-linear"} width="13" />
                  {capitalize(cat)}
                  <span className={`text-[10px] tabular-nums ${active ? "text-black/40" : "text-neutral-600"}`}>
                    {categoryCounts[cat]}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 pb-24 pt-6 sm:px-6">
        <div className="mb-5 flex items-center justify-between">
          <p className="text-sm text-white/40">
            <span className="font-medium text-white/70">{filteredAssets.length}</span> backgrounds
          </p>
          <p className="tabular-nums text-xs text-white/25">
            {Math.min(visibleAssets.length, filteredAssets.length)} / {filteredAssets.length}
          </p>
        </div>

        <BentoGrid
          assets={visibleAssets}
          loading={false}
          onSelect={setSelectedAsset}
          priorityCount={12}
        />

        {hasMore && (
          <div ref={sentinelRef} className="mt-10 flex justify-center py-6">
            <div className="flex items-center gap-2.5 text-xs text-white/30">
              <div className="h-4 w-4 animate-spin rounded-full border border-white/20 border-t-white/60" />
              Loading more...
            </div>
          </div>
        )}

        {!hasMore && visibleAssets.length > 0 && (
          <div className="mt-14 flex flex-col items-center gap-2">
            <Icon icon="solar:check-circle-linear" width="20" className="text-white/15" />
            <p className="text-xs text-white/20">All {filteredAssets.length} backgrounds loaded</p>
          </div>
        )}
      </div>

      {selectedAsset && (
        <AssetModal
          asset={selectedAsset}
          assets={filteredAssets}
          onClose={() => setSelectedAsset(null)}
          onNavigate={handleNavigate}
        />
      )}
    </>
  );
}