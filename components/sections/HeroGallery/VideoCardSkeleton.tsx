/**
 * VideoCardSkeleton — mirrors VideoCard layout exactly.
 * Used during category transitions and infinite-scroll loads.
 * Pure CSS pulse — zero JS, zero layout shift.
 */
export default function VideoCardSkeleton() {
  return (
    <article className="flex flex-col gap-2.5 animate-pulse" aria-hidden="true">
      {/* Thumbnail area */}
      <div className="relative aspect-video overflow-hidden bg-white/6 squircle">
        {/* Shimmer sweep */}
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.6s_infinite] bg-linear-to-r from-transparent via-white/6 to-transparent" />
      </div>

      {/* Info bar */}
      <div className="p-3 bg-white/3 rounded-b-4xl border-t border-white/10">
        {/* Title line */}
        <div className="h-2.5 w-[58%] rounded-full bg-white/8" />

        {/* Bottom row */}
        <div className="mt-2.5 flex items-center justify-between">
          {/* Category pill */}
          <div className="h-4 w-14 rounded-full bg-white/8" />
          {/* Stats */}
          <div className="flex items-center gap-3">
            <div className="h-2.5 w-7 rounded-full bg-white/8" />
            <div className="h-2.5 w-2.5 rounded-full bg-white/5" />
            <div className="h-2.5 w-8 rounded-full bg-white/8" />
          </div>
        </div>
      </div>
    </article>
  );
}
