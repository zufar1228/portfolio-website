"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown, ArrowRight, Download } from "lucide-react";
import Image from "next/image";
import { heroContent } from "@/lib/data";
import MagneticWrap from "../ui/MagneticWrap";
import GridPattern from "../ui/GridPattern";
import Typewriter from "../ui/Typewriter";
import { useRef } from "react";

/* ---- letter-by-letter stagger — the signature animation ---- */
function StaggerChars({
  text,
  className = "",
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  let charIndex = 0;
  const words = text.split(" ");

  return (
    <span className={className} aria-label={text}>
      {words.map((word, wi) => {
        const startIndex = charIndex;
        charIndex += word.length + 1; // +1 for the space
        return (
          <span key={wi} style={{ whiteSpace: "nowrap", display: "inline-block" }}>
            {word.split("").map((ch, ci) => (
              <motion.span
                key={`${ch}-${startIndex + ci}`}
                className="inline-block"
                initial={{ y: 80, opacity: 0, rotateX: -90 }}
                animate={{ y: 0, opacity: 1, rotateX: 0 }}
                transition={{
                  duration: 0.6,
                  delay: delay + (startIndex + ci) * 0.025,
                  ease: [0.215, 0.61, 0.355, 1],
                }}
              >
                {ch}
              </motion.span>
            ))}
            {wi < words.length - 1 && "\u00A0"}
          </span>
        );
      })}
    </span>
  );
}

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <motion.section
      ref={containerRef}
      style={{ opacity }}
      className="min-h-screen flex flex-col justify-center items-center px-4 sm:px-8 relative overflow-hidden pt-24 sm:pt-20 pb-16"
    >
      {/* ---- Animated grid pattern background ---- */}
      <GridPattern width={60} height={60} numSquares={10} maxOpacity={0.1} duration={4} />

      {/* ---- Single subtle aurora blob ---- */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div
          className="absolute -top-1/2 -left-1/4 w-[60vw] h-[60vw] max-w-[900px] max-h-[900px] rounded-full"
          style={{ background: "radial-gradient(circle, var(--color-accent)/0.04 0%, transparent 70%)" }}
        />
      </div>

      {/* Main content — two-column on desktop */}
      <div className="z-10 w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        {/* Left: text */}
        <div className="space-y-5 sm:space-y-6 text-center lg:text-left order-2 lg:order-1">
          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex justify-center lg:justify-start"
          >
            <div className="flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)]/50">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-accent)] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-accent)]" />
              </span>
              <span className="text-xs font-body text-[var(--color-text-secondary)] tracking-wide">
                Available for opportunities
              </span>
            </div>
          </motion.div>

          {/* Greeting */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="font-body text-[var(--color-text-secondary)] tracking-[0.25em] uppercase text-xs"
          >
            {heroContent.greeting}
          </motion.p>

          {/* Name — one-time stagger reveal */}
          <div>
            <h1 className="font-headline font-bold text-3xl sm:text-5xl md:text-6xl lg:text-[4.5rem] tracking-tight leading-[1.05]">
              <StaggerChars text={heroContent.name} delay={0.3} />
            </h1>
          </div>

          {/* Title — typewriter cycle */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="font-body text-base sm:text-xl md:text-2xl text-[var(--color-text-secondary)] font-light min-h-[1.5em]"
          >
            <Typewriter
              words={["Software Developer", "IoT Engineer"]}
            />
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.9 }}
            className="font-body text-[var(--color-text-secondary)] max-w-[600px] mx-auto lg:mx-0 text-base md:text-lg leading-relaxed"
          >
            {heroContent.description}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.0 }}
            className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start pt-2 px-2 sm:px-0"
          >
            <MagneticWrap strength={0.15}>
              <a
                href={heroContent.primaryCta.href}
                className="group relative px-8 py-4 bg-[var(--color-accent)] text-[var(--color-bg)] rounded-xl font-body font-semibold overflow-hidden w-full sm:w-auto inline-flex items-center justify-center gap-2 transition-transform active:scale-[0.97]"
              >
                <span className="relative z-10 flex items-center gap-2">
                  {heroContent.primaryCta.label}
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </span>
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              </a>
            </MagneticWrap>
            <MagneticWrap strength={0.15}>
              <a
                href={heroContent.secondaryCta.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group px-8 py-4 border border-[var(--color-border)] text-[var(--color-text)] rounded-xl font-body font-semibold transition-all hover:bg-[var(--color-surface)] hover:border-[var(--color-text-tertiary)] active:scale-[0.97] w-full sm:w-auto inline-flex items-center justify-center gap-2"
              >
                <Download size={16} />
                {heroContent.secondaryCta.label}
              </a>
            </MagneticWrap>
          </motion.div>
        </div>

        {/* Right: profile photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.33, 1, 0.68, 1] }}
          className="relative order-1 lg:order-2 flex justify-center"
        >
          <div className="relative w-56 h-64 sm:w-72 sm:h-80 lg:w-[340px] lg:h-[400px]">
            {/* Decorative corner accents */}
            <div className="absolute -top-3 -left-3 w-12 h-12 border-t-2 border-l-2 border-[var(--color-accent)]/40 rounded-tl-3xl" />
            <div className="absolute -bottom-3 -right-3 w-12 h-12 border-b-2 border-r-2 border-[var(--color-accent)]/40 rounded-br-3xl" />
            <div className="absolute -top-3 -right-3 w-6 h-6 border-t border-r border-[var(--color-border)]/30 rounded-tr-xl" />
            <div className="absolute -bottom-3 -left-3 w-6 h-6 border-b border-l border-[var(--color-border)]/30 rounded-bl-xl" />
            {/* Glow */}
            <div className="absolute -inset-8 rounded-3xl bg-[var(--color-accent)]/[0.04] blur-3xl" />
            {/* Accent gradient bar */}
            <div className="absolute -left-1.5 top-[15%] bottom-[15%] w-[3px] rounded-full bg-gradient-to-b from-transparent via-[var(--color-accent)]/50 to-transparent" />
            {/* Photo */}
            <div className="relative w-full h-full rounded-3xl overflow-hidden border border-[var(--color-border)]/50">
              <Image
                src="/images/profile-picture.png"
                alt="Muhammad Zufar Natsir"
                fill
                sizes="(max-width: 640px) 224px, (max-width: 1024px) 288px, 340px"
                priority
                className="object-cover"
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
      >
        <button
          onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}
          aria-label="Scroll to next section"
          className="hover:opacity-80 transition-opacity"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown size={28} />
          </motion.div>
        </button>
      </motion.div>
    </motion.section>
  );
}
