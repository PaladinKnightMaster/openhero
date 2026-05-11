"use client";

import { useState, useRef, useEffect } from "react";
import type { Asset } from "@/lib/assets";

interface AssetCardProps {
  asset: Asset;
  priority?: boolean;
  onClick: () => void;
}

export function AssetCard({ asset, priority, onClick }: AssetCardProps) {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (imgRef.current?.complete) {
      setLoaded(true);
    }
  }, []);
  return (
    <div
      className="group relative h-full w-full cursor-pointer overflow-hidden rounded-2xl bg-neutral-950 transition-all duration-500 ease-in-out hover:ring-1 hover:ring-white/20 shadow-2xl"
      onClick={onClick}
    >
      <div
        className={`pointer-events-none absolute inset-0 z-10 bg-neutral-900 transition-opacity duration-700 ${
          loaded ? "opacity-0" : "animate-pulse opacity-100"
        }`}
      />

      <div className="absolute inset-0 z-[2] bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-40" />

      <img
        ref={imgRef}
        src={asset.src}
        alt={`${asset.category} background ${asset.id}`}
        loading={priority ? "eager" : "lazy"}
        onLoad={() => setLoaded(true)}
        className={`block h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.33,1,0.68,1)] ${
          loaded ? "scale-100 opacity-100" : "scale-110 opacity-0"
        } group-hover:scale-110`} 
      />

      <div className="absolute inset-0 z-[3] opacity-0 transition-opacity duration-500 group-hover:opacity-100 shadow-[inset_0_0_100px_rgba(255,255,255,0.1)]" />

      <div className="absolute bottom-0 left-0 z-[4] w-full p-6 translate-y-4 opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/60">Explore</p>
        <h3 className="text-xl font-light text-white">{asset.category}</h3>
      </div>
    </div>
  );

}