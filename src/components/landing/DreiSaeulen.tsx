"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

export function DreiSaeulen() {
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
    observe(el.querySelector("#ds-badge"), (e) => e.classList.add("ds-in"), 0.5);

    // Title word animation
    const title = el.querySelector("#ds-title");
    if (title) {
      observe(title, (t) => {
        t.querySelectorAll(".ds-word").forEach((w, i) => {
          setTimeout(() => w.classList.add("ds-word-in"), i * 100);
        });
      }, 0.3);
    }

    // Subtitle
    observe(el.querySelector("#ds-subtitle"), (e) => {
      setTimeout(() => e.classList.add("ds-in"), 200);
    }, 0.3);

    // Cards
    [0, 1, 2].forEach((i) => {
      observe(el.querySelector(`#ds-card-${i}`), (e) => {
        setTimeout(() => e.classList.add("ds-card-in"), i * 130);
      }, 0.1);
    });

    // Bottom
    observe(el.querySelector("#ds-bottom"), (e) => e.classList.add("ds-in"), 0.2);

    // Magnetic tilt on cards
    el.querySelectorAll(".ds-card").forEach((card) => {
      const c = card as HTMLElement;
      c.addEventListener("mousemove", (e: MouseEvent) => {
        const r = c.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        c.style.transform = `translateY(-6px) rotateX(${-y * 6}deg) rotateY(${x * 6}deg) scale(1.012)`;
      });
      c.addEventListener("mouseleave", () => { c.style.transform = ""; });
    });
  }, []);

  const ArrowSvg = () => (
    <svg viewBox="0 0 24 24">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );

  return (
    <div className="ds-root" ref={rootRef}>
      <section className="ds-section">
        <div className="ds-container">

          <div className="ds-head">
            <div className="ds-badge" id="ds-badge">
              <span className="ds-badge-dot"></span>
              Unsere Leistungen
            </div>
            <h2 className="ds-title" id="ds-title">
              <span className="ds-word-wrap"><span className="ds-word">Drei</span></span>{" "}
              <span className="ds-word-wrap"><span className="ds-word" style={{ transitionDelay: "0.1s" }}>Säulen.</span></span>{" "}
              <span className="ds-word-wrap"><span className="ds-word" style={{ transitionDelay: "0.2s" }}>Ein</span></span>{" "}
              <span className="ds-word-wrap"><span className="ds-word" style={{ transitionDelay: "0.3s" }}><em>Auftritt</em>.</span></span>
            </h2>
            <p className="ds-subtitle" id="ds-subtitle">
              Von der ersten Idee bis zur fertigen Marke – alles aus einer Hand, strategisch durchdacht und sauber umgesetzt.
            </p>
          </div>

          <div className="ds-grid">
            {/* Card 1 - Featured */}
            <div className="ds-card ds-card--featured" id="ds-card-0">
              <div className="ds-card-shimmer"></div>
              <span className="ds-card-num"><span className="ds-card-num-line"></span>01</span>
              <div className="ds-card-icon-row">
                <div className="ds-card-icon">
                  <svg viewBox="0 0 24 24">
                    <rect x="2" y="3" width="20" height="14" rx="2" />
                    <line x1="8" y1="21" x2="16" y2="21" />
                    <line x1="12" y1="17" x2="12" y2="21" />
                  </svg>
                </div>
                <span className="ds-card-tag">Websites · Shops</span>
              </div>
              <h3 className="ds-card-title">Webdesign & E-Commerce</h3>
              <p className="ds-card-text">Websites, die nicht nur schön aussehen – sondern verkaufen. Von der Landingpage bis zum vollständigen Online-Shop gestalten wir digitale Erlebnisse, die Besucher in Kunden verwandeln.</p>
              <div className="ds-tags">
                <span className="ds-tag-pill">Landingpages</span>
                <span className="ds-tag-pill">Online-Shops</span>
                <span className="ds-tag-pill">CMS</span>
                <span className="ds-tag-pill">Performance</span>
              </div>
              <Link href="/webdesign" className="ds-card-link" aria-label="Mehr erfahren über Webdesign & E-Commerce">
                Webdesign entdecken <ArrowSvg />
              </Link>
            </div>

            {/* Card 2 */}
            <div className="ds-card" id="ds-card-1">
              <div className="ds-card-shimmer"></div>
              <span className="ds-card-num"><span className="ds-card-num-line"></span>02</span>
              <div className="ds-card-icon-row">
                <div className="ds-card-icon">
                  <svg viewBox="0 0 24 24">
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                  </svg>
                </div>
                <span className="ds-card-tag">Ads · Social</span>
              </div>
              <h3 className="ds-card-title">Marketing & Strategie</h3>
              <p className="ds-card-text">Sichtbarkeit ist kein Zufall. Mit gezielten Kampagnen, durchdachten Social-Media-Strategien und datengetriebenem Vorgehen bringen wir Ihr Angebot genau dort hin, wo Ihre Kunden sind.</p>
              <div className="ds-tags">
                <span className="ds-tag-pill">Google Ads</span>
                <span className="ds-tag-pill">Meta Ads</span>
                <span className="ds-tag-pill">SEO</span>
                <span className="ds-tag-pill">Content</span>
              </div>
              <Link href="/marketing" className="ds-card-link" aria-label="Mehr erfahren über Marketing & Strategie">
                Marketing entdecken <ArrowSvg />
              </Link>
            </div>

            {/* Card 3 */}
            <div className="ds-card" id="ds-card-2">
              <div className="ds-card-shimmer"></div>
              <span className="ds-card-num"><span className="ds-card-num-line"></span>03</span>
              <div className="ds-card-icon-row">
                <div className="ds-card-icon">
                  <svg viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="3" />
                    <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
                  </svg>
                </div>
                <span className="ds-card-tag">Logos · Identität</span>
              </div>
              <h3 className="ds-card-title">Design & Branding</h3>
              <p className="ds-card-text">Eine Marke, die im Kopf bleibt. Wir entwickeln Logos, Corporate Designs und visuelle Identitäten, die Ihre Werte verkörpern – unverwechselbar und konsistent über alle Kanäle.</p>
              <div className="ds-tags">
                <span className="ds-tag-pill">Logo-Design</span>
                <span className="ds-tag-pill">Corporate Design</span>
                <span className="ds-tag-pill">Brand Guide</span>
              </div>
              <Link href="/branding" className="ds-card-link" aria-label="Mehr erfahren über Design & Markenauftritt">
                Branding entdecken <ArrowSvg />
              </Link>
            </div>
          </div>

          <div className="ds-bottom" id="ds-bottom">
            <div className="ds-meta">
              <span className="ds-meta-item">
                <svg viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                Alles aus einer Hand
              </span>
              <span className="ds-meta-item">
                <svg viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                Persönliche Betreuung
              </span>
              <span className="ds-meta-item">
                <svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                Premium-Qualität
              </span>
            </div>
            <Link href="/anfrage" className="ds-btn" aria-label="Webdesign-Leistungen anfragen und Angebot erhalten">
              Webdesign anfragen
              <svg viewBox="0 0 24 24">
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
