"use client";

import { useEffect, useRef } from "react";

const lookbookItems = [
  {
    title: "Raw Selvedge",
    subtitle: "14.5oz Japanese Denim",
    image:
      "https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?q=80&w=2070&auto=format&fit=crop",
    placement: "bottom-left",
    widthClass: "min-w-[40vw]",
  },
  {
    title: "Structural Fit",
    subtitle: "",
    image:
      "https://images.unsplash.com/photo-1745834311248-f19d424c5398?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    placement: "top-left",
    widthClass: "min-w-[30vw]",
    offsetClass: "mt-20",
  },
  {
    title: "Monochrome Layering",
    subtitle: "",
    image:
      "https://images.unsplash.com/photo-1551854838-212c50b4c184?q=80&w=1974&auto=format&fit=crop",
    placement: "bottom-right",
    widthClass: "min-w-[45vw]",
  },
];

const opticCards = [
  {
    label: "Model_Alpha / Silver Lens",
    image:
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=2080&auto=format&fit=crop",
  },
  {
    label: "Model_Beta / Obsidian Edge",
    image:
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=2080&auto=format&fit=crop",
  },
  {
    label: "Structural_Frame / 001",
    image:
      "https://images.unsplash.com/photo-1509695507497-903c140c43b0?q=80&w=2073&auto=format&fit=crop",
  },
];

export default function Page() {
<<<<<<< HEAD
  const heroVideoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY;
      document.documentElement.style.setProperty("--weight-scroll", `${200 + scrolled * 0.5}`);

      if (heroVideoRef.current) {
        const progress = Math.min(scrolled / (window.innerHeight * 1.1), 1);
        heroVideoRef.current.style.transform = `scale(${1 + progress * 0.07}) translateY(${progress * 8}vh)`;
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const handleZoomMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const item = e.currentTarget;
    const zoom = item.querySelector<HTMLElement>(".optic-zoom");
    if (!zoom) return;

    const rect = item.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    zoom.style.transformOrigin = `${x}% ${y}%`;
    zoom.style.transform = "scale(2.5)";
  };

  const handleZoomLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const item = e.currentTarget;
    const zoom = item.querySelector<HTMLElement>(".optic-zoom");
    if (!zoom) return;
    zoom.style.transformOrigin = "center center";
    zoom.style.transform = "scale(1)";
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-white font-manrope text-[#080808] selection:bg-[#080808] selection:text-white">
      <header className="pointer-events-none fixed left-0 top-0 z-[100] flex w-full items-end justify-between p-8">
        <div className="pointer-events-auto">
          <h1 className="font-syne text-xl font-bold leading-none tracking-tighter">SD-00</h1>
          <span className="text-[9px] uppercase tracking-[0.4em]">Autonomous Label</span>
        </div>
        <nav className="pointer-events-auto flex gap-12 font-syne text-[10px] uppercase tracking-widest">
          <a href="#collection" className="hover:line-through">
            Collection
          </a>
          <a href="#optics" className="hover:line-through">
            Optics
          </a>
          <a href="#archive" className="hover:line-through">
            Archive
          </a>
        </nav>
      </header>

      <main>
        <section className="relative h-screen w-screen overflow-hidden bg-white">
          <div className="absolute inset-0 z-10 grid h-full grid-cols-12 items-center px-8">
            <div className="z-20 col-span-8">
              <h2 className="kinetic-header font-syne text-[11vw] uppercase leading-[0.85] tracking-tighter">
                Urban
                <br />
                Visionary
              </h2>
              <div className="mt-12 flex items-center gap-8">
                <button className="inverted-impact bg-[#080808] px-12 py-5 font-syne text-[10px] uppercase tracking-[0.3em] text-white transition-all duration-75">
                  Enter Archive
                </button>
                <span className="max-w-[200px] border-l border-[#080808] pl-8 text-[10px] uppercase tracking-widest">
                  Refractive optics for the modern monolith.
                </span>
              </div>
            </div>
          </div>

          <div className="jagged-mask absolute right-0 top-0 z-0 h-full w-full bg-[#080808]">
            <video autoPlay muted loop playsInline className="h-full w-full object-cover opacity-80 mix-blend-luminosity">
              <source src="/video.mp4" type="video/mp4" />
            </video>
          </div>

          <div className="absolute bottom-12 right-12 z-30 flex flex-col items-end">
            <span className="mb-2 font-syne text-[10px] uppercase tracking-[0.5em]">Latitude 52.5200</span>
            <div className="h-px w-32 bg-[#080808] inverted-text" />
          </div>
        </section>

        <section id="collection" className="overflow-hidden bg-white py-40">
          <div className="mb-24 px-8">
            <h3 className="mb-4 font-syne text-[4vw] uppercase tracking-tighter">Lookbook_01</h3>
            <div className="h-px w-full bg-[#080808]/10" />
          </div>

          <div className="parallax-container flex snap-x snap-mandatory gap-4 overflow-x-auto px-8 scroll-smooth">
            {lookbookItems.map((item, index) => (
              <div
                key={item.title}
                className={`${item.widthClass} ${item.offsetClass ?? ""} group relative h-[80vh] snap-center overflow-hidden bg-[#080808]`}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover grayscale opacity-70 transition-transform duration-[2s] group-hover:scale-110"
                />
                <div
                  className={`absolute text-white ${item.placement === "bottom-left" ? "bottom-8 left-8" : item.placement === "top-left" ? "left-8 top-8" : "bottom-8 right-8 text-right"}`}
                >
                  <p className="font-syne text-xs uppercase tracking-widest">{item.title}</p>
                  {item.subtitle ? <span className="text-[9px] opacity-50">{item.subtitle}</span> : null}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="optics" className="grid min-h-screen grid-cols-1 border-y border-[#080808] bg-white md:grid-cols-4">
          <div className="flex flex-col justify-between border-r border-[#080808] p-12">
            <div>
              <h4 className="mb-8 font-syne text-2xl uppercase leading-none">Refractive<br />Optics</h4>
              <p className="text-xs uppercase leading-relaxed tracking-widest text-gray-500">
                Surgical precision in titanium. Engineered for the urban silhouette.
              </p>
            </div>
            <div className="magazine-column font-syne text-[8px] uppercase tracking-[0.6em] opacity-20">
              Visionary Systems // Sector 09
            </div>
          </div>

          <div className="col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {opticCards.map((card) => (
              <div
                key={card.label}
                onMouseMove={handleZoomMove}
                onMouseLeave={handleZoomLeave}
                className="group relative aspect-square cursor-none overflow-hidden border-b border-r border-[#080808]"
              >
                <div
                  className="optic-zoom absolute inset-0 bg-cover bg-center grayscale transition-transform duration-500"
                  style={{ backgroundImage: `url('${card.image}')` }}
                />
                <div className="absolute inset-0 flex items-center justify-center bg-[#080808]/80 p-12 opacity-0 transition-opacity group-hover:opacity-100 text-white">
                  <span className="font-syne text-[10px] uppercase tracking-widest">{card.label}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <footer id="archive" className="relative overflow-hidden bg-[#080808] px-8 py-32 text-white">
          <div className="grain-overlay pointer-events-none absolute inset-0 opacity-[0.08]" />

          <div className="relative z-10 grid grid-cols-12 items-end">
            <div className="col-span-12 lg:col-span-7">
              <h2 className="font-syne text-[15vw] uppercase leading-[0.75] tracking-tighter opacity-20 transition-opacity duration-1000 hover:opacity-100">
                Studio
                <br />
                Denim
              </h2>
            </div>
            <div className="col-span-12 flex flex-col items-end lg:col-span-5">
              <div className="mb-20 flex gap-16 font-syne text-[10px] uppercase tracking-[0.4em]">
                <div className="space-y-4">
                  <a href="#" className="block hover:text-[#C0C0C0]">
                    Wholesale
                  </a>
                  <a href="#" className="block hover:text-[#C0C0C0]">
                    Press Kit
                  </a>
                </div>
                <div className="space-y-4">
                  <a href="#" className="block hover:text-[#C0C0C0]">
                    Terms
                  </a>
                  <a href="#" className="block hover:text-[#C0C0C0]">
                    Privacy
                  </a>
                </div>
              </div>
              <div className="flex w-full items-center justify-between border-t border-white/10 pt-8">
                <span className="text-[9px] uppercase tracking-widest">©2026 Studio Denim Aesthetics</span>
                <div className="flex gap-4">
                  <div className="h-2 w-2 rounded-full bg-white" />
                  <div className="h-2 w-2 rounded-full bg-white opacity-20" />
                </div>
              </div>
            </div>
          </div>
        </footer>
      </main>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Syncopate:wght@400;700&family=Manrope:wght@200;300;400;800&display=swap');

        :root {
          background-color: #ffffff;
          --weight-scroll: 200;
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
          background: #fff;
        }

        ::-webkit-scrollbar {
          display: none;
        }

        .font-syne {
          font-family: 'Syncopate', sans-serif;
        }

        .font-manrope {
          font-family: 'Manrope', sans-serif;
        }

        .jagged-mask {
          clip-path: polygon(0 0, 100% 0, 100% 100%, 15% 100%, 42% 78%, 28% 54%, 55% 32%, 35% 0);
        }

        .inverted-text {
          mix-blend-mode: difference;
          filter: invert(1);
        }

        .magazine-column {
          writing-mode: vertical-rl;
          text-orientation: mixed;
        }

        .inverted-impact:hover {
          animation: strobe 0.1s steps(1) 3;
          background-color: #ffffff;
          color: #000000;
        }

        .kinetic-header {
          font-variation-settings: 'wght' var(--weight-scroll);
        }

        .grain-overlay {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
        }

        .parallax-container {
          view-timeline-name: --lookbook;
          view-timeline-axis: x;
        }

        @supports (animation-timeline: scroll()) {
          .kinetic-header {
            animation: weight-shift linear both;
            animation-timeline: scroll();
          }

          @keyframes weight-shift {
            from {
              font-weight: 200;
              letter-spacing: 0.5em;
            }

            to {
              font-weight: 800;
              letter-spacing: -0.05em;
            }
          }
        }

        @keyframes strobe {
          0% {
            background-color: #ffffff;
            color: #000000;
          }

          100% {
            background-color: #000000;
            color: #ffffff;
          }
        }

        .optic-zoom {
          will-change: transform;
        }

        @media (max-width: 768px) {
          .jagged-mask {
            clip-path: polygon(0 0, 100% 0, 100% 100%, 6% 100%, 28% 76%, 15% 56%, 43% 34%, 24% 0);
          }

          .magazine-column {
            writing-mode: horizontal-tb;
          }
        }
      `}</style>
    </div>
=======
  const cursorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const interactiveElements = document.querySelectorAll(
      ".interactive, a, button"
    );

    const moveCursor = (e: MouseEvent) => {
      if (!cursor) return;
      cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    };

    window.addEventListener("mousemove", moveCursor);

    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", () => cursor?.classList.add("hovering"));
      el.addEventListener("mouseleave", () =>
        cursor?.classList.remove("hovering")
      );
    });

    document.querySelectorAll(".magnetic-btn").forEach((btn) => {
      btn.addEventListener("mousemove", (e: Event) => {
        const ev = e as MouseEvent;
        const rect = (btn as HTMLElement).getBoundingClientRect();
        const x = ev.clientX - rect.left;
        const y = ev.clientY - rect.top;

        (btn as HTMLElement).style.setProperty("--x", `${x}px`);
        (btn as HTMLElement).style.setProperty("--y", `${y}px`);

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const deltaX = (x - centerX) * 0.1;
        const deltaY = (y - centerY) * 0.1;

        (btn as HTMLElement).style.transform = `translate(${deltaX}px, ${deltaY}px)`;
      });

      btn.addEventListener("mouseleave", () => {
        (btn as HTMLElement).style.transform = "translate(0px, 0px)";
      });
    });

    document.querySelectorAll(".spotlight-card").forEach((card) => {
      card.addEventListener("mousemove", (e: Event) => {
        const ev = e as MouseEvent;
        const rect = (card as HTMLElement).getBoundingClientRect();
        const x = ev.clientX - rect.left;
        const y = ev.clientY - rect.top;

        (card as HTMLElement).style.setProperty("--mouse-x", `${x}px`);
        (card as HTMLElement).style.setProperty("--mouse-y", `${y}px`);
      });
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      {
        root: null,
        rootMargin: "0px 0px -10% 0px",
        threshold: 0.1,
      }
    );

    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      observer.disconnect();
    };
  }, []);

  const marqueeItems = [
    "Genotype Sequencing",
    "C4 Pathway Optimization",
    "Photoreceptor Modulation",
    "Subcellular Structuring",
    "Genotype Sequencing",
    "C4 Pathway Optimization",
    "Photoreceptor Modulation",
    "Subcellular Structuring",
  ];

  return (
    <>
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;500&family=Playfair+Display:ital,wght@0,400;0,500;1,400;1,500&display=swap");

        html {
          scroll-behavior: smooth;
          background-color: oklch(12% 0.03 260);
        }

        body {
          margin: 0;
          overflow-x: hidden;
          color: white;
          background-color: oklch(12% 0.03 260);
          cursor: none;
          font-family: "Inter", sans-serif;
        }

        ::-webkit-scrollbar {
          width: 4px;
        }

        ::-webkit-scrollbar-track {
          background: oklch(12% 0.03 260);
        }

        ::-webkit-scrollbar-thumb {
          background: oklch(65% 0.25 330 / 0.5);
          border-radius: 10px;
        }

        .noise-overlay {
          position: fixed;
          inset: 0;
          z-index: 999;
          pointer-events: none;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
          opacity: 0.03;
          mix-blend-mode: overlay;
        }

        .spectral-cursor {
          position: fixed;
          top: 0;
          left: 0;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: radial-gradient(
            circle,
            oklch(70% 0.2 45) 0%,
            transparent 80%
          );
          mix-blend-mode: screen;
          pointer-events: none;
          z-index: 10000;
          transform: translate(-50%, -50%);
          transition: width 0.3s, height 0.3s, background 0.3s;
          box-shadow: 0 0 20px oklch(65% 0.25 330 / 0.6);
        }

        .spectral-cursor.hovering {
          width: 60px;
          height: 60px;
          background: radial-gradient(
            circle,
            oklch(65% 0.25 330 / 0.8) 0%,
            transparent 70%
          );
          box-shadow: 0 0 40px oklch(65% 0.25 330 / 0.8);
        }

        .bionic-video-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          z-index: 0;
          pointer-events: none;
          mask-image: radial-gradient(
            ellipse 150% 120% at 50% -20%,
            black 40%,
            transparent 100%
          );
          -webkit-mask-image: radial-gradient(
            ellipse 150% 120% at 50% -20%,
            black 40%,
            transparent 100%
          );
        }

        .bionic-video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transform-origin: center top;
        }

        .vignette {
          position: absolute;
          inset: 0;
          background: radial-gradient(
            circle at center,
            transparent 0%,
            oklch(12% 0.03 260 / 0.8) 100%
          );
          z-index: 1;
        }

        @supports (animation-timeline: scroll()) {
          .bionic-video {
            animation: bioDive linear both;
            animation-timeline: scroll(block root);
          }
        }

        @keyframes bioDive {
          0% {
            filter: saturate(1.2) brightness(0.9);
            transform: scale(1) translateY(0);
          }
          100% {
            filter: saturate(3) brightness(0.1);
            transform: scale(1.15) translateY(10%);
          }
        }

        .light-bleed-nav {
          backdrop-filter: blur(24px) saturate(2.5);
          -webkit-backdrop-filter: blur(24px) saturate(2.5);
          background: linear-gradient(
            to bottom,
            oklch(12% 0.03 260 / 0.6),
            transparent
          );
          border-bottom: 1px solid oklch(100% 0 0 / 0.03);
        }

        .spectral-text {
          mix-blend-mode: plus-lighter;
          animation: spectralPulse 6s ease-in-out infinite;
          background: linear-gradient(
            180deg,
            #fff 0%,
            oklch(65% 0.25 330 / 0.8) 100%
          );
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        @keyframes spectralPulse {
          0%,
          100% {
            filter: drop-shadow(0 0 30px oklch(65% 0.25 330 / 0.4));
          }
          50% {
            filter: drop-shadow(0 0 60px oklch(65% 0.25 330 / 0.8))
              drop-shadow(0 0 20px oklch(70% 0.2 45 / 0.4));
          }
        }

        .liquid-terminals i {
          font-style: italic;
          letter-spacing: -0.05em;
          padding-right: 0.05em;
          font-weight: 300;
        }

        .magnetic-btn {
          position: relative;
          overflow: hidden;
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          background: oklch(100% 0 0 / 0.03);
          border: 1px solid oklch(100% 0 0 / 0.1);
          box-shadow: inset 0 0 20px oklch(100% 0 0 / 0.05);
          transition: transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1),
            border-color 0.3s ease;
        }

        .magnetic-btn::before {
          content: "";
          position: absolute;
          top: var(--y, 50%);
          left: var(--x, 50%);
          transform: translate(-50%, -50%);
          width: 0;
          height: 0;
          background: radial-gradient(
            circle closest-side,
            oklch(65% 0.25 330 / 0.4),
            transparent
          );
          transition: width 0.4s ease, height 0.4s ease;
          border-radius: 50%;
          pointer-events: none;
        }

        .magnetic-btn:hover::before {
          width: 250px;
          height: 250px;
        }

        .magnetic-btn:hover {
          border-color: oklch(65% 0.25 330 / 0.5);
        }

        .spotlight-card {
          background: rgba(255, 255, 255, 0.01);
          border: 1px solid rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(40px) saturate(1.5);
          -webkit-backdrop-filter: blur(40px) saturate(1.5);
          position: relative;
          overflow: hidden;
          border-radius: 24px;
          transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .spotlight-card::before {
          content: "";
          position: absolute;
          inset: 0;
          opacity: 0;
          transition: opacity 0.3s;
          background: radial-gradient(
            800px circle at var(--mouse-x) var(--mouse-y),
            oklch(65% 0.25 330 / 0.15),
            transparent 40%
          );
          z-index: 1;
          pointer-events: none;
        }

        .spotlight-card::after {
          content: "";
          position: absolute;
          inset: 0;
          opacity: 0;
          transition: opacity 0.3s;
          background: radial-gradient(
            600px circle at var(--mouse-x) var(--mouse-y),
            oklch(70% 0.2 45 / 0.08),
            transparent 40%
          );
          z-index: 2;
          pointer-events: none;
        }

        .spotlight-card:hover::before,
        .spotlight-card:hover::after {
          opacity: 1;
        }

        .spotlight-card:hover {
          transform: translateY(-8px);
          border-color: rgba(255, 255, 255, 0.15);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5),
            0 0 40px oklch(65% 0.25 330 / 0.1);
        }

        .spotlight-content {
          position: relative;
          z-index: 3;
        }

        .gradient-border-mask {
          position: absolute;
          inset: 0;
          border-radius: inherit;
          padding: 1px;
          background: radial-gradient(
            400px circle at var(--mouse-x) var(--mouse-y),
            oklch(65% 0.25 330 / 0.8),
            transparent 40%
          );
          -webkit-mask: linear-gradient(#fff 0 0) content-box,
            linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          opacity: 0;
          transition: opacity 0.3s;
          pointer-events: none;
        }

        .spotlight-card:hover .gradient-border-mask {
          opacity: 1;
        }

        .bloom-nav-item {
          position: relative;
          padding: 4px 0;
        }

        .bloom-nav-item::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent,
            oklch(65% 0.25 330),
            transparent
          );
          transform: scaleX(0);
          transform-origin: center;
          transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .bloom-nav-item:hover::after {
          transform: scaleX(1);
        }

        .reveal {
          opacity: 0;
          transform: translateY(40px) scale(0.98);
          transition: all 1.2s cubic-bezier(0.16, 1, 0.3, 1);
          will-change: transform, opacity;
        }

        .reveal.active {
          opacity: 1;
          transform: translateY(0) scale(1);
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

        .atmospheric-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(120px);
          pointer-events: none;
          z-index: -1;
        }

        .huge-footer-text {
          font-size: clamp(4rem, 15vw, 15rem);
          line-height: 0.8;
          background: linear-gradient(
            180deg,
            oklch(100% 0 0 / 0.1) 0%,
            oklch(100% 0 0 / 0.02) 100%
          );
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          user-select: none;
        }

        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-100%);
          }
        }

        .animate-marquee {
          animation: marquee 40s linear infinite;
        }

        @keyframes pulseSlow {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.3;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.6;
          }
        }

        .animate-pulse-slow {
          animation: pulseSlow 8s ease-in-out infinite;
        }
      `}</style>

      <div className="bg-[oklch(12%_0.03_260)] text-white antialiased selection:bg-pink-500/30 selection:text-white overflow-hidden">
        <div className="noise-overlay" />

        <div ref={cursorRef} className="spectral-cursor" />

        <div className="bionic-video-container">
          <video autoPlay loop muted playsInline className="bionic-video">
            <source src="/video.mp4" type="video/mp4" />
          </video>
          <div className="vignette" />
          <div className="absolute inset-0 bg-midnight/40 mix-blend-multiply z-10" />
        </div>

        <nav className="fixed top-0 inset-x-0 z-50 px-6 md:px-12 py-5 light-bleed-nav flex justify-between items-center w-full">
          <div className="flex items-center gap-3 interactive">
            <div className="relative w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 overflow-hidden">
              <div className="absolute inset-0 bg-pink-500/20 animate-pulse-slow" />
              <Icon
                icon="ph:plant-light"
                className="text-2xl text-white relative z-10"
              />
            </div>
            <span className="font-serif italic text-xl tracking-tight text-white hidden sm:block">
              Living Carbon
            </span>
          </div>

          <div className="hidden md:flex gap-10 text-[10px] font-sans tracking-[0.2em] uppercase text-white/60 font-medium">
            <a
              href="#ecology"
              className="bloom-nav-item hover:text-white transition-colors interactive"
            >
              Spectral Ecology
            </a>
            <a
              href="#genetics"
              className="bloom-nav-item hover:text-white transition-colors interactive"
            >
              Genomic Labs
            </a>
            <a
              href="#phenotype"
              className="bloom-nav-item hover:text-white transition-colors interactive"
            >
              Phenotypic Data
            </a>
          </div>

          <button className="magnetic-btn interactive px-6 py-3 rounded-full text-[10px] font-medium tracking-[0.15em] uppercase flex items-center gap-3">
            <span className="relative z-10">Initialize Sequence</span>
            <Icon
              icon="ph:dna-light"
              className="text-base text-amber relative z-10"
            />
          </button>
        </nav>

        <main className="relative z-10 w-full flex flex-col">
          <section className="min-h-screen w-full flex flex-col justify-center items-center text-center px-4 pt-32 pb-20 relative">
            <div className="absolute top-[30%] left-[20%] w-[40vw] h-[40vw] atmospheric-orb bg-pink-500/20 animate-pulse-slow mix-blend-screen" />
            <div className="absolute bottom-[20%] right-[10%] w-[30vw] h-[30vw] atmospheric-orb bg-amber/10 mix-blend-screen" />

            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-pink-500/30 bg-pink-500/5 backdrop-blur-md mb-8 reveal active delay-100">
              <span className="w-2 h-2 rounded-full bg-amber shadow-[0_0_10px_oklch(70%_0.2_45)]" />
              <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-white/80 m-0">
                Anthocyanin Hyper-pigmentation
              </p>
            </div>

            <h1 className="font-serif text-5xl md:text-8xl lg:text-[8rem] leading-[0.9] spectral-text liquid-terminals reveal active delay-200 max-w-6xl mx-auto">
              Rebalancing the <i>planet</i> with photosynthesis
            </h1>

            <p className="mt-12 font-sans font-light text-sm md:text-base text-white/50 max-w-2xl leading-relaxed reveal active delay-300">
              We engineer circadian rhythm optimization to unlock the latent
              potential of botanical life. Bridging the gap between high-tech
              precision and raw spectral vitality to reverse atmospheric decay.
            </p>
          </section>

          <div className="w-full overflow-hidden border-y border-white/5 bg-midnight/80 backdrop-blur-md py-4 flex relative z-20">
            <div className="flex whitespace-nowrap animate-marquee items-center gap-10 opacity-40 hover:opacity-100 transition-opacity duration-500">
              {marqueeItems.map((item, index) => (
                <span
                  key={`${item}-${index}`}
                  className="text-xs font-mono tracking-widest uppercase"
                >
                  <Icon
                    icon="ph:asterisk-light"
                    className={`inline text-[1rem] mr-2 ${
                      index % 2 === 0 ? "text-magenta" : "text-amber"
                    }`}
                  />
                  {item}
                </span>
              ))}
            </div>
          </div>

          <section
            id="ecology"
            className="min-h-screen w-full relative z-20 py-40 px-6 md:px-12 lg:px-24 bg-midnight"
          >
            <div className="absolute top-0 right-0 w-[60vw] h-[60vw] atmospheric-orb bg-magenta/5" />

            <div className="max-w-7xl mx-auto">
              <div className="mb-24 reveal flex flex-col md:flex-row md:items-end justify-between gap-8">
                <div>
                  <h2 className="font-serif text-5xl md:text-7xl text-white mb-6 tracking-tight">
                    Spectral <br />
                    <i className="text-white/40">Irradiance</i>
                  </h2>
                  <div className="h-px w-full md:w-[200%] bg-gradient-to-r from-magenta via-amber to-transparent opacity-30" />
                </div>
                <p className="max-w-xs text-sm font-light text-white/50 leading-relaxed">
                  The structural geometry of our synthetic flora adapts in
                  real-time, responding to atmospheric carbon density.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="spotlight-card p-10 reveal delay-100 interactive h-[400px] flex flex-col justify-between">
                  <div className="gradient-border-mask" />
                  <div className="spotlight-content">
                    <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 backdrop-blur-xl">
                      <Icon
                        icon="ph:drop-half-bottom-light"
                        className="text-3xl text-magenta"
                      />
                    </div>
                    <h3 className="font-serif text-3xl mb-4 text-white">
                      Liquid Synthesis
                    </h3>
                    <p className="font-sans font-light text-sm text-white/50 leading-relaxed">
                      Harnessing specific wavelengths to accelerate chlorophyll
                      production. The UI mirrors this bioluminescent radiation.
                    </p>
                  </div>
                  <div className="spotlight-content mt-8 flex items-center gap-2 text-xs font-mono text-magenta">
                    <span>SYS_READY</span>
                    <div className="w-2 h-2 rounded-full bg-magenta animate-pulse" />
                  </div>
                </div>

                <div className="spotlight-card p-10 reveal delay-200 interactive h-[400px] flex flex-col justify-between lg:translate-y-12">
                  <div className="gradient-border-mask" />
                  <div className="spotlight-content">
                    <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 backdrop-blur-xl">
                      <Icon
                        icon="ph:hexagon-light"
                        className="text-3xl text-amber"
                      />
                    </div>
                    <h3 className="font-serif text-3xl mb-4 text-white">
                      Phenotypic Plasticity
                    </h3>
                    <p className="font-sans font-light text-sm text-white/50 leading-relaxed">
                      Flora engineered to adapt its structural geometry in
                      real-time, responding to atmospheric carbon density and
                      light.
                    </p>
                  </div>
                  <div className="spotlight-content mt-8 flex items-center gap-2 text-xs font-mono text-amber">
                    <span>ACT_VAR_01</span>
                    <div className="w-2 h-2 rounded-full bg-amber animate-pulse" />
                  </div>
                </div>

                <div className="spotlight-card p-10 reveal delay-300 interactive h-[400px] flex flex-col justify-between">
                  <div className="gradient-border-mask" />
                  <div className="spotlight-content">
                    <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 backdrop-blur-xl">
                      <Icon
                        icon="ph:wind-light"
                        className="text-3xl text-white"
                      />
                    </div>
                    <h3 className="font-serif text-3xl mb-4 text-white">
                      Atmospheric Sync
                    </h3>
                    <p className="font-sans font-light text-sm text-white/50 leading-relaxed">
                      Deploying bio-engineered canopies that act as
                      high-efficiency carbon sinks, wrapping molecular
                      structures seamlessly.
                    </p>
                  </div>
                  <div className="spotlight-content mt-8 flex items-center gap-2 text-xs font-mono text-white">
                    <span>DATA_STREAM</span>
                    <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section
            id="genetics"
            className="py-40 px-6 md:px-12 lg:px-24 w-full bg-surface relative z-20 overflow-hidden rounded-t-[3rem] border-t border-white/10 shadow-[0_-20px_60px_rgba(0,0,0,0.5)]"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,oklch(65%_0.25_330/0.1)_0%,transparent_50%)] pointer-events-none" />

            <div className="max-w-7xl mx-auto">
              <div className="mb-20 text-center reveal">
                <h2 className="font-serif text-4xl md:text-6xl text-white mb-6">
                  Genomic Architecture
                </h2>
                <p className="text-white/50 max-w-xl mx-auto font-light">
                  Advanced bento-grid visualization of real-time cellular data
                  and engineered chromosomal adaptations.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px]">
                <div className="md:col-span-2 spotlight-card p-8 reveal delay-100 interactive flex flex-col justify-between bg-[url('https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center relative">
                  <div className="absolute inset-0 bg-midnight/80 mix-blend-multiply backdrop-blur-sm z-0" />
                  <div className="gradient-border-mask z-10" />
                  <div className="spotlight-content flex justify-between items-start">
                    <span className="px-3 py-1 bg-white/10 rounded-full text-[10px] tracking-widest font-mono uppercase backdrop-blur-md">
                      Cellular Growth
                    </span>
                    <Icon
                      icon="ph:trend-up-light"
                      className="text-2xl text-magenta"
                    />
                  </div>
                  <div className="spotlight-content">
                    <h3 className="text-4xl font-serif text-white mb-2">3.4x</h3>
                    <p className="text-sm text-white/60">
                      Increased carbon sequestration per leaf surface area.
                    </p>
                  </div>
                </div>

                <div className="spotlight-card p-8 reveal delay-200 interactive flex flex-col justify-center items-center text-center">
                  <div className="gradient-border-mask" />
                  <div className="spotlight-content relative">
                    <div className="absolute inset-0 bg-amber/20 blur-3xl rounded-full" />
                    <Icon
                      icon="ph:sun-dim-light"
                      className="text-6xl text-amber relative z-10 mb-4"
                    />
                    <h4 className="font-serif text-xl text-white mb-2">
                      Photon Yield
                    </h4>
                    <p className="text-xs text-white/50">Optimal at 450nm</p>
                  </div>
                </div>

                <div className="spotlight-card p-8 reveal delay-300 interactive flex flex-col justify-between">
                  <div className="gradient-border-mask" />
                  <div className="spotlight-content">
                    <Icon
                      icon="ph:dna-light"
                      className="text-3xl text-white/50 mb-4"
                    />
                    <h4 className="font-serif text-xl text-white mb-2">
                      Sequence Align
                    </h4>
                    <div className="space-y-2 mt-6">
                      <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full w-[85%] bg-magenta" />
                      </div>
                      <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full w-[60%] bg-amber" />
                      </div>
                      <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full w-[92%] bg-white/80" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="md:col-span-2 spotlight-card p-8 reveal delay-100 interactive flex flex-col justify-between">
                  <div className="gradient-border-mask" />
                  <div className="spotlight-content flex items-center justify-between h-full">
                    <div>
                      <h4 className="font-serif text-3xl text-white mb-2">
                        Global Impact
                      </h4>
                      <p className="text-sm text-white/50 max-w-sm leading-relaxed">
                        Monitoring live canopy deployments across 4 biomes. The
                        neural root network stabilizes soil integrity.
                      </p>
                    </div>
                    <button className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors">
                      <Icon
                        icon="ph:arrow-right-light"
                        className="text-2xl text-white"
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        <footer className="relative bg-midnight border-t border-white/5 pt-32 pb-10 overflow-hidden z-20">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-magenta to-transparent opacity-50" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80vw] h-[400px] bg-magenta/10 blur-[150px] pointer-events-none rounded-t-full" />

          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-24 reveal">
              <div className="md:col-span-5">
                <div className="flex items-center gap-3 mb-8">
                  <Icon
                    icon="ph:plant-light"
                    className="text-3xl text-magenta"
                  />
                  <span className="font-serif italic text-2xl tracking-tight text-white">
                    Living Carbon
                  </span>
                </div>
                <p className="text-white/50 text-sm leading-relaxed max-w-sm mb-10">
                  Synthesizing a cooler planet through engineered botanical
                  structures. We are designing the lungs of the future.
                </p>
                <div className="relative">
                  <input
                    type="email"
                    placeholder="ENTER EMAIL FOR RESEARCH UPDATES"
                    className="w-full bg-white/5 border border-white/10 rounded-full px-6 py-4 text-xs font-mono tracking-widest text-white outline-none focus:border-magenta/50 transition-colors backdrop-blur-md"
                  />
                  <button className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white text-midnight flex items-center justify-center hover:scale-105 transition-transform interactive">
                    <Icon icon="ph:arrow-right-bold" />
                  </button>
                </div>
              </div>

              <div className="md:col-span-2 md:col-start-8">
                <h5 className="text-[10px] font-mono tracking-widest uppercase text-white/40 mb-6">
                  Initiatives
                </h5>
                <ul className="space-y-4 text-sm font-light text-white/70">
                  <li>
                    <a
                      href="#"
                      className="hover:text-magenta transition-colors interactive"
                    >
                      Canopy Project
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-magenta transition-colors interactive"
                    >
                      Root Stabilization
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-magenta transition-colors interactive"
                    >
                      Spectral Labs
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-magenta transition-colors interactive"
                    >
                      Data Yields
                    </a>
                  </li>
                </ul>
              </div>

              <div className="md:col-span-2">
                <h5 className="text-[10px] font-mono tracking-widest uppercase text-white/40 mb-6">
                  Company
                </h5>
                <ul className="space-y-4 text-sm font-light text-white/70">
                  <li>
                    <a
                      href="#"
                      className="hover:text-amber transition-colors interactive"
                    >
                      About Us
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-amber transition-colors interactive"
                    >
                      Careers
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-amber transition-colors interactive"
                    >
                      Press
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-amber transition-colors interactive"
                    >
                      Contact
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="text-center mb-10 reveal">
              <h2 className="huge-footer-text font-serif italic tracking-tighter">
                Living Carbon
              </h2>
            </div>

            <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-mono tracking-widest text-white/30 uppercase reveal">
              <p>© 2026 LIVING CARBON. ALL RIGHTS RESERVED.</p>
              <div className="flex gap-6">
                <a
                  href="#"
                  className="hover:text-white transition-colors interactive"
                >
                  PRIVACY
                </a>
                <a
                  href="#"
                  className="hover:text-white transition-colors interactive"
                >
                  TERMS
                </a>
                <a
                  href="#"
                  className="hover:text-white transition-colors interactive"
                >
                  SYSTEM STATUS
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
>>>>>>> 5f22f53 (natureee corregido)
  );
}
