import Image from "next/image";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { Container } from "@/components/Container";
import { experience } from "@/content/experience";

function isPublicFileAvailable(url: string) {
  if (!url.startsWith("/")) return false;
  const fullPath = join(process.cwd(), "public", url.replace(/^\//, ""));
  return existsSync(fullPath);
}

export function ExperienceSection() {
  return (
    <section id="experience">
      <Container className="py-20 sm:py-28">

        {/* ── Header ── */}
        <div className="reveal" data-reveal data-visible="false">
          <span className="section-label">Career</span>
          <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
            <span className="text-foreground">Where I&apos;ve</span>{" "}
            <span className="gradient-text">worked</span>
          </h2>
          <p className="mt-4 max-w-xl text-foreground/58 leading-7">
            Internships and hands-on roles where I shipped measurable outcomes.
          </p>
        </div>

        {/* ── Timeline ── */}
        <div className="relative mt-14">
          {/* Vertical accent line */}
          <div
            aria-hidden
            className="absolute left-5 top-2 bottom-0 w-px"
            style={{
              background:
                "linear-gradient(to bottom, var(--accent) 0%, color-mix(in oklch, var(--accent) 15%, transparent) 70%, transparent 100%)",
            }}
          />

          <ol className="space-y-8">
            {experience.map((item, idx) => {
              const hasProof = item.proofUrl ? isPublicFileAvailable(item.proofUrl) : false;

              return (
                <li
                  key={`${item.company}-${idx}`}
                  className="relative pl-14 reveal"
                  data-reveal
                  data-visible="false"
                >
                  {/* Timeline dot */}
                  <div className="timeline-dot absolute left-[0.88rem] top-6 -translate-x-1/2" />

                  {/* Card */}
                  <article className="card-spotlight glow-border rounded-2xl border border-foreground/12 bg-card p-6 transition-colors hover:bg-card-2">
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                      {/* Company info */}
                      <div className="flex items-start gap-4">
                        {item.imageSrc && (
                          <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-xl border border-foreground/12 bg-background/30">
                            <Image
                              src={item.imageSrc}
                              alt={item.company}
                              fill
                              sizes="44px"
                              className="object-contain p-1.5"
                            />
                          </div>
                        )}

                        <div>
                          <h3 className="text-base font-semibold tracking-tight text-foreground">
                            {item.role}
                          </h3>
                          <p className="mt-0.5 text-sm text-foreground/70">
                            {item.company}
                            {item.location ? ` · ${item.location}` : ""}
                          </p>
                          <p className="mt-0.5 text-xs text-foreground/42">{item.dates}</p>
                        </div>
                      </div>

                      {/* Proof PDF */}
                      {hasProof && item.proofUrl && (
                        <a
                          href={item.proofUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex h-9 shrink-0 items-center justify-center rounded-full border border-foreground/12 bg-foreground/5 px-4 text-xs font-medium text-foreground/75 transition-all hover:border-accent/35 hover:text-foreground hover:shadow-[0_0_10px_color-mix(in_oklch,var(--accent)_12%,transparent)]"
                        >
                          View certificate
                        </a>
                      )}
                    </div>

                    <p className="mt-4 max-w-4xl text-sm leading-7 text-foreground/65 text-pretty">
                      {item.summary}
                    </p>

                    {item.tags && item.tags.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {item.tags.map((t) => (
                          <span
                            key={t}
                            className="rounded-full border border-foreground/10 bg-foreground/4 px-3 py-0.5 text-[0.68rem] text-foreground/65"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </article>
                </li>
              );
            })}
          </ol>
        </div>
      </Container>
    </section>
  );
}
