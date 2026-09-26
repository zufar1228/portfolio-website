import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Muhammad Zufar Natsir — Full-Stack & IoT Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#f3f2f2",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Top accent line */}
        <div
          style={{
            width: 60,
            height: 3,
            backgroundColor: "#ec3013",
            marginBottom: 32,
            borderRadius: 2,
          }}
        />

        {/* Name */}
        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            color: "#201e1d",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            marginBottom: 16,
          }}
        >
          Muhammad Zufar Natsir
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: 28,
            color: "#605d5d",
            fontWeight: 400,
            marginBottom: 40,
          }}
        >
          Full-Stack &amp; IoT Engineer
        </div>

        {/* Description */}
        <div
          style={{
            fontSize: 20,
            color: "#7d7979",
            maxWidth: 700,
            lineHeight: 1.5,
          }}
        >
          Building backend systems and IoT solutions that turn real-world sensor
          data into actionable insights.
        </div>

        {/* Bottom accent */}
        <div
          style={{
            position: "absolute",
            bottom: 60,
            right: 80,
            fontSize: 80,
            fontWeight: 700,
            color: "#ec3013",
            opacity: 0.15,
          }}
        >
          MZN
        </div>
      </div>
    ),
    { ...size }
  );
}
