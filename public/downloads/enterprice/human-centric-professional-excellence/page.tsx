"use client"

import { useEffect, useRef } from "react"
import { Icon } from "@iconify/react"

export default function SummitAcademyPage() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-active")
          }
        })
      },
      { threshold: 0.1 }
    )

    document.querySelectorAll(".reveal-text").forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Manrope:wght@200;300;400;600&display=swap');

        :root {
          background-color: oklch(98% 0.01 240);
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          background: oklch(98% 0.01 240);
          color: oklch(25% 0.01 240);
          font-family: 'Manrope', sans-serif;
          overflow-x: hidden;
          cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12"><circle cx="6" cy="6" r="4" fill="black" opacity="0.2"/></svg>'), auto;
        }

        ::-webkit-scrollbar {
          width: 4px;
        }

        ::-webkit-scrollbar-thumb {
          background: oklch(25% 0.01 240 / 0.1);
          border-radius: 10px;
        }

        .font-serif-custom {
          font-family: 'Playfair Display', serif;
        }

        .squircle-mask {
          mask-image: radial-gradient(circle at center, black 30%, transparent 75%);
          -webkit-mask-image: radial-gradient(circle at center, black 30%, transparent 75%);
          border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%;
        }

        .vellum-overlay {
          background: rgba(255, 255, 255, 0.01);
          backdrop-filter: blur(20px) contrast(0.95);
          -webkit-backdrop-filter: blur(20px) contrast(0.95);
        }

        .matte-silk {
          transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 4px 0px rgba(0,0,0,0);
        }

        .matte-silk:hover {
          transform: translateY(-2px) scale(1.02);
          box-shadow: 0 20px 40px rgba(0,0,0,0.04);
        }

        .reveal-text {
          animation: reveal-fade linear both;
          animation-timeline: view();
          animation-range: entry 20% cover 40%;
        }

        @keyframes reveal-fade {
          from {
            opacity: 0;
            transform: translateY(30px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .timeline-line {
          height: 0%;
          animation: grow-line linear both;
          animation-timeline: view();
        }

        @keyframes grow-line {
          from {
            height: 0%;
          }

          to {
            height: 100%;
          }
        }
      `}</style>

      <div className="bg-[oklch(98%_0.01_240)] text-[oklch(25%_0.01_240)] antialiased selection:bg-[oklch(85%_0.02_60)] selection:text-[oklch(25%_0.01_240)]">
        <header className="fixed left-0 top-0 z-50 flex w-full items-center justify-between px-6 py-8 mix-blend-multiply md:px-12">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full border border-black/20">
              <div className="h-1 w-1 rounded-full bg-black"></div>
            </div>

            <span className="font-serif-custom text-lg italic tracking-tight">
              Summit Academy
            </span>
          </div>

          <nav className="hidden gap-12 text-[11px] font-light uppercase tracking-[0.2em] md:flex">
            <a href="#curriculum" className="transition-opacity hover:opacity-70">
              Pedagogy
            </a>

            <a href="#metrics" className="transition-opacity hover:opacity-70">
              Telemetry
            </a>

            <a href="#footer" className="transition-opacity hover:opacity-70">
              Contact
            </a>
          </nav>
        </header>

        <main>
          <section className="grid min-h-screen grid-cols-1 items-center pt-20 lg:grid-cols-[40fr_60fr]">
            <div className="flex flex-col justify-center px-6 md:px-12 lg:px-24">
              <span className="mb-8 block text-[10px] uppercase tracking-[0.4em] text-black/40">
                Refining Human Capital
              </span>

              <h1 className="font-serif-custom mb-12 text-6xl italic leading-[0.9] md:text-7xl lg:text-8xl">
                Silent
                <br />
                Excellence.
              </h1>

              <p className="mb-12 max-w-sm text-lg font-light leading-relaxed text-black/70">
                An adaptive pedagogy designed for the modern executive.
                Orchestrating professional-life balance through cognitive-load
                optimization.
              </p>

              <div className="flex flex-wrap gap-4">
                <button className="matte-silk rounded-full bg-black px-10 py-5 text-[10px] uppercase tracking-widest text-white">
                  Curate Path
                </button>

                <button className="matte-silk rounded-full border border-black/10 px-10 py-5 text-[10px] uppercase tracking-widest">
                  Overview
                </button>
              </div>
            </div>

            <div className="relative flex h-[80vh] items-center justify-center overflow-hidden lg:h-screen">
              <div className="absolute inset-0 translate-x-1/4 scale-110 rounded-full bg-[oklch(85%_0.02_60/0.2)] blur-3xl"></div>

              <div className="squircle-mask relative h-[85%] w-[85%] overflow-hidden shadow-2xl">
                <video
                  ref={videoRef}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="h-full w-full scale-105 object-cover contrast-[0.9] saturate-[0.8]"
                >
                  <source src="/video.mp4" type="video/mp4" />
                </video>

                <div className="absolute inset-0 bg-black/5 mix-blend-overlay"></div>
              </div>

              <div className="vellum-overlay absolute bottom-10 right-6 max-w-[200px] rounded-2xl border border-black/5 p-8 md:bottom-24 md:right-24">
                <span className="font-serif-custom mb-2 block text-lg italic">
                  Deep Focus
                </span>

                <p className="text-[12px] uppercase tracking-widest opacity-80">
                  Environment Optimized for Cognitive Flow
                </p>
              </div>
            </div>
          </section>

          <section
            id="curriculum"
            className="relative overflow-hidden px-6 py-40 md:px-12 lg:px-24 lg:py-60"
          >
            <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-black/5">
              <div className="timeline-line origin-top bg-black/20"></div>
            </div>

            <div className="mx-auto max-w-3xl text-center">
              <div className="reveal-text mb-32">
                <span className="font-serif-custom mb-8 block text-4xl italic">
                  01 / Career Pathing
                </span>

                <h2 className="mb-12 text-sm font-light uppercase tracking-[0.5em]">
                  Dynamic Curriculum Orchestration
                </h2>

                <p className="font-light leading-loose text-black/50">
                  We move beyond linear learning. Our telemetry systems monitor
                  skill-acquisition in real-time, adjusting difficulty and
                  content density to maintain peak mental state.
                </p>
              </div>

              <div className="reveal-text mb-32">
                <span className="font-serif-custom mb-8 block text-4xl italic">
                  02 / Wellness Synthesis
                </span>

                <h2 className="mb-12 text-sm font-light uppercase tracking-[0.5em]">
                  Sustaining the Executive Mind
                </h2>

                <p className="font-light leading-loose text-black/50">
                  High performance is a byproduct of balance. Every module
                  integrates physiological wellness checkpoints and
                  environmental optimization protocols.
                </p>
              </div>
            </div>
          </section>

          <section
            id="metrics"
            className="border-y border-black/5 bg-black/[0.02] px-6 py-32 md:px-12 lg:px-24 lg:py-40"
          >
            <div className="grid grid-cols-1 gap-px bg-black/5 md:grid-cols-3">
              <div className="flex aspect-square flex-col justify-between bg-white p-12 md:aspect-auto md:p-16">
                <div className="h-px w-8 bg-black/20"></div>

                <div>
                  <span className="font-serif-custom mb-4 block text-6xl italic">
                    92%
                  </span>

                  <p className="text-[10px] uppercase tracking-widest opacity-40">
                    Retention Rate via Cognitive Load Management
                  </p>
                </div>
              </div>

              <div className="flex flex-col justify-between bg-white p-12 md:p-16">
                <div className="h-px w-8 bg-black/20"></div>

                <div>
                  <span className="font-serif-custom mb-4 block text-6xl italic">
                    120+
                  </span>

                  <p className="text-[10px] uppercase tracking-widest opacity-40">
                    Global Corporate Partners in Wellness
                  </p>
                </div>
              </div>

              <div className="flex flex-col justify-between bg-white p-12 md:p-16">
                <div className="h-px w-8 bg-black/20"></div>

                <div>
                  <span className="font-serif-custom mb-4 block text-6xl italic">
                    24/7
                  </span>

                  <p className="text-[10px] uppercase tracking-widest opacity-40">
                    Adaptive Telemetry Support
                  </p>
                </div>
              </div>
            </div>
          </section>

          <footer
            id="footer"
            className="relative overflow-hidden bg-[oklch(20%_0.02_160)] px-6 py-32 text-white md:px-12 lg:px-24 lg:py-40"
          >
            <div className="pointer-events-none absolute inset-0 opacity-10">
              <svg className="h-full w-full" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.1"
                />
              </svg>
            </div>

            <div className="relative z-10 grid grid-cols-1 gap-24 lg:grid-cols-2">
              <div>
                <h2 className="font-serif-custom mb-20 text-5xl italic leading-none md:text-6xl lg:text-7xl">
                  The Atelier of
                  <br />
                  Professional Growth.
                </h2>

                <div className="flex flex-wrap gap-12 font-serif-custom text-lg italic opacity-60">
                  <a href="#" className="transition-opacity hover:opacity-100">
                    Geneva
                  </a>

                  <a href="#" className="transition-opacity hover:opacity-100">
                    London
                  </a>

                  <a href="#" className="transition-opacity hover:opacity-100">
                    Tokyo
                  </a>
                </div>
              </div>

              <div className="flex flex-col justify-end text-right lg:items-end">
                <nav className="mb-24 space-y-4 text-xs font-light uppercase tracking-[0.4em]">
                  <a href="#" className="block hover:opacity-50">
                    Private Dossier
                  </a>

                  <a href="#" className="block hover:opacity-50">
                    Faculty Research
                  </a>

                  <a href="#" className="block hover:opacity-50">
                    Alumni Terminal
                  </a>
                </nav>

                <div className="mb-8 h-px w-full bg-white/10"></div>

                <div className="flex w-full flex-col justify-between gap-3 text-[9px] uppercase tracking-[0.3em] opacity-30 md:flex-row">
                  <span>© 2026 Summit Academy</span>

                  <span>Built for Human Focus</span>
                </div>
              </div>
            </div>
          </footer>
        </main>

        <div className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full border border-black/10 bg-white/80 backdrop-blur-xl">
          <Icon icon="mdi:school-outline" className="text-2xl text-black/70" />
        </div>
      </div>
    </>
  )
}