"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface SectionDividerProps {
  variant?: "line" | "diamond" | "dots";
}

export default function SectionDivider({ variant = "line" }: SectionDividerProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  if (variant === "diamond") {
    return (
      <div ref={ref} className="flex items-center justify-center gap-3 py-4">
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
          className="h-px w-16 bg-gradient-to-r from-transparent to-[var(--color-accent)]/30 origin-right"
        />
        <motion.div
          initial={{ scale: 0, rotate: -45 }}
          animate={isInView ? { scale: 1, rotate: 45 } : {}}
          transition={{ duration: 0.5, delay: 0.3, type: "spring" }}
          className="w-2 h-2 bg-[var(--color-accent)]/40 rotate-45"
        />
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
          className="h-px w-16 bg-gradient-to-l from-transparent to-[var(--color-accent)]/30 origin-left"
        />
      </div>
    );
  }

  if (variant === "dots") {
    return (
      <div ref={ref} className="flex items-center justify-center gap-2 py-4">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            initial={{ scale: 0, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 0.3 } : {}}
            transition={{ delay: i * 0.15, type: "spring", stiffness: 300 }}
            className="w-1 h-1 rounded-full bg-[var(--color-accent)]"
          />
        ))}
      </div>
    );
  }

  return (
    <div ref={ref} className="flex justify-center">
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 1, ease: [0.33, 1, 0.68, 1] }}
        className="h-px w-32 bg-gradient-to-r from-transparent via-[var(--color-accent)]/30 to-transparent"
      />
    </div>
  );
}
