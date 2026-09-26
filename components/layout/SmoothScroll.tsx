"use client";

import { useEffect } from "react";
import Lenis from "lenis";

const SNAP_SECTIONS = ["#skills"];
const SNAP_THRESHOLD = 120; // px from top to trigger snap
const SNAP_DEBOUNCE = 150; // ms after scroll stops

export default function SmoothScroll() {
  useEffect(() => {
    // Always start from the top on page load / refresh
    window.history.scrollRestoration = "manual";
    window.scrollTo(0, 0);

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    // Gentle snap: after scroll stops, if a snap section is close to
    // viewport top, nudge it into place.
    let snapTimer: ReturnType<typeof setTimeout> | null = null;
    let isSnapping = false;

    lenis.on("scroll", () => {
      if (isSnapping) return;
      if (snapTimer) clearTimeout(snapTimer);
      snapTimer = setTimeout(() => {
        for (const sel of SNAP_SECTIONS) {
          const el = document.querySelector(sel) as HTMLElement | null;
          if (!el) continue;
          const rect = el.getBoundingClientRect();
          // If section top is within threshold of viewport top
          if (Math.abs(rect.top) < SNAP_THRESHOLD && rect.top !== 0) {
            isSnapping = true;
            lenis.scrollTo(sel, {
              duration: 0.8,
              onComplete: () => {
                isSnapping = false;
              },
            });
            break;
          }
        }
      }, SNAP_DEBOUNCE);
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      if (snapTimer) clearTimeout(snapTimer);
      lenis.destroy();
    };
  }, []);

  return null;
}
