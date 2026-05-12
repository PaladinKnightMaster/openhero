"use client";

import { useEffect } from "react";

export default function Page() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      { threshold: 0.1 }
    );

    const reveals = document.querySelectorAll(".reveal");
    reveals.forEach((el) => observer.observe(el));

    return () => {
      reveals.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <>
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Syncopate:wght@400;700&family=Manrope:wght@200;400;600&display=swap");

        :root {
          --basalt: oklch(12% 0.02 260);
          --amber: oklch(65% 0.15 45);
          --storm: oklch(25% 0.01 260);
        }

        body {
          background-color: var(--basalt);
          color: white;
          margin: 0;
          overflow-x: hidden;
          font-family: "Manrope", sans-serif;
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

        .font-syne {
          font-family: "Syncopate", sans-serif;
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
      `}</style>

      <main>
        <header className="fixed top-8 left-8 right-8 z-[100] flex items-center justify-between mix-blend-difference">
          <div className="font-syne text-xs font-bold uppercase tracking-[0.5em] text-white">
            Obsidian / Horizon
          </div>

          <div className="z-20 flex gap-12 font-syne text-[9px] uppercase tracking-widest">
            <a
              href="#villas"
              className="text-white transition-all hover:opacity-70"
            >
              Structures
            </a>

            <a
              href="#tech"
              className="text-white transition-all hover:opacity-70"
            >
              Intelligence
            </a>

            <a
              href="#contact"
              className="text-white transition-all hover:opacity-70"
            >
              Protocol
            </a>
          </div>
        </header>

        <section className="tectonic-section z-10">
          <div className="blade-mask absolute inset-0">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="h-full w-full object-cover brightness-75"
            >
              <source src="/video.mp4" type="video/mp4" />
            </video>

            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
          </div>

          <div className="relative z-20 px-12 md:px-24">
            <h4 className="reveal font-syne mb-6 text-[10px] uppercase tracking-[0.6em] text-orange-400">
              Project: Silence / Location: Unknown
            </h4>

            <h1 className="reveal font-syne text-[12vw] font-bold uppercase leading-[0.8] tracking-tighter">
              Stealth
              <br />
              <span className="text-edge">Systems</span>
            </h1>

            <p className="reveal mt-10 max-w-md font-light leading-relaxed text-gray-300">
              Arquitectura de baja observabilidad integrada en el permafrost
              volcánico. Residencias que no habitan el paisaje, sino que lo
              dominan desde la sombra.
            </p>
          </div>
        </section>

        <section
          id="villas"
          className="tectonic-section z-20"
          style={{ background: "var(--storm)" }}
        >
          <div className="grid h-full w-full grid-cols-1 md:grid-cols-12">
            <div className="relative hidden h-full md:col-span-5 md:block">
              <img
                src="https://plus.unsplash.com/premium_photo-1676657954811-9409c4830467?q=80&w=687&auto=format&fit=crop"
                className="h-full w-full object-cover brightness-75 grayscale"
                alt=""
              />

              <div className="absolute inset-0 bg-orange-400/10 mix-blend-color" />
            </div>

            <div className="col-span-12 flex flex-col justify-center px-12 py-20 md:col-span-7 md:px-24">
              <span className="font-syne mb-4 text-xs uppercase tracking-widest text-orange-400">
                Structural Logic
              </span>

              <h2 className="font-syne mb-10 text-6xl uppercase leading-none">
                Aerodynamic
                <br />
                Structuralism
              </h2>

              <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
                <div className="sharp-card p-8">
                  <h3 className="font-syne mb-4 text-sm text-white">
                    Monolithic Cantilevers
                  </h3>

                  <p className="text-xs leading-loose text-gray-400">
                    Nuestros voladizos de hasta 35 metros desafían la gravedad
                    mediante núcleos de fibra de carbono y anclajes de roca
                    viva.
                  </p>
                </div>

                <div className="sharp-card p-8">
                  <h3 className="font-syne mb-4 text-sm text-white">
                    Zero-Glare Glazing
                  </h3>

                  <p className="text-xs leading-loose text-gray-400">
                    Cristal blindado con tratamiento fotocrómico de baja
                    reflectancia. Invisible desde el radar y la visión humana.
                  </p>
                </div>

                <div className="sharp-card p-8">
                  <h3 className="font-syne mb-4 text-sm text-white">
                    Thermal Obsidian
                  </h3>

                  <p className="text-xs leading-loose text-gray-400">
                    Fachadas de obsidiana sintética que absorben el calor
                    residual para alimentar los sistemas de soporte vital
                    off-grid.
                  </p>
                </div>

                <div className="sharp-card p-8">
                  <h3 className="font-syne mb-4 text-sm text-white">
                    Seismic Anchors
                  </h3>

                  <p className="text-xs leading-loose text-gray-400">
                    Tecnología de amortiguación hidráulica integrada directamente
                    en el basalto del acantilado.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="tech" className="tectonic-section z-30">
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "radial-gradient(circle at 2px 2px, var(--amber) 1px, transparent 0)",
              backgroundSize: "40px 40px",
            }}
          />

          <div className="mx-auto grid max-w-7xl grid-cols-12 items-center gap-8 px-12">
            <div className="col-span-12 lg:col-span-5">
              <h2 className="font-syne mb-8 text-5xl uppercase leading-none">
                Topographic
                <br />
                Integration
              </h2>

              <div className="space-y-6">
                <div className="hud-glass group flex cursor-pointer items-center justify-between p-6 transition-all hover:border-orange-400">
                  <span className="font-syne text-xs">
                    Acoustic Cloaking
                  </span>

                  <span className="text-xs text-orange-400">Active</span>
                </div>

                <div className="hud-glass group flex cursor-pointer items-center justify-between p-6 transition-all hover:border-orange-400">
                  <span className="font-syne text-xs">
                    Hydrological Recovery
                  </span>

                  <span className="text-xs text-orange-400">
                    98% Efficient
                  </span>
                </div>

                <div className="hud-glass group flex cursor-pointer items-center justify-between p-6 transition-all hover:border-orange-400">
                  <span className="font-syne text-xs">
                    Off-Grid Intelligence
                  </span>

                  <span className="text-xs text-orange-400">
                    Quantum Link
                  </span>
                </div>
              </div>
            </div>

            <div className="col-span-12 grid h-[60vh] grid-cols-2 gap-4 lg:col-span-7">
              <div className="sharp-card overflow-hidden bg-gray-900">
                <img
                  src="https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?q=80&w=710&auto=format&fit=crop"
                  className="h-full w-full object-cover grayscale transition-transform duration-700 hover:scale-110"
                  alt=""
                />
              </div>

              <div className="sharp-card mt-12 overflow-hidden bg-gray-900">
                <img
                  src="https://images.unsplash.com/photo-1581250053637-02ad7eb70688?q=80&w=687&auto=format&fit=crop"
                  className="h-full w-full object-cover grayscale transition-transform duration-700 hover:scale-110"
                  alt=""
                />
              </div>
            </div>
          </div>
        </section>

        <footer
          id="contact"
          className="tectonic-section z-40 flex flex-col justify-end bg-black pb-20"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-orange-400/5" />

          <div className="relative z-10 w-full px-12 md:px-24">
            <div className="flex flex-col items-end justify-between gap-20 md:flex-row">
              <div className="max-w-2xl">
                <h2 className="font-syne mb-10 text-[8vw] font-bold uppercase leading-none tracking-tighter">
                  The
                  <br />
                  Abyss
                </h2>

                <p className="font-syne mb-12 text-[10px] uppercase tracking-widest text-gray-400">
                  Coordinates: 13.6394° S, 72.8814° W / 2026 Ready
                </p>

                <button className="stealth-btn">
                  Initialize Acquisition
                </button>
              </div>

              <div className="grid grid-cols-2 gap-20 text-right font-syne text-[10px] uppercase tracking-[0.3em]">
                <div className="space-y-6">
                  <a
                    href="#"
                    className="block text-gray-400 hover:text-white"
                  >
                    Dossier
                  </a>

                  <a
                    href="#"
                    className="block text-gray-400 hover:text-white"
                  >
                    Philosophy
                  </a>

                  <a
                    href="#"
                    className="block text-gray-400 hover:text-white"
                  >
                    Security
                  </a>
                </div>

                <div className="space-y-6">
                  <a
                    href="#"
                    className="block text-gray-400 hover:text-white"
                  >
                    Encrypted Comms
                  </a>

                  <a
                    href="#"
                    className="block text-gray-400 hover:text-white"
                  >
                    Satellite Uplink
                  </a>

                  <a
                    href="#"
                    className="block text-gray-400 hover:text-white"
                  >
                    Terminal
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-32 flex items-center justify-between border-t border-white/5 pt-8 text-[9px] uppercase tracking-widest opacity-50">
              <span>Obsidian Horizon © 2026</span>

              <span>Designed for Total Anonymity</span>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}