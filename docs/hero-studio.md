# Hero Studio

Hero Studio turns the code modal from a static viewer into a small **hero
generator**. For any video you can edit the content, style, and behavior of a
clean starter hero and copy/download the result — HTML, React, or Next.js — with
the customizations baked in.

It lives next to the curated heroes: bespoke handcrafted exports stay the default,
and Studio is an opt-in "build your own" mode.

## Where it lives

Open any video card → the modal shows a **Code source** toggle:

- **Curated** — the original handcrafted `page.tsx` / `index.html` for that hero
  (unchanged behavior).
- **Studio (editable)** — a parameterized starter hero you can customize live.

In Studio mode a **Customize** panel appears with the controls below, the code
tabs regenerate as you type, and the left pane gains a **Video / Live preview**
toggle that renders the generated HTML in a sandboxed iframe.

Your settings persist in `localStorage` (global, so your brand/heading carry
across heroes). **Reset to default** clears them.

## Controls

| Control | Effect |
|---|---|
| Brand, Heading, Highlight, Subheading, CTA label, CTA link | Text content interpolated into all three outputs |
| Accent | Drives the overlay gradient + accent touches (validated hex; invalid values fall back) |
| Overlay strength | `none` / `subtle` / `medium` / `strong` — stronger presets add a bottom scrim so heading text keeps ≥ 4.5:1 contrast |
| Performance preset | `balanced` (poster + `preload="metadata"`) or `max` (poster + `preload="none"` + lazy `src` attach on `IntersectionObserver`) |
| Motion preset | `always` (autoplay) or `reduced` (respects `prefers-reduced-motion`; shows poster, doesn't autoplay) |

Every generated hero ships with:

- A **poster** reference (`/videos/{category}/{slug}.jpg`) so first paint isn't blank.
- A **pause / play button** (`aria-pressed`, keyboard-focusable) — required for
  auto-playing media over 5s (WCAG 2.2.2).
- A **`prefers-reduced-motion`** guard that disables autoplay and entrance
  animations for users who ask for reduced motion.

## How it works

```
HeroConfig ──▶ getNextjsCode / getReactCode / getHtmlCode ──▶ code tabs + ZIP + preview
```

- `lib/hero-templates.ts` — the `HeroConfig` type, `DEFAULT_HERO_CONFIG`, the three
  generators, and `encodeHeroConfig` / `decodeHeroConfig` (the latter validates
  untrusted input from the download URL).
- `lib/useHeroConfig.ts` — SSR-safe persisted config via `useSyncExternalStore`.
- `components/sections/HeroGallery/HeroStudio.tsx` — the controls.
- `components/sections/HeroGallery/HeroPreviewFrame.tsx` + `lib/preview-html.ts` —
  the live iframe preview (rewrites local asset paths to R2).
- `app/api/download/route.ts` — when a `cfg` param is present it generates from
  templates so the ZIP matches the modal; otherwise it serves the curated file.

The same config object drives the modal code, the ZIP, and the preview, so they
never drift.

## Posters

`pnpm posters` extracts a JPG poster for every `public/videos/**/*.mp4` (needs
`ffmpeg`). Posters are uploaded to R2 alongside the videos by the
`sync-r2` workflow and let the gallery render with `preload="none"` — no video
bytes are fetched for off-screen cards.

Posters are an enhancement, not a requirement: each gallery card shows a subtle
shimmer until its poster paints, and if the poster is missing (404) the card
falls back to fetching the video's first frame (the pre-poster behavior) for
that card only. So deploys don't depend on poster generation, and videos added
without posters degrade gracefully.

```bash
pnpm posters          # generate missing posters
pnpm posters --force  # regenerate all
```

## Tests

`pnpm test` runs `lib/hero-templates.test.ts`, covering interpolation, HTML/JSX
escaping, accent validation, overlay/performance/motion presets, the pause
control + reduced-motion handling, and `encode`/`decode` round-tripping.
