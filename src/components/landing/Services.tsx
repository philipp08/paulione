"use client";

import { useReveal } from "@/hooks/useReveal";

const services = [
  {
    index: "01",
    title: "Web Design",
    description:
      "Pixel-perfect interfaces that balance aesthetics with usability. From wireframes to fully interactive prototypes in Figma.",
    tags: ["UI Design", "Figma", "Prototyping", "Design Systems"],
  },
  {
    index: "02",
    title: "Web Development",
    description:
      "Clean, performant code with Next.js and Tailwind CSS. Sites that load fast, look flawless, and scale effortlessly.",
    tags: ["Next.js", "React", "Tailwind", "TypeScript"],
  },
  {
    index: "03",
    title: "Brand Identity",
    description:
      "Visual systems that make brands unforgettable — logos, type scales, color languages, and comprehensive style guides.",
    tags: ["Logo Design", "Typography", "Color Systems", "Brand Guidelines"],
  },
];

export function Services() {
  const sectionRef = useReveal();

  return (
    <section
      id="services"
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="bg-[var(--p-bg-light)] px-6 md:px-10 py-24 md:py-36"
    >
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="mb-16">
          <p className="label-mono reveal" style={{ color: "var(--p-text-dark)", opacity: 0.35 }}>
            What I Create
          </p>
          <h2
            className="reveal reveal-delay-1 font-display font-black mt-2"
            style={{
              fontSize: "clamp(36px, 5vw, 70px)",
              letterSpacing: "-0.04em",
              color: "var(--p-text-dark)",
            }}
          >
            Services
          </h2>
        </div>

        {/* Service list */}
        <div className="flex flex-col">
          {services.map((s, i) => (
            <div
              key={s.index}
              className={`reveal reveal-delay-${i + 2} group cursor-default`}
            >
              <div className="h-px bg-[var(--p-border-light)] reveal-line" />
              <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr_1fr] gap-6 md:gap-10 py-8 md:py-10 md:items-start">
                {/* Index + title */}
                <div className="flex md:flex-col gap-4 md:gap-2">
                  <span className="label-mono" style={{ color: "var(--p-text-dark-muted)", opacity: 0.4 }}>
                    {s.index}
                  </span>
                  <h3
                    className="font-display font-black group-hover:translate-x-1 transition-transform duration-300"
                    style={{
                      fontSize: "clamp(22px, 2.8vw, 38px)",
                      letterSpacing: "-0.04em",
                      color: "var(--p-text-dark)",
                    }}
                  >
                    {s.title}
                  </h3>
                </div>

                {/* Description */}
                <p
                  style={{
                    fontSize: "0.92rem",
                    color: "var(--p-text-dark-muted)",
                    lineHeight: 1.7,
                  }}
                >
                  {s.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 md:justify-end md:pt-1">
                  {s.tags.map((tag) => (
                    <span
                      key={tag}
                      className="label-mono px-2.5 py-1.5 border"
                      style={{
                        fontSize: "0.55rem",
                        borderColor: "var(--p-border-light)",
                        color: "var(--p-text-dark)",
                        opacity: 0.45,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
          <div className="h-px bg-[var(--p-border-light)] reveal-line" />
        </div>
      </div>
    </section>
  );
}
