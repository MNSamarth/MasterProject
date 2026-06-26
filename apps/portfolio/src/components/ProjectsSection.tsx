"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/Container";
import { projects, type Project } from "@/content/projects";

/* ── Per-project gradient fallback ──────────────────────── */
const VISUALS: Record<string, string> = {
  "promptquest":        "linear-gradient(145deg, oklch(0.16 0.26 285) 0%, oklch(0.11 0.16 248) 100%)",
  "eventsearch":        "linear-gradient(145deg, oklch(0.14 0.22 198) 0%, oklch(0.16 0.18 162) 100%)",
  "isl-recognition":   "linear-gradient(145deg, oklch(0.16 0.20 155) 0%, oklch(0.12 0.16 185) 100%)",
  "anpr":              "linear-gradient(145deg, oklch(0.18 0.24 45)  0%, oklch(0.12 0.18 28)  100%)",
  "automail-ai":       "linear-gradient(145deg, oklch(0.16 0.20 285) 0%, oklch(0.14 0.18 320) 100%)",
  "stockoporto":       "linear-gradient(145deg, oklch(0.14 0.20 145) 0%, oklch(0.18 0.15 168) 100%)",
  "template-matching": "linear-gradient(145deg, oklch(0.14 0.16 258) 0%, oklch(0.18 0.20 288) 100%)",
  "easydine":          "linear-gradient(145deg, oklch(0.18 0.22 35)  0%, oklch(0.14 0.18 55)  100%)",
};

const SMALL_ACCENTS = [
  "linear-gradient(to right, var(--accent), var(--accent-2))",
  "linear-gradient(to right, oklch(0.62 0.24 48), oklch(0.68 0.20 65))",
  "linear-gradient(to right, oklch(0.60 0.22 155), oklch(0.65 0.18 178))",
  "linear-gradient(to right, oklch(0.55 0.20 325), oklch(0.60 0.22 285))",
];

/* ── Project visual: screenshot + gradient fallback ─────── */
function ProjectVisual({ slug, title, imageSrc }: { slug: string; title: string; imageSrc?: string }) {
  const gradient = VISUALS[slug] ?? VISUALS["promptquest"];
  const initials = title.split(" ").map((w) => w[0]).slice(0, 3).join("").toUpperCase();

  return (
    <div className="relative aspect-[16/9] w-full overflow-hidden select-none group/visual">
      {/* Gradient base (always shown) */}
      <div className="absolute inset-0" style={{ background: gradient }} />

      {/* Subtle grid texture */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Glow orbs */}
      <div className="absolute -top-12 -right-12 h-56 w-56 rounded-full" style={{ background: "radial-gradient(circle, rgba(255,255,255,0.09) 0%, transparent 70%)" }} />
      <div className="absolute -bottom-8 -left-8 h-40 w-40 rounded-full"  style={{ background: "radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%)" }} />

      {/* Monogram watermark (shown when no image, or image loading) */}
      {!imageSrc && (
        <div className="absolute bottom-1 right-4 font-black text-white/[0.07] leading-none" style={{ fontSize: "5.5rem", letterSpacing: "-0.04em" }}>
          {initials}
        </div>
      )}

      {/* Screenshot — fades in on top of gradient */}
      {imageSrc && (
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover opacity-0 group-hover/visual:opacity-100 transition-opacity duration-500"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      )}

      {/* Bottom fade to card */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(to bottom, transparent 48%, color-mix(in oklch, var(--card) 96%, transparent) 100%)",
        }}
      />
    </div>
  );
}

/* ── Tilt + spotlight card wrapper ─────────────────────── */
function TiltCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const dx   = (e.clientX - rect.left - rect.width  / 2) / (rect.width  / 2);
    const dy   = (e.clientY - rect.top  - rect.height / 2) / (rect.height / 2);
    el.style.transform = `perspective(900px) rotateX(${-dy * 3.5}deg) rotateY(${dx * 3.5}deg) scale(1.012)`;
    el.style.setProperty("--mx", `${((e.clientX - rect.left) / rect.width)  * 100}%`);
    el.style.setProperty("--my", `${((e.clientY - rect.top)  / rect.height) * 100}%`);
  };

  const handleMouseLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)";
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`card-spotlight glow-border ${className}`}
      style={{ transition: "transform 300ms cubic-bezier(0.16, 1, 0.3, 1), border-color 280ms, box-shadow 280ms" }}
    >
      {children}
    </div>
  );
}

/* ── Featured project card ──────────────────────────────── */
function FeaturedCard({ p }: { p: Project }) {
  return (
    <TiltCard className="overflow-hidden rounded-2xl border border-foreground/12 bg-card">
      <ProjectVisual slug={p.slug} title={p.title} imageSrc={p.imageSrc} />

      <div className="relative z-[2] p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold tracking-tight text-foreground">{p.title}</h3>
            <p className="mt-2 text-sm leading-6 text-foreground/65 text-pretty">{p.summary}</p>
          </div>
          {p.year && (
            <span
              className="shrink-0 rounded-full px-2.5 py-1 text-[0.65rem] font-semibold tracking-widest"
              style={{
                background: "color-mix(in oklch, var(--accent) 12%, transparent)",
                color: "var(--accent)",
                border: "1px solid color-mix(in oklch, var(--accent) 22%, transparent)",
              }}
            >
              {p.year}
            </span>
          )}
        </div>

        {p.stack && p.stack.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {p.stack.map((t) => (
              <span key={t} className="rounded-full border border-foreground/12 bg-foreground/5 px-3 py-0.5 text-[0.7rem] text-foreground/72">
                {t}
              </span>
            ))}
          </div>
        )}

        <div className="mt-6 flex items-center gap-4 text-sm">
          <Link href={`/projects/${p.slug}`} className="text-foreground/65 underline-offset-4 transition hover:text-foreground hover:underline">
            Case study
          </Link>
          {p.demoUrl && (
            <Link
              href={`/projects/${p.slug}`}
              className="font-semibold underline-offset-4 transition hover:underline"
              style={{ color: "var(--accent-2)" }}
            >
              Live demo ↗
            </Link>
          )}
          {p.liveUrl && (
            <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="font-semibold underline-offset-4 transition hover:underline" style={{ color: "var(--accent)" }}>
              Live ↗
            </a>
          )}
          {p.repoUrl && (
            <a href={p.repoUrl} target="_blank" rel="noopener noreferrer" className="text-foreground/65 underline-offset-4 transition hover:text-foreground hover:underline">
              GitHub
            </a>
          )}
        </div>
      </div>
    </TiltCard>
  );
}

/* ── Small project card (horizontal scroll) ─────────────── */
function SmallCard({ p, index }: { p: Project; index: number }) {
  const accent = SMALL_ACCENTS[index % SMALL_ACCENTS.length];
  return (
    <TiltCard className="h-full rounded-2xl border border-foreground/12 bg-card p-5">
      <div className="relative z-[2] flex flex-col h-full">
        <div className="h-[2px] w-10 rounded-full mb-4 shrink-0" style={{ background: accent }} />

        <div className="flex items-start justify-between gap-3">
          <h4 className="text-sm font-semibold tracking-tight text-foreground leading-snug">{p.title}</h4>
          {p.year && <span className="shrink-0 text-[0.65rem] text-foreground/45 mt-0.5">{p.year}</span>}
        </div>

        <p className="mt-2.5 text-sm leading-6 text-foreground/62 text-pretty flex-1">{p.summary}</p>

        {p.stack && p.stack.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {p.stack.slice(0, 3).map((t) => (
              <span key={t} className="rounded-full border border-foreground/10 bg-foreground/4 px-2.5 py-0.5 text-[0.65rem] text-foreground/65">
                {t}
              </span>
            ))}
          </div>
        )}

        <div className="mt-4 flex items-center gap-4">
          <Link href={`/projects/${p.slug}`} className="text-[0.78rem] text-foreground/60 underline-offset-4 transition hover:text-foreground hover:underline">
            Case study
          </Link>
          {p.repoUrl && (
            <a href={p.repoUrl} target="_blank" rel="noopener noreferrer" className="text-[0.78rem] text-foreground/60 underline-offset-4 transition hover:text-foreground hover:underline">
              GitHub
            </a>
          )}
        </div>
      </div>
    </TiltCard>
  );
}

/* ── Section ─────────────────────────────────────────────── */
export function ProjectsSection() {
  const featured = projects.filter((p) => p.featured);
  const rest     = projects.filter((p) => !p.featured);

  return (
    <section id="projects">
      <Container className="py-20 sm:py-28">
        <div className="mb-12 reveal" data-reveal data-visible="false">
          <span className="section-label">Selected work</span>
          <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
            <span className="gradient-text">Projects</span>{" "}
            <span className="text-foreground">that ship</span>
          </h2>
          <p className="mt-4 max-w-xl text-foreground/60 leading-7">
            High-signal work with crisp outcomes — from AI/ML systems to full-stack products. Hover cards to preview.
          </p>
        </div>

        {/* Featured 2-col grid */}
        <div className="grid gap-5 lg:grid-cols-2">
          {featured.map((p) => (
            <div key={p.slug} className="reveal" data-reveal data-visible="false">
              <FeaturedCard p={p} />
            </div>
          ))}
        </div>

        {/* More projects — horizontal snap scroll */}
        {rest.length > 0 && (
          <div className="mt-16 reveal" data-reveal data-visible="false">
            <div className="flex items-center gap-4 mb-8">
              <span className="section-label">More work</span>
            </div>

            <div className="overflow-x-auto scrollbar-hidden -mx-6 px-6">
              <div className="flex gap-4" style={{ width: "max-content", paddingRight: "24px" }}>
                {rest.map((p, i) => (
                  <div key={p.slug} className="w-72 sm:w-80 shrink-0" style={{ height: "260px" }}>
                    <SmallCard p={p} index={i} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}
