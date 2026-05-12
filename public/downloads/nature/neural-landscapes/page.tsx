"use client";

import { useEffect } from "react";
import { Icon } from "@iconify/react";

export default function Page() {
  useEffect(() => {
    const cleanups: (() => void)[] = [];

    document.querySelectorAll<HTMLElement>(".sss-card").forEach((card) => {
      const glow = card.querySelector(
        ".subsurface-glow"
      ) as HTMLElement | null;

  const handlers = new Map<HTMLElement, (e: MouseEvent) => void>();

      const move = (e: globalThis.MouseEvent) => {
        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

    const move = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      glow.style.left = `${x}px`;
      glow.style.top = `${y}px`;
    };

      cleanups.push(() => {
        card.removeEventListener("mousemove", move);
      });
    });
  }, observerOptions);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: "0px 0px -15% 0px",
        threshold: 0.1,
      }
    );

  return () => {
    cards.forEach((card) => {
      const move = handlers.get(card);
      if (move) card.removeEventListener("mousemove", move);
    });

    return () => {
      cleanups.forEach((cleanup) => cleanup());
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <style jsx global>{`
        html {
          scroll-behavior: smooth;
          background-color: oklch(10% 0.01 150);
        }

        body {
          margin: 0;
          overflow-x: hidden;
          color: white;
          background-color: oklch(10% 0.01 150);
          font-family: "Space Grotesk", sans-serif;
        }

        ::-webkit-scrollbar {
          width: 2px;
        }

        ::-webkit-scrollbar-track {
          background: transparent;
        }

        ::-webkit-scrollbar-thumb {
          background: oklch(60% 0.15 150 / 0.5);
        }

        .vercel-grain {
          position: fixed;
          inset: 0;
          z-index: 9999;
          pointer-events: none;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
          opacity: 0.04;
          mix-blend-mode: screen;
        }

        .radial-portal {
          -webkit-mask-image: radial-gradient(circle at center, black 30%, transparent 70%);
          mask-image: radial-gradient(circle at center, black 30%, transparent 70%);
          transition:
            transform 1.5s cubic-bezier(0.16, 1, 0.3, 1),
            mask-size 1.5s ease;
          will-change: transform, mask-image;
        }

        .radial-portal:hover {
          transform: scale(1.05);
        }

        .kinetic-sway {
          display: inline-block;
          animation: sway 6s ease-in-out infinite alternate;
          transform-origin: bottom center;
        }

        @keyframes sway {
          0% {
            transform: rotate(-1.5deg) translateX(-2px);
          }

          100% {
            transform: rotate(1.5deg) translateX(2px);
          }
        }

        .morning-sun-text {
          background: linear-gradient(
            110deg,
            oklch(90% 0.1 70) 0%,
            oklch(85% 0.15 70) 40%,
            oklch(60% 0.15 150) 100%
          );
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .apple-sharpness {
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          background: oklch(100% 0 0 / 0.02);
          border: 0.5px solid oklch(100% 0 0 / 0.1);
          box-shadow:
            inset 0 1px 1px oklch(100% 0 0 / 0.05),
            0 20px 40px rgba(0, 0, 0, 0.4);
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .dew-drop {
          position: relative;
          overflow: hidden;
          backdrop-filter: blur(20px) saturate(1.5);
          -webkit-backdrop-filter: blur(20px) saturate(1.5);
          background: oklch(100% 0 0 / 0.03);
          border: 0.5px solid oklch(100% 0 0 / 0.08);
          box-shadow: inset 0 1px 2px oklch(100% 0 0 / 0.1);
          border-radius: 99px;
          transition: all 0.3s ease;
        }

        .dew-drop::before {
          content: "";
          position: absolute;
          top: 0;
          left: 20%;
          right: 20%;
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.8),
            transparent
          );
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .dew-drop:hover {
          background: oklch(100% 0 0 / 0.06);
          transform: translateY(-2px);
          box-shadow:
            0 10px 20px rgba(0, 0, 0, 0.3),
            inset 0 1px 2px oklch(100% 0 0 / 0.2);
        }

        .dew-drop:hover::before {
          opacity: 1;
        }

        .sss-card {
          position: relative;
        }

        .sss-card::before {
          content: "";
          position: absolute;
          inset: -1px;
          border-radius: inherit;
          padding: 1px;
          background: linear-gradient(
            145deg,
            oklch(60% 0.15 150 / 0.4),
            transparent 40%
          );
          -webkit-mask:
            linear-gradient(#fff 0 0) content-box,
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
          box-shadow: inset 0 0 40px oklch(60% 0.15 150 / 0.05);
          pointer-events: none;
          transition: box-shadow 0.4s ease;
        }

        .sss-card:hover::after {
          box-shadow: inset 0 0 60px oklch(60% 0.15 150 / 0.15);
        }

        .subsurface-glow {
          position: absolute;
          width: 150px;
          height: 150px;
          background: radial-gradient(
            circle,
            oklch(60% 0.15 150 / 0.4) 0%,
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

        .ambient-light {
          position: absolute;
          border-radius: 50%;
          filter: blur(140px);
          pointer-events: none;
          z-index: -1;
          mix-blend-mode: screen;
        }

        .bloom-reveal {
          opacity: 0;
          transform: translateY(30px) scale(0.98);
          filter: blur(10px);
          transition:
            opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1),
            transform 1.2s cubic-bezier(0.16, 1, 0.3, 1),
            filter 1.2s ease;
        }

        .bloom-reveal.active {
          opacity: 1;
          transform: translateY(0) scale(1);
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

      <div className="selection:bg-emerald-500/30 selection:text-white antialiased">
        <div className="vercel-grain"></div>

        <nav className="pointer-events-none fixed inset-x-0 top-0 z-50 flex w-full items-center justify-between px-6 py-6 mix-blend-plus-lighter">
          <div className="pointer-events-auto group flex items-center gap-4">
            <div className="apple-sharpness relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full">
              <div className="absolute inset-0 bg-emerald-400/20 opacity-0 transition-opacity group-hover:opacity-100"></div>

              <Icon
                icon="ph:infinity-light"
                className="relative z-10 text-xl text-white"
              />
            </div>

            <span className="text-xs uppercase tracking-[0.2em] text-white/80">
              The Line
            </span>
          </div>

          <div className="pointer-events-auto hidden gap-4 md:flex">
            <button className="dew-drop flex items-center gap-2 px-5 py-2 text-[10px] uppercase tracking-widest text-white/70 hover:text-white">
              <Icon
                icon="ph:tree-structure-light"
                className="text-base text-emerald-400"
              />
              Neural Architecture
            </button>

            <button className="dew-drop flex items-center gap-2 px-5 py-2 text-[10px] uppercase tracking-widest text-white/70 hover:text-white">
              <Icon
                icon="ph:cloud-fog-light"
                className="text-base text-yellow-300"
              />
              Cloud Server Protocol
            </button>
          </div>
        </nav>

        <main className="relative w-full">
          <div className="ambient-light fixed left-[10%] top-[10%] h-[40vw] w-[40vw] bg-yellow-300/5"></div>

          <div className="ambient-light fixed bottom-[10%] right-[10%] h-[50vw] w-[50vw] bg-emerald-400/10"></div>

          <section className="relative z-10 grid min-h-screen w-full grid-cols-1 lg:grid-cols-2">
            <div className="z-20 flex flex-col justify-center px-8 pb-20 pt-32 md:px-16 lg:px-24 lg:py-0">
              <div className="bloom-reveal active mb-6 inline-flex items-center gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_12px_oklch(60%_0.15_150)]"></span>

                <span className="text-[9px] uppercase tracking-[0.4em] text-emerald-400/80">
                  Andean Bio-Digitalism
                </span>
              </div>

              <h1
                className="bloom-reveal active delay-100 mb-8 text-7xl uppercase leading-[0.85] tracking-tight md:text-8xl lg:text-[9rem]"
                style={{ fontFamily: "Oswald, sans-serif" }}
              >
                <span className="kinetic-sway morning-sun-text block">
                  Living
                </span>

                <span className="block text-white">Architecture</span>
              </h1>

              <p className="bloom-reveal active delay-200 max-w-md text-sm font-light leading-relaxed text-white/50 md:text-base">
                Integrating high-altitude biomes with scalable carbon capture.
                We design structural mycelium integrity to house tomorrow&apos;s
                neural landscapes.
              </p>

              <div className="bloom-reveal active delay-300 mt-12 flex items-center gap-6">
                <button className="dew-drop flex items-center gap-3 px-8 py-4 text-[10px] uppercase tracking-[0.2em] text-white">
                  Initiate Synthesis

                  <Icon
                    icon="ph:arrow-right-light"
                    className="text-base text-emerald-400"
                  />
                </button>

                <span className="border-b border-white/10 pb-1 text-[10px] uppercase tracking-widest text-white/30">
                  Data Yield: 99.8%
                </span>
              </div>
            </div>

            <div className="relative z-10 flex h-[60vh] w-full items-center justify-center lg:h-screen">
              <div className="radial-portal absolute inset-0 h-full w-full">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="h-full w-full object-cover"
                >
                  <source src="/video.mp4" type="video/mp4" />
                </video>

                <div className="absolute inset-0 bg-black/40 mix-blend-multiply"></div>

                <div className="absolute inset-0 bg-emerald-400/10 mix-blend-overlay"></div>
              </div>
            </div>
          </section>

          <section className="relative z-20 w-full px-6 py-40 md:px-16 lg:px-24">
            <div className="mx-auto max-w-7xl">
              <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-12 md:gap-16">
                <div className="bloom-reveal md:sticky md:top-40 md:col-span-5">
                  <h2
                    className="mb-6 text-5xl uppercase leading-none tracking-tight text-white md:text-7xl"
                    style={{ fontFamily: "Oswald, sans-serif" }}
                  >
                    Cloud-Forest
                    <br />
                    <span className="text-white/30">Cooling</span>
                  </h2>

                  <p className="mb-8 text-sm font-light leading-relaxed text-white/50">
                    Leveraging natural thermodynamics of the Andean cloud
                    forests. Our server arrays are integrated seamlessly into
                    the biome, utilizing raw atmospheric moisture for absolute
                    zero-emission cooling protocols.
                  </p>

                  <div className="h-px w-full bg-gradient-to-r from-emerald-400 via-yellow-300 to-transparent opacity-20"></div>
                </div>

                <div className="flex flex-col gap-6 md:col-span-7">
                  <div className="apple-sharpness sss-card bloom-reveal delay-100 group overflow-hidden rounded-3xl p-8 md:p-10">
                    <div className="subsurface-glow"></div>

                    <div className="relative z-10 flex flex-col items-start justify-between gap-8 md:flex-row">
                      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md">
                        <Icon
                          icon="ph:drop-half-bottom-light"
                          className="text-3xl text-emerald-400"
                        />
                      </div>

                      <div className="flex-1">
                        <h3 className="mb-3 text-xl tracking-wide text-white">
                          Atmospheric Extraction
                        </h3>

                        <p className="mb-6 text-xs font-light leading-relaxed text-white/40">
                          Passive condensation networks extract micro-droplets
                          directly from the mist, funneling highly pure water
                          into the thermal core of our processing hubs.
                        </p>

                        <div className="flex items-center justify-between border-t border-white/5 pt-4">
                          <span className="text-[10px] uppercase tracking-[0.2em] text-emerald-400">
                            Status: Active
                          </span>

                          <span
                            className="text-2xl tracking-wider text-white"
                            style={{ fontFamily: "Oswald, sans-serif" }}
                          >
                            14.2
                            <span className="ml-1 text-sm text-white/30">
                              L/s
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="apple-sharpness sss-card bloom-reveal delay-200 group overflow-hidden rounded-3xl p-8 md:p-10">
                    <div className="subsurface-glow"></div>

                    <div className="relative z-10 flex flex-col items-start justify-between gap-8 md:flex-row">
                      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md">
                        <Icon
                          icon="logos:graphql"
                          className="text-3xl text-yellow-300"
                        />
                      </div>

                      <div className="flex-1">
                        <h3 className="mb-3 text-xl tracking-wide text-white">
                          Mycelium Structural Integrity
                        </h3>

                        <p className="mb-6 text-xs font-light leading-relaxed text-white/40">
                          Hardware racks grown, not assembled. Genetically
                          optimized fungal networks form an impact-resistant,
                          self-healing chassis around the server logic.
                        </p>

                        <div className="flex items-center justify-between border-t border-white/5 pt-4">
                          <span className="text-[10px] uppercase tracking-[0.2em] text-yellow-300">
                            Growth Phase: 4
                          </span>

                          <span
                            className="text-2xl tracking-wider text-white"
                            style={{ fontFamily: "Oswald, sans-serif" }}
                          >
                            98.5
                            <span className="ml-1 text-sm text-white/30">
                              %
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="relative z-20 mb-32 flex h-[50vh] w-full items-center justify-center">
            <div className="bloom-reveal text-center">
              <div className="mx-auto mb-8 h-24 w-px bg-gradient-to-b from-transparent via-emerald-400 to-transparent"></div>

              <h2
                className="cursor-default text-3xl uppercase tracking-widest text-white/20 transition-colors duration-700 hover:text-white md:text-5xl"
                style={{ fontFamily: "Oswald, sans-serif" }}
              >
                Return to the source
              </h2>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}