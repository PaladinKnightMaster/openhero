"use client";

import { useEffect } from "react";
import { Icon } from "@iconify/react";

export default function Page() {
  useEffect(() => {
    const interactiveElements = document.querySelectorAll(".sss-btn, .sss-card");

    interactiveElements.forEach((el) => {
      const handleMouseMove = (e: MouseEvent) => {
        const target = el as HTMLElement;
        const rect = target.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        if (target.classList.contains("sss-btn")) {
          target.style.setProperty("--x", `${x}px`);
          target.style.setProperty("--y", `${y}px`);
        } else {
          const glow = target.querySelector(".subsurface-glow") as HTMLElement;
          if (glow) {
            glow.style.left = `${x}px`;
            glow.style.top = `${y}px`;
          }
        }
      };

      el.addEventListener("mousemove", handleMouseMove as EventListener);

      return () => {
        el.removeEventListener("mousemove", handleMouseMove as EventListener);
      };
    });

    const observerOptions = {
      root: null,
      rootMargin: "0px 0px -10% 0px",
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    document.querySelectorAll(".bloom-reveal").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style jsx global>{`
        html {
          scroll-behavior: smooth;
          background-color: #030303;
        }

        body {
          margin: 0;
          overflow-x: hidden;
          color: white;
          background-color: #030303;
          font-family: Inter, sans-serif;
        }

        .vercel-grain {
          position: fixed;
          inset: 0;
          z-index: 9999;
          pointer-events: none;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
          opacity: 0.04;
          mix-blend-mode: overlay;
        }

        .radial-portal {
          -webkit-mask-image: radial-gradient(circle at center, black 25%, transparent 75%);
          mask-image: radial-gradient(circle at center, black 25%, transparent 75%);
          transition: transform 2s cubic-bezier(0.16, 1, 0.3, 1);
          will-change: transform;
        }

        .radial-portal:hover {
          transform: scale(1.03);
        }

        .glow-bleed {
          background: linear-gradient(
            135deg,
            oklch(90% 0.1 50) 0%,
            oklch(75% 0.2 45) 40%,
            oklch(65% 0.25 30) 100%
          );
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: organicPulse 4s ease-in-out infinite alternate;
        }

        @keyframes organicPulse {
          0% {
            filter: drop-shadow(0 0 20px oklch(75% 0.2 45 / 0.2));
          }
          100% {
            filter: drop-shadow(0 0 40px oklch(65% 0.25 30 / 0.6))
              drop-shadow(0 0 10px oklch(90% 0.1 50 / 0.4));
          }
        }

        .liquid-terminals i {
          font-style: italic;
          letter-spacing: -0.04em;
          padding-right: 0.06em;
          font-weight: 400;
        }

        .apple-sharpness {
          backdrop-filter: blur(15px);
          -webkit-backdrop-filter: blur(15px);
          background: oklch(75% 0.2 45 / 0.02);
          border: 0.5px solid oklch(75% 0.2 45 / 0.15);
          box-shadow: inset 0 1px 1px oklch(90% 0.1 50 / 0.05),
            0 20px 40px rgba(0, 0, 0, 0.6);
          border-radius: 20px;
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .apple-sharpness:hover {
          background: oklch(75% 0.2 45 / 0.04);
          border-color: oklch(75% 0.2 45 / 0.3);
        }

        .sss-btn {
          position: relative;
          overflow: hidden;
          background: oklch(65% 0.25 30 / 0.05);
          border: 0.5px solid oklch(75% 0.2 45 / 0.2);
          border-radius: 999px;
          backdrop-filter: blur(15px);
          -webkit-backdrop-filter: blur(15px);
          box-shadow: inset 0 0 0px oklch(75% 0.2 45 / 0);
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .sss-btn::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: radial-gradient(
            circle at var(--x, 50%) var(--y, 50%),
            oklch(90% 0.1 50 / 0.4) 0%,
            transparent 60%
          );
          opacity: 0;
          transition: opacity 0.3s;
          mix-blend-mode: overlay;
          pointer-events: none;
        }

        .sss-btn:hover {
          box-shadow: inset 0 0 30px oklch(75% 0.2 45 / 0.3),
            0 10px 30px oklch(65% 0.25 30 / 0.2);
          border-color: oklch(90% 0.1 50 / 0.5);
          transform: translateY(-2px);
        }

        .sss-btn:hover::before {
          opacity: 1;
        }

        .sss-card {
          position: relative;
          overflow: hidden;
        }

        .sss-card::before {
          content: "";
          position: absolute;
          inset: -1px;
          border-radius: inherit;
          padding: 1px;
          background: linear-gradient(
            145deg,
            oklch(75% 0.2 45 / 0.4),
            transparent 40%
          );
          -webkit-mask: linear-gradient(#fff 0 0) content-box,
            linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
        }

        .sss-card::after {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          box-shadow: inset 0 0 40px oklch(75% 0.2 45 / 0.05);
          pointer-events: none;
          transition: box-shadow 0.4s ease;
        }

        .sss-card:hover::after {
          box-shadow: inset 0 0 60px oklch(75% 0.2 45 / 0.15);
        }

        .subsurface-glow {
          position: absolute;
          width: 150px;
          height: 150px;
          background: radial-gradient(
            circle,
            oklch(75% 0.2 45 / 0.4) 0%,
            transparent 70%
          );
          border-radius: 50%;
          filter: blur(20px);
          opacity: 0;
          transition: opacity 0.5s ease;
          pointer-events: none;
          transform: translate(-50%, -50%);
          z-index: 0;
        }

        .sss-card:hover .subsurface-glow {
          opacity: 1;
        }

        .bloom-reveal {
          opacity: 0;
          transform: translateY(20px);
          filter: blur(8px);
          transition:
            opacity 1.4s cubic-bezier(0.16, 1, 0.3, 1),
            transform 1.4s cubic-bezier(0.16, 1, 0.3, 1),
            filter 1.4s ease;
        }

        .bloom-reveal.active {
          opacity: 1;
          transform: translateY(0);
          filter: blur(0px);
        }

        .delay-100 {
          transition-delay: 0.1s;
        }

        .delay-200 {
          transition-delay: 0.2s;
        }

        .delay-300 {
          transition-delay: 0.3s;
        }
      `}</style>

      <div className="selection:bg-orange-500/30 selection:text-yellow-100 antialiased">
        <div className="vercel-grain"></div>

        <nav className="pointer-events-none fixed inset-x-0 top-0 z-50 flex w-full items-center justify-between px-8 py-6 mix-blend-screen">
          <div className="pointer-events-auto flex items-center gap-3">
            <div className="relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border border-orange-300/30">
              <div className="absolute inset-0 animate-[organicPulse_4s_ease-in-out_infinite_alternate] bg-orange-300/20"></div>

              <Icon
                icon="ph:molecule-light"
                className="relative z-10 text-xl text-yellow-100"
              />
            </div>

            <span
              className="text-lg italic tracking-wide text-yellow-100/90"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              Light Bio
            </span>
          </div>

          <div className="pointer-events-auto hidden items-center gap-8 md:flex">
            <a
              href="#research"
              className="text-[10px] uppercase tracking-[0.2em] text-white/50 transition-colors hover:text-yellow-100"
            >
              Research
            </a>

            <a
              href="#synthesis"
              className="text-[10px] uppercase tracking-[0.2em] text-white/50 transition-colors hover:text-yellow-100"
            >
              Synthesis
            </a>

            <a
              href="#topology"
              className="text-[10px] uppercase tracking-[0.2em] text-white/50 transition-colors hover:text-yellow-100"
            >
              Topology
            </a>

            <button className="sss-btn flex items-center gap-2 px-6 py-2.5 text-[10px] uppercase tracking-[0.15em] text-yellow-100">
              Initialize

              <div className="h-1.5 w-1.5 animate-[organicPulse_2s_ease-in-out_infinite_alternate] rounded-full bg-yellow-100 shadow-[0_0_8px_oklch(90%_0.1_50)]"></div>
            </button>
          </div>
        </nav>

        <main className="relative w-full">
          <div className="relative grid min-h-screen w-full grid-cols-1 lg:grid-cols-2">
            <section className="relative z-20 order-2 flex flex-col justify-center px-8 pb-20 pt-32 md:px-16 lg:order-1 lg:px-24 lg:py-0">
              <h1
                className="bloom-reveal active delay-100 liquid-terminals mb-8 text-6xl leading-[0.9] tracking-tight md:text-7xl lg:text-[6rem]"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                Living
                <br />
                <i className="glow-bleed pr-4">Light</i>
                <br />
                Technology
              </h1>

              <p className="bloom-reveal active delay-200 mb-12 max-w-md text-sm font-light leading-relaxed text-white/40 md:text-base">
                Engineering mycelium photon-conductivity to redefine
                illumination. We harness organic luminescence efficiency and
                circadian bio-rhythms to cultivate light that breathes.
              </p>

              <div className="bloom-reveal active delay-300 grid max-w-md grid-cols-2 gap-4">
                <div className="apple-sharpness sss-card group flex aspect-[4/3] flex-col justify-between p-6">
                  <div className="subsurface-glow"></div>

                  <div className="relative z-10">
                    <Icon
                      icon="ph:lightning-light"
                      className="mb-4 text-2xl text-orange-500 transition-colors group-hover:text-yellow-100"
                    />

                    <div>
                      <span className="mb-1 block text-[9px] uppercase tracking-[0.2em] text-white/30">
                        Quantum Yield
                      </span>

                      <span
                        className="text-2xl text-yellow-100"
                        style={{ fontFamily: "Playfair Display, serif" }}
                      >
                        84.2%
                      </span>
                    </div>
                  </div>
                </div>

                <div className="apple-sharpness sss-card group flex aspect-[4/3] flex-col justify-between p-6">
                  <div className="subsurface-glow"></div>

                  <div className="relative z-10">
                    <Icon
                      icon="ph:timer-light"
                      className="mb-4 text-2xl text-orange-300 transition-colors group-hover:text-yellow-100"
                    />

                    <div>
                      <span className="mb-1 block text-[9px] uppercase tracking-[0.2em] text-white/30">
                        Circadian Cycle
                      </span>

                      <span
                        className="text-2xl text-yellow-100"
                        style={{ fontFamily: "Playfair Display, serif" }}
                      >
                        24h Sync
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="relative z-10 order-1 flex h-[60vh] w-full items-center justify-center lg:order-2 lg:h-screen">
              <div className="radial-portal absolute inset-0 h-full w-full">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="h-full w-full scale-105 object-cover opacity-90 contrast-125 saturate-150"
                >
                  <source src="/video.mp4" type="video/mp4" />
                </video>

                <div className="absolute inset-0 bg-orange-500/10 mix-blend-color"></div>
              </div>
            </section>
          </div>

          <section
            id="synthesis"
            className="relative z-20 mx-auto max-w-[1400px] px-8 py-32 md:px-16 lg:px-24"
          >
            <div className="bloom-reveal mb-20 flex flex-col justify-between md:flex-row md:items-end">
              <h2
                className="liquid-terminals text-4xl tracking-tight text-white md:text-5xl lg:text-6xl"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                Synthesis
                <br />
                <i>Pipeline</i>
              </h2>

              <p className="mt-6 max-w-sm text-sm font-light text-white/40 md:mt-0">
                A closed-loop biochemical framework designed to maintain
                perpetual luminescent output without external energy grids.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <div className="apple-sharpness sss-card bloom-reveal delay-100 flex min-h-[320px] flex-col rounded-3xl p-8 md:p-10">
                <div className="subsurface-glow"></div>

                <div className="relative z-10 flex flex-1 flex-col justify-between">
                  <Icon
                    icon="ph:dna-light"
                    className="mb-8 text-3xl text-yellow-100/70"
                  />

                  <div>
                    <h3 className="mb-3 text-xs uppercase tracking-[0.2em] text-orange-300">
                      01. Cultivation
                    </h3>

                    <p className="text-sm font-light leading-relaxed text-white/50">
                      Incubating high-yield luciferase networks in zero-light
                      vacuum chambers to hyper-sensitize photon receptors.
                    </p>
                  </div>
                </div>
              </div>

              <div className="apple-sharpness sss-card bloom-reveal delay-200 flex min-h-[320px] flex-col rounded-3xl p-8 md:p-10">
                <div className="subsurface-glow"></div>

                <div className="relative z-10 flex flex-1 flex-col justify-between">
                  <Icon
                    icon="ph:drop-light"
                    className="mb-8 text-3xl text-yellow-100/70"
                  />

                  <div>
                    <h3 className="mb-3 text-xs uppercase tracking-[0.2em] text-orange-500">
                      02. Micro-Dosing
                    </h3>

                    <p className="text-sm font-light leading-relaxed text-white/50">
                      Algorithmic injection of synthetic luciferin compounds
                      orchestrates the precise wavelength and intensity of
                      emission.
                    </p>
                  </div>
                </div>
              </div>

              <div className="apple-sharpness sss-card bloom-reveal delay-300 flex min-h-[320px] flex-col rounded-3xl p-8 md:p-10">
                <div className="subsurface-glow"></div>

                <div className="relative z-10 flex flex-1 flex-col justify-between">
                  <Icon
                    icon="ph:aperture-light"
                    className="mb-8 text-3xl text-yellow-100/70"
                  />

                  <div>
                    <h3 className="mb-3 text-xs uppercase tracking-[0.2em] text-yellow-100">
                      03. Harvesting
                    </h3>

                    <p className="text-sm font-light leading-relaxed text-white/50">
                      Directing bio-photons through optical mycelium fiber
                      channels, scaling organic light to architectural
                      dimensions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section
            id="topology"
            className="relative z-20 flex flex-col items-center justify-center border-t border-white/10 px-8 py-40 text-center"
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,oklch(75%_0.2_45/0.05)_0%,transparent_60%)]"></div>

            <div className="bloom-reveal">
              <span className="mb-6 block text-[10px] uppercase tracking-[0.3em] text-white/30">
                Continuous Output
              </span>

              <h2
                className="liquid-terminals text-7xl tracking-tighter text-white md:text-9xl"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                <i className="glow-bleed">Infinite</i> Lumen
              </h2>
            </div>
          </section>
        </main>

        <footer className="relative z-20 border-t border-white/5 bg-[#030303] px-8 pb-10 pt-20 md:px-16 lg:px-24">
          <div className="mx-auto mb-20 grid max-w-[1400px] grid-cols-1 gap-12 md:grid-cols-2">
            <div className="bloom-reveal">
              <div className="mb-8 flex items-center gap-3">
                <div className="relative flex h-6 w-6 items-center justify-center overflow-hidden rounded-full border border-orange-300/30">
                  <div className="absolute inset-0 animate-[organicPulse_4s_ease-in-out_infinite_alternate] bg-orange-300/20"></div>
                </div>

                <span
                  className="text-base italic tracking-wide text-yellow-100/90"
                  style={{ fontFamily: "Playfair Display, serif" }}
                >
                  Light Bio
                </span>
              </div>

              <p className="max-w-xs text-sm font-light text-white/30">
                Cultivating the dark. Designing the structural integrity of
                biological illumination systems.
              </p>
            </div>

            <div className="bloom-reveal delay-100 flex flex-col gap-12 md:flex-row md:justify-end md:gap-24">
              <div className="flex flex-col gap-4">
                <span className="mb-2 text-[9px] uppercase tracking-[0.2em] text-white/50">
                  Index
                </span>

                <a
                  href="#"
                  className="text-xs text-white/70 transition-colors hover:text-yellow-100"
                >
                  Core Research
                </a>

                <a
                  href="#"
                  className="text-xs text-white/70 transition-colors hover:text-yellow-100"
                >
                  Mycelium Strains
                </a>

                <a
                  href="#"
                  className="text-xs text-white/70 transition-colors hover:text-yellow-100"
                >
                  Optical Patents
                </a>
              </div>

              <div className="flex flex-col gap-4">
                <span className="mb-2 text-[9px] uppercase tracking-[0.2em] text-white/50">
                  Connect
                </span>

                <a
                  href="#"
                  className="text-xs text-white/70 transition-colors hover:text-yellow-100"
                >
                  Laboratory
                </a>

                <a
                  href="#"
                  className="text-xs text-white/70 transition-colors hover:text-yellow-100"
                >
                  Investor Relations
                </a>
              </div>
            </div>
          </div>

          <div className="bloom-reveal delay-200 mx-auto flex max-w-[1400px] flex-col items-center justify-between border-t border-white/5 pt-8 md:flex-row">
            <span className="text-[10px] uppercase tracking-widest text-white/30">
              © 2026 Light Bio Inc. All rights reserved.
            </span>

            <span className="mt-4 text-[10px] uppercase tracking-widest text-white/30 md:mt-0">
              Absolute Darkness Required
            </span>
          </div>
        </footer>
      </div>
    </>
  );
}