"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";

type MetricConfig = {
  target: number;
  label: string;
  decimals: number;
};

type ParticleInstance = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  length: number;
  opacity: number;
  hue: number;
  width: number;
  life: number;
  maxLife: number;
  reset: () => void;
  update: () => void;
  draw: () => void;
};

const NAV_LINKS = ["Neural Grid", "Kinetics", "Infrastructure", "Logistics"] as const;

const METRICS: MetricConfig[] = [
  { target: 847, label: "Nodes Active", decimals: 0 },
  { target: 99.97, label: "Uptime %", decimals: 2 },
  { target: 2.4, label: "Ms Latency", decimals: 1 },
  { target: 412, label: "GWh Routed", decimals: 0 },
];

const BAR_VALUES = [95, 88, 100, 96, 100, 99, 100, 88, 100, 97, 100, 96, 100, 99, 100, 100, 96, 100];

function formatMetric(value: number, decimals: number): string {
  if (decimals === 0) return Math.floor(value).toString();
  return value.toFixed(decimals);
}

function createParticle(ctx: CanvasRenderingContext2D, width: number, height: number): ParticleInstance {
  const particle: Partial<ParticleInstance> = {};

  const reset = () => {
    particle.x = Math.random() * width;
    particle.y = Math.random() * height;
    particle.vx = (Math.random() - 0.5) * 0.6;
    particle.vy = -(Math.random() * 3 + 1);
    particle.length = Math.random() * 120 + 40;
    particle.opacity = Math.random() * 0.6 + 0.1;
    particle.hue = Math.random() > 0.5 ? 330 : 250;
    particle.width = Math.random() * 1.5 + 0.3;
    particle.life = 0;
    particle.maxLife = Math.random() * 180 + 60;
  };

  const update = () => {
    particle.x = (particle.x ?? 0) + (particle.vx ?? 0);
    particle.y = (particle.y ?? 0) + (particle.vy ?? 0);
    particle.life = (particle.life ?? 0) + 1;
    if ((particle.life ?? 0) > (particle.maxLife ?? 0) || (particle.y ?? 0) < -(particle.length ?? 0)) {
      reset();
    }
  };

  const draw = () => {
    const x = particle.x ?? 0;
    const y = particle.y ?? 0;
    const vx = particle.vx ?? 0;
    const vy = particle.vy ?? 0;
    const length = particle.length ?? 0;
    const opacity = particle.opacity ?? 0;
    const hue = particle.hue ?? 0;
    const widthStroke = particle.width ?? 1;
    const life = particle.life ?? 0;
    const maxLife = particle.maxLife ?? 1;

    const t = life / maxLife;
    const alpha = opacity * Math.sin(t * Math.PI);
    const grad = ctx.createLinearGradient(x, y, x + vx * length, y + (vy * length) / 1.5);

    grad.addColorStop(0, `hsla(${hue === 330 ? "320" : "195"}, 100%, 70%, 0)`);
    grad.addColorStop(0.4, `hsla(${hue === 330 ? "320" : "195"}, 100%, 70%, ${alpha})`);
    grad.addColorStop(1, `hsla(${hue === 330 ? "320" : "195"}, 100%, 90%, ${alpha * 0.3})`);

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + vx * length * 0.3, y + vy * length * 0.3);
    ctx.strokeStyle = grad;
    ctx.lineWidth = widthStroke;
    ctx.lineCap = "round";
    ctx.stroke();
  };

  reset();

  return {
    get x() {
      return particle.x ?? 0;
    },
    set x(v: number) {
      particle.x = v;
    },
    get y() {
      return particle.y ?? 0;
    },
    set y(v: number) {
      particle.y = v;
    },
    get vx() {
      return particle.vx ?? 0;
    },
    set vx(v: number) {
      particle.vx = v;
    },
    get vy() {
      return particle.vy ?? 0;
    },
    set vy(v: number) {
      particle.vy = v;
    },
    get length() {
      return particle.length ?? 0;
    },
    set length(v: number) {
      particle.length = v;
    },
    get opacity() {
      return particle.opacity ?? 0;
    },
    set opacity(v: number) {
      particle.opacity = v;
    },
    get hue() {
      return particle.hue ?? 0;
    },
    set hue(v: number) {
      particle.hue = v;
    },
    get width() {
      return particle.width ?? 0;
    },
    set width(v: number) {
      particle.width = v;
    },
    get life() {
      return particle.life ?? 0;
    },
    set life(v: number) {
      particle.life = v;
    },
    get maxLife() {
      return particle.maxLife ?? 0;
    },
    set maxLife(v: number) {
      particle.maxLife = v;
    },
    reset,
    update,
    draw,
  };
}

export default function TeslaAcceleratedTransitionPage(): React.JSX.Element {
  const [metricValues, setMetricValues] = useState<number[]>(METRICS.map(() => 0));
  const [metricsVisible, setMetricsVisible] = useState(false);

  const cursorRef = useRef<HTMLDivElement | null>(null);
  const trailRef = useRef<HTMLDivElement | null>(null);
  const portalCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const heroTitleRef = useRef<HTMLHeadingElement | null>(null);
  const velocityTextRef = useRef<HTMLDivElement | null>(null);
  const metricsBarRef = useRef<HTMLDivElement | null>(null);

  const metricsAnimatedRef = useRef(false);
  const particleAnimationRef = useRef<number | null>(null);
  const trailAnimationRef = useRef<number | null>(null);
  const cursorTargetRef = useRef({ x: 0, y: 0 });
  const cursorRenderRef = useRef({ x: 0, y: 0 });
  const lastScrollRef = useRef(0);

  const bentoBars = useMemo(() => BAR_VALUES.map((value) => value * 0.32), []);

  const animateCounters = useCallback(() => {
    if (metricsAnimatedRef.current) return;
    metricsAnimatedRef.current = true;

    const start = performance.now();
    const duration = 1600;

    const easeOutCubic = (t: number): number => 1 - Math.pow(1 - t, 3);

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = easeOutCubic(progress);

      setMetricValues(
        METRICS.map((metric) => metric.target * eased)
      );

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        setMetricValues(METRICS.map((metric) => metric.target));
      }
    };

    requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    document.title = "Tesla | Accelerated Transition to Sustainable Energy";
  }, []);

  useEffect(() => {
    const metricsBar = metricsBarRef.current;
    if (!metricsBar) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setMetricsVisible(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(metricsBar);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (metricsVisible) animateCounters();
  }, [animateCounters, metricsVisible]);

  useEffect(() => {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            target.style.animation = `fade-in-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.06}s both`;
            revealObserver.unobserve(target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = Array.from(document.querySelectorAll<HTMLElement>(".bento-cell"));
    elements.forEach((el) => revealObserver.observe(el));

    return () => revealObserver.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.cursor = "none";

    const cursor = cursorRef.current;
    const trail = trailRef.current;

    const updateCursorTargets = (clientX: number, clientY: number) => {
      cursorTargetRef.current = { x: clientX, y: clientY };

      document.querySelectorAll<HTMLElement>(".btn-primary").forEach((btn) => {
        const rect = btn.getBoundingClientRect();
        btn.style.setProperty("--mx", `${((clientX - rect.left) / rect.width) * 100}%`);
        btn.style.setProperty("--my", `${((clientY - rect.top) / rect.height) * 100}%`);
      });

      document.querySelectorAll<HTMLElement>("[data-bento]").forEach((cell) => {
        const rect = cell.getBoundingClientRect();
        cell.style.setProperty("--cx", `${((clientX - rect.left) / rect.width) * 100}%`);
        cell.style.setProperty("--cy", `${((clientY - rect.top) / rect.height) * 100}%`);
      });
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (!cursor || !trail) return;
      updateCursorTargets(event.clientX, event.clientY);
      cursor.style.left = `${event.clientX}px`;
      cursor.style.top = `${event.clientY}px`;
    };

    const handlePointerOver = (event: Event) => {
      const target = event.target as HTMLElement | null;
      if (!target?.closest("button, a")) return;
      if (!cursor) return;
      cursor.style.width = "20px";
      cursor.style.height = "20px";
      cursor.style.background = "var(--electric-cyan)";
      cursor.style.boxShadow = "0 0 20px 4px oklch(60% 0.2 250 / 0.8)";
    };

    const handlePointerOut = (event: Event) => {
      const target = event.target as HTMLElement | null;
      if (!target?.closest("button, a")) return;
      if (!cursor) return;
      cursor.style.width = "12px";
      cursor.style.height = "12px";
      cursor.style.background = "var(--neon-magenta)";
      cursor.style.boxShadow = "0 0 20px 4px oklch(65% 0.3 330 / 0.6)";
    };

    const handleClick = (event: MouseEvent) => {
      for (let i = 0; i < 6; i++) {
        const trailEl = document.createElement("div");
        trailEl.className = "light-trail";
        const angle = (i / 6) * Math.PI * 2;

        trailEl.style.cssText = `
          position: fixed;
          left: ${event.clientX}px;
          top: ${event.clientY}px;
          width: 1px;
          height: 0;
          background: linear-gradient(180deg, transparent, oklch(65% 0.3 330), transparent);
          transform-origin: top center;
          transform: rotate(${angle}rad);
          pointer-events: none;
          z-index: 9997;
        `;

        document.body.appendChild(trailEl);

        requestAnimationFrame(() => {
          trailEl.style.transition = "height 0.4s ease-out, opacity 0.4s ease-out";
          trailEl.style.height = "60px";
          trailEl.style.opacity = "0.6";
          setTimeout(() => {
            trailEl.style.opacity = "0";
            setTimeout(() => trailEl.remove(), 400);
          }, 300);
        });
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("pointerover", handlePointerOver);
    document.addEventListener("pointerout", handlePointerOut);
    document.addEventListener("click", handleClick);

    const animTrail = () => {
      const { x, y } = cursorTargetRef.current;
      cursorRenderRef.current.x += (x - cursorRenderRef.current.x) * 0.12;
      cursorRenderRef.current.y += (y - cursorRenderRef.current.y) * 0.12;

      if (trail) {
        trail.style.left = `${cursorRenderRef.current.x}px`;
        trail.style.top = `${cursorRenderRef.current.y}px`;
      }

      trailAnimationRef.current = requestAnimationFrame(animTrail);
    };

    trailAnimationRef.current = requestAnimationFrame(animTrail);

    return () => {
      document.body.style.cursor = "auto";
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("pointerover", handlePointerOver);
      document.removeEventListener("pointerout", handlePointerOut);
      document.removeEventListener("click", handleClick);
      if (trailAnimationRef.current) cancelAnimationFrame(trailAnimationRef.current);
    };
  }, []);

  useEffect(() => {
    const canvas = portalCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let particles: ParticleInstance[] = [];

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (particles.length === 0) {
        particles = Array.from({ length: 80 }, () => {
          const p = createParticle(ctx, width, height);
          p.life = Math.random() * p.maxLife;
          return p;
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "rgba(4,4,12,0.08)";
      ctx.fillRect(0, 0, width, height);

      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });

      particleAnimationRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    animate();

    const onResize = () => resizeCanvas();

    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      if (particleAnimationRef.current) cancelAnimationFrame(particleAnimationRef.current);
    };
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      const velocity = Math.abs(scrollY - lastScrollRef.current);
      lastScrollRef.current = scrollY;

      if (heroTitleRef.current) {
        const weight = Math.min(900, 800 + velocity * 2);
        const width = Math.min(110, 100 + velocity * 0.3);
        heroTitleRef.current.style.fontVariationSettings = `'wght' ${weight}, 'wdth' ${width}`;
      }

      if (velocityTextRef.current) {
        const weight = Math.min(950, 900 + velocity * 3);
        velocityTextRef.current.style.fontVariationSettings = `'wght' ${weight}`;
      }

      document.documentElement.style.setProperty("--scroll-velocity", String(velocity));
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const barColumns = (
    <>
      {BAR_VALUES.map((value, index) => (
        <div
          key={`${value}-${index}`}
          style={{
            flex: 1,
            height: `${value * 0.32}px`,
            background: "linear-gradient(180deg, oklch(60% 0.2 250), oklch(65% 0.3 330))",
            borderRadius: "1px",
            opacity: 0.7,
          }}
        />
      ))}
    </>
  );

  return (
    <>
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Inter+Tight:ital,wght@0,100..900;1,100..900&family=JetBrains+Mono:wght@100..800&display=swap");

        :root {
          --neon-magenta: oklch(65% 0.3 330);
          --electric-cyan: oklch(60% 0.2 250);
          --void: oklch(4% 0.02 250);
          --glass-surface: oklch(12% 0.04 250 / 0.6);
          --glass-edge: oklch(100% 0 0 / 0.06);
          --text-primary: oklch(96% 0.005 250);
          --text-secondary: oklch(55% 0.02 250);
          --text-accent-m: oklch(72% 0.22 330);
          --text-accent-c: oklch(72% 0.18 250);
          --scroll-velocity: 0;
        }

        *, *::before, *::after {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        html {
          scroll-behavior: smooth;
          scrollbar-width: thin;
          scrollbar-color: oklch(30% 0.08 250) transparent;
        }

        body {
          font-family: "Inter Tight", sans-serif;
          background: var(--void);
          color: var(--text-primary);
          overflow-x: hidden;
          cursor: none;
        }

        .mono {
          font-family: "JetBrains Mono", monospace;
        }

        .custom-cursor {
          position: fixed;
          top: 0;
          left: 0;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: var(--neon-magenta);
          pointer-events: none;
          z-index: 9999;
          mix-blend-mode: plus-lighter;
          transition: transform 0.1s ease, width 0.3s ease, height 0.3s ease;
          transform: translate(-50%, -50%);
          box-shadow: 0 0 20px 4px oklch(65% 0.3 330 / 0.6);
        }

        .cursor-trail {
          position: fixed;
          top: 0;
          left: 0;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 1px solid oklch(60% 0.2 250 / 0.4);
          pointer-events: none;
          z-index: 9998;
          transform: translate(-50%, -50%);
          transition: transform 0.18s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.3s;
          mix-blend-mode: plus-lighter;
        }

        .scene-root {
          position: relative;
          min-height: 100vh;
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          grid-template-rows: auto;
        }

        .portal-container {
          position: fixed;
          top: 0;
          right: 0;
          width: 38vw;
          height: 100vh;
          z-index: 0;
          pointer-events: none;
        }

        .portal-video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 1;
          filter: none;
        }

        .portal-canvas {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          mix-blend-mode: plus-lighter;
          pointer-events: none;
        }

        .light-corridor {
          position: fixed;
          top: 0;
          right: 0;
          width: 42vw;
          height: 100vh;
          background: transparent;
          backdrop-filter: none;
          mix-blend-mode: normal;
          pointer-events: none;
          z-index: 1;
        }

        .content-layer {
          position: relative;
          z-index: 10;
          padding: 0 3rem;
          width: 100%;
        }

        .nav-bar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.5rem 3rem;
          background: oklch(4% 0.02 250 / 0.7);
          backdrop-filter: blur(24px) saturate(1.4);
          border-bottom: 1px solid var(--glass-edge);
        }

        .nav-logo {
          font-size: 1.1rem;
          font-weight: 700;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          background: linear-gradient(90deg, var(--text-primary) 0%, var(--text-accent-c) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .nav-links {
          display: flex;
          gap: 2.5rem;
          list-style: none;
        }

        .nav-links a {
          font-size: 0.7rem;
          font-weight: 500;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--text-secondary);
          text-decoration: none;
          transition: color 0.3s ease;
          font-family: "JetBrains Mono", monospace;
        }

        .nav-links a:hover {
          color: var(--text-primary);
        }

        .nav-status {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          font-size: 0.65rem;
          font-family: "JetBrains Mono", monospace;
          color: var(--text-accent-m);
          letter-spacing: 0.1em;
        }

        .status-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--neon-magenta);
          animation: pulse-dot 2s ease-in-out infinite;
          box-shadow: 0 0 8px 2px oklch(65% 0.3 330 / 0.8);
        }

        @keyframes pulse-dot {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }

          50% {
            opacity: 0.4;
            transform: scale(0.7);
          }
        }

        .hero-section {
          padding-top: 14rem;
          padding-bottom: 8rem;
        }

        .hero-eyebrow {
          font-family: "JetBrains Mono", monospace;
          font-size: 0.65rem;
          font-weight: 400;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: var(--text-accent-c);
          margin-bottom: 2rem;
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .hero-eyebrow::before {
          content: "";
          display: block;
          width: 2rem;
          height: 1px;
          background: var(--electric-cyan);
          box-shadow: 0 0 6px oklch(60% 0.2 250);
        }

        .hero-title {
          font-size: clamp(3.5rem, 7vw, 7rem);
          font-weight: 800;
          line-height: 0.9;
          letter-spacing: -0.04em;
          margin-bottom: 2rem;
          font-variation-settings: "wght" 800, "wdth" 100;
          transition: font-variation-settings 0.1s linear;
        }

        .hero-title .line-1 {
          display: block;
          color: var(--text-primary);
        }

        .hero-title .line-2 {
          display: block;
          background: linear-gradient(90deg, var(--neon-magenta) 0%, var(--electric-cyan) 60%, var(--text-primary) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          background-size: 200% 100%;
          animation: gradient-shift 8s ease-in-out infinite;
        }

        @keyframes gradient-shift {
          0%, 100% {
            background-position: 0% 50%;
          }

          50% {
            background-position: 100% 50%;
          }
        }

        .hero-subtitle {
          font-size: clamp(0.9rem, 1.4vw, 1.1rem);
          font-weight: 300;
          line-height: 1.7;
          color: var(--text-secondary);
          max-width: 44ch;
          margin-bottom: 3rem;
          letter-spacing: 0.01em;
        }

        .hero-cta-group {
          display: flex;
          gap: 1rem;
          align-items: center;
        }

        .btn-primary {
          position: relative;
          padding: 0.85rem 2.2rem;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          font-family: "JetBrains Mono", monospace;
          color: var(--void);
          background: linear-gradient(135deg, oklch(72% 0.22 330), oklch(68% 0.18 250));
          border: none;
          border-radius: 2px;
          cursor: none;
          overflow: hidden;
          transition: box-shadow 0.3s ease, transform 0.2s ease;
        }

        .btn-primary::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, oklch(85% 0.05 0 / 0.4) 0%, transparent 50%, oklch(85% 0.05 0 / 0.2) 100%);
          opacity: 0;
          transition: opacity 0.3s ease;
          mask-image: radial-gradient(circle at var(--mx, 50%) var(--my, 50%), black 30%, transparent 70%);
        }

        .btn-primary:hover {
          box-shadow: 0 0 30px 8px oklch(65% 0.3 330 / 0.4), 0 0 60px 20px oklch(60% 0.2 250 / 0.2);
          transform: translateY(-1px);
        }

        .btn-primary:hover::before {
          opacity: 1;
        }

        .btn-ghost {
          position: relative;
          padding: 0.85rem 2.2rem;
          font-size: 0.75rem;
          font-weight: 500;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          font-family: "JetBrains Mono", monospace;
          color: var(--text-secondary);
          background: transparent;
          border: 1px solid oklch(100% 0 0 / 0.08);
          border-radius: 2px;
          cursor: none;
          overflow: hidden;
          transition: color 0.3s ease, border-color 0.3s ease;
        }

        .btn-ghost:hover {
          color: var(--text-primary);
          border-color: oklch(100% 0 0 / 0.2);
        }

        .metrics-bar {
          display: flex;
          gap: 3rem;
          padding: 2rem 0;
          border-top: 1px solid var(--glass-edge);
          margin-top: 5rem;
        }

        .metric-item {
          flex: 1;
        }

        .metric-value {
          font-size: clamp(2rem, 4vw, 3.5rem);
          font-weight: 800;
          line-height: 1;
          letter-spacing: -0.03em;
          background: linear-gradient(135deg, var(--text-primary) 0%, var(--text-accent-c) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .metric-label {
          font-family: "JetBrains Mono", monospace;
          font-size: 0.6rem;
          font-weight: 400;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--text-secondary);
          margin-top: 0.4rem;
        }

        .bento-section {
          padding: 6rem 0;
        }

        .section-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          margin-bottom: 3rem;
        }

        .section-title {
          font-size: clamp(1.8rem, 3vw, 2.8rem);
          font-weight: 700;
          letter-spacing: -0.03em;
          line-height: 1;
        }

        .section-tag {
          font-family: "JetBrains Mono", monospace;
          font-size: 0.6rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--text-accent-m);
          padding-bottom: 0.3rem;
        }

        .bento-grid {
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          grid-template-rows: auto;
          gap: 1px;
          background: oklch(100% 0 0 / 0.04);
          border: 1px solid oklch(100% 0 0 / 0.04);
          border-radius: 4px;
          overflow: hidden;
        }

        .bento-cell {
          background: var(--glass-surface);
          padding: 2.5rem;
          position: relative;
          overflow: hidden;
          transition: background 0.4s ease;
          opacity: 0;
          transform: translateY(20px);
        }

        .bento-cell::before {
          content: "";
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at var(--cx, 50%) var(--cy, 50%), oklch(65% 0.3 330 / 0.06) 0%, transparent 60%);
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .bento-cell:hover::before {
          opacity: 1;
        }

        .bento-cell:hover {
          background: oklch(14% 0.05 250 / 0.7);
        }

        .cell-a {
          grid-column: 1 / 6;
          grid-row: 1 / 2;
        }

        .cell-b {
          grid-column: 6 / 9;
          grid-row: 1 / 2;
        }

        .cell-c {
          grid-column: 9 / 13;
          grid-row: 1 / 3;
        }

        .cell-d {
          grid-column: 1 / 4;
          grid-row: 2 / 3;
        }

        .cell-e {
          grid-column: 4 / 6;
          grid-row: 2 / 3;
        }

        .cell-f {
          grid-column: 6 / 9;
          grid-row: 2 / 3;
        }

        .cell-g {
          grid-column: 1 / 5;
          grid-row: 3 / 4;
        }

        .cell-h {
          grid-column: 5 / 9;
          grid-row: 3 / 4;
        }

        .cell-i {
          grid-column: 9 / 13;
          grid-row: 3 / 4;
        }

        .cell-label {
          font-family: "JetBrains Mono", monospace;
          font-size: 0.55rem;
          font-weight: 500;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--text-accent-m);
          margin-bottom: 1.2rem;
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }

        .cell-label::before {
          content: "";
          display: block;
          width: 1rem;
          height: 1px;
          background: currentColor;
          box-shadow: 0 0 4px currentColor;
        }

        .cell-heading {
          font-size: clamp(1.4rem, 2.5vw, 2.2rem);
          font-weight: 700;
          letter-spacing: -0.025em;
          line-height: 1.05;
          margin-bottom: 1rem;
        }

        .cell-body {
          font-size: 0.82rem;
          line-height: 1.75;
          color: var(--text-secondary);
          font-weight: 300;
        }

        .cell-number {
          font-size: clamp(3rem, 6vw, 5.5rem);
          font-weight: 800;
          letter-spacing: -0.05em;
          line-height: 1;
          background: linear-gradient(135deg, var(--neon-magenta) 0%, var(--electric-cyan) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .cell-number-unit {
          font-family: "JetBrains Mono", monospace;
          font-size: 0.65rem;
          letter-spacing: 0.15em;
          color: var(--text-secondary);
          margin-top: 0.5rem;
        }

        .inset-card {
          box-shadow:
            inset 0 2px 4px oklch(0% 0 0 / 0.5),
            inset 0 -1px 2px oklch(100% 0 0 / 0.04),
            inset 2px 0 4px oklch(0% 0 0 / 0.3),
            inset -2px 0 4px oklch(0% 0 0 / 0.3),
            0 1px 0 oklch(100% 0 0 / 0.06);
          background: oklch(6% 0.03 250 / 0.8);
        }

        .flow-diagram {
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
          margin-top: 1.5rem;
        }

        .flow-node {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 0.7rem 1rem;
          background: oklch(8% 0.04 250 / 0.6);
          border-radius: 2px;
          border-left: 2px solid transparent;
          transition: border-color 0.3s ease, background 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .flow-node::after {
          content: "";
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 0%;
          background: linear-gradient(90deg, oklch(65% 0.3 330 / 0.1), transparent);
          transition: width 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .flow-node:hover::after {
          width: 100%;
        }

        .flow-node:hover {
          border-left-color: var(--neon-magenta);
        }

        .flow-node-icon {
          width: 28px;
          height: 28px;
          border-radius: 1px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.65rem;
          flex-shrink: 0;
          font-family: "JetBrains Mono", monospace;
          font-weight: 700;
        }

        .flow-node-text {
          font-size: 0.75rem;
          color: var(--text-secondary);
          font-weight: 400;
        }

        .flow-node-val {
          font-family: "JetBrains Mono", monospace;
          font-size: 0.65rem;
          color: var(--text-accent-c);
          margin-left: auto;
        }

        .spectrum-bar {
          height: 4px;
          border-radius: 2px;
          background: linear-gradient(90deg, var(--neon-magenta), var(--electric-cyan));
          box-shadow: 0 0 12px 2px oklch(65% 0.3 330 / 0.4);
          margin-bottom: 0.8rem;
          position: relative;
          overflow: hidden;
        }

        .spectrum-bar::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent, oklch(100% 0 0 / 0.4), transparent);
          animation: shimmer-bar 2.5s ease-in-out infinite;
        }

        @keyframes shimmer-bar {
          0% {
            transform: translateX(-100%);
          }

          100% {
            transform: translateX(100%);
          }
        }

        .neural-grid {
          position: absolute;
          inset: 0;
          opacity: 0.06;
          background-image:
            linear-gradient(oklch(100% 0 0 / 1) 1px, transparent 1px),
            linear-gradient(90deg, oklch(100% 0 0 / 1) 1px, transparent 1px);
          background-size: 40px 40px;
          pointer-events: none;
        }

        .data-stream {
          margin-top: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .stream-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.5rem 0;
          border-bottom: 1px solid oklch(100% 0 0 / 0.04);
          font-family: "JetBrains Mono", monospace;
        }

        .stream-key {
          font-size: 0.6rem;
          color: var(--text-secondary);
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .stream-val {
          font-size: 0.7rem;
          color: var(--text-accent-c);
          font-weight: 600;
        }

        .live-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.25rem 0.7rem;
          background: oklch(65% 0.3 330 / 0.12);
          border: 1px solid oklch(65% 0.3 330 / 0.25);
          border-radius: 100px;
          font-family: "JetBrains Mono", monospace;
          font-size: 0.55rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--text-accent-m);
        }

        .velocity-section {
          padding: 8rem 0;
          position: relative;
        }

        .velocity-text {
          font-size: clamp(4rem, 10vw, 10rem);
          font-weight: 900;
          letter-spacing: -0.06em;
          line-height: 0.85;
          color: oklch(100% 0 0 / 0.03);
          text-transform: uppercase;
          user-select: none;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          white-space: nowrap;
          font-variation-settings: "wght" 900;
        }

        .velocity-content {
          position: relative;
          z-index: 2;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 6rem;
          align-items: center;
          padding: 4rem 0;
        }

        .velocity-headline {
          font-size: clamp(2rem, 4vw, 3.5rem);
          font-weight: 700;
          letter-spacing: -0.03em;
          line-height: 1;
          margin-bottom: 1.5rem;
        }

        .velocity-desc {
          font-size: 0.875rem;
          line-height: 1.8;
          color: var(--text-secondary);
          font-weight: 300;
          margin-bottom: 2rem;
        }

        .kinetic-counter {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .counter-item {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          padding: 1.5rem;
          background: oklch(8% 0.04 250 / 0.5);
          border: 1px solid var(--glass-edge);
          border-radius: 2px;
          position: relative;
          overflow: hidden;
        }

        .counter-item::before {
          content: "";
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 3px;
          background: linear-gradient(180deg, var(--neon-magenta), var(--electric-cyan));
          box-shadow: 0 0 12px 2px oklch(65% 0.3 330 / 0.6);
        }

        .counter-num {
          font-size: 2.2rem;
          font-weight: 800;
          letter-spacing: -0.04em;
          line-height: 1;
          color: var(--text-primary);
          white-space: nowrap;
        }

        .counter-label {
          font-size: 0.75rem;
          color: var(--text-secondary);
          font-weight: 300;
          line-height: 1.5;
        }

        .counter-sub {
          font-family: "JetBrains Mono", monospace;
          font-size: 0.6rem;
          color: var(--text-accent-c);
          margin-top: 0.25rem;
        }

        .footer-section {
          padding: 6rem 0 3rem;
          border-top: 1px solid var(--glass-edge);
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          gap: 4rem;
        }

        .footer-brand {
          font-size: 1.4rem;
          font-weight: 800;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          margin-bottom: 1rem;
          background: linear-gradient(90deg, var(--text-primary), var(--text-accent-c));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .footer-desc {
          font-size: 0.8rem;
          color: var(--text-secondary);
          line-height: 1.7;
          font-weight: 300;
        }

        .footer-col-title {
          font-family: "JetBrains Mono", monospace;
          font-size: 0.6rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--text-secondary);
          margin-bottom: 1.2rem;
        }

        .footer-links {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.7rem;
        }

        .footer-links a {
          font-size: 0.78rem;
          color: oklch(40% 0.02 250);
          text-decoration: none;
          transition: color 0.2s ease;
          font-weight: 300;
        }

        .footer-links a:hover {
          color: var(--text-primary);
        }

        .footer-bottom {
          margin-top: 4rem;
          padding-top: 1.5rem;
          border-top: 1px solid var(--glass-edge);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .footer-copy {
          font-family: "JetBrains Mono", monospace;
          font-size: 0.58rem;
          color: oklch(30% 0.02 250);
          letter-spacing: 0.1em;
        }

        .scan-line {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 2px;
          background: linear-gradient(90deg, transparent, var(--neon-magenta), var(--electric-cyan), transparent);
          z-index: 200;
          animation: scan 8s cubic-bezier(0.16, 1, 0.3, 1) infinite;
          opacity: 0.6;
          box-shadow: 0 0 20px 4px oklch(65% 0.3 330 / 0.4);
        }

        @keyframes scan {
          0% {
            top: -4px;
            opacity: 0;
          }

          2% {
            opacity: 0.6;
          }

          98% {
            opacity: 0.6;
          }

          100% {
            top: 100vh;
            opacity: 0;
          }
        }

        .noise-overlay {
          position: fixed;
          inset: 0;
          z-index: 5;
          pointer-events: none;
          opacity: 0.025;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
          background-size: 256px 256px;
        }

        .glow-orb {
          position: fixed;
          border-radius: 50%;
          pointer-events: none;
          filter: blur(80px);
          z-index: 0;
          animation: orb-drift 20s ease-in-out infinite;
        }

        .orb-1 {
          width: 600px;
          height: 600px;
          background: oklch(65% 0.3 330 / 0.06);
          top: -200px;
          left: -100px;
          animation-delay: 0s;
        }

        .orb-2 {
          width: 500px;
          height: 500px;
          background: oklch(60% 0.2 250 / 0.07);
          bottom: -150px;
          right: 30%;
          animation-delay: -10s;
        }

        @keyframes orb-drift {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }

          33% {
            transform: translate(40px, -30px) scale(1.05);
          }

          66% {
            transform: translate(-20px, 50px) scale(0.95);
          }
        }

        .tag-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.3rem 0.8rem;
          background: oklch(60% 0.2 250 / 0.1);
          border: 1px solid oklch(60% 0.2 250 / 0.2);
          border-radius: 100px;
          font-family: "JetBrains Mono", monospace;
          font-size: 0.58rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--text-accent-c);
        }

        .scroll-indicator {
          position: fixed;
          right: 2rem;
          top: 50%;
          transform: translateY(-50%);
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          z-index: 50;
          align-items: center;
        }

        .scroll-indicator-line {
          width: 1px;
          height: 60px;
          background: linear-gradient(180deg, transparent, var(--neon-magenta), transparent);
          animation: scroll-line 3s ease-in-out infinite;
        }

        @keyframes scroll-line {
          0%, 100% {
            opacity: 0.2;
            transform: scaleY(0.5);
          }

          50% {
            opacity: 0.8;
            transform: scaleY(1);
          }
        }

        .scroll-label {
          font-family: "JetBrains Mono", monospace;
          font-size: 0.5rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: var(--text-secondary);
          writing-mode: vertical-rl;
          transform: rotate(180deg);
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-in {
          animation: fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        .delay-1 {
          animation-delay: 0.1s;
        }

        .delay-2 {
          animation-delay: 0.2s;
        }

        .delay-3 {
          animation-delay: 0.3s;
        }

        .delay-4 {
          animation-delay: 0.5s;
        }

        .delay-5 {
          animation-delay: 0.7s;
        }

        .light-trail {
          position: absolute;
          width: 1px;
          background: linear-gradient(180deg, transparent, var(--neon-magenta), transparent);
          pointer-events: none;
          opacity: 0;
          animation: trail-appear 0.6s ease-out forwards;
        }

        @keyframes trail-appear {
          from {
            opacity: 0;
            height: 0;
          }

          to {
            opacity: 0.4;
            height: 80px;
          }
        }

        .progress-ring {
          transform: rotate(-90deg);
        }

        .ring-track {
          fill: none;
          stroke: oklch(100% 0 0 / 0.06);
          stroke-width: 2;
        }

        .ring-fill {
          fill: none;
          stroke: url(#ring-gradient);
          stroke-width: 2;
          stroke-linecap: round;
          transition: stroke-dashoffset 2s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @media (max-width: 1200px) {
          .portal-container,
          .light-corridor,
          .scroll-indicator {
            display: none;
          }

          .content-layer {
            padding: 0 1.25rem;
          }

          .nav-bar {
            padding: 1.25rem 1.25rem;
          }

          .nav-links {
            gap: 1.25rem;
          }

          .metrics-bar {
            gap: 1.5rem;
          }

          .velocity-content {
            grid-template-columns: 1fr;
            gap: 3rem;
          }

          .footer-grid {
            grid-template-columns: 1fr 1fr;
          }

          .bento-grid {
            grid-template-columns: repeat(6, 1fr);
          }

          .cell-a,
          .cell-b,
          .cell-c,
          .cell-d,
          .cell-e,
          .cell-f,
          .cell-g,
          .cell-h,
          .cell-i {
            grid-column: auto;
            grid-row: auto;
          }
        }

        @media (max-width: 768px) {
          body {
            cursor: auto;
          }

          .custom-cursor,
          .cursor-trail {
            display: none;
          }

          .nav-links {
            display: none;
          }

          .nav-bar {
            justify-content: space-between;
            gap: 1rem;
          }

          .hero-section {
            padding-top: 9rem;
            padding-bottom: 5rem;
          }

          .hero-cta-group {
            flex-direction: column;
            align-items: flex-start;
          }

          .metrics-bar {
            flex-direction: column;
            gap: 1rem;
          }

          .section-header {
            align-items: flex-start;
            flex-direction: column;
            gap: 0.5rem;
          }

          .bento-grid {
            grid-template-columns: 1fr;
          }

          .footer-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .footer-bottom {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          html {
            scroll-behavior: auto;
          }

          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
            scroll-behavior: auto !important;
          }

          .custom-cursor,
          .cursor-trail,
          .scroll-indicator,
          .scan-line,
          .noise-overlay,
          .glow-orb {
            display: none !important;
          }
        }
      `}</style>

      <div className="scan-line" />
      <div className="noise-overlay" />
      <div className="glow-orb orb-1" aria-hidden="true" />
      <div className="glow-orb orb-2" aria-hidden="true" />

      <div className="custom-cursor" id="cursor" ref={cursorRef} aria-hidden="true" />
      <div className="cursor-trail" id="cursorTrail" ref={trailRef} aria-hidden="true" />

      <div className="scroll-indicator" aria-hidden="true">
        <div className="scroll-indicator-line" />
        <div className="scroll-label">Scroll</div>
        <div className="scroll-indicator-line" />
      </div>

      <div className="portal-container" aria-hidden="true">
        <video className="portal-video" autoPlay muted loop playsInline poster="/images/nature/your-poster.avif">
          <source src="./video.mp4" type="video/mp4" />
        </video>
        <canvas className="portal-canvas" ref={portalCanvasRef} />
      </div>

      <div className="light-corridor" aria-hidden="true" />

      <nav className="nav-bar animate-in">
        <div className="nav-logo">Tesla</div>
        <ul className="nav-links">
          {NAV_LINKS.map((item) => (
            <li key={item}>
              <a href="#">{item}</a>
            </li>
          ))}
        </ul>
        <div className="nav-status">
          <div className="status-dot" />
          <span>LIVE · SYS_OK</span>
        </div>
      </nav>

      <main>
        <div className="content-layer">
          <section className="hero-section">
            <div className="hero-eyebrow animate-in delay-1">
              <span>Neural-Link Infrastructure · 2025</span>
            </div>
            <h1 className="hero-title animate-in delay-2" ref={heroTitleRef}>
              <span className="line-1">Accelerated</span>
              <span className="line-2">Transition</span>
              <span
                className="line-1"
                style={{ fontWeight: 300, fontSize: "0.55em", letterSpacing: "0.02em", color: "oklch(40% 0.05 250)" }}
              >
                to Sustainable Energy
              </span>
            </h1>
            <p className="hero-subtitle animate-in delay-3">
              Zero-latency logistics meets synchronized urban flow. A kinetic throughput system engineered for the neural-link routing of tomorrow&apos;s autonomous infrastructure.
            </p>
            <div className="hero-cta-group animate-in delay-4">
              <button className="btn-primary" id="btnPrimary" type="button">
                Deploy Network
              </button>
              <button className="btn-ghost" type="button">
                View Protocol
              </button>
            </div>

            <div className="metrics-bar animate-in delay-5" ref={metricsBarRef}>
              {METRICS.map((metric, index) => (
                <div className="metric-item" key={metric.label}>
                  <div className="metric-value" data-target={metric.target}>
                    {formatMetric(metricValues[index] ?? 0, metric.decimals)}
                  </div>
                  <div className="metric-label mono">{metric.label}</div>
                </div>
              ))}
            </div>
          </section>

          <section className="bento-section">
            <div className="section-header reveal-on-scroll">
              <h2 className="section-title">
                Urban <br />
                <span style={{ color: "var(--text-accent-m)" }}>Fabric</span>
              </h2>
              <div className="section-tag">SYSTEM_ARCHITECTURE</div>
            </div>

            <div className="bento-grid">
              <div className="bento-cell cell-a" data-bento>
                <div className="neural-grid" />
                <div className="cell-label">Kinetic Throughput</div>
                <div className="cell-heading">
                  Neural-Link
                  <br />
                  Routing Core
                </div>
                <p className="cell-body" style={{ maxWidth: "42ch", marginTop: "0.8rem" }}>
                  Synchronized urban flow optimized across 847 distributed relay nodes. Real-time pathfinding calculates 12 million route permutations per second with sub-3ms commit latency.
                </p>
                <div style={{ marginTop: "1.5rem" }}>
                  <div className="spectrum-bar" style={{ width: "90%" }} />
                  <div
                    className="spectrum-bar"
                    style={{
                      width: "65%",
                      background: "linear-gradient(90deg, var(--electric-cyan), var(--neon-magenta))",
                      opacity: 0.7,
                    }}
                  />
                  <div className="spectrum-bar" style={{ width: "45%", opacity: 0.4 }} />
                </div>
                <div style={{ display: "flex", gap: "0.6rem", marginTop: "1.2rem", flexWrap: "wrap" }}>
                  <span className="tag-pill">+ Mesh Active</span>
                  <span className="tag-pill">↑ 2.4ms</span>
                  <span
                    className="tag-pill"
                    style={{
                      color: "var(--text-accent-m)",
                      borderColor: "oklch(65% 0.3 330 / 0.2)",
                      background: "oklch(65% 0.3 330 / 0.08)",
                    }}
                  >
                    99.97% SLA
                  </span>
                </div>
              </div>

              <div className="bento-cell cell-b inset-card" data-bento>
                <div className="cell-label" style={{ color: "var(--text-accent-c)" }}>
                  Zero-Latency
                </div>
                <div className="cell-number">2.4</div>
                <div className="cell-number-unit">MILLISECONDS · COMMIT TIME</div>
                <div className="flow-diagram">
                  <div className="flow-node">
                    <div className="flow-node-icon" style={{ background: "oklch(65% 0.3 330 / 0.15)", color: "var(--text-accent-m)" }}>
                      TX
                    </div>
                    <span className="flow-node-text">Transmit buffer</span>
                    <span className="flow-node-val">0.4ms</span>
                  </div>
                  <div className="flow-node">
                    <div className="flow-node-icon" style={{ background: "oklch(60% 0.2 250 / 0.15)", color: "var(--text-accent-c)" }}>
                      NL
                    </div>
                    <span className="flow-node-text">Neural relay</span>
                    <span className="flow-node-val">1.2ms</span>
                  </div>
                  <div className="flow-node">
                    <div className="flow-node-icon" style={{ background: "oklch(65% 0.3 330 / 0.1)", color: "var(--text-accent-m)" }}>
                      CX
                    </div>
                    <span className="flow-node-text">Commit execute</span>
                    <span className="flow-node-val">0.8ms</span>
                  </div>
                </div>
              </div>

              <div className="bento-cell cell-c" data-bento style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div>
                  <div className="cell-label" style={{ color: "var(--text-accent-m)" }}>
                    Synchronized Flow
                  </div>
                  <div className="cell-heading" style={{ fontSize: "1.6rem" }}>
                    Autonomous
                    <br />
                    Grid
                    <br />
                    Intelligence
                  </div>
                </div>
                <div>
                  <svg width="100%" viewBox="0 0 200 200" className="progress-ring" style={{ maxWidth: "160px", margin: "1rem auto", display: "block" }}>
                    <defs>
                      <linearGradient id="ring-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="oklch(65% 0.3 330)" />
                        <stop offset="100%" stopColor="oklch(60% 0.2 250)" />
                      </linearGradient>
                    </defs>
                    <circle className="ring-track" cx="100" cy="100" r="85" />
                    <circle className="ring-fill" cx="100" cy="100" r="85" strokeDasharray="534" strokeDashoffset="80" />
                    <text x="100" y="95" textAnchor="middle" fill="oklch(96% 0.005 250)" fontSize="28" fontFamily="Inter Tight" fontWeight="800" transform="rotate(90, 100, 100)">
                      85%
                    </text>
                    <text x="100" y="118" textAnchor="middle" fill="oklch(55% 0.02 250)" fontSize="9" fontFamily="JetBrains Mono" transform="rotate(90, 100, 100)" letterSpacing="2">
                      EFFICIENCY
                    </text>
                  </svg>
                </div>
                <div className="data-stream">
                  <div className="stream-row">
                    <span className="stream-key">Grid Nodes</span>
                    <span className="stream-val">847 / 1000</span>
                  </div>
                  <div className="stream-row">
                    <span className="stream-key">Flow Rate</span>
                    <span className="stream-val">4.2 TW/h</span>
                  </div>
                  <div className="stream-row">
                    <span className="stream-key">AI Decisions</span>
                    <span className="stream-val">12M / sec</span>
                  </div>
                </div>
                <div className="live-badge" style={{ marginTop: "1rem", display: "inline-flex" }}>
                  <div className="status-dot" style={{ width: "5px", height: "5px" }} />
                  Live Feed
                </div>
              </div>

              <div className="bento-cell cell-d inset-card" data-bento>
                <div className="cell-label">Throughput</div>
                <div className="cell-number" style={{ fontSize: "2.5rem" }}>
                  412
                </div>
                <div className="cell-number-unit">GWH ROUTED TODAY</div>
                <div style={{ marginTop: "1rem", height: "40px", position: "relative" }}>
                  <svg width="100%" height="40" viewBox="0 0 200 40" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="wave-grad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="oklch(65% 0.3 330)" stopOpacity="0.6" />
                        <stop offset="100%" stopColor="oklch(65% 0.3 330)" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path d="M0,30 C30,20 50,35 70,25 C90,15 110,32 130,22 C150,12 170,28 200,18 L200,40 L0,40 Z" fill="url(#wave-grad)" />
                    <path d="M0,30 C30,20 50,35 70,25 C90,15 110,32 130,22 C150,12 170,28 200,18" fill="none" stroke="oklch(65% 0.3 330)" strokeWidth="1.5" opacity="0.8" />
                  </svg>
                </div>
              </div>

              <div
                className="bento-cell cell-e"
                data-bento
                style={{ background: "linear-gradient(135deg, oklch(65% 0.3 330 / 0.08), oklch(60% 0.2 250 / 0.05))" }}
              >
                <div className="cell-label" style={{ color: "var(--text-accent-m)" }}>
                  Nodes
                </div>
                <div className="cell-number" style={{ fontSize: "2.5rem" }}>
                  847
                </div>
                <div className="cell-number-unit">ACTIVE RELAYS</div>
              </div>

              <div className="bento-cell cell-f inset-card" data-bento>
                <div className="cell-label">SLA</div>
                <div className="cell-number" style={{ fontSize: "2rem" }}>
                  99.97
                </div>
                <div className="cell-number-unit">% UPTIME · 30D AVG</div>
                <div style={{ display: "flex", gap: "0.25rem", marginTop: "1rem", alignItems: "flex-end", height: "32px" }}>
                  {barColumns}
                </div>
              </div>

              <div className="bento-cell cell-g" data-bento>
                <div className="cell-label">Urban Topology</div>
                <div className="cell-heading" style={{ fontSize: "1.4rem" }}>
                  Cyberpunk Luxury
                  <br />
                  Logistics Matrix
                </div>
                <p className="cell-body" style={{ marginTop: "0.8rem", fontSize: "0.78rem" }}>
                  High-velocity cargo streams through encrypted neural pathways. Each logistics pod maintains quantum-encrypted handshake with grid control at 60Hz telemetry.
                </p>
              </div>

              <div className="bento-cell cell-h inset-card" data-bento style={{ background: "linear-gradient(135deg, oklch(60% 0.2 250 / 0.07), transparent)" }}>
                <div className="cell-label" style={{ color: "var(--text-accent-c)" }}>
                  Logistics
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", marginTop: "0.5rem" }}>
                  <div className="flow-node">
                    <div className="flow-node-icon" style={{ background: "oklch(60% 0.2 250 / 0.15)", color: "var(--text-accent-c)", fontSize: "0.5rem", letterSpacing: "0.05em" }}>
                      POD
                    </div>
                    <span className="flow-node-text">Cargo pod dispatch</span>
                    <span className="flow-node-val">+284 / hr</span>
                  </div>
                  <div className="flow-node">
                    <div className="flow-node-icon" style={{ background: "oklch(65% 0.3 330 / 0.15)", color: "var(--text-accent-m)", fontSize: "0.5rem", letterSpacing: "0.05em" }}>
                      QNT
                    </div>
                    <span className="flow-node-text">Quantum handshake</span>
                    <span className="flow-node-val">60 Hz</span>
                  </div>
                  <div className="flow-node">
                    <div className="flow-node-icon" style={{ background: "oklch(60% 0.2 250 / 0.1)", color: "var(--text-accent-c)", fontSize: "0.5rem", letterSpacing: "0.05em" }}>
                      ETA
                    </div>
                    <span className="flow-node-text">Predictive ETA AI</span>
                    <span className="flow-node-val">±0.3min</span>
                  </div>
                </div>
              </div>

              <div className="bento-cell cell-i inset-card" data-bento>
                <div className="cell-label" style={{ color: "var(--text-accent-m)" }}>
                  Emissions
                </div>
                <div
                  className="cell-number"
                  style={{
                    fontSize: "2.5rem",
                    background: "linear-gradient(135deg, oklch(70% 0.18 150), oklch(60% 0.2 250))",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  −94%
                </div>
                <div className="cell-number-unit">CO₂ vs LEGACY GRID</div>
                <p className="cell-body" style={{ marginTop: "0.8rem", fontSize: "0.72rem" }}>
                  Renewable-sourced kinetic throughput eliminates 94% of urban carbon footprint across the deployed mesh.
                </p>
              </div>
            </div>
          </section>

          <section className="velocity-section">
            <div className="velocity-text" id="velocityText" ref={velocityTextRef}>
              KINETIC
            </div>
            <div className="velocity-content">
              <div>
                <div className="hero-eyebrow" style={{ marginBottom: "1.5rem" }}>
                  <span>Motion Engineering</span>
                </div>
                <h2 className="velocity-headline">
                  Zero-Latency
                  <br />
                  <span style={{ color: "var(--text-accent-m)" }}>Urban Flow</span>
                  <br />
                  Protocol
                </h2>
                <p className="velocity-desc">
                  The synchronized urban flow protocol operates at the intersection of machine intelligence and kinetic infrastructure. Neural-link routing adapts in real-time to load, weather, and demand signals, achieving throughput previously impossible at city scale.
                </p>
                <button className="btn-primary" type="button">
                  Explore Protocol
                </button>
              </div>

              <div className="kinetic-counter">
                <div className="counter-item">
                  <div>
                    <div className="counter-num">
                      12M<span style={{ fontSize: "1rem", color: "var(--text-secondary)" }}>/s</span>
                    </div>
                    <div className="counter-label">
                      Route permutations
                      <br />
                      calculated per second
                    </div>
                    <div className="counter-sub">NEURAL_ROUTING_ENGINE</div>
                  </div>
                </div>
                <div className="counter-item">
                  <div>
                    <div className="counter-num">
                      0.3ms<span style={{ fontSize: "1rem", color: "var(--text-secondary)" }}> avg</span>
                    </div>
                    <div className="counter-label">
                      Mean decision latency
                      <br />
                      across full mesh
                    </div>
                    <div className="counter-sub">GRID_DECISION_TIME</div>
                  </div>
                </div>
                <div className="counter-item">
                  <div>
                    <div className="counter-num">
                      ∞<span style={{ fontSize: "1rem", color: "var(--text-secondary)" }}> scale</span>
                    </div>
                    <div className="counter-label">
                      Horizontal node expansion
                      <br />
                      with zero degradation
                    </div>
                    <div className="counter-sub">MESH_ELASTICITY_INDEX</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <footer className="footer-section">
            <div className="footer-grid">
              <div>
                <div className="footer-brand">Tesla</div>
                <p className="footer-desc">
                  Accelerating the world&apos;s transition to sustainable energy through neural-link infrastructure and zero-latency logistics ecosystems.
                </p>
              </div>
              <div>
                <div className="footer-col-title">Network</div>
                <ul className="footer-links">
                  <li>
                    <a href="#">Grid Status</a>
                  </li>
                  <li>
                    <a href="#">Node Map</a>
                  </li>
                  <li>
                    <a href="#">API Gateway</a>
                  </li>
                  <li>
                    <a href="#">Telemetry</a>
                  </li>
                </ul>
              </div>
              <div>
                <div className="footer-col-title">Platform</div>
                <ul className="footer-links">
                  <li>
                    <a href="#">Autopilot</a>
                  </li>
                  <li>
                    <a href="#">Supercharger</a>
                  </li>
                  <li>
                    <a href="#">Megapack</a>
                  </li>
                  <li>
                    <a href="#">FSD</a>
                  </li>
                </ul>
              </div>
              <div>
                <div className="footer-col-title">Company</div>
                <ul className="footer-links">
                  <li>
                    <a href="#">Mission</a>
                  </li>
                  <li>
                    <a href="#">Impact</a>
                  </li>
                  <li>
                    <a href="#">Careers</a>
                  </li>
                  <li>
                    <a href="#">Investor Relations</a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="footer-bottom">
              <span className="footer-copy">© 2025 TESLA, INC. · ALL SYSTEMS NOMINAL · NEURAL_MESH_v4.2.1</span>
              <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                <span className="live-badge">
                  <div className="status-dot" style={{ width: "5px", height: "5px" }} />
                  Grid Online
                </span>
              </div>
            </div>
          </footer>
        </div>
      </main>
    </>
  );
}