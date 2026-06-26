import { projects } from "@/content/projects";
import { Container } from "@/components/Container";
import Link from "next/link";

export default function ProjectsPage() {
  return (
    <div className="min-h-dvh bg-transparent text-foreground">
      <Container className="py-16 sm:py-20">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Projects
        </h1>
        <p className="mt-3 text-foreground/70">
          Case-study pages hosted on the portfolio domain.
        </p>

        <div className="mt-10 grid gap-4">
          {projects.map((p) => (
            <Link
              key={p.slug}
              href={`/projects/${p.slug}`}
              className="rounded-2xl border border-foreground/15 bg-card p-5 transition hover:bg-card-2 hover:border-foreground/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground/30"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-lg font-semibold tracking-tight">
                    {p.title}
                  </div>
                  <div className="mt-1 text-sm text-foreground/70">
                    {p.summary}
                  </div>
                </div>
                {p.year ? (
                  <span className="text-xs text-foreground/60">{p.year}</span>
                ) : null}
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </div>
  );
}
