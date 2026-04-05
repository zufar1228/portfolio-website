"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Briefcase, GraduationCap } from "lucide-react";
import { experiences } from "@/lib/data";
import Container from "../ui/Container";
import SectionIntro from "../ui/SectionIntro";
import SpotlightCard from "../ui/SpotlightCard";
import TiltCard from "../ui/TiltCard";

export default function Experience() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 80%", "end 60%"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="experience" className="py-32 relative overflow-hidden" ref={sectionRef}>
      <div className="absolute inset-0 bg-[var(--color-bg-alt)]" />
      <Container className="relative">
        <SectionIntro label="Experience" title="Where I've worked" />

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-[19px] md:left-1/2 md:-translate-x-px top-0 bottom-0 w-px bg-[var(--color-border)]">
            <motion.div
              className="w-full bg-gradient-to-b from-[var(--color-accent)] to-[var(--color-accent)]/20 origin-top"
              style={{ height: lineHeight }}
            />
          </div>

          <div className="space-y-12">
            {experiences.map((exp, i) => (
              <TimelineItem key={exp.period} exp={exp} index={i} isLast={i === experiences.length - 1} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

function TimelineItem({
  exp,
  index,
  isLast,
}: {
  exp: (typeof experiences)[0];
  index: number;
  isLast: boolean;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const isEven = index % 2 === 0;
  const isEducation = exp.role.includes("Bachelor");

  return (
    <div
      ref={ref}
      className={`relative flex flex-col md:flex-row ${
        isEven ? "md:flex-row" : "md:flex-row-reverse"
      } items-start md:items-center gap-8 md:gap-0`}
    >
      {/* Animated dot */}
      <div className="absolute left-[12px] md:left-1/2 md:-translate-x-1/2 top-1 md:top-1/2 md:-translate-y-1/2 z-10">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={isInView ? { scale: 1, rotate: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2, type: "spring" }}
          className="w-[15px] h-[15px] rounded-full bg-[var(--color-bg)] border-2 border-[var(--color-accent)] flex items-center justify-center"
        >
          <motion.div
            className="w-[5px] h-[5px] rounded-full bg-[var(--color-accent)]"
            animate={isInView ? { scale: [1, 1.5, 1] } : {}}
            transition={{ delay: 0.6, duration: 0.4 }}
          />
        </motion.div>
      </div>

      {/* Content card with spotlight */}
      <motion.div
        initial={{ opacity: 0, x: isEven ? -50 : 50, filter: "blur(8px)" }}
        animate={isInView ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}}
        transition={{ duration: 0.7, ease: [0.33, 1, 0.68, 1] }}
        className={`ml-12 md:ml-0 md:w-[45%] ${isEven ? "md:pr-12" : "md:pl-12"} ${
          isEven ? "" : "md:text-left"
        }`}
      >
        <TiltCard tiltMax={4} glare>
        <SpotlightCard className="rounded-2xl">
          <div className="p-6 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]/50 backdrop-blur-sm hover:border-[var(--color-text-tertiary)]/30 transition-all duration-300 group">
            <div className="flex items-center gap-3 mb-3">
              <motion.div
                className="w-8 h-8 rounded-lg bg-[var(--color-bg-alt)] flex items-center justify-center group-hover:bg-[var(--color-accent)]/10 transition-colors"
                whileHover={{ rotate: 10 }}
              >
                {isEducation ? (
                  <GraduationCap size={16} className="text-[var(--color-text-secondary)]" />
                ) : (
                  <Briefcase size={16} className="text-[var(--color-text-secondary)]" />
                )}
              </motion.div>
              <span className="text-xs font-body text-[var(--color-text-secondary)] tracking-wide">
                {exp.period}
              </span>
            </div>
            <h3 className="font-headline text-lg md:text-xl font-bold mb-2">{exp.role}</h3>
            <p className="font-body text-sm text-[var(--color-accent)] mb-3">{exp.company}</p>
            <p className="font-body text-sm text-[var(--color-text-secondary)] leading-relaxed">
              {exp.description}
            </p>
          </div>
        </SpotlightCard>
        </TiltCard>
      </motion.div>

      {/* Spacer for the other side */}
      <div className="hidden md:block md:w-[45%]" />
    </div>
  );
}
