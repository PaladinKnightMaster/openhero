"use client"

import { useEffect, useRef } from "react"
import { Icon } from "@iconify/react"

export default function TerraformPage() {
  const orbitalRef = useRef<HTMLDivElement>(null)
  const heroTextRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cards = document.querySelectorAll<HTMLElement>(".bento-card")

    const handleCardMove = (e: MouseEvent, card: HTMLElement) => {
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      card.style.setProperty("--mouse-x", `${x}px`)
      card.style.setProperty("--mouse-y", `${y}px`)
    }

    cards.forEach((card) => {
      const move = (e: MouseEvent) => handleCardMove(e, card)
      card.addEventListener("mousemove", move)

      return () => {
        card.removeEventListener("mousemove", move)
      }
    })

    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrolled = window.scrollY

          if (orbitalRef.current && scrolled < window.innerHeight * 1.5) {
            const rotation = scrolled * 0.01
            const scale = 1 + scrolled * 0.0003

            orbitalRef.current.style.transform = `scale(${scale}) rotate(${rotation}deg)`
          }

          ticking = false
        })

        ticking = true
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!heroTextRef.current) return

      const xAxis = (window.innerWidth / 2 - e.pageX) / 60
      const yAxis = (window.innerHeight / 2 - e.pageY) / 60

      heroTextRef.current.style.transform = `translate3d(${xAxis}px, ${yAxis}px, 0)`
    }

    window.addEventListener("scroll", handleScroll)
    document.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      document.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#08140f] text-white antialiased selection:bg-amber-400/30 selection:text-amber-300 relative">
      <div className="fixed inset-0 pointer-events-none z-0 rhizome-bg" />

      <nav className="fixed top-6 inset-x-0 z-50 flex justify-center px-4 transition-all duration-500">
        <div className="flex items-center gap-8 dew-btn px-8 py-4">
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-2 h-2 rounded-full bg-amber-300 shadow-[0_0_10px_rgba(255,200,100,0.6)] group-hover:scale-150 transition-transform duration-500" />

            <span className="text-[11px] tracking-[0.2em] uppercase text-white/70 group-hover:text-white transition-colors">
              Terraform
            </span>
          </a>

          <div className="w-px h-4 bg-white/10" />

          <div className="flex gap-6 text-[11px] tracking-widest uppercase text-white/50">
            <a href="#" className="hover:text-amber-300 transition-colors">
              Mycelium
            </a>

            <a href="#" className="hover:text-amber-300 transition-colors">
              Metrics
            </a>

            <a href="#" className="hover:text-amber-300 transition-colors">
              Vision
            </a>
          </div>
        </div>
      </nav>

      <main className="relative z-10 w-full flex flex-col items-center pb-32">
        <section className="min-h-screen grid grid-cols-1 lg:grid-cols-2 relative w-full max-w-[1600px] mx-auto pt-32 lg:pt-0 mb-24">
          <div className="relative flex flex-col justify-center px-8 md:px-16 lg:px-24 z-20">
            <div ref={heroTextRef} className="kinetic-z">
              <div className="flex items-center gap-4 mb-8">
                <Icon
                  icon="ph:plant-light"
                  className="text-amber-300 text-lg"
                />

                <span className="text-[10px] tracking-[0.4em] uppercase text-white/40">
                  Bio-Tech Convergence
                </span>
              </div>

              <h1 className="font-serif font-medium text-5xl md:text-7xl lg:text-[6.5rem] leading-[0.95] text-white/95 tracking-[-0.04em] drop-shadow-2xl">
                <span className="sway-text block">Photosynthetic</span>

                <span
                  className="sway-text block italic text-amber-300/90 ml-[-0.5em] mt-2"
                  style={{ animationDelay: "-4s" }}
                >
                  Efficiency
                </span>
              </h1>

              <p className="mt-10 text-sm tracking-[0.3em] uppercase text-white/40 max-w-md leading-loose mix-blend-screen">
                Atmospheric biological scrubbers simulating organic cellular
                respiration at an industrial scale.
              </p>

              <div className="mt-12 flex items-center gap-8">
                <div className="flex gap-3 items-center opacity-60">
                  <div className="w-[1px] h-12 bg-gradient-to-b from-amber-300/50 to-transparent" />
                </div>

                <div className="flex flex-col gap-1">
                  <span className="text-[9px] text-white/40 uppercase tracking-widest">
                    Network Logic
                  </span>

                  <span className="italic text-xl text-white/90">
                    Rhizomatic
                  </span>
                </div>

                <div className="w-[1px] h-8 bg-white/10" />

                <div className="flex flex-col gap-1">
                  <span className="text-[9px] text-white/40 uppercase tracking-widest">
                    Refraction
                  </span>

                  <span className="italic text-xl text-white/90">
                    IOR 1.5
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="relative h-[60vh] lg:h-screen w-full flex items-center justify-center lg:justify-end overflow-hidden z-10 pointer-events-none">
            <div
              ref={orbitalRef}
              className="absolute inset-0 w-full h-full portal-mask lg:translate-x-12"
            >
              <div className="absolute inset-0 w-full h-full mix-blend-screen">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-amber-300/20 rounded-full blur-[80px] ambient-pulse" />
              </div>

              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover contrast-125 saturate-150 opacity-90 scale-110"
              >
                <source src="/video.mp4" type="video/mp4" />
              </video>

              <div className="absolute inset-0 bg-[#08140f]/30 mix-blend-overlay" />
            </div>
          </div>
        </section>

        <section className="w-full max-w-[1200px] px-6">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 md:gap-12">
            <div className="bento-card xl:col-span-2 rounded-[2.5rem] p-10 md:p-14 min-h-[400px] flex flex-col justify-between bloom-scroll">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <Icon
                    icon="ph:network-light"
                    className="text-3xl text-amber-300"
                  />

                  <span className="text-[10px] tracking-[0.3em] uppercase text-white/40">
                    Network Status
                  </span>
                </div>

                <div className="px-4 py-1.5 rounded-full bg-amber-300/10 text-amber-300 text-[10px] tracking-widest uppercase flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-300 animate-pulse" />
                  Active
                </div>
              </div>

              <div className="mt-20 relative z-10">
                <h2 className="font-serif text-4xl md:text-5xl text-white/90 mb-4">
                  Mycelium Logic
                </h2>

                <p className="text-white/50 leading-relaxed max-w-md font-light text-sm md:text-base">
                  Decentralized carbon sequestration nodes communicating
                  through underground fiber-optic rhizomes, optimizing
                  absorption rates dynamically based on local atmospheric
                  density.
                </p>
              </div>
            </div>

            <div className="bento-card rounded-[2.5rem] p-10 md:p-14 min-h-[400px] flex flex-col justify-between bloom-scroll">
              <div className="flex items-center gap-3">
                <Icon
                  icon="ph:drop-half-bottom-light"
                  className="text-3xl text-amber-300"
                />

                <span className="text-[10px] tracking-[0.3em] uppercase text-white/40">
                  Yield
                </span>
              </div>

              <div className="mt-16">
                <div className="text-6xl md:text-7xl font-light tracking-tighter text-white mb-2">
                  4.2
                  <span className="text-3xl text-amber-300/60">Gt</span>
                </div>

                <div className="w-full h-px bg-gradient-to-r from-amber-300/40 to-transparent my-6" />

                <p className="text-white/50 leading-relaxed font-light text-sm">
                  Annual gigaton capture efficiency normalized across all
                  active atmospheric biological scrubbers.
                </p>
              </div>
            </div>

            <div className="bento-card xl:col-span-3 rounded-[2.5rem] p-10 md:p-14 min-h-[300px] flex flex-col md:flex-row items-center justify-between gap-10 bloom-scroll">
              <div className="flex-1">
                <span className="text-[10px] tracking-[0.3em] uppercase text-white/40 block mb-6">
                  Initiate Sequence
                </span>

                <h2 className="font-serif text-4xl text-white/90 mb-4">
                  Scalable Biospheres
                </h2>

                <p className="text-white/50 leading-relaxed font-light text-sm max-w-xl">
                  Integrate Terraform&apos;s scalable carbon capture modules
                  into existing industrial infrastructure with zero hard
                  retrofitting. The future is grown, not built.
                </p>
              </div>

              <div className="shrink-0 w-full md:w-auto flex justify-start md:justify-end">
                <button className="dew-btn px-10 py-5 text-[11px] tracking-[0.2em] uppercase text-white/90 flex items-center gap-4">
                  Initialize Deploy

                  <Icon
                    icon="ph:arrow-right-light"
                    className="text-lg text-amber-300"
                  />
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full py-12 flex flex-col items-center justify-center gap-6 relative z-10 bloom-scroll">
        <div className="w-px h-16 bg-gradient-to-b from-transparent via-amber-300/30 to-transparent" />

        <div className="text-[9px] tracking-[0.4em] uppercase text-white/30 text-center mix-blend-screen">
          © 2026 Terraform Industries. Bio-Luxury Architecture.
        </div>
      </footer>

      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Inter+Tight:wght@300;400;500&family=Playfair+Display:wght@400;500;600&display=swap");

        body {
          font-family: "Inter Tight", sans-serif;
        }

        .sway-text {
          display: inline-block;
          animation: sway 8s ease-in-out infinite;
          transform-origin: center center;
          will-change: transform;
        }

        .dew-btn {
          background: rgba(255, 255, 255, 0.05);
          box-shadow:
            inset 0 1px 1px rgba(255, 255, 255, 0.2),
            inset 0 -1px 4px rgba(255, 255, 255, 0.05),
            0 10px 20px rgba(0, 0, 0, 0.3);

          backdrop-filter: blur(24px);
          border-radius: 9999px;
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
          overflow: hidden;
        }

        .dew-btn::after {
          content: "";
          position: absolute;
          inset: 0;
          background: radial-gradient(
            circle at top,
            rgba(255, 255, 255, 0.15) 0%,
            transparent 60%
          );
          opacity: 0;
          transition: opacity 0.5s ease;
        }

        .dew-btn:hover {
          transform: translateY(-2px) scale(1.01);
        }

        .dew-btn:hover::after {
          opacity: 1;
        }

        .portal-mask {
          mask-image: radial-gradient(
            circle at center,
            black 35%,
            transparent 75%
          );
          -webkit-mask-image: radial-gradient(
            circle at center,
            black 35%,
            transparent 75%
          );
        }

        .ambient-pulse {
          animation: ambient-pulse 12s infinite alternate ease-in-out;
        }

        .bento-card {
          background: linear-gradient(
            160deg,
            rgba(255, 255, 255, 0.06),
            rgba(255, 255, 255, 0.01)
          );

          box-shadow:
            inset 0 0 40px rgba(255, 255, 255, 0.01),
            0 20px 50px rgba(0, 0, 0, 0.2);

          backdrop-filter: blur(40px);
          position: relative;
          overflow: hidden;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .bento-card::before {
          content: "";
          position: absolute;
          inset: -200px;

          background: radial-gradient(
            circle 300px at var(--mouse-x, 50%) var(--mouse-y, 50%),
            rgba(255, 200, 100, 0.15),
            transparent 50%
          );

          pointer-events: none;
          mix-blend-mode: screen;
          z-index: 10;
          transition: opacity 0.4s ease;
          opacity: 0;
        }

        .bento-card:hover::before {
          opacity: 1;
        }

        .bento-card:hover {
          transform: translateY(-4px);
        }

        .rhizome-bg {
          background-image: radial-gradient(
            rgba(255, 255, 255, 0.03) 1px,
            transparent 1px
          );

          background-size: 40px 40px;

          mask-image: radial-gradient(
            ellipse at left center,
            black 20%,
            transparent 70%
          );
        }

        .kinetic-z {
          will-change: transform;
          transform-style: preserve-3d;
          transition: transform 0.15s linear;
        }

        .bloom-scroll {
          animation: bloom-anim 1s ease both;
        }

        @keyframes sway {
          0%,
          100% {
            transform: rotate(-1.5deg) translateX(-3px) translateY(1px);
          }

          50% {
            transform: rotate(1.5deg) translateX(3px) translateY(-1px);
          }
        }

        @keyframes ambient-pulse {
          0%,
          100% {
            opacity: 0.6;
            transform: scale(1);
            filter: blur(80px) saturate(120%);
          }

          50% {
            opacity: 0.9;
            transform: scale(1.05);
            filter: blur(100px) saturate(160%);
          }
        }

        @keyframes bloom-anim {
          from {
            opacity: 0;
            transform: scale(0.85) translateY(60px);
            filter: blur(24px);
          }

          to {
            opacity: 1;
            transform: scale(1) translateY(0);
            filter: blur(0);
          }
        }
      `}</style>
    </div>
  )
}