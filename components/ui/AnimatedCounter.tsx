"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface AnimatedCounterProps {
  target: string;
  label: string;
}

export default function AnimatedCounter({ target, label }: AnimatedCounterProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  const numericPart = parseFloat(target);
  const suffix = target.replace(/[\d.]/g, "");
  const isDecimal = target.includes(".");
  const decimals = isDecimal ? target.split(".")[1]?.replace(/\D/g, "").length || 0 : 0;

  useEffect(() => {
    if (!isInView) return;
    const duration = 1500;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(eased * numericPart);
      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [isInView, numericPart]);

  return (
    <div ref={ref} className="space-y-1">
      <motion.p
        initial={{ opacity: 0, scale: 0.5 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.5, type: "spring" }}
        className="font-headline text-4xl md:text-5xl font-bold text-[var(--color-text)]"
      >
        {isDecimal ? count.toFixed(decimals) : Math.floor(count)}
        {suffix}
      </motion.p>
      <p className="font-body text-xs text-[var(--color-text-secondary)]">{label}</p>
    </div>
  );
}
