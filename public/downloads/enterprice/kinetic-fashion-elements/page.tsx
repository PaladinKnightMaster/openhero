"use client";

import { useEffect, useRef } from "react";

export default function Page() {
  const wavyPathRef = useRef<SVGPathElement | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;

      document.documentElement.style.setProperty("--mouse-x", `${x}%`);
      document.documentElement.style.setProperty("--mouse-y", `${y}%`);

      const wavyPath = wavyPathRef.current;
      if (wavyPath) {
        const tension = (e.clientX / window.innerWidth) * 50;
        wavyPath.setAttribute(
          "d",
          `M 10 0 Q ${tension + 10} 100 10 200 T 10 400 T 10 600`
        );
      }
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <>
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Syncopate:wght@400;700&family=Manrope:wght@200;400;600&display=swap");

        :root {
          scroll-behavior: smooth;
          background: #050505;
          --mouse-x: 50%;
          --mouse-y: 50%;
        }

        html,
        body {
          margin: 0;
          padding: 0;
          overflow-x: hidden;
          background: #050505;
          color: #f5f5f7;
          font-family: "Manrope", sans-serif;
        }

        ::-webkit-scrollbar {
          display: none;
        }

        .font-syne {
          font-family: "Syncopate", sans-serif;
        }

        .font-manrope {
          font-family: "Manrope", sans-serif;
        }

        .arch-portal {
          clip-path: ellipse(50% 100% at 50% 100%);
          perspective: 1000px;
        }

        .pearl-refraction {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(15px) brightness(1.2);
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow:
            inset 0 0 20px rgba(255, 255, 255, 0.1),
            0 10px 30px rgba(0, 0, 0, 0.5);
          border-radius: 100px;
          transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
        }

        .pearl-refraction:hover {
          transform: scale(1.05) translateY(-5px);
          backdrop-filter: blur(25px) brightness(1.5);
          border-color: #ff6b00;
        }

        .kinetic-bend {
          view-timeline-name: --bending-text;
          view-timeline-axis: block;
          animation: bend-path linear both;
          animation-timeline: --bending-text;
        }

        @keyframes bend-path {
          0% {
            transform: perspective(500px) rotateX(10deg) skewX(-5deg);
          }

          50% {
            transform: perspective(500px) rotateX(0deg) skewX(0deg);
          }

          100% {
            transform: perspective(500px) rotateX(-10deg) skewX(5deg);
          }
        }

        .orange-bleed {
          background: radial-gradient(
            circle at center,
            rgba(255, 107, 0, 0.15) 0%,
            transparent 70%
          );
        }

        .pearl-line {
          stroke-dasharray: 1000;
          stroke-dashoffset: 1000;
          animation: draw-line 2s ease-out forwards;
        }

        @keyframes draw-line {
          to {
            stroke-dashoffset: 0;
          }
        }

        .curved-edge {
          border-radius: 0 0 100% 100%;
        }

        .stuck-header {
          position: sticky;
          top: 0;
          height: 100vh;
        }
      `}</style>

      <body className="bg-[#050505] text-[#f5f5f7] font-manrope selection:bg-[#ff6b00] selection:text-[#050505]">
        <header className="pointer-events-none fixed left-0 top-0 z-[100] flex w-full items-start justify-between p-10">
          <div className="pointer-events-auto">
            <h1 className="font-syne text-xl font-bold tracking-tighter mix-blend-difference">
              N.NOIR
            </h1>
          </div>

          <div className="pearl-refraction pointer-events-auto flex gap-10 px-8 py-3 font-syne text-[10px] uppercase tracking-[0.3em]">
            <a href="#pearls" className="transition-colors hover:text-[#ff6b00]">
              Jewelry
            </a>
            <a href="#gallery" className="transition-colors hover:text-[#ff6b00]">
              Optics
            </a>
            <a href="#footer" className="transition-colors hover:text-[#ff6b00]">
              Manifesto
            </a>
          </div>
        </header>

        <main>
          <section className="relative grid h-screen w-screen grid-cols-1 overflow-hidden md:grid-cols-[65fr_35fr]">
            <div className="orange-bleed absolute inset-0 z-0 animate-[pulse-glow_4s_cubic-bezier(0.4,0,0.6,1)_infinite]"></div>

            <div className="relative flex items-end justify-center overflow-hidden border-r border-white/5 bg-[#050505]">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_#FF6B00_0%,_transparent_60%)] opacity-20"></div>

              <div className="arch-portal group relative h-[90%] w-[85%] overflow-hidden bg-[#FF6B00]">
                <video autoPlay muted loop playsInline className="h-full w-full object-cover object-left">
                  <source src="/video.mp4" type="video/mp4" />
                </video>

                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-60"></div>
              </div>

              <div className="absolute left-0 top-1/2 h-px w-full -rotate-12 bg-white/10"></div>
              <div className="absolute right-1/4 top-1/3 h-32 w-32 animate-[float_6s_ease-in-out_infinite] rounded-full border border-white/5"></div>
            </div>

            <div className="relative z-10 flex flex-col justify-center bg-[#050505]/20 p-12 backdrop-blur-sm md:p-24">
              <div className="mb-8">
                <span className="mb-4 block font-syne text-[10px] uppercase tracking-[0.5em] text-[#ff6b00]">
                  Aesthetic Mutation
                </span>

                <h2 className="font-syne text-7xl leading-[0.8] uppercase tracking-tighter text-white">
                  Nova
                  <br />
                  <span className="text-transparent" style={{ WebkitTextStroke: "1px #F5F5F7" }}>
                    Noir
                  </span>
                </h2>
              </div>

              <div className="max-w-sm rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-[40px] saturate-[1.8]">
                <p className="text-sm font-light uppercase tracking-widest text-white/70">
                  Kinetic silhouette framing meets refractive pearl physics. A digital flagship for the avant-garde.
                </p>

                <button className="pearl-refraction mt-10 w-full px-10 py-4 font-syne text-[9px] uppercase tracking-[0.4em]">
                  Initialize View
                </button>
              </div>
            </div>
          </section>

          <section id="pearls" className="relative bg-[#050505] px-12 py-40 md:px-24">
            <div className="grid grid-cols-1 gap-32 lg:grid-cols-2">
              <div>
                <h3 className="kinetic-bend mb-20 font-syne text-5xl uppercase tracking-tighter">
                  The Pearl
                  <br />
                  String
                </h3>

                <div className="relative">
                  <svg className="absolute left-[-40px] top-0 h-full w-[20px]" preserveAspectRatio="none">
                    <path
                      ref={wavyPathRef}
                      d="M 10 0 Q 20 100 10 200 T 10 400 T 10 600"
                      fill="none"
                      stroke="white"
                      strokeWidth="0.5"
                      className="pearl-line"
                    />
                  </svg>

                  <ul className="space-y-24">
                    <li className="group cursor-pointer">
                      <span className="mb-2 block font-syne text-[10px] tracking-widest text-[#ff6b00]">
                        01 /
                      </span>
                      <h4 className="font-syne text-4xl uppercase transition-transform group-hover:translate-x-4">
                        Baroque Fusion
                      </h4>
                      <p className="mt-4 text-[9px] uppercase tracking-[0.2em] opacity-40">
                        Refractive Silver & Freshwater Pearl
                      </p>
                    </li>

                    <li className="group cursor-pointer">
                      <span className="mb-2 block font-syne text-[10px] tracking-widest text-[#ff6b00]">
                        02 /
                      </span>
                      <h4 className="font-syne text-4xl uppercase transition-transform group-hover:translate-x-4">
                        Orbital Band
                      </h4>
                      <p className="mt-4 text-[9px] uppercase tracking-[0.2em] opacity-40">
                        18k Obsidian Gold Inlay
                      </p>
                    </li>

                    <li className="group cursor-pointer">
                      <span className="mb-2 block font-syne text-[10px] tracking-widest text-[#ff6b00]">
                        03 /
                      </span>
                      <h4 className="font-syne text-4xl uppercase transition-transform group-hover:translate-x-4">
                        Kinetic Drop
                      </h4>
                      <p className="mt-4 text-[9px] uppercase tracking-[0.2em] opacity-40">
                        Floating Diamond Micro-Frame
                      </p>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="relative flex items-center justify-center">
                <div className="flex aspect-[4/5] w-full items-center justify-center overflow-hidden rounded-[100px] border border-white/5 bg-[#0a0a0a]">
                  <div className="absolute inset-0 bg-[#ff6b00] opacity-0 transition-opacity group-hover:opacity-10"></div>
                  <img
                    src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1974&auto=format&fit=crop"
                    alt=""
                    className="w-[60%] grayscale transition-all duration-700 hover:grayscale-0"
                  />
                </div>
              </div>
            </div>
          </section>

          <section id="gallery" className="bg-[#050505] py-40">
            <div className="mb-32 flex flex-col items-center">
              <div className="h-32 w-px bg-gradient-to-b from-transparent via-[#ff6b00] to-transparent"></div>
              <h3 className="mt-12 font-syne text-2xl uppercase tracking-[0.8em]">
                Optic Focus
              </h3>
            </div>

            <div className="grid grid-cols-1 gap-px bg-white/5 md:grid-cols-3">
              {[
                {
                  src: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=2080&auto=format&fit=crop",
                  label: "Aura Frame_01",
                },
                {
                  src: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=2080&auto=format&fit=crop",
                  label: "Sunset Lens_X",
                },
                {
                  src: "https://images.unsplash.com/photo-1509695507497-903c140c43b0?q=80&w=2073&auto=format&fit=crop",
                  label: "Mono Titanium",
                },
              ].map((item) => (
                <div key={item.label} className="group relative flex aspect-square items-center justify-center overflow-hidden bg-[#050505]">
                  <img
                    src={item.src}
                    alt={item.label}
                    className="h-full w-full scale-110 object-cover grayscale brightness-50 transition-all duration-700 group-hover:scale-100 group-hover:grayscale-0 group-hover:brightness-100"
                  />

                  <div className="absolute inset-0 bg-[#ff6b00] opacity-0 transition-opacity group-hover:opacity-100"></div>

                  <div className="absolute bottom-10 left-10 translate-y-4 opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
                    <p className="font-syne text-xs uppercase tracking-widest">
                      {item.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <footer id="footer" className="relative overflow-hidden bg-[#050505] pb-20 pt-60">
            <div className="absolute left-1/2 top-0 z-0 h-[100vh] w-[200vw] -translate-x-1/2 rounded-[100%] border border-[#ff6b00]/20"></div>
            <div className="absolute left-1/2 top-20 z-0 h-[90vh] w-[180vw] -translate-x-1/2 rounded-[100%] border border-white/5"></div>

            <div className="relative z-10 mx-auto max-w-7xl px-12 text-center">
              <h2 className="mb-20 select-none font-syne text-[18vw] font-bold uppercase leading-none tracking-tighter opacity-10">
                NOVA
              </h2>

              <div className="grid grid-cols-1 items-end gap-20 md:grid-cols-3">
                <div className="space-y-4 text-left font-syne text-[9px] uppercase tracking-[0.5em] text-[#f5f5f7]/40">
                  <a href="#" className="block transition-colors hover:text-[#ff6b00]">
                    Instagram
                  </a>
                  <a href="#" className="block transition-colors hover:text-[#ff6b00]">
                    Vogue Digital
                  </a>
                  <a href="#" className="block transition-colors hover:text-[#ff6b00]">
                    Showroom
                  </a>
                </div>

                <div className="flex flex-col items-center">
                  <div className="pearl-refraction mb-8 flex h-20 w-20 items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-[#ff6b00]"></div>
                  </div>
                  <p className="font-syne text-[10px] uppercase tracking-widest">
                    The Future of Adornment
                  </p>
                </div>

                <div className="font-manrope text-right text-[10px] uppercase tracking-[0.2em] text-[#f5f5f7]/20">
                  &copy; 2026 Nova Noir Boutique
                  <br />
                  All Elements Kinetic
                </div>
              </div>
            </div>
          </footer>
        </main>
      </body>
    </>
  );
}