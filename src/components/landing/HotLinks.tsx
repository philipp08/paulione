"use client";

import { useReveal } from "@/hooks/useReveal";
import Image from "next/image";

const cards = [
  {
    label: "MANIFESTO",
    href: "#manifesto",
    img: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=800&h=600&fit=crop&auto=format",
  },
  {
    label: "INDUSTRIES",
    href: "#industries",
    img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop&auto=format",
  },
];

export function HotLinks() {
  const ref = useReveal(0.05);

  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="grid grid-cols-1 md:grid-cols-2">
      {cards.map((card, i) => (
        <a
          key={card.label}
          href={card.href}
          className={`reveal relative overflow-hidden group cursor-pointer ${
            i === 0 ? "border-b md:border-b-0 md:border-r border-[#282728]/10" : ""
          }`}
          style={{ aspectRatio: "4/3", transitionDelay: `${i * 0.1}s` }}
        >
          <Image
            src={card.img}
            alt={card.label}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-[#282728]/40 group-hover:bg-[#282728]/30 transition-colors" />
          <div className="absolute inset-0 flex items-end justify-center pb-10">
            <div className="bg-[#f8f8f8]/10 backdrop-blur-sm border border-[#f8f8f8]/20 rounded-full px-8 py-3">
              <span className="label-mono text-[#f8f8f8] tracking-widest">{card.label}</span>
            </div>
          </div>
        </a>
      ))}
    </section>
  );
}
