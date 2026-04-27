"use client";

import { useEffect, useRef } from "react";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import "./referenzen.css";

export default function Referenzen() {
  const didRun = useRef(false);

  useEffect(() => {
    if (didRun.current) return;
    didRun.current = true;

    const t = setTimeout(() => {
      try {
        // --- Hero Logic ---
        const heroInit = () => {
          const p1rhRoot = document.getElementById('p1-ref-hero');
          const p1rhGlow = document.getElementById('p1rh-glow');
          if (!p1rhRoot || !p1rhGlow) return;

          setTimeout(() => { 
            if (p1rhRoot) p1rhRoot.classList.add('p1rh-animate'); 
          }, 100);

          let p1rhHovering = false;

          if (window.matchMedia('(pointer: fine)').matches) {
            p1rhRoot.addEventListener('mousemove', (e) => {
              if (!p1rhHovering) { 
                if (p1rhGlow) p1rhGlow.style.opacity = '1'; 
                p1rhHovering = true; 
              }
              requestAnimationFrame(() => {
                if (p1rhGlow) {
                  p1rhGlow.style.left = e.clientX + 'px';
                  p1rhGlow.style.top  = e.clientY + 'px';
                }
              });
            });
            p1rhRoot.addEventListener('mouseleave', () => {
              if (p1rhGlow) p1rhGlow.style.opacity = '0';
              p1rhHovering = false;
            });
          } else {
            if (p1rhGlow) {
              p1rhGlow.style.left = '50%';
              p1rhGlow.style.top  = '50%';
              p1rhGlow.style.opacity = '0.4';
            }
          }
        };

        // --- Main Content Logic ---
        const contentInit = () => {
          /* --- 1. HEADLINE WORD SPLIT --- */
          function splitTitle() {
            const title = document.getElementById('pw-title');
            if (!title) return;

            const newNodes: Node[] = [];
            title.childNodes.forEach(node => {
              if (node.nodeType === Node.TEXT_NODE) {
                const words = (node.textContent || "").split(/(\s+)/);
                words.forEach(part => {
                  if (/\S/.test(part)) {
                    const wrap = document.createElement('span');
                    wrap.className = 'pw-word-wrap';
                    const inner = document.createElement('span');
                    inner.className = 'pw-word';
                    inner.textContent = part;
                    wrap.appendChild(inner);
                    newNodes.push(wrap);
                  } else if (part) {
                    newNodes.push(document.createTextNode(part));
                  }
                });
              } else if (node.nodeName === 'EM') {
                const wrap = document.createElement('span');
                wrap.className = 'pw-word-wrap';
                const inner = document.createElement('span');
                inner.className = 'pw-word pw-em-word';
                inner.appendChild(node.cloneNode(true));
                wrap.appendChild(inner);
                newNodes.push(wrap);
                newNodes.push(document.createTextNode(' '));
              } else {
                newNodes.push(node.cloneNode(true));
              }
            });

            title.innerHTML = '';
            newNodes.forEach(n => title.appendChild(n));
          }

          splitTitle();

          /* --- 2. INTERSECTION OBSERVER --- */
          const io = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
              if (!entry.isIntersecting) return;
              const el = entry.target as HTMLElement;
              io.unobserve(el);

              if (el.id === 'pw-label') el.classList.add('pw-triggered');
              else if (el.id === 'pw-title') animateTitle(el);
              else if (el.id === 'pw-subtitle') el.classList.add('pw-triggered');
              else if (el.id === 'pw-filters') animateFilters(el);
              else if (el.classList.contains('pw-card')) animateCard(el);
              else if (el.classList.contains('pw-stat')) animateStat(el);
              else if (el.id === 'pw-cta') el.classList.add('pw-triggered');
            });
          }, { threshold: 0.15 });

          ['pw-label','pw-title','pw-subtitle','pw-filters','pw-cta'].forEach(id => {
            const el = document.getElementById(id);
            if (el) io.observe(el);
          });

          document.querySelectorAll('.pw-card').forEach(c => io.observe(c));
          document.querySelectorAll('.pw-stat').forEach(s => io.observe(s));

          /* --- 3. ANIMATION FUNCTIONS --- */
          function animateTitle(el: HTMLElement) {
            const words = el.querySelectorAll('.pw-word');
            words.forEach((w, i) => {
              setTimeout(() => {
                w.classList.add('pw-word--visible');
                if (i === words.length - 1) {
                  setTimeout(() => el.classList.add('pw-shimmer-active'), 300);
                }
              }, i * 110);
            });
          }

          function animateFilters(el: HTMLElement) {
            el.querySelectorAll('.pw-filter-btn').forEach((btn, i) => {
              setTimeout(() => btn.classList.add('pw-triggered'), i * 70);
            });
          }

          function animateCard(el: HTMLElement) {
            const delay = parseFloat(el.dataset.cardDelay || "0");
            setTimeout(() => el.classList.add('pw-triggered'), delay);
          }

          function animateStat(el: HTMLElement) {
            el.classList.add('pw-triggered');
            const numEl = el.querySelector('.pw-stat__number');
            const target = parseInt(el.dataset.target || "0", 10);
            const suffix = el.dataset.suffix || '';
            if (!numEl || isNaN(target)) return;

            let start: number | null = null;
            const duration = 1400;
            function easeOut(t: number) { return 1 - Math.pow(1 - t, 3); }
            function step(ts: number) {
              if (!start) start = ts;
              const progress = Math.min((ts - start) / duration, 1);
              if (numEl) numEl.textContent = Math.round(easeOut(progress) * target) + suffix;
              if (progress < 1) requestAnimationFrame(step);
            }
            requestAnimationFrame(step);
          }

          /* --- 4. STAGGER CARD DELAYS --- */
          document.querySelectorAll('#pw-grid .pw-card').forEach((card, i) => {
            (card as HTMLElement).dataset.cardDelay = (i * 100).toString();
          });

          /* --- 5. 3D TILT ON CARDS --- */
          document.querySelectorAll('.pw-card').forEach(c => {
            const card = c as HTMLElement;
            card.addEventListener('mousemove', e => {
              const rect = card.getBoundingClientRect();
              const x = (e.clientX - rect.left) / rect.width  - 0.5;
              const y = (e.clientY - rect.top)  / rect.height - 0.5;
              const rotX = -y * 4;
              const rotY =  x * 4;

              card.style.transition = 'box-shadow 0.4s ease, border-color 0.3s ease';
              card.style.transform = `perspective(1200px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.015)`;

              const shine = card.querySelector('.pw-card__shine') as HTMLElement;
              if (shine) {
                shine.style.background = `radial-gradient(circle at ${(x+0.5)*100}% ${(y+0.5)*100}%, rgba(255,255,255,0.05) 0%, transparent 60%)`;
              }
            });

            card.addEventListener('mouseleave', () => {
              card.style.transition = 'transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94), box-shadow 0.4s ease, border-color 0.3s ease';
              card.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg) scale(1)';
            });
          });

          /* --- 6. FILTER LOGIC --- */
          document.querySelectorAll('.pw-filter-btn').forEach(b => {
            const btn = b as HTMLElement;
            btn.addEventListener('click', () => {
              document.querySelectorAll('.pw-filter-btn').forEach(b => b.classList.remove('active'));
              btn.classList.add('active');
              const filter = btn.dataset.filter;
              document.querySelectorAll('#pw-grid .pw-card').forEach(c => {
                const card = c as HTMLElement;
                card.classList.toggle('pw-hidden', filter !== 'all' && card.dataset.category !== filter);
              });
            });
          });
        };

        heroInit();
        contentInit();

      } catch (e) {
        console.error("Referenzen init error:", e);
      }
    }, 150);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <Header />
      <main className="referenzen-page">
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,600&display=swap"
          rel="stylesheet"
        />
        
        <div 
          dangerouslySetInnerHTML={{ 
            __html: `
              <div id="p1-ref-hero">
                <div class="p1rh-glow" id="p1rh-glow"></div>
                <div class="p1rh-content">
                    <span class="p1rh-eyebrow">Unsere Referenzen</span>
                    <h1 class="p1rh-headline">
                        <span class="p1rh-line-mask">
                            <span class="p1rh-line-inner" style="transition-delay: 0.1s;">Selected</span>
                        </span>
                        <span class="p1rh-line-mask">
                            <span class="p1rh-line-inner" style="transition-delay: 0.2s;">Digital</span>
                        </span>
                        <span class="p1rh-line-mask">
                            <span class="p1rh-line-inner" style="transition-delay: 0.3s;">Work<span class="p1rh-dot">.</span></span>
                        </span>
                    </h1>
                </div>
                <div class="p1rh-scroll">
                    <span class="p1rh-scroll-text">Scroll</span>
                    <div class="p1rh-arrow"></div>
                </div>
              </div>

              <section class="pw-refs" id="referenzen">
                <div class="pw-container">
                    <p class="pw-section-label" id="pw-label">Unsere Arbeit</p>
                    <h2 class="pw-section-title" id="pw-title">
                        Projekte, die <em>für sich</em><br>sprechen.
                    </h2>
                    <p class="pw-section-subtitle" id="pw-subtitle">
                        Ein Auszug aus unseren Referenzen – Websites, Onlineshops und Werbemittel für zufriedene Kunden.
                    </p>

                    <div class="pw-filters" id="pw-filters">
                        <button class="pw-filter-btn active" data-filter="all">Alle</button>
                        <button class="pw-filter-btn" data-filter="website">Website</button>
                        <button class="pw-filter-btn" data-filter="onlineshop">Onlineshop</button>
                        <button class="pw-filter-btn" data-filter="werbemittel">Werbemittel</button>
                        <button class="pw-filter-btn" data-filter="marketing">Marketing</button>
                    </div>

                    <div class="pw-grid" id="pw-grid">
                        <a href="https://mk-nailshop.de" target="_blank" rel="noopener" class="pw-card pw-card--large" data-category="onlineshop">
                            <div class="pw-card__img-wrap">
                                <img src="https://onecdn.io/media/a457180b-662e-408f-8a2b-e44893cbd5b6/lg" alt="MK-Nailshop" class="pw-card__img" loading="lazy">
                            </div>
                            <div class="pw-card__shine"></div>
                            <span class="pw-card__badge">Onlineshop</span>
                            <span class="pw-card__ext">
                                <svg viewBox="0 0 24 24"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                            </span>
                            <div class="pw-card__body">
                                <p class="pw-card__client">Karina M.</p>
                                <p class="pw-card__title">Onlineshop für einen Nagelshop — MK-Nailshop</p>
                            </div>
                        </a>

                        <a href="https://fotografie-eschbach.de" target="_blank" rel="noopener" class="pw-card pw-card--medium" data-category="website">
                            <div class="pw-card__img-wrap">
                                <img src="https://onecdn.io/media/53053911-902b-4f5c-8d2e-2b59b4723f04/lg" alt="Fotografie Eschbach" class="pw-card__img" loading="lazy">
                            </div>
                            <div class="pw-card__shine"></div>
                            <span class="pw-card__badge">Website</span>
                            <span class="pw-card__ext">
                                <svg viewBox="0 0 24 24"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                            </span>
                            <div class="pw-card__body">
                                <p class="pw-card__client">Olga E.</p>
                                <p class="pw-card__title">Website für eine Fotografin — Olga Eschbach</p>
                            </div>
                        </a>

                        <div class="pw-card pw-card--small" data-category="werbemittel">
                            <div class="pw-card__img-wrap">
                                <img src="https://onecdn.io/media/1a0cc727-af22-4b4e-9f35-24b6267c89b8/lg" alt="Aldaerry Produktetiketten" class="pw-card__img" loading="lazy">
                            </div>
                            <div class="pw-card__shine"></div>
                            <span class="pw-card__badge">Werbemittel</span>
                            <div class="pw-card__body">
                                <p class="pw-card__client">Aldaerry</p>
                                <p class="pw-card__title">Produktetiketten-Design & -Druck</p>
                            </div>
                        </div>

                        <div class="pw-card pw-card--small" data-category="werbemittel">
                            <div class="pw-card__img-wrap">
                                <img src="https://onecdn.io/media/65f393b0-1f25-4530-8668-b58bef04e605/lg" alt="Bäckerei Rastetten" class="pw-card__img" loading="lazy">
                            </div>
                            <div class="pw-card__shine"></div>
                            <span class="pw-card__badge">Werbemittel</span>
                            <div class="pw-card__body">
                                <p class="pw-card__client">Bäckerei Rastetten</p>
                                <p class="pw-card__title">Gutschein-Design & -Druck</p>
                            </div>
                        </div>

                        <a href="https://instagram.com/meyerundkersting" target="_blank" rel="noopener" class="pw-card pw-card--small" data-category="marketing">
                            <div class="pw-card__img-wrap">
                                <img src="https://onecdn.io/media/5a3092ab-c0c1-4640-99d9-8daee4ed0fb5/lg" alt="Meyer & Kersting" class="pw-card__img" loading="lazy">
                            </div>
                            <div class="pw-card__shine"></div>
                            <span class="pw-card__badge">Marketing</span>
                            <span class="pw-card__ext">
                                <svg viewBox="0 0 24 24"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                            </span>
                            <div class="pw-card__body">
                                <p class="pw-card__client">Meyer & Kersting</p>
                                <p class="pw-card__title">Social Media & Facebook Ads</p>
                            </div>
                        </a>

                        <a href="https://shiglauer.ch" target="_blank" rel="noopener" class="pw-card pw-card--medium" data-category="website">
                            <div class="pw-card__img-wrap">
                                <img src="https://onecdn.io/media/e12013e6-f059-47b7-84cb-a362c2f040f6/lg" alt="ShiGlauer" class="pw-card__img" loading="lazy">
                            </div>
                            <div class="pw-card__shine"></div>
                            <span class="pw-card__badge">Website & Logo</span>
                            <span class="pw-card__ext">
                                <svg viewBox="0 0 24 24"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                            </span>
                            <div class="pw-card__body">
                                <p class="pw-card__client">ShiGlauer</p>
                                <p class="pw-card__title">Website und Logo für eine Praxis</p>
                            </div>
                        </a>

                        <a href="/kontakt" class="pw-card pw-card--large" data-category="website">
                            <div class="pw-card__img-wrap pw-card__img-wrap--placeholder">
                                <div class="pw-placeholder">
                                    <div class="pw-placeholder__blob pw-placeholder__blob--1"></div>
                                    <div class="pw-placeholder__blob pw-placeholder__blob--2"></div>
                                    <div class="pw-placeholder__blob pw-placeholder__blob--3"></div>
                                    <div class="pw-placeholder__noise"></div>
                                    <div class="pw-placeholder__center">
                                        <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round">
                                            <rect x="3" y="3" width="18" height="18" rx="3" />
                                            <circle cx="8.5" cy="8.5" r="1.5" />
                                            <polyline points="21 15 16 10 5 21" />
                                        </svg>
                                        <span>Ihr Projekt</span>
                                    </div>
                                </div>
                            </div>
                            <div class="pw-card__shine"></div>
                            <span class="pw-card__badge">Nächstes Projekt</span>
                            <span class="pw-card__ext">
                                <svg viewBox="0 0 24 24"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                            </span>
                            <div class="pw-card__body">
                                <p class="pw-card__client">Ihr Unternehmen?</p>
                                <p class="pw-card__title">Ihr Projekt könnte hier stehen — melden Sie sich gerne.</p>
                            </div>
                        </a>
                    </div>

                    <div class="pw-stats">
                        <div class="pw-stat" data-target="20" data-suffix="+">
                            <div class="pw-stat__number">0</div>
                            <div class="pw-stat__label">Kundenbewertungen ★★★★★</div>
                        </div>
                        <div class="pw-stat" data-target="4" data-suffix="+">
                            <div class="pw-stat__number">0</div>
                            <div class="pw-stat__label">Jahre Erfahrung</div>
                        </div>
                        <div class="pw-stat" data-target="30" data-suffix="+">
                            <div class="pw-stat__number">0</div>
                            <div class="pw-stat__label">Abgeschlossene Projekte</div>
                        </div>
                    </div>

                    <div class="pw-cta" id="pw-cta">
                        <a href="/anfrage" class="pw-btn pw-btn--primary">
                            Projekt starten
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                                <line x1="5" y1="12" x2="19" y2="12" />
                                <polyline points="12 5 19 12 12 19" />
                            </svg>
                        </a>
                        <a href="/kontakt" class="pw-btn pw-btn--ghost">Unverbindlich anfragen</a>
                    </div>
                </div>
              </section>
            ` 
          }} 
        />
      </main>
      <Footer />
    </>
  );
}
