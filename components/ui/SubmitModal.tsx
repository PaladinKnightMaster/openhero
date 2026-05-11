"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";

type Status = "idle" | "loading" | "success" | "error";

const ALLOWED_ZIP_TYPES = ["application/zip", "application/x-zip-compressed", "application/x-zip"];
const MAX_SIZE_MB = 5;

interface Props {
    onClose: () => void;
}

export function SubmitModal({ onClose }: Props) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const [status, setStatus] = useState<Status>("idle");
    const [message, setMessage] = useState("");
    const [dragOver, setDragOver] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
        document.addEventListener("keydown", onKey);
        document.body.style.overflow = "hidden";
        return () => {
            document.removeEventListener("keydown", onKey);
            document.body.style.overflow = "";
        };
    }, [onClose]);

    function handleFile(f: File) {
        const isZip = ALLOWED_ZIP_TYPES.includes(f.type) || f.name.endsWith(".zip");
        if (!isZip) {
            setMessage("Only .zip files are accepted.");
            setStatus("error");
            return;
        }
        if (f.size > MAX_SIZE_MB * 1024 * 1024) {
            setMessage(`File is too large. Maximum size is ${MAX_SIZE_MB} MB.`);
            setStatus("error");
            return;
        }
        setFile(f);
        setStatus("idle");
        setMessage("");
    }

    function handleDrop(e: React.DragEvent) {
        e.preventDefault();
        setDragOver(false);
        const dropped = e.dataTransfer.files[0];
        if (dropped) handleFile(dropped);
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!title.trim() || !file) {
            setMessage("Please fill in the title and select a ZIP file.");
            setStatus("error");
            return;
        }
        setStatus("loading");
        setMessage("");

        const formData = new FormData();
        formData.append("title", title.trim());
        formData.append("description", description.trim());
        formData.append("file", file);

        try {
            const res = await fetch("/api/submit", { method: "POST", body: formData });
            const data = await res.json();
            if (!res.ok) {
                setStatus("error");
                setMessage(data.error ?? "Something went wrong. Please try again.");
            } else {
                setStatus("success");
                setMessage(data.message ?? "Submitted successfully!");
            }
        } catch {
            setStatus("error");
            setMessage("Network error. Please try again.");
        }
    }

    return (
        <div
            ref={overlayRef}
            className="fixed inset-0 z-200 flex items-center justify-center px-4"
            onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
        >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />

            {/* Panel */}
            <div className="relative z-10 w-full max-w-md rounded-2xl border border-white/10 bg-[#0a0a0a] p-7 shadow-2xl">
                {/* Header */}
                <div className="mb-6 flex items-start justify-between">
                    <div>
                        <h2 className="text-lg font-semibold tracking-tight text-white">
                            Share your hero section
                        </h2>
                        <p className="mt-1 text-xs text-white/40">
                            ZIP with <code className="rounded bg-white/8 px-1 text-white/60">index.html</code>{" "}
                            + <code className="rounded bg-white/8 px-1 text-white/60">video.mp4</code>
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="shrink-0 rounded-lg p-1.5 text-white/30 transition-colors hover:bg-white/8 hover:text-white"
                    >
                        <Icon icon="solar:close-circle-linear" width="18" />
                    </button>
                </div>

                {status === "success" ? (
                    <div className="py-8 text-center">
                        <div className="mb-4 flex justify-center">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-green-500/30 bg-green-500/10">
                                <Icon icon="solar:check-circle-linear" width="24" className="text-green-400" />
                            </div>
                        </div>
                        <p className="text-sm text-white/70">{message}</p>
                        <button
                            onClick={onClose}
                            className="mt-6 inline-flex items-center gap-2 rounded-xl  px-5 py-2.5 text-sm font-semibold text-white transition-all border border-white/20 hover:bg-white/10"
                        >
                            Accept and Close
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="mb-1.5 block text-[11px] font-medium text-white/40">
                                Title <span className="text-white/25">(required)</span>
                            </label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="e.g. Neon City Hero"
                                maxLength={100}
                                required
                                className="w-full rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-sm text-white placeholder-white/20 outline-none transition-colors focus:border-white/25 focus:bg-white/8"
                            />
                        </div>

                        <div>
                            <label className="mb-1.5 block text-[11px] font-medium text-white/40">
                                Description <span className="text-white/25">(optional)</span>
                            </label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Briefly describe your hero section..."
                                maxLength={500}
                                rows={2}
                                className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-sm text-white placeholder-white/20 outline-none transition-colors focus:border-white/25"
                            />
                        </div>

                        <div>
                            <label className="mb-1.5 block text-[11px] font-medium text-white/40">
                                ZIP File <span className="text-white/25">(max {MAX_SIZE_MB} MB)</span>
                            </label>
                            <div
                                onClick={() => fileInputRef.current?.click()}
                                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                                onDragLeave={() => setDragOver(false)}
                                onDrop={handleDrop}
                                className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed px-4 py-7 text-center transition-colors ${dragOver
                                        ? "border-white/30 bg-white/5"
                                        : file
                                            ? "border-green-500/25 bg-green-500/5"
                                            : "border-white/10 hover:border-white/20"
                                    }`}
                            >
                                <Icon
                                    icon={file ? "solar:file-check-linear" : "solar:upload-linear"}
                                    width="20"
                                    className={file ? "text-green-400" : "text-white/25"}
                                />
                                {file ? (
                                    <>
                                        <p className="text-xs font-medium text-white/70">{file.name}</p>
                                        <p className="text-[11px] text-white/35">
                                            {(file.size / 1024 / 1024).toFixed(1)} MB
                                        </p>
                                        <button
                                            type="button"
                                            onClick={(e) => { e.stopPropagation(); setFile(null); }}
                                            className="text-[11px] text-white/25 transition-colors hover:text-white/50"
                                        >
                                            Remove
                                        </button>
                                    </>
                                ) : (
                                    <p className="text-xs text-white/35">
                                        Drop <span className="text-white/50">.zip</span> here or{" "}
                                        <span className="text-white/60 underline underline-offset-2">browse</span>
                                    </p>
                                )}
                            </div>
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept=".zip,application/zip"
                                className="hidden"
                                onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }}
                            />
                        </div>

                        {status === "error" && message && (
                            <div className="flex items-start gap-2 rounded-xl border border-red-500/20 bg-red-500/5 px-3.5 py-2.5">
                                <Icon icon="solar:danger-circle-linear" width="13" className="mt-0.5 shrink-0 text-red-400" />
                                <p className="text-xs text-red-300">{message}</p>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={status === "loading"}
                            className="flex w-full items-center justify-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-black transition-all hover:bg-white/90 disabled:opacity-50"
                        >
                            {status === "loading" ? (
                                <>
                                    <Icon icon="solar:spinner-linear" width="13" className="animate-spin" />
                                    Submitting…
                                </>
                            ) : (
                                <>
                                    <Icon icon="solar:upload-linear" width="13" />
                                    Submit Hero Section
                                </>
                            )}
                        </button>

                        <p className="text-center text-[10px] text-white/30">
                            Max 2 submissions every 30 days · Reviewed manually before publishing
                        </p>
                    </form>
                )}
            </div>
        </div>
    );
}
