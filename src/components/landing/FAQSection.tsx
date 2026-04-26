"use client";

import { useEffect, useRef, useCallback, useState } from "react";

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
  const rootRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

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

    observe(el.querySelector("#faq-badge"), (e) => e.classList.add("faq-in"), 0.5);

    animateTitle();
    observe(el.querySelector("#faq-title"), (t) => {
      t.querySelectorAll("span > span").forEach((w, i) => {
        setTimeout(() => {
          (w as HTMLElement).style.transform = "translateY(0)";
          (w as HTMLElement).style.opacity = "1";
        }, i * 90);
      });
    }, 0.3);

    el.querySelectorAll("[data-faq]").forEach((item, i) => {
      observe(item, (e) => {
        setTimeout(() => e.classList.add("faq-in"), i * 80);
      }, 0.05);
    });
  }, [animateTitle]);

  return (
    <div className="faq-root" ref={rootRef}>
      <div className="faq-container">
        <div className="faq-head">
          <div className="faq-badge" id="faq-badge">
            <span className="faq-badge-dot"></span>Häufige Fragen
          </div>
          <h2 className="faq-title" id="faq-title" ref={titleRef}>
            Was Sie noch <em>wissen möchten.</em>
          </h2>
        </div>
        <div className="faq-list" id="faq-list">
          {FAQ_DATA.map((item, idx) => (
            <div
              key={idx}
              className={`faq-item${openIndex === idx ? " faq-open" : ""}`}
              data-faq=""
            >
              <div
                className="faq-q"
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setOpenIndex(openIndex === idx ? null : idx); } }}
              >
                <span className="faq-q-text">{item.question}</span>
                <div className="faq-icon">
                  <svg viewBox="0 0 24 24">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </div>
              </div>
              <div className="faq-body">
                <p dangerouslySetInnerHTML={{ __html: item.answer }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
