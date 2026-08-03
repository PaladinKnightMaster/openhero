import type { Metadata } from "next";
import { createClient } from "@supabase/supabase-js";
import { Footer } from "@/components/layout/footer";
import Header from "@/components/layout/header";
import Hero from "@/components/sections/Hero";
import HeroGallery from "@/components/sections/HeroGallery";
import { getVideoCatalog } from "@/lib/videos";
import { env } from "@/lib/env";
import { SITE } from "@/lib/site";

export const revalidate = 3600;

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
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
    canonical: SITE.url,
  },
  icons: {
    icon: "/images/metadata/favicon.svg",
    shortcut: "/images/metadata/shortcut.svg",
    apple: "/images/metadata/apple.svg",
  },
  openGraph: {
    title: `${SITE.name} - Free Cinematic Video Hero Sections`,
    description:
      "Browse and download cinematic video hero sections with production-ready source code. HTML, React, and Next.js - completely free.",
    url: SITE.url,
    type: "website",
    images: [
      {
        url: `${SITE.url}/images/metadata/preview-openhero.webp`,
        width: 1200,
        height: 630,
        alt: `${SITE.name} - Free Cinematic Video Hero Sections`,
      },
    ],
    locale: SITE.locale,
    siteName: SITE.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} - Free Cinematic Video Hero Sections`,
    description:
      "Browse and download cinematic video hero sections with production-ready source code. HTML, React, and Next.js - completely free.",
    images: [`${SITE.url}/images/metadata/preview-openhero.webp`],
    creator: SITE.creator,
    site: SITE.twitterHandle,
  },
  other: {
    "msapplication-TileColor": "#1f2937",
    "format-detection": "telephone=no",
  },
};

export default async function Home() {
  const { videos, categories } = getVideoCatalog();

  let sortedVideos = videos;
  try {
    const supabase = createClient(
      env.supabase.url,
      env.supabase.publishableKey,
    );
    const slugs = videos.map((v) => v.slug);
    const { data: stats } = await supabase
      .from("hero_videos")
      .select("slug, views_count")
      .in("slug", slugs)
      .order("views_count", { ascending: false });

    if (stats && stats.length > 0) {
      const viewsMap = new Map<string, number>(
        stats.map((s) => [s.slug, s.views_count ?? 0]),
      );
      sortedVideos = [...videos].sort(
        (a, b) => (viewsMap.get(b.slug) ?? 0) - (viewsMap.get(a.slug) ?? 0),
      );
    }
  } catch {
    // Supabase unavailable — serve original order
  }

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Video Hero Gallery - openhero",
    url: SITE.url,
    description:
      "Browse and download cinematic video hero sections with production-ready source code in HTML, React, and Next.js.",
    numberOfItems: sortedVideos.length,
    inLanguage: "en-US",
    isPartOf: { "@type": "WebSite", name: SITE.name, url: SITE.url },
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
        <HeroGallery videos={sortedVideos} categories={categories} />
      </main>
      <Footer />
      <div className="pointer-events-none fixed bottom-0 left-0 z-50 h-32 w-full bg-linear-to-t from-black via-black/15 to-transparent" />
    </div>
  );
}
