import { site } from "@/content/site";
import { Container } from "@/components/Container";

const NAV_LINKS = [
  { href: "#projects",       label: "Projects" },
  { href: "#about",          label: "About" },
  { href: "#experience",     label: "Experience" },
  { href: "#certifications", label: "Certifications" },
  { href: "#contact",        label: "Contact" },
] as const;

export function Nav() {
  return (
    <header
      className="sticky top-0 z-50 backdrop-blur-xl"
      style={{
        background: "color-mix(in oklch, var(--background) 75%, transparent)",
        borderBottom: "1px solid color-mix(in oklch, var(--foreground) 7%, transparent)",
        boxShadow: "0 1px 0 0 color-mix(in oklch, var(--accent) 5%, transparent)",
        transition: "background 350ms ease",
      }}
    >
      <Container className="flex h-16 items-center justify-between gap-6">
        {/* Logotype */}
        <a
          href="#top"
          className="group flex items-center gap-2.5 text-sm font-semibold tracking-tight text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        >
          <span
            aria-hidden
            className="h-2 w-2 rounded-full transition-all duration-300 group-hover:scale-125"
            style={{
              background: "linear-gradient(135deg, var(--accent), var(--accent-2))",
              boxShadow: "0 0 8px color-mix(in oklch, var(--accent) 50%, transparent)",
            }}
          />
          <span>{site.name}</span>
        </a>

        {/* Desktop links */}
        <nav className="hidden items-center gap-1 sm:flex">
          {NAV_LINKS.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="rounded-lg px-3 py-1.5 text-sm text-foreground/65 transition-all duration-200 hover:bg-foreground/6 hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              {label}
            </a>
          ))}

          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-3 inline-flex h-9 items-center justify-center gap-1.5 rounded-full border border-foreground/15 bg-card px-4 text-sm font-medium text-foreground transition-all hover:border-accent/40 hover:bg-card-2 hover:shadow-[0_0_14px_color-mix(in_oklch,var(--accent)_14%,transparent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Resume
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="opacity-50">
              <path d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </a>
        </nav>

        {/* Mobile: resume only */}
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="sm:hidden inline-flex h-9 items-center justify-center rounded-full border border-foreground/15 bg-card px-4 text-sm font-medium text-foreground"
        >
          Resume ↗
        </a>
      </Container>
    </header>
  );
}
