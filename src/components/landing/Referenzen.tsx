"use client";

import { useEffect, useRef, useCallback, useState } from "react";

interface Project {
  name: string;
  cat: string;
  img: string;
  href: string;
  desc: string;
}

const FALLBACK_PROJECTS: Project[] = [
  { name: "MK-Nailshop", cat: "Onlineshop", img: "https://onecdn.io/media/a457180b-662e-408f-8a2b-e44893cbd5b6/lg", href: "https://mk-nailshop.de", desc: "" },
  { name: "Fotografie Eschbach", cat: "Website", img: "https://onecdn.io/media/53053911-902b-4f5c-8d2e-2b59b4723f04/lg", href: "https://fotografie-eschbach.de", desc: "" },
  { name: "ShiGlauer", cat: "Website & Logo", img: "https://onecdn.io/media/e12013e6-f059-47b7-84cb-a362c2f040f6/lg", href: "https://shiglauer.ch", desc: "" },
  { name: "Meyer & Kersting", cat: "Marketing", img: "https://onecdn.io/media/5a3092ab-c0c1-4640-99d9-8daee4ed0fb5/lg", href: "https://instagram.com/meyerundkersting", desc: "Social Media & Ads" },
  { name: "Aldaerry", cat: "Werbemittel", img: "https://onecdn.io/media/1a0cc727-af22-4b4e-9f35-24b6267c89b8/lg", href: "", desc: "Produktetiketten Design" },
];

const ARROW_SVG = `<svg viewBox="0 0 24 24" style="width:11px;height:11px;stroke:currentColor;fill:none;stroke-width:2.2;stroke-linecap:round;stroke-linejoin:round;"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>`;

export function Referenzen() {
  const rootRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [projects, setProjects] = useState<Project[]>(FALLBACK_PROJECTS);

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
          } else if (p) { ns.push(document.createTextNode(p)); }
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

  // Fetch fresh data
  useEffect(() => {
    const CACHE_KEY = "paulione_refs_v1";
    try {
      const raw = sessionStorage.getItem(CACHE_KEY);
      if (raw) {
        const cached = JSON.parse(raw) as Project[];
        if (cached.length >= 3) setProjects(cached);
      }
    } catch { /* ignore */ }

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 5000);
    const proxyUrl = "https://api.allorigins.win/raw?url=" + encodeURIComponent("https://pauli-one.de/referenzen");

    fetch(proxyUrl, { signal: controller.signal })
      .then((res) => { clearTimeout(timer); if (!res.ok) throw new Error("bad"); return res.text(); })
      .then((html) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");
        const fresh: Project[] = [];
        doc.querySelectorAll('img[src*="onecdn.io/media"]').forEach((img) => {
          let src = img.getAttribute("src") || "";
          if (!src || img.closest("footer") || img.closest("nav")) return;
          const wrapper = img.closest("a") || img.parentElement;
          let href = "";
          if (wrapper?.tagName === "A") {
            href = wrapper.getAttribute("href") || "";
            if (href.includes("pauli-one.de") || href === "/referenzen") href = "";
          }
          const name = img.getAttribute("alt") || "";
          if (!name || /projekt|ihr unternehmen/i.test(name)) return;
          let cat = "Projekt";
          const parent = img.closest("a") || img.closest("div");
          if (parent) {
            const t = parent.textContent || "";
            if (t.includes("Website") && t.includes("Logo")) cat = "Website & Logo";
            else if (t.includes("Onlineshop")) cat = "Onlineshop";
            else if (t.includes("Website")) cat = "Website";
            else if (t.includes("Marketing")) cat = "Marketing";
            else if (t.includes("Werbemittel")) cat = "Werbemittel";
            else if (t.includes("Logo")) cat = "Logo";
          }
          if (!src.endsWith("/lg")) src = src.split("?")[0].replace(/\/(sm|md|xl)$/, "") + "/lg";
          if (!fresh.some((p) => p.img === src)) {
            fresh.push({ name, cat, img: src, href: href.startsWith("http") ? href : "", desc: "" });
          }
        });
        if (fresh.length >= 3) {
          try { sessionStorage.setItem(CACHE_KEY, JSON.stringify(fresh)); } catch { /* ignore */ }
          setProjects(fresh);
        }
      })
      .catch(() => { clearTimeout(timer); });

    return () => { clearTimeout(timer); controller.abort(); };
  }, []);

  // Animations
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

    observe(el.querySelector("#ref-badge"), (e) => e.classList.add("ref-in"), 0.5);

    animateTitle();
    const title = el.querySelector("#ref-title");
    observe(title, (t) => {
      t.querySelectorAll("span > span").forEach((w, i) => {
        setTimeout(() => {
          (w as HTMLElement).style.transform = "translateY(0)";
          (w as HTMLElement).style.opacity = "1";
        }, i * 90);
      });
    }, 0.3);

    // Card animations
    el.querySelectorAll(".ref-card, .ref-card-placeholder").forEach((card) => {
      observe(card, (c) => c.classList.add("ref-in"), 0.05);
    });

    // Tilt effect
    el.querySelectorAll(".ref-card").forEach((card) => {
      const c = card as HTMLElement;
      c.addEventListener("mousemove", (e: MouseEvent) => {
        const r = c.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        c.style.transform = `translateY(-5px) rotateX(${-y * 4}deg) rotateY(${x * 4}deg) scale(1.02)`;
      });
      c.addEventListener("mouseleave", () => { c.style.transform = ""; });
    });
  }, [projects, animateTitle]);

  return (
    <div className="ref-root" ref={rootRef}>
      <div className="ref-section">
        <div className="ref-container">
          <div className="ref-head">
            <div className="ref-badge" id="ref-badge">
              <span className="ref-badge-dot"></span>Ausgewählte Referenzen
            </div>
            <h2 className="ref-title" id="ref-title" ref={titleRef}>
              Projekte, auf die wir <em>stolz sind.</em>
            </h2>
          </div>
          <div className="ref-grid" id="ref-grid" ref={gridRef}>
            {projects.map((p, i) => {
              const Tag = p.href ? "a" : "div";
              const linkLabel = p.href
                ? p.href.replace(/^https?:\/\//, "").replace(/\/$/, "")
                : p.desc;
              return (
                <Tag
                  key={`${p.img}-${i}`}
                  className="ref-card"
                  {...(p.href ? { href: p.href, target: "_blank", rel: "noopener" } : { style: { cursor: "default" } })}
                  style={{ transitionDelay: `${i * 0.08}s` }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className="ref-card-img"
                    src={p.img}
                    alt={`${p.cat} – ${p.name} | PauliONE Referenz`}
                    loading="lazy"
                  />
                  <span className="ref-card-cat">{p.cat}</span>
                  <div className="ref-card-overlay">
                    <div className="ref-card-name">{p.name}</div>
                    <span
                      className="ref-card-link-label"
                      dangerouslySetInnerHTML={{
                        __html: p.href ? `${linkLabel} ${ARROW_SVG}` : linkLabel,
                      }}
                    />
                  </div>
                </Tag>
              );
            })}
            {/* "Ihr Projekt" placeholder */}
            <a
              className="ref-card-placeholder"
              href="/anfrage"
              style={{ transitionDelay: `${projects.length * 0.08}s` }}
            >
              <div className="ref-card-placeholder-icon">
                <svg viewBox="0 0 24 24" style={{ width: "18px", height: "18px", stroke: "#004aad", fill: "none", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round" }}>
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              </div>
              <div className="ref-card-placeholder-label">Ihr Projekt</div>
              <div className="ref-card-placeholder-sub">Melden Sie sich gerne →</div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
