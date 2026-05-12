"use client"

import { useEffect, useRef, useState } from "react"
import { Icon } from "@iconify/react"

type LedgerEntry = {
    icon: string
    merchant: string
    cat: string
    time: string
    amount: string
    cls?: "debit" | "credit" | ""
}

const initialLedgerEntries: LedgerEntry[] = [
    {
        icon: "🛒",
        merchant: "Apple Store",
        cat: "Electronics · Secure Pay",
        time: "Just now",
        amount: "−$1,299.00",
        cls: "debit",
    },
    {
        icon: "☕",
        merchant: "Blue Bottle Coffee",
        cat: "Food & Drink",
        time: "12:42",
        amount: "−$8.50",
        cls: "debit",
    },
    {
        icon: "💰",
        merchant: "Daily Cash Reward",
        cat: "3% · Apple · Credit",
        time: "12:42",
        amount: "+$38.97",
        cls: "credit",
    },
    {
        icon: "🚕",
        merchant: "Uber",
        cat: "Transport · Apple Pay",
        time: "11:18",
        amount: "−$24.30",
        cls: "debit",
    },
    {
        icon: "🛡️",
        merchant: "Fraud Check Passed",
        cat: "Neural Engine · 12M Signals",
        time: "11:18",
        amount: "CLEARED",
        cls: "",
    },
]

const ledgerFeed: LedgerEntry[] = [
    {
        icon: "☕",
        merchant: "Equator Coffees",
        cat: "Food & Drink",
        time: "Just now",
        amount: "−$6.25",
        cls: "debit",
    },
    {
        icon: "🛡️",
        merchant: "Fraud Check Passed",
        cat: "Neural Engine · Cleared",
        time: "Just now",
        amount: "CLEARED",
        cls: "",
    },
    {
        icon: "🎵",
        merchant: "Apple Music",
        cat: "Subscription · 3% Cash",
        time: "09:00",
        amount: "−$10.99",
        cls: "debit",
    },
    {
        icon: "💰",
        merchant: "Daily Cash",
        cat: "Auto-Applied · Credit",
        time: "09:00",
        amount: "+$0.33",
        cls: "credit",
    },
]

const styles = `
  @import url("https://fonts.googleapis.com/css2?family=Inter+Tight:ital,wght@0,100..900;1,100..900&family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=JetBrains+Mono:wght@300..700&display=swap");

  :root {
    --titanium-base: oklch(14% 0.012 250);
    --titanium-mid: oklch(20% 0.02 250);
    --titanium-high: oklch(28% 0.025 250);
    --titanium-edge: oklch(38% 0.02 250);
    --titanium-sheen: oklch(72% 0.01 250);
    --amber: oklch(72% 0.18 85);
    --amber-dim: oklch(60% 0.14 85);
    --amber-glow: oklch(78% 0.2 88 / 0.35);
    --cyan: oklch(68% 0.16 220);
    --cyan-dim: oklch(55% 0.12 220);
    --cyan-glow: oklch(68% 0.16 220 / 0.3);
    --text-primary: oklch(94% 0.005 250);
    --text-secondary: oklch(56% 0.015 250);
    --text-tertiary: oklch(38% 0.015 250);
    --glass-fill: oklch(100% 0 0 / 0.03);
    --glass-border: oklch(100% 0 0 / 0.07);
    --glass-border-bright: oklch(100% 0 0 / 0.14);
    --void: oklch(7% 0.01 250);
  }

  * , *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    scroll-behavior: smooth;
    scrollbar-width: thin;
    scrollbar-color: oklch(25% 0.02 250) transparent;
    overflow-x: hidden;
  }

  body {
    font-family: "Inter Tight", sans-serif;
    background: var(--void);
    color: var(--text-primary);
    overflow-x: hidden;
    cursor: none;
    min-height: 100vh;
  }

  body.custom-cursor {
    cursor: none;
  }

  ::selection {
    background: oklch(72% 0.18 85 / 0.25);
    color: var(--amber);
  }

  .page-root {
    position: relative;
    min-height: 100vh;
    isolation: isolate;
  }

  .cursor-dot {
    position: fixed;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--amber);
    pointer-events: none;
    z-index: 9999;
    transform: translate(-50%, -50%);
    transition: width .2s, height .2s, background .2s;
    box-shadow: 0 0 12px 3px var(--amber-glow);
    mix-blend-mode: plus-lighter;
    left: 0;
    top: 0;
  }

  .cursor-ring {
    position: fixed;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: 1px solid oklch(68% 0.16 220 / 0.5);
    pointer-events: none;
    z-index: 9998;
    transform: translate(-50%, -50%);
    transition: transform .14s cubic-bezier(.25,.46,.45,.94), width .3s, height .3s, border-color .3s;
    mix-blend-mode: plus-lighter;
    left: 0;
    top: 0;
  }

  .cursor-ring.expanded {
    width: 56px;
    height: 56px;
    border-color: var(--amber);
  }

  .noise {
    position: fixed;
    inset: 0;
    z-index: 4;
    pointer-events: none;
    opacity: 0.028;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    background-size: 512px 512px;
  }

  .ambient-orb {
    position: fixed;
    border-radius: 50%;
    pointer-events: none;
    filter: blur(120px);
    z-index: 0;
  }

  .orb-amber {
    width: 700px;
    height: 700px;
    background: oklch(65% 0.16 85 / 0.07);
    top: -200px;
    right: -100px;
    animation: orb-float-a 18s ease-in-out infinite;
  }

  .orb-cyan {
    width: 500px;
    height: 500px;
    background: oklch(60% 0.14 220 / 0.07);
    bottom: 10%;
    left: -100px;
    animation: orb-float-b 22s ease-in-out infinite;
  }

  @keyframes orb-float-a {
    0%,100% { transform: translate(0,0) scale(1); }
    33% { transform: translate(-40px, 60px) scale(1.08); }
    66% { transform: translate(30px, -40px) scale(0.94); }
  }

  @keyframes orb-float-b {
    0%,100% { transform: translate(0,0) scale(1); }
    50% { transform: translate(60px, -50px) scale(1.1); }
  }

  .vault-portal {
    position: fixed;
    top: 0;
    right: 0;
    width: 48vw;
    height: 100vh;
    z-index: 1;
    pointer-events: none;
    transform: perspective(1200px) rotateY(-4deg) rotateX(1deg);
    transform-origin: right center;
  }

  .vault-video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 1;
    filter: none;
    mask: none;
    -webkit-mask: none;
  }

  .light-corridor {
    position: fixed;
    top: 0;
    right: 0;
    width: 52vw;
    height: 100vh;
    background: transparent;
    backdrop-filter: none;
    pointer-events: none;
    z-index: 2;
    mix-blend-mode: normal;
  }

  .vault-edge-flare {
    position: fixed;
    top: 0;
    left: calc(52vw - 2px);
    width: 180px;
    height: 100vh;
    background: linear-gradient(90deg, transparent, oklch(72% 0.18 85 / 0.06) 30%, oklch(68% 0.16 220 / 0.08) 60%, transparent);
    pointer-events: none;
    z-index: 3;
    filter: blur(2px);
  }

  nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.4rem 3.5rem;
    background: oklch(7% 0.01 250 / 0.75);
    backdrop-filter: blur(32px) saturate(1.3);
    border-bottom: 1px solid var(--glass-border);
  }

  .nav-logo {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .nav-apple {
    font-size: 1.3rem;
    line-height: 1;
    color: var(--text-primary);
    font-weight: 300;
  }

  .nav-divider {
    width: 1px;
    height: 16px;
    background: var(--glass-border-bright);
  }

  .nav-product {
    font-size: 0.72rem;
    font-weight: 500;
    letter-spacing: 0.08em;
    color: var(--text-secondary);
    text-transform: uppercase;
    font-family: "JetBrains Mono", monospace;
  }

  .nav-links {
    display: flex;
    gap: 2.8rem;
    list-style: none;
  }

  .nav-links a {
    font-size: 0.68rem;
    font-weight: 400;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--text-tertiary);
    text-decoration: none;
    font-family: "JetBrains Mono", monospace;
    transition: color .25s;
  }

  .nav-links a:hover {
    color: var(--text-secondary);
  }

  .nav-cta {
    font-size: 0.68rem;
    font-weight: 500;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--amber);
    font-family: "JetBrains Mono", monospace;
    cursor: none;
    background: none;
    border: 1px solid oklch(72% 0.18 85 / 0.25);
    padding: 0.5rem 1.2rem;
    border-radius: 2px;
    transition: background .3s, border-color .3s, box-shadow .3s;
  }

  .nav-cta:hover {
    background: oklch(72% 0.18 85 / 0.08);
    border-color: oklch(72% 0.18 85 / 0.5);
    box-shadow: 0 0 20px 4px var(--amber-glow);
  }

  .content-rail {
    position: relative;
    z-index: 10;
    width: 52vw;
    max-width: 780px;
    padding: 0 3.5rem;
  }

  .page-main {
    position: relative;
    z-index: 10;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 8rem;
  }

  .hero-section {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-top: 7rem;
    padding-bottom: 4rem;
  }

  .hero-eyebrow {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 2.2rem;
    opacity: 0;
    animation: reveal-up .9s cubic-bezier(.16,1,.3,1) .2s forwards;
  }

  .eyebrow-line {
    width: 2.5rem;
    height: 1px;
    background: linear-gradient(90deg, var(--amber), transparent);
  }

  .eyebrow-text {
    font-family: "JetBrains Mono", monospace;
    font-size: 0.6rem;
    font-weight: 400;
    letter-spacing: 0.28em;
    text-transform: uppercase;
    color: var(--amber-dim);
  }

  .hero-title {
    font-family: "Playfair Display", serif;
    font-size: clamp(3.2rem, 5.5vw, 5.8rem);
    font-weight: 400;
    line-height: 0.95;
    letter-spacing: -0.02em;
    margin-bottom: 1.2rem;
    opacity: 0;
    animation: reveal-up 1s cubic-bezier(.16,1,.3,1) .35s forwards;
  }

  .hero-title em {
    font-style: italic;
    color: var(--amber);
    font-weight: 300;
  }

  .hero-title .line-thin {
    font-weight: 300;
    color: var(--text-secondary);
    font-size: 0.65em;
    display: block;
    letter-spacing: 0.04em;
    font-family: "Inter Tight", sans-serif;
    font-style: normal;
    margin-top: 0.4em;
  }

  .hero-sub {
    font-size: 0.88rem;
    line-height: 1.8;
    color: var(--text-secondary);
    font-weight: 300;
    max-width: 46ch;
    margin-bottom: 3rem;
    opacity: 0;
    animation: reveal-up .9s cubic-bezier(.16,1,.3,1) .5s forwards;
  }

  .hero-actions {
    display: flex;
    gap: 1rem;
    align-items: center;
    margin-bottom: 5rem;
    opacity: 0;
    animation: reveal-up .9s cubic-bezier(.16,1,.3,1) .65s forwards;
  }

  .btn-primary {
    position: relative;
    padding: 0.9rem 2.4rem;
    font-family: "JetBrains Mono", monospace;
    font-size: 0.68rem;
    font-weight: 500;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--void);
    background: linear-gradient(135deg, var(--amber), oklch(65% 0.16 75));
    border: none;
    border-radius: 3px;
    cursor: none;
    overflow: hidden;
    transition: box-shadow .35s, transform .2s;
  }

  .btn-primary::before {
    content: "";
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at var(--bx,50%) var(--by,50%), oklch(100% 0 0 / 0.3) 0%, transparent 65%);
    opacity: 0;
    transition: opacity .3s;
  }

  .btn-primary:hover {
    box-shadow: 0 0 40px 8px var(--amber-glow), 0 8px 32px oklch(0% 0 0 / 0.4);
    transform: translateY(-1px);
  }

  .btn-primary:hover::before {
    opacity: 1;
  }

  .btn-secondary {
    position: relative;
    padding: 0.9rem 2rem;
    font-family: "JetBrains Mono", monospace;
    font-size: 0.68rem;
    font-weight: 400;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--text-secondary);
    background: var(--glass-fill);
    border: 1px solid var(--glass-border);
    border-radius: 3px;
    cursor: none;
    transition: color .3s, border-color .3s, background .3s;
  }

  .btn-secondary:hover {
    color: var(--text-primary);
    border-color: var(--glass-border-bright);
    background: oklch(100% 0 0 / 0.05);
  }

  .hero-stat-row {
    display: flex;
    gap: 3rem;
    padding-top: 2.5rem;
    border-top: 1px solid var(--glass-border);
    opacity: 0;
    animation: reveal-up .9s cubic-bezier(.16,1,.3,1) .8s forwards;
    flex-wrap: wrap;
  }

  .stat-value {
    font-family: "Playfair Display", serif;
    font-size: 2.4rem;
    font-weight: 400;
    letter-spacing: -0.03em;
    color: var(--text-primary);
    line-height: 1;
  }

  .stat-value span {
    font-family: "Inter Tight", sans-serif;
    font-size: 1rem;
    font-weight: 300;
    color: var(--amber);
  }

  .stat-label {
    font-family: "JetBrains Mono", monospace;
    font-size: 0.58rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--text-tertiary);
    margin-top: 0.4rem;
  }

  @keyframes reveal-up {
    from { opacity: 0; transform: translateY(24px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .anodized-section {
    padding: 8rem 0;
  }

  .section-label {
    font-family: "JetBrains Mono", monospace;
    font-size: 0.58rem;
    font-weight: 400;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: var(--amber-dim);
    margin-bottom: 1.8rem;
    display: flex;
    align-items: center;
    gap: 0.8rem;
  }

  .section-label::before {
    content: "";
    display: block;
    width: 1.5rem;
    height: 1px;
    background: var(--amber-dim);
  }

  .section-title {
    font-family: "Playfair Display", serif;
    font-size: clamp(2rem, 3.5vw, 3.2rem);
    font-weight: 400;
    letter-spacing: -0.02em;
    line-height: 1.05;
    margin-bottom: 1rem;
  }

  .section-title em {
    font-style: italic;
    color: var(--amber);
  }

  .anodized-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1px;
    background: var(--glass-border);
    border: 1px solid var(--glass-border);
    border-radius: 6px;
    overflow: hidden;
    margin-top: 3.5rem;
  }

  .anodized-cell {
    position: relative;
    background: var(--titanium-base);
    padding: 2.2rem;
    overflow: hidden;
    transition: background .4s;
  }

  .anodized-cell::before {
    content: "";
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse at var(--cx,50%) var(--cy,50%), oklch(72% 0.18 85 / 0.06) 0%, transparent 60%);
    opacity: 0;
    transition: opacity .4s;
  }

  .anodized-cell:hover {
    background: var(--titanium-mid);
  }

  .anodized-cell:hover::before {
    opacity: 1;
  }

  .anodized-cell.wide {
    grid-column: 1 / -1;
  }

  .anodized-cell.accent {
    background: oklch(16% 0.025 85);
  }

  .cell-icon {
    width: 36px;
    height: 36px;
    border-radius: 6px;
    background: oklch(100% 0 0 / 0.04);
    border: 1px solid var(--glass-border);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1.4rem;
    font-size: 0.85rem;
  }

  .cell-label {
    font-family: "JetBrains Mono", monospace;
    font-size: 0.58rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--amber-dim);
    margin-bottom: 0.7rem;
  }

  .cell-title {
    font-size: 1.05rem;
    font-weight: 500;
    letter-spacing: -0.02em;
    margin-bottom: 0.7rem;
    line-height: 1.2;
  }

  .cell-body {
    font-size: 0.78rem;
    line-height: 1.75;
    color: var(--text-secondary);
    font-weight: 300;
  }

  .cell-metric {
    font-family: "Playfair Display", serif;
    font-size: 2.8rem;
    font-weight: 400;
    letter-spacing: -0.03em;
    color: var(--text-primary);
    line-height: 1;
    margin-bottom: 0.3rem;
  }

  .cell-metric-unit {
    font-family: "JetBrains Mono", monospace;
    font-size: 0.6rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--text-tertiary);
  }

  .inner-shadow-card {
    box-shadow:
      inset 0 1px 0 oklch(100% 0 0 / 0.06),
      inset 0 -1px 0 oklch(0% 0 0 / 0.3),
      inset 1px 0 0 oklch(100% 0 0 / 0.04),
      inset -1px 0 0 oklch(0% 0 0 / 0.2),
      0 4px 24px oklch(0% 0 0 / 0.4);
  }

  .telemetry-bar {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-top: 1.2rem;
  }

  .telem-row {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    font-family: "JetBrains Mono", monospace;
  }

  .telem-key {
    font-size: 0.58rem;
    color: var(--text-tertiary);
    letter-spacing: 0.1em;
    text-transform: uppercase;
    flex: 0 0 80px;
  }

  .telem-track {
    flex: 1;
    height: 3px;
    background: oklch(100% 0 0 / 0.06);
    border-radius: 2px;
    overflow: hidden;
  }

  .telem-fill {
    height: 100%;
    border-radius: 2px;
    background: linear-gradient(90deg, var(--cyan), var(--amber));
    position: relative;
  }

  .telem-fill::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg, transparent, oklch(100% 0 0 / 0.4), transparent);
    animation: shimmer-t 2.5s ease-in-out infinite;
  }

  @keyframes shimmer-t {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }

  .telem-val {
    font-size: 0.6rem;
    color: var(--amber);
    flex: 0 0 40px;
    text-align: right;
  }

  .assembly-section {
    padding: 8rem 0;
  }

  .circuit-row {
    display: flex;
    flex-direction: column;
    gap: 1px;
    background: var(--glass-border);
    border: 1px solid var(--glass-border);
    border-radius: 6px;
    overflow: hidden;
    margin-top: 3.5rem;
  }

  .circuit-item {
    display: flex;
    align-items: center;
    gap: 2rem;
    padding: 1.6rem 2rem;
    background: var(--titanium-base);
    position: relative;
    overflow: hidden;
    opacity: 0;
    transform: translateX(-20px);
    transition: background .3s, opacity .6s, transform .6s;
  }

  .circuit-item.assembled {
    opacity: 1;
    transform: translateX(0);
  }

  .circuit-item::after {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 2px;
    background: linear-gradient(180deg, var(--amber), var(--cyan));
    box-shadow: 0 0 10px 2px var(--amber-glow);
    transform: scaleY(0);
    transform-origin: top;
    transition: transform .5s cubic-bezier(.16,1,.3,1);
  }

  .circuit-item.assembled::after {
    transform: scaleY(1);
  }

  .circuit-num {
    font-family: "Playfair Display", serif;
    font-size: 2rem;
    font-weight: 400;
    color: oklch(100% 0 0 / 0.08);
    flex: 0 0 3rem;
    line-height: 1;
  }

  .circuit-content {
    flex: 1;
  }

  .circuit-title {
    font-size: 0.9rem;
    font-weight: 500;
    letter-spacing: -0.01em;
    margin-bottom: 0.3rem;
  }

  .circuit-desc {
    font-size: 0.75rem;
    color: var(--text-secondary);
    line-height: 1.6;
    font-weight: 300;
  }

  .circuit-badge {
    font-family: "JetBrains Mono", monospace;
    font-size: 0.55rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    padding: 0.3rem 0.8rem;
    border-radius: 100px;
    border: 1px solid var(--glass-border);
    color: var(--text-tertiary);
    white-space: nowrap;
    flex-shrink: 0;
  }

  .circuit-badge.active {
    color: var(--amber);
    border-color: oklch(72% 0.18 85 / 0.3);
    background: oklch(72% 0.18 85 / 0.07);
    box-shadow: 0 0 12px var(--amber-glow);
  }

  .ledger-section {
    padding: 8rem 0;
  }

  .ledger-display {
    background: var(--titanium-base);
    border: 1px solid var(--glass-border);
    border-radius: 6px;
    overflow: hidden;
    margin-top: 3.5rem;
  }

  .ledger-header {
    padding: 1.2rem 2rem;
    background: oklch(100% 0 0 / 0.02);
    border-bottom: 1px solid var(--glass-border);
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .ledger-title-bar {
    font-family: "JetBrains Mono", monospace;
    font-size: 0.6rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--text-tertiary);
  }

  .ledger-live {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-family: "JetBrains Mono", monospace;
    font-size: 0.55rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--amber);
  }

  .pulse-dot {
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: var(--amber);
    box-shadow: 0 0 8px 2px var(--amber-glow);
    animation: pulse-a 2s ease-in-out infinite;
  }

  @keyframes pulse-a {
    0%,100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.3; transform: scale(0.6); }
  }

  .ledger-entries {
    display: flex;
    flex-direction: column;
  }

  .ledger-entry {
    display: flex;
    align-items: center;
    padding: 1.1rem 2rem;
    border-bottom: 1px solid var(--glass-border);
    gap: 1.5rem;
    position: relative;
    overflow: hidden;
    transition: background .3s;
  }

  .ledger-entry:last-child {
    border-bottom: none;
  }

  .ledger-entry:hover {
    background: oklch(100% 0 0 / 0.02);
  }

  .entry-icon {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.75rem;
    flex-shrink: 0;
    border: 1px solid var(--glass-border);
    background: oklch(100% 0 0 / 0.04);
  }

  .entry-merchant {
    font-size: 0.82rem;
    font-weight: 500;
  }

  .entry-category {
    font-family: "JetBrains Mono", monospace;
    font-size: 0.55rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--text-tertiary);
    margin-top: 0.2rem;
  }

  .entry-amount {
    margin-left: auto;
    font-family: "Playfair Display", serif;
    font-size: 1.05rem;
    font-weight: 400;
    letter-spacing: -0.01em;
  }

  .entry-amount.debit {
    color: var(--text-primary);
  }

  .entry-amount.credit {
    color: var(--amber);
  }

  .entry-time {
    font-family: "JetBrains Mono", monospace;
    font-size: 0.55rem;
    color: var(--text-tertiary);
    letter-spacing: 0.08em;
    flex-shrink: 0;
  }

  .entry-stream {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 1px;
    background: linear-gradient(180deg, transparent, var(--amber-dim), transparent);
    opacity: 0;
    transition: opacity .3s;
  }

  .ledger-entry:hover .entry-stream {
    opacity: 0.6;
  }

  .chart-area {
    padding: 1.5rem 2rem;
    border-top: 1px solid var(--glass-border);
  }

  .chart-label {
    font-family: "JetBrains Mono", monospace;
    font-size: 0.55rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--text-tertiary);
    margin-bottom: 1rem;
  }

  .sparkline-container {
    position: relative;
    height: 60px;
  }

  .sparkline-container svg {
    width: 100%;
    height: 100%;
  }

  .secure-section {
    padding: 8rem 0 12rem;
  }

  .secure-grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 1px;
    background: var(--glass-border);
    border: 1px solid var(--glass-border);
    border-radius: 6px;
    overflow: hidden;
    margin-top: 3.5rem;
  }

  .secure-cell {
    padding: 2rem 1.8rem;
    background: var(--titanium-base);
    position: relative;
    overflow: hidden;
    transition: background .4s;
  }

  .secure-cell::before {
    content: "";
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse at var(--cx,50%) var(--cy,50%), oklch(68% 0.16 220 / 0.07) 0%, transparent 60%);
    opacity: 0;
    transition: opacity .4s;
  }

  .secure-cell:hover {
    background: var(--titanium-mid);
  }

  .secure-cell:hover::before {
    opacity: 1;
  }

  .secure-icon {
    font-size: 1.4rem;
    margin-bottom: 1.2rem;
    display: block;
  }

  .secure-title {
    font-size: 0.9rem;
    font-weight: 500;
    margin-bottom: 0.6rem;
    letter-spacing: -0.01em;
  }

  .secure-desc {
    font-size: 0.73rem;
    line-height: 1.7;
    color: var(--text-secondary);
    font-weight: 300;
  }

  .secure-stat {
    font-family: "JetBrains Mono", monospace;
    font-size: 0.58rem;
    color: var(--cyan-dim);
    margin-top: 1rem;
    letter-spacing: 0.08em;
  }

  .flare-h {
    position: absolute;
    height: 1px;
    pointer-events: none;
  }

  .flare-v {
    position: absolute;
    width: 1px;
    pointer-events: none;
  }

  .footer-bar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 100;
    padding: 1rem 3.5rem;
    background: oklch(7% 0.01 250 / 0.85);
    backdrop-filter: blur(24px);
    border-top: 1px solid var(--glass-border);
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .footer-copy {
    font-family: "JetBrains Mono", monospace;
    font-size: 0.55rem;
    color: var(--text-tertiary);
    letter-spacing: 0.12em;
  }

  .footer-status {
    display: flex;
    align-items: center;
    gap: 1.5rem;
  }

  .status-chip {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    font-family: "JetBrains Mono", monospace;
    font-size: 0.55rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--text-tertiary);
  }

  .status-chip .dot {
    width: 5px;
    height: 5px;
    border-radius: 50%;
  }

  .dot-amber {
    background: var(--amber);
    box-shadow: 0 0 6px 1px var(--amber-glow);
  }

  .dot-cyan {
    background: var(--cyan);
    box-shadow: 0 0 6px 1px var(--cyan-glow);
  }

  .dot-green {
    background: oklch(68% 0.18 145);
    box-shadow: 0 0 6px 1px oklch(68% 0.18 145 / 0.5);
  }

  .scroll-progress {
    position: fixed;
    top: 0;
    left: 0;
    width: 0%;
    height: 2px;
    background: linear-gradient(90deg, var(--amber), var(--cyan));
    z-index: 200;
    transition: width .1s linear;
    box-shadow: 0 0 12px 2px var(--amber-glow);
  }

  @keyframes scan-v {
    from { top: -100px; }
    to { top: 100vh; }
  }

  .data-scan {
    position: fixed;
    left: 0;
    right: 0;
    height: 100px;
    background: linear-gradient(180deg, transparent, oklch(72% 0.18 85 / 0.03), transparent);
    pointer-events: none;
    z-index: 3;
    animation: scan-v 12s linear infinite;
  }

  @keyframes ticker {
    from { transform: translateX(0); }
    to { transform: translateX(-50%); }
  }

  .ticker-wrap {
    position: fixed;
    bottom: 40px;
    left: 0;
    width: 52vw;
    overflow: hidden;
    z-index: 50;
    pointer-events: none;
    border-top: 1px solid var(--glass-border);
    background: oklch(7% 0.01 250 / 0.6);
    backdrop-filter: blur(16px);
  }

  .ticker-inner {
    display: flex;
    gap: 0;
    animation: ticker 28s linear infinite;
    white-space: nowrap;
  }

.ticker-item {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.55rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--text-tertiary);
  padding: 0.5rem 2.5rem 0.5rem 0;
}

.ticker-item span { color: var(--amber); margin-left: 0.4rem; }

  .optical-flare {
    position: fixed;
    pointer-events: none;
    z-index: 6;
    border-radius: 50%;
    filter: blur(1px);
    animation: flare-pulse 4s ease-in-out infinite;
    mix-blend-mode: plus-lighter;
  }

  @keyframes flare-pulse {
    0%,100% { opacity: 0.4; transform: translate(-50%,-50%) scale(1); }
    50% { opacity: 0.7; transform: translate(-50%,-50%) scale(1.15); }
  }

  .depth-shadow {
    box-shadow:
      0 0 0 1px var(--glass-border),
      0 4px 6px oklch(0% 0 0 / 0.25),
      0 16px 48px oklch(0% 0 0 / 0.4),
      0 0 80px oklch(72% 0.18 85 / 0.04);
  }

  .reveal-card {
    opacity: 0;
    transform: translateY(16px);
    transition: opacity .7s cubic-bezier(.16,1,.3,1), transform .7s cubic-bezier(.16,1,.3,1);
  }

  .reveal-card.visible {
    opacity: 1;
    transform: translateY(0);
  }

  @media (max-width: 1100px) {
    .content-rail {
      width: 100%;
      max-width: 100%;
      padding: 0 2rem;
    }

    .vault-portal,
    .light-corridor,
    .vault-edge-flare,
    .ticker-wrap {
      display: none;
    }

    .anodized-grid {
      grid-template-columns: 1fr;
    }

    .secure-grid {
      grid-template-columns: 1fr;
    }

    .footer-bar {
      flex-direction: column;
      gap: 0.75rem;
      text-align: center;
    }
  }

  @media (max-width: 900px) {
    nav {
      padding: 1rem 1.25rem;
    }

    .nav-links {
      display: none;
    }

    .content-rail {
      padding: 0 1.25rem;
    }

    .hero-title {
      font-size: clamp(2.8rem, 15vw, 4.4rem);
    }

    .hero-actions {
      flex-wrap: wrap;
    }

    .hero-stat-row {
      gap: 1.5rem;
    }

    .circuit-item,
    .ledger-entry {
      align-items: flex-start;
      gap: 1rem;
      padding: 1.2rem 1rem;
    }

    .ledger-header,
    .chart-area {
      padding-left: 1rem;
      padding-right: 1rem;
    }

    .footer-bar {
      padding: 1rem 1.25rem;
    }

    .ticker-wrap {
      width: 100%;
    }

    .cursor-dot,
    .cursor-ring {
      display: none;
    }

    body.custom-cursor {
      cursor: auto;
    }

    .btn-primary,
    .btn-secondary,
    .nav-cta {
      cursor: pointer;
    }
  }

  @media (pointer: coarse) {
    .cursor-dot,
    .cursor-ring {
      display: none;
    }

    body.custom-cursor {
      cursor: auto;
    }
  }
`

export default function AppleCardTitaniumIntelligencePage() {
    const [ledgerEntries, setLedgerEntries] = useState<LedgerEntry[]>(initialLedgerEntries)
    const portalRef = useRef<HTMLDivElement | null>(null)
    const heroTextRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        document.body.classList.add("custom-cursor")

        const dot = document.getElementById("cursorDot") as HTMLDivElement | null
        const ring = document.getElementById("cursorRing") as HTMLDivElement | null
        const scrollProgress = document.getElementById("scrollProgress") as HTMLDivElement | null
        const btnPrimary = document.getElementById("btnPrimary") as HTMLButtonElement | null

        let mx = window.innerWidth / 2
        let my = window.innerHeight / 2
        let rx = mx
        let ry = my
        let rafId = 0
        const ledgerTimer = window.setInterval(() => {
            const next = tickerEntries[ledgerIndex % tickerEntries.length]
            ledgerIndex += 1

            setLedgerEntries((prev) => [next, ...prev].slice(0, 6))
        }, 4000)

        const updateCursorPosition = (e: MouseEvent) => {
            mx = e.clientX
            my = e.clientY

            if (dot) {
                dot.style.left = `${mx}px`
                dot.style.top = `${my}px`
            }

            document.querySelectorAll<HTMLElement>("[data-hover]").forEach((el) => {
                const r = el.getBoundingClientRect()
                el.style.setProperty("--cx", `${((mx - r.left) / r.width) * 100}%`)
                el.style.setProperty("--cy", `${((my - r.top) / r.height) * 100}%`)
            })

            if (btnPrimary) {
                const r = btnPrimary.getBoundingClientRect()
                btnPrimary.style.setProperty("--bx", `${((mx - r.left) / r.width) * 100}%`)
                btnPrimary.style.setProperty("--by", `${((my - r.top) / r.height) * 100}%`)
            }

            if (heroTextRef.current) {
                const xAxis = (window.innerWidth / 2 - e.pageX) / 60
                const yAxis = (window.innerHeight / 2 - e.pageY) / 60
                heroTextRef.current.style.transform = `translate3d(${xAxis}px, ${yAxis}px, 0)`
            }
        }

        const animateRing = () => {
            rx += (mx - rx) * 0.11
            ry += (my - ry) * 0.11

            if (ring) {
                ring.style.left = `${rx}px`
                ring.style.top = `${ry}px`
            }

            rafId = requestAnimationFrame(animateRing)
        }

        const updateScroll = () => {
            const max = document.body.scrollHeight - window.innerHeight
            const progress = max > 0 ? (window.scrollY / max) * 100 : 0

            if (scrollProgress) {
                scrollProgress.style.width = `${progress}%`
            }
        }

        const hoverTargets = Array.from(
            document.querySelectorAll<HTMLElement>("button, a, [data-hover]")
        )

        const addExpanded = () => ring?.classList.add("expanded")
        const removeExpanded = () => ring?.classList.remove("expanded")

        hoverTargets.forEach((el) => {
            el.addEventListener("mouseenter", addExpanded)
            el.addEventListener("mouseleave", removeExpanded)
        })

        const revealObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        ; (entry.target as HTMLElement).classList.add("visible")
                        revealObserver.unobserve(entry.target)
                    }
                })
            },
            { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
        )

        document.querySelectorAll<HTMLElement>(".reveal-card").forEach((el) => {
            revealObserver.observe(el)
        })

        const circuitItems = Array.from(
            document.querySelectorAll<HTMLElement>("[data-circuit]")
        )

        const circuitObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const index = circuitItems.indexOf(entry.target as HTMLElement)
                        setTimeout(() => {
                            ; (entry.target as HTMLElement).classList.add("assembled")
                        }, index * 140)
                        circuitObserver.unobserve(entry.target)
                    }
                })
            },
            { threshold: 0.2 }
        )

        circuitItems.forEach((el) => circuitObserver.observe(el))

        const secureCells = Array.from(
            document.querySelectorAll<HTMLElement>(".secure-cell")
        )

        const secureObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        ; (entry.target as HTMLElement).classList.add("visible")
                        secureObserver.unobserve(entry.target)
                    }
                })
            },
            { threshold: 0.1 }
        )

        secureCells.forEach((el) => {
            el.classList.add("reveal-card")
            secureObserver.observe(el)
        })

        const bentoCells = Array.from(
            document.querySelectorAll<HTMLElement>(".anodized-cell")
        )

        const bentoObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        ; (entry.target as HTMLElement).classList.add("visible")
                        bentoObserver.unobserve(entry.target)
                    }
                })
            },
            { threshold: 0.1 }
        )

        bentoCells.forEach((el) => {
            el.classList.add("reveal-card")
            bentoObserver.observe(el)
        })

        const handleScroll = () => {
            updateScroll()

            const scrolled = window.scrollY
            if (portalRef.current && scrolled < window.innerHeight * 1.5) {
                const rotation = scrolled * 0.01
                const scale = 1 + scrolled * 0.0003
                portalRef.current.style.transform = `scale(${scale}) rotate(${rotation}deg)`
            }
        }

        const tickerEntries = [...ledgerFeed]
        let ledgerIndex = 0

        window.addEventListener("mousemove", updateCursorPosition)
        window.addEventListener("scroll", handleScroll, { passive: true })

        animateRing()
        handleScroll()

        return () => {
            document.body.classList.remove("custom-cursor")
            cancelAnimationFrame(rafId)
            if (ledgerTimer) window.clearInterval(ledgerTimer)

            window.removeEventListener("mousemove", updateCursorPosition)
            window.removeEventListener("scroll", handleScroll)

            hoverTargets.forEach((el) => {
                el.removeEventListener("mouseenter", addExpanded)
                el.removeEventListener("mouseleave", removeExpanded)
            })

            revealObserver.disconnect()
            circuitObserver.disconnect()
            secureObserver.disconnect()
            bentoObserver.disconnect()
        }
    }, [])

    return (
        <div className="page-root">
            <style dangerouslySetInnerHTML={{ __html: styles }} />

            <div className="cursor-dot" id="cursorDot" />
            <div className="cursor-ring" id="cursorRing" />

            <div className="noise" />
            <div className="data-scan" />
            <div className="scroll-progress" id="scrollProgress" />

            <div className="ambient-orb orb-amber" />
            <div className="ambient-orb orb-cyan" />

            <div
                className="optical-flare"
                style={{ width: "6px", height: "6px", background: "var(--amber)", top: "28vh", left: "49vw" }}
            />
            <div
                className="optical-flare"
                style={{ width: "4px", height: "4px", background: "var(--cyan)", top: "62vh", left: "47vw", animationDelay: "-2s" }}
            />

            <div className="vault-portal" ref={portalRef}>
                <video className="vault-video" autoPlay muted loop playsInline>
                    <source src="/video.mp4" type="video/mp4" />
                </video>
            </div>

            <div className="light-corridor" />
            <div className="vault-edge-flare" />

            <div className="ticker-wrap">
                <div className="ticker-inner">
                    <div className="ticker-item">Secure Element · AES-256<span>ACTIVE</span></div>
                    <div className="ticker-item">Biometric Auth<span>ENROLLED</span></div>
                    <div className="ticker-item">Neural Fraud Engine<span>99.97%</span></div>
                    <div className="ticker-item">Ledger Sync<span>2.1ms</span></div>
                    <div className="ticker-item">Titanium ISO/IEC 7810<span>CERTIFIED</span></div>
                    <div className="ticker-item">Real-Time Settlement<span>LIVE</span></div>
                    <div className="ticker-item">Secure Enclave · T2<span>LOCKED</span></div>
                    <div className="ticker-item">Secure Element · AES-256<span>ACTIVE</span></div>
                    <div className="ticker-item">Biometric Auth<span>ENROLLED</span></div>
                    <div className="ticker-item">Neural Fraud Engine<span>99.97%</span></div>
                    <div className="ticker-item">Ledger Sync<span>2.1ms</span></div>
                    <div className="ticker-item">Titanium ISO/IEC 7810<span>CERTIFIED</span></div>
                    <div className="ticker-item">Real-Time Settlement<span>LIVE</span></div>
                    <div className="ticker-item">Secure Enclave · T2<span>LOCKED</span></div>
                </div>
            </div>

            <nav>
                <div className="nav-logo">
                    <span className="nav-apple">&#63743;</span>
                    <div className="nav-divider" />
                    <span className="nav-product">Apple Card</span>
                </div>

                <ul className="nav-links">
                    <li><a href="#overview">Overview</a></li>
                    <li><a href="#security">Security</a></li>
                    <li><a href="#rewards">Rewards</a></li>
                    <li><a href="#privacy">Privacy</a></li>
                </ul>

                <button className="nav-cta" type="button">
                    Apply Now
                </button>
            </nav>

            <main className="page-main">
                <div className="content-rail">
                    <section className="hero-section" id="overview">
                        <div className="hero-eyebrow">
                            <div className="eyebrow-line" />
                            <span className="eyebrow-text">Titanium · Intelligence · 2025</span>
                        </div>

                        <h1 className="hero-title" ref={heroTextRef}>
                            The Card
                            <br />
                            for the <em>Future</em>
                            <br />
                            <span className="line-thin">of Money</span>
                        </h1>

                        <p className="hero-sub">
                            Precision-milled titanium alloy with Secure Element encryption and neural-link fraud detection. A financial instrument engineered to the same standard as the device in your hand.
                        </p>

                        <div className="hero-actions">
                            <button className="btn-primary" id="btnPrimary" type="button">
                                Apply for Apple Card
                            </button>
                            <button className="btn-secondary" type="button">
                                Learn More
                            </button>
                        </div>

                        <div className="hero-stat-row">
                            <div className="stat-item">
                                <div className="stat-value">3<span>%</span></div>
                                <div className="stat-label">Daily Cash · Apple</div>
                            </div>
                            <div className="stat-item">
                                <div className="stat-value">2<span>%</span></div>
                                <div className="stat-label">Apple Pay · All</div>
                            </div>
                            <div className="stat-item">
                                <div className="stat-value">0<span>%</span></div>
                                <div className="stat-label">Fees — None</div>
                            </div>
                            <div className="stat-item">
                                <div className="stat-value">∞</div>
                                <div className="stat-label">Secure Enclave</div>
                            </div>
                        </div>
                    </section>

                    <section className="anodized-section" id="security">
                        <div className="section-label">Core Architecture</div>
                        <h2 className="section-title">
                            Anodized
                            <br />
                            <em>Dark Titanium</em>
                            <br />
                            Infrastructure
                        </h2>

                        <div className="anodized-grid inner-shadow-card" id="bentoGrid">
                            <div className="anodized-cell inner-shadow-card reveal-card" data-hover>
                                <div className="cell-icon">🔐</div>
                                <div className="cell-label">Secure Element</div>
                                <div className="cell-title">AES-256 Hardware Encryption</div>
                                <div className="cell-body">
                                    Your card number is never stored on device or Apple servers. Generated per-transaction cryptographic tokens ensure zero-exposure payment architecture.
                                </div>
                            </div>

                            <div className="anodized-cell inner-shadow-card reveal-card" data-hover>
                                <div className="cell-icon">⚡</div>
                                <div className="cell-label">Biometric Auth-Flow</div>
                                <div className="cell-title">Face ID · Neural Engine</div>
                                <div className="cell-body">
                                    Every transaction is authorized through the Secure Enclave using biometric hash comparison. Sub-200ms auth with liveness detection at the hardware level.
                                </div>
                            </div>

                            <div className="anodized-cell inner-shadow-card accent wide reveal-card" data-hover>
                                <div className="cell-label">Real-Time Ledger Telemetry</div>
                                <div style={{ display: "flex", gap: "3rem", alignItems: "flex-end", marginBottom: "1.5rem" }}>
                                    <div>
                                        <div className="cell-metric">$18,240</div>
                                        <div className="cell-metric-unit">Available Credit</div>
                                    </div>
                                    <div>
                                        <div className="cell-metric" style={{ fontSize: "1.8rem", color: "var(--amber)" }}>$2,840</div>
                                        <div className="cell-metric-unit">Balance · Cycle</div>
                                    </div>
                                    <div style={{ marginLeft: "auto" }}>
                                        <div className="ledger-live">
                                            <div className="pulse-dot" />
                                            Live Sync
                                        </div>
                                    </div>
                                </div>

                                <div className="telemetry-bar">
                                    <div className="telem-row">
                                        <span className="telem-key">Auth Speed</span>
                                        <div className="telem-track">
                                            <div className="telem-fill" style={{ width: "94%" }} />
                                        </div>
                                        <span className="telem-val">189ms</span>
                                    </div>

                                    <div className="telem-row">
                                        <span className="telem-key">Fraud Score</span>
                                        <div className="telem-track">
                                            <div className="telem-fill" style={{ width: "99%" }} />
                                        </div>
                                        <span className="telem-val">99.97%</span>
                                    </div>

                                    <div className="telem-row">
                                        <span className="telem-key">Encryption</span>
                                        <div className="telem-track">
                                            <div className="telem-fill" style={{ width: "100%" }} />
                                        </div>
                                        <span className="telem-val">AES-256</span>
                                    </div>

                                    <div className="telem-row">
                                        <span className="telem-key">Ledger Lag</span>
                                        <div className="telem-track">
                                            <div className="telem-fill" style={{ width: "12%", background: "var(--cyan)" }} />
                                        </div>
                                        <span className="telem-val" style={{ color: "var(--cyan)" }}>2.1ms</span>
                                    </div>
                                </div>
                            </div>

                            <div className="anodized-cell inner-shadow-card reveal-card" data-hover>
                                <div className="cell-label">Neural Fraud Detection</div>
                                <div className="cell-metric" style={{ fontSize: "2rem" }}>12M</div>
                                <div className="cell-metric-unit">Signals per second analyzed</div>
                                <div className="cell-body" style={{ marginTop: "0.8rem", fontSize: "0.73rem" }}>
                                    On-device ML model trained on behavioral patterns catches anomalous transactions before they settle.
                                </div>
                            </div>

                            <div className="anodized-cell inner-shadow-card reveal-card" data-hover>
                                <div className="cell-label">Titanium Alloy</div>
                                <div className="cell-metric" style={{ fontSize: "2rem" }}>Grade 5</div>
                                <div className="cell-metric-unit">Ti-6Al-4V · Aerospace</div>
                                <div className="cell-body" style={{ marginTop: "0.8rem", fontSize: "0.73rem" }}>
                                    The same alloy used in surgical instruments and spacecraft. Laser-etched with no exposed numbers.
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="assembly-section">
                        <div className="section-label">Auth-Flow Protocol</div>
                        <h2 className="section-title">
                            Biometric
                            <br />
                            <em>Assembly</em>
                            Sequence
                        </h2>

                        <div className="circuit-row" id="circuitList">
                            <div className="circuit-item" data-circuit>
                                <div className="circuit-num">01</div>
                                <div className="circuit-content">
                                    <div className="circuit-title">Biometric Capture</div>
                                    <div className="circuit-desc">
                                        Face ID or Touch ID initiates a cryptographic challenge to the Secure Enclave. Liveness detection prevents spoofing at the hardware level.
                                    </div>
                                </div>
                                <div className="circuit-badge active">189ms</div>
                            </div>

                            <div className="circuit-item" data-circuit>
                                <div className="circuit-num">02</div>
                                <div className="circuit-content">
                                    <div className="circuit-title">Secure Enclave Verification</div>
                                    <div className="circuit-desc">
                                        The T2 chip compares the biometric hash against the enrolled template. No biometric data ever leaves the device or transits the network.
                                    </div>
                                </div>
                                <div className="circuit-badge active">0.3ms</div>
                            </div>

                            <div className="circuit-item" data-circuit>
                                <div className="circuit-num">03</div>
                                <div className="circuit-content">
                                    <div className="circuit-title">Token Generation</div>
                                    <div className="circuit-desc">
                                        A one-time cryptographic token replaces the card number for each transaction. The actual PAN is never transmitted.
                                    </div>
                                </div>
                                <div className="circuit-badge active">AES-256</div>
                            </div>

                            <div className="circuit-item" data-circuit>
                                <div className="circuit-num">04</div>
                                <div className="circuit-content">
                                    <div className="circuit-title">Neural Fraud Analysis</div>
                                    <div className="circuit-desc">
                                        On-device ML evaluates 12 million behavioral signals in parallel before authorizing. Anomaly detection happens before the network call.
                                    </div>
                                </div>
                                <div className="circuit-badge active">99.97%</div>
                            </div>

                            <div className="circuit-item" data-circuit>
                                <div className="circuit-num">05</div>
                                <div className="circuit-content">
                                    <div className="circuit-title">Real-Time Settlement</div>
                                    <div className="circuit-desc">
                                        Approved transactions post to your ledger in 2.1ms. Daily Cash is calculated and applied within the same settlement cycle.
                                    </div>
                                </div>
                                <div className="circuit-badge active">2.1ms</div>
                            </div>
                        </div>
                    </section>

                    <section className="ledger-section" id="rewards">
                        <div className="section-label">Live Ledger</div>
                        <h2 className="section-title">
                            <em>Real-Time</em>
                            <br />
                            Transaction Stream
                        </h2>

                        <div className="ledger-display inner-shadow-card">
                            <div className="ledger-header">
                                <span className="ledger-title-bar">Ledger · Telemetry Feed</span>
                                <div className="ledger-live">
                                    <div className="pulse-dot" />
                                    Real-Time
                                </div>
                            </div>

                            <div className="ledger-entries" id="ledgerEntries">
                                {ledgerEntries.map((entry, idx) => (
                                    <div className="ledger-entry" key={`${entry.merchant}-${entry.time}-${idx}`}>
                                        <div className="entry-stream" />
                                        <div className="entry-icon">{entry.icon}</div>
                                        <div>
                                            <div className="entry-merchant">{entry.merchant}</div>
                                            <div className="entry-category">{entry.cat}</div>
                                        </div>
                                        <div className="entry-time">{entry.time}</div>
                                        <div
                                            className={`entry-amount ${entry.cls ?? ""}`}
                                            style={
                                                entry.cls === ""
                                                    ? {
                                                        color: "var(--cyan)",
                                                        fontSize: "0.75rem",
                                                        fontFamily: '"JetBrains Mono", monospace',
                                                        letterSpacing: ".08em",
                                                    }
                                                    : undefined
                                            }
                                        >
                                            {entry.amount}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="chart-area">
                                <div className="chart-label">Spending Velocity · 30 Days</div>
                                <div className="sparkline-container">
                                    <svg viewBox="0 0 600 60" preserveAspectRatio="none">
                                        <defs>
                                            <linearGradient id="sg" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="0%" stopColor="oklch(72% 0.18 85)" stopOpacity="0.35" />
                                                <stop offset="100%" stopColor="oklch(72% 0.18 85)" stopOpacity="0" />
                                            </linearGradient>
                                        </defs>
                                        <path d="M0,45 C30,38 50,50 80,32 C110,15 130,42 160,28 C190,14 210,38 240,22 C270,8 290,35 320,20 C350,6 370,30 400,18 C430,6 450,28 480,15 C510,3 530,22 560,12 C580,6 590,16 600,10" fill="url(#sg)" stroke="none" />
                                        <path d="M0,45 C30,38 50,50 80,32 C110,15 130,42 160,28 C190,14 210,38 240,22 C270,8 290,35 320,20 C350,6 370,30 400,18 C430,6 450,28 480,15 C510,3 530,22 560,12 C580,6 590,16 600,10" fill="none" stroke="oklch(72% 0.18 85)" strokeWidth="1.5" opacity="0.9" />
                                        <circle cx="600" cy="10" r="3" fill="oklch(72% 0.18 85)" opacity="0.9">
                                            <animate attributeName="opacity" values="0.9;0.2;0.9" dur="1.5s" repeatCount="indefinite" />
                                        </circle>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="secure-section" id="privacy">
                        <div className="section-label">Security Architecture</div>
                        <h2 className="section-title">
                            Built on the
                            <br />
                            <em>Secure Enclave</em>
                        </h2>

                        <div className="secure-grid inner-shadow-card" id="secureGrid">
                            <div className="secure-cell" data-hover>
                                <span className="secure-icon">🔒</span>
                                <div className="secure-title">Zero Knowledge</div>
                                <div className="secure-desc">
                                    Apple never knows what you buy, where you buy it, or how much you pay. Goldman Sachs never receives your purchase data.
                                </div>
                                <div className="secure-stat">PAN: NEVER STORED</div>
                            </div>

                            <div className="secure-cell" data-hover>
                                <span className="secure-icon">🧬</span>
                                <div className="secure-title">Biometric Binding</div>
                                <div className="secure-desc">
                                    Your biometric template is mathematically bound to the Secure Enclave chip. It cannot be extracted or transmitted.
                                </div>
                                <div className="secure-stat">ENCLAVE: T2 · FIPS 140-2</div>
                            </div>

                            <div className="secure-cell" data-hover>
                                <span className="secure-icon">🛸</span>
                                <div className="secure-title">Neural Fraud AI</div>
                                <div className="secure-desc">
                                    On-device machine learning evaluates transaction context, behavioral patterns and geolocation delta before any network call.
                                </div>
                                <div className="secure-stat">12M SIGNALS / SEC</div>
                            </div>

                            <div className="secure-cell" data-hover>
                                <span className="secure-icon">⚛️</span>
                                <div className="secure-title">Quantum-Resistant</div>
                                <div className="secure-desc">
                                    Post-quantum cryptographic key agreement using CRYSTALS-Kyber lattice-based algorithms. Future-proof by design.
                                </div>
                                <div className="secure-stat">KYBER-1024 · READY</div>
                            </div>

                            <div className="secure-cell" data-hover>
                                <span className="secure-icon">📡</span>
                                <div className="secure-title">Real-Time Alerts</div>
                                <div className="secure-desc">
                                    Instant push notification with merchant geotag, amount, and fraud confidence score. Every transaction, every time.
                                </div>
                                <div className="secure-stat">LATENCY: &lt;200ms</div>
                            </div>

                            <div className="secure-cell" data-hover>
                                <span className="secure-icon">🏦</span>
                                <div className="secure-title">Titanium Body</div>
                                <div className="secure-desc">
                                    Grade 5 aerospace titanium with laser-etched name. No visible card number. No CVV. No expiry date on the surface.
                                </div>
                                <div className="secure-stat">Ti-6Al-4V · GRADE 5</div>
                            </div>
                        </div>
                    </section>
                </div>
            </main>

            <div className="footer-bar">
                <span className="footer-copy">© 2025 APPLE INC. · APPLE CARD IS ISSUED BY GOLDMAN SACHS BANK USA</span>
                <div className="footer-status">
                    <div className="status-chip">
                        <div className="dot dot-green" />
                        Secure Enclave Online
                    </div>
                    <div className="status-chip">
                        <div className="dot dot-amber" />
                        Ledger Sync 2.1ms
                    </div>
                    <div className="status-chip">
                        <div className="dot dot-cyan" />
                        Fraud Engine Active
                    </div>
                </div>
            </div>
        </div>
    )
}