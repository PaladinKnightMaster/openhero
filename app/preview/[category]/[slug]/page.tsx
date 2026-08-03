import type { Metadata } from "next";
import { slugToName } from "@/lib/utils";
import { SITE } from "@/lib/site";
import { VIDEO_BASE_URL } from "@/lib/videos";

interface PreviewPageProps {
    params: Promise<{
        category: string;
        slug: string;
    }>;
}

export async function generateMetadata({
    params,
}: PreviewPageProps): Promise<Metadata> {
    const { category, slug } = await params;
    const name = slugToName(slug);
    const pageUrl = `${SITE.url}/preview/${category}/${slug}`;
    const title = `${name} - Free Video Hero Preview`;

    return {
        title,
        description: `Preview the "${name}" video hero section in full screen. Free to use with production-ready source code for HTML, React, and Next.js.`,
        alternates: {
            canonical: pageUrl,
        },
        robots: {
            index: true,
            follow: true,
        },
        openGraph: {
            title: `${title} | ${SITE.name}`,
            description: `Preview the "${name}" video hero section in full screen. Free to use with production-ready source code.`,
            url: pageUrl,
            type: "website",
            siteName: SITE.name,
            locale: SITE.locale,
        },
        twitter: {
            card: "summary_large_image",
            title: `${title} | ${SITE.name}`,
            description: `Preview the "${name}" video hero section in full screen. Free to use.`,
        },
    };
}

export default async function PreviewPage({ params }: PreviewPageProps) {
    const { category, slug } = await params;

    const name = slugToName(slug);
    const pageUrl = `${SITE.url}/preview/${category}/${slug}`;

    const schema = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "BreadcrumbList",
                itemListElement: [
                    {
                        "@type": "ListItem",
                        position: 1,
                        name: SITE.name,
                        item: SITE.url,
                    },
                    {
                        "@type": "ListItem",
                        position: 2,
                        name: "Video Hero Gallery",
                        item: `${SITE.url}/#gallery`,
                    },
                    {
                        "@type": "ListItem",
                        position: 3,
                        name,
                        item: pageUrl,
                    },
                ],
            },
            {
                "@type": "VideoObject",
                name: `${name} - Video Hero Section`,
                description: `Free cinematic "${name}" video hero section preview. Preview full-screen and download the video with source code in HTML, React, or Next.js.`,
                thumbnailUrl: `${SITE.url}/images/metadata/preview-openhero.webp`,
                contentUrl: `${VIDEO_BASE_URL}/videos/${category}/${slug}.mp4`,
                embedUrl: pageUrl,
                inLanguage: SITE.lang,
            },
        ],
    };

    return (
        <div className="relative h-screen w-full bg-black">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
            />
            <iframe
                src={`/api/preview?category=${encodeURIComponent(category)}&slug=${encodeURIComponent(slug)}`}
                className="h-full w-full border-0"
                title={`Preview: ${name}`}
                sandbox="allow-scripts allow-same-origin"
            />
        </div>
    );
}
