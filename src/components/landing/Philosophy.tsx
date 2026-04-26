"use client";

import { useReveal } from "@/hooks/useReveal";

const stats = [
  { value: "40+", label: "Projects Completed" },
  { value: "5+", label: "Years Experience" },
  { value: "18", label: "Happy Clients" },
];

export function Philosophy() {
  const sectionRef = useReveal();

  return (
    <section
      id="about"
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="bg-[var(--p-bg)] bg-grid-dark px-6 md:px-10 py-24 md:py-40 overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto">
        {/* Large statement */}
        <div className="mb-24 md:mb-32 max-w-5xl">
          <p className="label-mono reveal mb-4">Design Philosophy</p>
          <blockquote
            className="reveal reveal-delay-1 font-display font-black text-[var(--p-text)]"
            style={{
              fontSize: "clamp(28px, 4.5vw, 66px)",
              letterSpacing: "-0.04em",
              lineHeight: 1.08,
            }}
          >
            "Great design is{" "}
            <em
              className="not-italic"
              style={{ color: "var(--p-accent)" }}
            >
              invisible
            </em>
            . It removes friction, communicates clearly, and lets the product speak for itself."
          </blockquote>
        </div>

        {/* Bio + stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-start">
          <div>
            <h3
              className="reveal font-display font-black text-[var(--p-text)] mb-6"
              style={{ fontSize: "clamp(22px, 3vw, 38px)", letterSpacing: "-0.04em" }}
            >
              Hi, I&apos;m Philipp.
            </h3>
            <div className="space-y-4">
              <p className="reveal reveal-delay-1" style={{ fontSize: "0.9rem", color: "var(--p-text-muted)", lineHeight: 1.8 }}>
                I&apos;m a freelance web designer and developer based in Germany. I specialize in building minimal, elegant digital products for startups, agencies, and established brands who care about craft.
              </p>
              <p className="reveal reveal-delay-2" style={{ fontSize: "0.9rem", color: "var(--p-text-muted)", lineHeight: 1.8 }}>
                My process starts with understanding the user and ends with code — no templates, no shortcuts, just thoughtful design built from scratch.
              </p>
            </div>

            <div className="mt-8 reveal reveal-delay-3">
              <a
                href="#contact"
                className="inline-flex items-center gap-3 font-display font-semibold text-[var(--p-text)] hover:text-[var(--p-accent)] transition-colors duration-300 cursor-pointer group"
                style={{ fontSize: "0.9rem" }}
              >
                Get in touch
                <svg
                  className="transition-transform duration-300 group-hover:translate-x-1"
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                >
                  <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 md:gap-6">
            {stats.map((s, i) => (
              <div key={s.label} className={`reveal reveal-delay-${i + 2}`}>
                <p
                  className="font-display font-black text-[var(--p-text)]"
                  style={{ fontSize: "clamp(32px, 4vw, 52px)", letterSpacing: "-0.04em" }}
                >
                  {s.value}
                </p>
                <p className="label-mono mt-1" style={{ fontSize: "0.58rem", opacity: 0.35 }}>
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
