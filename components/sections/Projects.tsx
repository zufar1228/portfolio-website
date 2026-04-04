"use client";

import Image from "next/image";
import { projects } from "@/lib/data";
import Container from "../ui/Container";
import SectionIntro from "../ui/SectionIntro";
import Reveal from "../ui/Reveal";

export default function Projects() {
  return (
    <section id="projects" className="py-32">
      <Container>
        <SectionIntro label="Projects" title="Selected works" />
        <div className="space-y-32 md:space-y-48">
          {projects.map((project, i) => {
            const isReversed = i % 2 !== 0;
            return (
              <Reveal key={project.title}>
                <div
                  className={`flex flex-col ${
                    isReversed ? "lg:flex-row-reverse" : "lg:flex-row"
                  } items-center gap-12 lg:gap-16`}
                >
                  <div className="w-full lg:w-1/2 aspect-video bg-[var(--color-surface)] rounded-xl overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      width={800}
                      height={450}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="w-full lg:w-1/2 space-y-6">
                    <h3 className="font-headline text-3xl font-bold">{project.title}</h3>
                    <p className="font-body text-[var(--color-text-secondary)] leading-relaxed">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-3 items-center">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs font-body text-[var(--color-accent)]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-6 pt-4">
                      <a
                        href={project.liveUrl}
                        className="text-sm font-semibold font-body text-[var(--color-text)] hover:underline transition-all"
                      >
                        Live Demo →
                      </a>
                      <a
                        href={project.sourceUrl}
                        className="text-sm font-semibold font-body text-[var(--color-text)] hover:underline transition-all"
                      >
                        Source Code →
                      </a>
                    </div>
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
