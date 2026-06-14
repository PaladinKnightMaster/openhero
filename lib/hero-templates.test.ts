import { test } from "node:test";
import assert from "node:assert/strict";
import {
  getHtmlCode,
  getReactCode,
  getNextjsCode,
  decodeHeroConfig,
  encodeHeroConfig,
  DEFAULT_HERO_CONFIG,
  type HeroConfig,
} from "./hero-templates.ts";

const base = { name: "Test Hero", slug: "test-hero", videoSrc: "", category: "abstract" };

const generators = [
  ["nextjs", getNextjsCode],
  ["react", getReactCode],
  ["html", getHtmlCode],
] as const;

test("default config renders default content in every generator", () => {
  for (const [label, gen] of generators) {
    const code = gen({ ...base });
    assert.ok(code.includes("Build something"), `${label}: heading`);
    assert.ok(code.includes("extraordinary."), `${label}: highlight`);
    assert.ok(code.includes("MyApp"), `${label}: brand`);
    assert.ok(code.includes("Get Started"), `${label}: CTA`);
  }
});

test("custom content is interpolated", () => {
  const config: HeroConfig = {
    ...DEFAULT_HERO_CONFIG,
    heading: "Ship faster",
    highlight: "today.",
    brand: "Acme",
    ctaLabel: "Try it",
  };
  for (const [label, gen] of generators) {
    const code = gen({ ...base, config });
    assert.ok(code.includes("Ship faster"), `${label}: custom heading`);
    assert.ok(code.includes("Acme"), `${label}: custom brand`);
    assert.ok(code.includes("Try it"), `${label}: custom CTA`);
    assert.ok(!code.includes("Build something"), `${label}: default heading gone`);
  }
});

test("HTML/JSX-significant characters are escaped", () => {
  const config: HeroConfig = { ...DEFAULT_HERO_CONFIG, heading: "A <b> & {x}" };
  const html = getHtmlCode({ ...base, config });
  assert.ok(html.includes("A &lt;b&gt; &amp; {x}"), "html escapes < > &");

  const next = getNextjsCode({ ...base, config });
  assert.ok(next.includes("A &lt;b&gt; &amp; &#123;x&#125;"), "jsx escapes < > & { }");
});

test("accent color is applied and invalid values fall back", () => {
  const ok = getHtmlCode({ ...base, config: { ...DEFAULT_HERO_CONFIG, accent: "#ff0055" } });
  assert.ok(ok.includes("#ff0055"), "valid accent applied");

  const bad = getHtmlCode({
    ...base,
    config: { ...DEFAULT_HERO_CONFIG, accent: "javascript:alert(1)" },
  });
  assert.ok(!bad.includes("javascript:alert(1)"), "invalid accent rejected");
  assert.ok(bad.includes(DEFAULT_HERO_CONFIG.accent), "falls back to default accent");
});

test("overlay=none omits scrim, overlay=strong adds a dark scrim", () => {
  const none = getHtmlCode({ ...base, config: { ...DEFAULT_HERO_CONFIG, overlay: "none" } });
  assert.ok(!none.includes("linear-gradient(to top"), "no scrim when overlay=none");

  const strong = getHtmlCode({ ...base, config: { ...DEFAULT_HERO_CONFIG, overlay: "strong" } });
  assert.ok(strong.includes("linear-gradient(to top"), "scrim present when overlay=strong");
});

test("performance=max lazy-loads (no eager src, preload none)", () => {
  const max = getNextjsCode({ ...base, config: { ...DEFAULT_HERO_CONFIG, performance: "max" } });
  assert.ok(max.includes('preload="none"'), "preload none");
  assert.ok(!max.includes("src={VIDEO_SRC}"), "no eager src binding");
  assert.ok(max.includes("IntersectionObserver"), "lazy attach via observer");

  const balanced = getNextjsCode({ ...base });
  assert.ok(balanced.includes("src={VIDEO_SRC}"), "balanced binds src eagerly");
  assert.ok(balanced.includes('preload="metadata"'), "balanced preloads metadata");
});

test("every generator includes an accessible pause control + reduced-motion handling", () => {
  for (const [label, gen] of generators) {
    const code = gen({ ...base });
    assert.ok(code.includes("prefers-reduced-motion"), `${label}: reduced-motion guard`);
    assert.ok(/aria-(pressed|label)/.test(code), `${label}: accessible toggle`);
  }
});

test("motion=always autoplays unconditionally in every generator", () => {
  const config: HeroConfig = { ...DEFAULT_HERO_CONFIG, motion: "always" };

  for (const gen of [getNextjsCode, getReactCode]) {
    const code = gen({ ...base, config });
    assert.ok(!code.includes("if (reduce) return"), "no reduce gate on playback");
  }

  const html = getHtmlCode({ ...base, config });
  assert.ok(/<video[^>]*\bautoplay\b/.test(html), "html has autoplay attribute");
  assert.ok(html.includes("var reduce = false"), "html script does not gate on reduced motion");

  // And the default (reduced) still gates playback.
  for (const gen of [getNextjsCode, getReactCode]) {
    const code = gen({ ...base });
    assert.ok(code.includes("if (reduce) return"), "reduced preset gates playback");
  }
});

test("ctaHref rejects executable schemes and keeps safe URLs", () => {
  const evil: HeroConfig = { ...DEFAULT_HERO_CONFIG, ctaHref: "javascript:alert(1)" };
  for (const [label, gen] of generators) {
    const code = gen({ ...base, config: evil });
    assert.ok(!code.toLowerCase().includes("javascript:alert"), `${label}: javascript: stripped`);
    assert.ok(code.includes('href="#"'), `${label}: falls back to #`);
  }

  const safe: HeroConfig = { ...DEFAULT_HERO_CONFIG, ctaHref: "https://example.com/signup" };
  const html = getHtmlCode({ ...base, config: safe });
  assert.ok(html.includes('href="https://example.com/signup"'), "https URL kept");
});

test("HTML template uses relative asset paths so the ZIP is drop-in runnable", () => {
  const html = getHtmlCode({ ...base });
  assert.ok(html.includes('src="./video.mp4"'), "video is relative");
  assert.ok(html.includes('poster="./poster.jpg"'), "poster is relative");

  // React/Next reference public/ paths instead.
  const next = getNextjsCode({ ...base });
  assert.ok(next.includes(`"/videos/${base.category}/${base.slug}.mp4"`), "next uses public path");
});

test("encode/decode round-trips and decode validates untrusted input", () => {
  const config: HeroConfig = {
    ...DEFAULT_HERO_CONFIG,
    heading: "Round trip",
    overlay: "medium",
    performance: "max",
    motion: "always",
  };
  const decoded = decodeHeroConfig(encodeHeroConfig(config));
  assert.deepEqual(decoded, config, "round-trips losslessly");

  // Bad enum + missing fields → defaults.
  const fixed = decodeHeroConfig('{"overlay":"explode","performance":"turbo"}');
  assert.equal(fixed.overlay, DEFAULT_HERO_CONFIG.overlay, "invalid overlay → default");
  assert.equal(fixed.performance, DEFAULT_HERO_CONFIG.performance, "invalid perf → default");
  assert.equal(fixed.heading, DEFAULT_HERO_CONFIG.heading, "missing field → default");

  assert.deepEqual(decodeHeroConfig(null), DEFAULT_HERO_CONFIG, "null → defaults");
  assert.deepEqual(decodeHeroConfig("not json"), DEFAULT_HERO_CONFIG, "garbage → defaults");
});
