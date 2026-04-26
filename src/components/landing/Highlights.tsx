"use client";

import { useReveal } from "@/hooks/useReveal";
import Image from "next/image";

const items = [
  {
    title: "Automated high-speed production",
    img: "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=800&h=600&fit=crop&auto=format",
    desc: "Fully automated tape laying and forming at industrial scale — no manual intervention required.",
  },
  {
    title: "From design to parts",
    img: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop&auto=format",
    desc: "Our digital thread connects structural design directly to the production floor without loss of fidelity.",
  },
  {
    title: "Tailored to your needs",
    img: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&h=600&fit=crop&auto=format",
    desc: "We configure our system for each customer's geometry, material, and volume requirements.",
  },
];

export function Highlights() {
  const ref = useReveal(0.05);

  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="bg-[#f8f8f8] border-t border-[#282728]/10">
      <div className="max-w-[1400px] mx-auto px-6 md:px-16 pt-24 pb-12">
        <h2 className="reveal font-bold text-[#282728] text-3xl md:text-5xl lg:text-6xl leading-tight mb-16">
          The ICOMAT<br />
          <span className="text-[#282728]/35">solution</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#282728]/10">
        {items.map((item, i) => (
          <div key={item.title} className="reveal flex flex-col" style={{ transitionDelay: `${i * 0.12}s` }}>
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={item.img}
                alt={item.title}
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="p-8 md:p-10 flex flex-col gap-3 flex-1">
              <h3 className="font-semibold text-[#282728] text-lg leading-snug">{item.title}</h3>
              <p className="text-[#282728]/55 text-sm leading-relaxed">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
