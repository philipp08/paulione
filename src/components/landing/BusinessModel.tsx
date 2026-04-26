"use client";

import { useReveal } from "@/hooks/useReveal";

const icomatWay = [
  { title: "No CapEx.", desc: "Scale without upfront investment. We own the system. You receive the output." },
  { title: "Fully integrated system.", desc: "Software, machines, and production under one roof. No vendors. No handoffs. No risk." },
  { title: "Scalable from day one.", desc: "Expands from prototype to full scale production, rapidly and without limits." },
];

const others = [
  "Costly, fragmented supply chains",
  "Slow, limited throughput",
  "Unreliable scaling",
];

const icomatItems = [
  "Unified production system",
  "Automated high-rate production",
  "Scalable from day one",
];

export function BusinessModel() {
  const ref = useReveal(0.05);

  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="bg-[#080808] border-t border-[#f8f8f8]/8">
      <div className="max-w-[1400px] mx-auto px-6 md:px-16 py-24 md:py-32">
        {/* Header */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16 md:mb-20">
          <div>
            <span className="reveal label-mono text-[#f8f8f8]/35 block mb-6">BUSINESS MODEL</span>
            <h2 className="reveal reveal-delay-1 font-bold text-[#f8f8f8] text-3xl md:text-4xl lg:text-5xl leading-tight">
              We don&apos;t sell machines.<br />
              <span className="text-[#f8f8f8]/40">We unlock a new way to build.</span>
            </h2>
          </div>
          <div className="flex flex-col justify-end">
            <p className="reveal reveal-delay-1 text-[#f8f8f8]/55 text-base md:text-lg leading-relaxed">
              ICOMAT eliminates compromise in composites production. We provide an end-to-end
              solution from structural design to finished composite parts.
            </p>
          </div>
        </div>

        {/* Three points */}
        <div className="reveal reveal-delay-1 grid grid-cols-1 md:grid-cols-3 gap-0 border border-[#f8f8f8]/10 rounded-2xl overflow-hidden mb-12">
          {icomatWay.map((item, i) => (
            <div
              key={item.title}
              className={`p-8 md:p-10 flex flex-col gap-3 ${
                i < icomatWay.length - 1
                  ? "border-b md:border-b-0 md:border-r border-[#f8f8f8]/10"
                  : ""
              }`}
            >
              <h3 className="font-semibold text-[#f8f8f8] text-lg md:text-xl">{item.title}</h3>
              <p className="text-[#f8f8f8]/50 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Comparison table */}
        <div className="reveal reveal-delay-2 grid grid-cols-2 rounded-2xl overflow-hidden border border-[#f8f8f8]/10">
          {/* Others column */}
          <div className="border-r border-[#f8f8f8]/10">
            <div className="px-6 py-4 border-b border-[#f8f8f8]/10 bg-[#f8f8f8]/3">
              <span className="label-mono text-[#f8f8f8]/30">OTHERS</span>
            </div>
            {others.map((item) => (
              <div
                key={item}
                className="px-6 py-4 border-b border-[#f8f8f8]/6 text-[#f8f8f8]/35 text-sm flex items-center gap-3"
              >
                <span className="w-3 h-px bg-[#f8f8f8]/20 flex-shrink-0" />
                {item}
              </div>
            ))}
          </div>

          {/* ICOMAT Way column */}
          <div>
            <div className="px-6 py-4 border-b border-[#f8f8f8]/10 bg-[#f8f8f8]/6">
              <span className="label-mono text-[#f8f8f8]/70">THE ICOMAT WAY</span>
            </div>
            {icomatItems.map((item) => (
              <div
                key={item}
                className="px-6 py-4 border-b border-[#f8f8f8]/6 text-[#f8f8f8]/80 text-sm flex items-center gap-3"
              >
                <svg className="w-3 h-3 text-[#f8f8f8]/60 flex-shrink-0" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
