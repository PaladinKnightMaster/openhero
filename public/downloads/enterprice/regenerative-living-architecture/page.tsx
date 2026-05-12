"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";

const portfolio = [
  {
    eyebrow: "Solar villa",
    title: "The Orchard Residence",
    description:
      "A secluded villa with photovoltaic skin, thermal mass, and native planting for passive cooling.",
    image:
      "https://images.unsplash.com/photo-1448630360428-65456885c650?auto=format&fit=crop&w=1400&q=80",
    tags: ["Net-positive", "Solar-ready", "Biophilic"],
  },
  {
    eyebrow: "Urban biophilic",
    title: "Canopy District",
    description:
      "A mixed-use living block where terraces, trees, and daylight choreograph a softer city rhythm.",
    image:
      "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1400&q=80",
    tags: ["Geothermal", "Airflow tuned", "Low impact"],
  },
];

const principleCards = [
  {
    eyebrow: "Geothermal equilibrium",
    text: "Cooling and heating that feel invisible, stable, and deeply efficient.",
  },
  {
    eyebrow: "Subsurface scattering",
    text: "Soft inner glows and translucent surfaces that suggest organic matter rather than hard product UI.",
  },
  {
    eyebrow: "Bloom motion",
    text: "Viewport reveals that feel like vegetation opening to light rather than generic animation.",
  },
];

export default function Page() {
  const heroVideoRef = useRef<HTMLVideoElement | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const updateHero = () => {
      const max = window.innerHeight * 1.15;
      const progress = Math.min(Math.max(window.scrollY / max, 0), 1);
      const scale = 1.02 + progress * 0.16;
      const translateY = progress * 18;

      if (heroVideoRef.current) {
        heroVideoRef.current.style.transform = `scale(${scale}) translateY(${translateY}px)`;
      }

      setScrolled(window.scrollY > 30);
    };

    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        updateHero();
        raf = 0;
      });
    };

    updateHero();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateHero);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateHero);
    };
  }, []);

  useEffect(() => {
    const targets = document.querySelectorAll("[data-bloom]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.currentTarget;
    const rect = target.getBoundingClientRect();
    target.style.setProperty("--x", `${e.clientX - rect.left}px`);
    target.style.setProperty("--y", `${e.clientY - rect.top}px`);
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[linear-gradient(180deg,oklch(14%_0.02_145)_0%,oklch(12%_0.02_145)_48%,oklch(9%_0.02_145)_100%)] text-white antialiased">
      <div className="grain fixed inset-0 -z-10 opacity-[0.032] mix-blend-screen" />

      <header className={`fixed left-0 top-0 z-50 w-full border-b border-white/10 bg-black/10 backdrop-blur-xl transition-colors ${scrolled ? "bg-black/20" : ""}`}>
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-4 lg:px-10">
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-[1.4rem] border border-white/10 bg-white/20 shell">
              <Icon icon="ph:leaf-bold" className="text-xl text-white/80" />
            </div>
            <div className="leading-tight">
              <div className="data text-[11px] uppercase tracking-[0.34em] text-white/42">Terraform Estates</div>
              <div className="copy text-sm text-white/72">Regenerative Living Architecture</div>
            </div>
          </div>

          <nav className="hidden items-center gap-8 text-[11px] uppercase tracking-[0.24em] text-white/46 md:flex">
            <a href="#concept" className="transition-colors hover:text-white">Concept</a>
            <a href="#portfolio" className="transition-colors hover:text-white">Portfolio</a>
            <a href="#principles" className="transition-colors hover:text-white">Principles</a>
            <a href="#contact" className="transition-colors hover:text-white">Contact</a>
          </nav>

          <button onMouseMove={handleMove} className="dew shell squircle px-5 py-2.5 copy text-sm text-white/90">
            Request access
          </button>
        </div>
      </header>

      <main className="relative pt-[72px]">
        <section className="relative min-h-[100svh] overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(255,255,255,.08),transparent_28%),radial-gradient(circle_at_20%_12%,rgba(234,179,8,.12),transparent_18%),radial-gradient(circle_at_82%_18%,rgba(34,197,94,.12),transparent_18%),linear-gradient(180deg,rgba(6,10,7,.2),rgba(5,8,6,.72))]" />
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_48%,transparent_0_24%,rgba(0,0,0,.28)_45%,rgba(0,0,0,.58)_100%)]" />
          <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(180deg,rgba(0,0,0,.08),rgba(0,0,0,.28))]" />

          <div className="portal-shell fade-mask absolute inset-0">
            <video
              ref={heroVideoRef}
              autoPlay
              muted
              loop
              playsInline
              className="portal-video absolute inset-0 h-full w-full object-cover brightness-90 contrast-[1.08] saturate-110"
            >
              <source src="/video.mp4" type="video/mp4" />
            </video>
          </div>

          <div className="relative z-10 mx-auto flex min-h-[calc(100svh-72px)] max-w-[1600px] items-center px-6 py-10 lg:px-10">
            <div className="grid w-full gap-10 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
              <div data-bloom className="hero-copy bloom max-w-3xl">
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/50 px-4 py-2 shell-mist copy text-[11px] text-white/68">
                  <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_18px_rgba(134,239,172,.55)]" />
                  Biophilic integration · Photovoltaic envelopes · Geothermal equilibrium
                </div>

                <h1 className="serif max-w-3xl text-[clamp(3.9rem,8vw,7.5rem)] leading-[0.88] text-white drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)] drop-shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
                  <span className="wind block">Terraform</span>
                  <span className="wind block text-white/92">Estates</span>
                </h1>

                <p className="mt-6 max-w-2xl copy text-[clamp(1rem,1.7vw,1.22rem)] leading-8 text-white/85 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                  A next-gen luxury brokerage for solar villas, biophilic urbanism, and net-positive habitation designed to feel calm, intelligent, and alive.
                </p>

                <div className="mt-9 flex flex-wrap gap-3">
                  <button onMouseMove={handleMove} className="dew lift shell squircle px-6 py-3.5 copy text-sm text-white">
                    Explore residences
                  </button>
                  <button className="squircle border border-white/10 bg-white/20 px-6 py-3.5 copy text-sm text-white/78 backdrop-blur-xl transition hover:bg-white/[0.05] hover:text-white">
                    View portfolio
                  </button>
                </div>

                <div className="mt-10 flex flex-wrap gap-3 text-[11px] uppercase tracking-[0.22em] text-white/48">
                  <span className="rounded-full border border-white/10 bg-white/20 px-4 py-2">Solar villas</span>
                  <span className="rounded-full border border-white/10 bg-white/20 px-4 py-2">Urban sanctuaries</span>
                  <span className="rounded-full border border-white/10 bg-white/20 px-4 py-2">Regenerative portfolios</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="concept" className="divider relative mx-auto max-w-[1600px] px-6 py-20 lg:px-10">
          <div className="feature-line mb-12">
            <div className="max-w-3xl">
              <div className="copy text-[11px] uppercase tracking-[0.3em] text-white/42">Concept</div>
              <h2 className="serif mt-4 text-[clamp(2.5rem,5vw,4.8rem)] leading-[0.92] text-white">
                Luxury brokerage shaped by light, ecology, and quiet precision.
              </h2>
            </div>
          </div>

          <div className="flex flex-col gap-4 lg:flex-row">
            {[
              ["Biophilic integration", "Homes where living systems, natural airflow, and curated landscapes are part of the architecture, not decoration."],
              ["Photovoltaic envelopes", "Façades that generate power while preserving the calm visual language of a premium residence."],
              ["Net-positive habitation", "Residences designed to return more energy, comfort, and ecological value than they consume."],
            ].map(([title, text]) => (
              <article key={title} data-bloom className="bloom lift shell squircle flex-1 p-6 lg:p-7">
                <div className="copy text-[10px] uppercase tracking-[0.26em] text-white/42">{title}</div>
                <p className="mt-4 copy text-base leading-7 text-white/70">{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="portfolio" className="divider relative mx-auto max-w-[1600px] px-6 py-20 lg:px-10">
          <div className="feature-line mb-12">
            <div className="max-w-3xl">
              <div className="copy text-[11px] uppercase tracking-[0.3em] text-white/42">Portfolio</div>
              <h2 className="serif mt-4 text-[clamp(2.5rem,5vw,4.8rem)] leading-[0.92] text-white">
                Selected estates with a river-like flow, no rigid box.
              </h2>
            </div>
          </div>

          <div className="space-y-4">
            {portfolio.map((item) => (
              <article key={item.title} data-bloom className="bloom lift shell squircle overflow-hidden">
                <div className="grid gap-4 p-5 lg:grid-cols-[.9fr_1.1fr] lg:p-6">
                  <div className="aspect-[16/10] overflow-hidden squircle bg-white/[0.04]">
                    <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
                  </div>
                  <div className="flex flex-col justify-between gap-6">
                    <div>
                      <div className="copy text-[10px] uppercase tracking-[0.26em] text-white/42">{item.eyebrow}</div>
                      <h3 className="serif mt-3 text-4xl text-white">{item.title}</h3>
                      <p className="mt-4 copy text-base leading-7 text-white/68">{item.description}</p>
                    </div>
                    <div className="flex flex-wrap gap-3 text-[11px] uppercase tracking-[0.2em] text-white/55">
                      {item.tags.map((tag) => (
                        <span key={tag} className="rounded-full border border-white/10 bg-white/20 px-4 py-2">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="principles" className="divider relative mx-auto max-w-[1600px] px-6 py-20 lg:px-10">
          <div className="feature-line mb-12">
            <div className="max-w-3xl">
              <div className="copy text-[11px] uppercase tracking-[0.3em] text-white/42">Principles</div>
              <h2 className="serif mt-4 text-[clamp(2.5rem,5vw,4.8rem)] leading-[0.92] text-white">
                Mist, transparency, and the quiet rhythm of the forest.
              </h2>
            </div>
          </div>

          <div className="flex flex-col gap-4 lg:flex-row">
            {principleCards.map((card) => (
              <article key={card.eyebrow} data-bloom className="bloom lift shell squircle flex-1 p-6 lg:p-7">
                <div className="copy text-[10px] uppercase tracking-[0.26em] text-white/42">{card.eyebrow}</div>
                <p className="mt-4 copy text-base leading-7 text-white/70">{card.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="contact" className="divider relative mx-auto max-w-[1600px] px-6 py-20 lg:px-10">
          <div className="shell-mist squircle p-6 lg:p-8">
            <div className="grid gap-8 lg:grid-cols-[1.15fr_.85fr] lg:items-end">
              <div>
                <div className="copy text-[11px] uppercase tracking-[0.3em] text-white/42">Contact</div>
                <h2 className="serif mt-4 text-[clamp(2.5rem,5vw,4.6rem)] leading-[0.92] text-white">
                  Request a private showing.
                </h2>
                <p className="mt-5 max-w-2xl copy text-base leading-7 text-white/68">
                  Private tours, development opportunities, and curated introductions for buyers seeking regenerative luxury.
                </p>
              </div>
              <div className="space-y-3">
                <div className="shell squircle flex items-center gap-3 px-4 py-3">
                  <Icon icon="ph:envelope-simple" className="text-white/55" />
                  <input
                    type="email"
                    placeholder="Email address"
                    className="min-w-0 flex-1 bg-transparent outline-none copy text-white placeholder:text-white/28"
                  />
                </div>
                <button onMouseMove={handleMove} className="dew lift shell squircle w-full px-5 py-3.5 copy text-sm text-white">
                  Schedule consultation
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;600;700;800&family=Cormorant+Garamond:wght@500;600;700&display=swap');

        :root {
          color-scheme: dark;
          --bg: oklch(12% 0.02 145);
          --surface: rgba(255, 255, 255, .03);
          --surface-strong: rgba(255, 255, 255, .05);
          --line: rgba(255, 255, 255, .08);
          --mist: rgba(255, 255, 255, .72);
          --amber: oklch(76% 0.16 72);
          --green: oklch(74% 0.12 145);
        }

        * {
          box-sizing: border-box;
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          margin: 0;
          background:
            radial-gradient(circle at 50% 0%, rgba(255, 255, 255, .07), transparent 20%),
            radial-gradient(circle at 20% 20%, rgba(96, 165, 96, .08), transparent 18%),
            radial-gradient(circle at 80% 18%, rgba(234, 179, 8, .08), transparent 18%),
            linear-gradient(180deg, oklch(14% 0.02 145) 0%, oklch(12% 0.02 145) 48%, oklch(9% 0.02 145) 100%);
          color: white;
          overflow-x: hidden;
          font-family: 'Inter Tight', sans-serif;
        }

        .copy,
        .data {
          font-family: 'Inter Tight', sans-serif;
        }

        .serif {
          font-family: 'Cormorant Garamond', serif;
          letter-spacing: -0.06em;
        }

        .grain {
          pointer-events: none;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
        }

        .shell {
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.1));
          border: 1px solid rgba(255, 255, 255, .08);
          backdrop-filter: blur(28px) saturate(1.18);
          -webkit-backdrop-filter: blur(28px) saturate(1.18);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, .05), 0 24px 90px rgba(0, 0, 0, .42);
        }

        .shell-mist {
          background: linear-gradient(180deg, rgba(255, 255, 255, .07), rgba(255, 255, 255, .03));
          border: 1px solid rgba(255, 255, 255, .09);
          backdrop-filter: blur(80px) contrast(.85) saturate(1.3);
          -webkit-backdrop-filter: blur(80px) contrast(.85) saturate(1.3);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, .06), 0 30px 100px rgba(0, 0, 0, .36);
        }

        .dew {
          position: relative;
          overflow: hidden;
          border-radius: 999px;
        }

        .dew::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          padding: 1px;
          background: linear-gradient(135deg, rgba(255, 255, 255, .18), rgba(255, 255, 255, .05), rgba(255, 255, 255, .16));
          -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
        }

        .dew::after {
          content: "";
          position: absolute;
          inset: -120%;
          background: linear-gradient(120deg, transparent 45%, rgba(255, 255, 255, .22) 50%, transparent 56%);
          transform: translateX(-140%) rotate(12deg);
          animation: sheen 8s ease-in-out infinite;
          pointer-events: none;
          mix-blend-mode: screen;
        }

        .squircle {
          border-radius: 2rem;
        }

        .bloom {
          opacity: 0;
          transform: translateY(28px) scale(.98);
        }

        .bloom.in {
          animation: bloom .9s cubic-bezier(.16, 1, .3, 1) forwards;
        }

        .wind {
          display: inline-block;
          animation: wind 9s ease-in-out infinite;
          transform-origin: center bottom;
        }

        .lift {
          transition: transform .55s cubic-bezier(.16, 1, .3, 1), box-shadow .55s ease, border-color .35s ease, background .35s ease;
        }

        .lift:hover {
          transform: translateY(-7px);
          border-color: rgba(255, 255, 255, .18);
          background: rgba(255, 255, 255, .05);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, .05), 0 30px 90px rgba(0, 0, 0, .5);
        }

        .portal-shell {
          -webkit-mask-image:
            radial-gradient(circle at 50% 44%, black 0 24%, rgba(0, 0, 0, .96) 31%, rgba(0, 0, 0, .72) 48%, transparent 72%),
            radial-gradient(circle at 18% 18%, rgba(0, 0, 0, .9) 0 8%, transparent 24%),
            radial-gradient(circle at 80% 20%, rgba(0, 0, 0, .9) 0 10%, transparent 25%),
            radial-gradient(circle at 50% 82%, rgba(0, 0, 0, .82) 0 12%, transparent 28%);
          mask-image:
            radial-gradient(circle at 50% 44%, black 0 24%, rgba(0, 0, 0, .96) 31%, rgba(0, 0, 0, .72) 48%, transparent 72%),
            radial-gradient(circle at 18% 18%, rgba(0, 0, 0, .9) 0 8%, transparent 24%),
            radial-gradient(circle at 80% 20%, rgba(0, 0, 0, .9) 0 10%, transparent 25%),
            radial-gradient(circle at 50% 82%, rgba(0, 0, 0, .82) 0 12%, transparent 28%);
          -webkit-mask-composite: source-over;
          mask-composite: add;
          will-change: transform;
        }

        .portal-video {
          transform: scale(1.04);
          transform-origin: center center;
          will-change: transform, filter;
        }

        .fade-mask {
          -webkit-mask-image: linear-gradient(to bottom, black 78%, transparent 100%);
          mask-image: linear-gradient(to bottom, black 78%, transparent 100%);
        }

        .divider {
          position: relative;
        }

        .divider::before {
          content: "";
          position: absolute;
          left: 0;
          top: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(to right, transparent, rgba(255, 255, 255, .16), transparent);
        }

        .feature-line {
          position: relative;
        }

        .feature-line::after {
          content: "";
          position: absolute;
          left: 50%;
          top: -1.75rem;
          width: 18rem;
          height: 1rem;
          transform: translateX(-50%);
          background: radial-gradient(circle, rgba(234, 179, 8, .28), transparent 70%);
          filter: blur(18px);
          pointer-events: none;
        }

        @keyframes bloom {
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes sheen {
          to {
            transform: translateX(240%) rotate(12deg);
          }
        }

        @keyframes wind {
          0%,
          100% {
            transform: rotate(-1.2deg) translateX(-1px);
          }

          50% {
            transform: rotate(1.2deg) translateX(1px);
          }
        }

        @keyframes heroScale {
          from {
            transform: scale(1.02);
          }

          to {
            transform: scale(1.16);
          }
        }

        .hero-scale {
          animation: heroScale linear both;
          animation-timeline: scroll(root);
          transform-origin: center center;
        }

        ::view-transition-old(root),
        ::view-transition-new(root) {
          animation-duration: .7s;
          animation-timing-function: cubic-bezier(.16, 1, .3, 1);
        }

        @media (max-width: 760px) {
          .feature-line::after {
            width: 12rem;
          }
        }
      `}</style>
    </div>
  );
}
