import type { Metadata } from "next";
import Header from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import AssetsGallery from "@/components/sections/AssetsGallery";
import { getAssetCatalog, ASSET_TOTAL } from "@/lib/assets";

export const metadata: Metadata = {
  title: "Assets - openhero",
  description: `Browse ${ASSET_TOTAL}+ premium background images — desktop wallpapers, gradients, minimal designs, and patterns.`,
};

export default function AssetsPage() {
  const assets = getAssetCatalog();

  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <Header />

      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 pb-8 pt-28 sm:px-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5">
            <span className="text-[11px] uppercase tracking-widest text-white/40">
              Assets
            </span>
          </div>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
            Background Library
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/50">
            {ASSET_TOTAL} curated backgrounds across 4 categories. Click any image to
            preview and download in full resolution.
          </p>
        </div>

        <AssetsGallery assets={assets} />
      </main>

      <Footer />
    </div>
  );
}
