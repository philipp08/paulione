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
        const script = new Function(`(function () {
            var p1rhRoot = document.getElementById('p1-ref-hero');
            var p1rhGlow = document.getElementById('p1rh-glow');
            if (!p1rhRoot || !p1rhGlow) return;

            setTimeout(function () { p1rhRoot.classList.add('p1rh-animate'); }, 100);

            var p1rhHovering = false;

            if (window.matchMedia('(pointer: fine)').matches) {
                p1rhRoot.addEventListener('mousemove', function (e) {
                    if (!p1rhHovering) { p1rhGlow.style.opacity = '1'; p1rhHovering = true; }
                    requestAnimationFrame(function () {
                        p1rhGlow.style.left = e.clientX + 'px';
                        p1rhGlow.style.top  = e.clientY + 'px';
                    });
                });
                p1rhRoot.addEventListener('mouseleave', function () {
                    p1rhGlow.style.opacity = '0';
                    p1rhHovering = false;
                });
            } else {
                p1rhGlow.style.left = '50%';
                p1rhGlow.style.top  = '50%';
                p1rhGlow.style.opacity = '0.4';
            }
        })();`);
        script();
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
            ` 
          }} 
        />
      </main>
      <Footer />
    </>
  );
}
