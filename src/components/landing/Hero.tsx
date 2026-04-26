"use client";

import { useEffect, useRef } from "react";

export function Hero() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const glowRef    = useRef<HTMLDivElement>(null);

  /* home-active no longer needed for title reveal (pure CSS animations) */

  /* Glow follows cursor (pointer-fine devices only) */
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const glow = glowRef.current;
    if (!glow) return;

    const onMove = (e: MouseEvent) => {
      requestAnimationFrame(() => {
        glow.style.left = e.clientX + "px";
        glow.style.top  = e.clientY + "px";
      });
    };
    document.addEventListener("mousemove", onMove);
    return () => document.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div className="home-hero-wrapper" ref={wrapperRef}>
      {/* Background image */}
      <div className="home-bg-image" />

      {/* Dark overlay */}
      <div className="home-overlay" />

      {/* Mouse-follow glow */}
      <div className="home-glow-spot" ref={glowRef} />

      {/* Content */}
      <div className="home-content-container">
        <div className="home-tagline">Beyond Ordinary</div>

        <h1 className="home-title">
          <span className="home-reveal-mask">
            <span
              className="home-reveal-text home-text-row-1"
              style={{ animationDelay: "0.1s" }}
            >
              Webdesign, das
            </span>
          </span>
          <span className="home-reveal-mask">
            <span
              className="home-reveal-text home-text-row-2"
              style={{ animationDelay: "0.25s" }}
            >
              begeistert<span className="home-accent-dot">.</span>
            </span>
          </span>
        </h1>

        <p className="home-sub-text">
          Wir erstellen Designs und Websites, die nicht nur{" "}
          <span className="home-highlight">gut aussehen</span>, sondern auch{" "}
          <span className="home-highlight">funktionieren</span>.
        </p>

        <div className="home-cta-wrapper">
          <div className="home-btn-row">
            <a href="https://pauli-one.de/anfrage" className="home-btn home-btn-fill">
              Anfrage senden
            </a>
            <a href="https://pauli-one.de/referenzen" className="home-btn home-btn-outline">
              Referenzen
            </a>
          </div>

          <div className="home-trust-box">
            <span className="home-stars">★★★★★</span>
            <span className="home-trust-label">
              <strong>5/5</strong> basierend auf 20+ Bewertungen
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
