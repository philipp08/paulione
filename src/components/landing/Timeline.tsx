"use client";

import { useReveal } from "@/hooks/useReveal";
import { useRef } from "react";
import Image from "next/image";

const steps = [
  {
    id: "O1",
    label: "END-TO-END DIGITAL THREAD",
    sub: "STRUCTURAL & PRODUCTION OPTIMISATION",
    img: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=960&h=634&fit=crop&auto=format",
  },
  {
    id: "O2",
    label: "MATERIAL SLITTING & STORAGE",
    sub: "",
    img: "https://images.unsplash.com/photo-1565372195458-9de0b320ef04?w=960&h=634&fit=crop&auto=format",
  },
  {
    id: "O3",
    label: "TOOLING PRODUCTION",
    sub: "METALLIC, COMPOSITE",
    img: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=960&h=634&fit=crop&auto=format",
  },
  {
    id: "O4",
    label: "MOST ADVANCED TAPE LAYING",
    sub: "CAPABILITY IN THE WORLD",
    img: "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=960&h=634&fit=crop&auto=format",
  },
  {
    id: "O5",
    label: "CURING",
    sub: "AUTOCLAVES, PRESSES, HOT DRAPE FORMING",
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=960&h=634&fit=crop&auto=format",
  },
  {
    id: "O6",
    label: "INSPECTION",
    sub: "",
    img: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=960&h=634&fit=crop&auto=format",
  },
  {
    id: "O7",
    label: "PAINTING",
    sub: "",
    img: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=960&h=634&fit=crop&auto=format",
  },
];

export function Timeline() {
  const ref = useReveal(0.05);
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="bg-[#080808] overflow-hidden">
      {/* Title */}
      <div className="px-6 md:px-16 pt-24 pb-12">
        <h2 className="reveal font-bold text-[#f8f8f8]/80 text-3xl md:text-5xl lg:text-6xl text-center">
          End-to-end production
        </h2>
      </div>

      {/* Horizontal scroll container */}
      <div
        ref={scrollRef}
        className="overflow-x-auto pb-8 scrollbar-none"
        style={{ scrollbarWidth: "none" }}
      >
        <div className="flex gap-0 min-w-max px-6 md:px-16">
          {steps.map((step, i) => (
            <div
              key={step.id}
              className={`reveal flex-shrink-0 w-[320px] md:w-[380px] border-r border-[#f8f8f8]/10 last:border-r-0 pb-12`}
              style={{ transitionDelay: `${i * 0.08}s` }}
            >
              {/* Step header */}
              <div className="px-6 pt-6 pb-4 border-b border-[#f8f8f8]/10">
                <div className="flex items-center gap-3 mb-3">
                  <span className="label-mono text-[#f8f8f8]/30 text-[11px]">{step.id}</span>
                  <div className="flex-1 h-px bg-[#f8f8f8]/10" />
                  <div className="w-1 h-1 rounded-full bg-[#f8f8f8]/30" />
                </div>
                <p className="label-mono text-[#f8f8f8]/70 text-[10px] leading-relaxed">
                  {step.label}
                  {step.sub && (
                    <span className="block text-[#f8f8f8]/40">({step.sub})</span>
                  )}
                </p>
              </div>

              {/* Image */}
              <div className="relative aspect-[3/2] mx-4 mt-4 rounded-xl overflow-hidden bg-[#1a1a1a]">
                <Image
                  src={step.img}
                  alt={step.label}
                  fill
                  className="object-cover opacity-80"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
