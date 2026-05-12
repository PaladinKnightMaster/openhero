"use client";

import { useEffect } from "react";

export default function NoxSingleComponent() {
  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      document.documentElement.style.setProperty("--mouse-x", `${e.clientX}px`);
      document.documentElement.style.setProperty("--mouse-y", `${e.clientY}px`);
    };

    window.addEventListener("mousemove", handleGlobalMouseMove);
    return () => window.removeEventListener("mousemove", handleGlobalMouseMove);
  }, []);

  const handleLocalMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  };

  const toggleTheme = () => {
    const switchTheme = () => {
      const current = document.body.getAttribute("data-theme");
      if (current === "light") {
        document.body.removeAttribute("data-theme");
      } else {
        document.body.setAttribute("data-theme", "light");
      }
    };

    if (document.startViewTransition) {
      document.startViewTransition(switchTheme);
    } else {
      switchTheme();
    }
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

        :root {
          color-scheme: dark light;
          --bg: oklch(0.11 0.02 260);
          --bg-soft: oklch(0.14 0.02 260);
          --card: oklch(0.18 0.02 260 / .55);
          --line: oklch(1 0 0 / .08);
          --text: oklch(0.96 0.01 250);
          --muted: oklch(0.72 0.02 250);
          --accent: oklch(0.78 0.19 240);
          --accent-2: oklch(0.74 0.16 190);
          --mouse-x: 50%;
          --mouse-y: 50%;
        }

        [data-theme="light"] {
          --bg: oklch(0.97 0.01 250);
          --bg-soft: oklch(0.94 0.01 250);
          --card: oklch(1 0 0 / .52);
          --line: oklch(0 0 0 / .06);
          --text: oklch(0.18 0.02 260);
          --muted: oklch(0.42 0.02 260);
          --accent: oklch(0.63 0.22 250);
          --accent-2: oklch(0.70 0.16 200);
        }

        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        
        body {
          font-family: 'Inter', sans-serif;
          background: var(--bg);
          color: var(--text);
          overflow-x: hidden;
          letter-spacing: -0.02em;
        }

        body::before {
          content: "";
          position: fixed;
          inset: 0;
          pointer-events: none;
          background:
            radial-gradient(circle at top left, color-mix(in oklch, var(--accent) 16%, transparent), transparent 32%),
            radial-gradient(circle at bottom right, color-mix(in oklch, var(--accent-2) 12%, transparent), transparent 28%);
          opacity: .9;
          z-index: -2;
        }

        .noise::before {
          content: "";
          position: absolute;
          inset: 0;
          opacity: .04;
          background-image: radial-gradient(circle at center, white 1px, transparent 1px);
          background-size: 18px 18px;
          pointer-events: none;
        }

        .liquid-shell {
          position: relative;
          background: linear-gradient(180deg, color-mix(in oklch, var(--card) 95%, transparent), color-mix(in oklch, var(--bg-soft) 88%, transparent));
          border: 1px solid var(--line);
          box-shadow: 0 2px 6px rgba(0, 0, 0, .08), 0 20px 80px rgba(0, 0, 0, .35), inset 0 1px 0 rgba(255, 255, 255, .08), inset 0 -1px 0 rgba(255, 255, 255, .02);
          backdrop-filter: blur(24px) saturate(190%);
          -webkit-backdrop-filter: blur(24px) saturate(190%);
        }

        .hero-grid { container-type: inline-size; }

        .kinetic-title {
          font-size: clamp(4rem, 11vw, 10rem);
          line-height: .82;
          letter-spacing: -0.08em;
          font-weight: 900;
          background: linear-gradient(130deg, rgba(255, 255, 255, 1), rgba(255, 255, 255, .55), rgba(255, 255, 255, 1));
          background-size: 220% auto;
          color: transparent;
          -webkit-background-clip: text;
          animation: shimmer 7s linear infinite;
        }

        @keyframes shimmer {
          from { background-position: 0% center; }
          to { background-position: 220% center; }
        }

        .hero-description {
          color: var(--muted);
          font-size: 1rem;
          line-height: 1.8;
          max-width: 34rem;
        }

        .video-portal {
          position: absolute;
          top: 7%;
          right: -10%;
          width: min(60vw, 980px);
          height: 88%;
          overflow: hidden;
          border-radius: 4rem;
          transform: perspective(1800px) rotateY(-10deg) rotateX(3deg);
          isolation: isolate;
        }

        .video-portal::before {
          content: "";
          position: absolute;
          inset: -1px;
          border-radius: inherit;
          padding: 1px;
          background: linear-gradient(130deg, rgba(255, 255, 255, .45), rgba(255, 255, 255, .02), rgba(255, 255, 255, .25));
          -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
          z-index: 5;
        }

        .video-portal video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: saturate(120%) contrast(112%) brightness(.92);
          mask-image: radial-gradient(circle at var(--mouse-x) var(--mouse-y), black 25%, rgba(0, 0, 0, .92) 45%, transparent 85%);
          -webkit-mask-image: radial-gradient(circle at var(--mouse-x) var(--mouse-y), black 25%, rgba(0, 0, 0, .92) 45%, transparent 85%);
        }

        .video-glow {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at var(--mouse-x) var(--mouse-y), color-mix(in oklch, var(--accent) 35%, transparent), transparent 55%);
          mix-blend-mode: screen;
          opacity: .65;
          pointer-events: none;
        }

        .glass-intersection {
          position: absolute;
          left: 0;
          bottom: 0;
          width: 50%;
          height: 45%;
          background: linear-gradient(180deg, rgba(255, 255, 255, .04), rgba(255, 255, 255, .02));
          mask-image: linear-gradient(to top, black 75%, transparent 100%);
          border-top: 1px solid rgba(255, 255, 255, .08);
          border-right: 1px solid rgba(255, 255, 255, .05);
          pointer-events: none;
        }

        .liquid-btn {
          position: relative;
          isolation: isolate;
          overflow: hidden;
          border-radius: 999px;
          padding: 1rem 1.4rem;
          background: linear-gradient(130deg, rgba(255, 255, 255, .12), rgba(255, 255, 255, .03));
          border: 1px solid rgba(255, 255, 255, .1);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, .12), 0 14px 40px rgba(0, 0, 0, .24);
          transition: transform .45s cubic-bezier(.16, 1, .3, 1), border-color .4s ease;
        }

        .liquid-btn::before {
          content: "";
          position: absolute;
          inset: -40%;
          background: radial-gradient(circle at var(--mouse-x) var(--mouse-y), rgba(255, 255, 255, .75), rgba(255, 255, 255, .14) 18%, transparent 48%);
          opacity: .9;
          transition: transform .12s linear;
          z-index: -1;
        }

        .liquid-btn:hover {
          transform: translateY(-5px) scale(1.01);
          border-color: rgba(255, 255, 255, .25);
        }

        .bento {
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          gap: 1.2rem;
        }

        .bento-card {
          position: relative;
          overflow: hidden;
          border-radius: 2rem;
          min-height: 260px;
          padding: 2rem;
          background: linear-gradient(180deg, rgba(255, 255, 255, .06), rgba(255, 255, 255, .02));
          border: 1px solid rgba(255, 255, 255, .08);
          backdrop-filter: blur(24px);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, .08), 0 20px 60px rgba(0, 0, 0, .2);
          transition: transform .5s cubic-bezier(.16, 1, .3, 1), border-color .4s ease;
        }

        .bento-card::before {
          content: "";
          position: absolute;
          inset: 0;
          background: radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), rgba(255, 255, 255, .12), transparent 40%);
          opacity: 0;
          transition: opacity .4s ease;
        }

        .bento-card:hover {
          transform: translateY(-10px);
          border-color: rgba(255, 255, 255, .18);
        }

        .bento-card:hover::before { opacity: 1; }

        .fade-edge { mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent); }
        .scroll-fade { mask-image: linear-gradient(to bottom, transparent, black 12%, black 88%, transparent); }

        .section-reveal {
          opacity: .2;
          transform: translateY(80px) scale(.96);
          filter: blur(18px);
          animation: reveal linear forwards;
          animation-timeline: view();
          animation-range: entry 15% cover 40%;
        }

        @keyframes reveal {
          to { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
        }

        .tiny-label {
          color: var(--muted);
          font-size: .78rem;
          text-transform: uppercase;
          letter-spacing: .28em;
        }

        .theme-switch {
          width: 54px;
          height: 32px;
          border-radius: 999px;
          position: relative;
          cursor: pointer;
          background: rgba(255, 255, 255, .08);
          border: 1px solid rgba(255, 255, 255, .08);
          backdrop-filter: blur(20px);
        }

        .theme-switch::before {
          content: "";
          position: absolute;
          width: 24px;
          height: 24px;
          border-radius: 999px;
          top: 3px;
          left: 3px;
          background: white;
          transition: .45s cubic-bezier(.16, 1, .3, 1);
        }

        [data-theme="light"] .theme-switch::before { left: 25px; }

        @container (max-width: 980px) {
          .video-portal { position: relative; inset: auto; width: 100%; height: 420px; margin-top: 4rem; transform: none; }
          .glass-intersection { width: 100%; }
          .hero-stack { flex-direction: column; }
          .bento { grid-template-columns: 1fr; }
        }
      `}} />

      <div className="noise min-h-screen">
        <nav className="fixed top-0 inset-x-0 z-50 px-5 md:px-10 pt-6">
          <div className="max-w-[1500px] mx-auto liquid-shell rounded-[2rem] px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="h-11 w-11 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-xl flex items-center justify-center">
                {/* @ts-expect-error Iconify element */}
                <iconify-icon icon="iconamoon:3d-duotone" className="text-2xl text-cyan-400"></iconify-icon>
              </div>

              <div>
                <h2 className="font-black tracking-tight text-xl">NOX</h2>
                <p className="text-xs text-white/45">Liquid Interface System</p>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-2 text-sm text-white/55">
              <a className="px-4 py-2 hover:text-white transition cursor-pointer">Vision</a>
              <a className="px-4 py-2 hover:text-white transition cursor-pointer">Architecture</a>
              <a className="px-4 py-2 hover:text-white transition cursor-pointer">Systems</a>
            </div>

            <div className="flex items-center gap-4">
              <button className="liquid-btn text-sm font-semibold" onMouseMove={handleLocalMouseMove}>
                Enter Platform
              </button>
              <div className="theme-switch" onClick={toggleTheme}></div>
            </div>
          </div>
        </nav>

        <main className="px-4 md:px-8">
          <section className="hero-grid relative min-h-screen max-w-[1600px] mx-auto pt-36 pb-16">
            <div className="liquid-shell rounded-[3rem] relative overflow-hidden min-h-[92vh] px-8 md:px-16 py-16 scroll-fade fade-edge">
              <div 
                className="absolute inset-0 opacity-[.04]" 
                style={{
                  background: `linear-gradient(rgba(255,255,255,.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.15) 1px, transparent 1px)`,
                  backgroundSize: '72px 72px'
                }}
              ></div>

              <div className="hero-stack relative z-10 flex h-full justify-between">
                <div className="relative z-20 max-w-4xl flex flex-col justify-between">
                  <div>
                    <span className="tiny-label">Adaptive Liquid Intelligence</span>
                    <h1 className="kinetic-title mt-8">
                      Beyond<br />interface.
                    </h1>
                    <p className="hero-description mt-10">
                      A perception-driven operating layer where motion, transparency and volumetric light merge into a fluid cinematic system. Designed for future products, not websites.
                    </p>

                    <div className="mt-12 flex flex-wrap items-center gap-4">
                      <button className="liquid-btn font-semibold" onMouseMove={handleLocalMouseMove}>
                        Launch Experience
                      </button>
                      <button className="liquid-btn font-semibold bg-white/5" onMouseMove={handleLocalMouseMove}>
                        System Preview
                      </button>
                    </div>
                  </div>

                  <div className="mt-20 flex flex-wrap gap-10">
                    <div>
                      <p className="text-5xl font-black">12ms</p>
                      <p className="text-white/45 mt-2 text-sm">Motion latency</p>
                    </div>
                    <div>
                      <p className="text-5xl font-black">120fps</p>
                      <p className="text-white/45 mt-2 text-sm">Native rendering</p>
                    </div>
                    <div>
                      <p className="text-5xl font-black">OKLCH</p>
                      <p className="text-white/45 mt-2 text-sm">Perceptual color</p>
                    </div>
                  </div>
                </div>

                <div className="video-portal w-full">
                  <video autoPlay muted loop playsInline src="./video.mp4"></video>
                  <div className="video-glow"></div>
                </div>

                <div className="glass-intersection"></div>
              </div>
            </div>
          </section>

          <section className="max-w-[1500px] mx-auto py-24 section-reveal">
            <div className="flex items-end justify-between gap-10 mb-16 flex-wrap">
              <div>
                <span className="tiny-label">Volumetric Modules</span>
                <h2 className="text-5xl md:text-7xl font-black tracking-[-0.08em] leading-[.88] mt-6">
                  Depth<br />as language.
                </h2>
              </div>
              <p className="max-w-lg text-white/50 leading-8">
                Every layer exists on its own optical plane. Blur, transparency and illumination define hierarchy instead of borders.
              </p>
            </div>

            <div className="bento">
              <article className="bento-card col-span-5" onMouseMove={handleLocalMouseMove}>
                <span className="tiny-label">Optical hierarchy</span>
                <h3 className="text-4xl font-black tracking-tight mt-6">Z-Axis layering.</h3>
                <p className="mt-6 text-white/55 leading-8 max-w-md">
                  Dynamic blur stacks simulate depth and material density through isolated backdrop-filter planes.
                </p>
              </article>

              <article className="bento-card col-span-7" onMouseMove={handleLocalMouseMove}>
                <span className="tiny-label">Kinetic interaction</span>
                <h3 className="text-4xl font-black tracking-tight mt-6">Liquid metal controls.</h3>
                <p className="mt-6 text-white/55 leading-8 max-w-lg">
                  Cursor-reactive gradients distort like mercury under tension, generating tactile feedback without JavaScript animation engines.
                </p>
              </article>

              <article className="bento-card col-span-7" onMouseMove={handleLocalMouseMove}>
                <span className="tiny-label">Native rendering</span>
                <h3 className="text-4xl font-black tracking-tight mt-6">Scroll-driven motion.</h3>
                <p className="mt-6 text-white/55 leading-8 max-w-lg">
                  View timelines and compositor-friendly transforms preserve cinematic fluidity at 120fps across ultra-wide displays.
                </p>
              </article>

              <article className="bento-card col-span-5" onMouseMove={handleLocalMouseMove}>
                <span className="tiny-label">Perceptual system</span>
                <h3 className="text-4xl font-black tracking-tight mt-6">OKLCH fidelity.</h3>
                <p className="mt-6 text-white/55 leading-8 max-w-md">
                  Light and dark themes share identical perceived contrast through perceptual luminance balancing.
                </p>
              </article>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}