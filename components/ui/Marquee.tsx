"use client";

import { skillCategories } from "@/lib/data";

export default function Marquee() {
  const allSkills = skillCategories.flatMap((c) => c.skills);
  const doubled = [...allSkills, ...allSkills];

  return (
    <div className="overflow-hidden py-6 border-y border-[var(--color-border)]">
      <div className="animate-marquee flex whitespace-nowrap">
        {doubled.map((skill, i) => (
          <span
            key={i}
            className="mx-8 font-headline text-sm md:text-base font-medium text-[var(--color-text-tertiary)] inline-flex items-center gap-2"
          >
            {skill.logo && (
              <img
                src={skill.logo}
                alt=""
                className={`w-4 h-4 object-contain ${skill.darkInvert ? "dark:invert" : ""}`}
              />
            )}
            {skill.name}
          </span>
        ))}
      </div>
    </div>
  );
}
