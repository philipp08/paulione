"use client";

import { useReveal } from "@/hooks/useReveal";

const advantages = [
  {
    title: "Better products",
    description:
      "Steering fibers along exact load paths means lighter, stronger parts with optimal performance — unlocking designs previously impossible.",
  },
  {
    title: "Faster timelines",
    description:
      "Preforms in minutes. Parts in hours. Our automated, integrated process reduces lead times from months to days.",
  },
  {
    title: "Scale-as-you-go",
    description:
      "Expand seamlessly from prototype to full-scale production. No upfront CapEx, no risk — just output.",
  },
];

export function AdvantageSection() {
  const ref = useReveal(0.05);

  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="bg-[#f8f8f8] border-t border-[#282728]/10">
      <div className="max-w-[1400px] mx-auto px-6 md:px-16 py-24 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
          {/* Left */}
          <div>
            <span className="reveal label-mono text-[#282728]/40 block mb-6">OUR ADVANTAGE</span>
            <h2 className="reveal reveal-delay-1 font-bold text-[#282728] text-3xl md:text-4xl lg:text-5xl leading-tight">
              Unlocking innovation<br />
              <span className="text-[#282728]/40">for all.</span>
            </h2>
          </div>

          {/* Right */}
          <div className="flex flex-col justify-end">
            <p className="reveal reveal-delay-1 text-[#282728]/60 text-base md:text-lg leading-relaxed mb-6">
              We built the only fully integrated system in the world that produces steered fiber
              composites, defect-free and at industrial scale.
            </p>
            <p className="reveal reveal-delay-2 text-[#282728]/60 text-base leading-relaxed">
              Our proprietary hardware, software, and production facilities work as one
              end-to-end platform.
            </p>
          </div>
        </div>

        {/* Advantages grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-0 border border-[#282728]/10 rounded-2xl overflow-hidden">
          {advantages.map((adv, i) => (
            <div
              key={adv.title}
              className={`reveal p-8 md:p-10 flex flex-col gap-4 ${
                i < advantages.length - 1
                  ? "border-b md:border-b-0 md:border-r border-[#282728]/10"
                  : ""
              }`}
              style={{ transitionDelay: `${i * 0.12}s` }}
            >
              <div className="w-8 h-8 rounded-lg bg-[#282728]/6 flex items-center justify-center">
                <span className="label-mono text-[#282728]/50 text-[10px]">0{i + 1}</span>
              </div>
              <h3 className="font-semibold text-[#282728] text-xl">{adv.title}</h3>
              <p className="text-[#282728]/55 text-sm leading-relaxed">{adv.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
