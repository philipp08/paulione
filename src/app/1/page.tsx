/* eslint-disable */
// @ts-nocheck
'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Header } from '@/components/landing/Header';
import './colors_and_type.css';
import './site.css';
import './referenzen.css';

/**
 * PauliONE Design Variant 1
 * Reconstructed from Downloads and Referenzen Block
 */

/* ─── HOOKS ─── */

function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-in');
            obs.unobserve(e.target);
          }
        });
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return ref;
}

/* ─── COMPONENTS ─── */

function P1Cursor({ enabled }) {
  if (!enabled) return null;
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hover, setHover] = useState(false);
  const [textMode, setTextMode] = useState(false);

  useEffect(() => {
    const onMove = (e) => setPos({ x: e.clientX, y: e.clientY });
    const onOver = (e) => {
      const el = e.target.closest('a, button, [data-cursor]');
      setHover(!!el);
      setTextMode(e.target.closest('p, h1, h2, h3, h4, .p1-lead') && !el);
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onOver);
    document.body.classList.add('has-custom-cursor');
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      document.body.classList.remove('has-custom-cursor');
    };
  }, []);

  return (
    <div 
      className={`p1-cursor ${hover ? 'is-hover' : ''} ${textMode ? 'is-text' : ''}`}
      style={{ left: pos.x, top: pos.y }}
    />
  );
}

function WordReveal({ text, className = '', as: As = 'span' }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-in');
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.25 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const parts = String(text).split(' ');
  return (
    <As ref={ref} className={`p1-words ${className}`}>
      {parts.map((w, i) => {
        const isItalic = w.startsWith('*') && w.endsWith('*');
        const word = isItalic ? w.slice(1, -1) : w;
        return (
          <span className="word" key={i}>
            <span className={`word-inner ${isItalic ? 'p1-accent' : ''}`}>{word}</span>
          </span>
        );
      })}
    </As>
  );
}

function P1Hero({ tweaks }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const h = {
    line1: tweaks.heroHeadline === 'digital' ? 'Wir denken' : 'Wir designen',
    line2: tweaks.heroHeadline === 'digital' ? 'digital.' : 'begeistert.',
    lead: 'Wir sind PauliONE. Eine inhabergeführte Agentur für Design und Marketing aus Deutschland. Wir gestalten digitale Erlebnisse, die Marken nachhaltig stärken.'
  };

  return (
    <section className={`p1-hero ${tweaks.heroDark ? 'p1-hero--dark' : ''}`}>
      <div className="p1-hero__grain" />
      <div className="p1-hero__inner">
        <div className="p1-hero__eyebrow p1-reveal">
          <span className="p1-eyebrow">Beyond Ordinary</span>
        </div>
        <h1 className="p1-hero__title">
          <span className="p1-words" style={{ display: 'block' }}>
            <span className="word"><span className="word-inner" style={{ transitionDelay: '60ms', transform: mounted ? 'translateY(0)' : 'translateY(110%)', opacity: mounted ? 1 : 0 }}>{h.line1}</span></span>
          </span>
          <span className="p1-words" style={{ display: 'block' }}>
            <span className="word"><span className="word-inner p1-accent" style={{ transitionDelay: '200ms', transform: mounted ? 'translateY(0)' : 'translateY(110%)', opacity: mounted ? 1 : 0 }}>{h.line2}</span></span>
          </span>
        </h1>
      </div>
      <div className="p1-hero__bottom">
        <p className="p1-hero__lead p1-reveal" style={{ transitionDelay: '400ms' }}>{h.lead}</p>
        <div className="p1-hero__scroll p1-reveal" style={{ transitionDelay: '600ms' }}>
          <span>Scroll</span>
          <div className="p1-hero__scroll-line" />
        </div>
      </div>
    </section>
  );
}

function P1Marquee({ dark }) {
  const items = ['Webdesign', 'Branding', 'Strategy', 'Marketing', 'E-Commerce', 'Development'];
  return (
    <div className={`p1-marquee ${dark ? 'p1-marquee--dark' : ''}`}>
      <div className="p1-marquee__track">
        {[1, 2, 3, 4].map(n => (
          <React.Fragment key={n}>
            {items.map(item => (
              <div key={item} className="p1-marquee__item">
                <span className="dot" />
                {item}
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

function P1Services({ tweaks }) {
  const revealRef = useReveal();
  const [activeModal, setActiveModal] = useState(null);
  const services = [
    { id: '01', title: 'Strategy', desc: 'Wir analysieren den Markt und definieren klare Ziele für Ihre Marke.', items: ['Markenanalyse', 'Positionierung', 'Zielgruppen-Mapping'] },
    { id: '02', title: 'Design', desc: 'Herausragendes Visual Design, das Ihre Markenidentität perfekt widerspiegelt.', items: ['UI/UX Design', 'Visual Identity', 'Motion Design'] },
    { id: '03', title: 'Marketing', desc: 'Gezielte Kampagnen, die Reichweite generieren und Leads konvertieren.', items: ['Social Media', 'SEO & SEA', 'Content Strategy'] },
    { id: '04', title: 'Dev', desc: 'Moderne technische Umsetzung mit Fokus auf Performance und Usability.', items: ['Next.js / React', 'Shopify', 'Webflow'] }
  ];

  return (
    <section ref={revealRef} className={`p1-section p1-reveal ${tweaks.servicesDark ? 'p1-section--dark' : 'p1-section--light'}`}>
      <div className="p1-container">
        <div className="p1-sec-head">
          <div className="p1-sec-head__title">
            <span className="p1-eyebrow">Services</span>
            <h2 className="p1-h2">Was wir *wirklich* gut können.</h2>
          </div>
          <div className="p1-sec-head__meta">Expertise & Passion</div>
        </div>
        <div className="p1-services">
          {services.map(s => (
            <div key={s.id} className="p1-service-row" onClick={() => setActiveModal(s)}>
              <span className="p1-service-row__num">{s.id}</span>
              <h3 className="p1-service-row__title">{s.title}</h3>
              <p className="p1-service-row__desc">{s.desc}</p>
              <div className="p1-service-row__plus">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 5v14M5 12h14"/></svg>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {activeModal && (
        <div className="p1-modal-bg is-open" onClick={() => setActiveModal(null)}>
          <div className="p1-modal" onClick={e => e.stopPropagation()}>
            <button className="p1-modal__close" onClick={() => setActiveModal(null)}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>
            <span className="p1-modal__num">{activeModal.id}</span>
            <h2 className="p1-modal__title">{activeModal.title}</h2>
            <p className="p1-modal__lead">{activeModal.desc}</p>
            <ul className="p1-modal__list">
              {activeModal.items.map((it, i) => (
                <li key={i}><span className="ix">/0{i+1}</span>{it}</li>
              ))}
            </ul>
            <div className="p1-modal__cta">
              <button className="p1-btn p1-btn--primary">Projekt anfragen</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function P1Pinned() {
  const containerRef = useRef(null);
  const items = [
    { label: '01 Vision', title: 'Wir erschaffen *Exzellenz*.', body: 'Minimalismus ist nicht das Fehlen von Etwas, sondern die perfekte Menge davon. Wir reduzieren Komplexität.', img: 'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&q=80&w=1000' },
    { label: '02 Detail', title: 'Liebe zum *Pixel*.', body: 'Jedes Element hat einen Grund. Wir glauben an Design, das atmet und durch Details überzeugt.', img: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=1000' },
    { label: '03 Erfolg', title: 'Marken zum *Wachsen* bringen.', body: 'Design ist nur so gut wie sein Ergebnis. Wir messen unseren Erfolg am Wachstum unserer Kunden.', img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1000' }
  ];

  return (
    <section className="p1-pinned" ref={containerRef}>
      <div className="p1-pinned__inner">
        <div className="p1-pinned__sticky">
          <span className="p1-pinned__counter">PauliONE Philosophy</span>
          <h2 className="p1-pinned__title">Herausragende Qualität durch *Fokus*.</h2>
          <p className="p1-pinned__body">Wir arbeiten nicht für jeden. Wir arbeiten für diejenigen, die den Unterschied zwischen „gut“ und „herausragend“ verstehen.</p>
          <div className="p1-pinned__sig">Patrick Pauli — Founder</div>
          <div className="p1-pinned__stats">
            <div><div className="pw-stat__number">100<span className="p1-accent">%</span></div><div className="p1-pinned__stat-label">Leidenschaft</div></div>
            <div><div className="pw-stat__number">24<span className="p1-accent">/</span>7</div><div className="p1-pinned__stat-label">Creativity</div></div>
            <div><div className="pw-stat__number">0<span className="p1-accent">.</span>0</div><div className="p1-pinned__stat-label">Kompromisse</div></div>
          </div>
        </div>
        <div className="p1-pinned__media-track">
          {items.map((item, i) => (
            <div key={i} className="p1-pinned__media">
              <div className="p1-pinned__media-inner" style={{ backgroundImage: `url(${item.img})` }} />
              <div className="p1-pinned__media-label">{item.label} — {item.title.replace(/\*/g, '')}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function P1Portfolio() {
  const cases = [
    { num: '01', client: 'E-Commerce', title: 'Modernes Shopping *Erlebnis*.', body: 'Ein Full-Scale Onlineshop für hochwertige Kosmetikprodukte mit Fokus auf Conversion und Ästhetik.', img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=1000', tags: ['Shopify', 'UI/UX', 'SEO'] },
    { num: '02', client: 'Corporate', title: 'Digitale Präsenz für *Fotografen*.', body: 'Ein minimalistisches Portfolio, das die Werke in den Mittelpunkt stellt und durch flüssige Animationen überzeugt.', img: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&q=80&w=1000', tags: ['Next.js', 'Animation', 'Design'] }
  ];

  return (
    <section className="p1-portfolio">
      <div className="p1-port-intro">
        <span className="p1-eyebrow">Case Studies</span>
        <h2 className="p1-h2">Ausgewählte *Arbeiten*.</h2>
      </div>
      {cases.map((c, i) => (
        <div key={i} className={`p1-case ${i % 2 !== 0 ? 'p1-case--reverse' : ''}`}>
          <div className="p1-case__text p1-reveal">
            <span className="p1-case__num">{c.num}</span>
            <div className="p1-case__client">{c.client}</div>
            <h3 className="p1-case__title"><WordReveal text={c.title} /></h3>
            <p className="p1-case__body">{c.body}</p>
            <div className="p1-case__tags">
              {c.tags.map(t => <span key={t} className="p1-case__tag">{t}</span>)}
            </div>
            <a href="#" className="p1-case__view">View Case <span className="arr">→</span></a>
          </div>
          <div className="p1-case__media p1-reveal p1-reveal--lg">
            <div className="p1-case__media-inner" style={{ backgroundImage: `url(${c.img})` }} />
          </div>
        </div>
      ))}
    </section>
  );
}

function P1Referenzen() {
  const [filter, setFilter] = useState('all');
  const sectionRef = useRef(null);

  const projects = [
    { id: 'mk', cat: 'onlineshop', title: 'Karina M. — MK-Nailshop', client: 'Karina M.', img: 'https://onecdn.io/media/a457180b-662e-408f-8a2b-e44893cbd5b6/lg', size: 'large', badge: 'Onlineshop' },
    { id: 'esch', cat: 'website', title: 'Olga E. — Fotografie Eschbach', client: 'Olga E.', img: 'https://onecdn.io/media/53053911-902b-4f5c-8d2e-2b59b4723f04/lg', size: 'medium', badge: 'Website' },
    { id: 'alda', cat: 'werbemittel', title: 'Aldaerry — Etiketten', client: 'Aldaerry', img: 'https://onecdn.io/media/1a0cc727-af22-4b4e-9f35-24b6267c89b8/lg', size: 'small', badge: 'Werbemittel' },
    { id: 'rast', cat: 'werbemittel', title: 'Bäckerei Rastetten — Gutscheine', client: 'Bäckerei Rastetten', img: 'https://onecdn.io/media/65f393b0-1f25-4530-8668-b58bef04e605/lg', size: 'small', badge: 'Werbemittel' },
    { id: 'meyer', cat: 'marketing', title: 'Meyer & Kersting — Social Ads', client: 'Meyer & Kersting', img: 'https://onecdn.io/media/5a3092ab-c0c1-4640-99d9-8daee4ed0fb5/lg', size: 'small', badge: 'Marketing' },
    { id: 'shig', cat: 'website', title: 'ShiGlauer — Praxis Website', client: 'ShiGlauer', img: 'https://onecdn.io/media/e12013e6-f059-47b7-84cb-a362c2f040f6/lg', size: 'medium', badge: 'Website & Logo' }
  ];

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const target = entry.target;
        io.unobserve(target);

        if (target.id === 'pw-label' || target.id === 'pw-subtitle' || target.id === 'pw-cta') {
           target.classList.add('pw-triggered');
        } else if (target.id === 'pw-title') {
           const words = target.querySelectorAll('.pw-word');
           words.forEach((w, i) => {
             setTimeout(() => {
               w.classList.add('pw-word--visible');
               if (i === words.length - 1) setTimeout(() => target.classList.add('pw-shimmer-active'), 300);
             }, i * 110);
           });
        } else if (target.id === 'pw-filters') {
           target.querySelectorAll('.pw-filter-btn').forEach((btn, i) => {
             setTimeout(() => btn.classList.add('pw-triggered'), i * 70);
           });
        } else if (target.classList.contains('pw-card')) {
           const delay = parseInt(target.dataset.cardDelay || 0, 10);
           setTimeout(() => target.classList.add('pw-triggered'), delay);
        } else if (target.classList.contains('pw-stat')) {
           target.classList.add('pw-triggered');
           const numEl = target.querySelector('.pw-stat__number');
           const targetVal = parseInt(target.dataset.target, 10);
           const suffix = target.dataset.suffix || '';
           if (numEl && !isNaN(targetVal)) {
             let start = null;
             const duration = 1400;
             const easeOut = t => 1 - Math.pow(1 - t, 3);
             const step = (ts) => {
               if (!start) start = ts;
               const progress = Math.min((ts - start) / duration, 1);
               numEl.textContent = Math.round(easeOut(progress) * targetVal) + suffix;
               if (progress < 1) requestAnimationFrame(step);
             };
             requestAnimationFrame(step);
           }
        }
      });
    }, { threshold: 0.1 });

    el.querySelectorAll('#pw-label, #pw-title, #pw-subtitle, #pw-filters, #pw-cta, .pw-card, .pw-stat').forEach(child => io.observe(child));
    return () => io.disconnect();
  }, []);

  const filtered = filter === 'all' ? projects : projects.filter(p => p.cat === filter);

  return (
    <section className="pw-refs" ref={sectionRef}>
      <div className="pw-container">
        <div id="pw-label" className="pw-section-label">Unsere Arbeit</div>
        <h2 id="pw-title" className="pw-section-title">
          {['Projekte,', 'die', 'für', 'sich', 'sprechen.'].map((w, i) => (
            <span key={i} className="pw-word-wrap">
              <span className={`pw-word ${w === 'sich' ? 'pw-em-word' : ''}`}>
                {w === 'sich' ? <em>{w}</em> : w}{' '}
              </span>
            </span>
          ))}
        </h2>
        <p id="pw-subtitle" className="pw-section-subtitle">
          Ein Auszug aus unseren Referenzen – Websites, Onlineshops und Werbemittel für zufriedene Kunden.
        </p>

        <div id="pw-filters" className="pw-filters">
          {['all', 'website', 'onlineshop', 'werbemittel', 'marketing'].map(f => (
            <button key={f} className={`pw-filter-btn ${filter === f ? 'active' : ''}`} onClick={() => setFilter(f)}>
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        <div className="pw-grid" id="pw-grid">
          {filtered.map((p, i) => (
            <a href="#" key={p.id} className={`pw-card pw-card--${p.size}`} data-category={p.cat} data-card-delay={i * 100}>
              <div className="pw-card__img-wrap">
                <img src={p.img} alt={p.title} className="pw-card__img" loading="lazy" />
              </div>
              <div className="pw-card__shine"></div>
              <div className="pw-card__badge">{p.badge}</div>
              <div className="pw-card__ext">
                <svg viewBox="0 0 24 24"><path d="M7 17L17 7M17 7H7M17 7V17"/></svg>
              </div>
              <div className="pw-card__body">
                <div className="pw-card__client">{p.client}</div>
                <div className="pw-card__title">{p.title}</div>
              </div>
            </a>
          ))}
          
          <a href="#" className="pw-card pw-card--large" data-category="website" data-card-delay="600">
            <div className="pw-card__img-wrap">
              <div className="pw-placeholder">
                <div className="pw-placeholder__blob pw-placeholder__blob--1" />
                <div className="pw-placeholder__blob pw-placeholder__blob--2" />
                <div className="pw-placeholder__blob pw-placeholder__blob--3" />
                <div className="pw-placeholder__noise" />
                <div className="pw-placeholder__center">
                   <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.2"><path d="M12 5v14M5 12h14"/></svg>
                   <span>Ihr Projekt</span>
                </div>
              </div>
            </div>
            <div className="pw-card__body">
                <div className="pw-card__client">Ihr Unternehmen?</div>
                <div className="pw-card__title">Ihr Projekt könnte hier stehen — melden Sie sich gerne.</div>
            </div>
          </a>
        </div>

        <div className="pw-stats">
          <div className="pw-stat" data-target="20" data-suffix="+">
            <div className="pw-stat__number">0</div>
            <div className="pw-stat__label">Kundenbewertungen ★★★★★</div>
          </div>
          <div className="pw-stat" data-target="4" data-suffix="+">
            <div className="pw-stat__number">0</div>
            <div className="pw-stat__label">Jahre Erfahrung</div>
          </div>
          <div className="pw-stat" data-target="30" data-suffix="+">
            <div className="pw-stat__number">0</div>
            <div className="pw-stat__label">Abgeschlossene Projekte</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function P1HScroll() {
  const steps = [
    { num: '01', title: 'Konzept', body: 'Wir definieren die Strategie und das visuelle Fundament.', tags: ['Strategy', 'Moodboard'] },
    { num: '02', title: 'Design', body: 'Wir gestalten das User Interface und die Experience.', tags: ['UI/UX', 'Figma'] },
    { num: '03', title: 'Dev', body: 'Wir erwecken das Design mit sauberem Code zum Leben.', tags: ['Next.js', 'React'] },
    { num: '04', title: 'Launch', body: 'Wir optimieren und begleiten den Go-Live Prozess.', tags: ['SEO', 'Hosting'] }
  ];

  return (
    <section className="p1-h-scroll">
      <div className="p1-h-scroll__head">
        <span className="p1-eyebrow">Prozess</span>
        <h2 className="p1-h2">Wie wir *arbeiten*.</h2>
      </div>
      <div className="p1-h-scroll__viewport">
        <div className="p1-h-scroll__sticky">
          <div className="p1-h-scroll__track">
            {steps.map((s, i) => (
              <div key={i} className="p1-h-scroll__card">
                <span className="p1-h-scroll__card-num">{s.num}</span>
                <div className="p1-h-scroll__card-bignum">{s.num}<span className="p1-accent">.</span></div>
                <h3 className="p1-h-scroll__card-title">{s.title}</h3>
                <p className="p1-h-scroll__card-body">{s.body}</p>
                <div className="p1-h-scroll__card-tags">
                  {s.tags.map(t => <span key={t} className="p1-h-scroll__tag">{t}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function P1Stack() {
  const slides = [
    { img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1000', caption: 'Corporate Headquarters' },
    { img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1000', caption: 'Interior Excellence' },
    { img: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80&w=1000', caption: 'Modern Workspace' }
  ];
  return (
    <section className="p1-stack">
      <div className="p1-stack__head">
        <div className="p1-stack__head-grid">
          <h2 className="p1-stack__head-title">Beyond *Standard*.</h2>
          <div className="p1-stack__head-meta">
            <div className="p1-stack__head-meta-num">/001</div>
            <p>Wir setzen auf modernste Technologien und zeitlose Ästhetik.</p>
          </div>
        </div>
      </div>
      <div className="p1-stack__viewport">
        <div className="p1-stack__sticky">
          {slides.map((s, i) => (
            <div key={i} className="p1-stack__card" style={{ zIndex: slides.length - i }}>
              <div className="p1-stack__card-inner" style={{ backgroundImage: `url(${s.img})` }} />
              <div className="p1-stack__caption">{s.caption}</div>
              <div className="p1-stack__count">{i+1} / {slides.length}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function P1CtaBanner() {
  return (
    <section className="p1-cta-banner">
      <h2 className="p1-cta-banner__title">Bereit für den *nächsten* Schritt?</h2>
      <button className="p1-btn p1-btn--primary">Projekt starten <span className="arr">→</span></button>
    </section>
  );
}

function P1Contact() {
  return (
    <section className="p1-section p1-contact-section">
      <div className="p1-container">
        <div className="p1-contact">
          <div className="p1-contact__info">
            <span className="p1-eyebrow">Kontakt</span>
            <h2 className="p1-contact__big">Lassen Sie uns über Ihr Projekt *sprechen*.</h2>
            <div className="p1-contact__links">
              <div className="p1-contact__link-row">
                <span className="p1-contact__link-label">Mail</span>
                <span className="p1-contact__link-val">hello@pauli-one.de</span>
              </div>
              <div className="p1-contact__link-row">
                <span className="p1-contact__link-label">Phone</span>
                <span className="p1-contact__link-val">+49 123 456789</span>
              </div>
            </div>
          </div>
          <div className="p1-contact__form">
            <h3 className="p1-contact__form-title">Schreiben Sie uns.</h3>
            <div className="p1-contact__field">
              <span>Name</span>
              <input type="text" placeholder="Ihren Namen eingeben" />
            </div>
            <div className="p1-contact__field">
              <span>Email</span>
              <input type="email" placeholder="Ihre Email Adresse" />
            </div>
            <div className="p1-contact__field">
              <span>Nachricht</span>
              <textarea placeholder="Wie können wir Ihnen helfen?" rows="4"></textarea>
            </div>
            <button className="p1-contact__submit">Absenden</button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── MAIN PAGE ─── */

export default function DesignVariant1() {
  const rootRef = useRef(null);
  
  const tweaks = {
    heroDark: false,
    heroHeadline: 'begeistert',
    servicesDark: false,
    cursorEnabled: true,
    marqueeAfterHero: true
  };

  useEffect(() => {
     // Trigger animations for non-referenzen sections
     const revealItems = document.querySelectorAll('.p1-reveal');
     const obs = new IntersectionObserver((entries) => {
       entries.forEach(e => {
         if (e.isIntersecting) {
           e.target.classList.add('is-in');
           obs.unobserve(e.target);
         }
       });
     }, { threshold: 0.1 });
     revealItems.forEach(item => obs.observe(item));
     return () => obs.disconnect();
  }, []);

  return (
    <div className="p1v-container" ref={rootRef} style={{ position: 'relative' }}>
      <P1Cursor enabled={tweaks.cursorEnabled} />
      <Header />
      
      <main>
        <P1Hero tweaks={tweaks} />
        {tweaks.marqueeAfterHero && <P1Marquee dark={tweaks.heroDark} />}
        <P1Services tweaks={tweaks} />
        <P1Pinned />
        <P1Portfolio />
        <P1Referenzen />
        <P1HScroll />
        <P1Stack />
        <P1CtaBanner />
        <P1Contact />
      </main>

      <footer className="p1-footer">
        <div className="p1-container">
          <div className="p1-footer__grid">
            <div className="p1-footer__brand">
              <h3 className="p1-footer__tag">Beyond Ordinary.</h3>
              <p className="p1-footer__about">PauliONE ist Ihre Boutique-Agentur für Webdesign und digitales Marketing.</p>
            </div>
            <div>
              <h4 className="p1-footer__h">Links</h4>
              <ul className="p1-footer__list">
                <li>Referenzen</li>
                <li>Leistungen</li>
                <li>Über uns</li>
              </ul>
            </div>
            <div>
              <h4 className="p1-footer__h">Legal</h4>
              <ul className="p1-footer__list">
                <li>Impressum</li>
                <li>Datenschutz</li>
              </ul>
            </div>
          </div>
          <div className="p1-footer__bottom">
            <span>© 2024 PauliONE</span>
            <span>Handmade with Love in Germany</span>
          </div>
        </div>
        <div className="p1-footer__bigtype">PAULIONE</div>
      </footer>
    </div>
  );
}
