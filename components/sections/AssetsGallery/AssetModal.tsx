"use client";

import { useEffect, useState, useCallback } from "react";
import { Icon } from "@iconify/react";
import type { Asset } from "@/lib/assets";

function ModalImage({ src, alt }: { src: string; alt: string }) {
    const [loaded, setLoaded] = useState(false);
    return (
        <div className="relative flex items-center justify-center">
            {!loaded && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/10 border-t-white/60" />
                </div>
            )}
            <img
                src={src}
                alt={alt}
                fetchPriority="high"
                decoding="async"
                onLoad={() => setLoaded(true)}
                className={`max-h-[calc(100vh-80px)] max-w-full rounded-xl object-contain shadow-2xl shadow-black/60 transition-all duration-500 ease-out ${loaded ? "scale-100 opacity-100 blur-none" : "scale-95 opacity-0 blur-sm"
                    }`}
            />
        </div>
    );
}

interface AssetModalProps {
    asset: Asset;
    assets: Asset[];
    onClose: () => void;
    onNavigate: (asset: Asset) => void;
}

export function AssetModal({ asset, assets, onClose, onNavigate }: AssetModalProps) {
    const currentIndex = assets.findIndex((a) => a.id === asset.id);
    const hasPrev = currentIndex > 0;
    const hasNext = currentIndex < assets.length - 1;

    const goPrev = useCallback(() => {
        if (hasPrev) onNavigate(assets[currentIndex - 1]);
    }, [hasPrev, currentIndex, assets, onNavigate]);

    const goNext = useCallback(() => {
        if (hasNext) onNavigate(assets[currentIndex + 1]);
    }, [hasNext, currentIndex, assets, onNavigate]);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
            if (e.key === "ArrowLeft") goPrev();
            if (e.key === "ArrowRight") goNext();
        };
        document.addEventListener("keydown", onKey);
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.removeEventListener("keydown", onKey);
            document.body.style.overflow = prev;
        };
    }, [onClose, goPrev, goNext]);

    function handleDownload() {
        const a = document.createElement("a");
        a.href = asset.src;
        a.download = asset.filename;
        a.click();
    }

    return (
        <div
            role="dialog"
            aria-modal="true"
            aria-label={asset.filename}
            className="fixed inset-0 z-[100] flex flex-col overflow-hidden bg-black"
        >
            <div
                className="absolute inset-0 bg-black/95 backdrop-blur-3xl"
                onClick={onClose}
            />

            <div className="relative z-50 flex items-center justify-between border-b border-white/5 bg-black/40 px-4 sm:px-20 py-4 backdrop-blur-md">
                <div className="flex items-center gap-4">
                    <div className="flex flex-col">
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50">
                            {asset.category}
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <span className="font-mono text-xs tabular-nums text-white/50">
                        {currentIndex + 1} <span className="opacity-100">/</span> {assets.length}
                    </span>

                    <button
                        onClick={handleDownload}
                        className="group flex items-center gap-2 rounded-full bg-white px-5 py-2 text-[11px] font-bold uppercase tracking-wider text-black transition-all hover:bg-neutral-200 active:scale-95"
                    >
                        <Icon icon="solar:download-linear" width="14" />
                        <span>Download</span>
                    </button>

                    <div className="h-4 w-[1px] bg-white/10" />

                    <button
                        onClick={onClose}
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-all hover:bg-white/10 hover:rotate-90"
                    >
                        <Icon icon="material-symbols:close-rounded" width="20" />
                    </button>
                </div>
            </div>

            <div className="relative z-10 flex flex-1 items-center justify-center p-4 sm:px-12 sm:py-0">

                {hasPrev && (
                    <button
                        onClick={goPrev}
                        className="absolute left-6 z-50 flex h-14 w-14 items-center justify-center rounded-full border border-white/5 bg-white/5 text-white backdrop-blur-sm transition-all hover:bg-white/10 hover:scale-110 active:scale-90"
                    >
                        <Icon icon="solar:alt-arrow-left-linear" width="24" />
                    </button>
                )}

                <div className="relative h-full w-full max-w-7xl flex items-center justify-center">
                    <ModalImage
                        key={asset.id}
                        src={asset.src}
                        alt={asset.filename}
                    />
                </div>

                {hasNext && (
                    <button
                        onClick={goNext}
                        className="absolute right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full border border-white/5 bg-white/5 text-white backdrop-blur-sm transition-all hover:bg-white/10 hover:scale-110 active:scale-90"
                    >
                        <Icon icon="solar:alt-arrow-right-linear" width="24" />
                    </button>
                )}
            </div>
        </div>
    );

}
