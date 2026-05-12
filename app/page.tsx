import type { Metadata } from "next";
import { Footer } from "@/components/layout/footer";
import Header from "@/components/layout/header";
import Hero from "@/components/sections/Hero";
import HeroGallery from "@/components/sections/HeroGallery";
import { getVideoCatalog } from "@/lib/videos";

export const metadata: Metadata = {
  title: "Free Cinematic Video Hero Sections - Browse & Download",
  description:
    "Discover cinematic video hero sections for your next website project. Browse by style, preview full-screen, and download the video + source code in HTML, React, or Next.js - completely free.",
  keywords: [
    "video hero section free",
    "hero section template download",
    "cinematic hero background",
    "next.js hero template",
    "react landing page hero",
    "full screen video background",
  ],
  alternates: {
    canonical: "https://openhero.art",
  },
  openGraph: {
    title: "openhero - Free Cinematic Video Hero Sections",
    description:
      "Browse and download cinematic video hero sections with production-ready source code. HTML, React, and Next.js - completely free.",
    url: "https://openhero.art",
    type: "website",
  },
};

export default function Home() {
  const { videos, categories } = getVideoCatalog();

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Video Hero Gallery - openhero",
    url: "https://openhero.art",
    description:
      "Browse and download cinematic video hero sections with production-ready source code in HTML, React, and Next.js.",
    numberOfItems: videos.length,
    inLanguage: "en-US",
    isPartOf: { "@type": "WebSite", name: "openhero", url: "https://openhero.art" },
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <div 
        className="absolute inset-0 -z-10"
        style={{ 
          backgroundImage: "url('/svg/hero-background.svg')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% auto",
          backgroundPosition: "0px -100px" 
        }}
      />
      <Header />
      <main className="flex-1">
        <Hero />
        <HeroGallery videos={videos} categories={categories} />
      </main>
      <Footer />
      <div className="pointer-events-none fixed bottom-0 left-0 z-50 h-32 w-full bg-linear-to-t from-black via-black/15 to-transparent" />
    </div>
  );
}
