"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { heroContent } from "@/lib/data";
import Button from "../ui/Button";

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center px-6 sm:px-8 text-center relative overflow-hidden">
      <div className="space-y-6 max-w-3xl z-10">
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-body text-[var(--color-text-secondary)] tracking-[0.2em] uppercase text-xs"
        >
          {heroContent.greeting}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-headline font-bold text-5xl md:text-7xl lg:text-8xl tracking-tight leading-[1.1]"
        >
          {heroContent.name}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="font-body text-xl md:text-2xl text-[var(--color-text-secondary)] font-light"
        >
          {heroContent.title}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="font-body text-[var(--color-text-secondary)] max-w-[640px] mx-auto text-sm md:text-base leading-relaxed opacity-80"
        >
          {heroContent.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center pt-8"
        >
          <Button href={heroContent.primaryCta.href} variant="primary">
            {heroContent.primaryCta.label}
          </Button>
          <Button href={heroContent.secondaryCta.href} variant="secondary">
            {heroContent.secondaryCta.label}
          </Button>
        </motion.div>
      </div>

      {/* Scroll chevron */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
      >
        <ChevronDown size={32} />
      </motion.div>

      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--color-accent)]/5 blur-[120px] rounded-full -z-0" />
    </section>
  );
}
