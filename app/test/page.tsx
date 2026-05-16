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
    <main className="min-h-screen bg-[#09090b] text-zinc-50 antialiased selection:bg-[#c5e197] selection:text-black">
      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }

        body {
          margin: 0;
          background-color: #09090b;
          color: #fafafa;
          font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }

        .glass-nav {
          backdrop-filter: blur(5px);
          -webkit-backdrop-filter: blur(5px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        .glass-card {
          background: rgba(24, 24, 27, 0.5);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.08);
        }

        .text-gradient {
          background: linear-gradient(to right, #e2e8f0, #c5e197);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
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
        className={`fixed top-0 z-50 w-full transition-all duration-300 ${
          scrolled ? "glass-nav bg-[#09090b]/90" : "glass-nav bg-[#09090b]/70"
        }`}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          <a href="#home" className="group flex items-center gap-2">
            <Icon
              icon="lucide:aperture"
              className="text-2xl text-white transition-transform duration-500 group-hover:rotate-90"
            />
            <span className="text-lg font-semibold uppercase tracking-widest">Lumina</span>
          </a>

          <div className="hidden items-center gap-8 text-sm font-medium text-zinc-300 md:flex">
            <a href="#features" className="flex items-center gap-1 transition-colors hover:text-white">
              Features
              <Icon icon="lucide:chevron-down" className="text-xs opacity-70" />
            </a>
            <a href="#gallery" className="transition-colors hover:text-white">
              Gallery
            </a>
            <a href="#pricing" className="transition-colors hover:text-white">
              Pricing
            </a>
            <a href="#" className="flex items-center gap-1 transition-colors hover:text-white">
              API
              <Icon icon="lucide:chevron-down" className="text-xs opacity-70" />
            </a>
            <a href="#" className="flex items-center gap-1 transition-colors hover:text-white">
              Resources
              <Icon icon="lucide:chevron-down" className="text-xs opacity-70" />
            </a>
          </div>

          <div className="flex items-center gap-4 sm:gap-6">
            <a href="#" className="hidden text-sm font-medium text-zinc-300 transition-colors hover:text-white sm:block">
              Sign in
            </a>
            <a
              href="#"
              className="rounded-full border border-zinc-700 px-5 py-2.5 text-sm font-medium transition-all duration-300 hover:bg-white hover:text-black"
            >
              Get Started
            </a>
            <button
              type="button"
              aria-label="Toggle menu"
              onClick={() => setMobileOpen((v) => !v)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-zinc-800 bg-white/5 text-white md:hidden"
            >
              <Icon icon={mobileOpen ? "lucide:x" : "lucide:menu"} className="text-xl" />
            </button>
          </div>
        </div>

        <div className={`${mobileOpen ? "block" : "hidden"} border-t border-zinc-900/80 bg-[#09090b]/95 md:hidden`}>
          <div className="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-4 text-sm text-zinc-300">
            <a href="#features" onClick={() => setMobileOpen(false)} className="rounded-xl px-4 py-3 transition-colors hover:bg-white/5 hover:text-white">
              Features
            </a>
            <a href="#gallery" onClick={() => setMobileOpen(false)} className="rounded-xl px-4 py-3 transition-colors hover:bg-white/5 hover:text-white">
              Gallery
            </a>
            <a href="#pricing" onClick={() => setMobileOpen(false)} className="rounded-xl px-4 py-3 transition-colors hover:bg-white/5 hover:text-white">
              Pricing
            </a>
          </div>
        </div>
      </nav>

      <header id="home" className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden pt-20">
        <video autoPlay loop muted playsInline className="absolute inset-0 z-0 h-full w-full object-cover">
          <source src="/video.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/5 via-black/10 to-[#09090b97]" />

        <div className="relative z-20 mx-auto mt-12 flex max-w-4xl flex-col items-center px-4 text-center">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-zinc-700/50 bg-black/30 px-4 py-1.5 backdrop-blur-md">
            <Icon icon="lucide:sparkles" className="text-xs text-[#c5e197]" />
            <span className="text-xs font-medium uppercase tracking-wide text-zinc-300">
              AI Image Generation
            </span>
          </div>

          <h1 className="mb-6 text-5xl font-bold tracking-tight text-white md:text-7xl lg:text-8xl">
            Ideas become <span className="text-gradient">images.</span>
          </h1>

          <p className="mb-10 max-w-2xl text-lg font-light leading-relaxed text-white md:text-xl">
            Generate stunning, high-resolution images from text. <br className="hidden md:block" />
            Fast, intuitive, and built for creators.
          </p>

          <a
            href="#pricing"
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#c5e197] px-8 py-4 text-lg font-medium text-zinc-950 transition-colors duration-300 hover:bg-[#d4edaa]"
          >
            Start Creating
            <Icon icon="lucide:arrow-right" className="transition-transform group-hover:translate-x-1" />
          </a>
        </div>

        <div className="relative z-20 mt-auto flex w-full flex-col items-center px-4 pb-12 pt-24">
          <p className="mb-8 text-xs font-semibold uppercase tracking-widest text-white">
            Trusted by creators at
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 opacity-60 grayscale transition-all duration-500 md:gap-16 hover:grayscale-0">
            <span className="flex items-center gap-1 text-xl font-bold">
              <Icon icon="simple-icons:openai" />
              OpenAI
            </span>
            <span className="text-xl font-bold">Midjourney</span>
            <span className="flex items-center gap-1 text-xl font-bold">
              <Icon icon="simple-icons:adobe" />
              Adobe
            </span>
            <span className="flex items-center gap-1 text-xl font-bold">
              <Icon icon="simple-icons:runway" />
              Runway
            </span>
            <span className="flex items-center gap-1 text-xl font-bold">
              <Icon icon="simple-icons:canva" />
              Canva
            </span>
          </div>
        </div>
      </header>

      <section id="features" className="relative border-t border-zinc-900 bg-[#09090b] px-6 py-32">
        <div className="mx-auto max-w-7xl">
          <div className="mb-20 text-center">
            <h2 className="mb-6 text-3xl font-bold md:text-5xl">Unleash your creativity</h2>
            <p className="mx-auto max-w-2xl text-lg text-zinc-400">
              Powerful tools designed to transform your workflow and bring your wildest concepts to life in seconds.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="glass-card group rounded-2xl p-8 transition-colors hover:bg-zinc-900/80">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-zinc-800 transition-transform group-hover:scale-110">
                <Icon icon="lucide:zap" className="text-xl text-[#c5e197]" />
              </div>
              <h3 className="mb-3 text-xl font-semibold">Lightning Fast</h3>
              <p className="leading-relaxed text-zinc-400">
                Generate batches of high-resolution images in under 3 seconds. Our optimized architecture ensures you never lose your flow state.
              </p>
            </div>

            <div className="glass-card group relative overflow-hidden rounded-2xl p-8 transition-colors hover:bg-zinc-900/80">
              <div className="absolute inset-0 bg-gradient-to-br from-[#c5e197]/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="relative z-10 mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-zinc-800 transition-transform group-hover:scale-110">
                <Icon icon="lucide:maximize" className="text-xl text-[#c5e197]" />
              </div>
              <h3 className="relative z-10 mb-3 text-xl font-semibold">Infinite Upscaling</h3>
              <p className="relative z-10 leading-relaxed text-zinc-400">
                Enhance details and scale your images up to 8K resolution without losing quality, perfect for print and high-end digital media.
              </p>
            </div>

            <div className="glass-card group rounded-2xl p-8 transition-colors hover:bg-zinc-900/80">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-zinc-800 transition-transform group-hover:scale-110">
                <Icon icon="lucide:layers" className="text-xl text-[#c5e197]" />
              </div>
              <h3 className="mb-3 text-xl font-semibold">Style Control</h3>
              <p className="leading-relaxed text-zinc-400">
                Direct the exact aesthetic you need. From photorealism to specific artistic movements, maintain consistency across all your generations.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="gallery" className="border-t border-zinc-900 bg-zinc-950 px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex flex-col items-end justify-between gap-6 md:flex-row md:items-end">
            <div>
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">Made with Lumina</h2>
              <p className="text-zinc-400">Explore what our community is creating right now.</p>
            </div>
            <a href="#" className="flex items-center gap-2 font-medium text-[#c5e197] transition-colors hover:text-[#d4edaa]">
              View all creations
              <Icon icon="lucide:arrow-right" />
            </a>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <div className="group relative aspect-square overflow-hidden rounded-xl bg-zinc-900">
              <img
                src="https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?q=80&w=800&auto=format&fit=crop"
                alt="Gallery image"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-transparent to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <p className="text-sm font-medium">&quot;Cinematic mountain landscape...&quot;</p>
              </div>
            </div>

            <div className="group relative aspect-square overflow-hidden rounded-xl bg-zinc-900 md:col-span-2">
              <img
                src="https://images.unsplash.com/photo-1678912443026-6674e2d7870d?q=80&w=1600&auto=format&fit=crop"
                alt="Gallery image"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-transparent to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <p className="text-sm font-medium">&quot;Cyberpunk city glowing at night...&quot;</p>
              </div>
            </div>

            <div className="group relative aspect-square overflow-hidden rounded-xl bg-zinc-900">
              <img
                src="https://images.unsplash.com/photo-1683009427666-340595e57e43?q=80&w=800&auto=format&fit=crop"
                alt="Gallery image"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-transparent to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <p className="text-sm font-medium">&quot;Abstract fluid simulation...&quot;</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="pricing" className="border-t border-zinc-900 bg-[#09090b] px-6 py-32">
        <div className="mx-auto max-w-7xl">
          <div className="mb-20 text-center">
            <h2 className="mb-6 text-3xl font-bold md:text-5xl">Simple, transparent pricing</h2>
            <p className="mx-auto max-w-xl text-lg text-zinc-400">
              Start creating for free, then scale up as your imagination demands.
            </p>
          </div>

          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3">
            <div className="glass-card flex flex-col rounded-2xl p-8">
              <h3 className="mb-2 text-xl font-medium text-zinc-300">Hobby</h3>
              <div className="mb-6 flex items-baseline gap-1">
                <span className="text-4xl font-bold">$0</span>
                <span className="text-zinc-500">/mo</span>
              </div>
              <ul className="mb-8 flex-1 space-y-4 text-zinc-400">
                <li className="flex items-center gap-3">
                  <Icon icon="lucide:check" className="text-[#c5e197]" />
                  50 generations / month
                </li>
                <li className="flex items-center gap-3">
                  <Icon icon="lucide:check" className="text-[#c5e197]" />
                  Standard resolution
                </li>
                <li className="flex items-center gap-3">
                  <Icon icon="lucide:check" className="text-[#c5e197]" />
                  Community gallery access
                </li>
              </ul>
              <a href="#" className="w-full rounded-xl border border-zinc-700 py-3 text-center font-medium transition-colors hover:bg-zinc-800">
                Start Free
              </a>
            </div>

            <div className="glass-card relative flex flex-col rounded-2xl border-[#c5e197]/30 bg-zinc-900/80 p-8 md:-translate-y-4">
              <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#c5e197] px-3 py-1 text-xs font-bold uppercase tracking-wide text-zinc-950">
                Most Popular
              </div>
              <h3 className="mb-2 text-xl font-medium text-zinc-300">Pro</h3>
              <div className="mb-6 flex items-baseline gap-1">
                <span className="text-4xl font-bold">$15</span>
                <span className="text-zinc-500">/mo</span>
              </div>
              <ul className="mb-8 flex-1 space-y-4 text-zinc-300">
                <li className="flex items-center gap-3">
                  <Icon icon="lucide:check" className="text-[#c5e197]" />
                  1000 generations / month
                </li>
                <li className="flex items-center gap-3">
                  <Icon icon="lucide:check" className="text-[#c5e197]" />
                  Up to 4K resolution
                </li>
                <li className="flex items-center gap-3">
                  <Icon icon="lucide:check" className="text-[#c5e197]" />
                  Commercial usage rights
                </li>
                <li className="flex items-center gap-3">
                  <Icon icon="lucide:check" className="text-[#c5e197]" />
                  Private mode
                </li>
              </ul>
              <a href="#" className="w-full rounded-xl bg-white py-3 text-center font-medium text-black transition-colors hover:bg-zinc-200">
                Upgrade to Pro
              </a>
            </div>

            <div className="glass-card flex flex-col rounded-2xl p-8">
              <h3 className="mb-2 text-xl font-medium text-zinc-300">Studio</h3>
              <div className="mb-6 flex items-baseline gap-1">
                <span className="text-4xl font-bold">$49</span>
                <span className="text-zinc-500">/mo</span>
              </div>
              <ul className="mb-8 flex-1 space-y-4 text-zinc-400">
                <li className="flex items-center gap-3">
                  <Icon icon="lucide:check" className="text-[#c5e197]" />
                  Unlimited generations
                </li>
                <li className="flex items-center gap-3">
                  <Icon icon="lucide:check" className="text-[#c5e197]" />
                  8K infinite upscaling
                </li>
                <li className="flex items-center gap-3">
                  <Icon icon="lucide:check" className="text-[#c5e197]" />
                  API access
                </li>
                <li className="flex items-center gap-3">
                  <Icon icon="lucide:check" className="text-[#c5e197]" />
                  Priority GPU queue
                </li>
              </ul>
              <a href="#" className="w-full rounded-xl border border-zinc-700 py-3 text-center font-medium transition-colors hover:bg-zinc-800">
                Contact Sales
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-zinc-900 bg-[#09090b] px-6 pb-10 pt-20">
        <div className="mx-auto mb-16 grid max-w-7xl grid-cols-2 gap-10 md:grid-cols-5">
          <div className="col-span-2">
            <a href="#home" className="mb-6 flex items-center gap-2">
              <Icon icon="lucide:aperture" className="text-2xl text-white" />
              <span className="text-lg font-semibold uppercase tracking-widest">Lumina</span>
            </a>
            <p className="mb-6 max-w-xs text-zinc-500">
              Transforming the way creators work with artificial intelligence. Built for the future of digital art.
            </p>
            <div className="flex gap-4">
              <a href="#" className="glass-card flex h-10 w-10 items-center justify-center rounded-full text-zinc-400 transition-all hover:border-zinc-500 hover:text-white">
                <Icon icon="lucide:twitter" />
              </a>
              <a href="#" className="glass-card flex h-10 w-10 items-center justify-center rounded-full text-zinc-400 transition-all hover:border-zinc-500 hover:text-white">
                <Icon icon="lucide:github" />
              </a>
              <a href="#" className="glass-card flex h-10 w-10 items-center justify-center rounded-full text-zinc-400 transition-all hover:border-zinc-500 hover:text-white">
                <Icon icon="simple-icons:discord" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="mb-6 font-semibold">Product</h4>
            <ul className="space-y-4 text-sm text-zinc-400">
              <li><a href="#" className="transition-colors hover:text-white">Features</a></li>
              <li><a href="#" className="transition-colors hover:text-white">Pricing</a></li>
              <li><a href="#" className="transition-colors hover:text-white">Gallery</a></li>
              <li><a href="#" className="transition-colors hover:text-white">API</a></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-6 font-semibold">Resources</h4>
            <ul className="space-y-4 text-sm text-zinc-400">
              <li><a href="#" className="transition-colors hover:text-white">Documentation</a></li>
              <li><a href="#" className="transition-colors hover:text-white">Blog</a></li>
              <li><a href="#" className="transition-colors hover:text-white">Community</a></li>
              <li><a href="#" className="transition-colors hover:text-white">Help Center</a></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-6 font-semibold">Company</h4>
            <ul className="space-y-4 text-sm text-zinc-400">
              <li><a href="#" className="transition-colors hover:text-white">About</a></li>
              <li><a href="#" className="transition-colors hover:text-white">Careers</a></li>
              <li><a href="#" className="transition-colors hover:text-white">Privacy</a></li>
              <li><a href="#" className="transition-colors hover:text-white">Terms</a></li>
            </ul>
          </div>
        </div>

        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 border-t border-zinc-900 pt-8 text-sm text-zinc-600 md:flex-row">
          <p>&copy; 2026 Lumina Inc. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Systems Operational
          </div>
        </div>
      </footer>
    </main>
  );
}