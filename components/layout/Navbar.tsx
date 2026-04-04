"use client";

import { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import { navItems } from "@/lib/data";
import ThemeToggle from "./ThemeToggle";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastScroll, setLastScroll] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const onScroll = () => {
      const current = window.scrollY;
      setScrolled(current > 50);
      setHidden(current > lastScroll && current > 100);
      setLastScroll(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [lastScroll]);

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
      <nav
        className={`fixed top-0 w-full z-50 flex justify-between items-center px-6 sm:px-8 py-5 transition-all duration-300 ${
          scrolled
            ? "bg-[var(--color-bg)]/60 backdrop-blur-xl border-b border-[var(--color-border)]/50"
            : "bg-transparent"
        } ${hidden ? "-translate-y-full" : "translate-y-0"}`}
      >
        <a href="#" className="text-2xl font-bold tracking-tighter font-headline text-[var(--color-text)]">
          MZN
        </a>

        <div className="hidden md:flex items-center space-x-10">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`font-body text-sm transition-colors duration-300 ${
                activeSection === item.href.slice(1)
                  ? "text-[var(--color-text)] font-medium"
                  : "text-[var(--color-text-secondary)] hover:text-[var(--color-text)]"
              }`}
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <button
            onClick={() => setMenuOpen(true)}
            className="md:hidden text-[var(--color-text-secondary)]"
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </nav>

      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
