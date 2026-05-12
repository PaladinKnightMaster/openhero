"use client";

import { Icon } from "@iconify/react";
import { useEffect, useRef } from "react";

type ViewTransitionDocument = Document & {
  startViewTransition?: (callback: () => void) => void;
};

export default function Page() {
  const heroVideoRef = useRef<HTMLVideoElement | null>(null);
  const revealObserverRef = useRef<IntersectionObserver | null>(null);
  const anatomyRef = useRef<HTMLElement | null>(null);
  const layerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const monolithRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const updateHero = () => {
      const progress = Math.min(window.scrollY / (window.innerHeight * 1.1), 1);
      const scale = 1.05 + progress * 0.12;
      const translate = progress * 18;

      if (heroVideoRef.current) {
        heroVideoRef.current.style.transform = `scale(${scale}) translateY(${translate}px)`;
      }
    };

    updateHero();

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        updateHero();
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateHero);

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add("in");
          }
        });
      },
      { threshold: 0.16 }
    );

    document.querySelectorAll<HTMLElement>(".reveal").forEach((el) => {
      revealObserver.observe(el);
    });

    revealObserverRef.current = revealObserver;

    const updateAnatomyLayers = () => {
      const section = anatomyRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const sectionHeight = rect.height || 1;
      const viewport = window.innerHeight;
      const visibleTop = Math.max(0, -rect.top);
      const progress = Math.min(Math.max(visibleTop / (sectionHeight - viewport * 0.25), 0), 1);
      const index = Math.min(Math.floor(progress * layerRefs.current.length), layerRefs.current.length - 1);

      layerRefs.current.forEach((layer, i) => {
        if (!layer) return;
        layer.classList.toggle("active", i === index);
      });
    };

    const onScrollAnatomy = () => {
      updateAnatomyLayers();
    };

    window.addEventListener("scroll", onScrollAnatomy, { passive: true });
    updateAnatomyLayers();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateHero);
      window.removeEventListener("scroll", onScrollAnatomy);
      revealObserver.disconnect();
      revealObserverRef.current = null;
    };
  }, []);

  const toggleMonolith = (card: HTMLElement) => {
    const doc = document as ViewTransitionDocument;
    const action = () => {
      card.classList.toggle("open");
    };

    if (typeof doc.startViewTransition === "function") {
      doc.startViewTransition(action);
    } else {
      action();
    }
  };

  return (
    <>
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;600;700;800;900&family=IBM+Plex+Mono:wght@400;500;600;700&family=Cormorant+Garamond:wght@500;600;700&display=swap");

        :root {
          color-scheme: dark;
          --amber: oklch(76% 0.15 75);
          --amber-deep: oklch(62% 0.12 68);
          --oak: oklch(63% 0.08 82);
          --concrete: oklch(24% 0.02 240);
          --concrete-2: oklch(18% 0.02 240);
          --graphite: oklch(12% 0.02 240);
          --text: oklch(97% 0.01 80);
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
          font-family: "Inter Tight", sans-serif;
          color: white;
          background:
            radial-gradient(circle at 20% 10%, rgba(255, 181, 92, .18), transparent 18%),
            radial-gradient(circle at 82% 12%, rgba(255, 255, 255, .04), transparent 14%),
            linear-gradient(
              180deg,
              oklch(18% 0.02 240) 0%,
              oklch(14% 0.02 240) 45%,
              oklch(10% 0.02 240) 100%
            );
        }

        body::before {
          content: "";
          position: fixed;
          inset: 0;
          pointer-events: none;
          background-image:
            linear-gradient(rgba(255, 255, 255, .03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, .03) 1px, transparent 1px),
            repeating-linear-gradient(135deg, rgba(255, 255, 255, .03) 0 1px, transparent 1px 12px);
          background-size: 128px 128px, 128px 128px, 240px 240px;
          opacity: .2;
          mask-image: radial-gradient(circle at center, black 34%, transparent 88%);
          z-index: -2;
        }

        .mono {
          font-family: "IBM Plex Mono", monospace;
        }

        .serif {
          font-family: "Cormorant Garamond", serif;
          letter-spacing: -.055em;
        }

        .grain-concrete {
          background:
            linear-gradient(180deg, rgba(255, 255, 255, .05), rgba(255, 255, 255, .015)),
            repeating-linear-gradient(90deg, rgba(255, 255, 255, .02) 0 1px, transparent 1px 10px),
            linear-gradient(180deg, rgba(52, 53, 58, .78), rgba(28, 30, 34, .94));
        }

        .grain-oak {
          background:
            linear-gradient(180deg, rgba(255, 255, 255, .04), rgba(255, 255, 255, .01)),
            repeating-linear-gradient(90deg, rgba(145, 110, 64, .12) 0 1px, transparent 1px 8px),
            linear-gradient(180deg, rgba(93, 66, 39, .72), rgba(55, 39, 24, .92));
        }

        .sunset-amber {
          background:
            radial-gradient(circle at 20% 10%, rgba(255, 190, 112, .16), transparent 18%),
            linear-gradient(180deg, rgba(134, 82, 40, .95), rgba(61, 36, 20, .98));
        }

        .dense-panel {
          background:
            linear-gradient(180deg, rgba(255, 255, 255, .055), rgba(255, 255, 255, .02)),
            linear-gradient(135deg, rgba(255, 255, 255, .04), transparent 35%);
          border: 1px solid rgba(255, 255, 255, .08);
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, .06),
            0 24px 70px rgba(0, 0, 0, .28);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
        }

        .amber-button {
          position: relative;
          overflow: hidden;
          border-radius: 1rem;
          background:
            linear-gradient(180deg, rgba(255, 196, 116, .96), rgba(193, 124, 47, .92));
          border: 1px solid rgba(255, 255, 255, .14);
          color: #1d130a;
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, .45),
            0 24px 50px rgba(0, 0, 0, .26);
          transition: transform .45s cubic-bezier(.16, 1, .3, 1), box-shadow .45s ease;
        }

        .amber-button::before {
          content: "";
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle at 50% 50%, rgba(255, 255, 255, .2), transparent 34%),
            linear-gradient(120deg, transparent 44%, rgba(255, 255, 255, .7) 50%, transparent 56%);
          transform: translateX(-140%) rotate(12deg);
          animation: sheen 8s ease-in-out infinite;
          pointer-events: none;
          mix-blend-mode: screen;
        }

        .amber-button:hover {
          transform: translateY(-3px);
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, .5),
            0 30px 60px rgba(0, 0, 0, .3);
        }

        .section-shell {
          width: min(1680px, calc(100% - 28px));
          margin: 0 auto;
        }

        .top-rail {
          position: fixed;
          inset: 18px 18px auto 18px;
          z-index: 80;
          display: grid;
          grid-template-columns: auto 1fr auto;
          gap: 16px;
          align-items: center;
          padding: 14px 16px;
          border: 1px solid rgba(255, 255, 255, .08);
          background: rgba(15, 17, 20, .72);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          box-shadow: 0 18px 60px rgba(0, 0, 0, .26);
        }

        .brand {
          display: flex;
          align-items: center;
          gap: 14px;
          min-width: 0;
        }

        .brand-mark {
          width: 40px;
          height: 40px;
          display: grid;
          place-items: center;
          border-radius: 3px;
          border: 1px solid rgba(255, 255, 255, .08);
          background: rgba(255, 255, 255, .05);
        }

        .brand-copy {
          min-width: 0;
          line-height: 1.02;
        }

        .brand-copy .k {
          font-size: 10px;
          letter-spacing: .34em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, .56);
        }

        .brand-copy .v {
          margin-top: 4px;
          font-size: 14px;
          color: rgba(255, 255, 255, .88);
        }

        .rail-nav {
          display: flex;
          justify-content: center;
          gap: 20px;
          overflow-x: auto;
          scrollbar-width: none;
          text-transform: uppercase;
          letter-spacing: .24em;
          font-size: 10px;
          color: rgba(255, 255, 255, .6);
        }

        .rail-nav::-webkit-scrollbar {
          display: none;
        }

        .rail-nav a {
          color: inherit;
          text-decoration: none;
          white-space: nowrap;
          transition: .25s ease;
        }

        .rail-nav a:hover {
          color: var(--amber);
        }

        .top-stats {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .meter {
          width: 220px;
          height: 8px;
          background: rgba(255, 255, 255, .08);
          overflow: hidden;
          border-radius: 2px;
        }

        .meter span {
          display: block;
          width: 74%;
          height: 100%;
          background: linear-gradient(90deg, rgba(255, 201, 118, .95), rgba(172, 115, 43, .95));
        }

        .hero {
          min-height: 100svh;
          position: relative;
          overflow: hidden;
          padding-top: 88px;
        }

        .hero-grid {
          width: min(1680px, calc(100% - 28px));
          margin: 0 auto;
          min-height: calc(100svh - 88px);
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          gap: 14px;
          align-items: stretch;
        }

        .telemetry {
          position: absolute;
          z-index: 5;
          width: clamp(220px, 18vw, 320px);
          padding: 14px 16px;
          border-radius: 3px;
          border: 1px solid rgba(255, 195, 126, .28);
          background: rgba(20, 20, 20, .42);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          box-shadow: 0 18px 48px rgba(0, 0, 0, .24);
        }

        .telemetry .k {
          text-transform: uppercase;
          letter-spacing: .3em;
          font-size: 10px;
          color: rgba(255, 255, 255, .56);
        }

        .telemetry .v {
          margin-top: 10px;
          font-size: clamp(2rem, 3vw, 3rem);
          line-height: 1;
          letter-spacing: -.06em;
          color: white;
        }

        .telemetry .d {
          margin-top: 8px;
          color: rgba(255, 255, 255, .72);
          line-height: 1.7;
          font-size: 12px;
        }

        .hero-core {
          grid-column: 3 / span 8;
          align-self: center;
          position: relative;
          z-index: 3;
          padding: 22px;
          border-radius: 2.4rem;
          background:
            linear-gradient(180deg, rgba(255, 255, 255, .06), rgba(255, 255, 255, .02)),
            linear-gradient(135deg, rgba(255, 193, 127, .06), transparent 42%);
          box-shadow: 0 30px 90px rgba(0, 0, 0, .36);
        }

        .core-shell {
          position: relative;
          overflow: hidden;
          border-radius: 2rem;
          border: 1px solid rgba(255, 199, 137, .2);
          background: rgba(20, 20, 20, .55);
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, .08),
            0 0 0 1px rgba(255, 255, 255, .03);
        }

        .core-shell::before {
          content: "";
          position: absolute;
          inset: -2px;
          background:
            radial-gradient(circle at center, rgba(255, 196, 116, .28), transparent 36%),
            radial-gradient(circle at center, rgba(255, 255, 255, .08), transparent 56%);
          pointer-events: none;
          opacity: .9;
        }

        .core-shell::after {
          content: "";
          position: absolute;
          inset: 0;
          background:
            linear-gradient(180deg, rgba(255, 255, 255, .08), transparent 22%),
            linear-gradient(90deg, rgba(255, 255, 255, .04), transparent 24%, transparent 76%, rgba(255, 255, 255, .04));
          pointer-events: none;
          mix-blend-mode: screen;
        }

        .hero-video {
          width: 100%;
          height: clamp(36rem, 64vh, 54rem);
          object-fit: cover;
          display: block;
          transform: scale(1.05);
          filter: saturate(1.08) contrast(1.06) brightness(.94);
          mask-image: linear-gradient(180deg, black 0 100%);
          -webkit-mask-image: linear-gradient(180deg, black 0 100%);
          will-change: transform;
        }

        .shimmer-frame {
          position: absolute;
          inset: 0;
          border-radius: 2rem;
          pointer-events: none;
          box-shadow:
            inset 0 0 0 1px rgba(255, 201, 118, .28),
            inset 0 0 80px rgba(255, 196, 116, .22),
            0 0 80px rgba(255, 178, 92, .1);
        }

        .hero-title {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          z-index: 8;
          width: min(1020px, 92%);
          text-align: center;
          padding: 20px 24px;
        }

        .hero-title h1 {
          font-size: clamp(4rem, 9vw, 8.8rem);
          line-height: .84;
          letter-spacing: -.08em;
          color: white;
          text-shadow: 0 16px 40px rgba(0, 0, 0, .34);
        }

        .hero-title p {
          margin-top: 18px;
          font-size: 16px;
          line-height: 1.9;
          color: rgba(255, 255, 255, .8);
          max-width: 760px;
          margin-inline: auto;
        }

        .hero-title .actions {
          margin-top: 26px;
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 12px;
        }

        .hero-title .actions button {
          height: 54px;
          padding: 0 22px;
          border: none;
          cursor: pointer;
          text-transform: uppercase;
          letter-spacing: .26em;
          font-size: 10px;
        }

        .hero-title .chips {
          margin-top: 18px;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 10px;
        }

        .hero-title .chips span {
          padding: 10px 12px;
          border-radius: 999px;
          background: rgba(255, 255, 255, .08);
          border: 1px solid rgba(255, 255, 255, .08);
          color: rgba(255, 255, 255, .74);
          text-transform: uppercase;
          letter-spacing: .2em;
          font-size: 10px;
        }

        .glow-left,
        .glow-right {
          position: absolute;
          top: 50%;
          width: 20%;
          height: 42%;
          pointer-events: none;
          transform: translateY(-50%);
          filter: blur(22px);
          opacity: .9;
        }

        .glow-left {
          left: 0;
          background: radial-gradient(circle, rgba(255, 193, 98, .22), transparent 68%);
        }

        .glow-right {
          right: 0;
          background: radial-gradient(circle, rgba(255, 255, 255, .09), transparent 68%);
        }

        .section {
          position: relative;
          margin-top: -22px;
          padding: 120px 0;
        }

        .section-heading {
          display: flex;
          justify-content: space-between;
          gap: 20px;
          align-items: flex-end;
          margin-bottom: 26px;
        }

        .section-heading h2 {
          font-size: clamp(3rem, 6vw, 6.2rem);
          line-height: .88;
          letter-spacing: -.08em;
          color: white;
        }

        .section-heading p {
          max-width: 460px;
          color: rgba(255, 255, 255, .68);
          line-height: 1.95;
        }

        .section-heading .tag,
        .anatomy-head .tag,
        .portfolio-head .tag {
          text-transform: uppercase;
          letter-spacing: .34em;
          font-size: 10px;
          color: rgba(255, 255, 255, .52);
          margin-bottom: 18px;
        }

        .blueprint {
          position: relative;
          overflow: hidden;
          border-top: 1px solid rgba(255, 255, 255, .08);
          border-bottom: 1px solid rgba(255, 255, 255, .08);
          background:
            linear-gradient(180deg, rgba(48, 49, 55, .96), rgba(28, 30, 35, .98));
          box-shadow: 0 28px 90px rgba(0, 0, 0, .26);
          z-index: 3;
        }

        .blueprint-grid {
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          gap: 12px;
          padding: 14px;
        }

        .tile {
          position: relative;
          overflow: hidden;
          min-height: 180px;
          border: 1px solid rgba(255, 255, 255, .08);
          background:
            linear-gradient(180deg, rgba(255, 255, 255, .05), rgba(255, 255, 255, .02));
          box-shadow: 0 16px 44px rgba(0, 0, 0, .18);
        }

        .tile::before {
          content: "";
          position: absolute;
          inset: 0;
          background:
            linear-gradient(180deg, rgba(255, 255, 255, .04), transparent 28%),
            repeating-linear-gradient(90deg, rgba(255, 255, 255, .05) 0 1px, transparent 1px 18px);
          opacity: .16;
          pointer-events: none;
        }

        .tile .inner {
          position: relative;
          z-index: 2;
          height: 100%;
          padding: 18px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 18px;
        }

        .tile .label {
          text-transform: uppercase;
          letter-spacing: .3em;
          font-size: 10px;
          color: rgba(255, 255, 255, .54);
        }

        .tile h3 {
          font-size: clamp(1.7rem, 3vw, 3.3rem);
          line-height: .92;
          letter-spacing: -.05em;
          color: white;
        }

        .tile p {
          color: rgba(255, 255, 255, .72);
          line-height: 1.9;
          max-width: 36ch;
        }

        .tile .mini {
          display: flex;
          justify-content: space-between;
          gap: 14px;
          align-items: flex-end;
          font-family: "IBM Plex Mono", monospace;
          text-transform: uppercase;
          letter-spacing: .24em;
          font-size: 10px;
          color: rgba(255, 255, 255, .5);
        }

        .tile .metric {
          font-size: 42px;
          line-height: 1;
          letter-spacing: -.06em;
          color: #fff;
        }

        .tile.a {
          grid-column: span 5;
          min-height: 220px;
        }

        .tile.b {
          grid-column: span 4;
          min-height: 220px;
        }

        .tile.c {
          grid-column: span 3;
          min-height: 220px;
        }

        .tile.d {
          grid-column: span 4;
          min-height: 260px;
        }

        .tile.e {
          grid-column: span 8;
          min-height: 260px;
        }

        .tile.f {
          grid-column: span 6;
          min-height: 190px;
        }

        .tile.g {
          grid-column: span 6;
          min-height: 190px;
        }

        .material-anatomy {
          position: relative;
          overflow: hidden;
          background:
            radial-gradient(circle at 12% 10%, rgba(255, 190, 110, .12), transparent 16%),
            linear-gradient(180deg, rgba(20, 21, 24, .96), rgba(10, 11, 13, 1));
          z-index: 2;
          border-top: 1px solid rgba(255, 255, 255, .08);
          border-bottom: 1px solid rgba(255, 255, 255, .08);
        }

        .anatomy-shell {
          width: min(1680px, calc(100% - 28px));
          margin: 0 auto;
          padding: 36px 0 42px;
        }

        .anatomy-head {
          display: flex;
          justify-content: space-between;
          gap: 20px;
          align-items: flex-end;
          margin-bottom: 22px;
          padding-inline: 2px;
        }

        .anatomy-head h2 {
          font-size: clamp(3rem, 6vw, 6rem);
          line-height: .88;
          letter-spacing: -.08em;
          color: white;
        }

        .anatomy-head p {
          max-width: 460px;
          color: rgba(255, 255, 255, .68);
          line-height: 1.95;
        }

        .anatomy-stage {
          display: grid;
          grid-template-columns: 1.1fr .9fr;
          gap: 16px;
          align-items: stretch;
        }

        .wall-view {
          position: relative;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, .08);
          background:
            linear-gradient(180deg, rgba(255, 255, 255, .05), rgba(255, 255, 255, .02)),
            linear-gradient(135deg, rgba(255, 190, 108, .08), transparent 40%);
          min-height: 720px;
          padding: 22px;
          box-shadow: 0 22px 60px rgba(0, 0, 0, .25);
        }

        .cross-section {
          position: absolute;
          inset: 22px;
          border-radius: 3px;
          background:
            linear-gradient(90deg, rgba(224, 198, 167, .14) 0 16%, rgba(150, 142, 135, .14) 16% 33%, rgba(74, 73, 78, .16) 33% 54%, rgba(109, 92, 70, .16) 54% 76%, rgba(222, 183, 115, .18) 76% 100%),
            linear-gradient(180deg, rgba(255, 255, 255, .04), rgba(255, 255, 255, .015));
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, .08);
        }

        .cross-section .layer {
          position: absolute;
          left: 0;
          right: 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 22px;
          border-top: 1px solid rgba(255, 255, 255, .08);
          border-bottom: 1px solid rgba(0, 0, 0, .12);
          font-family: "IBM Plex Mono", monospace;
          text-transform: uppercase;
          letter-spacing: .22em;
          font-size: 10px;
          color: rgba(255, 255, 255, .78);
          transition: transform .4s ease, opacity .4s ease;
          opacity: .65;
        }

        .cross-section .layer.active {
          transform: translateX(8px);
          opacity: 1;
        }

        .cross-section .layer span:last-child {
          color: rgba(255, 255, 255, .55);
        }

        .cross-section .l1 {
          top: 0;
          height: 15%;
          background: rgba(208, 169, 122, .28);
        }

        .cross-section .l2 {
          top: 15%;
          height: 16%;
          background: rgba(126, 111, 92, .24);
        }

        .cross-section .l3 {
          top: 31%;
          height: 18%;
          background: rgba(43, 54, 60, .28);
        }

        .cross-section .l4 {
          top: 49%;
          height: 17%;
          background: rgba(99, 82, 58, .26);
        }

        .cross-section .l5 {
          top: 66%;
          height: 18%;
          background: rgba(210, 171, 97, .26);
        }

        .cross-section .l6 {
          top: 84%;
          height: 16%;
          background: rgba(255, 255, 255, .06);
        }

        .cross-overlay {
          position: absolute;
          inset: auto 22px 22px 22px;
          padding: 16px 18px;
          border: 1px solid rgba(255, 193, 119, .22);
          background: rgba(17, 17, 19, .52);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          color: white;
        }

        .cross-overlay .k,
        .detail-card .k {
          text-transform: uppercase;
          letter-spacing: .3em;
          font-size: 10px;
          color: rgba(255, 255, 255, .58);
        }

        .cross-overlay .v,
        .detail-card .v {
          margin-top: 10px;
          font-size: clamp(1.8rem, 3vw, 3rem);
          line-height: 1;
          letter-spacing: -.06em;
        }

        .anatomy-copy {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .detail-card {
          padding: 20px;
          min-height: calc(33.33% - 10px);
          border: 1px solid rgba(255, 255, 255, .08);
          background:
            linear-gradient(180deg, rgba(255, 255, 255, .05), rgba(255, 255, 255, .015));
          box-shadow: 0 18px 44px rgba(0, 0, 0, .22);
        }

        .detail-card p {
          margin-top: 12px;
          color: rgba(255, 255, 255, .68);
          line-height: 1.85;
        }

        .portfolio {
          position: relative;
          z-index: 4;
          background:
            radial-gradient(circle at top left, rgba(255, 198, 116, .1), transparent 16%),
            linear-gradient(180deg, rgba(31, 29, 28, 1), rgba(20, 19, 18, 1));
          padding: 120px 0;
        }

        .portfolio-shell {
          width: min(1680px, calc(100% - 28px));
          margin: 0 auto;
        }

        .portfolio-head {
          display: flex;
          justify-content: space-between;
          gap: 20px;
          align-items: flex-end;
          margin-bottom: 24px;
        }

        .portfolio-head h2 {
          font-size: clamp(3rem, 6vw, 6rem);
          line-height: .88;
          letter-spacing: -.08em;
          color: white;
        }

        .portfolio-head p {
          max-width: 470px;
          color: rgba(255, 255, 255, .68);
          line-height: 1.95;
        }

        .monoliths {
          display: grid;
          gap: 16px;
        }

        .monolith {
          position: relative;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, .08);
          background:
            linear-gradient(180deg, rgba(255, 255, 255, .04), rgba(255, 255, 255, .015)),
            linear-gradient(135deg, rgba(255, 200, 120, .06), transparent 42%);
          box-shadow: 0 26px 80px rgba(0, 0, 0, .26);
          min-height: 290px;
          transition: transform .5s cubic-bezier(.16, 1, .3, 1), border-color .35s ease;
        }

        .monolith:hover {
          transform: translateY(-3px);
          border-color: rgba(255, 200, 120, .16);
        }

        .monolith .bg {
          position: absolute;
          inset: 0;
          opacity: .96;
          background-size: cover;
          background-position: center;
          filter: saturate(1.02) contrast(1.04) brightness(.86);
        }

        .monolith .veil {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(90deg, rgba(17, 17, 19, .94) 0 42%, rgba(17, 17, 19, .6) 62%, rgba(17, 17, 19, .1) 100%),
            linear-gradient(180deg, rgba(0, 0, 0, .08), rgba(0, 0, 0, .35));
        }

        .monolith .content {
          position: relative;
          z-index: 2;
          padding: 26px;
          display: grid;
          grid-template-columns: 1.1fr .9fr;
          gap: 20px;
          min-height: 290px;
          align-items: end;
        }

        .monolith h3 {
          font-size: clamp(2.6rem, 5vw, 5.2rem);
          line-height: .9;
          letter-spacing: -.07em;
          color: white;
        }

        .monolith .meta {
          display: grid;
          gap: 10px;
          justify-items: end;
          align-content: end;
          text-align: right;
          color: rgba(255, 255, 255, .74);
        }

        .meta .m {
          padding: 10px 12px;
          border: 1px solid rgba(255, 255, 255, .08);
          background: rgba(255, 255, 255, .05);
          text-transform: uppercase;
          letter-spacing: .24em;
          font-size: 10px;
        }

        .monolith .description {
          max-width: 58ch;
          margin-top: 14px;
          color: rgba(255, 255, 255, .72);
          line-height: 1.9;
        }

        .monolith .actions {
          margin-top: 20px;
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }

        .monolith .actions button {
          height: 44px;
          padding: 0 16px;
          border: none;
          cursor: pointer;
          text-transform: uppercase;
          letter-spacing: .24em;
          font-size: 10px;
        }

        .monolith .details {
          display: none;
          grid-template-columns: repeat(4, 1fr);
          gap: 14px;
          padding: 0 26px 26px;
        }

        .monolith.open .details {
          display: grid;
        }

        .spec {
          padding: 16px;
          border: 1px solid rgba(255, 255, 255, .08);
          background: rgba(255, 255, 255, .04);
          font-family: "IBM Plex Mono", monospace;
          font-size: 11px;
          line-height: 1.8;
          color: rgba(255, 255, 255, .76);
        }

        .spec strong {
          display: block;
          margin-bottom: 8px;
          font-family: inherit;
          color: white;
          text-transform: uppercase;
          letter-spacing: .2em;
        }

        .technical-footer {
          position: relative;
          overflow: hidden;
          padding: 120px 0 90px;
          background:
            linear-gradient(180deg, rgba(12, 12, 13, 1), rgba(7, 7, 8, 1));
          color: white;
        }

        .technical-footer::before {
          content: "";
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle at 20% 12%, rgba(255, 197, 112, .12), transparent 16%),
            linear-gradient(180deg, transparent 0 66%, rgba(255, 255, 255, .03) 100%);
          pointer-events: none;
        }

        .footer-shell {
          position: relative;
          z-index: 2;
          width: min(1680px, calc(100% - 28px));
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1.15fr .85fr;
          gap: 18px;
        }

        .footer-card {
          border: 1px solid rgba(255, 255, 255, .08);
          background: rgba(255, 255, 255, .03);
          box-shadow: 0 20px 70px rgba(0, 0, 0, .24);
          padding: 24px;
        }

        .footer-card h2 {
          font-size: clamp(3rem, 6vw, 6rem);
          line-height: .9;
          letter-spacing: -.08em;
        }

        .footer-card p {
          margin-top: 16px;
          color: rgba(255, 255, 255, .68);
          line-height: 1.95;
          max-width: 740px;
        }

        .map-grid {
          display: grid;
          grid-template-columns: 1.2fr .8fr;
          gap: 14px;
        }

        .map {
          padding: 18px;
          border: 1px solid rgba(255, 255, 255, .08);
          background:
            linear-gradient(180deg, rgba(255, 255, 255, .04), rgba(255, 255, 255, .015)),
            linear-gradient(135deg, rgba(255, 200, 120, .08), transparent 42%);
          min-height: 260px;
          overflow: hidden;
          position: relative;
        }

        .map::before {
          content: "";
          position: absolute;
          inset: 0;
          background:
            repeating-linear-gradient(90deg, rgba(255, 255, 255, .05) 0 1px, transparent 1px 34px),
            repeating-linear-gradient(180deg, rgba(255, 255, 255, .05) 0 1px, transparent 1px 28px);
          opacity: .12;
          pointer-events: none;
        }

        .badges {
          display: grid;
          gap: 14px;
        }

        .badge {
          min-height: 76px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          padding: 16px 18px;
          border: 1px solid rgba(255, 255, 255, .08);
          background: rgba(255, 255, 255, .04);
          text-transform: uppercase;
          letter-spacing: .22em;
          font-size: 10px;
          color: rgba(255, 255, 255, .72);
        }

        .footer-links {
          margin-top: 18px;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
        }

        .footer-links a {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 14px 15px;
          border: 1px solid rgba(255, 255, 255, .08);
          background: rgba(255, 255, 255, .03);
          text-decoration: none;
          color: rgba(255, 255, 255, .8);
          font-family: "IBM Plex Mono", monospace;
          text-transform: uppercase;
          letter-spacing: .2em;
          font-size: 10px;
          transition: .25s ease;
        }

        .footer-links a:hover {
          background: rgba(255, 255, 255, .06);
          color: #fff;
        }

        .footer-line {
          margin-top: 18px;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, .2), transparent);
        }

        .footer-bottom {
          margin-top: 18px;
          display: flex;
          justify-content: space-between;
          gap: 20px;
          flex-wrap: wrap;
          color: rgba(255, 255, 255, .52);
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: .22em;
        }

        .reveal {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity .8s ease, transform .8s cubic-bezier(.16, 1, .3, 1);
        }

        .reveal.in {
          opacity: 1;
          transform: translateY(0);
        }

        @keyframes sheen {
          to {
            transform: translateX(240%) rotate(12deg);
          }
        }

        @media (max-width: 1180px) {
          .top-rail {
            grid-template-columns: 1fr auto;
          }

          .rail-nav {
            display: none;
          }

          .hero-grid {
            grid-template-columns: 1fr;
          }

          .hero-core {
            grid-column: 1 / -1;
          }

          .telemetry {
            position: static;
            width: 100%;
            transform: none !important;
          }

          .glow-left,
          .glow-right {
            display: none;
          }

          .section-heading,
          .anatomy-head,
          .portfolio-head,
          .footer-shell {
            grid-template-columns: 1fr;
          }

          .anatomy-stage,
          .footer-shell {
            grid-template-columns: 1fr;
          }

          .tile.a,
          .tile.b,
          .tile.c,
          .tile.d,
          .tile.e,
          .tile.f,
          .tile.g {
            grid-column: span 6;
          }

          .portfolio .monolith .content {
            grid-template-columns: 1fr;
          }

          .monolith .meta {
            justify-items: start;
            text-align: left;
          }

          .monolith .details {
            grid-template-columns: repeat(2, 1fr);
          }

          .footer-links,
          .map-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 760px) {
          .top-rail,
          .section-shell,
          .anatomy-shell,
          .portfolio-shell,
          .footer-shell {
            width: min(100% - 18px, 1680px);
          }

          .hero {
            padding-top: 104px;
          }

          .hero-title h1 {
            font-size: clamp(3rem, 13vw, 6.2rem);
          }

          .hero-video {
            height: clamp(28rem, 52vh, 42rem);
          }

          .hero-title {
            width: calc(100% - 12px);
            padding: 16px 14px;
          }

          .section {
            padding: 94px 0;
          }

          .tile.a,
          .tile.b,
          .tile.c,
          .tile.d,
          .tile.e,
          .tile.f,
          .tile.g {
            grid-column: span 12;
          }

          .blueprint-grid {
            grid-template-columns: 1fr;
          }

          .monolith .details {
            grid-template-columns: 1fr;
          }

          .footer-bottom {
            gap: 10px;
          }
        }
      `}</style>

      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute left-[6%] top-[10%] h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,rgba(255,193,102,.16),transparent_70%)] blur-3xl"></div>
        <div className="absolute right-[4%] bottom-[10%] h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,.06),transparent_70%)] blur-3xl"></div>
      </div>

      <header className="top-rail">
        <div className="brand">
          <div className="brand-mark">
            <Icon icon="ph:building-bold" className="text-xl text-[#f0b36b]" />
          </div>
          <div className="brand-copy">
            <div className="k">Lignum Glass</div>
            <div className="v">Master-Built Regenerative Structures</div>
          </div>
        </div>

        <nav className="rail-nav">
          <a href="#blueprint">Blueprint</a>
          <a href="#anatomy">Anatomy</a>
          <a href="#portfolio">Portfolio</a>
          <a href="#footer">Footer</a>
        </nav>

        <div className="top-stats">
          <div className="meter">
            <span />
          </div>
          <button className="amber-button h-10 px-4 text-[10px] uppercase tracking-[0.26em]">
            Request Data Room
          </button>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="glow-left"></div>
          <div className="glow-right"></div>

          <div className="section-shell">
            <div className="hero-grid">
              <div
                className="telemetry reveal"
                style={{ left: 0, top: "22%", transform: "translateY(-50%)" }}
              >
                <div className="k">Energy efficiency</div>
                <div className="v">92%</div>
                <div className="d">Photon-capturing facades calibrated for passive gain.</div>
              </div>

              <div
                className="telemetry reveal"
                style={{ right: 0, top: "30%", transform: "translateY(-50%)" }}
              >
                <div className="k">Structural integrity</div>
                <div className="v">A+</div>
                <div className="d">High-thermal mass concrete locking the monolith with precision.</div>
              </div>

              <div
                className="telemetry reveal"
                style={{ left: 0, bottom: "16%", transform: "translateY(50%)" }}
              >
                <div className="k">Material load</div>
                <div className="v">4.8k</div>
                <div className="d">Translucent timber, solar glass, and carbon-sequestering assemblies.</div>
              </div>

              <div
                className="telemetry reveal"
                style={{ right: 0, bottom: "18%", transform: "translateY(50%)" }}
              >
                <div className="k">Build phase</div>
                <div className="v">Live</div>
                <div className="d">Crane rhythm, joint locking, and site telemetry synchronized in real time.</div>
              </div>

              <div className="hero-core">
                <div className="core-shell">
                  <video
                    ref={heroVideoRef}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="hero-video"
                  >
                    <source src="/video.mp4" type="video/mp4" />
                  </video>
                  <div className="shimmer-frame"></div>

                  <div className="hero-title">
                    <h1 className="mt-4 drop-shadow-[0_4px_6px_rgba(0,0,0,1)] drop-shadow-[0_15px_30px_rgba(0,0,0,0.6)]">
                      The villa becomes the machine.
                    </h1>

                    <p className="text-white/100 drop-shadow-[0_2px_2px_rgba(0,0,0,1)] drop-shadow-[0_4px_10px_rgba(0,0,0,1)] drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)]">
                      A central portal for translucent timber engineering, solar glass geometry, and the density of master-built regenerative structures.
                    </p>

                    <div className="chips mt-6 flex gap-3">
                      <span className="font-medium drop-shadow-[0_1px_2px_rgba(0,0,0,1)] drop-shadow-[0_8px_15px_rgba(0,0,0,0.9)]">
                        Amber Glow
                      </span>
                      <span className="font-medium drop-shadow-[0_1px_2px_rgba(0,0,0,1)] drop-shadow-[0_8px_15px_rgba(0,0,0,0.9)]">
                        Concrete Grey
                      </span>
                      <span className="font-medium drop-shadow-[0_1px_2px_rgba(0,0,0,1)] drop-shadow-[0_8px_15px_rgba(0,0,0,0.9)]">
                        Golden Oak
                      </span>
                    </div>

                    <div className="actions mt-8">
                      <button className="amber-button px-7 shadow-[0_20px_40px_rgba(0,0,0,0.5)]">
                        Explore the Monolith
                      </button>

                      <button className="dense-panel rounded-[1rem] px-7 text-[10px] uppercase tracking-[0.28em] text-white drop-shadow-[0_4px_10px_rgba(0,0,0,0.6)]">
                        View Technical Sheet
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="blueprint" className="section">
          <div className="section-shell">
            <div className="section-heading reveal">
              <div>
                <div className="tag">The Blueprint Grid</div>
                <h2 className="serif">Dense, measurable, and structurally complete.</h2>
              </div>
              <p>
                Floor plans, CAD snippets, and material samples are arranged in a compact mosaic so every pixel carries built-quality.
              </p>
            </div>
          </div>

          <div className="blueprint">
            <div className="section-shell">
              <div className="blueprint-grid">
                <article className="tile a reveal">
                  <div className="inner">
                    <div>
                      <div className="label">Floor plan / level 01</div>
                      <h3 className="serif mt-4">Plan geometry for solar glass envelopes.</h3>
                    </div>
                    <div className="mini">
                      <span>140 m²</span>
                      <span className="metric serif">A1</span>
                    </div>
                  </div>
                </article>

                <article className="tile b reveal">
                  <div className="inner">
                    <div>
                      <div className="label">CAD section / facade</div>
                      <h3 className="serif mt-4">Translucent timber ribs.</h3>
                    </div>
                    <div className="mini">
                      <span>load path</span>
                      <span className="metric serif">B2</span>
                    </div>
                  </div>
                </article>

                <article className="tile c reveal">
                  <div className="inner">
                    <div>
                      <div className="label">Material sample</div>
                      <h3 className="serif mt-4">Oiled oak + glass.</h3>
                    </div>
                    <div className="mini">
                      <span>ratio</span>
                      <span className="metric serif">60/40</span>
                    </div>
                  </div>
                </article>

                <article className="tile d reveal">
                  <div className="inner">
                    <div>
                      <div className="label">Energy study</div>
                      <h3 className="serif mt-4">Photon-capturing facades tuned to sunset gain.</h3>
                    </div>
                    <p>
                      Thermal behavior modeled around exterior light intensity and seasonal solar shift.
                    </p>
                  </div>
                </article>

                <article className="tile e reveal">
                  <div className="inner">
                    <div>
                      <div className="label">Monolith detail / section cut</div>
                      <h3 className="serif mt-4">High-thermal mass concrete anchors the frame.</h3>
                    </div>
                    <p>
                      Thick, quiet, and engineered to retain heat while preserving the luminous balance of the villa.
                    </p>
                  </div>
                </article>

                <article className="tile f reveal">
                  <div className="inner">
                    <div>
                      <div className="label">Certifications</div>
                      <h3 className="serif mt-4">Net-positive targets.</h3>
                    </div>
                    <div className="mini">
                      <span>LEED</span>
                      <span className="metric serif">Gold</span>
                    </div>
                  </div>
                </article>

                <article className="tile g reveal">
                  <div className="inner">
                    <div>
                      <div className="label">Structural luminosity</div>
                      <h3 className="serif mt-4">Light, made load-bearing.</h3>
                    </div>
                    <div className="mini">
                      <span>status</span>
                      <span className="metric serif">Stable</span>
                    </div>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </section>

        <section id="anatomy" ref={anatomyRef} className="material-anatomy">
          <div className="anatomy-shell">
            <div className="anatomy-head reveal">
              <div>
                <div className="tag">Material Anatomy</div>
                <h2 className="serif">A scroll-through cross-section of the wall itself.</h2>
              </div>
              <p>
                Layer-by-layer construction reveals insulation, timber, concrete, and glass as a continuous technical narrative rather than a decorative diagram.
              </p>
            </div>

            <div className="anatomy-stage">
              <div className="wall-view reveal">
                <div className="cross-section">
                  {[
                    { cls: "l1", left: "1. Outer solar glass", right: "low-e" },
                    { cls: "l2", left: "2. Ventilated cavity", right: "air gap" },
                    { cls: "l3", left: "3. Structural timber", right: "glulam" },
                    { cls: "l4", left: "4. Thermal insulation", right: "high density" },
                    { cls: "l5", left: "5. High-thermal mass concrete", right: "core" },
                    { cls: "l6", left: "6. Interior finish", right: "oak lining" },
                  ].map((layer, idx) => (
                    <div
                      key={layer.cls}
                      ref={(el) => {
                        layerRefs.current[idx] = el;
                      }}
                      className={`layer ${layer.cls} ${idx === 0 ? "active" : ""}`}
                    >
                      <span>{layer.left}</span>
                      <span>{layer.right}</span>
                    </div>
                  ))}
                </div>

                <div className="cross-overlay">
                  <div className="k">Cross-section telemetry</div>
                  <div className="v serif">U-value 0.16 · load factor 98%</div>
                </div>
              </div>

              <div className="anatomy-copy">
                <div className="detail-card reveal">
                  <div className="k">Layer 01</div>
                  <div className="v serif">Photon-capturing facades</div>
                  <p>Glazing controls daylight with a calibrated sheen that softens heat gain while preserving clarity.</p>
                </div>

                <div className="detail-card reveal">
                  <div className="k">Layer 02</div>
                  <div className="v serif">Translucent timber engineering</div>
                  <p>Wood becomes a luminous structural instrument, balancing warmth and precision in the same assembly.</p>
                </div>

                <div className="detail-card reveal">
                  <div className="k">Layer 03</div>
                  <div className="v serif">Carbon-sequestering monoliths</div>
                  <p>The mass of the structure stores energy, stabilizes interior climate, and reinforces long-term performance.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="portfolio" className="portfolio">
          <div className="portfolio-shell">
            <div className="portfolio-head reveal">
              <div>
                <div className="tag">Portfolio Monoliths</div>
                <h2 className="serif">Massive projects that expand in place.</h2>
              </div>
              <p>
                Each monolith is a full-width statement piece with an inline expansion driven by View Transitions, preserving the scroll position and the sense of physical scale.
              </p>
            </div>

            <div className="monoliths">
              {[
                {
                  title: "Sunset villa with translucent oak ribs.",
                  subtitle: "Residence 01",
                  meta: ["Energy +24%", "Materials 7", "Integrity A+"],
                  desc: "A regenerative retreat framed by solar glass and thermal mass, designed to feel calm, heavy, and deeply luminous.",
                  specs: [
                    ["Facade", "Solar glass, low-e coating, daylight capture"],
                    ["Frame", "Translucent timber, engineered for span and warmth"],
                    ["Mass", "High-thermal concrete core, climate stabilization"],
                    ["Status", "Delivered, certified, and net-positive ready"],
                  ],
                },
                {
                  title: "Monolithic courtyard with layered oak interiors.",
                  subtitle: "Residence 02",
                  meta: ["Apertures 18", "Floors 3", "Carbon low"],
                  desc: "A deep, anchored plan with material transitions that turn the home into a sequence of luminous chambers.",
                  specs: [
                    ["Courtyard", "Ventilation, privacy, and solar moderation"],
                    ["Joinery", "Precision-locked oak assemblies"],
                    ["Envelope", "Thermal gradient management"],
                    ["Output", "Built for long-cycle performance"],
                  ],
                },
              ].map((card, index) => (
                <article
                  key={card.subtitle}
                  ref={(el) => {
                    monolithRefs.current[index] = el;
                  }}
                  className="monolith reveal"
                >
                  <div className="bg grain-concrete" />
                  <div className="veil" />
                  <div className="content">
                    <div>
                      <div className="mono text-[10px] uppercase tracking-[0.34em] text-white/58">
                        {card.subtitle}
                      </div>
                      <h3 className="serif mt-4">{card.title}</h3>
                      <p className="description">{card.desc}</p>
                      <div className="actions">
                        <button
                          className="amber-button px-5"
                          onClick={() => {
                            const current = monolithRefs.current[index];
                            if (current) toggleMonolith(current);
                          }}
                        >
                          Expand monolith
                        </button>
                        <button className="dense-panel rounded-[1rem] px-5 text-[10px] uppercase tracking-[0.28em] text-white">
                          Spec sheet
                        </button>
                      </div>
                    </div>
                    <div className="meta">
                      {card.meta.map((m) => (
                        <div key={m} className="m">
                          {m}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="details">
                    {card.specs.map(([label, value]) => (
                      <div key={label} className="spec">
                        <strong>{label}</strong>
                        {value}
                      </div>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="footer" className="technical-footer">
          <div className="footer-shell">
            <div className="footer-card reveal">
              <div className="mono text-[10px] uppercase tracking-[0.34em] text-white/54">
                Technical Footer
              </div>
              <h2 className="serif mt-5">Global project maps, certification badges, and deep links.</h2>
              <p>
                The final layer keeps the page dense with utility: maps, accreditations, contact pathways, and data-rich navigation, all held together by a monolithic material language.
              </p>

              <div className="footer-links">
                <a href="#portfolio">
                  <span>Projects</span>
                  <span>↗</span>
                </a>
                <a href="#blueprint">
                  <span>Materials</span>
                  <span>↗</span>
                </a>
                <a href="#anatomy">
                  <span>Certification</span>
                  <span>↗</span>
                </a>
              </div>

              <div className="footer-line"></div>

              <div className="footer-bottom">
                <div>Lignum Glass</div>
                <div>Amber Glow · Concrete Grey · Golden Oak</div>
                <div>Master-built regenerative structures</div>
              </div>
            </div>

            <div className="map-grid">
              <div className="map reveal">
                <div className="mono text-[10px] uppercase tracking-[0.34em] text-white/54">
                  Global project map
                </div>
                <div className="relative mt-4 h-[190px] overflow-hidden rounded-[2px] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,.03),rgba(255,255,255,.01))]">
                  <svg
                    viewBox="0 0 900 190"
                    className="absolute inset-0 h-full w-full"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M40 150 C140 70, 220 60, 310 98 S500 150, 630 76 S760 40, 860 108"
                      fill="none"
                      stroke="rgba(255,201,120,.85)"
                      strokeWidth="2"
                    />
                    <circle cx="160" cy="90" r="4" fill="rgba(255,255,255,.85)" />
                    <circle cx="312" cy="98" r="4" fill="rgba(255,255,255,.85)" />
                    <circle cx="628" cy="76" r="4" fill="rgba(255,255,255,.85)" />
                    <circle cx="840" cy="108" r="4" fill="rgba(255,255,255,.85)" />
                  </svg>
                </div>
              </div>

              <div className="badges">
                <div className="badge reveal">
                  <span>LEED</span>
                  <span>Gold</span>
                </div>
                <div className="badge reveal">
                  <span>Energy</span>
                  <span>Net+</span>
                </div>
                <div className="badge reveal">
                  <span>Structure</span>
                  <span>Class A</span>
                </div>
                <div className="badge reveal">
                  <span>Delivery</span>
                  <span>Global</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}