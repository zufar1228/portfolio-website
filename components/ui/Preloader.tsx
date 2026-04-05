"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function Preloader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Ensure minimum display time for the animation
    const timer = setTimeout(() => setLoading(false), 2400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {loading && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[var(--color-bg)]"
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
        >
          {/* Decorative line */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120px] h-[1px] bg-[var(--color-accent)]/30"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, ease: [0.33, 1, 0.68, 1], delay: 0.2 }}
          />

          <div className="relative flex flex-col items-center gap-6">
            {/* Name reveal */}
            <div className="overflow-hidden">
              <motion.h1
                className="font-headline text-3xl md:text-5xl font-bold tracking-tight"
                initial={{ y: "100%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1], delay: 0.3 }}
              >
                <span className="text-[var(--color-accent)]">Z</span>ufar Natsir
              </motion.h1>
            </div>

            {/* Subtitle */}
            <div className="overflow-hidden">
              <motion.p
                className="font-body text-xs tracking-[0.3em] uppercase text-[var(--color-text-secondary)]"
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1], delay: 0.7 }}
              >
                Software &amp; IoT Developer
              </motion.p>
            </div>

            {/* Progress bar */}
            <motion.div
              className="w-32 h-[2px] bg-[var(--color-border)] rounded-full overflow-hidden mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              <motion.div
                className="h-full bg-[var(--color-accent)] origin-left"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.2, ease: [0.33, 1, 0.68, 1], delay: 1.0 }}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
