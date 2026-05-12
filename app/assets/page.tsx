import type { Metadata } from "next";
import Header from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import AssetsGallery from "@/components/sections/AssetsGallery";
import { getAssetCatalog, ASSET_TOTAL } from "@/lib/assets";

export const metadata: Metadata = {
  title: `${ASSET_TOTAL}+ Free Background Images — Wallpapers, Gradients & Patterns`,
  description: `Download ${ASSET_TOTAL} free premium background images — desktop wallpapers, gradients, minimal designs, and pattern textures. High resolution, curated for creative projects.`,
  keywords: [
    "free background images download",
    "desktop wallpapers free",
    "gradient backgrounds",
    "minimal wallpapers",
    "pattern textures",
    "abstract backgrounds",
    "free stock backgrounds",
    "high resolution backgrounds",
  ],
  alternates: {
    canonical: "https://openhero.art/assets",
  },
  openGraph: {
    title: `Free Background Library — ${ASSET_TOTAL} High-Res Images | openhero`,
    description: `${ASSET_TOTAL} curated backgrounds — wallpapers, gradients, minimal, and patterns. Free to download.`,
    url: "https://openhero.art/assets",
    type: "website",
  },
};

const imageGallerySchema = {
  "@context": "https://schema.org",
  "@type": "ImageGallery",
  name: "Background Image Library — openhero",
  url: "https://openhero.art/assets",
  description: `${ASSET_TOTAL} curated premium background images across desktop wallpapers, gradients, minimal designs, and pattern textures. Free to download.`,
  numberOfItems: ASSET_TOTAL,
  inLanguage: "en-US",
  isPartOf: { "@type": "WebSite", name: "openhero", url: "https://openhero.art" },
  about: [
    { "@type": "Thing", name: "Desktop Wallpapers" },
    { "@type": "Thing", name: "Gradient Backgrounds" },
    { "@type": "Thing", name: "Minimal Backgrounds" },
    { "@type": "Thing", name: "Pattern Textures" },
  ],
};

export default function AssetsPage() {
  const assets = getAssetCatalog();

  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(imageGallerySchema) }}
      />
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
