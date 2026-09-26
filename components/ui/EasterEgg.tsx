"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";

// Konami code: ↑ ↑ ↓ ↓ ← → ← → B A
const KONAMI = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
  "KeyB", "KeyA",
];

export default function EasterEgg() {
  const [triggered, setTriggered] = useState(false);
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; rotation: number; scale: number }>>([]);
  const indexRef = useRef(0);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.code === KONAMI[indexRef.current]) {
      indexRef.current += 1;
      if (indexRef.current === KONAMI.length) {
        setTriggered(true);
        indexRef.current = 0;

        // Generate confetti particles
        const newParticles = Array.from({ length: 20 }, (_, i) => ({
          id: Date.now() + i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          rotation: Math.random() * 360,
          scale: Math.random() * 0.6 + 0.4,
        }));
        setParticles(newParticles);

        setTimeout(() => {
          setTriggered(false);
          setParticles([]);
        }, 4000);
      }
    } else {
      indexRef.current = e.code === KONAMI[0] ? 1 : 0;
    }
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <AnimatePresence>
      {triggered && (
        <motion.div
          key="easter-egg"
          className="fixed inset-0 z-[9990] pointer-events-none flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Confetti particles */}
          {particles.map((p) => (
            <motion.div
              key={p.id}
              className="absolute w-3 h-3 rounded-sm"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                backgroundColor: ["#c9a96e", "#f0ebe3", "#8b7340", "#e6d5b8", "#d4a855"][p.id % 5],
              }}
              initial={{ y: -100, rotate: 0, opacity: 1 }}
              animate={{
                y: window.innerHeight + 100,
                rotate: p.rotation * 3,
                opacity: [1, 1, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                ease: [0.12, 0, 0.39, 0],
                delay: Math.random() * 0.5,
              }}
            />
          ))}

          {/* Center message */}
          <motion.div
            className="relative z-10 flex flex-col items-center gap-3 px-8 py-6 rounded-2xl bg-[var(--color-surface)]/90 backdrop-blur-md border border-[var(--color-accent)]/30"
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 10 }}
            transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
          >
            <Sparkles size={28} className="text-[var(--color-accent)]" />
            <p className="font-headline text-lg font-bold text-center">
              You found the secret! 🎉
            </p>
            <p className="font-body text-sm text-[var(--color-text-secondary)] text-center max-w-xs">
              Thanks for exploring! You clearly have great attention to detail.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
