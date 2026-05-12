"use client";

import { Icon } from "@iconify/react";
import { Inter, JetBrains_Mono } from "next/font/google";
import { useEffect, useRef } from "react";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export default function Page() {
  const portalContainerRef = useRef<HTMLDivElement | null>(null);
  const portalVideoRef = useRef<HTMLVideoElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);
  const navbarRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const updatePortal = () => {
      const video = portalVideoRef.current;
      const container = portalContainerRef.current;
      if (!video || !container) return;

      const maxScroll = window.innerHeight * 1.15;
      const progress = Math.min(Math.max(window.scrollY / maxScroll, 0), 1);
      const scale = 1.08 + progress * 0.38;
      const translateY = progress * -12;

      video.style.transform = `scale(${scale}) translateY(${translateY}px)`;
      container.style.transform = `scale(${1 + progress * 0.03})`;
    };

    const updateNav = () => {
      const navbar = navbarRef.current;
      if (!navbar) return;
      navbar.classList.toggle("scrolled", window.scrollY > 40);
    };

    const updateProgress = () => {
      const progress = progressRef.current;
      if (!progress) return;
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const value = docHeight > 0 ? scrollTop / docHeight : 0;
      progress.style.transform = `scaleX(${Math.min(Math.max(value, 0), 1)})`;
    };

    let scrollRaf = 0;
    const onScroll = () => {
      if (scrollRaf) return;
      scrollRaf = window.requestAnimationFrame(() => {
        updatePortal();
        updateNav();
        updateProgress();
        scrollRaf = 0;
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            target.animate(
              [
                { opacity: 0, transform: "translateY(22px)" },
                { opacity: 1, transform: "translateY(0)" },
              ],
              {
                duration: 850,
                easing: "cubic-bezier(.16,1,.3,1)",
                fill: "forwards",
              }
            );
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14 }
    );

    document.querySelectorAll<HTMLElement>(".fade-up, .fade-soft").forEach((node) => {
      observer.observe(node);
    });

    const supportsViewTransitions = typeof document.startViewTransition === "function";
    document.querySelectorAll("button").forEach((button) => {
      button.addEventListener("click", () => {
        if (supportsViewTransitions) {
          document.startViewTransition?.(() => {});
        }
      });
    });

    updatePortal();
    updateNav();
    updateProgress();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updatePortal, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updatePortal);
      observer.disconnect();
    };
  }, []);

  return (
    <main className={`${inter.variable} ${mono.variable} min-h-screen overflow-x-hidden bg-[#050505] text-white antialiased`}>
      <div className="fixed inset-x-0 top-0 z-[60] h-1 bg-white/5">
        <div ref={progressRef} className="h-full w-full origin-left bg-white/75" />
      </div>

      <div className="pointer-events-none fixed inset-0">
        <div className="aurora one" />
        <div className="aurora two" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(255,255,255,0.04),transparent_26%),radial-gradient(circle_at_50%_20%,rgba(255,255,255,0.03),transparent_36%)]" />
      </div>

      <header ref={navbarRef} className="sticky top-0 z-50 border-b border-white/10 bg-black/55 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-4 lg:px-12">
          <div className="flex items-center gap-4">
            <div className="grid h-11 w-11 place-items-center rounded-[1.1rem] border border-white/10 bg-white/[0.03]">
              <img src="https://www.crafterstation.com/brand/icon-white.svg" alt="Crafter Station Logo" className="h-5 w-auto" />
            </div>
            <div className="min-w-0 leading-tight">
              <div className="font-[family:var(--font-mono)] text-sm uppercase tracking-[0.28em] text-white/55">Crafter Station</div>
              <div className="text-xs text-white/40">Shipper Culture</div>
            </div>
          </div>

          <nav className="hidden items-center gap-8 text-sm text-white/50 md:flex">
            <a className="transition-colors hover:text-white" href="#eventos">Events</a>
            <a className="transition-colors hover:text-white" href="#proyectos">Projects</a>
            <a className="transition-colors hover:text-white" href="#equipo">Team</a>
            <a className="transition-colors hover:text-white" href="#blog">Blog</a>
          </nav>

          <div className="flex items-center gap-3">
            <button type="button" className="hidden rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-white/60 transition md:inline-flex hover:text-white">EN</button>
            <button type="button" className="glass soft-ring sheen rounded-[1rem] px-5 py-2.5 text-sm font-medium text-white">Join</button>
          </div>
        </div>

        <div className="border-t border-white/10 bg-black/35">
          <div className="mx-auto flex max-w-[1440px] items-center gap-4 overflow-x-auto px-6 py-2.5 text-sm lg:px-12">
            <a className="border-b-2 border-white pb-1 font-[family:var(--font-mono)] text-white" href="#main">main</a>
            <a className="border-b-2 border-transparent pb-1 font-[family:var(--font-mono)] text-white/55 hover:text-white" href="#que-es">docs</a>
            <a className="border-b-2 border-transparent pb-1 font-[family:var(--font-mono)] text-white/55 hover:text-white" href="#eventos">timeline</a>
            <a className="border-b-2 border-transparent pb-1 font-[family:var(--font-mono)] text-white/55 hover:text-white" href="#blog">blog</a>
            <a className="border-b-2 border-transparent pb-1 font-[family:var(--font-mono)] text-white/55 hover:text-white" href="#footer">community</a>
          </div>
        </div>
      </header>

      <main id="main" className="mx-auto max-w-[1440px] px-6 pb-12 pt-10 lg:px-12">
        <section className="grid gap-10 lg:grid-cols-[1.06fr_.94fr] lg:items-center">
          <div className="fade-up">
            <h1 className="title max-w-4xl text-5xl font-semibold text-white md:text-6xl xl:text-[5.95rem]">The new generation of shippers in LATAM.</h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/58 md:text-lg">A community of engineers, designers, and builders who ship products and share what they learn.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button type="button" className="sheen rounded-md border border-white/12 bg-white/[0.03] px-5 py-3.5 text-sm text-white transition duration-300 hover:border-white/20 hover:bg-white/[0.06]">Join →</button>
              <button type="button" className="rounded-md border border-white/10 bg-transparent px-5 py-3.5 text-sm text-white/70 transition duration-300 hover:bg-white/[0.04] hover:text-white">View all events →</button>
            </div>
            <div className="mt-10 grid gap-3 sm:grid-cols-3">
              <div className="glass rounded-lg p-4">
                <p className="mono text-[10px] uppercase tracking-[0.28em] text-white/42">Motion</p>
                <p className="mt-2 text-sm leading-6 text-white/68">Smooth animations, visual discipline, and fast readability.</p>
              </div>
              <div className="glass rounded-lg p-4">
                <p className="mono text-[10px] uppercase tracking-[0.28em] text-white/42">System</p>
                <p className="mt-2 text-sm leading-6 text-white/68">Clear hierarchy, light panels, and product pace.</p>
              </div>
              <div className="glass rounded-lg p-4">
                <p className="mono text-[10px] uppercase tracking-[0.28em] text-white/42">LATAM</p>
                <p className="mt-2 text-sm leading-6 text-white/68">Regional culture with premium execution.</p>
              </div>
            </div>
          </div>

          <div className="fade-up relative z-0 h-[75vh] md:h-[85vh]">
            <div className="absolute inset-y-0 left-0 w-full pointer-events-none sm:w-[130%]">
              <div ref={portalContainerRef} id="portal-container" className="portal-mask glass-strong soft-ring relative h-full w-full overflow-hidden rounded-l-[2.5rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.015))]">
                <video ref={portalVideoRef} id="portal-video" autoPlay muted loop playsInline className="absolute inset-y-0 left-0 h-full w-full object-cover">
                  <source src="/video.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 [mask-image:linear-gradient(to_right,black_20%,black_40%,transparent_90%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.12),transparent_50%),linear-gradient(90deg,rgba(0,0,0,0.3),transparent)]" />
              </div>
            </div>
          </div>
        </section>

        <section id="que-es" className="mt-16 border-t border-white/10 pt-10">
          <div className="max-w-3xl">
            <p className="mono text-[11px] uppercase tracking-[0.32em] text-white/40">What is Crafter Station?</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.06em] text-white md:text-5xl">It was born from a group of friends who wanted to build things in public and tell the world about it.</h2>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            <article className="fade-soft glass hover-lift rounded-[1.45rem] p-5">
              <p className="mono text-[10px] uppercase tracking-[0.28em] text-white/42">Product Development</p>
              <h3 className="mt-3 text-xl font-semibold">We ship to learn</h3>
              <p className="mt-2 text-sm leading-7 text-white/58">We build products to accelerate and inspire LATAM.</p>
            </article>
            <article className="fade-soft glass hover-lift rounded-[1.45rem] p-5">
              <p className="mono text-[10px] uppercase tracking-[0.28em] text-white/42">Events</p>
              <h3 className="mt-3 text-xl font-semibold">Code Brews, hackathons, and meetups</h3>
              <p className="mt-2 text-sm leading-7 text-white/58">Spaces to connect shippers, ideas, and collaborations.</p>
            </article>
            <article className="fade-soft glass hover-lift rounded-[1.45rem] p-5">
              <p className="mono text-[10px] uppercase tracking-[0.28em] text-white/42">Community</p>
              <h3 className="mt-3 text-xl font-semibold">We promote the art of shipping</h3>
              <p className="mt-2 text-sm leading-7 text-white/58">We teach, share, and make the process visible.</p>
            </article>
            <article className="fade-soft glass hover-lift rounded-[1.45rem] p-5">
              <p className="mono text-[10px] uppercase tracking-[0.28em] text-white/42">Diverse team</p>
              <h3 className="mt-3 text-xl font-semibold">More than code</h3>
              <p className="mt-2 text-sm leading-7 text-white/58">Engineers, designers, anthropologists, and statisticians finding their path in tech.</p>
            </article>
            <article className="fade-soft glass hover-lift rounded-[1.45rem] p-5">
              <p className="mono text-[10px] uppercase tracking-[0.28em] text-white/42">Open calendars</p>
              <h3 className="mt-3 text-xl font-semibold">Mentorship and conversations</h3>
              <p className="mt-2 text-sm leading-7 text-white/58">Schedule a call for career advice, mentorship, or a simple chat.</p>
            </article>
            <article className="fade-soft glass hover-lift rounded-[1.45rem] p-5">
              <p className="mono text-[10px] uppercase tracking-[0.28em] text-white/42">LATAM</p>
              <h3 className="mt-3 text-xl font-semibold">Born in Peru</h3>
              <p className="mt-2 text-sm leading-7 text-white/58">Growing across Latin America with a shared vision.</p>
            </article>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <button type="button" className="sheen rounded-md border border-white/12 bg-white/[0.03] px-5 py-3 text-sm text-white transition duration-300 hover:bg-white/[0.06]">Meet the team →</button>
          </div>
        </section>

        <section className="mt-16 border-t border-white/10 pt-10">
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="fade-soft glass rounded-[1.5rem] p-6">
              <div className="text-5xl font-black tracking-[-0.06em]">500+</div>
              <div className="mt-3 text-sm text-white/54">Community members</div>
            </div>
            <div className="fade-soft glass rounded-[1.5rem] p-6 stat-divider sm:pl-8">
              <div className="text-5xl font-black tracking-[-0.06em]">50+</div>
              <div className="mt-3 text-sm text-white/54">Events hosted</div>
            </div>
            <div className="fade-soft glass rounded-[1.5rem] p-6 stat-divider sm:pl-8">
              <div className="text-5xl font-black tracking-[-0.06em]">25+</div>
              <div className="mt-3 text-sm text-white/54">Products shipped</div>
            </div>
          </div>
        </section>

        <section className="mt-16 border-t border-white/10 pt-10">
          <div className="grid gap-10 lg:grid-cols-[1.02fr_.98fr]">
            <div className="fade-up">
              <p className="mono text-[11px] uppercase tracking-[0.32em] text-white/40">Our story</p>
              <h2 className="mt-4 text-4xl font-semibold tracking-[-0.06em] text-white md:text-5xl">Build, ship, share, iterate.</h2>
              <div className="mt-6 space-y-5 leading-8 text-white/58">
                <p>We were born in late 2023, from a group of friends who met at hackathons and wanted to build something. Not just build it: ship it, share it, get feedback, iterate, and create real value for someone in the world.</p>
                <p>In 2025 we decided to share what we had learned with the LATAM community. We organized the first Code Brew and 15 people showed up: designers, engineers, self-taught builders, YouTubers, and Platzi teachers. Amazing people.</p>
                <p>Since then we have hosted hackathons, more Code Brews, and product launches. We knew there was something here: a culture worth growing.</p>
              </div>
            </div>

            <div className="fade-up grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              <div className="glass rounded-[1.45rem] p-5">
                <p className="mono text-[10px] uppercase tracking-[0.3em] text-white/42">Build</p>
                <p className="mt-3 text-sm leading-7 text-white/60">Ship new products to learn and accelerate the LATAM tech ecosystem.</p>
              </div>
              <div className="glass rounded-[1.45rem] p-5">
                <p className="mono text-[10px] uppercase tracking-[0.3em] text-white/42">Connect</p>
                <p className="mt-3 text-sm leading-7 text-white/60">Organize events to bring shippers together and promote the culture of shipping.</p>
              </div>
              <div className="glass rounded-[1.45rem] p-5">
                <p className="mono text-[10px] uppercase tracking-[0.3em] text-white/42">Grow</p>
                <p className="mt-3 text-sm leading-7 text-white/60">Teach the art of shipping inside a community that celebrates it.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-16 border-t border-white/10 pt-10">
          <div className="glass-strong soft-ring rounded-[2rem] p-6 lg:p-8">
            <div className="max-w-3xl">
              <p className="mono text-[11px] uppercase tracking-[0.32em] text-white/40">The Shipping Bible</p>
              <h2 className="mt-4 text-4xl font-semibold tracking-[-0.06em] text-white md:text-5xl">Our philosophy, distilled.</h2>
              <p className="mt-5 leading-8 text-white/58">A living playbook on how to ship consistently, build in public, and grow as a builder in LATAM.</p>
              <p className="mt-4 leading-8 text-white/58">We ship. We build in public. We learn by doing. A shipped project teaches more than a hundred planned ones.</p>
              <p className="mt-4 leading-8 text-white/58">The Shipping Bible covers the full cycle: from the first spark of an idea to the follow-up after launch. Six phases, one rhythm.</p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <span className="chip rounded-full px-4 py-2 text-sm">Ship &gt; Perfect</span>
              <span className="chip rounded-full px-4 py-2 text-sm">Build in public</span>
              <span className="chip rounded-full px-4 py-2 text-sm">Set time limits on everything</span>
              <span className="chip rounded-full px-4 py-2 text-sm">Story &gt; Features</span>
              <span className="chip rounded-full px-4 py-2 text-sm">Community first</span>
              <span className="chip rounded-full px-4 py-2 text-sm">LATAM represents</span>
            </div>

            <div className="mt-8">
              <button type="button" className="sheen rounded-md border border-white/12 bg-white/[0.03] px-5 py-3.5 text-sm text-white transition duration-300 hover:bg-white/[0.06]">Read The Shipping Bible →</button>
            </div>
          </div>
        </section>

        <section id="eventos" className="mt-16 border-t border-white/10 pt-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mono text-[11px] uppercase tracking-[0.32em] text-white/40">Events</p>
              <h2 className="mt-4 text-4xl font-semibold tracking-[-0.06em] text-white md:text-5xl">Code Brews, hackathons, and product launches in LATAM.</h2>
            </div>
            <button type="button" className="rounded-md border border-white/10 bg-white/[0.03] px-5 py-3 text-sm text-white/70 transition hover:text-white">View events →</button>
          </div>

          <div className="mt-10 grid gap-4 lg:grid-cols-2 xl:grid-cols-4">
            <article className="fade-soft glass hover-lift rounded-[1.45rem] p-5 xl:col-span-2">
              <div className="mono text-[10px] uppercase tracking-[0.3em] text-white/42">Online</div>
              <h3 className="mt-3 text-2xl font-semibold">Ask Me Anything with Wallbit founders (YCW23)</h3>
              <p className="mt-2 text-sm text-white/58">May 15, 2026</p>
              <p className="mt-4 text-sm leading-7 text-white/58">A session to learn from founders building with speed and vision.</p>
            </article>
            <article className="fade-soft glass hover-lift rounded-[1.45rem] p-5">
              <div className="mono text-[10px] uppercase tracking-[0.3em] text-white/42">Yanahuara, PE</div>
              <h3 className="mt-3 text-2xl font-semibold">v0 Zero to Agent Arequipa</h3>
              <p className="mt-2 text-sm text-white/58">May 2, 2026</p>
            </article>
            <article className="fade-soft glass hover-lift rounded-[1.45rem] p-5">
              <div className="mono text-[10px] uppercase tracking-[0.3em] text-white/42">Lima, PE</div>
              <h3 className="mt-3 text-2xl font-semibold">v0 Zero to Agent Lima</h3>
              <p className="mt-2 text-sm text-white/58">May 2, 2026</p>
            </article>
            <article className="fade-soft glass hover-lift rounded-[1.45rem] p-5">
              <div className="mono text-[10px] uppercase tracking-[0.3em] text-white/42">Bogotá, CO</div>
              <h3 className="mt-3 text-2xl font-semibold">v0 Zero to Agent Bogotá</h3>
              <p className="mt-2 text-sm text-white/58">May 2, 2026</p>
            </article>
          </div>
        </section>

        <section id="equipo" className="mt-16 border-t border-white/10 pt-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mono text-[11px] uppercase tracking-[0.32em] text-white/40">The team</p>
              <h2 className="mt-4 text-4xl font-semibold tracking-[-0.06em] text-white md:text-5xl">Engineers, designers, AI experts, and more.</h2>
            </div>
            <button type="button" className="rounded-md border border-white/10 bg-white/[0.03] px-5 py-3 text-sm text-white/70 transition hover:text-white">Meet the team →</button>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <div className="fade-soft glass hover-lift flex flex-col items-center rounded-[1.35rem] p-5 text-center">
              <img src="https://www.crafterstation.com/team/shiara.png" alt="Shiara Arauzo" className="mb-4 h-20 w-20 rounded-full border-2 border-white/10 object-cover shadow-lg" />
              <div className="text-lg font-semibold">Shiara Arauzo</div>
              <div className="mt-1 text-sm text-white/52">Design Engineer</div>
            </div>

            <div className="fade-soft glass hover-lift flex flex-col items-center rounded-[1.35rem] p-5 text-center">
              <img src="https://www.crafterstation.com/team/cris.png" alt="Cristian Correa" className="mb-4 h-20 w-20 rounded-full border-2 border-white/10 object-cover shadow-lg" />
              <div className="text-lg font-semibold">Cristian Correa</div>
              <div className="mt-1 text-sm text-white/52">Data & Software Engineer</div>
            </div>

            <div className="fade-soft glass hover-lift flex flex-col items-center rounded-[1.35rem] p-5 text-center">
              <img src="https://www.crafterstation.com/team/railly.png" alt="Railly Hugo" className="mb-4 h-20 w-20 rounded-full border-2 border-white/10 object-cover shadow-lg" />
              <div className="text-lg font-semibold">Railly Hugo</div>
              <div className="mt-1 text-sm text-white/52">Design Engineer</div>
            </div>

            <div className="fade-soft glass hover-lift flex flex-col items-center rounded-[1.35rem] p-5 text-center">
              <img src="https://www.crafterstation.com/team/emmy.png" alt="Emmy Arias" className="mb-4 h-20 w-20 rounded-full border-2 border-white/10 object-cover shadow-lg" />
              <div className="text-lg font-semibold">Emmy Arias</div>
              <div className="mt-1 text-sm text-white/52">Growth & Marketing</div>
            </div>

            <div className="fade-soft glass hover-lift flex flex-col items-center rounded-[1.35rem] p-5 text-center">
              <img src="https://www.crafterstation.com/team/nicolas.png" alt="Nicolas Vargas" className="mb-4 h-20 w-20 rounded-full border-2 border-white/10 object-cover shadow-lg" />
              <div className="text-lg font-semibold">Nicolas Vargas</div>
              <div className="mt-1 text-sm text-white/52">AI Engineer</div>
            </div>

            <div className="fade-soft glass hover-lift flex flex-col items-center rounded-[1.35rem] p-5 text-center">
              <img src="https://www.crafterstation.com/team/ignacio.png" alt="Ignacio Velásquez" className="mb-4 h-20 w-20 rounded-full border-2 border-white/10 object-cover shadow-lg" />
              <div className="text-lg font-semibold">Ignacio Velásquez</div>
              <div className="mt-1 text-sm text-white/52">Growth & Automation</div>
            </div>

            <div className="fade-soft glass hover-lift flex flex-col items-center rounded-[1.35rem] p-5 text-center">
              <img src="https://www.crafterstation.com/team/ignacio.png" alt="Ignacio Rueda" className="mb-4 h-20 w-20 rounded-full border-2 border-white/10 object-cover shadow-lg" />
              <div className="text-lg font-semibold">Ignacio Rueda</div>
              <div className="mt-1 text-sm text-white/52">Backend Engineer</div>
            </div>

            <div className="fade-soft glass hover-lift flex flex-col items-center rounded-[1.35rem] p-5 text-center">
              <img src="https://www.crafterstation.com/team/cueva.png" alt="Anthony Cueva" className="mb-4 h-20 w-20 rounded-full border-2 border-white/10 object-cover shadow-lg" />
              <div className="text-lg font-semibold">Anthony Cueva</div>
              <div className="mt-1 text-sm text-white/52">Product Engineer</div>
            </div>

            <div className="fade-soft glass hover-lift flex flex-col items-center rounded-[1.35rem] p-5 text-center">
              <img src="https://www.crafterstation.com/team/liz.png" alt="Liz Riveros" className="mb-4 h-20 w-20 rounded-full border-2 border-white/10 object-cover shadow-lg" />
              <div className="text-lg font-semibold">Liz Riveros</div>
              <div className="mt-1 text-sm text-white/52">Project Manager</div>
            </div>

            <div className="fade-soft glass hover-lift flex flex-col items-center rounded-[1.35rem] p-5 text-center">
              <img src="https://www.crafterstation.com/team/gabriel.png" alt="Gabriel Antunes" className="mb-4 h-20 w-20 rounded-full border-2 border-white/10 object-cover shadow-lg" />
              <div className="text-lg font-semibold">Gabriel Antunes</div>
              <div className="mt-1 text-sm text-white/52">AI Engineer & Full-Stack Developer</div>
            </div>

            <div className="fade-soft glass hover-lift flex flex-col items-center rounded-[1.35rem] p-5 text-center">
              <img src="https://www.crafterstation.com/team/tarmeno.png" alt="Carlos Tarmeño" className="mb-4 h-20 w-20 rounded-full border-2 border-white/10 object-cover shadow-lg" />
              <div className="text-lg font-semibold">Carlos Tarmeño</div>
              <div className="mt-1 text-sm text-white/52">Frontend Engineer</div>
            </div>

            <div className="fade-soft glass hover-lift flex flex-col items-center rounded-[1.35rem] p-5 text-center">
              <img src="https://www.crafterstation.com/team/juan.png" alt="Juan Ortega" className="mb-4 h-20 w-20 rounded-full border-2 border-white/10 object-cover shadow-lg" />
              <div className="text-lg font-semibold">Juan Ortega</div>
              <div className="mt-1 text-sm text-white/52">Software Engineer</div>
            </div>

            <div className="fade-soft glass hover-lift flex flex-col items-center rounded-[1.35rem] p-5 text-center">
              <img src="https://www.crafterstation.com/team/edward.png" alt="Edward Ramos" className="mb-4 h-20 w-20 rounded-full border-2 border-white/10 object-cover shadow-lg" />
              <div className="text-lg font-semibold">Edward Ramos</div>
              <div className="mt-1 text-sm text-white/52">Frontend Engineer</div>
            </div>
          </div>
        </section>

        <section id="proyectos" className="mt-16 border-t border-white/10 pt-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mono text-[11px] uppercase tracking-[0.32em] text-white/40">Shipped products</p>
              <h2 className="mt-4 text-4xl font-semibold tracking-[-0.06em] text-white md:text-5xl">Built to learn, ship, and share.</h2>
            </div>
            <button type="button" className="rounded-md border border-white/10 bg-white/[0.03] px-5 py-3 text-sm text-white/70 transition hover:text-white">View all on GitHub →</button>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <article className="fade-soft glass hover-lift rounded-[1.45rem] p-5">
              <p className="mono text-[10px] uppercase tracking-[0.3em] text-white/42">tinte</p>
              <h3 className="mt-3 text-2xl font-semibold">Theme generator</h3>
              <p className="mt-2 text-sm text-white/58">For VSCode & shadcn/ui</p>
              <div className="mt-4 inline-flex rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-white/55">500+ stars</div>
            </article>
            <article className="fade-soft glass hover-lift rounded-[1.45rem] p-5">
              <p className="mono text-[10px] uppercase tracking-[0.3em] text-white/42">lupa</p>
              <h3 className="mt-3 text-2xl font-semibold">Knowledge Platform</h3>
              <p className="mt-2 text-sm text-white/58">Built for AI Agents</p>
              <div className="mt-4 inline-flex rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-white/55">New</div>
            </article>
            <article className="fade-soft glass hover-lift rounded-[1.45rem] p-5">
              <p className="mono text-[10px] uppercase tracking-[0.3em] text-white/42">elements</p>
              <h3 className="mt-3 text-2xl font-semibold">Fullstack components</h3>
              <p className="mt-2 text-sm text-white/58">shadcn/ui ecosystem</p>
              <div className="mt-4 inline-flex rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-white/55">200+ stars</div>
            </article>
            <article className="fade-soft glass hover-lift rounded-[1.45rem] p-5">
              <p className="mono text-[10px] uppercase tracking-[0.3em] text-white/42">text0</p>
              <h3 className="mt-3 text-2xl font-semibold">Absurdly smart autocomplete</h3>
              <p className="mt-2 text-sm text-white/58">Built for speed, precision, and shipping</p>
              <div className="mt-4 inline-flex rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-white/55">Winner</div>
            </article>
          </div>
        </section>

        <section id="blog" className="mt-16 border-t border-white/10 pt-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mono text-[11px] uppercase tracking-[0.32em] text-white/40">From the blog</p>
              <h2 className="mt-4 text-4xl font-semibold tracking-[-0.06em] text-white md:text-5xl">Stories about shipping, building in public, and growing in tech.</h2>
            </div>
            <button type="button" className="rounded-md border border-white/10 bg-white/[0.03] px-5 py-3 text-sm text-white/70 transition hover:text-white">Read all articles →</button>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            <article className="fade-soft glass hover-lift rounded-[1.45rem] p-5">
              <div className="text-sm text-white/40">Crafter Registry</div>
              <div className="mt-2 text-2xl font-semibold">Aug 4, 2025</div>
            </article>
            <article className="fade-soft glass hover-lift rounded-[1.45rem] p-5">
              <div className="text-sm text-white/40">AI-First Manifesto</div>
              <div className="mt-2 text-2xl font-semibold">Jun 21, 2025</div>
            </article>
            <article className="fade-soft glass hover-lift rounded-[1.45rem] p-5">
              <div className="text-sm text-white/40">How We Built Text0 in 10 Days</div>
              <div className="mt-2 text-2xl font-semibold">Apr 28, 2025</div>
            </article>
          </div>
        </section>

        <section id="footer" className="mt-16 border-t border-white/10 pb-8 pt-10">
          <div className="glass-strong soft-ring rounded-[2rem] p-6 lg:p-8">
            <div className="grid gap-8 lg:grid-cols-[1.08fr_.92fr] lg:items-end">
              <div>
                <p className="mono text-[11px] uppercase tracking-[0.32em] text-white/40">Be the first to know about our upcoming events</p>
                <h2 className="mt-4 text-4xl font-semibold tracking-[-0.06em] text-white md:text-5xl">Join the community. No spam, just shipping.</h2>
              </div>

              <div className="space-y-5">
                <div className="glass flex items-center gap-2 rounded-2xl p-2">
                  <input type="email" placeholder="Email address" className="min-w-0 flex-1 bg-transparent px-4 py-3 text-white outline-none placeholder:text-white/28" />
                  <button type="button" className="sheen rounded-xl bg-white px-5 py-3 text-sm font-medium text-black">Subscribe</button>
                </div>

                <div className="flex flex-wrap gap-3 text-sm text-white/55">
                  <a className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 transition hover:text-white" href="#">GitHub</a>
                  <a className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 transition hover:text-white" href="#">Discord</a>
                  <a className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 transition hover:text-white" href="#">LinkedIn</a>
                  <a className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 transition hover:text-white" href="#">X</a>
                  <a className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 transition hover:text-white" href="#">Instagram</a>
                  <a className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 transition hover:text-white" href="#">WhatsApp</a>
                  <a className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 transition hover:text-white" href="#">Luma</a>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3 border-t border-white/10 pt-5 text-sm text-white/40 md:flex-row md:items-center md:justify-between">
              <div>© 2026 Crafter Station</div>
              <div className="flex gap-4">
                <span>Research</span>
                <span>Brand</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <style jsx global>{`
        :root {
          color-scheme: dark;
          --bg: #050505;
          --panel: rgba(255, 255, 255, 0.03);
          --panel-strong: rgba(255, 255, 255, 0.05);
          --line: rgba(255, 255, 255, 0.08);
          --line-strong: rgba(255, 255, 255, 0.14);
          --muted: rgba(255, 255, 255, 0.58);
          --muted-2: rgba(255, 255, 255, 0.36);
          --soft: rgba(255, 255, 255, 0.02);
          --accent: oklch(0.78 0.02 260);
          --accent-soft: oklch(0.72 0.01 260 / 0.12);
        }

        * {
          box-sizing: border-box;
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          margin: 0;
          font-family: var(--font-inter), sans-serif;
          color: white;
          background:
            radial-gradient(circle at 50% 0%, rgba(255, 255, 255, 0.07), transparent 24%),
            radial-gradient(circle at 80% 15%, rgba(255, 255, 255, 0.04), transparent 22%),
            radial-gradient(circle at 15% 80%, rgba(255, 255, 255, 0.03), transparent 25%),
            linear-gradient(180deg, #090909 0%, #050505 48%, #020202 100%);
          overflow-x: hidden;
        }

        body::before {
          content: "";
          position: fixed;
          inset: 0;
          pointer-events: none;
          background-image:
            linear-gradient(rgba(255, 255, 255, 0.028) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.028) 1px, transparent 1px);
          background-size: 88px 88px;
          mask-image: radial-gradient(circle at center, black 36%, transparent 90%);
          opacity: 0.55;
          z-index: -2;
        }

        .mono {
          font-family: var(--font-mono), monospace;
        }

        .glass {
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.045), rgba(255, 255, 255, 0.02));
          border: 1px solid rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(26px) saturate(1.15);
          -webkit-backdrop-filter: blur(26px) saturate(1.15);
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.045),
            0 18px 80px rgba(0, 0, 0, 0.45);
        }

        .glass-strong {
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.03));
          border: 1px solid rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(30px) saturate(1.2);
          -webkit-backdrop-filter: blur(30px) saturate(1.2);
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.05),
            0 22px 90px rgba(0, 0, 0, 0.48);
        }

        .soft-ring {
          position: relative;
        }

        .soft-ring::before {
          content: "";
          position: absolute;
          inset: -1px;
          border-radius: inherit;
          padding: 1px;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.1));
          -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
        }

        .hover-lift {
          transition:
            transform 520ms cubic-bezier(.16, 1, .3, 1),
            border-color 240ms ease,
            background 240ms ease,
            box-shadow 240ms ease;
          will-change: transform;
        }

        .hover-lift:hover {
          transform: translateY(-6px);
          border-color: rgba(255, 255, 255, 0.18);
          background: rgba(255, 255, 255, 0.045);
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.05),
            0 30px 90px rgba(0, 0, 0, 0.55),
            0 0 0 1px rgba(255, 255, 255, 0.04);
        }

        .sheen {
          position: relative;
          overflow: hidden;
        }

        .sheen::after {
          content: "";
          position: absolute;
          inset: -120%;
          background: linear-gradient(120deg, transparent 43%, rgba(255, 255, 255, 0.16) 49%, transparent 56%);
          transform: translateX(-140%) rotate(10deg);
          animation: sheen 7s ease-in-out infinite;
          pointer-events: none;
          mix-blend-mode: screen;
        }

        .aurora {
          position: absolute;
          inset: auto;
          width: 34rem;
          height: 34rem;
          filter: blur(70px);
          opacity: 0.95;
          pointer-events: none;
        }

        .aurora.one {
          top: -12rem;
          left: 50%;
          transform: translateX(-50%);
          background: radial-gradient(circle, rgba(255, 255, 255, 0.10), transparent 60%);
        }

        .aurora.two {
          top: 10rem;
          right: -8rem;
          background: radial-gradient(circle, rgba(255, 255, 255, 0.05), transparent 60%);
        }

        .title {
          letter-spacing: -0.085em;
          line-height: 0.9;
        }

        .fade-up {
          opacity: 0;
          transform: translateY(24px);
        }

        .fade-soft {
          opacity: 0;
          transform: translateY(14px);
        }

        .floaty {
          animation: floaty 10s ease-in-out infinite;
        }

        .progress {
          transform-origin: left;
          transform: scaleX(0);
        }

        .typed {
          display: inline-block;
          position: relative;
        }

        .typed::after {
          content: "";
          position: absolute;
          right: -0.35em;
          top: 10%;
          width: 1px;
          height: 82%;
          background: rgba(255, 255, 255, 0.7);
          animation: blink 1s steps(2, end) infinite;
        }

        .chip {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
        }

        .stat-divider {
          position: relative;
        }

        .stat-divider::before {
          content: "";
          position: absolute;
          left: 0;
          top: 0;
          width: 1px;
          height: 100%;
          background: linear-gradient(to bottom, transparent, rgba(255, 255, 255, 0.14), transparent);
        }

        .accent {
          color: #e7c57a;
        }

        .accent-bg {
          background: rgba(255, 255, 255, 0.045);
        }

        .portal-mask {
          -webkit-mask-image: radial-gradient(circle at center, black 18%, transparent 72%);
          mask-image: radial-gradient(circle at center, black 18%, transparent 72%);
        }

        #portal-container,
        #portal-video {
          will-change: transform;
          transform-origin: center center;
        }

        #portal-video {
          transform: scale(2);
        }

        @keyframes sheen {
          to {
            transform: translateX(240%) rotate(10deg);
          }
        }

        @keyframes floaty {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-12px);
          }
        }

        @keyframes blink {
          50% {
            opacity: 0;
          }
        }

        @keyframes progress {
          from {
            transform: scaleX(0);
          }
          to {
            transform: scaleX(1);
          }
        }

        @keyframes fadeUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeSoft {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        ::view-transition-old(root),
        ::view-transition-new(root) {
          animation-duration: 0.65s;
          animation-timing-function: cubic-bezier(.16, 1, .3, 1);
        }
      `}</style>
    </main>
  );
}
