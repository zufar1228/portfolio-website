"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import TextReveal from "./TextReveal";
import TextScramble from "./TextScramble";

interface SectionIntroProps {
  label: string;
  title: string;
}

export default function SectionIntro({ label, title }: SectionIntroProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref} className="mb-16">
      <motion.div
        initial={{ width: 0 }}
        animate={isInView ? { width: 40 } : {}}
        transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
        className="h-px bg-[var(--color-accent)] mb-4"
      />
      <TextScramble
        text={label}
        as="span"
        speed={40}
        className="font-body text-xs tracking-widest text-[var(--color-text-secondary)] mb-4 block"
      />
      <TextReveal
        text={title}
        as="h2"
        delay={0.3}
        className="font-headline text-4xl md:text-5xl font-bold"
      />
    </div>
  );
}
