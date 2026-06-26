"use client";

import { useEffect } from "react";

export function RevealOnScroll() {
  useEffect(() => {
    const nodes = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    );
    if (!nodes.length) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      for (const el of nodes) el.dataset.visible = "true";
      return;
    }

    for (const el of nodes) {
      if (!el.dataset.visible) el.dataset.visible = "false";
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          el.dataset.visible = "true";
          observer.unobserve(el);
        }
      },
      { threshold: 0.18, rootMargin: "0px 0px -10% 0px" },
    );

    for (const el of nodes) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return null;
}
