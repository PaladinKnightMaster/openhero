"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";

export default function LuminaArcticPage() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setMounted(true);
        }, 0);

        return () => clearTimeout(timer);
    }, []);

    const cursorRef = useRef<HTMLDivElement | null>(null);
    const cursorRingRef = useRef<HTMLDivElement | null>(null);
    const scrollBarRef = useRef<HTMLDivElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const videoFallbackRef = useRef<HTMLDivElement | null>(null);
    const exploreBtnRef = useRef<HTMLButtonElement | null>(null);
    const exploreLiquidRef = useRef<HTMLDivElement | null>(null);
    const configBtnRef = useRef<HTMLButtonElement | null>(null);
    const configLiquidRef = useRef<HTMLDivElement | null>(null);
    const navCtaRef = useRef<HTMLAnchorElement | null>(null);
    const tempCounterRef = useRef<HTMLSpanElement | null>(null);
    const weightCounterRef = useRef<HTMLSpanElement | null>(null);
    const yearsCounterRef = useRef<HTMLSpanElement | null>(null);
    const liveTempNumberRef = useRef<HTMLSpanElement | null>(null);

    useEffect(() => {
        if (!mounted) return;

        let mx = 0;
        let my = 0;
        let rx = 0;
        let ry = 0;
        let rafCursor = 0;
        let rafParticles = 0;
        let rafTemp = 0;
        let alive = true;

        const cursor = cursorRef.current;
        const cursorRing = cursorRingRef.current;
        const scrollBar = scrollBarRef.current;

        const onMouseMove = (e: MouseEvent) => {
            mx = e.clientX;
            my = e.clientY;
            if (cursor) {
                cursor.style.left = `${mx}px`;
                cursor.style.top = `${my}px`;
            }
        };

        const animateCursor = () => {
            if (!alive) return;
            rx += (mx - rx) * 0.12;
            ry += (my - ry) * 0.12;
            if (cursorRing) {
                cursorRing.style.left = `${rx}px`;
                cursorRing.style.top = `${ry}px`;
            }
            rafCursor = requestAnimationFrame(animateCursor);
        };

        const onMouseDown = () => {
            if (cursor) cursor.style.transform = "translate(-50%,-50%) scale(0.6)";
        };

        const onMouseUp = () => {
            if (cursor) cursor.style.transform = "translate(-50%,-50%) scale(1)";
        };

        const trackMouse = (el: HTMLElement | null, liquidEl: HTMLElement | null) => {
            if (!el) return undefined;
            const onMove = (e: MouseEvent) => {
                const r = el.getBoundingClientRect();
                const x = `${(((e.clientX - r.left) / r.width) * 100).toFixed(1)}%`;
                const y = `${(((e.clientY - r.top) / r.height) * 100).toFixed(1)}%`;
                if (liquidEl) {
                    liquidEl.style.setProperty("--mx", x);
                    liquidEl.style.setProperty("--my", y);
                }
            };
            el.addEventListener("mousemove", onMove);
            return () => el.removeEventListener("mousemove", onMove);
        };

        const cleanups: Array<() => void> = [];

        window.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mousedown", onMouseDown);
        document.addEventListener("mouseup", onMouseUp);
        rafCursor = requestAnimationFrame(animateCursor);

        const exploreCleanup = trackMouse(exploreBtnRef.current, exploreLiquidRef.current);
        const configCleanup = trackMouse(configBtnRef.current, configLiquidRef.current);
        if (exploreCleanup) cleanups.push(exploreCleanup);
        if (configCleanup) cleanups.push(configCleanup);

        if (navCtaRef.current) {
            const navCta = navCtaRef.current;
            const onNavMove = (e: MouseEvent) => {
                const r = navCta.getBoundingClientRect();
                navCta.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`);
                navCta.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`);
            };
            navCta.addEventListener("mousemove", onNavMove);
            cleanups.push(() => navCta.removeEventListener("mousemove", onNavMove));
        }

        const onScroll = () => {
            if (!scrollBar) return;
            const pct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
            scrollBar.style.width = `${pct}%`;
            const depth = Math.min(window.scrollY / 1000, 1);
            document.documentElement.style.setProperty("--font-weight", `${300 + depth * 200}`);
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        onScroll();

        const animateCounter = (el: HTMLElement | null, target: number, duration: number) => {
            if (!el) return;
            const start = performance.now();
            const step = (now: number) => {
                const p = Math.min((now - start) / duration, 1);
                const ease = 1 - Math.pow(1 - p, 4);
                el.textContent = `${Math.round(target * ease)}`;
                if (p < 1 && alive) requestAnimationFrame(step);
            };
            requestAnimationFrame(step);
        };

        const hero = document.getElementById("hero");
        let heroTriggered = false;

        const heroObs = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !heroTriggered) {
                        heroTriggered = true;
                        setTimeout(() => animateCounter(tempCounterRef.current, 73, 2000), 1400);
                        setTimeout(() => animateCounter(weightCounterRef.current, 185, 2000), 1500);
                        setTimeout(() => animateCounter(yearsCounterRef.current, 34, 1800), 1600);
                        heroObs.disconnect();
                    }
                });
            },
            { threshold: 0.3 }
        );

        if (hero) heroObs.observe(hero);

        const revealObs = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) entry.target.classList.add("visible");
                });
            },
            { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
        );

        document.querySelectorAll(".reveal").forEach((el) => revealObs.observe(el));

        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");
        const particles: Array<{ x: number; y: number; vx: number; vy: number; size: number; alpha: number; hue: number }> = [];

        const resizeCanvas = () => {
            if (!canvas) return;
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);

        for (let i = 0; i < 60; i++) {
            particles.push({
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                vx: (Math.random() - 0.5) * 0.3,
                vy: -Math.random() * 0.5 - 0.1,
                size: Math.random() * 1.5 + 0.3,
                alpha: Math.random() * 0.5 + 0.1,
                hue: Math.random() > 0.5 ? 180 : 330,
            });
        }

        const drawParticles = () => {
            if (!alive || !canvas || !ctx) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach((p) => {
                p.x += p.vx;
                p.y += p.vy;
                if (p.y < -10) {
                    p.y = canvas.height + 10;
                    p.x = Math.random() * canvas.width;
                }
                if (p.x < -10) p.x = canvas.width + 10;
                if (p.x > canvas.width + 10) p.x = -10;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = `oklch(75% 0.12 ${p.hue} / ${p.alpha})`;
                ctx.fill();
            });
            rafParticles = requestAnimationFrame(drawParticles);
        };

        rafParticles = requestAnimationFrame(drawParticles);

        const video = videoRef.current;
        const fallback = videoFallbackRef.current;

        const onVideoError = () => {
            if (video) video.style.display = "none";
            if (fallback) fallback.style.display = "block";
        };

        const onCanPlay = () => {
            if (fallback) fallback.style.opacity = "0";
        };

        if (video) {
            video.addEventListener("error", onVideoError);
            video.addEventListener("canplay", onCanPlay);
            cleanups.push(() => video.removeEventListener("error", onVideoError));
            cleanups.push(() => video.removeEventListener("canplay", onCanPlay));
        }

        let tempTick = 0;
        const animateTemp = () => {
            if (!alive) return;
            const el = liveTempNumberRef.current;
            if (el) {
                const val = Math.round(-47 + Math.sin(tempTick * 0.005) * 3);
                el.textContent = `${Math.abs(val)}`;
            }
            tempTick++;
            rafTemp = requestAnimationFrame(animateTemp);
        };

        rafTemp = requestAnimationFrame(animateTemp);

        const cards = Array.from(document.querySelectorAll<HTMLElement>(".bento-card"));
        const cardHandlers = cards.map((card) => {
            const onMove = (e: MouseEvent) => {
                const r = card.getBoundingClientRect();
                const cx = (e.clientX - r.left - r.width / 2) / (r.width / 2);
                const cy = (e.clientY - r.top - r.height / 2) / (r.height / 2);
                card.style.transform = `translateY(-4px) scale(1.005) rotateX(${-cy * 3}deg) rotateY(${cx * 3}deg)`;
                card.style.perspective = "1000px";
            };
            const onLeave = () => {
                card.style.transform = "";
                card.style.perspective = "";
            };
            card.addEventListener("mousemove", onMove);
            card.addEventListener("mouseleave", onLeave);
            return () => {
                card.removeEventListener("mousemove", onMove);
                card.removeEventListener("mouseleave", onLeave);
            };
        });

        cleanups.push(...cardHandlers);

        return () => {
            alive = false;
            cancelAnimationFrame(rafCursor);
            cancelAnimationFrame(rafParticles);
            cancelAnimationFrame(rafTemp);
            window.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mousedown", onMouseDown);
            document.removeEventListener("mouseup", onMouseUp);
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", resizeCanvas);
            heroObs.disconnect();
            revealObs.disconnect();
            cleanups.forEach((fn) => fn());
        };
    }, [mounted]);

    if (!mounted) return <div style={{ minHeight: "100vh", background: "var(--aurora-deep)" }} />;

    return (
        <>
            <div className="cursor" ref={cursorRef} />
            <div className="cursor-ring" ref={cursorRingRef} />
            <div className="scroll-indicator" ref={scrollBarRef} />
            <div className="noise-overlay" />
            <div className="bg-gradient" />
            <div className="aurora-layer">
                <div className="aurora-band" />
                <div className="aurora-band" />
                <div className="aurora-band" />
            </div>
            <canvas className="particle-canvas" ref={canvasRef} />
            <div className="video-portal-glow" />
            <div className="video-portal">
                <div className="video-fallback-bg" ref={videoFallbackRef} />
                <video ref={videoRef} autoPlay muted loop playsInline crossOrigin="anonymous">
                    <source src="/video.mp4" type="video/mp4" />
                </video>
            </div>

            <nav>
                <a className="nav-logo" href="#">
                    <div className="nav-logo-mark" />
                    Lumina Arctic
                </a>
                <ul className="nav-links">
                    <li>
                        <a href="#gear">Gear</a>
                    </li>
                    <li>
                        <a href="#technology">Technology</a>
                    </li>
                    <li>
                        <a href="#expeditions">Expeditions</a>
                    </li>
                    <li>
                        <a href="#journal">Journal</a>
                    </li>
                </ul>
                <a className="nav-cta" href="#" ref={navCtaRef}>
                    Configure Kit
                </a>
            </nav>

            <div className="scene">
                <div className="main-content">
                    <section className="hero" id="hero">
                        <div className="hero-eyebrow">
                            <div className="eyebrow-line" />
                            <span className="eyebrow-text">Collection 2025 — Polar Series</span>
                        </div>

                        <h1 className="hero-title">
                            <span className="hero-title-line">
                                <span>Engineered</span>
                            </span>
                            <span className="hero-title-line">
                                <span>
                                    for the <span className="accent">Edge</span>
                                </span>
                            </span>
                            <span className="hero-title-line">
                                <span>of Earth</span>
                            </span>
                        </h1>

                        <p className="hero-sub">
                            Precision-fabricated expedition equipment for environments where the margin between survival and failure is measured in grams and kelvin.
                        </p>

                        <div className="hero-actions">
                            <button className="btn-primary" ref={exploreBtnRef}>
                                <div className="btn-primary-bg" />
                                <div className="btn-primary-liquid" ref={exploreLiquidRef} />
                                <span>Explore Collection</span>
                            </button>
                            <button className="btn-ghost">
                                <Icon icon="material-symbols:play-circle-outline-rounded" className="text-xl" />
                                Watch Film
                            </button>
                        </div>

                        <div className="stats-row">
                            <div className="stat-item">
                                <div className="stat-value">
                                    -<span ref={tempCounterRef}>0</span>
                                    <span className="stat-unit">°C</span>
                                </div>
                                <div className="stat-label">Rated to</div>
                            </div>
                            <div className="stat-item">
                                <div className="stat-value">
                                    <span ref={weightCounterRef}>0</span>
                                    <span className="stat-unit">g</span>
                                </div>
                                <div className="stat-label">Ultralight core</div>
                            </div>
                            <div className="stat-item">
                                <div className="stat-value">
                                    <span ref={yearsCounterRef}>0</span>
                                    <span className="stat-unit">yr</span>
                                </div>
                                <div className="stat-label">Arctic heritage</div>
                            </div>
                        </div>
                    </section>

                    <section className="bento-section" id="gear">
                        <div className="section-header reveal">
                            <div className="section-eyebrow">
                                <div className="eyebrow-line" />
                                <span className="eyebrow-text">Featured Systems</span>
                            </div>
                            <h2 className="section-title">
                                Precision at
                                <br />
                                every layer
                            </h2>
                        </div>

                        <div className="bento-grid">
                            <div className="bento-card bc-hero deboss-card reveal reveal-delay-1">
                                <div className="card-visual">
                                    <div className="card-orb orb-teal" style={{ top: "-60px", right: "-40px" }} />
                                    <div className="card-orb orb-pink" style={{ bottom: "-30px", left: "40px" }} />
                                </div>
                                <div className="shine-bar" />
                                <div className="bento-card-inner" style={{ display: "flex", flexDirection: "column" }}>
                                    <div className="card-eyebrow">Flagship · Layer 3 Shell</div>
                                    <h3 className="card-title">
                                        Polaris Membrane
                                        <br />
                                        Shell System
                                    </h3>
                                    <p className="card-desc">
                                        Triple-layer ePTFE membrane with graphene-infused face fabric. Tested at Svalbard under 180km/h katabatic conditions.
                                    </p>
                                    <div className="spec-grid card-meta">
                                        <div className="spec-item">
                                            <div className="spec-val">40k</div>
                                            <div className="spec-key">Waterproof mm</div>
                                        </div>
                                        <div className="spec-item">
                                            <div className="spec-val">185g</div>
                                            <div className="spec-key">Weight</div>
                                        </div>
                                        <div className="spec-item">
                                            <div className="spec-val">−60°C</div>
                                            <div className="spec-key">Certified</div>
                                        </div>
                                        <div className="spec-item">
                                            <div className="spec-val">7L</div>
                                            <div className="spec-key">Pack size</div>
                                        </div>
                                    </div>
                                    <div style={{ marginTop: "auto", paddingTop: "1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                        <div>
                                            <div className="price-tag">$2,490</div>
                                            <div className="price-sub">Free expedition shipping</div>
                                        </div>
                                        <div style={{ display: "flex", gap: "0.5rem" }}>
                                            <span className="badge badge-teal">
                                                <span className="badge-dot" />
                                                In Stock
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bento-card bc-tall deboss-card reveal reveal-delay-2">
                                <div className="card-visual">
                                    <div className="card-orb orb-purple" style={{ top: "-30px", left: "-30px" }} />
                                </div>
                                <div className="bento-card-inner" style={{ display: "flex", flexDirection: "column" }}>
                                    <div className="card-eyebrow">Environment</div>
                                    <div className="card-title">Current Conditions</div>
                                    <div style={{ display: "flex", alignItems: "baseline", gap: "0.25rem" }}>
                                        <div className="temp-display" id="live-temp">
                                            −<span ref={liveTempNumberRef}>47</span>
                                            <span className="temp-unit">°C</span>
                                        </div>
                                    </div>
                                    <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", letterSpacing: "0.1em", marginBottom: "1rem" }}>
                                        Ny-Ålesund, Svalbard
                                    </div>
                                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginTop: "auto" }}>
                                        <div className="spec-item">
                                            <div className="spec-val" style={{ fontSize: "0.9rem" }}>
                                                91%
                                            </div>
                                            <div className="spec-key">Humidity</div>
                                        </div>
                                        <div className="spec-item">
                                            <div className="spec-val" style={{ fontSize: "0.9rem" }}>
                                                180km/h
                                            </div>
                                            <div className="spec-key">Wind</div>
                                        </div>
                                        <div className="spec-item">
                                            <div className="spec-val" style={{ fontSize: "0.9rem" }}>
                                                0 lux
                                            </div>
                                            <div className="spec-key">Polar night</div>
                                        </div>
                                        <div className="spec-item">
                                            <div className="spec-val" style={{ fontSize: "0.9rem" }}>
                                                972 hPa
                                            </div>
                                            <div className="spec-key">Pressure</div>
                                        </div>
                                    </div>
                                    <div className="badge badge-pink" style={{ marginTop: "1.5rem", alignSelf: "flex-start" }}>
                                        <span className="badge-dot" />
                                        Live data
                                    </div>
                                </div>
                            </div>

                            <div className="bento-card bc-wide deboss-card reveal reveal-delay-1">
                                <div className="card-visual">
                                    <div className="card-orb orb-teal" style={{ right: "-50px", top: "-50px", width: "150px", height: "150px" }} />
                                </div>
                                <div className="bento-card-inner">
                                    <div className="card-eyebrow">Navigation Suite</div>
                                    <h3 className="card-title">Meridian GPS Transponder</h3>
                                    <p className="card-desc">
                                        Tri-frequency satellite acquisition. 200-hour battery. Sapphire crystal display rated to −80°C.
                                    </p>
                                    <div className="rating-bar" style={{ marginTop: "1rem" }}>
                                        <div className="rating-fill" style={{ width: "92%" }} />
                                    </div>
                                    <div style={{ fontSize: "0.62rem", color: "var(--text-muted)", letterSpacing: "0.15em", textTransform: "uppercase", marginTop: "0.4rem" }}>
                                        92/100 Expedition Rating
                                    </div>
                                </div>
                            </div>

                            <div className="bento-card bc-sm deboss-card reveal reveal-delay-2">
                                <div className="bento-card-inner" style={{ display: "flex", flexDirection: "column", height: "100%" }}>
                                    <div className="card-eyebrow">Thermal Core</div>
                                    <h3 className="card-title" style={{ fontSize: "1.1rem" }}>
                                        900-Fill
                                        <br />
                                        Down System
                                    </h3>
                                    <div style={{ marginTop: "auto" }}>
                                        <div className="price-tag" style={{ fontSize: "1.2rem" }}>
                                            $890
                                        </div>
                                        <span className="badge badge-teal" style={{ marginTop: "0.75rem", display: "inline-flex" }}>
                                            <span className="badge-dot" />
                                            New
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="bento-card bc-med deboss-card reveal reveal-delay-1">
                                <div className="bento-card-inner">
                                    <div className="card-eyebrow">Footwear</div>
                                    <h3 className="card-title">Boreal Boot System</h3>
                                    <div className="gear-showcase" style={{ marginTop: "1rem", gap: "0.5rem" }}>
                                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.5rem 0", borderBottom: "1px solid var(--glass-border)" }}>
                                            <span style={{ fontSize: "0.78rem", color: "var(--text-secondary)" }}>Insulation</span>
                                            <span style={{ fontSize: "0.78rem", color: "var(--aurora-teal)" }}>800g Primaloft</span>
                                        </div>
                                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.5rem 0", borderBottom: "1px solid var(--glass-border)" }}>
                                            <span style={{ fontSize: "0.78rem", color: "var(--text-secondary)" }}>Sole</span>
                                            <span style={{ fontSize: "0.78rem", color: "var(--aurora-teal)" }}>Vibram Arctic</span>
                                        </div>
                                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.5rem 0" }}>
                                            <span style={{ fontSize: "0.78rem", color: "var(--text-secondary)" }}>Rating</span>
                                            <span style={{ fontSize: "0.78rem", color: "var(--aurora-teal)" }}>−70°C</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bento-card bc-med-r deboss-card reveal reveal-delay-2">
                                <div className="card-visual">
                                    <div className="card-orb orb-pink" style={{ bottom: "-20px", right: "-20px", width: "120px", height: "120px" }} />
                                </div>
                                <div className="bento-card-inner">
                                    <div className="card-eyebrow">Layering System</div>
                                    <h3 className="card-title">Gear Selection</h3>
                                    <div className="gear-showcase" style={{ marginTop: "0.75rem" }}>
                                        <div className="gear-item">
                                            <div className="gear-icon gear-icon-teal">
                                                <Icon icon="material-symbols:layers-outline-rounded" className="text-xl" />
                                            </div>
                                            <div>
                                                <div className="gear-name">Base Layer Merino</div>
                                                <div className="gear-detail">250gsm · Odor control</div>
                                            </div>
                                            <div className="gear-price">$220</div>
                                        </div>
                                        <div className="gear-item">
                                            <div className="gear-icon gear-icon-pink">
                                                <Icon icon="material-symbols:air-rounded" className="text-xl" />
                                            </div>
                                            <div>
                                                <div className="gear-name">Mid Fleece Grid</div>
                                                <div className="gear-detail">300g · Grid-back</div>
                                            </div>
                                            <div className="gear-price">$340</div>
                                        </div>
                                        <div className="gear-item">
                                            <div className="gear-icon gear-icon-purple">
                                                <Icon icon="material-symbols:shield-outline-rounded" className="text-xl" />
                                            </div>
                                            <div>
                                                <div className="gear-name">Shell Hardface</div>
                                                <div className="gear-detail">3L · Gore-Tex</div>
                                            </div>
                                            <div className="gear-price">$890</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="features-section" id="technology">
                        <div className="section-header reveal">
                            <div className="section-eyebrow">
                                <div className="eyebrow-line" />
                                <span className="eyebrow-text">Material Science</span>
                            </div>
                            <h2 className="section-title">
                                Engineered to
                                <br />
                                molecular precision
                            </h2>
                        </div>

                        <div className="features-grid">
                            <div className="feature-card reveal reveal-delay-1">
                                <div className="feature-icon-wrap" style={{ background: "oklch(75% 0.12 180 / 0.1)" }}>
                                    <Icon icon="material-symbols:water-drop-outline-rounded" className="text-xl" style={{ color: "var(--aurora-teal)" }} />
                                </div>
                                <div className="feature-title">Hydrophobic Membrane</div>
                                <p className="feature-desc">
                                    Nano-scale ePTFE nodes repel water at the molecular boundary, maintaining zero moisture ingress at 40,000mm hydrostatic pressure.
                                </p>
                            </div>

                            <div className="feature-card reveal reveal-delay-2">
                                <div className="feature-icon-wrap" style={{ background: "oklch(65% 0.2 330 / 0.1)" }}>
                                    <Icon icon="material-symbols:thermostat-auto-outline-rounded" className="text-xl" style={{ color: "oklch(75% 0.15 330)" }} />
                                </div>
                                <div className="feature-title">Phase-Change Thermal</div>
                                <p className="feature-desc">
                                    Aerogel micro-spheres embedded in the lining store and release heat in response to core body temperature delta. Active thermal buffering.
                                </p>
                            </div>

                            <div className="feature-card reveal reveal-delay-3">
                                <div className="feature-icon-wrap" style={{ background: "oklch(55% 0.18 280 / 0.12)" }}>
                                    <Icon icon="material-symbols:hexagon-outline-rounded" className="text-xl" style={{ color: "oklch(75% 0.12 280)" }} />
                                </div>
                                <div className="feature-title">Graphene Reinforcement</div>
                                <p className="feature-desc">
                                    Single-atom carbon lattice woven into the face fabric creates a 340% tensile strength increase over standard nylon without adding measurable weight.
                                </p>
                            </div>

                            <div className="feature-card reveal reveal-delay-1">
                                <div className="feature-icon-wrap" style={{ background: "oklch(75% 0.12 180 / 0.1)" }}>
                                    <Icon icon="material-symbols:radar-rounded" className="text-xl" style={{ color: "var(--aurora-teal)" }} />
                                </div>
                                <div className="feature-title">Tri-Band Navigation</div>
                                <p className="feature-desc">
                                    Simultaneous GPS, GLONASS, and Galileo acquisition delivers 2cm accuracy positioning. Operates in complete electromagnetic isolation.
                                </p>
                            </div>

                            <div className="feature-card reveal reveal-delay-2">
                                <div className="feature-icon-wrap" style={{ background: "oklch(65% 0.2 330 / 0.1)" }}>
                                    <Icon icon="material-symbols:battery-charging-full-rounded" className="text-xl" style={{ color: "oklch(75% 0.15 330)" }} />
                                </div>
                                <div className="feature-title">Solid-State Power</div>
                                <p className="feature-desc">
                                    Lithium ceramic cells maintain full charge capacity at −60°C where conventional lithium-ion fails below −20°C. 200-hour operational window.
                                </p>
                            </div>

                            <div className="feature-card reveal reveal-delay-3">
                                <div className="feature-icon-wrap" style={{ background: "oklch(55% 0.18 280 / 0.12)" }}>
                                    <Icon icon="material-symbols:straighten-rounded" className="text-xl" style={{ color: "oklch(75% 0.12 280)" }} />
                                </div>
                                <div className="feature-title">Biometric Calibration</div>
                                <p className="feature-desc">
                                    Equipment sizing algorithm accounts for cold-induced vasoconstriction, layering compression ratios, and polar mobility requirements simultaneously.
                                </p>
                            </div>
                        </div>
                    </section>

                    <section className="testimonial-section" id="expeditions">
                        <div className="section-header reveal">
                            <div className="section-eyebrow">
                                <div className="eyebrow-line" />
                                <span className="eyebrow-text">Expedition Log</span>
                            </div>
                        </div>
                        <div className="testimonial-card reveal reveal-delay-1">
                            <div className="testimonial-mark">&ldquo;</div>
                            <p className="testimonial-quote">
                                At the magnetic north pole, at −63°C and 200km/h sustained winds, the Polaris Shell did not register a single moisture ingress event across eleven days. This is not equipment. This is a life-critical system.
                            </p>
                            <div className="testimonial-author">
                                <div className="author-avatar">EK</div>
                                <div>
                                    <div className="author-name">Dr. Erika Kjelström</div>
                                    <div className="author-role">Lead Researcher — Arctic Institute of Norway</div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="cta-section">
                        <div className="cta-block reveal">
                            <div className="cta-orb" style={{ width: "300px", height: "300px", background: "oklch(75% 0.12 180 / 0.12)", top: "-100px", right: "-100px" }} />
                            <div className="cta-orb" style={{ width: "200px", height: "200px", background: "oklch(65% 0.2 330 / 0.1)", bottom: "-80px", left: "-60px" }} />
                            <div className="shine-bar" />
                            <div className="card-eyebrow">Commission Your Expedition</div>
                            <h2 className="cta-title">
                                Configure your
                                <br />
                                polar system
                            </h2>
                            <p className="cta-sub">
                                Work with our expedition engineers to build a layering system calibrated to your specific route, temperature envelope, and activity profile.
                            </p>
                            <div className="cta-actions">
                                <button className="btn-primary" ref={configBtnRef}>
                                    <div className="btn-primary-bg" />
                                    <div className="btn-primary-liquid" ref={configLiquidRef} />
                                    <span>Begin Configuration</span>
                                </button>
                                <button className="btn-ghost">
                                    <Icon icon="material-symbols:call-outline-rounded" className="text-xl" />
                                    Speak with Expert
                                </button>
                            </div>
                        </div>
                    </section>
                </div>
            </div>

            <footer>
                <div className="footer-copy">© 2025 Lumina Arctic. All specifications subject to expedition conditions.</div>
                <div className="footer-links">
                    <a href="#">Privacy</a>
                    <a href="#">Terms</a>
                    <a href="#">Expeditions</a>
                    <a href="#">Contact</a>
                </div>
            </footer>

            <style jsx global>{`
        *, *::before, *::after {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        :root {
          --aurora-deep: oklch(25% 0.15 300);
          --aurora-teal: oklch(75% 0.12 180);
          --aurora-pink: oklch(65% 0.2 330);
          --aurora-mid: oklch(35% 0.18 290);
          --aurora-glow: oklch(80% 0.14 185);
          --glass-bg: oklch(28% 0.08 290 / 0.35);
          --glass-border: oklch(75% 0.1 200 / 0.18);
          --glass-shine: oklch(90% 0.05 200 / 0.12);
          --text-primary: oklch(96% 0.02 200);
          --text-secondary: oklch(78% 0.06 210);
          --text-muted: oklch(60% 0.05 240);
          --font-weight: 300;
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          font-family: Inter, system-ui, sans-serif;
          font-variation-settings: "wght" var(--font-weight);
          background: var(--aurora-deep);
          color: var(--text-primary);
          min-height: 100vh;
          overflow-x: hidden;
          cursor: none;
        }

        .cursor {
          position: fixed;
          width: 12px;
          height: 12px;
          background: var(--aurora-teal);
          border-radius: 50%;
          pointer-events: none;
          z-index: 9999;
          mix-blend-mode: screen;
          transition: transform 0.15s ease, opacity 0.3s ease;
          transform: translate(-50%, -50%);
        }

        .cursor-ring {
          position: fixed;
          width: 40px;
          height: 40px;
          border: 1px solid oklch(75% 0.12 180 / 0.5);
          border-radius: 50%;
          pointer-events: none;
          z-index: 9998;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), width 0.3s ease, height 0.3s ease, border-color 0.3s ease;
          transform: translate(-50%, -50%);
        }

        body:has(a:hover) .cursor-ring,
        body:has(button:hover) .cursor-ring {
          width: 60px;
          height: 60px;
          border-color: oklch(65% 0.2 330 / 0.6);
        }

        ::selection {
          background: oklch(65% 0.2 330 / 0.4);
          color: var(--text-primary);
        }

        .scene {
          position: relative;
          min-height: 100vh;
        }

        .bg-gradient {
          position: fixed;
          inset: 0;
          background:
            radial-gradient(ellipse 80% 60% at 20% 50%, oklch(35% 0.18 290 / 0.8) 0%, transparent 70%),
            radial-gradient(ellipse 60% 80% at 80% 20%, oklch(40% 0.15 220 / 0.6) 0%, transparent 60%),
            radial-gradient(ellipse 70% 50% at 60% 80%, oklch(30% 0.2 330 / 0.5) 0%, transparent 60%),
            oklch(18% 0.1 290);
          z-index: 0;
        }

        .aurora-layer {
          position: fixed;
          inset: 0;
          z-index: 1;
          pointer-events: none;
          overflow: hidden;
        }

        .aurora-band {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          animation: aurora-drift 20s ease-in-out infinite;
          mix-blend-mode: screen;
          opacity: 0.35;
        }

        .aurora-band:nth-child(1) {
          width: 120%;
          height: 40%;
          top: 10%;
          left: -20%;
          background: linear-gradient(90deg, transparent 0%, oklch(75% 0.12 180 / 0.6) 30%, oklch(65% 0.15 200 / 0.4) 60%, transparent 100%);
          animation-delay: 0s;
          animation-duration: 25s;
        }

        .aurora-band:nth-child(2) {
          width: 100%;
          height: 35%;
          top: 25%;
          left: 10%;
          background: linear-gradient(90deg, transparent 0%, oklch(65% 0.2 330 / 0.4) 20%, oklch(75% 0.12 200 / 0.3) 70%, transparent 100%);
          animation-delay: -8s;
          animation-duration: 30s;
        }

        .aurora-band:nth-child(3) {
          width: 80%;
          height: 30%;
          top: 5%;
          right: -10%;
          background: linear-gradient(90deg, transparent 0%, oklch(55% 0.18 260 / 0.5) 40%, oklch(65% 0.15 310 / 0.3) 80%, transparent 100%);
          animation-delay: -15s;
          animation-duration: 22s;
        }

        @keyframes aurora-drift {
          0%, 100% {
            transform: translateX(0) translateY(0) scaleY(1);
            opacity: 0.35;
          }
          25% {
            transform: translateX(5%) translateY(3%) scaleY(1.2);
            opacity: 0.45;
          }
          50% {
            transform: translateX(-3%) translateY(-2%) scaleY(0.9);
            opacity: 0.3;
          }
          75% {
            transform: translateX(8%) translateY(1%) scaleY(1.1);
            opacity: 0.4;
          }
        }

        .video-portal {
          position: fixed;
          top: 50%;
          right: 5%;
          transform: translateY(-50%);
          width: clamp(280px, 35vw, 520px);
          height: clamp(380px, 55vh, 720px);
          z-index: 2;
          border-radius: 28px 8px 28px 8px;
          overflow: hidden;
          mask-image: radial-gradient(ellipse 80% 90% at 60% 50%, black 30%, transparent 100%);
          -webkit-mask-image: radial-gradient(ellipse 80% 90% at 60% 50%, black 30%, transparent 100%);
        }

        .video-portal video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.7;
          filter: saturate(1.4) brightness(0.85);
        }

        .video-portal-glow {
          position: fixed;
          top: 50%;
          right: 3%;
          transform: translateY(-50%);
          width: clamp(320px, 40vw, 580px);
          height: clamp(420px, 65vh, 800px);
          z-index: 1;
          background: radial-gradient(ellipse at center, oklch(55% 0.15 200 / 0.2) 0%, oklch(45% 0.18 260 / 0.1) 50%, transparent 80%);
          border-radius: 40px;
          filter: blur(40px);
          pointer-events: none;
        }

        .video-fallback-bg {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 60% 60% at 40% 40%, oklch(60% 0.15 185) 0%, transparent 70%),
            radial-gradient(ellipse 50% 50% at 70% 70%, oklch(55% 0.2 310) 0%, transparent 60%),
            oklch(30% 0.12 240);
          animation: portal-shimmer 8s ease-in-out infinite;
        }

        @keyframes portal-shimmer {
          0%, 100% {
            filter: brightness(0.9) hue-rotate(0deg);
          }
          50% {
            filter: brightness(1.1) hue-rotate(15deg);
          }
        }

        .main-content {
          position: relative;
          z-index: 10;
          min-height: 100vh;
          padding: 0 max(2rem, 5vw);
          max-width: 55%;
        }

        nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          padding: 1.5rem max(2rem, 5vw);
          display: flex;
          align-items: center;
          justify-content: space-between;
          backdrop-filter: blur(40px) saturate(1.5);
          background: oklch(20% 0.1 290 / 0.4);
          border-bottom: 1px solid var(--glass-border);
        }

        .nav-logo {
          font-size: clamp(1rem, 1.4vw, 1.2rem);
          font-variation-settings: "wght" 600;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: var(--text-primary);
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .nav-logo-mark {
          width: 28px;
          height: 28px;
          background: conic-gradient(from 180deg, var(--aurora-teal), var(--aurora-pink), var(--aurora-teal));
          border-radius: 6px;
          animation: logo-spin 12s linear infinite;
        }

        @keyframes logo-spin {
          to {
            transform: rotate(360deg);
          }
        }

        .nav-links {
          display: flex;
          gap: 2.5rem;
          list-style: none;
        }

        .nav-links a {
          color: var(--text-secondary);
          text-decoration: none;
          font-size: 0.8rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          transition: color 0.3s ease;
          position: relative;
        }

        .nav-links a::after {
          content: "";
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 0;
          height: 1px;
          background: var(--aurora-teal);
          transition: width 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .nav-links a:hover {
          color: var(--text-primary);
        }

        .nav-links a:hover::after {
          width: 100%;
        }

        .nav-cta {
          padding: 0.5rem 1.25rem;
          border: 1px solid var(--glass-border);
          border-radius: 100px;
          color: var(--text-primary);
          text-decoration: none;
          font-size: 0.75rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          backdrop-filter: blur(20px);
          background: var(--glass-shine);
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
          overflow: hidden;
        }

        .nav-cta::before {
          content: "";
          position: absolute;
          inset: -100%;
          background: radial-gradient(circle at var(--mx, 50%) var(--my, 50%), oklch(75% 0.12 180 / 0.3) 0%, transparent 60%);
          transition: opacity 0.3s ease;
          opacity: 0;
        }

        .nav-cta:hover::before {
          opacity: 1;
        }

        .nav-cta:hover {
          border-color: oklch(75% 0.12 180 / 0.5);
          box-shadow: 0 0 30px oklch(75% 0.12 180 / 0.15);
        }

        .hero {
          padding-top: clamp(8rem, 18vh, 14rem);
          padding-bottom: 4rem;
        }

        .hero-eyebrow {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 2rem;
          opacity: 0;
          animation: fade-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s forwards;
        }

        .eyebrow-line {
          width: 40px;
          height: 1px;
          background: var(--aurora-teal);
        }

        .eyebrow-text {
          font-size: 0.7rem;
          letter-spacing: 0.4em;
          text-transform: uppercase;
          color: var(--aurora-teal);
          font-variation-settings: "wght" 500;
        }

        .hero-title {
          font-size: clamp(2.8rem, 6vw, 5.5rem);
          line-height: 0.95;
          letter-spacing: -0.04em;
          margin-bottom: 1.5rem;
          font-variation-settings: "wght" 200;
        }

        .hero-title-line {
          display: block;
          overflow: hidden;
        }

        .hero-title-line span {
          display: inline-block;
          opacity: 0;
          transform: translateY(100%);
          animation: slide-up 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .hero-title-line:nth-child(1) span {
          animation-delay: 0.4s;
        }

        .hero-title-line:nth-child(2) span {
          animation-delay: 0.55s;
        }

        .hero-title-line:nth-child(3) span {
          animation-delay: 0.7s;
        }

        .hero-title .accent {
          color: transparent;
          -webkit-text-stroke: 1px oklch(75% 0.12 180 / 0.7);
          font-variation-settings: "ital" 1, "wght" 100;
        }

        .hero-sub {
          font-size: clamp(0.85rem, 1.2vw, 1rem);
          color: var(--text-secondary);
          line-height: 1.7;
          max-width: 38ch;
          margin-bottom: 3rem;
          font-variation-settings: "wght" 300;
          opacity: 0;
          animation: fade-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.9s forwards;
        }

        .hero-actions {
          display: flex;
          gap: 1.25rem;
          align-items: center;
          opacity: 0;
          animation: fade-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) 1.1s forwards;
        }

        .btn-primary {
          position: relative;
          padding: 0.9rem 2.5rem;
          background: transparent;
          border: 0;
          border-radius: 100px;
          color: var(--aurora-deep);
          font-family: inherit;
          font-size: 0.8rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          cursor: none;
          overflow: hidden;
          font-variation-settings: "wght" 500;
          isolation: isolate;
        }

        .btn-primary-bg {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, var(--aurora-teal), var(--aurora-glow));
          border-radius: 100px;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .btn-primary:hover .btn-primary-bg {
          transform: scale(1.03);
        }

        .btn-primary-liquid {
          position: absolute;
          inset: 0;
          border-radius: 100px;
          background: radial-gradient(circle at var(--mx, 50%) var(--my, 50%), oklch(90% 0.08 180 / 0.6) 0%, transparent 50%);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .btn-primary:hover .btn-primary-liquid {
          opacity: 1;
        }

        .btn-primary span {
          position: relative;
          z-index: 1;
        }

        .btn-ghost {
          position: relative;
          padding: 0.9rem 2rem;
          background: transparent;
          border: 1px solid var(--glass-border);
          border-radius: 100px;
          color: var(--text-secondary);
          font-family: inherit;
          font-size: 0.8rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          cursor: none;
          font-variation-settings: "wght" 400;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          display: flex;
          align-items: center;
          gap: 0.75rem;
          overflow: hidden;
        }

        .btn-ghost::before {
          content: "";
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at var(--mx, 50%) var(--my, 50%), oklch(75% 0.12 180 / 0.1) 0%, transparent 60%);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .btn-ghost:hover {
          color: var(--text-primary);
          border-color: oklch(75% 0.12 180 / 0.4);
        }

        .btn-ghost:hover::before {
          opacity: 1;
        }

        .stats-row {
          display: flex;
          gap: 3rem;
          margin-top: 5rem;
          padding-top: 3rem;
          border-top: 1px solid var(--glass-border);
          opacity: 0;
          animation: fade-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) 1.3s forwards;
        }

        .stat-value {
          font-size: clamp(1.8rem, 3vw, 2.4rem);
          font-variation-settings: "wght" 200;
          letter-spacing: -0.04em;
          color: var(--text-primary);
          line-height: 1;
          margin-bottom: 0.4rem;
        }

        .stat-unit {
          font-size: 0.7em;
          color: var(--aurora-teal);
          font-variation-settings: "wght" 400;
        }

        .stat-label {
          font-size: 0.68rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--text-muted);
        }

        .bento-section {
          padding: 6rem 0;
          position: relative;
          z-index: 10;
        }

        .section-header {
          margin-bottom: 3rem;
        }

        .section-eyebrow {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .section-title {
          font-size: clamp(2rem, 3.5vw, 3rem);
          font-variation-settings: "wght" 200;
          letter-spacing: -0.03em;
          line-height: 1.1;
        }

        .bento-grid {
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          gap: 1rem;
        }

        .bento-card {
          position: relative;
          background: var(--glass-bg);
          backdrop-filter: blur(100px) saturate(1.8);
          -webkit-backdrop-filter: blur(100px) saturate(1.8);
          border: 1px solid var(--glass-border);
          border-radius: 20px;
          overflow: hidden;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease;
          container-type: inline-size;
        }

        .bento-card::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, oklch(90% 0.05 200 / 0.08) 0%, transparent 50%, oklch(65% 0.1 300 / 0.05) 100%);
          pointer-events: none;
          z-index: 1;
        }

        .bento-card::after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, oklch(90% 0.05 200 / 0.3), transparent);
          z-index: 2;
        }

        .bento-card:hover {
          transform: translateY(-4px) scale(1.005);
          box-shadow:
            0 32px 80px oklch(15% 0.15 290 / 0.5),
            inset 0 1px 0 oklch(90% 0.05 200 / 0.15),
            inset 0 -1px 0 oklch(50% 0.1 270 / 0.1),
            0 0 0 1px oklch(75% 0.12 180 / 0.1);
        }

        .bento-card-inner {
          position: relative;
          z-index: 3;
          height: 100%;
          padding: 1.75rem;
        }

        .bc-hero { grid-column: span 7; min-height: 380px; }
        .bc-tall { grid-column: span 5; min-height: 380px; }
        .bc-wide { grid-column: span 8; min-height: 200px; }
        .bc-sm { grid-column: span 4; min-height: 200px; }
        .bc-med { grid-column: span 6; min-height: 260px; }
        .bc-med-r { grid-column: span 6; min-height: 260px; }

        @container (max-width: 300px) {
          .card-meta { display: none; }
          .card-title { font-size: 1rem; }
        }

        .card-eyebrow {
          font-size: 0.65rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: var(--aurora-teal);
          margin-bottom: 0.75rem;
          font-variation-settings: "wght" 500;
        }

        .card-title {
          font-size: clamp(1.2rem, 2.5cqw, 1.8rem);
          font-variation-settings: "wght" 300;
          letter-spacing: -0.02em;
          line-height: 1.2;
          margin-bottom: 0.75rem;
        }

        .card-desc {
          font-size: 0.82rem;
          color: var(--text-secondary);
          line-height: 1.65;
          font-variation-settings: "wght" 300;
        }

        .card-meta {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-top: auto;
          padding-top: 1.5rem;
        }

        .price-tag {
          font-size: 1.6rem;
          font-variation-settings: "wght" 200;
          letter-spacing: -0.04em;
          color: var(--text-primary);
        }

        .price-sub {
          font-size: 0.7rem;
          color: var(--text-muted);
          letter-spacing: 0.1em;
        }

        .badge {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.3rem 0.75rem;
          border-radius: 100px;
          font-size: 0.65rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          font-variation-settings: "wght" 500;
        }

        .badge-teal {
          background: oklch(75% 0.12 180 / 0.15);
          color: var(--aurora-teal);
          border: 1px solid oklch(75% 0.12 180 / 0.25);
        }

        .badge-pink {
          background: oklch(65% 0.2 330 / 0.12);
          color: oklch(75% 0.15 330);
          border: 1px solid oklch(65% 0.2 330 / 0.25);
        }

        .badge-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: currentColor;
          animation: pulse-dot 2s ease-in-out infinite;
        }

        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.7); }
        }

        .card-visual {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .card-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(60px);
        }

        .orb-teal {
          width: 200px;
          height: 200px;
          background: oklch(75% 0.12 180 / 0.25);
          animation: orb-float 8s ease-in-out infinite;
        }

        .orb-pink {
          width: 150px;
          height: 150px;
          background: oklch(65% 0.2 330 / 0.2);
          animation: orb-float 6s ease-in-out infinite reverse;
        }

        .orb-purple {
          width: 180px;
          height: 180px;
          background: oklch(55% 0.18 280 / 0.3);
          animation: orb-float 10s ease-in-out infinite;
        }

        @keyframes orb-float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(10%, -15%) scale(1.1); }
          66% { transform: translate(-8%, 10%) scale(0.95); }
        }

        .temp-display {
          font-size: clamp(3rem, 8cqw, 6rem);
          font-variation-settings: "wght" 100;
          letter-spacing: -0.06em;
          line-height: 1;
          color: var(--text-primary);
          margin: 0.5rem 0;
        }

        .temp-unit {
          font-size: 0.4em;
          color: var(--text-muted);
          vertical-align: super;
        }

        .spec-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.75rem;
          margin-top: 1rem;
        }

        .spec-item {
          padding: 0.75rem;
          background: oklch(30% 0.1 290 / 0.4);
          border-radius: 10px;
          border: 1px solid oklch(70% 0.08 200 / 0.1);
        }

        .spec-val {
          font-size: 1.1rem;
          font-variation-settings: "wght" 300;
          letter-spacing: -0.02em;
          color: var(--text-primary);
        }

        .spec-key {
          font-size: 0.62rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--text-muted);
          margin-top: 0.2rem;
        }

        .gear-showcase {
          display: flex;
          flex-direction: column;
          height: 100%;
          gap: 1rem;
        }

        .gear-item {
          flex: 1;
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          background: oklch(28% 0.08 290 / 0.4);
          border-radius: 12px;
          border: 1px solid var(--glass-border);
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          cursor: none;
        }

        .gear-item:hover {
          background: oklch(32% 0.1 290 / 0.6);
          border-color: oklch(75% 0.12 180 / 0.3);
          transform: translateX(6px);
        }

        .gear-icon {
          width: 44px;
          height: 44px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          font-size: 1.3rem;
        }

        .gear-icon-teal {
          background: oklch(75% 0.12 180 / 0.15);
          color: var(--aurora-teal);
        }

        .gear-icon-pink {
          background: oklch(65% 0.2 330 / 0.12);
          color: oklch(75% 0.15 330);
        }

        .gear-icon-purple {
          background: oklch(55% 0.18 280 / 0.15);
          color: oklch(75% 0.12 280);
        }

        .gear-name {
          font-size: 0.85rem;
          font-variation-settings: "wght" 400;
          color: var(--text-primary);
          margin-bottom: 0.2rem;
        }

        .gear-detail {
          font-size: 0.7rem;
          color: var(--text-muted);
          letter-spacing: 0.05em;
        }

        .gear-price {
          margin-left: auto;
          font-size: 0.9rem;
          font-variation-settings: "wght" 300;
          color: var(--aurora-teal);
          white-space: nowrap;
        }

        .rating-bar {
          width: 100%;
          height: 2px;
          background: oklch(40% 0.1 290 / 0.4);
          border-radius: 1px;
          margin-top: 1rem;
          overflow: hidden;
        }

        .rating-fill {
          height: 100%;
          background: linear-gradient(90deg, var(--aurora-teal), var(--aurora-pink));
          border-radius: 1px;
          transition: width 1.5s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .features-section {
          padding: 6rem 0;
          position: relative;
          z-index: 10;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
          margin-top: 3rem;
        }

        .feature-card {
          padding: 2rem;
          background: var(--glass-bg);
          backdrop-filter: blur(80px) saturate(1.6);
          border: 1px solid var(--glass-border);
          border-radius: 16px;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          cursor: none;
          position: relative;
          overflow: hidden;
        }

        .feature-card::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, oklch(85% 0.08 200 / 0.25), transparent);
        }

        .feature-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 40px 100px oklch(15% 0.15 290 / 0.5), inset 0 0 0 1px oklch(75% 0.12 180 / 0.12);
        }

        .feature-icon-wrap {
          width: 52px;
          height: 52px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.5rem;
          font-size: 1.5rem;
          position: relative;
        }

        .feature-icon-wrap::after {
          content: "";
          position: absolute;
          inset: -1px;
          border-radius: 15px;
          padding: 1px;
          background: linear-gradient(135deg, oklch(75% 0.12 180 / 0.4), oklch(65% 0.2 330 / 0.2));
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: destination-out;
          mask-composite: exclude;
        }

        .feature-title {
          font-size: 1rem;
          font-variation-settings: "wght" 400;
          letter-spacing: -0.01em;
          margin-bottom: 0.6rem;
          color: var(--text-primary);
        }

        .feature-desc {
          font-size: 0.8rem;
          color: var(--text-secondary);
          line-height: 1.65;
          font-variation-settings: "wght" 300;
        }

        .testimonial-section {
          padding: 6rem 0;
          position: relative;
          z-index: 10;
        }

        .testimonial-card {
          padding: 3rem;
          background: var(--glass-bg);
          backdrop-filter: blur(100px) saturate(1.8);
          border: 1px solid var(--glass-border);
          border-radius: 24px;
          position: relative;
          overflow: hidden;
          max-width: 640px;
        }

        .testimonial-card::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, oklch(85% 0.08 200 / 0.3) 30%, oklch(75% 0.15 330 / 0.2) 70%, transparent);
        }

        .testimonial-quote {
          font-size: clamp(1.1rem, 1.8vw, 1.4rem);
          font-variation-settings: "wght" 200;
          letter-spacing: -0.02em;
          line-height: 1.5;
          color: var(--text-primary);
          margin-bottom: 2rem;
        }

        .testimonial-mark {
          position: absolute;
          top: 2rem;
          right: 2rem;
          font-size: 5rem;
          font-variation-settings: "wght" 800;
          color: oklch(75% 0.12 180 / 0.1);
          line-height: 1;
          font-family: Georgia, serif;
        }

        .testimonial-author {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .author-avatar {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: conic-gradient(from 0deg, var(--aurora-teal), var(--aurora-pink), var(--aurora-teal));
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.85rem;
          font-variation-settings: "wght" 600;
          color: var(--aurora-deep);
        }

        .author-name {
          font-size: 0.85rem;
          font-variation-settings: "wght" 500;
          color: var(--text-primary);
        }

        .author-role {
          font-size: 0.72rem;
          color: var(--text-muted);
          letter-spacing: 0.08em;
        }

        .cta-section {
          padding: 8rem 0 6rem;
          position: relative;
          z-index: 10;
        }

        .cta-block {
          position: relative;
          padding: 5rem;
          background: var(--glass-bg);
          backdrop-filter: blur(100px) saturate(1.8);
          border: 1px solid var(--glass-border);
          border-radius: 32px;
          overflow: hidden;
          max-width: 700px;
        }

        .cta-block::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, oklch(85% 0.08 200 / 0.35), oklch(75% 0.15 330 / 0.25), transparent);
        }

        .cta-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          pointer-events: none;
        }

        .cta-title {
          font-size: clamp(2.5rem, 5vw, 4rem);
          font-variation-settings: "wght" 200;
          letter-spacing: -0.04em;
          line-height: 1.05;
          margin-bottom: 1.25rem;
          position: relative;
          z-index: 1;
        }

        .cta-sub {
          font-size: 0.9rem;
          color: var(--text-secondary);
          line-height: 1.7;
          max-width: 38ch;
          margin-bottom: 2.5rem;
          font-variation-settings: "wght" 300;
          position: relative;
          z-index: 1;
        }

        .cta-actions {
          display: flex;
          gap: 1rem;
          position: relative;
          z-index: 1;
        }

        footer {
          position: relative;
          z-index: 10;
          padding: 3rem max(2rem, 5vw);
          border-top: 1px solid var(--glass-border);
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .footer-copy {
          font-size: 0.72rem;
          color: var(--text-muted);
          letter-spacing: 0.1em;
        }

        .footer-links {
          display: flex;
          gap: 2rem;
        }

        .footer-links a {
          font-size: 0.72rem;
          color: var(--text-muted);
          text-decoration: none;
          letter-spacing: 0.1em;
          transition: color 0.3s ease;
        }

        .footer-links a:hover {
          color: var(--text-secondary);
        }

        .scroll-indicator {
          position: fixed;
          top: 0;
          left: 0;
          height: 2px;
          background: linear-gradient(90deg, var(--aurora-teal), var(--aurora-pink));
          z-index: 200;
          transform-origin: left;
          width: 0%;
          transition: width 0.1s linear;
        }

        .particle-canvas {
          position: fixed;
          inset: 0;
          z-index: 3;
          pointer-events: none;
          opacity: 0.5;
        }

        @keyframes fade-up {
          from {
            opacity: 0;
            transform: translateY(24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(100%);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .noise-overlay {
          position: fixed;
          inset: 0;
          z-index: 4;
          pointer-events: none;
          opacity: 0.025;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
          background-repeat: repeat;
          background-size: 256px 256px;
        }

        .reveal {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .reveal.visible {
          opacity: 1;
          transform: none;
        }

        .reveal-delay-1 {
          transition-delay: 0.1s;
        }

        .reveal-delay-2 {
          transition-delay: 0.2s;
        }

        .reveal-delay-3 {
          transition-delay: 0.3s;
        }

        .deboss-card {
          box-shadow:
            inset 0 2px 4px oklch(10% 0.1 290 / 0.5),
            inset 0 -1px 0 oklch(80% 0.05 200 / 0.08),
            inset 1px 0 0 oklch(80% 0.05 200 / 0.05),
            inset -1px 0 0 oklch(10% 0.1 290 / 0.3),
            0 20px 60px oklch(12% 0.12 290 / 0.4);
        }

        .shine-bar {
          position: absolute;
          top: 0;
          left: -100%;
          width: 60%;
          height: 1px;
          background: linear-gradient(90deg, transparent, oklch(90% 0.05 200 / 0.5), transparent);
          animation: shine-sweep 4s ease-in-out infinite;
        }

        @keyframes shine-sweep {
          0% { left: -60%; }
          60%, 100% { left: 120%; }
        }

        @media (max-width: 900px) {
          .main-content {
            max-width: 100%;
          }

          .video-portal,
          .video-portal-glow {
            display: none;
          }

          .bc-hero,
          .bc-tall,
          .bc-wide,
          .bc-sm,
          .bc-med,
          .bc-med-r {
            grid-column: span 12;
          }

          .features-grid {
            grid-template-columns: 1fr;
          }

          .stats-row {
            gap: 1.5rem;
            flex-wrap: wrap;
          }

          footer {
            flex-direction: column;
            gap: 1.5rem;
            text-align: center;
          }

          .cta-block {
            padding: 2.5rem 1.5rem;
          }
        }
      `}</style>
        </>
    );
}
