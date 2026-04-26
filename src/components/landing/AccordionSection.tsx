"use client";

import { useState, type RefObject } from "react";
import { useReveal } from "@/hooks/useReveal";

const testimonials = [
  {
    id: "joby",
    company: "JOBY AVIATION",
    logo: "JOBY",
    quote:
      "\"I believe that ICOMAT has unlocked the full potential of composites. Thanks to their unique Rapid Tow Shearing manufacturing process, Engineers can now design and produce composite structures with unparalleled fiber optimization.\"",
    author: "JOHN GERIGUIS",
    role: "AD @JOBY AVIATION",
  },
  {
    id: "bae",
    company: "BAE SYSTEMS",
    logo: "BAE SYSTEMS",
    quote:
      "\"Delivering cost effective and innovative solutions across our manufacturing operations is critical to maintaining a leading position in the UK combat air sector. Working alongside organisations like iCOMAT, and drawing upon their expertise in RTS helps us to ensure we're able to maintain that edge.\"",
    author: "PAUL",
    role: "HEAD OF AIRFRAME TECHNOLOGY @BAE SYSTEMS",
  },
  {
    id: "niar",
    company: "NIAR",
    logo: "NIAR",
    quote:
      "\"At NIAR, we work with some of the most advanced manufacturing technologies in the world, and iCOMAT stands out as a true innovator. Their novel approach to composite manufacturing represents a significant leap forward in performance and design flexibility.\"",
    author: "WARUNA SENEVIRATNE",
    role: "DIRECTOR @NIAR",
  },
  {
    id: "pall",
    company: "PALL AEROSPACE",
    logo: "PALL",
    quote:
      "\"Impressed with ICOMAT's first production delivery: quality parts, reliable timelines, and responsive support. A great start to our partnership.\"",
    author: "CRAIG EASON",
    role: "SUPPLIER RELATIONSHIP MANAGER @PALL AEROSPACE",
  },
];

export function AccordionSection() {
  const ref = useReveal(0.05);
  const [active, setActive] = useState("niar");
  const activeItem = testimonials.find((t) => t.id === active)!;

  return (
    <section
      ref={ref as RefObject<HTMLElement>}
      className="relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #0a1628 0%, #0d2040 30%, #102848 60%, #0a1e36 100%)",
      }}
    >
      {/* Subtle glow */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 60% 50%, rgba(20, 80, 160, 0.4), transparent)",
        }}
      />

      <div className="relative max-w-[1400px] mx-auto px-6 md:px-16 py-24 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
          {/* Left */}
          <div className="flex flex-col justify-between">
            <div>
              <h2 className="reveal font-bold text-[#f8f8f8] leading-tight text-3xl md:text-4xl lg:text-5xl mb-12">
                Our customers<br />
                have no margin<br />
                <span className="text-[#f8f8f8]/50">for error.</span>
              </h2>

              {/* Active testimonial card */}
              <div className="reveal reveal-delay-1 bg-[#f8f8f8] rounded-2xl p-8 shadow-2xl">
                <div className="mb-6">
                  <span className="font-bold text-[#282728] label-mono text-[11px]">
                    {activeItem.logo}
                  </span>
                </div>
                <blockquote className="text-[#282728] text-sm md:text-base leading-relaxed mb-6">
                  {activeItem.quote}
                </blockquote>
                <div className="pt-4 border-t border-[#282728]/10">
                  <p className="label-mono text-[#282728]/50 text-[10px]">
                    {activeItem.author}, {activeItem.role}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right - accordion */}
          <div className="flex flex-col justify-center">
            <span className="reveal label-mono text-[#f8f8f8]/40 block mb-8">
              Trusted by industry leaders ↓
            </span>

            <div className="reveal reveal-delay-1 flex flex-col gap-2">
              {testimonials.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setActive(t.id)}
                  className={`relative w-full text-left rounded-xl border transition-all duration-300 overflow-hidden ${
                    active === t.id
                      ? "border-[#f8f8f8]/20 bg-[#f8f8f8]/8"
                      : "border-[#f8f8f8]/10 hover:border-[#f8f8f8]/15 hover:bg-[#f8f8f8]/4"
                  }`}
                >
                  <div className="px-5 py-4 flex items-center justify-between">
                    <span
                      className={`font-semibold text-sm transition-colors ${
                        active === t.id ? "text-[#f8f8f8]" : "text-[#f8f8f8]/50"
                      }`}
                    >
                      {t.company}
                    </span>
                    <svg
                      className={`w-4 h-4 text-[#f8f8f8]/40 transition-transform ${
                        active === t.id ? "rotate-180" : ""
                      }`}
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                      <path
                        d="M4 6l4 4 4-4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>

                  {active === t.id && (
                    <div className="px-5 pb-4">
                      <p className="text-[#f8f8f8]/60 text-xs leading-relaxed line-clamp-3">
                        {t.quote}
                      </p>
                      <p className="label-mono text-[#f8f8f8]/30 text-[9px] mt-3">
                        {t.author} — {t.role}
                      </p>
                    </div>
                  )}

                  {/* Progress bar for active */}
                  {active === t.id && (
                    <div className="absolute bottom-0 left-0 right-0 h-px bg-[#f8f8f8]/10">
                      <div
                        className="h-full bg-[#f8f8f8]/40"
                        style={{ animation: "progress-bar 8s linear forwards" }}
                      />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
