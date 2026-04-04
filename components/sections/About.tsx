"use client";

import Image from "next/image";
import { aboutContent } from "@/lib/data";
import Container from "../ui/Container";
import Reveal from "../ui/Reveal";

export default function About() {
  return (
    <section id="about" className="py-32">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          <Reveal className="lg:col-span-5 relative group">
            <div className="aspect-[4/5] bg-[var(--color-surface)] rounded-xl overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700">
              <Image
                src="/images/profile-placeholder.svg"
                alt="Muhammad Zufar Natsir"
                width={600}
                height={750}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[var(--color-accent)]/10 rounded-full blur-3xl group-hover:bg-[var(--color-accent)]/20 transition-all" />
          </Reveal>

          <div className="lg:col-span-7 flex flex-col justify-center">
            <Reveal>
              <span className="font-body text-xs tracking-widest text-[var(--color-text-secondary)] mb-4 block">
                {aboutContent.sectionLabel}
              </span>
              <h2 className="font-headline text-4xl md:text-5xl font-bold mb-8">
                {aboutContent.heading}
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="font-body text-[var(--color-text-secondary)] text-lg leading-relaxed mb-12">
                {aboutContent.bio}
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="grid grid-cols-3 gap-8">
                {aboutContent.stats.map((stat) => (
                  <div key={stat.label} className="space-y-2">
                    <p className="font-headline text-3xl font-bold text-[var(--color-accent)]">
                      {stat.value}
                    </p>
                    <p className="font-body text-xs text-[var(--color-text-secondary)]">
                      {stat.label}
                    </p>
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
