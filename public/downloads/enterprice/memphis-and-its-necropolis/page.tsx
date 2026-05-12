"use client";

import { useEffect, useRef } from "react";
import { Icon } from "@iconify/react";

type ViewTransitionDocument = Document & {
  startViewTransition?: (callback: () => void) => void;
};

export default function Page() {
  const heroVideoRef = useRef<HTMLVideoElement | null>(null);
  const heroTextRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const updateHero = () => {
      const scroll = window.scrollY;

      if (heroVideoRef.current && scroll < window.innerHeight * 1.5) {
        heroVideoRef.current.style.transform = `scale(${1.05 + scroll * 0.0002})`;
      }

      if (heroTextRef.current && scroll < window.innerHeight) {
        heroTextRef.current.style.transform = `translateY(${scroll * 0.3}px)`;
        heroTextRef.current.style.opacity = `${Math.max(0, 1 - scroll / 700)}`;
      }
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

    const animateCounter = (counter: HTMLElement) => {
      const target = Number.parseFloat(counter.getAttribute("data-target") || "0");
      const isFloat = target % 1 !== 0;
      const duration = 2000;
      const start = performance.now();

      const step = (now: number) => {
        const progress = Math.min((now - start) / duration, 1);
        const value = target * progress;
        counter.textContent = isFloat ? value.toFixed(1) : Math.floor(value).toString();

        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          counter.textContent = isFloat ? target.toFixed(1) : Math.floor(target).toString();
        }
      };

      requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const target = entry.target as HTMLElement;
          target.classList.add("active");

          target.querySelectorAll<HTMLElement>(".counter").forEach((counter) => {
            if (counter.dataset.animated === "true") return;
            counter.dataset.animated = "true";
            animateCounter(counter);
          });

          observer.unobserve(target);
        });
      },
      { root: null, rootMargin: "0px 0px -5% 0px", threshold: 0.1 }
    );

    document.querySelectorAll<HTMLElement>(".reveal-up:not(.active)").forEach((el) => {
      observer.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  const toggleMonolith = (card: HTMLElement) => {
    const doc = document as ViewTransitionDocument;
    const action = () => {
      card.classList.toggle("open");
    };

    if (typeof doc.startViewTransition === "function") {
      doc.startViewTransition(action);
    } else {
      action();
    }
  };

  return (
    <>
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400;1,500&family=JetBrains+Mono:wght@100;400;700&display=swap");

        html,
        body {
          margin: 0;
          padding: 0;
          width: 100%;
          min-height: 100vh;
          background-color: oklch(94% 0.04 70);
          color: oklch(25% 0.05 50);
          scroll-behavior: smooth;
          overflow-x: hidden;
        }

        body {
          font-family: "Inter", sans-serif;
        }

        .font-sans-custom {
          font-family: "Inter", sans-serif;
        }

        .font-serif-custom {
          font-family: "Playfair Display", serif;
          letter-spacing: -0.04em;
        }

        .font-mono-custom {
          font-family: "JetBrains Mono", monospace;
        }

        .vercel-grain {
          position: fixed;
          inset: 0;
          z-index: 9999;
          pointer-events: none;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
          opacity: 0.04;
          mix-blend-mode: multiply;
        }

        .stone-btn {
          position: relative;
          overflow: hidden;
          background: oklch(94% 0.04 70 / 0.6);
          border-radius: 9999px;
          box-shadow:
            inset 0 0 10px oklch(100% 0 0 / 0.3),
            0 4px 20px rgba(0, 0, 0, 0.03);
          backdrop-filter: blur(15px);
          -webkit-backdrop-filter: blur(15px);
          border: 0.5px solid oklch(70% 0.15 45 / 0.2);
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .stone-btn:hover {
          background: oklch(94% 0.04 70 / 0.9);
          border-color: oklch(70% 0.15 45 / 0.5);
          box-shadow:
            inset 0 0 15px oklch(100% 0 0 / 0.4),
            0 8px 30px rgba(0, 0, 0, 0.05);
          transform: translateY(-1px);
        }

        .stone-panel {
          position: relative;
          overflow: hidden;
          background: oklch(94% 0.04 70 / 0.6);
          border-radius: 24px;
          box-shadow:
            inset 0 0 10px oklch(100% 0 0 / 0.3),
            0 4px 20px rgba(0, 0, 0, 0.03);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 0.5px solid oklch(70% 0.15 45 / 0.2);
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .stone-panel:hover {
          background: oklch(94% 0.04 70 / 0.9);
          border-color: oklch(70% 0.15 45 / 0.5);
          box-shadow:
            inset 0 0 15px oklch(100% 0 0 / 0.4),
            0 8px 30px rgba(0, 0, 0, 0.05);
        }

        .sun-bleed {
          background: linear-gradient(180deg, oklch(72.73% 0.18197 47.683) 0%, oklch(100% 0.00011 271.152) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          letter-spacing: 0.05em;
          filter: drop-shadow(0 15px 35px oklch(70% 0.15 45 / 0.3));
        }

        .subsurface-nav {
          background: linear-gradient(to bottom, oklch(93.949% 0.03974 69.692 / 0.866) 0%, oklch(94% 0.04 70 / 0) 100%);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }

        .nav-link {
          position: relative;
          color: oklch(25% 0.05 50 / 0.7);
          transition: color 0.4s ease;
        }

        .nav-link:hover {
          color: oklch(70% 0.15 45);
        }

        .nav-link::after {
          content: "";
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 100%;
          height: 1px;
          background: oklch(70% 0.15 45);
          transform: scaleX(0);
          transform-origin: center;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .nav-link:hover::after {
          transform: scaleX(1);
        }

        .golden-haze {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at center, oklch(70% 0.15 45 / 0.15) 0%, transparent 60%);
          filter: blur(40px);
          pointer-events: none;
          z-index: 0;
        }

        .reveal-up {
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 1.4s cubic-bezier(0.16, 1, 0.3, 1), transform 1.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .reveal-up.active {
          opacity: 1;
          transform: translateY(0);
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

        #giza-video {
          will-change: transform;
          transform: scale(1.05);
        }

        #hero-text {
          will-change: transform;
        }

        .grid-bg {
          background-size: 20px 20px;
          background-image:
            linear-gradient(to right, oklch(70% 0.15 45 / 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, oklch(70% 0.15 45 / 0.1) 1px, transparent 1px);
        }
      `}</style>

      <div className="vercel-grain"></div>

      <nav className="subsurface-nav fixed top-0 z-50 flex w-full items-center justify-between px-8 py-4 transition-all duration-500">
        <div className="group flex cursor-pointer items-center gap-3">
          <Icon
            icon="ph:compass-rose-light"
            className="text-3xl text-[#c88b2d] transition-transform duration-700 group-hover:rotate-180"
          />
          <div className="flex flex-col">
            <span className="font-serif-custom text-[11px] uppercase tracking-widest text-[#4b3927]/60">
              UNESCO
            </span>
            <span className="font-sans-custom text-[13px] font-medium tracking-wide text-[#4b3927]">
              World Heritage
            </span>
          </div>
        </div>

        <div className="hidden items-center gap-10 font-sans-custom text-[11px] font-medium uppercase tracking-[0.2em] md:flex">
          <a href="#telemetry" className="nav-link">
            Necropolis
          </a>
          <a href="#ship" className="nav-link">
            Solar Ship
          </a>
          <a href="#conservation" className="nav-link">
            Archeo-astronomy
          </a>
          <a href="#footer" className="nav-link">
            Conservation
          </a>
        </div>

        <button className="stone-btn flex items-center gap-2 px-6 py-2.5 font-sans-custom text-[11px] font-medium uppercase tracking-[0.2em]">
          Plan Expedition
          <Icon icon="ph:arrow-right-light" className="text-[14px] text-[#c88b2d]" />
        </button>
      </nav>

      <main className="relative w-full">
        <section className="relative flex h-[110vh] w-full flex-col items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0 h-full w-full">
            <video
              ref={heroVideoRef}
              id="giza-video"
              autoPlay
              loop
              muted
              playsInline
              className="h-full w-full object-cover filter contrast-125 saturate-110 sepia-[0.15]"
            >
              <source src="/video.mp4" type="video/mp4" />
            </video>
          </div>

          <div
            ref={heroTextRef}
            id="hero-text"
            className="relative z-10 flex w-full max-w-5xl flex-col items-center px-6 text-center"
          >
            <div className="golden-haze"></div>

            <div className="reveal-up active mb-8 flex items-center gap-4 filter [filter:drop-shadow(0_0_10px_rgba(0,0,0,1))_drop-shadow(0_2px_4px_rgba(0,0,0,1))]">
              <div className="h-[1px] w-12 bg-[#c88b2d]/60"></div>
              <span className="font-sans-custom text-[10px] uppercase tracking-[0.4em] text-white">
                Memphis & Its Necropolis
              </span>
              <div className="h-[1px] w-12 bg-[#c88b2d]/60"></div>
            </div>

            <h1 className="reveal-up active delay-100 relative z-10 text-center font-serif-custom text-6xl leading-[0.9] text-transparent filter [filter:drop-shadow(0_0_15px_rgba(0,0,0,1))_drop-shadow(0_0_50px_rgba(0,0,0,0.9))] md:text-8xl lg:text-[7.5rem]">
              <span className="sun-bleed">
                The Great <br /> Pyramids of Giza
              </span>
            </h1>

            <p className="reveal-up active delay-200 z-20 mt-10 max-w-xl text-sm font-light leading-relaxed tracking-wide text-white filter [filter:drop-shadow(0_4px_8px_rgba(0,0,0,1))_drop-shadow(0_0_25px_rgba(0,0,0,0.7))] md:text-base">
              A testament to monolithic limestone architecture and exact
              archeo-astronomy alignment. Experience the timeless sandstone
              thermal mass that has endured millennia under the desert sun.
            </p>
          </div>
        </section>

        <section
          id="telemetry"
          className="relative z-20 bg-[oklch(94%_0.04_70)] px-4 py-24 md:px-8 lg:px-16"
        >
          <div className="mx-auto mt-12 max-w-[1400px]">
            <div className="reveal-up mb-16 flex items-end justify-between">
              <div>
                <h2 className="mb-2 font-serif-custom text-4xl text-[#4b3927]">
                  Architectural Telemetry
                </h2>
                <p className="font-mono-custom text-xs uppercase tracking-widest text-[#4b3927]/50">
                  Dataset: Khufu Complex
                </p>
              </div>
              <Icon
                icon="ph:hexagon-light"
                className="animate-[spin_10s_linear_infinite] text-4xl text-[#c88b2d]"
              />
            </div>

            <div className="grid auto-rows-[250px] grid-cols-1 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
              <div className="stone-panel group relative row-span-2 flex flex-col justify-between p-8 md:col-span-2 lg:col-span-2">
                <div className="grid-bg absolute inset-0 opacity-30"></div>
                <div className="relative z-10 flex items-start justify-between">
                  <Icon icon="ph:scan-light" className="text-3xl text-[#c88b2d]" />
                  <span className="rounded bg-white/30 px-2 py-1 font-mono-custom text-[10px] tracking-widest text-[#4b3927]/60">
                    SCAN_01
                  </span>
                </div>

                <div className="relative z-10">
                  <h3 className="mb-3 font-serif-custom text-3xl text-[#4b3927]">
                    Structural Topography
                  </h3>
                  <p className="max-w-sm text-sm font-light leading-relaxed text-[#4b3927]/70">
                    Engineered with microscopic precision. The original highly
                    polished limestone casing stones acted as a mirrored beacon
                    across the ancient sands.
                  </p>

                  <div className="mt-6 flex gap-6 border-t border-[#4b3927]/10 pt-4">
                    <div>
                      <span className="mb-1 block font-mono-custom text-2xl text-[#c88b2d]">
                        <span className="counter" data-target="2.3">
                          0
                        </span>
                        M
                      </span>
                      <span className="font-mono-custom text-[9px] uppercase tracking-widest text-[#4b3927]/50">
                        Stone Blocks
                      </span>
                    </div>
                    <div>
                      <span className="mb-1 block font-mono-custom text-2xl text-[#c88b2d]">
                        <span className="counter" data-target="5.9">
                          0
                        </span>
                        M
                      </span>
                      <span className="font-mono-custom text-[9px] uppercase tracking-widest text-[#4b3927]/50">
                        Tons Mass
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="stone-panel group flex flex-col justify-between p-6">
                <Icon icon="ph:star-four-light" className="text-2xl text-[#c88b2d]" />
                <div>
                  <span className="mb-1 block font-mono-custom text-3xl text-[#4b3927]">
                    True North
                  </span>
                  <span className="font-mono-custom text-[10px] uppercase tracking-widest text-[#4b3927]/50">
                    Error margin: 0.05°
                  </span>
                  <p className="mt-3 text-xs text-[#4b3927]/70">
                    Cosmic alignment targeting the constellation of Orion.
                  </p>
                </div>
              </div>

              <div className="stone-panel group flex flex-col justify-between p-6">
                <Icon icon="ph:thermometer-light" className="text-2xl text-[#c88b2d]" />
                <div>
                  <span className="mb-1 block font-mono-custom text-3xl text-[#4b3927]">
                    <span className="counter" data-target="20">
                      0
                    </span>
                    °C
                  </span>
                  <span className="font-mono-custom text-[10px] uppercase tracking-widest text-[#4b3927]/50">
                    Internal Temp
                  </span>
                  <p className="mt-3 text-xs text-[#4b3927]/70">
                    Constant thermal mass regardless of desert fluctuations.
                  </p>
                </div>
              </div>

              <div
                id="ship"
                className="stone-panel group flex flex-col justify-between p-8 md:col-span-2 md:flex-row md:items-center"
              >
                <div className="flex-1">
                  <div className="mb-3 flex items-center gap-3">
                    <Icon icon="ph:boat-light" className="text-2xl text-[#c88b2d]" />
                    <h3 className="font-serif-custom text-xl text-[#4b3927]">
                      Khufu’s Solar Ship
                    </h3>
                  </div>
                  <p className="max-w-md text-sm font-light leading-relaxed text-[#4b3927]/70">
                    Sealed in a bedrock pit, this intact vessel was engineered
                    to carry the resurrected king across the heavens.
                  </p>
                </div>

                <div className="mt-6 font-mono-custom md:mt-0 md:text-right">
                  <span className="mb-1 block text-[10px] uppercase tracking-widest text-[#4b3927]/50">
                    Dimensions
                  </span>
                  <span className="block text-xl text-[#4b3927]">43.6m × 5.9m</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer
        id="footer"
        className="relative z-20 overflow-hidden border-t border-[#c88b2d]/10 bg-[#4b3927] pb-12 pt-24 text-[#f5ead8]"
      >
        <div className="grid-bg absolute inset-0 pointer-events-none opacity-5"></div>

        <div className="relative z-10 mx-auto max-w-[1400px] px-8 md:px-16">
          <div className="mb-20 grid grid-cols-1 gap-12 md:grid-cols-4 md:gap-8">
            <div className="reveal-up md:col-span-2 flex flex-col items-start">
              <Icon icon="ph:compass-rose-light" className="mb-6 text-4xl text-[#c88b2d]" />
              <h2 className="mb-4 font-serif-custom text-3xl text-[#f5ead8] md:text-4xl">
                Preserving the resonance <br /> of human endeavor.
              </h2>
              <p className="mb-8 max-w-md text-sm font-light leading-relaxed text-[#f5ead8]/60">
                The exactitude of the stonework stands as a masterpiece of
                heritage engineering transcending the boundaries of time.
              </p>

              <div className="flex gap-4">
                <a
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[#f5ead8]/20 text-[#f5ead8]/60 transition-colors hover:border-[#c88b2d] hover:text-[#c88b2d]"
                >
                  <Icon icon="ph:instagram-logo-light" className="text-xl" />
                </a>
                <a
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[#f5ead8]/20 text-[#f5ead8]/60 transition-colors hover:border-[#c88b2d] hover:text-[#c88b2d]"
                >
                  <Icon icon="ph:twitter-logo-light" className="text-xl" />
                </a>
                <a
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[#f5ead8]/20 text-[#f5ead8]/60 transition-colors hover:border-[#c88b2d] hover:text-[#c88b2d]"
                >
                  <Icon icon="ph:youtube-logo-light" className="text-xl" />
                </a>
              </div>
            </div>

            <div className="reveal-up delay-100 flex flex-col gap-4">
              <span className="mb-2 font-mono-custom text-[10px] uppercase tracking-widest text-[#f5ead8]/40">
                Expedition
              </span>
              <a href="#" className="text-sm text-[#f5ead8]/70 transition-colors hover:text-[#c88b2d]">
                The Necropolis
              </a>
              <a href="#" className="text-sm text-[#f5ead8]/70 transition-colors hover:text-[#c88b2d]">
                Solar Ship Archive
              </a>
              <a href="#" className="text-sm text-[#f5ead8]/70 transition-colors hover:text-[#c88b2d]">
                Archeo-astronomy
              </a>
              <a href="#" className="text-sm text-[#f5ead8]/70 transition-colors hover:text-[#c88b2d]">
                Virtual Mapping
              </a>
            </div>

            <div className="reveal-up delay-200 flex flex-col gap-4">
              <span className="mb-2 font-mono-custom text-[10px] uppercase tracking-widest text-[#f5ead8]/40">
                Heritage
              </span>
              <a href="#" className="text-sm text-[#f5ead8]/70 transition-colors hover:text-[#c88b2d]">
                Conservation Status
              </a>
              <a href="#" className="text-sm text-[#f5ead8]/70 transition-colors hover:text-[#c88b2d]">
                Historical Timeline
              </a>
              <a href="#" className="text-sm text-[#f5ead8]/70 transition-colors hover:text-[#c88b2d]">
                UNESCO Protocols
              </a>
              <a href="#" className="text-sm text-[#f5ead8]/70 transition-colors hover:text-[#c88b2d]">
                Data Access
              </a>
            </div>
          </div>

          <div className="reveal-up delay-300 flex flex-col items-center justify-between border-t border-[#f5ead8]/10 pt-8 font-mono-custom text-[10px] uppercase tracking-widest text-[#f5ead8]/40 md:flex-row">
            <div className="mb-4 md:mb-0">© 2026 UNESCO HERITAGE INITIATIVE</div>
            <div className="flex gap-6">
              <a href="#" className="transition-colors hover:text-[#f5ead8]">
                Privacy
              </a>
              <a href="#" className="transition-colors hover:text-[#f5ead8]">
                Terms
              </a>
              <span className="text-[#c88b2d]/50">SYS.OP: ONLINE</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}