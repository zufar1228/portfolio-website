"use client";

import { motion, useScroll, useTransform, useMotionValue, useSpring, animate } from "framer-motion";
import { ChevronDown, ArrowRight } from "lucide-react";
import { heroContent } from "@/lib/data";
import MagneticWrap from "../ui/MagneticWrap";
import Typewriter from "../ui/Typewriter";
import GridPattern from "../ui/GridPattern";
import FloatingDots from "../ui/FloatingDots";
import ParticleField from "../ui/ParticleField";
import { useEffect, useRef, useState } from "react";

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
  return (
    <span className={className} aria-label={text}>
      {text.split("").map((ch, i) => (
        <motion.span
          key={`${ch}-${i}`}
          className="inline-block"
          style={{ whiteSpace: ch === " " ? "pre" : undefined }}
          initial={{ y: 80, opacity: 0, rotateX: -90 }}
          animate={{ y: 0, opacity: 1, rotateX: 0 }}
          transition={{
            duration: 0.6,
            delay: delay + i * 0.025,
            ease: [0.215, 0.61, 0.355, 1],
          }}
        >
          {ch === " " ? "\u00A0" : ch}
        </motion.span>
      ))}
    </span>
  );
}

/* ---- animated counter for the floating stat badges ---- */
function HeroStat({ value, label, delay }: { value: string; label: string; delay: number }) {
  const numericPart = parseFloat(value);
  const suffix = value.replace(/[\d.]/g, "");
  const displayed = useMotionValue(0);
  const springVal = useSpring(displayed, { stiffness: 60, damping: 20 });
  const [text, setText] = useState("0");

  useEffect(() => {
    const timeout = setTimeout(() => animate(displayed, numericPart, { duration: 2 }), delay * 1000);
    const unsub = springVal.on("change", (v) =>
      setText(numericPart % 1 !== 0 ? v.toFixed(2) : Math.round(v).toString())
    );
    return () => { clearTimeout(timeout); unsub(); };
  }, [displayed, springVal, numericPart, delay]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay, duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
      className="px-5 py-3 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)]/60 backdrop-blur-md flex items-center gap-2"
    >
      <span className="font-headline font-bold text-lg">{text}{suffix}</span>
      <span className="text-xs font-body text-[var(--color-text-secondary)]">{label}</span>
    </motion.div>
  );
}

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.18], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.18], [1, 0.92]);
  const filterBlur = useTransform(scrollYProgress, [0, 0.18], ["blur(0px)", "blur(10px)"]);

  return (
    <motion.section
      ref={containerRef}
      style={{ opacity, scale, filter: filterBlur }}
      className="min-h-screen flex flex-col justify-center items-center px-6 sm:px-8 text-center relative overflow-hidden"
    >
      {/* ---- Animated grid pattern background ---- */}
      <GridPattern width={60} height={60} numSquares={18} maxOpacity={0.2} duration={4} />

      {/* ---- Interactive particle network ---- */}
      <ParticleField className="hidden md:block" />

      {/* ---- Floating particles ---- */}
      <FloatingDots count={12} />

      {/* ---- Aurora gradient mesh background (CSS-only) ---- */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div
          className="absolute -top-1/2 -left-1/4 w-[70vw] h-[70vw] rounded-full animate-aurora-1"
          style={{ background: "radial-gradient(circle, var(--color-accent)/0.06 0%, transparent 70%)", willChange: "transform" }}
        />
        <div
          className="absolute -bottom-1/3 -right-1/4 w-[55vw] h-[55vw] rounded-full animate-aurora-2"
          style={{ background: "radial-gradient(circle, var(--color-accent)/0.04 0%, transparent 70%)", willChange: "transform" }}
        />
      </div>

      {/* ---- Animated rings (CSS-only) ---- */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10">
        {[600, 450].map((size, i) => (
          <div
            key={size}
            className="absolute rounded-full border border-[var(--color-border)] opacity-[0.08]"
            style={{
              width: size,
              height: size,
              top: -size / 2,
              left: -size / 2,
              animation: `spin ${80 + i * 30}s linear infinite ${i % 2 === 0 ? '' : 'reverse'}`,
              willChange: "transform",
            }}
          />
        ))}
      </div>

      <div className="space-y-8 max-w-5xl z-10">
        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="flex justify-center"
        >
          <div className="flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)]/50 backdrop-blur-md">
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
          initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="font-body text-[var(--color-text-secondary)] tracking-[0.25em] uppercase text-xs"
        >
          {heroContent.greeting}
        </motion.p>

        {/* Name — typewriter animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.5 }}
        >
          <h1 className="font-headline font-bold text-5xl md:text-7xl lg:text-[5.5rem] tracking-tight leading-[1.05]">
            <Typewriter words={[heroContent.name, "Call me Zufar"]} className="" />
          </h1>
        </motion.div>

        {/* Title — text scramble effect */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="font-body text-xl md:text-2xl text-[var(--color-text-secondary)] font-light shimmer-text"
        >
          {heroContent.title}
        </motion.p>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="font-body text-[var(--color-text-secondary)] max-w-[600px] mx-auto text-sm md:text-base leading-relaxed"
        >
          {heroContent.description}
        </motion.p>

        {/* CTA Buttons with magnetic effect */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center pt-4"
        >
          <MagneticWrap strength={0.15}>
            <a
              href={heroContent.primaryCta.href}
              className="group relative px-8 py-4 bg-[var(--color-accent)] text-[var(--color-bg)] rounded-xl font-body font-semibold overflow-hidden inline-flex items-center justify-center gap-2 transition-transform active:scale-[0.97]"
            >
              <span className="relative z-10 flex items-center gap-2">
                {heroContent.primaryCta.label}
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </span>
              {/* Shine effect on hover */}
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            </a>
          </MagneticWrap>
          <MagneticWrap strength={0.15}>
            <a
              href={heroContent.secondaryCta.href}
              className="group px-8 py-4 border border-[var(--color-border)] text-[var(--color-text)] rounded-xl font-body font-semibold transition-all hover:bg-[var(--color-surface)] hover:border-[var(--color-text-tertiary)] active:scale-[0.97] inline-flex items-center justify-center"
            >
              {heroContent.secondaryCta.label}
            </a>
          </MagneticWrap>
        </motion.div>

        {/* Floating stat badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.8 }}
          className="flex flex-wrap justify-center gap-3 pt-6"
        >
          <HeroStat value="2+" label="Years Exp" delay={2.1} />
          <HeroStat value="5+" label="Projects" delay={2.3} />
          <HeroStat value="3.71" label="GPA" delay={2.5} />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 2.5, duration: 0.8 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={28} />
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
