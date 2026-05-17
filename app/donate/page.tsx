"use client";

import { Footer } from "@/components/layout/footer";
import Header from "@/components/layout/header";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { useMemo, useState } from "react";

type DonationMethod = {
    id: "yape" | "visa" | "paypal";
    name: string;
    tagline: string;
    icon: string;
    color: string;
    detail: string;
    phone?: string;
    qrImage?: string;
    account?: string;
    cci?: string;
    email?: string;
    link?: string;
    recommended?: boolean;
};

const donationMethods: DonationMethod[] = [
    {
        id: "paypal",
        name: "PayPal",
        tagline: "Global support",
        icon: "logos:paypal",
        color: "#009CDE",
        detail: "Best for international donations and fast checkout.",
        email: "oliverachavezcristian@gmail.com",
        link: "https://www.paypal.com/ncp/payment/AZ3LS98LJ9SM2",
        recommended: true,
    },
    {
        id: "yape",
        name: "Yape",
        tagline: "Peru / local",
        icon: "https://openvid.dev/images/pages/yape.avif",
        color: "#6C3EB8",
        detail: "Quick local transfer with QR scan support.",
        phone: "+51 954 306 632",
        qrImage: "https://openvid.dev/images/pages/qr.avif",
    },
    {
        id: "visa",
        name: "Visa",
        tagline: "Bank transfer",
        icon: "ri:visa-line",
        color: "white",
        detail: "Account and CCI details for direct transfers.",
        account: "200-12083829-0-69",
        cci: "002-20011208382906945",
    },
];

export default function DonatePage() {
    const [selected, setSelected] = useState<DonationMethod["id"]>("paypal");
    const [copied, setCopied] = useState<string | null>(null);
    const [qrModalSrc, setQrModalSrc] = useState<string | null>(null);

    const selectedMethod = useMemo(
        () => donationMethods.find((method) => method.id === selected) ?? donationMethods[0],
        [selected]
    );

    const handleCopy = async (text: string, key: string) => {
        const cleanText = text.replace(/\s/g, "");
        try {
            await navigator.clipboard.writeText(cleanText);
            setCopied(key);
            window.setTimeout(() => setCopied(null), 1800);
        } catch {
            setCopied(null);
        }
    };

    return (
        <div className="min-h-screen overflow-hidden bg-black text-white antialiased selection:bg-white selection:text-black">
            <Header />

            <div className="fixed inset-0 -z-10 overflow-hidden">
                <div className="absolute left-[-8rem] top-24 h-[28rem] w-[28rem] rounded-full bg-white/5 blur-[120px]" />
                <div className="absolute right-[-6rem] bottom-0 h-[24rem] w-[24rem] rounded-full bg-white/5 blur-[130px]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,.05),transparent_22%),radial-gradient(circle_at_20%_20%,rgba(255,255,255,.03),transparent_18%),linear-gradient(180deg,rgba(255,255,255,.02),transparent_35%)]" />
            </div>

            <div className="relative z-10 mt-28">
                <header className="sticky top-0 z-30 border-b border-white/10 bg-black/70 backdrop-blur-xl">
                    <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
                        <Link href="/" className="group inline-flex items-center gap-2 text-sm text-white/55 transition-colors hover:text-white">
                            <Icon icon="lucide:arrow-left" className="text-base transition-transform group-hover:-translate-x-1" />
                            Back home
                        </Link>

                        <div className="hidden items-center gap-3 md:flex">
                            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-[10px] uppercase tracking-[0.28em] text-white/45">
                                Support OpenHero
                            </span>
                        </div>
                    </div>
                </header>

                <main className="mx-auto mb-20 max-w-7xl px-4 pb-20 pt-10 sm:px-6">
                    <section className="grid gap-8 lg:grid-cols-[1.05fr_.95fr] lg:items-start">
                        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-2xl shadow-black/40 backdrop-blur-xl sm:p-8">
                            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5">
                                <span className="text-[11px] uppercase tracking-[0.3em] text-white/45">
                                    Donations
                                </span>
                            </div>

                            <h1 className="mt-5 max-w-2xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                                Help keep OpenHero free, open, and full of cinematic video hero sections.
                            </h1>

                            <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/55 sm:text-base">
                                Your support helps keep the gallery online, expand the background library, and add more production-ready examples for everyone.
                            </p>

                            <div className="mt-8 flex flex-wrap gap-3">
                                {donationMethods.map((method) => {
                                    const active = selected === method.id;
                                    return (
                                        <button
                                            key={method.id}
                                            type="button"
                                            onClick={() => setSelected(method.id)}
                                            className={`inline-flex items-center gap-3 rounded-full border px-4 py-2.5 text-sm transition-all ${active
                                                ? "border-white/20 bg-white text-black"
                                                : "border-white/10 bg-white/[0.03] text-white/70 hover:bg-white/5 hover:text-white"
                                                }`}
                                        >
                                            <span
                                                className={`flex h-7 w-7 items-center justify-center overflow-hidden rounded-full border ${active ? "border-black/10 bg-black/5" : "border-white/10 bg-black/30"
                                                    }`}
                                            >
                                                {method.icon.startsWith("http") ? (
                                                    <img
                                                        src={method.icon}
                                                        alt={method.name}
                                                        className="h-4 w-4 object-contain"
                                                    />
                                                ) : (
                                                    <Icon
                                                        icon={method.icon}
                                                        className="text-base"
                                                        style={{ color: active ? undefined : method.color }}
                                                    />
                                                )}
                                            </span>
                                            <span>{method.name}</span>
                                        </button>
                                    );
                                })}
                            </div>

                            <div className="mt-10 rounded-3xl border border-white/10 bg-black/30 p-5">
                                <div className="flex items-center justify-between gap-4">
                                    <div>
                                        <div className="text-[10px] uppercase tracking-[0.28em] text-white/40">
                                            Selected support method
                                        </div>
                                        <div className="mt-1 text-2xl font-semibold text-white">
                                            {selectedMethod.name}
                                        </div>
                                    </div>
                                    {selectedMethod.recommended ? (
                                        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] uppercase tracking-[0.28em] text-white/60">
                                            Recommended
                                        </span>
                                    ) : null}
                                </div>
                                <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/55">
                                    {selectedMethod.detail}
                                </p>
                            </div>
                        </div>

                        <aside className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-2xl shadow-black/40 backdrop-blur-xl sm:p-8">
                            <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-5">
                                <div>
                                    <div className="text-[10px] uppercase tracking-[0.28em] text-white/40">
                                        Donation panel
                                    </div>
                                    <div className="mt-1 text-xl font-medium text-white">
                                        Support OpenHero
                                    </div>
                                </div>
                                <Icon icon="lucide:shield-check" className="text-lg text-white/30" />
                            </div>

                            <div className="mt-6 space-y-4">
                                {selectedMethod.id === "paypal" && (
                                    <div className="space-y-4">
                                        <CopyRow
                                            label="PayPal email"
                                            value={selectedMethod.email || ""}
                                            copyKey="paypal-email"
                                            copied={copied}
                                            onCopy={handleCopy}
                                            copyLabel="Copy email"
                                            copiedLabel="Copied"
                                        />
                                        <a
                                            href={selectedMethod.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10"
                                        >
                                            <Icon icon="lucide:external-link" className="text-base text-white/45" />
                                            Open PayPal donation link
                                        </a>
                                        <div className="rounded-2xl border border-white/10 bg-black/30 p-4 text-sm text-white/60">
                                            PayPal is the easiest way to support the project from anywhere in the world.
                                        </div>
                                    </div>
                                )}

                                {selectedMethod.id === "yape" && (
                                    <div className="space-y-4">
                                        <div className="rounded-2xl border border-white/10 bg-black p-4">
                                            <button
                                                type="button"
                                                onClick={() => setQrModalSrc(selectedMethod.qrImage || null)}
                                                className="group relative mx-auto flex aspect-square w-48 items-center justify-center overflow-hidden rounded-2xl bg-white"
                                                aria-label="Open QR code"
                                            >
                                                {selectedMethod.qrImage ? (
                                                    <img
                                                        src={selectedMethod.qrImage}
                                                        alt="Yape QR code"
                                                        className="h-full w-full object-contain p-2"
                                                    />
                                                ) : (
                                                    <div className="flex h-full w-full items-center justify-center text-sm text-black/60">
                                                        QR unavailable
                                                    </div>
                                                )}
                                                <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/10">
                                                    <Icon icon="lucide:zoom-in" className="text-2xl text-black opacity-0 transition-opacity group-hover:opacity-60" />
                                                </div>
                                            </button>
                                        </div>

                                        <CopyRow
                                            label="Yape phone"
                                            value={selectedMethod.phone || ""}
                                            copyKey="yape-phone"
                                            copied={copied}
                                            onCopy={handleCopy}
                                            copyLabel="Copy phone"
                                            copiedLabel="Copied"
                                        />
                                        <div className="rounded-2xl border border-white/10 bg-black/30 p-4 text-sm text-white/60">
                                            Use Yape to support the project quickly with a local transfer.
                                        </div>
                                    </div>
                                )}

                                {selectedMethod.id === "visa" && (
                                    <div className="space-y-3">
                                        <CopyRow
                                            label="Visa account"
                                            value={selectedMethod.account || ""}
                                            copyKey="visa-account"
                                            copied={copied}
                                            onCopy={handleCopy}
                                            copyLabel="Copy account"
                                            copiedLabel="Copied"
                                        />
                                        <CopyRow
                                            label="CCI"
                                            value={selectedMethod.cci || ""}
                                            copyKey="visa-cci"
                                            copied={copied}
                                            onCopy={handleCopy}
                                            copyLabel="Copy CCI"
                                            copiedLabel="Copied"
                                        />
                                        <div className="rounded-2xl border border-white/10 bg-black/30 p-4 text-sm text-white/60">
                                            Direct transfer is perfect if you prefer bank support for the project.
                                        </div>
                                    </div>
                                )}
                            </div>
                        </aside>
                    </section>
                </main>

                <Footer />
            </div>

            {qrModalSrc ? (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
                    onClick={() => setQrModalSrc(null)}
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="qr-modal-title"
                >
                    <div
                        className="w-full max-w-sm rounded-3xl border border-white/10 bg-[#0b0b0d] p-5 shadow-2xl shadow-black/60"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between">
                            <h3 id="qr-modal-title" className="text-sm font-medium text-white">
                                Scan QR
                            </h3>
                            <button
                                type="button"
                                onClick={() => setQrModalSrc(null)}
                                className="rounded-full border border-white/10 bg-white/5 p-2 text-white/55 transition-colors hover:bg-white/10 hover:text-white"
                                aria-label="Close modal"
                            >
                                <Icon icon="lucide:x" className="text-base" />
                            </button>
                        </div>
                        <div className="mt-5 overflow-hidden rounded-2xl border border-white/10 bg-white p-2">
                            <img src={qrModalSrc} alt="QR code enlarged for scanning" className="h-full w-full object-contain" />
                        </div>
                        <button
                            type="button"
                            onClick={() => setQrModalSrc(null)}
                            className="mt-5 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10"
                        >
                            Close
                        </button>
                    </div>
                </div>
            ) : null}
        </div>
    );
}

interface CopyRowProps {
    label: string;
    value: string;
    copyKey: string;
    copied: string | null;
    onCopy: (val: string, key: string) => void;
    copyLabel: string;
    copiedLabel: string;
}

function CopyRow({
    label,
    value,
    copyKey,
    copied,
    onCopy,
    copyLabel,
    copiedLabel,
}: CopyRowProps) {
    const isCopied = copied === copyKey;

    return (
        <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-black/40 p-4">
            <div className="min-w-0">
                <p className="text-[10px] uppercase tracking-[0.28em] text-white/40">
                    {label}
                </p>
                <p className="mt-1 break-all font-mono text-sm text-white/90">
                    {value}
                </p>
            </div>
            <button
                type="button"
                onClick={() => onCopy(value, copyKey)}
                className={`inline-flex shrink-0 items-center gap-2 rounded-xl border px-3 py-2 text-xs font-medium transition-all ${isCopied
                    ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                    : "border-white/10 bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
                    }`}
                aria-label={isCopied ? copiedLabel : copyLabel}
                aria-live="polite"
            >
                <Icon icon={isCopied ? "lucide:check" : "lucide:copy"} className="text-sm" />
                {isCopied ? copiedLabel : copyLabel}
            </button>
        </div>
    );
}