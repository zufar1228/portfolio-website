"use client";

import { useEffect, useState } from "react";

interface FloatingDotsProps {
  count?: number;
}

export default function FloatingDots({ count = 30 }: FloatingDotsProps) {
  const [dots, setDots] = useState<{ id: number; x: number; y: number; size: number; duration: number; delay: number }[]>([]);

  useEffect(() => {
    setDots(
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 1.5 + Math.random() * 2.5,
        duration: 12 + Math.random() * 18,
        delay: Math.random() * 8,
      }))
    );
  }, [count]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {dots.map((d) => (
        <div
          key={d.id}
          className="absolute rounded-full bg-[var(--color-accent)] animate-float-dot"
          style={{
            left: `${d.x}%`,
            top: `${d.y}%`,
            width: d.size,
            height: d.size,
            animationDuration: `${d.duration}s`,
            animationDelay: `${d.delay}s`,

          }}
        />
      ))}
    </div>
  );
}
