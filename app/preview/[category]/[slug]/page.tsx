import { slugToName } from "@/lib/utils";

interface PreviewPageProps {
    params: Promise<{
        category: string;
        slug: string;
    }>;
}

export default async function PreviewPage({ params }: PreviewPageProps) {
    const { category, slug } = await params;

    const name = slugToName(slug);

    return (
        <div className="relative h-screen w-full bg-black">
            <iframe
                src={`/api/preview?category=${encodeURIComponent(category)}&slug=${encodeURIComponent(slug)}`}
                className="h-full w-full border-0"
                title={`Preview: ${name}`}
                sandbox="allow-scripts allow-same-origin"
            />
        </div>
    );
}

