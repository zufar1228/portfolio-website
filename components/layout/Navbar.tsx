"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu } from "lucide-react";
import { navItems } from "@/lib/data";
import ThemeToggle from "./ThemeToggle";
import MobileMenu from "./MobileMenu";
import MagneticWrap from "../ui/MagneticWrap";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScrollRef = useRef(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const onScroll = () => {
      const current = window.scrollY;
      setScrolled(current > 50);
      setHidden(current > lastScrollRef.current && current > 100);
      lastScrollRef.current = current;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-50% 0px -50% 0px" }
    );

    const sections = document.querySelectorAll("section[id]");
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: hidden ? -100 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`fixed top-0 w-full z-50 flex justify-between items-center px-6 sm:px-8 py-5 transition-colors duration-300 ${
          scrolled
            ? "bg-[var(--color-bg)]/70 backdrop-blur-2xl border-b border-[var(--color-border)]/50"
            : "bg-transparent"
        }`}
      >
        <MagneticWrap strength={0.2}>
          <a href="#" className="text-2xl font-bold tracking-tighter font-headline text-[var(--color-text)] relative group">
            <span className="relative z-10">MZN<span className="text-[var(--color-accent)]">.</span></span>
            <motion.span
              className="absolute -bottom-1 left-0 h-px bg-[var(--color-accent)]"
              initial={{ width: 0 }}
              whileHover={{ width: "100%" }}
              transition={{ duration: 0.3 }}
            />
          </a>
        </MagneticWrap>

        <div className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => {
            const isActive = activeSection === item.href.slice(1);
            return (
              <a
                key={item.href}
                href={item.href}
                className="relative px-4 py-2 font-body text-sm transition-colors duration-300 text-[var(--color-text-secondary)] hover:text-[var(--color-text)]"
              >
                {isActive && (
                  <motion.span
                    layoutId="activeNav"
                    className="absolute inset-0 bg-[var(--color-surface-alt)] rounded-lg"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
                {isActive && (
                  <motion.span
                    layoutId="activeNavLine"
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 h-px w-6 bg-[var(--color-accent)]"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
                <span className={`relative z-10 ${isActive ? "text-[var(--color-text)] font-medium" : ""}`}>
                  {item.label}
                </span>
              </a>
            );
          })}
        </div>

        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <button
            onClick={() => setMenuOpen(true)}
            className="md:hidden text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors"
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </motion.nav>

      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
