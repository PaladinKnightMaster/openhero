/* eslint-disable @next/next/no-img-element */
"use client"

import React, { useEffect } from 'react';
import { Icon } from '@iconify/react';

export default function VeridianLiving() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('bloomed');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.bloom-element');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const renderKineticText = (text: string) => {
    return text.split('').map((char: string, i: number) => (
      <span
        key={i}
        className="kinetic-letter"
        style={{ animationDelay: `${i * 0.05}s` }}
      >
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,400;1,500&family=Manrope:wght@300;400;500;600&display=swap');

        :root {
          --sunlight-cream: oklch(97% 0.02 90);
          --sun-linen: oklch(92% 0.03 85);
          --chlorophyll: oklch(45% 0.12 140);
          --chlorophyll-light: oklch(65% 0.10 140);
          --oak-brown: oklch(50% 0.08 60);
          --deep-forest: oklch(25% 0.08 140);
          --warm-amber: oklch(75% 0.15 65);
        }

        body {
          background-color: var(--sunlight-cream);
          color: var(--deep-forest);
          font-family: 'Manrope', sans-serif;
          margin: 0;
          overflow-x: hidden;
          scroll-behavior: smooth;
        }

        .serif { font-family: 'Cormorant Garamond', serif; }

        .nav-link {
          position: relative;
          font-size: 0.8rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          transition: opacity 0.3s;
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 0;
          height: 1px;
          background: currentColor;
          transition: width 0.3s ease;
        }

        .nav-link:hover::after { width: 100%; }

        .kinetic-letter {
          display: inline-block;
          animation: sway 7s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite alternate;
        }

        @keyframes sway {
          0% { transform: rotate(-1deg) translateY(0); }
          100% { transform: rotate(1deg) translateY(-2px); }
        }

        .bloom-element {
          opacity: 0;
          transform: translateY(30px);
          transition: all 1s ease-out;
        }

        .bloom-element.bloomed {
          opacity: 1;
          transform: translateY(0);
        }
      `}} />

      <nav className="fixed top-0 left-0 w-full z-50 px-10 py-8 flex justify-between items-center text-white bg-black/20">
        <div className="text-2xl font-light tracking-tighter serif">Veridian Living</div>
        <div className="hidden md:flex gap-12">
          <a href="#" className="nav-link">Sofas</a>
          <a href="#" className="nav-link">Tables</a>
          <a href="#" className="nav-link">Lighting</a>
          <a href="#" className="nav-link">Explore</a>
        </div>
        <div className="flex gap-6 items-center">
          <button className="nav-link flex items-center gap-2">
            <Icon icon="mdi:cart-outline" className="text-xl" /> Cart (0)
          </button>
        </div>
      </nav>

      <section className="relative w-screen h-screen overflow-hidden flex items-center justify-center">
        <video autoPlay muted loop playsInline className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto -translate-x-1/2 -translate-y-1/2 scale-110 object-cover z-0">
          <source src="./video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(25,40,30,0.2)_0%,rgba(25,40,30,0.5)_100%)] z-10"></div>
        
        <div className="relative z-20 text-center flex flex-col items-center justify-center max-w-5xl mx-auto px-6 [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)] [-webkit-mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)]">
          <div className="p-10 md:p-16 flex flex-col items-center">
            <span className="uppercase tracking-[0.4em] text-[0.65rem] font-bold text-white mb-6 block drop-shadow-[0_10px_30px_rgba(0,0,0,0.9)]">
              Curated Collection 2024
            </span>
            <h1 className="text-6xl md:text-9xl leading-[0.85] text-white serif mb-10 drop-shadow-[0_10px_30px_rgba(0,0,0,0.9)]">
              {renderKineticText("The Sculpture")} <br />
              {renderKineticText("of Rest")}
            </h1>
            <p className="text-lg md:text-3xl font-light text-white/90 max-w-xl leading-relaxed mb-12 drop-shadow-lg">
              Furniture that breathes. Organic designs that transform your living room into a sanctuary of biophilic wellness.
            </p>
            <div className="flex flex-col md:flex-row gap-6">
              <button className="inline-flex items-center justify-center px-12 py-5 rounded-[50vw] bg-[var(--deep-forest)] text-[var(--sunlight-cream)] font-medium tracking-[0.1em] uppercase transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:bg-[var(--chlorophyll)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.2)] border-none cursor-pointer shadow-2xl">
                Shop Collection
              </button>
              <button className="px-8 py-4 border border-white/20 bg-black/20 backdrop-blur-md rounded-full text-white text-sm uppercase tracking-widest hover:bg-white/30 transition-all shadow-xl">
                View Catalog
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 bg-[var(--sun-linen)] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
            <div className="bloom-element">
              <h2 className="text-5xl md:text-7xl text-[var(--deep-forest)] mb-8 leading-tight serif">Living Matter for your Interior</h2>
              <p className="text-[var(--oak-brown)] text-lg font-light leading-relaxed mb-10">
                Our pieces don&apos;t just occupy space; they evolve with it. We use reclaimed woods and smart textiles that purify the air.
              </p>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <span className="text-3xl serif block mb-2">01. Sustainable</span>
                  <p className="text-sm opacity-70">Full forestry certification.</p>
                </div>
                <div>
                  <span className="text-3xl serif block mb-2">02. Ergonomic</span>
                  <p className="text-sm opacity-70">Adapted to the human rhythm.</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/5] overflow-hidden rounded-2xl shadow-2xl bloom-element">
                <img src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1000&q=80" alt="Furniture Detail" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-10 -left-10 bg-white p-6 rounded-lg shadow-xl hidden md:block bloom-element" style={{ transitionDelay: '0.3s' }}>
                <span className="text-sm uppercase tracking-widest opacity-50 mb-2 block">Veridian Armchair</span>
                <span className="text-3xl serif block mb-4">$2,450.00</span>
                <button className="text-sm font-bold border-b border-black">ADD</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 bg-white">
        <div className="max-w-[1600px] mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl text-[var(--deep-forest)] serif mb-4">Featured Pieces</h2>
            <p className="text-sm tracking-widest uppercase opacity-40">Signature Furniture</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="bg-white p-6 rounded-lg transition-all duration-500 ease-in-out hover:shadow-[0_30px_60px_rgba(0,0,0,0.05)] hover:-translate-y-2.5 bloom-element">
              <div className="aspect-square mb-6 overflow-hidden bg-[var(--sunlight-cream)] rounded-lg">
                <img src="https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&w=800&q=80" alt="Moss High-Back Sofa" className="w-full h-full object-cover mix-blend-multiply hover:scale-110 transition-transform duration-700" />
              </div>
              <h3 className="text-2xl serif mb-2">Moss High-Back Sofa</h3>
              <p className="text-sm text-[var(--oak-brown)] mb-4">Forest green organic linen textile.</p>
              <span className="text-lg font-medium">$4,200</span>
            </div>
            <div className="bg-white p-6 rounded-lg transition-all duration-500 ease-in-out hover:shadow-[0_30px_60px_rgba(0,0,0,0.05)] hover:-translate-y-2.5 bloom-element" style={{ transitionDelay: '0.1s' }}>
              <div className="aspect-square mb-6 overflow-hidden bg-[var(--sunlight-cream)] rounded-lg">
                <img src="https://images.unsplash.com/photo-1581539250439-c96689b516dd?auto=format&fit=crop&w=800&q=80" alt="Cedar Root Table" className="w-full h-full object-cover mix-blend-multiply hover:scale-110 transition-transform duration-700" />
              </div>
              <h3 className="text-2xl serif mb-2">Cedar Root Table</h3>
              <p className="text-sm text-[var(--oak-brown)] mb-4">Cedar wood with bio-based resin.</p>
              <span className="text-lg font-medium">$1,850</span>
            </div>
            <div className="bg-white p-6 rounded-lg transition-all duration-500 ease-in-out hover:shadow-[0_30px_60px_rgba(0,0,0,0.05)] hover:-translate-y-2.5 bloom-element" style={{ transitionDelay: '0.2s' }}>
              <div className="aspect-square mb-6 overflow-hidden bg-[var(--sunlight-cream)] rounded-lg">
                <img src="https://images.unsplash.com/photo-1567016376408-0226e4d0c1ea?auto=format&fit=crop&w=800&q=80" alt="Bloom Amber Lamp" className="w-full h-full object-cover mix-blend-multiply hover:scale-110 transition-transform duration-700" />
              </div>
              <h3 className="text-2xl serif mb-2">Bloom Amber Lamp</h3>
              <p className="text-sm text-[var(--oak-brown)] mb-4">Blown glass and oak base.</p>
              <span className="text-lg font-medium">$890</span>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-[var(--deep-forest)] py-20 text-center text-white/60">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-5xl text-[var(--warm-amber)] serif mb-8">Join the Ecosystem</h2>
          <p className="mb-12">Receive news about launches and design philosophies.</p>
          <div className="flex max-w-md mx-auto border-b border-white/20 pb-2 mb-10">
            <input type="email" placeholder="Email" className="bg-transparent w-full outline-none text-white px-4" />
            <button className="uppercase text-sm tracking-widest font-bold">Subscribe</button>
          </div>
          <div className="flex justify-center gap-6 mb-10">
            <a href="#" className="hover:text-white transition-colors"><Icon icon="mdi:instagram" className="text-2xl" /></a>
            <a href="#" className="hover:text-white transition-colors"><Icon icon="mdi:twitter" className="text-2xl" /></a>
            <a href="#" className="hover:text-white transition-colors"><Icon icon="mdi:pinterest" className="text-2xl" /></a>
          </div>
          <div className="text-[0.6rem] tracking-widest uppercase">
            &copy; 2024 Veridian Living - Organic Aesthetics
          </div>
        </div>
      </footer>
    </>
  );
}