"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef } from "react";
import { aboutContent } from "@/lib/data";
import Container from "../ui/Container";
import Reveal from "../ui/Reveal";
import TextReveal from "../ui/TextReveal";
import AnimatedCounter from "../ui/AnimatedCounter";
import Parallax from "../ui/Parallax";
import FloatingDots from "../ui/FloatingDots";

export default function About() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 0.5], ["0%", "100%"]);

  return (
    <section id="about" className="py-32 relative overflow-hidden" ref={sectionRef}>
      {/* Subtle floating particles */}
      <FloatingDots count={8} />

      {/* Decorative line */}
      <div className="absolute left-8 md:left-16 top-0 bottom-0 w-px bg-[var(--color-border)]/30 hidden lg:block">
        <motion.div
          className="w-full bg-[var(--color-accent)]/40 origin-top"
          style={{ height: lineHeight }}
        />
      </div>

      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-5 relative group">
            {/* Parallax disabled on mobile for perf; only applies md+ */}
            <div className="block md:hidden">
              <AboutImage />
            </div>
            <div className="hidden md:block">
              <Parallax speed={0.3}>
                <AboutImage />
              </Parallax>
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col justify-center">
            <Reveal>
              <span className="font-body text-xs tracking-widest text-[var(--color-text-secondary)] mb-4 block">
                {aboutContent.sectionLabel}
              </span>
            </Reveal>

            <TextReveal
              text={aboutContent.heading}
              as="h2"
              className="font-headline text-4xl md:text-5xl font-bold mb-8"
            />

            <Reveal delay={0.2}>
              <ScrollHighlightText text={aboutContent.bio} />
            </Reveal>

            <Reveal delay={0.3}>
              <div className="grid grid-cols-3 gap-8 p-6 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]/50 backdrop-blur-sm mt-12 relative group hover:border-[var(--color-accent)]/20 transition-all duration-500">
                {/* Animated glow on hover */}
                <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-[var(--color-accent)]/0 via-[var(--color-accent)]/10 to-[var(--color-accent)]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-sm" />
                {aboutContent.stats.map((stat, i) => (
                  <div key={stat.label} className={`${i > 0 ? "border-l border-[var(--color-border)] pl-8" : ""}`}>
                    <AnimatedCounter target={stat.value} label={stat.label} />
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* Scroll-linked text highlight — words light up as user scrolls */
function ScrollHighlightText({ text }: { text: string }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 40%"],
  });
  const words = text.split(" ");

  return (
    <p ref={ref} className="font-body text-lg leading-relaxed">
      {words.map((word, i) => (
        <ScrollWord key={i} word={word} progress={scrollYProgress} index={i} total={words.length} />
      ))}
    </p>
  );
}

function ScrollWord({
  word,
  progress,
  index,
  total,
}: {
  word: string;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  index: number;
  total: number;
}) {
  const start = index / total;
  const end = start + 1 / total;
  const opacity = useTransform(progress, [start, end], [0.25, 1]);

  return (
    <motion.span style={{ opacity }} className="inline-block mr-[0.3em] transition-colors">
      {word}
    </motion.span>
  );
}

function AboutImage() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      className="relative"
      initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
      animate={isInView ? { clipPath: "inset(0% 0% 0% 0%)" } : {}}
      transition={{ duration: 1, ease: [0.33, 1, 0.68, 1], delay: 0.2 }}
    >
      <div className="aspect-[4/5] bg-[var(--color-surface)] rounded-2xl overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700">
        <Image
          src="/images/profile-picture.png"
          alt="Muhammad Zufar Natsir"
          width={600}
          height={750}
          sizes="(max-width: 768px) 100vw, 33vw"
          className="w-full h-full object-cover"
        />
      </div>
      {/* Animated decorative frame */}
      <motion.div
        className="absolute -inset-3 border border-[var(--color-border)]/30 rounded-2xl -z-10"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.6 }}
      />
      <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[var(--color-accent)]/10 rounded-full blur-3xl group-hover:bg-[var(--color-accent)]/20 transition-all" />
      <motion.div
        className="absolute -top-2 -left-2 w-6 h-6 border-t border-l border-[var(--color-accent)]/30 rounded-tl-lg"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.8 }}
      />
      <motion.div
        className="absolute -bottom-2 -right-2 w-6 h-6 border-b border-r border-[var(--color-accent)]/30 rounded-br-lg"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 1 }}
      />
    </motion.div>
  );
}
