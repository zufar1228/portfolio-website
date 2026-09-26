"use client";

import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { footerContent } from "@/lib/data";
import Container from "../ui/Container";
import Marquee from "../ui/Marquee";

export default function Footer() {
  return (
    <>
      <Marquee />
      <footer className="w-full py-12 relative">
        {/* Gradient top border */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[var(--color-accent)]/30 to-transparent" />

        <Container className="flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="font-body text-xs tracking-wide text-[var(--color-text-secondary)]">
            {footerContent.text}
          </p>
          <div className="flex items-center space-x-8">
            <p className="font-body text-xs tracking-wide text-[var(--color-text-secondary)]">
              © {new Date().getFullYear()}
            </p>
            <motion.button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="group inline-flex items-center gap-1.5 font-body text-xs tracking-wide text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors"
            >
              Back to top
              <ArrowUp size={12} className="transition-transform group-hover:-translate-y-0.5" />
            </motion.button>
          </div>
        </Container>
      </footer>
    </>
  );
}
