import { projects } from "@/content/projects";
import { Container } from "@/components/Container";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ProjectDemo } from "@/components/ProjectDemo";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const { caseStudy, metrics } = project;

  return (
    <div className="min-h-dvh bg-transparent text-foreground">
      {/* ── Back nav ── */}
      <div className="border-b border-foreground/8">
        <Container className="py-4 flex items-center gap-4">
          <Link
            href="/#projects"
            className="flex items-center gap-2 text-sm text-foreground/50 transition hover:text-foreground/80"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M5 12l7-7M5 12l7 7" />
            </svg>
            Back
          </Link>
          <span className="text-foreground/20">/</span>
          <span className="text-sm text-foreground/40">{project.title}</span>
        </Container>
      </div>

      <Container className="py-16 sm:py-20">

        {/* ── Hero ── */}
        <div className="max-w-3xl">
          <span className="section-label">Case study</span>
          <h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl leading-tight">
            {project.title}
          </h1>
          <p className="mt-5 text-lg leading-8 text-foreground/65 text-pretty max-w-2xl">
            {project.summary}
          </p>
        </div>

        {/* ── Meta row ── */}
        <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
          {/* Stack tags */}
          <div className="flex flex-wrap gap-2">
            {project.stack?.map((t) => (
              <span
                key={t}
                className="rounded-full border border-foreground/15 bg-foreground/5 px-3 py-1 text-xs text-foreground/80"
              >
                {t}
              </span>
            ))}
          </div>

          {/* Links */}
          <div className="flex items-center gap-4 ml-auto">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 items-center gap-2 rounded-full px-5 text-sm font-semibold text-white transition-all hover:brightness-110"
                style={{ background: "linear-gradient(135deg, var(--accent) 0%, var(--accent-2) 100%)" }}
              >
                Live ↗
              </a>
            )}
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 items-center gap-2 rounded-full border border-foreground/15 bg-foreground/5 px-5 text-sm text-foreground/80 transition hover:bg-foreground/10 hover:border-foreground/25"
              >
                GitHub
              </a>
            )}
          </div>
        </div>

        {/* ── Metrics ── */}
        {metrics && metrics.length > 0 && (
          <div className="mt-12 grid grid-cols-3 gap-4 sm:grid-cols-3 max-w-lg">
            {metrics.map(({ value, label }) => (
              <div
                key={label}
                className="rounded-2xl border border-foreground/10 bg-card p-5 text-center"
              >
                <p className="text-2xl font-bold gradient-text tabular-nums">{value}</p>
                <p className="mt-1 text-[0.68rem] tracking-wide uppercase text-foreground/45">{label}</p>
              </div>
            ))}
          </div>
        )}

        {/* ── Project image ── */}
        {project.imageSrc && (
          <div className="mt-12 overflow-hidden rounded-2xl border border-foreground/12">
            <Image
              src={project.imageSrc}
              alt={project.title}
              width={1200}
              height={675}
              className="w-full object-cover"
              priority
            />
          </div>
        )}

        {/* ── Case study content ── */}
        {caseStudy && (
          <div className="mt-16 grid gap-12 lg:grid-cols-3">

            {/* Main narrative */}
            <div className="lg:col-span-2 space-y-10">
              <div>
                <h2 className="text-xs tracking-[0.2em] uppercase text-foreground/40 font-semibold mb-3">
                  The Challenge
                </h2>
                <p className="text-[1.02rem] leading-8 text-foreground/72 text-pretty">
                  {caseStudy.challenge}
                </p>
              </div>

              <div>
                <h2 className="text-xs tracking-[0.2em] uppercase text-foreground/40 font-semibold mb-3">
                  Approach
                </h2>
                <p className="text-[1.02rem] leading-8 text-foreground/72 text-pretty">
                  {caseStudy.approach}
                </p>
              </div>

              <div>
                <h2 className="text-xs tracking-[0.2em] uppercase text-foreground/40 font-semibold mb-3">
                  Outcome
                </h2>
                <p className="text-[1.02rem] leading-8 text-foreground/72 text-pretty">
                  {caseStudy.outcome}
                </p>
              </div>

              {/* Additional sections */}
              {caseStudy.sections?.map((s) => (
                <div key={s.heading}>
                  <h2 className="text-xs tracking-[0.2em] uppercase text-foreground/40 font-semibold mb-3">
                    {s.heading}
                  </h2>
                  <p className="text-[1.02rem] leading-8 text-foreground/72 text-pretty">
                    {s.body}
                  </p>
                </div>
              ))}
            </div>

            {/* Sidebar */}
            <aside className="space-y-6">
              <div className="rounded-2xl border border-foreground/10 bg-card p-6">
                <p className="text-xs tracking-[0.2em] uppercase text-foreground/40 font-semibold mb-4">
                  Stack
                </p>
                <ul className="space-y-2">
                  {project.stack?.map((t) => (
                    <li key={t} className="flex items-center gap-2 text-sm text-foreground/70">
                      <span className="h-1 w-1 rounded-full shrink-0" style={{ background: "var(--accent)" }} />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>

              {project.repoUrl && (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-2xl border border-foreground/10 bg-card p-5 transition hover:bg-card-2 hover:border-foreground/20 group"
                >
                  <div>
                    <p className="text-xs tracking-[0.2em] uppercase text-foreground/40 font-semibold">Source</p>
                    <p className="mt-1 text-sm text-foreground/70">View on GitHub</p>
                  </div>
                  <svg
                    width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                    className="text-foreground/40 transition group-hover:text-foreground/70 group-hover:translate-x-0.5"
                  >
                    <path d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </a>
              )}

              {project.year && (
                <div className="rounded-2xl border border-foreground/10 bg-card p-5">
                  <p className="text-xs tracking-[0.2em] uppercase text-foreground/40 font-semibold">Year</p>
                  <p className="mt-1 text-2xl font-bold gradient-text">{project.year}</p>
                </div>
              )}
            </aside>
          </div>
        )}

        {/* ── Live demo iframe ── */}
        {project.demoUrl && (
          <ProjectDemo demoUrl={project.demoUrl} title={project.title} />
        )}

        {/* ── Bottom nav ── */}
        <div className="mt-20 pt-10 border-t border-foreground/10 flex items-center justify-between">
          <Link
            href="/#projects"
            className="inline-flex h-10 items-center gap-2 rounded-full border border-foreground/15 bg-foreground/5 px-5 text-sm text-foreground/70 transition hover:bg-foreground/10 hover:text-foreground"
          >
            ← All projects
          </Link>
          <Link
            href="/projects"
            className="inline-flex h-10 items-center gap-2 rounded-full border border-foreground/15 bg-foreground/5 px-5 text-sm text-foreground/70 transition hover:bg-foreground/10 hover:text-foreground"
          >
            Browse all →
          </Link>
        </div>

      </Container>
    </div>
  );
}
