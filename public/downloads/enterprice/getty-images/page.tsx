"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";

export default function Page() {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(pointer:fine)").matches) return;

    const move = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${e.clientX - (hovered ? 35 : 20)}px, ${e.clientY - (hovered ? 35 : 20)}px)`;
      }
    };

    window.addEventListener("mousemove", move);

    return () => {
      window.removeEventListener("mousemove", move);
    };
  }, [hovered]);

  return (
    <>
      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }

        body {
          margin: 0;
          overflow-x: hidden;
          background: oklch(15% 0.02 240);
          color: white;
          font-family: Inter, sans-serif;
        }

        :root {
          --obsidian: oklch(15% 0.02 240);
          --golden-hour: oklch(75% 0.18 45);
          --light-thread: oklch(100% 0 0 / 0.1);
        }

        .video-layer {
          width: 100%;
          height: 100%;
          object-fit: cover;
          mask-image: radial-gradient(
            ellipse 120% 120% at 85% 50%,
            black 45%,
            transparent 70%
          );
          -webkit-mask-image: radial-gradient(
            ellipse 120% 120% at 85% 50%,
            black 45%,
            transparent 70%
          );
          transform: scale(1.05);
        }

        .glass-panel {
          background: oklch(15% 0.02 240 / 0.6);
          backdrop-filter: blur(50px) contrast(1.1) brightness(0.8);
          -webkit-backdrop-filter: blur(50px) contrast(1.1) brightness(0.8);
          border-right: 1px solid var(--light-thread);
        }

        .shutter-btn {
          position: relative;
          overflow: hidden;
          background: var(--obsidian);
          border: 1px solid var(--light-thread);
          box-shadow:
            inset 1px 1px 2px rgba(255, 255, 255, 0.1),
            inset -1px -1px 4px rgba(0, 0, 0, 0.8),
            0 4px 15px rgba(0, 0, 0, 0.5);
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .shutter-btn:hover {
          border-color: var(--golden-hour);
          box-shadow:
            inset 1px 1px 2px rgba(255, 255, 255, 0.15),
            inset -1px -1px 4px rgba(0, 0, 0, 0.9),
            0 0 25px oklch(75% 0.18 45 / 0.3);
        }

        .focus-container:hover .focus-item {
          filter: blur(8px) grayscale(50%);
          opacity: 0.4;
          transform: scale(0.98);
        }

        .focus-item {
          transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
          will-change: filter, opacity, transform;
        }

        .focus-container .focus-item:hover {
          filter: blur(0);
          opacity: 1;
          transform: scale(1.02);
          z-index: 10;
        }

        .obsidian-card {
          background: rgba(37, 37, 37, 0.8);
          border: 1px solid var(--light-thread);
          box-shadow:
            inset 2px 2px 5px rgba(255, 255, 255, 0.03),
            inset -2px -2px 10px rgba(0, 0, 0, 0.8),
            10px 10px 30px rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(5px);
          position: relative;
          overflow: hidden;
        }

        .obsidian-card::before {
          content: "";
          position: absolute;
          top: 0;
          left: -100%;
          width: 50%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.03),
            transparent
          );
          transform: skewX(-20deg);
          transition: left 0.7s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .obsidian-card:hover::before {
          left: 200%;
        }

        .hud-frame {
          position: relative;
          border: 1px solid transparent;
        }

        .hud-frame::before,
        .hud-frame::after {
          content: "";
          position: absolute;
          width: 15px;
          height: 15px;
          border: 1px solid var(--golden-hour);
          opacity: 0.5;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          pointer-events: none;
        }

        .hud-frame::before {
          top: 0;
          left: 0;
          border-right: none;
          border-bottom: none;
        }

        .hud-frame::after {
          bottom: 0;
          right: 0;
          border-left: none;
          border-top: none;
        }

        .hud-frame:hover::before,
        .hud-frame:hover::after {
          width: 35px;
          height: 35px;
          opacity: 1;
        }

        .clip-edge {
          clip-path: polygon(
            0 0,
            100% 0,
            100% calc(100% - 20px),
            calc(100% - 20px) 100%,
            0 100%
          );
        }

        .clip-edge-reverse {
          clip-path: polygon(
            20px 0,
            100% 0,
            100% 100%,
            0 100%,
            0 20px
          );
        }

        .css-grid-bg {
          background-size: 30px 30px;
          background-image:
            linear-gradient(
              to right,
              rgba(255, 255, 255, 0.02) 1px,
              transparent 1px
            ),
            linear-gradient(
              to bottom,
              rgba(255, 255, 255, 0.02) 1px,
              transparent 1px
            );
        }

        .animate-marquee {
          width: max-content;
          animation: marquee 30s linear infinite;
        }

        .animate-marquee:hover {
          animation-play-state: paused;
        }

        @keyframes marquee {
          0% {
            transform: translateX(0);
          }

          100% {
            transform: translateX(-50%);
          }
        }

        ::-webkit-scrollbar {
          width: 6px;
        }

        ::-webkit-scrollbar-track {
          background: var(--obsidian);
        }

        ::-webkit-scrollbar-thumb {
          background: var(--light-thread);
          border-radius: 999px;
        }
      `}</style>

      <div
        ref={cursorRef}
        className={`pointer-events-none fixed left-0 top-0 z-[9999] hidden items-center justify-center rounded-full border border-[#ddb26b] mix-blend-exclusion transition-all duration-200 md:flex ${
          hovered
            ? "h-[70px] w-[70px] bg-[#ddb26b]/10"
            : "h-[40px] w-[40px]"
        }`}
      >
        <div className="h-1 w-1 rounded-full bg-[#ddb26b]" />
      </div>

      <div className="pointer-events-none fixed inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="video-layer h-full w-full"
        >
          <source src="/video.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="pointer-events-none fixed right-[10%] top-[-10%] z-[1] h-[60vh] w-[60vw] rounded-full bg-[radial-gradient(circle,oklch(75%_0.18_45)_0%,transparent_70%)] opacity-15 blur-[100px]" />

      <div className="pointer-events-none fixed bottom-[-20%] left-[20%] z-[1] h-[60vh] w-[40vw] rounded-full bg-[radial-gradient(circle,oklch(80%_0.15_200)_0%,transparent_70%)] opacity-15 blur-[100px]" />

      <div className="relative z-10 flex min-h-screen w-full flex-col md:flex-row">
        <aside className="glass-panel relative z-20 flex min-h-screen w-full flex-col justify-between p-8 md:fixed md:left-0 md:top-0 md:w-[38%] md:p-16">
          <div>
            <div className="mb-12 flex items-center gap-3 md:mb-16">
              <Icon
                icon="ph:aperture-light"
                className="text-3xl text-[#ddb26b]"
              />

              <span className="font-serif text-sm uppercase tracking-[0.3em] text-white/80">
                Visual Solutions
              </span>
            </div>

            <h1 className="mb-6 font-serif text-4xl leading-[1.1] sm:text-5xl md:text-6xl">
              Mastering the <br />
              <i className="font-light text-[#ddb26b]">
                Optical Breach
              </i>
            </h1>

            <p className="mb-10 max-w-sm text-sm font-light leading-relaxed text-white/60 md:mb-12">
              Corporate portraiture elevated through strict Medium Format
              workflows and High-dynamic-range mastering.
            </p>

            <button
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              className="shutter-btn flex items-center gap-4 rounded-full px-8 py-4 text-xs uppercase tracking-[0.25em]"
            >
              Initiate Capture

              <Icon
                icon="ph:focus-light"
                className="text-xl text-[#ddb26b]"
              />
            </button>
          </div>

          <div className="mt-12 flex flex-col gap-6 pb-12 text-xs uppercase tracking-[0.3em] text-white/40 md:mt-0 md:pb-0">
            {[
              "Chromatic Aberration Correction",
              "Subsurface Scattering",
              "Spectral Mastering",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-4 transition-colors hover:text-[#ddb26b]"
              >
                <span className="h-px w-8 bg-current" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </aside>

        <main className="relative z-10 flex min-h-screen w-full flex-col justify-end p-6 pt-12 sm:p-10 md:ml-auto md:w-[62%] md:p-24 md:pt-[60vh]">
          <div className="focus-container mb-24 grid grid-cols-1 gap-6 sm:grid-cols-2 md:mb-32 md:gap-8">
            {[
              {
                icon: "ph:f-stop-light",
                title: "Precision Optics",
                text: "Our lenses resolve at levels that demand meticulous chromatic aberration correction.",
              },
              {
                icon: "ph:sun-dim-light",
                title: "Volume Over Plane",
                text: "We don't light surfaces; we light volumes through subsurface scattering workflows.",
              },
              {
                icon: "ph:camera-light",
                title: "Medium Format",
                text: "The 100-megapixel sensor acts as our canvas for unmatched tonal transitions.",
              },
              {
                icon: "ph:sliders-horizontal-light",
                title: "HDR Mastering",
                text: "Algorithmic blending ensures highlight retention and deep obsidian shadow detail.",
              },
            ].map((card, i) => (
              <div
                key={card.title}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                className={`focus-item obsidian-card cursor-none rounded-2xl p-8 md:p-10 ${
                  i % 2 !== 0 ? "md:translate-y-12" : ""
                }`}
              >
                <Icon
                  icon={card.icon}
                  className="mb-8 text-4xl text-[#ddb26b]"
                />

                <h3 className="mb-4 font-serif text-2xl">
                  {card.title}
                </h3>

                <p className="text-sm font-light leading-relaxed text-white/50">
                  {card.text}
                </p>
              </div>
            ))}
          </div>

          <section className="clip-edge-reverse relative my-16 overflow-hidden border-y border-white/5 bg-black/30 py-10 backdrop-blur-md md:my-24 md:py-16">
            <div className="css-grid-bg absolute inset-0 opacity-30" />

            <div className="animate-marquee relative z-10 flex items-center gap-16 whitespace-nowrap uppercase tracking-[0.4em] text-[#ddb26b]/40">
              {Array.from({ length: 2 }).map((_, idx) => (
                <div key={idx} className="flex items-center gap-16">
                  {[
                    "Medium Format Fidelity",
                    "Spectral Precision",
                    "Optical Purity",
                    "Dynamic Range Mastery",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-4"
                    >
                      <span>{item}</span>

                      <Icon
                        icon="ph:star-four-fill"
                        className="text-[8px] text-white/20"
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </section>

          <section className="mb-24 md:mb-32">
            <div className="mb-12 flex items-center gap-4">
              <span className="h-px w-12 bg-[#ddb26b]" />

              <h2 className="font-serif text-3xl text-white/90">
                Sensor Telemetry
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {[
                {
                  title: "Colorimetry Space",
                  value: "16-Bit",
                  text: "Capturing over 281 trillion distinct hues with advanced tonal gradients.",
                },
                {
                  title: "Exposure Latitude",
                  value: "15 EVs",
                  text: "Capturing intricate detail simultaneously in highlights and deep shadows.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  onMouseEnter={() => setHovered(true)}
                  onMouseLeave={() => setHovered(false)}
                  className="hud-frame overflow-hidden bg-white/[0.01] p-8 backdrop-blur-sm transition-colors duration-500"
                >
                  <h4 className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-[#ddb26b]">
                    {item.title}
                  </h4>

                  <div className="mb-3 font-serif text-5xl text-white/90">
                    {item.value}
                  </div>

                  <p className="max-w-[85%] text-sm leading-relaxed text-white/50">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-24">
            <div className="mb-8 flex flex-col">
              <h2 className="mb-2 font-serif text-3xl text-white/90">
                Exposure Mapping
              </h2>

              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
                Hover to expand tonal range zones
              </p>
            </div>

            <div className="group relative flex h-[250px] w-full gap-2 md:h-[350px]">
              {[
                {
                  zone: "Zone III",
                  desc: "Deep Shadows",
                  bg: "bg-[oklch(10%_0.02_240)]",
                },
                {
                  zone: "Zone V",
                  desc: "Neutral Grays",
                  bg: "bg-[oklch(20%_0.02_240)]",
                },
                {
                  zone: "Zone VIII",
                  desc: "Specular Highlights",
                  bg: "bg-[oklch(35%_0.02_240)]",
                },
              ].map((item) => (
                <div
                  key={item.zone}
                  onMouseEnter={() => setHovered(true)}
                  onMouseLeave={() => setHovered(false)}
                  className={`clip-edge group/item relative flex flex-1 cursor-none flex-col justify-end overflow-hidden border border-white/5 p-6 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:flex-[3] hover:opacity-100 group-hover:opacity-40 ${item.bg}`}
                >
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,oklch(75%_0.18_45/0.15)_0%,transparent_60%)] opacity-0 transition-opacity duration-700 group-hover/item:opacity-100" />

                  <span className="z-10 mb-1 block font-serif text-2xl text-white/80">
                    {item.zone}
                  </span>

                  <span className="z-10 font-mono text-[10px] uppercase tracking-[0.3em] text-[#ddb26b]">
                    {item.desc}
                  </span>
                </div>
              ))}
            </div>
          </section>

          <footer className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs uppercase tracking-[0.3em] text-white/30 sm:flex-row md:mt-32 md:pt-12">
            <span>Getty Images Architecture</span>

            <span>ISO 100 · f/1.4 · 1/8000s</span>
          </footer>
        </main>
      </div>
    </>
  );
}