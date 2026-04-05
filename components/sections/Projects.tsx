"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from "framer-motion";
import { useRef, useState, useEffect, useMemo } from "react";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/data";
import MagneticWrap from "../ui/MagneticWrap";

export default function Projects() {
  const scrollRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end end"],
  });

  const [scrollRange, setScrollRange] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const count = projects.length;

  useEffect(() => {
    const measure = () => {
      if (trackRef.current) {
        const trackWidth = trackRef.current.scrollWidth;
        const viewWidth = window.innerWidth;
        setScrollRange(Math.max(0, trackWidth - viewWidth));
      }
    };
    measure();
    let resizeRaf: number;
    const debouncedMeasure = () => {
      cancelAnimationFrame(resizeRaf);
      resizeRaf = requestAnimationFrame(measure);
    };
    window.addEventListener("resize", debouncedMeasure);
    return () => window.removeEventListener("resize", debouncedMeasure);
  }, []);

  // Track active card index from scroll progress
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = Math.min(count - 1, Math.floor(v * count));
    setActiveIndex(idx);
  });

  // Build snap-point input/output arrays
  const { inputRange, outputRange } = useMemo(() => {
    const inp: number[] = [];
    const out: number[] = [];
    const segSize = 1 / count;
    const hold = 0.5;
    const ease = (1 - hold) / 2;

    for (let i = 0; i < count; i++) {
      const segStart = i * segSize;
      const snapPos = -(i * (scrollRange / (count - 1 || 1)));
      inp.push(segStart);
      out.push(i === 0 ? 0 : -(((i - 1) * scrollRange) / (count - 1 || 1)));
      inp.push(segStart + ease * segSize);
      out.push(snapPos);
      inp.push(segStart + (ease + hold) * segSize);
      out.push(snapPos);
    }
    inp.push(1);
    out.push(-scrollRange);

    return { inputRange: inp, outputRange: out };
  }, [scrollRange, count]);

  const rawX = useTransform(scrollYProgress, inputRange, outputRange);
  const x = useSpring(rawX, { stiffness: 200, damping: 35, mass: 0.8 });
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      id="projects"
      ref={scrollRef}
      className="relative"
      style={{ height: `${(projects.length + 1) * 100}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col">
        {/* Top bar */}
        <div className="px-6 md:px-12 lg:px-16 pt-8 pb-4 flex items-end justify-between">
          <div>
            <span className="font-body text-xs tracking-widest text-[var(--color-text-secondary)] block mb-1">
              Projects
            </span>
            <h2 className="font-headline text-3xl md:text-4xl font-bold">
              Selected works
            </h2>
          </div>
          <div className="flex items-center gap-4 text-xs font-body text-[var(--color-text-tertiary)]">
            {/* Dot indicators */}
            <div className="hidden sm:flex items-center gap-2">
              {projects.map((_, i) => (
                <motion.div
                  key={i}
                  className="rounded-full bg-[var(--color-accent)]"
                  animate={{
                    width: activeIndex === i ? 24 : 6,
                    height: 6,
                    opacity: activeIndex === i ? 1 : 0.3,
                  }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                />
              ))}
            </div>
            <span>
              {String(activeIndex + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
            </span>
            <div className="flex items-center gap-1.5">
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                →
              </motion.span>
              <span className="hidden sm:inline">Scroll to explore</span>
            </div>
          </div>
        </div>
        {/* Progress bar */}
        <div className="mx-6 md:mx-12 lg:mx-16 h-px bg-[var(--color-border)]">
          <motion.div
            className="h-full bg-[var(--color-accent)]"
            style={{ width: progressWidth }}
          />
        </div>

        {/* Full-screen horizontal scroll track */}
        <motion.div
          ref={trackRef}
          style={{ x, willChange: "transform" }}
          className="flex-1 flex items-stretch gap-0 mt-4"
        >
          {projects.map((project, i) => (
            <FullScreenCard
              key={project.title}
              project={project}
              index={i}
              total={projects.length}
              isActive={activeIndex === i}
              scrollYProgress={scrollYProgress}
              count={count}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function FullScreenCard({
  project,
  index,
  total,
  isActive,
  scrollYProgress,
  count,
}: {
  project: (typeof projects)[0];
  index: number;
  total: number;
  isActive: boolean;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
  count: number;
}) {
  // Parallax: image moves slower than content
  const segStart = index / count;
  const segEnd = (index + 1) / count;
  const imgX = useTransform(scrollYProgress, [segStart, segEnd], [30, -30]);
  const imgScale = useTransform(scrollYProgress, [segStart, segEnd], [1.08, 1]);

  return (
    <div className="w-screen shrink-0 flex items-stretch px-3 md:px-6 pb-6">
      <motion.div
        className="relative flex-1 rounded-2xl overflow-hidden border bg-[var(--color-surface)]/30 group"
        animate={{
          borderColor: isActive
            ? "var(--color-accent)"
            : "var(--color-border)",
          opacity: isActive ? 1 : 0.6,
        }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* Background image with parallax */}
        <motion.div
          className="absolute inset-0"
          style={{ x: imgX, scale: imgScale }}
        >
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-bg)]/90 via-[var(--color-bg)]/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg)]/70 via-transparent to-transparent" />

        {/* Active indicator — accent side bar */}
        <motion.div
          className="absolute left-0 top-[10%] bottom-[10%] w-[3px] rounded-full bg-[var(--color-accent)]"
          animate={{ opacity: isActive ? 1 : 0, scaleY: isActive ? 1 : 0 }}
          transition={{ duration: 0.4 }}
        />

        {/* Content overlay */}
        <div className="relative z-10 h-full flex flex-col justify-end p-6 md:p-10 lg:p-14 max-w-2xl">

          {/* Featured badge */}
          <motion.div
            className="relative flex items-center gap-3 mb-4"
            animate={{
              opacity: isActive ? 1 : 0.4,
              y: isActive ? 0 : 10,
            }}
            transition={{ duration: 0.5, delay: 0.05 }}
          >
            {index === 0 && (
              <span className="px-3 py-1 text-[10px] font-body tracking-widest uppercase bg-[var(--color-accent)]/10 text-[var(--color-accent)] rounded-full border border-[var(--color-accent)]/20 backdrop-blur-sm">
                Featured
              </span>
            )}
          </motion.div>

          <motion.h3
            className="relative font-headline text-2xl md:text-3xl lg:text-4xl font-bold leading-tight mb-3"
            animate={{
              opacity: isActive ? 1 : 0.4,
              y: isActive ? 0 : 12,
            }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {project.title}
          </motion.h3>

          <motion.p
            className="relative font-body text-[var(--color-text)] text-sm md:text-base leading-relaxed mb-5 line-clamp-3 md:line-clamp-none opacity-80"
            animate={{
              opacity: isActive ? 0.8 : 0.3,
              y: isActive ? 0 : 14,
            }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            {project.description}
          </motion.p>

          {/* Tags */}
          <motion.div
            className="relative flex flex-wrap gap-2 mb-6"
            animate={{
              opacity: isActive ? 1 : 0.3,
              y: isActive ? 0 : 16,
            }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs font-body bg-[var(--color-bg)]/70 text-[var(--color-text)] rounded-full border border-[var(--color-border)] backdrop-blur-sm"
              >
                {tag}
              </span>
            ))}
          </motion.div>

          {/* Links with MagneticWrap */}
          <motion.div
            className="relative flex gap-6"
            animate={{
              opacity: isActive ? 1 : 0.3,
              y: isActive ? 0 : 18,
            }}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            <MagneticWrap strength={0.2}>
              <a
                href={project.liveUrl}
                className="group/link flex items-center gap-1.5 text-sm font-semibold font-body text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors"
              >
                Live Demo
                <ArrowUpRight
                  size={14}
                  className="transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
                />
              </a>
            </MagneticWrap>
            <MagneticWrap strength={0.2}>
              <a
                href={project.sourceUrl}
                className="group/link flex items-center gap-1.5 text-sm font-semibold font-body text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors"
              >
                Source Code
                <ArrowUpRight
                  size={14}
                  className="transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
                />
              </a>
            </MagneticWrap>
          </motion.div>
        </div>

        {/* Right-side counter */}
        <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10 font-headline text-xs text-[var(--color-text-tertiary)]">
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </div>
      </motion.div>
    </div>
  );
}
