import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { toPreviewHtml } from "@/lib/preview-html";

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

  const rawHtml = fs.readFileSync(htmlPath, "utf-8");
  const html = toPreviewHtml(rawHtml, { category, slug });

  return new NextResponse(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}

