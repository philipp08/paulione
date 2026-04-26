"use client";

import { useReveal } from "@/hooks/useReveal";
import Image from "next/image";

export function ImageSideBySide() {
  const ref = useReveal(0.05);

  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="bg-[#f8f8f8] overflow-hidden">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-0">
        <div className="reveal flex flex-col justify-center px-8 md:px-16 py-20 md:py-28 border-b md:border-b-0 md:border-r border-[#282728]/10">
          <span className="label-mono text-[#282728]/40 mb-6 block">HOW WE OPERATE</span>
          <h2 className="font-bold text-[#282728] leading-tight text-3xl md:text-4xl lg:text-5xl mb-8">
            How we<br />
            <span className="text-[#282728]/40">operate.</span>
          </h2>
          <p className="text-[#282728]/65 text-base md:text-lg leading-relaxed max-w-md">
            We build fully integrated factories for composite parts. Using proprietary hardware
            and software, we automate and control the entire process.
          </p>
          <p className="text-[#282728]/65 text-base md:text-lg leading-relaxed max-w-md mt-4">
            From a roll of carbon fiber through a finished, painted, and inspected product,
            including design and analysis.
          </p>
        </div>

        <div className="reveal reveal-delay-1 relative aspect-[4/3] md:aspect-auto md:min-h-[500px] bg-[#1a1a1a] overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=960&h=868&fit=crop&auto=format"
            alt="ICOMAT composite manufacturing facility"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-transparent to-[#282728]/30" />
        </div>
      </div>
    </section>
  );
}
