"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = footerRef.current;
    if (!root) return;

    const els = root.querySelectorAll(".ft-anim");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.remove("ft-pre");
            e.target.classList.add("ft-in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    els.forEach((el) => {
      el.classList.add("ft-pre");
      io.observe(el);
    });

    return () => io.disconnect();
  }, []);

  return (
    <footer className="ft" ref={footerRef}>
      <div className="ft-watermark">ONE</div>

      <div className="ft-inner">
        {/* CTA */}
        <div className="ft-cta ft-anim">
          <div>
            <div className="ft-cta__eyebrow">
              <span className="ft-pulse"></span>
              Bereit für den nächsten Schritt?
            </div>
            <h2 className="ft-cta__headline">
              Ihre Website,<br />
              <em>neu gedacht.</em>
            </h2>
          </div>
          <Link href="/anfrage" className="ft-cta__btn">
            Jetzt anfragen
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>

        {/* GRID */}
        <div className="ft-main">
          {/* Brand */}
          <div className="ft-brand ft-anim" style={{ transitionDelay: ".04s" }}>
            <Link href="/" className="ft-logo">
              <img
                src="https://i.ibb.co/r2spbJVV/Schwarz-transparent-2.png"
                alt="PauliONE"
                loading="eager"
                decoding="async"
              />
            </Link>
            <p className="ft-brand__tagline">
              Webdesign, das nicht nur gut aussieht — sondern messbar mehr Anfragen bringt.
            </p>
            <div className="ft-rating">
              <span className="ft-rating__stars">★★★★★</span>
              <span className="ft-rating__text">
                <strong>5/5</strong> · 20+ Bewertungen
              </span>
            </div>
            <div className="ft-socials" style={{ marginTop: "14px" }}>
              <a
                href="https://www.instagram.com/paulione.wd/"
                target="_blank"
                rel="noopener"
                aria-label="Instagram"
              >
                <svg viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/company/paulione"
                target="_blank"
                rel="noopener"
                aria-label="LinkedIn"
              >
                <svg viewBox="0 0 24 24">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
              <a href="/" target="_blank" rel="noopener" aria-label="Website">
                <svg viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div className="ft-anim" style={{ transitionDelay: ".10s" }}>
            <p className="ft-nav__title">Navigation</p>
            <ul className="ft-nav__list">
              <li>
                <Link href="/">Startseite</Link>
              </li>
              <li>
                <Link href="/referenzen">Projekte</Link>
              </li>
              <li>
                <Link href="/ueber-mich">Über mich</Link>
              </li>
              <li>
                <Link href="/kontakt">Kontakt</Link>
              </li>
              <li>
                <Link href="/anfrage">Angebot einholen</Link>
              </li>
            </ul>
          </div>

          {/* Regionen (Local SEO) */}
          <div className="ft-anim" style={{ transitionDelay: ".17s" }}>
            <p className="ft-nav__title">Regionen</p>
            <ul className="ft-nav__list">
              <li>
                <Link href="/webdesign-baden-baden">Webdesign Baden-Baden</Link>
              </li>
            </ul>
          </div>

          {/* Kontakt */}
          <div className="ft-anim" style={{ transitionDelay: ".24s" }}>
            <p className="ft-nav__title">Kontakt</p>
            <div className="ft-contact__item">
              <p className="ft-contact__label">E-Mail</p>
              <p className="ft-contact__val">
                <a href="mailto:philipp@pauli-one.de">philipp@pauli-one.de</a>
              </p>
            </div>
            <div className="ft-contact__item">
              <p className="ft-contact__label">Website</p>
              <p className="ft-contact__val">
                <a href="https://pauli-one.de" target="_blank" rel="noopener">
                  www.pauli-one.de
                </a>
              </p>
            </div>
            <div className="ft-contact__item" style={{ marginTop: "8px" }}>
              <p className="ft-contact__label">Standort</p>
              <p className="ft-contact__val">DE-76437, Rastatt</p>
            </div>
          </div>
        </div>

        <div className="ft-divider"></div>

        {/* BOTTOM */}
        <div className="ft-bottom ft-anim" style={{ transitionDelay: ".06s" }}>
          <p className="ft-bottom__copy">
            © 2026 <Link href="/">PauliONE</Link> · Alle Rechte vorbehalten.
          </p>
          <div className="ft-bottom__links">
            <Link href="/impressum" target="_blank" rel="noopener">
              Impressum
            </Link>
            <Link href="/datenschutz" target="_blank" rel="noopener">
              Datenschutz
            </Link>
            <Link href="/agb" target="_blank" rel="noopener">
              AGB
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
