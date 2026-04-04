"use client";

import { Database, Monitor, Cpu, Cloud } from "lucide-react";
import { skillCategories } from "@/lib/data";
import Container from "../ui/Container";
import SectionIntro from "../ui/SectionIntro";
import Tag from "../ui/Tag";
import Reveal from "../ui/Reveal";

const iconMap: Record<string, React.ElementType> = {
  Database,
  Monitor,
  Cpu,
  Cloud,
};

export default function Skills() {
  return (
    <section id="skills" className="py-32 bg-[var(--color-bg-alt)]">
      <Container>
        <SectionIntro label="Skills" title="Technologies I work with" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((cat, i) => {
            const Icon = iconMap[cat.icon];
            return (
              <Reveal key={cat.title} delay={i * 0.1}>
                <div className="p-8 bg-[var(--color-surface)] rounded-xl space-y-6 hover:-translate-y-1 transition-transform duration-300">
                  {Icon && <Icon size={28} className="text-[var(--color-accent)]" />}
                  <h3 className="font-headline text-xl font-bold">{cat.title}</h3>
                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map((skill) => (
                      <Tag key={skill} label={skill} />
                    ))}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
