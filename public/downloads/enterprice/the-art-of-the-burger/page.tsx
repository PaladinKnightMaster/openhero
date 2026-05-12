"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";

const strips = [
  {
    label: "01 · Molecular assembly",
    title: "Bun, patty, and lacquered edge.",
    text: "A foundation of toasted brioche, precisely seared protein, and a thin glaze of glossy reduction.",
    metric: "01",
    note: "78g protein",
  },
  {
    label: "02 · Maillard-reaction aesthetics",
    title: "Surface tension, smoke, and caramelized depth.",
    text: "The crust lands with engineered color, a deep amber edge that signals flavor before the first bite.",
    metric: "02",
    note: "14 min rest",
  },
  {
    label: "03 · Textural layering",
    title: "Crunch, melt, and contrast.",
    text: "Pickle brightness, cheddar melt, onion bite, and sauce density are spaced like a perfectly tuned tasting curve.",
    metric: "03",
    note: "9 layers",
  },
  {
    label: "04 · Grill rhythm",
    title: "A slow-motion finish before service.",
    text: "Final assembly is timed to the last ember, keeping the burger vivid, molten, and structurally elegant.",
    metric: "04",
    note: "Hot service",
  },
];

const layers = [
  {
    tag: "Bread",
    name: "Toasted brioche base",
    right: "Warm",
    width: "86%",
  },
  {
    tag: "Protein",
    name: "Prime patty, seared hard",
    right: "Smoke",
    width: "74%",
  },
  {
    tag: "Melt",
    name: "Cheddar blanket",
    right: "Gloss",
    width: "66%",
  },
  {
    tag: "Finish",
    name: "Jalapeño spark",
    right: "Lift",
    width: "58%",
  },
];

const info = [
  { label: "Molten cheddar orange", value: "84°" },
  { label: "Grill cadence", value: "Live" },
];

const tags = ["Maillard", "Assembly", "Hydro-suspension", "Textural layering"];

export default function Page() {
  const heroVideoRef = useRef<HTMLVideoElement | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const updateHero = () => {
      const max = window.innerHeight * 1.15;
      const progress = Math.min(Math.max(window.scrollY / max, 0), 1);
      const scale = 1.06 + progress * 0.18;
      const translate = progress * 18;

      if (heroVideoRef.current) {
        heroVideoRef.current.style.transform = `scale(${scale}) translateY(${translate}px)`;
      }

      setScrolled(window.scrollY > 20);
    };

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        updateHero();
        ticking = false;
      });
    };

    updateHero();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateHero);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateHero);
    };
  }, []);

  useEffect(() => {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
          }
        });
      },
      { threshold: 0.16 }
    );

    const assembleObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
          }
        });
      },
      { threshold: 0.14 }
    );

    document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));
    document.querySelectorAll(".layer").forEach((el) => assembleObserver.observe(el));

    return () => {
      revealObserver.disconnect();
      assembleObserver.disconnect();
    };
  }, []);

  const handleMove = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    const target = e.currentTarget;
    const rect = target.getBoundingClientRect();
    target.style.setProperty("--x", `${e.clientX - rect.left}px`);
    target.style.setProperty("--y", `${e.clientY - rect.top}px`);
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[radial-gradient(circle_at_18%_10%,rgba(222,141,57,.13),transparent_16%),radial-gradient(circle_at_82%_14%,rgba(90,176,84,.08),transparent_14%),linear-gradient(180deg,oklch(12%_0.05_30)_0%,oklch(10%_0.045_30)_48%,oklch(8%_0.04_30)_100%)] text-white antialiased">
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden bg-[linear-gradient(rgba(255,255,255,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.03)_1px,transparent_1px),linear-gradient(135deg,transparent_0_48%,rgba(255,255,255,.025)_48%_52%,transparent_52%)] bg-[length:120px_120px,120px_120px,280px_280px] opacity-[0.22]" />
      <div className="fixed left-[-8rem] top-24 -z-10 h-[22rem] w-[22rem] rounded-full bg-[radial-gradient(circle,rgba(255,149,53,.16),transparent_72%)] blur-3xl" />
      <div className="fixed bottom-10 right-[-6rem] -z-10 h-[22rem] w-[22rem] rounded-full bg-[radial-gradient(circle,rgba(118,204,86,.1),transparent_72%)] blur-3xl" />

      <header className={`slat-bar fixed inset-x-0 top-0 z-50 border-b border-white/8 bg-[rgba(10,10,10,.74)] backdrop-blur-[14px] ${scrolled ? "shadow-[0_10px_40px_rgba(0,0,0,.15)]" : ""}`}>
        <div className="slat-inner mx-auto grid w-[min(1600px,calc(100%-32px))] grid-cols-1 gap-[18px] py-4 lg:grid-cols-[1.1fr_1.1fr_.8fr]">
          <div className="slat-brand flex min-h-[58px] items-center gap-[14px] border border-white/8 bg-white/4 px-[18px]">
            <div className="brand-mark grid h-[38px] w-[38px] place-items-center rounded-[12px] border border-white/8 bg-white/8">
              <Icon icon="ph:hamburger-bold" className="text-2xl text-[#f2b965]" />
            </div>
            <div className="leading-tight">
              <div className="copy text-[10px] uppercase tracking-[0.34em] text-white/50">Prime Gravity</div>
              <div className="text-sm text-white">The Art of the Burger</div>
            </div>
          </div>

          <nav className="slat-nav hidden min-h-[58px] items-center justify-center gap-[18px] overflow-x-auto border border-white/8 bg-white/4 px-[18px] text-[10px] uppercase tracking-[0.26em] text-white/62 scrollbar-none lg:flex">
            <a href="#assembly" className="transition hover:text-[#f2b965]">Assembly</a>
            <a href="#stack" className="transition hover:text-[#f2b965]">Layering</a>
            <a href="#finish" className="transition hover:text-[#f2b965]">Finish</a>
          </nav>

          <div className="slat-action flex min-h-[58px] items-center justify-end gap-3 border border-white/8 bg-white/4 px-[18px]">
            <div className="mini-meter h-2 w-full max-w-[220px] overflow-hidden bg-white/8">
              <span className="block h-full w-[72%] bg-[linear-gradient(90deg,rgba(237,176,84,.86),rgba(255,232,181,.95))]" />
            </div>
            <button onMouseMove={handleMove} className="textural-touch h-[44px] rounded-[1rem] border border-white/12 bg-[linear-gradient(180deg,rgba(227,178,104,.88),rgba(183,122,59,.82))] px-4 text-[10px] uppercase tracking-[0.28em] text-[#1c140d] shadow-[inset_0_1px_0_rgba(255,255,255,.4),inset_0_-12px_18px_rgba(0,0,0,.08),0_20px_48px_rgba(0,0,0,.3)] transition duration-[450ms] ease-[cubic-bezier(.16,1,.3,1)] hover:-translate-y-1 hover:shadow-[inset_0_1px_0_rgba(255,255,255,.48),inset_0_-12px_18px_rgba(0,0,0,.08),0_28px_56px_rgba(0,0,0,.36)]">
              Reserve
            </button>
          </div>
        </div>
      </header>

      <main>
        <section className="hero relative min-h-[100svh] overflow-hidden">
          <div className="hero-grid relative z-10 mx-auto grid min-h-[100svh] w-[min(1600px,calc(100%-32px))] grid-cols-1 gap-0 pt-[110px] lg:grid-cols-[.4fr_.6fr]">
            <div className="hero-copy relative z-[30] flex items-center justify-center px-0 py-[56px] pr-[22px]">
              <div className="hero-copy-inner w-full max-w-[560px] border border-white/8 bg-[rgba(14,14,14,.44)] px-[28px] py-[32px] shadow-[0_24px_60px_rgba(0,0,0,.38)] backdrop-blur-[20px] contrast-[0.95]">
                <div className="hero-kicker reveal inline-flex items-center gap-[10px] border border-white/8 bg-white/6 px-[14px] py-[10px] text-[10px] uppercase tracking-[0.28em] text-white/70">
                  <span className="inline-block h-2 w-2 bg-[var(--ochre)]" />
                  Molecular assembly · Maillard-reaction aesthetics
                </div>

                <h1 className="hero-title display reveal mt-[22px] text-[clamp(4.2rem,10vw,8.6rem)] leading-[0.82] tracking-[-0.08em] text-white">
                  <span className="heat-wave block">Prime</span>
                  <span className="heat-wave block">Gravity</span>
                </h1>

                <p className="hero-text reveal mt-5 text-[16px] leading-[1.95] text-white/82">
                  An ultra-premium burger atelier shaped by hydro-suspension plating, textural layering, and a grill rhythm that feels engineered rather than served.
                </p>

                <div className="specs reveal mt-[22px] flex flex-wrap gap-[10px]">
                  <span className="border border-white/8 bg-white/6 px-3 py-[10px] text-[10px] uppercase tracking-[0.2em] text-white/72">Charcoal Black</span>
                  <span className="border border-white/8 bg-white/6 px-3 py-[10px] text-[10px] uppercase tracking-[0.2em] text-white/72">Molten Cheddar</span>
                  <span className="border border-white/8 bg-white/6 px-3 py-[10px] text-[10px] uppercase tracking-[0.2em] text-white/72">Jalapeño Finish</span>
                </div>

                <div className="hero-cta reveal mt-[26px] flex flex-wrap gap-3">
                  <button className="sizzle h-[54px] rounded-[1rem] border border-[rgba(235,170,84,.24)] bg-[linear-gradient(180deg,rgba(235,170,84,.24),rgba(255,255,255,.06))] px-5 text-[10px] uppercase tracking-[0.28em] text-white shadow-[inset_0_1px_0_rgba(255,255,255,.08),0_20px_48px_rgba(0,0,0,.34)] transition duration-[450ms] ease-[cubic-bezier(.16,1,.3,1)] hover:-translate-y-1 hover:border-[rgba(235,170,84,.4)] hover:shadow-[inset_0_1px_0_rgba(255,255,255,.08),0_26px_60px_rgba(0,0,0,.42),0_0_0_1px_rgba(235,170,84,.12)]">
                    Sizzle-Glow Menu
                  </button>
                  <button className="textured-touch h-[54px] rounded-[1rem] border border-white/12 bg-[linear-gradient(180deg,rgba(227,178,104,.88),rgba(183,122,59,.82))] px-5 text-[10px] uppercase tracking-[0.28em] text-[#1c140d] shadow-[inset_0_1px_0_rgba(255,255,255,.4),inset_0_-12px_18px_rgba(0,0,0,.08),0_20px_48px_rgba(0,0,0,.3)]">
                    View ingredients
                  </button>
                </div>
              </div>
            </div>

            <div className="hero-visual relative z-[10] min-h-[100svh] overflow-hidden">
              <div className="splash-shell absolute left-1/2 top-1/2 flex h-[110%] w-[120%] -translate-x-1/2 -translate-y-1/2 items-center justify-center">
                <video ref={heroVideoRef} autoPlay muted loop playsInline className="h-full w-full object-cover object-center [mask-image:linear-gradient(to_right,transparent_0%,black_15%,black_70%,transparent_90%)] [-webkit-mask-image:linear-gradient(to_right,transparent_0%,black_15%,black_70%,transparent_90%)]">
                  <source src="/video.mp4" type="video/mp4" />
                </video>
                <div className="sauce-glow absolute inset-0 bg-[radial-gradient(circle_at_18%_26%,rgba(0,0,0,0.28),transparent_18%),radial-gradient(circle_at_52%_24%,rgba(255,228,195,.12),transparent_16%),radial-gradient(circle_at_70%_62%,rgba(110,208,76,.16),transparent_16%),linear-gradient(180deg,rgba(0,37,32,0.08),rgba(0,0,0,.4))]" />
              </div>

              <div className="heat-scrim absolute left-0 top-0 bottom-0 z-[28] w-[42%] bg-[linear-gradient(90deg,rgba(12,12,12,.64),rgba(12,12,12,.32)_55%,transparent_100%)]" />

              <div className="ingredient-field absolute inset-0 z-[22] overflow-hidden">
                {[
                  ["seed", "--x0:60vw;--y0:14vh;--x1:8vw;--y1:32vh;--r0:-12deg;--r1:16deg;left:58%;top:12%"],
                  ["seed", "--x0:62vw;--y0:22vh;--x1:12vw;--y1:44vh;--r0:14deg;--r1:-12deg;left:64%;top:18%"],
                  ["seed", "--x0:66vw;--y0:36vh;--x1:18vw;--y1:48vh;--r0:-8deg;--r1:8deg;left:70%;top:28%"],
                  ["seed", "--x0:58vw;--y0:48vh;--x1:14vw;--y1:58vh;--r0:10deg;--r1:-10deg;left:54%;top:38%"],
                  ["seed", "--x0:72vw;--y0:24vh;--x1:24vw;--y1:38vh;--r0:-14deg;--r1:14deg;left:76%;top:20%"],
                  ["drip", "--x0:68vw;--y0:18vh;--x1:18vw;--y1:26vh;--r0:-24deg;--r1:20deg;left:67%;top:14%"],
                  ["drip", "--x0:74vw;--y0:30vh;--x1:22vw;--y1:46vh;--r0:18deg;--r1:-22deg;left:74%;top:24%"],
                  ["drip", "--x0:70vw;--y0:50vh;--x1:16vw;--y1:56vh;--r0:-18deg;--r1:10deg;left:72%;top:42%"],
                  ["seed", "--x0:76vw;--y0:18vh;--x1:28vw;--y1:20vh;--r0:7deg;--r1:-7deg;left:81%;top:14%"],
                  ["seed", "--x0:78vw;--y0:44vh;--x1:30vw;--y1:52vh;--r0:-10deg;--r1:12deg;left:84%;top:36%"],
                ].map(([type, style], index) => (
                  <span
                    key={`${type}-${index}`}
                    className={`${type} absolute ${type === "seed" ? "h-[4px] w-[10px] rounded-[2px] bg-[rgba(255,242,216,.9)]" : "h-[6px] w-[18px] rounded-[2px] bg-[rgba(255,126,40,.9)]"}`}
                    style={{
                      animation: "flight 10s linear infinite",
                      ...Object.fromEntries(
                        style.split(";").filter(Boolean).map((pair) => {
                          const [k, v] = pair.split(":");
                          return [k, v];
                        })
                      ),
                    } as React.CSSProperties}
                  />
                ))}
              </div>

              <div className="relative z-[30] flex h-full items-center">
                <div className="w-[42%] px-4 md:px-8">
                  <div className="smoked rounded-[1.2rem] p-5">
                    <div className="copy text-[10px] uppercase tracking-[0.32em] text-white/58">Hydro-suspension plating</div>
                    <p className="mt-4 copy text-sm leading-7 text-white/80">
                      Sauce droplets and sesame seeds move behind the narrative like a live flame line, bending the air around the typography.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="assembly" className="section py-[120px]">
          <div className="ledger shell relative mx-auto w-[min(1600px,calc(100%-32px))]">
            <div className="ledger-head assemble mb-[26px] flex items-end justify-between gap-6 max-lg:flex-col max-lg:items-start">
              <div>
                <div className="copy text-[10px] uppercase tracking-[0.34em] text-white/50">Assembly Ledger</div>
                <h2 className="display mt-5 text-[clamp(2.8rem,5.7vw,6rem)] leading-[0.88] tracking-[-0.07em] text-white">
                  Built like a production line, plated like a signature dish.
                </h2>
              </div>
              <p className="max-w-[420px] leading-[1.95] text-white/66">
                Each stage follows the heat, not a grid. The sequence moves as a drip of sauce, with every layer assembled on scroll.
              </p>
            </div>

            <div className="space-y-5">
              {strips.map((strip) => (
                <article key={strip.metric} data-rise className="assemble strip relative overflow-hidden border-y border-white/9 py-[22px] opacity-0">
                  <div className="grid items-end gap-[18px] lg:grid-cols-[.9fr_1.1fr_.4fr]">
                    <div>
                      <div className="label text-[10px] uppercase tracking-[0.3em] text-white/55">{strip.label}</div>
                      <h3 className="display mt-3 text-[clamp(1.8rem,3.2vw,3.4rem)] leading-[0.94] tracking-[-0.05em] text-white">
                        {strip.title}
                      </h3>
                      <p className="mt-4 max-w-[48ch] leading-[1.9] text-white/68">{strip.text}</p>
                    </div>
                    <div className="display justify-self-start text-[clamp(3rem,6vw,5.4rem)] leading-none tracking-[-0.08em] text-white/14 lg:justify-self-end">
                      {strip.metric}
                    </div>
                    <div className="self-end text-[10px] uppercase tracking-[0.28em] text-white/50 lg:text-right">
                      {strip.note}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="stack" className="text-stack py-[120px] bg-[radial-gradient(circle_at_18%_18%,rgba(255,153,60,.09),transparent_18%),radial-gradient(circle_at_84%_28%,rgba(118,204,86,.08),transparent_16%),linear-gradient(180deg,rgba(17,17,17,.55),rgba(8,8,8,.92))]">
          <div className="text-stack-shell mx-auto grid w-[min(1600px,calc(100%-32px))] gap-6 lg:grid-cols-[1.05fr_.95fr] lg:items-start">
            <div className="recipe-wall reveal border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,.06),rgba(255,255,255,.025)),linear-gradient(135deg,rgba(255,255,255,.035),transparent_42%)] p-12 shadow-[0_24px_80px_rgba(0,0,0,.34)] max-lg:p-6">
              <div className="copy text-[10px] uppercase tracking-[0.34em] text-white/48">Flavor Stack</div>
              <h2 className="display mt-5 text-[clamp(3rem,6vw,6rem)] leading-[0.88] tracking-[-0.07em] text-white">
                Ingredients suspended in a luxury of heat and texture.
              </h2>
              <p className="mt-5 max-w-[680px] text-[16px] leading-[2] text-white/68">
                The room opens into a rhythm of stacked materials: brioche warmth, charcoal edge, molten cheddar, and a clean jalapeño finish that keeps the palette alive.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                {tags.map((tag) => (
                  <span key={tag} className="border border-white/8 bg-white/6 px-3 py-[10px] text-[10px] uppercase tracking-[0.2em] text-white/70">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="layer-rail relative flex flex-col gap-4 pt-4">
              {layers.map((layer, index) => (
                <div
                  key={layer.tag}
                  data-rise
                  className={`layer min-h-[128px] opacity-0 border border-white/7 bg-[linear-gradient(180deg,rgba(255,255,255,.08),rgba(255,255,255,.03)),linear-gradient(135deg,rgba(255,255,255,.05),transparent_65%)] p-[20px_22px] shadow-[0_18px_44px_rgba(0,0,0,.24)] transition duration-[450ms] ease-[cubic-bezier(.16,1,.3,1)] ${index === 1 ? "ml-[6%]" : index === 2 ? "ml-[12%]" : index === 3 ? "ml-[4%]" : ""}`}
                >
                  <div className="top flex items-start justify-between gap-[18px]">
                    <div>
                      <div className="tag text-[10px] uppercase tracking-[0.28em] text-white/55">{layer.tag}</div>
                      <div className="name display mt-2 text-[clamp(1.5rem,2.8vw,2.7rem)] leading-[0.95] tracking-[-0.05em] text-white">
                        {layer.name}
                      </div>
                    </div>
                    <div className="copy text-[10px] uppercase tracking-[0.28em] text-white/50">{layer.right}</div>
                  </div>
                  <div className="bar mt-3 h-2 overflow-hidden bg-white/8">
                    <span className="block h-full bg-[linear-gradient(90deg,rgba(255,153,60,.75),rgba(118,204,86,.75))]" style={{ width: layer.width }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="finish" className="finish py-[120px] pb-[110px]">
          <div className="finish-shell mx-auto grid w-[min(1600px,calc(100%-32px))] gap-6 lg:grid-cols-[1.2fr_.8fr] lg:items-stretch">
            <div className="menu-board reveal border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,.065),rgba(255,255,255,.02)),linear-gradient(135deg,rgba(235,170,84,.08),transparent_35%,rgba(118,204,86,.06)_75%)] p-14 shadow-[0_22px_70px_rgba(0,0,0,.34)] max-lg:p-6">
              <div className="copy text-[10px] uppercase tracking-[0.34em] text-white/48">Service Finish</div>
              <h2 className="display mt-5 text-[clamp(3rem,6vw,6rem)] leading-[0.88] tracking-[-0.07em] text-white">
                A dining room tuned for texture, heat, and precision.
              </h2>
              <p className="mt-5 max-w-[740px] leading-[2] text-white/68">
                The final sequence settles into a warm, shadowed dining environment where each reservation feels like a backstage pass to the grill.
              </p>
              <div className="board-actions mt-7 flex flex-wrap gap-3">
                <button className="sizzle h-[54px] rounded-[1rem] border border-[rgba(235,170,84,.24)] bg-[linear-gradient(180deg,rgba(235,170,84,.24),rgba(255,255,255,.06))] px-5 text-[10px] uppercase tracking-[0.28em] text-white shadow-[inset_0_1px_0_rgba(255,255,255,.08),0_20px_48px_rgba(0,0,0,.34)] transition duration-[450ms] ease-[cubic-bezier(.16,1,.3,1)] hover:-translate-y-1 hover:border-[rgba(235,170,84,.4)] hover:shadow-[inset_0_1px_0_rgba(255,255,255,.08),0_26px_60px_rgba(0,0,0,.42),0_0_0_1px_rgba(235,170,84,.12)]">
                  Reserve a table
                </button>
                <button className="textured-touch h-[54px] rounded-[1rem] border border-white/12 bg-[linear-gradient(180deg,rgba(227,178,104,.88),rgba(183,122,59,.82))] px-5 text-[10px] uppercase tracking-[0.28em] text-[#1c140d] shadow-[inset_0_1px_0_rgba(255,255,255,.4),inset_0_-12px_18px_rgba(0,0,0,.08),0_20px_48px_rgba(0,0,0,.3)]">
                  Explore the atelier
                </button>
              </div>
            </div>

            <div className="info-stack flex flex-col gap-4">
              {info.map((item) => (
                <div key={item.label} data-rise className="info reveal min-h-[160px] border border-white/8 bg-white/5 p-6 shadow-[0_18px_44px_rgba(0,0,0,.24)]">
                  <div className="label text-[10px] uppercase tracking-[0.28em] text-white/52">{item.label}</div>
                  <div className="value display mt-4 text-[clamp(2.4rem,4vw,4.2rem)] leading-[0.92] tracking-[-0.06em] text-white">{item.value}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="shell mx-auto mt-8 w-[min(1600px,calc(100%-32px))]">
            <div className="footer-line h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,.22),transparent)]" />
          </div>

          <div className="foot pb-[84px] pt-8">
            <div className="foot-shell reveal mx-auto w-[min(1600px,calc(100%-32px))] border border-white/8 bg-white/4 px-8 py-8 shadow-[0_22px_70px_rgba(0,0,0,.22)] max-lg:px-6">
              <div className="foot-grid flex flex-wrap items-end justify-between gap-6">
                <div className="left max-w-[760px]">
                  <h3 className="display text-[clamp(2.2rem,4vw,4.6rem)] leading-[0.92] tracking-[-0.06em] text-white">
                    Prime Gravity finishes where the smoke clears.
                  </h3>
                  <p className="mt-4 leading-[1.95] text-white/68">
                    A tactile, high-contrast burger atelier built around heat, structure, and a precise material language that feels plated rather than served.
                  </p>
                </div>
                <div className="tags flex flex-wrap justify-end gap-3">
                  {tags.map((tag) => (
                    <span key={tag} className="border border-white/8 bg-white/6 px-3 py-[10px] text-[10px] uppercase tracking-[0.2em] text-white/72">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;600;700;800&family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&display=swap');

        :root {
          color-scheme: dark;
          --bg: oklch(12% 0.05 30);
          --bg2: oklch(15% 0.04 30);
          --charcoal: oklch(18% 0.03 30);
          --ochre: oklch(76% 0.14 68);
          --cheddar: oklch(72% 0.17 54);
          --jalapeno: oklch(67% 0.14 145);
          --ink: oklch(97% 0.01 30);
          --muted: rgba(255, 255, 255, .66);
        }

        * {
          box-sizing: border-box;
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          margin: 0;
          overflow-x: hidden;
          font-family: 'Inter Tight', sans-serif;
          background:
            radial-gradient(circle at 18% 10%, rgba(222, 141, 57, .13), transparent 16%),
            radial-gradient(circle at 82% 14%, rgba(90, 176, 84, .08), transparent 14%),
            linear-gradient(180deg, oklch(12% 0.05 30) 0%, oklch(10% 0.045 30) 48%, oklch(8% 0.04 30) 100%);
          color: white;
        }

        body::before {
          content: '';
          position: fixed;
          inset: 0;
          pointer-events: none;
          background-image:
            linear-gradient(rgba(255, 255, 255, .03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, .03) 1px, transparent 1px),
            linear-gradient(135deg, transparent 0 48%, rgba(255, 255, 255, .025) 48% 52%, transparent 52%);
          background-size: 120px 120px, 120px 120px, 280px 280px;
          opacity: .22;
          z-index: -2;
        }

        .display {
          font-family: 'Fraunces', serif;
          letter-spacing: -.06em;
        }

        .copy {
          font-family: 'Inter Tight', sans-serif;
        }

        .smoked {
          background: rgba(255, 255, 255, .06);
          border: 1px solid rgba(255, 255, 255, .09);
          backdrop-filter: blur(20px) contrast(.95);
          -webkit-backdrop-filter: blur(20px) contrast(.95);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, .08), 0 18px 60px rgba(0, 0, 0, .35);
        }

        .textured-touch {
          position: relative;
          overflow: hidden;
          border-radius: 1rem;
          transition: transform .45s cubic-bezier(.16, 1, .3, 1), box-shadow .45s ease;
        }

        .textured-touch::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(135deg, rgba(0, 0, 0, .12) 0 1px, transparent 1px 100%),
            linear-gradient(45deg, rgba(0, 0, 0, .06) 0 1px, transparent 1px 100%);
          opacity: .28;
          pointer-events: none;
          mix-blend-mode: multiply;
        }

        .textured-touch::after {
          content: '';
          position: absolute;
          inset: -110%;
          background:
            radial-gradient(circle at 30% 40%, rgba(255, 255, 255, .35), transparent 16%),
            radial-gradient(circle at 55% 60%, rgba(255, 255, 255, .18), transparent 20%),
            linear-gradient(120deg, transparent 44%, rgba(255, 255, 255, .72) 50%, transparent 56%);
          transform: translateX(-140%) rotate(12deg);
          animation: sheen 8s ease-in-out infinite;
          pointer-events: none;
          mix-blend-mode: screen;
          filter: blur(.2px);
        }

        .textured-touch:hover {
          transform: translateY(-4px);
        }

        .textured-touch:active {
          transform: translateY(1px) scale(.99);
        }

        .sizzle {
          position: relative;
          overflow: hidden;
          transition: transform .45s cubic-bezier(.16, 1, .3, 1), box-shadow .45s ease, border-color .35s ease;
        }

        .sizzle::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle at 20% 30%, rgba(255, 255, 255, .18), transparent 12%),
            radial-gradient(circle at 70% 68%, rgba(255, 255, 255, .12), transparent 10%),
            radial-gradient(circle at 55% 45%, rgba(255, 255, 255, .14), transparent 10%);
          opacity: 0;
          transform: scale(.9);
          transition: .5s ease;
          pointer-events: none;
        }

        .sizzle::after {
          content: '';
          position: absolute;
          inset: -100%;
          background: linear-gradient(120deg, transparent 46%, rgba(255, 255, 255, .58) 50%, transparent 54%);
          transform: translateX(-130%) rotate(10deg);
          animation: sheen 9s ease-in-out infinite;
          pointer-events: none;
          mix-blend-mode: screen;
        }

        .sizzle:hover {
          transform: translateY(-4px);
        }

        .sizzle:hover::before {
          opacity: 1;
          transform: scale(1.2);
        }

        .slat-nav::-webkit-scrollbar,
        .macro-track::-webkit-scrollbar {
          display: none;
        }

        .slat-nav,
        .macro-track,
        .scrollbar-none {
          scrollbar-width: none;
        }

        .hero {
          position: relative;
          min-height: 100svh;
          background: var(--bg);
          overflow: hidden;
        }

        .hero-copy-inner {
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, .08), 0 24px 60px rgba(0, 0, 0, .38);
        }

        .hero-kicker span {
          width: 8px;
          height: 8px;
          background: var(--ochre);
          display: inline-block;
        }

        .heat-wave {
          display: inline-block;
          animation: heatWave 6.5s ease-in-out infinite;
          transform-origin: left center;
        }

        .hero-visual {
          min-height: 100svh;
        }

        .ingredient-field {
          pointer-events: none;
        }

        .seed,
        .drip {
          animation: flight 10s linear infinite;
          filter: drop-shadow(0 0 8px rgba(255, 193, 85, .12));
        }

        .section {
          padding: 120px 0;
        }

        .ledger::before {
          content: '';
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255, 153, 60, .35), rgba(118, 204, 86, .24), transparent);
        }

        .strip {
          position: relative;
          overflow: hidden;
        }

        .strip::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, rgba(255, 153, 60, .08), transparent 35%, rgba(118, 204, 86, .06) 75%, transparent 100%);
          opacity: .55;
          pointer-events: none;
        }

        .text-stack {
          background:
            radial-gradient(circle at 18% 18%, rgba(255, 153, 60, .09), transparent 18%),
            radial-gradient(circle at 84% 28%, rgba(118, 204, 86, .08), transparent 16%),
            linear-gradient(180deg, rgba(17, 17, 17, .55), rgba(8, 8, 8, .92));
        }

        .layer {
          opacity: 0;
          transform: translateX(0);
        }

        .layer.in {
          animation: assembleIn .9s cubic-bezier(.16, 1, .3, 1) forwards;
        }

        .footer-line {
          height: 1px;
        }

        .reveal {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity .8s ease, transform .8s cubic-bezier(.16, 1, .3, 1);
        }

        .reveal.in {
          opacity: 1;
          transform: translateY(0);
        }

        .assemble {
          opacity: 0;
          transform: translateY(30px);
        }

        .assemble.in {
          animation: assembleIn .9s cubic-bezier(.16, 1, .3, 1) forwards;
        }

        @keyframes assembleIn {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes heatWave {
          0%,
          100% {
            transform: translateX(0) skewX(0deg);
          }

          25% {
            transform: translateX(1px) skewX(-1deg);
          }

          50% {
            transform: translateX(-1px) skewX(1deg);
          }

          75% {
            transform: translateX(.5px) skewX(-.6deg);
          }
        }

        @keyframes sheen {
          to {
            transform: translateX(240%) rotate(12deg);
          }
        }

        @keyframes flight {
          0% {
            transform: translate3d(var(--x0), var(--y0), 0) rotate(var(--r0));
            opacity: 0;
          }

          10% {
            opacity: 1;
          }

          100% {
            transform: translate3d(var(--x1), var(--y1), 0) rotate(var(--r1));
            opacity: 0;
          }
        }

        ::view-transition-old(root),
        ::view-transition-new(root) {
          animation-duration: .72s;
          animation-timing-function: cubic-bezier(.16, 1, .3, 1);
        }

        @media (max-width: 1180px) {
          .slat-inner {
            grid-template-columns: 1fr auto;
          }

          .slat-nav {
            display: none;
          }

          .hero-grid {
            grid-template-columns: 1fr;
            padding-top: 96px;
          }

          .hero-copy {
            justify-content: flex-start;
            padding: 36px 0 18px;
          }

          .hero-visual {
            min-height: 70vh;
            order: -1;
          }

          .heat-scrim {
            width: 55%;
          }

          .text-stack-shell,
          .finish-shell,
          .footer-shell {
            grid-template-columns: 1fr;
          }

          .strip {
            grid-template-columns: 1fr auto;
          }
        }

        @media (max-width: 760px) {
          .slat-inner,
          .hero-grid,
          .shell,
          .text-stack-shell,
          .finish-shell {
            width: min(100% - 20px, 1600px);
          }

          .hero-copy-inner,
          .recipe-wall,
          .menu-board {
            padding: 24px;
          }

          .hero-title {
            font-size: clamp(3.2rem, 16vw, 6rem);
          }

          .ledger-head,
          .foot-grid {
            flex-direction: column;
            align-items: flex-start;
          }

          .strip {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
