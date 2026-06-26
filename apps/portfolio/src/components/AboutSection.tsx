import { Container } from "@/components/Container";
import { skills } from "@/content/skills";

/* All skills merged for the marquee */
const ALL_SKILLS = [
  ...skills.languages,
  ...skills.librariesAndFrameworks,
  ...skills.cloudAndTools,
];

const STATS = [
  { value: "5",   label: "Internships",       sub: "across AI, frontend, CV" },
  { value: "8+",  label: "Projects shipped",  sub: "production + research" },
  { value: "1st", label: "Hackathon win",      sub: "Vercel Buildathon" },
  { value: "2",   label: "Published models",  sub: "CV + NLP" },
] as const;

const SKILL_GROUPS = [
  { title: "Languages",             skills: skills.languages },
  { title: "Frameworks & Libraries", skills: skills.librariesAndFrameworks },
  { title: "Cloud & Tools",          skills: skills.cloudAndTools },
] as const;

export function AboutSection() {
  /* Duplicate array for seamless marquee loop */
  const marqueeItems = [...ALL_SKILLS, ...ALL_SKILLS];

  return (
    <section id="about">
      <Container className="py-20 sm:py-28">

        {/* ── Header ── */}
        <div className="reveal" data-reveal data-visible="false">
          <span className="section-label">About me</span>
          <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
            <span className="text-foreground">Building the</span>{" "}
            <span className="gradient-text">future</span>
          </h2>
        </div>

        {/* ── Prose ── */}
        <p className="mt-7 max-w-3xl text-[1.05rem] leading-8 text-foreground/65 text-pretty reveal" data-reveal data-visible="false">
          I&apos;m a software engineer who turns messy problem statements into
          simple, shippable products. I care about reliability, performance,
          and design details — the stuff you feel when a UI is{" "}
          <em className="text-foreground/85 not-italic font-medium">&ldquo;right.&rdquo;</em>{" "}
          I work across the stack: AI/ML pipelines, REST APIs, and modern
          React frontends.
        </p>

        {/* ── Stats ── */}
        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4 reveal" data-reveal data-visible="false">
          {STATS.map(({ value, label, sub }) => (
            <div
              key={label}
              className="rounded-2xl border border-foreground/10 bg-card p-5 transition-colors hover:bg-card-2 glow-border"
            >
              <p className="text-4xl font-bold gradient-text tabular-nums leading-none">
                {value}
              </p>
              <p className="mt-2 text-sm font-semibold text-foreground/80">{label}</p>
              <p className="mt-0.5 text-[0.7rem] text-foreground/42">{sub}</p>
            </div>
          ))}
        </div>

        {/* ── Skill marquee ── */}
        <div className="mt-14 reveal" data-reveal data-visible="false">
          <p className="text-[0.68rem] tracking-[0.22em] uppercase text-foreground/38 mb-4">
            Technologies
          </p>
          <div className="overflow-hidden relative">
            {/* Fade edges */}
            <div
              aria-hidden
              className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-16"
              style={{
                background:
                  "linear-gradient(to right, var(--background), transparent)",
              }}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-16"
              style={{
                background:
                  "linear-gradient(to left, var(--background), transparent)",
              }}
            />

            <div className="marquee-track gap-2 py-1">
              {marqueeItems.map((skill, i) => (
                <span
                  key={`${skill}-${i}`}
                  className="inline-flex shrink-0 items-center rounded-full border border-foreground/12 bg-foreground/5 px-3.5 py-1 text-xs text-foreground/72 mr-2 whitespace-nowrap"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ── Skill columns ── */}
        <div className="mt-10 grid gap-10 sm:grid-cols-3 reveal" data-reveal data-visible="false">
          {SKILL_GROUPS.map(({ title, skills: items }, gi) => (
            <div key={title}>
              <div className="mb-5">
                <p
                  className="text-[0.68rem] tracking-[0.22em] uppercase font-semibold"
                  style={{ color: gi === 1 ? "var(--accent-2)" : "var(--accent)" }}
                >
                  {title}
                </p>
                <div
                  className="mt-2 h-px"
                  style={{
                    background: gi === 1
                      ? "linear-gradient(to right, color-mix(in oklch, var(--accent-2) 45%, transparent), transparent)"
                      : "linear-gradient(to right, color-mix(in oklch, var(--accent) 45%, transparent), transparent)",
                  }}
                />
              </div>
              <ul className="space-y-2.5">
                {items.map((t) => (
                  <li
                    key={t}
                    className="flex items-center gap-2.5 text-sm text-foreground/68 transition-colors hover:text-foreground/90"
                  >
                    <span
                      className="h-1 w-1 shrink-0 rounded-full"
                      style={{ background: gi === 1 ? "var(--accent-2)" : "var(--accent-dim, var(--accent))" }}
                    />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
