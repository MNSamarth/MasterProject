"use client";

import { useMemo, useState } from "react";
import { Container } from "@/components/Container";
import { site } from "@/content/site";

export function ContactSection() {
  const [name,    setName]    = useState("");
  const [email,   setEmail]   = useState("");
  const [message, setMessage] = useState("");

  const mailtoHref = useMemo(() => {
    const subject = `Portfolio inquiry from ${name}`.trim();
    const body    = [`Name: ${name}`, `Email: ${email}`, "", message].join("\n");
    return `mailto:${encodeURIComponent(site.email)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }, [name, email, message]);

  const inputClass =
    "mt-2 h-11 w-full rounded-xl border border-foreground/12 bg-background/15 px-4 text-sm text-foreground placeholder:text-foreground/35 outline-none transition-all focus:border-accent/50 focus:shadow-[0_0_0_3px_color-mix(in_oklch,var(--accent)_12%,transparent)]";

  return (
    <section id="contact">
      <Container className="py-20 sm:py-28">

        {/* ── Dramatic header ── */}
        <div className="reveal" data-reveal data-visible="false">
          <span className="section-label">Get in touch</span>
          <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl leading-[0.92]">
            <span className="text-foreground">Have a project</span>
            <br />
            <span className="gradient-text">in mind?</span>
          </h2>
          <p className="mt-5 max-w-lg text-foreground/58 leading-7">
            I&apos;m always open to new opportunities, collaborations, and interesting problems.
            Let&apos;s build something great together.
          </p>
        </div>

        {/* ── Big email link ── */}
        <div className="mt-10 reveal" data-reveal data-visible="false">
          <a
            href={`mailto:${site.email}`}
            className="group inline-flex items-center gap-3 text-xl font-semibold text-foreground/80 transition-colors hover:text-foreground sm:text-2xl"
          >
            <span
              aria-hidden
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-foreground/12 transition-all group-hover:border-accent/40 group-hover:shadow-[0_0_14px_color-mix(in_oklch,var(--accent)_18%,transparent)]"
              style={{ background: "color-mix(in oklch, var(--accent) 8%, transparent)" }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--accent)" }}>
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            </span>
            <span className="underline-offset-4 group-hover:underline">{site.email}</span>
          </a>
        </div>

        {/* ── Two-col layout: form + quick links ── */}
        <div className="mt-12 grid gap-8 md:grid-cols-2 reveal" data-reveal data-visible="false">

          {/* Contact form */}
          <div className="card-spotlight glow-border rounded-2xl border border-foreground/12 bg-card p-6">
            <p className="text-sm font-semibold text-foreground/80 mb-5">Send a message</p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                window.location.href = mailtoHref;
              }}
              className="space-y-4"
            >
              <div>
                <label className="text-xs font-medium text-foreground/60">Name</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={inputClass}
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-foreground/60">Email</label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={inputClass}
                  placeholder="you@example.com"
                  type="email"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-foreground/60">Message</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className={`${inputClass} h-auto min-h-[130px] resize-y pt-3`}
                  placeholder="What are you looking to build?"
                />
              </div>

              <button
                type="submit"
                className="inline-flex h-11 w-full items-center justify-center rounded-full text-sm font-semibold text-white transition-all hover:scale-[1.02] hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                style={{
                  background: "linear-gradient(135deg, var(--accent) 0%, var(--accent-2) 100%)",
                  boxShadow: "0 0 24px color-mix(in oklch, var(--accent) 22%, transparent)",
                }}
              >
                Send message →
              </button>
            </form>
          </div>

          {/* Quick connect */}
          <div className="flex flex-col gap-4">
            {/* GitHub */}
            <a
              href={site.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="card-spotlight glow-border group flex items-center gap-4 rounded-2xl border border-foreground/12 bg-card p-5 transition-colors hover:bg-card-2"
            >
              <span
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-foreground/12 transition-all group-hover:border-accent/35"
                style={{ background: "color-mix(in oklch, var(--accent) 7%, transparent)" }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{ color: "var(--accent)" }}>
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </span>
              <div>
                <p className="text-sm font-semibold text-foreground">GitHub</p>
                <p className="text-xs text-foreground/50 mt-0.5">MNSamarth</p>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-auto text-foreground/30 group-hover:text-foreground/60 transition-colors">
                <path d="M7 17L17 7M7 7h10v10" />
              </svg>
            </a>

            {/* LinkedIn */}
            <a
              href={site.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="card-spotlight glow-border group flex items-center gap-4 rounded-2xl border border-foreground/12 bg-card p-5 transition-colors hover:bg-card-2"
            >
              <span
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-foreground/12 transition-all group-hover:border-accent-2/35"
                style={{ background: "color-mix(in oklch, var(--accent-2) 7%, transparent)" }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{ color: "var(--accent-2)" }}>
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </span>
              <div>
                <p className="text-sm font-semibold text-foreground">LinkedIn</p>
                <p className="text-xs text-foreground/50 mt-0.5">samarthmandagere</p>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-auto text-foreground/30 group-hover:text-foreground/60 transition-colors">
                <path d="M7 17L17 7M7 7h10v10" />
              </svg>
            </a>

            {/* Location note */}
            <div className="rounded-2xl border border-foreground/10 bg-card p-5">
              <div className="flex items-center gap-2 text-foreground/55 text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--accent)", flexShrink: 0 }}>
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                Based in{" "}
                <span className="text-foreground/80 font-medium">{site.location}</span>
              </div>
              <p className="mt-2 text-xs text-foreground/42 leading-5">
                Open to remote opportunities worldwide and on-site in Los Angeles.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
