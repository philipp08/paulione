"use client";

import { useReveal } from "@/hooks/useReveal";

export function CenterHeading() {
  const ref = useReveal(0.05);

  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="py-32 md:py-40 px-6 bg-[#f8f8f8] bg-grid-light text-center relative overflow-hidden">
      {/* Corner decorations */}
      <div className="absolute top-8 left-8 w-3 h-3 border-l border-t border-[#282728]/20" />
      <div className="absolute top-8 right-8 w-3 h-3 border-r border-t border-[#282728]/20" />
      <div className="absolute bottom-8 left-8 w-3 h-3 border-l border-b border-[#282728]/20" />
      <div className="absolute bottom-8 right-8 w-3 h-3 border-r border-b border-[#282728]/20" />

      <div className="max-w-5xl mx-auto">
        <div className="reveal flex items-center justify-center gap-3 mb-10">
          <div className="w-2 h-2 bg-[#282728]/30 rotate-45" />
          <span className="label-mono text-[#282728]/50">RAPID TOW SHEARING</span>
          <div className="w-2 h-2 bg-[#282728]/30 rotate-45" />
        </div>

        <h2 className="reveal reveal-delay-1 font-bold text-[#282728] leading-tight tracking-tighter">
          <span className="block text-[clamp(36px,5.5vw,80px)]">ICOMAT invented RTS.</span>
          <span className="block text-[clamp(36px,5.5vw,80px)] text-[#282728]/40">
            Rapid Tow Shearing.
          </span>
        </h2>

        <p className="reveal reveal-delay-2 mt-10 text-[#282728]/55 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
          For 50 years, composites were limited to straight lines. Our patented RTS process
          removes that constraint. Fibers can now flow along curves to build lighter, stronger,
          more efficient parts.
        </p>

        <div className="reveal reveal-delay-3 mt-10">
          <a
            href="#tech"
            className="inline-flex items-center gap-2 label-mono text-[#282728] border-b border-[#282728]/30 pb-0.5 hover:border-[#282728] transition-colors"
          >
            Explore our technology
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
