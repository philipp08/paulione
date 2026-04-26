"use client";

import { useReveal } from "@/hooks/useReveal";

export function CompositeDual() {
  const ref = useReveal(0.05);

  return (
    <section ref={ref as React.RefObject<HTMLElement>} id="solutions" className="bg-[#0c0c0c] text-[#f8f8f8] overflow-hidden">
      {/* Intro text */}
      <div className="px-6 md:px-16 pt-24 pb-16 max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div className="reveal max-w-xs">
            <span className="label-mono text-[#f8f8f8]/40 block mb-4">THE RTS REVOLUTION</span>
          </div>
          <div className="reveal reveal-delay-1 max-w-xl">
            <p className="text-[#f8f8f8]/70 text-base md:text-lg leading-relaxed">
              For 50 years, composites were limited to straight lines. Our patented RTS process
              removes that constraint. Fibers can now flow along curves to build lighter,
              stronger, more efficient parts.
            </p>
          </div>
        </div>
      </div>

      {/* Two-column comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 border-t border-[#f8f8f8]/10">
        {/* Before RTS */}
        <div className="reveal border-b md:border-b-0 md:border-r border-[#f8f8f8]/10 p-8 md:p-12 flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-[#f8f8f8]/30" />
            <span className="label-mono text-[#f8f8f8]/40">CONVENTIONAL / STRAIGHT FIBER COMPOSITES</span>
          </div>
          <h3 className="text-2xl md:text-3xl font-bold text-[#f8f8f8]/50">BEFORE RTS</h3>

          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#1a1a1a]">
            <video
              className="w-full h-full object-cover opacity-80"
              autoPlay
              muted
              loop
              playsInline
            >
              <source src="https://www.icomat.co.uk/videos/composites/A01.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0c]/60 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <p className="text-[#f8f8f8]/60 text-sm leading-relaxed">
                Traditional straight-fiber composites require excess material and weight.
                Fibers are limited to 0°, ±45°, 90° angles.
              </p>
            </div>
          </div>

          <ul className="flex flex-col gap-3">
            {["Excess weight and material", "Limited design freedom", "Suboptimal load paths"].map((item) => (
              <li key={item} className="flex items-center gap-3 text-[#f8f8f8]/50 text-sm">
                <span className="w-4 h-px bg-[#f8f8f8]/20" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* RTS Design */}
        <div className="reveal reveal-delay-1 p-8 md:p-12 flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-[#f8f8f8]" />
            <span className="label-mono text-[#f8f8f8]/60">RTS / STEERED FIBER COMPOSITES</span>
          </div>
          <h3 className="text-2xl md:text-3xl font-bold text-[#f8f8f8]">RTS DESIGN</h3>

          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#1a1a1a]">
            <video
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
            >
              <source src="https://www.icomat.co.uk/videos/composites/A02.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0c]/60 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <p className="text-[#f8f8f8]/80 text-sm leading-relaxed">
                Each fiber is precisely steered to follow the load path of the structure.
                Automated tape steering and forming in one continuous process.
              </p>
            </div>
          </div>

          <ul className="flex flex-col gap-3">
            {[
              "Up to 65% weight reduction",
              "Fibers follow exact load paths",
              "Zero defects, zero waste",
            ].map((item) => (
              <li key={item} className="flex items-center gap-3 text-[#f8f8f8] text-sm">
                <span className="w-4 h-px bg-[#f8f8f8]/60" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
