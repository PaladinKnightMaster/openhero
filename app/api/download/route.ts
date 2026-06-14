import { NextRequest, NextResponse } from "next/server";
import JSZip from "jszip";
import fs from "fs";
import path from "path";
import {
  getNextjsCode,
  getReactCode,
  getHtmlCode,
  decodeHeroConfig,
  type TemplateOptions,
} from "@/lib/hero-templates";
import { slugToName } from "@/lib/utils";

type Format = "nextjs" | "react" | "html";

const FORMAT_CONFIG: Record<Format, { filename: string; staticFile: string | null }> = {
  nextjs: { filename: "page.tsx", staticFile: "page.tsx" },
  react: { filename: "Hero.jsx", staticFile: null }, // React is generator-only
  html: { filename: "index.html", staticFile: "index.html" },
};

const GENERATORS: Record<Format, (opts: TemplateOptions) => string> = {
  nextjs: getNextjsCode,
  react: getReactCode,
  html: getHtmlCode,
};

const R2_BASE = "https://videos.openhero.art";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category") ?? "";
  const slug = searchParams.get("slug") ?? "";
  const format = (searchParams.get("format") ?? "nextjs") as Format;
  const cfgParam = searchParams.get("cfg");

  if (!category || !slug || !FORMAT_CONFIG[format]) {
    return NextResponse.json({ error: "Invalid parameters" }, { status: 400 });
  }

  const name = slugToName(slug);
  const { filename, staticFile } = FORMAT_CONFIG[format];

  const downloadsDir = path.join(process.cwd(), "public", "downloads", category, slug);
  const staticFilePath = staticFile ? path.join(downloadsDir, staticFile) : null;

  // When a Studio config is supplied, always generate from templates so the ZIP
  // matches what the user customized. Otherwise prefer the curated static file.
  let code: string;
  let usedGenerator: boolean;
  const opts: TemplateOptions = { name, slug, videoSrc: "", category };
  if (!cfgParam && staticFilePath && fs.existsSync(staticFilePath)) {
    code = fs.readFileSync(staticFilePath, "utf-8");
    usedGenerator = false;
  } else {
    code = GENERATORS[format]({ ...opts, config: decodeHeroConfig(cfgParam) });
    usedGenerator = true;
  }

  // Pack the video where the code actually references it:
  // - HTML (generated or curated) references ./video.mp4 next to the file.
  // - Generated React/Next references /videos/{category}/{slug}.mp4 under public/.
  const videoZipPath =
    usedGenerator && format !== "html"
      ? `public/videos/${category}/${slug}.mp4`
      : "video.mp4";

  const zip = new JSZip();
  const folder = zip.folder(`${slug}-${format}`) as JSZip;
  folder.file(filename, code);

  const r2VideoUrl = `${R2_BASE}/downloads/${category}/${slug}/video.mp4`;
  let videoArrayBuffer: ArrayBuffer | null = null;
  try {
    const videoRes = await fetch(r2VideoUrl);
    if (videoRes.ok) videoArrayBuffer = await videoRes.arrayBuffer();
  } catch {
  }

  if (videoArrayBuffer) {
    folder.file(videoZipPath, new Uint8Array(videoArrayBuffer));
  } else {
    folder.file(
      "README.txt",
      [
        `Hero: ${name}`,
        `Category: ${category}`,
        ``,
        `Video source (Cloudflare R2):`,
        `  ${r2VideoUrl}`,
        ``,
        `To use:`,
        `  1. Download the video from the URL above (or provide your own).`,
        `  2. Save it as: ${videoZipPath}`,
        `     (relative to this folder — that is where ${filename} references it).`,
      ].join("\n"),
    );
  }

  const buffer = await zip.generateAsync({ type: "arraybuffer", compression: "DEFLATE" });

  return new NextResponse(buffer, {
    headers: {
      "Content-Type": "application/zip",
      "Content-Disposition": `attachment; filename="${slug}-${format}.zip"`,
      "Cache-Control": "no-store",
    },
  });
}

