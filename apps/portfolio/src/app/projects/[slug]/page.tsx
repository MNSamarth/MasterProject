import { projects } from "@/content/projects";
import { Container } from "@/components/Container";
import { notFound } from "next/navigation";
import Link from "next/link";

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

  return (
    <div className="min-h-dvh bg-transparent text-foreground">
      <Container className="py-16 sm:py-20">
        <div className="flex flex-col gap-3">
          <p className="text-sm text-foreground/70">Project</p>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {project.title}
          </h1>
          <p className="max-w-2xl text-pretty leading-8 text-foreground/75">
            {project.summary}
          </p>
        </div>

        <div className="mt-10 flex flex-wrap gap-2">
          {project.stack?.map((t) => (
            <span
              key={t}
              className="rounded-full border border-foreground/15 bg-foreground/5 px-3 py-1 text-xs text-foreground/80"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          {project.liveUrl ? (
            <a
              className="inline-flex h-12 items-center justify-center rounded-full bg-foreground px-6 text-background transition hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground/30"
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Open live
            </a>
          ) : null}
          <Link
            className="inline-flex h-12 items-center justify-center rounded-full border border-foreground/15 bg-foreground/5 px-6 text-foreground transition hover:bg-foreground/10 hover:border-foreground/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground/30"
            href="/#projects"
          >
            Back to projects
          </Link>
        </div>

        <div className="mt-12 rounded-2xl border border-foreground/15 bg-card p-6 text-sm text-foreground/70">
          <p className="font-medium text-foreground">Next step</p>
          <p className="mt-2">
            Add a proper case study here: goals, constraints, approach, key
            interactions, and what you’d improve.
          </p>
        </div>
      </Container>
    </div>
  );
}
