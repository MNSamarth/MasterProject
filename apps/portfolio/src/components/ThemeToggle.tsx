"use client";

import { useTheme } from "@/components/ThemeProvider";

export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="group fixed left-4 top-1/2 z-[9990] -translate-y-1/2 flex flex-col items-center gap-2 rounded-full border p-1.5 backdrop-blur-md transition-all duration-300 hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
      style={{
        borderColor: "color-mix(in oklch, var(--foreground) 12%, transparent)",
        background: "color-mix(in oklch, var(--card) 85%, transparent)",
        boxShadow: "0 2px 16px color-mix(in oklch, var(--accent) 10%, transparent)",
      }}
    >
      {/* Track */}
      <div
        className="relative h-12 w-6 rounded-full transition-colors duration-300"
        style={{
          background: isDark
            ? "color-mix(in oklch, var(--accent) 22%, var(--card-2))"
            : "color-mix(in oklch, var(--accent-2) 18%, var(--card-2))",
        }}
      >
        {/* Sliding thumb */}
        <div
          className="absolute left-1 h-4 w-4 rounded-full transition-all duration-300"
          style={{
            top: isDark ? "calc(100% - 1.25rem)" : "0.25rem",
            background: "linear-gradient(135deg, var(--accent), var(--accent-2))",
            boxShadow: "0 0 8px color-mix(in oklch, var(--accent) 45%, transparent)",
          }}
        />
      </div>

      {/* Sun icon — shown in dark mode (click to go light) */}
      <svg
        width="13" height="13" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        className="transition-opacity duration-200"
        style={{
          color: "var(--accent-2)",
          opacity: isDark ? 0.9 : 0.35,
        }}
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
      </svg>

      {/* Moon icon — shown in light mode (click to go dark) */}
      <svg
        width="13" height="13" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        className="transition-opacity duration-200"
        style={{
          color: "var(--accent)",
          opacity: isDark ? 0.35 : 0.9,
        }}
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
    </button>
  );
}
