# Goal: Hero Studio — Customizable Heroes with Performance & Accessibility Presets

> Comprehensive implementation spec for the `/goal` command.
> Single, self-contained contributor PR for **openhero**. Performance + new component + new feature. **Security is explicitly out of scope.**

---

## 1. Summary

Today every hero exports the **same** hardcoded markup ("Build something extraordinary", a fixed `#319197` accent, a fixed mask) from `lib/hero-templates.ts`. The "Copy code / Download ZIP" modal is a static viewer.

**Hero Studio** turns that modal into a lightweight **live customizer**. Users edit a small set of fields (heading, highlight, subheading, CTA label/href, brand name, accent color, overlay strength) and pick **Performance** and **Motion/Accessibility** presets. The HTML / React / Next.js code blocks, the ZIP download, and a live preview all regenerate instantly from one config object. Last-used config persists in `localStorage`.

This converts openhero from a *gallery* into a *practical hero generator* and ships the performance + a11y improvements as first-class, user-visible presets.

### Why this PR (contributor rationale)
- **New feature:** in-modal customization + live preview (gallery → generator).
- **New component:** `HeroStudio` control panel + `HeroPreviewFrame`.
- **Performance:** poster-frame strategy, `preload` presets, reduced-motion video swap, deterministic lazy loading — baked into *generated* code, not just the site.
- **Accessibility:** `prefers-reduced-motion` handling, a visible pause/play control (WCAG 2.2.2), and overlay-strength presets mapped to documented contrast ratios (WCAG 1.4.3).

---

## 2. Goals & Non-Goals

### Goals
1. Parameterize the template engine: one `HeroConfig` → HTML, React, and Next.js output.
2. Add a `HeroStudio` panel to `VideoModal` that edits `HeroConfig` with live code + preview updates.
3. Ship **Performance presets** ("Balanced", "Max Performance") that change `preload`, `poster`, and loading behavior in generated code.
4. Ship **Motion presets** ("Always autoplay", "Respect reduced motion") that bake `prefers-reduced-motion` handling + a pause/play button into generated code.
5. Add **overlay strength** (None / Subtle / Medium / Strong) + **accent color** controls with contrast-safe scrim tokens.
6. Make `/api/download` honor the same `HeroConfig` (passed as query/body) so the ZIP matches what the user sees.
7. Persist last config in `localStorage`; provide a one-click "Reset to default".

### Non-Goals
- No security work (path traversal, allowlist, headers) — separate PR.
- No new backend tables, no auth, no Supabase schema changes.
- No change to the registry video set or R2 sync.
- No multi-language i18n of generated code.
- Not adding a search bar (separate PR; this one is the generator).

---

## 3. Design

### 3.1 Core type (`lib/hero-templates.ts`)

```ts
export type OverlayStrength = "none" | "subtle" | "medium" | "strong";
export type PerformancePreset = "balanced" | "max";
export type MotionPreset = "always" | "reduced";

export interface HeroConfig {
  // content
  brand: string;          // default "MyApp"
  heading: string;        // default "Build something"
  highlight: string;      // default "extraordinary."
  subheading: string;     // default "A cinematic video hero — zero dependencies, ready to ship."
  ctaLabel: string;       // default "Get Started"
  ctaHref: string;        // default "#"
  // style
  accent: string;         // hex, default "#319197"
  overlay: OverlayStrength;// default "subtle"
  // behavior
  performance: PerformancePreset; // default "balanced"
  motion: MotionPreset;           // default "reduced"
}

export const DEFAULT_HERO_CONFIG: HeroConfig = { /* defaults above */ };
```

`TemplateOptions` keeps `{ name, slug, videoSrc, category }` and gains `config: HeroConfig`. All three generators (`getHtmlCode`, `getReactCode`, `getNextjsCode`) read from `config`.

### 3.2 Preset → output mapping

| Control | Value | Generated effect |
|---|---|---|
| `overlay` | none | no scrim div |
| | subtle | `opacity-20` gradient (current behavior) |
| | medium | `opacity-40` + bottom black scrim `from-black/40` |
| | strong | `opacity-60` + `from-black/70` (ensures ≥4.5:1 on white text) |
| `accent` | hex | replaces hardcoded `#319197` in gradient + CTA hover ring |
| `performance` | balanced | `preload="metadata"`, `poster={POSTER}` |
| | max | `preload="none"`, `poster={POSTER}`, video `src` attached on `IntersectionObserver` enter (Next/React); HTML uses `preload="none"` + `poster` |
| `motion` | always | `autoplay` as today |
| | reduced | wrap autoplay in `matchMedia("(prefers-reduced-motion: reduce)")`; if reduced, show poster only; render a pause/play button that toggles playback |

`POSTER` = `"/videos/{category}/{slug}.jpg"` (documented in generated comment; see Task 6 for the poster pipeline — optional fallback to first-frame is documented if poster absent).

### 3.3 Component tree

```
VideoModal
├── aside (existing)
│   ├── header (title/tags/actions)  ← Download ZIP/Video now pass HeroConfig
│   ├── HeroStudio (NEW)             ← collapsible "Customize" section
│   │   ├── TextField × (brand, heading, highlight, subheading, ctaLabel)
│   │   ├── ColorField (accent)
│   │   ├── SegmentedControl (overlay)
│   │   ├── SegmentedControl (performance)
│   │   ├── SegmentedControl (motion)
│   │   └── Reset button
│   └── VercelTabs (existing) ← code blocks now derive from config (live)
└── preview pane (existing video)    ← optional: HeroPreviewFrame toggle (NEW, see Task 5)
```

Code blocks become **always client-generated** from `config` (drop the per-slug static `page.tsx`/`index.html` fetch for the *customized* view; keep static files only as the source of `DEFAULT_HERO_CONFIG` defaults if present). This removes the network fetch in `VideoModal` (perf win) and makes live editing instant.

### 3.4 State & persistence
- `HeroConfig` lives in `VideoModal` via `useHeroConfig(slug)` hook (`lib/useHeroConfig.ts`).
- Persisted under `localStorage["openhero_studio_config"]` (global, not per-slug — users want the same brand across heroes). Slug-specific fields (none) excluded.
- `useMemo` derives `{ nextjs, react, html }` from `config` + template fns → no refetch on keystroke; debounce preview iframe by 250ms.

---

## 4. Task Breakdown

> Each task is independently reviewable. Suggested commit boundaries match task numbers.

### Task 1 — Template engine: parameterize `HeroConfig`
**Files:** `lib/hero-templates.ts`
- Add `HeroConfig`, `DEFAULT_HERO_CONFIG`, preset types.
- Extend `TemplateOptions` with `config`.
- Refactor `getHtmlCode` / `getReactCode` / `getNextjsCode` to interpolate `config` (brand, heading, highlight, subheading, CTA, accent).
- Add helper `overlayMarkup(strength, accent, target)` and `accentGradient(accent)` returning per-target (`html`|`jsx`) strings.
- Keep output byte-for-byte identical to today when `config === DEFAULT_HERO_CONFIG` **except** new a11y/perf additions gated by presets (default `motion:"reduced"`, `performance:"balanced"` — see acceptance).
**Acceptance:** `getHtmlCode({...,config:DEFAULT_HERO_CONFIG})` compiles; snapshot review shows only intended diffs.

### Task 2 — Performance & motion code generation
**Files:** `lib/hero-templates.ts`
- Add `videoAttrs(config)` → `preload`/`poster`/`autoplay` attributes per preset.
- Add reduced-motion runtime: React/Next emit a `useEffect` guarded by `matchMedia`; HTML emits an inline `<script>` doing the same.
- Add a pause/play button (accessible: `aria-pressed`, `aria-label`) in all three outputs, wired to the video ref / `getElementById`.
- `max` preset: in React/Next, attach `src` on intersection (so the ZIP'd component is genuinely lazy); HTML keeps `preload="none"` + `poster`.
**Acceptance:** generated React/Next compiles under `tsc`; generated HTML opens standalone; with reduced-motion on, video does not autoplay and poster shows; pause button toggles playback.

### Task 3 — `HeroStudio` control panel component
**Files:** `components/sections/HeroGallery/HeroStudio.tsx` (new), `components/ui/SegmentedControl.tsx` (new)
- Build `SegmentedControl` (matches existing dark/glass style, `radix`-free, keyboard navigable: arrow keys, `aria-pressed`).
- Build `HeroStudio` with the fields in §3.3; controlled via props `{ config, onChange, onReset }`.
- Collapsible (`<details>` or a toggle) labeled "Customize" so the modal isn't overwhelming by default.
- Inputs styled to match `VideoModal` (text-[11px], white/5 bg, white/10 border).
**Acceptance:** all controls update parent state; tab order is logical; no console warnings; works on mobile (stacked) and desktop.

### Task 4 — Wire `HeroStudio` into `VideoModal`
**Files:** `components/sections/HeroGallery/VideoModal.tsx`, `lib/useHeroConfig.ts` (new)
- Add `useHeroConfig` hook (load/persist localStorage, SSR-safe).
- Replace the static `fetch('/downloads/.../page.tsx')` code-loading effect with `useMemo` over template fns + `config`.
- Insert `<HeroStudio>` above the code tabs.
- Pass `config` to `DownloadZipButton` and the direct video download.
**Acceptance:** editing a field updates all three code tabs live; reopening the modal restores last config; Copy/Download reflect edits.

### Task 5 — Live preview (`HeroPreviewFrame`)
**Files:** `components/sections/HeroGallery/HeroPreviewFrame.tsx` (new), `VideoModal.tsx`
- Add a "Preview" / "Video" toggle on the left pane. "Preview" renders the generated **HTML** in a sandboxed `<iframe srcDoc={html}>` with the R2 video URL substituted (reuse the substitution logic from `app/api/preview/route.ts`, extracted to `lib/preview-html.ts`).
- Debounce `srcDoc` updates 250ms; `sandbox="allow-scripts"`.
**Acceptance:** preview reflects heading/accent/overlay/CTA edits within ~250ms; toggling back to "Video" restores the looping clip; no layout shift.

### Task 6 — Poster pipeline + perf wins on the gallery (site itself)
**Files:** `scripts/generate-posters.mjs` (new), `lib/videos.ts`, `components/sections/HeroGallery/VideoCard.tsx`, `app/page.tsx`, `.github/workflows/sync-r2.yml`
- `scripts/generate-posters.mjs`: ffmpeg one-frame extraction → `public/videos/{cat}/{slug}.jpg` (or `.webp`); idempotent (skip if exists). Document `pnpm posters`.
- `lib/videos.ts`: add `posterSrc` to `HeroVideo` (`${R2_BASE}/videos/{cat}/{slug}.jpg`).
- `VideoCard`: use `poster={posterSrc}` + `preload="none"`; attach `src` only on intersection (deterministic lazy load). Removes 12 eager metadata fetches per page.
- `app/page.tsx`: add `export const revalidate = 300` (ISR) so the Supabase view-sort query stops running on every request.
- Extend `sync-r2.yml` to also sync `*.jpg/*.webp` posters.
**Acceptance:** Lighthouse on `/` shows reduced "Enormous network payloads" + improved LCP vs. baseline; Network tab shows 0 video bytes until scroll.

### Task 7 — Download API honors `HeroConfig`
**Files:** `app/api/download/route.ts`
- Accept config fields via query params (`heading`, `accent`, `overlay`, `performance`, `motion`, …) **or** a base64 `cfg` param; fall back to `DEFAULT_HERO_CONFIG`.
- Generate code from templates (stop reading static `page.tsx`/`index.html` for the customized path; static files remain the un-customized fallback when no `cfg` is passed).
- Keep README.txt fallback when R2 video is unavailable.
**Acceptance:** ZIP contents byte-match the modal's displayed code for the same config.

### Task 8 — Docs, types, tests, polish
**Files:** `docs/hero-studio.md` (new), `README.md`, `lib/hero-templates.test.ts` (new, if a test runner is added), `package.json`
- Add `pnpm posters` script; document Hero Studio in README "Features".
- Add minimal unit tests for `hero-templates` (snapshot of default output + one fully-customized output) using `node --test` + `tsx` (no heavy deps) **or** Vitest if maintainer prefers.
- Add CONTRIBUTING note: how presets map to output.
**Acceptance:** `pnpm lint`, `pnpm build`, and tests pass.

---

## 5. Validation Plan

### 5.1 Automated (must pass before PR)
```bash
pnpm install
pnpm lint            # eslint clean
pnpm exec tsc --noEmit   # type-check (no emit)
pnpm build           # next build succeeds
pnpm test            # hero-templates snapshots (if test task included)
```

### 5.2 Generated-code validation
- Paste generated **Next.js** output into a scratch `app/page.tsx` → `next build` compiles, no TS errors.
- Open generated **HTML** file directly in a browser (file://) → renders, video controlled by poster/preset, pause button works.
- Generated **React** output compiles in a Vite scratch app.

### 5.3 Manual QA matrix
| Case | Expected |
|---|---|
| Edit heading/highlight/CTA | all 3 code tabs + preview update live |
| Change accent color | gradient + CTA hover use new hex in all outputs |
| Overlay None→Strong | scrim intensity changes; Strong keeps text ≥4.5:1 |
| Performance: Max | code shows `preload="none"` + lazy `src`; gallery loads 0 video bytes until scroll |
| Motion: Reduced + OS reduced-motion ON | no autoplay, poster visible, pause button present |
| Reopen modal | last config restored from localStorage |
| Reset | returns to `DEFAULT_HERO_CONFIG` |
| Download ZIP | files match displayed code for current config |
| Mobile (375px) | HeroStudio stacks; controls reachable; no overflow |

### 5.4 Accessibility validation
- `prefers-reduced-motion` honored in generated output (DevTools → Rendering → Emulate).
- Pause/play button: keyboard focusable, `aria-pressed` toggles, `aria-label` present.
- Overlay "Strong"/"Medium" contrast verified with a contrast checker on the heading over the scrim (target ≥4.5:1).
- HeroStudio controls operable by keyboard; visible focus rings.
- axe DevTools: 0 new critical violations on the modal.

### 5.5 Performance validation
- Lighthouse (mobile) on `/` before vs. after Task 6: record LCP, Total Byte Weight, "Avoid enormous network payloads".
- Network panel: confirm video requests deferred until intersection.
- Confirm homepage no longer issues a Supabase query per request (ISR) — check response is cached/`x-nextjs-cache`.

---

## 6. Results / Deliverables Spec

A reviewer should be able to confirm each:

1. **New components:** `HeroStudio.tsx`, `SegmentedControl.tsx`, `HeroPreviewFrame.tsx`.
2. **New lib:** `useHeroConfig.ts`, `preview-html.ts`, `HeroConfig` types + presets in `hero-templates.ts`.
3. **New script:** `scripts/generate-posters.mjs` + `pnpm posters`.
4. **Feature:** in-modal live customization of heading/highlight/subheading/CTA/brand/accent/overlay, with live preview.
5. **Performance presets** visibly change generated code and the live site lazy-loads video + uses posters; homepage uses ISR.
6. **Accessibility:** generated heroes respect reduced-motion and ship a pause control; overlay presets are contrast-documented.
7. **Parity:** modal code == ZIP code == preview, for any config.
8. **Green CI:** lint + typecheck + build (+ tests) pass.
9. **Docs:** `docs/hero-studio.md` + README feature entry + before/after Lighthouse numbers in the PR description.

### PR description template (to include)
- Problem → Solution → Screenshots/GIF of live editing → Lighthouse before/after table → a11y checklist → "How to test" steps.

---

## 7. Rollout / PR Strategy

Single PR titled **"feat: Hero Studio — customizable heroes with performance & accessibility presets"**, but commits split by task so the maintainer can review/cherry-pick:

1. `feat(templates): parameterize hero templates with HeroConfig` (Task 1–2)
2. `feat(ui): SegmentedControl + HeroStudio panel` (Task 3)
3. `feat(modal): wire Hero Studio into VideoModal` (Task 4)
4. `feat(modal): live HTML preview frame` (Task 5)
5. `perf(gallery): poster frames, lazy video, ISR homepage` (Task 6)
6. `feat(api): download honors HeroConfig` (Task 7)
7. `docs+test: Hero Studio docs and template snapshots` (Task 8)

If the maintainer wants it smaller, **Task 6 (gallery perf)** and **Tasks 1–5 (Hero Studio)** are cleanly separable into two PRs.

---

## 8. Risks & Mitigations

| Risk | Mitigation |
|---|---|
| Posters require ffmpeg in CI | Make `pnpm posters` local/optional; gallery falls back to `preload="none"` (no poster) gracefully if `.jpg` 404s. |
| Dropping static `page.tsx`/`index.html` fetch changes existing curated heroes | Treat static files as the *seed* for `DEFAULT_HERO_CONFIG` per hero where present; only override when user edits. Verify a few curated heroes match before/after. |
| iframe preview + R2 CORS | Reuse existing `/api/preview` substitution; `sandbox="allow-scripts"`; if CORS blocks video, preview still shows layout (acceptable). |
| Scope creep | Presets are a closed set; no freeform CSS. Customization limited to the fields in §3.1. |
| ISR staleness of view-sort | `revalidate = 300` is acceptable for popularity ordering; documented. |

---

## 9. Out of Scope (explicit)
Security hardening (path validation, script allowlist, CSP, rate-limiting on stats endpoints), search UI, themed registry packs, removing `app/test/page.tsx`, and moving videos out of git — all tracked as **separate** follow-up issues/PRs.
