"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import type { HeroVideo } from "@/lib/videos";
import { VideoModal } from "./VideoModal";

function getSessionId(): string {
  if (typeof window === "undefined") return "";
  let id = localStorage.getItem("openhero_session_id");
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem("openhero_session_id", id);
  }
  return id;
}

export default function VideoCard({ video }: { video: HeroVideo }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showModal, setShowModal] = useState(false);
  const [views, setViews] = useState<number | null>(null);
  const [likes, setLikes] = useState<number | null>(null);
  const [liked, setLiked] = useState(false);
  const [likeLoading, setLikeLoading] = useState(false);
  const viewedRef = useRef(false);

  useEffect(() => {
    const sessionId = getSessionId();
    if (!sessionId) return;

    fetch(
      `/api/videos/like?slug=${encodeURIComponent(video.slug)}&sessionId=${encodeURIComponent(sessionId)}`,
    )
      .then((r) => r.json())
      .then((data) => {
        if (data.views !== undefined) setViews(data.views);
        if (data.likes !== undefined) setLikes(data.likes);
        if (data.liked !== undefined) setLiked(data.liked);
      })
      .catch(() => {});
  }, [video.slug]);

  function handleMouseEnter() {
    videoRef.current?.play().catch(() => {});
  }

  function handleCardClick() {
    setShowModal(true);
    if (!viewedRef.current) {
      viewedRef.current = true;
      setViews((v) => (v !== null ? v + 1 : 1));
      fetch("/api/videos/view", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug: video.slug, category: video.category, name: video.name }),
      }).catch(() => {});
    }
  }

  async function handleLike(e: React.MouseEvent) {
    e.stopPropagation();
    if (likeLoading) return;
    const sessionId = getSessionId();
    if (!sessionId) return;

    const wasLiked = liked;
    setLiked(!wasLiked);
    setLikes((l) => (l !== null ? l + (wasLiked ? -1 : 1) : wasLiked ? 0 : 1));
    setLikeLoading(true);

    try {
      const res = await fetch("/api/videos/like", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug: video.slug,
          category: video.category,
          name: video.name,
          sessionId,
        }),
      });
      const data = await res.json();
      if (data.liked !== undefined) {
        setLiked(data.liked);
        const stats = await fetch(
          `/api/videos/like?slug=${encodeURIComponent(video.slug)}&sessionId=${encodeURIComponent(sessionId)}`,
        ).then((r) => r.json());
        if (stats.likes !== undefined) setLikes(stats.likes);
      }
    } catch {
      setLiked(wasLiked);
      setLikes((l) => (l !== null ? l + (wasLiked ? 1 : -1) : null));
    } finally {
      setLikeLoading(false);
    }
  }

  return (
    <>
      <article className="group flex flex-col gap-2.5">
        <div
          className="relative aspect-video cursor-pointer overflow-hidden bg-neutral-900 border border-neutral-900 squircle"
          onMouseEnter={handleMouseEnter}
          onClick={handleCardClick}
        >
          <video
            ref={videoRef}
            src={video.videoSrc}
            muted
            loop
            playsInline
            autoPlay
            preload="metadata"
            className="h-full w-full squircle object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
          <div className="absolute right-2 top-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            <button
              onClick={handleCardClick}
              className="rounded p-1 text-neutral-500 transition-colors hover:bg-white/10 hover:text-white"
              aria-label="Preview fullscreen"
            >
              <Icon icon="solar:maximize-square-linear" width="16" />
            </button>
          </div>
        </div>

        <div className="p-3 bg-white/5 dark:bg-black/50 backdrop-blur-md mt-auto rounded-b-[2rem] border-t border-white/10">
          <div className="flex items-center gap-2">
            <p className="text-[13px] font-semibold leading-none text-white truncate flex-1 drop-shadow-md">
              {video.name}
            </p>
          </div>

          <div className="flex items-center justify-between mt-2.5">
            <div className="flex items-center">
              <span className="flex items-center px-2 py-1 rounded-full bg-white/10 border border-white/10 text-[8px] uppercase tracking-[0.15em] text-white/60">
                {video.category}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleLike}
                disabled={likeLoading}
                className="flex items-center gap-1 group/like transition-all"
                aria-label={liked ? "Remove like" : "Like"}
              >
                <Icon
                  icon={liked ? "solar:heart-bold" : "solar:heart-linear"}
                  className={`text-[16px] transition-colors ${liked ? "text-pink-500" : "text-neutral-400 group-hover/like:text-pink-500"}`}
                />
                {likes !== null && likes > 0 && (
                  <span className={`text-[10px] font-medium transition-colors ${liked ? "text-pink-500" : "text-neutral-400"}`}>
                    {likes}
                  </span>
                )}
              </button>

              <span className="text-[8px] text-neutral-700 opacity-50">•</span>

              <div className="flex items-center gap-1.5">
                <Icon icon="solar:eye-linear" className="text-[16px] text-neutral-400" />
                <span className="text-[10px] font-medium text-neutral-400">
                  {views !== null ? views : "—"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </article>

      {showModal && (
        <VideoModal video={video} onClose={() => setShowModal(false)} />
      )}
    </>
  );
}

