"use client";

import { useState } from "react";
import Link from "next/link";
import "../../app/anfrage.css";

export function AnfrageForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    projectType: "",
    timeline: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const nextStep = () => setStep((s) => s + 1);
  const prevStep = () => setStep((s) => s - 1);

  const setField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleOptionClick = (field: string, value: string) => {
    setField(field, value);
    setTimeout(() => {
      nextStep();
    }, 400);
  };

  const submitForm = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(4);
  };

  return (
    <div className="anf-layout">
      {/* LEFT COLUMN - BRANDING */}
      <div className="anf-sidebar">
        <div className="anf-sidebar-bg"></div>
        <div className="anf-sidebar-content">
          <Link href="/" className="anf-logo">
            <img
              src="https://i.ibb.co/nMXYy81Y/Schwarz-transparent.png"
              alt="PauliONE"
            />
          </Link>
          
          <div className="anf-sidebar-text">
            <h2>
              Lassen Sie uns etwas <br />
              <em>Großartiges</em> erschaffen.
            </h2>
            <p>
              Erzählen Sie uns von Ihrem Projekt. Wir melden uns innerhalb von 24 Stunden mit ersten Ideen bei Ihnen.
            </p>
          </div>

          <div className="anf-sidebar-footer">
            <div className="anf-rating">
              <span className="anf-stars">★★★★★</span>
              <span><strong>5.0</strong> / 5.0 bei über 20 Projekten</span>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN - FORM */}
      <div className="anf-main-col">
        <div className="anf-form-container">
          
          <div className="anf-top-nav">
            <Link href="/" className="anf-close">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
              Schließen
            </Link>
          </div>

          <div className="anf-content-center">
            {step < 4 && (
              <div className="anf-progress-wrap">
                <div className="anf-progress-text">Schritt {step} von 3</div>
                <div className="anf-progress-bar">
                  <div
                    className="anf-progress-fill"
                    style={{ width: `${(step / 3) * 100}%` }}
                  ></div>
                </div>
              </div>
            )}

            <div className="anf-steps-wrapper">
              {/* STEP 1 */}
              <div className={`anf-step ${step === 1 ? "active" : ""}`}>
                <h1 className="anf-title">Was planen Sie?</h1>
                <p className="anf-subtitle">Wählen Sie den Bereich aus, in dem wir Sie unterstützen dürfen.</p>
                
                <div className="anf-options">
                  {[
                    { title: "Webauftritt", desc: "Corporate Website, Landingpage, Shop", icon: "M21 12l-9-9-9 9M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" },
                    { title: "Marketing & Strategie", desc: "SEO, Ads, Conversion-Optimierung", icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" },
                    { title: "Design & Markenauftritt", desc: "Logo, Branding, UI/UX Design", icon: "M12 19l9 2-9-18-9 18 9-2zm0 0v-8" }
                  ].map((opt) => (
                    <div
                      key={opt.title}
                      className={`anf-card ${formData.projectType === opt.title ? "selected" : ""}`}
                      onClick={() => handleOptionClick("projectType", opt.title)}
                    >
                      <div className="anf-card-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d={opt.icon}></path>
                        </svg>
                      </div>
                      <div className="anf-card-content">
                        <span className="anf-card-title">{opt.title}</span>
                        <span className="anf-card-desc">{opt.desc}</span>
                      </div>
                      <div className="anf-radio"></div>
                    </div>
                  ))}
                </div>
              </div>

              {/* STEP 2 */}
              <div className={`anf-step ${step === 2 ? "active" : ""}`}>
                <h1 className="anf-title">Wann soll es losgehen?</h1>
                <p className="anf-subtitle">Damit wir unsere Ressourcen optimal für Sie einplanen können.</p>
                
                <div className="anf-options">
                  {[
                    { title: "1 bis 2 Wochen", desc: "Sehr dringend, Start zeitnah", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
                    { title: "3 bis 4 Wochen", desc: "Mittelfristiger Projektstart", icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" },
                    { title: "Weniger als 2 Monate", desc: "Gemächliche Vorbereitungszeit", icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1" },
                    { title: "Noch offen", desc: "Befinde mich noch in der Findungsphase", icon: "M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" }
                  ].map((opt) => (
                    <div
                      key={opt.title}
                      className={`anf-card ${formData.timeline === opt.title ? "selected" : ""}`}
                      onClick={() => handleOptionClick("timeline", opt.title)}
                    >
                      <div className="anf-card-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d={opt.icon}></path>
                        </svg>
                      </div>
                      <div className="anf-card-content">
                        <span className="anf-card-title">{opt.title}</span>
                        <span className="anf-card-desc">{opt.desc}</span>
                      </div>
                      <div className="anf-radio"></div>
                    </div>
                  ))}
                </div>
              </div>

              {/* STEP 3 */}
              <div className={`anf-step ${step === 3 ? "active" : ""}`}>
                <h1 className="anf-title">Ihre Kontaktdaten</h1>
                <p className="anf-subtitle">Wie und wo können wir Sie am besten erreichen?</p>
                
                <form onSubmit={submitForm}>
                  <div className="anf-fields">
                    <div className="anf-input-group">
                      <input
                        type="text"
                        required
                        className="anf-input"
                        placeholder=" "
                        value={formData.firstName}
                        onChange={(e) => setField("firstName", e.target.value)}
                      />
                      <label className="anf-label">Vorname</label>
                    </div>
                    <div className="anf-input-group">
                      <input
                        type="text"
                        required
                        className="anf-input"
                        placeholder=" "
                        value={formData.lastName}
                        onChange={(e) => setField("lastName", e.target.value)}
                      />
                      <label className="anf-label">Nachname</label>
                    </div>
                    <div className="anf-input-group full">
                      <input
                        type="email"
                        required
                        className="anf-input"
                        placeholder=" "
                        value={formData.email}
                        onChange={(e) => setField("email", e.target.value)}
                      />
                      <label className="anf-label">E-Mail Adresse</label>
                    </div>
                    <div className="anf-input-group full">
                      <input
                        type="tel"
                        required
                        className="anf-input"
                        placeholder=" "
                        value={formData.phone}
                        onChange={(e) => setField("phone", e.target.value)}
                      />
                      <label className="anf-label">Telefonnummer</label>
                    </div>
                  </div>

                  <div className="anf-actions">
                    <button type="button" onClick={prevStep} className="anf-btn-back">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="19" y1="12" x2="5" y2="12"></line>
                        <polyline points="12 19 5 12 12 5"></polyline>
                      </svg>
                      Zurück
                    </button>
                    <button type="submit" className="anf-btn-primary">
                      Anfrage senden
                    </button>
                  </div>
                </form>
              </div>

              {/* STEP 4 */}
              <div className={`anf-step ${step === 4 ? "active" : ""}`}>
                <div className="anf-success-wrap">
                  <div className="anf-success-circle">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <h1 className="anf-title">Vielen Dank!</h1>
                  <p className="anf-subtitle">
                    Wir haben Ihre Anfrage erhalten und prüfen diese nun intern. 
                    In Kürze wird sich ein Experte aus unserem Team telefonisch bei Ihnen melden.
                  </p>
                  <Link href="/" className="anf-btn-primary" style={{ display: "inline-flex", marginTop: "24px" }}>
                    Zurück zur Startseite
                  </Link>
                </div>
              </div>
            </div>

            {/* Nav Footer for Steps 1 & 2 */}
            {step < 3 && step > 1 && (
              <div className="anf-nav-footer">
                <button type="button" onClick={prevStep} className="anf-btn-back">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="19" y1="12" x2="5" y2="12"></line>
                    <polyline points="12 19 5 12 12 5"></polyline>
                  </svg>
                  Zurück
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
