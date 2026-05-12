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
  );
}
