"use client";

import { motion, AnimatePresence } from "framer-motion";
import { navItems } from "@/lib/data";
import { X } from "lucide-react";
import { useEffect } from "react";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-[var(--color-bg)] z-[60] flex flex-col items-center justify-center space-y-8 lg:hidden"
        >
          <button
            onClick={onClose}
            className="absolute top-8 right-8 p-2 text-[var(--color-text)]"
            aria-label="Close menu"
          >
            <X size={32} />
          </button>
          {navItems.map((item, i) => (
            <motion.a
              key={item.href}
              href={item.href}
              onClick={onClose}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.05 }}
              className="font-headline text-3xl font-bold hover:text-[var(--color-accent)] transition-colors"
            >
              {item.label}
            </motion.a>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
