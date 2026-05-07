import fs from "fs";
import path from "path";
import { slugToName } from "./utils";

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

const DEMO_VIDEOS: HeroVideo[] = [
  { slug: "dark-forest-misty-morning", name: "Dark Forest Misty Morning", category: "nature", videoSrc: "https://www.w3schools.com/html/mov_bbb.mp4", hasDownloads: true },

  { slug: "ocean-waves-sunset-coastal", name: "Ocean Waves Sunset Coastal", category: "nature", videoSrc: "https://www.w3schools.com/html/movie.mp4", hasDownloads: false },

  { slug: "mountain-peaks-golden-hour", name: "Mountain Peaks Golden Hour", category: "nature", videoSrc: "https://www.w3schools.com/html/mov_bbb.mp4", hasDownloads: false },

  { slug: "deep-space-nebula-cosmic", name: "Deep Space Nebula Cosmic", category: "abstract", videoSrc: "https://www.w3schools.com/html/movie.mp4", hasDownloads: false },

  { slug: "underground-cave-cinematic", name: "Underground Cave Cinematic", category: "abstract", videoSrc: "https://www.w3schools.com/html/mov_bbb.mp4", hasDownloads: false },

  { slug: "data-streams-blue-pulse", name: "Data Streams Blue Pulse", category: "tech", videoSrc: "https://www.w3schools.com/html/movie.mp4", hasDownloads: false },
  
  { slug: "circuit-board-glow-dark", name: "Circuit Board Glow Dark", category: "tech", videoSrc: "https://www.w3schools.com/html/mov_bbb.mp4", hasDownloads: false },
];

export function getVideoCatalog(): VideoCatalog {
  const videosDir = path.join(process.cwd(), "public", "videos");
  const downloadsDir = path.join(process.cwd(), "public", "downloads");

  try {
    const categoryFolders = fs
      .readdirSync(videosDir, { withFileTypes: true })
      .filter((d) => d.isDirectory())
      .map((d) => d.name);

    const categories: string[] = [];
    const videos: HeroVideo[] = [];

    for (const category of categoryFolders) {
      const categoryPath = path.join(videosDir, category);
      const files = fs
        .readdirSync(categoryPath)
        .filter((f) => f.toLowerCase().endsWith(".mp4"));

      if (files.length > 0) categories.push(category);

      for (const file of files) {
        const slug = file.replace(/\.mp4$/i, "");
        const downloadSlugPath = path.join(downloadsDir, category, slug);
        videos.push({
          slug,
          name: slugToName(slug),
          category,
          videoSrc: `/videos/${category}/${file}`,
          hasDownloads: fs.existsSync(downloadSlugPath),
        });
      }
    }

    if (videos.length === 0) return buildDemoCatalog();
    return { videos, categories };
  } catch {
    return buildDemoCatalog();
  }
}

function buildDemoCatalog(): VideoCatalog {
  const categories = [...new Set(DEMO_VIDEOS.map((v) => v.category))];
  return { videos: DEMO_VIDEOS, categories };
}
