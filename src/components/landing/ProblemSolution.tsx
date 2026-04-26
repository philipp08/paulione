"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

export function ProblemSolution() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    // Helper to observe elements and add 'ps-in' class
    const observeElements = (selector: string, staggerMs = 0) => {
      const elements = el.querySelectorAll(selector);
      if (!elements.length) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const target = entry.target as HTMLElement;
              // If stagger is applied, we could do it based on index, but simplest is 
              // just let the CSS handle transition delays if present, or add inline delay
              // But the CSS doesn't seem to have nth-child delays. We will add manual stagger if needed.
              // Wait, let's just add the class.
              target.classList.add("ps-in");
              observer.unobserve(target);
            }
          });
        },
        { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
      );

      elements.forEach((e) => observer.observe(e));
    };

    // Observers for regular elements
    observeElements(".ps-label");
    observeElements(".ps-subtitle");
    observeElements(".ps-solution-label");
    observeElements(".ps-sol-body");
    observeElements(".ps-visual");

    // For cards, rows, steps - we want stagger
    const observeStaggered = (selector: string, staggerMs: number) => {
      const elements = el.querySelectorAll(selector);
      if (!elements.length) return;

      const observer = new IntersectionObserver(
        (entries) => {
          let delay = 0;
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const target = entry.target as HTMLElement;
              setTimeout(() => {
                target.classList.add("ps-in");
              }, delay);
              delay += staggerMs;
              observer.unobserve(target);
            }
          });
        },
        { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
      );

      elements.forEach((e) => observer.observe(e));
    };

    observeStaggered(".ps-pain-card", 100);
    observeStaggered(".ps-step", 150);
    observeStaggered(".ps-compare-row", 100);

    const title = el.querySelector("#ps-title");
    if (title) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const words = title.querySelectorAll(".ps-word");
              words.forEach((word) => word.classList.add("ps-word--visible"));
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
      );
      observer.observe(title);
    }

    const solTitle = el.querySelector("#ps-sol-title");
    if (solTitle) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const chars = solTitle.querySelectorAll(".ps-sol-char");
              chars.forEach((char) => char.classList.add("ps-c-in"));
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
      );
      observer.observe(solTitle);
    }

    // Shimmer effect
    el.classList.add("ps-shimmer-active");

  }, []);

  return (
    <div className="ps-root" id="ps-root" ref={rootRef}>
      <section className="ps-section">
        <div className="ps-container">
          <p className="ps-label" id="ps-label">
            Kennen Sie das?
          </p>

          <h1 className="ps-title" id="ps-title">
            <span className="ps-word-wrap"><span className="ps-word">Ihre</span></span>{" "}
            <span className="ps-word-wrap"><span className="ps-word" style={{ transitionDelay: "0.1s" }}>Website</span></span>{" "}
            <span className="ps-word-wrap"><span className="ps-word" style={{ transitionDelay: "0.2s" }}>kostet</span></span>{" "}
            <span className="ps-word-wrap"><span className="ps-word" style={{ transitionDelay: "0.3s" }}>Sie</span></span>{" "}
            <span className="ps-word-wrap"><span className="ps-word" style={{ transitionDelay: "0.4s" }}><em>Kunden</em></span></span>{" "}
            <span className="ps-word-wrap"><span className="ps-word" style={{ transitionDelay: "0.5s" }}>—</span></span>{" "}
            <span className="ps-word-wrap"><span className="ps-word" style={{ transitionDelay: "0.6s" }}>nicht</span></span>{" "}
            <span className="ps-word-wrap"><span className="ps-word" style={{ transitionDelay: "0.7s" }}>umgekehrt.</span></span>
          </h1>

          <p className="ps-subtitle" id="ps-subtitle">
            Webdesign, das nicht nur begeistert, sondern messbar wirkt — viele
            Unternehmen verlieren täglich Anfragen, weil ihre Website Kunden
            kostet statt sie zu gewinnen. Das sollte umgekehrt sein.
          </p>

          <div className="ps-pain-grid" id="ps-pain-grid">
            <div className="ps-pain-card">
              <div className="ps-pain-card-inner">
                <div className="ps-pain-icon">
                  <svg viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                </div>
                <div className="ps-pain-body">
                  <p className="ps-pain-question">Ihre Website bringt keine Anfragen?</p>
                  <p className="ps-pain-text">
                    Besucher kommen — und gehen sofort wieder. Kein klarer Aufruf, keine Überzeugungskraft, keine Conversions.
                  </p>
                </div>
              </div>
            </div>

            <div className="ps-pain-card">
              <div className="ps-pain-card-inner">
                <div className="ps-pain-icon">
                  <svg viewBox="0 0 24 24">
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                    <line x1="12" y1="9" x2="12" y2="13" />
                    <line x1="12" y1="17" x2="12.01" y2="17" />
                  </svg>
                </div>
                <div className="ps-pain-body">
                  <p className="ps-pain-question">Ihr Design wirkt veraltet?</p>
                  <p className="ps-pain-text">
                    Ein erster Eindruck entscheidet in Sekunden. Eine veraltete Website signalisiert: unprofessionell — bevor ein Wort gelesen wurde.
                  </p>
                </div>
              </div>
            </div>

            <div className="ps-pain-card">
              <div className="ps-pain-card-inner">
                <div className="ps-pain-icon">
                  <svg viewBox="0 0 24 24">
                    <rect x="5" y="2" width="14" height="20" rx="2" />
                    <path d="M12 18h.01" />
                  </svg>
                </div>
                <div className="ps-pain-body">
                  <p className="ps-pain-question">Auf mobilen Geräten kaum nutzbar?</p>
                  <p className="ps-pain-text">
                    Über 70 % Ihrer Besucher kommen vom Smartphone. Eine schlecht optimierte Seite kostet Sie täglich potenzielle Kunden.
                  </p>
                </div>
              </div>
            </div>

            <div className="ps-pain-card">
              <div className="ps-pain-card-inner">
                <div className="ps-pain-icon">
                  <svg viewBox="0 0 24 24">
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.35-4.35" />
                  </svg>
                </div>
                <div className="ps-pain-body">
                  <p className="ps-pain-question">Bei Google nicht auffindbar?</p>
                  <p className="ps-pain-text">
                    Wer nicht auf Seite 1 steht, existiert für neue Kunden schlicht nicht. Fehlende SEO-Optimierung ist teuer — auch wenn man es nicht sieht.
                  </p>
                </div>
              </div>
            </div>

            <div className="ps-pain-card">
              <div className="ps-pain-card-inner">
                <div className="ps-pain-icon">
                  <svg viewBox="0 0 24 24">
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                  </svg>
                </div>
                <div className="ps-pain-body">
                  <p className="ps-pain-question">Ladezeiten, die Geduld kosten?</p>
                  <p className="ps-pain-text">
                    Jede Sekunde zählt: Langsame Websites verlieren Besucher, Vertrauen — und Rankings bei Google.
                  </p>
                </div>
              </div>
            </div>

            <div className="ps-pain-card">
              <div className="ps-pain-card-inner">
                <div className="ps-pain-icon">
                  <svg viewBox="0 0 24 24">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                </div>
                <div className="ps-pain-body">
                  <p className="ps-pain-question">Kein Ansprechpartner, wenn's brennt?</p>
                  <p className="ps-pain-text">
                    Ticketsysteme, Warteschlangen, keine Antworten. Sie verdienen einen Partner, der erreichbar ist — wirklich.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="ps-solution">
        <div className="ps-container">
          <div className="ps-solution-inner">
            <div className="ps-sol-text" id="ps-sol-text">
              <span className="ps-solution-label" id="ps-sol-label">
                ✦ Unser Ansatz
              </span>
              <h2 className="ps-sol-title" id="ps-sol-title">
                <span className="ps-sol-char-wrap"><span className="ps-sol-char">Ein</span></span>{" "}
                <span className="ps-sol-char-wrap"><span className="ps-sol-char ps-sol-char--em" style={{ transitionDelay: "0.1s" }}>ganzheitlicher</span></span>{" "}
                <span className="ps-sol-char-wrap"><span className="ps-sol-char" style={{ transitionDelay: "0.2s" }}>Webauftritt,</span></span>{" "}
                <span className="ps-sol-char-wrap"><span className="ps-sol-char" style={{ transitionDelay: "0.3s" }}>der</span></span>{" "}
                <span className="ps-sol-char-wrap"><span className="ps-sol-char" style={{ transitionDelay: "0.4s" }}>wirklich</span></span>{" "}
                <span className="ps-sol-char-wrap"><span className="ps-sol-char" style={{ transitionDelay: "0.5s" }}>wirkt.</span></span>
              </h2>
              <p className="ps-sol-body" id="ps-sol-body">
                Wir denken Ihre Website von Anfang bis Ende: Design, Technik,
                Inhalte und Strategie — aus einer Hand. Kein Flickwerk, sondern
                ein Auftritt, der Vertrauen schafft und Anfragen generiert.
              </p>
              <ul className="ps-steps" id="ps-steps">
                <li className="ps-step">
                  <div className="ps-step__num">01</div>
                  <div className="ps-step__content">
                    <p className="ps-step__title">Analyse & Strategie</p>
                    <p className="ps-step__text">
                      Wir verstehen Ihr Business, Ihre Zielgruppe und Ihre Ziele
                      — bevor eine einzige Zeile Code geschrieben wird.
                    </p>
                  </div>
                </li>
                <li className="ps-step">
                  <div className="ps-step__num">02</div>
                  <div className="ps-step__content">
                    <p className="ps-step__title">Design & Entwicklung</p>
                    <p className="ps-step__text">
                      Premium-Design mit Animationen, perfekter
                      Mobiloptimierung und Top-Performance bei Google PageSpeed.
                    </p>
                  </div>
                </li>
                <li className="ps-step">
                  <div className="ps-step__num">03</div>
                  <div className="ps-step__content">
                    <p className="ps-step__title">Launch & laufender Support</p>
                    <p className="ps-step__text">
                      Nach dem Launch sind wir weiter für Sie da — mit
                      persönlichem Ansprechpartner, Updates und Hosting
                      inklusive.
                    </p>
                  </div>
                </li>
              </ul>
              <div className="ps-btn-group">
                <Link href="/anfrage" className="ps-btn ps-btn--primary" aria-label="Website-Anfrage starten">
                  Website-Projekt anfragen
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </Link>
                <Link href="/kontakt" className="ps-btn ps-btn--ghost" aria-label="Unverbindlich Kontakt aufnehmen">
                  Kostenloses Erstgespräch
                </Link>
              </div>
            </div>

            <div className="ps-visual" id="ps-visual">
              <div className="ps-visual-card">
                <div className="ps-compare" id="ps-compare">
                  <div className="ps-compare-row">
                    <div className="ps-compare-bad">Kein Design-Konzept</div>
                    <div className="ps-compare-arrow">
                      <svg viewBox="0 0 24 24">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </div>
                    <div className="ps-compare-good">Premium-Design, individuell</div>
                  </div>
                  <div className="ps-compare-row">
                    <div className="ps-compare-bad">Kaum Anfragen</div>
                    <div className="ps-compare-arrow">
                      <svg viewBox="0 0 24 24">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </div>
                    <div className="ps-compare-good">Messbar mehr Kontakte</div>
                  </div>
                  <div className="ps-compare-row">
                    <div className="ps-compare-bad">Nicht bei Google</div>
                    <div className="ps-compare-arrow">
                      <svg viewBox="0 0 24 24">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </div>
                    <div className="ps-compare-good">SEO-optimiert von Anfang an</div>
                  </div>
                  <div className="ps-compare-row">
                    <div className="ps-compare-bad">Langsam auf dem Handy</div>
                    <div className="ps-compare-arrow">
                      <svg viewBox="0 0 24 24">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </div>
                    <div className="ps-compare-good">Blitzschnell, mobil perfekt</div>
                  </div>
                  <div className="ps-compare-row">
                    <div className="ps-compare-bad">Kein Ansprechpartner</div>
                    <div className="ps-compare-arrow">
                      <svg viewBox="0 0 24 24">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </div>
                    <div className="ps-compare-good">Persönlicher Support, direkt</div>
                  </div>
                  <div className="ps-compare-row">
                    <div className="ps-compare-bad">Hohe Einmalkosten</div>
                    <div className="ps-compare-arrow">
                      <svg viewBox="0 0 24 24">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </div>
                    <div className="ps-compare-good">Flexibles Abomodell ab 79 €</div>
                  </div>
                </div>
              </div>
              <div className="ps-result-badge">
                <div className="ps-result-badge__icon">
                  <svg viewBox="0 0 24 24">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <div>
                  <div className="ps-result-badge__num">42+ Projekte</div>
                  <div className="ps-result-badge__label">erfolgreich umgesetzt</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="ps-spacer"></div>
    </div>
  );
}
