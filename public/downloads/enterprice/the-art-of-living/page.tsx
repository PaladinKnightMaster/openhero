"use client";

import { useEffect, useRef, useState } from "react";

const collectionItems = [
  {
    title: "Crescent Sofa",
    label: "Bouclé Composition",
    video: true,
    tall: "h-[34rem]",
    body: "",
    meta: null,
    cardClass: "bg-white/50 backdrop-blur-2xl",
  },
  {
    title: "1972",
    label: "Mid-century modernism",
    video: false,
    tall: "h-[22rem]",
    body: "",
    meta: null,
    cardClass: "bg-[#e4d4bf]/70",
  },
  {
    title: "Walnut Arc",
    label: "Artisanal joinery",
    video: true,
    tall: "h-[42rem]",
    body: "",
    meta: null,
    cardClass: "bg-white/40 backdrop-blur-2xl",
  },
];

const materialItems = [
  {
    title: "Bouclé Ivory",
    label: "Wool composition",
    extra: "Soft thermal layering",
    videoClass: "h-[30rem]",
    containerClass: "min-w-[32rem] bg-[#f4ece2]/70 backdrop-blur-2xl",
  },
  {
    title: "Warm Grain",
    label: "Oak detailing",
    extra: "Hand-finished wood textures engineered for architectural calm and tonal continuity.",
    videoClass: "h-[30rem]",
    containerClass: "min-w-[48rem] bg-[#d7c0a3]/40",
  },
  {
    title: "Smoked Camel",
    label: "Leather balance",
    extra: "",
    videoClass: "h-[30rem]",
    containerClass: "min-w-[28rem] bg-[#efe6db]/80 backdrop-blur-2xl",
  },
];

const residenceStats = [
  ["Spatial Ergonomics", "01"],
  ["Tactile Materiality", "02"],
  ["Curvilinear Systems", "03"],
  ["Artisanal Joinery", "04"],
];

export default function Page() {
  const heroVideoRef = useRef<HTMLVideoElement | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const updateHero = () => {
      const progress = Math.min(Math.max(window.scrollY / (window.innerHeight * 1.15), 0), 1);
      const scale = 1.02 + progress * 0.1;
      const translateY = progress * 14;

      if (heroVideoRef.current) {
        heroVideoRef.current.style.transform = `scale(${scale}) translateY(${translateY}px)`;
      }

      setScrolled(window.scrollY > 20);
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
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    document.querySelectorAll("[data-rise]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.currentTarget;
    const rect = target.getBoundingClientRect();
    target.style.setProperty("--x", `${e.clientX - rect.left}px`);
    target.style.setProperty("--y", `${e.clientY - rect.top}px`);
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[radial-gradient(circle_at_top_left,rgba(194,153,104,.12),transparent_22%),radial-gradient(circle_at_bottom_right,rgba(150,110,84,.09),transparent_22%),linear-gradient(180deg,oklch(96%_0.02_80),oklch(94%_0.018_80))] text-[#221f1a] antialiased">
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className="absolute left-[5%] top-[10%] h-[32rem] w-[32rem] rounded-full bg-[radial-gradient(circle,rgba(201,161,113,.12),transparent_70%)] blur-3xl" />
        <div className="absolute bottom-[0%] right-[8%] h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,rgba(150,103,78,.12),transparent_70%)] blur-3xl" />
      </div>

      <header className={`fixed inset-x-0 top-0 z-50 px-5 py-5 transition-all ${scrolled ? "py-4" : "py-5"}`}>
        <div className="mx-auto max-w-[1700px]">
          <div className="glass-smoke flex items-center justify-between rounded-[2.2rem] border border-white/40 bg-white/45 px-6 py-4 shadow-[0_18px_40px_rgba(100,80,54,.08)] backdrop-blur-[15px] contrast-[0.95]">
            <div>
              <div className="text-[10px] uppercase tracking-[0.35em] text-[#6b6255]">Vesta Atelier</div>
              <div className="mt-1 text-sm text-[#413a31]">Curated Living Spaces</div>
            </div>

            <nav className="hidden items-center gap-10 text-[11px] uppercase tracking-[0.25em] text-[#5b5247] xl:flex">
              <a href="#collection" className="transition hover:opacity-60">Collection</a>
              <a href="#materials" className="transition hover:opacity-60">Materials</a>
              <a href="#residence" className="transition hover:opacity-60">Residence</a>
            </nav>

            <button onMouseMove={handleMove} className="silk-touch rounded-full px-7 py-3 text-[11px] uppercase tracking-[0.25em] text-[#43392d]">
              Book Private Visit
            </button>
          </div>
        </div>
      </header>

      <main className="pt-[110px]">
        <section className="relative min-h-screen overflow-hidden">
          <div className="mx-auto grid min-h-screen max-w-[1700px] grid-cols-1 xl:grid-cols-[.42fr_.58fr]">
            <div className="relative z-20 flex items-center px-8 py-20 xl:px-20">
              <div className="max-w-2xl">
                <h1 className="kinetic-title text-[clamp(4rem,8vw,8rem)] leading-[0.88] text-[#231f19]">
                  <span>The Art</span>
                  <br />
                  <span>of</span>
                  <br />
                  <span>Living</span>
                </h1>

                <p className="glass-smoke mt-10 max-w-xl rounded-[2.2rem] bg-white/35 p-7 text-lg leading-9 text-[#4a4339]">
                  Sculptural furniture systems inspired by tactile materiality, mid-century restraint, and the silence of architectural space.
                </p>

                <div className="mt-10 flex flex-wrap gap-4">
                  <button onMouseMove={handleMove} className="silk-touch rounded-full px-8 py-5 text-[11px] uppercase tracking-[0.25em] text-[#43392d]">
                    Explore Collection
                  </button>
                  <button className="glass-smoke rounded-full bg-[#d8c1a3]/50 px-8 py-5 text-[11px] uppercase tracking-[0.25em] text-[#43392d]">
                    View Residences
                  </button>
                </div>
              </div>
            </div>

            <div className="relative flex items-center justify-center overflow-visible px-4 py-6 xl:px-10">
              <div className="absolute inset-0">
                <video ref={heroVideoRef} autoPlay muted loop playsInline className="hero-video absolute inset-0 h-full w-full object-cover">
                  <source src="/video.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,.04),rgba(0,0,0,.18))]" />
              </div>
            </div>
          </div>
        </section>

        <section id="collection" className="grain-oak relative overflow-hidden px-6 py-28">
          <div className="mx-auto max-w-[1700px]">
            <div data-rise className="section-rise mb-16 max-w-4xl">
              <div className="text-[10px] uppercase tracking-[0.35em] text-[#7a6b5c]">The Collection Arch</div>
              <h2 className="mt-5 text-[clamp(3rem,6vw,5.8rem)] leading-[0.9] text-[#241f19]">
                Sculptural forms curated like a private gallery.
              </h2>
            </div>

            <div className="columns-1 gap-8 md:columns-2 xl:columns-3">
              {collectionItems.map((item, index) => (
                <article
                  key={item.title}
                  data-rise
                  className={`arch-card section-rise mb-8 overflow-hidden ${item.cardClass} p-5 ${index === 1 ? "float-slow" : ""}`}
                >
                  {item.video ? (
                    <div className={`overflow-hidden rounded-[${index === 2 ? "8rem" : "7rem"}] ${item.tall}`}>
                      <video autoPlay muted loop playsInline className="h-full w-full object-cover">
                        <source src="/video.mp4" type="video/mp4" />
                      </video>
                    </div>
                  ) : (
                    <div className={`overflow-hidden rounded-[6rem] bg-[#f4ede4] p-5 ${item.tall}`}>
                      <div className="flex h-full items-end rounded-[5rem] bg-[linear-gradient(180deg,#e4d3bd,#cfb393)] p-7">
                        <div>
                          <div className="text-[10px] uppercase tracking-[0.28em] text-[#5e4c39]">Mid-century modernism</div>
                          <div className="mt-4 text-5xl font-semibold text-[#2a241c]">{item.title}</div>
                        </div>
                      </div>
                    </div>
                  )}
                  {item.video ? (
                    <div className="px-4 py-6">
                      <div className="text-[10px] uppercase tracking-[0.3em] text-[#7b6d5b]">{item.label}</div>
                      <h3 className="mt-4 text-4xl text-[#231f19]">{item.title}</h3>
                    </div>
                  ) : null}
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="materials" className="woven-layer relative overflow-hidden py-28">
          <div className="mx-auto max-w-[1700px]">
            <div data-rise className="section-rise px-6">
              <div className="text-[10px] uppercase tracking-[0.35em] text-[#7a6b5c]">Tactile Storytelling</div>
              <h2 className="mt-5 max-w-5xl text-[clamp(3rem,6vw,6rem)] leading-[0.92] text-[#241f19]">
                Material transitions shaped through touch, grain, and shadow.
              </h2>
            </div>

            <div className="macro-track mt-20 flex gap-8 overflow-x-auto px-6 pb-6 scrollbar-none">
              {materialItems.map((item, index) => (
                <article key={item.title} data-rise className={`section-rise rounded-[4rem] p-6 ${item.containerClass} ${index === 1 ? "min-w-[48rem]" : index === 0 ? "min-w-[32rem]" : "min-w-[28rem]"}`}>
                  <div className="overflow-hidden rounded-[3rem]">
                    <video autoPlay muted loop playsInline className={`${item.videoClass} w-full object-cover`}>
                      <source src="/video.mp4" type="video/mp4" />
                    </video>
                  </div>

                  <div className={`mt-6 ${index === 1 ? "grid grid-cols-2 gap-6" : "flex items-end justify-between"}`}>
                    <div>
                      <div className="text-[10px] uppercase tracking-[0.3em] text-[#776858]">{item.label}</div>
                      <div className={`mt-3 ${index === 0 ? "text-4xl" : index === 1 ? "text-5xl" : "text-4xl"} text-[#251f19]`}>
                        {item.title}
                      </div>
                    </div>
                    {item.extra ? (
                      <div className={index === 1 ? "text-base leading-8 text-[#4f473e]" : "text-sm text-[#5f564b]"}>
                        {item.extra}
                      </div>
                    ) : index === 0 ? (
                      <div className="text-sm text-[#5f564b]">Soft thermal layering</div>
                    ) : null}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="residence" className="relative overflow-hidden bg-[#241c18] px-6 py-28 text-white">
          <div className="absolute inset-0 opacity-[0.12]">
            <div className="h-full w-full bg-[repeating-linear-gradient(90deg,rgba(255,255,255,.08)_0px,rgba(255,255,255,.08)_1px,transparent_1px,transparent_8px)]" />
          </div>

          <div className="absolute left-[8%] top-[20%] h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,rgba(201,161,113,.14),transparent_72%)] blur-3xl" />

          <div className="relative mx-auto max-w-[1700px]">
            <div className="grid gap-16 xl:grid-cols-[1fr_.55fr]">
              <div data-rise className="section-rise">
                <div className="text-[10px] uppercase tracking-[0.35em] text-white/40">The Residence Footer</div>
                <h2 className="mt-6 max-w-4xl text-[clamp(3rem,6vw,6rem)] leading-[0.9] text-white">
                  Designed to feel less like a website and more like a private residence.
                </h2>
              </div>

              <div data-rise className="section-rise flex flex-col justify-end">
                <div className="rounded-[3rem] bg-white/[0.04] p-8 backdrop-blur-2xl">
                  <div className="space-y-5 text-sm uppercase tracking-[0.25em] text-white/55">
                    {residenceStats.map(([label, value]) => (
                      <div key={label} className="flex items-center justify-between">
                        <span>{label}</span>
                        <span>{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-24 flex flex-wrap items-center justify-between gap-6 border-t border-white/10 pt-8">
              <div>
                <div className="text-[10px] uppercase tracking-[0.35em] text-white/40">Vesta Atelier</div>
                <div className="mt-2 text-white/70">Bespoke Living Spaces</div>
              </div>

              <button onMouseMove={handleMove} className="silk-touch rounded-full px-8 py-5 text-[11px] uppercase tracking-[0.25em] text-[#2b241d]">
                Request Residence Catalog
              </button>
            </div>
          </div>
        </section>
      </main>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;600;700;800&family=Cormorant+Garamond:wght@500;600;700&display=swap');

        * {
          box-sizing: border-box;
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          margin: 0;
          font-family: 'Inter Tight', sans-serif;
          background:
            radial-gradient(circle at top left, rgba(194,153,104,.12), transparent 22%),
            radial-gradient(circle at bottom right, rgba(150,110,84,.09), transparent 22%),
            linear-gradient(180deg, oklch(96% 0.02 80), oklch(94% 0.018 80));
          color: #221f1a;
          overflow-x: hidden;
        }

        h1,
        h2,
        h3,
        h4 {
          font-family: 'Cormorant Garamond', serif;
          letter-spacing: -.05em;
        }

        .atelier-window {
          mask-image:
            radial-gradient(circle at top center, black 42%, transparent 76%),
            linear-gradient(black, black);
          -webkit-mask-image:
            radial-gradient(circle at top center, black 42%, transparent 76%),
            linear-gradient(black, black);
          mask-composite: intersect;
          -webkit-mask-composite: source-in;
          border-radius: 16rem 16rem 4rem 4rem;
        }

        .glass-smoke {
          backdrop-filter: blur(15px) contrast(.95);
          -webkit-backdrop-filter: blur(15px) contrast(.95);
        }

        .silk-touch {
          position: relative;
          overflow: hidden;
          border-radius: 999px;
          background: linear-gradient(180deg, rgba(255,255,255,.92), rgba(241,233,219,.9));
          box-shadow: inset 0 1px 0 rgba(255,255,255,.9), 0 18px 40px rgba(100,80,54,.08);
          transition: transform .4s cubic-bezier(.16,1,.3,1), box-shadow .4s ease;
        }

        .silk-touch:hover {
          transform: translateY(2px);
          box-shadow: inset 0 8px 20px rgba(109,84,54,.09), inset 0 -1px 0 rgba(255,255,255,.8);
        }

        .silk-touch::before {
          content: '';
          position: absolute;
          top: var(--y, 50%);
          left: var(--x, 50%);
          width: 220%;
          height: 220%;
          transform: translate(-50%, -50%);
          background: radial-gradient(circle at center, rgba(255,255,255,.35), transparent 58%);
          opacity: 0;
          transition: opacity .35s ease;
          pointer-events: none;
        }

        .silk-touch:hover::before {
          opacity: 1;
        }

        .grain-oak {
          background-image:
            linear-gradient(rgba(255,255,255,.02), rgba(255,255,255,.02)),
            repeating-linear-gradient(90deg, rgba(102,75,48,.05) 0px, rgba(102,75,48,.05) 1px, transparent 1px, transparent 7px);
        }

        .woven-layer {
          background-image:
            linear-gradient(rgba(255,255,255,.06), rgba(255,255,255,.06)),
            repeating-linear-gradient(0deg, rgba(113,88,58,.04) 0px, rgba(113,88,58,.04) 1px, transparent 1px, transparent 5px),
            repeating-linear-gradient(90deg, rgba(113,88,58,.04) 0px, rgba(113,88,58,.04) 1px, transparent 1px, transparent 5px);
        }

        .arch-card {
          border-radius: 10rem 10rem 2.5rem 2.5rem;
        }

        .kinetic-title span {
          display: inline-block;
          opacity: 0;
          transform: translateY(80px);
          animation: reveal .8s cubic-bezier(.16,1,.3,1) forwards;
        }

        .kinetic-title span:nth-child(2) {
          animation-delay: .08s;
        }

        .kinetic-title span:nth-child(3) {
          animation-delay: .16s;
        }

        .kinetic-title span:nth-child(4) {
          animation-delay: .24s;
        }

        .section-rise {
          opacity: 0;
          transform: translateY(60px) scale(.98);
        }

        .section-rise.in-view {
          animation: rise .9s cubic-bezier(.16,1,.3,1) forwards;
        }

        .float-slow {
          animation: floaty 8s ease-in-out infinite;
        }

        .float-slower {
          animation: floaty 11s ease-in-out infinite;
        }

        .macro-track {
          scrollbar-width: none;
        }

        .macro-track::-webkit-scrollbar {
          display: none;
        }

        .hero-video {
          animation: zoomVideo linear both;
          animation-timeline: scroll(root);
          transform-origin: center center;
          will-change: transform;
        }

        @keyframes reveal {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes rise {
          from {
            opacity: 0;
            transform: translateY(60px) scale(.98);
          }

          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes floaty {
          0%, 100% {
            transform: translateY(0px);
          }

          50% {
            transform: translateY(-12px);
          }
        }

        @keyframes zoomVideo {
          from {
            transform: scale(1.02);
          }

          to {
            transform: scale(1.12);
          }
        }

        @media (max-width: 1280px) {
          .arch-card {
            border-radius: 6rem 6rem 2rem 2rem;
          }
        }

        @media (max-width: 1024px) {
          .kinetic-title {
            font-size: clamp(3.5rem, 14vw, 7rem);
          }
        }

        @media (max-width: 768px) {
          .hero-video {
            animation: none;
          }

          .macro-track {
            gap: 1rem;
          }

          .macro-track > article {
            min-width: min(100%, 28rem) !important;
          }
        }
      `}</style>
    </div>
  );
}
