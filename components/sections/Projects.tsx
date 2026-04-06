"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from "framer-motion";
import { useRef, useState, useEffect, useMemo, memo } from "react";
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
    setActiveIndex((prev) => (prev !== idx ? idx : prev));
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
          <div className="px-4 sm:px-6 md:px-12 lg:px-16 pt-6 sm:pt-8 pb-3 sm:pb-4 flex items-end justify-between">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <span className="font-headline text-sm text-[var(--color-accent)] font-medium">02</span>
              <span className="font-body text-xs tracking-widest text-[var(--color-text-secondary)] block">
                Projects
              </span>
            </div>
            <h2 className="font-headline text-2xl sm:text-3xl md:text-4xl font-bold">
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
          <div className="mx-4 sm:mx-6 md:mx-12 lg:mx-16 h-px bg-[var(--color-border)]">
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

const FullScreenCard = memo(function FullScreenCard({
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
    <div className="w-screen shrink-0 flex items-stretch px-2 sm:px-3 md:px-6 pb-4 sm:pb-6">
      <div
        className="relative flex-1 rounded-2xl overflow-hidden border bg-[var(--color-surface)]/30 group transition-all duration-500 ease-out"
        style={{
          borderColor: isActive ? "var(--color-accent)" : "var(--color-border)",
          opacity: isActive ? 1 : 0.6,
        }}
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
        <div
          className="absolute left-0 top-[10%] bottom-[10%] w-[3px] rounded-full bg-[var(--color-accent)] transition-all duration-400"
          style={{ opacity: isActive ? 1 : 0, transform: `scaleY(${isActive ? 1 : 0})` }}
        />

        {/* Content overlay */}
        <div className="relative z-10 h-full flex flex-col justify-end p-4 sm:p-6 md:p-10 lg:p-14 max-w-2xl">

          {/* Featured badge */}
          <div
            className="relative flex items-center gap-3 mb-4 transition-all duration-500"
            style={{ opacity: isActive ? 1 : 0.4, transform: `translateY(${isActive ? 0 : 10}px)` }}
          >
            {index === 0 && (
              <span className="px-3 py-1 text-[10px] font-body tracking-widest uppercase bg-[var(--color-accent)]/10 text-[var(--color-accent)] rounded-full border border-[var(--color-accent)]/20 backdrop-blur-sm">
                Featured
              </span>
            )}
          </div>

          <h3
            className="relative font-headline text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-tight mb-2 sm:mb-3 transition-all duration-500"
            style={{ opacity: isActive ? 1 : 0.4, transform: `translateY(${isActive ? 0 : 12}px)` }}
          >
            {project.title}
          </h3>

          <p
            className="relative font-body text-[var(--color-text)] text-xs sm:text-sm md:text-base leading-relaxed mb-4 sm:mb-5 line-clamp-2 sm:line-clamp-3 md:line-clamp-none transition-all duration-500"
            style={{ opacity: isActive ? 0.8 : 0.3, transform: `translateY(${isActive ? 0 : 14}px)` }}
          >
            {project.description}
          </p>

          {/* Tags */}
          <div
            className="relative flex flex-wrap gap-2 mb-6 transition-all duration-500"
            style={{ opacity: isActive ? 1 : 0.3, transform: `translateY(${isActive ? 0 : 16}px)` }}
          >
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs font-body bg-[var(--color-bg)]/70 text-[var(--color-text)] rounded-full border border-[var(--color-border)] backdrop-blur-sm"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Links */}
          <div
            className="relative flex gap-6 transition-all duration-500"
            style={{ opacity: isActive ? 1 : 0.3, transform: `translateY(${isActive ? 0 : 18}px)` }}
          >
            {project.liveUrl && (
              <MagneticWrap strength={0.2}>
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/link flex items-center gap-1.5 text-sm font-semibold font-body text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors"
                >
                  Live Demo
                  <ArrowUpRight
                    size={14}
                    className="transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
                  />
                </a>
              </MagneticWrap>
            )}
            {project.sourceUrl && (
              <MagneticWrap strength={0.2}>
                <a
                  href={project.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/link flex items-center gap-1.5 text-sm font-semibold font-body text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors"
                >
                  {project.backendUrl ? "Frontend" : "Source Code"}
                  <ArrowUpRight
                    size={14}
                    className="transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
                  />
                </a>
              </MagneticWrap>
            )}
            {project.backendUrl && (
              <MagneticWrap strength={0.2}>
                <a
                  href={project.backendUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/link flex items-center gap-1.5 text-sm font-semibold font-body text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors"
                >
                  Backend
                  <ArrowUpRight
                    size={14}
                    className="transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
                  />
                </a>
              </MagneticWrap>
            )}
          </div>
        </div>

        {/* Right-side counter */}
        <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10 font-headline text-xs text-[var(--color-text-tertiary)]">
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </div>
      </div>
    </div>
  );
});
