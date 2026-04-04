"use client";

import { Mail, Phone, MapPin } from "lucide-react";
import { contactInfo } from "@/lib/data";
import Container from "../ui/Container";
import Reveal from "../ui/Reveal";

export default function Contact() {
  return (
    <section id="contact" className="py-32">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Left side */}
          <div className="lg:col-span-5 space-y-12">
            <Reveal>
              <div>
                <span className="font-body text-xs tracking-widest text-[var(--color-text-secondary)] mb-4 block">
                  Contact
                </span>
                <h2 className="font-headline text-5xl md:text-6xl font-bold leading-tight">
                  Get in touch
                </h2>
                <p className="font-body text-[var(--color-text-secondary)] mt-4">
                  Have a project in mind or just want to say hello? Feel free to reach out.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Mail size={18} className="text-[var(--color-text-secondary)] mt-1 shrink-0" />
                  <div>
                    <p className="font-body text-xs text-[var(--color-text-secondary)] mb-1">Email</p>
                    <a
                      href={`mailto:${contactInfo.email}`}
                      className="font-headline text-lg font-bold hover:text-[var(--color-accent)] transition-colors"
                    >
                      {contactInfo.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Phone size={18} className="text-[var(--color-text-secondary)] mt-1 shrink-0" />
                  <div>
                    <p className="font-body text-xs text-[var(--color-text-secondary)] mb-1">Phone</p>
                    <a
                      href={`tel:+6281211743607`}
                      className="font-headline text-lg font-bold hover:text-[var(--color-accent)] transition-colors"
                    >
                      {contactInfo.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <MapPin size={18} className="text-[var(--color-text-secondary)] mt-1 shrink-0" />
                  <div>
                    <p className="font-body text-xs text-[var(--color-text-secondary)] mb-1">Based in</p>
                    <p className="font-headline text-lg font-bold">{contactInfo.location}</p>
                  </div>
                </div>

                <div className="flex space-x-6 pt-4">
                  <a
                    href={contactInfo.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-body text-sm tracking-wide text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors"
                  >
                    LinkedIn
                  </a>
                  <a
                    href={contactInfo.github}
                    className="font-body text-sm tracking-wide text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors"
                  >
                    GitHub
                  </a>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right side - Form */}
          <Reveal delay={0.2} className="lg:col-span-7">
            <form
              className="space-y-10 bg-[var(--color-bg-alt)] p-8 md:p-10 rounded-2xl"
              onSubmit={(e) => {
                e.preventDefault();
                // TODO: Wire up form submission
              }}
            >
              <div className="relative">
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="Full Name"
                  className="w-full bg-transparent border-0 border-b border-[var(--color-border)] py-4 px-0 focus:ring-0 focus:border-[var(--color-accent)] transition-colors font-body text-[var(--color-text)] placeholder:text-[var(--color-text-tertiary)]"
                />
              </div>

              <div className="relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="Email Address"
                  className="w-full bg-transparent border-0 border-b border-[var(--color-border)] py-4 px-0 focus:ring-0 focus:border-[var(--color-accent)] transition-colors font-body text-[var(--color-text)] placeholder:text-[var(--color-text-tertiary)]"
                />
              </div>

              <div className="relative">
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  placeholder="Your Message"
                  className="w-full bg-transparent border-0 border-b border-[var(--color-border)] py-4 px-0 focus:ring-0 focus:border-[var(--color-accent)] transition-colors font-body text-[var(--color-text)] placeholder:text-[var(--color-text-tertiary)] resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-[var(--color-accent)] text-[var(--color-bg)] rounded-xl font-body font-semibold tracking-wide hover:opacity-90 transition-all active:scale-[0.98]"
              >
                Send Message
              </button>
            </form>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
