"use client";

import { useReveal } from "@/hooks/useReveal";

const features = [
  {
    title: "Steered composites",
    desc: "The only process that steers fibers freely, unlocking designs no one else can make.",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-6 h-6">
        <path d="M4 28C4 28 8 4 16 16C24 28 28 4 28 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Lighter structures",
    desc: "Up to 65% weight savings with equal or higher strength.",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-6 h-6">
        <path d="M16 4v24M8 12h16M4 20h24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Zero defects",
    desc: "Perfect parts every time. No compromises.",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-6 h-6">
        <rect x="4" y="8" width="24" height="18" rx="3" stroke="currentColor" strokeWidth="2" />
        <path d="M10 17l4 4 8-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Faster designs",
    desc: "10× faster than traditional methods. Preforms in minutes, parts in hours.",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-6 h-6">
        <path d="M4 16h8l4-8 4 16 4-8h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Integrated partner",
    desc: "From design to production, everything under one roof, one partner instead of many.",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-6 h-6">
        <circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="2" />
        <circle cx="24" cy="8" r="3" stroke="currentColor" strokeWidth="2" />
        <circle cx="8" cy="24" r="3" stroke="currentColor" strokeWidth="2" />
        <circle cx="24" cy="24" r="3" stroke="currentColor" strokeWidth="2" />
        <path d="M11 8h10M8 11v10M24 11v10M11 24h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
];

export function FeatureCards() {
  const ref = useReveal(0.05);

  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="bg-[#f8f8f8] border-t border-[#282728]/10">
      <div className="grid grid-cols-1 md:grid-cols-3">
        {/* Dark intro card */}
        <div className="reveal bg-[#282728] p-10 md:p-12 flex flex-col justify-between min-h-[260px] md:row-span-2">
          <div>
            <span className="label-mono text-[#f8f8f8]/40 block mb-4">A NEW WAY TO BUILD</span>
            <h2 className="font-bold text-[#f8f8f8] text-2xl md:text-3xl leading-tight">
              What sets ICOMAT apart
            </h2>
          </div>
          <a
            href="#tech"
            className="inline-flex items-center gap-2 label-mono text-[#f8f8f8]/70 hover:text-[#f8f8f8] transition-colors mt-8"
          >
            Learn more
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>

        {/* Feature cards */}
        {features.map((f, i) => (
          <div
            key={f.title}
            className={`reveal p-8 md:p-10 flex flex-col gap-4 border-[#282728]/10 border-t ${
              i % 2 === 0 ? "md:border-l" : "md:border-l"
            }`}
            style={{ transitionDelay: `${(i + 1) * 0.08}s` }}
          >
            <div className="text-[#282728]/40">{f.icon}</div>
            <div className="flex-1" />
            <div>
              <h3 className="font-semibold text-[#282728] text-base mb-2">{f.title}</h3>
              <p className="text-[#282728]/55 text-sm leading-relaxed">{f.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
