"use client";

import Image from "next/image";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/data";
import Container from "../ui/Container";
import SectionIntro from "../ui/SectionIntro";
import TiltCard from "../ui/TiltCard";
import SpotlightCard from "../ui/SpotlightCard";

export default function Projects() {
  const scrollRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end end"],
  });

  // Calculate how far to scroll: full track width minus one viewport
  const [scrollRange, setScrollRange] = useState(0);

  useEffect(() => {
    const measure = () => {
      if (trackRef.current) {
        const trackWidth = trackRef.current.scrollWidth;
        const viewWidth = window.innerWidth;
        setScrollRange(Math.max(0, trackWidth - viewWidth));
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const x = useTransform(scrollYProgress, [0, 1], [0, -scrollRange]);

  return (
    <section id="projects" ref={scrollRef} className="relative" style={{ height: "300vh" }}>
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        <Container className="mb-8">
          <SectionIntro label="Projects" title="Selected works" />
        </Container>

        {/* Horizontal scroll track */}
        <motion.div ref={trackRef} style={{ x }} className="flex gap-8 pl-8 md:pl-16 lg:pl-24 items-stretch">
          {projects.map((project, i) => (
            <HScrollCard key={project.title} project={project} index={i} />
          ))}
          {/* Spacer to push "end" feel */}
          <div className="min-w-[10vw] shrink-0" />
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 text-[var(--color-text-tertiary)] text-xs font-body"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <motion.span animate={{ x: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>→</motion.span>
          Scroll to explore
        </motion.div>
      </div>
    </section>
  );
}

function HScrollCard({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  return (
    <div className="min-w-[80vw] md:min-w-[45vw] lg:min-w-[38vw] shrink-0">
      <TiltCard tiltMax={4} glare>
        <SpotlightCard className="h-full rounded-2xl">
          <div className="h-full flex flex-col p-5 md:p-8 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]/30 backdrop-blur-sm group">
            {/* Image with hover preview effect */}
            <div className="relative mb-6">
              <div className="aspect-video bg-[var(--color-surface)] rounded-xl overflow-hidden relative">
                <Image
                  src={project.image}
                  alt={project.title}
                  width={800}
                  height={450}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Hover overlay with scan line effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg)]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none overflow-hidden">
                  <div className="absolute inset-x-0 h-[2px] bg-[var(--color-accent)]/40 blur-[1px] animate-scan-line" />
                </div>
                {/* Play icon hint */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="w-12 h-12 rounded-full bg-[var(--color-accent)]/20 backdrop-blur-sm flex items-center justify-center border border-[var(--color-accent)]/30">
                    <ArrowUpRight size={18} className="text-[var(--color-accent)]" />
                  </div>
                </div>
              </div>
              <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-[var(--color-accent)] text-[var(--color-bg)] flex items-center justify-center text-xs font-headline font-bold z-10">
                {String(index + 1).padStart(2, "0")}
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col space-y-4">
              {index === 0 && (
                <span className="text-xs font-body text-[var(--color-accent)] tracking-widest uppercase">
                  Featured
                </span>
              )}
              <h3 className="font-headline text-xl md:text-2xl font-bold">{project.title}</h3>
              <p className="font-body text-[var(--color-text-secondary)] text-sm leading-relaxed line-clamp-3">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 items-center">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 text-xs font-body bg-[var(--color-bg-alt)] text-[var(--color-accent)] rounded-full border border-[var(--color-border)] hover:border-[var(--color-accent)]/30 transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex gap-6 pt-2 mt-auto">
                <a href={project.liveUrl} className="group/link flex items-center gap-1 text-sm font-semibold font-body text-[var(--color-text)] hover:text-[var(--color-accent)] transition-all">
                  Live Demo <ArrowUpRight size={14} className="transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                </a>
                <a href={project.sourceUrl} className="group/link flex items-center gap-1 text-sm font-semibold font-body text-[var(--color-text)] hover:text-[var(--color-accent)] transition-all">
                  Source <ArrowUpRight size={14} className="transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                </a>
              </div>
            </div>
          </div>
        </SpotlightCard>
      </TiltCard>
    </div>
  );
}
