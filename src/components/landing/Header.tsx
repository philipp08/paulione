"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";

/* ── Data ─────────────────────────────────────────────────────── */

const services = [
  { num: "01", title: "Webauftritt",             sub: "Website, Onlineshop oder Re-design",      href: "/webauftritt" },
  { num: "02", title: "Marketing & Strategie",   sub: "Advertising, Social Media Marketing",     href: "/marketing-und-strategie" },
  { num: "03", title: "Design & Markenauftritt", sub: "Logo, Werbemittel, Corporate Design",     href: "/design-und-markenauftritt" },
  { num: "04", title: "Abomodell",               sub: "All-In-One Projekte im Abomodell",        href: "/abomodell" },
  { num: "05", title: "Website-Service",         sub: "Instandhaltung Ihrer Website o. Onlineshop", href: "/service" },
];

const tickerProjects = [
  { name: "EMA Immobilien",      cat: "Webauftritt" },
  { name: "MK Nailshop",         cat: "Design & Webauftritt" },
  { name: "Einklang by Kirsten", cat: "Markenauftritt" },
  { name: "Müller Vermietungen", cat: "Webauftritt" },
  { name: "ShiGlauer",           cat: "Design & Markenauftritt" },
  { name: "Rastetten",           cat: "Webauftritt" },
];

// Triple the list for seamless infinite scroll
const tickerItems = [...tickerProjects, ...tickerProjects, ...tickerProjects];

const testimonials = [
  {
    text: "Alles was ich mir mit meinem Online Shop vorgestellt habe wurde umgesetzt! Immer hilfsbereit, zuverlässig, kompetent, freundlich. Kann ich nur weiter empfehlen!",
    name: "K. Mekkel", company: "MK Nailshop",
  },
  {
    text: "Ich kann PauliONE uneingeschränkt weiter empfehlen. Mit einer Engelsgeduld alles umgesetzt was ich wollte – Preis, Leistung, Service alles TOP.",
    name: "Kirsten Asal", company: "Einklang by Kirsten",
  },
  {
    text: "Sehr kompetente Beratung mit sehr viel Engagement beim Gestalten und Umsetzen der Homepage – absolut empfehlenswert in jeder Hinsicht.",
    name: "Marco Mueller", company: "Kunde",
  },
  {
    text: "Toller und sehr engagierter Service. Philipp hat für uns Online-Marketingkampagnen erstellt – mit großem Erfolg und überschaubaren Werbekosten.",
    name: "St. Leuschner", company: "Immohaus Baden",
  },
];

/* ── Component ────────────────────────────────────────────────── */

export function Header() {
  const [megaOpen, setMegaOpen]   = useState(false);
  const [mobOpen,  setMobOpen]    = useState(false);
  const [mobSubOpen, setMobSubOpen] = useState(false);
  const [testiIdx, setTestiIdx]   = useState(0);

  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const tickerRef     = useRef<HTMLDivElement>(null);
  const stepRef       = useRef(0);
  const animRef       = useRef(false);
  const pauseRef      = useRef(false);

  /* Mega menu hover */
  const openMega = useCallback(() => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    setMegaOpen(true);
  }, []);

  const scheduleMegaClose = useCallback(() => {
    closeTimerRef.current = setTimeout(() => setMegaOpen(false), 180);
  }, []);

  /* Close on outside click */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const t = e.target as Node;
      const mega = document.getElementById("pone-mega-dl");
      const niDl = document.getElementById("pone-ni-dl");
      if (!mega?.contains(t) && !niDl?.contains(t)) setMegaOpen(false);
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  /* Escape closes everything */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setMegaOpen(false); setMobOpen(false); }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  /* Lock body scroll when mobile menu open */
  useEffect(() => {
    document.body.style.overflow = mobOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobOpen]);

  /* Testimonial auto-rotate */
  useEffect(() => {
    const id = setInterval(
      () => setTestiIdx(i => (i + 1) % testimonials.length),
      4000
    );
    return () => clearInterval(id);
  }, []);

  /* Project ticker step scroll */
  useEffect(() => {
    const ticker = tickerRef.current;
    if (!ticker) return;

    const items = ticker.querySelectorAll<HTMLElement>(".pone-ticker-item");
    if (!items.length) return;

    const itemH       = items[0].getBoundingClientRect().height || 34;
    const totalItems  = tickerProjects.length; // one third

    ticker.style.transition = "none";
    ticker.style.transform  = "translateY(0)";

    const id = setInterval(() => {
      if (pauseRef.current || animRef.current) return;
      animRef.current = true;
      stepRef.current++;

      ticker.style.transition = "transform 0.55s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
      ticker.style.transform  = `translateY(-${stepRef.current * itemH}px)`;

      setTimeout(() => {
        if (stepRef.current >= totalItems) {
          stepRef.current = 0;
          ticker.style.transition = "none";
          ticker.style.transform  = "translateY(0)";
          requestAnimationFrame(() =>
            requestAnimationFrame(() => {
              ticker.style.transition = "transform 0.55s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
            })
          );
        }
        animRef.current = false;
      }, 580);
    }, 2200);

    return () => clearInterval(id);
  }, []);

  return (
    <>
      {/* ── Logo ──────────────────────────────────────────────── */}
      <div className="pone-logo-wrap">
        <Link href="https://www.pauli-one.de" className="pone-logo" aria-label="PauliONE">
          <span className="pone-logo-pauli">PAULI</span>
          <span className="pone-logo-block">
            <span className="pone-logo-one">ONE</span>
          </span>
        </Link>
      </div>

      {/* ── Burger (mobile) ───────────────────────────────────── */}
      <div className="pone-burger-wrap">
        <button
          className={`pone-burger-btn${mobOpen ? " open" : ""}`}
          aria-label={mobOpen ? "Menü schließen" : "Menü öffnen"}
          aria-expanded={mobOpen}
          onClick={() => setMobOpen(v => !v)}
        >
          <span className="pone-bl pone-bl1" />
          <span className="pone-bl pone-bl2" />
          <span className="pone-bl pone-bl3" />
        </button>
      </div>

      {/* ── Desktop nav ───────────────────────────────────────── */}
      <div className="pone-nav-links-wrap">
        <ul className="pone-nav-desktop">
          <li className="pone-nav-item">
            <Link href="https://www.pauli-one.de">Startseite</Link>
          </li>
          <li className="pone-nav-item">
            <Link href="/ueber-mich">Über mich</Link>
          </li>
          <li className="pone-nav-item">
            <Link href="/referenzen">Projekte</Link>
          </li>
          <li
            id="pone-ni-dl"
            className={`pone-nav-item${megaOpen ? " mega-open" : ""}`}
            onMouseEnter={openMega}
            onMouseLeave={scheduleMegaClose}
          >
            <button
              aria-expanded={megaOpen}
              aria-controls="pone-mega-dl"
            >
              Dienstleistungen <span className="pone-nav-chevron" />
            </button>
          </li>
          <li className="pone-nav-item">
            <Link href="/kontakt">Kontakt</Link>
          </li>
        </ul>
      </div>

      {/* ── Desktop CTA ───────────────────────────────────────── */}
      <div className="pone-nav-cta-wrap">
        <Link href="/anfrage" className="pone-nav-cta">Angebot einholen</Link>
      </div>

      {/* ── Mega menu ─────────────────────────────────────────── */}
      <div
        id="pone-mega-dl"
        className={`pone-mega-panel${megaOpen ? " open" : ""}`}
        role="region"
        aria-label="Dienstleistungen Menü"
        onMouseEnter={() => { if (closeTimerRef.current) clearTimeout(closeTimerRef.current); }}
        onMouseLeave={scheduleMegaClose}
      >
        <div className="pone-mega-inner">

          {/* Left */}
          <div className="pone-mega-left">
            <span className="pone-mega-eyebrow">Dienstleistungen</span>
            <div className="pone-mega-section-hl">
              <div className="pone-mega-hl-text">Was wir für Sie tun.</div>
            </div>
            <ul className="pone-mega-list">
              {services.map(s => (
                <li key={s.num}>
                  <Link href={s.href} className="pone-mega-link">
                    <span className="pone-ml-num">{s.num}</span>
                    <span className="pone-ml-body">
                      <span className="pone-ml-title">{s.title}</span>
                      <span className="pone-ml-sub">{s.sub}</span>
                    </span>
                    <span className="pone-ml-arr">
                      <svg width="18" height="10" viewBox="0 0 18 10" fill="none">
                        <path d="M1 5H17M12 1L17 5L12 9" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" />
                      </svg>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Right */}
          <div className="pone-mega-right">

            {/* Featured Projects ticker */}
            <div className="pone-mega-projects">
              <div className="pone-mega-eyebrow pone-mega-eyebrow--right">Featured Projects</div>
              <div className="pone-mega-section-hl">
                <div className="pone-mega-hl-text pone-mega-hl-text--sm">Arbeit, die überzeugt.</div>
              </div>
              <div
                className="pone-mega-ticker-wrap"
                onMouseEnter={() => { pauseRef.current = true; }}
                onMouseLeave={() => { pauseRef.current = false; }}
              >
                <div className="pone-mega-ticker" ref={tickerRef}>
                  {tickerItems.map((p, i) => (
                    <Link key={i} href="/referenzen" className="pone-ticker-item">
                      <span className="pone-ticker-num">
                        {String((i % tickerProjects.length) + 1).padStart(2, "0")}
                      </span>
                      <span className="pone-ticker-info">
                        <span className="pone-ticker-name">{p.name}</span>
                        <span className="pone-ticker-cat">{p.cat}</span>
                      </span>
                      <span className="pone-ticker-arr">→</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="pone-mega-divider" />

            {/* Testimonials */}
            <div className="pone-mega-testi">
              <div className="pone-mega-eyebrow pone-mega-eyebrow--right">Kundenstimmen</div>
              <div className="pone-mega-section-hl">
                <div className="pone-mega-hl-text pone-mega-hl-text--sm">Was Kunden über uns sagen.</div>
              </div>
              <div className="pone-testi-quote-icon">
                <svg width="16" height="12" viewBox="0 0 18 14" fill="none">
                  <path d="M0 14V8.4C0 5.6 1.8 3.2 5.4 1.2L6.6 2.8C4.6 3.8 3.4 5 3 6.4h3V14H0zm9 0V8.4C9 5.6 10.8 3.2 14.4 1.2L15.6 2.8C13.6 3.8 12.4 5 12 6.4h3V14H9z" fill="#1757c2" opacity="0.5" />
                </svg>
              </div>
              <div className="pone-testi-slides">
                {testimonials.map((t, i) => (
                  <div key={i} className={`pone-testi-slide${testiIdx === i ? " active" : ""}`}>
                    <p className="pone-testi-text">{t.text}</p>
                    <div className="pone-testi-author">
                      <span className="pone-testi-dot" />
                      <span className="pone-testi-name">{t.name}</span>
                      <span className="pone-testi-sep">·</span>
                      <span className="pone-testi-company">{t.company}</span>
                      <span className="pone-testi-stars">★★★★★</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="pone-testi-dots">
                {testimonials.map((_, i) => (
                  <span
                    key={i}
                    className={`pone-testi-pip${testiIdx === i ? " active" : ""}`}
                    onClick={() => setTestiIdx(i)}
                  />
                ))}
              </div>
            </div>

            {/* Mega CTA */}
            <div className="pone-mega-bottom">
              <Link href="/anfrage" className="pone-mega-cta-link">
                <span className="pone-mega-cta-inner">
                  <span className="pone-mega-cta-label">Angebot einholen</span>
                  <svg width="20" height="10" viewBox="0 0 20 10" fill="none">
                    <path d="M1 5H19M14 1L19 5L14 9" stroke="currentColor" strokeWidth="0.85" strokeLinecap="round" />
                  </svg>
                </span>
                <span className="pone-mega-cta-line" />
              </Link>
              <span className="pone-mega-cta-note">Antwort innerhalb von 24 Stunden</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Mobile overlay ────────────────────────────────────── */}
      <div
        className={`pone-mob-overlay${mobOpen ? " open" : ""}`}
        aria-hidden={!mobOpen}
      >
        <div className="pone-mob-spacer" />
        <div className="pone-mob-body">
          <ul className="pone-mob-list">
            <li className="pone-mob-item">
              <Link href="https://www.pauli-one.de" className="pone-mob-row" onClick={() => setMobOpen(false)}>
                <span className="pone-mob-row-title">Startseite</span>
                <span className="pone-mob-row-icon"><ArrowIcon /></span>
              </Link>
            </li>
            <li className="pone-mob-item">
              <Link href="/ueber-mich" className="pone-mob-row" onClick={() => setMobOpen(false)}>
                <span className="pone-mob-row-title">Über mich</span>
                <span className="pone-mob-row-icon"><ArrowIcon /></span>
              </Link>
            </li>
            <li className="pone-mob-item">
              <Link href="/referenzen" className="pone-mob-row" onClick={() => setMobOpen(false)}>
                <span className="pone-mob-row-title">Projekte</span>
                <span className="pone-mob-row-icon"><ArrowIcon /></span>
              </Link>
            </li>
            <li className="pone-mob-item">
              <button
                className="pone-mob-row"
                onClick={() => setMobSubOpen(v => !v)}
              >
                <span className="pone-mob-row-title">Dienstleistungen</span>
                <span className={`pone-mob-row-icon${mobSubOpen ? " rotated" : ""}`}>
                  <ArrowIcon />
                </span>
              </button>
              <div className={`pone-mob-sub${mobSubOpen ? " open" : ""}`}>
                <Link href="/webauftritt" className="pone-mob-sub-item" onClick={() => setMobOpen(false)}>
                  <span className="pone-mob-sub-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="1"/><path d="M8 21h8M12 17v4"/><path d="M7 8h2M7 11h2"/></svg>
                  </span>
                  <span>
                    <span className="pone-mob-sub-title">Webauftritt</span>
                    <span className="pone-mob-sub-desc">Website, Onlineshop oder Re-design</span>
                  </span>
                </Link>
                <Link href="/marketing-und-strategie" className="pone-mob-sub-item" onClick={() => setMobOpen(false)}>
                  <span className="pone-mob-sub-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/></svg>
                  </span>
                  <span>
                    <span className="pone-mob-sub-title">Marketing &amp; Strategie</span>
                    <span className="pone-mob-sub-desc">Advertising, Social Media Marketing</span>
                  </span>
                </Link>
                <Link href="/design-und-markenauftritt" className="pone-mob-sub-item" onClick={() => setMobOpen(false)}>
                  <span className="pone-mob-sub-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
                  </span>
                  <span>
                    <span className="pone-mob-sub-title">Design &amp; Markenauftritt</span>
                    <span className="pone-mob-sub-desc">Logo, Werbemittel, Corporate Design</span>
                  </span>
                </Link>
                <Link href="/abomodell" className="pone-mob-sub-item" onClick={() => setMobOpen(false)}>
                  <span className="pone-mob-sub-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21.21 15.89A10 10 0 118 2.83"/><path d="M22 12A10 10 0 0012 2v10z"/></svg>
                  </span>
                  <span>
                    <span className="pone-mob-sub-title">Abomodell</span>
                    <span className="pone-mob-sub-desc">All-In-One Projekte im Abomodell</span>
                  </span>
                </Link>
                <Link href="/service" className="pone-mob-sub-item" onClick={() => setMobOpen(false)}>
                  <span className="pone-mob-sub-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 18v-6a9 9 0 0118 0v6"/><path d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3zM3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3z"/></svg>
                  </span>
                  <span>
                    <span className="pone-mob-sub-title">Website-Service</span>
                    <span className="pone-mob-sub-desc">Instandhaltung Ihrer Website o. Onlineshop</span>
                  </span>
                </Link>
              </div>
            </li>
            <li className="pone-mob-item">
              <Link href="/kontakt" className="pone-mob-row" onClick={() => setMobOpen(false)}>
                <span className="pone-mob-row-title">Kontakt</span>
                <span className="pone-mob-row-icon"><ArrowIcon /></span>
              </Link>
            </li>
          </ul>
        </div>

        <div className="pone-mob-footer">
          <Link href="/anfrage" className="pone-mob-cta" onClick={() => setMobOpen(false)}>
            Angebot einholen
            <svg width="12" height="7" viewBox="0 0 12 7" fill="none">
              <path d="M1 3.5H11M7.5 1L11 3.5L7.5 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
          </Link>
          <div className="pone-mob-contacts">
            <div className="pone-mob-contact-row">
              <svg className="pone-mob-contact-icon" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.68A2 2 0 012 .99h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
              </svg>
              <a href="tel:+4915563127126" className="pone-mob-contact-val">+49 15563 127126</a>
            </div>
            <div className="pone-mob-contact-row">
              <svg className="pone-mob-contact-icon" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              <a href="mailto:philipp@pauli-one.de" className="pone-mob-contact-val">philipp@pauli-one.de</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

/* ── Shared icon ─────────────────────────────────────────────── */
function ArrowIcon() {
  return (
    <svg width="14" height="9" viewBox="0 0 14 9" fill="none">
      <path d="M1 4.5H13M9 1L13 4.5L9 8" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
    </svg>
  );
}
