"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";

const navItems = [
  { label: "Dual-Stream", href: "#dual" },
  { label: "Telemetry", href: "#telemetry" },
  { label: "Ledger", href: "#ledger" },
];

const dualRows = [
  ["01", "Invoice ingestion", "8 ms"],
  ["02", "Entity mapping", "12 ms"],
  ["03", "Liquidity sweep", "19 ms"],
  ["04", "Settlement route", "41 ms"],
];

const telemetryCards = [
  {
    span: "tile wide tall reveal",
    tag: "Cash flow",
    code: "Q1 / LIVE",
    title: "Real-time liquidity telemetry",
    text: "Watch available cash shift across operating units as treasury logic reconciles every movement in near real time.",
    path1:
      "M0 56 L80 54 L136 58 L192 44 L248 48 L304 28 L360 36 L416 20 L472 26 L528 14 L584 24 L640 16 L704 20 L800 10",
    path2:
      "M0 72 L80 70 L136 74 L192 64 L248 66 L304 50 L360 56 L416 42 L472 46 L528 34 L584 40 L640 32 L704 36 L800 28",
    wide: true,
  },
  {
    tag: "Approvals",
    code: "N-01",
    title: "Control tower routing",
    text: "Payment decisions are scored and routed with strict policy alignment and deterministic thresholds.",
    path1: "M0 62 L84 52 L172 58 L248 30 L332 38 L404 22 L520 18",
  },
  {
    tag: "Compliance",
    code: "S-04",
    title: "Policy boundary checks",
    text: "Every rule is explicit, observable, and ready for audit without sacrificing operational speed.",
    path1: "M0 58 L70 58 L112 46 L168 46 L220 34 L292 34 L350 22 L420 22 L520 18",
  },
  {
    span: "tile wide reveal",
    tag: "Entity consolidation",
    code: "M-09",
    title: "Multi-entity operating view",
    text: "One plane for subsidiaries, regions, and bank accounts, all condensed into a single financial instrument.",
    path1:
      "M0 62 L88 66 L146 50 L210 56 L282 32 L348 42 L420 22 L492 28 L574 16 L660 26 L800 14",
    wide: true,
  },
  {
    tag: "Automation",
    code: "R-14",
    title: "Asynchronous ledger processing",
    text: "Queue depth remains visible while entries settle in the background with zero interface stutter.",
    path1: "M0 62 L96 62 L156 48 L220 48 L286 28 L352 28 L430 16 L520 16",
  },
  {
    tag: "Routing",
    code: "R-21",
    title: "Global settlement lanes",
    text: "Transfer paths adapt to region, currency, and account structure while remaining traceable from start to finish.",
    path1: "M0 66 L66 58 L124 62 L186 40 L244 44 L310 24 L372 30 L440 16 L520 10",
  },
];

export default function Page() {
  const heroVideoRef = useRef<HTMLVideoElement | null>(null);
  const heroRef = useRef<HTMLDivElement | null>(null);
  const featuresRef = useRef<HTMLDivElement | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const updateHero = () => {
      const progress = Math.min(window.scrollY / (window.innerHeight * 1.2), 1);
      const scale = 1.06 + progress * 0.12;
      const translate = progress * 18;

      if (heroVideoRef.current) {
        heroVideoRef.current.style.transform = `scale(${scale}) translateY(${translate}px)`;
      }
    };

    const onScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 50);

      if (heroRef.current) {
        heroRef.current.style.transform = `translateY(${scrollY * 0.4}px)`;
        heroRef.current.style.opacity = `${Math.max(0, 1 - scrollY / 600)}`;
      }

      if (featuresRef.current) {
        featuresRef.current.style.transform = `translateY(-${scrollY * 0.15}px)`;
      }

      updateHero();
    };

    const animateCount = (el: HTMLElement) => {
      const target = parseFloat(el.dataset.count || "0");
      const duration = 1300;
      const start = performance.now();

      const step = (now: number) => {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        const value = target * eased;
        el.textContent = target >= 10 ? Math.round(value).toLocaleString() : value.toFixed(1);
        if (p < 1) requestAnimationFrame(step);
      };

      requestAnimationFrame(step);
    };

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            const countEls = entry.target.querySelectorAll("[data-count]");
            countEls.forEach((el) => animateCount(el as HTMLElement));
          }
        });
      },
      { threshold: 0.18 }
    );

    document.querySelectorAll(".reveal, .tile").forEach((el) => revealObserver.observe(el));

    const lines = document.querySelectorAll(".hero-title .line span");
    const baseDelay = 110;
    lines.forEach((node, i) => {
      const el = node as HTMLElement;
      const text = el.dataset.text || el.textContent || "";
      el.textContent = "";
      const chars = text.split("");
      chars.forEach((ch, index) => {
        setTimeout(() => {
          el.textContent += ch;
          el.classList.add("typed");
        }, baseDelay + i * 180 + index * 18);
      });
    });

    updateHero();
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      revealObserver.disconnect();
    };
  }, []);

  const handleLiquidMove = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    const target = e.currentTarget;
    const rect = target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    target.style.setProperty("--x", `${x}px`);
    target.style.setProperty("--y", `${y}px`);
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[linear-gradient(180deg,var(--white)_0%,var(--white-2)_100%)] text-[var(--ink)] antialiased">
      <svg width="0" height="0" aria-hidden="true" focusable="false" className="absolute">
        <defs>
          <filter id="maskFeather">
            <feGaussianBlur stdDeviation="0.03" />
          </filter>
          <mask id="dataPulseMask" maskUnits="objectBoundingBox" maskContentUnits="objectBoundingBox">
            <rect x="0" y="0" width="1" height="1" fill="black" />
            <g filter="url(#maskFeather)">
              <path
                d="M0.02,0.14 C0.17,0.05 0.28,0.02 0.40,0.08 C0.50,0.13 0.60,0.09 0.69,0.06 C0.81,0.02 0.95,0.10 0.98,0.24 C1.00,0.33 0.92,0.40 0.95,0.50 C0.99,0.61 0.95,0.74 0.89,0.82 C0.82,0.91 0.70,0.98 0.58,0.95 C0.47,0.93 0.39,0.98 0.28,0.98 C0.15,0.98 0.04,0.91 0.02,0.79 C0.00,0.68 0.05,0.58 0.02,0.47 C0.00,0.39 -0.01,0.20 0.02,0.14 Z"
                fill="white"
              />
            </g>
            <path
              d="M0.04,0.16 C0.17,0.08 0.28,0.05 0.40,0.10 C0.52,0.15 0.62,0.12 0.71,0.09 C0.82,0.06 0.93,0.13 0.96,0.25 C0.98,0.34 0.91,0.40 0.94,0.50 C0.97,0.61 0.93,0.73 0.88,0.81 C0.81,0.90 0.71,0.96 0.59,0.94 C0.48,0.92 0.39,0.96 0.29,0.96 C0.16,0.96 0.05,0.89 0.04,0.79 C0.02,0.69 0.06,0.58 0.04,0.48 C0.02,0.39 0.01,0.20 0.04,0.16 Z"
              fill="white"
              opacity=".86"
            />
          </mask>
        </defs>
      </svg>

      <div className="fixed inset-x-0 top-0 z-[80] border-b border-black/8 bg-white/82 backdrop-blur-[14px] brightness-[1.02]">
        <div className="mx-auto grid min-h-16 w-[min(1600px,calc(100%-28px))] grid-cols-[auto_1fr_auto] items-center gap-4">
          <div className="flex min-w-0 items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-[3px] border border-black/12 bg-[linear-gradient(180deg,rgba(255,255,255,.98),rgba(247,247,247,.9))]">
              <Icon icon="ph:bank-bold" className="text-xl text-[#4a87ff]" />
            </div>
            <div className="min-w-0">
              <div className="text-[11px] uppercase text-black/55">Flux Capital</div>
              <div className="mt-1 truncate text-sm text-black/86">Real-Time Financial Intelligence</div>
            </div>
          </div>

          <nav className="hidden justify-center gap-5 overflow-x-auto text-[10px] uppercase text-black/55 lg:flex [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {navItems.map((item) => (
              <a key={item.label} href={item.href} className="transition hover:text-[var(--slate)]">
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden h-2 w-[220px] overflow-hidden rounded-[2px] bg-black/8 sm:block">
              <span className="block h-full w-[78%] bg-[linear-gradient(90deg,rgba(65,120,196,.88),rgba(116,165,255,.98))]" />
            </div>
            <button onMouseMove={handleLiquidMove} className="aero h-10 rounded-[3px] border border-black/12 bg-[linear-gradient(180deg,rgba(255,255,255,.98),rgba(246,246,246,.86))] px-4 text-[10px] uppercase text-black/84 shadow-[inset_0_1px_0_rgba(255,255,255,.9)] transition hover:-translate-y-0.5 hover:border-[rgba(74,145,255,.4)] hover:shadow-[inset_0_1px_0_rgba(255,255,255,.96),0_0_0_1px_rgba(74,145,255,.14)]">
              Open Console
            </button>
          </div>
        </div>
      </div>

      <main>
        <section className="hero relative min-h-[100svh] overflow-hidden pt-16">
          <div className="video-shell absolute inset-0 z-[1] overflow-hidden [mask-image:linear-gradient(to_right,transparent_0%,transparent_20%,black_55%,black_100%)] [-webkit-mask-image:linear-gradient(to_right,transparent_0%,transparent_20%,black_55%,black_100%)]">
            <video ref={heroVideoRef} autoPlay muted loop playsInline className="h-full w-full scale-[1.06] object-cover will-change-transform">
              <source src="/video.mp4" type="video/mp4" />
            </video>
          </div>

          <div className="absolute inset-0 z-[2] pointer-events-none bg-[radial-gradient(circle_at_18%_20%,rgba(255,255,255,.18),transparent_16%),radial-gradient(circle_at_65%_28%,rgba(77,143,255,.2),transparent_14%),linear-gradient(180deg,rgba(255,255,255,.08),rgba(0,0,0,.18))]" />
          <div className="absolute inset-0 z-[3] pointer-events-none mix-blend-screen bg-[linear-gradient(90deg,rgba(255,255,255,.22),transparent_24%)]" />

          <div className="relative z-10 mx-auto grid min-h-[calc(100svh-64px)] w-[min(1600px,calc(100%-28px))] grid-cols-1 lg:grid-cols-2">
            <div ref={heroRef} className="hero-copy flex items-center py-20 lg:pr-6 will-change-transform" data-reveal>
              <div className="hero-copy-inner w-full max-w-[640px] pr-0 lg:pr-6">
                <div className="reveal inline-flex items-center gap-3 rounded-[3px] border border-black/8 bg-white/72 px-4 py-2 text-[10px] uppercase text-black/62 backdrop-blur-md">
                  <span className="inline-block h-2 w-2 bg-[var(--blue)]" />
                  Asynchronous ledger processing · fiscal-neural mapping
                </div>

                <h1 className="hero-title display reveal mt-6 text-[clamp(4.6rem,8.8vw,8.8rem)] font-black leading-[0.86] text-[#080808]">
                  <span className="line block overflow-hidden">
                    <span data-text="Flux Capital">Flux Capital</span>
                  </span>
                  <span className="line block overflow-hidden">
                    <span data-text="Real-Time Financial Intelligence">Real-Time Financial Intelligence</span>
                  </span>
                </h1>

                <p className="hero-copy-text reveal mt-6 max-w-[560px] text-[16px] leading-[2] text-black/72">
                  A precision-built B2B banking and invoice platform for multi-entity consolidation, liquidity telemetry, and fast-moving financial operations.
                </p>

                <div className="hero-specs reveal mt-5 flex flex-wrap gap-3">
                  <span className="rounded-[3px] border border-black/8 bg-white/84 px-3 py-2 text-[10px] uppercase text-black/62">Clinical White</span>
                  <span className="rounded-[3px] border border-black/8 bg-white/84 px-3 py-2 text-[10px] uppercase text-black/62">Slate Blue</span>
                  <span className="rounded-[3px] border border-black/8 bg-white/84 px-3 py-2 text-[10px] uppercase text-black/62">Graphite Grey</span>
                </div>

                <div className="hero-actions reveal mt-7 flex flex-wrap gap-3">
                  <button onMouseMove={handleLiquidMove} className="aero h-[46px] rounded-[3px] border-none bg-[linear-gradient(180deg,rgba(255,255,255,.98),rgba(246,246,246,.86))] px-[18px] text-[10px] uppercase text-black/84">
                    Start Free Trial
                  </button>
                  <button onMouseMove={handleLiquidMove} className="aero h-[46px] rounded-[3px] border-none bg-[linear-gradient(180deg,rgba(255,255,255,.98),rgba(246,246,246,.86))] px-[18px] text-[10px] uppercase text-black/84">
                    View Banking Flow
                  </button>
                </div>
              </div>
            </div>

            <div className="hero-side relative min-h-[72vh]">
              <div className="ticker-stack absolute inset-y-5 right-[18px] z-[6] flex w-[min(360px,46%)] flex-col gap-3">
                {[
                  { label: "Liquidity", value: 428, small: "Real-time liquidity telemetry across all operating entities.", mode: "LIVE" },
                  { label: "Invoices", value: 12.8, small: "Asynchronous ledger processing with automated reconciliation.", mode: "SYNC" },
                  { label: "AUM", value: 94.2, small: "Global asset overlays projected from the dual-monitor workstation.", mode: "UTC" },
                ].map((item) => (
                  <div key={item.label} className="ticker reveal rounded-[3px] border border-white/12 bg-white/10 p-4 text-white backdrop-blur-[40px] brightness-[1.1] shadow-[inset_0_1px_0_rgba(255,255,255,.1)]">
                    <div className="top flex items-center justify-between gap-4 text-[10px] uppercase text-black">
                      <span>{item.label}</span>
                      <span className="mono">{item.mode}</span>
                    </div>
                    <div className="value display mt-3 text-[28px] leading-none text-[#050505]" data-count={item.value}>
                      0
                    </div>
                    <div className="small mono mt-2 text-[13px] leading-[1.7] text-black">{item.small}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="dual" className="section py-[110px]">
          <div className="shell mx-auto w-[min(1600px,calc(100%-28px))]">
            <div className="section-h reveal mb-[26px] flex items-end justify-between gap-[22px] max-[1180px]:flex-col max-[1180px]:items-start">
              <div>
                <div className="mono text-[10px] uppercase tracking-[0.34em] text-black/50">The Dual-Stream</div>
                <h2 className="display mt-5 text-black text-[clamp(2.6rem,5.2vw,5.8rem)] leading-[0.88]">
                  Two operational streams, one financial surface.
                </h2>
              </div>
              <p className="max-w-[430px] leading-[1.95] text-black/66">
                Technical data sits on the left while monitored outcomes and invoice activity populate the right, like mirrored workstations inside a compliance cockpit.
              </p>
            </div>

            <div className="dual-stream grid grid-cols-1 gap-[18px] lg:grid-cols-[.45fr_.55fr]">
              <div className="ledger-panel reveal rounded-[3px] border border-black/8 bg-[linear-gradient(180deg,rgba(255,255,255,.95),rgba(248,248,248,.84))] p-[38px]">
                <div className="label text-[10px] uppercase text-black/54">System ledger</div>
                <h3 className="display mt-4 text-[clamp(2rem,4vw,4.3rem)] leading-[0.9] text-[#050505]">
                  Every entity, invoice, and payment thread stays aligned.
                </h3>
                <p className="mt-5 max-w-[52ch] leading-[2] text-black/68">
                  Flux Capital manages multi-entity consolidation through a clean audit layer, visible state transitions, and deterministic control over cash movement.
                </p>

                <div className="audit-list mt-6 border-t border-black/8">
                  {dualRows.map(([index, title, time]) => (
                    <div key={index} className="audit-row grid grid-cols-[auto_1fr_auto] items-center gap-[14px] border-b border-black/8 py-[14px] font-mono text-[11px] uppercase text-black/70">
                      <span>{index}</span>
                      <strong className="font-inherit text-black">{title}</strong>
                      <span>{time}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="monitor module reveal relative grid min-h-[580px] grid-cols-1 overflow-hidden rounded-[3px] border border-black/8 bg-[linear-gradient(180deg,rgba(255,255,255,.9),rgba(245,247,250,.82))] lg:grid-cols-2">
                <div className="pane border-b border-black/8 p-[22px] lg:border-b-0 lg:border-r">
                  <div className="pane-head flex items-center justify-between gap-[14px] text-[10px] uppercase text-black/55">
                    <span>Invoice stream</span>
                    <span className="mono">A1</span>
                  </div>

                  <div className="box mt-4 rounded-[3px] border border-black/8 bg-white/90 p-[18px]">
                    <div className="name text-[10px] uppercase text-black/50">Pending approval</div>
                    <div className="amount display mt-2 text-[34px] text-[#050505]" data-count="184">
                      0
                    </div>
                    <div className="desc mt-2 text-[14px] leading-[1.85] text-black/66">
                      High-confidence invoice queue with controlled routing and automatic validation.
                    </div>
                  </div>

                  <div className="metrics mt-4 grid grid-cols-3 gap-3">
                    <div className="metric rounded-[3px] border border-black/8 bg-white/92 p-4">
                      <div className="k text-[10px] uppercase text-black/55">Disputed</div>
                      <div className="v display mt-2 text-[28px] text-[#050505]" data-count="6">
                        0
                      </div>
                    </div>
                    <div className="metric rounded-[3px] border border-black/8 bg-white/92 p-4">
                      <div className="k text-[10px] uppercase text-black/55">Approved</div>
                      <div className="v display mt-2 text-[28px] text-[#050505]" data-count="172">
                        0
                      </div>
                    </div>
                    <div className="metric rounded-[3px] border border-black/8 bg-white/92 p-4">
                      <div className="k text-[10px] uppercase text-black/55">Paid</div>
                      <div className="v display mt-2 text-[28px] text-[#050505]" data-count="91">
                        0
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pane p-[22px]">
                  <div className="pane-head flex items-center justify-between gap-[14px] text-[10px] uppercase text-black/55">
                    <span>Banking output</span>
                    <span className="mono">B2</span>
                  </div>

                  <div className="mini-graph mt-4 rounded-[3px] border border-black/8 bg-[linear-gradient(180deg,rgba(255,255,255,.96),rgba(246,248,251,.86))] p-4">
                    <svg viewBox="0 0 520 160" preserveAspectRatio="none" aria-hidden="true" className="h-full w-full overflow-visible">
                      <path d="M0 128 L64 118 L104 122 L152 94 L210 102 L262 64 L316 78 L372 42 L436 56 L520 28" fill="none" stroke="rgba(74,143,255,.9)" strokeWidth="2.2" />
                      <path d="M0 126 L64 115 L104 118 L152 89 L210 96 L262 58 L316 71 L372 36 L436 48 L520 20" fill="none" stroke="rgba(74,143,255,.3)" strokeWidth="1" />
                      <path d="M0 138 L520 138" fill="none" stroke="rgba(0,0,0,.08)" strokeWidth="1" />
                    </svg>
                  </div>

                  <div className="box mt-4 rounded-[3px] border border-black/8 bg-white/90 p-[18px]">
                    <div className="name text-[10px] uppercase text-black/50">Global transfer volume</div>
                    <div className="amount display mt-2 text-[34px] text-[#050505]" data-count="38.7">
                      0
                    </div>
                    <div className="desc mt-2 text-[14px] leading-[1.85] text-black/66">
                      High-frequency movement tracked with subtle blue-laser clarity and locked audit trail integrity.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="telemetry" className="telemetry bg-[linear-gradient(180deg,#0f1114_0%,#11151a_100%)] py-[110px] text-white">
          <div className="telemetry-shell mx-auto w-[min(1600px,calc(100%-28px))]">
            <div className="telemetry-head reveal mb-7 flex items-end justify-between gap-5 max-[1180px]:flex-col max-[1180px]:items-start">
              <div>
                <div className="mono text-[10px] uppercase tracking-[0.34em] text-white/50">Telemetry Grid</div>
                <h2 className="display mt-5 text-[clamp(2.7rem,5.4vw,5.6rem)] leading-[0.88]">
                  Thin neon lines, dense state, no decorative noise.
                </h2>
              </div>
              <p className="max-w-[440px] leading-[1.95] text-white/66">
                Live charts and operational modules update like a high-frequency trading surface, with each tile reporting a different layer of system health.
              </p>
            </div>

            <div className="grid-board grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-12">
              {telemetryCards.map((card) => (
                <article
                  key={card.code}
                  className={`tile ${card.span ?? ""} ${card.wide ? "xl:col-span-8" : "xl:col-span-4"} ${card.title === "Real-time liquidity telemetry" ? "xl:min-h-[278px]" : ""} min-h-[220px] overflow-hidden rounded-[3px] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,.05),rgba(255,255,255,.02))] p-5 opacity-0 transition-[opacity,transform] duration-500 ease-out after:pointer-events-none after:absolute after:inset-0 after:bg-[linear-gradient(90deg,rgba(73,136,255,.18),transparent_60%),linear-gradient(180deg,rgba(255,255,255,.04),transparent_25%)]`}
                >
                  <div className="t relative z-[1] flex items-center justify-between text-[10px] uppercase text-white/55">
                    <span>{card.tag}</span>
                    <span className="mono">{card.code}</span>
                  </div>
                  <h3 className="display relative z-[1] mt-4 text-[clamp(1.6rem,2.8vw,2.8rem)] leading-[0.95] text-white">
                    {card.title}
                  </h3>
                  <p className="relative z-[1] mt-3 max-w-[42ch] text-[14px] leading-[1.85] text-white/68">{card.text}</p>
                  <svg viewBox="0 0 800 84" preserveAspectRatio="none" aria-hidden="true" className="relative z-[1] mt-4 h-[84px] w-full overflow-visible">
                    <path d={card.path1} fill="none" stroke="rgba(115,165,255,.95)" strokeWidth="2.2" />
                    {card.path2 ? <path d={card.path2} fill="none" stroke="rgba(115,165,255,.28)" strokeWidth="1.2" /> : null}
                  </svg>
                </article>
              ))}
            </div>

            <div className="telemetry-foot mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
              {[
                ["Latency", "11.2"],
                ["Uptime", "99.98"],
                ["Entities", "48"],
              ].map(([name, value]) => (
                <div key={name} className="signal rounded-[3px] border border-white/8 bg-white/[0.03] px-5 py-[18px]">
                  <div className="name text-[10px] uppercase text-white/52">{name}</div>
                  <div className="value display mt-2 text-[30px]" data-count={value}>
                    0
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="ledger" className="ledger-footer bg-[linear-gradient(180deg,#111_0%,#0b0c0f_100%)] py-[110px] pb-[90px] text-white">
          <div className="ledger-shell mx-auto grid w-[min(1600px,calc(100%-28px))] grid-cols-1 gap-[18px] lg:grid-cols-[1fr_.9fr]">
            <div className="ledger-card reveal rounded-[3px] border border-white/8 bg-white/[0.03] p-9">
              <div className="mono text-[10px] uppercase tracking-[0.34em] text-white/50">The Ledger Footer</div>
              <h2 className="display mt-5 text-[clamp(2.7rem,5vw,5.2rem)] leading-[0.9]">
                Capabilities rendered like a machine-readable settlement log.
              </h2>
              <p className="mt-4 max-w-[760px] leading-[2] text-white/68">
                The final layer presents the platform as code, with immutable clarity, compact syntax, and no ornamental framing.
              </p>
              <div className="bottom-line mt-6 h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,.25),transparent)]" />
              <pre className="m-0 mt-6 whitespace-pre-wrap break-words font-mono text-[12px] leading-[1.95] text-white/78">
{`01  invoice.ingest()
02  entity.consolidate()
03  balance.reconcile()
04  liquidity.telemetry()
05  payouts.route()
06  exceptions.flag()
07  approvals.sync()
08  settlement.commit()`}
              </pre>
            </div>

            <div className="capabilities grid gap-3">
              {[
                "async-ledger-processor | multi-entity sync | invoice capture | payment routing",
                "real-time treasury view | AML controls | ledger traceability | settlement queues",
                "corporate banking APIs | liquidity thresholds | reconciliation engine | audit export",
                "cross-border operations | role-based access | approval chains | deterministic logging",
              ].map((item) => (
                <div key={item} className="cap rounded-[3px] border border-white/8 bg-white/[0.03] p-5 font-mono text-[12px] leading-[1.8] text-white/76">
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="shell mx-auto mt-6 w-[min(1600px,calc(100%-28px))]">
            <div className="footer-line mt-6 h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,.2),transparent)]" />
            <div className="footer-bar mt-4 flex flex-wrap justify-between gap-5 text-[12px] uppercase text-white/55">
              <div>Flux Capital</div>
              <div>Clinical White · Slate Blue · Graphite Grey</div>
              <div>Real-Time Financial Intelligence</div>
            </div>
          </div>
        </section>
      </main>

      <style jsx global>{`
        :root {
          color-scheme: light;
          --white: oklch(98% 0.01 240);
          --white-2: oklch(96.8% 0.01 240);
          --graphite: oklch(18% 0.05 30);
          --graphite-2: oklch(14% 0.04 30);
          --slate: oklch(52% 0.09 255);
          --slate-2: oklch(64% 0.11 255);
          --blue: oklch(71% 0.15 255);
          --ink: oklch(18% 0.02 240);
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
          font-family: "Inter Tight", sans-serif;
          background:
            radial-gradient(circle at 14% 10%, rgba(80, 128, 196, .08), transparent 16%),
            radial-gradient(circle at 84% 14%, rgba(0, 0, 0, .035), transparent 15%),
            linear-gradient(180deg, var(--white) 0%, var(--white-2) 100%);
          color: var(--ink);
        }

        body::before {
          content: "";
          position: fixed;
          inset: 0;
          pointer-events: none;
          background-image:
            linear-gradient(rgba(0, 0, 0, .03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 0, 0, .03) 1px, transparent 1px);
          background-size: 120px 120px;
          opacity: .26;
          z-index: -2;
        }

        .mono {
          font-family: "IBM Plex Mono", monospace;
        }

        .display {
          font-weight: 900;
        }

        .aero {
          position: relative;
          overflow: hidden;
          cursor: pointer;
          transition: transform .45s cubic-bezier(.16, 1, .3, 1), border-color .35s ease, box-shadow .35s ease;
        }

        .aero::after {
          content: "";
          position: absolute;
          inset: 0;
          opacity: 0;
          background: linear-gradient(90deg, transparent, rgba(74, 145, 255, .26), transparent);
          transition: .35s ease;
          pointer-events: none;
        }

        .aero:hover::after {
          opacity: 1;
        }

        .reveal,
        .tile {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity .6s ease, transform .6s cubic-bezier(.16, 1, .3, 1);
        }

        .reveal.in,
        .tile.in {
          opacity: 1;
          transform: translateY(0);
        }

        .typed {
          animation: typedIn .8s cubic-bezier(.16, 1, .3, 1) forwards;
        }

        .glitch {
          position: relative;
          display: inline-block;
        }

        .glitch::before,
        .glitch::after {
          content: attr(data-text);
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          overflow: hidden;
          opacity: .6;
          pointer-events: none;
          clip-path: inset(0 0 0 0);
        }

        .glitch::before {
          transform: translate(1px, 0);
          color: #4a87ff;
          animation: glitchA 1.8s infinite linear alternate-reverse;
        }

        .glitch::after {
          transform: translate(-1px, 0);
          color: #9ec0ff;
          animation: glitchB 2.2s infinite linear alternate-reverse;
        }

        .video-shell {
          filter: saturate(1.06) contrast(1.04) brightness(.96);
        }

        .video-shell::before {
          content: "";
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle at 18% 20%, rgba(255, 255, 255, .18), transparent 16%),
            radial-gradient(circle at 65% 28%, rgba(77, 143, 255, .2), transparent 14%),
            linear-gradient(180deg, rgba(255, 255, 255, .08), rgba(0, 0, 0, .18));
          z-index: 2;
          pointer-events: none;
        }

        .video-shell::after {
          content: "";
          position: absolute;
          inset: -2%;
          background: linear-gradient(90deg, rgba(255, 255, 255, .22), transparent 24%);
          pointer-events: none;
          mix-blend-mode: screen;
        }

        @keyframes typedIn {
          from {
            opacity: 0;
            filter: blur(10px);
            transform: translateY(12px);
          }

          to {
            opacity: 1;
            filter: blur(0);
            transform: translateY(0);
          }
        }

        @keyframes glitchA {
          0% {
            clip-path: inset(0 0 92% 0);
          }

          20% {
            clip-path: inset(12% 0 78% 0);
          }

          40% {
            clip-path: inset(54% 0 30% 0);
          }

          60% {
            clip-path: inset(28% 0 56% 0);
          }

          80% {
            clip-path: inset(64% 0 14% 0);
          }

          100% {
            clip-path: inset(0 0 0 0);
          }
        }

        @keyframes glitchB {
          0% {
            clip-path: inset(84% 0 0 0);
          }

          20% {
            clip-path: inset(72% 0 8% 0);
          }

          40% {
            clip-path: inset(18% 0 58% 0);
          }

          60% {
            clip-path: inset(42% 0 32% 0);
          }

          80% {
            clip-path: inset(6% 0 80% 0);
          }

          100% {
            clip-path: inset(0 0 0 0);
          }
        }

        ::view-transition-old(root),
        ::view-transition-new(root) {
          animation-duration: .72s;
          animation-timing-function: cubic-bezier(.16, 1, .3, 1);
        }

        @media (max-width: 1180px) {
          .audit-inner {
            grid-template-columns: 1fr auto;
          }

          .audit-nav {
            display: none;
          }

          .hero-grid {
            grid-template-columns: 1fr;
          }

          .hero-copy {
            border-right: none;
            border-bottom: 1px solid rgba(0, 0, 0, .08);
          }

          .hero-side {
            min-height: 72vh;
          }

          .dual-stream,
          .ledger-shell {
            grid-template-columns: 1fr;
          }

          .grid-board {
            grid-template-columns: repeat(6, 1fr);
          }

          .tile,
          .tile.wide {
            grid-column: span 6;
          }

          .telemetry-foot {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 760px) {
          .audit-inner,
          .hero-grid,
          .shell,
          .telemetry-shell,
          .ledger-shell {
            width: min(100% - 18px, 1600px);
          }

          .hero-copy {
            padding-top: 36px;
          }

          .hero-copy-inner,
          .ledger-panel,
          .monitor,
          .ledger-card {
            padding-left: 0;
            padding-right: 0;
          }

          .hero-title {
            font-size: clamp(3.2rem, 14vw, 6.2rem);
          }

          .section-h,
          .telemetry-head {
            flex-direction: column;
            align-items: flex-start;
          }

          .grid-board {
            grid-template-columns: 1fr;
          }

          .tile,
          .tile.wide {
            grid-column: span 1;
          }

          .monitor {
            grid-template-columns: 1fr;
          }

          .monitor .pane {
            border-right: none;
            border-bottom: 1px solid rgba(0, 0, 0, .08);
          }

          .monitor .pane:last-child {
            border-bottom: none;
          }
        }
      `}</style>
    </div>
  );
}
