"use client";

import { useState, type RefObject } from "react";
import { useReveal } from "@/hooks/useReveal";

const hotspots = [
  {
    id: "scale",
    label: "AT SCALE",
    position: { top: "35%", left: "20%" },
    title: "At Scale",
    description:
      "Automated tape steering and forming in one continuous process. Industrial-scale manufacturing from day one.",
  },
  {
    id: "zero",
    label: "ZERO DEFECTS",
    position: { top: "70%", left: "38%" },
    title: "Zero Defects",
    description:
      "Eliminates common defects found in traditional composite manufacturing. No wrinkles, no gaps, no distortions.",
  },
  {
    id: "faster",
    label: "10× FASTER",
    position: { top: "60%", right: "8%" },
    title: "10× Faster",
    description:
      "Our RTS process produces preforms in minutes, finished parts in hours — 10× faster than traditional methods.",
  },
];

export function LargeComposite() {
  const ref = useReveal(0.05);
  const [active, setActive] = useState<string | null>(null);

  return (
    <section
      ref={ref as RefObject<HTMLElement>}
      id="tech"
      className="relative bg-[#080808] overflow-hidden"
      style={{ minHeight: "90vh" }}
    >
      {/* Grid lines */}
      <div className="absolute inset-0 bg-grid-dark opacity-60 pointer-events-none" />

      {/* Corner frame lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-[#f8f8f8]/8" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-[#f8f8f8]/8" />

      {/* Column dividers */}
      <div className="absolute top-0 bottom-0 left-[33.33%] w-px bg-[#f8f8f8]/5" />
      <div className="absolute top-0 bottom-0 left-[66.66%] w-px bg-[#f8f8f8]/5" />
      <div className="absolute top-0 bottom-0 left-[50%] w-px bg-[#f8f8f8]/5" />

      {/* Row dividers */}
      <div className="absolute left-0 right-0 top-[50%] h-px bg-[#f8f8f8]/5" />

      {/* Dot markers at intersections */}
      {[33.33, 50, 66.66].map((x) =>
        [50].map((y) => (
          <div
            key={`${x}-${y}`}
            className="absolute w-1 h-1 rounded-full bg-[#f8f8f8]/15"
            style={{ left: `${x}%`, top: `${y}%`, transform: "translate(-50%, -50%)" }}
          />
        ))
      )}

      {/* 3D composite image (from about video as poster) */}
      <div className="reveal relative w-full flex items-center justify-center py-20 px-6">
        <div className="relative w-full max-w-4xl mx-auto">
          <video
            className="w-full h-auto rounded-lg opacity-90"
            autoPlay
            muted
            loop
            playsInline
            style={{ maxHeight: "70vh", objectFit: "contain" }}
          >
            <source
              src="https://icomat.cdn.prismic.io/icomat/aTWkSXNYClf9n4_A_ICOMAT-HOMEBACKGROUNDVIDEO2_1.mp4"
              type="video/mp4"
            />
          </video>

          {/* Hotspot buttons */}
          {hotspots.map((spot) => (
            <div
              key={spot.id}
              className="absolute"
              style={spot.position}
            >
              <button
                className="relative flex items-center gap-2 bg-[#1a1a1a]/80 backdrop-blur-sm border border-[#f8f8f8]/15 rounded-full px-3 py-1.5 hover:bg-[#f8f8f8]/10 transition-all group"
                onClick={() => setActive(active === spot.id ? null : spot.id)}
              >
                <span className="label-mono text-[#f8f8f8]/80 group-hover:text-[#f8f8f8] text-[10px]">
                  {spot.label}
                </span>
                <div className="w-4 h-4 rounded-full border border-[#f8f8f8]/40 flex items-center justify-center">
                  <span className="text-[#f8f8f8]/60 text-[10px] font-bold leading-none">+</span>
                </div>
              </button>

              {/* Popover */}
              {active === spot.id && (
                <div className="absolute top-full mt-2 left-0 z-10 w-56 bg-[#1a1a1a] border border-[#f8f8f8]/15 rounded-xl p-4 shadow-xl">
                  <p className="font-semibold text-[#f8f8f8] text-sm mb-1">{spot.title}</p>
                  <p className="text-[#f8f8f8]/60 text-xs leading-relaxed">{spot.description}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Stats row */}
      <div className="reveal reveal-delay-1 border-t border-[#f8f8f8]/8 grid grid-cols-3 divide-x divide-[#f8f8f8]/8">
        {[
          { value: "65%", label: "LIGHTER" },
          { value: "10×", label: "FASTER PRODUCTION" },
          { value: "0", label: "DEFECTS" },
        ].map((stat) => (
          <div key={stat.label} className="py-8 px-6 text-center">
            <div className="text-[#f8f8f8] font-bold text-4xl md:text-5xl mb-2">
              {stat.value}
            </div>
            <div className="label-mono text-[#f8f8f8]/40">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
