import { ImageResponse } from "next/og";
import { heroTrace, profile } from "@/lib/data";

export const alt = `${profile.name}, full-stack developer`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const { values } = heroTrace;
  const w = 1040;
  const h = 150;
  const d = values
    .map((v, i) => `${i === 0 ? "M" : "L"}${((i / (values.length - 1)) * w).toFixed(1)} ${(8 + (1 - v) * (h - 16)).toFixed(1)}`)
    .join(" ");
  const endY = 8 + (1 - values[values.length - 1]) * (h - 16);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#0c2228",
          color: "#e3ebeb",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 60, fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.05 }}>
            {profile.name}
          </div>
          <div style={{ fontSize: 30, color: "#98adb0", marginTop: 16 }}>
            Full-stack developer at Telkomsat, Bogor
          </div>
        </div>
        <div style={{ display: "flex", position: "relative", width: w, height: h, borderBottom: "2px solid #2a4850" }}>
          <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
            <path d={d} fill="none" stroke="#e3ebeb" strokeWidth={3} strokeLinejoin="round" />
            <circle cx={w - 2} cy={endY} r={9} fill="#f2c230" stroke="#e3ebeb" strokeWidth={3} />
          </svg>
        </div>
      </div>
    ),
    { ...size }
  );
}
