"use client";

import { useState } from "react";

export function ProjectDemo({ demoUrl, title }: { demoUrl: string; title: string }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="mt-16">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <span className="section-label">Live Demo</span>
          <p className="mt-2 text-sm text-foreground/50">
            Interactive preview running directly in the browser
          </p>
        </div>
        <button
          onClick={() => setExpanded((v) => !v)}
          className="inline-flex h-9 items-center gap-2 rounded-full border border-foreground/15 bg-foreground/5 px-4 text-xs text-foreground/60 transition hover:bg-foreground/10 hover:text-foreground"
        >
          {expanded ? "Collapse" : "Expand"}
          <svg
            width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
            style={{ transform: expanded ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 300ms" }}
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Browser chrome */}
      <div className="rounded-2xl border border-foreground/12 bg-card overflow-hidden">
        {/* Fake browser bar */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-foreground/8 bg-card-2">
          <div className="flex gap-1.5">
            <span className="h-3 w-3 rounded-full bg-foreground/20" />
            <span className="h-3 w-3 rounded-full bg-foreground/20" />
            <span className="h-3 w-3 rounded-full bg-foreground/20" />
          </div>
          <div className="flex-1 rounded-md bg-foreground/8 px-3 py-1 text-xs text-foreground/35 font-mono">
            {title.toLowerCase().replace(/\s+/g, "-")}.demo
          </div>
          <a
            href={demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-foreground/40 transition hover:text-foreground/70"
          >
            ↗ open
          </a>
        </div>

        {/* iframe */}
        <div
          style={{ height: expanded ? "80vh" : "520px", transition: "height 400ms cubic-bezier(0.16,1,0.3,1)" }}
          className="relative"
        >
          <iframe
            src={demoUrl}
            title={`${title} live demo`}
            className="absolute inset-0 w-full h-full border-0 bg-white"
            loading="lazy"
            sandbox="allow-scripts allow-same-origin allow-forms"
          />
        </div>
      </div>

      <p className="mt-3 text-center text-xs text-foreground/30">
        Scroll and interact inside the preview. Backend features (auth, database) require the full server.
      </p>
    </div>
  );
}
