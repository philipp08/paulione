"use client";

import { useReveal } from "@/hooks/useReveal";

const projects = [
  {
    id: "01",
    title: "Luminary",
    category: "Luxury Brand",
    year: "2025",
    description: "Complete visual identity and web presence for a high-end jewellery label.",
    bg: "linear-gradient(135deg, #0f0c1e 0%, #1a1535 50%, #0d0b1a 100%)",
    accent: "#a89cff",
    size: "large",
  },
  {
    id: "02",
    title: "Pulse",
    category: "SaaS Dashboard",
    year: "2024",
    description: "Analytics platform UI built for speed and clarity.",
    bg: "linear-gradient(135deg, #071620 0%, #0d2a3a 50%, #071620 100%)",
    accent: "#5bc8f0",
    size: "medium",
  },
  {
    id: "03",
    title: "Terrain",
    category: "Architecture Firm",
    year: "2024",
    description: "Award-winning portfolio site for a Zürich-based architect.",
    bg: "linear-gradient(135deg, #100d08 0%, #261c0f 50%, #100d08 100%)",
    accent: "#d4b88c",
    size: "medium",
  },
  {
    id: "04",
    title: "Flōw",
    category: "Mobile App",
    year: "2025",
    description: "Meditation app design system with motion-first interactions.",
    bg: "linear-gradient(135deg, #08130e 0%, #0e2a1e 50%, #08130e 100%)",
    accent: "#6ee8a8",
    size: "small",
  },
];

export function WorkGrid() {
  const sectionRef = useReveal();

  return (
    <section
      id="work"
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="bg-[var(--p-bg)] px-6 md:px-10 py-24 md:py-36"
    >
      <div className="max-w-[1400px] mx-auto">
        {/* Section header */}
        <div className="flex items-end justify-between mb-14">
          <div>
            <p className="label-mono reveal">Selected Work</p>
            <h2
              className="reveal reveal-delay-1 font-display font-black text-[var(--p-text)] mt-2"
              style={{ fontSize: "clamp(36px, 5vw, 70px)", letterSpacing: "-0.04em" }}
            >
              Recent Projects
            </h2>
          </div>
          <span className="label-mono reveal reveal-delay-2 hidden md:block" style={{ opacity: 0.25 }}>
            2023 – 2025
          </span>
        </div>

        {/* Divider */}
        <div className="h-px bg-[var(--p-border)] reveal reveal-line mb-14" />

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          {/* Large card — spans 2 rows on desktop */}
          <div
            className={`reveal reveal-scale reveal-delay-1 relative overflow-hidden cursor-pointer group md:row-span-2`}
            style={{ minHeight: "520px" }}
          >
            <ProjectCard project={projects[0]} large />
          </div>

          {/* Right column: two stacked */}
          {projects.slice(1, 3).map((p, i) => (
            <div
              key={p.id}
              className={`reveal reveal-scale reveal-delay-${i + 2} relative overflow-hidden cursor-pointer group`}
              style={{ minHeight: "252px" }}
            >
              <ProjectCard project={p} />
            </div>
          ))}
        </div>

        {/* Small card — full width strip */}
        <div className="mt-5 reveal reveal-delay-4 relative overflow-hidden cursor-pointer group" style={{ minHeight: "180px" }}>
          <ProjectCard project={projects[3]} wide />
        </div>

        {/* View all link */}
        <div className="mt-12 flex justify-center reveal reveal-delay-5">
          <a
            href="#contact"
            className="label-mono px-6 py-3 border border-[var(--p-border)] hover:border-[var(--p-accent)] hover:text-[var(--p-accent)] transition-all duration-300 cursor-pointer"
            style={{ fontSize: "0.65rem", opacity: 1 }}
          >
            Start a project →
          </a>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  large = false,
  wide = false,
}: {
  project: (typeof projects)[0];
  large?: boolean;
  wide?: boolean;
}) {
  return (
    <div
      className="relative w-full h-full"
      style={{
        background: project.bg,
        minHeight: large ? "520px" : wide ? "180px" : "252px",
      }}
    >
      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundSize: "200px",
        }}
      />

      {/* Corner index */}
      <span className="absolute top-5 left-5 label-mono" style={{ opacity: 0.25, fontSize: "0.6rem" }}>
        {project.id}
      </span>

      {/* Category */}
      <span
        className="absolute top-5 right-5 label-mono px-2 py-1 border"
        style={{
          opacity: 0.5,
          fontSize: "0.55rem",
          borderColor: project.accent + "40",
          color: project.accent,
        }}
      >
        {project.category}
      </span>

      {/* Content — bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <div
          className="h-px mb-4 transition-transform duration-700 origin-left scale-x-0 group-hover:scale-x-100"
          style={{ background: project.accent + "60" }}
        />
        <h3
          className="font-display font-black text-[var(--p-text)]"
          style={{
            fontSize: wide ? "clamp(22px, 3vw, 38px)" : large ? "clamp(32px, 4vw, 58px)" : "clamp(22px, 2.5vw, 34px)",
            letterSpacing: "-0.04em",
            lineHeight: 0.95,
          }}
        >
          {project.title}
        </h3>
        <p
          className="mt-2 transition-all duration-500 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0"
          style={{ fontSize: "0.78rem", color: "var(--p-text-muted)" }}
        >
          {project.description}
        </p>
      </div>

      {/* Hover overlay */}
      <div
        className="absolute inset-0 transition-opacity duration-500 opacity-0 group-hover:opacity-100"
        style={{
          background: `radial-gradient(ellipse at 50% 100%, ${project.accent}0a 0%, transparent 70%)`,
        }}
      />

      {/* Arrow on hover */}
      <div className="absolute bottom-5 right-5 transition-all duration-300 opacity-0 group-hover:opacity-70 translate-x-2 group-hover:translate-x-0">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ color: project.accent }}>
          <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );
}
