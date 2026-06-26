import { existsSync } from "node:fs";
import { join } from "node:path";
import { Container } from "@/components/Container";
import { certifications } from "@/content/certifications";

function isPublicFileAvailable(url: string) {
  if (!url.startsWith("/")) return false;
  const fullPath = join(process.cwd(), "public", url.replace(/^\//, ""));
  return existsSync(fullPath);
}

/* Accent color cycling for badge numbers */
const ACCENT_PAIRS: [string, string][] = [
  ["var(--accent)",  "color-mix(in oklch, var(--accent) 14%, transparent)"],
  ["var(--accent-2)","color-mix(in oklch, var(--accent-2) 14%, transparent)"],
  ["#a78bfa",        "color-mix(in oklch, #a78bfa 14%, transparent)"],
  ["var(--accent)",  "color-mix(in oklch, var(--accent) 14%, transparent)"],
  ["var(--accent-2)","color-mix(in oklch, var(--accent-2) 14%, transparent)"],
  ["#a78bfa",        "color-mix(in oklch, #a78bfa 14%, transparent)"],
];

export function CertificationsSection() {
  return (
    <section id="certifications">
      <Container className="py-20 sm:py-28">

        {/* ── Header ── */}
        <div className="reveal" data-reveal data-visible="false">
          <span className="section-label">Credentials</span>
          <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
            <span className="gradient-text">Certifications</span>
          </h2>
          <p className="mt-4 max-w-xl text-foreground/58 leading-7">
            Credentials and badges that back up the work.
          </p>
        </div>

        {/* ── Grid ── */}
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 reveal" data-reveal data-visible="false">
          {certifications.map((c, idx) => {
            const available = isPublicFileAvailable(c.pdfUrl);
            const [color, bg] = ACCENT_PAIRS[idx % ACCENT_PAIRS.length];

            return (
              <article
                key={c.title}
                className="card-spotlight glow-border flex flex-col justify-between rounded-2xl border border-foreground/12 bg-card p-6 transition-colors hover:bg-card-2"
              >
                {/* Badge number */}
                <div className="flex items-start justify-between gap-3">
                  <span
                    className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-xs font-bold"
                    style={{ color, background: bg }}
                  >
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Text */}
                <div className="mt-4 flex-1">
                  <h3 className="text-sm font-semibold tracking-tight text-foreground">
                    {c.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-foreground/62">
                    {c.description}
                  </p>
                </div>

                {/* CTA */}
                <div className="mt-6">
                  {available ? (
                    <a
                      href={c.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-9 items-center justify-center rounded-full border border-foreground/12 bg-foreground/5 px-4 text-xs font-medium text-foreground/75 transition-all hover:border-accent/35 hover:text-foreground hover:shadow-[0_0_10px_color-mix(in_oklch,var(--accent)_12%,transparent)]"
                    >
                      View PDF
                    </a>
                  ) : (
                    <span className="text-xs text-foreground/38">PDF coming soon</span>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
