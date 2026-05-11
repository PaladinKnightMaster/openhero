import fs from "fs";
import path from "path";
import { slugToName } from "@/lib/utils";
import Link from "next/link";

interface PreviewPageProps {
    params: Promise<{
        category: string;
        slug: string;
    }>;
}

export default async function PreviewPage({ params }: PreviewPageProps) {
    const { category, slug } = await params;

    const htmlPath = path.join(
        process.cwd(),
        "public",
        "downloads",
        category,
        slug,
        "index.html"
    );

    if (!fs.existsSync(htmlPath)) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-black text-white">
                <div className="max-w-md text-center">
                    <h1 className="mb-4 text-2xl font-bold">Preview Not Available</h1>
                    <p className="mb-6 text-white/60">
                        No se encontró{" "}
                        <code className="rounded bg-white/10 px-2 py-1">index.html</code>{" "}
                        para este hero.
                    </p>
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-black transition-colors hover:bg-white/90"
                    >
                        ← Back to Gallery
                    </Link>
                </div>
            </div>
        );
    }

    const name = slugToName(slug);

    return (
        <div className="relative h-screen w-full bg-black">
            <iframe
                src={`/downloads/${category}/${slug}/index.html`}
                className="h-full w-full border-0"
                title={`Preview: ${name}`}
                sandbox="allow-scripts allow-same-origin"
            />
        </div>
    );
}
