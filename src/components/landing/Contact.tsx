"use client";

import { useReveal } from "@/hooks/useReveal";

export function Contact() {
  const sectionRef = useReveal();

  return (
    <section
      id="contact"
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="bg-[var(--p-bg-light)] px-6 md:px-10 py-24 md:py-40"
    >
      <div className="max-w-[1400px] mx-auto">
        <p className="label-mono reveal" style={{ color: "var(--p-text-dark)", opacity: 0.35 }}>
          Get In Touch
        </p>

        <h2
          className="reveal reveal-delay-1 font-display font-black mt-3"
          style={{
            fontSize: "clamp(40px, 7vw, 110px)",
            letterSpacing: "-0.05em",
            lineHeight: 0.9,
            color: "var(--p-text-dark)",
          }}
        >
          Let&apos;s build
          <br />
          <span style={{ color: "var(--p-accent)" }}>something</span>
          <br />
          remarkable.
        </h2>

        <div className="mt-14 flex flex-col md:flex-row gap-6 md:gap-8 items-start">
          <a
            href="mailto:pauli.philipp2020@gmail.com"
            className="reveal reveal-delay-2 font-display font-black px-8 py-5 bg-[var(--p-text-dark)] text-[var(--p-bg-light)] hover:bg-[var(--p-accent)] hover:text-[var(--p-text-dark)] transition-all duration-300 cursor-pointer"
            style={{ fontSize: "clamp(14px, 1.2vw, 18px)", letterSpacing: "-0.02em" }}
          >
            Send an Email →
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="reveal reveal-delay-3 font-display font-semibold px-8 py-5 border border-[var(--p-border-light)] text-[var(--p-text-dark)] hover:border-[var(--p-text-dark)] transition-all duration-300 cursor-pointer"
            style={{ fontSize: "clamp(14px, 1.2vw, 18px)", letterSpacing: "-0.02em" }}
          >
            LinkedIn
          </a>
        </div>

        <div className="mt-20 reveal reveal-delay-4">
          <div className="h-px bg-[var(--p-border-light)]" />
          <p className="mt-6 label-mono" style={{ color: "var(--p-text-dark)", opacity: 0.28 }}>
            Based in Germany · Available worldwide
          </p>
        </div>
      </div>
    </section>
  );
}
