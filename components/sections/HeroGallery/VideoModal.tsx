"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import { Highlight, themes, type Language } from "prism-react-renderer";
import type { HeroVideo } from "@/lib/videos";
import { capitalize } from "@/lib/utils";
import { getNextjsCode, getHtmlCode } from "@/lib/hero-templates";
import { VercelTabs } from "@/components/ui/vercel-tabs";

type Framework = "nextjs" | "html";

const FW_CONFIG: Record<
  Framework,
  { label: string; icon: string; lang: Language; filename: string; format: string }
> = {
  nextjs: { label: "Next.js", icon: "simple-icons:nextdotjs", lang: "tsx", filename: "page.tsx", format: "nextjs" },
  html: { label: "HTML", icon: "simple-icons:html5", lang: "markup", filename: "index.html", format: "html" },
};

function CodeBlock({ code, lang }: { code: string; lang: Language }) {
  if (!code) return null;
  return (
    <Highlight theme={themes.vsDark} code={code} language={lang}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre
          className={`${className} hide-scrollbar`}
          style={{
            ...style,
            margin: 0,
            padding: "12px 14px",
            fontSize: "10.5px",
            lineHeight: "1.7",
            background: "rgba(22,22,28,0.95)",
            overflowX: "auto",
            borderRadius: "0.5rem",
            height: "100%",
          }}
        >
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line })}>
              <span
                style={{
                  display: "inline-block",
                  minWidth: "2em",
                  marginRight: "1.25rem",
                  color: "rgba(255,255,255,0.18)",
                  userSelect: "none",
                  fontSize: "10px",
                  textAlign: "right",
                  flexShrink: 0,
                }}
              >
                {i + 1}
              </span>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
}

function DownloadZipButton({ video, format }: { video: HeroVideo; format: string }) {
  const handleDownload = () => {
    const url = `/api/download?category=${encodeURIComponent(video.category)}&slug=${encodeURIComponent(video.slug)}&format=${encodeURIComponent(format)}`;
    
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${video.slug}.zip`); 
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button
      onClick={handleDownload}
      className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white transition-colors hover:bg-white/10"
    >
      <Icon icon="solar:archive-down-minimlistic-linear" width="12" />
      .zip with video
    </button>
  );
}


function FrameworkDropdown({ active, onChange }: { active: Framework; onChange: (fw: Framework) => void }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  return (
    <div ref={menuRef} className="relative">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center gap-1.5 rounded-lg border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/20"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <Icon icon={FW_CONFIG[active].icon} width="13" />
        <span className="flex-1 text-left">{FW_CONFIG[active].label}</span>
        <Icon icon="solar:alt-arrow-down-linear" width="11" className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="absolute top-full left-0 z-50 mt-1 w-full overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900 shadow-2xl">
          <div className="border-b border-neutral-800 px-3 py-2">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-neutral-500">Select Framework</p>
          </div>
          {(Object.keys(FW_CONFIG) as Framework[]).map((fw) => (
            <button
              key={fw}
              role="option"
              aria-selected={active === fw}
              onClick={() => { onChange(fw); setOpen(false); }}
              className={`flex w-full items-center gap-2.5 px-3 py-2.5 text-xs transition-colors hover:bg-neutral-800 ${active === fw ? "text-white" : "text-neutral-400"}`}
            >
              <Icon icon={FW_CONFIG[fw].icon} width="14" className="shrink-0" />
              <span className="flex flex-col items-start">
                <span className="font-medium leading-none">{FW_CONFIG[fw].label}</span>
                <span className="mt-0.5 text-[10px] text-neutral-600">{FW_CONFIG[fw].filename}</span>
              </span>
              {active === fw && <Icon icon="solar:check-linear" width="12" className="ml-auto text-white/60" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function TabCodeContent({ code, lang, loading, video, format }: { code: string; lang: Language; loading: boolean; video: HeroVideo; format: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopyCode = async () => {
    if (!code) return;
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadCode = () => {
    const blob = new Blob([code], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = FW_CONFIG[format as Framework].filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex h-full min-h-0 flex-col relative">
      <div className="absolute top-3 right-3 z-10 flex items-center gap-2">
        <button
          onClick={handleCopyCode}
          className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-black/80 backdrop-blur-sm px-3 py-1.5 text-xs text-white transition-colors hover:bg-white/10"
          title="Copy code"
        >
          <Icon icon={copied ? "solar:check-read-linear" : "solar:copy-linear"} width="12" />
          {copied ? "Copied!" : "Copy"}
        </button>
        <button
          onClick={handleDownloadCode}
          className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-black/80 backdrop-blur-sm px-3 py-2 text-xs text-white transition-colors hover:bg-white/10"
          title="Download code file"
        >
          <Icon icon="heroicons-solid:download" width="12" />
        </button>
      </div>

      <div className="flex-1 min-h-0 overflow-auto custom-scroll rounded-lg border border-white/5 lg:h-auto">
        {loading ? (
          <div className="flex h-full items-center justify-center text-xs text-white/30">Loading…</div>
        ) : (
          <CodeBlock code={code} lang={lang} />
        )}
      </div>
    </div>
  );
}

interface VideoModalProps {
  video: HeroVideo;
  onClose: () => void;
}

export function VideoModal({ video, onClose }: VideoModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [mobileTab, setMobileTab] = useState<Framework>("nextjs");
  const [codes, setCodes] = useState<Record<Framework, string>>({ nextjs: "", html: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchCodes = async () => {
      setLoading(true);
      const opts = { name: video.name, slug: video.slug, videoSrc: video.videoSrc, category: video.category };

      if (video.hasDownloads) {
        const base = `/downloads/${video.category}/${video.slug}`;
        try {
          const [nextjs, html] = await Promise.all([
            fetch(`${base}/page.tsx`).then((r) => (r.ok ? r.text() : null)),
            fetch(`${base}/index.html`).then((r) => (r.ok ? r.text() : null)),
          ]);

          if (isMounted) {
            setCodes({
              nextjs: nextjs ?? getNextjsCode(opts),
              html: html ?? getHtmlCode(opts),
            });
          }
        } catch (error) {
          console.error("Error fetching codes", error);
        }
      } else {
        if (isMounted) {
          setCodes({ nextjs: getNextjsCode(opts), html: getHtmlCode(opts) });
        }
      }
      if (isMounted) setLoading(false);
    };

    fetchCodes();
    return () => { isMounted = false; };
  }, [video]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [onClose]);

  useEffect(() => {
    videoRef.current?.play().catch(() => { });
  }, []);

  const tags = [
    video.category,
    ...video.slug.split("-").filter((w) => !["the", "a", "of", "in", "on"].includes(w)).slice(0, 5),
  ];

  const vercelTabsData = (Object.keys(FW_CONFIG) as Framework[]).map((fw) => ({
    label: FW_CONFIG[fw].label,
    value: fw,
    icon: FW_CONFIG[fw].icon,
    content: <TabCodeContent code={codes[fw]} lang={FW_CONFIG[fw].lang} loading={loading} video={video} format={FW_CONFIG[fw].format} />,
  }));

  return (
    <div role="dialog" aria-modal="true" aria-label={`Preview: ${video.name}`} className="fixed inset-0 z-60 bg-black/50 backdrop-blur-md" onClick={onClose}>
      <div className="flex h-full w-full flex-col lg:flex-row" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} aria-label="Close" className="fixed right-3 top-3 z-70 inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/20 lg:absolute lg:right-4 lg:top-4">
          <Icon icon="material-symbols:close-rounded" width="16" />
        </button>

        <div className="flex h-[45vh] shrink-0 items-center justify-center overflow-hidden lg:h-full lg:flex-1">
          <div className="relative h-full w-full">
            <video ref={videoRef} src={video.videoSrc} loop muted playsInline className="absolute inset-0 h-full w-full object-contain" />
          </div>
        </div>

        <aside
          className={[
            "bg-black/80 ring-1 ring-white/10 backdrop-blur-xl text-white/90",
            "absolute bottom-2 left-2 right-2 z-65 max-h-[55vh] overflow-y-auto custom-scroll rounded-2xl p-4",
            "lg:relative lg:bottom-auto lg:left-auto lg:right-auto",
            "lg:m-2 lg:flex lg:h-[calc(100%-1rem)] lg:w-140 lg:shrink-0 lg:flex-col",
            "lg:max-h-none lg:overflow-hidden lg:rounded-2xl lg:p-5",
          ].join(" ")}
        >
          <div className="mb-4 flex-none">
            <span className="mb-2 inline-block rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white/50">
              {capitalize(video.category)}
            </span>
            <h2 className="text-sm font-medium text-white lg:text-base">{video.name}</h2>
            <div className="mt-2 flex flex-wrap gap-1">
              {tags.map((t) => (
                <span key={t} className="rounded-xl border border-white/5 bg-white/5 px-2 py-0.5 text-[11px] text-white/40">{t}</span>
              ))}
            </div>

            {/* Action buttons */}
            <div className="mt-4 flex flex-wrap gap-2">
              <a
                href={`/downloads/${video.category}/${video.slug}/video.mp4`}
                download="video.mp4"
                className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white transition-colors hover:bg-white/10"
              >
                <Icon icon="solar:download-minimalistic-linear" width="12" />
                Download Video
              </a>
              <DownloadZipButton video={video} format={mobileTab} />
              <a
                href={`/preview/${video.category}/${video.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white transition-colors hover:bg-white/10"
              >
                <Icon icon="solar:eye-linear" width="12" />
                Preview
              </a>
            </div>
          </div>

          <div className="flex min-h-0 flex-1 flex-col">
            <div className="hidden sm:flex flex-1 flex-col min-h-0">
              <VercelTabs tabs={vercelTabsData} defaultTab="nextjs" className="flex flex-col h-full min-h-0" contentClassName="flex-1 min-h-0 mt-3" />
            </div>

            <div className="flex flex-col sm:hidden min-h-0 flex-1">
              <div className="mb-3 shrink-0">
                <FrameworkDropdown active={mobileTab} onChange={setMobileTab} />
              </div>
              <div className="relative h-48 min-h-0 flex-1 overflow-auto custom-scroll rounded-lg border border-white/5 lg:h-auto">
                {/* Sticky action buttons for mobile */}
                <div className="absolute top-2 right-2 z-10 flex items-center gap-1.5 sticky">
                  <button
                    onClick={async () => {
                      if (!codes[mobileTab]) return;
                      await navigator.clipboard.writeText(codes[mobileTab]);
                    }}
                    className="flex items-center gap-1 rounded-lg border border-white/10 bg-black/80 backdrop-blur-sm px-2 py-1 text-[10px] text-white transition-colors hover:bg-white/10"
                  >
                    <Icon icon="solar:copy-linear" width="10" />
                  </button>
                  <button
                    onClick={() => {
                      const blob = new Blob([codes[mobileTab]], { type: "text/plain" });
                      const url = URL.createObjectURL(blob);
                      const link = document.createElement("a");
                      link.href = url;
                      link.download = FW_CONFIG[mobileTab].filename;
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                      URL.revokeObjectURL(url);
                    }}
                    className="flex items-center gap-1 rounded-lg border border-white/10 bg-black/80 backdrop-blur-sm px-2 py-1 text-[10px] text-white transition-colors hover:bg-white/10"
                  >
                    <Icon icon="solar:file-download-linear" width="10" />
                  </button>
                </div>
                {loading ? (
                  <div className="flex h-full items-center justify-center text-xs text-white/30">Loading…</div>
                ) : (
                  <CodeBlock code={codes[mobileTab]} lang={FW_CONFIG[mobileTab].lang} />
                )}
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}