"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Container } from "@/components/Container";
import { site } from "@/content/site";
import { HeroScene } from "@/components/hero/HeroScene";

const STATS = [
  { value: "5",   label: "Internships" },
  { value: "8+",  label: "Projects shipped" },
  { value: "1st", label: "Buildathon win" },
] as const;

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 22, filter: "blur(6px)" },
  show:   {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const contentY        = useTransform(scrollYProgress, [0, 1], ["0%", "-18%"]);
  const contentOpacity  = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const indicatorOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <section ref={sectionRef} id="top" className="relative min-h-dvh overflow-hidden flex items-center">
      {/* ── Full-screen 3D canvas ── */}
      <HeroScene className="absolute inset-0 z-0" />

      {/* ── Gradient mask — makes left portion readable ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(to right, var(--background) 0%, var(--background) 30%, color-mix(in oklch, var(--background) 65%, transparent) 58%, transparent 100%), linear-gradient(to top, var(--background) 0%, transparent 18%)",
        }}
      />

      {/* ── Hero content (parallaxes up on scroll) ── */}
      <Container className="relative z-[2] py-28 lg:py-36">
        <motion.div style={{ y: contentY, opacity: contentOpacity }}>
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="max-w-xl lg:max-w-2xl"
          >
            {/* Role */}
            <motion.p variants={fadeUp} className="section-label">
              {site.role}
            </motion.p>

            {/* Headline */}
            <motion.h1
              variants={fadeUp}
              className="mt-6 font-bold tracking-tight leading-[0.88] text-[clamp(3rem,7.5vw,6.5rem)]"
            >
              <span className="gradient-text">Living</span>{" "}
              <span className="text-foreground">interfaces.</span>
              <br />
              <span className="text-foreground">Useful</span>{" "}
              <span className="gradient-text">software.</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={fadeUp}
              className="mt-7 text-[1.05rem] leading-7 text-foreground/65 max-w-[42ch] text-pretty"
            >
              I&apos;m{" "}
              <span className="text-foreground/90 font-medium">{site.name}</span>{" "}
              — software engineer focused on AI/ML and product-minded frontend.
              I build things that are fast, reliable, and feel right.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={fadeUp}
              className="mt-10 flex flex-col gap-3 sm:flex-row"
            >
              <a
                href="#projects"
                className="inline-flex h-12 items-center justify-center rounded-full px-7 text-sm font-semibold text-white transition-all hover:scale-[1.03] hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                style={{
                  background: "linear-gradient(135deg, var(--accent) 0%, var(--accent-2) 100%)",
                  boxShadow: "0 0 28px color-mix(in oklch, var(--accent) 28%, transparent)",
                }}
              >
                View projects
              </a>
              <a
                href="/resume.pdf"
                className="inline-flex h-12 items-center justify-center rounded-full border border-foreground/15 bg-card px-7 text-sm font-medium text-foreground transition-all hover:border-foreground/30 hover:bg-card-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground/25"
              >
                Resume
              </a>
              <a
                href="#contact"
                className="inline-flex h-12 items-center justify-center rounded-full border border-foreground/10 bg-transparent px-7 text-sm font-medium text-foreground/80 transition-all hover:border-foreground/22 hover:bg-foreground/5 hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground/25"
              >
                Contact
              </a>
            </motion.div>

            {/* Mini stats */}
            <motion.div
              variants={fadeUp}
              className="mt-14 flex items-center gap-8 sm:gap-12"
            >
              {STATS.map(({ value, label }, i) => (
                <div key={label}>
                  <p
                    className="text-3xl font-bold gradient-text tabular-nums"
                    style={{ animationDelay: `${i * 80}ms` }}
                  >
                    {value}
                  </p>
                  <p className="mt-1 text-[0.68rem] tracking-widest text-foreground/45 uppercase">
                    {label}
                  </p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </Container>

      {/* ── Scroll indicator ── */}
      <motion.div
        style={{ opacity: indicatorOpacity }}
        className="absolute bottom-8 left-1/2 z-[2] -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <p className="text-[0.6rem] tracking-[0.25em] uppercase text-foreground/35">Scroll</p>
        <div
          className="scroll-bounce"
          style={{ color: "var(--accent)" }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </div>
      </motion.div>

      {/* ── Hint text on the 3D canvas side ── */}
      <p
        aria-hidden
        className="absolute bottom-8 right-6 z-[2] hidden lg:block text-[0.58rem] tracking-[0.24em] uppercase text-foreground/25"
      >
        Click / drag the form
      </p>
    </section>
  );
}
