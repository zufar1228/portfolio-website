"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Server, Cpu, LayoutDashboard } from "lucide-react";
import Container from "../ui/Container";
import SpotlightCard from "../ui/SpotlightCard";

const services = [
  {
    icon: Server,
    title: "Backend Systems",
    description:
      "Scalable REST APIs and microservices built with Express and FastAPI — designed for performance and maintainability.",
  },
  {
    icon: Cpu,
    title: "IoT Solutions",
    description:
      "End-to-end IoT pipelines from sensor ingestion to real-time processing, using MQTT and cloud platforms.",
  },
  {
    icon: LayoutDashboard,
    title: "Dashboard Development",
    description:
      "Data-driven dashboards and monitoring interfaces that turn complex datasets into clear, actionable insights.",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay: i * 0.15,
      ease: [0.215, 0.61, 0.355, 1] as [number, number, number, number],
    },
  }),
};

export default function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="services" className="relative py-32 overflow-hidden">
      <Container>
        <div className="flex items-center gap-4 mb-16">
          <span className="font-headline text-sm text-[var(--color-accent)] font-medium">
            00
          </span>
          <span className="font-body text-xs tracking-widest text-[var(--color-text-secondary)]">
            WHAT I DO
          </span>
        </div>

        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              custom={i}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={cardVariants}
            >
              <SpotlightCard className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-8 h-full">
                <service.icon
                  className="w-8 h-8 text-[var(--color-accent)] mb-6"
                  strokeWidth={1.5}
                />
                <h3 className="font-headline text-xl font-semibold text-[var(--color-text)] mb-3">
                  {service.title}
                </h3>
                <p className="font-body text-[var(--color-text-secondary)] leading-relaxed">
                  {service.description}
                </p>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
