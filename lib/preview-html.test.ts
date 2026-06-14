import { test } from "node:test";
import assert from "node:assert/strict";
import { toPreviewHtml, R2_BASE } from "./preview-html.ts";

const target = { category: "abstract", slug: "test-hero" };

test("studio variant rewrites relative video and poster to gallery R2 URLs", () => {
  const html = '<video poster="./poster.jpg"><source src="./video.mp4" /></video>';
  const out = toPreviewHtml(html, { ...target, variant: "studio" });
  assert.ok(out.includes(`src="${R2_BASE}/videos/abstract/test-hero.mp4"`), "video → gallery URL");
  assert.ok(out.includes(`poster="${R2_BASE}/videos/abstract/test-hero.jpg"`), "poster → gallery URL");
});

test("curated variant (default) rewrites ./video.mp4 to the downloads R2 URL", () => {
  const html = '<source src="./video.mp4" />';
  const out = toPreviewHtml(html, target);
  assert.ok(out.includes(`src="${R2_BASE}/downloads/abstract/test-hero/video.mp4"`));
});

test("absolute /videos paths are rewritten for both src and poster", () => {
  const html =
    '<video poster="/videos/abstract/test-hero.jpg"><source src="/videos/abstract/test-hero.mp4" /></video>';
  const out = toPreviewHtml(html, target);
  assert.ok(out.includes(`src="${R2_BASE}/videos/abstract/test-hero.mp4"`));
  assert.ok(out.includes(`poster="${R2_BASE}/videos/abstract/test-hero.jpg"`));
});

test("regex metacharacters in category/slug do not throw or corrupt matching", () => {
  const weird = { category: "a(b", slug: "c[d" };
  const html = '<source src="./video.mp4" />';
  // Must not throw despite '(' and '[' in the target values.
  const out = toPreviewHtml(html, weird);
  assert.ok(out.includes("/downloads/a(b/c[d/video.mp4"));
});
