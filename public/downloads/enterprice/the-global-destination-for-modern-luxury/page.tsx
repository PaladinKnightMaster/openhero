"use client";

import { useEffect, useRef, type MouseEvent } from "react";

export default function Page() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const primarySkuRef = useRef<HTMLDivElement | null>(null);
  const secondarySkuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const updateParallax = () => {
      const progress = Math.min(window.scrollY / (window.innerHeight * 1.2), 1);
      if (videoRef.current) {
        videoRef.current.style.transform = `translateY(${progress * -8}vh) scale(${1 + progress * 0.06})`;
      }
    };

    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        updateParallax();
        raf = 0;
      });
    };

    updateParallax();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateParallax);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateParallax);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll("[data-reveal]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const triggerSpatialTransition = async (element: HTMLDivElement | null) => {
    if (!element) return;

    if (!(document as Document & { startViewTransition?: (cb: () => void) => { finished: Promise<void> } }).startViewTransition) {
      element.animate(
        [{ transform: "scale(1)" }, { transform: "scale(1.04)" }, { transform: "scale(1)" }],
        { duration: 360, easing: "cubic-bezier(.25,1,.3,1)" }
      );
      return;
    }

    const doc = document as Document & { startViewTransition: (cb: () => void) => { finished: Promise<void> } };
    const transition = doc.startViewTransition(() => {
      element.classList.toggle("scale-110");
      element.classList.toggle("z-50");
      element.style.viewTransitionName = "active-sku";
    });

    await transition.finished;
    element.style.viewTransitionName = "";
  };

  const handleMove = (e: MouseEvent<HTMLButtonElement>) => {
    const target = e.currentTarget;
    const rect = target.getBoundingClientRect();
    target.style.setProperty("--x", `${e.clientX - rect.left}px`);
    target.style.setProperty("--y", `${e.clientY - rect.top}px`);
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[var(--studio-pearl)] text-[oklch(20%_0.05_240)] antialiased">
      <div className="video-anchor fixed right-0 top-0 z-0 h-screen w-[60vw] pointer-events-none [mask-image:radial-gradient(ellipse_150%_120%_at_100%_50%,black_60%,transparent_100%)] [-webkit-mask-image:radial-gradient(ellipse_150%_120%_at_100%_50%,black_60%,transparent_100%)]">
        <video ref={videoRef} autoPlay loop muted playsInline className="h-full w-full object-cover object-center saturate-[1.1] contrast-[1.05]">
          <source src="/video.mp4" type="video/mp4" />
        </video>
        <div className="glass-portal absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.3)_0%,transparent_40%)] mix-blend-soft-light" />
      </div>

      <nav className="pointer-events-none fixed top-0 z-50 flex w-full items-center justify-between px-8 py-6 text-white mix-blend-difference">
        <div className="text-xs font-semibold uppercase tracking-[0.3em]">Headless Architecture</div>
        <div className="text-sm font-medium tracking-tight">Farfetch Spatial</div>
        <div className="text-xs font-semibold uppercase tracking-[0.3em]">Low-Latency Node</div>
      </nav>

      <main className="fractal-container relative z-10 grid min-h-[200vh] grid-cols-12 gap-[clamp(1rem,5cqi,4rem)] px-4 pt-32 md:px-12 lg:px-24">
        <header className="z-plane-1 col-span-12 mt-20 md:col-span-7">
          <h1 className="gradient-text pb-4 text-6xl font-light leading-[0.9] tracking-tighter md:text-8xl">
            Augmented
            <br />
            Conversion
            <br />
            Metrics.
          </h1>
          <p className="mt-8 max-w-md text-xl font-light leading-relaxed opacity-70">
            Orchestrating immersive B2B marketplaces through spatial SKU visualization and high-fidelity depth mapping.
          </p>
          <button
            onMouseMove={handleMove}
            onClick={() => triggerSpatialTransition(primarySkuRef.current)}
            className="liquid-mercury-btn mt-12 rounded-full px-8 py-4 text-sm font-medium tracking-wide text-[var(--holo-blue)]"
          >
            Initialize Commerce Engine
          </button>
        </header>

        <div className="z-plane-2 relative col-span-12 mt-40 md:col-start-8 md:col-span-4">
          <div
            ref={primarySkuRef}
            data-reveal
            className="sculpted-volume spatial-sku flex aspect-[3/4] flex-col justify-between p-8 opacity-0"
          >
            <div className="flex items-start justify-between">
              <span className="text-xs uppercase tracking-[0.3em] opacity-50">SKU-0992</span>
              <div className="h-2 w-2 rounded-full bg-[var(--holo-blue)] shadow-[0_0_10px_var(--holo-blue)]" />
            </div>
            <div className="relative my-6 h-full w-full overflow-hidden rounded-xl bg-gradient-to-tr from-transparent to-[rgba(255,255,255,0.5)]">
              <div className="absolute inset-0 backdrop-blur-md mix-blend-overlay" />
            </div>
            <div>
              <h2 className="text-2xl font-light tracking-tight">Aero-Silk Trench</h2>
              <div className="mt-2 flex items-end justify-between">
                <span className="text-lg font-medium text-[var(--holo-blue)]">$2,450</span>
                <button onMouseMove={handleMove} className="liquid-mercury-btn rounded-full px-4 py-2 text-xs font-medium">
                  Acquire
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="z-plane-1 relative col-span-12 mt-64 md:col-start-2 md:col-span-5">
          <div data-reveal className="sculpted-volume flex aspect-square flex-col items-start justify-center p-10 opacity-0">
            <h3 className="gradient-text mb-4 text-3xl font-light">Volume Over Plane</h3>
            <p className="text-sm leading-relaxed opacity-60">
              Fractal asymmetric grids define our continuous layout structure. Edges dissolve into light gradients, replacing solid boundaries with perceptual depth.
            </p>
          </div>
        </div>

        <div className="z-plane-2 col-span-12 mt-96 md:col-start-9 md:col-span-3">
          <div
            ref={secondarySkuRef}
            data-reveal
            onClick={() => triggerSpatialTransition(secondarySkuRef.current)}
            className="sculpted-volume flex cursor-pointer items-center gap-4 p-6 opacity-0"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--studio-pearl)] shadow-[inset_2px_2px_5px_white,inset_-2px_-2px_5px_rgba(0,0,0,0.05)]">
              <div className="h-8 w-8 rounded-full bg-[var(--holo-blue)] blur-[2px]" />
            </div>
            <div>
              <div className="text-sm font-medium">Holographic Visor</div>
              <div className="mt-1 text-xs opacity-50">Real-time AR overlay</div>
            </div>
          </div>
        </div>
      </main>

      <style jsx global>{`
        :root {
          --studio-pearl: oklch(97% 0.01 240);
          --holo-blue: oklch(60% 0.15 250);
          --pure-light: oklch(100% 0 0);
        }

        * {
          box-sizing: border-box;
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          background-color: var(--studio-pearl);
          color: oklch(20% 0.05 240);
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
          margin: 0;
          overflow-x: hidden;
          overscroll-behavior: none;
        }

        .fractal-container {
          container-type: inline-size;
          container-name: spatial-canvas;
          min-height: 200vh;
          position: relative;
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          gap: clamp(1rem, 5cqi, 4rem);
        }

        .video-anchor {
          position: fixed;
          top: 0;
          right: 0;
          width: 60vw;
          height: 100vh;
          z-index: 0;
          pointer-events: none;
          mask-image: radial-gradient(ellipse 150% 120% at 100% 50%, black 60%, transparent 100%);
          -webkit-mask-image: radial-gradient(ellipse 150% 120% at 100% 50%, black 60%, transparent 100%);
        }

        .video-anchor video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: saturate(1.1) contrast(1.05);
          transform-origin: center center;
          will-change: transform;
        }

        .glass-portal {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at top right, rgba(255,255,255,0.3) 0%, transparent 40%);
          mix-blend-mode: soft-light;
        }

        .sculpted-volume {
          background: var(--studio-pearl);
          box-shadow:
            inset 4px 4px 10px rgba(255,255,255,0.9),
            inset -4px -4px 15px rgba(0,0,0,0.03),
            10px 20px 40px rgba(0,0,0,0.04);
          border-radius: 2rem;
          transition: transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.5s ease;
        }

        .sculpted-volume:hover {
          transform: translateY(-5px) scale(1.02);
          box-shadow:
            inset 6px 6px 15px rgba(255,255,255,1),
            inset -6px -6px 20px rgba(0,0,0,0.02),
            15px 30px 50px rgba(0,0,0,0.06);
        }

        .liquid-mercury-btn {
          background: linear-gradient(135deg, var(--pure-light), var(--studio-pearl));
          box-shadow:
            inset 2px 2px 4px rgba(255,255,255,1),
            inset -2px -2px 6px rgba(0,0,0,0.05),
            0 4px 10px rgba(0,0,0,0.05);
          color: var(--holo-blue);
          position: relative;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
        }

        .liquid-mercury-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent);
          transition: left 0.6s ease;
        }

        .liquid-mercury-btn:hover::before {
          left: 100%;
        }

        .liquid-mercury-btn:active {
          box-shadow:
            inset 4px 4px 8px rgba(0,0,0,0.08),
            inset -4px -4px 8px rgba(255,255,255,0.9),
            0 1px 2px rgba(0,0,0,0.02);
          transform: scale(0.98);
        }

        .gradient-text {
          background: linear-gradient(120deg, oklch(20% 0.05 240), var(--holo-blue));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        @keyframes parallax-float {
          from {
            transform: translateY(0);
          }
          to {
            transform: translateY(-15vh);
          }
        }

        @keyframes parallax-deep {
          from {
            transform: translateY(0) scale(0.95);
          }
          to {
            transform: translateY(-30vh) scale(1.05);
          }
        }

        .z-plane-1 {
          animation: parallax-float linear;
          animation-timeline: scroll();
        }

        .z-plane-2 {
          animation: parallax-deep linear;
          animation-timeline: scroll();
        }

        .spatial-sku {
          view-transition-name: active-sku;
        }

        .reveal {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.7s ease, transform 0.7s cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        .reveal.in-view {
          opacity: 1;
          transform: translateY(0);
        }

        ::view-transition-old(root),
        ::view-transition-new(root) {
          animation-duration: 0.8s;
          animation-timing-function: cubic-bezier(0.25, 1, 0.3, 1);
        }

        @media (max-width: 768px) {
          .video-anchor {
            width: 100vw;
            opacity: 0.55;
          }

          .fractal-container {
            min-height: 220vh;
          }
        }
      `}</style>
    </div>
  );
}
