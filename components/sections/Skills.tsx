"use client";

import { Database, Monitor, Cpu, Cloud } from "lucide-react";
import { motion, useInView, useMotionValue } from "framer-motion";
import { useRef, useCallback } from "react";
import { skillCategories } from "@/lib/data";
import Container from "../ui/Container";
import SectionIntro from "../ui/SectionIntro";
import GridPattern from "../ui/GridPattern";

const iconMap: Record<string, React.ElementType> = {
  Database,
  Monitor,
  Cpu,
  Cloud,
};

const cardVariants = {
  hidden: { opacity: 0, y: 60, rotateX: 12, scale: 0.92, filter: "blur(4px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.85,
      delay: i * 0.15,
      ease: [0.215, 0.61, 0.355, 1] as [number, number, number, number],
    },
  }),
};



function SkillCard({ cat, index, isInView }: { cat: (typeof skillCategories)[0]; index: number; isInView: boolean }) {
  const Icon = iconMap[cat.icon];
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      ref.current.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
      ref.current.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
    },
    []
  );
  // Bento layout spans
  const colSpan =
    index === 0
      ? "lg:col-span-3"
      : index === 1
      ? "lg:col-span-3"
      : index === 2
      ? "lg:col-span-4"
      : "lg:col-span-2";

  return (
    <motion.div
      custom={index}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={cardVariants}
      whileHover={{ y: -4, transition: { duration: 0.3, ease: "easeOut" } }}
      className={colSpan}
    >
      <div
        ref={ref}
        onMouseMove={handleMouseMove}
        className="group relative h-full rounded-2xl p-px skill-card-glow"
      >
        {/* Border + spotlight handled via CSS .skill-card-glow */}
        <div className="absolute inset-0 rounded-2xl border border-[var(--color-border)] group-hover:border-transparent transition-colors duration-500" />

        {/* Card body */}
        <div className="relative h-full rounded-[15px] bg-[var(--color-surface)] p-8 overflow-hidden">
          {/* Spotlight via CSS */}

          <div className="relative z-10 space-y-6">
            {/* Icon + title row */}
            <div className="flex items-center gap-4">
              <motion.div
                className="w-12 h-12 rounded-xl bg-[var(--color-bg-alt)] flex items-center justify-center group-hover:bg-[var(--color-accent)]/10 transition-colors duration-300"
                whileHover={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.5 }}
              >
                {Icon && (
                  <Icon
                    size={22}
                    className="text-[var(--color-text-secondary)] group-hover:text-[var(--color-accent)] transition-colors duration-300"
                  />
                )}
              </motion.div>
              <div>
                <h3 className="font-headline text-lg font-bold">{cat.title}</h3>
                <span className="text-[11px] font-body text-[var(--color-text-tertiary)]">
                  {cat.skills.length} technologies
                </span>
              </div>
            </div>

            {/* Skills as animated pill tags with logos */}
            <div className="flex flex-wrap gap-2">
              {cat.skills.map((skill, j) => (
                <motion.span
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.8, y: 10 }}
                  animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
                  transition={{ delay: index * 0.15 + j * 0.07 + 0.3, type: "spring", stiffness: 260, damping: 20 }}
                  whileHover={{ scale: 1.08, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[var(--color-bg-alt)] text-[var(--color-text-secondary)] text-[12px] font-body rounded-full border border-[var(--color-border)]/50 hover:border-[var(--color-accent)]/40 hover:text-[var(--color-text)] hover:shadow-[0_0_12px_var(--color-accent)/0.15] transition-all duration-300 cursor-default"
                >
                  {skill.logo && (
                    <img
                      src={skill.logo}
                      alt=""
                      className={`w-3.5 h-3.5 object-contain ${skill.darkInvert ? "dark:invert" : ""}`}
                      loading="lazy"
                    />
                  )}
                  {skill.name}
                </motion.span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-[var(--color-bg-alt)]" />
      <GridPattern width={50} height={50} numSquares={14} maxOpacity={0.15} duration={5} />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[var(--color-accent)]/[0.03] blur-[150px] rounded-full" />

      <Container className="relative">
        <SectionIntro label="Skills" title="Technologies I work with" />

        <div ref={ref}>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 1.2, ease: [0.215, 0.61, 0.355, 1] as [number, number, number, number] }}
            className="h-px w-full bg-gradient-to-r from-transparent via-[var(--color-accent)]/40 to-transparent mb-12"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-5 auto-rows-fr" style={{ perspective: 1200 }}>
            {skillCategories.map((cat, i) => (
              <SkillCard key={cat.title} cat={cat} index={i} isInView={isInView} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
