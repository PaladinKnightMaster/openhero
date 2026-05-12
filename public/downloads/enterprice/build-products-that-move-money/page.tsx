"use client";

import { useEffect, useMemo, useState } from "react";
import { Icon } from "@iconify/react";

type ModeKey = "billing" | "ledger" | "recon";

export default function Page() {
  const modes = useMemo(
    () =>
      ({
        billing: {
          title: "Billing orchestration",
          copy: "Consolidate invoicing, usage rating, contract terms, and multi-currency collection into a single control surface with deterministic ledger posting.",
        },
        ledger: {
          title: "Fractional ledger core",
          copy: "Represent balances with fractional precision, preserving traceability across entities, subledgers, and real-time settlement events.",
        },
        recon: {
          title: "Reconciliation intelligence",
          copy: "Match bank, processor, and ERP records with policy-aware workflows that isolate anomalies before they reach finance operations.",
        },
      }) as Record<ModeKey, { title: string; copy: string }>,
    []
  );

  const [mode, setMode] = useState<ModeKey>("billing");

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      document.querySelectorAll<HTMLElement>(".float-1, .float-2").forEach((el, i) => {
        const depth = i === 0 ? 0.02 : 0.035;
        el.style.transform = `translateY(${Math.sin(y * 0.001 + i) * 10}px) translateX(${Math.cos(y * 0.001 + i) * depth * 100}px)`;
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const active = modes[mode];

  const setViewMode = (next: ModeKey) => {
    const run = () => setMode(next);
    const doc = document as Document & {
      startViewTransition?: (cb: () => void) => { ready?: Promise<void> };
    };
    if (doc.startViewTransition) doc.startViewTransition(run);
    else run();
  };

  const navClass = (key: ModeKey) =>
    mode === key
      ? "rounded-full border border-slate-950/10 bg-slate-950 px-4 py-2 text-sm text-white shadow-lg transition"
      : "rounded-full border border-white/70 bg-white/70 px-4 py-2 text-sm text-slate-600 shadow-sm transition hover:-translate-y-0.5 hover:bg-white";

  return (
    <main className="relative min-h-screen overflow-x-hidden px-4 py-4 antialiased sm:px-6 lg:px-8">
      <style jsx global>{`
        :root {
          color-scheme: light;
          --canvas: oklch(0.985 0.01 95);
          --pearl: oklch(0.968 0.012 100);
          --ink: oklch(0.22 0.03 260);
          --muted: oklch(0.52 0.02 255);
          --line: oklch(0.9 0.01 95 / 0.65);
          --glow: oklch(0.86 0.05 210 / 0.6);
          --accent: oklch(0.72 0.12 220);
          --accent-2: oklch(0.68 0.14 265);
          --shadow: 0 30px 80px rgba(16, 24, 40, 0.08), 0 8px 24px rgba(16, 24, 40, 0.06);
        }

        html,
        body {
          height: 100%;
          background:
            radial-gradient(1200px 800px at 15% 10%, oklch(0.99 0.01 90), transparent 56%),
            radial-gradient(900px 700px at 88% 18%, oklch(0.97 0.02 220 / 0.55), transparent 50%),
            linear-gradient(180deg, var(--canvas), var(--pearl));
          color: var(--ink);
        }

        body {
          overflow-x: hidden;
          -webkit-font-smoothing: antialiased;
          text-rendering: geometricPrecision;
        }

        .grain {
          pointer-events: none;
          position: fixed;
          inset: 0;
          opacity: 0.28;
          mix-blend-mode: soft-light;
          background-image: radial-gradient(circle at 1px 1px, rgba(15, 23, 42, 0.11) 1px, transparent 0);
          background-size: 18px 18px;
          mask-image: linear-gradient(180deg, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.15) 80%, transparent);
          -webkit-mask-image: linear-gradient(180deg, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.15) 80%, transparent);
        }

        .glass {
          backdrop-filter: blur(40px) saturate(150%);
          -webkit-backdrop-filter: blur(40px) saturate(150%);
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.74), rgba(255, 255, 255, 0.48));
          border: 1px solid rgba(255, 255, 255, 0.72);
          box-shadow: var(--shadow);
        }

        .deboss {
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.85),
            inset 0 -1px 0 rgba(15, 23, 42, 0.04),
            inset 0 18px 36px rgba(255, 255, 255, 0.55),
            0 16px 40px rgba(15, 23, 42, 0.05);
        }

        .soft-edge {
          border: 1px solid transparent;
          background:
            linear-gradient(180deg, rgba(255, 255, 255, 0.78), rgba(255, 255, 255, 0.56)) padding-box,
            linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(148, 163, 184, 0.18), rgba(255, 255, 255, 0.45)) border-box;
        }

        .portal {
          mask-image: radial-gradient(120% 110% at 50% 50%, black 58%, transparent 92%);
          -webkit-mask-image: radial-gradient(120% 110% at 50% 50%, black 58%, transparent 92%);
          transform: translateZ(0);
        }

        .mercury {
          position: relative;
          overflow: hidden;
          isolation: isolate;
        }

        .mercury::before {
          content: "";
          position: absolute;
          inset: -2px;
          background:
            linear-gradient(115deg, rgba(255, 255, 255, 0.96) 0%, rgba(209, 213, 219, 0.8) 22%, rgba(255, 255, 255, 0.6) 42%, rgba(148, 163, 184, 0.18) 58%, rgba(255, 255, 255, 0.86) 76%, rgba(255, 255, 255, 0.98) 100%);
          opacity: 0.74;
          filter: blur(14px);
          transform: translateX(-18%);
          transition:
            transform 700ms cubic-bezier(0.2, 0.8, 0.2, 1),
            opacity 700ms cubic-bezier(0.2, 0.8, 0.2, 1);
          z-index: -1;
        }

        .mercury:hover::before {
          transform: translateX(8%);
          opacity: 0.92;
        }

        .field {
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.92), rgba(248, 250, 252, 0.78));
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.88),
            inset 0 -8px 18px rgba(148, 163, 184, 0.08),
            0 10px 24px rgba(15, 23, 42, 0.04);
        }

        @keyframes bob {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .float-1 {
          animation: bob 7s ease-in-out infinite;
        }

        .float-2 {
          animation: bob 9s ease-in-out infinite reverse;
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

      <div className="grain" />

      <div className="mx-auto max-w-7xl">
        <header className="glass deboss sticky top-3 z-50 mx-auto flex max-w-7xl items-center justify-between rounded-[28px] px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-2xl soft-edge">
              <div className="h-4 w-4 rounded-full bg-[var(--accent)] shadow-[0_0_30px_rgba(59,130,246,0.45)]" />
            </div>
            <div>
              <div className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">Ledger Cloud</div>
              <div className="text-xs text-slate-400">Enterprise billing orchestration</div>
            </div>
          </div>

          <nav className="hidden items-center gap-2 md:flex">
            <button type="button" onClick={() => setViewMode("billing")} className={navClass("billing")}>
              Billing
            </button>
            <button type="button" onClick={() => setViewMode("ledger")} className={navClass("ledger")}>
              Ledger
            </button>
            <button type="button" onClick={() => setViewMode("recon")} className={navClass("recon")}>
              Reconciliation
            </button>
          </nav>

          <button
            type="button"
            onClick={() => {
              setViewMode("ledger");
              const target = document.querySelector<HTMLElement>("#details-section");
              target?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
            className="mercury rounded-full px-5 py-2.5 text-sm font-medium text-slate-900 shadow-[0_8px_24px_rgba(15,23,42,0.08)]"
          >
            <span className="inline-flex items-center gap-2">
              <Icon icon="mdi:arrow-top-right" className="text-lg" />
              Request access
            </span>
          </button>
        </header>

        <section className="relative mt-6 overflow-hidden rounded-[36px] soft-edge p-4 sm:p-6 lg:p-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.9),transparent_34%),radial-gradient(circle_at_80%_18%,rgba(191,219,254,0.48),transparent_26%),linear-gradient(180deg,rgba(255,255,255,0.22),rgba(255,255,255,0.5))]" />
          <div className="relative grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-stretch">
            <div className="grid gap-6">
              <div className="glass deboss rounded-[34px] p-6 sm:p-8 lg:p-10">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/70 px-3 py-1 text-xs font-medium text-slate-500">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_18px_rgba(74,222,128,0.7)]" />
                  ISO 20022 ready · sub-millisecond finality · fractional ledgers
                </div>
                <h1 className="mt-5 max-w-3xl text-5xl font-semibold leading-[0.95] tracking-[-0.05em] text-slate-950 sm:text-6xl lg:text-7xl">
                  A lucid control surface for global money movement.
                </h1>
                <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
                  Unify invoicing, settlement, and ledger operations across multi-entity billing, treasury routing, and audit-grade reconciliation. Built for enterprise teams that need precision without visual noise.
                </p>
                <div className="mt-7 flex flex-wrap items-center gap-3">
                  <button type="button" className="mercury rounded-full px-5 py-3 text-sm font-semibold text-slate-900">
                    Launch flow
                  </button>
                  <button type="button" className="rounded-full border border-white/80 bg-white/60 px-5 py-3 text-sm font-semibold text-slate-600 shadow-sm">
                    View architecture
                  </button>
                  <div className="rounded-full border border-white/70 bg-white/60 px-4 py-3 text-sm text-slate-500">
                    Live settlement rails · FedNow · RTP · ACH
                  </div>
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
                <article className="glass deboss rounded-[30px] p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium text-slate-400">Operational ledger</div>
                      <div className="mt-1 text-2xl font-semibold tracking-[-0.03em] text-slate-950">$4.2B</div>
                    </div>
                    <div className="rounded-2xl border border-white/75 bg-white/70 px-3 py-2 text-xs text-slate-500">Audit trail intact</div>
                  </div>
                  <div className="mt-5 grid gap-3">
                    <div className="field rounded-2xl px-4 py-3">
                      <div className="text-[11px] uppercase tracking-[0.2em] text-slate-400">Invoice capture</div>
                      <div className="mt-1 text-sm font-medium text-slate-700">Normalized remittance data, schema-validated.</div>
                    </div>
                    <div className="field rounded-2xl px-4 py-3">
                      <div className="text-[11px] uppercase tracking-[0.2em] text-slate-400">Posting engine</div>
                      <div className="mt-1 text-sm font-medium text-slate-700">Double-entry updates with idempotent events.</div>
                    </div>
                  </div>
                </article>

                <article className="glass deboss rounded-[30px] p-6">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium text-slate-400">Control plane</div>
                    <div className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">Live</div>
                  </div>
                  <div className="mt-4 space-y-3 text-sm text-slate-600">
                    <div className="flex items-center justify-between rounded-2xl bg-white/70 px-4 py-3 shadow-sm">
                      <span>Payment orchestration</span>
                      <span className="font-semibold text-slate-900">97.9%</span>
                    </div>
                    <div className="flex items-center justify-between rounded-2xl bg-white/70 px-4 py-3 shadow-sm">
                      <span>Auto-reconciliation</span>
                      <span className="font-semibold text-slate-900">99.6%</span>
                    </div>
                    <div className="flex items-center justify-between rounded-2xl bg-white/70 px-4 py-3 shadow-sm">
                      <span>Exception queue</span>
                      <span className="font-semibold text-slate-900">12 open</span>
                    </div>
                  </div>
                </article>
              </div>
            </div>

            <aside className="relative min-h-[760px] lg:min-h-0">
              <div className="portal absolute right-0 top-8 h-[560px] w-[88%] overflow-hidden rounded-[40px] border border-white/80 bg-white/40 shadow-[0_24px_90px_rgba(15,23,42,0.12)] lg:top-0 lg:h-full">
                <video
                  className="absolute inset-0 h-full w-full object-cover opacity-90"
                  autoPlay
                  muted
                  loop
                  playsInline
                  poster="https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1200&q=80"
                >
                  <source src="./video.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.1),transparent_35%),linear-gradient(180deg,rgba(15,23,42,0.1),rgba(15,23,42,0.42))]" />
                <div className="absolute inset-x-4 top-4 flex items-center justify-between rounded-[24px] border border-white/20 bg-black/40 px-4 py-3 text-white backdrop-blur-2xl">
                  <div>
                    <div className="text-xs uppercase tracking-[0.24em] text-white/70">Portal stream</div>
                    <div className="text-sm font-medium">Urban rails · data center routes</div>
                  </div>
                  <div className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">PIP</div>
                </div>
                <div className="absolute bottom-4 left-4 right-4 grid gap-3 sm:grid-cols-2">
                  <div className="glass rounded-[24px] px-4 py-4 text-slate-900">
                    <div className="text-[11px] uppercase tracking-[0.2em] text-slate-500">Latency</div>
                    <div className="mt-1 text-2xl font-semibold tracking-[-0.04em]">0.8 ms</div>
                  </div>
                  <div className="glass rounded-[24px] px-4 py-4 text-slate-900">
                    <div className="text-[11px] uppercase tracking-[0.2em] text-slate-500">Finality</div>
                    <div className="mt-1 text-2xl font-semibold tracking-[-0.04em]">99.99%</div>
                  </div>
                </div>
              </div>

              <div className="float-1 glass deboss absolute left-0 top-1/2 w-[58%] -translate-y-1/2 rounded-[30px] p-5 shadow-[0_30px_80px_rgba(15,23,42,0.12)] lg:left-[-6%]">
                <div className="text-xs uppercase tracking-[0.2em] text-slate-400">Reference ledger</div>
                <div className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-slate-950">$18,240,000.00</div>
                <div className="mt-3 space-y-2 text-sm text-slate-600">
                  <div className="flex items-center justify-between">
                    <span>Cash position</span>
                    <span className="font-medium text-slate-900">Balanced</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>FX exposure</span>
                    <span className="font-medium text-slate-900">Neutral</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Exceptions</span>
                    <span className="font-medium text-slate-900">3 events</span>
                  </div>
                </div>
              </div>

              <div className="float-2 glass deboss absolute right-3 top-[18%] w-[40%] rounded-[28px] p-4 lg:right-[-4%]">
                <div className="text-[11px] uppercase tracking-[0.2em] text-slate-400">Smart routing</div>
                <div className="mt-2 text-sm leading-6 text-slate-700">Ledger-aware payment paths with programmable controls and reserve logic.</div>
              </div>
            </aside>
          </div>
        </section>

        <section id="details-section" className="mt-6 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="glass deboss rounded-[32px] p-6 sm:p-8">
            <div className="flex items-end justify-between gap-4">
              <div>
                <div className="text-sm font-medium text-slate-400">Selected mode</div>
                <h2 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-slate-950">{active.title}</h2>
              </div>
              <div className="rounded-full bg-slate-950 px-3 py-1 text-xs font-semibold text-white">View Transition</div>
            </div>
            <p className="mt-4 max-w-xl text-sm leading-7 text-slate-600">{active.copy}</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <div className="field rounded-[24px] px-4 py-4">
                <div className="text-[11px] uppercase tracking-[0.2em] text-slate-400">ISO 20022</div>
                <div className="mt-1 text-sm font-medium text-slate-700">Structured remittance payloads.</div>
              </div>
              <div className="field rounded-[24px] px-4 py-4">
                <div className="text-[11px] uppercase tracking-[0.2em] text-slate-400">Posting</div>
                <div className="mt-1 text-sm font-medium text-slate-700">Idempotent double-entry updates.</div>
              </div>
              <div className="field rounded-[24px] px-4 py-4">
                <div className="text-[11px] uppercase tracking-[0.2em] text-slate-400">Control</div>
                <div className="mt-1 text-sm font-medium text-slate-700">Policy-driven release logic.</div>
              </div>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <article className="glass deboss rounded-[32px] p-6">
              <div className="text-sm font-medium text-slate-400">Treasury mesh</div>
              <div className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-slate-950">Liquidity + routing</div>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                Balance rails, reserves, and payout windows with a unified source of truth for every entity and jurisdiction.
              </p>
            </article>

            <article className="glass deboss rounded-[32px] p-6">
              <div className="text-sm font-medium text-slate-400">Reconciliation</div>
              <div className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-slate-950">Exception handling</div>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                Surface mismatches with audit-ready traces, supporting rapid resolution for high-volume enterprise operations.
              </p>
            </article>

            <article className="glass deboss rounded-[32px] p-6 sm:col-span-2">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="text-sm font-medium text-slate-400">Operational cadence</div>
                  <div className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-slate-950">
                    Every surface responds like a physical instrument.
                  </div>
                </div>
                <div className="grid gap-2 text-right text-sm text-slate-600">
                  <div>Native scroll depth</div>
                  <div>View transitions for panel swaps</div>
                  <div>OKLCH-derived pearl palette</div>
                </div>
              </div>
            </article>
          </div>
        </section>
      </div>
    </main>
  );
}