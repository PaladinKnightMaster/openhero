"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";
import { LiquidMetalButton } from "../ui/liquid-metal-button";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isOpen]);

  return (
    <>
      <header
        className={`fixed top-0 z-50 w-full transition-all duration-300 animate-fade-in ${isScrolled || isOpen
            ? "border-b border-white/10 bg-black/80 backdrop-blur-xl py-0"
            : "border-transparent bg-transparent py-2"
          }`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="group flex items-center z-50">
            <div className="h-10 transition-transform group-hover:scale-105 filter drop-shadow-[0_0_15px_rgba(255,255,255,1)] drop-shadow-[0_0_30px_rgba(183,203,248,0.6)]">
              <img
                src="/svg/logo-openhero.svg"
                alt="OpenHero Logo"
                className="hidden sm:flex h-full w-auto object-contain"
              />
              <img
                src="/svg/icon-openhero.svg"
                alt="OpenHero Logo"
                className="flex sm:hidden h-full w-auto object-contain drop-shadow-[0_0_20px_rgba(183,203,248,0.4)]"
              />
            </div>
          </Link>

          <nav className="hidden items-center gap-8 text-sm font-medium text-neutral-300 md:flex">
            <a href="#gallery" className="transition-colors hover:text-white">Gallery</a>
            <a href="#assets" className="transition-colors hover:text-white">Assets</a>
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=oliverachavezcristian@gmail.com"
              target="_blank"
              className="transition-colors hover:text-white"
            >
              Contact
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden sm:block">
              <LiquidMetalButton label="GitHub" icon="mdi:github" size="md" />
            </div>

            <button
              className="p-2 text-white md:hidden z-50"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              <Icon
                icon={isOpen ? "lucide:x" : "solar:hamburger-menu-linear"}
                width="26"
              />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 flex flex-col bg-black/95 backdrop-blur-2xl md:hidden"
          >
            <div className="flex flex-col items-center justify-center h-full gap-8 px-6 drop-shadow-[0_0_20px_rgba(183,203,248,0.4)]">

              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="mb-8 filter drop-shadow-[0_0_20px_rgba(183,203,248,0.4)]"
              >
                <img
                  src="/svg/logo-openhero.svg"
                  alt="OpenHero Logo"
                  className="h-12 w-auto object-contain"
                />
              </motion.div>

              <nav className="flex flex-col items-center gap-8 text-2xl font-semibold text-white">
                <Link href="#gallery" onClick={() => setIsOpen(false)} className="hover:text-accent transition-colors">
                  Gallery
                </Link>
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=oliverachavezcristian@gmail.com"
                  onClick={() => setIsOpen(false)}
                  className="hover:text-accent transition-colors"
                >
                  Contact
                </a>
              </nav>
              <div className="mt-8 flex w-full justify-center">
                <LiquidMetalButton label="GitHub" icon="mdi:github" size="lg" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}