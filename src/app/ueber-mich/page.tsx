"use client";

import { useEffect, useRef } from "react";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import "./ueber-mich.css";

export default function UeberMich() {
  const containerRef = useRef<HTMLDivElement>(null);
  const didRun = useRef(false);

  useEffect(() => {
    if (didRun.current) return;
    didRun.current = true;

    const t = setTimeout(() => {
      try {
        const script = new Function(`(function(){
  function watch(el,cb,thr){
    if(!el)return;
    var o=new IntersectionObserver(function(e){e.forEach(function(x){if(x.isIntersecting){cb(x.target);o.unobserve(x.target);}});},{threshold:thr||.12});
    o.observe(el);
  }
  function watchAll(sel,cb,thr){
    document.querySelectorAll(sel).forEach(function(el,i){
      watch(el,function(t){cb(t,i);},thr);
    });
  }
  function split(el){
    if(!el)return;
    var ns=[];
    el.childNodes.forEach(function(n){
      if(n.nodeType===3){
        n.textContent.split(/(\\s+)/).forEach(function(p){
          if(/\\S/.test(p)){var w=document.createElement('span');w.className='pone-word-wrap';var i=document.createElement('span');i.className='pone-word';i.textContent=p;w.appendChild(i);ns.push(w);}
          else if(p){ns.push(document.createTextNode(p));}
        });
      } else if(n.nodeName==='SPAN'&&n.classList.contains('pone-em')){
        var w=document.createElement('span');w.className='pone-word-wrap';
        var i=document.createElement('span');i.className='pone-word';i.appendChild(n.cloneNode(true));
        w.appendChild(i);ns.push(w);ns.push(document.createTextNode(' '));
      } else {ns.push(n.cloneNode(true));}
    });
    el.innerHTML='';ns.forEach(function(n){el.appendChild(n);});
  }
  function reveal(el,d){
    el.querySelectorAll('.pone-word').forEach(function(w,i){
      setTimeout(function(){w.classList.add('vis');},(d||0)+i*82);
    });
  }

  /* Split all */
  ['h-intro','h-tl','h-gal','h-val','h-med','h-testi','h-cta'].forEach(function(id){split(document.getElementById(id));});

  /* Badges */
  ['b-hero','b-intro','b-tl','b-gal','b-val','b-med','b-testi'].forEach(function(id){
    watch(document.getElementById(id),function(el){el.classList.add('vis');},0.5);
  });

  /* Hero — cinematic name reveal */
  (function(){
    var nameEl = document.getElementById('hero-name');
    var glow   = document.getElementById('name-glow');
    if(!nameEl) return;

    var lines = [['P','h','i','l','i','p','p'], ['P','a','u','l','i','.']];

    nameEl.innerHTML = '';
    nameEl.appendChild(glow);

    lines.forEach(function(chars, li){
      chars.forEach(function(ch){
        var s = document.createElement('span');
        s.className = 'name-char';
        s.textContent = ch;
        nameEl.appendChild(s);
      });
      if(li < lines.length - 1){
        var br = document.createElement('br');
        nameEl.appendChild(br);
      }
    });

    var chars = nameEl.querySelectorAll('.name-char');
    var BASE_DELAY = 120;
    var STAGGER    = 58;
    var totalChars = chars.length;

    function runAnimation(){
      setTimeout(function(){ glow.classList.add('name-glow-in'); }, BASE_DELAY);

      chars.forEach(function(ch, i){
        setTimeout(function(){ ch.classList.add('name-in'); }, BASE_DELAY + i * STAGGER);
      });

      /* Subtitle fades in after last letter */
      var subtitleStart = BASE_DELAY + (totalChars - 1) * STAGGER + 300;
      setTimeout(function(){
        var playfair = document.querySelector('.hero-h1-playfair');
        if(playfair){ playfair.style.transition='opacity .7s ease, transform .7s cubic-bezier(.16,1,.3,1)'; playfair.style.opacity='1'; playfair.style.transform='translateY(0)'; }
      }, subtitleStart);
    }

    /* Hide playfair until triggered */
    var playfair = document.querySelector('.hero-h1-playfair');
    if(playfair){ playfair.style.opacity='0'; playfair.style.transform='translateY(16px)'; }

    if(document.readyState === 'complete' || document.readyState === 'interactive'){
      runAnimation();
    } else {
      document.addEventListener('DOMContentLoaded', runAnimation);
    }
  })();

  /* Hero — rest of elements */
  watch(document.getElementById('hero-lead'),function(el){setTimeout(function(){el.classList.add('vis');},240);},0.2);
  watch(document.getElementById('hero-actions'),function(el){setTimeout(function(){el.classList.add('vis');},400);},0.2);
  watch(document.getElementById('hero-portrait'),function(el){setTimeout(function(){el.classList.add('vis');},120);},0.1);

  /* Intro */
  watch(document.getElementById('h-intro'),function(el){reveal(el,0);setTimeout(function(){el.closest('section').classList.add('do-shimmer');},500);},0.15);
  watch(document.getElementById('intro-body'),function(el){el.classList.add('vis');},0.15);
  watch(document.getElementById('pullquote'),function(el){setTimeout(function(){el.classList.add('vis');},200);},0.15);

  /* Timeline — scroll-fill SVG line */
  watch(document.getElementById('h-tl'),function(el){reveal(el,0);setTimeout(function(){el.closest('section').classList.add('do-shimmer');},500);},0.2);
  watch(document.getElementById('tl-sub'),function(el){el.classList.add('vis');},0.2);
  watch(document.getElementById('tl-vtl'),function(){
    document.querySelectorAll('[data-tl]').forEach(function(el,i){
      setTimeout(function(){el.classList.add('vis');},i*180);
    });
  },0.05);

  /* SVG scroll-fill line */
  (function(){
    var vtl=document.getElementById('tl-vtl');
    var svg=document.getElementById('tl-vtl-svg');
    if(!vtl||!svg)return;
    var GAP=10;
    function draw(){
      var vr=vtl.getBoundingClientRect();
      var nodes=Array.from(vtl.querySelectorAll('.tl-node'));
      if(!nodes.length)return;
      var firstNR=nodes[0].getBoundingClientRect();
      var x=Math.round(firstNR.left-vr.left+firstNR.width/2);
      var currentPx=Math.min(Math.max(window.innerHeight*0.55-vr.top,0),vr.height);
      svg.setAttribute('width',vr.width);
      svg.setAttribute('height',vr.height);
      while(svg.firstChild)svg.removeChild(svg.firstChild);
      for(var i=0;i<nodes.length-1;i++){
        var nr1=nodes[i].getBoundingClientRect();
        var nr2=nodes[i+1].getBoundingClientRect();
        var y1=Math.round(nr1.bottom-vr.top+GAP);
        var y2=Math.round(nr2.top-vr.top-GAP);
        if(y2<=y1)continue;
        var gray=document.createElementNS('http://www.w3.org/2000/svg','line');
        gray.setAttribute('x1',x);gray.setAttribute('y1',y1);
        gray.setAttribute('x2',x);gray.setAttribute('y2',y2);
        gray.setAttribute('stroke','rgba(255,255,255,0.1)');
        gray.setAttribute('stroke-width','1');
        svg.appendChild(gray);
        if(currentPx>y1){
          var endY=Math.min(y2,currentPx);
          var blue=document.createElementNS('http://www.w3.org/2000/svg','line');
          blue.setAttribute('x1',x);blue.setAttribute('y1',y1);
          blue.setAttribute('x2',x);blue.setAttribute('y2',endY);
          blue.setAttribute('stroke','#3b82f6');
          blue.setAttribute('stroke-width','2');
          blue.setAttribute('stroke-linecap','round');
          svg.appendChild(blue);
        }
      }
      nodes.forEach(function(node,i){
        var nr=node.getBoundingClientRect();
        var nodeMid=nr.top-vr.top+nr.height/2;
        var step=vtl.querySelectorAll('.tl-item')[i];
        if(step){
          if(nodeMid<=currentPx+GAP){step.classList.add('tl-active');}
          else{step.classList.remove('tl-active');}
        }
      });
    }
    window.addEventListener('scroll',draw,{passive:true});
    window.addEventListener('resize',draw,{passive:true});
    setTimeout(draw,1600);
  })();

  /* Gallery */
  watch(document.getElementById('h-gal'),function(el){reveal(el,0);setTimeout(function(){el.closest('section').classList.add('do-shimmer');},400);},0.2);
  watch(document.getElementById('gal-sub'),function(el){el.classList.add('vis');},0.2);
  watchAll('[data-gal]',function(el,i){setTimeout(function(){el.classList.add('vis');},i*90);},0.08);

  /* Values */
  watch(document.getElementById('h-val'),function(el){reveal(el,0);setTimeout(function(){el.closest('section').classList.add('do-shimmer');},400);},0.2);
  watch(document.getElementById('val-sub'),function(el){el.classList.add('vis');},0.2);
  watchAll('[data-val]',function(el,i){setTimeout(function(){el.classList.add('vis');},i*100);},0.1);

  /* Media */
  watch(document.getElementById('h-med'),function(el){reveal(el,0);setTimeout(function(){el.closest('section').classList.add('do-shimmer');},400);},0.2);
  watch(document.getElementById('med-sub'),function(el){el.classList.add('vis');},0.2);
  watch(document.getElementById('med-img'),function(el){el.classList.add('vis');},0.1);
  watch(document.getElementById('med-right'),function(el){setTimeout(function(){el.classList.add('vis');},120);},0.1);
  watch(document.getElementById('med-quote'),function(el){setTimeout(function(){el.classList.add('vis');},200);},0.1);

  /* Testimonials */
  watch(document.getElementById('h-testi'),function(el){reveal(el,0);setTimeout(function(){el.closest('section').classList.add('do-shimmer');},400);},0.2);
  watchAll('[data-testi]',function(el,i){setTimeout(function(){el.classList.add('vis');},i*100);},0.08);

  /* CTA */
  watch(document.getElementById('h-cta'),function(el){reveal(el,0);setTimeout(function(){document.getElementById('cta').classList.add('do-shimmer');},300);},0.2);
  watch(document.getElementById('cta-lead'),function(el){el.classList.add('vis');},0.2);
  watch(document.getElementById('cta-acts'),function(el){setTimeout(function(){el.classList.add('vis');},180);},0.2);
})();`);
        script();
      } catch (e) {
        console.error("Animation init error:", e);
      }
    }, 150);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <Header />
      <div ref={containerRef} className="ueber-mich-page bg-black text-white overflow-x-hidden antialiased" dangerouslySetInnerHTML={{ __html: `<section id="hero">
        <div class="pone-container">
            <div class="hero-grid">

                <div>
                    <div class="hero-mobile-head">
                        <div class="hero-mobile-portrait">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Philipp_Pauli_Portr%C3%A4t.jpg/960px-Philipp_Pauli_Portr%C3%A4t.jpg" alt="Philipp Pauli" loading="eager">
                        </div>
                        <div>
                            <div class="hero-eyebrow" style="margin-bottom:10px;">
                                <div class="pone-badge" style="opacity:1;transform:none;">
                                    <span class="pone-badge-dot"></span>Gründer · PauliONE · Rastatt</div>
                            </div>
                            <div class="hero-h1" style="font-size:clamp(2.4rem,10vw,3.8rem);">
                                <span class="hero-h1-name" id="hero-name-mobile">Philipp<br>Pauli.</span>
                                <span class="hero-h1-playfair" style="font-size:clamp(1rem,3vw,1.4rem);">Webdesigner. Unternehmer.</span>
                            </div>
                        </div>
                    </div>

                    <div class="hero-eyebrow" id="hero-eyebrow-desktop">
                        <div class="pone-badge" id="b-hero"><span class="pone-badge-dot"></span>Gründer · PauliONE ·
                            Rastatt</div>
                    </div>
                    <h1 class="hero-h1" id="h-hero-desktop">
                        <span class="hero-h1-name" id="hero-name">
            <span class="name-glow" id="name-glow"></span>
                        Philipp<br>Pauli.
                        </span>
                        <span class="hero-h1-playfair">Webdesigner. Unternehmer.</span>
                    </h1>
                    <p class="hero-lead blur-up" id="hero-lead">
                        Ich bin Philipp — Gründer von PauliONE und leidenschaftlicher Webdesigner aus Rastatt.
                        Was als Begeisterung für gutes Design begann, ist heute eine Agentur, die Unternehmen in der
                        Region
                        hilft, online wirklich zu überzeugen. Kein Konzern im Hintergrund.
                        Kein anonymes Team. Nur ich — mit echtem Interesse an Ihrem Projekt.
                    </p>
                    <div class="hero-actions blur-up" id="hero-actions" style="transition-delay:.15s;">
                        <a href="/anfrage" class="pone-btn">
                            Jetzt Projekt anfragen
                            <svg viewBox="0 0 24 24">
                                <line x1="5" y1="12" x2="19" y2="12" />
                                <polyline points="12 5 19 12 12 19" />
                            </svg>
                        </a>
                        <a href="/referenzen" class="btn-ghost">Meine Projekte ansehen</a>
                    </div>
                </div>

                <div class="hero-portrait-wrap slide-l" id="hero-portrait">
                    <div class="portrait-pill portrait-pill-1">
                        <div class="pill-num">42<span>+</span></div>
                        <div class="pill-label">Projekte umgesetzt</div>
                    </div>
                    <div class="portrait-pill portrait-pill-2">
                        <div class="pill-num">5<span>/5</span></div>
                        <div class="pill-label">Kundenbewertung</div>
                    </div>
                    <div class="hero-portrait">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Philipp_Pauli_Portr%C3%A4t.jpg/960px-Philipp_Pauli_Portr%C3%A4t.jpg" alt="Philipp Pauli – Gründer PauliONE Webdesign Rastatt" loading="eager">
                        <div class="hero-portrait-cap">
                            <strong>Philipp Pauli</strong>
                            <span>Gründer & Webdesigner · PauliONE</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
        <div class="scroll-hint">
            <svg viewBox="0 0 24 24">
                <polyline points="6 9 12 15 18 9" />
            </svg>
            Mehr erfahren
        </div>
    </section>

    <div class="pone-divider">
        <div class="pone-orb"></div>
    </div>

    <section id="intro" class="section-light">
        <div class="pone-container">
            <div class="intro-inner">

                <div>
                    <div class="pone-badge" id="b-intro" style="margin-bottom:28px;">
                        <span class="pone-badge-dot"></span>Wer steckt dahinter</div>
                    <h2 class="intro-h2 do-shimmer" id="h-intro">
                        Ich glaube daran, dass gutes Design <span class="pone-em">echte Wirkung</span> entfaltet.
                    </h2>
                    <blockquote class="pull-quote blur-up" id="pullquote" style="transition-delay:.2s;">
                        „Eine Website ist kein Selbstzweck — sie soll Vertrauen schaffen, Fragen beantworten und Türen
                        öffnen."
                    </blockquote>
                </div>

                <div class="intro-body blur-up" id="intro-body">
                    <p>
                        Ich bin kein klassischer Agentur-Mensch. Kein Angestellter, der Aufträge abarbeitet.
                        Ich bin jemand, der sich wirklich für die Unternehmen interessiert, mit denen er
                        zusammenarbeitet —
                        für ihre Kunden, ihre Geschichte, ihre Ziele.
                    </p>
                    <p>
                        Meine Arbeit beginnt deshalb nie mit dem Design. Sie beginnt mit Fragen:
                        <strong>Was soll diese Website auslösen?</strong> Wen soll sie ansprechen?
                        <strong>Was braucht Ihr Kunde</strong> in dem Moment, in dem er auf Ihrer Seite landet?
                    </p>
                    <p>
                        Erst wenn ich diese Antworten verstehe, fange ich an zu gestalten.
                        Das ist der Unterschied zwischen einer Website, die existiert —
                        und einer, die wirklich überzeugt.
                    </p>
                    <p>
                        Neben meiner Arbeit als Webdesigner bin ich tief in der Region verwurzelt:
                        in Rastatt und der Region Baden — dem Ort, an dem die meisten meiner Kunden
                        ihren Kunden täglich begegnen. Das ist kein Zufall. Das ist Prinzip.
                    </p>
                </div>

            </div>
        </div>
    </section>

    <div class="pone-divider">
        <div class="pone-orb"></div>
    </div>

    <section id="timeline">
        <div class="pone-container">
            <div class="tl-head">
                <div class="pone-badge" id="b-tl" style="display:inline-flex;margin-bottom:20px;">
                    <span class="pone-badge-dot"></span>Mein Weg</div>
                <h2 class="tl-h2 do-shimmer" id="h-tl" style="margin-top:20px;">
                    Vom ersten Projekt zur <span class="pone-em">echten Agentur.</span>
                </h2>
                <p class="blur-up" id="tl-sub"
                    style="margin-top:18px;font-size:clamp(.9rem,1.8vw,1.02rem);color:rgba(255,255,255,.38);font-weight:300;line-height:1.75;max-width:520px;margin-left:auto;margin-right:auto;text-align:center;">
                    Kein gradliniger Karriereweg — aber eines: echte Erfahrungen aus echten Projekten, von Anfang an.
                </p>
            </div>

            <div class="tl-vtl" id="tl-vtl">
                <svg class="tl-vtl-svg" id="tl-vtl-svg" aria-hidden="true">
                    <defs>
                        <linearGradient id="tl-line-grad" x1="0" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox">
                            <stop offset="0%" stop-color="#004aad" />
                            <stop offset="100%" stop-color="#3b82f6" />
                        </linearGradient>
                    </defs>
                </svg>

                <div class="tl-vtl-steps">

                    <div class="tl-item" data-tl id="tl-0">
                        <div class="tl-node">
                            <span class="tl-node-num">01</span>
                            <svg viewBox="0 0 24 24">
                                <circle cx="12" cy="12" r="10" />
                                <polyline points="12 8 12 12 14 14" />
                            </svg>
                        </div>
                        <div class="tl-card">
                            <div class="tl-card-inner">
                                <div class="tl-card-head">
                                    <span class="tl-card-counter">01</span>
                                    <span class="tl-year">2021 — Die ersten Schritte</span>
                                </div>
                                <h3 class="tl-title">Aus Neugier wird Leidenschaft.</h3>
                                <p class="tl-body">Was begann, war reine Neugier: Wie verwandelt man eine leere Seite in
                                    etwas, das Menschen wirklich berührt? Erste Experimente mit HTML und CSS, erste
                                    Designs. Kein Kurs, kein Lehrplan — nur
                                    <strong>Ausprobieren, Scheitern und Verbessern.</strong> Diese Haltung hat mich bis
                                    heute begleitet.</p>
                            </div>
                        </div>
                    </div>

                    <div class="tl-item" data-tl id="tl-1">
                        <div class="tl-node">
                            <span class="tl-node-num">02</span>
                            <svg viewBox="0 0 24 24">
                                <path d="M12 20h9" />
                                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                            </svg>
                        </div>
                        <div class="tl-card">
                            <div class="tl-card-inner">
                                <div class="tl-card-head">
                                    <span class="tl-card-counter">02</span>
                                    <span class="tl-year">2022 — Erste echte Projekte</span>
                                </div>
                                <h3 class="tl-title">Aus Hobby wird Verantwortung.</h3>
                                <p class="tl-body">Die ersten Aufträge kamen über das persönliche Umfeld — Freunde,
                                    Bekannte, lokale Betriebe. Kleine Projekte, aber mit echten Kunden und echten
                                    Erwartungen. Damals lernte ich mehr über Zuhören, Zuverlässigkeit und
                                    Kundenzufriedenheit als über Code — und genau das hat meine Arbeitsweise bis heute
                                    geprägt.</p>
                            </div>
                        </div>
                    </div>

                    <div class="tl-item" data-tl id="tl-2">
                        <div class="tl-node">
                            <span class="tl-node-num">03</span>
                            <svg viewBox="0 0 24 24">
                                <polygon points="5 3 19 12 5 21 5 3" />
                            </svg>
                        </div>
                        <div class="tl-card">
                            <div class="tl-card-inner">
                                <div class="tl-card-head">
                                    <span class="tl-card-counter">03</span>
                                    <span class="tl-year">April 2024 — Gründung PauliONE</span>
                                </div>
                                <h3 class="tl-title">Eine Vision bekommt einen Namen.</h3>
                                <p class="tl-body">Mit der Gründung von <strong>PauliONE</strong> habe ich meine Vision
                                    in die Realität übersetzt: Unternehmen in der Region einen Webauftritt zu
                                    ermöglichen, der sie wirklich von ihrer besten Seite zeigt — professionell,
                                    persönlich, wirkungsvoll. Webdesign, Branding, lokale SEO — nicht als
                                    Einzelleistungen, sondern als durchdachtes System. Und das alles, während ich noch
                                    die Schulbank drückte. Nicht weil ich musste — sondern weil ich es wollte.</p>
                                <div class="tl-img">
                                    <img src="https://i.ibb.co/nMXYy81Y/Schwarz-transparent.png" alt="PauliONE Logo" loading="lazy" style="background:rgba(255,255,255,.04);border-radius:12px;padding:32px;object-fit:contain;height:160px;width:auto;max-width:100%;">
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="tl-item" data-tl id="tl-3">
                        <div class="tl-node">
                            <span class="tl-node-num">04</span>
                            <svg viewBox="0 0 24 24">
                                <path
                                    d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />
                                <path d="M18 14h-8" />
                                <path d="M15 18h-5" />
                                <path d="M10 6h8v4h-8V6z" />
                            </svg>
                        </div>
                        <div class="tl-card">
                            <div class="tl-card-inner">
                                <div class="tl-card-head">
                                    <span class="tl-card-counter">04</span>
                                    <span class="tl-year">Januar 2025 — Öffentliche Aufmerksamkeit</span>
                                </div>
                                <h3 class="tl-title">Wenn die Arbeit für sich spricht.</h3>
                                <p class="tl-body">Über meine Arbeit berichteten die
                                    <strong>Badischen Neuesten Nachrichten</strong>, das
                                    <strong>Badische Tagblatt</strong>, der <strong>SWR</strong> und
                                    <strong>DASDING</strong> — als einer der jüngsten Unternehmer der Region. Kein
                                    Selbstzweck, aber ein Beleg: Echte Qualität und echter Einsatz sprechen sich herum.
                                </p>
                                <div class="tl-img">
                                    <a href="https://bnn.de/mittelbaden/rastatt/dieser-16-jaehrige-rastatter-gehoert-zu-den-juengsten-unternehmern-deutschlands"
                                        target="_blank" rel="noopener"
                                        title="BNN-Artikel: Philipp Pauli – einer der jüngsten Unternehmer Deutschlands">
                                        <img src="https://bnn.de/img/14413971/DKKuwn2i0KanmGd63E4tvw/IMG_2472?size=970&format=jpeg&variant=LANDSCAPE_16x9" alt="BNN-Artikel: Philipp Pauli als einer der jüngsten Unternehmer Deutschlands" loading="lazy">
                                        <span style="position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);border:0;">BNN-Artikel über Philipp Pauli lesen</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="tl-item" data-tl id="tl-4">
                        <div class="tl-node">
                            <span class="tl-node-num">05</span>
                            <svg viewBox="0 0 24 24">
                                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                            </svg>
                        </div>
                        <div class="tl-card">
                            <div class="tl-card-inner">
                                <div class="tl-card-head">
                                    <span class="tl-card-counter">05</span>
                                    <span class="tl-year">Heute — 42+ Projekte später</span>
                                </div>
                                <h3 class="tl-title">Persönlich. Lokal. Ergebnisorientiert.</h3>
                                <p class="tl-body">Heute arbeite ich mit Restaurants, Hotels, Kanzleien,
                                    Handwerksbetrieben, Beauty-Studios und vielen weiteren Unternehmen aus Rastatt,
                                    Baden-Baden und der Region. Mein Anspruch ist unverändert:
                                    <strong>Enge Zusammenarbeit</strong>, maßgeschneiderte Lösungen,
                                    <strong>langfristige Ergebnisse.</strong> Kein Ticketsystem — ein echter
                                    Ansprechpartner, der antwortet und mitdenkt.</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </section>

    <section id="values">
        <div class="pone-container">
            <div class="val-head">
                <div class="pone-badge" id="b-val" style="display:inline-flex;margin-bottom:20px;">
                    <span class="pone-badge-dot"></span>Meine Arbeitsweise</div>
                <h2 class="val-h2 do-shimmer" id="h-val" style="margin-top:20px;">
                    Was mich von anderen <span class="pone-em">unterscheidet.</span>
                </h2>
                <p class="blur-up" id="val-sub"
                    style="margin-top:16px;font-size:clamp(.9rem,1.8vw,1.02rem);color:rgba(255,255,255,.38);font-weight:300;line-height:1.75;max-width:520px;margin-left:auto;margin-right:auto;text-align:center;">
                    Vier Prinzipien, die ich in jedem Projekt lebe — nicht als Versprechen, sondern als Haltung.
                </p>
            </div>
            <div class="val-grid">
                <div class="val-cell" data-val>
                    <div class="val-num-label"><span class="val-num-line"></span>01</div>
                    <div class="val-icon"><svg viewBox="0 0 24 24">
                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                            <circle cx="9" cy="7" r="4" />
                            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                        </svg></div>
                    <h3 class="val-title">Ich höre zuerst zu.</h3>
                    <p class="val-body">Bevor eine Zeile Code geschrieben wird, verstehe ich Ihr Business, Ihre Kunden
                        und Ihre Ziele. Maßgeschneidert bedeutet bei mir: wirklich maßgeschneidert — kein Template, kein
                        Baukasten.</p>
                </div>
                <div class="val-cell" data-val style="transition-delay:.1s;">
                    <div class="val-num-label"><span class="val-num-line"></span>02</div>
                    <div class="val-icon"><svg viewBox="0 0 24 24">
                            <polygon
                                points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg></div>
                    <h3 class="val-title">Keine halben Sachen.</h3>
                    <p class="val-body">Design, Technik, Texte, lokale SEO — ich denke alles zusammen. Ein Auftritt, der
                        an einer Stelle glänzt und woanders schwächelt, überzeugt niemanden. Deshalb: ganzheitlich oder
                        gar nicht.</p>
                </div>
                <div class="val-cell" data-val style="transition-delay:.2s;">
                    <div class="val-num-label"><span class="val-num-line"></span>03</div>
                    <div class="val-icon"><svg viewBox="0 0 24 24">
                            <path
                                d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.2h3a2 2 0 0 1 2 1.72c.128.96.341 1.903.63 2.81a2 2 0 0 1-.45 2.11L7.91 9a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.29 1.85.501 2.81.63A2 2 0 0 1 22 16.92z" />
                        </svg></div>
                    <h3 class="val-title">Erreichbar. Wirklich.</h3>
                    <p class="val-body">Kein Ticketsystem, kein anonymes Postfach. Ich antworte innerhalb von 24 Stunden
                        — und meistens deutlich schneller. Sie haben einen echten Ansprechpartner, der mitdenkt und da
                        ist, wenn es drauf ankommt.</p>
                </div>
                <div class="val-cell" data-val style="transition-delay:.3s;">
                    <div class="val-num-label"><span class="val-num-line"></span>04</div>
                    <div class="val-icon"><svg viewBox="0 0 24 24">
                            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                        </svg></div>
                    <h3 class="val-title">Ergebnisse zählen.</h3>
                    <p class="val-body">Am Ende ist der einzige Maßstab: Bringt Ihre Website mehr Anfragen? Werden Sie
                        bei Google gefunden? Schauen Besucher länger? Eine schöne Website ist schön — aber das ist der
                        eigentliche Punkt.</p>
                </div>
            </div>
        </div>
    </section>

    <div class="pone-divider">
        <div class="pone-orb"></div>
    </div>

    <section id="media">
        <div class="pone-container">
            <div class="med-head">
                <div class="pone-badge" id="b-med" style="display:inline-flex;margin-bottom:20px;">
                    <span class="pone-badge-dot"></span>In den Medien</div>
                <h2 class="med-h2 do-shimmer" id="h-med" style="margin-top:20px;">
                    Wenn Arbeit <span class="pone-em">Aufmerksamkeit</span> findet.
                </h2>
                <p class="blur-up" id="med-sub"
                    style="margin-top:16px;font-size:clamp(.9rem,1.8vw,1.02rem);color:rgba(255,255,255,.38);font-weight:300;line-height:1.75;max-width:520px;margin-left:auto;margin-right:auto;text-align:center;">
                    Über meine Arbeit als junger Unternehmer aus der Region wurde in mehreren namhaften Medien
                    berichtet.
                </p>
            </div>
            <div class="med-layout">
                <div class="slide-r" id="med-img">
                    <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:16px;">
                        <a href="https://bnn.de/mittelbaden/rastatt/dieser-16-jaehrige-rastatter-gehoert-zu-den-juengsten-unternehmern-deutschlands"
                            target="_blank" rel="noopener" class="med-bnn-img" style="margin-bottom:0;"
                            title="BNN-Beitrag: Philipp Pauli Unternehmer"
                            aria-label="BNN-Foto: Philipp Pauli beim Interview">
                            <img src="https://bnn.de/img/14413971/DKKuwn2i0KanmGd63E4tvw/IMG_2472?size=970&format=jpeg&variant=LANDSCAPE_16x9" alt="Philipp Pauli beim BNN-Interview – Januar 2025" loading="lazy" style="height:180px;object-fit:cover;width:100%;">
                        </a>
                        <a href="https://bnn.de/mittelbaden/rastatt/dieser-16-jaehrige-rastatter-gehoert-zu-den-juengsten-unternehmern-deutschlands"
                            target="_blank" rel="noopener" class="med-bnn-img" style="margin-bottom:0;"
                            title="BNN-Beitrag: PauliONE Rastatt" aria-label="BNN-Foto: Philipp Pauli bei der Arbeit">
                            <img src="https://bnn.de/img/14413970/xzuvFlZ51csDKwbtXVh88g/IMG_2458?size=1920&format=jpeg&variant=LANDSCAPE_16x9" alt="Philipp Pauli bei der Arbeit – BNN Reportage 2025" loading="lazy" style="height:180px;object-fit:cover;width:100%;">
                        </a>
                    </div>
                    <a href="https://bnn.de/mittelbaden/rastatt/dieser-16-jaehrige-rastatter-gehoert-zu-den-juengsten-unternehmern-deutschlands"
                        target="_blank" rel="noopener" class="med-bnn-link">
                        BNN-Artikel lesen: Philipp Pauli – jüngster Unternehmer
                        <svg viewBox="0 0 24 24">
                            <line x1="5" y1="12" x2="19" y2="12" />
                            <polyline points="12 5 19 12 12 19" />
                        </svg>
                    </a>
                </div>
                <div class="slide-l" id="med-right">
                    <div class="med-outlets">
                        <a href="https://bnn.de/mittelbaden/rastatt/dieser-16-jaehrige-rastatter-gehoert-zu-den-juengsten-unternehmern-deutschlands"
                            target="_blank" rel="noopener" class="med-outlet">
                            <div class="out-icon"><svg viewBox="0 0 24 24">
                                    <path
                                        d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />
                                    <path d="M18 14h-8" />
                                    <path d="M15 18h-5" />
                                    <path d="M10 6h8v4h-8V6z" />
                                </svg></div>
                            <div>
                                <div class="out-name">Badische Neueste Nachrichten</div>
                                <div class="out-desc">Einer der jüngsten Unternehmer Deutschlands</div>
                            </div>
                            <div class="out-arrow"><svg viewBox="0 0 24 24">
                                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                    <polyline points="15 3 21 3 21 9" />
                                    <line x1="10" y1="14" x2="21" y2="3" />
                                </svg></div>
                        </a>
                        <div class="med-outlet">
                            <div class="out-icon"><svg viewBox="0 0 24 24">
                                    <path
                                        d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />
                                    <path d="M18 14h-8" />
                                    <path d="M15 18h-5" />
                                    <path d="M10 6h8v4h-8V6z" />
                                </svg></div>
                            <div>
                                <div class="out-name">Badisches Tagblatt</div>
                                <div class="out-desc">Regionale Berichterstattung über PauliONE</div>
                            </div>
                        </div>
                        <div class="med-outlet">
                            <div class="out-icon"><svg viewBox="0 0 24 24">
                                    <circle cx="12" cy="12" r="10" />
                                    <polygon points="10 8 16 12 10 16 10 8" />
                                </svg></div>
                            <div>
                                <div class="out-name">SWR — Südwestrundfunk</div>
                                <div class="out-desc">Radiobeitrag über junge Unternehmer</div>
                            </div>
                        </div>
                        <div class="med-outlet">
                            <div class="out-icon"><svg viewBox="0 0 24 24">
                                    <circle cx="12" cy="12" r="10" />
                                    <polygon points="10 8 16 12 10 16 10 8" />
                                </svg></div>
                            <div>
                                <div class="out-name">DASDING — SWR Jugendradio</div>
                                <div class="out-desc">Porträt als junger Unternehmer aus der Region</div>
                            </div>
                        </div>
                    </div>
                    <div class="med-quote blur-up" id="med-quote" style="transition-delay:.2s;">
                        <p>„Solche Erwähnungen zeigen mir, dass meine Projekte nicht nur bei Kunden, sondern auch in der
                            Öffentlichkeit Aufmerksamkeit finden — und dass Qualität sich herumsprechen kann."</p>
                        <cite>— Philipp Pauli, Gründer PauliONE</cite>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <div class="pone-divider">
        <div class="pone-orb"></div>
    </div>

    <section id="testimonials" class="section-light">
        <div class="pone-container">
            <div class="testi-head">
                <div class="pone-badge" id="b-testi" style="display:inline-flex;margin-bottom:20px;">
                    <span class="pone-badge-dot"></span>Was Kunden sagen</div>
                <h2 class="testi-h2 do-shimmer" id="h-testi" style="margin-top:20px;">
                    Worte, die mehr wiegen als <span class="pone-em">jedes Versprechen.</span>
                </h2>
            </div>
            <div class="testi-grid">
                <div class="testi-card" data-testi>
                    <div class="testi-stars"><svg viewBox="0 0 24 24">
                            <polygon
                                points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg><svg viewBox="0 0 24 24">
                            <polygon
                                points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg><svg viewBox="0 0 24 24">
                            <polygon
                                points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg><svg viewBox="0 0 24 24">
                            <polygon
                                points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg><svg viewBox="0 0 24 24">
                            <polygon
                                points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg></div>
                    <p class="testi-text">„Alles was ich mir mit meinem Online Shop vorgestellt habe, wurde umgesetzt!
                        Immer hilfsbereit, zuverlässig, kompetent, freundlich. Kann ich nur weiter empfehlen!"</p>
                    <div class="testi-author">
                        <div class="testi-av">K</div>
                        <div>
                            <div class="testi-name">K. Mekkel</div>
                            <div class="testi-company">MK Nailshop</div>
                        </div>
                    </div>
                </div>
                <div class="testi-card" data-testi style="transition-delay:.1s;">
                    <div class="testi-stars"><svg viewBox="0 0 24 24">
                            <polygon
                                points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg><svg viewBox="0 0 24 24">
                            <polygon
                                points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg><svg viewBox="0 0 24 24">
                            <polygon
                                points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg><svg viewBox="0 0 24 24">
                            <polygon
                                points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg><svg viewBox="0 0 24 24">
                            <polygon
                                points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg></div>
                    <p class="testi-text">„Ich kann PauliONE uneingeschränkt weiter empfehlen. Mit einer Engelsgeduld
                        alles umgesetzt was ich wollte — Preis, Leistung, Service alles TOP."</p>
                    <div class="testi-author">
                        <div class="testi-av">K</div>
                        <div>
                            <div class="testi-name">Kirsten Asal</div>
                            <div class="testi-company">Einklang by Kirsten</div>
                        </div>
                    </div>
                </div>
                <div class="testi-card" data-testi style="transition-delay:.2s;">
                    <div class="testi-stars"><svg viewBox="0 0 24 24">
                            <polygon
                                points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg><svg viewBox="0 0 24 24">
                            <polygon
                                points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg><svg viewBox="0 0 24 24">
                            <polygon
                                points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg><svg viewBox="0 0 24 24">
                            <polygon
                                points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg><svg viewBox="0 0 24 24">
                            <polygon
                                points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg></div>
                    <p class="testi-text">„Sehr kompetente Beratung mit sehr viel Engagement beim Gestalten und Umsetzen
                        der Homepage — absolut empfehlenswert in jeder Hinsicht."</p>
                    <div class="testi-author">
                        <div class="testi-av">M</div>
                        <div>
                            <div class="testi-name">Marco Mueller</div>
                            <div class="testi-company">Kunde</div>
                        </div>
                    </div>
                </div>
                <div class="testi-card" data-testi style="transition-delay:.3s;">
                    <div class="testi-stars"><svg viewBox="0 0 24 24">
                            <polygon
                                points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg><svg viewBox="0 0 24 24">
                            <polygon
                                points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg><svg viewBox="0 0 24 24">
                            <polygon
                                points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg><svg viewBox="0 0 24 24">
                            <polygon
                                points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg><svg viewBox="0 0 24 24">
                            <polygon
                                points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg></div>
                    <p class="testi-text">„Toller und sehr engagierter Service. Philipp hat für uns
                        Online-Marketingkampagnen erstellt — mit großem Erfolg und überschaubaren Werbekosten."</p>
                    <div class="testi-author">
                        <div class="testi-av">S</div>
                        <div>
                            <div class="testi-name">St. Leuschner</div>
                            <div class="testi-company">Immohaus Baden</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <div class="pone-divider">
        <div class="pone-orb"></div>
    </div>

    <section id="cta">
        <div class="pone-container">
            <div class="cta-box">
                <h2 class="cta-h2 do-shimmer" id="h-cta">
                    Lassen Sie uns gemeinsam<br>etwas <span class="pone-em">Außergewöhnliches</span> schaffen.
                </h2>
                <p class="cta-lead blur-up" id="cta-lead">
                    Sie haben ein Projekt — ich habe die Erfahrung, die Tools und das echte Interesse,
                    es richtig gut zu machen. Schreiben Sie mir. Ich antworte innerhalb von 24 Stunden.
                </p>
                <div class="cta-actions blur-up" id="cta-acts" style="transition-delay:.12s;">
                    <a href="/anfrage" class="pone-btn" style="font-size:15px;padding:16px 40px;">
                        Kostenloses Erstgespräch anfragen
                        <svg viewBox="0 0 24 24">
                            <line x1="5" y1="12" x2="19" y2="12" />
                            <polyline points="12 5 19 12 12 19" />
                        </svg>
                    </a>
                    <a href="/referenzen" class="btn-ghost">Alle Referenzprojekte ansehen</a>
                </div>
                <span class="cta-sub">Kostenlos · Unverbindlich · Antwort in 24h</span>
            </div>
        </div>
    </section>` }} />
      <Footer />
    </>
  );
}
