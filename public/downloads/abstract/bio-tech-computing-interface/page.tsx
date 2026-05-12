"use client"
import { useEffect, useRef } from "react";
import { Icon } from "@iconify/react";

export default function AnthropicBioTechInterface() {
    const portalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const root = document.documentElement;
        let ticking = false;

        const updateFluidCoordinates = (
            e: MouseEvent,
            el?: HTMLElement,
            isRoot = false
        ) => {
            const target = isRoot ? root : el;
            if (!target) return;

            const rect = isRoot
                ? { left: 0, top: 0 }
                : el!.getBoundingClientRect();

            target.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
            target.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
        };

        const handleMouseMove = (e: MouseEvent) => {
            updateFluidCoordinates(e, undefined, true);
        };

        const fluidNodes = document.querySelectorAll(".fluid-node");

        const handleScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    const scrolled = window.scrollY;

                    if (portalRef.current) {
                        portalRef.current.style.transform = `
              translate3d(0, ${scrolled * 0.12}px, 0)
              scale(${1 + scrolled * 0.0004})
              rotate(${scrolled * 0.01}deg)
            `;
                    }

                    ticking = false;
                });

                ticking = true;
            }
        };

        window.addEventListener("mousemove", handleMouseMove, {
            passive: true,
        });

        fluidNodes.forEach((el) => {
            el.addEventListener(
                "mousemove",
                (e: Event) => {
                    updateFluidCoordinates(
                        e as MouseEvent,
                        el as HTMLElement
                    );
                },
                { passive: true }
            );
        });

        window.addEventListener("scroll", handleScroll, {
            passive: true,
        });

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const toggleTheme = () => {
        const synthesize = () => {
            document.body.getAttribute("data-theme") === "synthesized"
                ? document.body.removeAttribute("data-theme")
                : document.body.setAttribute("data-theme", "synthesized");
        };

        const startViewTransition = (document as Document & {
            startViewTransition?: (cb: () => void) => void;
        }).startViewTransition;

        startViewTransition ? startViewTransition(synthesize) : synthesize();
    };
    
    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;500;600&display=swap');

        :root {
          --obsidian: oklch(12% 0.05 280);
          --electric-violet: oklch(60% 0.25 300);
          --amber-glow: oklch(75% 0.15 50);
          --text-core: oklch(98% 0.01 280);
          --text-dim: oklch(65% 0.05 280);
          --surface-top: oklch(25% 0.08 280 / 0.4);
          --surface-bottom: oklch(15% 0.05 280 / 0.6);
          --shadow-dark: oklch(5% 0.05 280 / 0.9);
          --shadow-light: oklch(80% 0.15 300 / 0.15);
          --mouse-x: 50%;
          --mouse-y: 50%;
          color-scheme: dark;
        }

        [data-theme="synthesized"] {
          --obsidian: oklch(95% 0.02 280);
          --text-core: oklch(15% 0.05 280);
          --text-dim: oklch(45% 0.05 280);
          --surface-top: oklch(100% 0.02 280 / 0.5);
          --surface-bottom: oklch(90% 0.02 280 / 0.7);
          --shadow-dark: oklch(60% 0.1 280 / 0.2);
          --shadow-light: oklch(100% 0 0 / 1);
        }

        body {
          background-color: var(--obsidian);
          color: var(--text-core);
          font-family: 'Inter', sans-serif;
          overflow-x: hidden;
          overscroll-behavior: none;
          -webkit-font-smoothing: antialiased;
          transition: background-color 0.8s cubic-bezier(0.22, 1, 0.36, 1);
        }

        ::view-transition-old(root),
        ::view-transition-new(root) {
          animation: 1.2s cubic-bezier(0.16, 1, 0.3, 1) both organic-fade;
        }

        @keyframes organic-fade {
          0% {
            opacity: 0;
            filter: blur(40px) contrast(150%);
            transform: scale(0.95);
          }
          100% {
            opacity: 1;
            filter: blur(0) contrast(100%);
            transform: scale(1);
          }
        }

        .bio-portal {
          position: fixed;
          top: 0;
          right: -5vw;
          width: 45vw;
          height: 100vh;
          z-index: 0;
          pointer-events: none;
          -webkit-mask-image: radial-gradient(
            ellipse at 70% 50%,
            black 10%,
            rgba(0,0,0,0.6) 40%,
            transparent 80%
          );
          mask-image: radial-gradient(
            ellipse at 70% 50%,
            black 10%,
            rgba(0,0,0,0.6) 40%,
            transparent 80%
          );
          will-change: transform;
        }

        .bio-portal video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: saturate(140%) contrast(120%) hue-rotate(15deg);
          transform: scale(1.1);
          mix-blend-mode: screen;
        }

        .organic-volume {
          background: linear-gradient(
            160deg,
            var(--surface-top),
            var(--surface-bottom)
          );

          backdrop-filter: blur(80px) saturate(180%);
          -webkit-backdrop-filter: blur(80px) saturate(180%);
          border-radius: 2.5rem;
          position: relative;
          isolation: isolate;
          box-shadow:
            inset 1px 1px 3px var(--shadow-light),
            inset -2px -2px 12px var(--shadow-dark),
            0 30px 60px rgba(0,0,0,0.4);

          transition:
            transform 0.8s cubic-bezier(0.16, 1, 0.3, 1),
            border-radius 0.8s ease;
        }

        .organic-volume::before {
          content: "";
          position: absolute;
          inset: -1px;
          border-radius: inherit;
          background: radial-gradient(
            800px circle at var(--mouse-x) var(--mouse-y),
            var(--electric-violet),
            transparent 40%
          );
          opacity: 0;
          mix-blend-mode: screen;
          transition: opacity 0.5s ease;
          pointer-events: none;
          z-index: 10;
        }

        .organic-volume:hover {
          transform: translateY(-5px) scale(1.005);
          border-radius: 2.2rem;
        }

        .organic-volume:hover::before {
          opacity: 0.4;
        }

        .bio-elastic-btn {
          position: relative;
          overflow: hidden;
          border-radius: 999px;
          padding: 1.2rem 2.5rem;
          font-weight: 500;
          letter-spacing: -0.01em;
          color: var(--text-core);
          background: linear-gradient(
            145deg,
            rgba(255,255,255,0.08),
            rgba(255,255,255,0.02)
          );

          backdrop-filter: blur(40px);

          box-shadow:
            inset 0 2px 4px rgba(255,255,255,0.15),
            inset 0 -4px 10px rgba(0,0,0,0.5),
            0 10px 20px rgba(0,0,0,0.2);

          cursor: pointer;

          transition: all 0.6s cubic-bezier(0.22, 1, 0.36, 1);

          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        .bio-elastic-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;

          background: radial-gradient(
            circle at var(--mouse-x) var(--mouse-y),
            var(--amber-glow) 0%,
            transparent 60%
          );

          opacity: 0;
          mix-blend-mode: color-dodge;
          transition: opacity 0.4s ease;
          pointer-events: none;
        }

        .bio-elastic-btn:hover {
          transform: scale(1.05) translateY(-2px);
          border-radius: 1rem;
        }

        .bio-elastic-btn:hover::before {
          opacity: 0.5;
        }

        @keyframes synaptic-pulse {
          to {
            background-position: 200% center;
          }
        }

        .synaptic-shimmer {
          background: linear-gradient(
            120deg,
            var(--text-core) 0%,
            var(--electric-violet) 25%,
            var(--text-core) 50%,
            var(--amber-glow) 75%,
            var(--text-core) 100%
          );

          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;

          animation: synaptic-pulse linear;
          animation-timeline: scroll(root block);
        }

        .neural-stat {
          font-family:
            ui-monospace,
            SFMono-Regular,
            Menlo,
            Monaco,
            Consolas,
            monospace;

          letter-spacing: -0.04em;
        }

        .bio-toggle {
          width: 52px;
          height: 28px;
          border-radius: 999px;
          background: var(--surface-bottom);

          box-shadow:
            inset 0 2px 6px var(--shadow-dark),
            0 0 0 1px rgba(255,255,255,0.05);

          position: relative;
          cursor: pointer;
          overflow: hidden;
        }

        .bio-toggle::before {
          content: "";
          position: absolute;
          top: 3px;
          left: 3px;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: var(--amber-glow);
          box-shadow: 0 0 10px var(--amber-glow);

          transition:
            transform 0.6s cubic-bezier(0.22, 1, 0.36, 1),
            background 0.6s;
        }

        [data-theme="synthesized"] .bio-toggle::before {
          transform: translateX(24px);
          background: var(--electric-violet);
        }

        .chromatic-aberration {
          text-shadow:
            -1px 0 2px rgba(255, 0, 0, 0.3),
            1px 0 2px rgba(0, 255, 255, 0.3);
        }
      `}</style>

            <div className="min-h-[220vh] bg-[var(--obsidian)] text-[var(--text-core)]">
                <div
                    ref={portalRef}
                    className="bio-portal"
                    id="organic-breach"
                >
                    <video autoPlay muted loop playsInline>
                        <source src="/video.mp4" type="video/mp4" />
                    </video>
                </div>

                <nav className="fixed top-0 inset-x-0 z-50 px-10 py-8 mix-blend-plus-lighter">
                    <div className="max-w-[1800px] mx-auto flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center backdrop-blur-md shadow-[0_0_20px_var(--electric-violet)]">
                                <div className="w-3 h-3 rounded-full bg-[var(--amber-glow)] shadow-[0_0_10px_var(--amber-glow)] animate-pulse"></div>
                            </div>

                            <div className="flex flex-col">
                                <span className="font-medium tracking-tighter text-xl">
                                    ANTHROPIC
                                </span>

                                <span className="text-[0.65rem] uppercase tracking-[0.4em] text-[var(--electric-violet)]">
                                    Neural Orchestrator
                                </span>
                            </div>
                        </div>

                        <button
                            onClick={toggleTheme}
                            className="bio-toggle"
                        />
                    </div>
                </nav>

                <main className="relative z-10 max-w-[1800px] mx-auto px-10 pt-48 pb-40">
                    <header className="max-w-5xl mb-40 relative z-20">
                        <span className="text-xs uppercase tracking-[0.4em] text-[var(--text-dim)] font-medium mb-8 block chromatic-aberration">
                            Bio-Tech Computing Layer
                        </span>

                        <h1 className="text-[6rem] md:text-[8.5rem] font-light tracking-tighter leading-[0.85] synaptic-shimmer mb-12">
                            Constitutional
                            <br />
                            Luminance.
                        </h1>

                        <p className="text-2xl text-[var(--text-dim)] max-w-3xl leading-relaxed mb-16 font-light">
                            Abstracting rigid data structures into organic mesh routing.
                            Compute density simulated through bioluminescent refraction
                            rather than static primitives.
                        </p>

                        <div className="flex items-center gap-10">
                            <button className="bio-elastic-btn fluid-node">
                                Initialize Core
                            </button>

                            <div className="flex flex-col border-l border-white/10 pl-8">
                                <span className="neural-stat text-3xl text-[var(--text-core)]">
                                    8.4
                                    <span className="text-sm text-[var(--amber-glow)] ml-1">
                                        pb/s
                                    </span>
                                </span>

                                <span className="text-xs text-[var(--text-dim)] uppercase tracking-[0.2em] mt-1">
                                    Synaptic Bandwidth
                                </span>
                            </div>
                        </div>
                    </header>

                    <section className="grid grid-cols-1 xl:grid-cols-12 gap-8 auto-rows-auto">
                        <div className="organic-volume xl:col-span-8 p-12 md:p-16 fluid-node flex flex-col justify-between min-h-[450px]">
                            <div className="flex justify-between items-start mb-24">
                                <span className="text-[var(--text-dim)] text-xs uppercase tracking-[0.3em] font-medium">
                                    Neuro-Symbolic Load
                                </span>

                                <Icon
                                    icon="solar:dollar-bold-duotone"
                                    className="text-2xl text-[var(--electric-violet)]"
                                />
                            </div>

                            <div>
                                <h2 className="text-5xl tracking-tight mb-6 font-light">
                                    Organic Mesh Routing
                                </h2>

                                <p className="text-[var(--text-dim)] max-w-lg leading-relaxed text-lg font-light">
                                    Borders dissolved into light leaks. Volumes sculpted from
                                    digital fluid to handle dynamic constitutional inference
                                    loads without geometric friction.
                                </p>
                            </div>
                        </div>

                        <div className="organic-volume xl:col-span-4 p-12 fluid-node flex flex-col justify-between">
                            <span className="text-[var(--text-dim)] text-xs uppercase tracking-[0.3em] font-medium">
                                Latency
                            </span>

                            <div className="mt-20">
                                <div className="text-[5.5rem] font-light tracking-tighter neural-stat mb-2 text-[var(--amber-glow)] drop-shadow-[0_0_15px_rgba(200,150,50,0.4)]">
                                    0.02
                                </div>

                                <div className="text-sm text-[var(--text-core)] uppercase tracking-[0.2em]">
                                    Milliseconds
                                </div>
                            </div>
                        </div>

                        <div className="organic-volume xl:col-span-5 p-12 fluid-node">
                            <div className="flex flex-col h-full justify-between">
                                <div className="flex items-center justify-between">
                                    <span className="text-[var(--text-dim)] text-xs uppercase tracking-[0.3em] font-medium">
                                        Asymmetric Anchor
                                    </span>

                                    <Icon
                                        icon="solar:atom-bold-duotone"
                                        className="text-2xl text-[var(--amber-glow)]"
                                    />
                                </div>

                                <div className="mt-16 w-full h-1 bg-[var(--shadow-dark)] rounded-full overflow-hidden relative">
                                    <div className="absolute top-0 left-0 h-full w-[85%] bg-gradient-to-r from-[var(--electric-violet)] to-[var(--amber-glow)] blur-[2px]" />

                                    <div className="absolute top-0 left-0 h-full w-[85%] bg-gradient-to-r from-[var(--electric-violet)] to-[var(--amber-glow)]" />
                                </div>

                                <p className="text-lg mt-8 text-[var(--text-dim)] font-light">
                                    Fluid intelligence requires interface malleability.
                                    Tension replaces structure.
                                </p>
                            </div>
                        </div>

                        <div className="organic-volume xl:col-span-7 p-12 md:p-16 fluid-node flex items-center overflow-hidden group relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-[var(--electric-violet)] opacity-0 group-hover:opacity-10 transition-opacity duration-1000 mix-blend-color-dodge" />

                            <div className="relative z-10 flex items-start gap-6">
                                <Icon
                                    icon="solar:chat-round-bold-duotone"
                                    className="text-5xl text-[var(--electric-violet)] shrink-0 mt-2"
                                />

                                <h3 className="text-4xl md:text-[3rem] font-light tracking-tight leading-[1.1] chromatic-aberration">
                                    &ldquo;If a solid edge is detected, the biomorphic system has failed.&rdquo;
                                </h3>

                            </div>
                        </div>
                    </section>

                    <footer className="mt-40 border-t border-white/10 pt-16 flex flex-col md:flex-row items-center justify-between gap-10">
                        <div>
                            <h4 className="text-lg tracking-tight mb-2">
                                Anthropic Interface Systems
                            </h4>

                            <p className="text-sm text-[var(--text-dim)]">
                                Adaptive constitutional bio-tech framework.
                            </p>
                        </div>

                        <div className="flex items-center gap-4">
                            <button className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:border-[var(--electric-violet)] transition-all duration-500">
                                <Icon
                                    icon="mdi:github"
                                    className="text-xl"
                                />
                            </button>

                            <button className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:border-[var(--electric-violet)] transition-all duration-500">
                                <Icon
                                    icon="mdi:twitter"
                                    className="text-xl"
                                />
                            </button>

                            <button className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:border-[var(--electric-violet)] transition-all duration-500">
                                <Icon
                                    icon="mdi:linkedin"
                                    className="text-xl"
                                />
                            </button>
                        </div>
                    </footer>
                </main>
            </div>
        </>
    );
}