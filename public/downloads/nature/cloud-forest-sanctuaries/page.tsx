"use client"

import { useEffect } from "react"
import { Icon } from "@iconify/react"

export default function Page() {
  useEffect(() => {
    const clouds = document.querySelectorAll(".canopy")

    const handleScroll = () => {
      const scrollY = window.scrollY

      clouds.forEach((el, i) => {
        const speed = (i + 1) * 0.03
        ;(el as HTMLElement).style.transform = `translateY(${scrollY * speed}px)`
      })
    }

    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <>
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Instrument+Serif:ital@0;1&display=swap");

        :root {
          --text: oklch(20% 0.02 160);
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
          font-family: "Manrope", sans-serif;
          background:
            radial-gradient(circle at top left, rgba(198, 255, 221, 0.55), transparent 25%),
            radial-gradient(circle at bottom right, rgba(142, 202, 174, 0.18), transparent 20%),
            linear-gradient(180deg, #eef7ef 0%, #dbeadf 100%);
          color: var(--text);
        }

        body::before {
          content: "";
          position: fixed;
          inset: 0;
          pointer-events: none;
          background:
            radial-gradient(circle at 20% 10%, rgba(255, 255, 255, 0.55), transparent 15%),
            radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.4), transparent 14%),
            radial-gradient(circle at 40% 80%, rgba(255, 255, 255, 0.3), transparent 18%);
          mix-blend-mode: screen;
          opacity: 0.8;
          z-index: -1;
        }

        .serif {
          font-family: "Instrument Serif", serif;
          letter-spacing: -0.05em;
        }

        .mist-button {
          position: relative;
          overflow: hidden;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.18);
          backdrop-filter: blur(30px) saturate(1.1);
          border: none;
          color: white;
          transition: 0.7s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.28),
            0 12px 50px rgba(10, 50, 25, 0.16);
        }

        .mist-button::before {
          content: "";
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at center, rgba(255, 255, 255, 0.22), transparent 70%);
          opacity: 0;
          transition: 0.7s ease;
        }

        .mist-button:hover {
          transform: translateY(-4px) scale(1.02);
          background: rgba(255, 255, 255, 0.24);
        }

        .mist-button:hover::before {
          opacity: 1;
          transform: scale(1.3);
        }

        .hero-video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          animation: zoom 18s ease-in-out infinite alternate;
        }

        .hero-overlay {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle at top, rgba(255, 255, 255, 0.16), transparent 30%),
            linear-gradient(180deg, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.45));
        }

        .condense {
          opacity: 0;
          filter: blur(22px);
          transform: translateY(40px) scale(0.96);
          animation: condense 1.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .condense:nth-child(2) {
          animation-delay: 0.18s;
        }

        .condense:nth-child(3) {
          animation-delay: 0.32s;
        }

        .header-float {
          background: rgba(0, 0, 0, 0.3);
          backdrop-filter: blur(28px) saturate(1.5);
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.08),
            0 14px 60px rgba(0, 0, 0, 0.4);
          border: 1px solid rgba(255, 255, 255, 0.05);
        }

        .vapor {
          background: rgba(255, 255, 255, 0.12);
          backdrop-filter: blur(32px);
          box-shadow: 0 30px 80px rgba(11, 40, 20, 0.1);
        }

        .ascend-light {
          background:
            radial-gradient(circle at top left, rgba(255, 255, 255, 0.55), transparent 20%),
            linear-gradient(180deg, #edf7ef 0%, #d7eadb 100%);
        }

        .ascend-mid {
          background:
            radial-gradient(circle at top, rgba(255, 255, 255, 0.458), transparent 40%),
            linear-gradient(180deg, #1a2e22 0%, #1b5b2c 100%);
          position: relative;
        }

        .ascend-deep {
          background:
            radial-gradient(circle at top, rgba(255, 255, 255, 0.06), transparent 14%),
            linear-gradient(180deg, #234334 0%, #11251c 100%);
        }

        .organic {
          border-radius: 42% 58% 61% 39% / 38% 36% 64% 62%;
        }

        .leaf {
          border-radius: 58% 42% 64% 36% / 41% 60% 40% 59%;
        }

        .canopy {
          position: absolute;
          backdrop-filter: blur(30px);
          background: rgba(255, 255, 255, 0.14);
          box-shadow: 0 30px 80px rgba(16, 50, 30, 0.14);
          animation: float 10s ease-in-out infinite;
        }

        .earth {
          position: relative;
          overflow: hidden;
        }

        .earth::before {
          content: "";
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle at 30% 20%, rgba(104, 160, 123, 0.18), transparent 20%),
            radial-gradient(circle at 70% 80%, rgba(255, 255, 255, 0.04), transparent 18%);
          opacity: 0.7;
        }

        .moss-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
          background-size: 70px 70px;
          mask-image: radial-gradient(circle at center, black 40%, transparent 90%);
        }

        @keyframes condense {
          to {
            opacity: 1;
            filter: blur(0);
            transform: translateY(0) scale(1);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }

          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes zoom {
          from {
            transform: scale(1.02);
          }

          to {
            transform: scale(1.12);
          }
        }

        ::view-transition-old(root),
        ::view-transition-new(root) {
          animation-duration: 0.8s;
          animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}</style>

      <header className="fixed left-1/2 top-6 z-50 -translate-x-1/2">
        <div className="header-float flex items-center gap-10 rounded-full px-8 py-4">
          <div className="flex items-center gap-4">
            <div className="grid h-12 w-12 place-items-center rounded-full bg-white/10">
              <Icon icon="ph:leaf-bold" className="text-2xl text-white" />
            </div>

            <div>
              <div className="text-[10px] uppercase tracking-[0.35em] text-white/55">
                Vértice Verde
              </div>

              <div className="text-sm text-white">
                Cloud Forest Sanctuaries
              </div>
            </div>
          </div>

          <nav className="hidden items-center gap-8 text-[11px] uppercase tracking-[0.24em] text-white/60 lg:flex">
            <a href="#valley" className="transition hover:text-white">
              Valley
            </a>

            <a href="#canopy" className="transition hover:text-white">
              Canopy
            </a>

            <a href="#roots" className="transition hover:text-white">
              Roots
            </a>
          </nav>
        </div>
      </header>

      <main>
        <section className="relative h-screen overflow-hidden">
          <div className="absolute inset-0 bg-[oklch(92%_0.03_150)]" />

          <div className="fog-mask absolute inset-0">
            <video autoPlay muted loop playsInline className="hero-video">
              <source src="/video.mp4" type="video/mp4" />
            </video>

            <div className="hero-overlay" />
          </div>

          <div className="relative z-10 flex h-full items-center justify-center px-6">
            <div className="max-w-5xl rounded-[4rem] px-10 py-14 text-center text-white">
              <div className="condense inline-flex items-center gap-3 rounded-full bg-white/10 px-5 py-2 text-[11px] uppercase tracking-[0.32em] text-white/80">
                Orographic precipitation · Montane biodiversity
              </div>

              <h1 className="serif condense mt-10 text-[clamp(4rem,11vw,10rem)] leading-[0.85]">
                Vértice
                <br />
                Verde
              </h1>

              <p className="condense mx-auto mt-8 max-w-2xl text-lg leading-9 text-white/75">
                A cinematic eco-reserve shaped by epiphytic ecosystems,
                mycorrhizal networks, and carbon-sink highlands hidden inside
                the cloud forest canopy.
              </p>

              <div className="condense mt-10 flex flex-wrap justify-center gap-4">
                <button className="mist-button px-8 py-5 text-[11px] uppercase tracking-[0.24em]">
                  Explore Sanctuary
                </button>

                <button className="rounded-full bg-white/8 px-8 py-5 text-[11px] uppercase tracking-[0.24em] text-white/70 backdrop-blur-3xl transition hover:bg-white/14">
                  View Research Map
                </button>
              </div>
            </div>
          </div>
        </section>

        <section
          id="valley"
          className="ascend-light relative overflow-hidden px-8 py-36"
        >
          <div className="mx-auto max-w-[1700px]">
            <div className="relative min-h-[900px]">
              <div className="vapor organic absolute left-[4%] top-0 max-w-md p-10">
                <div className="text-[11px] uppercase tracking-[0.32em] text-emerald-900/90">
                  Valley View
                </div>

                <h2 className="serif mt-6 text-6xl leading-[0.9] text-emerald-950">
                  Humidity shaped by elevation.
                </h2>
              </div>

              <div className="vapor leaf absolute right-[8%] top-[14rem] max-w-xl p-20">
                <p className="text-lg leading-9 text-emerald-950/70">
                  Every altitude layer changes the atmosphere. Dense fog, moss
                  saturation, and forest acoustics evolve as the sanctuary
                  ascends through the mountains.
                </p>
              </div>

              <div className="vapor organic absolute bottom-[10rem] left-[18%] w-[360px] p-8">
                <div className="text-[11px] uppercase tracking-[0.28em] text-emerald-900/90">
                  Carbon-sink highlands
                </div>

                <div className="mt-5 text-6xl font-semibold text-emerald-950">
                  84%
                </div>
              </div>

              <div className="vapor leaf absolute bottom-0 right-[22%] w-[420px] p-10">
                <div className="text-[11px] uppercase tracking-[0.28em] text-emerald-900/90">
                  Epiphytic ecosystems
                </div>

                <p className="mt-5 text-base leading-8 text-emerald-950/70">
                  Orchids, mosses, and canopy-rooted species grow suspended in
                  mist-heavy atmospheric corridors.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section
          id="canopy"
          className="ascend-mid relative overflow-hidden px-8 py-40"
        >
          <div className="mx-auto max-w-[1700px]">
            <div className="max-w-4xl">
              <div className="text-[11px] uppercase tracking-[0.32em] text-white/70">
                Canopy Cards
              </div>

              <h2 className="serif mt-6 text-[clamp(3rem,7vw,7rem)] leading-[0.88] text-white">
                Floating ecosystems between fog and light.
              </h2>
            </div>

            <div className="relative mt-28 min-h-[1000px]">
              <article className="canopy organic absolute left-[5%] top-[4rem] h-[320px] w-[320px] p-10 text-white">
                <div className="text-[10px] uppercase tracking-[0.28em] text-white/90">
                  Mycorrhizal networks
                </div>

                <div className="mt-8 text-5xl font-semibold">12km</div>

                <p className="mt-6 text-sm leading-7 text-white/70">
                  Underground fungal communication systems extending beneath the
                  mountain floor.
                </p>
              </article>

              <article
                className="canopy leaf absolute right-[10%] top-0 h-[420px] w-[440px] p-20 text-white"
                style={{ animationDuration: "14s" }}
              >
                <div className="text-[10px] uppercase tracking-[0.28em] text-white/90">
                  Orographic precipitation
                </div>

                <h3 className="serif mt-8 text-5xl leading-[0.9]">
                  Clouds condensed into rivers.
                </h3>
              </article>

              <article
                className="canopy organic absolute left-[28%] top-[28rem] h-[280px] w-[280px] p-8 text-white"
                style={{ animationDuration: "12s" }}
              >
                <div className="text-[10px] uppercase tracking-[0.28em] text-white/90">
                  Botanical sanctuaries
                </div>

                <div className="mt-8 text-4xl">148 species</div>
              </article>

              <article
                className="canopy leaf absolute bottom-[4rem] right-[22%] h-[340px] w-[340px] p-10 text-white"
                style={{ animationDuration: "16s" }}
              >
                <div className="text-[10px] uppercase tracking-[0.28em] text-white/90">
                  Mist density
                </div>

                <p className="mt-8 text-lg leading-9 text-white/70">
                  Deep canopy moisture creates a permanent veil between the
                  forest floor and the upper alpine ridge.
                </p>
              </article>
            </div>
          </div>
        </section>

        <footer
          id="roots"
          className="ascend-deep earth relative overflow-hidden px-8 py-32 text-white"
        >
          <div className="moss-grid" />

          <div className="relative z-10 mx-auto max-w-[1700px]">
            <div className="grid gap-20 lg:grid-cols-[1.1fr_.9fr]">
              <div>
                <div className="text-[11px] uppercase tracking-[0.34em] text-white/40">
                  Rooted Footer
                </div>

                <h2 className="serif mt-8 text-[clamp(3rem,7vw,7rem)] leading-[0.88]">
                  Grounded beneath the clouds.
                </h2>

                <p className="mt-8 max-w-2xl text-lg leading-9 text-white/65">
                  Dense moss textures, damp earth atmospheres, and rooted
                  biodiversity systems create a sanctuary designed to preserve
                  altitude-sensitive ecosystems.
                </p>
              </div>

              <div className="space-y-6">
                <div className="rounded-[3rem] bg-white/6 p-8 backdrop-blur-3xl">
                  <div className="text-[10px] uppercase tracking-[0.28em] text-white/40">
                    Forest recovery
                  </div>

                  <div className="mt-4 text-6xl font-semibold">92%</div>
                </div>

                <div className="rounded-[3rem] bg-white/6 p-8 backdrop-blur-3xl">
                  <div className="text-[10px] uppercase tracking-[0.28em] text-white/40">
                    Biodiversity density
                  </div>

                  <div className="mt-4 text-6xl font-semibold">High</div>
                </div>
              </div>
            </div>

            <div className="mt-24 flex flex-wrap items-center justify-between gap-6 border-t border-white/10 pt-8 text-sm text-white/90">
              <div>Vértice Verde · Cloud Forest Sanctuaries</div>

              <div className="flex gap-5 text-[11px] uppercase tracking-[0.28em]">
                <span>Clouds</span>
                <span>Moss</span>
                <span>Altitude</span>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </>
  )
}