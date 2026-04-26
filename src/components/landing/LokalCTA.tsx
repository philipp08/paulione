"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

export function LokalCTA() {
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

    observe(el.querySelector("#lc-top"), (e) => e.classList.add("lc-in"), 0.15);
    observe(el.querySelector("#lc-cta"), (e) => e.classList.add("lc-in"), 0.15);
  }, []);

  const LocationIcon = () => (
    <svg viewBox="0 0 24 24">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );

  return (
    <div className="lc-root" ref={rootRef}>
      <div className="lc-container">

        <div className="lc-top" id="lc-top">
          <div className="lc-badge">
            <span className="lc-badge-dot"></span>Regional verankert
          </div>
          <h2 className="lc-title">Ihr Partner in <em>Ihrer Region.</em></h2>
          <p className="lc-sub">
            Ich kenne die Region, ihre Unternehmen und ihre Menschen. Das ist kein Zufall — das ist mein Vorteil für Sie.
          </p>
          <div className="lc-pills">
            <span className="lc-pill"><LocationIcon />Rastatt</span>
            <span className="lc-pill"><LocationIcon />Baden-Baden</span>
            <span className="lc-pill"><LocationIcon />Karlsruhe</span>
            <span className="lc-pill"><LocationIcon />Offenburg</span>
            <span className="lc-pill"><LocationIcon />Bühl</span>
            <span className="lc-pill"><LocationIcon />& deutschlandweit</span>
          </div>
        </div>

        <div className="lc-cta" id="lc-cta">
          <h2 className="lc-cta-h2">
            Bereit für einen Webauftritt,<br />der wirklich <em>überzeugt?</em>
          </h2>
          <p className="lc-cta-lead">
            Schildern Sie mir Ihr Projekt — ich antworte innerhalb von 24 Stunden mit konkreten Ideen und einem fairen Angebot.
          </p>
          <div className="lc-cta-actions">
            <Link href="/anfrage" className="lc-btn" aria-label="Kostenloses Webdesign-Beratungsgespräch buchen">
              Kostenlos beraten lassen
              <svg viewBox="0 0 24 24">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
            <Link href="/referenzen" className="lc-btn-ghost" aria-label="Webdesign-Referenzprojekte von PauliONE ansehen">
              Unsere Projekte ansehen
            </Link>
          </div>
          <span className="lc-cta-note">Kostenlos · Unverbindlich · Antwort in 24h</span>
        </div>

      </div>
    </div>
  );
}
