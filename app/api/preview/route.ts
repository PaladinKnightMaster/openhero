import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const GITHUB_RAW =
  "https://raw.githubusercontent.com/CristianOlivera1/openhero/main";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category") ?? "";
  const slug = searchParams.get("slug") ?? "";

  if (!category || !slug) {
    return new NextResponse("Not found", { status: 404 });
  }

  const htmlPath = path.join(
    process.cwd(),
    "public",
    "downloads",
    category,
    slug,
    "index.html",
  );

  if (!fs.existsSync(htmlPath)) {
    return new NextResponse("Not found", { status: 404 });
  }

  const githubVideoUrl = `${GITHUB_RAW}/public/videos/${category}/${slug}.mp4`;

  let html = fs.readFileSync(htmlPath, "utf-8");

  html = html
    .replace(/src=["']\.\/video\.mp4["']/gi, `src="${githubVideoUrl}"`)
    .replace(/src=["']\/video\.mp4["']/gi, `src="${githubVideoUrl}"`)
    .replace(/src=["']\/videos\/[^"']+["']/gi, `src="${githubVideoUrl}"`);

  return new NextResponse(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}
