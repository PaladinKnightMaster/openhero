"use client";

import { useEffect, useState } from "react";
import { toPreviewHtml } from "@/lib/preview-html";

interface HeroPreviewFrameProps {
  html: string;
  category: string;
  slug: string;
  title: string;
}

/**
 * Renders generated hero HTML in a sandboxed iframe against R2-hosted media.
 * Debounced so live edits in Hero Studio don't thrash the iframe.
 */
export function HeroPreviewFrame({ html, category, slug, title }: HeroPreviewFrameProps) {
  const [srcDoc, setSrcDoc] = useState("");

  useEffect(() => {
    const id = setTimeout(() => {
      setSrcDoc(toPreviewHtml(html, { category, slug, variant: "studio" }));
    }, 250);
    return () => clearTimeout(id);
  }, [html, category, slug]);

  return (
    <iframe
      title={`Live preview: ${title}`}
      srcDoc={srcDoc}
      sandbox="allow-scripts"
      loading="lazy"
      className="h-full w-full border-0 bg-black"
    />
  );
}
