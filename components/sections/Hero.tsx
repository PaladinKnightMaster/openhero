"use client"

import { Icon } from "@iconify/react";
import MetallicPaint from "../ui/MetallicPaint";
import { useEffect, useState } from "react";

export default function Hero() {

    const [dynamicFontSize, setDynamicFontSize] = useState(75);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 640) {
                setDynamicFontSize(50);
            } else {
                setDynamicFontSize(75);
            }
        };

        handleResize();

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="relative overflow-hidden font-sans animate-fade-in">
            <div
                className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-72 opacity-25"
            />
            <section className="mx-auto max-w-7xl px-6 pt-28 pb-14 sm:pt-34 sm:pb-16 lg:px-8">
                <div className="mx-auto max-w-3xl text-center">
                    <h1 className="text-5xl font-black tracking-tight text-white sm:text-6xl z-20 lg:text-7xl leading-[0.9] drop-shadow-[1.2px_1.2px_100.2px_rgba(183,203,248,1)]">
                        Stunning Hero
                        <br />
                        <span className="text-neutral-500 drop-shadow-[0_0_15px_rgba(0,0,0,0.2)] block">
                            <MetallicPaint
                                text="Sections."
                                fontWeight="900"
                                fontSize={dynamicFontSize} // <--- Valor dinámico
                                tintColor="#ffffff"
                                speed={0.2}
                                darkColor="#ffffff"
                                brightness={1.8}
                            />
                        </span>
                    </h1>
                    <p className="text-lg leading-8 text-neutral-300 drop-shadow-[1.2px_1.2px_100.2px_rgba(183,203,248,1)]">
                        Browse cinematic video backgrounds paired with polished hero layouts. Preview in real-time, and download in <span className="font-medium text-neutral-200">HTML</span>,{" "}
                        <span className="font-medium text-neutral-200">React</span>, or{" "}
                        <span className="font-medium text-neutral-200">Next.js</span>
                    </p>
                    <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                        <a href="#gallery" className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-neutral-950 shadow-lg transition-colors hover:bg-neutral-100">
                            <Icon icon="solar:play-circle-bold" width="16" />
                            Browse Gallery
                        </a>
                        <a href="https://github.com/CristianOlivera1/openhero" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-neutral-700 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-neutral-500 hover:bg-neutral-900">
                            <Icon icon="mdi:github" width="16" />
                            View on GitHub
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}
