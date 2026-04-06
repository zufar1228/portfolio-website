"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useCallback } from "react";
import { Mail, Phone, MapPin, ArrowUpRight, Send, CheckCircle, AlertCircle } from "lucide-react";
import { contactInfo } from "@/lib/data";
import Container from "../ui/Container";
import Reveal from "../ui/Reveal";
import TextReveal from "../ui/TextReveal";
import SpotlightCard from "../ui/SpotlightCard";
import AnimatedBorderCard from "../ui/AnimatedBorderCard";
import GridPattern from "../ui/GridPattern";

export default function Contact() {
  const [formState, setFormState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const showToast = useCallback((type: "success" | "error", message: string) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 4000);
  }, []);

  const validate = useCallback((name: string, email: string, message: string) => {
    const errs: Record<string, string> = {};
    if (!name.trim() || name.trim().length < 2) errs.name = "Name must be at least 2 characters";
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = "Please enter a valid email";
    if (!message.trim() || message.trim().length < 10) errs.message = "Message must be at least 10 characters";
    return errs;
  }, []);

  return (
    <section id="contact" className="py-16 sm:py-32 relative overflow-hidden" ref={ref}>
      {/* Animated grid background */}
      <div className="absolute inset-0 bg-[var(--color-bg-alt)]" />
      <GridPattern width={70} height={70} numSquares={12} maxOpacity={0.08} duration={4} />

      <Container className="relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Left side */}
          <div className="lg:col-span-5 space-y-10">
            <Reveal>
              <div className="flex items-center gap-3 mb-4">
                <span className="font-headline text-sm text-[var(--color-accent)] font-medium">04</span>
                <span className="font-body text-xs tracking-widest text-[var(--color-text-secondary)] block">
                  Contact
                </span>
              </div>
            </Reveal>
            <TextReveal
              text="Get in touch"
              as="h2"
              className="font-headline text-3xl sm:text-5xl md:text-6xl font-bold leading-tight"
            />
            <Reveal delay={0.2}>
              <p className="font-body text-[var(--color-text-secondary)]">
                Have a project in mind or just want to say hello? Feel free to reach out.
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="space-y-4 pt-4">
                {[
                  {
                    icon: Mail,
                    label: "Email",
                    value: contactInfo.email,
                    href: `mailto:${contactInfo.email}`,
                  },
                  {
                    icon: Phone,
                    label: "Phone",
                    value: contactInfo.phone,
                    href: `tel:+6281211743607`,
                  },
                  {
                    icon: MapPin,
                    label: "Based in",
                    value: contactInfo.location,
                  },
                ].map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.4 + i * 0.1 }}
                  >
                    <SpotlightCard className="rounded-xl">
                      <div className="flex items-center gap-4 p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]/30 hover:border-[var(--color-text-tertiary)]/30 transition-colors group">
                      <div className="relative z-10 w-10 h-10 rounded-lg bg-[var(--color-bg-alt)] flex items-center justify-center group-hover:bg-[var(--color-accent)]/10 transition-colors">
                        <item.icon size={16} className="text-[var(--color-text-secondary)]" />
                      </div>
                      <div className="relative z-10">
                        <p className="font-body text-[11px] text-[var(--color-text-tertiary)] mb-0.5">
                          {item.label}
                        </p>
                        {item.href ? (
                          <a
                            href={item.href}
                            className="font-body text-sm font-medium hover:text-[var(--color-accent)] transition-colors"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <p className="font-body text-sm font-medium">{item.value}</p>
                        )}
                      </div>
                    </div>
                    </SpotlightCard>
                  </motion.div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.5}>
              <div className="flex gap-4 pt-2">
                {[
                  { label: "LinkedIn", href: contactInfo.linkedin },
                  { label: "GitHub", href: contactInfo.github },
                ].map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.href !== "#" ? "_blank" : undefined}
                    rel={link.href !== "#" ? "noopener noreferrer" : undefined}
                    className="group/link flex items-center gap-1 font-body text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors"
                  >
                    {link.label}
                    <ArrowUpRight
                      size={12}
                      className="transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
                    />
                  </a>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Right side - Form */}
          <Reveal delay={0.2} className="lg:col-span-7">
            <AnimatedBorderCard innerClassName="relative overflow-hidden bg-[var(--color-surface)]/30 backdrop-blur-sm">
              {/* Decorative corner */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-accent)]/[0.03] blur-[40px] rounded-full" />

              <form
                className="relative z-10 space-y-8 p-8 md:p-10"
                noValidate
                onSubmit={async (e) => {
                  e.preventDefault();
                  const form = e.currentTarget;
                  const formData = new FormData(form);
                  const name = formData.get("name") as string;
                  const email = formData.get("email") as string;
                  const message = formData.get("message") as string;

                  const errs = validate(name, email, message);
                  setErrors(errs);
                  if (Object.keys(errs).length > 0) return;

                  setFormState("sending");
                  try {
                    const res = await fetch("/api/contact", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ name, email, message }),
                    });
                    if (res.ok) {
                      setFormState("sent");
                      form.reset();
                      setErrors({});
                      showToast("success", "Message sent successfully! I'll get back to you soon.");
                      setTimeout(() => setFormState("idle"), 4000);
                    } else {
                      setFormState("error");
                      showToast("error", "Failed to send message. Please try again.");
                      setTimeout(() => setFormState("idle"), 3000);
                    }
                  } catch {
                    setFormState("error");
                    showToast("error", "Network error. Please check your connection.");
                    setTimeout(() => setFormState("idle"), 3000);
                  }
                }}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="font-body text-xs text-[var(--color-text-secondary)]">
                      Full Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      placeholder="John Doe"
                      onChange={() => errors.name && setErrors((p) => { const { name: _, ...rest } = p; return rest; })}
                      className={`w-full bg-[var(--color-bg-alt)] border ${errors.name ? "border-red-500" : "border-[var(--color-border)]"} rounded-xl py-3 px-4 focus:ring-1 focus:ring-[var(--color-accent)] focus:border-[var(--color-accent)] transition-colors font-body text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-tertiary)] outline-none input-focus-glow`}
                    />
                    {errors.name && (
                      <p className="flex items-center gap-1 text-xs text-red-400 font-body mt-1">
                        <AlertCircle size={12} /> {errors.name}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="font-body text-xs text-[var(--color-text-secondary)]">
                      Email Address
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="john@example.com"
                      onChange={() => errors.email && setErrors((p) => { const { email: _, ...rest } = p; return rest; })}
                      className={`w-full bg-[var(--color-bg-alt)] border ${errors.email ? "border-red-500" : "border-[var(--color-border)]"} rounded-xl py-3 px-4 focus:ring-1 focus:ring-[var(--color-accent)] focus:border-[var(--color-accent)] transition-colors font-body text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-tertiary)] outline-none input-focus-glow`}
                    />
                    {errors.email && (
                      <p className="flex items-center gap-1 text-xs text-red-400 font-body mt-1">
                        <AlertCircle size={12} /> {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="font-body text-xs text-[var(--color-text-secondary)]">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    placeholder="Tell me about your project..."
                    onChange={() => errors.message && setErrors((p) => { const { message: _, ...rest } = p; return rest; })}
                    className={`w-full bg-[var(--color-bg-alt)] border ${errors.message ? "border-red-500" : "border-[var(--color-border)]"} rounded-xl py-3 px-4 focus:ring-1 focus:ring-[var(--color-accent)] focus:border-[var(--color-accent)] transition-colors font-body text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-tertiary)] outline-none resize-none input-focus-glow`}
                  />
                  {errors.message && (
                    <p className="flex items-center gap-1 text-xs text-red-400 font-body mt-1">
                      <AlertCircle size={12} /> {errors.message}
                    </p>
                  )}
                </div>

                <motion.button
                  type="submit"
                  disabled={formState === "sending"}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative w-full py-4 bg-[var(--color-accent)] text-[var(--color-bg)] rounded-xl font-body font-semibold tracking-wide overflow-hidden transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  <span className="relative z-10 flex items-center gap-2">
                  {formState === "sent" ? (
                    <>
                      <CheckCircle size={16} />
                      Message Sent!
                    </>
                  ) : formState === "sending" ? (
                    <>
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="inline-block"
                      >
                        <Send size={16} />
                      </motion.span>
                      Sending...
                    </>
                  ) : formState === "error" ? (
                    <>
                      Something went wrong
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      Send Message
                    </>
                  )}
                  </span>
                  <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                </motion.button>
              </form>
            </AnimatedBorderCard>
          </Reveal>
        </div>
      </Container>

      {/* Toast notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-[200] px-6 py-3 rounded-xl font-body text-sm font-medium shadow-lg backdrop-blur-sm border ${
              toast.type === "success"
                ? "bg-green-900/80 border-green-700/50 text-green-200"
                : "bg-red-900/80 border-red-700/50 text-red-200"
            }`}
          >
            <span className="flex items-center gap-2">
              {toast.type === "success" ? <CheckCircle size={14} /> : <AlertCircle size={14} />}
              {toast.message}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
