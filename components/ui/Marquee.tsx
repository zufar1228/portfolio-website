"use client";

import { skillCategories } from "@/lib/data";

export default function Marquee() {
  const allSkills = skillCategories.flatMap((c) => c.skills);

  return (
    <div className="overflow-hidden border-y border-[var(--color-border)] py-5">
      <div className="flex whitespace-nowrap">
        <div className="animate-marquee flex shrink-0">
          {allSkills.map((skill, i) => (
            <span
              key={`a-${i}`}
              className="mx-8 font-headline text-sm md:text-base font-medium text-[var(--color-text-tertiary)] inline-flex items-center gap-2"
            >
              {skill.logo && (
                <img
                  src={skill.logo}
                  alt=""
                  className={`w-4 h-4 object-contain ${skill.darkInvert ? "dark:invert" : ""}`}
                  loading="lazy"
                />
              )}
              {skill.name}
            </span>
          ))}
        </div>
        <div className="animate-marquee flex shrink-0" aria-hidden>
          {allSkills.map((skill, i) => (
            <span
              key={`b-${i}`}
              className="mx-8 font-headline text-sm md:text-base font-medium text-[var(--color-text-tertiary)] inline-flex items-center gap-2"
            >
              {skill.logo && (
                <img
                  src={skill.logo}
                  alt=""
                  className={`w-4 h-4 object-contain ${skill.darkInvert ? "dark:invert" : ""}`}
                  loading="lazy"
                />
              )}
              {skill.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
