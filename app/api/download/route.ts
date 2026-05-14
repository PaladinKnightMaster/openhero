import { NextRequest, NextResponse } from "next/server";
import JSZip from "jszip";
import fs from "fs";
import path from "path";
import { getNextjsCode, getHtmlCode } from "@/lib/hero-templates";
import { slugToName } from "@/lib/utils";

type Format = "nextjs" | "html";

const FORMAT_CONFIG: Record<Format, { filename: string; staticFile: string }> = {
  nextjs: { filename: "page.tsx",   staticFile: "page.tsx"   },
  html:   { filename: "index.html", staticFile: "index.html" },
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category") ?? "";
  const slug     = searchParams.get("slug") ?? "";
  const format   = (searchParams.get("format") ?? "nextjs") as Format;

  if (!category || !slug || !FORMAT_CONFIG[format]) {
    return NextResponse.json({ error: "Invalid parameters" }, { status: 400 });
  }

  const name = slugToName(slug);
  const { filename, staticFile } = FORMAT_CONFIG[format];

  const downloadsDir = path.join(process.cwd(), "public", "downloads", category, slug);
  const staticFilePath = path.join(downloadsDir, staticFile);
  const downloadVideoPath = path.join(downloadsDir, "video.mp4");
  
  const previewVideoPath = path.join(process.cwd(), "public", "videos", category, `${slug}.mp4`);
  const videoSrc = fs.existsSync(previewVideoPath) ? `/videos/${category}/${slug}.mp4` : "";

  let code: string;
  if (fs.existsSync(staticFilePath)) {
    code = fs.readFileSync(staticFilePath, "utf-8");
  } else {
    const opts = { name, slug, videoSrc, category };
    code = format === "html" ? getHtmlCode(opts) : getNextjsCode(opts);
  }

  const zip = new JSZip();
  const folder = zip.folder(`${slug}-${format}`) as JSZip;
  folder.file(filename, code);

  const videoToInclude = fs.existsSync(downloadVideoPath) ? downloadVideoPath : 
                         fs.existsSync(previewVideoPath) ? previewVideoPath : null;

  if (videoToInclude) {
    const videoBuffer = fs.readFileSync(videoToInclude);
    folder.file("video.mp4", videoBuffer);
  } else {
    folder.file(
      "README.txt",
      [
        `Hero: ${name}`,
        `Category: ${category}`,
        ``,
        `To use:`,
        `  1. Obtain a video file (e.g., from a stock site)`,
        `  2. Rename it to: video.mp4`,
        `  3. Place it in the same folder as ${filename}`,
        `  4. The code already references "./video.mp4" (relative path).`,
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

