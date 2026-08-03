import { ImageResponse } from "next/og";
import { slugToName } from "@/lib/utils";
import { capitalize } from "@/lib/utils";

export const runtime = "edge";
export const alt = "Free Cinematic Video Hero Preview - openhero";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

interface Props {
  params: Promise<{
    category: string;
    slug: string;
  }>;
}

export default async function Image({ params }: Props) {
  const { category, slug } = await params;
  const name = slugToName(slug);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-end",
          padding: "60px",
          background:
            "linear-gradient(135deg, #050505 0%, #0d0d0d 55%, #12121e 100%)",
          fontFamily: "system-ui, -apple-system, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-60px",
            right: "-60px",
            width: "480px",
            height: "380px",
            background:
              "radial-gradient(ellipse at center, rgba(110,70,240,0.18) 0%, transparent 70%)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "56px",
            right: "56px",
            fontSize: "15px",
            color: "rgba(255,255,255,0.28)",
            letterSpacing: "0.06em",
            display: "flex",
          }}
        >
          openhero.art
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "22px",
            padding: "6px 18px",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "100px",
            background: "rgba(255,255,255,0.05)",
            color: "rgba(255,255,255,0.45)",
            fontSize: "11px",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
          }}
        >
          {capitalize(category)} · Free hero section
        </div>
        <div
          style={{
            fontSize: "58px",
            fontWeight: "700",
            color: "#ffffff",
            letterSpacing: "-2px",
            lineHeight: 1.05,
            marginBottom: "22px",
            maxWidth: "1000px",
            display: "flex",
            textTransform: "capitalize",
          }}
        >
          {name}
        </div>
        <div
          style={{
            fontSize: "24px",
            color: "rgba(255,255,255,0.42)",
            fontWeight: "400",
            maxWidth: "760px",
            lineHeight: 1.4,
            display: "flex",
          }}
        >
          Cinematic video hero section with source code — HTML, React & Next.js
        </div>
      </div>
    ),
    size,
  );
}
