"use client";

import { useEffect, useRef } from "react";

export function useReveal(threshold = 0.05) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.querySelectorAll(".reveal").forEach((child) =>
              child.classList.add("visible")
            );
            // Also mark the section itself if it has the class
            if (e.target.classList.contains("reveal")) {
              e.target.classList.add("visible");
            }
            observer.unobserve(e.target);
          }
        });
      },
      { threshold, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return ref;
}
