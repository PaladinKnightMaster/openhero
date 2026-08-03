import type { Metadata } from "next";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
    title: "Donate - Support OpenHero",
    description:
        "Support OpenHero and keep the gallery of free cinematic video hero sections online. Donate via PayPal, Yape, or bank transfer.",
    alternates: {
        canonical: `${SITE.url}/donate`,
    },
    robots: {
        index: true,
        follow: true,
    },
    openGraph: {
        title: "Donate - Support OpenHero",
        description:
            "Help keep OpenHero free, open, and full of cinematic video hero sections. Donate via PayPal, Yape, or bank transfer.",
        url: `${SITE.url}/donate`,
        type: "website",
        siteName: SITE.name,
        locale: SITE.locale,
        images: [
            {
                url: `${SITE.url}/images/metadata/preview-openhero.webp`,
                width: 1200,
                height: 630,
                alt: `${SITE.name} - Donate`,
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Donate - Support OpenHero",
        description:
            "Help keep OpenHero free, open, and full of cinematic video hero sections.",
    },
};

export default function DonateLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
