"use client";

import { useState, useEffect, type RefObject } from "react";
import { useReveal } from "@/hooks/useReveal";
import Image from "next/image";

const industries = [
  {
    id: "defense",
    label: "DEFENSE",
    img: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1400&h=900&fit=crop&auto=format",
    desc: "Delivering mission-critical composite structures for defence platforms — lighter, stronger, and built to survive.",
  },
  {
    id: "aeronautics",
    label: "AERONAUTICS",
    img: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1400&h=900&fit=crop&auto=format",
    desc: "Enabling next-generation aircraft with revolutionary steered-fiber composite aerostructures.",
  },
  {
    id: "space",
    label: "SPACE",
    img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1400&h=900&fit=crop&auto=format",
    desc: "Ultra-light, ultra-precise structural components for launch vehicles, satellites, and spacecraft.",
  },
  {
    id: "automotive",
    label: "AUTOMOTIVE",
    img: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1400&h=900&fit=crop&auto=format",
    desc: "High-rate production of lightweight composite body structures for EV and performance vehicles.",
  },
];

export function IndustriesCarousel() {
  const ref = useReveal(0.05);
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          setActive((a) => (a + 1) % industries.length);
          return 0;
        }
        return p + 1;
      });
    }, 60);
    return () => clearInterval(interval);
  }, [active]);

  const current = industries[active];

  return (
    <section ref={ref as RefObject<HTMLElement>} id="industries" className="bg-[#f8f8f8] border-t border-[#282728]/10">
      {/* Header */}
      <div className="px-6 md:px-16 pt-16 pb-8 max-w-[1400px] mx-auto">
        <p className="reveal label-mono text-[#282728]/45">
          Supporting leading industries: Aeronautics, Defence, Space, Automotive.
        </p>
      </div>

      {/* Main image */}
      <div className="reveal relative w-full" style={{ height: "60vw", maxHeight: "640px", minHeight: "360px" }}>
        {industries.map((ind, i) => (
          <div
            key={ind.id}
            className="absolute inset-0 transition-opacity duration-700"
            style={{ opacity: i === active ? 1 : 0 }}
          >
            <Image src={ind.img} alt={ind.label} fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#282728]/70 via-transparent to-transparent" />
          </div>
        ))}

        {/* Description overlay */}
        <div className="absolute bottom-8 left-8 md:left-16 max-w-lg">
          <p className="text-[#f8f8f8] text-base md:text-lg font-medium leading-relaxed">
            {current.desc}
          </p>
          <a href="#contact" className="inline-flex items-center gap-2 label-mono text-[#f8f8f8]/70 hover:text-[#f8f8f8] mt-4 transition-colors">
            Learn more
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>

      {/* Nav tabs */}
      <div className="reveal reveal-delay-1 grid grid-cols-4 border-t border-[#282728]/10">
        {industries.map((ind, i) => (
          <button
            key={ind.id}
            onClick={() => { setActive(i); setProgress(0); }}
            className={`relative py-5 px-4 text-center label-mono transition-all ${
              i === active
                ? "text-[#282728] bg-[#282728]/4"
                : "text-[#282728]/40 hover:text-[#282728]/70"
            } ${i < industries.length - 1 ? "border-r border-[#282728]/10" : ""}`}
          >
            {ind.label}
            {/* Progress bar */}
            {i === active && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#282728]/10">
                <div
                  className="h-full bg-[#282728] transition-none"
                  style={{ width: `${progress}%` }}
                />
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Index indicator */}
      <div className="px-6 md:px-16 py-4 flex items-center gap-2 border-t border-[#282728]/8">
        <span className="label-mono text-[#282728]/30 text-[10px]">0{active + 1}</span>
        <span className="label-mono text-[#282728]/20 text-[10px]">≥</span>
        <span className="label-mono text-[#282728]/25 text-[10px]">0{industries.length}</span>
      </div>
    </section>
  );
}
