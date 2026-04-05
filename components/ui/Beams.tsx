"use client";

import { useState, useEffect } from "react";

interface BeamsProps {
  count?: number;
}

export default function Beams({ count = 6 }: BeamsProps) {
  const [beams, setBeams] = useState<
    { id: number; startX: number; width: number; duration: number; delay: number; opacity: number; angle: number }[]
  >([]);

  useEffect(() => {
    setBeams(
      Array.from({ length: count }, (_, i) => ({
        id: i,
        startX: Math.random() * 120 - 10,
        width: 1 + Math.random() * 2,
        duration: 8 + Math.random() * 10,
        delay: Math.random() * 8,
        opacity: 0.03 + Math.random() * 0.06,
        angle: -15 + Math.random() * 30,
      }))
    );
  }, [count]);

  if (beams.length === 0) return null;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {beams.map((b) => (
        <div
          key={b.id}
          className="absolute top-0 animate-beam"
          style={{
            left: `${b.startX}%`,
            width: `${b.width}px`,
            height: "120%",
            background: `linear-gradient(180deg, transparent 0%, var(--color-accent) 30%, var(--color-accent) 70%, transparent 100%)`,
            transform: `rotate(${b.angle}deg)`,
            transformOrigin: "top center",
            "--beam-opacity": b.opacity,
            animationDuration: `${b.duration}s`,
            animationDelay: `${b.delay}s`,
            willChange: "transform, opacity",
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}
