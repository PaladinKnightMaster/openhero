import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const BASE_URL = "https://openhero.art";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
};

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "openhero — Free Cinematic Video Hero Sections",
    template: "%s | openhero",
  },
  description:
    "Browse and download cinematic video hero sections with production-ready source code in HTML, React, and Next.js. Free to use.",
  keywords: [
    "video hero section",
    "hero video background",
    "cinematic hero template",
    "next.js hero component",
    "react hero section",
    "free hero template",
    "website hero download",
    "landing page hero",
  ],
  authors: [{ name: "openhero", url: BASE_URL }],
  creator: "openhero",
  publisher: "openhero",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "openhero",
    title: "openhero — Free Cinematic Video Hero Sections",
    description:
      "Browse and download cinematic video hero sections with production-ready source code in HTML, React, and Next.js.",
  },
  twitter: {
    card: "summary_large_image",
    title: "openhero — Free Cinematic Video Hero Sections",
    description:
      "Browse and download cinematic video hero sections with production-ready source code in HTML, React, and Next.js.",
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "openhero",
  url: BASE_URL,
  description:
    "Browse and download cinematic video hero sections with production-ready source code in HTML, React, and Next.js.",
  inLanguage: "en-US",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${BASE_URL}/?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        {children}
      </body>
    </html>
  );
}
