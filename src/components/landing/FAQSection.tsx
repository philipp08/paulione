"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ_DATA: FAQItem[] = [
  {
    question: "Was kostet eine Website bei PauliONE?",
    answer: 'Websites gibt es ab <strong>79 € / Monat</strong> im flexiblen Abomodell — ohne hohe Einmalkosten. Alternativ bieten wir auch klassische Einmalprojekte an. Was genau passt, besprechen wir in einem kurzen Erstgespräch kostenlos.',
  },
  {
    question: "Wie lange dauert die Umsetzung?",
    answer: 'Eine einfache Landingpage ist oft in <strong>1–2 Wochen</strong> fertig. Komplexere Shops oder Markenprojekte dauern 3–6 Wochen. Den genauen Zeitplan besprechen wir transparent vorab — ohne böse Überraschungen.',
  },
  {
    question: "Ich bin kein Technik-Experte. Ist das ein Problem?",
    answer: "Überhaupt nicht. Ich erkläre alles verständlich, ohne Fachjargon. Sie müssen kein HTML kennen — Sie müssen nur wissen, was Sie wollen. Den Rest übernehme ich. Viele meiner Kunden hatten vorher noch nie mit einer Agentur zusammengearbeitet.",
  },
  {
    question: "Kümmern Sie sich auch um Hosting und Pflege?",
    answer: 'Ja. Im Abomodell ist <strong>Hosting, Wartung und laufender Support</strong> bereits inklusive. Sie zahlen eine Pauschale und müssen sich um nichts kümmern. Bei Einmalprojekten biete ich Pflegepakete separat an.',
  },
  {
    question: "Arbeiten Sie auch mit Kunden außerhalb von Rastatt?",
    answer: 'Ja, gerne. Mein Schwerpunkt liegt in <strong>Rastatt, Baden-Baden und der Region</strong> — aber ich arbeite deutschlandweit remote. Die Kommunikation läuft unkompliziert per Video, Chat oder Telefon.',
  },
  {
    question: "Was unterscheidet PauliONE von anderen Agenturen?",
    answer: 'Kein anonymes Team, kein Ticketsystem. Sie haben <strong>direkt mich</strong> als Ansprechpartner — von der ersten Idee bis zum fertigen Ergebnis. Das bedeutet: schnelle Reaktionen, echtes Interesse, und ein Ergebnis, das wirklich zu Ihnen passt.',
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="faq-root" ref={containerRef}>
      <div className="faq-container">
        <div className="faq-head">
          <motion.div 
            className="faq-badge"
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="faq-badge-dot"></span>Häufige Fragen
          </motion.div>
          <h2 className="faq-title">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              style={{ display: "inline-block" }}
            >
              Was Sie noch{" "}
            </motion.span>
            <motion.em
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{ display: "inline-block", marginLeft: "0.2em" }}
            >
              wissen möchten.
            </motion.em>
          </h2>
        </div>

        <div className="faq-list">
          {FAQ_DATA.map((item, idx) => (
            <motion.div
              key={idx}
              className={`faq-item ${openIndex === idx ? "faq-open" : ""}`}
              initial={{ opacity: 0, x: -20 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + idx * 0.1 }}
            >
              <button
                className="faq-q"
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                aria-expanded={openIndex === idx}
              >
                <span className="faq-q-text">{item.question}</span>
                <div className="faq-icon">
                  <motion.svg 
                    viewBox="0 0 24 24"
                    animate={{ rotate: openIndex === idx ? 45 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <line x1="12" y1="5" x2="12" y2="19" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
                    <line x1="5" y1="12" x2="19" y2="12" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
                  </motion.svg>
                </div>
              </button>

              <AnimatePresence>
                {openIndex === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="faq-body-overflow"
                  >
                    <div className="faq-body-content">
                      <p dangerouslySetInnerHTML={{ __html: item.answer }} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>

    </section>
  );
}
