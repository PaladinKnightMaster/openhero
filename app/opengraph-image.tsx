import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "openhero — Free Cinematic Video Hero Sections";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
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
          openhero.site
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
          }}
        >
          <span
            style={{
              color: "rgba(255,255,255,0.45)",
              fontSize: "11px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              display: "flex",
            }}
          >
            Free to use
          </span>
        </div>
        <div
          style={{
            fontSize: "82px",
            fontWeight: "700",
            color: "#ffffff",
            letterSpacing: "-3px",
            lineHeight: 1.0,
            marginBottom: "22px",
            display: "flex",
          }}
        >
          openhero
        </div>
        <div
          style={{
            fontSize: "25px",
            color: "rgba(255,255,255,0.42)",
            fontWeight: "400",
            maxWidth: "680px",
            lineHeight: 1.4,
            display: "flex",
          }}
        >
          Cinematic video hero sections with source code — HTML, React & Next.js
        </div>
      </div>
    ),
    size,
  );
}
