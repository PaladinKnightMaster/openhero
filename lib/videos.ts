import { slugToName } from "./utils";
import registryJson from "@/public/registry.json";

export interface HeroVideo {
  slug: string;
  name: string;
  category: string;
  videoSrc: string;
  hasDownloads: boolean;
}

export interface VideoCatalog {
  videos: HeroVideo[];
  categories: string[];
}

const R2_BASE = "https://videos.openhero.art";

export function getVideoCatalog(): VideoCatalog {
  const heroes = registryJson.heroes;
  if (!heroes?.length) return { videos: [], categories: [] };

  const categories = [...new Set(heroes.map((h) => h.category))];
  const videos: HeroVideo[] = heroes.map((hero) => ({
    slug: hero.slug,
    name: slugToName(hero.slug),
    category: hero.category,
    videoSrc: `${R2_BASE}/videos/${hero.category}/${hero.slug}.mp4`,
    hasDownloads: true,
  }));

  return { videos, categories };
}
