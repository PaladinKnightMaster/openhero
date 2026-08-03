import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
    title: "Page Not Found",
    description: "The page you are looking for does not exist or has been moved.",
    robots: {
        index: false,
        follow: false,
    },
};

export default function NotFound() {
    return (
        <div className="flex min-h-screen flex-col bg-black text-white">
            <Header />
            <main className="flex flex-1 items-center justify-center px-6">
                <div className="text-center">
                    <p className="text-7xl font-black tracking-tight sm:text-8xl">
                        4<span className="text-neutral-500">0</span>4
                    </p>
                    <h1 className="mt-6 text-2xl font-semibold sm:text-3xl">
                        Page not found
                    </h1>
                    <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-neutral-400">
                        The page you are looking for does not exist or has been moved.
                        Head back home to browse free cinematic video hero sections.
                    </p>
                    <Link
                        href="/"
                        className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-neutral-950 shadow-lg transition-colors hover:bg-neutral-100"
                    >
                        Back to home
                    </Link>
                </div>
            </main>
            <Footer />
        </div>
    );
}
