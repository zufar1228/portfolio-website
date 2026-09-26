"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TypewriterProps {
  words: string[];
  className?: string;
}

export default function Typewriter({ words, className = "" }: TypewriterProps) {
  const [currentWord, setCurrentWord] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>(undefined);

  useEffect(() => {
    const word = words[currentWord];

    if (!isDeleting) {
      if (currentText.length < word.length) {
        timeoutRef.current = setTimeout(() => {
          setCurrentText(word.substring(0, currentText.length + 1));
        }, 80);
      } else {
        // Finished typing — pause then start deleting
        timeoutRef.current = setTimeout(() => setIsDeleting(true), 2000);
      }
    } else {
      if (currentText.length > 0) {
        timeoutRef.current = setTimeout(() => {
          setCurrentText(currentText.substring(0, currentText.length - 1));
        }, 40);
      } else {
        // Finished deleting — move to next word
        setIsDeleting(false);
        setCurrentWord((prev) => (prev + 1) % words.length);
      }
    }

    return () => clearTimeout(timeoutRef.current);
  }, [currentText, isDeleting, currentWord, words]);

  return (
    <span className={className}>
      {currentText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
        className="inline-block w-[2px] h-[1em] bg-[var(--color-accent)] ml-1 align-middle"
      />
    </span>
  );
}
