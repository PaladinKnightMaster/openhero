"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";

const dockItems = [
  { icon: "ph:house" },
  { icon: "ph:atom" },
  { icon: "ph:circles-four" },
  { icon: "ph:sparkle" },
];

const metrics = [
  { label: "Yield Index", value: "98%", tone: "text-cyan-300" },
  { label: "Photon Stability", value: "Live", tone: "text-pink-400" },
  { label: "Neural Sync", value: "0.2ms", tone: "text-amber-300" },
];

export default function Page() {
  const heroVideoRef = useRef<HTMLVideoElement | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const updateHero = () => {
      const progress = Math.min(Math.max(window.scrollY / (window.innerHeight * 1.15), 0), 1);
      const scale = 1.05 + progress * 0.1;
      const translateY = progress * 14;

      if (heroVideoRef.current) {
        heroVideoRef.current.style.transform = `scale(${scale}) translateY(${translateY}px)`;
      }

      setScrolled(window.scrollY > 12);
    };

    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        updateHero();
        raf = 0;
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
    const targets = document.querySelectorAll("[data-bloom]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleMove = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    const target = e.currentTarget;
    const rect = target.getBoundingClientRect();
    target.style.setProperty("--x", `${e.clientX - rect.left}px`);
    target.style.setProperty("--y", `${e.clientY - rect.top}px`);
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#06060a] text-white antialiased">
      <div className="fixed inset-0 -z-10 pointer-events-none bg-[radial-gradient(circle_at_20%_10%,rgba(255,56,182,.12),transparent_20%),radial-gradient(circle_at_80%_20%,rgba(97,218,251,.1),transparent_22%),linear-gradient(180deg,#09090d_0%,#06060a_100%)]" />
      <div className="grain fixed inset-0 -z-10 pointer-events-none opacity-[0.3] mix-blend-screen" />

      <div className="dock fixed bottom-6 left-1/2 z-[60] -translate-x-1/2">
        <div className="dock-inner flex gap-3 rounded-full border border-white/8 bg-white/6 p-3 backdrop-blur-[40px]">
          {dockItems.map((item) => (
            <a key={item.icon} href="#" className="dock-btn grid h-[52px] w-[52px] place-items-center rounded-full border border-white/8 bg-white/4 transition duration-500 ease-[cubic-bezier(.16,1,.3,1)] hover:-translate-y-1.5 hover:scale-105 hover:bg-white/8">
              <Icon icon={item.icon} className="text-xl text-white/85" />
            </a>
          ))}
        </div>
      </div>

      <main>
        <section className="relative min-h-screen overflow-hidden">
          <div className="absolute inset-0 hero-mask">
            <video
              ref={heroVideoRef}
              autoPlay
              muted
              loop
              playsInline
              className="hero-video absolute inset-0 h-full w-full object-cover brightness-[1.1] saturate-[1.4] contrast-[1.15]"
            >
              <source src="/video.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,56,182,.22),transparent_20%),radial-gradient(circle_at_70%_40%,rgba(97,218,251,.18),transparent_22%),linear-gradient(180deg,rgba(0,0,0,.1),rgba(0,0,0,.55))]" />
          </div>

          <div className="relative z-10 mx-auto flex min-h-screen max-w-[1600px] items-center px-8">
            <div className="max-w-3xl">
              <div className="glass inline-flex items-center gap-3 rounded-full px-5 py-3 text-[11px] uppercase tracking-[0.3em] text-white/60">
                <div className="h-2 w-2 rounded-full bg-cyan-300" />
                Neural-optic synchronization active
              </div>

              <h1 className="serif mt-8 text-[clamp(4rem,9vw,8rem)] leading-[.85] text-white">
                <span className="wind block">Synthetic</span>
                <span className="wind block">Light</span>
                <span className="wind block">Architectures</span>
              </h1>

              <p className="copy mt-8 max-w-2xl rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 text-lg leading-9 text-white/68 backdrop-blur-[40px]">
                A next-generation luminous interface engineered around chromatic protein sequencing, photon-efficient biosynthesis, and neural-optic ecosystems.
              </p>

              <div className="mt-10 flex gap-4">
                <button onMouseMove={handleMove} className="glass rounded-full px-8 py-5 text-[11px] uppercase tracking-[0.25em] text-white">
                  Launch Spectrum
                </button>
                <button className="rounded-full border border-white/10 px-8 py-5 text-[11px] uppercase tracking-[0.25em] text-white/70">
                  Explore Systems
                </button>
              </div>
            </div>
          </div>

          <div className="floating-label right-[10%] top-[28%] rounded-full border border-white/8 bg-white/4 px-4 py-3 text-[11px] uppercase tracking-[0.2em] text-white/85 backdrop-blur-[30px]">
            Live Cytoplasmic Stability
          </div>
        </section>

        <section className="relative overflow-hidden px-8 py-40">
          <div className="massive-number absolute left-0 top-0 text-[clamp(7rem,20vw,18rem)] leading-[.8] font-bold text-white/[0.06]">
            01
          </div>

          <div className="editorial relative z-10 mx-auto grid max-w-[1600px] gap-20 lg:grid-cols-[1fr_1.2fr] lg:items-center">
            <div>
              <div className="text-[11px] uppercase tracking-[0.3em] text-white/40">Editorial Narrative</div>
              <h2 className="serif mt-6 text-[clamp(3rem,6vw,6rem)] leading-[.9] text-white">
                Light behaving like biological matter.
              </h2>
            </div>

            <div className="space-y-10">
              <p className="text-xl leading-10 text-white/70">
                Lumina Gen dissolves the idea of a traditional dashboard into a reactive atmospheric system where color, motion, and biological light become one continuous interface.
              </p>
              <div className="river-line h-px bg-[linear-gradient(90deg,transparent,rgba(255,56,182,.5),rgba(97,218,251,.6),transparent)]" />
              <p className="max-w-xl text-base leading-8 text-white/55">
                Built around chromatic protein sequencing and neural-optic synchronization, the system responds like a living ecosystem instead of static software.
              </p>
            </div>
          </div>
        </section>

        <section className="px-8 py-20">
          <div className="data-monolith relative mx-auto min-h-[720px] max-w-[1700px] overflow-hidden rounded-[4rem] border border-white/8 bg-[linear-gradient(145deg,rgba(255,255,255,.04),rgba(255,255,255,.01))]">
            <div className="absolute inset-[-20%] bg-[radial-gradient(circle_at_20%_30%,rgba(255,56,182,.18),transparent_20%),radial-gradient(circle_at_80%_40%,rgba(97,218,251,.15),transparent_20%),radial-gradient(circle_at_50%_80%,rgba(255,153,0,.12),transparent_25%)] blur-[80px]" />
            <div className="orbit absolute left-[10%] top-[15%] h-[18rem] w-[18rem] rounded-full border border-white/8" />
            <div className="orbit absolute right-[12%] top-[20%] h-[28rem] w-[28rem] rounded-full border border-white/8" />
            <div className="orbit absolute bottom-[10%] left-[30%] h-[22rem] w-[22rem] rounded-full border border-white/8" />

            <div className="relative z-10 flex h-full flex-col justify-between p-10">
              <div className="flex items-start justify-between gap-8">
                <div>
                  <div className="text-[11px] uppercase tracking-[0.3em] text-white/45">Neural-optic Core</div>
                  <h2 className="serif mt-6 max-w-3xl text-[clamp(3rem,6vw,6rem)] leading-[.9] text-white">
                    A monolithic chromatic ecosystem.
                  </h2>
                </div>
                <div className="max-w-sm text-right leading-8 text-white/60">
                  Real-time biosynthetic telemetry visualized through a living atmospheric architecture.
                </div>
              </div>

              <div className="grid gap-10 md:grid-cols-3">
                {metrics.map((metric) => (
                  <div key={metric.label}>
                    <div className="text-[11px] uppercase tracking-[0.28em] text-white/40">{metric.label}</div>
                    <div className={`mt-4 text-7xl font-semibold ${metric.tone}`}>{metric.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="overflow-hidden py-40">
          <div className="marquee flex gap-20 whitespace-nowrap">
            {[
              ["Chromatic Sequencing", "text-white/[0.06]"],
              ["Neural Synchronization", "text-cyan-300/10"],
              ["Photon Biosynthesis", "text-pink-400/10"],
              ["Synthetic Luminosity", "text-white/[0.06]"],
            ].map(([text, color]) => (
              <div key={text} className={`serif text-[9rem] leading-none ${color}`}>
                {text}
              </div>
            ))}
          </div>
        </section>

        <section className="px-8 py-20">
          <div className="mx-auto grid max-w-[1600px] gap-12 lg:grid-cols-[1.2fr_.8fr]">
            <div className="quote-panel rounded-[4rem] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,.05),rgba(255,255,255,.01))] p-10 md:p-24">
              <div className="text-[11px] uppercase tracking-[0.3em] text-white/40">Field Observation</div>
              <blockquote className="serif mt-10 text-[clamp(3rem,6vw,5rem)] leading-[1] text-white">
                “The interface dissolves into pure atmospheric light.”
              </blockquote>
              <p className="mt-10 max-w-xl text-lg leading-9 text-white/65">
                Instead of windows and panels, Lumina creates chromatic environments engineered to feel alive and reactive.
              </p>
            </div>

            <div className="flex items-center justify-center">
              <button className="cta-orb h-56 w-56 rounded-full border border-white/10 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,.18),rgba(255,255,255,.04))] transition duration-1000 ease-[cubic-bezier(.16,1,.3,1)] hover:scale-105 hover:rotate-6 hover:shadow-[0_0_100px_rgba(97,218,251,.18)]">
                <div className="text-center">
                  <div className="text-[11px] uppercase tracking-[0.3em] text-white/50">Access</div>
                  <div className="serif mt-2 text-4xl text-white">Prism</div>
                </div>
              </button>
            </div>
          </div>
        </section>
      </main>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;600;700;800&family=Cormorant+Garamond:wght@500;600;700&display=swap');

        :root {
          --bg: oklch(8% .02 280);
          --cyan: oklch(79% .17 220);
          --magenta: oklch(70% .28 340);
          --amber: oklch(82% .17 70);
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
            radial-gradient(circle at 20% 10%, rgba(255, 56, 182, .12), transparent 20%),
            radial-gradient(circle at 80% 20%, rgba(97, 218, 251, .1), transparent 22%),
            linear-gradient(180deg, #09090d 0%, #06060a 100%);
          color: white;
        }

        body::before {
          content: '';
          position: fixed;
          inset: 0;
          pointer-events: none;
          background-image:
            linear-gradient(rgba(255, 255, 255, .03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, .03) 1px, transparent 1px);
          background-size: 100px 100px;
          mask-image: radial-gradient(circle at center, black 20%, transparent 90%);
          opacity: .3;
          z-index: -1;
        }

        .serif {
          font-family: 'Cormorant Garamond', serif;
          letter-spacing: -.05em;
        }

        .copy {
          font-family: 'Inter Tight', sans-serif;
        }

        .glass {
          background: rgba(255, 255, 255, .04);
          border: 1px solid rgba(255, 255, 255, .08);
          backdrop-filter: blur(30px) saturate(1.4);
          -webkit-backdrop-filter: blur(30px) saturate(1.4);
          box-shadow:
            0 10px 60px rgba(0, 0, 0, .45),
            inset 0 1px 0 rgba(255, 255, 255, .08);
        }

        .wind {
          animation: wind 8s ease-in-out infinite;
          display: inline-block;
          transform-origin: center bottom;
        }

        .hero-mask {
          mask-image:
            radial-gradient(circle at center, black 35%, rgba(0, 0, 0, .95) 52%, rgba(0, 0, 0, .75) 70%, transparent 100%);
          -webkit-mask-image:
            radial-gradient(circle at center, black 35%, rgba(0, 0, 0, .95) 52%, rgba(0, 0, 0, .75) 70%, transparent 100%);
        }

        .hero-video {
          animation: zoom 16s linear infinite alternate;
        }

        .floating-label {
          position: absolute;
          padding: 12px 16px;
          border-radius: 999px;
          font-size: 11px;
          letter-spacing: .2em;
          text-transform: uppercase;
          background: rgba(255, 255, 255, .04);
          backdrop-filter: blur(30px);
          border: 1px solid rgba(255, 255, 255, .08);
        }

        .massive-number {
          font-size: clamp(7rem, 20vw, 18rem);
          line-height: .8;
          font-weight: 700;
          color: rgba(255, 255, 255, .06);
        }

        .river-line {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255, 56, 182, .5), rgba(97, 218, 251, .6), transparent);
        }

        .editorial {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 5rem;
          align-items: center;
        }

        .data-monolith {
          border-radius: 4rem;
        }

        .orbit {
          position: absolute;
          border: 1px solid rgba(255, 255, 255, .08);
          border-radius: 999px;
        }

        .marquee {
          display: flex;
          gap: 80px;
          white-space: nowrap;
          animation: marquee 20s linear infinite;
        }

        .quote-panel {
          border-radius: 4rem;
        }

        .cta-orb {
          display: grid;
          place-items: center;
        }

        .bloom {
          opacity: 0;
          transform: translateY(28px) scale(.98);
        }

        .bloom.in {
          animation: bloom .9s cubic-bezier(.16, 1, .3, 1) forwards;
        }

        @keyframes bloom {
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes marquee {
          to {
            transform: translateX(-50%);
          }
        }

        @keyframes zoom {
          from {
            transform: scale(1.05);
          }

          to {
            transform: scale(1.15);
          }
        }

        @keyframes wind {
          0%,
          100% {
            transform: rotate(-1deg);
          }

          50% {
            transform: rotate(1deg);
          }
        }

        @media (max-width: 1024px) {
          .editorial {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .massive-number {
            opacity: .45;
          }
        }

        @media (max-width: 768px) {
          .marquee {
            gap: 40px;
          }

          .marquee > div {
            font-size: 4.5rem !important;
          }

          .quote-panel {
            padding: 2rem !important;
          }

          .floating-label {
            right: 1rem !important;
            top: 22% !important;
          }
        }
      `}</style>
    </div>
  );
}
