# API Security Hardening PR — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Eliminate path traversal and unvalidated-input vulnerabilities in openhero's API routes, fix the leaked-secret `.env.example`, and correct the README env-var mismatch — delivered as one focused, reviewable open-source PR.

**Architecture:** Add registry-backed validation helpers to `lib/videos.ts` (the registry is already the single source of truth for valid category/slug pairs). Every API route that accepts `category`/`slug` validates against the registry *before* touching the filesystem or database. Server derives `name` from `slug` instead of trusting the client. Minimal Vitest setup is added so each fix lands with a regression test.

**Tech Stack:** Next.js 16 (App Router route handlers), TypeScript, Vitest (new dev dependency), pnpm.

**Branch:** `fix/harden-api-input-validation`

---

## Scope

**In scope (this PR):**
1. Path traversal fix in `/api/preview` and `/api/download` (category/slug used in `path.join` unvalidated).
2. Input validation for `/api/videos/view` and `/api/videos/like` (arbitrary slugs/names can pollute the DB; `sessionId` unvalidated).
3. `.env.example` contains real-looking credentials (actual Supabase URL/key and a real `IP_HASH_SALT`) — replace with placeholders.
4. README documents `SECURITY_IP_HASH_SALT` but code reads `IP_HASH_SALT` (`lib/env.ts:7`) — fix README.
5. Minimal Vitest setup (config + `test` script) to carry the regression tests.

**Out of scope (follow-up PRs, do NOT touch):**
- Submit-route script-domain allowlist bypass (`src.includes` matching) — separate PR.
- Rate limiting on like/view endpoints — needs maintainer's Supabase access.
- CSP header / removing deprecated `X-XSS-Protection` — separate PR.
- Removing `app/test/page.tsx`, poster images, batch stats endpoint.

## Definition of Done (overall validation spec)

| Check | Command | Expected result |
|---|---|---|
| Unit + route tests pass | `pnpm test` | All tests pass, 0 failures |
| Lint clean | `pnpm lint` | Exit 0, no new errors |
| Production build | `pnpm build` | Build succeeds |
| Traversal blocked | `curl.exe -s -o NUL -w "%{http_code}" "http://localhost:3000/api/preview?category=..%2F..&slug=app"` (dev server running) | `404` |
| Legit preview still works | `curl.exe -s -o NUL -w "%{http_code}" "http://localhost:3000/api/preview?category=abstract&slug=liquid-high-fidelity"` | `200` |
| Legit download still works | Open `http://localhost:3000/api/download?category=abstract&slug=liquid-high-fidelity&format=html` in browser | ZIP downloads |
| Gallery UX unchanged | Open `http://localhost:3000`, click a card, like it | View count increments, like toggles |
| No secrets in diff | `git diff main --stat` and review `.env.example` | Only placeholders present |

---

### Task 1: Branch + Vitest test infrastructure

**Files:**
- Modify: `package.json` (add `test` script + vitest devDependency)
- Create: `vitest.config.ts`

- [ ] **Step 1: Create the branch**

```bash
git checkout -b fix/harden-api-input-validation
```

- [ ] **Step 2: Install vitest**

```bash
pnpm add -D vitest
```

Expected: `vitest` appears under `devDependencies` in `package.json`, lockfile updated.

- [ ] **Step 3: Create `vitest.config.ts`**

```ts
import path from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    include: ["tests/**/*.test.ts"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname),
    },
  },
});
```

(The `@` alias mirrors `tsconfig.json` `"@/*": ["./*"]` so route/lib imports resolve.)

- [ ] **Step 4: Add the `test` script to `package.json`**

In the `scripts` block:

```json
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "eslint",
  "test": "vitest run"
}
```

- [ ] **Step 5: Verify vitest runs (no tests yet)**

Run: `pnpm test`
Expected: exits reporting "No test files found" (this is the expected state — tests arrive in Task 2). If it errors on config loading, fix before proceeding.

- [ ] **Step 6: Commit**

```bash
git add package.json pnpm-lock.yaml vitest.config.ts
git commit -m "chore: add vitest test infrastructure

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

**Result:** Repo has a working `pnpm test` command; no app behavior changed.

---

### Task 2: Registry-backed validation helpers (TDD)

**Files:**
- Modify: `lib/videos.ts` (append helpers; do not change existing exports)
- Test: `tests/lib/videos.test.ts`

- [ ] **Step 1: Write the failing tests**

Create `tests/lib/videos.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import {
  getVideoCatalog,
  isRegisteredSlug,
  isRegisteredVideo,
  isSafeSlugFormat,
} from "@/lib/videos";

describe("isSafeSlugFormat", () => {
  it("accepts lowercase kebab-case", () => {
    expect(isSafeSlugFormat("liquid-high-fidelity")).toBe(true);
    expect(isSafeSlugFormat("abstract")).toBe(true);
  });

  it("rejects path traversal sequences", () => {
    expect(isSafeSlugFormat("..")).toBe(false);
    expect(isSafeSlugFormat("../../app")).toBe(false);
    expect(isSafeSlugFormat("..\\..\\app")).toBe(false);
  });

  it("rejects slashes, dots, spaces, uppercase, and empty strings", () => {
    expect(isSafeSlugFormat("a/b")).toBe(false);
    expect(isSafeSlugFormat("a.b")).toBe(false);
    expect(isSafeSlugFormat("a b")).toBe(false);
    expect(isSafeSlugFormat("Abstract")).toBe(false);
    expect(isSafeSlugFormat("")).toBe(false);
    expect(isSafeSlugFormat("-leading")).toBe(false);
    expect(isSafeSlugFormat("trailing-")).toBe(false);
  });
});

describe("isRegisteredVideo", () => {
  it("accepts every category/slug pair from the registry", () => {
    const { videos } = getVideoCatalog();
    expect(videos.length).toBeGreaterThan(0);
    for (const v of videos) {
      expect(isRegisteredVideo(v.category, v.slug)).toBe(true);
    }
  });

  it("rejects an unknown slug in a real category", () => {
    expect(isRegisteredVideo("abstract", "definitely-not-a-real-slug")).toBe(false);
  });

  it("rejects a real slug paired with the wrong category", () => {
    expect(isRegisteredVideo("nature", "liquid-high-fidelity")).toBe(false);
  });

  it("rejects traversal payloads outright", () => {
    expect(isRegisteredVideo("..", "..")).toBe(false);
    expect(isRegisteredVideo("../..", "app")).toBe(false);
  });
});

describe("isRegisteredSlug", () => {
  it("accepts a known slug", () => {
    expect(isRegisteredSlug("liquid-high-fidelity")).toBe(true);
  });

  it("rejects unknown and malformed slugs", () => {
    expect(isRegisteredSlug("definitely-not-a-real-slug")).toBe(false);
    expect(isRegisteredSlug("../../etc/passwd")).toBe(false);
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `pnpm test`
Expected: FAIL — `isSafeSlugFormat`, `isRegisteredVideo`, `isRegisteredSlug` are not exported from `@/lib/videos`.

- [ ] **Step 3: Implement the helpers**

Append to `lib/videos.ts` (below `getVideoCatalog`):

```ts
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/** True when the value is plain lowercase kebab-case — safe to embed in a filesystem path. */
export function isSafeSlugFormat(value: string): boolean {
  return SLUG_PATTERN.test(value);
}

/** True when the category/slug pair exists in the public registry. */
export function isRegisteredVideo(category: string, slug: string): boolean {
  if (!isSafeSlugFormat(category) || !isSafeSlugFormat(slug)) return false;
  return registryJson.heroes.some(
    (h) => h.category === category && h.slug === slug,
  );
}

/** True when the slug exists in the public registry (any category). */
export function isRegisteredSlug(slug: string): boolean {
  if (!isSafeSlugFormat(slug)) return false;
  return registryJson.heroes.some((h) => h.slug === slug);
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `pnpm test`
Expected: PASS — all `tests/lib/videos.test.ts` tests green.

- [ ] **Step 5: Commit**

```bash
git add lib/videos.ts tests/lib/videos.test.ts
git commit -m "feat: add registry-backed category/slug validation helpers

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

**Result:** `lib/videos.ts` exports `isSafeSlugFormat`, `isRegisteredVideo`, `isRegisteredSlug`; covered by unit tests. No route behavior changed yet.

---

### Task 3: Fix path traversal in `/api/preview` (TDD)

**Files:**
- Modify: `app/api/preview/route.ts`
- Test: `tests/api/preview.test.ts`

**Vulnerability:** `category` and `slug` query params flow straight into `path.join(process.cwd(), "public", "downloads", category, slug, "index.html")`, so `?category=..%2F..&slug=<dir>` reads `index.html` files outside `public/downloads`.

- [ ] **Step 1: Write the failing tests**

Create `tests/api/preview.test.ts`:

```ts
import { NextRequest } from "next/server";
import { describe, expect, it } from "vitest";
import { GET } from "@/app/api/preview/route";

function makeRequest(query: string): NextRequest {
  return new NextRequest(`http://localhost/api/preview?${query}`);
}

describe("GET /api/preview", () => {
  it("returns 404 for path traversal in category", async () => {
    const res = await GET(makeRequest("category=..%2F..&slug=app"));
    expect(res.status).toBe(404);
  });

  it("returns 404 for path traversal in slug", async () => {
    const res = await GET(makeRequest("category=abstract&slug=..%2F..%2Fapp"));
    expect(res.status).toBe(404);
  });

  it("returns 404 for an unregistered slug", async () => {
    const res = await GET(makeRequest("category=abstract&slug=not-in-registry"));
    expect(res.status).toBe(404);
  });

  it("returns 404 for missing params", async () => {
    const res = await GET(makeRequest(""));
    expect(res.status).toBe(404);
  });

  it("serves a registered hero with the R2 video URL injected", async () => {
    const res = await GET(makeRequest("category=abstract&slug=liquid-high-fidelity"));
    expect(res.status).toBe(200);
    const html = await res.text();
    expect(html).toContain(
      "https://videos.openhero.art/downloads/abstract/liquid-high-fidelity/video.mp4",
    );
  });
});
```

- [ ] **Step 2: Run tests to verify the traversal tests fail**

Run: `pnpm test tests/api/preview.test.ts`
Expected: the two traversal tests and the unregistered-slug test FAIL (current code returns 200/404 based only on file existence — traversal to an existing `index.html` returns 200). The positive test should already PASS, confirming the test harness reads the real filesystem.

Note: if the traversal tests happen to pass because the probed path doesn't exist on this machine, that does NOT mean the route is safe — proceed with the fix regardless; the unregistered-slug test is the reliable failing case.

- [ ] **Step 3: Implement the fix**

In `app/api/preview/route.ts`, add the import and replace the parameter check. Full updated head of the handler:

```ts
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { isRegisteredVideo } from "@/lib/videos";

const R2_BASE = "https://videos.openhero.art";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category") ?? "";
  const slug = searchParams.get("slug") ?? "";

  // Only registry-listed category/slug pairs may reach the filesystem.
  if (!isRegisteredVideo(category, slug)) {
    return new NextResponse("Not found", { status: 404 });
  }
```

Everything from `const htmlPath = path.join(...)` down stays unchanged.

- [ ] **Step 4: Run tests to verify they pass**

Run: `pnpm test tests/api/preview.test.ts`
Expected: PASS — all 5 tests green.

- [ ] **Step 5: Commit**

```bash
git add app/api/preview/route.ts tests/api/preview.test.ts
git commit -m "fix: block path traversal in /api/preview via registry validation

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

**Result:** `/api/preview` only serves heroes listed in `registry.json`; traversal payloads get 404. Legit previews unchanged.

---

###