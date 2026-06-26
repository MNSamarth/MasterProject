import { Container } from "@/components/Container";
import { site } from "@/content/site";

export function Footer() {
  return (
    <footer className="border-t border-foreground/8">
      <Container className="py-10">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          {/* Left: brand + copyright */}
          <div className="flex items-center gap-3">
            <span
              aria-hidden
              className="h-2 w-2 rounded-full"
              style={{
                background: "linear-gradient(135deg, var(--accent), var(--accent-2))",
                boxShadow: "0 0 8px color-mix(in oklch, var(--accent) 45%, transparent)",
              }}
            />
            <p className="text-sm text-foreground/50">
              © {new Date().getFullYear()}{" "}
              <span className="text-foreground/70 font-medium">{site.name}</span>
            </p>
          </div>

          {/* Center: links */}
          <div className="flex items-center gap-5 text-sm text-foreground/45">
            <a
              href={site.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:text-foreground/75"
            >
              GitHub
            </a>
            <a
              href={site.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:text-foreground/75"
            >
              LinkedIn
            </a>
            <a
              href={`mailto:${site.email}`}
              className="transition hover:text-foreground/75"
            >
              Email
            </a>
          </div>

          {/* Right: built-with */}
          <p className="text-sm text-foreground/35">
            Built with{" "}
            <span
              className="font-medium"
              style={{ color: "var(--accent)" }}
            >
              Next.js
            </span>{" "}
            &{" "}
            <span
              className="font-medium"
              style={{ color: "var(--accent-2)" }}
            >
              Three.js
            </span>
          </p>
        </div>
      </Container>
    </footer>
  );
}
