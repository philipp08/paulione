// ─── Word Reveal ─────────────────────────────────────────────────────────────

function WordReveal({ text, className = '', as: As = 'span', delay = 0, accentWords = [] }: { text: string; className?: string; as?: any; delay?: number; accentWords?: string[] }) {
  const ref = useReveal(0.2);
  const words = text.split(' ');
  return (
    <As ref={ref} className={`p1-words ${className}`}>
      {words.map((w, i) => {
        const isAccent = accentWords.includes(w.replace(/[.,!?]/g, ''));
        return (
          <span className="word" key={i}>
            <span 
              className={`word-inner ${isAccent ? 'p1-accent' : ''}`}
              style={{ transitionDelay: `${delay + i * 40}ms` }}
            >
              {w}{i < words.length - 1 ? '\u00A0' : ''}
            </span>
          </span>
        );
      })}
    </As>
  );
}

// ─── Referenzen Block ────────────────────────────────────────────────────────

const REF_PROJECTS = [
  { id: 1, cat: 'Onlineshop', size: 'large', client: 'MK-Nailshop', title: 'Beauty E-Commerce Experience', img: 'https://onecdn.io/media/a457180b-662e-408f-8a2b-e44893cbd5b6/lg' },
  { id: 2, cat: 'Website', size: 'medium', client: 'Fotografie Eschbach', title: 'Portfolio für High-End Fotografie', img: 'https://onecdn.io/media/53053911-902b-4f5c-8d2e-2b59b4723f04/lg' },
  { id: 3, cat: 'Website & Logo', size: 'medium', client: 'ShiGlauer', title: 'Branding & Web für Gastro-Consulting', img: 'https://onecdn.io/media/e12013e6-f059-47b7-84cb-a362c2f040f6/lg' },
  { id: 4, cat: 'Marketing', size: 'small', client: 'Meyer & Kersting', title: 'Social Media & Performance Ads', img: 'https://onecdn.io/media/5a3092ab-c0c1-4640-99d9-8daee4ed0fb5/lg' },
  { id: 5, cat: 'Werbemittel', size: 'small', client: 'Aldaerry', title: 'Premium Produktetiketten Design', img: 'https://onecdn.io/media/1a0cc727-af22-4b4e-9f35-24b6267c89b8/lg' },
];

function P1Referenzen() {
  const [filter, setFilter] = useState('Alle');
  const filtered = filter === 'Alle' ? REF_PROJECTS : REF_PROJECTS.filter(p => p.cat.includes(filter));

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    const dx = x - xc;
    const dy = y - yc;
    
    card.style.transform = `perspective(1000px) rotateY(${dx / 20}deg) rotateX(${-dy / 20}deg) translateY(-5px) scale(1.02)`;
    const shine = card.querySelector('.pw-card__shine') as HTMLElement;
    if (shine) {
      shine.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.12) 0%, transparent 80%)`;
    }
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.transform = '';
  };

  return (
    <section className="pw-refs" id="v1-referenzen" data-nav-theme="dark">
      <div className="pw-container">
        <Reveal className="pw-section-label"><span>Portfolio</span></Reveal>
        <h2 className="pw-section-title">
          <WordReveal text="Ergebnisse, die für sich sprechen." accentWords={['sprechen.']} />
        </h2>
        <Reveal className="pw-section-subtitle">
          Eine Auswahl an Projekten, die wir in den letzten Monaten für unsere Kunden umgesetzt haben.
        </Reveal>

        <div className="pw-filters">
          {['Alle','Website','Branding','Marketing'].map((f, i) => (
            <Reveal key={f} delay={i * 40}>
              <button 
                className={`pw-filter-btn ${filter === f ? 'active' : ''}`} 
                onClick={() => setFilter(f)}
                data-cursor="hover"
              >
                {f}
              </button>
            </Reveal>
          ))}
        </div>

        <div className="pw-grid">
          {filtered.map((p, i) => (
            <a 
              key={p.id} 
              href="#" 
              className={`pw-card pw-card--${p.size} p1-reveal`}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{ transitionDelay: `${i * 60}ms` }}
              data-cursor="hover"
            >
              <div className="pw-card__img-wrap">
                <img src={p.img} alt={p.client} className="pw-card__img" loading="lazy" />
              </div>
              <div className="pw-card__shine" />
              <div className="pw-card__badge">{p.cat}</div>
              <div className="pw-card__ext">
                <svg viewBox="0 0 24 24"><path d="M7 17L17 7M17 7H7M17 7V17"/></svg>
              </div>
              <div className="pw-card__body">
                <div className="pw-card__client">{p.client}</div>
                <h3 className="pw-card__title">{p.title}</h3>
              </div>
            </a>
          ))}
          
          <a href="/anfrage" className="pw-card pw-card--small p1-reveal" style={{ transitionDelay: `${filtered.length * 60}ms` }} data-cursor="hover">
            <div className="pw-card__img-wrap" style={{ display:'flex', alignItems:'center', justifyContent:'center', background:'#080808' }}>
              <div style={{ textAlign:'center' }}>
                <div style={{ width:48, height:48, borderRadius:'50%', border:'1px dashed rgba(255,255,255,0.2)', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 12px' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14"/></svg>
                </div>
                <div style={{ fontSize:13, fontWeight:600, color:'rgba(255,255,255,0.4)' }}>Ihr Projekt</div>
              </div>
            </div>
            <div className="pw-card__body">
              <div className="pw-card__client">Zukunft</div>
              <h3 className="pw-card__title">Wann starten wir gemeinsam durch?</h3>
            </div>
          </a>
        </div>

        <div className="pw-stats">
          {[
            { n: '100%', l: 'Zufriedenheit' },
            { n: '48h', l: 'Antwortzeit' },
            { n: '4.9/5', l: 'Bewertung' }
          ].map((s, i) => (
            <div key={i} className="pw-stat p1-reveal" style={{ transitionDelay: `${i * 100}ms` }}>
              <div className="pw-stat__number p1-accent">{s.n}</div>
              <div className="pw-stat__label">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
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

  const headlines: Record<string, { line1: string; line2a: string; line2b: string; accent: string[] }> = {
    begeistert: { line1: 'Webdesign,', line2a: 'das', line2b: 'begeistert.', accent: ['begeistert.'] },
    verkaufen:  { line1: 'Webseiten,', line2a: 'die', line2b: 'verkaufen.', accent: ['verkaufen.'] },
    charakter:  { line1: 'Marken mit', line2a: '', line2b: 'Charakter.', accent: ['Charakter.'] },
  };
  const h = headlines[heroHeadline] || headlines.begeistert;

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
          <span style={{ display: 'block' }}>
            <WordReveal text={h.line1} delay={60} accentWords={[]} />
          </span>
          <span style={{ display: 'block' }}>
            <WordReveal text={`${h.line2a} ${h.line2b}`} delay={160} accentWords={h.accent} />
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
            <h2 className="p1-h2">
              <WordReveal text="Vier Disziplinen. Ein Anspruch." accentWords={['Anspruch.']} delay={80} />
            </h2>
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
          <h2 className="p1-pinned__title">
            <WordReveal text="Eine Person. Eine Vision." accentWords={['Vision.']} delay={80} />
          </h2>
          <Reveal as="p" className="p1-pinned__body" delay={160}>
            PauliONE ist kein Großbüro. Sondern Philipp — und ein kleines Netzwerk aus spezialisierten Partner:innen, das pro Projekt zusammengestellt wird.
          </Reveal>
          <Reveal as="p" className="p1-pinned__body" delay={240}>
            Das bedeutet: kein Account-Manager zwischen Ihnen und der Person, die das Projekt baut. Direkter Draht, kürzere Wege, bessere Ergebnisse.
          </Reveal>
          <Reveal className="p1-pinned__sig" delay={320}>— „Webdesign, das begeistert."</Reveal>
          <div className="p1-pinned__stats">
            {stats.map((s, i) => (
              <Reveal key={i} delay={i * 80 + 320}>
                <div>
                  <div className="p1-pinned__stat-num p1-accent">{s.num}</div>
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
            <h2 className="p1-h2">
              <WordReveal text="Drei Projekte. Drei Ansätze." accentWords={['Ansätze.']} delay={80} />
            </h2>
          </div>
          <Reveal delay={160} className="p1-sec-head__meta">2024 — 2026</Reveal>
        </div>
      </div>
      {CASES.map((c) => (
        <article key={c.n} className={`p1-case ${c.reverse ? 'p1-case--reverse' : ''}`}>
          <div className="p1-case__text">
            <Reveal><div className="p1-case__num">CASE — {c.n}</div></Reveal>
            <Reveal delay={60}><div className="p1-case__client">{c.client}</div></Reveal>
            <h3 className="p1-case__title">
              <WordReveal text={`${c.title} ${c.accentEnd}`} accentWords={[c.accentEnd.replace('.','').trim()]} delay={120} />
            </h3>
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
            <h2 className="p1-h2">
              <WordReveal text="Sechs Schritte. Klare Kanten." accentWords={['Kanten.']} delay={80} />
            </h2>
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
            <h2 className="p1-stack__head-title">
              <WordReveal text="In Bildern. Beyond ordinary." accentWords={['ordinary.']} delay={80} />
            </h2>
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
        <h2 className="p1-cta-banner__title">
          <WordReveal text="Lassen Sie uns etwas Gutes bauen." accentWords={['bauen.']} />
        </h2>
        <Reveal delay={200}>
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
            <h2 className="p1-contact__big">
              <WordReveal text="Sprechen wir über Ihr Projekt." accentWords={['Projekt.']} delay={80} />
            </h2>
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

  return (
    <div className="p1v" ref={rootRef} style={{ position: 'relative' }}>
      <P1Cursor enabled={true} rootRef={rootRef} />
      <Header />
      <P1Hero heroDark={false} heroHeadline="begeistert" />
      <P1Marquee dark={false} />
      <P1Services dark={false} />
      <P1Pinned />
      <P1Portfolio />
      <P1Referenzen />
      <P1HScroll />
      <P1Stack />
      <P1CtaBanner />
      <P1Contact />
      <P1Footer />
    </div>
  );
}

