"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const ringX = useSpring(cursorX, { damping: 28, stiffness: 600, mass: 0.5 });
  const ringY = useSpring(cursorY, { damping: 28, stiffness: 600, mass: 0.5 });

  const [hoverState, setHoverState] = useState<"default" | "link" | "text">("default");
  const [clicking, setClicking] = useState(false);
  const [isFinePointer, setIsFinePointer] = useState(false);

  useEffect(() => {
    setIsFinePointer(window.matchMedia("(pointer: fine)").matches);
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    },
    [cursorX, cursorY]
  );

  useEffect(() => {
    if (!isFinePointer) return;
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
  }, [handleMouseMove, isFinePointer]);

  if (!isFinePointer) return null;

  const ringSize = hoverState === "link" ? 55 : hoverState === "text" ? 44 : 40;
  const dotSize = clicking ? 6 : 10;
  const ringOpacity = hoverState === "link" ? 0.6 : 0.3;
  const ringBorderWidth = hoverState === "link" ? 3 : 2;
  const ringBg = hoverState === "link" ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0)";

  return (
    <>
      {/* Dot (inner) */}
      <motion.div
        className="pointer-events-none fixed z-[9999] hidden md:block mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <div
          className="rounded-full bg-white transition-[width,height] duration-150 ease-out"
          style={{ width: dotSize, height: dotSize }}
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
        <div
          className="rounded-full border border-white transition-all duration-200 ease-out"
          style={{
            width: ringSize,
            height: ringSize,
            opacity: ringOpacity,
            borderWidth: ringBorderWidth,
            backgroundColor: ringBg,
          }}
        />
      </motion.div>
    </>
  );
}
