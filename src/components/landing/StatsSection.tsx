"use client";

import { useEffect, useRef, useCallback } from "react";

interface StatCell {
  target: number;
  suffix: string;
  label: string;
  ariaLabel: string;
  delay: string;
}

const STATS: StatCell[] = [
  { target: 42, suffix: "+", label: "Projekte<br/>umgesetzt", ariaLabel: "42 Projekte umgesetzt", delay: "0s" },
  { target: 5, suffix: "/5", label: "Kundenbewertung<br/>im Schnitt", ariaLabel: "Kundenbewertung 5 von 5", delay: ".1s" },
  { target: 3, suffix: "+", label: "Jahre<br/>Erfahrung", ariaLabel: "3 Jahre Erfahrung", delay: ".2s" },
  { target: 24, suffix: "h", label: "Maximale<br/>Reaktionszeit", ariaLabel: "Maximale Reaktionszeit 24 Stunden", delay: ".3s" },
];

export function StatsSection() {
  const rootRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  const animateTitle = useCallback(() => {
    const t = titleRef.current;
    if (!t) return;

    const ns: Node[] = [];
    t.childNodes.forEach((n) => {
      if (n.nodeType === Node.TEXT_NODE) {
        (n.textContent || "").split(/(\s+)/).forEach((p) => {
          if (/\S/.test(p)) {
            const w = document.createElement("span");
            w.style.cssText = "display:inline-block;overflow:hidden;vertical-align:bottom;padding-bottom:.05em;";
            const i = document.createElement("span");
            i.style.cssText = "display:inline-block;transform:translateY(110%);opacity:0;transition:transform .7s cubic-bezier(.16,1,.3,1),opacity .5s ease;";
            i.textContent = p;
            w.appendChild(i);
            ns.push(w);
          } else if (p) {
            ns.push(document.createTextNode(p));
          }
        });
      } else if (n.nodeName === "EM") {
        const w = document.createElement("span");
        w.style.cssText = "display:inline-block;overflow:hidden;vertical-align:bottom;padding-bottom:.05em;";
        const i = document.createElement("span");
        i.style.cssText = "display:inline-block;transform:translateY(110%);opacity:0;transition:transform .7s cubic-bezier(.16,1,.3,1),opacity .5s ease;";
        i.appendChild(n.cloneNode(true));
        w.appendChild(i);
        ns.push(w);
        ns.push(document.createTextNode(" "));
      }
    });
    t.innerHTML = "";
    ns.forEach((n) => t.appendChild(n));
  }, []);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    function observe(target: Element | null, cb: (el: Element) => void, threshold = 0.15) {
      if (!target) return;
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) { cb(e.target); io.unobserve(e.target); }
          });
        },
        { threshold }
      );
      io.observe(target);
    }

    // Badge
    observe(el.querySelector("#st-badge"), (e) => e.classList.add("st-in"), 0.5);

    // Title animation
    animateTitle();
    const title = el.querySelector("#st-title");
    observe(title, (t) => {
      t.querySelectorAll("span > span").forEach((w, i) => {
        setTimeout(() => {
          (w as HTMLElement).style.transform = "translateY(0)";
          (w as HTMLElement).style.opacity = "1";
        }, i * 90);
      });
    }, 0.3);

    // Counter cells
    el.querySelectorAll("[data-st]").forEach((cell) => {
      observe(cell, (c) => {
        c.classList.add("st-in");
        const target = parseInt(c.getAttribute("data-target") || "0");
        const counter = c.querySelector(".st-counter");
        if (!counter) return;
        let startTime: number | null = null;
        function step(ts: number) {
          if (!startTime) startTime = ts;
          const progress = Math.min((ts - startTime) / 1400, 1);
          const ease = 1 - Math.pow(1 - progress, 3);
          counter!.textContent = String(Math.round(ease * target));
          if (progress < 1) requestAnimationFrame(step);
        }
        setTimeout(() => requestAnimationFrame(step), 200);
      }, 0.15);
    });
  }, [animateTitle]);

  return (
    <div className="st-root" ref={rootRef}>
      <div className="st-container">
        <div className="st-head">
          <div className="st-badge" id="st-badge">
            <span className="st-badge-dot"></span>Zahlen, die überzeugen
          </div>
          <h2 className="st-title" id="st-title" ref={titleRef}>
            Ergebnisse, die für sich <em>sprechen.</em>
          </h2>
        </div>
        <div className="st-grid">
          {STATS.map((stat, idx) => (
            <div
              key={idx}
              className="st-cell"
              data-st=""
              data-target={stat.target}
              data-suffix={stat.suffix}
              aria-label={stat.ariaLabel}
              style={{ transitionDelay: stat.delay }}
            >
              <div className="st-num" {...(stat.suffix === "/5" ? { role: "img", "aria-label": "5 von 5" } : {})}>
                <span className="st-counter" {...(stat.suffix === "/5" ? { "aria-hidden": "true" } : {})}>0</span>
                <span {...(stat.suffix === "/5" ? { "aria-hidden": "true" } : {})}>{stat.suffix}</span>
              </div>
              <div className="st-label" dangerouslySetInnerHTML={{ __html: stat.label }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
