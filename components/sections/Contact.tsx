"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Mail, Phone, MapPin, ArrowUpRight, Send, CheckCircle } from "lucide-react";
import { contactInfo } from "@/lib/data";
import Container from "../ui/Container";
import Reveal from "../ui/Reveal";
import TextReveal from "../ui/TextReveal";
import SpotlightCard from "../ui/SpotlightCard";
import AnimatedBorderCard from "../ui/AnimatedBorderCard";
import GridPattern from "../ui/GridPattern";

export default function Contact() {
  const [formState, setFormState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section id="contact" className="py-32 relative overflow-hidden" ref={ref}>
      {/* Animated grid background */}
      <GridPattern width={70} height={70} numSquares={12} maxOpacity={0.15} duration={5} />

      {/* Background decoration */}
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[var(--color-accent)]/[0.02] blur-[120px] rounded-full" />

      <Container className="relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Left side */}
          <div className="lg:col-span-5 space-y-10">
            <Reveal>
              <span className="font-body text-xs tracking-widest text-[var(--color-text-secondary)] mb-4 block">
                Contact
              </span>
            </Reveal>
            <TextReveal
              text="Get in touch"
              as="h2"
              className="font-headline text-5xl md:text-6xl font-bold leading-tight"
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
                onSubmit={async (e) => {
                  e.preventDefault();
                  setFormState("sending");
                  const form = e.currentTarget;
                  const formData = new FormData(form);
                  try {
                    const res = await fetch("/api/contact", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                        name: formData.get("name"),
                        email: formData.get("email"),
                        message: formData.get("message"),
                      }),
                    });
                    if (res.ok) {
                      setFormState("sent");
                      form.reset();
                      setTimeout(() => setFormState("idle"), 4000);
                    } else {
                      setFormState("error");
                      setTimeout(() => setFormState("idle"), 3000);
                    }
                  } catch {
                    setFormState("error");
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
                      className="w-full bg-[var(--color-bg-alt)] border border-[var(--color-border)] rounded-xl py-3 px-4 focus:ring-1 focus:ring-[var(--color-accent)] focus:border-[var(--color-accent)] transition-colors font-body text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-tertiary)] outline-none input-focus-glow"
                    />
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
                      className="w-full bg-[var(--color-bg-alt)] border border-[var(--color-border)] rounded-xl py-3 px-4 focus:ring-1 focus:ring-[var(--color-accent)] focus:border-[var(--color-accent)] transition-colors font-body text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-tertiary)] outline-none input-focus-glow"
                    />
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
                    className="w-full bg-[var(--color-bg-alt)] border border-[var(--color-border)] rounded-xl py-3 px-4 focus:ring-1 focus:ring-[var(--color-accent)] focus:border-[var(--color-accent)] transition-colors font-body text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-tertiary)] outline-none resize-none input-focus-glow"
                  />
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
    </section>
  );
}
