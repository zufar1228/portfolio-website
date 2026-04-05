"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CursorGlow() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springX = useSpring(cursorX, { damping: 30, stiffness: 200 });
  const springY = useSpring(cursorY, { damping: 30, stiffness: 200 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [cursorX, cursorY]);

  return (
    <motion.div
      className="pointer-events-none fixed z-[9998] hidden md:block"
      style={{
        x: springX,
        y: springY,
        translateX: "-50%",
        translateY: "-50%",
      }}
    >
      <div className="w-[250px] h-[250px] rounded-full bg-[var(--color-accent)]/[0.12] blur-[40px]" />
    </motion.div>
  );
}
