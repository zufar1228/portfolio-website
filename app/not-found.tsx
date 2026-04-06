"use client";

import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center bg-[var(--color-bg)]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-6 max-w-md"
      >
        <span className="font-headline text-8xl sm:text-9xl font-bold text-[var(--color-accent)]/20">
          404
        </span>
        <h1 className="font-headline text-2xl sm:text-3xl font-bold text-[var(--color-text)]">
          Page not found
        </h1>
        <p className="font-body text-base text-[var(--color-text-secondary)] leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <a
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-accent)] text-[var(--color-bg)] rounded-xl font-body font-semibold transition-transform active:scale-[0.97] hover:opacity-90"
        >
          <ArrowLeft size={16} />
          Back to home
        </a>
      </motion.div>
    </div>
  );
}
