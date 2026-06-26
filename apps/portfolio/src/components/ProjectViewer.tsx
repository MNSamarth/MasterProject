"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import { projects, type Project } from "@/content/projects";

/* ── URL helpers ─────────────────────────────────────── */
function setAppParam(slug: string | null) {
  const url = new URL(window.location.href);
  if (slug) {
    url.searchParams.set("app", slug);
  } else {
    url.searchParams.delete("app");
  }
  history.replaceState(null, "", url.toString());
}

function getAppParam(): Project | null {
  const slug = new URLSearchParams(window.location.search).get("app");
  if (!slug) return null;
  return projects.find((p) => p.slug === slug && (p.liveUrl || p.demoUrl)) ?? null;
}

/* ── Context ─────────────────────────────────────────── */
type ViewerCtx = { open: (project: Project) => void; close: () => void };
const Ctx = createContext<ViewerCtx>({ open: () => {}, close: () => {} });
export const useViewer = () => useContext(Ctx);

/* ── Provider + Overlay ──────────────────────────────── */
export function ProjectViewerProvider({ children }: { children: ReactNode }) {
  const [project, setProject] = useState<Project | null>(null);
  const [visible, setVisible] = useState(false);

  /* Restore from URL on first mount */
  useEffect(() => {
    const p = getAppParam();
    if (p) {
      setProject(p);
      requestAnimationFrame(() => setVisible(true));
    }
  }, []);

  const open = useCallback((p: Project) => {
    setProject(p);
    setAppParam(p.slug);
    requestAnimationFrame(() => setVisible(true));
  }, []);

  const close = useCallback(() => {
    setVisible(false);
    setAppParam(null);
    setTimeout(() => setProject(null), 400);
  }, []);

  /* Escape key */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [close]);

  /* Lock body scroll while viewer is open */
  useEffect(() => {
    document.body.style.overflow = project ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [project]);

  const src = project?.liveUrl ?? project?.demoUrl ?? "";

  return (
    <Ctx.Provider value={{ open, close }}>
      {children}

      {project && (
        <div
          aria-modal
          role="dialog"
          aria-label={`${project.title} live demo`}
          className="fixed inset-0 z-[9500] flex flex-col"
          style={{
            background: "var(--background)",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(40px)",
            transition: "opacity 380ms cubic-bezier(0.16,1,0.3,1), transform 380ms cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          {/* ── Top bar ── */}
          <div
            className="flex shrink-0 items-center gap-4 px-5 h-14 border-b"
            style={{
              borderColor: "color-mix(in oklch, var(--foreground) 8%, transparent)",
              background: "color-mix(in oklch, var(--card) 90%, transparent)",
              backdropFilter: "blur(16px)",
            }}
          >
            {/* Back / Close */}
            <button
              onClick={close}
              className="flex items-center gap-2 rounded-full border border-foreground/15 bg-card px-3 py-1.5 text-xs font-medium text-foreground/70 transition hover:text-foreground hover:border-foreground/30"
            >
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M19 12H5M5 12l7-7M5 12l7 7" />
              </svg>
              Back
            </button>

            <div className="h-5 w-px" style={{ background: "color-mix(in oklch, var(--foreground) 12%, transparent)" }} />

            <span className="text-sm font-semibold text-foreground tracking-tight">{project.title}</span>

            <div className="hidden sm:flex gap-1.5">
              {project.stack?.slice(0, 3).map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-foreground/10 bg-foreground/5 px-2.5 py-0.5 text-[0.65rem] text-foreground/65"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="flex-1" />

            {src && (
              <a
                href={src}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded-full border border-foreground/15 bg-card px-3 py-1.5 text-xs font-medium text-foreground/70 transition hover:text-foreground hover:border-foreground/30"
              >
                Open in new tab
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </a>
            )}
          </div>

          {/* ── iframe ── */}
          <div className="flex-1 relative">
            {src ? (
              <iframe
                src={src}
                title={`${project.title} live`}
                className="absolute inset-0 w-full h-full border-0"
                allow="fullscreen"
                loading="eager"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-foreground/40 text-sm">
                No live URL configured for this project.
              </div>
            )}
          </div>
        </div>
      )}
    </Ctx.Provider>
  );
}
