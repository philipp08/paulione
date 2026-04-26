"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

export function ScrollZoomWindow() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const win = track.querySelector("#sz-window") as HTMLElement | null;
    const hint = track.querySelector("#sz-hint") as HTMLElement | null;
    if (!win) return;

    const ph0 = track.querySelector("#sz-ph-0") as HTMLElement | null;
    const line0 = track.querySelector("#sz-line-0") as HTMLElement | null;
    const line1 = track.querySelector("#sz-line-1") as HTMLElement | null;
    const ph1 = track.querySelector("#sz-ph-1") as HTMLElement | null;
    const sc = [
      track.querySelector("#sz-sc-0"),
      track.querySelector("#sz-sc-1"),
      track.querySelector("#sz-sc-2"),
    ] as (HTMLElement | null)[];
    const scIcons = sc.map((s) => s?.querySelector(".sz-service-icon") as HTMLElement | null);
    const ph2 = track.querySelector("#sz-ph-2") as HTMLElement | null;
    const ql = [
      track.querySelector("#sz-ql-0"),
      track.querySelector("#sz-ql-1"),
      track.querySelector("#sz-ql-2"),
    ] as (HTMLElement | null)[];
    const ctaEl = track.querySelector("#sz-cta") as HTMLElement | null;

    function clamp(v: number, a: number, b: number) { return Math.max(a, Math.min(b, v)); }
    function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }
    
    function easeOutQuart(t: number) { return 1 - Math.pow(1 - t, 4); }

    let smoothP = 0;
    const SMOOTH_FACTOR = 0.12;

    let isMob = window.innerWidth <= 780;
    let startW = isMob ? 88 : 70;
    let startH = isMob ? 60 : 62;
    let rafId: number;

    /*
     * ═══════════════════════════════════════════════════════
     *  TIMELINE (600vh track → p goes 0 → 1)
     *
     *  Adjusted to have distinctly noticeable, but SHORTER holds.
     *  (10% = 60vh = ~0.6 screens)
     *
     *  SLIDE + ZOOM: 0.00 → 0.18 (fast, immediate)
     *
     *  ph0 "Headline"   : in 0.20→0.25, HOLD 0.25→0.35, out 0.35→0.40
     *  ph1 "Services"   : in 0.43→0.48, HOLD 0.48→0.60, out 0.60→0.65
     *  ph2 "Quote + CTA": in 0.68→0.73, HOLD 0.73→1.00 (stays)
     * ═══════════════════════════════════════════════════════
     */

    function frame() {
      const rect = track!.getBoundingClientRect();
      const range = track!.offsetHeight - window.innerHeight;
      if (range <= 0) { rafId = requestAnimationFrame(frame); return; }

      isMob = window.innerWidth <= 780;
      startW = isMob ? 88 : 70;
      startH = isMob ? 60 : 62;

      const rawP = clamp(-rect.top / range, 0, 1);
      smoothP += (rawP - smoothP) * SMOOTH_FACTOR;
      if (Math.abs(rawP - smoothP) < 0.0004) smoothP = rawP;
      const p = smoothP;

      /* ────────────────────────────────────────────
         SLIDE + ZOOM
      ──────────────────────────────────────────── */
      const motionT = easeOutQuart(clamp(p / 0.18, 0, 1));

      const ty = lerp(40, 0, motionT);
      const w = lerp(startW, 100, motionT);
      const h = lerp(startH, 100, motionT);
      const br = lerp(24, 0, motionT);
      const shM = clamp(1 - motionT * 1.6, 0, 1);

      win!.style.width = w + "vw";
      win!.style.height = h + "vh";
      win!.style.borderRadius = br + "px";
      win!.style.transform = `translateX(-50%) translateY(calc(-50% + ${ty}vh))`;
      win!.style.boxShadow = shM > 0.01
        ? `0 ${Math.round(48 * shM)}px ${Math.round(140 * shM)}px rgba(0,0,0,${(0.65 * shM).toFixed(3)})`
        : "none";

      /* ────────────────────────────────────────────
         CONTENT PHASES (Shorter Holds)
      ──────────────────────────────────────────── */

      // ── ph0: Headline ──
      // in: 0.20→0.25 | HOLD: 0.25→0.35 | out: 0.35→0.40
      const ph0In = easeOutQuart(clamp((p - 0.20) / 0.05, 0, 1));
      const ph0Out = easeOutQuart(clamp((p - 0.35) / 0.05, 0, 1));
      const ph0Opacity = clamp(ph0In - ph0Out, 0, 1);
      if (ph0) {
        ph0.style.opacity = String(ph0Opacity);
        ph0.style.pointerEvents = ph0Opacity > 0.3 ? "auto" : "none";
      }
      if (line0) {
        const e = easeOutQuart(clamp((p - 0.21) / 0.05, 0, 1));
        line0.style.opacity = String(clamp(e - ph0Out, 0, 1));
        line0.style.transform = `translateY(${(26 * (1 - e)).toFixed(1)}px)`;
      }
      if (line1) {
        const e = easeOutQuart(clamp((p - 0.22) / 0.05, 0, 1));
        line1.style.opacity = String(clamp(e - ph0Out, 0, 1));
        line1.style.transform = `translateY(${(26 * (1 - e)).toFixed(1)}px)`;
      }

      // ── ph1: Services ──
      // in: 0.43→0.48 | HOLD: 0.48→0.60 | out: 0.60→0.65
      const ph1In = easeOutQuart(clamp((p - 0.43) / 0.05, 0, 1));
      const ph1Out = easeOutQuart(clamp((p - 0.60) / 0.05, 0, 1));
      const ph1Opacity = clamp(ph1In - ph1Out, 0, 1);
      if (ph1) {
        ph1.style.opacity = String(ph1Opacity);
        ph1.style.pointerEvents = ph1Opacity > 0.3 ? "auto" : "none";
      }
      sc.forEach((card, i) => {
        if (!card) return;
        const e = easeOutQuart(clamp((p - 0.44 - i * 0.015) / 0.05, 0, 1));
        const vis = clamp(e * ph1Opacity, 0, 1);
        card.style.opacity = String(vis);
        card.style.transform = `translateY(${(34 * (1 - e)).toFixed(1)}px)`;
        const ico = scIcons[i];
        if (ico) {
          ico.style.opacity = String(e);
          ico.style.transform = `scale(${lerp(0.7, 1, e).toFixed(3)})`;
        }
      });

      // ── ph2: Quote + CTA ──
      // in: 0.68→0.73 | HOLD: 0.73→1.00
      const ph2In = easeOutQuart(clamp((p - 0.68) / 0.05, 0, 1));
      if (ph2) {
        ph2.style.opacity = String(ph2In);
        ph2.style.pointerEvents = ph2In > 0.3 ? "auto" : "none";
      }
      ql.forEach((q, i) => {
        if (!q) return;
        const e = easeOutQuart(clamp((p - 0.69 - i * 0.02) / 0.06, 0, 1));
        q.style.opacity = String(e);
        q.style.transform = `translateY(${(20 * (1 - e)).toFixed(1)}px)`;
        if (!q.classList.contains("sz-quote-em")) {
          const col = Math.round(lerp(160, 0, e));
          q.style.color = `rgb(${col},${col},${col})`;
        }
      });
      if (ctaEl) {
        const eC = easeOutQuart(clamp((p - 0.74) / 0.06, 0, 1));
        ctaEl.style.opacity = String(eC);
        ctaEl.style.transform = `translateY(${(14 * (1 - eC)).toFixed(1)}px)`;
      }

      // ── Scroll hint ──
      if (hint) hint.classList.toggle("sz-hint-gone", p > 0.03);

      rafId = requestAnimationFrame(frame);
    }
    rafId = requestAnimationFrame(frame);

    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <div className="sz-track" id="sz-track" ref={trackRef}>
      <div className="sz-sticky" id="sz-sticky">

        <div className="sz-window" id="sz-window">
          <div className="sz-content">

            {/* Phase 1: headline */}
            <div className="sz-phase" id="sz-ph-0" style={{ alignItems: "center", justifyContent: "center", textAlign: "center", padding: "0 clamp(24px,5vw,80px)" }}>
              <div className="sz-window-label" style={{ marginBottom: "32px", display: "inline-flex" }}>
                <span className="sz-window-label-dot"></span>
                PauliONE · Beyond Ordinary
              </div>
              <h2 className="sz-ph0-h2">
                <span className="sz-ph0-line" id="sz-line-0">Websites, die</span>
                <span className="sz-ph0-line sz-ph0-em" id="sz-line-1">wirklich verkaufen.</span>
              </h2>
            </div>

            {/* Phase 2: service highlights */}
            <div className="sz-phase" id="sz-ph-1">
              <div className="sz-service-grid">
                <Link className="sz-service-card" id="sz-sc-0" href="/webauftritt">
                  <div className="sz-service-num">01</div>
                  <div className="sz-service-text">
                    <div className="sz-service-title">Webdesign</div>
                    <div className="sz-service-sub">Premium, schnell, mobiloptimiert</div>
                  </div>
                  <div className="sz-service-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#004aad" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </div>
                </Link>
                <Link className="sz-service-card" id="sz-sc-1" href="/marketing-und-strategie">
                  <div className="sz-service-num">02</div>
                  <div className="sz-service-text">
                    <div className="sz-service-title">Marketing</div>
                    <div className="sz-service-sub">Google, Meta, SEO</div>
                  </div>
                  <div className="sz-service-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#004aad" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </div>
                </Link>
                <Link className="sz-service-card" id="sz-sc-2" href="/design-und-markenauftritt">
                  <div className="sz-service-num">03</div>
                  <div className="sz-service-text">
                    <div className="sz-service-title">Branding</div>
                    <div className="sz-service-sub">Logo, Corporate Design</div>
                  </div>
                  <div className="sz-service-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#004aad" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </div>
                </Link>
              </div>
            </div>

            {/* Phase 3: quote */}
            <div className="sz-phase" id="sz-ph-2">
              <div className="sz-quote-wrap">
                <div className="sz-quote-line" id="sz-ql-0">Kein anonymes Team.</div>
                <div className="sz-quote-line" id="sz-ql-1">Kein Ticketsystem.</div>
                <div className="sz-quote-line sz-quote-em" id="sz-ql-2">Nur echte Ergebnisse.</div>
                <Link href="/anfrage" className="sz-cta-btn" id="sz-cta" aria-label="Jetzt Website-Projekt bei PauliONE anfragen">
                  Projekt starten
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{ width: "13px", height: "13px" }}>
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </Link>
              </div>
            </div>

          </div>
        </div>

        <div className="sz-hint" id="sz-hint">
          <span className="sz-hint-text">Scrollen</span>
          <div className="sz-hint-arrow"></div>
        </div>

      </div>
    </div>
  );
}
