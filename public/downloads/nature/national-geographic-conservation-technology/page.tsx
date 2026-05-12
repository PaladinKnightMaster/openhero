"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";

export default function Page() {
  const ringRef = useRef<HTMLDivElement | null>(null);
  const dotRef = useRef<HTMLDivElement | null>(null);
  const dustRef = useRef<HTMLDivElement | null>(null);
  const navRef = useRef<HTMLElement | null>(null);
  const acousticBarsRef = useRef<HTMLDivElement | null>(null);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    let mx = 0;
    let my = 0;
    let rx = 0;
    let ry = 0;

    const move = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };

    document.addEventListener("mousemove", move);

    const animateCursor = () => {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;

      if (ringRef.current) {
        ringRef.current.style.left = `${rx}px`;
        ringRef.current.style.top = `${ry}px`;
      }

      if (dotRef.current) {
        dotRef.current.style.left = `${mx}px`;
        dotRef.current.style.top = `${my}px`;
      }

      requestAnimationFrame(animateCursor);
    };

    animateCursor();

    const spawnDust = () => {
      if (!dustRef.current) return;

      const d = document.createElement("span");
      const x = Math.random() * 100;
      const dur = 8 + Math.random() * 12;
      const driftX = (Math.random() - 0.5) * 120;

      d.className =
        "absolute rounded-full bg-[#f3c46f] opacity-0 animate-[dust-drift_linear_infinite]";

      d.style.left = `${x}%`;
      d.style.width = `${1 + Math.random() * 2}px`;
      d.style.height = `${1 + Math.random() * 2}px`;
      d.style.animationDuration = `${dur}s`;
      d.style.animationDelay = `${Math.random() * dur}s`;
      d.style.setProperty("--drift-x", `${driftX}px`);

      dustRef.current.appendChild(d);

      setTimeout(() => {
        d.remove();
      }, (dur + 3) * 1000);
    };

    const dustInterval = setInterval(spawnDust, 400);

    for (let i = 0; i < 30; i++) {
      spawnDust();
    }

    if (acousticBarsRef.current) {
      for (let i = 0; i < 32; i++) {
        const b = document.createElement("div");

        b.className =
          "flex-1 rounded-t-full bg-gradient-to-t from-[#f3c46f] to-[#f3c46f55] animate-[wave-pulse_ease-in-out_infinite] min-h-[4px]";

        const h = 15 + Math.sin(i * 0.6) * 25 + Math.random() * 30;
        const h2 = 20 + Math.sin(i * 0.8 + 1) * 30 + Math.random() * 35;

        b.style.setProperty("--bar-h", `${h}%`);
        b.style.setProperty("--bar-h2", `${h2}%`);
        b.style.animationDelay = `${i * 0.04}s`;
        b.style.animationDuration = `${0.9 + Math.random() * 0.8}s`;

        acousticBarsRef.current.appendChild(b);
      }

      const bars = acousticBarsRef.current.children;

      const barsInterval = setInterval(() => {
        Array.from(bars).forEach((bar) => {
          const h = 10 + Math.random() * 70;
          const h2 = 10 + Math.random() * 80;

          (bar as HTMLElement).style.setProperty("--bar-h", `${h}%`);
          (bar as HTMLElement).style.setProperty("--bar-h2", `${h2}%`);
        });
      }, 1800);

      return () => {
        clearInterval(dustInterval);
        clearInterval(barsInterval);
        document.removeEventListener("mousemove", move);
      };
    }

    const stalkEls = document.querySelectorAll(".stalk");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in-view");
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    stalkEls.forEach((el) => observer.observe(el));

    document.querySelectorAll(".genome-node").forEach((node) => {
      node.addEventListener("mousemove", (e: any) => {
        const rect = node.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;

        (node as HTMLElement).style.setProperty("--mx", `${x}%`);
        (node as HTMLElement).style.setProperty("--my", `${y}%`);
      });
    });

    const handleScroll = () => {
      const y = window.scrollY;
      const opacity = Math.min(0.85, 0.4 + y / 400);

      if (navRef.current) {
        navRef.current.style.background = `oklch(12% 0.03 40 / ${opacity})`;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      clearInterval(dustInterval);
      document.removeEventListener("mousemove", move);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const genomes = [
    {
      code: "SPEC-001 · PANTHERA LEO",
      name: "African Lion",
      sci: "Panthera leo massaica",
      width: "82%",
      pct: "82% genome mapped",
    },
    {
      code: "SPEC-002 · ACINONYX JUBATUS",
      name: "Cheetah",
      sci: "Acinonyx jubatus jubatus",
      width: "91%",
      pct: "91% genome mapped",
    },
    {
      code: "SPEC-003 · LOXODONTA AFRICANA",
      name: "Bush Elephant",
      sci: "Loxodonta africana",
      width: "67%",
      pct: "67% genome mapped",
    },
    {
      code: "SPEC-004 · PANTHERA PARDUS",
      name: "Leopard",
      sci: "Panthera pardus pardus",
      width: "78%",
      pct: "78% genome mapped",
    },
    {
      code: "SPEC-005 · CROCUTA CROCUTA",
      name: "Spotted Hyena",
      sci: "Crocuta crocuta",
      width: "55%",
      pct: "55% genome mapped",
    },
    {
      code: "SPEC-006 · LYCAON PICTUS",
      name: "African Wild Dog",
      sci: "Lycaon pictus lupinus",
      width: "93%",
      pct: "93% genome mapped",
    },
  ];

  return (
    <main className="bg-[#0e0a08] text-[#f6efe5] overflow-x-hidden cursor-none relative font-sans">
      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }

        body {
          background: #0e0a08;
          overflow-x: hidden;
        }

        * {
          box-sizing: border-box;
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
            transform: translateY(-10vh) translateX(var(--drift-x, 30px))
              scale(1.5);
            opacity: 0;
          }
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

        @keyframes orb-float {
          0% {
            transform: translateY(0) rotate(0deg) scale(1);
          }
          100% {
            transform: translateY(-20px) rotate(3deg) scale(1.04);
          }
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

        @keyframes fill-expand {
          from {
            transform: scaleX(0);
          }
          to {
            transform: scaleX(1);
          }
        }

        .stalk {
          opacity: 0;
          transform: translateY(32px);
          transition: opacity 0.9s cubic-bezier(0.22, 1, 0.36, 1),
            transform 0.9s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .stalk.in-view {
          opacity: 1;
          transform: translateY(0);
        }

        ::-webkit-scrollbar {
          width: 3px;
        }

        ::-webkit-scrollbar-track {
          background: #0e0a08;
        }

        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #f3c46f, #c9833f);
          border-radius: 999px;
        }
      `}</style>

      <div
        ref={ringRef}
        className="fixed w-10 h-10 border border-[#f3c46f99] rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-screen"
      />

      <div
        ref={dotRef}
        className="fixed w-[6px] h-[6px] bg-[#f3c46f] rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2"
      />

      <div className="fixed inset-0 pointer-events-none z-0 bg-[radial-gradient(ellipse_at_center,rgba(243,196,111,0.3)_0%,rgba(201,131,63,0.1)_50%,transparent_85%)] backdrop-blur-[120px] animate-[corridor-breathe_8s_ease-in-out_infinite_alternate]" />

      <div ref={dustRef} className="fixed inset-0 z-0 pointer-events-none overflow-hidden" />

      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-12 py-6 backdrop-blur-3xl border-b border-[#f3c46f14] bg-[#0e0a0866] max-md:px-6"
      >
        <div className="flex items-center gap-3 uppercase tracking-[0.25em] text-[0.7rem] font-black">
          <div className="w-9 h-6 bg-[#f3c46f] rounded-[4px_12px_4px_12px]" />
          <span>
            National Geographic
            <br />
            Conservation Technology
          </span>
        </div>

        <ul className="flex gap-10 text-[0.68rem] uppercase tracking-[0.18em] text-[#f3c46faa] max-md:hidden">
          <li>
            <a href="#telemetry" className="hover:text-[#f3c46f] transition">
              Telemetry
            </a>
          </li>
          <li>
            <a href="#biome" className="hover:text-[#f3c46f] transition">
              Biome Sync
            </a>
          </li>
          <li>
            <a href="#acoustic" className="hover:text-[#f3c46f] transition">
              Acoustic
            </a>
          </li>
          <li>
            <a href="#genomic" className="hover:text-[#f3c46f] transition">
              Genomic
            </a>
          </li>
        </ul>

        <div className="flex items-center gap-2 text-[0.6rem] tracking-[0.1em] text-[#76d47e]">
          <div className="w-[6px] h-[6px] rounded-full bg-[#76d47e] animate-[pulse-live_2s_ease-in-out_infinite]" />
          Live Field Data · Serengeti
        </div>
      </nav>

      <section className="relative min-h-screen flex items-center overflow-hidden px-16 max-md:px-6">
        <div className="absolute right-[-5%] top-1/2 -translate-y-1/2 w-[62vw] h-[72vh] z-[1] animate-[lens-drift_12s_ease-in-out_infinite_alternate] max-md:w-full max-md:h-[55vh] max-md:bottom-0 max-md:top-auto max-md:translate-y-0">
          <div className="w-full h-full overflow-hidden rounded-[48%_52%_58%_42%/44%_41%_59%_56%] shadow-[inset_0_0_80px_rgba(243,196,111,0.15),0_0_120px_rgba(201,131,63,0.25)] relative">
            {!videoError ? (
              <video
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
                onError={() => setVideoError(true)}
              >
                <source src="/video.mp4" type="video/mp4" />
              </video>
            ) : (
              <svg
                viewBox="0 0 900 700"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full"
              >
                <defs>
                  <radialGradient id="sky" cx="50%" cy="40%" r="70%">
                    <stop offset="0%" stopColor="#c8832a" />
                    <stop offset="40%" stopColor="#a05c1a" />
                    <stop offset="100%" stopColor="#1a0e05" />
                  </radialGradient>
                </defs>

                <rect width="900" height="700" fill="url(#sky)" />
                <ellipse
                  cx="450"
                  cy="600"
                  rx="550"
                  ry="120"
                  fill="#3d200a"
                  opacity="0.9"
                />
              </svg>
            )}
          </div>
        </div>

        <div className="relative z-10 max-w-[42%] pt-24 max-md:max-w-full">
          <div className="flex items-center gap-3 text-[0.62rem] tracking-[0.3em] uppercase text-[#f3c46f] mb-6 opacity-0 animate-[fade-up_1s_0.3s_forwards]">
            <div className="w-10 h-px bg-gradient-to-r from-[#f3c46f] to-transparent" />
            Apex-Predator Telemetry · Field System v4.2
          </div>

          <h1 className="text-[clamp(3.2rem,5.5vw,7rem)] leading-[0.9] mb-8 opacity-0 animate-[fade-up_1s_0.5s_forwards]">
            The Wild
            <br />
            <em className="text-[#f3c46f] block">Never Sleeps.</em>
          </h1>

          <p className="text-[0.88rem] leading-[1.75] text-[#f3c46faa] max-w-[36ch] mb-10 opacity-0 animate-[fade-up_1s_0.7s_forwards]">
            Serengeti biome-sync technology meets real-time ethological
            intelligence. We track, map, and protect the apex predators of our
            age through acoustic monitoring arrays, non-invasive genomic
            sampling, and satellite telemetry at 120-frame fidelity.
          </p>

          <div className="flex items-center gap-5 flex-wrap opacity-0 animate-[fade-up_1s_0.9s_forwards]">
            <a
              href="#telemetry"
              className="px-8 py-4 bg-[#f3c46f1f] border border-[#f3c46f55] rounded-[44%_56%_38%_62%/52%_44%_56%_48%] uppercase tracking-[0.2em] text-[0.72rem] font-bold backdrop-blur-xl hover:-translate-y-1 transition"
            >
              Explore the System
            </a>

            <a
              href="#genomic"
              className="flex items-center gap-2 uppercase tracking-[0.15em] text-[0.62rem] text-[#f3c46faa] hover:text-[#f3c46f] transition"
            >
              View Live Data
              <Icon icon="mdi:arrow-right" className="text-lg" />
            </a>
          </div>
        </div>

        <div className="absolute bottom-8 left-8 z-20 opacity-0 animate-[fade-up_1s_1.2s_forwards]">
          <div className="bg-[#0e0a08aa] backdrop-blur-2xl border border-[#f3c46f22] rounded-[28%_72%_22%_78%/42%_32%_68%_58%] p-5 text-[0.58rem] tracking-[0.1em]">
            <div className="flex gap-6 mb-2">
              <span className="text-[#c9833f99]">LAT</span>
              <span className="text-[#f3c46f]">-2.3304° S</span>
              <span className="text-[#c9833f99]">LONG</span>
              <span className="text-[#f3c46f]">34.8332° E</span>
            </div>

            <div className="flex gap-6 mb-2">
              <span className="text-[#c9833f99]">SUBJECT</span>
              <span className="text-[#f3c46f]">LION♀ ID:447</span>
              <span className="text-[#c9833f99]">TEMP</span>
              <span className="text-[#f3c46f]">38.6°C</span>
            </div>

            <div className="flex gap-6">
              <span className="text-[#c9833f99]">SIGNAL</span>
              <span className="text-[#76d47e]">STRONG</span>
              <span className="text-[#c9833f99]">PING</span>
              <span className="text-[#f3c46f]">4s AGO</span>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 uppercase tracking-[0.3em] text-[0.55rem] text-[#f3c46f55] z-20 opacity-0 animate-[fade-up_1s_1.5s_both]">
          Scroll to explore

          <div className="w-px h-12 bg-gradient-to-b from-[#f3c46f] to-transparent animate-[scroll-pulse_2.5s_ease-in-out_infinite]" />
        </div>
      </section>

      <section
        id="telemetry"
        className="relative px-16 py-16 max-md:px-6"
      >
        <div className="flex overflow-hidden rounded-[48px] border border-[#f3c46f14] stalk max-md:flex-col">
          {[
            ["1,847", "Animals Tagged"],
            ["94.2%", "Signal Uptime"],
            ["3.2M", "km² Monitored"],
            ["48", "Acoustic Arrays"],
            ["0.0%", "Invasive Sampling"],
          ].map(([big, sub], i) => (
            <div
              key={i}
              className="flex-1 p-6 text-center bg-[#1a1411aa] border-r border-[#f3c46f14] last:border-r-0 hover:bg-[#211915] transition"
            >
              <span className="block text-5xl font-black text-[#f3c46f] mb-1">
                {big}
              </span>

              <span className="uppercase tracking-[0.2em] text-[0.55rem] text-[#f3c46f77]">
                {sub}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="px-16 py-28 relative max-md:px-6">
        <div className="flex items-center gap-4 uppercase tracking-[0.35em] text-[0.6rem] text-[#c9833f] mb-4 stalk">
          <div className="w-8 h-px bg-[#c9833f]" />
          Core Technology Systems
        </div>

        <h2 className="text-[clamp(2.2rem,4vw,4.5rem)] leading-none mb-16 stalk">
          Intelligence
          <br />
          born from <span className="italic text-[#f3c46f]">silence</span>.
        </h2>

        <div className="flex gap-8 flex-wrap">
          {[
            {
              icon: "mdi:satellite-variant",
              kicker: "Module 01 · Apex Telemetry",
              title: "Solar GPS Collar System",
              desc: "Sub-20g solar-harvesting collars with dual-frequency GNSS. Sends location pings every 4 seconds.",
            },
            {
              icon: "mdi:leaf",
              kicker: "Module 02 · Biome Sync",
              title: "Serengeti Habitat Mesh",
              desc: "900-node IoT environmental mesh measuring soil moisture, canopy density, prey density indices.",
            },
            {
              icon: "mdi:dna",
              kicker: "Module 03 · Genomic",
              title: "Non-Invasive eDNA Sampling",
              desc: "Environmental DNA collection from water sources, scat, and hair snares.",
            },
          ].map((card, i) => (
            <div
              key={i}
              className="flex-1 min-w-[280px] max-w-[360px] p-8 bg-[#1b1613bb] backdrop-blur-2xl rounded-[32%_68%_55%_45%/48%_36%_64%_52%] border border-[#f3c46f14] hover:-translate-y-2 transition duration-500"
            >
              <div className="w-12 h-12 rounded-[35%_65%_42%_58%/50%_38%_62%_50%] bg-[#f3c46f1a] border border-[#f3c46f22] flex items-center justify-center mb-6">
                <Icon icon={card.icon} className="text-2xl text-[#f3c46f]" />
              </div>

              <div className="uppercase tracking-[0.25em] text-[0.56rem] text-[#c9833f] mb-2">
                {card.kicker}
              </div>

              <h3 className="text-2xl font-bold mb-4">{card.title}</h3>

              <p className="text-[0.8rem] leading-7 text-[#f3c46f88]">
                {card.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section
        id="biome"
        className="grid grid-cols-2 gap-16 px-16 py-28 max-md:grid-cols-1 max-md:px-6"
      >
        <div>
          <div className="flex items-center gap-4 uppercase tracking-[0.35em] text-[0.6rem] text-[#c9833f] mb-4">
            <div className="w-8 h-px bg-[#c9833f]" />
            Serengeti Biome-Sync
          </div>

          <h2 className="text-[clamp(2.2rem,4vw,4.5rem)] leading-none mb-10">
            The land
            <br />
            breathes
            <br />
            <span className="italic text-[#f3c46f]">data.</span>
          </h2>

          <p className="text-[0.88rem] leading-8 text-[#f3c46f88] max-w-[42ch] mb-8">
            Our biome-synchronization platform integrates satellite
            multispectral imagery, ground-truth sensor arrays, and
            machine-learning habitat models into a living cartographic
            intelligence.
          </p>

          <ul className="space-y-4">
            {[
              ["Vegetation NDVI Index", "0.74 Optimal"],
              ["Prey Density (km²)", "142 wildebeest"],
              ["Water Source Status", "16 / 18 Active"],
              ["Predator Corridors", "7 mapped"],
              ["Biome Sync Latency", "1.8s avg"],
            ].map(([key, val], i) => (
              <li
                key={i}
                className="flex justify-between border-b border-[#f3c46f14] pb-3"
              >
                <span className="uppercase tracking-[0.1em] text-[0.62rem] text-[#f3c46f77]">
                  {key}
                </span>

                <span className="font-semibold">{val}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative h-[500px]">
          <div className="absolute w-[340px] h-[340px] rounded-[72%_28%_34%_66%/55%_62%_38%_45%] bg-[#f3c46f22] border border-[#f3c46f22] backdrop-blur-3xl animate-[orb-float_7s_ease-in-out_infinite_alternate]" />

          <div className="absolute bottom-0 right-0 w-[240px] h-[260px] rounded-[72%_28%_34%_66%/55%_62%_38%_45%] bg-[#76d47e22] border border-[#76d47e44] animate-[orb-float_9s_ease-in-out_infinite_alternate]" />

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[160px] h-[180px] rounded-[72%_28%_34%_66%/55%_62%_38%_45%] bg-[#c9833f33] border border-[#c9833f55] backdrop-blur-xl animate-[orb-float_5s_ease-in-out_infinite_alternate]" />
        </div>
      </section>

      <section
        id="acoustic"
        className="px-16 py-28 max-md:px-6"
      >
        <div className="flex items-center gap-4 uppercase tracking-[0.35em] text-[0.6rem] text-[#c9833f] mb-4">
          <div className="w-8 h-px bg-[#c9833f]" />
          Acoustic Monitoring Arrays
        </div>

        <h2 className="text-[clamp(2.2rem,4vw,4.5rem)] leading-none mb-12">
          Listen to the
          <br />
          <span className="italic text-[#f3c46f]">frequency</span>
          <br />
          of life.
        </h2>

        <div className="grid grid-cols-2 gap-16 max-md:grid-cols-1">
          <div>
            <p className="text-[0.88rem] leading-8 text-[#f3c46f88] mb-8 max-w-[40ch]">
              Passive acoustic networks capture 24/7 bioacoustic signatures. AI
              classifies 4,200+ species calls, detects poaching events, and
              monitors stress vocalizations.
            </p>

            <div className="uppercase tracking-[0.2em] text-[0.58rem] text-[#f3c46f66] mb-3">
              Live Signal · Array 07 · Serengeti North
            </div>

            <div
              ref={acousticBarsRef}
              className="flex items-end gap-1 h-20"
            />

            <div className="flex justify-between text-[0.52rem] text-[#f3c46f55] mt-2">
              <span>20Hz</span>
              <span>500Hz</span>
              <span>4kHz</span>
              <span>16kHz</span>
              <span>40kHz</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              ["4,213", "Species Classified"],
              ["1.2s", "Threat Alert Latency"],
              ["99.7%", "Array Availability"],
              ["8km", "Hydrophone Radius"],
            ].map(([big, sub], i) => (
              <div
                key={i}
                className="p-5 bg-[#1b1613bb] rounded-[32%_68%_55%_45%/48%_36%_64%_52%] border border-[#f3c46f14]"
              >
                <div className="uppercase tracking-[0.25em] text-[0.56rem] text-[#c9833f] mb-2">
                  Detection
                </div>

                <div className="text-5xl font-black text-[#f3c46f] mb-1">
                  {big}
                </div>

                <div className="text-[0.72rem] text-[#f3c46f77]">
                  {sub}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="genomic"
        className="px-16 py-28 max-md:px-6"
      >
        <div className="flex items-center gap-4 uppercase tracking-[0.35em] text-[0.6rem] text-[#c9833f] mb-4">
          <div className="w-8 h-px bg-[#c9833f]" />
          Non-Invasive Genomic Sampling
        </div>

        <h2 className="text-[clamp(2.2rem,4vw,4.5rem)] leading-none mb-14">
          DNA reveals
          <br />
          what eyes
          <br />
          <span className="italic text-[#f3c46f]">cannot.</span>
        </h2>

        <div className="grid grid-cols-3 gap-6 max-md:grid-cols-1">
          {genomes.map((g, i) => (
            <div
              key={i}
              className="genome-node relative p-6 bg-[#1a1411bb] border border-[#f3c46f14] rounded-[38%_62%_63%_37%/41%_44%_56%_59%] backdrop-blur-xl overflow-hidden hover:scale-[1.03] transition"
            >
              <div className="uppercase tracking-[0.2em] text-[0.55rem] text-[#c9833f99] mb-2">
                {g.code}
              </div>

              <div className="text-xl font-bold mb-1">{g.name}</div>

              <div className="italic text-[0.6rem] text-[#f3c46f66] mb-5">
                {g.sci}
              </div>

              <div className="h-[3px] rounded-full bg-[#f3c46f22] overflow-hidden mb-2">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#f3c46f] to-[#c9833f] origin-left animate-[fill-expand_2s_0.5s_cubic-bezier(0.22,1,0.36,1)_both]"
                  style={{ width: g.width }}
                />
              </div>

              <div className="text-right text-[0.6rem] text-[#f3c46f66]">
                {g.pct}
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="relative px-16 pt-20 pb-12 border-t border-[#f3c46f14] max-md:px-6">
        <div className="flex justify-between items-end flex-wrap gap-8">
          <div className="text-6xl italic leading-none text-[#f3c46f22]">
            Conservation
            <br />
            Technology
          </div>

          <div>
            <ul className="flex gap-8 uppercase tracking-[0.15em] text-[0.6rem] text-[#f3c46f66] flex-wrap">
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

            <div className="mt-6 text-[0.6rem] leading-7 text-[#f3c46f44] uppercase tracking-[0.1em]">
              © 2025 National Geographic Society
              <br />
              Conservation Technology Division · Serengeti Field Operations
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}