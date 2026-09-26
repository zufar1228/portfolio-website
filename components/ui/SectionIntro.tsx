"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import TextReveal from "./TextReveal";

interface SectionIntroProps {
  label: string;
  title: string;
  number?: string;
}

export default function SectionIntro({ label, title, number }: SectionIntroProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref} className="mb-16">
      <motion.div
        initial={{ width: 0 }}
        animate={isInView ? { width: 40 } : {}}
        transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
        className="h-px bg-[var(--color-border)] mb-4"
      />
      <div className="flex items-center gap-3 mb-4">
        {number && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-headline text-sm text-[var(--color-accent)] font-medium"
          >
            {number}
          </motion.span>
        )}
        <motion.span
          initial={{ opacity: 0, y: 8 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="font-body text-xs tracking-widest text-[var(--color-text-secondary)] block"
        >
          {label}
        </motion.span>
      </div>
      <TextReveal
        text={title}
        as="h2"
        delay={0.3}
        className="font-headline text-4xl md:text-5xl font-bold"
      />
    </div>
  );
}
