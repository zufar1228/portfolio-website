"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const dotX = useSpring(cursorX, { damping: 35, stiffness: 400 });
  const dotY = useSpring(cursorY, { damping: 35, stiffness: 400 });
  const ringX = useSpring(cursorX, { damping: 20, stiffness: 150 });
  const ringY = useSpring(cursorY, { damping: 20, stiffness: 150 });

  const [hoverState, setHoverState] = useState<"default" | "link" | "text">("default");
  const [clicking, setClicking] = useState(false);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    },
    [cursorX, cursorY]
  );

  useEffect(() => {
    const handleDown = () => setClicking(true);
    const handleUp = () => setClicking(false);
    const handleOver = (e: Event) => {
      const target = e.target as HTMLElement;
      if (!target) return;
      const el = target.closest("a, button, [role='button'], input, textarea, select, [data-cursor='link']");
      const textEl = target.closest("h1, h2, h3, p, [data-cursor='text']");
      if (el) setHoverState("link");
      else if (textEl) setHoverState("text");
      else setHoverState("default");
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleDown);
    window.addEventListener("mouseup", handleUp);
    document.addEventListener("mouseover", handleOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleDown);
      window.removeEventListener("mouseup", handleUp);
      document.removeEventListener("mouseover", handleOver);
    };
  }, [handleMouseMove]);

  const ringSize = hoverState === "link" ? 50 : hoverState === "text" ? 40 : 36;
  const dotSize = clicking ? 4 : hoverState === "link" ? 0 : 6;
  const ringOpacity = hoverState === "link" ? 0.5 : 0.2;
  const ringBorderWidth = hoverState === "link" ? 2 : 1;
  const ringBg = hoverState === "link" ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0)";

  return (
    <>
      {/* Dot (inner) */}
      <motion.div
        className="pointer-events-none fixed z-[9999] hidden md:block mix-blend-difference"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          className="rounded-full bg-white"
          animate={{
            width: dotSize,
            height: dotSize,
          }}
          transition={{ type: "spring" as const, stiffness: 500, damping: 30 }}
        />
      </motion.div>

      {/* Ring (outer) */}
      <motion.div
        className="pointer-events-none fixed z-[9999] hidden md:block mix-blend-difference"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          className="rounded-full border border-white"
          animate={{
            width: ringSize,
            height: ringSize,
            opacity: ringOpacity,
            borderWidth: ringBorderWidth,
            backgroundColor: ringBg,
          }}
          transition={{ type: "spring" as const, stiffness: 300, damping: 25 }}
        />
      </motion.div>
    </>
  );
}
