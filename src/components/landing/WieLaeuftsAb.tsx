"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

export function WieLaeuftsAb() {
  const rootRef = useRef<HTMLDivElement>(null);

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
    observe(el.querySelector(".wla-badge"), (e) => e.classList.add("wla-anim-in"), 0.5);

    // Title words
    const h2 = el.querySelector(".wla-h2");
    if (h2) {
      observe(h2, (t) => {
        t.querySelectorAll(".wla-word").forEach((w, i) => {
          setTimeout(() => w.classList.add("wla-anim-in"), i * 80);
        });
      }, 0.3);
    }

    // Subtitle
    observe(el.querySelector(".wla-sub"), (e) => e.classList.add("wla-anim-in"), 0.3);

    // Step cards
    el.querySelectorAll(".wla-step").forEach((step) => {
      observe(step, (e) => e.classList.add("is-visible"), 0.1);
    });

    // Bottom
    observe(el.querySelector(".wla-bottom"), (e) => e.classList.add("wla-anim-in"), 0.2);

    // Magnetic tilt
    el.querySelectorAll(".wla-step").forEach((card) => {
      const c = card as HTMLElement;
      c.addEventListener("mousemove", (e: MouseEvent) => {
        const r = c.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        c.style.transform = `translateY(-6px) rotateX(${-y * 7}deg) rotateY(${x * 7}deg) scale(1.015)`;
      });
      c.addEventListener("mouseleave", () => { c.style.transform = ""; });
    });
  }, []);

  return (
    <div className="wla-wrap-outer" ref={rootRef}>
      <section className="wla">
        <div className="wla-wrap">

          <div className="wla-head">
            <div className="wla-badge">
              <span className="wla-pulse"></span>
              So arbeiten wir zusammen
            </div>
            <h2 className="wla-h2">
              <span className="wla-word">Wie</span>{" "}
              <span className="wla-word" style={{ transitionDelay: "0.08s" }}>läuft&apos;s</span>{" "}
              <span className="wla-word" style={{ transitionDelay: "0.16s", display: "inline-block" }}><em>eigentlich ab?</em></span>
            </h2>
            <p className="wla-sub">
              Von der ersten Nachricht bis zur fertigen Website –<br />transparent, persönlich und auf den Punkt.
            </p>
          </div>

          <div className="wla-layout">
            {/* Step 1 - Featured */}
            <div className="wla-step wla-step--featured" style={{ animationDelay: ".05s" }}>
              <div className="wla-shimmer"></div>
              <span className="wla-num"><span className="wla-num-line"></span>01</span>
              <div className="wla-icon-row">
                <div className="wla-icon">
                  <svg viewBox="0 0 24 24">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.2h3a2 2 0 0 1 2 1.72c.128.96.341 1.903.63 2.81a2 2 0 0 1-.45 2.11L7.91 9a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.29 1.85.501 2.81.63A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <span className="wla-arrow-badge">Kostenlos →</span>
              </div>
              <h3 className="wla-title">Erstgespräch</h3>
              <p className="wla-text">Sie nehmen Kontakt auf und wir melden uns bei Ihnen. Gemeinsam finden wir die passende Lösung für Ihr Unternehmen – völlig unverbindlich.</p>
            </div>

            {/* Step 2 */}
            <div className="wla-step" style={{ animationDelay: ".18s" }}>
              <div className="wla-shimmer"></div>
              <span className="wla-num"><span className="wla-num-line"></span>02</span>
              <div className="wla-icon-row">
                <div className="wla-icon">
                  <svg viewBox="0 0 24 24">
                    <rect x="2" y="3" width="20" height="14" rx="2" />
                    <line x1="8" y1="21" x2="16" y2="21" />
                    <line x1="12" y1="17" x2="12" y2="21" />
                  </svg>
                </div>
              </div>
              <h3 className="wla-title">Auftrag beginnt</h3>
              <p className="wla-text">Wir starten mit der Umsetzung. Je nach Komplexität variiert die Dauer – sprechen Sie uns gerne direkt an.</p>
            </div>

            {/* Step 3 */}
            <div className="wla-step" style={{ animationDelay: ".31s" }}>
              <div className="wla-shimmer"></div>
              <span className="wla-num"><span className="wla-num-line"></span>03</span>
              <div className="wla-icon-row">
                <div className="wla-icon">
                  <svg viewBox="0 0 24 24">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                </div>
              </div>
              <h3 className="wla-title">Rücksprache</h3>
              <p className="wla-text">Wir halten Sie laufend auf dem Stand und stimmen alle Details direkt mit Ihnen ab – bis alles perfekt ist.</p>
            </div>

            {/* Step 4 */}
            <div className="wla-step" style={{ animationDelay: ".44s" }}>
              <div className="wla-shimmer"></div>
              <span className="wla-num"><span className="wla-num-line"></span>04</span>
              <div className="wla-icon-row">
                <div className="wla-icon">
                  <svg viewBox="0 0 24 24">
                    <rect x="3" y="4" width="18" height="18" rx="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                    <path d="m9 16 2 2 4-4" />
                  </svg>
                </div>
              </div>
              <h3 className="wla-title">Auftrag abgeschlossen</h3>
              <p className="wla-text">Ihr Projekt geht live. Wir stellen die Website online oder liefern das fertige Design – sauber und pünktlich.</p>
            </div>
          </div>

          <div className="wla-bottom">
            <div className="wla-meta">
              <span className="wla-tag">
                <svg viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                Keine versteckten Kosten
              </span>
              <span className="wla-tag">
                <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                Schnelle Reaktionszeit
              </span>
              <span className="wla-tag">
                <svg viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                Persönlicher Ansprechpartner
              </span>
            </div>
            <Link href="/anfrage" className="wla-btn" aria-label="Webdesign-Angebot für mein Projekt einholen">
              Webdesign-Angebot einholen
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>

        </div>
      </section>
    </div>
  );
}
