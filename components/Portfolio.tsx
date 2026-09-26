"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
  type PointerEvent,
} from "react";
import { COPY, EMAIL, PROJECTS, RESUME_URL, type Lang } from "@/lib/content";

type Theme = "light" | "dark";
type FormState = { name: string; email: string; message: string };
type Errors = Partial<Record<keyof FormState, string>>;
type Status = "idle" | "sending" | "sent" | "error";

const SECTIONS = ["services", "work", "experience", "toolkit", "contact"] as const;
const NAME_BASE_STRETCH = 75; // "condensed" — the design's default name width

const pad = (n: number) => String(n).padStart(2, "0");

/* Scroll-triggered entrances, ported 1:1 from the design's setupReveal(). */
function setupReveal(): () => void {
  if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return () => {};
  const ease = "cubic-bezier(0.2, 0.75, 0.2, 1)";
  const wipeEase = "cubic-bezier(0.7, 0, 0.2, 1)";
  const KF: Record<string, { f: Keyframe[]; d: number; e: string }> = {
    up: { f: [{ opacity: 0, transform: "translateY(28px)" }, { opacity: 1, transform: "none" }], d: 800, e: ease },
    wipe: { f: [{ clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)" }], d: 1000, e: wipeEase },
    mask: { f: [{ transform: "translateY(105%)" }, { transform: "translateY(0)" }], d: 1000, e: "cubic-bezier(0.2, 0.85, 0.2, 1)" },
    clip: { f: [{ clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)" }], d: 1100, e: wipeEase },
    zoom: { f: [{ transform: "scale(1.14)" }, { transform: "scale(1)" }], d: 1600, e: ease },
  };
  const pending = new Map<Element, Animation[]>();
  document.querySelectorAll<HTMLElement>("[data-reveal]:not([data-rv])").forEach((el) => {
    const k = KF[el.dataset.reveal ?? ""];
    if (!k) return;
    el.dataset.rv = "1";
    const delay = (Number(el.dataset.d) || 0) + (Number(el.dataset.i) || 0) * 90;
    const a = el.animate(k.f, { duration: k.d, delay, easing: k.e, fill: "both" });
    a.pause();
    const target = el.dataset.reveal === "up" ? el : el.closest("figure") || el.parentElement || el;
    pending.set(target, (pending.get(target) || []).concat(a));
  });

  let raf = 0;
  const stop = () => {
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("resize", onScroll);
    cancelAnimationFrame(raf);
  };
  const check = () => {
    raf = 0;
    const vh = window.innerHeight * 0.94;
    pending.forEach((anims, target) => {
      if (target.getBoundingClientRect().top < vh) {
        anims.forEach((a) => a.play());
        pending.delete(target);
      }
    });
    if (!pending.size) stop();
  };
  const onScroll = () => {
    if (!raf) raf = requestAnimationFrame(check);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  check();
  return stop;
}

export default function Portfolio() {
  const [lang, setLangState] = useState<Lang>("en");
  const [theme, setTheme] = useState<Theme>("light");
  const [headerH, setHeaderH] = useState(62);
  const [clock, setClock] = useState("");
  const [form, setForm] = useState<FormState>({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [honeypot, setHoneypot] = useState("");

  const headerRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<string | null>(null);
  const nameRaf = useRef(0);
  const portraitRaf = useRef(0);

  const c = COPY[lang];

  const moveBar = useCallback((id: string | null, force = false) => {
    if (id === activeRef.current && !force) return;
    activeRef.current = id;
    const nav = navRef.current;
    if (!nav) return;
    const bar = nav.querySelector<HTMLElement>("[data-navbar]");
    nav.querySelectorAll<HTMLElement>("[data-nav]").forEach((a) => {
      a.style.color = a.dataset.nav === id ? "var(--color-accent-700)" : "";
    });
    const link = id ? nav.querySelector<HTMLElement>(`[data-nav="${id}"]`) : null;
    if (!bar) return;
    if (!link) {
      bar.style.opacity = "0";
      return;
    }
    bar.style.opacity = "1";
    bar.style.width = link.offsetWidth + "px";
    bar.style.transform = `translate(${link.offsetLeft}px,${link.offsetTop + link.offsetHeight + 3}px)`;
  }, []);

  useEffect(() => {
    let savedLang: string | null = null;
    let savedTheme: string | null = null;
    try {
      savedLang = localStorage.getItem("zn-lang");
      savedTheme = localStorage.getItem("zn-theme");
    } catch {}
    const initialTheme: Theme =
      savedTheme === "dark" || savedTheme === "light"
        ? savedTheme
        : window.matchMedia?.("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";
    setTheme(initialTheme);
    if (savedLang === "en" || savedLang === "id") setLangState(savedLang);

    const hd = headerRef.current;
    let ro: ResizeObserver | undefined;
    if (hd && window.ResizeObserver) {
      ro = new ResizeObserver(() => {
        setHeaderH(hd.offsetHeight);
        document.documentElement.style.setProperty("--header-h", hd.offsetHeight + "px");
      });
      ro.observe(hd);
    }

    const fmt = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Jakarta",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
    const tick = () => setClock(fmt.format(new Date()));
    tick();
    const clockT = window.setInterval(tick, 1000);

    const updateScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const pr = progressRef.current;
      if (pr) pr.style.transform = `scaleX(${max > 0 ? Math.min(1, window.scrollY / max) : 0})`;
      let active: string | null = null;
      SECTIONS.forEach((id) => {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.4) active = id;
      });
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) active = "contact";
      moveBar(active);
    };
    let raf = 0;
    const onScroll = () => {
      if (!raf)
        raf = requestAnimationFrame(() => {
          raf = 0;
          updateScroll();
        });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    updateScroll();

    let stopReveal = () => {};
    const revealRaf = requestAnimationFrame(() => {
      stopReveal = setupReveal();
    });

    return () => {
      ro?.disconnect();
      clearInterval(clockT);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
      cancelAnimationFrame(revealRaf);
      stopReveal();
    };
  }, [moveBar]);

  useEffect(() => {
    document.documentElement.lang = lang;
    const id = requestAnimationFrame(() => moveBar(activeRef.current, true));
    return () => cancelAnimationFrame(id);
  }, [lang, moveBar]);

  const setLang = (next: Lang) => {
    try {
      localStorage.setItem("zn-lang", next);
    } catch {}
    setLangState(next);
  };

  const toggleTheme = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    try {
      localStorage.setItem("zn-theme", next);
    } catch {}
    if (next === "dark") document.documentElement.setAttribute("data-theme", "dark");
    else document.documentElement.removeAttribute("data-theme");
    setTheme(next);
  };

  /* ── Hero name: letters widen toward the pointer ── */
  const nameMove = (e: PointerEvent<HTMLHeadingElement>) => {
    if (e.pointerType === "touch") return;
    const h1 = e.currentTarget;
    const x = e.clientX;
    const y = e.clientY;
    if (nameRaf.current) return;
    nameRaf.current = requestAnimationFrame(() => {
      nameRaf.current = 0;
      h1.querySelectorAll<HTMLElement>("[data-l]").forEach((l) => {
        const r = l.getBoundingClientRect();
        const d = Math.hypot(x - (r.left + r.width / 2), (y - (r.top + r.height / 2)) * 0.7);
        const k = Math.max(0, 1 - d / 300);
        l.style.fontStretch = NAME_BASE_STRETCH + (125 - NAME_BASE_STRETCH) * 0.75 * k * k + "%";
      });
    });
  };
  const nameLeave = (e: PointerEvent<HTMLHeadingElement>) => {
    e.currentTarget.querySelectorAll<HTMLElement>("[data-l]").forEach((l) => {
      l.style.fontStretch = "";
    });
  };

  /* ── Portrait: colour scan follows the pointer, slight parallax ── */
  const portraitMove = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "touch") return;
    const el = e.currentTarget;
    const x = e.clientX;
    const y = e.clientY;
    if (portraitRaf.current) return;
    portraitRaf.current = requestAnimationFrame(() => {
      portraitRaf.current = 0;
      const r = el.getBoundingClientRect();
      const px = Math.max(0, Math.min(1, (x - r.left) / r.width));
      const py = Math.max(0, Math.min(1, (y - r.top) / r.height));
      const ov = el.querySelector<HTMLElement>("[data-ov]");
      const scan = el.querySelector<HTMLElement>("[data-scan]");
      const par = el.querySelector<HTMLElement>("[data-par]");
      if (!ov || !scan || !par) return;
      ov.style.transition = "clip-path 0.15s linear";
      ov.style.clipPath = `inset(0 0 ${(1 - py) * 100}% 0)`;
      scan.style.opacity = "1";
      scan.style.transform = `translateY(${py * r.height - 1}px)`;
      par.style.transform = `scale(1.06) translate(${(0.5 - px) * 14}px,${(0.5 - py) * 14}px)`;
    });
  };
  const portraitLeave = (e: PointerEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const ov = el.querySelector<HTMLElement>("[data-ov]");
    const scan = el.querySelector<HTMLElement>("[data-scan]");
    const par = el.querySelector<HTMLElement>("[data-par]");
    if (!ov || !scan || !par) return;
    ov.style.transition = "clip-path 0.6s cubic-bezier(0.2,0.75,0.2,1)";
    ov.style.clipPath = "inset(0 0 100% 0)";
    scan.style.opacity = "0";
    par.style.transform = "scale(1.04)";
  };

  /* ── Light/dark compare slider ── */
  const dragging = useRef(new WeakSet<HTMLElement>());
  const cmpApply = (el: HTMLElement, value: number) => {
    const pct = Math.max(0, Math.min(100, value));
    el.dataset.pct = String(pct);
    el.setAttribute("aria-valuenow", String(Math.round(pct)));
    const over = el.querySelector<HTMLElement>('[data-cmp="over"]');
    const handle = el.querySelector<HTMLElement>('[data-cmp="handle"]');
    if (over) over.style.clipPath = `inset(0 0 0 ${pct}%)`;
    if (handle) handle.style.left = pct + "%";
  };
  const cmpAt = (el: HTMLElement, x: number) => {
    const r = el.getBoundingClientRect();
    cmpApply(el, ((x - r.left) / r.width) * 100);
  };
  const cmpDown = (e: PointerEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    dragging.current.add(el);
    try {
      el.setPointerCapture(e.pointerId);
    } catch {}
    cmpAt(el, e.clientX);
  };
  const cmpMove = (e: PointerEvent<HTMLDivElement>) => {
    if (dragging.current.has(e.currentTarget)) cmpAt(e.currentTarget, e.clientX);
  };
  const cmpUp = (e: PointerEvent<HTMLDivElement>) => {
    dragging.current.delete(e.currentTarget);
  };
  const cmpKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const cur = Number(el.dataset.pct || 50);
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      cmpApply(el, cur - 5);
    }
    if (e.key === "ArrowRight") {
      e.preventDefault();
      cmpApply(el, cur + 5);
    }
  };

  /* ── Contact form ── */
  const field = (name: keyof FormState) => (e: { target: { value: string } }) => {
    const v = e.target.value;
    setForm((f) => ({ ...f, [name]: v }));
    setErrors((errs) => {
      const next = { ...errs };
      delete next[name];
      return next;
    });
  };

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const t = c.form;
    const errs: Errors = {};
    if (form.name.trim().length < 2) errs.name = t.errName;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = t.errEmail;
    if (form.message.trim().length < 10) errs.message = t.errMessage;
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, website: honeypot }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  const direct = [
    { label: "Email", value: EMAIL, href: `mailto:${EMAIL}`, external: false },
    { label: c.contact.phone, value: "+62 812 1174 3607", href: "tel:+6281211743607", external: false },
    { label: "LinkedIn", value: "muhammad-zufar-natsir", href: "https://www.linkedin.com/in/muhammad-zufar-natsir-0b1353341", external: true },
    { label: "GitHub", value: "zufar1228", href: "https://github.com/zufar1228", external: true },
    { label: c.contact.loc, value: "Jakarta, Indonesia", href: "https://maps.google.com/?q=Jakarta", external: true },
  ];

  const letters = (word: string) =>
    word.split("").map((ch, i) => (
      <span key={i} data-l="1">
        {ch}
      </span>
    ));

  return (
    <>
      <a href="#top" className="skip-link">
        Skip to content
      </a>
      <header ref={headerRef} className="site-header">
        <nav className="site-nav" aria-label="Primary">
          <a href="#top" className="brand" aria-label="Muhammad Zufar Natsir">
            <span className="brand-mark">MZN.</span>
          </a>
          <div ref={navRef} className="nav-links">
            <span data-navbar="1" aria-hidden="true" className="nav-bar" />
            {SECTIONS.map((id) => (
              <a key={id} href={`#${id}`} data-nav={id}>
                {c.nav[id]}
              </a>
            ))}
          </div>
          <div className="nav-tools">
            <div className="lang-switch">
              <button type="button" onClick={() => setLang("en")} aria-pressed={lang === "en"}>
                EN
              </button>
              <button type="button" onClick={() => setLang("id")} aria-pressed={lang === "id"}>
                ID
              </button>
            </div>
            <button type="button" onClick={toggleTheme} className="theme-btn">
              {theme === "dark" ? c.themeDark : c.themeLight}
            </button>
          </div>
        </nav>
        <div ref={progressRef} aria-hidden="true" className="progress" />
      </header>
      <div aria-hidden="true" style={{ height: headerH }} />

      <main className="page">
        {/* 01 Hero */}
        <section id="top" className="hero">
          <div className="hero-grid">
            <div className="hero-main">
              <div>
                <div data-reveal="wipe" className="rule-row eyebrow">
                  <span>{c.hero.kicker}</span>
                  <span className="status">
                    <span className="sq" style={{ width: "calc(8 * var(--u))", height: "calc(8 * var(--u))" }} />
                    {c.hero.status}
                  </span>
                </div>
                <p data-reveal="up" data-d="250" className="hero-first">
                  Muhammad
                </p>
                <h1 className="hero-name" onPointerMove={nameMove} onPointerLeave={nameLeave}>
                  <span className="line">
                    <span data-reveal="mask" data-d="350">
                      {letters("Zufar")}
                    </span>
                  </span>
                  <span className="line">
                    <span data-reveal="mask" data-d="470">
                      {letters("Natsir")}
                    </span>
                  </span>
                </h1>
              </div>
              <div data-reveal="up" data-d="750" className="hero-intro">
                <p className="hero-role eyebrow" style={{ fontSize: "calc(13 * var(--u))" }}>
                  {c.hero.role}
                </p>
                <p className="hero-statement">{c.hero.statement}</p>
                <div className="hero-ctas">
                  <a href="#work" className="btn btn-primary cta">
                    {c.hero.cta1}
                    <span>↓</span>
                  </a>
                  <a href={RESUME_URL} target="_blank" rel="noopener noreferrer" className="btn btn-secondary cta">
                    {c.hero.cta2}
                    <span>↗</span>
                  </a>
                </div>
              </div>
            </div>
            <figure className="hero-fig">
              <div
                data-reveal="wipe"
                data-d="150"
                className="eyebrow"
                style={{ borderTop: "2px solid var(--color-text)", paddingTop: "calc(10 * var(--u))", display: "flex", justifyContent: "space-between" }}
              >
                <span>Fig. 01</span>
                <span>{c.hero.figTag}</span>
              </div>
              <div data-reveal="clip" data-d="300" className="portrait" onPointerMove={portraitMove} onPointerLeave={portraitLeave}>
                <div data-par="1" className="portrait-par">
                  <Image
                    data-reveal="zoom"
                    data-d="300"
                    src="/images/profile-picture.webp"
                    alt="Muhammad Zufar Natsir"
                    width={896}
                    height={1184}
                    sizes="(max-width: 900px) 100vw, 600px"
                    preload
                    className="portrait-img grayscale"
                  />
                  <Image
                    data-ov="1"
                    src="/images/profile-picture.webp"
                    alt=""
                    aria-hidden="true"
                    width={896}
                    height={1184}
                    sizes="(max-width: 900px) 100vw, 600px"
                    className="portrait-ov"
                  />
                </div>
                <div data-scan="1" aria-hidden="true" className="portrait-scan" />
              </div>
            </figure>
          </div>

          <div className="facts-wrap">
            <div className="cells facts">
              {c.facts.map((f, i) => (
                <div key={i} data-reveal="up" data-d="900" data-i={i} className="cell fact">
                  <span className="eyebrow muted-60">{f.label}</span>
                  <span className="fact-value">{f.value}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 02 Services */}
        <section id="services" className="section">
          <div data-reveal="wipe" className="section-head">
            <p className="eyebrow section-label">01 — {c.services.label}</p>
            <h2 className="section-title">{c.services.title}</h2>
          </div>
          <div className="cells-wrap">
            <div className="cells services">
              {c.services.items.map((s, i) => (
                <div key={i} data-reveal="up" data-d="150" data-i={i} className="cell service">
                  <span className="big-num">{s.n}</span>
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 03 Work */}
        <section id="work" className="section">
          <div data-reveal="wipe" className="section-head">
            <p className="eyebrow section-label">02 — {c.work.label}</p>
            <h2 className="section-title">{c.work.title}</h2>
          </div>
          <div className="projects">
            {PROJECTS.map((p, i) => {
              const copy = p[lang];
              const compare = p.light !== p.dark;
              return (
                <article key={p.key} id={`p-${pad(i + 1)}`} className="project">
                  <div data-reveal="up" className="project-info">
                    <div className="project-top">
                      <span className="big-num">{pad(i + 1)}</span>
                      <span className="eyebrow muted-60 project-context">{copy.context}</span>
                    </div>
                    <h3>{copy.title}</h3>
                    <p className="project-summary">{copy.summary}</p>
                    <div className="project-facts">
                      {copy.facts.map((fact, j) => (
                        <div key={j} className="project-fact">
                          <span>{fact}</span>
                        </div>
                      ))}
                    </div>
                    <p className="project-stack">{p.stack}</p>
                    <div className="project-links">
                      {p.links.map((l) => (
                        <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer">
                          {l[lang]}
                          <span>↗</span>
                        </a>
                      ))}
                      {p.links.length === 0 && <span className="project-private">{c.work.private}</span>}
                    </div>
                  </div>
                  <figure className="project-fig">
                    {compare ? (
                      <div
                        data-reveal="clip"
                        data-d="120"
                        tabIndex={0}
                        role="slider"
                        aria-label={c.work.compare}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-valuenow={50}
                        onPointerDown={cmpDown}
                        onPointerMove={cmpMove}
                        onPointerUp={cmpUp}
                        onPointerCancel={cmpUp}
                        onKeyDown={cmpKey}
                        className="shot compare"
                      >
                        <Image
                          src={p.light}
                          alt={copy.title}
                          width={1600}
                          height={1000}
                          sizes="(max-width: 900px) 100vw, 60vw"
                          draggable={false}
                          className="shot-img"
                        />
                        <Image
                          data-cmp="over"
                          src={p.dark}
                          alt=""
                          width={1600}
                          height={1000}
                          sizes="(max-width: 900px) 100vw, 60vw"
                          draggable={false}
                          className="compare-over"
                        />
                        <div data-cmp="handle" className="compare-handle">
                          <div className="compare-knob">↔</div>
                        </div>
                        <span className="compare-tag light">{c.work.light}</span>
                        <span className="compare-tag dark">{c.work.dark}</span>
                      </div>
                    ) : (
                      <div data-reveal="clip" data-d="120" className="shot shot-single">
                        <Image
                          src={theme === "dark" ? p.dark : p.light}
                          alt={copy.title}
                          width={1280}
                          height={800}
                          sizes="(max-width: 900px) 100vw, 60vw"
                          className="shot-img"
                        />
                      </div>
                    )}
                  </figure>
                </article>
              );
            })}
          </div>
        </section>

        {/* 04 Experience */}
        <section id="experience" className="section-sm">
          <div data-reveal="wipe" className="section-head">
            <p className="eyebrow section-label">03 — {c.exp.label}</p>
            <h2 className="section-title">{c.exp.title}</h2>
          </div>
          <div className="exp-list">
            {c.exp.items.map((e, i) => (
              <div key={i} data-reveal="up" data-i={i} className="exp">
                <div className="exp-period">{e.period}</div>
                <div className="exp-main">
                  <div className="exp-title">
                    <h3>{e.role}</h3>
                    <p className="exp-org">{e.org}</p>
                  </div>
                  <div className="exp-body">
                    <p>{e.body}</p>
                    {e.metrics && <p className="exp-metrics">{e.metrics}</p>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 05 Toolkit */}
        <section id="toolkit" className="section-sm">
          <div data-reveal="wipe" className="section-head">
            <p className="eyebrow section-label">04 — {c.skills.label}</p>
            <h2 className="section-title">{c.skills.title}</h2>
          </div>
          <div className="cells-wrap">
            <div className="cells skills">
              {c.skills.groups.map((g, i) => (
                <div key={i} data-reveal="up" data-d="150" data-i={i} className="cell skill-group">
                  <h3 className="eyebrow muted-60" style={{ fontSize: "calc(13 * var(--u))" }}>
                    {g.title}
                  </h3>
                  <div className="skill-list">
                    {g.items.map((it) => (
                      <div key={it} className="skill">
                        <span>{it}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 06 Contact */}
        <section id="contact" className="contact">
          <div data-reveal="clip" className="banner">
            <div className="rule-row eyebrow">
              <span>05 — {c.contact.label}</span>
              <span className="clock">Jakarta — {clock} WIB</span>
            </div>
            <h2 data-reveal="up" data-d="450">
              {c.contact.title}
            </h2>
            <a href={`mailto:${EMAIL}`} className="banner-email">
              {EMAIL} ↗
            </a>
          </div>

          <div className="contact-grid">
            <div data-reveal="up" className="contact-info">
              <p className="contact-intro">{c.contact.intro}</p>
              <div className="direct">
                {direct.map((d) => (
                  <div key={d.href} className="direct-row">
                    <span className="eyebrow muted-60">{d.label}</span>
                    <a href={d.href} {...(d.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                      {d.value}
                    </a>
                  </div>
                ))}
              </div>
            </div>

            <form data-reveal="up" data-d="120" onSubmit={submit} noValidate className="contact-form">
              <div className="form-row">
                <div className="field">
                  <label htmlFor="f-name">{c.form.name}</label>
                  <input
                    id="f-name"
                    className="input"
                    type="text"
                    autoComplete="name"
                    value={form.name}
                    onChange={field("name")}
                    placeholder={c.form.namePh}
                    aria-invalid={!!errors.name}
                  />
                  {errors.name && (
                    <p role="alert" className="field-error">
                      {errors.name}
                    </p>
                  )}
                </div>
                <div className="field">
                  <label htmlFor="f-email">{c.form.email}</label>
                  <input
                    id="f-email"
                    className="input"
                    type="email"
                    autoComplete="email"
                    value={form.email}
                    onChange={field("email")}
                    placeholder={c.form.emailPh}
                    aria-invalid={!!errors.email}
                  />
                  {errors.email && (
                    <p role="alert" className="field-error">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>
              <div className="field">
                <label htmlFor="f-msg">{c.form.message}</label>
                <textarea
                  id="f-msg"
                  className="input"
                  rows={6}
                  value={form.message}
                  onChange={field("message")}
                  placeholder={c.form.messagePh}
                  aria-invalid={!!errors.message}
                />
                {errors.message && (
                  <p role="alert" className="field-error">
                    {errors.message}
                  </p>
                )}
              </div>
              <div className="honeypot" aria-hidden="true">
                <label htmlFor="f-website">Website</label>
                <input
                  id="f-website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                />
              </div>
              <div className="form-actions">
                <button type="submit" className="btn btn-primary submit" disabled={status === "sending"}>
                  {status === "sending" ? c.form.sending : c.form.send}
                  <span>→</span>
                </button>
                {status === "sent" && (
                  <p role="status" className="form-status">
                    {c.form.sent}
                  </p>
                )}
                {status === "error" && (
                  <p role="alert" className="form-status" style={{ color: "var(--color-accent-700)" }}>
                    {c.form.failed}
                  </p>
                )}
              </div>
            </form>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div data-reveal="wipe" className="footer-row">
          <span style={{ fontWeight: 600 }}>© 2026 Muhammad Zufar Natsir</span>
          <span className="colophon">{c.footer.colophon}</span>
          <a href="#top">{c.footer.top} ↑</a>
        </div>
      </footer>
    </>
  );
}
