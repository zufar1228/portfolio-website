"use client";

import { useState } from "react";
import { contactInfo } from "@/lib/data";
import Container from "../ui/Container";

type Status =
  | { state: "idle" }
  | { state: "sending" }
  | { state: "sent"; email: string }
  | { state: "error"; message: string };

type Errors = Partial<Record<"name" | "email" | "message", string>>;

function validate(name: string, email: string, message: string): Errors {
  const errors: Errors = {};
  if (name.trim().length < 2) errors.name = "Enter your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) errors.email = "Enter an email address like name@example.com.";
  if (message.trim().length < 10) errors.message = "Write at least 10 characters so I know what it's about.";
  return errors;
}

const fieldClass =
  "mt-2 w-full rounded-[4px] border bg-surface px-3.5 py-2.5 text-ink placeholder:text-muted/70 focus:border-ink focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2";

export default function Contact() {
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const [errors, setErrors] = useState<Errors>({});

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const message = String(data.get("message") ?? "");
    const website = String(data.get("website") ?? "");

    if (website) return;

    const found = validate(name, email, message);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      const first = Object.keys(found)[0];
      (form.elements.namedItem(first) as HTMLElement | null)?.focus();
      return;
    }

    setStatus({ state: "sending" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      if (!res.ok) throw new Error("server");
      form.reset();
      setStatus({ state: "sent", email });
    } catch (err) {
      setStatus({
        state: "error",
        message:
          err instanceof Error && err.message === "server"
            ? `The message didn't go through. Try again, or email ${contactInfo.email} directly.`
            : `The message didn't go through because the connection dropped. Check your connection and try again.`,
      });
    }
  }

  const clearError = (field: keyof Errors) => {
    if (!errors[field]) return;
    setErrors((prev) => {
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  return (
    <section id="contact" aria-labelledby="contact-title" className="border-t border-line py-20 sm:py-28">
      <Container className="grid gap-14 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <h2 id="contact-title" className="type-heading text-[clamp(2rem,4vw,2.75rem)]">
            Contact
          </h2>
          <p className="mt-3 max-w-[40ch] text-muted">Email is the quickest way to reach me.</p>
          <a
            href={`mailto:${contactInfo.email}`}
            className="type-heading mt-6 inline-block break-all text-[clamp(1.35rem,3vw,2rem)] underline decoration-line decoration-1 underline-offset-[0.2em] transition-colors hover:decoration-ink"
          >
            {contactInfo.email}
          </a>

          <dl className="mt-10 grid grid-cols-[6rem_1fr] gap-y-3 text-[0.9375rem]">
            <dt className="text-muted">Phone</dt>
            <dd>
              <a href={contactInfo.phoneHref} className="link nums">
                {contactInfo.phone}
              </a>
            </dd>
            <dt className="text-muted">Based in</dt>
            <dd>{contactInfo.location}</dd>
            <dt className="text-muted">Elsewhere</dt>
            <dd className="flex flex-wrap gap-x-5">
              <a href={contactInfo.linkedin} target="_blank" rel="noopener noreferrer" className="link">
                LinkedIn
              </a>
              <a href={contactInfo.github} target="_blank" rel="noopener noreferrer" className="link">
                GitHub
              </a>
            </dd>
          </dl>
        </div>

        <div className="lg:col-span-7">
          <h3 className="type-heading text-xl">Or leave a message here</h3>
          <form className="mt-6 space-y-5" noValidate onSubmit={onSubmit}>
            <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="text-sm font-medium">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  onChange={() => clearError("name")}
                  className={`${fieldClass} ${errors.name ? "border-danger" : "border-line"}`}
                />
                {errors.name && (
                  <p id="name-error" className="mt-1.5 text-sm text-danger">
                    {errors.name}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  onChange={() => clearError("email")}
                  className={`${fieldClass} ${errors.email ? "border-danger" : "border-line"}`}
                />
                {errors.email && (
                  <p id="email-error" className="mt-1.5 text-sm text-danger">
                    {errors.email}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="message" className="text-sm font-medium">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? "message-error" : undefined}
                onChange={() => clearError("message")}
                className={`${fieldClass} resize-y ${errors.message ? "border-danger" : "border-line"}`}
              />
              {errors.message && (
                <p id="message-error" className="mt-1.5 text-sm text-danger">
                  {errors.message}
                </p>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
              <button
                type="submit"
                disabled={status.state === "sending"}
                className="rounded-[4px] bg-ink px-5 py-3 font-medium text-bg transition-opacity hover:opacity-85 disabled:opacity-60"
              >
                {status.state === "sending" ? "Sending message…" : "Send message"}
              </button>
              <p role="status" aria-live="polite" className="text-[0.9375rem]">
                {status.state === "sent" && <>Message sent. I&apos;ll reply to {status.email}.</>}
                {status.state === "error" && <span className="text-danger">{status.message}</span>}
              </p>
            </div>
          </form>
        </div>
      </Container>
    </section>
  );
}
