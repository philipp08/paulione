'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import './site.css';

// ─── Mock Visuals (SVG placeholders) ────────────────────────────────────────

function MockVisual({ kind = 'web' }: { kind: string }) {
  const shared = { width: '100%', height: '100%', display: 'block' as const };
  const vb = '0 0 1600 900';
  const pr = 'xMidYMid slice';

  const visuals: Record<string, React.ReactNode> = {
    web: (
      <svg viewBox={vb} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio={pr} style={shared}>
        <defs><linearGradient id="v1webBg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#0a0f1e"/><stop offset="100%" stopColor="#000"/></linearGradient></defs>
        <rect width="1600" height="900" fill="url(#v1webBg)"/>
        <rect x="60" y="60" width="1480" height="780" rx="10" fill="#f5f6fa"/>
        <rect x="60" y="60" width="1480" height="44" rx="10" fill="#e3e5ee"/>
        <circle cx="92" cy="82" r="6" fill="#cfd2dd"/><circle cx="116" cy="82" r="6" fill="#cfd2dd"/><circle cx="140" cy="82" r="6" fill="#cfd2dd"/>
        <rect x="200" y="70" width="320" height="22" rx="11" fill="#fff"/>
        <rect x="120" y="160" width="220" height="14" rx="3" fill="#004aad"/>
        <text x="120" y="320" fontFamily="system-ui" fontWeight="700" fontSize="110" fill="#0a0f1e" letterSpacing="-4">Webdesign,</text>
        <text x="120" y="430" fontFamily="system-ui" fontWeight="700" fontSize="110" fill="#0a0f1e">das</text>
        <text x="310" y="430" fontFamily="Georgia" fontStyle="italic" fontSize="110" fill="#004aad">begeistert.</text>
        <rect x="120" y="500" width="180" height="50" rx="8" fill="#004aad"/>
        <rect x="1080" y="160" width="380" height="500" rx="10" fill="#e3e5ee"/>
        <circle cx="1270" cy="410" r="120" fill="#3a7ad4" opacity=".25"/>
        <circle cx="1270" cy="410" r="60" fill="#004aad" opacity=".4"/>
      </svg>
    ),
    brand: (
      <svg viewBox={vb} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio={pr} style={shared}>
        <rect width="1600" height="900" fill="#f5f6fa"/>
        <rect x="0" y="0" width="700" height="900" fill="#004aad"/>
        <text x="350" y="520" fontFamily="system-ui" fontWeight="700" fontSize="320" fill="#fff" textAnchor="middle" letterSpacing="-12">N</text>
        <rect x="700" y="0" width="900" height="450" fill="#000"/>
        <text x="1150" y="270" fontFamily="Georgia" fontStyle="italic" fontSize="120" fill="#3a7ad4" textAnchor="middle">nordlicht.</text>
        <rect x="700" y="450" width="450" height="450" fill="#fff"/>
        <circle cx="925" cy="675" r="140" fill="#004aad"/>
        <rect x="1150" y="450" width="450" height="225" fill="#3a7ad4"/>
        <rect x="1150" y="675" width="450" height="225" fill="#002d6b"/>
      </svg>
    ),
    editorial: (
      <svg viewBox={vb} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio={pr} style={shared}>
        <rect width="1600" height="900" fill="#000"/>
        <text x="80" y="360" fontFamily="system-ui" fontWeight="700" fontSize="260" fill="#fff" letterSpacing="-12">Atelier</text>
        <text x="80" y="580" fontFamily="Georgia" fontStyle="italic" fontSize="210" fill="#3a7ad4">moderne.</text>
        <rect x="80" y="680" width="900" height="1" fill="rgba(255,255,255,.2)"/>
        <text x="80" y="740" fontFamily="system-ui" fontSize="20" fill="rgba(255,255,255,.6)" letterSpacing="6">ISSUE 04 — FRÜHJAHR 2026</text>
        <rect x="1100" y="640" width="420" height="220" rx="10" fill="#0d0d0d"/>
        <circle cx="1310" cy="750" r="80" fill="#004aad"/>
      </svg>
    ),
    studio: (
      <svg viewBox={vb} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio={pr} style={shared}>
        <defs><linearGradient id="v1studioBg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#1a2240"/><stop offset="100%" stopColor="#000"/></linearGradient></defs>
        <rect width="1600" height="900" fill="url(#v1studioBg)"/>
        <rect x="450" y="240" width="700" height="380" rx="14" fill="#000" stroke="#222a45" strokeWidth="3"/>
        <rect x="470" y="260" width="660" height="340" rx="6" fill="#001a4a"/>
        <rect x="500" y="290" width="240" height="14" rx="3" fill="#3a7ad4"/>
        <rect x="500" y="320" width="500" height="8" rx="2" fill="rgba(255,255,255,.25)"/>
        <rect x="500" y="340" width="420" height="8" rx="2" fill="rgba(255,255,255,.25)"/>
        <rect x="500" y="400" width="160" height="60" rx="6" fill="#004aad"/>
        <circle cx="1260" cy="450" r="80" fill="#3a7ad4" opacity="0.35"/>
      </svg>
    ),
    portrait: (
      <svg viewBox={vb} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio={pr} style={shared}>
        <defs><linearGradient id="v1portBg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#3a7ad4"/><stop offset="100%" stopColor="#000"/></linearGradient></defs>
        <rect width="1600" height="900" fill="url(#v1portBg)"/>
        <circle cx="800" cy="380" r="180" fill="rgba(0,0,0,.6)"/>
        <ellipse cx="800" cy="780" rx="320" ry="280" fill="rgba(0,0,0,.6)"/>
        <text x="800" y="870" fontFamily="Georgia" fontStyle="italic" fontSize="56" fill="rgba(255,255,255,.55)" textAnchor="middle">Philipp</text>
      </svg>
    ),
    process: (
      <svg viewBox={vb} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio={pr} style={shared}>
        <rect width="1600" height="900" fill="#0d0d0d"/>
        <g stroke="rgba(255,255,255,.15)" strokeWidth="1" fill="none">
          {Array.from({length:9}).map((_,i)=><line key={`h${i}`} x1="0" y1={100*(i+1)} x2="1600" y2={100*(i+1)}/>)}
          {Array.from({length:15}).map((_,i)=><line key={`v${i}`} x1={100*(i+1)} y1="0" x2={100*(i+1)} y2="900"/>)}
        </g>
        <rect x="640" y="200" width="380" height="500" rx="6" fill="#004aad" opacity="0.25"/>
        <rect x="640" y="200" width="380" height="500" rx="6" fill="none" stroke="#3a7ad4" strokeWidth="2.5"/>
        <text x="680" y="280" fontFamily="system-ui" fontSize="32" fill="#fff" fontWeight="600">Wireframe</text>
        <rect x="1080" y="450" width="320" height="40" rx="4" fill="#3a7ad4"/>
        <circle cx="320" cy="640" r="80" fill="none" stroke="#fff" strokeWidth="2"/>
        <circle cx="320" cy="640" r="24" fill="#3a7ad4"/>
      </svg>
    ),
    photo1: (
      <svg viewBox={vb} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio={pr} style={shared}>
        <defs><linearGradient id="v1ph1" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#1a2a4a"/><stop offset="100%" stopColor="#000"/></linearGradient></defs>
        <rect width="1600" height="900" fill="url(#v1ph1)"/>
        <polygon points="0,640 160,560 160,640 280,640 280,500 400,500 400,640 560,640 560,440 720,440 720,640 880,640 880,520 1040,520 1040,640 1200,640 1200,460 1360,460 1360,640 1600,640 1600,900 0,900" fill="#000"/>
        <circle cx="1280" cy="280" r="100" fill="rgba(58,122,212,.3)"/>
        <text x="80" y="120" fontFamily="system-ui" fontSize="16" fill="rgba(255,255,255,.5)" letterSpacing="8">FRANKFURT 06:42</text>
      </svg>
    ),
    photo2: (
      <svg viewBox={vb} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio={pr} style={shared}>
        <rect width="1600" height="900" fill="#0d0d0d"/>
        <g fill="#1a2240">
          {Array.from({length:6}).map((_,r)=>Array.from({length:18}).map((__,c)=>(
            <rect key={`${r}-${c}`} x={120+c*78} y={220+r*82} width="64" height="64" rx="8"/>
          )))}
        </g>
        <rect x="120" y="220" width="1422" height="500" fill="none" stroke="rgba(58,122,212,.4)" strokeWidth="1"/>
        <text x="80" y="120" fontFamily="system-ui" fontSize="16" fill="rgba(255,255,255,.5)" letterSpacing="8">CODE / 01:14</text>
      </svg>
    ),
  };
  return <>{visuals[kind] || visuals.web}</>;
}

// ─── Reveal hook ─────────────────────────────────────────────────────────────

function useReveal(threshold = 0.2) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) { e.target.classList.add('is-in'); obs.unobserve(e.target); }
        });
      },
      { threshold, rootMargin: '0px 0px -10% 0px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return ref;
}

interface RevealProps {
  children: React.ReactNode;
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
  delay?: number;
  [key: string]: unknown;
}

function Reveal({ children, as: As = 'div', className = '', delay = 0, ...rest }: RevealProps) {
  const ref = useReveal();
  const style = delay ? { transitionDelay: `${delay}ms` } : undefined;
  return React.createElement(As, { ref, className: `p1-reveal ${className}`, style, ...rest }, children);
}

// ─── Custom Cursor ───────────────────────────────────────────────────────────

function P1Cursor({ enabled, rootRef }: { enabled: boolean; rootRef: React.RefObject<HTMLDivElement | null> }) {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [cursorState, setCursorState] = useState('default');

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (!enabled) { root.classList.remove('has-custom-cursor'); return; }
    root.classList.add('has-custom-cursor');

    let x = window.innerWidth / 2, y = window.innerHeight / 2;
    let tx = x, ty = y, raf = 0;
    const onMove = (e: MouseEvent) => { tx = e.clientX; ty = e.clientY; };
    const tick = () => {
      x += (tx - x) * 0.22; y += (ty - y) * 0.22;
      const c = cursorRef.current;
      if (c) c.style.transform = `translate(${x}px, ${y}px)`;
      raf = requestAnimationFrame(tick);
    };
    const onOver = (e: MouseEvent) => {
      const t = (e.target as Element).closest('[data-cursor]');
      if (!t) { setCursorState('default'); return; }
      setCursorState(t.getAttribute('data-cursor') || 'hover');
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onOver);
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      cancelAnimationFrame(raf);
      root.classList.remove('has-custom-cursor');
    };
  }, [enabled, rootRef]);

  if (!enabled) return null;
  return (
    <div
      ref={cursorRef}
      className={`p1-cursor ${cursorState === 'hover' ? 'is-hover' : ''} ${cursorState === 'text' ? 'is-text' : ''}`}
      style={{ transform: 'translate(-100px, -100px)' }}
    />
  );
}

// ─── Nav ─────────────────────────────────────────────────────────────────────

function P1Nav({ heroDark, onCtaClick }: { heroDark: boolean; onCtaClick: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [overDark, setOverDark] = useState(heroDark);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const y = 60;
      const sections = document.querySelectorAll('[data-nav-theme]');
      let theme = heroDark ? 'dark' : 'light';
      sections.forEach((s) => {
        const r = s.getBoundingClientRect();
        if (r.top <= y && r.bottom >= y) theme = s.getAttribute('data-nav-theme') || theme;
      });
      setOverDark(theme === 'dark');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [heroDark]);

  const links = [
    { label: 'Arbeit', href: '#v1-arbeit' },
    { label: 'Leistungen', href: '#v1-leistungen' },
    { label: 'Studio', href: '#v1-studio' },
    { label: 'Prozess', href: '#v1-prozess' },
    { label: 'Kontakt', href: '#v1-kontakt' },
  ];

  const logo = overDark ? '/logo-negativ-transparent.png' : '/logo-positiv-transparent.png';

  return (
    <nav className={`p1-nav ${scrolled ? 'is-scrolled' : ''} ${overDark ? 'is-dark' : ''}`}>
      <a className="p1-nav__brand" href="#v1-top" data-cursor="hover">
        <img src={logo} alt="PauliONE" />
      </a>
      <ul className="p1-nav__links">
        {links.map((l) => (
          <li key={l.label}><a href={l.href} data-cursor="hover">{l.label}</a></li>
        ))}
      </ul>
      <button className="p1-nav__cta" onClick={onCtaClick} data-cursor="hover">Anfragen</button>
    </nav>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function P1Hero({ heroDark, heroHeadline }: { heroDark: boolean; heroHeadline: string }) {
  const [mounted, setMounted] = useState(false);
  const [time, setTime] = useState('');
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    const update = () => {
      const d = new Date();
      setTime(`${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}:${String(d.getSeconds()).padStart(2,'0')}`);
    };
    update();
    const i = setInterval(update, 1000);
    return () => { clearTimeout(t); clearInterval(i); };
  }, []);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      el.style.setProperty('--mx', x.toFixed(3));
      el.style.setProperty('--my', y.toFixed(3));
    };
    el.addEventListener('mousemove', onMove);
    return () => el.removeEventListener('mousemove', onMove);
  }, []);

  const headlines: Record<string, { line1: string; line2a: string; line2b: string }> = {
    begeistert: { line1: 'Webdesign,', line2a: 'das', line2b: 'begeistert.' },
    verkaufen:  { line1: 'Webseiten,', line2a: 'die', line2b: 'verkaufen.' },
    charakter:  { line1: 'Marken mit', line2a: '', line2b: 'Charakter.' },
  };
  const h = headlines[heroHeadline] || headlines.begeistert;

  const wi = (delay: number, content: React.ReactNode, extra = '') => (
    <span className="word">
      <span className={`word-inner ${extra}`} style={{ transitionDelay: `${delay}ms`, transform: mounted ? 'translateY(0)' : 'translateY(110%)' }}>
        {content}
      </span>
    </span>
  );

  return (
    <section
      ref={heroRef as React.RefObject<HTMLElement>}
      className={`p1-hero ${heroDark ? 'p1-hero--dark' : ''}`}
      id="v1-top"
      data-nav-theme={heroDark ? 'dark' : 'light'}
    >
      <div className="p1-hero__grain" />
      <div className="p1-hero__orb p1-hero__orb--a" aria-hidden="true" />
      <div className="p1-hero__orb p1-hero__orb--b" aria-hidden="true" />
      <div className="p1-hero__rail p1-hero__rail--l" aria-hidden="true">
        <span>N 50.110924°</span><span>E 8.682127°</span><span>FRA · DE</span>
      </div>
      <div className="p1-hero__rail p1-hero__rail--r" aria-hidden="true">
        <span>{time}</span><span>EST. 2021</span><span>STUDIO ONE</span>
      </div>

      <div className="p1-hero__inner">
        <div className={`p1-eyebrow p1-hero__eyebrow p1-reveal ${mounted ? 'is-in' : ''}`}>
          <span>Webdesign &amp; Marken · Frankfurt · seit 2021</span>
        </div>
        <h1 className="p1-hero__title">
          <span className="p1-words" style={{ display: 'block' }}>
            {wi(60, h.line1)}
          </span>
          <span style={{ display: 'block' }}>
            {h.line2a && (
              <>
                <span className="p1-words">{wi(160, h.line2a)}</span>{' '}
              </>
            )}
            <span className="p1-words">{wi(260, h.line2b, 'p1-accent')}</span>
          </span>
        </h1>

        <div className={`p1-hero__meta p1-reveal ${mounted ? 'is-in' : ''}`} style={{ transitionDelay: '440ms' }}>
          <div className="p1-hero__meta-cell">
            <div className="p1-hero__meta-label">Index</div>
            <div className="p1-hero__meta-value">001 / FRA</div>
          </div>
          <div className="p1-hero__meta-cell">
            <div className="p1-hero__meta-label">Disziplinen</div>
            <div className="p1-hero__meta-value">Web · Brand · Code</div>
          </div>
          <div className="p1-hero__meta-cell">
            <div className="p1-hero__meta-label">Status</div>
            <div className="p1-hero__meta-value"><span className="p1-hero__dot" /> Verfügbar Q1/26</div>
          </div>
        </div>
      </div>

      <div className="p1-hero__bottom">
        <p className={`p1-hero__lead p1-reveal ${mounted ? 'is-in' : ''}`} style={{ transitionDelay: '500ms' }}>
          Strategie, Design und Code aus einer Hand — für Marken in der DACH-Region, die nicht aussehen wollen wie alle anderen.
        </p>
        <div className={`p1-hero__scroll p1-reveal ${mounted ? 'is-in' : ''}`} style={{ transitionDelay: '600ms' }}>
          <span>Scrollen</span>
          <span className="p1-hero__scroll-line" />
        </div>
      </div>
    </section>
  );
}

// ─── Marquee ──────────────────────────────────────────────────────────────────

function P1Marquee({ dark = false }: { dark?: boolean }) {
  const items = ['Editorial Webdesign','Brand Systems','Conversion-Optimiert','DACH-Region','Webentwicklung','Made in Frankfurt','Premium Marken','Strategie & Code'];
  const all = [...items, ...items, ...items];
  return (
    <div className={`p1-marquee ${dark ? 'p1-marquee--dark' : ''}`}>
      <div className="p1-marquee__track">
        {all.map((it, i) => (
          <span className="p1-marquee__item" key={i}>
            <span>{it}</span><span className="dot" />
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── Services ────────────────────────────────────────────────────────────────

const SERVICES_DATA = [
  {
    n: '01', title: 'Webdesign', accent: '& Entwicklung.',
    desc: 'Von der ersten Skizze bis zum Launch — performante, barrierearme Seiten, die auf jedem Gerät wirken.',
    lead: 'Maßgeschneiderte Webseiten, die nicht nur gut aussehen, sondern auch geschäftlich performen.',
    items: [['UX','Nutzerführung, IA, A/B-tests'],['UI','Visuelles System, Komponenten, Motion Design'],['Code','Webflow, Next.js, WordPress'],['Performance','Core Web Vitals, SEO, Hosting-Setup'],['Wartung','Optionales monatliches Care-Paket']],
  },
  {
    n: '02', title: 'Branding', accent: '& Identität.',
    desc: 'Naming, Logo, Style Guide. Wir geben Ihrer Marke einen Charakter, der bleibt.',
    lead: 'Eine Marke ist mehr als ein Logo. Sie ist Haltung, Stimme und visuelles System.',
    items: [['Strategie','Positionierung, Markenkern, Tonalität'],['Identität','Logo, Wordmark, Farbsystem, Typografie'],['System','Design-Tokens, Komponenten, Style Guide'],['Anwendung','Geschäftsausstattung, Templates, Social'],['Rollout','Launch-Plan, Schulung, Markenführung']],
  },
  {
    n: '03', title: 'Content', accent: '& Strategie.',
    desc: 'Inhalte mit Haltung. Redaktion, Fotografie und klare Positionierung.',
    lead: 'Texte, die nicht nach Marketing klingen. Bilder, die nicht nach Stockfoto aussehen.',
    items: [['Redaktion','Webtexte, Blog-Artikel, Newsletter'],['Fotografie','Portraits, Produkt, Behind-the-Scenes'],['SEO','Keyword-Research, On-Page, technische Audits'],['Social','Content-Plan, Templates, redaktionelles Setup']],
  },
  {
    n: '04', title: 'Beratung', accent: '& Sparring.',
    desc: 'Strategische Beratung — als Sparringspartner für Ihr internes Team.',
    lead: 'Monatliches Sparring, Quartals-Review oder Projekt-Coaching.',
    items: [['Audit','Site-Audit, Brand-Audit, Wettbewerbsanalyse'],['Sparring','Monatliches 1:1 mit Philipp persönlich'],['Workshops','Inhouse-Workshops zu Webdesign-Grundlagen'],['Recruiting','Hilfe bei der Auswahl von Designer:innen']],
  },
];

type ServiceData = typeof SERVICES_DATA[0];

function P1ServiceModal({ open, data, onClose }: { open: boolean; data: ServiceData | null; onClose: () => void }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [open, onClose]);

  return (
    <div className={`p1-modal-bg ${open ? 'is-open' : ''}`} onClick={(e) => { if (e.currentTarget === e.target) onClose(); }}>
      {data && (
        <div className="p1-modal" role="dialog" aria-modal="true">
          <button className="p1-modal__close" onClick={onClose} data-cursor="hover" aria-label="Schließen">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
          <div className="p1-modal__num">Leistung — {data.n}</div>
          <h2 className="p1-modal__title">{data.title} <span className="p1-accent">{data.accent}</span></h2>
          <p className="p1-modal__lead">{data.lead}</p>
          <ul className="p1-modal__list">
            {data.items.map(([k, v], i) => (
              <li key={i}>
                <span className="ix">{String(i+1).padStart(2,'0')}</span>
                <span><strong style={{color:'var(--ink-1)'}}>{k}.</strong>&nbsp;{v}</span>
              </li>
            ))}
          </ul>
          <div className="p1-modal__cta">
            <a href="#v1-kontakt" className="p1-btn p1-btn--primary" onClick={onClose} data-cursor="hover">
              Projekt anfragen <span className="arr">→</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

function P1Services({ dark }: { dark: boolean }) {
  const [open, setOpen] = useState<ServiceData | null>(null);
  return (
    <section className={`p1-section ${dark ? 'p1-section--dark' : 'p1-section--light'}`} id="v1-leistungen" data-nav-theme={dark ? 'dark' : 'light'}>
      <div className="p1-container">
        <div className="p1-sec-head">
          <div className="p1-sec-head__title">
            <Reveal><div className="p1-eyebrow"><span>Leistungen</span></div></Reveal>
            <Reveal as="h2" className="p1-h2" delay={80}>Vier Disziplinen.<br/><span className="p1-accent">Ein Anspruch.</span></Reveal>
            <Reveal as="p" className="p1-lead" delay={160}>Strategie, Gestaltung und Umsetzung — als integriertes Team. Klicken Sie auf eine Leistung für Details.</Reveal>
          </div>
          <Reveal className="p1-sec-head__meta" delay={240}><span>04 — Disziplinen</span></Reveal>
        </div>
        <div className="p1-services">
          {SERVICES_DATA.map((s, i) => (
            <Reveal key={s.n} delay={i * 60}>
              <div className="p1-service-row" onClick={() => setOpen(s)} data-cursor="hover">
                <div className="p1-service-row__num">{s.n}</div>
                <h3 className="p1-service-row__title">{s.title} <span className="p1-accent">{s.accent}</span></h3>
                <p className="p1-service-row__desc">{s.desc}</p>
                <div className="p1-service-row__plus">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
      <P1ServiceModal open={!!open} data={open} onClose={() => setOpen(null)} />
    </section>
  );
}

// ─── Pinned About ─────────────────────────────────────────────────────────────

function P1Pinned() {
  const stats = [
    { num: '42+', label: 'Projekte ausgeliefert' },
    { num: '5', label: 'Jahre Erfahrung' },
    { num: '<1.2s', label: 'Avg. LCP' },
  ];
  const medias = [
    { kind: 'studio', label: 'STUDIO — FRANKFURT' },
    { kind: 'portrait', label: 'PHILIPP PAULI — GRÜNDER' },
    { kind: 'process', label: 'WORKSHOP — IN ARBEIT' },
  ];
  return (
    <section className="p1-pinned" id="v1-studio" data-nav-theme="light">
      <div className="p1-pinned__inner">
        <div className="p1-pinned__sticky">
          <Reveal><div className="p1-pinned__counter">— ÜBER PAULIONE</div></Reveal>
          <Reveal>
            <h2 className="p1-pinned__title">Eine Person.<br/><span className="p1-accent">Eine Vision.</span></h2>
          </Reveal>
          <Reveal as="p" className="p1-pinned__body" delay={80}>
            PauliONE ist kein Großbüro. Sondern Philipp — und ein kleines Netzwerk aus spezialisierten Partner:innen, das pro Projekt zusammengestellt wird.
          </Reveal>
          <Reveal as="p" className="p1-pinned__body" delay={160}>
            Das bedeutet: kein Account-Manager zwischen Ihnen und der Person, die das Projekt baut. Direkter Draht, kürzere Wege, bessere Ergebnisse.
          </Reveal>
          <Reveal className="p1-pinned__sig" delay={240}>— „Webdesign, das begeistert."</Reveal>
          <div className="p1-pinned__stats">
            {stats.map((s, i) => (
              <Reveal key={i} delay={i * 80}>
                <div>
                  <div className="p1-pinned__stat-num">{s.num}</div>
                  <div className="p1-pinned__stat-label">{s.label}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
        <div className="p1-pinned__media-track">
          {medias.map((m, i) => (
            <div className="p1-pinned__media" key={i}>
              <div className="p1-pinned__media-inner"><MockVisual kind={m.kind} /></div>
              <div className="p1-pinned__media-label">{m.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Portfolio ────────────────────────────────────────────────────────────────

const CASES = [
  { n:'01', client:'Nordlicht Atelier', title:'Eine Marke,', accentEnd:'die leuchtet.', body:'Komplettes Rebrand und neue Website für ein Hamburger Innenarchitektur-Studio. Editoriales Layout, Custom-CMS, +120% Anfragen in 3 Monaten.', tags:['Branding','Webdesign','CMS','Fotografie'], kind:'brand' },
  { n:'02', client:'Atelier Moderne — Magazin', title:'Print trifft', accentEnd:'Pixel.', body:'Digitales Pendant zum Print-Magazin. Read-along Layout, Long-Form Editorial, perfekt typografisch ausbalanciert. Lighthouse 100/100/100/100.', tags:['Editorial','Webentwicklung','Performance'], kind:'editorial', reverse:true },
  { n:'03', client:'Kessler Kanzlei', title:'Vertrauen,', accentEnd:'klar gestaltet.', body:'Relaunch für eine mittelständische Wirtschaftskanzlei. Konservativ genug für die Mandantschaft, modern genug für junge Kollegen.', tags:['Webdesign','Strategie','Recruiting'], kind:'web' },
];

function P1Portfolio() {
  return (
    <section className="p1-portfolio" id="v1-arbeit" data-nav-theme="dark">
      <div className="p1-port-intro">
        <div className="p1-sec-head">
          <div className="p1-sec-head__title">
            <Reveal><div className="p1-eyebrow"><span>Ausgewählte Arbeiten</span></div></Reveal>
            <Reveal as="h2" className="p1-h2" delay={80}>Drei Projekte.<br/><span className="p1-accent">Drei Ansätze.</span></Reveal>
          </div>
          <Reveal delay={160} className="p1-sec-head__meta">2024 — 2026</Reveal>
        </div>
      </div>
      {CASES.map((c) => (
        <article key={c.n} className={`p1-case ${c.reverse ? 'p1-case--reverse' : ''}`}>
          <div className="p1-case__text">
            <Reveal><div className="p1-case__num">CASE — {c.n}</div></Reveal>
            <Reveal delay={60}><div className="p1-case__client">{c.client}</div></Reveal>
            <Reveal delay={120} as="h3" className="p1-case__title">{c.title}<br/><span className="p1-accent">{c.accentEnd}</span></Reveal>
            <Reveal delay={200} as="p" className="p1-case__body">{c.body}</Reveal>
            <Reveal delay={280}><div className="p1-case__tags">{c.tags.map((t,i)=><span key={i} className="p1-case__tag">{t}</span>)}</div></Reveal>
            <Reveal delay={340}><a className="p1-case__view" href="#" data-cursor="hover">Case ansehen <span>→</span></a></Reveal>
          </div>
          <div className="p1-case__media"><div className="p1-case__media-inner"><MockVisual kind={c.kind} /></div></div>
        </article>
      ))}
    </section>
  );
}

// ─── Horizontal Scroll Process ───────────────────────────────────────────────

const STEPS = [
  { n:'01', big:'01', title:'Briefing', body:'Wir starten mit einem Gespräch — 60 Minuten. Ziele, Zielgruppe, bestehende Marke. Kein Pitch, nur Zuhören.', tags:['Discovery','Brand-Audit','Workshop'] },
  { n:'02', big:'02', title:'Strategie', body:'Aus dem Briefing wird ein Strategiepapier — Positionierung, Tonalität, Zielarchitektur. 5–10 Seiten, dicht geschrieben.', tags:['Positionierung','IA','Tonalität'] },
  { n:'03', big:'03', title:'Gestaltung', body:'Wireframes → Visual Design → Komponenten. Iteriert in 2-Wochen-Zyklen mit klaren Reviews.', tags:['Wireframes','UI','Motion'] },
  { n:'04', big:'04', title:'Umsetzung', body:'Code in dem Stack, der zum Projekt passt — Webflow, Next.js, WordPress. Sauber, dokumentiert, übergebbar.', tags:['Webflow','Next.js','WP'] },
  { n:'05', big:'05', title:'Launch', body:'Pre-launch Audit, Performance-Check, SEO-Setup. Soft-launch, Monitoring, harter Schnitt.', tags:['Audit','Performance','SEO'] },
  { n:'06', big:'*', title:'Wartung', body:'Optional: monatliches Care-Paket. Updates, kleine Erweiterungen, Performance-Reports. Kein Lock-in.', tags:['Care','Reports','Updates'] },
];

function P1HScroll() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const wrap = wrapRef.current; const track = trackRef.current; const bar = barRef.current;
      if (!wrap || !track) return;
      const r = wrap.getBoundingClientRect();
      const total = wrap.offsetHeight - window.innerHeight;
      const progress = Math.min(1, Math.max(0, -r.top / total));
      const max = track.scrollWidth - window.innerWidth + 48;
      track.style.transform = `translateX(${-progress * max}px)`;
      if (bar) bar.style.transform = `scaleX(${progress})`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    onScroll();
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); };
  }, []);

  return (
    <section className="p1-h-scroll" id="v1-prozess" data-nav-theme="light">
      <div className="p1-h-scroll__head">
        <div className="p1-sec-head">
          <div className="p1-sec-head__title">
            <Reveal><div className="p1-eyebrow"><span>Prozess</span></div></Reveal>
            <Reveal as="h2" className="p1-h2" delay={80}>Sechs Schritte.<br/><span className="p1-accent">Klare Kanten.</span></Reveal>
            <Reveal as="p" className="p1-lead" delay={160}>Vom ersten Gespräch bis zur Wartung — jeder Schritt mit definiertem Output und festem Zeitrahmen.</Reveal>
          </div>
          <Reveal delay={200} className="p1-sec-head__meta">06 — Schritte</Reveal>
        </div>
      </div>
      <div className="p1-h-scroll__viewport" ref={wrapRef}>
        <div className="p1-h-scroll__sticky">
          <div className="p1-h-scroll__track" ref={trackRef}>
            {STEPS.map((s) => (
              <div className="p1-h-scroll__card" key={s.n} data-cursor="hover">
                <div>
                  <div className="p1-h-scroll__card-num">SCHRITT — {s.n}</div>
                  <div className="p1-h-scroll__card-bignum">
                    {s.big === '*' ? <span className="p1-accent">∞</span> : s.big}
                  </div>
                </div>
                <div>
                  <h3 className="p1-h-scroll__card-title">{s.title}</h3>
                  <p className="p1-h-scroll__card-body">{s.body}</p>
                  <div className="p1-h-scroll__card-tags">
                    {s.tags.map((t,i) => <span key={i} className="p1-h-scroll__tag">{t}</span>)}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="p1-h-scroll__progress"><div className="p1-h-scroll__progress-bar" ref={barRef} /></div>
        </div>
      </div>
    </section>
  );
}

// ─── Image Stack ──────────────────────────────────────────────────────────────

const STACK_CARDS = [
  { kind:'web',       label:'NORDLICHT — HOMEPAGE' },
  { kind:'editorial', label:'ATELIER MODERNE — COVER' },
  { kind:'brand',     label:'NORDLICHT — IDENTITÄT' },
  { kind:'photo1',    label:'FRANKFURT — STADT' },
  { kind:'photo2',    label:'IM CODE' },
];

function P1Stack() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const N = STACK_CARDS.length;
    const onScroll = () => {
      const wrap = wrapRef.current;
      if (!wrap) return;
      const r = wrap.getBoundingClientRect();
      const total = wrap.offsetHeight - window.innerHeight;
      const progress = Math.min(1, Math.max(0, -r.top / total));
      const active = Math.min(N - 1, Math.floor(progress * N));
      setActiveIdx(active);
      cardRefs.current.forEach((el, i) => {
        if (!el) return;
        const start = i / N, end = (i + 1) / N;
        const localIn = Math.min(1, Math.max(0, (progress - start) / (end - start)));
        const behind = Math.max(0, active - i);
        let translateY: number, scale: number, opacity: number, rotate: number;
        if (progress < start) {
          translateY = window.innerHeight * 0.55; scale = 0.88; opacity = 0;
          rotate = (i % 2 === 0 ? 1 : -1) * 4;
        } else {
          const eased = 1 - Math.pow(1 - localIn, 3);
          const restY = -behind * 28, restScale = 1 - behind * 0.045;
          const startY = window.innerHeight * 0.55;
          translateY = startY * (1 - eased) + restY * eased;
          scale = 0.88 * (1 - eased) + restScale * eased;
          opacity = Math.min(1, eased * 1.4);
          rotate = ((i % 2 === 0 ? 1 : -1) * 4) * (1 - eased);
        }
        el.style.transform = `translate(-50%, calc(-50% + ${translateY}px)) scale(${scale}) rotate(${rotate}deg)`;
        el.style.opacity = String(opacity);
        el.style.zIndex = String(i + 1);
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section className="p1-stack" data-nav-theme="dark">
      <div className="p1-stack__head">
        <div className="p1-stack__head-grid">
          <div>
            <Reveal><div className="p1-eyebrow"><span>Visuelle DNA</span></div></Reveal>
            <Reveal as="h2" className="p1-stack__head-title" delay={80}>
              In Bildern.<br/><span className="p1-accent">Beyond ordinary.</span>
            </Reveal>
          </div>
          <Reveal className="p1-stack__head-meta" delay={160}>
            <div className="p1-stack__head-meta-num">{String(STACK_CARDS.length).padStart(2,'0')} — Bilder</div>
            <p>Ein kuratierter Querschnitt durch unsere Arbeit — Webdesign, Branding, Editorial.</p>
          </Reveal>
        </div>
      </div>
      <div className="p1-stack__viewport" ref={wrapRef}>
        <div className="p1-stack__sticky">
          {STACK_CARDS.map((c, i) => (
            <div
              key={i}
              className="p1-stack__card"
              ref={(el) => { cardRefs.current[i] = el; }}
              style={{ opacity: 0 }}
            >
              <div className="p1-stack__card-inner"><MockVisual kind={c.kind} /></div>
              <div className="p1-stack__count">{String(i+1).padStart(2,'0')} / {String(STACK_CARDS.length).padStart(2,'0')}</div>
              <div className="p1-stack__caption"><span>{c.label}</span></div>
            </div>
          ))}
          <div className="p1-stack__progress">
            {STACK_CARDS.map((_, i) => (
              <span key={i} className={`p1-stack__progress-dot ${i <= activeIdx ? 'is-active' : ''}`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── CTA Banner ───────────────────────────────────────────────────────────────

function P1CtaBanner() {
  return (
    <section className="p1-cta-banner" data-nav-theme="light">
      <div className="p1-container">
        <Reveal as="h2" className="p1-cta-banner__title">
          Lassen Sie uns<br/><span className="p1-accent">etwas Gutes bauen.</span>
        </Reveal>
        <Reveal delay={120}>
          <a href="#v1-kontakt" className="p1-btn p1-btn--primary" data-cursor="hover">
            Erstgespräch anfragen <span className="arr">→</span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}

// ─── Contact ──────────────────────────────────────────────────────────────────

const SCOPES = ['Webdesign','Branding','Webshop','Sparring','Sonstiges'];
const BUDGETS = ['< 5k','5–15k','15–40k','40k+'];

function P1Contact() {
  const [form, setForm] = useState({ name:'', email:'', company:'', scope:[] as string[], budget:'', message:'' });
  const [errors, setErrors] = useState<Record<string,string>>({});
  const [sent, setSent] = useState(false);

  const setField = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));
  const toggleChip = (k: string, v: string) => {
    setForm(f => {
      if (k === 'scope') {
        const arr = f.scope;
        return { ...f, scope: arr.includes(v) ? arr.filter(x => x !== v) : [...arr, v] };
      }
      return { ...f, [k]: f[k as keyof typeof f] === v ? '' : v };
    });
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const nx: Record<string,string> = {};
    if (!form.name.trim()) nx.name = 'Bitte geben Sie Ihren Namen an.';
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) nx.email = 'Bitte eine gültige E-Mail.';
    if (!form.message.trim() || form.message.trim().length < 10) nx.message = 'Bitte etwas mehr Kontext (mind. 10 Zeichen).';
    setErrors(nx);
    if (Object.keys(nx).length === 0) setSent(true);
  };

  return (
    <section className="p1-section p1-contact-section" id="v1-kontakt" data-nav-theme="dark">
      <div className="p1-container">
        <div className="p1-contact">
          <div className="p1-contact__info">
            <Reveal><div className="p1-eyebrow"><span>Kontakt</span></div></Reveal>
            <Reveal as="h2" className="p1-contact__big" delay={80}>Sprechen wir<br/><span className="p1-accent">über Ihr Projekt.</span></Reveal>
            <Reveal as="p" className="p1-lead" delay={160}>Erstgespräche dauern 30–60 Minuten und sind kostenlos. Sie hören innerhalb von 48 Stunden zurück — persönlich von Philipp.</Reveal>
            <Reveal delay={240}>
              <div className="p1-contact__links">
                <a href="mailto:philipp@pauli-one.de" className="p1-contact__link-row" data-cursor="hover">
                  <span className="p1-contact__link-label">E-Mail</span>
                  <span className="p1-contact__link-val">philipp@pauli-one.de <span>→</span></span>
                </a>
                <a href="https://www.pauli-one.de" className="p1-contact__link-row" data-cursor="hover">
                  <span className="p1-contact__link-label">Web</span>
                  <span className="p1-contact__link-val">www.pauli-one.de <span>→</span></span>
                </a>
                <a href="https://instagram.com/paulione.wd" className="p1-contact__link-row" data-cursor="hover">
                  <span className="p1-contact__link-label">Instagram</span>
                  <span className="p1-contact__link-val">@paulione.wd <span>→</span></span>
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal delay={120}>
            {sent ? (
              <div className="p1-contact__success">
                <div className="p1-contact__success-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M5 12l5 5L20 7"/></svg>
                </div>
                <h3 style={{margin:'0 0 12px',fontSize:'24px',fontWeight:700,color:'#fff'}}>Vielen Dank, {form.name.split(' ')[0] || 'wir melden uns'}.</h3>
                <p style={{margin:0,color:'rgba(255,255,255,.7)',fontSize:'15px',lineHeight:1.6}}>Ihre Nachricht ist angekommen. Sie hören innerhalb von 48 Stunden persönlich von Philipp.</p>
              </div>
            ) : (
              <form className="p1-contact__form" onSubmit={submit} noValidate>
                <h3 className="p1-contact__form-title">Projekt-Anfrage</h3>
                <div className={`p1-contact__field ${errors.name ? 'p1-contact__field--invalid' : ''}`}>
                  <span>Name</span>
                  <input value={form.name} onChange={e => setField('name', e.target.value)} placeholder="Vor- und Nachname" data-cursor="text"/>
                  {errors.name && <div className="p1-contact__error">{errors.name}</div>}
                </div>
                <div className={`p1-contact__field ${errors.email ? 'p1-contact__field--invalid' : ''}`}>
                  <span>E-Mail</span>
                  <input value={form.email} onChange={e => setField('email', e.target.value)} placeholder="ihre@firma.de" data-cursor="text"/>
                  {errors.email && <div className="p1-contact__error">{errors.email}</div>}
                </div>
                <div className="p1-contact__field">
                  <span>Unternehmen (optional)</span>
                  <input value={form.company} onChange={e => setField('company', e.target.value)} placeholder="Firma oder Marke" data-cursor="text"/>
                </div>
                <div className="p1-contact__field">
                  <span>Projektart</span>
                  <div className="p1-contact__chip-group">
                    {SCOPES.map(s => <button type="button" key={s} className={`p1-contact__chip ${form.scope.includes(s) ? 'is-on' : ''}`} onClick={() => toggleChip('scope', s)} data-cursor="hover">{s}</button>)}
                  </div>
                </div>
                <div className="p1-contact__field">
                  <span>Budget (Richtwert)</span>
                  <div className="p1-contact__chip-group">
                    {BUDGETS.map(b => <button type="button" key={b} className={`p1-contact__chip ${form.budget === b ? 'is-on' : ''}`} onClick={() => toggleChip('budget', b)} data-cursor="hover">{b}</button>)}
                  </div>
                </div>
                <div className={`p1-contact__field ${errors.message ? 'p1-contact__field--invalid' : ''}`}>
                  <span>Nachricht</span>
                  <textarea rows={4} value={form.message} onChange={e => setField('message', e.target.value)} placeholder="Worum geht's? Ein paar Sätze reichen." data-cursor="text"/>
                  {errors.message && <div className="p1-contact__error">{errors.message}</div>}
                </div>
                <button type="submit" className="p1-contact__submit" data-cursor="hover">Anfrage senden <span>→</span></button>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function P1Footer() {
  return (
    <footer className="p1-footer" data-nav-theme="dark">
      <div className="p1-container">
        <div className="p1-footer__grid">
          <div className="p1-footer__brand">
            <img src="/logo-negativ-transparent.png" alt="PauliONE"/>
            <p className="p1-footer__tag">Webdesign, das begeistert.</p>
            <p className="p1-footer__about">Eine Webdesign-Agentur in Frankfurt am Main. Spezialisiert auf editoriales Design, Marken-Systeme und sauber gebaute Websites.</p>
          </div>
          <div>
            <div className="p1-footer__h">Studio</div>
            <ul className="p1-footer__list"><li>Über</li><li>Prozess</li><li>Arbeit</li><li>Kontakt</li></ul>
          </div>
          <div>
            <div className="p1-footer__h">Leistungen</div>
            <ul className="p1-footer__list"><li>Webdesign</li><li>Branding</li><li>Content</li><li>Beratung</li></ul>
          </div>
          <div>
            <div className="p1-footer__h">Kontakt</div>
            <ul className="p1-footer__list"><li>philipp@pauli-one.de</li><li>@paulione.wd</li><li>www.pauli-one.de</li><li>Frankfurt, DE</li></ul>
          </div>
        </div>
        <div className="p1-footer__bottom">
          <span>© 2026 PauliONE — Philipp Pauli</span>
          <span>Impressum · Datenschutz</span>
        </div>
      </div>
      <div className="p1-footer__bigtype">PauliONE</div>
    </footer>
  );
}

// ─── Root Page ────────────────────────────────────────────────────────────────

export default function DesignVariant1() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [heroDark] = useState(false);
  const [heroHeadline] = useState('begeistert');
  const [servicesDark] = useState(false);
  const [cursorEnabled] = useState(true);
  const [showMarquee] = useState(true);

  const handleCta = useCallback(() => {
    const el = document.getElementById('v1-kontakt');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  return (
    <div className="p1v" ref={rootRef} style={{ position: 'relative' }}>
      <P1Cursor enabled={cursorEnabled} rootRef={rootRef} />
      <P1Nav heroDark={heroDark} onCtaClick={handleCta} />
      <P1Hero heroDark={heroDark} heroHeadline={heroHeadline} />
      {showMarquee && <P1Marquee dark={heroDark} />}
      <P1Services dark={servicesDark} />
      <P1Pinned />
      <P1Portfolio />
      <P1HScroll />
      <P1Stack />
      <P1CtaBanner />
      <P1Contact />
      <P1Footer />
    </div>
  );
}
