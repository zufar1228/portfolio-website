 "use client";

import { useEffect, useId, useRef, useState } from "react";

interface GridPatternProps {
  width?: number;
  height?: number;
  className?: string;
  numSquares?: number;
  maxOpacity?: number;
  duration?: number;
}

export default function GridPattern({
  width = 60,
  height = 60,
  className = "",
  numSquares = 15,
  maxOpacity = 0.12,
  duration = 4,
}: GridPatternProps) {
  const id = useId();
  const containerRef = useRef<SVGSVGElement>(null);
  const [squares, setSquares] = useState<{ id: number; row: number; col: number; delay: number; speed: number }[]>([]);

  useEffect(() => {
    const screenW = window.innerWidth;
    const isMobile = screenW < 768;
    const isHighRes = screenW >= 2000;
    const count = isMobile ? Math.min(numSquares, 6) : isHighRes ? Math.min(numSquares, 8) : numSquares;
    const cols = Math.ceil(screenW / width) + 1;
    const rows = Math.ceil(window.innerHeight / height) + 1;

    setSquares(
      Array.from({ length: count }, (_, i) => ({
        id: i,
        col: Math.floor(Math.random() * cols),
        row: Math.floor(Math.random() * rows),
        delay: Math.random() * duration * 2,
        speed: duration + Math.random() * duration * 2,
      }))
    );
  }, [numSquares, width, height, duration]);

  return (
    <svg
      ref={containerRef}
      aria-hidden
      className={`pointer-events-none absolute inset-0 h-full w-full overflow-hidden ${className}`}
      style={{
        maskImage: "radial-gradient(ellipse 80% 70% at 50% 50%, black 50%, transparent 100%)",
        WebkitMaskImage: "radial-gradient(ellipse 80% 70% at 50% 50%, black 50%, transparent 100%)",
      }}
    >
      <defs>
        <pattern id={`grid-${id}`} width={width} height={height} patternUnits="userSpaceOnUse">
          <path
            d={`M${width} 0L${width} ${height}M0 ${height}L${width} ${height}`}
            fill="none"
            stroke="var(--color-border)"
            strokeOpacity={0.5}
            strokeWidth={1}
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#grid-${id})`} />
      <style>{`
        @keyframes grid-fade-${id.replace(/:/g, "")} {
          0%, 100% { opacity: 0; }
          50% { opacity: ${maxOpacity}; }
        }
      `}</style>
      {squares.map((sq) => (
        <rect
          key={sq.id}
          x={sq.col * width}
          y={sq.row * height}
          width={width - 1}
          height={height - 1}
          fill="var(--color-accent)"
          rx={2}
          style={{
            opacity: 0,
            animationName: `grid-fade-${id.replace(/:/g, "")}`,
            animationDuration: `${sq.speed}s`,
            animationTimingFunction: "ease-in-out",
            animationDelay: `${sq.delay}s`,
            animationIterationCount: "infinite",
            animationFillMode: "backwards",
          }}
        />
      ))}
    </svg>
  );
}
