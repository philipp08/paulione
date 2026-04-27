"use client";

import React from "react";
import { motion } from "framer-motion";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import "./ueber-mich.css";

export default function UeberMich() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
  };

  const blurUp = {
    initial: { opacity: 0, filter: "blur(6px)", y: 18 },
    whileInView: { opacity: 1, filter: "blur(0)", y: 0 },
    viewport: { once: true },
    transition: { duration: 0.75, ease: "easeOut" }
  };

  const slideInRight = {
    initial: { opacity: 0, x: -32 },
    whileInView: { opacity: 1, x: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  };

  const slideInLeft = {
    initial: { opacity: 0, x: 32 },
    whileInView: { opacity: 1, x: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  };

  return (
    <main className="bg-[#050712] text-white min-h-screen selection:bg-blue-500/30">
      <Header />

      {/* HERO SECTION */}
      <section id="hero">
        <div className="pone-container">
          <div className="hero-grid">
            <motion.div {...fadeInUp}>
              {/* Mobile Head */}
              <div className="hero-mobile-head">
                <div className="hero-mobile-portrait">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Philipp_Pauli_Portr%C3%A4t.jpg/960px-Philipp_Pauli_Portr%C3%A4t.jpg" alt="Philipp Pauli" />
                </div>
                <div>
                  <div className="hero-eyebrow" style={{ marginBottom: "10px" }}>
                    <div className="pone-badge">
                      <span className="pone-badge-dot"></span>
                      Gründer · PauliONE · Rastatt
                    </div>
                  </div>
                  <div className="hero-h1" style={{ fontSize: "clamp(2.4rem, 10vw, 3.8rem)" }}>
                    <span className="hero-h1-name">Philipp<br />Pauli.</span>
                    <span className="hero-h1-playfair" style={{ fontSize: "clamp(1rem, 3vw, 1.4rem)" }}>Webdesigner. Unternehmer.</span>
                  </div>
                </div>
              </div>

              {/* Desktop Eyebrow */}
              <div className="hero-eyebrow" id="hero-eyebrow-desktop">
                <motion.div className="pone-badge" initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }}>
                  <span className="pone-badge-dot"></span>
                  Gründer · PauliONE · Rastatt
                </motion.div>
              </div>

              <h1 className="hero-h1" id="h-hero-desktop">
                <span className="hero-h1-name">Philipp<br />Pauli.</span>
                <span className="hero-h1-playfair">Webdesigner. Unternehmer.</span>
              </h1>

              <motion.p className="hero-lead" {...blurUp}>
                Ich bin Philipp — Gründer von PauliONE und leidenschaftlicher Webdesigner aus Rastatt.
                Was als Begeisterung für gutes Design begann, ist heute eine Agentur, die Unternehmen in der Region hilft, online wirklich zu überzeugen. 
                Kein Konzern im Hintergrund. Kein anonymes Team. Nur ich — mit echtem Interesse an Ihrem Projekt.
              </motion.p>

              <motion.div className="hero-actions" {...blurUp} transition={{ delay: 0.15 }}>
                <a href="/anfrage" className="pone-btn">
                  Jetzt Projekt anfragen
                  <svg viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                </a>
                <a href="/referenzen" className="btn-ghost">Meine Projekte ansehen</a>
              </motion.div>
            </motion.div>

            {/* Desktop Portrait */}
            <motion.div className="hero-portrait-wrap" {...slideInLeft}>
              <div className="portrait-pill portrait-pill-1">
                <div className="pill-num">42<span>+</span></div>
                <div className="pill-label">Projekte umgesetzt</div>
              </div>
              <div className="portrait-pill portrait-pill-2">
                <div className="pill-num">5<span>/5</span></div>
                <div className="pill-label">Kundenbewertung</div>
              </div>
              <div className="hero-portrait">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Philipp_Pauli_Portr%C3%A4t.jpg/960px-Philipp_Pauli_Portr%C3%A4t.jpg" alt="Philipp Pauli" />
                <div className="hero-portrait-cap">
                  <strong>Philipp Pauli</strong>
                  <span>Gründer & Webdesigner · PauliONE</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        <div className="scroll-hint">
          <svg viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9" /></svg>
          Mehr erfahren
        </div>
      </section>

      {/* INTRO SECTION */}
      <section id="intro" className="section-light">
        <div className="pone-container">
          <div className="intro-inner">
            <motion.div {...fadeInUp}>
              <div className="pone-badge" style={{ marginBottom: "28px" }}>
                <span className="pone-badge-dot"></span>
                Wer steckt dahinter
              </div>
              <h2 className="intro-h2 do-shimmer">
                Ich glaube daran, dass gutes Design <span className="pone-em">echte Wirkung</span> entfaltet.
              </h2>
              <motion.blockquote className="pull-quote" {...blurUp} transition={{ delay: 0.2 }}>
                „Eine Website ist kein Selbstzweck — sie soll Vertrauen schaffen, Fragen beantworten und Türen öffnen."
              </motion.blockquote>
            </motion.div>

            <motion.div className="intro-body" {...blurUp}>
              <p>
                Ich bin kein klassischer Agentur-Mensch. Kein Angestellter, der Aufträge abarbeitet. 
                Ich bin jemand, der sich wirklich für die Unternehmen interessiert, mit denen er zusammenarbeitet — für ihre Kunden, ihre Geschichte, ihre Ziele.
              </p>
              <p>
                Meine Arbeit beginnt deshalb nie mit dem Design. Sie beginnt mit Fragen: 
                <strong> Was soll diese Website auslösen?</strong> Wen soll sie ansprechen? 
                <strong> Was braucht Ihr Kunde</strong> in dem Moment, in dem er auf Ihrer Seite landet?
              </p>
              <p>
                Erst wenn ich diese Antworten verstehe, fange ich an zu gestalten. 
                Das ist der Unterschied zwischen einer Website, die existiert — und einer, die wirklich überzeugt.
              </p>
              <p>
                Neben meiner Arbeit als Webdesigner bin ich tief in der Region verwurzelt: in Rastatt und der Region Baden — dem Ort, an dem die meisten meiner Kunden ihren Kunden täglich begegnen. Das ist kein Zufall. Das ist Prinzip.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* TIMELINE SECTION */}
      <section id="timeline">
        <div className="pone-container">
          <div className="tl-head text-center">
            <motion.div className="pone-badge" {...fadeInUp} style={{ display: "inline-flex", marginBottom: "20px" }}>
              <span className="pone-badge-dot"></span>
              Mein Weg
            </motion.div>
            <motion.h2 className="tl-h2 do-shimmer" {...fadeInUp} transition={{ delay: 0.1 }}>
              Vom ersten Projekt zur <span className="pone-em">echten Agentur.</span>
            </motion.h2>
            <motion.p className="text-gray-400 max-w-lg mx-auto" {...blurUp}>
              Kein gradliniger Karriereweg — aber eines: echte Erfahrungen aus echten Projekten, von Anfang an.
            </motion.p>
          </div>

          <div className="tl-vtl relative max-w-2xl mx-auto">
            <div className="tl-vtl-steps pl-14 sm:pl-16">
              {[
                {
                  year: "2021 — Die ersten Schritte",
                  title: "Aus Neugier wird Leidenschaft.",
                  body: "Was begann, war reine Neugier: Wie verwandelt man eine leere Seite in etwas, das Menschen wirklich berührt? Erste Experimente mit HTML und CSS, erste Designs. Kein Kurs, kein Lehrplan — nur Ausprobieren, Scheitern und Verbessern.",
                  icon: (
                    <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><polyline points="12 8 12 12 14 14" /></svg>
                  )
                },
                {
                  year: "2022 — Erste echte Projekte",
                  title: "Aus Hobby wird Verantwortung.",
                  body: "Die ersten Aufträge kamen über das persönliche Umfeld — Freunde, Bekannte, lokale Betriebe. Kleine Projekte, aber mit echten Kunden und echten Erwartungen. Damals lernte ich mehr über Zuhören, Zuverlässigkeit und Kundenzufriedenheit als über Code.",
                  icon: (
                    <svg viewBox="0 0 24 24"><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>
                  )
                },
                {
                  year: "April 2024 — Gründung PauliONE",
                  title: "Eine Vision bekommt einen Namen.",
                  body: "Mit der Gründung von PauliONE habe ich meine Vision in die Realität übersetzt: Unternehmen in der Region einen Webauftritt zu ermöglichen, der sie wirklich von ihrer besten Seite zeigt. Webdesign, Branding, lokale SEO — als durchdachtes System.",
                  img: "https://i.ibb.co/nMXYy81Y/Schwarz-transparent.png",
                  icon: (
                    <svg viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3" /></svg>
                  )
                },
                {
                  year: "Januar 2025 — Öffentliche Aufmerksamkeit",
                  title: "Wenn die Arbeit für sich spricht.",
                  body: "Über meine Arbeit berichteten die Badischen Neuesten Nachrichten, das Badische Tagblatt, der SWR und DASDING — als einer der jüngsten Unternehmer der Region.",
                  link: "https://bnn.de/mittelbaden/rastatt/dieser-16-jaehrige-rastatter-gehoert-zu-den-juengsten-unternehmern-deutschlands",
                  img: "https://bnn.de/img/14413971/DKKuwn2i0KanmGd63E4tvw/IMG_2472?size=970&format=jpeg&variant=LANDSCAPE_16x9",
                  icon: (
                    <svg viewBox="0 0 24 24"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" /><path d="M18 14h-8" /><path d="M15 18h-5" /><path d="M10 6h8v4h-8V6z" /></svg>
                  )
                },
                {
                  year: "Heute — 42+ Projekte später",
                  title: "Persönlich. Lokal. Ergebnisorientiert.",
                  body: "Heute arbeite ich mit Unternehmen aus Rastatt, Baden-Baden und der Region. Mein Anspruch ist unverändert: Enge Zusammenarbeit, maßgeschneiderte Lösungen, langfristige Ergebnisse.",
                  icon: (
                    <svg viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>
                  )
                }
              ].map((item, idx) => (
                <motion.div key={idx} className="tl-item group" {...fadeInUp} transition={{ delay: idx * 0.1 }}>
                  <div className="tl-node group-hover:scale-110 transition-transform duration-300">
                    <span className="tl-node-num">0{idx + 1}</span>
                    {item.icon}
                  </div>
                  <div className="tl-card">
                    <div className="tl-card-inner">
                      <div className="tl-card-head">
                        <span className="tl-card-counter">0{idx + 1}</span>
                        <span className="tl-year">{item.year}</span>
                      </div>
                      <h3 className="tl-title">{item.title}</h3>
                      <p className="tl-body">{item.body}</p>
                      {item.img && (
                        <div className="tl-img mt-4 rounded-xl overflow-hidden border border-white/10">
                          {item.link ? (
                            <a href={item.link} target="_blank" rel="noopener">
                              <img src={item.img} alt={item.title} className="w-full grayscale hover:grayscale-0 transition-all duration-500" />
                            </a>
                          ) : (
                            <img src={item.img} alt={item.title} className="p-8 bg-white/5 object-contain h-40 w-full" />
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* VALUES SECTION */}
      <section id="values" className="bg-white/5 py-32">
        <div className="pone-container">
          <div className="val-head text-center mb-20">
            <motion.div className="pone-badge" {...fadeInUp}>
              <span className="pone-badge-dot"></span>
              Meine Arbeitsweise
            </motion.div>
            <motion.h2 className="val-h2 mt-6 do-shimmer" {...fadeInUp}>
              Was mich von anderen <span className="pone-em">unterscheidet.</span>
            </motion.h2>
          </div>
          <div className="val-grid">
            {[
              {
                num: "01",
                title: "Ich höre zuerst zu.",
                body: "Bevor eine Zeile Code geschrieben wird, verstehe ich Ihr Business, Ihre Kunden und Ihre Ziele. Maßgeschneidert bedeutet bei mir: wirklich maßgeschneidert — kein Template, kein Baukasten.",
                icon: <svg viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
              },
              {
                num: "02",
                title: "Keine halben Sachen.",
                body: "Design, Technik, Texte, lokale SEO — ich denke alles zusammen. Ein Auftritt, der an einer Stelle glänzt und woanders schwächelt, überzeugt niemanden. Deshalb: ganzheitlich oder gar nicht.",
                icon: <svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
              },
              {
                num: "03",
                title: "Erreichbar. Wirklich.",
                body: "Kein Ticketsystem, kein anonymes Postfach. Ich antworte innerhalb von 24 Stunden — und meistens deutlich schneller. Sie haben einen echten Ansprechpartner, der mitdenkt.",
                icon: <svg viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.2h3a2 2 0 0 1 2 1.72c.128.96.341 1.903.63 2.81a2 2 0 0 1-.45 2.11L7.91 9a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.29 1.85.501 2.81.63A2 2 0 0 1 22 16.92z" /></svg>
              },
              {
                num: "04",
                title: "Ergebnisse zählen.",
                body: "Am Ende ist der einzige Maßstab: Bringt Ihre Website mehr Anfragen? Werden Sie bei Google gefunden? Schauen Besucher länger? Eine schöne Website ist schön — aber das ist der Punkt.",
                icon: <svg viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>
              }
            ].map((val, idx) => (
              <motion.div key={idx} className="val-cell" {...fadeInUp} transition={{ delay: idx * 0.1 }}>
                <div className="val-num-label"><span className="val-num-line"></span>{val.num}</div>
                <div className="val-icon">{val.icon}</div>
                <h3 className="val-title">{val.title}</h3>
                <p className="val-body">{val.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* MEDIA SECTION */}
      <section id="media" className="py-32">
        <div className="pone-container">
          <div className="med-head mb-20 text-center">
            <motion.div className="pone-badge" {...fadeInUp}>
              <span className="pone-badge-dot"></span>
              In den Medien
            </motion.div>
            <motion.h2 className="med-h2 mt-6 do-shimmer" {...fadeInUp}>
              Wenn Arbeit <span className="pone-em">Aufmerksamkeit</span> findet.
            </motion.h2>
          </div>
          <div className="med-layout">
            <motion.div {...slideInRight}>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <img src="https://bnn.de/img/14413971/DKKuwn2i0KanmGd63E4tvw/IMG_2472?size=970&format=jpeg&variant=LANDSCAPE_16x9" alt="BNN Interview" className="rounded-2xl border border-white/10 grayscale hover:grayscale-0 transition-all duration-500 h-44 object-cover" />
                <img src="https://bnn.de/img/14413970/xzuvFlZ51csDKwbtXVh88g/IMG_2458?size=1920&format=jpeg&variant=LANDSCAPE_16x9" alt="BNN Portrait" className="rounded-2xl border border-white/10 grayscale hover:grayscale-0 transition-all duration-500 h-44 object-cover" />
              </div>
              <a href="https://bnn.de/mittelbaden/rastatt/dieser-16-jaehrige-rastatter-gehoert-zu-den-juengsten-unternehmern-deutschlands" target="_blank" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors">
                BNN-Artikel lesen: Philipp Pauli – jüngster Unternehmer
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </a>
            </motion.div>

            <motion.div {...slideInLeft}>
              <div className="med-outlets">
                {[
                  { name: "Badische Neuesten Nachrichten", desc: "Einer der jüngsten Unternehmer Deutschlands" },
                  { name: "Badisches Tagblatt", desc: "Regionale Berichterstattung über PauliONE" },
                  { name: "SWR — Südwestrundfunk", desc: "Radiobeitrag über junge Unternehmer" },
                  { name: "DASDING — SWR Jugendradio", desc: "Porträt als junger Unternehmer aus der Region" }
                ].map((outlet, idx) => (
                  <div key={idx} className="med-outlet">
                    <div className="out-icon"><svg viewBox="0 0 24 24"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" /><path d="M18 14h-8" /><path d="M15 18h-5" /><path d="M10 6h8v4h-8V6z" /></svg></div>
                    <div>
                      <div className="out-name">{outlet.name}</div>
                      <div className="out-desc">{outlet.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="med-quote mt-12 p-8 rounded-2xl bg-white/5 border-l-4 border-blue-500 italic text-gray-400">
                „Solche Erwähnungen zeigen mir, dass meine Projekte nicht nur bei Kunden, sondern auch in der Öffentlichkeit Aufmerksamkeit finden — und dass Qualität sich herumsprechen kann."
                <cite className="block mt-4 not-italic text-sm text-gray-500">— Philipp Pauli, Gründer PauliONE</cite>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section id="testimonials" className="section-light">
        <div className="pone-container">
          <div className="testi-head mb-16 text-center">
            <div className="pone-badge mb-4">
              <span className="pone-badge-dot"></span>
              Was Kunden sagen
            </div>
            <h2 className="testi-h2 do-shimmer">
              Worte, die mehr wiegen als <span className="pone-em">jedes Versprechen.</span>
            </h2>
          </div>
          <div className="testi-grid">
            {[
              {
                name: "K. Mekkel",
                company: "MK Nailshop",
                text: "„Alles was ich mir mit meinem Online Shop vorgestellt habe, wurde umgesetzt! Immer hilfsbereit, zuverlässig, kompetent, freundlich. Kann ich nur weiter empfehlen!\"",
                initial: "K"
              },
              {
                name: "Kirsten Asal",
                company: "Einklang by Kirsten",
                text: "„Ich kann PauliONE uneingeschränkt weiter empfehlen. Mit einer Engelsgeduld alles umgesetzt was ich wollte — Preis, Leistung, Service alles TOP.\"",
                initial: "K"
              },
              {
                name: "Marco Mueller",
                company: "Kunde",
                text: "„Sehr kompetente Beratung mit sehr viel Engagement beim Gestalten und Umsetzen der Homepage — absolut empfehlenswert in jeder Hinsicht.\"",
                initial: "M"
              }
            ].map((testi, idx) => (
              <motion.div key={idx} className="testi-card" {...fadeInUp} transition={{ delay: idx * 0.1 }}>
                <div className="testi-stars">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
                  ))}
                </div>
                <p className="testi-text">{testi.text}</p>
                <div className="testi-author">
                  <div className="testi-av">{testi.initial}</div>
                  <div>
                    <div className="testi-name">{testi.name}</div>
                    <div className="testi-company">{testi.company}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
