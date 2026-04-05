"use client";

import { useMemo } from "react";

interface MeteorsProps {
  count?: number;
}

export default function Meteors({ count = 12 }: MeteorsProps) {
  const meteors = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: Math.random() * 10,
      duration: 3 + Math.random() * 5,
      size: 1 + Math.random() * 1.5,
    }));
  }, [count]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {meteors.map((m) => (
        <span
          key={m.id}
          className="absolute rounded-full animate-meteor"
          style={{
            top: -10,
            left: m.left,
            width: m.size,
            height: m.size,
            background: "var(--color-accent)",
            boxShadow: `0 0 ${m.size * 3}px ${m.size}px var(--color-accent)`,
            animationDuration: `${m.duration}s`,
            animationDelay: `${m.delay}s`,
            willChange: "transform, opacity",
          }}
        />
      ))}
    </div>
  );
}
