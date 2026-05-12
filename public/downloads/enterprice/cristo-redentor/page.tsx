"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";

export default function Page() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const updateHero = () => {
      const max = window.innerHeight * 1.2;
      const progress = Math.min(Math.max(window.scrollY / max, 0), 1);
      const nextScale = 1 + progress * 0.16;
      setScale(nextScale);

      if (videoRef.current) {
        videoRef.current.style.transform = `scale(${nextScale}) translateY(${
          progress * 16
        }px)`;
      }
    };

    updateHero();

    let raf = 0;

    const onScroll = () => {
      if (raf) return;

      raf = window.requestAnimationFrame(() => {
        updateHero();
        raf = 0;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateHero);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateHero);
    };
  }, []);

  return (
    <>
      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }

        body {
          margin: 0;
          overflow-x: hidden;
          background:
            radial-gradient(circle at 20% 10%, rgba(97, 218, 251, 0.16), transparent 18%),
            radial-gradient(circle at 82% 16%, rgba(255, 198, 109, 0.12), transparent 18%),
            radial-gradient(circle at 50% 100%, rgba(87, 150, 110, 0.08), transparent 22%),
            linear-gradient(
              180deg,
              oklch(98% 0.01 240) 0%,
              oklch(97% 0.01 240) 46%,
              oklch(95% 0.01 240) 100%
            );
          color: #0b1220;
          font-family: sans-serif;
        }

        body::before {
          content: "";
          position: fixed;
          inset: 0;
          pointer-events: none;
          background-image:
            linear-gradient(rgba(15, 23, 42, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(15, 23, 42, 0.03) 1px, transparent 1px);
          background-size: 96px 96px;
          mask-image: radial-gradient(circle at center, black 30%, transparent 85%);
          opacity: 0.5;
          z-index: -2;
        }

        .serif {
          font-family: Georgia, serif;
          letter-spacing: -0.06em;
        }

        .sheet {
          background: linear-gradient(
            180deg,
            rgba(255, 255, 255, 0.68),
            rgba(255, 255, 255, 0.42)
          );
          border: 1px solid rgba(255, 255, 255, 0.45);
          backdrop-filter: blur(38px) saturate(1.18);
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.6),
            0 25px 70px rgba(80, 100, 120, 0.1);
        }

        .sheet-mist {
          background: linear-gradient(
            180deg,
            rgba(255, 255, 255, 0.62),
            rgba(255, 255, 255, 0.34)
          );
          border: 1px solid rgba(255, 255, 255, 0.44);
          backdrop-filter: blur(50px) saturate(1.2);
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.5),
            0 28px 100px rgba(87, 118, 145, 0.1);
        }

        .dew {
          position: relative;
          overflow: hidden;
          border-radius: 999px;
          background: linear-gradient(
            180deg,
            rgba(255, 255, 255, 0.76),
            rgba(255, 255, 255, 0.5)
          );
          border: 1px solid rgba(255, 255, 255, 0.68);
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.72),
            0 0 0 1px rgba(255, 255, 255, 0.28),
            0 18px 40px rgba(97, 218, 251, 0.08);
          transition:
            transform 0.55s cubic-bezier(0.16, 1, 0.3, 1),
            box-shadow 0.55s ease,
            border-color 0.35s ease;
        }

        .dew::after {
          content: "";
          position: absolute;
          inset: -120%;
          background: linear-gradient(
            120deg,
            transparent 44%,
            rgba(255, 255, 255, 0.75) 50%,
            transparent 57%
          );
          transform: translateX(-140%) rotate(14deg);
          animation: sheen 8s ease-in-out infinite;
          pointer-events: none;
          mix-blend-mode: screen;
        }

        .dew:hover {
          transform: translateY(-4px) scale(1.01);
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.8),
            0 0 0 1px rgba(97, 218, 251, 0.18),
            0 22px 50px rgba(97, 218, 251, 0.12);
        }

        .portal-shell {
          border-radius: 43% 57% 58% 42% / 40% 33% 67% 60%;
          mask-image:
            radial-gradient(circle at 50% 46%, black 0 24%, rgba(0, 0, 0, 0.98) 31%, rgba(0, 0, 0, 0.72) 46%, transparent 70%),
            radial-gradient(circle at 18% 16%, rgba(0, 0, 0, 0.9) 0 10%, transparent 24%),
            radial-gradient(circle at 82% 18%, rgba(0, 0, 0, 0.9) 0 10%, transparent 26%),
            radial-gradient(circle at 52% 85%, rgba(0, 0, 0, 0.86) 0 12%, transparent 28%);
          filter: drop-shadow(0 0 90px rgba(97, 218, 251, 0.15));
        }

        .soft-screen {
          backdrop-filter: blur(50px) saturate(1.2);
          background: linear-gradient(
            180deg,
            rgba(255, 255, 255, 0.4),
            rgba(255, 255, 255, 0.18)
          );
          border: 1px solid rgba(255, 255, 255, 0.35);
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.5),
            0 16px 50px rgba(76, 108, 132, 0.08);
        }

        .mask-fade {
          mask-image: radial-gradient(circle at center, black 38%, transparent 82%);
        }

        .title-shadow {
          text-shadow: 0 0 20px rgba(255, 255, 255, 0.35);
        }

        .wind {
          display: inline-block;
          animation: wind 9s ease-in-out infinite;
          transform-origin: center bottom;
        }

        .river-line {
          position: absolute;
          inset: auto 0;
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(97, 218, 251, 0.4),
            rgba(255, 198, 109, 0.42),
            transparent
          );
        }

        @keyframes sheen {
          to {
            transform: translateX(240%) rotate(14deg);
          }
        }

        @keyframes wind {
          0%,
          100% {
            transform: rotate(-1deg) translateX(-1px);
          }

          50% {
            transform: rotate(1deg) translateX(1px);
          }
        }
      `}</style>

      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 left-[12%] h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,rgba(97,218,251,.18),transparent_70%)] blur-3xl" />
        <div className="absolute bottom-0 right-[8%] h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(circle,rgba(255,198,109,.14),transparent_70%)] blur-3xl" />
      </div>

      <header className="fixed inset-x-0 top-0 z-50 px-6 py-5 md:px-10">
        <div className="sheet mx-auto flex max-w-[1600px] items-center justify-between rounded-[2rem] px-6 py-4">
          <div className="flex items-center gap-4">
            <div className="grid h-11 w-11 place-items-center rounded-[1.5rem] border border-white/40 bg-white/55">
              <Icon icon="ph:cross-fill" className="text-2xl text-[#6c89a3]" />
            </div>

            <div className="leading-tight">
              <div className="text-[11px] uppercase tracking-[0.34em] text-slate-700">
                Cristo Redentor
              </div>

              <div className="text-sm text-slate-700">
                Rio de Janeiro Heritage
              </div>
            </div>
          </div>

          <nav className="hidden items-center gap-10 text-[11px] uppercase tracking-[0.24em] text-slate-700 lg:flex">
            <a href="#story" className="transition hover:text-[#2f6fa3]">
              Story
            </a>

            <a href="#preservation" className="transition hover:text-[#2f6fa3]">
              Preservation
            </a>

            <a href="#biodiversity" className="transition hover:text-[#2f6fa3]">
              Biodiversity
            </a>

            <a href="#visit" className="transition hover:text-[#2f6fa3]">
              Visit
            </a>
          </nav>

          <button className="dew rounded-[2rem] px-6 py-3 text-[11px] uppercase tracking-[0.24em] text-slate-700">
            Book a viewing
          </button>
        </div>
      </header>

      <main className="relative pt-[92px]">
        <section className="relative min-h-screen">
          <div
            className="portal-shell mask-fade absolute inset-0"
            style={{
              transform: `scale(${scale})`,
            }}
          >
            <video
              ref={videoRef}
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 h-full w-full object-cover"
            >
              <source src="/video.mp4" type="video/mp4" />
            </video>

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_70%,rgba(0,0,0,.05),rgba(255,255,255,.02)_30%,transparent_60%)]" />
          </div>

          <div className="relative z-10 mx-auto flex min-h-[calc(100svh-92px)] max-w-[1600px] items-center px-6 py-10 md:px-10">
            <div className="grid w-full items-center gap-10 lg:grid-cols-[.42fr_.58fr]">
              <div className="flex flex-col justify-center">
                <h1 className="serif title-shadow max-w-2xl text-[clamp(3.8rem,8vw,7rem)] leading-[.88] text-[#0d1725]">
                  <span className="wind block">Cristo</span>
                  <span className="wind block">Redentor</span>
                </h1>

                <p className="mt-6 max-w-xl text-[clamp(1rem,1.7vw,1.22rem)] leading-8 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                  Iconographic preservation, aerial cartography, and panoramic
                  biodiversity converge in an immersive homage to one of Rio de
                  Janeiro’s most enduring cultural presences.
                </p>

                <div className="mt-9 flex flex-wrap gap-3">
                  <button className="dew rounded-[2rem] px-6 py-3.5 text-[12px] uppercase tracking-[0.24em] text-slate-900">
                    Explore the monument
                  </button>

                  <button className="dew rounded-[2rem] px-6 py-3.5 text-[12px] uppercase tracking-[0.24em] text-slate-900">
                    Visit preservation archive
                  </button>
                </div>

                <div className="mt-10 flex flex-wrap gap-3 text-[11px] uppercase tracking-[0.22em] text-slate-700">
                  <span className="rounded-full border border-white/40 bg-white/55 px-4 py-2">
                    Soapstone masonry
                  </span>

                  <span className="rounded-full border border-white/40 bg-white/55 px-4 py-2">
                    Panoramic biodiversity
                  </span>
                </div>
              </div>

              <div className="relative flex h-full w-full flex-col justify-end pb-12 lg:items-end">
                <div className="absolute bottom-20 right-0 h-40 w-80 bg-[radial-gradient(circle,rgba(97,218,251,.20),transparent_70%)] blur-3xl" />

                <div className="absolute bottom-0 left-20 h-32 w-64 bg-[radial-gradient(circle,rgba(255,198,109,.18),transparent_70%)] blur-3xl" />

                <div className="relative w-full max-w-[32rem]">
                  <div className="soft-screen overflow-hidden rounded-[2rem] p-4 md:p-5">
                    <div className="rounded-[1.6rem] border border-white/40 bg-white/45 p-4 backdrop-blur-[48px] shadow-2xl">
                      <div className="grid gap-3 sm:grid-cols-2">
                        <div className="rounded-[1.4rem] border border-white/35 bg-white/40 p-4">
                          <div className="text-[10px] uppercase tracking-[0.28em] text-slate-700/80">
                            Elevation
                          </div>

                          <div className="mt-2 text-3xl font-semibold text-slate-900">
                            710m
                          </div>
                        </div>

                        <div className="rounded-[1.4rem] border border-white/35 bg-white/40 p-4">
                          <div className="text-[10px] uppercase tracking-[0.28em] text-slate-700/80">
                            Width
                          </div>

                          <div className="mt-2 text-3xl font-semibold text-slate-900">
                            28m
                          </div>
                        </div>

                        <div className="rounded-[1.4rem] border border-white/35 bg-white/40 p-4 sm:col-span-2">
                          <div className="text-[10px] uppercase tracking-[0.28em] text-slate-700/80">
                            Material
                          </div>

                          <div className="mt-2 text-xl font-semibold leading-tight text-slate-900">
                            Soapstone masonry · reinforced concrete core
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="river-line bottom-0" />
        </section>

        <section
          id="story"
          className="relative mx-auto max-w-[1600px] px-6 py-24 md:px-10"
        >
          <div className="max-w-4xl">
            <div className="text-[11px] uppercase tracking-[0.32em] text-slate-700">
              Heritage lens
            </div>

            <h2 className="serif mt-5 text-[clamp(2.6rem,5vw,5rem)] leading-[.95] text-[#101927]">
              A cultural landmark shaped by sky, stone, and coastal light.
            </h2>
          </div>

          <div className="mt-14 flex flex-col gap-4 lg:flex-row">
            {[
              {
                title: "Iconographic preservation",
                text: "Conservation practices designed to protect the statue’s visual identity while respecting the weathering logic of high-altitude exposure.",
              },
              {
                title: "Aerial cartography",
                text: "Aerial perspective and route mapping that translate the experience of approaching Corcovado across the bay and forest ridge.",
              },
              {
                title: "Monumental telemetry",
                text: "Quiet operational insight for preservation, visitor flow, environmental conditions, and monument stewardship.",
              },
            ].map((item) => (
              <article
                key={item.title}
                className="sheet flex-1 rounded-[2rem] p-6 lg:p-8"
              >
                <div className="text-[10px] uppercase tracking-[0.28em] text-slate-700">
                  {item.title}
                </div>

                <p className="mt-4 text-base leading-8 text-slate-700">
                  {item.text}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section
          id="biodiversity"
          className="relative mx-auto max-w-[1600px] px-6 py-24 md:px-10"
        >
          <div className="mb-14 max-w-4xl">
            <div className="text-[11px] uppercase tracking-[0.32em] text-slate-700">
              Panoramic biodiversity
            </div>

            <h2 className="serif mt-5 text-[clamp(2.5rem,5vw,4.8rem)] leading-[.95] text-[#10203a]">
              Rio’s Atlantic breeze, forest canopy, and ocean horizon flow
              together.
            </h2>
          </div>

          <div className="flex flex-col gap-4 lg:flex-row">
            {[
              {
                title: "Golden Hour Amber",
                text: "Warm light leaks echo sunrise and sunset over the bay, softening transitions between monument, forest, and city.",
              },
              {
                title: "Ocean Cyan",
                text: "Cinematic accents shape the coastline feeling of the interface, as if the system breathes with the Atlantic current.",
              },
              {
                title: "Stone grey",
                text: "A restrained palette that honors the statue, the stone, and the museum-grade calm of the experience.",
              },
            ].map((item) => (
              <article
                key={item.title}
                className="sheet flex-1 rounded-[2rem] p-6 lg:p-8"
              >
                <div className="text-[10px] uppercase tracking-[0.28em] text-slate-700">
                  {item.title}
                </div>

                <p className="mt-4 text-base leading-8 text-slate-700">
                  {item.text}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section
          id="visit"
          className="relative mx-auto max-w-[1600px] px-6 py-24 md:px-10"
        >
          <div className="sheet-mist rounded-[2rem] p-6 md:p-8">
            <div className="grid gap-8 lg:grid-cols-[1.1fr_.9fr] lg:items-end">
              <div>
                <div className="text-[11px] uppercase tracking-[0.32em] text-slate-700">
                  Visit
                </div>

                <h2 className="serif mt-5 text-[clamp(2.5rem,5vw,4.6rem)] leading-[.95] text-[#10203a]">
                  Plan an immersive ascent.
                </h2>

                <p className="mt-5 max-w-2xl text-base leading-8 text-slate-700">
                  Private viewing routes, heritage storytelling, and panoramic
                  positioning guided by preservation-minded spatial design.
                </p>
              </div>

              <div className="space-y-3">
                <div className="sheet flex items-center gap-3 rounded-[2rem] px-4 py-3">
                  <Icon
                    icon="ph:envelope-simple"
                    className="text-xl text-slate-700"
                  />

                  <input
                    type="email"
                    placeholder="Email address"
                    className="min-w-0 flex-1 bg-transparent text-slate-900 outline-none placeholder:text-slate-400"
                  />
                </div>

                <button className="dew w-full rounded-[2rem] px-5 py-4 text-sm text-slate-900">
                  Request private route
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}