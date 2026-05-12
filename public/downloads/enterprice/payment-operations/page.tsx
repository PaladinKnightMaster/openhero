"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";

const navItems = [
  { label: "Products", icon: "ph:caret-down-bold" },
  { label: "Solutions", icon: "ph:caret-down-bold" },
  { label: "Resources", icon: "ph:caret-down-bold" },
  { label: "About", icon: "ph:caret-down-bold" },
  { label: "Pricing" },
];

const features = [
  {
    icon: "ph:globe-hemisphere-west-light",
    title: "Cross-Border Liquidity",
    description:
      "Multi-entity consolidation across 130+ currencies. Settle global obligations instantly without correspondent banking friction.",
  },
  {
    icon: "ph:chart-line-up-light",
    title: "Liquidity Forecasting",
    description:
      "Predictive models engineered for treasury teams. Visualize cash burn, runway, and float with perfect granular clarity.",
  },
  {
    icon: "ph:database-light",
    title: "Real-time Ledgers",
    description:
      "Double-entry immutability at web scale. Programmatic money movement backed by synchronous API reconciliation.",
  },
];

export default function Page() {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const featuresRef = useRef<HTMLDivElement | null>(null);
  const navRef = useRef<HTMLElement | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 50);

      if (heroRef.current) {
        heroRef.current.style.transform = `translateY(${scrollY * 0.4}px)`;
        heroRef.current.style.opacity = `${Math.max(0, 1 - scrollY / 600)}`;
      }

      if (featuresRef.current) {
        featuresRef.current.style.transform = `translateY(-${scrollY * 0.15}px)`;
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: "0px 0px -10% 0px",
        threshold: 0.1,
      }
    );

    document.querySelectorAll("[data-reveal]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleLiquidMove = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    const target = e.currentTarget;
    const rect = target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    target.style.setProperty("--x", `${x}px`);
    target.style.setProperty("--y", `${y}px`);
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-black text-white antialiased selection:bg-white selection:text-black">
      <div className="fixed inset-0 z-0 h-screen w-full overflow-hidden">
        <video autoPlay loop muted playsInline className="h-full w-full scale-[1.05] object-cover">
          <source src="/video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/20" />
      </div>

      <nav
        ref={navRef}
        className={`fixed top-0 z-50 flex w-full items-center justify-between px-6 transition-all duration-500 ${
          scrolled
            ? "border-b border-white/5 bg-neutral-900/80 py-3 backdrop-blur-xl"
            : "py-5"
        }`}
      >
        <div className="group flex cursor-pointer items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-black shadow-lg transition-transform duration-500 group-hover:rotate-90">
            <Icon icon="ph:infinity-bold" className="text-lg" />
          </div>
          <span className="font-sans text-lg font-medium tracking-tighter text-white">MODERN TREASURY</span>
        </div>

        <div className="hidden items-center gap-8 text-[13px] font-medium tracking-wide lg:flex">
          {navItems.map((item) => (
            <a key={item.label} href="#" className="nav-link flex items-center gap-1 font-tight text-white/80 hover:text-white">
              <span>{item.label}</span>
              {item.icon ? <Icon icon={item.icon} className="text-[10px] opacity-50" /> : null}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-6">
          <a
            href="#"
            className="hidden font-tight text-[13px] font-medium text-white/80 transition-colors hover:text-white md:block"
          >
            Log in
          </a>
          <button
            onMouseMove={handleLiquidMove}
            className="liquid-btn flex items-center gap-2 rounded-full px-5 py-2.5 font-tight text-[13px] font-medium tracking-wide text-black"
          >
            <span>Open account</span>
            <Icon icon="ph:arrow-right-bold" className="text-[10px]" />
          </button>
        </div>
      </nav>

      <main className="relative z-10 flex min-h-[120vh] w-full flex-col items-center pt-[25vh]">
        <div
          ref={heroRef}
          className="reveal-up relative z-10 mx-auto flex max-w-4xl flex-col items-center px-4 text-center will-change-transform"
          data-reveal
        >
          <h1 className="font-sans text-6xl font-medium leading-[1.05] tracking-tighter text-white md:text-7xl lg:text-[5.5rem]">
            Radically different banking
          </h1>

          <p className="font-tight mt-6 max-w-2xl text-lg tracking-tight text-white/70 md:text-xl">
            Apply online in 10 minutes to experience financial infrastructure built for the scale of the modern internet.
          </p>

          <div className="apple-sharpness mt-10 flex w-full max-w-md items-center rounded-full p-1.5">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 border-none bg-transparent px-6 py-3 font-tight text-[15px] text-white outline-none placeholder:text-white/90"
            />
            <button
              onMouseMove={handleLiquidMove}
              className="liquid-btn rounded-full px-6 py-3 font-tight text-[14px] font-medium tracking-wide whitespace-nowrap text-black"
            >
              Open account
            </button>
          </div>

          <div className="mt-8 flex items-center gap-4 text-xs font-tight uppercase tracking-widest text-white/80">
            <span>Sub-millisecond finality</span>
            <span className="h-1 w-1 rounded-full bg-white/20" />
            <span>Automated reconciliation</span>
          </div>
        </div>

        <div
          ref={featuresRef}
          className="grid w-full max-w-[1200px] grid-cols-1 gap-6 px-6 pb-32 pt-40 md:grid-cols-3 will-change-transform"
        >
          {features.map((feature, index) => (
            <div
              key={feature.title}
              data-reveal
              className={`reveal-up apple-sharpness group flex cursor-default flex-col rounded-3xl p-8 ${
                index === 1 ? "delay-100" : index === 2 ? "delay-200" : ""
              }`}
            >
              <div className="mb-16 flex h-12 w-12 items-center justify-center rounded-2xl border border-white bg-neutral-600 text-white shadow-sm transition-transform duration-500 group-hover:scale-110">
                <Icon icon={feature.icon} className="text-2xl" />
              </div>
              <h3 className="font-sans mb-3 text-xl font-medium tracking-tighter text-black">{feature.title}</h3>
              <p className="font-tight text-sm leading-relaxed text-black/70">{feature.description}</p>
            </div>
          ))}
        </div>
      </main>

      <footer className="relative z-10 w-full border-t border-white/5 bg-neutral-800 px-6 py-12">
        <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-2">
            <Icon icon="ph:infinity-bold" className="text-xl text-white" />
            <span className="font-sans text-sm font-medium tracking-tighter text-white">MODERN TREASURY</span>
          </div>
          <p className="font-tight max-w-xl text-center text-[11px] leading-relaxed text-white/40 md:text-right">
            Modern Treasury is a financial technology company, not a bank. Banking services provided by global partner institutions.
            <br />
            High-Finance B2B Protocol • Pearl Mode Architecture
          </p>
        </div>
      </footer>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Inter+Tight:wght@400;500;600&display=swap');

        html,
        body {
          margin: 0;
          padding: 0;
          width: 100%;
          height: 100%;
          overflow-x: hidden;
          background: #000;
          scroll-behavior: smooth;
        }

        body {
          font-family: 'Inter', sans-serif;
        }

        .font-tight {
          font-family: 'Inter Tight', sans-serif;
        }

        .apple-sharpness {
          background: rgb(250 250 250 / 0.6);
          backdrop-filter: blur(24px) saturate(1.2);
          -webkit-backdrop-filter: blur(24px) saturate(1.2);
          border: 0.5px solid rgb(255 255 255 / 0.8);
          box-shadow: inset 0 1px 1px rgb(255 255 255), 0 20px 40px rgb(0 0 0 / 0.03);
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .apple-sharpness:hover {
          background: rgb(255 255 255 / 0.7);
          border-color: rgb(255 255 255);
          box-shadow: inset 0 1px 1px rgb(255 255 255), 0 24px 48px rgb(0 0 0 / 0.05);
        }

        .liquid-btn {
          position: relative;
          overflow: hidden;
          background: #fff;
          color: #000;
          border: 0.5px solid oklch(100% 0.00011 271.152);
          box-shadow: inset 0 1px 1px rgb(255 255 255 / 0.15), 0 8px 16px rgb(0 0 0 / 0.1);
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s;
        }

        .liquid-btn::before {
          content: '';
          position: absolute;
          top: var(--y, 50%);
          left: var(--x, 50%);
          width: 200%;
          height: 200%;
          background: radial-gradient(circle at center, rgba(255, 255, 255, 0.25) 0%, transparent 60%);
          transform: translate(-50%, -50%);
          opacity: 0;
          transition: opacity 0.4s ease;
          pointer-events: none;
          z-index: 1;
        }

        .liquid-btn:hover {
          transform: scale(1.02) translateY(-1px);
          box-shadow: inset 0 1px 1px rgb(255 255 255 / 0.25), 0 12px 24px rgb(0 0 0 / 0.15);
        }

        .liquid-btn:hover::before {
          opacity: 1;
        }

        .liquid-btn > * {
          position: relative;
          z-index: 2;
        }

        .nav-link {
          position: relative;
          color: rgb(255 255 255 / 0.8);
          transition: color 0.3s ease;
        }

        .nav-link:hover {
          color: rgb(255 255 255 / 1);
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 100%;
          height: 1px;
          background: #fff;
          transform: scaleX(0);
          transform-origin: right;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .nav-link:hover::after {
          transform: scaleX(1);
          transform-origin: left;
        }

        .reveal-up {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1), transform 1.2s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .reveal-up.active {
          opacity: 1;
          transform: translateY(0);
        }

        .delay-100 {
          transition-delay: 0.1s;
        }

        .delay-200 {
          transition-delay: 0.2s;
        }
      `}</style>
    </div>
  );
}
