"use client";

import { Icon } from "@iconify/react";
import { Inter, JetBrains_Mono, Playfair_Display } from "next/font/google";
import { useEffect, useRef } from "react";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair", style: ["normal", "italic"] });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export default function Page() {
  const navbarRef = useRef<HTMLElement | null>(null);
  const videoContainerRef = useRef<HTMLDivElement | null>(null);
  const heroTextRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;

      window.requestAnimationFrame(() => {
        const scrolled = window.scrollY;
        const navbar = navbarRef.current;
        const videoContainer = videoContainerRef.current;

        if (navbar) {
          navbar.classList.toggle("scrolled", scrolled > 50);
        }

        if (videoContainer && scrolled < window.innerHeight * 1.5) {
          const rotation = scrolled * 0.02;
          const scale = 1 + scrolled * 0.0005;
          videoContainer.style.transform = `scale(${scale}) rotate(${rotation}deg)`;
        }

        ticking = false;
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      const heroTextContainer = heroTextRef.current;
      if (!heroTextContainer) return;

      const xAxis = (window.innerWidth / 2 - e.pageX) / 50;
      const yAxis = (window.innerHeight / 2 - e.pageY) / 50;
      heroTextContainer.style.transform = `translate3d(${xAxis}px, ${yAxis}px, 0)`;
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

    document.querySelectorAll<HTMLElement>(".reveal-up").forEach((el) => observer.observe(el));

    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("mousemove", handleMouseMove, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousemove", handleMouseMove);
      observer.disconnect();
    };
  }, []);

  return (
    <main className={`${inter.variable} ${playfair.variable} ${mono.variable} relative z-10 min-h-screen w-full overflow-x-hidden bg-[var(--obsidian)] text-[var(--pearl)] antialiased selection:bg-[color:var(--gold)]/20 selection:text-[var(--gold)]`}>
      <div className="vercel-grain" />

      <nav ref={navbarRef} id="navbar" className="nav-header fixed top-0 z-50 flex w-full items-center justify-between px-8 py-6">
        <div className="group flex cursor-pointer items-center gap-4">
          <Icon icon="ph:columns-light" className="text-2xl text-[color:var(--pearl)]/50 transition-colors duration-500 group-hover:text-[var(--gold)]" />
          <div className="flex flex-col">
            <span className="font-[family:var(--font-mono)] text-[9px] uppercase tracking-[0.3em] text-[var(--basalt)]">S.P.Q.R.</span>
            <span className="font-[family:var(--font-playfair)] text-[14px] italic text-[color:var(--pearl)]/80">Roma Antiqua</span>
          </div>
        </div>

        <div className="hidden items-center gap-12 font-[family:var(--font-mono)] text-[10px] uppercase tracking-[0.2em] md:flex">
          <a href="#hypogeum" className="monument-link">Hypogeum</a>
          <a href="#vomitoria" className="monument-link">Vomitoria</a>
          <a href="#velarium" className="monument-link">Velarium</a>
        </div>

        <div className="flex items-center gap-2">
          <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--gold)]" />
          <span className="font-[family:var(--font-mono)] text-[9px] uppercase tracking-widest text-[color:var(--pearl)]/40">Live Index</span>
        </div>
      </nav>

      <section className="relative grid min-h-screen grid-cols-1 lg:grid-cols-2">
        <div className="relative z-20 flex flex-col justify-center px-8 pt-32 md:px-16 lg:px-24 lg:pt-0">
          <div className="hidden lg:block absolute left-6 top-1/2 -translate-y-1/2 -rotate-180" style={{ writingMode: "vertical-rl" }}>
            <span className="flex items-center gap-4 font-[family:var(--font-mono)] text-[9px] uppercase tracking-[0.4em] text-[var(--basalt)]">
              <span className="h-12 w-px bg-[color:var(--basalt)]/30" />
              Lat 41.8902° N / Lon 12.4922° E
              <span className="h-12 w-px bg-[color:var(--basalt)]/30" />
            </span>
          </div>

          <div ref={heroTextRef} className="kinetic-z" id="hero-text-container">
            <div className="reveal-up active mb-8 flex items-center gap-4">
              <Icon icon="ph:compass-light" className="text-lg text-[var(--gold)]" />
              <span className="font-[family:var(--font-mono)] text-[10px] uppercase tracking-[0.4em] text-[color:var(--pearl)]/40">Flavian Amphitheater</span>
            </div>

            <h1 className="reveal-up active delay-100 font-[family:var(--font-playfair)] text-6xl leading-[0.9] tracking-tighter text-[var(--pearl)] md:text-8xl lg:text-[7rem]">
              Engineering <br />
              <i className="gold-glow not-italic tracking-tight pr-4">The Empire</i>
            </h1>

            <p className="reveal-up active delay-200 mt-10 max-w-md font-[family:var(--font-inter)] text-sm font-light leading-relaxed text-[color:var(--pearl)]/40">
              A masterclass in Travertine structural mass. Explore the exactitude of ancient logistics, where monumental geometry meets absolute spatial dominance in the heart of Rome.
            </p>

            <div className="reveal-up active delay-300 mt-12 flex items-center gap-8">
              <div className="flex flex-col gap-1">
                <span className="font-[family:var(--font-mono)] text-[9px] uppercase tracking-widest text-[var(--basalt)]">Capacity</span>
                <span className="font-[family:var(--font-playfair)] text-2xl text-[color:var(--pearl)]/90">80,000</span>
              </div>
              <div className="h-8 w-px bg-[color:var(--pearl)]/10" />
              <div className="flex flex-col gap-1">
                <span className="font-[family:var(--font-mono)] text-[9px] uppercase tracking-widest text-[var(--basalt)]">Material</span>
                <span className="font-[family:var(--font-playfair)] text-2xl text-[color:var(--pearl)]/90">Travertine</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pointer-events-none relative z-10 flex h-[60vh] w-full items-center justify-center overflow-hidden lg:h-screen lg:justify-end">
          <div ref={videoContainerRef} className="radial-portal absolute inset-0 h-full w-full lg:translate-x-12" id="orbital-container">
            <video autoPlay loop muted playsInline className="h-full w-full scale-105 object-cover opacity-80 mix-blend-screen contrast-125 saturate-50" id="orbital-video">
              <source src="/video.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-[var(--obsidian)]/20 mix-blend-overlay" />
          </div>
        </div>
      </section>

      <section id="hypogeum" className="mx-auto max-w-[1600px] border-t border-white/5 px-8 py-32 md:px-16 lg:px-24">
        <div className="reveal-up mb-20 flex flex-col items-end justify-between md:flex-row md:items-end">
          <h2 className="font-[family:var(--font-playfair)] text-4xl tracking-tighter text-[var(--pearl)] md:text-5xl lg:text-6xl">
            Architectural <br /> <i className="not-italic text-[var(--gold)]">Archeology</i>
          </h2>
          <p className="mt-6 max-w-xs font-[family:var(--font-inter)] text-xs font-light leading-relaxed text-[color:var(--pearl)]/40 md:mt-0">
            Extracting the logic behind the empire&apos;s most sophisticated mechanical environment.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12">
          <div className="subsurface-mass reveal-up delay-100 flex min-h-[400px] flex-col justify-between p-10 md:p-14">
            <div>
              <span className="mb-6 block font-[family:var(--font-mono)] text-[10px] uppercase tracking-[0.3em] text-[var(--gold)]">01. Subterranean Logistics</span>
              <h3 className="mb-4 font-[family:var(--font-playfair)] text-3xl text-[var(--pearl)]">Hypogeum Mechanics</h3>
              <p className="max-w-md font-[family:var(--font-inter)] text-sm font-light leading-relaxed text-[color:var(--pearl)]/40">
                A complex two-level subterranean network of tunnels and 32 animal pens. Utilizing a system of pulleys and capstans operated by intricate kinetic engineering to elevate scenery seamlessly into the arena.
              </p>
            </div>
            <Icon icon="ph:kanban-light" className="mt-12 text-4xl text-[var(--basalt)]" />
          </div>

          <div id="vomitoria" className="subsurface-mass reveal-up delay-200 flex min-h-[400px] flex-col justify-between p-10 md:p-14">
            <div>
              <span className="mb-6 block font-[family:var(--font-mono)] text-[10px] uppercase tracking-[0.3em] text-[var(--gold)]">02. Crowd Dynamics</span>
              <h3 className="mb-4 font-[family:var(--font-playfair)] text-3xl text-[var(--pearl)]">Vomitoria Efficiency</h3>
              <p className="max-w-md font-[family:var(--font-inter)] text-sm font-light leading-relaxed text-[color:var(--pearl)]/40">
                76 public entrances calibrated for hyper-efficient macroscopic flow. The vaulted passage architecture allowed an audience of 80,000 to evacuate the structural mass in exactly 15 minutes.
              </p>
            </div>
            <Icon icon="ph:wave-sine-light" className="mt-12 text-4xl text-[var(--basalt)]" />
          </div>

          <div id="velarium" className="subsurface-mass reveal-up delay-100 flex min-h-[400px] flex-col justify-between p-10 md:col-span-2 md:p-14 lg:col-span-1">
            <div>
              <span className="mb-6 block font-[family:var(--font-mono)] text-[10px] uppercase tracking-[0.3em] text-[var(--gold)]">03. Environmental Control</span>
              <h3 className="mb-4 font-[family:var(--font-playfair)] text-3xl text-[var(--pearl)]">Velarium Implementation</h3>
              <p className="max-w-md font-[family:var(--font-inter)] text-sm font-light leading-relaxed text-[color:var(--pearl)]/40">
                An active retractable awning system engineered by sailors of the Roman fleet. Manipulating massive canvas sails to regulate thermal exposure and create microclimates within the cavea.
              </p>
            </div>
            <Icon icon="ph:wind-light" className="mt-12 text-4xl text-[var(--basalt)]" />
          </div>

          <div className="subsurface-mass reveal-up delay-200 flex min-h-[400px] flex-col justify-between bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LCAyNTUsIDI1NSwgMC4wNSkiLz48L3N2Zz4=')] p-10 md:p-14">
            <div className="flex h-full w-full flex-col items-center justify-center text-center">
              <Icon icon="ph:cube-light" className="mb-6 text-6xl text-[var(--gold)] opacity-80 animate-[spin_30s_linear_infinite]" />
              <h3 className="font-[family:var(--font-playfair)] text-2xl text-[var(--pearl)]">Travertine Matrix</h3>
              <span className="font-[family:var(--font-mono)] text-[10px] uppercase tracking-widest text-[var(--basalt)]">100,000 Cubic Meters</span>
            </div>
          </div>
        </div>
      </section>

      <footer className="relative z-20 overflow-hidden border-t border-white/5 bg-[var(--obsidian)] px-8 py-24 md:px-16 lg:px-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,oklch(75%_0.18_55/0.05)_0%,transparent_60%)]" />

        <div className="mx-auto grid max-w-[1600px] grid-cols-1 items-end gap-16 md:grid-cols-12 md:gap-8">
          <div className="reveal-up md:col-span-5">
            <h3 className="select-none font-[family:var(--font-playfair)] text-5xl font-bold uppercase tracking-tighter text-[var(--pearl)] md:text-7xl">Aeternus</h3>
            <div className="mt-6 flex items-center gap-4">
              <div className="h-px w-12 bg-[color:var(--basalt)]/30" />
              <p className="font-[family:var(--font-mono)] text-[10px] uppercase tracking-[0.3em] text-[var(--basalt)]">80 AD — Present</p>
            </div>
          </div>

          <div className="reveal-up delay-100 md:col-span-4 flex flex-col gap-5">
            <span className="mb-2 font-[family:var(--font-mono)] text-[9px] uppercase tracking-widest text-[var(--basalt)]">Imperial Archives</span>
            <a href="#" className="monument-link flex w-fit items-center gap-2 font-[family:var(--font-inter)] text-[11px] uppercase tracking-[0.2em] text-[color:var(--pearl)]/40 transition-colors hover:text-[var(--gold)]">Geographical Coordinates <Icon icon="ph:arrow-up-right-light" /></a>
            <a href="#" className="monument-link flex w-fit items-center gap-2 font-[family:var(--font-inter)] text-[11px] uppercase tracking-[0.2em] text-[color:var(--pearl)]/40 transition-colors hover:text-[var(--gold)]">Travertine Sourcing <Icon icon="ph:arrow-up-right-light" /></a>
            <a href="#" className="monument-link flex w-fit items-center gap-2 font-[family:var(--font-inter)] text-[11px] uppercase tracking-[0.2em] text-[color:var(--pearl)]/40 transition-colors hover:text-[var(--gold)]">Conservation Dept <Icon icon="ph:arrow-up-right-light" /></a>
          </div>

          <div className="reveal-up delay-200 text-left md:col-span-3 md:text-right">
            <Icon icon="ph:bank-light" className="mb-4 block text-3xl text-[var(--basalt)] md:ml-auto" />
            <span className="mb-1 block font-[family:var(--font-playfair)] text-sm text-[color:var(--pearl)]/30">Ministry of Cultural Heritage</span>
            <span className="block font-[family:var(--font-mono)] text-[9px] uppercase tracking-widest text-[var(--basalt)]">Senatus Populusque Romanus</span>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        :root {
          --obsidian: oklch(12% 0.01 240);
          --gold: oklch(75% 0.18 55);
          --basalt: oklch(40% 0.05 40);
          --pearl: oklch(100% 0 0);
          --surface-top: oklch(13% 0.01 240);
          --surface-bottom: oklch(11% 0.01 240);
          --shadow-dark: oklch(5% 0.02 240 / 0.8);
          --shadow-light: oklch(100% 0 0 / 0.03);
        }

        html,
        body {
          margin: 0;
          padding: 0;
          width: 100%;
          background-color: var(--obsidian);
          color: oklch(100% 0 0 / 0.8);
          scroll-behavior: smooth;
          overflow-x: hidden;
        }

        body {
          -webkit-font-smoothing: antialiased;
          overscroll-behavior: none;
        }

        .vercel-grain {
          position: fixed;
          inset: 0;
          z-index: 9999;
          pointer-events: none;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
          opacity: 0.035;
          mix-blend-mode: screen;
        }

        .nav-header {
          transition: background-color 0.5s ease, backdrop-filter 0.5s ease, border-color 0.5s ease;
          border-bottom: 0.5px solid transparent;
        }

        .nav-header.scrolled {
          background-color: oklch(12% 0.01 240 / 0.5);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 0.5px solid oklch(100% 0 0 / 0.05);
        }

        .radial-portal {
          -webkit-mask-image: radial-gradient(circle at center, black 25%, transparent 75%);
          mask-image: radial-gradient(circle at center, black 25%, transparent 75%);
          will-change: transform;
        }

        .gold-glow {
          filter: drop-shadow(0 0 25px oklch(75% 0.18 55 / 0.25));
          background: linear-gradient(135deg, oklch(85% 0.15 55) 0%, oklch(65% 0.2 55) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .subsurface-mass {
          background: linear-gradient(145deg, oklch(13% 0.01 240), oklch(11% 0.01 240));
          box-shadow: inset 0.5px 0.5px 0px oklch(100% 0 0 / 0.03), inset -0.5px -0.5px 0px rgba(0,0,0,0.8), 0 20px 40px rgba(0,0,0,0.5);
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.6s ease;
        }

        .subsurface-mass:hover {
          transform: translateY(-2px);
          box-shadow: inset 0.5px 0.5px 0px oklch(75% 0.18 55 / 0.1), inset -0.5px -0.5px 0px rgba(0,0,0,0.8), 0 30px 60px rgba(0,0,0,0.6);
        }

        .deboss-text {
          background-color: oklch(12% 0.01 240);
          color: transparent;
          text-shadow: 1px 1px 1px oklch(100% 0 0 / 0.05), -1px -1px 1px rgba(0,0,0,0.9);
          -webkit-background-clip: text;
          background-clip: text;
        }

        .kinetic-z {
          will-change: transform;
          transform-style: preserve-3d;
        }

        .reveal-up {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 1.4s cubic-bezier(0.16, 1, 0.3, 1), transform 1.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .reveal-up.active {
          opacity: 1;
          transform: translateY(0);
        }

        .delay-100 { transition-delay: 0.1s; }
        .delay-200 { transition-delay: 0.2s; }
        .delay-300 { transition-delay: 0.3s; }

        .monument-link {
          position: relative;
          color: oklch(100% 0 0 / 0.5);
          transition: color 0.4s ease;
        }

        .monument-link:hover {
          color: oklch(75% 0.18 55);
        }

        .monument-link::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 100%;
          height: 1px;
          background: oklch(75% 0.18 55);
          transform: scaleX(0);
          transform-origin: right;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .monument-link:hover::after {
          transform: scaleX(1);
          transform-origin: left;
        }
      `}</style>
    </main>
  );
}
