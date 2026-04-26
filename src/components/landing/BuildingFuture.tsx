"use client";

import { useReveal } from "@/hooks/useReveal";

export function BuildingFuture() {
  const ref = useReveal(0.05);

  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="bg-[#f8f8f8] border-t border-[#282728]/10 py-28 md:py-40 px-6 md:px-16">
      <div className="max-w-[1400px] mx-auto">
        <h2 className="reveal font-bold text-[#282728] leading-tight text-[clamp(32px,4.5vw,70px)] max-w-4xl">
          Building the future<br />
          <span className="text-[#282728]/35">humanity deserves.</span>
        </h2>

        <div className="reveal reveal-delay-1 mt-10 max-w-2xl">
          <p className="text-[#282728]/60 text-base md:text-lg leading-relaxed">
            We&apos;re not just transforming engineering. We&apos;re expanding what humanity can build.
          </p>
          <p className="text-[#282728]/60 text-base md:text-lg leading-relaxed mt-4">
            By removing the constraints of traditional composites, we unlock a new design language
            for the physical world: one that&apos;s lighter, faster, stronger, and radically more
            efficient.
          </p>
        </div>

        <div className="reveal reveal-delay-2 mt-12 flex flex-wrap gap-6">
          {["Aerospace", "Defence", "Space", "Automotive", "Energy", "Maritime"].map((tag) => (
            <span
              key={tag}
              className="label-mono text-[#282728]/40 border border-[#282728]/15 rounded-full px-4 py-2"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
