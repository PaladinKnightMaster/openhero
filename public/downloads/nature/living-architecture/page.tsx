"use client";

import { useCallback } from "react";
import { Icon } from "@iconify/react";

export default function Page() {
  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

    if (typeof document !== "undefined" && "startViewTransition" in document) {
      const doc = document as Document & {
        startViewTransition?: (callback: () => void) => void;
      };

      doc.startViewTransition?.(() => {
        scrollToTop();
      });
      return;
    }

    scrollToTop();
  }, []);

  return (
    <main className="min-h-screen overflow-x-hidden bg-[var(--color-bg)] text-[var(--color-text)] antialiased">
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&family=DM+Sans:wght@300;400;500;700&display=swap");

        :root {
          --color-bg: oklch(98% 0.01 240);
          --color-moss: oklch(88% 0.1 150);
          --color-text: oklch(15% 0.02 240);
          --font-hero: "Cormorant Garamond", serif;
          --font-tech: "DM Sans", sans-serif;
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          margin: 0;
          background: var(--color-bg);
          color: var(--color-text);
          font-family: var(--font-tech);
          overflow-x: hidden;
          line-height: 1.6;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          text-rendering: optimizeLegibility;
        }

        ::selection {
          background: var(--color-moss);
          color: white;
        }

        h1,
        h2,
        h3 {
          font-family: var(--font-hero);
          font-weight: 500;
          letter-spacing: -0.02em;
        }

        .glass-card {
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.85) 0%, rgba(255, 255, 255, 0.4) 100%);
          backdrop-filter: blur(40px);
          -webkit-backdrop-filter: blur(40px);
          border: 0.5px solid rgba(255, 255, 255, 0.7);
          box-shadow: 0 24px 64px rgba(0, 0, 0, 0.03), inset 0 1px 1px rgba(255, 255, 255, 0.5);
        }

        .dew-drop {
          position: relative;
          overflow: hidden;
          display: inline-flex;
          align-items: center;
          gap: 12px;
          border-radius: 9999px;
          padding: 16px 36px;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 100%);
          backdrop-filter: blur(24px) saturate(1.8);
          -webkit-backdrop-filter: blur(24px) saturate(1.8);
          border: 0.5px solid rgba(255, 255, 255, 0.4);
          box-shadow: inset 0 1px 2px rgba(255, 255, 255, 0.5), inset 0 -1px 4px rgba(255, 255, 255, 0.1),
            0 12px 32px rgba(0, 0, 0, 0.2);
          color: white;
          text-decoration: none;
          font-weight: 500;
          font-size: 0.9rem;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          transition: transform 0.5s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.5s cubic-bezier(0.25, 1, 0.5, 1),
            background 0.5s cubic-bezier(0.25, 1, 0.5, 1);
        }

        .dew-drop::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 9999px;
          box-shadow: inset 0 0 20px rgba(255, 255, 255, 0.4);
          opacity: 0;
          transition: opacity 0.5s ease;
          pointer-events: none;
        }

        .dew-drop:hover {
          transform: translateY(-4px) scale(1.02);
          box-shadow: inset 0 1px 2px rgba(255, 255, 255, 0.8), inset 0 -1px 4px rgba(255, 255, 255, 0.2),
            0 20px 48px rgba(0, 0, 0, 0.4);
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.1) 100%);
        }

        .dew-drop:hover::before {
          opacity: 1;
        }

        .hero-fade-in {
          animation: fadeIn 1.5s cubic-bezier(0.25, 1, 0.5, 1) forwards;
          opacity: 0;
          transform: translateY(20px);
        }

        .bionic-bloom {
          animation: bloom-scroll linear both;
          animation-timeline: view();
          animation-range: entry 5% cover 35%;
        }

        @keyframes fadeIn {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes bloom-scroll {
          from {
            opacity: 0;
            transform: translateY(40px) scale(0.98);
            filter: blur(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: none;
          }
        }

        ::view-transition-old(root),
        ::view-transition-new(root) {
          animation-duration: 1.2s;
          animation-timing-function: cubic-bezier(0.25, 1, 0.5, 1);
        }
      `}</style>

      <nav className="fixed left-0 top-0 z-50 flex w-full items-center justify-between border-b border-white/10 bg-black/10 p-6 px-6 text-white backdrop-blur-md md:px-10">
        <div className="text-xs font-semibold uppercase tracking-[0.35em]">NEOM | The Line</div>
        <div className="flex gap-6 text-[10px] font-medium uppercase tracking-[0.35em] md:gap-10">
          <a href="#explore" onClick={handleNavClick} className="transition-opacity hover:opacity-60">
            Architecture
          </a>
          <a href="#explore" onClick={handleNavClick} className="transition-opacity hover:opacity-60">
            Ecology
          </a>
          <a href="#explore" onClick={handleNavClick} className="transition-opacity hover:opacity-60">
            Systems
          </a>
        </div>
      </nav>

      <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pt-28">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <video autoPlay loop muted playsInline className="h-full w-full object-cover brightness-90 contrast-110 saturate-125">
            <source src="/video.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_60%,var(--color-bg)_100%)]" />
        </div>

        <div className="relative z-10 flex w-full max-w-7xl flex-col items-center">
          <div className="hero-fade-in text-center">
            <h1
              className="mb-6 text-6xl text-white md:text-8xl lg:text-9xl"
              style={{ textShadow: "0 4px 24px rgba(0,0,0,0.4)" }}
            >
              Living Architecture
            </h1>
            <p
              className="mx-auto mb-12 max-w-2xl text-base font-medium tracking-wide text-gray-100 md:text-xl"
              style={{ textShadow: "0 2px 12px rgba(0,0,0,0.5)" }}
            >
              A symbiotic future synthesized through biophilic engineering and organic transparency.
            </p>
            <a href="#explore" className="dew-drop">
              <Icon icon="ph:plant-light" className="text-2xl" />
              Initiate Sequence
            </a>
          </div>
        </div>
      </section>

      <section id="explore" className="relative z-10 overflow-hidden bg-[var(--color-bg)] px-6 py-[12vh] md:px-10">
        <div className="pointer-events-none absolute left-[-10vw] top-0 h-[60vw] w-[60vw] rounded-full bg-[radial-gradient(circle,oklch(88%_0.1_150_/_0.15)_0%,transparent_60%)] blur-[50px]" />
        <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-8 md:gap-16 md:grid-cols-2">
          <article className="glass-card bionic-bloom rounded-[24px] p-8 md:p-14">
            <Icon icon="ph:network-light" className="mb-8 text-5xl text-slate-800" />
            <h2 className="mb-4 text-3xl text-slate-900 md:text-4xl">Hydro-Neural Systems</h2>
            <p className="mb-10 text-base leading-relaxed text-slate-700 md:text-lg">
              Adaptive hydration routing utilizing machine intelligence to mimic capillary action within structural membranes.
              Water flows dynamically based on atmospheric needs.
            </p>
            <div className="mb-8 h-px w-full rounded-full bg-slate-900/10" />
            <div className="flex justify-between text-[10px] font-semibold uppercase tracking-[0.35em] text-slate-500 md:text-xs">
              <span>Status: Active</span>
              <span>Flow: Optimal</span>
            </div>
          </article>

          <article className="glass-card bionic-bloom mt-0 rounded-[24px] p-8 md:mt-24 md:p-14">
            <Icon icon="ph:tree-structure-light" className="mb-8 text-5xl text-slate-800" />
            <h2 className="mb-4 text-3xl text-slate-900 md:text-4xl">Mycelium Networks</h2>
            <p className="mb-10 text-base leading-relaxed text-slate-700 md:text-lg">
              Subterranean data and nutrient distribution using engineered fungal logic gates. The city communicates through biochemical synapses embedded in the foundation.
            </p>
            <div className="mb-8 h-px w-full rounded-full bg-slate-900/10" />
            <div className="flex justify-between text-[10px] font-semibold uppercase tracking-[0.35em] text-slate-500 md:text-xs">
              <span>Integration: 98%</span>
              <span>Latency: 0.2ms</span>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}