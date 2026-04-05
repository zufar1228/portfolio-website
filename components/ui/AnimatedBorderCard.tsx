"use client";

import { useCallback, useRef } from "react";

interface AnimatedBorderCardProps {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
}

export default function AnimatedBorderCard({
  children,
  className = "",
  innerClassName = "",
}: AnimatedBorderCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    ref.current.style.setProperty("--border-x", `${e.clientX - rect.left}px`);
    ref.current.style.setProperty("--border-y", `${e.clientY - rect.top}px`);
  }, []);

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      className={`group relative rounded-2xl p-px animated-border-card ${className}`}
    >
      {/* Content */}
      <div className={`relative rounded-[15px] bg-[var(--color-surface)] ${innerClassName}`}>
        {children}
      </div>
    </div>
  );
}
