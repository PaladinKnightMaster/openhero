"use client";

import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";

export default function Page() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <main className="min-h-screen bg-[#020617] text-slate-50 antialiased selection:bg-brand selection:text-white">
      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }

        body {
          margin: 0;
          background-color: #020617;
          color: #f8fafc;
          font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }

        .glass-card {
          background: rgba(15, 23, 42, 0.5);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.08);
        }

        .text-gradient {
          position: relative;
          display: inline-block;
          background: linear-gradient(to right, #4ade80, #facc15);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .text-gradient::after {
          content: attr(data-text);
          position: absolute;
          left: 0;
          top: 0;
          z-index: -1;
          -webkit-text-fill-color: initial;
          text-shadow: 0 0 15px rgba(0, 0, 0, 0.9), 0 0 30px rgba(0, 0, 0, 0.7);
        }

        .hide-scroll::-webkit-scrollbar {
          display: none;
        }

        .hide-scroll {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      <nav
        className={`fixed top-0 z-50 w-full transition-all duration-300 ${scrolled ? "bg-[#020617]/80 backdrop-blur-xl border-b border-slate-800/80" : "bg-[#020617]/40 backdrop-blur-xl"}`}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          <a href="#home" className="group flex items-center gap-2">
            <Icon
              icon="lucide:wind"
              className="text-2xl text-brand transition-transform duration-500 group-hover:translate-x-1"
            />
            <span className="text-lg font-semibold uppercase tracking-widest text-white">
              Senkei
            </span>
          </a>

          <div className="hidden items-center gap-8 text-sm font-medium text-slate-300 md:flex">
            <a href="#features" className="flex items-center gap-1 transition-colors hover:text-white">
              Features
              <Icon icon="lucide:chevron-down" className="text-xs opacity-70" />
            </a>
            <a href="#worlds" className="transition-colors hover:text-white">
              Worlds
            </a>
            <a href="#pricing" className="transition-colors hover:text-white">
              Pricing
            </a>
            <a href="#" className="flex items-center gap-1 transition-colors hover:text-white">
              Engine
              <Icon icon="lucide:chevron-down" className="text-xs opacity-70" />
            </a>
            <a href="#" className="flex items-center gap-1 transition-colors hover:text-white">
              Assets
              <Icon icon="lucide:chevron-down" className="text-xs opacity-70" />
            </a>
          </div>

          <div className="flex items-center gap-3 sm:gap-6">
            <a
              href="#"
              className="hidden text-sm font-medium text-slate-300 transition-colors hover:text-white sm:block"
            >
              Sign in
            </a>
            <a
              href="#pricing"
              className="rounded-full border border-white px-5 py-2.5 text-sm font-medium transition-all duration-300 hover:border-brand hover:bg-brand hover:text-white"
            >
              Start Journey
            </a>
            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white md:hidden"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              <Icon icon={mobileOpen ? "lucide:x" : "lucide:menu"} className="text-xl" />
            </button>
          </div>
        </div>

        <div className={`md:hidden ${mobileOpen ? "block" : "hidden"} border-t border-slate-800/70 bg-[#020617]/95 backdrop-blur-xl`}>
          <div className="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-4 text-sm text-slate-300">
            <a href="#features" className="rounded-xl px-4 py-3 transition-colors hover:bg-white/5 hover:text-white" onClick={() => setMobileOpen(false)}>
              Features
            </a>
            <a href="#worlds" className="rounded-xl px-4 py-3 transition-colors hover:bg-white/5 hover:text-white" onClick={() => setMobileOpen(false)}>
              Worlds
            </a>
            <a href="#pricing" className="rounded-xl px-4 py-3 transition-colors hover:bg-white/5 hover:text-white" onClick={() => setMobileOpen(false)}>
              Pricing
            </a>
          </div>
        </div>
      </nav>

      <header id="home" className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden pt-20">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 z-0 h-full w-full object-cover [mask-image:linear-gradient(to_bottom,rgba(0,0,0,1)_60%,rgba(0,0,0,0)_100%)] [webkit-mask-image:linear-gradient(to_bottom,rgba(0,0,0,1)_60%,rgba(0,0,0,0)_100%)]"
        >
          <source src="/video.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_50%_20%,rgba(255,255,255,0.08),transparent_30%),linear-gradient(180deg,rgba(2,6,23,0.15)_0%,rgba(2,6,23,0.45)_50%,rgba(2,6,23,0.92)_100%)]" />

        <div className="relative z-20 mx-auto mt-12 flex max-w-4xl flex-col items-center px-4 text-center">
          <h1 className="mb-6 text-5xl font-bold tracking-tight text-white filter [filter:drop-shadow(0_0_15px_rgba(0,0,0,0.5))_drop-shadow(0_0_30px_rgba(0,0,0,0.4))] md:text-7xl lg:text-8xl">
            Breathe life into your <br />
            <span className="text-gradient" data-text="worlds.">
              worlds.
            </span>
          </h1>
          <p className="mb-10 max-w-2xl text-lg font-light leading-relaxed text-white md:text-xl [text-shadow:0_0_8px_rgba(0,0,0,1),0_0_12px_rgba(0,0,0,1),0_0_24px_rgba(0,0,0,1),0_0_40px_rgba(0,0,0,0.8)]">
            Generate breathtaking anime landscapes, dynamic weather, and majestic lighting. <br className="hidden md:block" />
            Build epic scenes built for true storytelling.
          </p>

          <a
            href="#pricing"
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-brand px-8 py-4 text-lg font-semibold text-white shadow-[0_0_30px_-5px_rgba(34,197,94,0.5)] transition-all duration-300 hover:bg-brand-light hover:text-slate-900"
          >
            Create Your Scene
            <Icon icon="lucide:arrow-right" className="transition-transform group-hover:translate-x-1" />
          </a>
        </div>

        <div className="relative z-20 mt-auto flex w-full flex-col items-center px-4 pb-12 pt-24">
          <p className="mb-8 text-xs font-semibold uppercase tracking-widest text-slate-300 drop-shadow-md">
            Trusted by visual creators at
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 text-white opacity-70 grayscale transition-all duration-500 md:gap-16 hover:grayscale-0">
            <span className="flex items-center gap-2 text-xl font-bold">
              <Icon icon="simple-icons:unrealengine" />
              Unreal Engine
            </span>
            <span className="flex items-center gap-2 text-xl font-bold">
              <Icon icon="simple-icons:unity" />
              Unity
            </span>
            <span className="flex items-center gap-2 text-xl font-bold">
              <Icon icon="simple-icons:blender" />
              Blender
            </span>
            <span className="flex items-center gap-2 text-xl font-bold">
              <Icon icon="simple-icons:wacom" />
              Wacom
            </span>
            <span className="flex items-center gap-2 text-xl font-bold">
              <Icon icon="simple-icons:adobe" />
              Adobe
            </span>
          </div>
        </div>
      </header>

      <section id="features" className="relative bg-[#020617] px-6 py-32">
        <div className="absolute left-0 top-1/2 h-96 w-96 -z-0 rounded-full bg-brand/10 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 h-96 w-96 -z-0 rounded-full bg-yellow-400/5 blur-[100px] pointer-events-none" />
        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="mb-20 text-center">
            <h2 className="mb-6 text-3xl font-bold md:text-5xl">Forge your narrative</h2>
            <p className="mx-auto max-w-2xl text-lg text-slate-400">
              Powerful rendering tools designed to match the emotional weight of your characters and the epic scale of their journeys.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="glass-card group rounded-2xl p-8 transition-colors hover:bg-slate-800/80">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-slate-800 shadow-lg shadow-brand/20 transition-transform group-hover:scale-110">
                <Icon icon="lucide:cloud-sun" className="text-xl text-brand" />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-white">Cinematic Atmosphere</h3>
              <p className="leading-relaxed text-slate-400">
                Simulate volumetric lighting, god rays, and atmospheric scattering to give your landscapes that authentic, studio-quality warmth.
              </p>
            </div>

            <div className="glass-card group relative overflow-hidden rounded-2xl p-8 transition-colors hover:bg-slate-800/80">
              <div className="absolute inset-0 bg-gradient-to-br from-brand/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="relative z-10 mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-slate-800 shadow-lg shadow-yellow-400/20 transition-transform group-hover:scale-110">
                <Icon icon="lucide:wind" className="text-xl text-yellow-400" />
              </div>
              <h3 className="relative z-10 mb-3 text-xl font-semibold text-white">Dynamic Physics</h3>
              <p className="relative z-10 leading-relaxed text-slate-400">
                Control the flow of the wind, falling leaves, rushing water, and floating embers with intuitive particle system generators.
              </p>
            </div>

            <div className="glass-card group rounded-2xl p-8 transition-colors hover:bg-slate-800/80">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-slate-800 shadow-lg shadow-brand/20 transition-transform group-hover:scale-110">
                <Icon icon="lucide:mountain-snow" className="text-xl text-brand" />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-white">Epic Scale Generation</h3>
              <p className="leading-relaxed text-slate-400">
                Instantly populate endless mountain ranges, dense bamboo forests, and tranquil hidden lakes using advanced procedural generation.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="worlds" className="relative overflow-hidden border-t border-slate-800 bg-slate-900 px-6 py-24">
        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="mb-12 flex flex-col items-end justify-between gap-6 md:flex-row md:items-end">
            <div>
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">Discovered Worlds</h2>
              <p className="text-slate-400">Explore breathtaking realms forged by our community.</p>
            </div>
            <a href="#" className="flex items-center gap-2 font-medium text-brand transition-colors hover:text-brand-light">
              View all landscapes
              <Icon icon="lucide:arrow-right" />
            </a>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <div className="group relative aspect-square overflow-hidden rounded-xl bg-slate-800">
              <img
                src="https://images.unsplash.com/photo-1542224566-6e85f2e6772f?q=80&w=800&auto=format&fit=crop"
                alt="Mountain Landscape"
                className="h-full w-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-110 group-hover:opacity-100 group-hover:mix-blend-normal md:mix-blend-luminosity"
              />
              <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-slate-950/90 via-transparent to-transparent p-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <p className="text-sm font-medium text-white">&quot;Hidden Valley Shrine...&quot;</p>
              </div>
            </div>

            <div className="group relative aspect-square overflow-hidden rounded-xl bg-slate-800 md:col-span-2">
              <img
                src="https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=1600&auto=format&fit=crop"
                alt="Lush Forest"
                className="h-full w-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105 group-hover:opacity-100"
              />
              <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <p className="mb-1 text-lg font-bold text-white">Morning Dew</p>
                <p className="text-sm font-medium text-slate-300">&quot;Sunlight piercing through a dense ancient forest...&quot;</p>
              </div>
            </div>

            <div className="group relative aspect-square overflow-hidden rounded-xl bg-slate-800">
              <img
                src="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=800&auto=format&fit=crop"
                alt="Water Landscape"
                className="h-full w-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-110 group-hover:opacity-100 group-hover:mix-blend-normal md:mix-blend-luminosity"
              />
              <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-slate-950/90 via-transparent to-transparent p-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <p className="text-sm font-medium text-white">&quot;Tranquil Lake at dusk...&quot;</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="pricing" className="relative border-t border-slate-800 bg-[#020617] px-6 py-32">
        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="mb-20 text-center">
            <h2 className="mb-6 text-3xl font-bold md:text-5xl">Equip your arsenal</h2>
            <p className="mx-auto max-w-xl text-lg text-slate-400">
              Begin your journey for free, and unlock legendary powers as your story grows.
            </p>
          </div>

          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3">
            <div className="glass-card flex flex-col rounded-2xl border-slate-800 p-8">
              <h3 className="mb-2 text-xl font-medium text-slate-300">Wanderer</h3>
              <div className="mb-6 flex items-baseline gap-1">
                <span className="text-4xl font-bold text-white">$0</span>
                <span className="text-slate-500">/mo</span>
              </div>
              <ul className="mb-8 flex-1 space-y-4 text-slate-400">
                <li className="flex items-center gap-3">
                  <Icon icon="lucide:check" className="text-brand" />
                  50 generations / month
                </li>
                <li className="flex items-center gap-3">
                  <Icon icon="lucide:check" className="text-brand" />
                  Standard 1080p resolution
                </li>
                <li className="flex items-center gap-3">
                  <Icon icon="lucide:check" className="text-brand" />
                  Access to public biomes
                </li>
              </ul>
              <a
                href="#"
                className="w-full rounded-xl border border-slate-700 py-3 text-center font-medium text-white transition-colors hover:bg-slate-800"
              >
                Start Free
              </a>
            </div>

            <div className="glass-card relative flex flex-col rounded-2xl border-brand/50 bg-slate-900 p-8 shadow-[0_0_40px_-10px_rgba(34,197,94,0.15)] md:-translate-y-4">
              <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand px-4 py-1 text-xs font-bold uppercase tracking-wide text-white shadow-lg">
                Most Popular
              </div>
              <h3 className="mb-2 text-xl font-medium text-brand-light">Adventurer</h3>
              <div className="mb-6 flex items-baseline gap-1">
                <span className="text-4xl font-bold text-white">$19</span>
                <span className="text-slate-500">/mo</span>
              </div>
              <ul className="mb-8 flex-1 space-y-4 text-slate-200">
                <li className="flex items-center gap-3">
                  <Icon icon="lucide:check" className="text-brand" />
                  1000 generations / month
                </li>
                <li className="flex items-center gap-3">
                  <Icon icon="lucide:check" className="text-brand" />
                  4K Cinematic upscaling
                </li>
                <li className="flex items-center gap-3">
                  <Icon icon="lucide:check" className="text-brand" />
                  Commercial rights included
                </li>
                <li className="flex items-center gap-3">
                  <Icon icon="lucide:check" className="text-brand" />
                  Custom particle physics
                </li>
              </ul>
              <a
                href="#"
                className="w-full rounded-xl bg-brand py-3 text-center font-semibold text-white shadow-lg shadow-brand/20 transition-all hover:bg-brand-light hover:text-slate-900"
              >
                Become an Adventurer
              </a>
            </div>

            <div className="glass-card flex flex-col rounded-2xl border-slate-800 p-8">
              <h3 className="mb-2 text-xl font-medium text-slate-300">Legend</h3>
              <div className="mb-6 flex items-baseline gap-1">
                <span className="text-4xl font-bold text-white">$65</span>
                <span className="text-slate-500">/mo</span>
              </div>
              <ul className="mb-8 flex-1 space-y-4 text-slate-400">
                <li className="flex items-center gap-3">
                  <Icon icon="lucide:check" className="text-brand" />
                  Unlimited generation
                </li>
                <li className="flex items-center gap-3">
                  <Icon icon="lucide:check" className="text-brand" />
                  8K Export & Raw passes
                </li>
                <li className="flex items-center gap-3">
                  <Icon icon="lucide:check" className="text-brand" />
                  Unreal Engine API Plugin
                </li>
                <li className="flex items-center gap-3">
                  <Icon icon="lucide:check" className="text-brand" />
                  Priority GPU access
                </li>
              </ul>
              <a
                href="#"
                className="w-full rounded-xl border border-slate-700 py-3 text-center font-medium text-white transition-colors hover:bg-slate-800"
              >
                Contact Guild
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-800 bg-[#020617] px-6 pb-10 pt-20">
        <div className="mx-auto mb-16 grid max-w-7xl grid-cols-2 gap-10 md:grid-cols-5">
          <div className="col-span-2">
            <a href="#home" className="mb-6 flex items-center gap-2">
              <Icon icon="lucide:wind" className="text-2xl text-brand" />
              <span className="text-lg font-semibold uppercase tracking-widest text-white">Senkei</span>
            </a>
            <p className="mb-6 max-w-xs text-slate-400">
              Crafting the next generation of visual storytelling tools. Immerse your audience in worlds they will never want to leave.
            </p>
            <div className="flex gap-4">
              <a href="#" className="glass-card flex h-10 w-10 items-center justify-center rounded-full text-slate-400 transition-all hover:border-brand hover:text-brand">
                <Icon icon="lucide:twitter" />
              </a>
              <a href="#" className="glass-card flex h-10 w-10 items-center justify-center rounded-full text-slate-400 transition-all hover:border-brand hover:text-brand">
                <Icon icon="lucide:github" />
              </a>
              <a href="#" className="glass-card flex h-10 w-10 items-center justify-center rounded-full text-slate-400 transition-all hover:border-brand hover:text-brand">
                <Icon icon="simple-icons:discord" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="mb-6 font-semibold text-white">Platform</h4>
            <ul className="space-y-4 text-sm text-slate-400">
              <li><a href="#" className="transition-colors hover:text-brand">Features</a></li>
              <li><a href="#" className="transition-colors hover:text-brand">Pricing</a></li>
              <li><a href="#" className="transition-colors hover:text-brand">Showcase</a></li>
              <li><a href="#" className="transition-colors hover:text-brand">API Access</a></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-6 font-semibold text-white">Resources</h4>
            <ul className="space-y-4 text-sm text-slate-400">
              <li><a href="#" className="transition-colors hover:text-brand">Documentation</a></li>
              <li><a href="#" className="transition-colors hover:text-brand">Tutorials</a></li>
              <li><a href="#" className="transition-colors hover:text-brand">Community Forum</a></li>
              <li><a href="#" className="transition-colors hover:text-brand">Support Grimoire</a></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-6 font-semibold text-white">Guild</h4>
            <ul className="space-y-4 text-sm text-slate-400">
              <li><a href="#" className="transition-colors hover:text-brand">About Us</a></li>
              <li><a href="#" className="transition-colors hover:text-brand">Careers</a></li>
              <li><a href="#" className="transition-colors hover:text-brand">Privacy Policy</a></li>
              <li><a href="#" className="transition-colors hover:text-brand">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 border-t border-slate-800 pt-8 text-sm text-slate-500 md:flex-row">
          <p>&copy; 2026 Senkei Engine. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-brand animate-pulse" />
            Servers Stable
          </div>
        </div>
      </footer>
    </main>
  );
}