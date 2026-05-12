"use client";

import { useEffect, useRef } from "react";
import { Icon } from "@iconify/react";

const telemetryCards = [
  {
    icon: "mdi:satellite-variant",
    kicker: "Module 01 · Apex Telemetry",
    name: "Solar GPS Collar System",
    desc: "Sub-20g solar-harvesting collars with dual-frequency GNSS. Sends location pings every 4 seconds. Waterproof to 30m. Operates across -40°C to 65°C biome ranges.",
    metrics: [
      { value: "4s", label: "Ping Interval" },
      { value: "99.1%", label: "Accuracy" },
      { value: "18mo", label: "Lifespan" },
    ],
  },
  {
    icon: "mdi:leaf",
    kicker: "Module 02 · Biome Sync",
    name: "Serengeti Habitat Mesh",
    desc: "900-node IoT environmental mesh measuring soil moisture, canopy density, prey density indices, and fire-risk thermoclines. Feeds predictive migration AI.",
    metrics: [
      { value: "900", label: "Mesh Nodes" },
      { value: "2hz", label: "Refresh Rate" },
      { value: "14TB", label: "Daily Data" },
    ],
  },
  {
    icon: "mdi:dna",
    kicker: "Module 03 · Genomic",
    name: "Non-Invasive eDNA Sampling",
    desc: "Environmental DNA collection from water sources, scat, and hair snares. Full genetic profiles without tranquilization—preserving behavioral integrity across the study period.",
    metrics: [
      { value: "0", label: "Captures" },
      { value: "98.4%", label: "ID Accuracy" },
      { value: "72h", label: "Turnaround" },
    ],
  },
];

const genomeCards = [
  { code: "SPEC-001 · PANTHERA LEO", name: "African Lion", sci: "Panthera leo massaica", pct: 82 },
  { code: "SPEC-002 · ACINONYX JUBATUS", name: "Cheetah", sci: "Acinonyx jubatus jubatus", pct: 91 },
  { code: "SPEC-003 · LOXODONTA AFRICANA", name: "Bush Elephant", sci: "Loxodonta africana", pct: 67 },
  { code: "SPEC-004 · PANTHERA PARDUS", name: "Leopard", sci: "Panthera pardus pardus", pct: 78 },
  { code: "SPEC-005 · CROCUTA CROCUTA", name: "Spotted Hyena", sci: "Crocuta crocuta", pct: 55 },
  { code: "SPEC-006 · LYCAON PICTUS", name: "African Wild Dog", sci: "Lycaon pictus lupinus", pct: 93 },
];

const acousticBars = Array.from({ length: 32 }, (_, i) => {
  const h = 18 + ((i * 9) % 42);
  const h2 = 26 + ((i * 11) % 48);
  const duration = 0.9 + ((i % 5) * 0.13);
  return { h, h2, duration, delay: i * 0.04 };
});

export default function Page() {
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const dustFieldRef = useRef<HTMLDivElement>(null);
  const acousticBarsRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const fallbackRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!isFinePointer) {
      if (cursorRingRef.current) cursorRingRef.current.style.display = "none";
      if (cursorDotRef.current) cursorDotRef.current.style.display = "none";
      return;
    }

    let mx = 0;
    let my = 0;
    let rx = 0;
    let ry = 0;
    let raf = 0;

    const onMove = (e: globalThis.MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };

    const animate = () => {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;

      if (cursorRingRef.current) {
        cursorRingRef.current.style.left = `${rx}px`;
        cursorRingRef.current.style.top = `${ry}px`;
      }

      if (cursorDotRef.current) {
        cursorDotRef.current.style.left = `${mx}px`;
        cursorDotRef.current.style.top = `${my}px`;
      }

      raf = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    const dustField = dustFieldRef.current;
    if (!dustField) return;

    const spawnDust = () => {
      const d = document.createElement("span");
      const x = Math.random() * 100;
      const dur = 8 + Math.random() * 12;
      const driftX = (Math.random() - 0.5) * 120;
      const size = 1 + Math.random() * 2;

      d.style.cssText = `
        left:${x}%;
        --drift-x:${driftX}px;
        animation-duration:${dur}s;
        animation-delay:${Math.random() * dur}s;
        width:${size}px;
        height:${size}px;
        opacity:0;
      `;

      dustField.appendChild(d);
      window.setTimeout(() => d.remove(), (dur + 3) * 1000);
    };

    for (let i = 0; i < 30; i++) spawnDust();
    const interval = window.setInterval(spawnDust, 400);

    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
  const barsContainer = acousticBarsRef.current;
  if (!barsContainer) return;

  const bars = Array.from(
    barsContainer.querySelectorAll<HTMLDivElement>(".acoustic-bar")
  );

  bars.forEach((b, i) => {
    const h = 15 + Math.sin(i * 0.6) * 25 + Math.random() * 30;
    const h2 = 20 + Math.sin(i * 0.8 + 1) * 30 + Math.random() * 35;

    b.style.setProperty("--bar-h", `${h}%`);
    b.style.setProperty("--bar-h2", `${h2}%`);
    b.style.animationDelay = `${i * 0.04}s`;
    b.style.animationDuration = `${0.9 + Math.random() * 0.8}s`;
  });

  const barsInterval = window.setInterval(() => {
    bars.forEach((bar) => {
      const h = 10 + Math.random() * 70;
      const h2 = 10 + Math.random() * 80;

      bar.style.setProperty("--bar-h", `${h}%`);
      bar.style.setProperty("--bar-h2", `${h2}%`);
    });
  }, 1800);

  return () => {
    window.clearInterval(barsInterval);
  };
}, []);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const onScroll = () => {
      const opacity = Math.min(0.85, 0.4 + window.scrollY / 400);
      nav.style.background = `oklch(12% 0.03 40 / ${opacity})`;
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    const fallback = fallbackRef.current;
    if (!video || !fallback) return;

    const onError = () => {
      video.style.display = "none";
      fallback.style.display = "block";
    };

    video.addEventListener("error", onError);

    const timeout = window.setTimeout(() => {
      if (video.readyState === 0) {
        video.style.display = "none";
        fallback.style.display = "block";
      }
    }, 2500);

    return () => {
      video.removeEventListener("error", onError);
      window.clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    const stalkEls = Array.from(document.querySelectorAll<HTMLElement>(".stalk"));
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) entry.target.classList.add("in-view");
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );

    stalkEls.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[var(--obsidian)] text-[var(--ivory-mist)] antialiased">
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=DM+Serif+Display:ital@0;1&family=Syne:wght@400;600;700;800&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap");

        :root {
          --gold-haze: oklch(85% 0.12 70);
          --dust-amber: oklch(75% 0.15 50);
          --deep-earth: oklch(22% 0.06 50);
          --obsidian: oklch(12% 0.03 40);
          --ivory-mist: oklch(96% 0.03 75);
          --warm-white: oklch(98% 0.01 80);
          --sienna-mid: oklch(55% 0.14 50);
          --ochre-glow: oklch(78% 0.18 68);
          --grass-green: oklch(55% 0.12 145);
          --predator-dark: oklch(18% 0.04 45);
          --r-squircle: 38% 62% 63% 37% / 41% 44% 56% 59%;
          --r-lens: 48% 52% 58% 42% / 44% 41% 59% 56%;
          --r-card: 32% 68% 55% 45% / 48% 36% 64% 52%;
          --r-pill: 72% 28% 34% 66% / 55% 62% 38% 45%;
          --blur-haze: blur(80px) saturate(1.5) brightness(0.95);
          --blur-glass: blur(24px) saturate(1.8) brightness(1.05);
          --font-display: "DM Serif Display", serif;
          --font-title: "Playfair Display", serif;
          --font-data: "Space Mono", monospace;
          --font-ui: "Syne", sans-serif;
        }

        html {
          scroll-behavior: smooth;
          overflow-x: hidden;
        }

        body {
          background: var(--obsidian);
          color: var(--ivory-mist);
          font-family: var(--font-ui);
          overflow-x: hidden;
          cursor: none;
        }

        @media (max-width: 900px) {
          body {
            cursor: auto;
          }
        }

        ::-webkit-scrollbar {
          width: 3px;
        }

        ::-webkit-scrollbar-track {
          background: var(--obsidian);
        }

        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, var(--gold-haze), var(--dust-amber));
          border-radius: 99px;
        }

        ::selection {
          background: var(--gold-haze);
          color: white;
        }

        body::before {
          content: "";
          position: fixed;
          inset: 0;
          z-index: 1;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
          opacity: 0.035;
          pointer-events: none;
        }

        .light-corridor {
          position: fixed;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          background: radial-gradient(ellipse at center, oklch(85% 0.12 70 / 0.3) 0%, oklch(75% 0.15 50 / 0.1) 50%, transparent 85%);
          backdrop-filter: blur(120px) contrast(1.1);
          animation: corridor-breathe 8s ease-in-out infinite alternate;
        }

        @keyframes corridor-breathe {
          0% {
            opacity: 0.6;
            transform: scale(1) translateY(0);
          }
          100% {
            opacity: 1;
            transform: scale(1.08) translateY(-2%);
          }
        }

        #cursor-ring {
          position: fixed;
          width: 40px;
          height: 40px;
          border: 1.5px solid oklch(85% 0.12 70 / 0.6);
          border-radius: 50%;
          pointer-events: none;
          z-index: 9999;
          transform: translate(-50%, -50%);
          transition: width 0.3s, height 0.3s, border-color 0.3s, border-radius 0.3s;
          mix-blend-mode: screen;
        }

        #cursor-dot {
          position: fixed;
          width: 6px;
          height: 6px;
          background: var(--gold-haze);
          border-radius: 50%;
          pointer-events: none;
          z-index: 9999;
          transform: translate(-50%, -50%);
        }

        body:has(a:hover) #cursor-ring,
        body:has(button:hover) #cursor-ring {
          width: 64px;
          height: 64px;
          border-color: var(--ochre-glow);
          border-radius: 40%;
        }

        .dust-field {
          position: fixed;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          overflow: hidden;
        }

        .dust-field span {
          position: absolute;
          background: var(--gold-haze);
          border-radius: 50%;
          animation: dust-drift linear infinite;
          opacity: 0;
        }

        @keyframes dust-drift {
          0% {
            transform: translateY(100vh) translateX(0) scale(0);
            opacity: 0;
          }
          10% {
            opacity: 0.6;
          }
          90% {
            opacity: 0.3;
          }
          100% {
            transform: translateY(-10vh) translateX(var(--drift-x, 30px)) scale(1.5);
            opacity: 0;
          }
        }

        main {
          position: relative;
          z-index: 2;
        }

        .nav-shell {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.5rem 3rem;
          backdrop-filter: blur(40px) saturate(1.4);
          background: oklch(12% 0.03 40 / 0.4);
          border-bottom: 1px solid oklch(85% 0.12 70 / 0.08);
        }

        .nav-logo {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-family: var(--font-ui);
          font-weight: 800;
          font-size: 0.7rem;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: var(--ivory-mist);
        }

        .nav-links {
          display: flex;
          gap: 2.5rem;
          list-style: none;
          font-size: 0.68rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
        }

        .nav-links a {
          color: oklch(85% 0.12 70 / 0.7);
          text-decoration: none;
          transition: color 0.3s;
          position: relative;
        }

        .nav-links a::after {
          content: "";
          position: absolute;
          bottom: -4px;
          left: 0;
          right: 100%;
          height: 1px;
          background: var(--ochre-glow);
          transition: right 0.4s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .nav-links a:hover {
          color: var(--ochre-glow);
        }

        .nav-links a:hover::after {
          right: 0;
        }

        .nav-status {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-family: var(--font-data);
          font-size: 0.6rem;
          color: var(--grass-green);
          letter-spacing: 0.1em;
        }

        .status-pulse {
          width: 6px;
          height: 6px;
          background: var(--grass-green);
          border-radius: 50%;
          animation: pulse-live 2s ease-in-out infinite;
          box-shadow: 0 0 8px var(--grass-green);
        }

        @keyframes pulse-live {
          0%,
          100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.6);
            opacity: 0.4;
          }
        }

        .hero {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          overflow: hidden;
          padding: 0 4rem;
        }

        .savanna-portal {
          position: absolute;
          right: -5%;
          top: 50%;
          transform: translateY(-50%) rotate(-2deg);
          width: 62vw;
          height: 72vh;
          z-index: 1;
          animation: lens-drift 12s ease-in-out infinite alternate;
        }

        @keyframes lens-drift {
          0% {
            transform: translateY(-50%) rotate(-2deg) scale(1);
            right: -5%;
          }
          50% {
            transform: translateY(-52%) rotate(-1deg) scale(1.02);
            right: -3%;
          }
          100% {
            transform: translateY(-48%) rotate(-3deg) scale(0.99);
            right: -6%;
          }
        }

        .portal-mask {
          width: 100%;
          height: 100%;
          position: relative;
          border-radius: var(--r-lens);
          overflow: hidden;
          box-shadow: inset 0 0 80px oklch(85% 0.12 70 / 0.15), 0 0 120px oklch(75% 0.15 50 / 0.25), 0 40px 100px oklch(12% 0.03 40 / 0.6);
        }

        .portal-mask::before {
          content: "";
          position: absolute;
          inset: -2px;
          z-index: 3;
          border-radius: var(--r-lens);
          box-shadow: inset 0 0 0 3px oklch(85% 0.12 70 / 0.2);
          pointer-events: none;
        }

        .portal-mask::after {
          content: "";
          position: absolute;
          inset: 0;
          z-index: 2;
          pointer-events: none;
          border-radius: var(--r-lens);
        }

        .hero-content {
          position: relative;
          z-index: 10;
          max-width: 42%;
          padding-top: 6rem;
        }

        .hero-eyebrow {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-family: var(--font-data);
          font-size: 0.62rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: var(--ochre-glow);
          margin-bottom: 1.5rem;
          opacity: 0;
          animation: fade-up 1s 0.3s forwards;
        }

        .eyebrow-line {
          width: 40px;
          height: 1px;
          background: linear-gradient(to right, var(--ochre-glow), transparent);
        }

        .hero-title {
          font-family: var(--font-display);
          font-size: clamp(3.2rem, 5.5vw, 7rem);
          font-weight: 400;
          line-height: 0.9;
          color: var(--ivory-mist);
          letter-spacing: -0.02em;
          margin-bottom: 2rem;
          opacity: 0;
          animation: fade-up 1s 0.5s forwards;
        }

        .hero-title em {
          font-style: italic;
          color: var(--ochre-glow);
          display: block;
        }

        .hero-body {
          font-family: var(--font-ui);
          font-size: 0.88rem;
          line-height: 1.75;
          font-weight: 400;
          color: oklch(85% 0.12 70 / 0.65);
          max-width: 36ch;
          margin-bottom: 2.5rem;
          opacity: 0;
          animation: fade-up 1s 0.7s forwards;
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

        .hero-ctas {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          flex-wrap: wrap;
          opacity: 0;
          animation: fade-up 1s 0.9s forwards;
        }

        .btn-primary {
          position: relative;
          overflow: hidden;
          padding: 0.85rem 2rem;
          background: oklch(85% 0.12 70 / 0.12);
          border: 1px solid oklch(85% 0.12 70 / 0.3);
          border-radius: 44% 56% 38% 62% / 52% 44% 56% 48%;
          color: var(--ivory-mist);
          font-family: var(--font-ui);
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          text-decoration: none;
          backdrop-filter: var(--blur-glass);
          box-shadow: inset 0 1px 0 oklch(85% 0.12 70 / 0.2), inset 0 -1px 0 oklch(12% 0.03 40 / 0.3), 0 8px 32px oklch(12% 0.03 40 / 0.4);
          transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .btn-primary::before {
          content: "";
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at 50% 0%, oklch(85% 0.12 70 / 0.25) 0%, transparent 70%);
          opacity: 0;
          transition: opacity 0.3s;
        }

        .btn-primary:hover {
          transform: translateY(-2px) scale(1.02);
        }

        .btn-primary:hover::before {
          opacity: 1;
        }

        .btn-ghost {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: oklch(85% 0.12 70 / 0.55);
          font-family: var(--font-data);
          font-size: 0.62rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          text-decoration: none;
          transition: color 0.3s;
        }

        .btn-ghost::after {
          content: "→";
          font-size: 1rem;
          transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .btn-ghost:hover {
          color: var(--ochre-glow);
        }

        .btn-ghost:hover::after {
          transform: translateX(6px);
        }

        .hud-panel {
          background: oklch(12% 0.03 40 / 0.65);
          backdrop-filter: var(--blur-glass);
          border: 1px solid oklch(85% 0.12 70 / 0.12);
          border-radius: 28% 72% 22% 78% / 42% 32% 68% 58%;
          padding: 1rem 1.4rem;
          font-family: var(--font-data);
          font-size: 0.58rem;
          color: oklch(85% 0.12 70 / 0.7);
          letter-spacing: 0.1em;
          box-shadow: inset 0 1px 0 oklch(85% 0.12 70 / 0.1);
        }

        .hud-row {
          display: flex;
          gap: 1.5rem;
          margin-bottom: 0.3rem;
        }

        .hud-row:last-child {
          margin: 0;
        }

        .hud-label {
          color: oklch(55% 0.14 50 / 0.6);
        }

        .hud-value {
          color: var(--ochre-glow);
        }

        .scroll-hint {
          position: absolute;
          bottom: 2.5rem;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          font-family: var(--font-data);
          font-size: 0.55rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: oklch(85% 0.12 70 / 0.3);
          z-index: 10;
          animation: fade-up 1s 1.5s both;
        }

        .scroll-track {
          width: 1px;
          height: 48px;
          background: linear-gradient(to bottom, var(--ochre-glow), transparent);
          animation: scroll-pulse 2.5s ease-in-out infinite;
        }

        @keyframes scroll-pulse {
          0% {
            transform: scaleY(0);
            transform-origin: top;
            opacity: 0;
          }
          50% {
            transform: scaleY(1);
            opacity: 1;
          }
          100% {
            transform: scaleY(0);
            transform-origin: bottom;
            opacity: 0;
          }
        }

        .section-glow {
          position: relative;
        }

        .section-glow::before {
          content: "";
          position: absolute;
          left: 50%;
          top: 0;
          transform: translateX(-50%);
          width: 60%;
          height: 1px;
          background: radial-gradient(ellipse at center, oklch(85% 0.12 70 / 0.3) 0%, transparent 70%);
        }

        .data-strip {
          display: flex;
          gap: 0;
          overflow: hidden;
          border-radius: 48px;
          margin: 3rem 0;
          border: 1px solid oklch(85% 0.12 70 / 0.08);
        }

        .data-cell {
          flex: 1;
          padding: 1.5rem;
          border-right: 1px solid oklch(85% 0.12 70 / 0.06);
          background: oklch(16% 0.04 45 / 0.5);
          backdrop-filter: blur(20px);
          text-align: center;
          position: relative;
          overflow: hidden;
          transition: background 0.4s, transform 0.4s;
        }

        .data-cell:last-child {
          border-right: none;
        }

        .data-cell:hover {
          background: oklch(20% 0.05 50 / 0.7);
        }

        .data-cell::before {
          content: "";
          position: absolute;
          bottom: 0;
          left: 10%;
          right: 10%;
          height: 2px;
          background: linear-gradient(to right, transparent, var(--ochre-glow), transparent);
          transform: scaleX(0);
          transition: transform 0.4s;
          transform-origin: center;
        }

        .data-cell:hover::before {
          transform: scaleX(1);
        }

        .data-big {
          font-family: var(--font-title);
          font-size: 2.4rem;
          font-weight: 900;
          color: var(--ochre-glow);
          line-height: 1;
          display: block;
          margin-bottom: 0.25rem;
        }

        .data-sub {
          font-family: var(--font-data);
          font-size: 0.55rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: oklch(85% 0.12 70 / 0.4);
        }

        .telemetry-section {
          position: relative;
          padding: 7rem 4rem;
          overflow: hidden;
        }

        .section-label {
          display: flex;
          align-items: center;
          gap: 1rem;
          font-family: var(--font-data);
          font-size: 0.6rem;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          color: var(--sienna-mid);
          margin-bottom: 1rem;
        }

        .section-label-line {
          width: 32px;
          height: 1px;
          background: var(--sienna-mid);
        }

        .section-title {
          font-family: var(--font-title);
          font-size: clamp(2.2rem, 4vw, 4.5rem);
          font-weight: 700;
          line-height: 1;
          color: var(--ivory-mist);
          letter-spacing: -0.02em;
          max-width: 14ch;
          margin-bottom: 4rem;
        }

        .section-title span {
          color: var(--ochre-glow);
          font-style: italic;
        }

        .card-river {
          display: flex;
          gap: 2rem;
          flex-wrap: wrap;
          position: relative;
        }

        .card-river::before {
          content: "";
          position: absolute;
          top: -40px;
          left: 10%;
          right: 10%;
          height: 80px;
          background: radial-gradient(ellipse at center, oklch(85% 0.12 70 / 0.06) 0%, transparent 70%);
          pointer-events: none;
        }

        .tech-card {
          position: relative;
          flex: 1 1 280px;
          max-width: 360px;
          padding: 2.2rem 2rem;
          background: oklch(18% 0.04 45 / 0.7);
          backdrop-filter: var(--blur-glass);
          border: 1px solid oklch(85% 0.12 70 / 0.08);
          border-radius: var(--r-card);
          overflow: hidden;
          transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.5s;
          will-change: transform;
        }

        .tech-card::before {
          content: "";
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at 30% 0%, oklch(85% 0.12 70 / 0.08) 0%, transparent 60%);
          opacity: 0;
          transition: opacity 0.4s;
          pointer-events: none;
        }

        .tech-card::after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(to right, transparent, oklch(85% 0.12 70 / 0.3), transparent);
          opacity: 0.5;
        }

        .tech-card:hover {
          transform: translateY(-8px) rotate(0.5deg);
          box-shadow: 0 32px 80px oklch(12% 0.03 40 / 0.5), 0 0 0 1px oklch(85% 0.12 70 / 0.15);
        }

        .tech-card:hover::before {
          opacity: 1;
        }

        .card-icon {
          width: 48px;
          height: 48px;
          margin-bottom: 1.5rem;
          border-radius: 35% 65% 42% 58% / 50% 38% 62% 50%;
          background: oklch(85% 0.12 70 / 0.1);
          border: 1px solid oklch(85% 0.12 70 / 0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: inset 0 0 16px oklch(85% 0.12 70 / 0.1);
        }

        .card-kicker {
          font-family: var(--font-data);
          font-size: 0.56rem;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: var(--sienna-mid);
          margin-bottom: 0.5rem;
        }

        .card-name {
          font-family: var(--font-title);
          font-size: 1.3rem;
          font-weight: 700;
          line-height: 1.1;
          color: var(--ivory-mist);
          margin-bottom: 0.8rem;
        }

        .card-desc {
          font-size: 0.8rem;
          line-height: 1.7;
          color: oklch(85% 0.12 70 / 0.5);
        }

        .card-metric {
          margin-top: 1.5rem;
          padding-top: 1rem;
          border-top: 1px solid oklch(85% 0.12 70 / 0.08);
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          gap: 0.8rem;
          font-family: var(--font-data);
          font-size: 0.6rem;
        }

        .metric-val {
          font-size: 1.4rem;
          color: var(--ochre-glow);
          font-weight: 700;
        }

        .metric-label {
          color: oklch(85% 0.12 70 / 0.35);
          letter-spacing: 0.1em;
        }

        .biome-section {
          position: relative;
          padding: 7rem 4rem;
          overflow: hidden;
        }

        .biome-grid {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 4rem;
          align-items: center;
        }

        .biome-visual {
          position: relative;
          height: 500px;
        }

        .biome-orb {
          position: absolute;
          border-radius: var(--r-pill);
          animation: orb-float ease-in-out infinite alternate;
        }

        .biome-orb-1 {
          width: 340px;
          height: 340px;
          top: 0;
          left: 0;
          background: radial-gradient(ellipse at 35% 35%, oklch(78% 0.18 68 / 0.15), oklch(22% 0.06 50 / 0.05));
          border: 1px solid oklch(85% 0.12 70 / 0.1);
          backdrop-filter: blur(40px);
          animation-duration: 7s;
          box-shadow: inset 0 0 60px oklch(85% 0.12 70 / 0.06);
        }

        .biome-orb-2 {
          width: 240px;
          height: 260px;
          bottom: 0;
          right: 0;
          background: radial-gradient(ellipse at 60% 60%, oklch(55% 0.12 145 / 0.12), transparent);
          border: 1px solid oklch(55% 0.12 145 / 0.15);
          animation-duration: 9s;
        }

        .biome-orb-3 {
          width: 160px;
          height: 180px;
          top: 50%;
          left: 55%;
          transform: translate(-50%, -50%);
          background: radial-gradient(ellipse at center, oklch(75% 0.15 50 / 0.2), transparent);
          animation-duration: 5s;
          border: 1px solid oklch(75% 0.15 50 / 0.2);
          backdrop-filter: blur(20px);
        }

        @keyframes orb-float {
          0% {
            transform: translateY(0) rotate(0deg) scale(1);
          }
          100% {
            transform: translateY(-20px) rotate(3deg) scale(1.04);
          }
        }

        .spec-list {
          list-style: none;
          margin-top: 1.5rem;
          padding: 0;
        }

        .spec-list li {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1rem;
          padding: 0.65rem 0;
          border-bottom: 1px solid oklch(85% 0.12 70 / 0.06);
          font-size: 0.8rem;
        }

        .spec-list li:last-child {
          border-bottom: none;
        }

        .spec-key {
          color: oklch(85% 0.12 70 / 0.45);
          font-family: var(--font-data);
          font-size: 0.62rem;
          letter-spacing: 0.1em;
        }

        .spec-val {
          color: var(--ivory-mist);
          font-weight: 600;
        }

        .spec-badge {
          font-family: var(--font-data);
          font-size: 0.52rem;
          letter-spacing: 0.15em;
          padding: 0.2rem 0.5rem;
          border-radius: 99px;
          background: oklch(55% 0.12 145 / 0.15);
          border: 1px solid oklch(55% 0.12 145 / 0.3);
          color: oklch(70% 0.14 145);
        }

        .acoustic-bar-wrap {
          display: flex;
          align-items: flex-end;
          gap: 4px;
          height: 80px;
          margin: 1rem 0;
        }

        .acoustic-bar {
          flex: 1;
          background: linear-gradient(to top, var(--ochre-glow), oklch(85% 0.12 70 / 0.3));
          border-radius: 99px 99px 0 0;
          animation: wave-pulse 1.4s ease-in-out infinite;
          min-height: 4px;
        }

        @keyframes wave-pulse {
          0%,
          100% {
            height: var(--bar-h, 30%);
          }
          50% {
            height: var(--bar-h2, 70%);
          }
        }

        .genomic-section {
          padding: 7rem 4rem;
          position: relative;
        }

        .genomic-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
          margin-top: 3rem;
        }

        .genome-node {
          position: relative;
          padding: 1.5rem;
          background: oklch(16% 0.04 45 / 0.6);
          border: 1px solid oklch(85% 0.12 70 / 0.07);
          border-radius: var(--r-squircle);
          backdrop-filter: blur(20px);
          transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
          overflow: hidden;
        }

        .genome-node::before {
          content: "";
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at var(--mx, 50%) var(--my, 50%), oklch(85% 0.12 70 / 0.07) 0%, transparent 60%);
          pointer-events: none;
        }

        .genome-node:hover {
          transform: scale(1.03) rotate(-0.5deg);
          border-color: oklch(85% 0.12 70 / 0.2);
          box-shadow: 0 20px 60px oklch(12% 0.03 40 / 0.4);
        }

        .genome-code {
          font-family: var(--font-data);
          font-size: 0.55rem;
          color: oklch(55% 0.14 50 / 0.6);
          letter-spacing: 0.2em;
          margin-bottom: 0.5rem;
        }

        .genome-name {
          font-family: var(--font-title);
          font-size: 1rem;
          font-weight: 700;
          color: var(--ivory-mist);
          margin-bottom: 0.3rem;
        }

        .genome-sci {
          font-family: var(--font-data);
          font-size: 0.6rem;
          font-style: italic;
          color: oklch(85% 0.12 70 / 0.35);
          margin-bottom: 1rem;
        }

        .genome-bar {
          height: 3px;
          border-radius: 99px;
          background: oklch(85% 0.12 70 / 0.1);
          overflow: hidden;
          margin-bottom: 0.4rem;
        }

        .genome-bar-fill {
          height: 100%;
          background: linear-gradient(to right, var(--ochre-glow), var(--sienna-mid));
          border-radius: 99px;
          animation: fill-expand 2s 0.5s cubic-bezier(0.22, 1, 0.36, 1) both;
          transform-origin: left;
        }

        @keyframes fill-expand {
          from {
            transform: scaleX(0);
          }
          to {
            transform: scaleX(1);
          }
        }

        .genome-pct {
          font-family: var(--font-data);
          font-size: 0.6rem;
          color: oklch(85% 0.12 70 / 0.4);
          text-align: right;
        }

        .footer-shell {
          position: relative;
          padding: 5rem 4rem 3rem;
          border-top: 1px solid oklch(85% 0.12 70 / 0.06);
          overflow: hidden;
        }

        .footer-shell::before {
          content: "";
          position: absolute;
          top: -80px;
          left: 50%;
          transform: translateX(-50%);
          width: 500px;
          height: 160px;
          background: radial-gradient(ellipse, oklch(85% 0.12 70 / 0.04) 0%, transparent 70%);
        }

        .footer-inner {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          flex-wrap: wrap;
          gap: 2rem;
        }

        .footer-brand {
          font-family: var(--font-display);
          font-size: 3rem;
          font-weight: 400;
          font-style: italic;
          color: oklch(85% 0.12 70 / 0.12);
          letter-spacing: -0.03em;
          line-height: 1;
        }

        .footer-copy {
          font-family: var(--font-data);
          font-size: 0.6rem;
          color: oklch(85% 0.12 70 / 0.25);
          letter-spacing: 0.1em;
          line-height: 1.8;
        }

        .footer-links {
          display: flex;
          gap: 2rem;
          list-style: none;
          font-family: var(--font-data);
          font-size: 0.6rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          padding: 0;
          margin: 0;
          flex-wrap: wrap;
        }

        .footer-links a {
          color: oklch(85% 0.12 70 / 0.3);
          text-decoration: none;
          transition: color 0.3s;
        }

        .footer-links a:hover {
          color: var(--ochre-glow);
        }

        .stalk {
          opacity: 0;
          transform: translateY(32px);
          transition: opacity 0.9s cubic-bezier(0.22, 1, 0.36, 1), transform 0.9s cubic-bezier(0.22, 1, 0.36, 1);
          will-change: transform, opacity;
        }

        .stalk.in-view {
          opacity: 1;
          transform: translateY(0);
        }

        .stalk-delay-1 {
          transition-delay: 0.1s;
        }

        .stalk-delay-2 {
          transition-delay: 0.2s;
        }

        .stalk-delay-3 {
          transition-delay: 0.3s;
        }

        .stalk-delay-4 {
          transition-delay: 0.4s;
        }

        @media (max-width: 900px) {
          .nav-shell {
            padding: 1rem 1.5rem;
          }

          .nav-links {
            display: none;
          }

          .hero {
            padding: 0 1.5rem;
          }

          .hero-content {
            max-width: 100%;
            z-index: 10;
          }

          .savanna-portal {
            opacity: 0.3;
            width: 100vw;
            right: 0;
            height: 55vh;
            top: auto;
            bottom: 0;
            transform: none;
            animation: none;
          }

          .hero-title {
            font-size: 2.8rem;
          }

          .section-glow,
          .telemetry-section,
          .biome-section,
          .genomic-section {
            padding: 4rem 1.5rem;
          }

          .biome-grid {
            grid-template-columns: 1fr;
          }

          .genomic-grid {
            grid-template-columns: 1fr 1fr;
          }

          .footer-shell {
            padding: 3rem 1.5rem 2rem;
          }

          .data-strip {
            border-radius: 24px;
            flex-direction: column;
          }

          .data-cell {
            padding: 1rem;
            border-right: none;
            border-bottom: 1px solid oklch(85% 0.12 70 / 0.06);
          }

          .data-cell:last-child {
            border-bottom: none;
          }

          .data-big {
            font-size: 1.6rem;
          }
        }

        @media (max-width: 640px) {
          .genomic-grid {
            grid-template-columns: 1fr;
          }

          .card-river {
            gap: 1rem;
          }

          .tech-card {
            max-width: none;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
            scroll-behavior: auto !important;
          }
        }
      `}</style>

      <div id="cursor-ring" ref={cursorRingRef} />
      <div id="cursor-dot" ref={cursorDotRef} />
      <div className="light-corridor" />
      <div className="dust-field" ref={dustFieldRef} />

      <nav ref={navRef} className="nav-shell">
        <div className="nav-logo">
          <div className="h-6 w-9 flex-shrink-0 rounded-[4px_12px_4px_12px] bg-[var(--ochre-glow)]" />
          <div className="leading-tight">
            <div className="flex items-center gap-2">
              <Icon icon="mdi:nature" className="text-base text-[var(--ochre-glow)]" />
              National Geographic
            </div>
            <div>Conservation Technology</div>
          </div>
        </div>

        <ul className="nav-links">
          <li>
            <a href="#telemetry">Telemetry</a>
          </li>
          <li>
            <a href="#biome">Biome Sync</a>
          </li>
          <li>
            <a href="#acoustic">Acoustic</a>
          </li>
          <li>
            <a href="#genomic">Genomic</a>
          </li>
        </ul>

        <div className="nav-status">
          <div className="status-pulse" />
          Live Field Data · Serengeti
        </div>
      </nav>

      <section className="hero">
        <div className="savanna-portal">
          <div className="portal-mask">
            <video
              ref={videoRef}
              className="portal-video h-full w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              poster=""
            >
              <source src="/video.mp4" type="video/mp4" />
            </video>

            <svg
              ref={fallbackRef}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 900 700"
              className="absolute left-0 top-0 hidden h-full w-full"
            >
              <defs>
                <radialGradient id="sky" cx="50%" cy="40%" r="70%">
                  <stop offset="0%" stopColor="#c8832a" />
                  <stop offset="40%" stopColor="#a05c1a" />
                  <stop offset="100%" stopColor="#1a0e05" />
                </radialGradient>
                <radialGradient id="sun" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#fde68a" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
                </radialGradient>
                <filter id="blur-soft">
                  <feGaussianBlur stdDeviation="3" />
                </filter>
              </defs>
              <rect width="900" height="700" fill="url(#sky)" />
              <ellipse cx="450" cy="260" rx="120" ry="100" fill="url(#sun)" filter="url(#blur-soft)" />
              <ellipse cx="450" cy="600" rx="550" ry="120" fill="#3d200a" opacity="0.9" />
              <rect x="0" y="480" width="900" height="220" fill="#2a1506" opacity="0.8" />
            </svg>

            <div className="grass-overlay absolute inset-0 z-20 rounded-[var(--r-lens)] opacity-0" />
          </div>
        </div>

        <div className="hero-content">
          <div className="hero-eyebrow">
            <div className="eyebrow-line" />
            Apex-Predator Telemetry · Field System v4.2
          </div>

          <h1 className="hero-title">
            The Wild
            <em>Never Sleeps.</em>
          </h1>

          <p className="hero-body">
            Serengeti biome-sync technology meets real-time ethological intelligence. We track, map, and protect the apex predators of our age—through acoustic monitoring arrays, non-invasive genomic sampling, and satellite telemetry at 120-frame fidelity.
          </p>

          <div className="hero-ctas">
            <a href="#telemetry" className="btn-primary">
              Explore the System
            </a>
            <a href="#genomic" className="btn-ghost">
              View Live Data
            </a>
          </div>
        </div>

        <div className="telemetry-hud absolute bottom-8 left-8 z-20">
          <div className="hud-panel">
            <div className="hud-row">
              <span className="hud-label">LAT</span>
              <span className="hud-value">-2.3304° S</span>
              <span className="hud-label">LONG</span>
              <span className="hud-value">34.8332° E</span>
            </div>
            <div className="hud-row">
              <span className="hud-label">SUBJECT</span>
              <span className="hud-value">LION♀ ID:447</span>
              <span className="hud-label">TEMP</span>
              <span className="hud-value">38.6°C</span>
            </div>
            <div className="hud-row">
              <span className="hud-label">SIGNAL</span>
              <span className="hud-value text-[var(--grass-green)]">STRONG</span>
              <span className="hud-label">PING</span>
              <span className="hud-value">4s AGO</span>
            </div>
          </div>
        </div>

        <div className="scroll-hint">
          Scroll to explore
          <div className="scroll-track" />
        </div>
      </section>

      <section id="telemetry" className="section-glow px-6 py-16 md:px-16">
        <div className="data-strip stalk">
          <div className="data-cell">
            <span className="data-big">1,847</span>
            <span className="data-sub">Animals Tagged</span>
          </div>
          <div className="data-cell">
            <span className="data-big">94.2%</span>
            <span className="data-sub">Signal Uptime</span>
          </div>
          <div className="data-cell">
            <span className="data-big">3.2M</span>
            <span className="data-sub">km² Monitored</span>
          </div>
          <div className="data-cell">
            <span className="data-big">48</span>
            <span className="data-sub">Acoustic Arrays</span>
          </div>
          <div className="data-cell">
            <span className="data-big">0.0%</span>
            <span className="data-sub">Invasive Sampling</span>
          </div>
        </div>
      </section>

      <section className="telemetry-section">
        <div className="section-label stalk">
          <div className="section-label-line" />
          Core Technology Systems
        </div>

        <h2 className="section-title stalk stalk-delay-1">
          Intelligence
          <br />
          born from <span>silence</span>.
        </h2>

        <div className="card-river">
          {telemetryCards.map(card => (
            <div key={card.name} className="tech-card stalk">
              <div className="card-icon">
                <Icon icon={card.icon} className="text-2xl text-[var(--ochre-glow)]" />
              </div>
              <div className="card-kicker">{card.kicker}</div>
              <div className="card-name">{card.name}</div>
              <p className="card-desc">{card.desc}</p>
              <div className="card-metric">
                {card.metrics.map(metric => (
                  <div key={metric.label}>
                    <span className="metric-val block">{metric.value}</span>
                    <span className="metric-label block">{metric.label}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="biome" className="biome-section">
        <div className="biome-grid">
          <div>
            <div className="section-label stalk">
              <div className="section-label-line" />
              Serengeti Biome-Sync
            </div>

            <h2 className="section-title stalk stalk-delay-1">
              The land
              <br />
              breathes
              <br />
              <span>data.</span>
            </h2>

            <p className="stalk stalk-delay-2 mb-8 max-w-[42ch] text-[0.88rem] leading-[1.8] text-[oklch(85%_0.12_70_/_0.5)]">
              Our biome-synchronization platform integrates satellite multispectral imagery, ground-truth sensor arrays, and machine-learning habitat models into a living cartographic intelligence. Updated every 2 hours. Predictive horizon: 72 hours.
            </p>

            <ul className="spec-list stalk stalk-delay-3">
              <li>
                <span className="spec-key">Vegetation NDVI Index</span>
                <span className="spec-val">
                  0.74 <span className="spec-badge">Optimal</span>
                </span>
              </li>
              <li>
                <span className="spec-key">Prey Density (km²)</span>
                <span className="spec-val">142 wildebeest</span>
              </li>
              <li>
                <span className="spec-key">Water Source Status</span>
                <span className="spec-val">16 / 18 Active</span>
              </li>
              <li>
                <span className="spec-key">Predator Corridors</span>
                <span className="spec-val">7 mapped</span>
              </li>
              <li>
                <span className="spec-key">Biome Sync Latency</span>
                <span className="spec-val">1.8s avg</span>
              </li>
            </ul>
          </div>

          <div className="biome-visual stalk stalk-delay-2">
            <div className="biome-orb biome-orb-1" />
            <div className="biome-orb biome-orb-2" />
            <div className="biome-orb biome-orb-3" />

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative h-[280px] w-[280px]">
                <svg viewBox="0 0 280 280" xmlns="http://www.w3.org/2000/svg" className="h-full w-full opacity-60">
                  <defs>
                    <radialGradient id="mapglow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="oklch(85% 0.12 70)" stopOpacity="0.15" />
                      <stop offset="100%" stopColor="transparent" />
                    </radialGradient>
                  </defs>
                  <ellipse cx="110" cy="130" rx="80" ry="65" fill="none" stroke="oklch(78% 0.18 68 / 0.3)" strokeWidth="1" strokeDasharray="4 3" />
                  <ellipse cx="175" cy="155" rx="65" ry="55" fill="none" stroke="oklch(55% 0.12 145 / 0.4)" strokeWidth="1" strokeDasharray="3 4" />
                  <circle cx="90" cy="110" r="4" fill="oklch(78% 0.18 68)" opacity="0.8" />
                  <circle cx="140" cy="100" r="3" fill="oklch(78% 0.18 68)" opacity="0.6" />
                  <circle cx="170" cy="140" r="5" fill="oklch(78% 0.18 68)" opacity="0.9">
                    <animate attributeName="r" values="5;8;5" dur="2s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.9;0.3;0.9" dur="2s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="120" cy="175" r="3" fill="oklch(55% 0.12 145)" opacity="0.7" />
                  <circle cx="200" cy="120" r="3" fill="oklch(55% 0.12 145)" opacity="0.5" />
                  <line x1="90" y1="110" x2="140" y2="100" stroke="oklch(78% 0.18 68 / 0.2)" strokeWidth="1" />
                  <line x1="140" y1="100" x2="170" y2="140" stroke="oklch(78% 0.18 68 / 0.2)" strokeWidth="1" />
                  <line x1="170" y1="140" x2="120" y2="175" stroke="oklch(55% 0.12 145 / 0.2)" strokeWidth="1" />
                  <line x1="170" y1="140" x2="200" y2="120" stroke="oklch(55% 0.12 145 / 0.2)" strokeWidth="1" />
                  <line x1="170" y1="130" x2="170" y2="150" stroke="oklch(78% 0.18 68 / 0.5)" strokeWidth="0.8" />
                  <line x1="160" y1="140" x2="180" y2="140" stroke="oklch(78% 0.18 68 / 0.5)" strokeWidth="0.8" />
                </svg>
                <div className="absolute left-[22%] top-[18%] font-[var(--font-data)] text-[0.5rem] tracking-[0.1em] text-[oklch(78%_0.18_68_/_0.7)]">
                  PRIDE TERRITORY A
                </div>
                <div className="absolute left-[48%] top-[62%] font-[var(--font-data)] text-[0.5rem] tracking-[0.1em] text-[oklch(55%_0.12_145_/_0.7)]">
                  GRAZING ZONE
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="acoustic" className="section-glow px-6 py-20 md:px-16">
        <div className="section-label stalk">
          <div className="section-label-line" />
          Acoustic Monitoring Arrays
        </div>

        <h2 className="section-title stalk stalk-delay-1">
          Listen to the
          <br />
          <span>frequency</span>
          <br />
          of life.
        </h2>

        <div className="mt-4 grid gap-16 lg:grid-cols-2">
          <div className="stalk stalk-delay-2">
            <p className="mb-8 max-w-[40ch] text-[0.88rem] leading-[1.8] text-[oklch(85%_0.12_70_/_0.5)]">
              Passive acoustic networks capture 24/7 bioacoustic signatures. AI classifies 4,200+ species calls, detects poaching events, and monitors stress vocalizations as behavioral health indicators.
            </p>

            <div className="mb-2 font-[var(--font-data)] text-[0.58rem] uppercase tracking-[0.2em] text-[oklch(85%_0.12_70_/_0.35)]">
              Live Signal · Array 07 · Serengeti North
            </div>

            <div ref={acousticBarsRef} className="acoustic-bar-wrap">
              {acousticBars.map((bar, i) => (
                <div
                  key={i}
                  className="acoustic-bar"
                  style={
                    {
                      ["--bar-h" as any]: `${bar.h}%`,
                      ["--bar-h2" as any]: `${bar.h2}%`,
                      animationDelay: `${bar.delay}s`,
                      animationDuration: `${bar.duration}s`,
                    } as React.CSSProperties
                  }
                />
              ))}
            </div>

            <div className="mt-1 flex justify-between font-[var(--font-data)] text-[0.52rem] text-[oklch(85%_0.12_70_/_0.25)]">
              <span>20Hz</span>
              <span>500Hz</span>
              <span>4kHz</span>
              <span>16kHz</span>
              <span>40kHz</span>
            </div>
          </div>

          <div className="stalk stalk-delay-3">
            <div className="grid grid-cols-2 gap-4">
              <div className="tech-card p-5">
                <div className="card-kicker mb-2">Detection</div>
                <div className="mb-1 font-[var(--font-title)] text-[2rem] font-black text-[var(--ochre-glow)]">4,213</div>
                <div className="text-[0.72rem] text-[oklch(85%_0.12_70_/_0.4)]">Species Classified</div>
              </div>
              <div className="tech-card p-5">
                <div className="card-kicker mb-2">Response</div>
                <div className="mb-1 font-[var(--font-title)] text-[2rem] font-black text-[var(--grass-green)]">1.2s</div>
                <div className="text-[0.72rem] text-[oklch(85%_0.12_70_/_0.4)]">Threat Alert Latency</div>
              </div>
              <div className="tech-card p-5">
                <div className="card-kicker mb-2">Uptime</div>
                <div className="mb-1 font-[var(--font-title)] text-[2rem] font-black text-[var(--ochre-glow)]">99.7%</div>
                <div className="text-[0.72rem] text-[oklch(85%_0.12_70_/_0.4)]">Array Availability</div>
              </div>
              <div className="tech-card p-5">
                <div className="card-kicker mb-2">Range</div>
                <div className="mb-1 font-[var(--font-title)] text-[2rem] font-black text-[var(--sienna-mid)]">8km</div>
                <div className="text-[0.72rem] text-[oklch(85%_0.12_70_/_0.4)]">Hydrophone Radius</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="genomic" className="genomic-section">
        <div className="section-label stalk">
          <div className="section-label-line" />
          Non-Invasive Genomic Sampling
        </div>

        <h2 className="section-title stalk stalk-delay-1">
          DNA reveals
          <br />
          what eyes
          <br />
          <span>cannot.</span>
        </h2>

        <div className="genomic-grid">
          {genomeCards.map((item, index) => (
            <div
              key={item.code}
              className={`genome-node stalk ${index % 3 === 0 ? "stalk-delay-1" : index % 3 === 1 ? "stalk-delay-2" : "stalk-delay-3"}`}
            >
              <div className="genome-code">{item.code}</div>
              <div className="genome-name">{item.name}</div>
              <div className="genome-sci">{item.sci}</div>
              <div className="genome-bar">
                <div className="genome-bar-fill" style={{ width: `${item.pct}%` }} />
              </div>
              <div className="genome-pct">{item.pct}% genome mapped</div>
            </div>
          ))}
        </div>
      </section>

      <footer className="footer-shell">
        <div className="footer-inner">
          <div>
            <div className="footer-brand">
              Conservation
              <br />
              Technology
            </div>
          </div>
          <div>
            <ul className="footer-links">
              <li>
                <a href="#">Field Notes</a>
              </li>
              <li>
                <a href="#">Open Data</a>
              </li>
              <li>
                <a href="#">API Access</a>
              </li>
              <li>
                <a href="#">Partners</a>
              </li>
            </ul>
            <div className="footer-copy mt-6">
              © 2025 National Geographic Society
              <br />
              Conservation Technology Division · Serengeti Field Operations
              <br />
              <span className="text-[oklch(85%_0.12_70_/_0.15)]">System v4.2.1 · All animal data anonymized for protection.</span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}