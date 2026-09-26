"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface TextScrambleProps {
  text: string;
  className?: string;
  speed?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
}

const chars = "!<>-_\\/[]{}—=+*^?#________";

export default function TextScramble({
  text,
  className = "",
  speed = 30,
  as: Tag = "span",
}: TextScrambleProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [displayed, setDisplayed] = useState(text.replace(/[^\s]/g, " "));
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!isInView || done) return;

    let frame = 0;
    const totalFrames = text.length + 15;

    const interval = setInterval(() => {
      setDisplayed(
        text
          .split("")
          .map((char, i) => {
            if (char === " ") return " ";
            if (frame > i + 10) return char;
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );
      frame++;
      if (frame > totalFrames) {
        clearInterval(interval);
        setDisplayed(text);
        setDone(true);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [isInView, text, speed, done]);

  return (
    <Tag ref={ref} className={className}>
      <motion.span
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.3 }}
        className="inline-block font-mono"
        style={{ fontFamily: "inherit" }}
      >
        {displayed}
      </motion.span>
    </Tag>
  );
}
