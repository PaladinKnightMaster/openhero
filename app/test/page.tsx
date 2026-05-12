"use client";

import { useEffect, useRef } from "react";
import { Icon } from "@iconify/react";

export default function Page() {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
  let ticking = false;

  const handleScroll = () => {
    if (ticking) return;

    ticking = true;

    window.requestAnimationFrame(() => {
      const scrolled = window.scrollY;

      if (videoRef.current && scrolled < window.innerHeight * 1.5) {
        const scaleProgress = Math.max(1, 1.4 - scrolled * 0.0005);
        const parallaxY = scrolled * 0.15;
        videoRef.current.style.transform = `scale(${scaleProgress}) translateY(${parallaxY}px)`;
      }

      ticking = false;
    });
  };

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
      rootMargin: "0px 0px -10% 0px",
      threshold: 0.1,
    }
  );

  document.querySelectorAll(".reveal-up:not(.active)").forEach((el) => {
    observer.observe(el);
  });

  window.addEventListener("scroll", handleScroll, { passive: true });

  handleScroll();

  return () => {
    window.removeEventListener("scroll", handleScroll);
    observer.disconnect();
  };
}, []);

  return (
    <>
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400;1,500&display=swap");

        html,
        body {
          margin: 0;
          padding: 0;
          width: 100%;
          background-color: oklch(10% 0.02 160);
          color: oklch(100% 0 0 / 0.9);
          scroll-behavior: smooth;
          overflow-x: hidden;
          font-family: "Inter", sans-serif;
        }

        .vercel-grain {
          position: fixed;
          inset: 0;
          z-index: 9999;
          pointer-events: none;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
          opacity: 0.03;
          mix-blend-mode: screen;
        }

        .liquid-header {
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          background: linear-gradient(
            to bottom,
            oklch(10% 0.02 160 / 0.8),
            oklch(10% 0.02 160 / 0)
          );
          border-bottom: 0.5px solid oklch(100% 0 0 / 0.05);
        }

        .nav-link {
          color: oklch(100% 0 0 / 0.6);
          transition: color 0.4s ease, text-shadow 0.4s ease;
        }

        .nav-link:hover {
          color: oklch(75% 0.25 145);
          text-shadow: 0 0 15px oklch(75% 0.25 145 / 0.4);
        }

        .radial-portal {
          -webkit-mask-image: radial-gradient(
            circle at center,
            black 35%,
            transparent 80%
          );
          mask-image: radial-gradient(
            circle at center,
            black 35%,
            transparent 80%
          );
          will-change: transform;
        }

        .retina-border {
          box-shadow: inset 0 0 0 0.5px oklch(100% 0 0 / 0.15);
        }

        .dew-drop {
          position: relative;
          overflow: hidden;
          background: oklch(90% 0.05 150 / 0.05);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275),
            box-shadow 0.5s ease, background 0.5s ease;
        }

        .dew-drop:hover {
          transform: scale(1.03);
          background: oklch(90% 0.05 150 / 0.1);
          box-shadow: inset 0 0 0 0.5px oklch(75% 0.25 145 / 0.5),
            0 15px 35px oklch(75% 0.25 145 / 0.15);
        }

        .subsurface-text {
          text-shadow: 0 0 45px oklch(75% 0.25 145 / 0.35),
            0 0 15px oklch(75% 0.25 145 / 0.15);
          background: linear-gradient(
            180deg,
            oklch(100% 0 0) 0%,
            oklch(85% 0.1 150) 100%
          );
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        @keyframes sway {
          0%,
          100% {
            transform: rotate(-0.5deg) translateX(-2px);
          }

          50% {
            transform: rotate(0.5deg) translateX(2px);
          }
        }

        .kinetic-sway {
          display: inline-block;
          animation: sway 7s ease-in-out infinite;
          transform-origin: center bottom;
        }

        .reveal-up {
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 1.6s cubic-bezier(0.16, 1, 0.3, 1),
            transform 1.6s cubic-bezier(0.16, 1, 0.3, 1);
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

        #portal-video {
          will-change: transform;
          transform: scale(1.4);
        }

        .rhizome-link {
          opacity: 0.4;
          transition: opacity 0.5s ease, transform 0.5s ease, color 0.5s ease;
        }

        .rhizome-link:hover {
          opacity: 1;
          color: oklch(75% 0.25 145);
          transform: translateX(4px);
        }
      `}</style>

      <div className="vercel-grain" />

      <nav className="fixed top-0 z-50 flex w-full items-center justify-between px-8 py-5 liquid-header">
        <div className="group flex cursor-pointer items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-[oklch(10%_0.02_160)] text-[oklch(75%_0.25_145)] transition-colors duration-500 group-hover:bg-[oklch(75%_0.25_145/0.1)]">
            <Icon icon="ph:plant-light" className="text-lg" />
          </div>
          <span className="font-sans text-[13px] font-medium tracking-widest text-white/90 uppercase">
            INARI
          </span>
        </div>

        <div className="hidden items-center gap-10 font-sans text-[11px] font-medium uppercase tracking-[0.2em] md:flex">
          <a href="#" className="nav-link">
            Genomic Labs
          </a>
          <a href="#" className="nav-link">
            Phenotypes
          </a>
          <a href="#" className="nav-link">
            Synthetics
          </a>
          <a href="#" className="nav-link">
            Ecology
          </a>
        </div>

        <div className="flex items-center gap-4">
          <button className="dew-drop retina-border flex items-center gap-2 rounded-full px-6 py-2.5 font-sans text-[11px] font-medium tracking-[0.2em] text-white/90 uppercase">
            Access Portal
          </button>
        </div>
      </nav>

      <main className="relative z-10 w-full pt-[15vh]">
        <section className="relative mx-auto grid min-h-[85vh] w-full max-w-[1800px] grid-cols-1 gap-12 px-8 md:px-16 lg:grid-cols-2">
          <div
            className="relative z-20 flex max-w-xl flex-col justify-center"
            id="hero-text"
          >
            <div className="reveal-up active mb-8 flex items-center gap-4">
              <div className="h-2 w-2 animate-pulse rounded-full bg-[oklch(75%_0.25_145)] shadow-[0_0_10px_oklch(75%_0.25_145/0.8)]" />
              <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-white/50">
                Chlorophyll fluorescence active
              </span>
            </div>

            <h1 className="reveal-up active delay-100 font-serif text-6xl leading-[0.95] tracking-tighter text-white md:text-7xl lg:text-[6.5rem]">
              <span className="kinetic-sway">Symbiosis</span>
              <br />
              <i className="subsurface-text not-italic">Engineered</i>
            </h1>

            <p className="reveal-up active delay-200 mt-8 max-w-md font-sans text-sm font-light leading-relaxed tracking-wide text-white/40">
              Rebalancing the planet through precise genomic design. Harnessing phyto-neural networks and extreme phenotypic plasticity to rewrite the bounds of photosynthetic efficiency.
            </p>

            <div className="reveal-up active delay-300 mt-12 flex flex-wrap items-center gap-6">
              <button className="dew-drop retina-border flex items-center gap-3 rounded-full px-8 py-4 font-sans text-[12px] font-medium tracking-[0.2em] text-white uppercase">
                Explore Synthesis
                <Icon
                  icon="ph:arrow-right-light"
                  className="text-[14px] text-[oklch(75%_0.25_145)]"
                />
              </button>

              <div className="flex items-center gap-3 text-white/30">
                <Icon icon="ph:activity-light" className="text-xl" />
                <span className="font-sans text-[10px] tracking-widest uppercase">
                  +40% Stomatal Conductance
                </span>
              </div>
            </div>
          </div>

          <div
            className="relative z-10 flex h-[60vh] w-full items-center justify-center lg:h-full lg:justify-end"
            style={{ perspective: "1000px" }}
          >
            <div className="radial-portal absolute inset-0 -top-[10%] h-[120%] w-full lg:-top-[20%] lg:h-[140%] [mask-image:radial-gradient(circle,black_20%,transparent_55%)]">
              <video
                ref={videoRef}
                id="portal-video"
                autoPlay
                loop
                muted
                playsInline
                className="mix-blend-screen w-full h-full object-contain filter contrast-[1.15] saturate-110 brightness-90 will-change-transform"
              >
                <source src="/video.mp4" type="video/mp4" />
              </video>
              <div className="pointer-events-none absolute inset-0 bg-[oklch(10%_0.02_160/0.3)] mix-blend-overlay" />
            </div>
          </div>
        </section>

        <section className="relative z-20 mx-auto w-full max-w-[1800px] border-t border-white/5 px-8 py-32 md:px-16">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-3 lg:gap-20">
            <div className="reveal-up flex flex-col">
              <div className="dew-drop retina-border mb-8 flex h-12 w-12 items-center justify-center rounded-2xl text-[oklch(75%_0.25_145)]">
                <Icon icon="ph:dna-light" className="text-2xl" />
              </div>
              <h3 className="mb-4 font-serif text-2xl text-white">
                Genomic Editing
              </h3>
              <p className="font-sans text-sm leading-relaxed font-light text-white/40">
                Multiplex editing capabilities allowing simultaneous targeted changes across complex plant genomes, accelerating natural evolutionary timelines.
              </p>
            </div>

            <div className="reveal-up delay-100 flex flex-col">
              <div className="dew-drop retina-border mb-8 flex h-12 w-12 items-center justify-center rounded-2xl text-[oklch(75%_0.25_145)]">
                <Icon icon="ph:drop-light" className="text-2xl" />
              </div>
              <h3 className="mb-4 font-serif text-2xl text-white">
                Carbon Sequestration
              </h3>
              <p className="font-sans text-sm leading-relaxed font-light text-white/40">
                Trees engineered to capture deeper carbon pools, transforming atmospheric CO2 into enduring rot-resistant biopolymers at unprecedented rates.
              </p>
            </div>

            <div className="reveal-up delay-200 flex flex-col">
              <div className="dew-drop retina-border mb-8 flex h-12 w-12 items-center justify-center rounded-2xl text-[oklch(75%_0.25_145)]">
                <Icon icon="ph:graph-light" className="text-2xl" />
              </div>
              <h3 className="mb-4 font-serif text-2xl text-white">
                Yield Optimization
              </h3>
              <p className="font-sans text-sm leading-relaxed font-light text-white/40">
                Redesigning metabolic pathways to minimize resource consumption while maximizing caloric density and structural resilience in volatile climates.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="relative z-20 w-full border-t border-white/5 bg-gradient-to-b from-transparent to-[oklch(10%_0.02_160)] px-8 py-20">
        <div className="mx-auto grid max-w-[1800px] grid-cols-1 items-end gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <div className="mb-6 flex items-center gap-3">
              <Icon
                icon="ph:plant-light"
                className="text-2xl text-[oklch(75%_0.25_145)]"
              />
              <span className="font-serif italic text-white/70">
                Inari Agriculture
              </span>
            </div>
            <p className="max-w-sm font-sans text-xs leading-relaxed font-light text-white/30">
              Deploying nature&apos;s deepest algorithms. Our predictive design platform maps the full complexity of plant genomes to solve planetary-scale challenges.
            </p>
          </div>

          <div className="flex flex-col justify-end gap-16 md:flex-row md:gap-32 lg:col-span-7">
            <div className="flex flex-col gap-4">
              <h4 className="mb-2 font-sans text-[10px] uppercase tracking-[0.3em] text-white/20">
                Research
              </h4>
              <a href="#" className="rhizome-link font-serif text-sm text-white flex items-center gap-2">
                <div className="h-[1px] w-4 bg-white/20" />
                Phyto-Networks
              </a>
              <a href="#" className="rhizome-link font-serif text-sm text-white flex items-center gap-2">
                <div className="h-[1px] w-8 bg-white/20" />
                CRISPR Cas9
              </a>
              <a href="#" className="rhizome-link font-serif text-sm text-white flex items-center gap-2">
                <div className="h-[1px] w-2 bg-white/20" />
                Biomaterials
              </a>
            </div>

            <div className="mt-8 flex flex-col gap-4 md:mt-0">
              <h4 className="mb-2 font-sans text-[10px] uppercase tracking-[0.3em] text-white/20">
                Operations
              </h4>
              <a href="#" className="rhizome-link font-serif text-sm text-white flex items-center gap-2">
                <div className="h-[1px] w-6 bg-white/20" />
                Cambridge Labs
              </a>
              <a href="#" className="rhizome-link font-serif text-sm text-white flex items-center gap-2">
                <div className="h-[1px] w-3 bg-white/20" />
                Field Trials
              </a>
              <a href="#" className="rhizome-link font-serif text-sm text-white flex items-center gap-2">
                <div className="h-[1px] w-10 bg-white/20" />
                Investors
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}