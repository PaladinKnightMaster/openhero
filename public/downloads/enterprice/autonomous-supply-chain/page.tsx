"use client";

import { Inter } from "next/font/google";
import { useEffect, useRef, useState } from "react";

const inter = Inter({
  subsets: ["latin"],
});

export default function Page() {
  const droneRef = useRef<HTMLDivElement | null>(null);
  const rootRef = useRef<HTMLElement | null>(null);

  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    rootRef.current = document.documentElement;

    let isScrolling = false;

    const updateMouse = (
      e: MouseEvent,
      el: HTMLElement,
      global = false
    ) => {
      const target = global ? rootRef.current : el;

      if (!target) return;

      const rect = global
        ? { left: 0, top: 0 }
        : el.getBoundingClientRect();

      target.style.setProperty(
        "--mouse-x",
        `${e.clientX - rect.left}px`
      );

      target.style.setProperty(
        "--mouse-y",
        `${e.clientY - rect.top}px`
      );
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!rootRef.current) return;

      updateMouse(e, rootRef.current, true);
    };

    const interactiveElements =
      document.querySelectorAll<HTMLElement>(".interactive-el");

    interactiveElements.forEach((el) => {
      el.addEventListener(
        "mousemove",
        (e) => updateMouse(e as MouseEvent, el),
        { passive: true }
      );
    });

    const handleScroll = () => {
      if (!isScrolling) {
        window.requestAnimationFrame(() => {
          const scrolled = window.scrollY;

          if (droneRef.current) {
            droneRef.current.style.transform = `
              translate3d(0, ${scrolled * 0.15}px, 0)
              scale(${1 + scrolled * 0.0003})
            `;
          }

          isScrolling = false;
        });

        isScrolling = true;
      }
    };

    window.addEventListener("mousemove", handleMouseMove, {
      passive: true,
    });

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener(
        "mousemove",
        handleMouseMove
      );

      window.removeEventListener(
        "scroll",
        handleScroll
      );
    };
  }, []);

  const toggleTheme = () => {
    const transition = () => {
      document.body.dataset.theme =
        document.body.dataset.theme === "dark"
          ? ""
          : "dark";

      setDarkMode((prev) => !prev);
    };

    const toggleTheme = () => {
      const transition = () => {
        document.body.dataset.theme =
          document.body.dataset.theme === "dark" ? "" : "dark";

        setDarkMode((prev) => !prev);
      };

      const startViewTransition = (
        document as Document & {
          startViewTransition?: (cb: () => void) => void;
        }
      ).startViewTransition;

      if (typeof document !== "undefined" && startViewTransition) {
        startViewTransition(transition);
      } else {
        transition();
      }
    };
  };

  return (
    <main
      className={`${inter.className} min-h-[200vh] overflow-x-hidden bg-[var(--pearl-canvas)] text-[var(--text-core)] transition-all duration-700`}
    >
      <div
        ref={droneRef}
        className="pointer-events-none fixed right-[-5vw] top-[10vh] z-0 h-[80vh] w-[55vw] overflow-hidden"
        style={{
          maskImage:
            "radial-gradient(ellipse at 60% 50%, black 20%, rgba(0,0,0,0.8) 40%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at 60% 50%, black 20%, rgba(0,0,0,0.8) 40%, transparent 75%)",
        }}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full scale-110 object-cover saturate-110 contrast-105 hue-rotate-[-10deg]"
        >
          <source src="/video.mp4" type="video/mp4" />
        </video>
      </div>

      <nav className="fixed inset-x-0 top-0 z-50 px-8 py-6 mix-blend-luminosity">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-[var(--alert-orange)] shadow-[0_0_20px_var(--alert-orange)]" />

            <span className="text-xl font-bold tracking-tighter">
              FLEXPORT{" "}
              <span className="font-normal text-[var(--text-dim)]">
                INFRASTRUCTURE
              </span>
            </span>
          </div>

          <button
            onClick={toggleTheme}
            className="relative h-6 w-11 rounded-full bg-[var(--surface-bottom)] shadow-[inset_0_2px_4px_var(--shadow-dark),0_1px_1px_var(--shadow-light)]"
          >
            <div
              className={`absolute top-[2px] h-5 w-5 rounded-full bg-[var(--text-core)] transition-all duration-500 ${darkMode
                  ? "translate-x-5"
                  : "translate-x-0"
                }`}
            />
          </button>
        </div>
      </nav>

      <div className="relative z-10 mx-auto max-w-[1600px] px-8 pb-32 pt-40">
        <header className="relative z-20 mb-32 max-w-4xl">
          <span className="mb-6 block text-xs font-semibold uppercase tracking-[0.3em] text-[var(--text-dim)]">
            Global Logistics Ledger
          </span>

          <h1 className="kinetic-heading mb-10 text-7xl font-medium leading-[0.85] tracking-tighter md:text-[7rem]">
            Autonomous
            <br />
            Routing.
          </h1>

          <p className="mb-12 max-w-2xl text-xl leading-relaxed text-[var(--text-dim)]">
            Sub-meter precision telemetry meets predictive
            SKU synchronization. Liquid infrastructure
            reacting to global supply chain variables in
            real-time.
          </p>

          <div className="flex items-center gap-6">
            <button className="liquid-mercury interactive-el">
              Deploy Protocol
            </button>

            <div className="flex flex-col">
              <span className="data-node text-2xl text-[var(--text-core)]">
                12ms
              </span>

              <span className="text-xs uppercase tracking-wider text-[var(--text-dim)]">
                Sync Latency
              </span>
            </div>
          </div>
        </header>

        <section className="grid grid-cols-1 gap-6 xl:grid-cols-12">
          <div className="debossed-volume interactive-el parallax-card flex min-h-[400px] flex-col justify-between p-10 md:col-span-7 md:p-14">
            <div className="mb-20 flex items-start justify-between">
              <span className="text-xs font-medium uppercase tracking-widest text-[var(--text-dim)]">
                Node Telemetry
              </span>

              <div className="h-2 w-2 rounded-full bg-[var(--atmos-cyan)] shadow-[0_0_12px_var(--atmos-cyan)]" />
            </div>

            <div>
              <h2 className="mb-4 text-4xl font-medium tracking-tight">
                Predictive Density
              </h2>

              <p className="max-w-md leading-relaxed text-[var(--text-dim)]">
                Structural rigidities in data visualization
                have been eliminated. Logistics volumes are
                rendered via refractive layers.
              </p>
            </div>
          </div>

          <div className="debossed-volume interactive-el parallax-card flex flex-col justify-between p-10 md:col-span-5">
            <span className="text-xs font-medium uppercase tracking-widest text-[var(--text-dim)]">
              Throughput
            </span>

            <div className="mt-16">
              <div className="data-node mb-2 flex items-baseline gap-2 text-7xl font-light tracking-tighter">
                99.9
                <span className="text-2xl text-[var(--alert-orange)]">
                  %
                </span>
              </div>

              <div className="mt-6 h-1 w-full overflow-hidden rounded-full bg-[var(--shadow-dark)]">
                <div className="h-full w-[99.9%] bg-[var(--alert-orange)] shadow-[0_0_10px_var(--alert-orange)]" />
              </div>
            </div>
          </div>

          <div className="debossed-volume interactive-el parallax-card p-10 md:col-span-4">
            <div className="flex h-full flex-col justify-between">
              <span className="text-xs font-medium uppercase tracking-widest text-[var(--text-dim)]">
                SKU Refraction
              </span>

              <p className="mt-12 text-lg font-medium text-[var(--text-core)]">
                Zero predictable edges. Asset ledgers
                seamlessly bleed into the canvas via OkLCH
                integration.
              </p>
            </div>
          </div>

          <div className="debossed-volume interactive-el parallax-card group relative flex items-center overflow-hidden p-10 md:col-span-8 md:p-14">
            <div className="absolute right-[-5rem] top-[-5rem] h-96 w-96 rounded-full bg-[var(--alert-orange)] opacity-10 blur-[100px] transition-opacity duration-700 group-hover:opacity-30" />

            <h3 className="relative z-10 text-4xl font-light leading-[1.1] tracking-tight md:text-5xl">
              &quot;Absolute cleanliness, technical refraction,
              and the future of industrial movement.&quot;
            </h3>
          </div>
        </section>
      </div>

      <style jsx global>{`
        :root {
          --pearl-canvas: oklch(98% 0.01 200);
          --alert-orange: oklch(68% 0.22 42);
          --atmos-cyan: oklch(82% 0.06 210);
          --text-core: oklch(20% 0.02 200);
          --text-dim: oklch(50% 0.02 200);
          --surface-top: oklch(100% 0 0 / 0.6);
          --surface-bottom: oklch(
            96% 0.01 200 / 0.4
          );
          --shadow-dark: oklch(
            20% 0.02 200 / 0.08
          );
          --shadow-light: oklch(100% 0 0 / 1);
          --mouse-x: 50%;
          --mouse-y: 50%;
          color-scheme: light dark;
        }

        body[data-theme="dark"] {
          --pearl-canvas: oklch(12% 0.01 200);
          --text-core: oklch(98% 0.01 200);
          --text-dim: oklch(70% 0.02 200);
          --surface-top: oklch(
            20% 0.01 200 / 0.4
          );
          --surface-bottom: oklch(
            10% 0.01 200 / 0.6
          );
          --shadow-dark: oklch(
            5% 0.02 200 / 0.8
          );
          --shadow-light: oklch(
            30% 0.01 200 / 0.3
          );
        }

        body {
          overscroll-behavior: none;
          -webkit-font-smoothing: antialiased;
        }

        .debossed-volume {
          position: relative;
          isolation: isolate;
          overflow: hidden;
          border-radius: 2rem;
          border: 1px solid rgba(255, 255, 255, 0.1);

          background: linear-gradient(
            145deg,
            var(--surface-top),
            var(--surface-bottom)
          );

          backdrop-filter: blur(60px)
            saturate(140%);

          box-shadow:
            inset 2px 2px 4px
              var(--shadow-light),
            inset -2px -2px 8px
              var(--shadow-dark),
            10px 20px 40px rgba(0, 0, 0, 0.05);

          transition:
            transform 0.6s
              cubic-bezier(0.16, 1, 0.3, 1),
            box-shadow 0.6s ease;
        }

        .debossed-volume::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;

          background: radial-gradient(
            600px circle at var(--mouse-x)
              var(--mouse-y),
            var(--atmos-cyan),
            transparent 50%
          );

          opacity: 0;
          transition: opacity 0.4s ease;
          mix-blend-mode: overlay;
          pointer-events: none;
        }

        .debossed-volume:hover {
          transform: translateY(-4px)
            scale(1.01);

          box-shadow:
            inset 2px 2px 6px
              var(--shadow-light),
            inset -2px -2px 10px
              var(--shadow-dark),
            15px 30px 60px rgba(0, 0, 0, 0.08);
        }

        .debossed-volume:hover::before {
          opacity: 0.15;
        }

        .liquid-mercury {
          position: relative;
          overflow: hidden;
          display: inline-flex;
          align-items: center;
          justify-content: center;

          border: none;
          border-radius: 999px;

          padding: 1rem 2rem;

          font-weight: 600;
          letter-spacing: -0.02em;
          cursor: pointer;

          color: var(--text-core);

          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.4),
            rgba(255, 255, 255, 0.1)
          );

          backdrop-filter: blur(20px);

          box-shadow:
            inset 0 1px 1px
              rgba(255, 255, 255, 0.8),
            inset 0 -2px 4px
              rgba(0, 0, 0, 0.1),
            0 8px 16px rgba(0, 0, 0, 0.05),
            0 0 0 1px
              rgba(255, 255, 255, 0.2);

          transition: transform 0.4s
            cubic-bezier(0.16, 1, 0.3, 1);
        }

        .liquid-mercury:hover {
          transform: scale(1.03)
            translateY(-2px);
        }

        .kinetic-heading {
          background: linear-gradient(
            110deg,
            var(--text-core) 0%,
            var(--text-dim) 25%,
            var(--text-core) 50%,
            var(--alert-orange) 75%,
            var(--text-core) 100%
          );

          background-size: 200% auto;

          -webkit-background-clip: text;
          background-clip: text;

          color: transparent;

          animation: flow 8s linear infinite;
        }

        @keyframes flow {
          to {
            background-position: 200% center;
          }
        }

        .parallax-card {
          animation: parallax linear both;
          animation-timeline: view();
        }

        @keyframes parallax {
          from {
            transform: translateY(60px)
              scale(0.95);
            opacity: 0;
          }

          to {
            transform: translateY(0)
              scale(1);
            opacity: 1;
          }
        }

        .data-node {
          font-family:
            ui-monospace,
            SFMono-Regular,
            Menlo,
            Monaco,
            Consolas,
            monospace;

          letter-spacing: -0.05em;
        }
      `}</style>
    </main>
  );
}