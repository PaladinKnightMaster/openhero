"use client";

import { Icon } from "@iconify/react";
import { useEffect, useRef, useState } from "react";

export default function VestaAtelierPage() {
  const heroVideoRef = useRef<HTMLVideoElement | null>(null);
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    document.body.dataset.theme = "dark";

    let ticking = false;

    const updateHero = () => {
      const progress = Math.min(window.scrollY / (window.innerHeight * 1.2), 1);
      const scale = 1.08 + progress * 0.16;
      const translate = progress * 16;

      if (heroVideoRef.current) {
        heroVideoRef.current.style.transform = `scale(${scale}) translateY(${translate}px)`;
      }
    };

    const handleScroll = () => {
      if (ticking) return;

      ticking = true;
      requestAnimationFrame(() => {
        updateHero();
        ticking = false;
      });
    };

    updateHero();
    window.addEventListener("scroll", handleScroll, { passive: true });

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add("in");
          }
        });
      },
      { threshold: 0.18 }
    );

    document.querySelectorAll<HTMLElement>(".reveal").forEach((el) => {
      revealObserver.observe(el);
    });

    const shelfObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add("revealed");
          }
        });
      },
      { threshold: 0.22 }
    );

    document.querySelectorAll<HTMLElement>(".shelf").forEach((el) => {
      shelfObserver.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      revealObserver.disconnect();
      shelfObserver.disconnect();
    };
  }, []);

  const toggleTheme = () => {
    const apply = () => {
      const next = darkMode ? "" : "dark";
      document.body.dataset.theme = next;
      setDarkMode((prev) => !prev);
    };

    const startViewTransition = (
      document as Document & {
        startViewTransition?: (cb: () => void) => void;
      }
    ).startViewTransition;

    if (typeof document !== "undefined" && startViewTransition) {
      startViewTransition(apply);
    } else {
      apply();
    }
  };

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[var(--slate)] font-['Inter_Tight'] text-white">
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @import url('https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;600;700;800&family=Cormorant+Garamond:wght@500;600;700&display=swap');

            :root {
              color-scheme: dark;
              --slate: oklch(18% 0.02 240);
              --slate-2: oklch(14% 0.018 240);
              --ochre: oklch(74% 0.12 68);
              --ochre-deep: oklch(56% 0.08 62);
              --oak: oklch(82% 0.08 90);
              --ink: oklch(96% 0.01 240);
              --muted: rgba(255, 255, 255, .66);
              --leaf: oklch(61% 0.12 145);
              --petal: oklch(80% 0.11 1);
            }

            body {
              margin: 0;
              overflow-x: hidden;
              background:
                radial-gradient(circle at 12% 10%, rgba(196, 145, 62, .14), transparent 18%),
                radial-gradient(circle at 84% 16%, rgba(255, 255, 255, .05), transparent 18%),
                linear-gradient(180deg, oklch(18% 0.02 240) 0%, oklch(15% 0.018 240) 55%, oklch(12% 0.016 240) 100%);
              color: white;
              font-family: 'Inter Tight', sans-serif;
            }

            body::before {
              content: '';
              position: fixed;
              inset: 0;
              pointer-events: none;
              background-image:
                linear-gradient(rgba(255, 255, 255, .035) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255, 255, 255, .035) 1px, transparent 1px),
                linear-gradient(135deg, transparent 0 48%, rgba(255, 255, 255, .02) 48% 52%, transparent 52%),
                linear-gradient(45deg, transparent 0 48%, rgba(255, 255, 255, .02) 48% 52%, transparent 52%);
              background-size: 120px 120px, 120px 120px, 280px 280px, 280px 280px;
              opacity: .22;
              z-index: -2;
            }

            body[data-theme="dark"] {
              --slate: oklch(18% 0.02 240);
              --slate-2: oklch(14% 0.018 240);
              --ochre: oklch(74% 0.12 68);
              --ochre-deep: oklch(56% 0.08 62);
              --oak: oklch(82% 0.08 90);
              --ink: oklch(96% 0.01 240);
              --muted: rgba(255, 255, 255, .66);
              --leaf: oklch(61% 0.12 145);
              --petal: oklch(80% 0.11 1);
            }

            .serif {
              font-family: 'Cormorant Garamond', serif;
              letter-spacing: -0.055em;
            }

            .copy {
              font-family: 'Inter Tight', sans-serif;
            }

            .material-panel {
              background: linear-gradient(180deg, rgba(255, 255, 255, .08), rgba(255, 255, 255, .03));
              border: 1px solid rgba(255, 255, 255, .08);
              box-shadow:
                inset 0 1px 0 rgba(255, 255, 255, .08),
                0 24px 80px rgba(0, 0, 0, .35);
              backdrop-filter: blur(20px) contrast(.98);
              -webkit-backdrop-filter: blur(20px) contrast(.98);
            }

            .smoked-glass {
              background: rgba(255, 255, 255, .07);
              backdrop-filter: blur(15px) contrast(.95);
              -webkit-backdrop-filter: blur(15px) contrast(.95);
              box-shadow:
                inset 0 1px 0 rgba(255, 255, 255, .1),
                0 20px 60px rgba(0, 0, 0, .28);
            }

            .textural-touch {
              position: relative;
              overflow: hidden;
              background:
                linear-gradient(180deg, rgba(255, 255, 255, .78), rgba(255, 255, 255, .52)),
                linear-gradient(135deg, rgba(0, 0, 0, .04), transparent 45%);
              border: 1px solid rgba(255, 255, 255, .18);
              color: #2b2319;
              box-shadow:
                inset 0 1px 0 rgba(255, 255, 255, .68),
                inset 0 -12px 16px rgba(125, 90, 40, .08),
                0 20px 40px rgba(0, 0, 0, .25);
              transition: transform .5s cubic-bezier(.16, 1, .3, 1), box-shadow .5s ease, background .4s ease;
            }

            .textural-touch::before {
              content: '';
              position: absolute;
              inset: 0;
              background-image:
                linear-gradient(135deg, rgba(0, 0, 0, .08) 0 1px, transparent 1px 100%),
                linear-gradient(45deg, rgba(0, 0, 0, .05) 0 1px, transparent 1px 100%);
              opacity: .2;
              mix-blend-mode: multiply;
              pointer-events: none;
            }

            .textural-touch::after {
              content: '';
              position: absolute;
              inset: -120%;
              background: linear-gradient(120deg, transparent 44%, rgba(255, 255, 255, .7) 50%, transparent 56%);
              transform: translateX(-140%) rotate(12deg);
              animation: sheen 9s ease-in-out infinite;
              pointer-events: none;
              mix-blend-mode: screen;
            }

            .textural-touch:hover {
              transform: translateY(-4px);
              box-shadow:
                inset 0 1px 0 rgba(255, 255, 255, .74),
                inset 0 -12px 16px rgba(125, 90, 40, .1),
                0 28px 50px rgba(0, 0, 0, .28);
            }

            .textural-touch:active {
              transform: translateY(1px) scale(.99);
            }

            .slat-portal {
              position: absolute;
              inset: 0;
              overflow: hidden;
              mask-image: linear-gradient(90deg, black 0 100%);
              -webkit-mask-image: linear-gradient(90deg, black 0 100%);
            }

            .slat-portal::before {
              content: '';
              position: absolute;
              inset: 0;
              background:
                linear-gradient(180deg, rgba(0, 0, 0, .06), rgba(0, 0, 0, .38)),
                radial-gradient(circle at 50% 30%, rgba(255, 195, 120, .16), transparent 22%);
              z-index: 2;
              pointer-events: none;
            }

            .slat-mask::after {
              content: '';
              position: absolute;
              inset: 0;
              background:
                linear-gradient(180deg, rgba(18, 18, 20, .1), rgba(18, 18, 20, .26)),
                radial-gradient(circle at center, transparent 35%, rgba(0, 0, 0, .38) 100%);
              pointer-events: none;
            }

            .hero-video {
              position: absolute;
              inset: 0;
              width: 100%;
              height: 100%;
              object-fit: cover;
              transform: scale(1.08);
              filter: saturate(1.08) contrast(1.05) brightness(.86);
              will-change: transform;
            }

            .hero {
              position: relative;
              min-height: 100svh;
              overflow: hidden;
              background: var(--slate);
            }

            .hero-copy {
              backdrop-filter: blur(15px) contrast(.95);
              -webkit-backdrop-filter: blur(15px) contrast(.95);
              background: rgba(17, 17, 19, .36);
              box-shadow:
                inset 0 1px 0 rgba(255, 255, 255, .08),
                0 30px 80px rgba(0, 0, 0, .35);
              border: 1px solid rgba(255, 255, 255, .08);
            }

            .condense {
              opacity: 0;
              filter: blur(18px);
              transform: translateY(24px);
              animation: condense 1.2s cubic-bezier(.16, 1, .3, 1) forwards;
            }

            .condense:nth-child(2) {
              animation-delay: .14s;
            }

            .condense:nth-child(3) {
              animation-delay: .26s;
            }

            .condense:nth-child(4) {
              animation-delay: .38s;
            }

            .header-rail {
              position: fixed;
              left: 20px;
              top: 20px;
              bottom: 20px;
              z-index: 70;
              width: 88px;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              padding: 18px 14px;
              background: rgba(20, 20, 22, .46);
              backdrop-filter: blur(24px) contrast(.98);
              -webkit-backdrop-filter: blur(24px) contrast(.98);
              border: 1px solid rgba(255, 255, 255, .08);
              box-shadow: 0 20px 60px rgba(0, 0, 0, .28);
            }

            .rail-brand {
              writing-mode: vertical-rl;
              transform: rotate(180deg);
              text-transform: uppercase;
              letter-spacing: .34em;
              font-size: 10px;
              color: rgba(255, 255, 255, .68);
              align-self: center;
            }

            .rail-nav {
              display: flex;
              flex-direction: column;
              gap: 18px;
              align-items: center;
            }

            .rail-nav a {
              writing-mode: vertical-rl;
              transform: rotate(180deg);
              text-decoration: none;
              text-transform: uppercase;
              letter-spacing: .22em;
              font-size: 10px;
              color: rgba(255, 255, 255, .58);
              transition: .3s ease;
            }

            .rail-nav a:hover {
              color: rgba(255, 214, 146, .92);
            }

            .rail-mark {
              width: 100%;
              aspect-ratio: 1;
              display: grid;
              place-items: center;
              background: rgba(255, 255, 255, .06);
              border: 1px solid rgba(255, 255, 255, .08);
            }

            .top-meter {
              position: fixed;
              right: 24px;
              top: 20px;
              z-index: 70;
              display: flex;
              align-items: center;
              gap: 14px;
              padding: 14px 18px;
              background: rgba(20, 20, 22, .46);
              backdrop-filter: blur(24px) contrast(.98);
              -webkit-backdrop-filter: blur(24px) contrast(.98);
              border: 1px solid rgba(255, 255, 255, .08);
              box-shadow: 0 18px 50px rgba(0, 0, 0, .22);
            }

            .meter-bar {
              width: 180px;
              height: 8px;
              background: rgba(255, 255, 255, .1);
              overflow: hidden;
            }

            .meter-bar span {
              display: block;
              height: 100%;
              width: 68%;
              background: linear-gradient(90deg, rgba(214, 154, 76, .8), rgba(255, 223, 180, .95));
            }

            .hero-main {
              position: relative;
              z-index: 4;
              min-height: 100svh;
              display: grid;
              place-items: center;
              padding: 120px 24px 48px 140px;
              text-align: center;
            }

            .hero-inner {
              max-width: 980px;
            }

            .eyebrow {
              display: inline-flex;
              align-items: center;
              gap: 10px;
              padding: 10px 16px;
              border-radius: 999px;
              background: rgba(255, 255, 255, .12);
              color: white;
              text-transform: uppercase;
              letter-spacing: .28em;
              font-size: 10px;
              backdrop-filter: blur(15px) contrast(.95);
              border: 1px solid rgba(255, 255, 255, .08);
            }

            .eyebrow span {
              width: 8px;
              height: 8px;
              background: var(--ochre);
              display: inline-block;
            }

            .title {
              margin-top: 22px;
              font-size: clamp(4.8rem, 12vw, 10.6rem);
              line-height: .82;
              letter-spacing: -.08em;
              color: white;
              text-shadow: 0 16px 38px rgba(0, 0, 0, .3);
            }

            .slat {
              display: inline-block;
              animation: slatIn 1.2s cubic-bezier(.16, 1, .3, 1) forwards;
              opacity: 0;
              transform: translateY(42px);
            }

            .slat:nth-child(2) {
              animation-delay: .16s;
            }

            .slat:nth-child(3) {
              animation-delay: .3s;
            }

            .hero-text {
              margin: 28px auto 0;
              max-width: 720px;
              font-size: 18px;
              line-height: 1.9;
              color: rgba(255, 255, 255, .82);
              padding: 20px 24px;
              border-radius: 1.5rem;
              background: rgba(255, 255, 255, .06);
              border: 1px solid rgba(255, 255, 255, .08);
              backdrop-filter: blur(15px) contrast(.95);
            }

            .hero-actions {
              display: flex;
              gap: 14px;
              justify-content: center;
              flex-wrap: wrap;
              margin-top: 34px;
            }

            .btn-a {
              height: 56px;
              padding-inline: 30px;
              cursor: pointer;
              border: none;
              color: #2c2317;
              font-size: 10px;
              letter-spacing: .26em;
              text-transform: uppercase;
            }

            .btn-b {
              height: 56px;
              padding-inline: 30px;
              cursor: pointer;
              font-size: 10px;
              letter-spacing: .26em;
              text-transform: uppercase;
              color: white;
              background: rgba(255, 255, 255, .06);
              border: 1px solid rgba(255, 255, 255, .12);
              backdrop-filter: blur(15px) contrast(.95);
            }

            .panel-space {
              padding: 120px 0;
            }

            .shell {
              width: min(1480px, calc(100% - 48px));
              margin: 0 auto;
            }

            .sofa-split {
              display: grid;
              grid-template-columns: 1.25fr .75fr;
              min-height: 760px;
              background: linear-gradient(180deg, rgba(255, 255, 255, .04), rgba(255, 255, 255, .02));
              box-shadow: 0 24px 70px rgba(0, 0, 0, .18);
              overflow: hidden;
            }

            .ochre-block {
              background:
                linear-gradient(180deg, rgba(215, 160, 84, .92), rgba(180, 125, 61, .88)),
                linear-gradient(135deg, rgba(255, 255, 255, .16), transparent 45%);
              position: relative;
            }

            .charcoal-block {
              background:
                linear-gradient(180deg, rgba(16, 16, 18, .96), rgba(28, 28, 31, .92)),
                linear-gradient(135deg, rgba(255, 255, 255, .06), transparent 45%);
              position: relative;
            }

            .sofa-copy {
              position: relative;
              z-index: 2;
              padding: 76px;
              display: flex;
              flex-direction: column;
              justify-content: center;
              background:
                linear-gradient(90deg, rgba(255, 255, 255, .08), rgba(255, 255, 255, .02));
              backdrop-filter: blur(10px);
            }

            .sofa-copy h2,
            .module-head h2,
            .botanical h2 {
              font-size: clamp(2.8rem, 5.5vw, 6rem);
              line-height: .9;
              letter-spacing: -.06em;
              color: white;
            }

            .sofa-copy p {
              margin-top: 22px;
              max-width: 640px;
              color: rgba(255, 255, 255, .86);
              line-height: 2;
              font-size: 16px;
            }

            .sofa-label {
              text-transform: uppercase;
              letter-spacing: .3em;
              font-size: 10px;
              color: rgba(255, 255, 255, .7);
            }

            .sofa-meta {
              display: flex;
              flex-wrap: wrap;
              gap: 12px;
              margin-top: 28px;
            }

            .sofa-meta span {
              padding: 12px 16px;
              background: rgba(255, 255, 255, .1);
              border: 1px solid rgba(255, 255, 255, .08);
              font-size: 10px;
              letter-spacing: .2em;
              text-transform: uppercase;
            }

            .accent-pane {
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              padding: 52px;
              color: white;
            }

            .accent-pane .small {
              text-transform: uppercase;
              letter-spacing: .28em;
              font-size: 10px;
              color: rgba(255, 255, 255, .72);
            }

            .accent-pane .value {
              font-size: clamp(3rem, 7vw, 6rem);
              line-height: .88;
              letter-spacing: -.06em;
              margin-top: 16px;
            }

            .accessory {
              padding: 120px 0;
            }

            .accessory-head {
              display: flex;
              align-items: flex-end;
              justify-content: space-between;
              gap: 24px;
              margin-bottom: 28px;
            }

            .accessory-head p {
              max-width: 440px;
              color: rgba(255, 255, 255, .66);
              line-height: 1.9;
            }

            .shelf-grid {
              display: grid;
              grid-template-columns: repeat(12, 1fr);
              gap: 18px;
            }

            .shelf {
              grid-column: span 4;
              min-height: 260px;
              padding: 26px;
              background:
                linear-gradient(180deg, rgba(255, 255, 255, .07), rgba(255, 255, 255, .03)),
                linear-gradient(135deg, rgba(255, 255, 255, .04), transparent 60%);
              border: 1px solid rgba(255, 255, 255, .08);
              box-shadow: 0 16px 40px rgba(0, 0, 0, .2);
              overflow: hidden;
              position: relative;
              opacity: 0;
              transform: translateY(28px);
              transition: opacity .7s ease, transform .7s cubic-bezier(.16, 1, .3, 1), box-shadow .4s ease;
            }

            .shelf::before {
              content: '';
              position: absolute;
              inset: 0;
              background:
                linear-gradient(180deg, rgba(255, 255, 255, .05), transparent 20%),
                repeating-linear-gradient(90deg, rgba(255, 255, 255, .06) 0 1px, transparent 1px 28px);
              opacity: .2;
              pointer-events: none;
              mix-blend-mode: screen;
            }

            .shelf.revealed {
              opacity: 1;
              transform: translateY(0);
            }

            .shelf.tall {
              min-height: 360px;
            }

            .shelf.wide {
              grid-column: span 8;
            }

            .shelf .tag {
              text-transform: uppercase;
              letter-spacing: .28em;
              font-size: 10px;
              color: rgba(255, 255, 255, .58);
            }

            .shelf h3 {
              margin-top: 18px;
              font-size: clamp(1.7rem, 3vw, 3rem);
              line-height: .95;
              letter-spacing: -.05em;
              color: white;
            }

            .shelf p {
              margin-top: 16px;
              max-width: 42ch;
              color: rgba(255, 255, 255, .72);
              line-height: 1.85;
            }

            .shelf .number {
              position: absolute;
              right: 22px;
              bottom: 18px;
              font-size: 64px;
              line-height: 1;
              color: rgba(255, 255, 255, .08);
              letter-spacing: -.08em;
            }

            .botanical {
              padding: 120px 0;
            }

            .botanical-shell {
              width: min(1480px, calc(100% - 48px));
              margin: 0 auto;
              padding: 56px;
              background:
                linear-gradient(180deg, rgba(14, 58, 37, .96), rgba(11, 31, 22, .98)),
                radial-gradient(circle at 20% 20%, rgba(92, 188, 99, .18), transparent 18%),
                radial-gradient(circle at 80% 30%, rgba(255, 168, 183, .18), transparent 18%);
              box-shadow: 0 28px 80px rgba(0, 0, 0, .25);
              position: relative;
              overflow: hidden;
            }

            .botanical-shell::before {
              content: '';
              position: absolute;
              inset: 0;
              background:
                linear-gradient(135deg, rgba(255, 255, 255, .04) 0 1px, transparent 1px 100%),
                linear-gradient(45deg, rgba(255, 255, 255, .03) 0 1px, transparent 1px 100%);
              opacity: .18;
              pointer-events: none;
            }

            .botanical-head {
              max-width: 820px;
              position: relative;
              z-index: 1;
            }

            .botanical-head .label {
              text-transform: uppercase;
              letter-spacing: .3em;
              font-size: 10px;
              color: rgba(255, 255, 255, .58);
            }

            .botanical-head h2 {
              margin-top: 18px;
              font-size: clamp(2.8rem, 6vw, 6rem);
              line-height: .92;
              letter-spacing: -.06em;
              color: white;
            }

            .botanical-head p {
              margin-top: 20px;
              max-width: 720px;
              color: rgba(255, 255, 255, .74);
              line-height: 1.95;
              font-size: 16px;
            }

            .contrast-band {
              margin-top: 40px;
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 18px;
              position: relative;
              z-index: 1;
            }

            .plant-card {
              min-height: 240px;
              padding: 28px;
              border-radius: 28px;
              background: linear-gradient(180deg, rgba(255, 255, 255, .08), rgba(255, 255, 255, .03));
              border: 1px solid rgba(255, 255, 255, .08);
              backdrop-filter: blur(18px);
              box-shadow: 0 18px 45px rgba(0, 0, 0, .22);
            }

            .plant-card h3 {
              margin-top: 16px;
              font-size: clamp(2rem, 3vw, 3.5rem);
              line-height: .92;
              letter-spacing: -.05em;
              color: white;
            }

            .plant-card p {
              margin-top: 16px;
              line-height: 1.85;
              color: rgba(255, 255, 255, .72);
            }

            .foot {
              padding: 84px 0 110px;
            }

            .foot-shell {
              width: min(1480px, calc(100% - 48px));
              margin: 0 auto;
              padding: 44px 46px;
              background: linear-gradient(180deg, rgba(18, 18, 20, .98), rgba(10, 10, 12, .98));
              border: 1px solid rgba(255, 255, 255, .06);
              box-shadow: 0 24px 70px rgba(0, 0, 0, .24);
            }

            .foot-grid {
              display: grid;
              grid-template-columns: 1fr auto;
              gap: 24px;
              align-items: end;
            }

            .foot-title {
              font-size: clamp(2.8rem, 5vw, 5rem);
              line-height: .92;
              letter-spacing: -.06em;
              color: white;
            }

            .foot-copy {
              margin-top: 18px;
              max-width: 760px;
              color: rgba(255, 255, 255, .66);
              line-height: 1.95;
            }

            .foot-tags {
              display: flex;
              flex-wrap: wrap;
              gap: 12px;
              justify-content: flex-end;
            }

            .foot-tags span {
              padding: 12px 15px;
              background: rgba(255, 255, 255, .06);
              border: 1px solid rgba(255, 255, 255, .08);
              text-transform: uppercase;
              letter-spacing: .2em;
              font-size: 10px;
              color: rgba(255, 255, 255, .75);
            }

            .footer-line {
              margin: 34px 0;
              height: 1px;
              background: linear-gradient(90deg, transparent, rgba(255, 255, 255, .22), transparent);
            }

            .reveal {
              opacity: 0;
              transform: translateY(32px);
              transition: opacity .8s ease, transform .8s cubic-bezier(.16, 1, .3, 1);
            }

            .reveal.in {
              opacity: 1;
              transform: translateY(0);
            }

            @keyframes condense {
              to {
                opacity: 1;
                filter: blur(0);
                transform: translateY(0);
              }
            }

            @keyframes slatIn {
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }

            @keyframes sheen {
              to {
                transform: translateX(240%) rotate(12deg);
              }
            }

            ::view-transition-old(root),
            ::view-transition-new(root) {
              animation-duration: .72s;
              animation-timing-function: cubic-bezier(.16, 1, .3, 1);
            }

            @media (max-width: 1180px) {
              .header-rail {
                display: none;
              }

              .top-meter {
                right: 16px;
              }

              .hero-main {
                padding: 116px 20px 40px;
              }

              .sofa-split,
              .contrast-band,
              .foot-grid {
                grid-template-columns: 1fr;
              }

              .shelf-grid {
                display: grid;
                grid-template-columns: 1fr 1fr;
              }

              .shelf,
              .shelf.wide {
                grid-column: span 1;
              }

              .shelf.tall {
                min-height: 280px;
              }
            }

            @media (max-width: 760px) {
              .hero-title {
                font-size: clamp(4rem, 16vw, 7rem);
              }

              .hero-text {
                font-size: 15px;
              }

              .shell,
              .botanical-shell,
              .foot-shell {
                width: min(100% - 32px, 1480px);
              }

              .sofa-copy {
                padding: 34px;
              }

              .accent-pane {
                padding: 34px;
              }

              .shelf-grid {
                grid-template-columns: 1fr;
              }

              .foot {
                padding-bottom: 80px;
              }
            }
          `,
        }}
      />

      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute left-[-8rem] top-24 h-[24rem] w-[24rem] rounded-full bg-[radial-gradient(circle,rgba(214,155,78,.12),transparent_72%)] blur-3xl" />
        <div className="absolute right-[-6rem] bottom-24 h-[24rem] w-[24rem] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,.06),transparent_72%)] blur-3xl" />
      </div>

      <header className="header-rail">
        <div className="rail-mark">
          <Icon icon="ph:armchair-bold" className="text-2xl text-[#d7aa61]" />
        </div>

        <div className="rail-brand">Vesta Atelier</div>

        <nav className="rail-nav">
          <a href="#sofa">Sofa</a>
          <a href="#accessory">Shelf</a>
          <a href="#botanical">Contrast</a>
        </nav>
      </header>

      <div className="top-meter">
        <div className="text-[10px] uppercase tracking-[0.28em] text-white/60">
          Showroom Sequence
        </div>
        <div className="meter-bar">
          <span />
        </div>
      </div>

      <section className="hero">
        <div className="slat-portal">
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
          <div className="slat-mask absolute inset-0" />
        </div>

        <div className="hero-main">
          <div className="hero-inner">
            <div className="eyebrow condense">
              <span />
              Mid-century modernism · Spatial ergonomics
            </div>

            <h1 className="title serif">
              <span className="slat block">Vesta</span>
              <span className="slat block">Atelier</span>
            </h1>

            <p className="hero-text condense">
              A boutique interior studio and bespoke furniture showroom shaping warm minimal spaces through tactile
              materiality, chromatic anchoring, and textural layering.
            </p>

            <div className="hero-actions condense">
              <button className="textural-touch btn-a" type="button">
                Enter the showroom
              </button>
              <button className="btn-b" type="button">
                View curated pieces
              </button>
            </div>
          </div>
        </div>
      </section>

      <section id="sofa" className="panel-space">
        <div className="shell">
          <div className="sofa-split reveal">
            <div className="ochre-block">
              <div className="sofa-copy">
                <div className="sofa-label">The Sofa Split</div>
                <h2 className="serif">
                  Color, proportion, and comfort in perfect balance.
                </h2>
                <p>
                  The living space is composed like a tailored interior vignette, where charcoal restraint cushions the
                  composition against vibrant ochre, oak, and smoked-glass highlights.
                </p>
                <div className="sofa-meta">
                  <span>Mid-century modernism</span>
                  <span>Tactile materiality</span>
                  <span>Spatial ergonomics</span>
                </div>
              </div>
            </div>

            <div className="charcoal-block">
              <div className="accent-pane">
                <div>
                  <div className="small">Textural layering</div>
                  <div className="value serif">92 sqm</div>
                </div>

                <div className="smoked-glass rounded-[1.5rem] p-5 text-white">
                  <div className="text-[10px] uppercase tracking-[0.28em] text-white/55">
                    Chromatic anchoring
                  </div>
                  <p className="mt-3 text-sm leading-7 text-white/78">
                    A measured palette of ochre, charcoal, and light oak creates visual calm with gallery-level contrast.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="accessory" className="accessory">
        <div className="shell">
          <div className="accessory-head reveal">
            <div>
              <div className="text-[10px] uppercase tracking-[0.32em] text-white/55">
                The Accessory Grid
              </div>
              <h2 className="serif mt-5 text-[clamp(2.8rem,5vw,5.8rem)] leading-[.9] text-white">
                Shelves that assemble themselves as you scroll.
              </h2>
            </div>
            <p>
              Coffee-table geometry becomes a modular display system, with shelves, objects, and finishes revealed in a rhythmic sequence.
            </p>
          </div>

          <div className="shelf-grid">
            <article className="shelf wide tall reveal">
              <div className="tag">Object 01 · Light Oak</div>
              <h3 className="serif">Sculpted side table</h3>
              <p>
                Rounded-linear edges, smoked walnut grain, and a floating base tuned for compact living rooms.
              </p>
              <div className="number serif">01</div>
            </article>

            <article className="shelf reveal">
              <div className="tag">Object 02 · Linen</div>
              <h3 className="serif">Textured throw</h3>
              <p>
                Soft-woven materiality that introduces warmth without breaking the architectural silence.
              </p>
              <div className="number serif">02</div>
            </article>

            <article className="shelf reveal">
              <div className="tag">Object 03 · Brass</div>
              <h3 className="serif">Table lamp</h3>
              <p>
                Warm amber diffusion against dark stone and oak surfaces.
              </p>
              <div className="number serif">03</div>
            </article>

            <article className="shelf wide reveal">
              <div className="tag">Object 04 · Charcoal</div>
              <h3 className="serif">Low-slung storage</h3>
              <p>
                An elongated cabinet designed for visual grounding, keeping the room clean while echoing the horizontal lines of the wall slats.
              </p>
              <div className="number serif">04</div>
            </article>

            <article className="shelf tall reveal">
              <div className="tag">Object 05 · Travertine</div>
              <h3 className="serif">Stone tray</h3>
              <p>
                Mineral texture, quiet edges, and a pale surface that catches the room’s amber glow.
              </p>
              <div className="number serif">05</div>
            </article>

            <article className="shelf reveal">
              <div className="tag">Object 06 · Cognac</div>
              <h3 className="serif">Leather accent chair</h3>
              <p>
                Deep seat geometry with a refined tactile finish that absorbs and returns light.
              </p>
              <div className="number serif">06</div>
            </article>
          </div>
        </div>
      </section>

      <section id="botanical" className="botanical">
        <div className="botanical-shell reveal">
          <div className="botanical-head">
            <div className="label">Botanical Contrast</div>
            <h2 className="serif">A controlled burst of leaf green and petal pink.</h2>
            <p>
              Plants and flowers enter as color punctuation, breaking the dark material palette with a softer, living cadence. The result feels curated, not decorative.
            </p>
          </div>

          <div className="contrast-band">
            <article className="plant-card">
              <div className="label text-white/60">Leaf Green</div>
              <h3 className="serif">Grounding the room with living texture.</h3>
              <p>
                A vertical plant composition softens the edges of the interior, echoing the upholstery and drawing the eye upward.
              </p>
            </article>

            <article className="plant-card">
              <div className="label text-white/60">Petal Pink</div>
              <h3 className="serif">A delicate counterpoint to charcoal and oak.</h3>
              <p>
                Floral color introduces a quiet tension, amplifying the warm woods and shadowed surfaces around it.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="foot">
        <div className="foot-shell reveal">
          <div className="foot-grid">
            <div>
              <div className="text-[10px] uppercase tracking-[0.32em] text-white/55">
                Rooted in materiality
              </div>
              <h2 className="foot-title serif mt-5">
                The room ends in warmth, weight, and quiet precision.
              </h2>
              <p className="foot-copy">
                Vesta Atelier frames interiors as a balance of structure and softness, where every surface is tuned to feel intentional, tactile, and timeless.
              </p>
            </div>

            <div className="foot-tags">
              <span>Textural layering</span>
              <span>Furniture curation</span>
              <span>Spatial ergonomics</span>
              <span>Light oak</span>
            </div>
          </div>

          <div className="footer-line" />

          <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-white/50">
            <div>© 2026 Vesta Atelier</div>
            <div className="uppercase tracking-[0.28em] text-[10px]">
              Charcoal slate · ochre orange · oak
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}