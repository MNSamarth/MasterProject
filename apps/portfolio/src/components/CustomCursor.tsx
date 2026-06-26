"use client";

import { useEffect, useRef } from "react";

export function CustomCursor() {
  const dotRef   = useRef<HTMLDivElement>(null);
  const ringRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot  = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    /* Hide the native cursor on the whole page */
    document.documentElement.style.cursor = "none";

    let mx = -100, my = -100;
    let rx = -100, ry = -100;
    let rafId: number;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.transform = `translate(${mx - 4}px, ${my - 4}px)`;
    };

    function loop() {
      rx = rx + (mx - rx) * 0.12;
      ry = ry + (my - ry) * 0.12;
      if (ring) ring.style.transform = `translate(${rx - 20}px, ${ry - 20}px)`;
      rafId = requestAnimationFrame(loop);
    }
    loop();

    /* Scale ring on hoverable elements */
    const onEnter = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (
        t.closest("a") ||
        t.closest("button") ||
        t.closest("[data-cursor-grow]")
      ) {
        ring.style.transform += " scale(2.4)";
        ring.style.opacity   = "0.35";
        dot.style.opacity    = "0";
      }
    };
    const onLeave = () => {
      ring.style.opacity = "1";
      dot.style.opacity  = "1";
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onEnter);
    document.addEventListener("mouseout",  onLeave);

    return () => {
      document.documentElement.style.cursor = "";
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onEnter);
      document.removeEventListener("mouseout",  onLeave);
    };
  }, []);

  return (
    <>
      {/* Dot — snaps instantly */}
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[9999] h-2 w-2 rounded-full"
        style={{
          background: "var(--accent)",
          willChange: "transform",
          mixBlendMode: "normal",
        }}
      />
      {/* Ring — lags behind for trail feel */}
      <div
        ref={ringRef}
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[9998] h-10 w-10 rounded-full"
        style={{
          border: "1.5px solid color-mix(in oklch, var(--accent) 55%, transparent)",
          willChange: "transform",
          transition: "opacity 200ms, scale 200ms",
        }}
      />
    </>
  );
}
