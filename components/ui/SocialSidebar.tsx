"use client";

import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { contactInfo } from "@/lib/data";
import MagneticWrap from "./MagneticWrap";

function GitHubIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function LinkedInIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

const socials = [
  { icon: GitHubIcon, href: contactInfo.github, label: "GitHub" },
  { icon: LinkedInIcon, href: contactInfo.linkedin, label: "LinkedIn" },
  { icon: Mail, href: `mailto:${contactInfo.email}`, label: "Email" },
];

export default function SocialSidebar() {
  return (
    <motion.div
      className="fixed left-6 bottom-0 z-50 hidden lg:flex flex-col items-center gap-5"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 3, duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
    >
      {socials.map((social) => (
        <MagneticWrap key={social.label} strength={0.4}>
          <a
            href={social.href}
            target={social.href.startsWith("http") ? "_blank" : undefined}
            rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
            aria-label={social.label}
            className="group flex items-center justify-center w-10 h-10 rounded-full text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors duration-300"
          >
            <social.icon size={18} className="transition-transform duration-300 group-hover:scale-110" />
          </a>
        </MagneticWrap>
      ))}
      {/* Vertical line */}
      <div className="w-[1px] h-24 bg-[var(--color-border)]" />
    </motion.div>
  );
}
