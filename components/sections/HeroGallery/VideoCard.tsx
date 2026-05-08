"use client";

import { useRef, useState } from "react";
import { Icon } from "@iconify/react";
import { capitalize } from "@/lib/utils";
import type { HeroVideo } from "@/lib/videos";
import { VideoModal } from "./VideoModal";

export default function VideoCard({ video }: { video: HeroVideo }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showModal, setShowModal] = useState(false);

  function handleMouseEnter() {
    videoRef.current?.play().catch(() => { });
  }

  return (
    <>
      <article className="group flex flex-col gap-2.5">
        <div
          className="relative aspect-video cursor-pointer overflow-hidden bg-neutral-900 border border-neutral-900 squircle"
          onMouseEnter={handleMouseEnter}
          onClick={() => setShowModal(true)}
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
              onClick={() => setShowModal(true)}
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
              <button className="flex items-center group transition-all">
                <Icon
                  icon="solar:heart-linear"
                  className="text-[16px] text-neutral-400 group-hover:text-pink-500 group-hover:icon-[solar:heart-bold] transition-colors"
                ></Icon>
              </button>

              <span className="text-[8px] text-neutral-700 opacity-50">•</span>

              <div className="flex items-center gap-1.5">
                <Icon
                  icon="solar:eye-linear"
                  className="text-[16px] text-neutral-400"
                ></Icon>
                <span className="text-[10px] font-medium text-neutral-400">336</span>
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
