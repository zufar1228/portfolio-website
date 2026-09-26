"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const SUGGESTED_QUESTIONS = [
  "What are your skills?",
  "Tell me about your projects",
  "How can I contact you?",
  "What's your experience?",
];

function generateResponse(input: string): string {
  const q = input.toLowerCase();

  if (q.includes("skill") || q.includes("tech") || q.includes("stack") || q.includes("language")) {
    return "Zufar specializes in backend development with Express.js & PostgreSQL, frontend with React/Next.js & Tailwind CSS, and IoT systems using MQTT and embedded protocols. He also works with AWS, Docker, Git, and Linux.";
  }
  if (q.includes("project") || q.includes("work") || q.includes("portfolio") || q.includes("built")) {
    return "He's built several production systems: a Smart Warehouse IoT Dashboard processing real-time data from 4 IoT nodes, a Geolocation Asset Tracking System for 6 company locations, a River Monitoring & Early Warning System with PT Toyo Sensing, and a Laundry Management App. Check out the Projects section for details!";
  }
  if (q.includes("contact") || q.includes("email") || q.includes("reach") || q.includes("hire")) {
    return "You can reach Zufar at zufarntsr@gmail.com or +62 812 1174 3607. He's based in Jakarta, Indonesia and currently available for opportunities. Scroll down to the Contact section to send a message directly!";
  }
  if (q.includes("experience") || q.includes("intern") || q.includes("job") || q.includes("career")) {
    return "Zufar has interned at PT Len Industri (Persero) as a Software & IoT Engineer, where he built backend APIs for asset tracking across 6 locations. He also interned at PT Synergy Dua Kawan Sejati, managing MQTT data pipelines from 4 IoT nodes with zero downtime. He's graduating from IPB University in 2026.";
  }
  if (q.includes("education") || q.includes("university") || q.includes("study") || q.includes("degree")) {
    return "Zufar is completing his Bachelor of Applied Computer Engineering Technology (D4) at IPB University's Vocational School, expected graduation June 2026. He's focused on embedded systems, web development, and sensor-based automation.";
  }
  if (q.includes("hello") || q.includes("hi") || q.includes("hey") || q.includes("halo")) {
    return "Hey there! 👋 I'm Zufar's AI assistant. Feel free to ask me about his skills, projects, experience, or how to get in touch!";
  }
  if (q.includes("available") || q.includes("freelance") || q.includes("open")) {
    return "Yes! Zufar is currently open to opportunities — whether that's full-time roles, internships, or freelance projects. Feel free to reach out via the Contact section.";
  }
  if (q.includes("iot") || q.includes("mqtt") || q.includes("sensor") || q.includes("embedded")) {
    return "IoT is one of Zufar's core strengths. He's worked with MQTT protocol for real-time sensor data, built pipelines handling 8 sensor points simultaneously, and has experience with GPS/GIS integration and embedded systems.";
  }

  return "That's a great question! I'm a mock AI assistant for now — I can answer about Zufar's skills, projects, experience, education, and contact info. Try asking about one of those topics!";
}

export default function AiChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Hi! I'm Zufar's AI assistant. Ask me anything about his skills, projects, or experience! 🚀",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const inputValueRef = useRef("");
  const [hiddenBySection, setHiddenBySection] = useState(false);

  // Hide button when projects section is in view
  useEffect(() => {
    const projectsEl = document.getElementById("projects");
    if (!projectsEl) return;
    const observer = new IntersectionObserver(
      ([entry]) => setHiddenBySection(entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(projectsEl);
    return () => observer.disconnect();
  }, []);

  // Keep ref in sync with state
  useEffect(() => {
    inputValueRef.current = input;
  }, [input]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSend = useCallback(
    (text?: string) => {
      const msg = (text || inputValueRef.current).trim();
      if (!msg || isTyping) return;

      const userMsg: Message = {
        id: `user-${Date.now()}`,
        role: "user",
        content: msg,
      };
      setMessages((prev) => [...prev, userMsg]);
      setInput("");
      setIsTyping(true);

      // Simulate typing delay
      setTimeout(() => {
        const response = generateResponse(msg);
        const assistantMsg: Message = {
          id: `assistant-${Date.now()}`,
          role: "assistant",
          content: response,
        };
        setMessages((prev) => [...prev, assistantMsg]);
        setIsTyping(false);
      }, 600 + Math.random() * 800);
    },
    [isTyping]
  );

  return (
    <>
      {/* Floating toggle button */}
      <div
        className="fixed bottom-6 right-6 z-50 transition-opacity duration-300"
        style={{ opacity: hiddenBySection && !isOpen ? 0 : 1, pointerEvents: hiddenBySection && !isOpen ? "none" : "auto" }}
      >
        {/* Ping ring */}
        {!isOpen && (
          <span className="absolute inset-0 rounded-full animate-ping bg-[var(--color-accent)]/30" />
        )}

        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="relative w-14 h-14 rounded-full bg-[var(--color-accent)] text-[var(--color-bg)] flex items-center justify-center shadow-lg shadow-[var(--color-accent)]/20 hover:shadow-[var(--color-accent)]/40 transition-shadow"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label={isOpen ? "Close chat" : "Open AI chat"}
        >
          <AnimatePresence mode="wait" initial={false}>
            {isOpen ? (
              <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                <X size={22} />
              </motion.div>
            ) : (
              <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                <MessageCircle size={22} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.33, 1, 0.68, 1] }}
            className="fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[400px] h-[500px] max-h-[calc(100vh-8rem)] rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)]/95 backdrop-blur-xl shadow-2xl shadow-black/20 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="px-5 py-4 border-b border-[var(--color-border)] flex items-center gap-3 shrink-0">
              <div className="w-8 h-8 rounded-lg bg-[var(--color-accent)]/10 flex items-center justify-center">
                <Bot size={16} className="text-[var(--color-accent)]" />
              </div>
              <div>
                <p className="font-headline text-sm font-bold">AI Assistant</p>
                <p className="text-[10px] font-body text-[var(--color-text-tertiary)]">
                  Ask me about Zufar
                </p>
              </div>
              <div className="ml-auto flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[10px] font-body text-[var(--color-text-tertiary)]">Online</span>
              </div>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scrollbar-thin">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex gap-2.5 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                >
                  <div
                    className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs ${
                      msg.role === "assistant"
                        ? "bg-[var(--color-accent)]/10 text-[var(--color-accent)]"
                        : "bg-[var(--color-surface-alt)] text-[var(--color-text-secondary)]"
                    }`}
                  >
                    {msg.role === "assistant" ? <Bot size={14} /> : <User size={14} />}
                  </div>
                  <div
                    className={`max-w-[80%] px-3.5 py-2.5 rounded-2xl text-sm font-body leading-relaxed ${
                      msg.role === "assistant"
                        ? "bg-[var(--color-surface)] text-[var(--color-text)] rounded-bl-md"
                        : "bg-[var(--color-accent)] text-[var(--color-bg)] rounded-br-md"
                    }`}
                  >
                    {msg.content}
                  </div>
                </motion.div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-2.5"
                >
                  <div className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center bg-[var(--color-accent)]/10 text-[var(--color-accent)]">
                    <Bot size={14} />
                  </div>
                  <div className="bg-[var(--color-surface)] px-4 py-3 rounded-2xl rounded-bl-md flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-text-tertiary)] animate-bounce [animation-delay:0ms]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-text-tertiary)] animate-bounce [animation-delay:150ms]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-text-tertiary)] animate-bounce [animation-delay:300ms]" />
                  </div>
                </motion.div>
              )}
            </div>

            {/* Suggested questions */}
            {messages.length <= 1 && (
              <div className="px-4 pb-2 flex flex-wrap gap-1.5 shrink-0">
                {SUGGESTED_QUESTIONS.map((q) => (
                  <button
                    key={q}
                    onClick={() => handleSend(q)}
                    className="px-3 py-1.5 text-xs font-body rounded-full border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-accent)]/40 hover:text-[var(--color-accent)] transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="px-4 py-3 border-t border-[var(--color-border)] shrink-0">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex items-center gap-2"
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about skills, projects..."
                  className="flex-1 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl px-4 py-2.5 text-sm font-body text-[var(--color-text)] placeholder:text-[var(--color-text-tertiary)] outline-none focus:border-[var(--color-accent)]/50 transition-colors"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  className="w-10 h-10 rounded-xl bg-[var(--color-accent)] text-[var(--color-bg)] flex items-center justify-center disabled:opacity-40 transition-opacity hover:opacity-90"
                  aria-label="Send message"
                >
                  <Send size={16} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
