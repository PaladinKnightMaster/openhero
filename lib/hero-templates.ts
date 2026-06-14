// ─────────────────────────────────────────────────────────────────────────────
// Hero template engine
// ─────────────────────────────────────────────────────────────────────────────
// One HeroConfig drives three outputs: standalone HTML, pure React, Next.js.
// Customization (content + accent + overlay) and presets (performance + motion)
// are all baked into the generated code so the export matches the live preview.
// ─────────────────────────────────────────────────────────────────────────────

export type OverlayStrength = "none" | "subtle" | "medium" | "strong";
export type PerformancePreset = "balanced" | "max";
export type MotionPreset = "always" | "reduced";

export interface HeroConfig {
  // content
  brand: string;
  heading: string;
  highlight: string;
  subheading: string;
  ctaLabel: string;
  ctaHref: string;
  // style
  accent: string;
  overlay: OverlayStrength;
  // behavior
  performance: PerformancePreset;
  motion: MotionPreset;
}

export const DEFAULT_HERO_CONFIG: HeroConfig = {
  brand: "MyApp",
  heading: "Build something",
  highlight: "extraordinary.",
  subheading: "A cinematic video hero — zero dependencies, ready to ship.",
  ctaLabel: "Get Started",
  ctaHref: "#",
  accent: "#319197",
  overlay: "subtle",
  performance: "balanced",
  motion: "reduced",
};

export interface TemplateOptions {
  name: string;
  slug: string;
  videoSrc: string;
  category: string;
  config?: HeroConfig;
}

const OVERLAY_VALUES: OverlayStrength[] = ["none", "subtle", "medium", "strong"];
const PERF_VALUES: PerformancePreset[] = ["balanced", "max"];
const MOTION_VALUES: MotionPreset[] = ["always", "reduced"];

/** Serialize a config for a URL query param. */
export function encodeHeroConfig(config: HeroConfig): string {
  return JSON.stringify(config);
}

/**
 * Parse a config that arrived as an untrusted string (URL param). Unknown or
 * malformed fields fall back to defaults; enum fields are validated.
 */
export function decodeHeroConfig(raw: string | null | undefined): HeroConfig {
  if (!raw) return DEFAULT_HERO_CONFIG;
  let parsed: Partial<HeroConfig>;
  try {
    parsed = JSON.parse(raw) as Partial<HeroConfig>;
  } catch {
    return DEFAULT_HERO_CONFIG;
  }
  const str = (v: unknown, fallback: string, max = 200) =>
    typeof v === "string" ? v.slice(0, max) : fallback;
  const d = DEFAULT_HERO_CONFIG;
  return {
    brand: str(parsed.brand, d.brand, 60),
    heading: str(parsed.heading, d.heading, 120),
    highlight: str(parsed.highlight, d.highlight, 120),
    subheading: str(parsed.subheading, d.subheading, 200),
    ctaLabel: str(parsed.ctaLabel, d.ctaLabel, 60),
    ctaHref: str(parsed.ctaHref, d.ctaHref, 300),
    accent: str(parsed.accent, d.accent, 32),
    overlay: OVERLAY_VALUES.includes(parsed.overlay as OverlayStrength)
      ? (parsed.overlay as OverlayStrength)
      : d.overlay,
    performance: PERF_VALUES.includes(parsed.performance as PerformancePreset)
      ? (parsed.performance as PerformancePreset)
      : d.performance,
    motion: MOTION_VALUES.includes(parsed.motion as MotionPreset)
      ? (parsed.motion as MotionPreset)
      : d.motion,
  };
}

// ── Sanitizers ───────────────────────────────────────────────────────────────
// Inputs are plain text from the customizer, but we still escape characters that
// would break the generated HTML / JSX so the exported code is always valid.

function htmlText(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function htmlAttr(s: string): string {
  return htmlText(s).replace(/"/g, "&quot;");
}

// JSX text supports HTML entities, so we additionally neutralize { } which would
// otherwise be parsed as expression delimiters.
function jsxText(s: string): string {
  return htmlText(s).replace(/{/g, "&#123;").replace(/}/g, "&#125;");
}

// For values that land inside a JS/JSX double-quoted string literal.
function jsString(s: string): string {
  return s.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

function safeAccent(accent: string): string {
  return /^#[0-9a-fA-F]{3,8}$/.test(accent.trim())
    ? accent.trim()
    : DEFAULT_HERO_CONFIG.accent;
}

// Allow http(s)/mailto/tel and host-relative or fragment URLs; anything with
// another scheme (javascript:, data:, …) collapses to "#" so a crafted config
// can never smuggle an executable URL into generated code.
function safeHref(href: string): string {
  const trimmed = href.trim();
  if (trimmed === "") return "#";
  if (/^(https?:|mailto:|tel:)/i.test(trimmed)) return trimmed;
  if (/^[/#?.]/.test(trimmed)) return trimmed;
  if (!/^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(trimmed)) return trimmed; // schemeless relative
  return "#";
}

function withDefaults(config?: HeroConfig): HeroConfig {
  return { ...DEFAULT_HERO_CONFIG, ...(config ?? {}) };
}

// ── Overlay presets ──────────────────────────────────────────────────────────
// Accent gradient + an optional bottom scrim. Stronger presets darken the lower
// third where the heading sits, keeping text contrast ≥ 4.5:1 (WCAG 1.4.3).

interface OverlaySpec {
  accentOpacity: number;
  scrim: string | null; // bottom black scrim color, or null
}

const OVERLAY_MAP: Record<OverlayStrength, OverlaySpec> = {
  none: { accentOpacity: 0, scrim: null },
  subtle: { accentOpacity: 0.2, scrim: null },
  medium: { accentOpacity: 0.3, scrim: "rgba(0,0,0,0.45)" },
  strong: { accentOpacity: 0.45, scrim: "rgba(0,0,0,0.72)" },
};

function overlayHtml(config: HeroConfig): string {
  const accent = safeAccent(config.accent);
  const spec = OVERLAY_MAP[config.overlay];
  const parts: string[] = [];
  if (spec.accentOpacity > 0) {
    parts.push(
      `      <div aria-hidden="true" class="absolute inset-0 pointer-events-none mix-blend-screen"
        style="opacity: ${spec.accentOpacity}; background: linear-gradient(130deg, transparent 40%, ${accent} 100%);">
      </div>`,
    );
  }
  if (spec.scrim) {
    parts.push(
      `      <div aria-hidden="true" class="absolute inset-0 pointer-events-none"
        style="background: linear-gradient(to top, ${spec.scrim} 0%, transparent 55%);">
      </div>`,
    );
  }
  return parts.join("\n");
}

function overlayJsx(config: HeroConfig): string {
  const accent = safeAccent(config.accent);
  const spec = OVERLAY_MAP[config.overlay];
  const parts: string[] = [];
  if (spec.accentOpacity > 0) {
    parts.push(
      `          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none mix-blend-screen"
            style={{ opacity: ${spec.accentOpacity}, background: "linear-gradient(130deg, transparent 40%, ${accent} 100%)" }}
          />`,
    );
  }
  if (spec.scrim) {
    parts.push(
      `          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
            style={{ background: "linear-gradient(to top, ${spec.scrim} 0%, transparent 55%)" }}
          />`,
    );
  }
  return parts.join("\n");
}

// React (inline-style) overlay variant — the pure React template avoids Tailwind.
function overlayReact(config: HeroConfig): string {
  const accent = safeAccent(config.accent);
  const spec = OVERLAY_MAP[config.overlay];
  const parts: string[] = [];
  if (spec.accentOpacity > 0) {
    parts.push(
      `          <div
            aria-hidden="true"
            style={{
              position: "absolute", inset: 0, pointerEvents: "none",
              opacity: ${spec.accentOpacity}, mixBlendMode: "screen",
              background: "linear-gradient(130deg, transparent 40%, ${accent} 100%)",
            }}
          />`,
    );
  }
  if (spec.scrim) {
    parts.push(
      `          <div
            aria-hidden="true"
            style={{
              position: "absolute", inset: 0, pointerEvents: "none",
              background: "linear-gradient(to top, ${spec.scrim} 0%, transparent 55%)",
            }}
          />`,
    );
  }
  return parts.join("\n");
}

// ── Shared helpers ───────────────────────────────────────────────────────────

function posterPath(category: string, slug: string): string {
  return `/videos/${category}/${slug}.jpg`;
}

function videoPath(category: string, slug: string): string {
  return `/videos/${category}/${slug}.mp4`;
}

// The autoplay starter for the JSX templates. "reduced" honors the user's
// prefers-reduced-motion setting; "always" autoplays unconditionally.
function startSnippet(motion: MotionPreset): string {
  if (motion === "reduced") {
    return `    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    const start = () => {
      if (reduce) return;
      v.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    };`;
  }
  return `    const start = () => {
      v.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    };`;
}

// ─────────────────────────────────────────────────────────────────────────────
// Next.js (App Router, TSX)
// ─────────────────────────────────────────────────────────────────────────────

export function getNextjsCode({ name, slug, category, config }: TemplateOptions): string {
  const c = withDefaults(config);
  const poster = posterPath(category, slug);
  const max = c.performance === "max";
  const cta = htmlAttr(safeHref(c.ctaHref));

  return `/**
 * Hero – ${name}
 *
 * Next.js App Router — zero extra dependencies.
 * Drop into: app/page.tsx  (or any route segment)
 *
 * Video : place ${slug}.mp4 at /public/videos/${category}/
 * Poster: place ${slug}.jpg at /public/videos/${category}/  (recommended)
 *
 * Presets baked in: performance=${c.performance}, motion=${c.motion}, overlay=${c.overlay}
 */
"use client";

import { useEffect, useRef, useState } from "react";

const VIDEO_SRC = "${jsString(videoPath(category, slug))}";
const POSTER_SRC = "${jsString(poster)}";

function Navbar() {
  return (
    <nav className="absolute inset-x-0 top-0 z-30 flex items-center justify-between px-6 py-6 md:px-12">
      <a href="/" className="text-xl font-bold tracking-tighter text-white">
        ${jsxText(c.brand)}
      </a>
      <div className="hidden items-center gap-8 text-sm font-medium text-white/70 md:flex">
        <a href="#" className="transition-colors hover:text-white">About</a>
        <a href="#" className="transition-colors hover:text-white">Work</a>
        <a href="#" className="transition-colors hover:text-white">Contact</a>
      </div>
      <a
        href="${cta}"
        className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-black transition-colors hover:bg-white/90"
      >
        ${jsxText(c.ctaLabel)}
      </a>
    </nav>
  );
}

export default function HeroPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
${startSnippet(c.motion)}
${
  max
    ? `    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          if (!v.src) v.src = VIDEO_SRC;
          start();
          obs.disconnect();
        });
      },
      { rootMargin: "200px" },
    );
    obs.observe(v);
    return () => obs.disconnect();`
    : `    start();`
}
  }, []);

  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play().then(() => setPlaying(true)).catch(() => {});
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  return (
    <>
      <style>{\`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(1.5rem); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fade-up  { opacity: 0; animation: fadeInUp 0.8s ease forwards; }
        .delay-1  { animation-delay: 0.2s; }
        .delay-2  { animation-delay: 0.4s; }
        @media (prefers-reduced-motion: reduce) {
          .fade-up { animation: none; opacity: 1; }
        }
      \`}</style>

      <main className="flex h-dvh items-center justify-center overflow-hidden bg-black p-2 md:p-4">
        <div className="relative h-full w-full overflow-hidden rounded-[2rem]">

          {/* Background video */}
          <video
            ref={videoRef}
            ${max ? "" : "src={VIDEO_SRC}\n            "}poster={POSTER_SRC}
            loop
            muted
            playsInline
            preload="${max ? "none" : "metadata"}"
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover object-bottom pointer-events-none"
            style={{ maskImage: "linear-gradient(to bottom, white 55%, transparent 100%)" }}
          />

${overlayJsx(c)}

          <Navbar />

          {/* Pause / play control (WCAG 2.2.2) */}
          <button
            type="button"
            onClick={toggle}
            aria-pressed={playing}
            aria-label={playing ? "Pause background video" : "Play background video"}
            className="absolute bottom-4 right-4 z-40 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-md transition-colors hover:bg-black/60"
          >
            {playing ? (
              <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true">
                <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>

          <div className="absolute inset-x-0 bottom-0 z-20 flex flex-col gap-8 p-6 md:p-12 lg:flex-row lg:items-end lg:justify-between">

            <div className="fade-up delay-1 max-w-3xl">
              <h1 className="mb-4 text-5xl font-medium leading-tight text-white md:text-7xl">
                ${jsxText(c.heading)}
                <br />
                <span className="text-white/80">${jsxText(c.highlight)}</span>
              </h1>
            </div>

            <div className="fade-up delay-2 max-w-sm border-t border-white/10 pt-6 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0">
              <p className="text-lg font-light text-white/70">
                ${jsxText(c.subheading)}
              </p>
              <a
                href="${cta}"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-black transition-colors hover:bg-white/90"
              >
                ${jsxText(c.ctaLabel)} →
              </a>
            </div>

          </div>
        </div>
      </main>
    </>
  );
}
`;
}

// ─────────────────────────────────────────────────────────────────────────────
// Pure React (inline styles, no Tailwind)
// ─────────────────────────────────────────────────────────────────────────────

export function getReactCode({ name, slug, category, config }: TemplateOptions): string {
  const c = withDefaults(config);
  const poster = posterPath(category, slug);
  const max = c.performance === "max";
  const cta = htmlAttr(safeHref(c.ctaHref));

  return `/**
 * Hero – ${name}
 * ─────────────────────────────────────────────────────────────────────
 * Pure React — requires React 18+. No other dependencies, no Tailwind.
 *
 * Usage:
 *   import Hero from "./Hero.jsx";
 *   root.render(<Hero />);
 *
 * Video : place ${slug}.mp4 at /public/videos/${category}/
 * Poster: place ${slug}.jpg at /public/videos/${category}/  (recommended)
 *
 * Presets baked in: performance=${c.performance}, motion=${c.motion}, overlay=${c.overlay}
 */
import { useEffect, useRef, useState } from "react";

const VIDEO_SRC = "${jsString(videoPath(category, slug))}";
const POSTER_SRC = "${jsString(poster)}";

const STYLES = \`
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(1.5rem); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .fade-up { opacity: 0; animation: fadeInUp 0.8s ease forwards; }
  .delay-1 { animation-delay: 0.2s; }
  .delay-2 { animation-delay: 0.4s; }
  * { box-sizing: border-box; }
  body { margin: 0; overflow: hidden; height: 100dvh; background: #000; }
  @media (prefers-reduced-motion: reduce) {
    .fade-up { animation: none; opacity: 1; }
  }
\`;

function Navbar() {
  return (
    <nav
      style={{
        position: "absolute", top: 0, left: 0, right: 0, zIndex: 30,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "1.5rem 3rem",
      }}
    >
      <a href="/" style={{ color: "#fff", fontWeight: 700, fontSize: "1.25rem", textDecoration: "none" }}>
        ${jsxText(c.brand)}
      </a>
      <a
        href="${cta}"
        style={{
          background: "#fff", color: "#000", padding: "0.5rem 1rem",
          borderRadius: "0.5rem", fontSize: "0.875rem", fontWeight: 600, textDecoration: "none",
        }}
      >
        ${jsxText(c.ctaLabel)}
      </a>
    </nav>
  );
}

export default function Hero() {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
${startSnippet(c.motion)}
${
  max
    ? `    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          if (!v.src) v.src = VIDEO_SRC;
          start();
          obs.disconnect();
        });
      },
      { rootMargin: "200px" },
    );
    obs.observe(v);
    return () => obs.disconnect();`
    : `    start();`
}
  }, []);

  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play().then(() => setPlaying(true)).catch(() => {});
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  return (
    <>
      <style>{STYLES}</style>

      <div
        style={{
          display: "flex", alignItems: "center", justifyContent: "center",
          height: "100dvh", background: "#000", overflow: "hidden", padding: "0.5rem",
        }}
      >
        <div
          style={{
            position: "relative", width: "100%", height: "100%",
            borderRadius: "2rem", overflow: "hidden",
          }}
        >
          <video
            ref={videoRef}
            ${max ? "" : "src={VIDEO_SRC}\n            "}poster={POSTER_SRC}
            loop muted playsInline
            preload="${max ? "none" : "metadata"}"
            aria-hidden="true"
            style={{
              position: "absolute", inset: 0, width: "100%", height: "100%",
              objectFit: "cover", objectPosition: "bottom", pointerEvents: "none",
              maskImage: "linear-gradient(to bottom, white 55%, transparent 100%)",
            }}
          />

${overlayReact(c)}

          <Navbar />

          <button
            type="button"
            onClick={toggle}
            aria-pressed={playing}
            aria-label={playing ? "Pause background video" : "Play background video"}
            style={{
              position: "absolute", bottom: "1rem", right: "1rem", zIndex: 40,
              display: "inline-flex", alignItems: "center", justifyContent: "center",
              height: "2.25rem", width: "2.25rem", borderRadius: "9999px",
              border: "1px solid rgba(255,255,255,0.2)", background: "rgba(0,0,0,0.4)",
              color: "#fff", cursor: "pointer", backdropFilter: "blur(8px)",
            }}
          >
            {playing ? (
              <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true">
                <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>

          <div
            style={{
              position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 20,
              display: "flex", flexDirection: "column", gap: "2rem", padding: "3rem",
            }}
          >
            <div className="fade-up delay-1">
              <h1
                style={{
                  fontSize: "clamp(2.5rem, 6vw, 4.5rem)", fontWeight: 500,
                  lineHeight: 1.1, color: "#fff", margin: 0, marginBottom: "1rem",
                }}
              >
                ${jsxText(c.heading)}<br />
                <span style={{ color: "rgba(255,255,255,0.8)" }}>${jsxText(c.highlight)}</span>
              </h1>
            </div>

            <div
              className="fade-up delay-2"
              style={{
                borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "1.5rem", maxWidth: "24rem",
              }}
            >
              <p style={{ fontSize: "1.125rem", fontWeight: 300, color: "rgba(255,255,255,0.7)", margin: "0 0 1.5rem" }}>
                ${jsxText(c.subheading)}
              </p>
              <a
                href="${cta}"
                style={{
                  display: "inline-flex", alignItems: "center", gap: "0.5rem",
                  background: "#fff", color: "#000", padding: "0.75rem 1.5rem",
                  borderRadius: "0.75rem", fontSize: "0.875rem", fontWeight: 600, textDecoration: "none",
                }}
              >
                ${jsxText(c.ctaLabel)} →
              </a>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
`;
}

// ─────────────────────────────────────────────────────────────────────────────
// Standalone HTML (Tailwind CDN)
// ─────────────────────────────────────────────────────────────────────────────

export function getHtmlCode({ name, slug, category, config }: TemplateOptions): string {
  const c = withDefaults(config);
  const max = c.performance === "max";
  const autoplayAttr = c.motion === "always" ? "autoplay " : "";
  const cta = htmlAttr(safeHref(c.ctaHref));

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Hero — ${htmlText(name)}</title>

  <script src="https://cdn.tailwindcss.com"><\/script>

  <style>
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(1.5rem); }
      to   { opacity: 1; transform: translateY(0); }
    }
    .fade-up { opacity: 0; animation: fadeInUp 0.8s ease forwards; }
    .delay-1 { animation-delay: 0.2s; }
    .delay-2 { animation-delay: 0.4s; }
    body { margin: 0; overflow: hidden; height: 100dvh; background: #000; }
    @media (prefers-reduced-motion: reduce) {
      .fade-up { animation: none; opacity: 1; }
    }
  </style>
</head>
<body>

  <div class="flex h-screen items-center justify-center overflow-hidden bg-black p-2 md:p-4">
    <div class="relative h-full w-full overflow-hidden rounded-[2rem]">

      <!-- Assets are relative so this file works standalone: keep video.mp4
           (and optionally poster.jpg) in the same folder as this file. -->
      <video id="hero-video" ${autoplayAttr}loop muted playsinline
        preload="${max ? "none" : "metadata"}"
        poster="./poster.jpg"
        aria-hidden="true"
        style="mask-image: linear-gradient(to bottom, white 55%, transparent 100%);"
        class="absolute inset-0 h-full w-full object-cover object-bottom pointer-events-none">
        <source src="./video.mp4" type="video/mp4" />
        Your browser does not support HTML5 video.
      </video>

${overlayHtml(c)}

      <nav class="absolute inset-x-0 top-0 z-30 flex items-center justify-between px-6 py-6 md:px-12">
        <a href="/" class="text-xl font-bold tracking-tighter text-white no-underline">${htmlText(c.brand)}</a>
        <div class="hidden md:flex items-center gap-8 text-sm font-medium text-white/70">
          <a href="#" class="hover:text-white transition-colors">About</a>
          <a href="#" class="hover:text-white transition-colors">Work</a>
          <a href="#" class="hover:text-white transition-colors">Contact</a>
        </div>
        <a href="${cta}"
          class="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-black no-underline hover:bg-white/90 transition-colors">
          ${htmlText(c.ctaLabel)}
        </a>
      </nav>

      <button id="hero-toggle" type="button" aria-pressed="false"
        aria-label="Play or pause background video"
        class="absolute bottom-4 right-4 z-40 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-md transition-colors hover:bg-black/60">
        <svg data-play viewBox="0 0 24 24" width="14" height="14" fill="currentColor" style="display:block"><path d="M8 5v14l11-7z"/></svg>
        <svg data-pause viewBox="0 0 24 24" width="14" height="14" fill="currentColor" style="display:none"><path d="M6 5h4v14H6zM14 5h4v14h-4z"/></svg>
      </button>

      <div class="absolute inset-x-0 bottom-0 z-20 flex flex-col gap-8 p-6 md:p-12 lg:flex-row lg:items-end lg:justify-between">

        <div class="fade-up delay-1 max-w-3xl">
          <h1 class="mb-4 text-5xl md:text-7xl font-medium leading-tight text-white">
            ${htmlText(c.heading)}<br />
            <span class="text-white/80">${htmlText(c.highlight)}</span>
          </h1>
        </div>

        <div class="fade-up delay-2 max-w-sm border-t border-white/10 pt-6 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0">
          <p class="text-lg font-light text-white/70">
            ${htmlText(c.subheading)}
          </p>
          <a href="${cta}"
            class="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-black no-underline hover:bg-white/90 transition-colors">
            ${htmlText(c.ctaLabel)} →
          </a>
        </div>

      </div>
    </div>
  </div>

  <script>
    (function () {
      var v = document.getElementById("hero-video");
      var btn = document.getElementById("hero-toggle");
      if (!v || !btn) return;
      var playIcon = btn.querySelector("[data-play]");
      var pauseIcon = btn.querySelector("[data-pause]");
      var reduce = ${c.motion === "reduced" ? 'window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches' : "false /* motion preset: always */"};

      function setState(playing) {
        btn.setAttribute("aria-pressed", String(playing));
        if (playIcon) playIcon.style.display = playing ? "none" : "block";
        if (pauseIcon) pauseIcon.style.display = playing ? "block" : "none";
      }

      if (!reduce) {
        v.play().then(function () { setState(true); }).catch(function () { setState(false); });
      } else {
        setState(false);
      }

      btn.addEventListener("click", function () {
        if (v.paused) {
          v.play().then(function () { setState(true); }).catch(function () {});
        } else {
          v.pause();
          setState(false);
        }
      });
    })();
  <\/script>

</body>
</html>
`;
}
