"use client";

import { useEffect, useRef } from "react";

const structureCards = [
  {
    title: "Monolithic Cantilevers",
    text: "Nuestros voladizos de hasta 35 metros desafían la gravedad mediante núcleos de fibra de carbono y anclajes de roca viva.",
  },
  {
    title: "Zero-Glare Glazing",
    text: "Cristal blindado con tratamiento fotocrómico de baja reflectancia. Invisible desde el radar y la visión humana.",
  },
  {
    title: "Thermal Obsidian",
    text: "Fachadas de obsidiana sintética que absorben el calor residual para alimentar los sistemas de soporte vital off-grid.",
  },
  {
    title: "Seismic Anchors",
    text: "Tecnología de amortiguación hidráulica integrada directamente en el basalto del acantilado.",
  },
];

const intelligenceItems = [
  { label: "Acoustic Cloaking", value: "Active" },
  { label: "Hydrological Recovery", value: "98% Efficient" },
  { label: "Off-Grid Intelligence", value: "Quantum Link" },
];

const footerLinksLeft = ["Dossier", "Philosophy", "Security"];
const footerLinksRight = ["Encrypted Comms", "Satellite Uplink", "Terminal"];

export default function Page() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const fallbackRef = useRef<SVGSVGElement>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const onScroll = () => {
      const scrolled = window.scrollY;
      const opacity = Math.min(0.92, 0.35 + scrolled / 700);
      nav.style.background = `rgba(0, 0, 0, ${opacity})`;
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    const fallback = fallbackRef.current;
    if (!video || !fallback) return;

    const showFallback = () => {
      video.style.display = "none";
      fallback.style.display = "block";
    };

    const onError = () => showFallback();
    video.addEventListener("error", onError);

    const timeout = window.setTimeout(() => {
      if (video.readyState === 0) showFallback();
    }, 2500);

    return () => {
      video.removeEventListener("error", onError);
      window.clearTimeout(timeout);
    };
  }, []);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[var(--basalt)] text-white">
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Syncopate:wght@400;700&family=Manrope:wght@200;400;600&display=swap");

        :root {
          --basalt: oklch(12% 0.02 260);
          --amber: oklch(65% 0.15 45);
          --storm: oklch(25% 0.01 260);
        }

        html {
          scroll-behavior: smooth;
          overflow-x: hidden;
        }

        body {
          margin: 0;
          background-color: var(--basalt);
          color: #fff;
          font-family: "Manrope", sans-serif;
          overflow-x: hidden;
        }

        ::selection {
          background: color-mix(in oklch, var(--amber) 35%, white 0%);
          color: white;
        }

        ::-webkit-scrollbar {
          width: 4px;
        }

        ::-webkit-scrollbar-track {
          background: var(--basalt);
        }

        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, var(--amber), color-mix(in oklch, var(--amber) 70%, black 30%));
          border-radius: 999px;
        }

        .font-syne {
          font-family: "Syncopate", sans-serif;
        }

        .tectonic-section {
          position: sticky;
          top: 0;
          height: 100vh;
          width: 100%;
          overflow: hidden;
          display: flex;
          align-items: center;
          background: var(--basalt);
          border-top: 1px solid rgba(255, 255, 255, 0.05);
        }

        .blade-mask {
          clip-path: polygon(0 0, 100% 0, 100% 85%, 25% 100%, 0 90%);
        }

        .sharp-card {
          clip-path: polygon(0 0, 100% 5%, 95% 100%, 0% 95%);
          background: rgba(255, 255, 255, 0.02);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(217, 119, 66, 0.2);
        }

        .hud-glass {
          background: rgba(0, 0, 0, 0.4);
          backdrop-filter: blur(25px) brightness(0.6);
          border: 1px solid rgba(217, 119, 66, 0.3);
        }

        .text-edge {
          -webkit-text-stroke: 1px rgba(255, 255, 255, 0.3);
          color: transparent;
        }

        .reveal {
          opacity: 0;
          transform: translateY(40px);
          transition: all 1s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .reveal.active {
          opacity: 1;
          transform: translateY(0);
        }

        .stealth-btn {
          background: #000;
          position: relative;
          padding: 1.25rem 2.5rem;
          clip-path: polygon(10% 0, 100% 0, 90% 100%, 0 100%);
          transition: all 0.4s ease;
          border: 1px solid rgba(217, 119, 66, 0.5);
          color: var(--amber);
          text-transform: uppercase;
          font-size: 0.75rem;
          letter-spacing: 0.3em;
        }

        .stealth-btn:hover {
          background: var(--amber);
          color: #000;
          box-shadow: 0 0 30px rgba(217, 119, 66, 0.4);
        }

        .delay-100 {
          transition-delay: 100ms;
        }

        .delay-200 {
          transition-delay: 200ms;
        }
      `}</style>

      <header
        ref={navRef}
        className="fixed top-8 left-8 right-8 z-[100] flex items-center justify-between mix-blend-difference"
      >
        <div className="font-syne text-xs font-bold uppercase tracking-[0.5em] text-white">
          Obsidian / Horizon
        </div>

        <div className="z-20 flex gap-12 font-syne text-[9px] uppercase tracking-widest">
          <a href="#villas" className="text-white transition-all hover:opacity-70">
            Structures
          </a>
          <a href="#tech" className="text-white transition-all hover:opacity-70">
            Intelligence
          </a>
          <a href="#contact" className="text-white transition-all hover:opacity-70">
            Protocol
          </a>
        </div>
      </header>

      <main>
        <section className="tectonic-section z-10">
          <div className="absolute inset-0 blade-mask">
            <video ref={videoRef} autoPlay muted loop playsInline className="h-full w-full object-cover brightness-75">
              <source src="/video.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--basalt)] via-transparent to-transparent" />
          </div>

          <div className="relative z-20 px-12 md:px-24">
            <h4 className="reveal mb-6 font-syne text-[10px] uppercase tracking-[0.6em] text-[var(--amber)]">
              Project: Silence / Location: Unknown
            </h4>
            <h1 className="reveal delay-100 font-syne text-[12vw] font-bold uppercase leading-[0.8] tracking-tighter">
              Stealth
              <br />
              <span className="text-edge">Systems</span>
            </h1>
            <p className="reveal delay-200 mt-10 max-w-md font-light leading-relaxed text-gray-300">
              Arquitectura de baja observabilidad integrada en el permafrost volcánico. Residencias que no habitan el paisaje, sino que lo dominan desde la sombra.
            </p>
          </div>
        </section>

        <section id="villas" className="tectonic-section z-20 bg-[var(--storm)]">
          <div className="grid h-full w-full grid-cols-1 md:grid-cols-12">
            <div className="relative hidden h-full md:col-span-5 md:block">
              <img
                src="https://plus.unsplash.com/premium_photo-1676657954811-9409c4830467?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Architectural structure"
                className="h-full w-full object-cover grayscale brightness-75"
              />
              <div className="absolute inset-0 bg-[var(--amber)]/10 mix-blend-color" />
            </div>

            <div className="col-span-12 flex flex-col justify-center px-12 py-20 md:col-span-7 md:px-24">
              <span className="mb-4 font-syne text-xs uppercase tracking-widest text-[var(--amber)]">
                Structural Logic
              </span>
              <h2 className="mb-10 font-syne text-6xl uppercase leading-none">
                Aerodynamic
                <br />
                Structuralism
              </h2>

              <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
                {structureCards.map(card => (
                  <div key={card.title} className="sharp-card p-8">
                    <h3 className="mb-4 font-syne text-sm text-white">{card.title}</h3>
                    <p className="text-xs leading-loose text-gray-400">{card.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="tech" className="tectonic-section z-30 bg-[var(--basalt)]">
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: "radial-gradient(circle at 2px 2px, var(--amber) 1px, transparent 0)",
              backgroundSize: "40px 40px",
            }}
          />
          <div className="mx-auto grid max-w-7xl grid-cols-12 items-center gap-8 px-12">
            <div className="col-span-12 lg:col-span-5">
              <h2 className="mb-8 font-syne text-5xl uppercase leading-none">
                Topographic
                <br />
                Integration
              </h2>

              <div className="space-y-6">
                {intelligenceItems.map(item => (
                  <div key={item.label} className="hud-glass flex cursor-pointer items-center justify-between p-6 transition-all hover:border-[var(--amber)] group">
                    <span className="font-syne text-xs">{item.label}</span>
                    <span className="text-xs text-[var(--amber)]">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="col-span-12 grid h-[60vh] grid-cols-2 gap-4 lg:col-span-7">
              <div className="overflow-hidden bg-gray-900 sharp-card">
                <img
                  src="https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?q=80&w=710&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Topographic landscape"
                  className="h-full w-full object-cover grayscale transition-transform duration-700 hover:scale-110"
                />
              </div>
              <div className="mt-12 overflow-hidden bg-gray-900 sharp-card">
                <img
                  src="https://images.unsplash.com/photo-1581250053637-02ad7eb70688?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Minimal interior"
                  className="h-full w-full object-cover grayscale transition-transform duration-700 hover:scale-110"
                />
              </div>
            </div>
          </div>
        </section>

        <footer id="contact" className="tectonic-section z-40 flex flex-col justify-end bg-black pb-20">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[var(--amber)]/5" />
          <div className="relative z-10 w-full px-12 md:px-24">
            <div className="flex flex-col items-end justify-between gap-20 md:flex-row">
              <div className="max-w-2xl">
                <h2 className="mb-10 font-syne text-[8vw] font-bold uppercase leading-none tracking-tighter">
                  The
                  <br />
                  Abyss
                </h2>
                <p className="mb-12 font-syne text-[10px] uppercase tracking-widest text-gray-400">
                  Coordinates: 13.6394° S, 72.8814° W / 2026 Ready
                </p>
                <button className="stealth-btn">Initialize Acquisition</button>
              </div>

              <div className="grid grid-cols-2 gap-20 font-syne text-[10px] uppercase tracking-[0.3em] text-right">
                <div className="space-y-6">
                  {footerLinksLeft.map(link => (
                    <a key={link} href="#" className="block text-gray-400 hover:text-white">
                      {link}
                    </a>
                  ))}
                </div>
                <div className="space-y-6">
                  {footerLinksRight.map(link => (
                    <a key={link} href="#" className="block text-gray-400 hover:text-white">
                      {link}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-32 flex items-center justify-between border-t border-white/5 pt-8 text-[9px] uppercase tracking-widest opacity-50">
              <span>Obsidian Horizon &copy; 2026</span>
              <span>Designed for Total Anonymity</span>
            </div>
          </div>
        </footer>
      </main>
    </main>
  );
}