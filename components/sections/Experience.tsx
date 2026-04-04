"use client";

import { experiences } from "@/lib/data";
import Container from "../ui/Container";
import SectionIntro from "../ui/SectionIntro";
import Reveal from "../ui/Reveal";

export default function Experience() {
  return (
    <section id="experience" className="py-32 bg-[var(--color-bg-alt)]">
      <Container>
        <SectionIntro label="Experience" title="Where I've worked" />
        <div className="divide-y divide-[var(--color-border)]">
          {experiences.map((exp, i) => (
            <Reveal key={exp.period} delay={i * 0.1}>
              <div className="py-10 md:py-12 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 hover:bg-[var(--color-surface)]/50 px-4 transition-colors rounded-xl group">
                <div className="md:col-span-3 text-[var(--color-text-secondary)] font-body text-sm tracking-wide group-hover:text-[var(--color-accent)] transition-colors">
                  {exp.period}
                </div>
                <div className="md:col-span-4 font-headline font-bold text-xl md:text-2xl">
                  {exp.role}
                </div>
                <div className="md:col-span-5">
                  <p className="font-body text-[var(--color-text-secondary)] mb-2">
                    {exp.company}
                  </p>
                  <p className="text-sm text-[var(--color-text-secondary)] opacity-80">
                    {exp.description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
