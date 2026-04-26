"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, Menu as MenuIcon, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface MenuItem {
  title: string;
  description?: string;
  href: string;
}

interface FeaturedContent {
  label: string;
  title: string;
  cta: string;
  ctaHref: string;
}

interface Menu {
  label: string;
  href: string;
  items?: MenuItem[];
  featured?: FeaturedContent;
}

const DropdownArrow = ({ isOpen }: { isOpen: boolean }) => (
  <i className={`ml-1.5 flex transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}>
    <svg className="w-3.5 h-3.5" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 17">
      <path d="m5.332 7.167 2.667 2.666 2.666-2.666" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
    </svg>
  </i>
);

export function Header() {
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [mobileOpen]);

  const handleMouseEnter = (label: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveMenu(label);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setActiveMenu(null), 150);
  };

  const toggleMobileExpanded = (label: string) => {
    setMobileExpanded((prev) => (prev === label ? null : label));
  };

  const menus: Menu[] = [
    { label: "Startseite", href: "/" },
    { label: "Über mich", href: "/ueber-mich" },
    { label: "Projekte", href: "/referenzen" },
    {
      label: "Dienstleistungen",
      href: "#",
      items: [
        { title: "Webauftritt", description: "Website, Onlineshop oder Re-design", href: "/webauftritt" },
        { title: "Marketing & Strategie", description: "Advertising, Social Media Marketing", href: "/marketing-und-strategie" },
        { title: "Design & Markenauftritt", description: "Logo, Werbemittel, Corporate Design", href: "/design-und-markenauftritt" },
        { title: "Abomodell", description: "All-In-One Projekte im Abomodell", href: "/abomodell" },
        { title: "Website-Service", description: "Instandhaltung Ihrer Website o. Onlineshop", href: "/service" },
      ],
      featured: {
        label: "LASSEN SIE UNS STARTEN",
        title: "Bereit für den nächsten Schritt in der digitalen Welt?",
        cta: "Kostenloses Erstgespräch",
        ctaHref: "/anfrage",
      },
    },
    { label: "Kontakt", href: "/kontakt" },
  ];

  if (!mounted) return null;

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-500 transform-gpu ${
          scrolled || mobileOpen
            ? "py-3 px-4 lg:px-10"
            : "py-6 px-4 lg:px-10"
        }`}
      >
        {/* DESKTOP NAVBAR */}
        <nav
          className={`hidden xl:flex container mx-auto max-w-[1300px] items-center justify-between transition-all duration-500 transform-gpu border ${
            scrolled
              ? "bg-[#0A0A0A]/80 backdrop-blur-[8px] border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
              : "bg-transparent border-transparent"
          } rounded-full px-6 py-3`}
        >
          <Link href="/" className="flex items-center gap-3 transition-transform hover:scale-[1.02] active:scale-[0.98]">
            <img
              src="https://i.ibb.co/nMXYy81Y/Schwarz-transparent.png"
              alt="PauliONE"
              className="h-6 w-auto object-contain invert brightness-0"
            />
          </Link>

          {/* Desktop Nav Items */}
          <div className="flex items-center ml-8">
            <ul className="flex items-center gap-0.5">
              {menus.map((menu) => (
                <li
                  key={menu.label}
                  className="relative flex items-center"
                  onMouseEnter={() => handleMouseEnter(menu.label)}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link
                    href={menu.href}
                    className={`flex items-center px-4 py-2 rounded-lg text-[14px] font-medium transition-all duration-200 ${
                      activeMenu === menu.label
                        ? "text-white bg-white/[0.06]"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    {menu.label}
                    {menu.items && <DropdownArrow isOpen={activeMenu === menu.label} />}
                  </Link>

                  {/* Mega Menu Dropdown */}
                  <AnimatePresence>
                    {menu.items && activeMenu === menu.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.98 }}
                        transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
                        className="absolute top-full left-1/2 -translate-x-1/2 pt-4 flex flex-col items-center pointer-events-auto"
                      >
                        {/* Dropdown Card */}
                        <div className="w-[620px] flex rounded-[24px] overflow-hidden bg-[#0D0D0D]/90 backdrop-blur-3xl border border-white/[0.1] shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
                          {/* Links Side */}
                          <div className="flex-1 p-5 grid grid-cols-1 gap-0.5">
                            {menu.items.map((item, idx) => (
                              <Link
                                key={idx}
                                href={item.href}
                                className="group p-3 rounded-xl transition-all duration-200 hover:bg-white/[0.04]"
                              >
                                <div className="text-[14.5px] font-semibold text-white group-hover:translate-x-0.5 transition-transform duration-200">
                                  {item.title}
                                </div>
                                {item.description && (
                                  <div className="text-[12.5px] text-gray-400 mt-0.5 leading-relaxed">
                                    {item.description}
                                  </div>
                                )}
                              </Link>
                            ))}
                          </div>

                          {/* Featured Side */}
                          {menu.featured && (
                            <div className="w-[240px] p-6 bg-white/[0.02] border-l border-white/[0.05] flex flex-col justify-between">
                              <div>
                                <span className="text-[10px] font-bold tracking-[0.1em] text-gray-500 uppercase">
                                  {menu.featured.label}
                                </span>
                                <h4 className="text-[15px] font-bold text-white mt-2 leading-tight">
                                  {menu.featured.title}
                                </h4>
                              </div>
                              <Link
                                href={menu.featured.ctaHref}
                                className="group inline-flex items-center gap-2 text-[13px] font-bold text-white mt-4"
                              >
                                {menu.featured.cta}
                                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                              </Link>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center gap-8 ml-auto">
            <Link
              href="/anfrage"
              className="text-[14px] font-bold px-6 py-2.5 rounded-full bg-white text-black hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-black/5"
            >
              Angebot einholen
            </Link>
          </div>
        </nav>

        {/* MOBILE NAVBAR (Joy_ Style – Pill morphs to expanded panel) */}
        <motion.nav
          initial={false}
          animate={{
            backgroundColor: (scrolled || mobileOpen)
              ? "rgba(10,10,10,0.95)"
              : "transparent",
            borderColor: (scrolled || mobileOpen)
              ? "rgba(255,255,255,0.08)"
              : "transparent",
            borderRadius: mobileOpen ? "32px" : "100px",
            boxShadow: (scrolled || mobileOpen)
              ? "0 12px 40px rgba(0,0,0,0.4)"
              : "0 0 0 rgba(0,0,0,0)",
          }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 28,
            mass: 0.9,
          }}
          className={`xl:hidden flex flex-col mx-auto w-full max-w-full overflow-hidden border ${
            (scrolled || mobileOpen) ? "backdrop-blur-[12px]" : ""
          }`}
        >
          {/* Top Bar (Always Visible) */}
          <div className="flex items-center justify-between px-4 py-3 relative z-10 w-full">
            <Link href="/" className="flex items-center gap-3 pl-2 transition-transform hover:scale-[1.02] active:scale-[0.98]" onClick={() => setMobileOpen(false)}>
              <img
                src="https://i.ibb.co/nMXYy81Y/Schwarz-transparent.png"
                alt="PauliONE"
                className="h-5 w-auto object-contain invert brightness-0"
              />
            </Link>

            <div className="flex items-center gap-2">
              {/* CTA pill – fades out in place when menu opens, no layout shift */}
              <motion.button
                animate={{
                  opacity: mobileOpen ? 0 : 1,
                  scale: mobileOpen ? 0.8 : 1,
                  width: mobileOpen ? 0 : "auto",
                  marginRight: mobileOpen ? 0 : undefined,
                  filter: mobileOpen ? "blur(4px)" : "blur(0px)",
                }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                className="text-[13px] font-medium px-4 py-[8px] rounded-[24px] bg-white text-black border-none whitespace-nowrap overflow-hidden"
                style={{ pointerEvents: mobileOpen ? "none" : "auto" }}
                tabIndex={mobileOpen ? -1 : 0}
              >
                <Link href="/anfrage">Angebot einholen</Link>
              </motion.button>

              {/* Hamburger / Close – white circle button like Joy_ */}
              <motion.button
                onClick={() => setMobileOpen((v) => !v)}
                className="relative flex items-center justify-center w-[40px] h-[40px] rounded-[20px] bg-white/10 text-white shadow-sm flex-shrink-0"
                aria-label={mobileOpen ? "Menü schließen" : "Menü öffnen"}
                whileTap={{ scale: 0.9 }}
              >
                <motion.div
                  animate={{ rotate: mobileOpen ? 180 : 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <AnimatePresence mode="wait" initial={false}>
                    {mobileOpen ? (
                      <motion.div
                        key="close"
                        initial={{ opacity: 0, scale: 0.5, rotate: -90 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        exit={{ opacity: 0, scale: 0.5, rotate: 90 }}
                        transition={{ duration: 0.2 }}
                      >
                        <X size={20} strokeWidth={2} />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="menu"
                        initial={{ opacity: 0, scale: 0.5, rotate: 90 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        exit={{ opacity: 0, scale: 0.5, rotate: -90 }}
                        transition={{ duration: 0.2 }}
                      >
                        <MenuIcon size={20} strokeWidth={2} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.button>
            </div>
          </div>

          {/* Expanded Menu Content */}
          <AnimatePresence>
            {mobileOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{
                  height: { type: "spring", stiffness: 260, damping: 28, mass: 0.9 },
                  opacity: { duration: 0.25 },
                }}
                className="overflow-hidden w-full"
              >
                <div className="flex flex-col px-6 pb-8 pt-2 w-full overflow-y-auto max-h-[calc(100dvh-72px)]">
                  {/* Divider line */}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.1, duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                    className="h-px bg-white/[0.08] w-full origin-left mb-6"
                  />

                  {/* Main navigation links */}
                  <div className="flex flex-col gap-1 w-full">
                    {menus.map((menu, index) => (
                      <motion.div
                        key={menu.label}
                        initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        transition={{
                          delay: 0.08 + index * 0.06,
                          type: "spring",
                          stiffness: 300,
                          damping: 25,
                        }}
                        className="w-full"
                      >
                        {menu.items ? (
                          <>
                            <button
                              onClick={() => toggleMobileExpanded(menu.label)}
                              className="w-full flex items-center justify-between py-4 text-left group"
                            >
                              <span className="text-[28px] font-semibold text-white leading-tight tracking-[-0.02em]">
                                {menu.label}
                              </span>
                              <motion.div
                                animate={{ rotate: mobileExpanded === menu.label ? 45 : 0 }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                className="w-8 h-8 rounded-full bg-white/[0.08] flex items-center justify-center flex-shrink-0"
                              >
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-white">
                                  <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                </svg>
                              </motion.div>
                            </button>
                            <AnimatePresence>
                              {mobileExpanded === menu.label && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{
                                    height: { type: "spring", stiffness: 300, damping: 28 },
                                    opacity: { duration: 0.2 },
                                  }}
                                  className="overflow-hidden w-full"
                                >
                                  <div className="flex flex-col gap-3 pb-4 pl-1">
                                    {menu.items.map((item, idx) => (
                                      <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.04, duration: 0.25 }}
                                      >
                                        <Link
                                          href={item.href}
                                          onClick={() => setMobileOpen(false)}
                                          className="block py-1.5 text-[16px] font-medium text-gray-400 hover:text-white transition-colors"
                                        >
                                          {item.title}
                                        </Link>
                                      </motion.div>
                                    ))}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </>
                        ) : (
                          <Link
                            href={menu.href}
                            onClick={() => setMobileOpen(false)}
                            className="block py-4 text-[28px] font-semibold text-white leading-tight tracking-[-0.02em] hover:opacity-60 transition-opacity"
                          >
                            {menu.label}
                          </Link>
                        )}
                      </motion.div>
                    ))}
                  </div>

                  {/* Bottom section – CTAs */}
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35, type: "spring", stiffness: 260, damping: 25 }}
                    className="mt-8 flex flex-col gap-3 w-full"
                  >
                    <div className="flex items-center gap-3 w-full">
                      <Link
                        href="/anfrage"
                        onClick={() => setMobileOpen(false)}
                        className="flex-1 flex items-center justify-center py-[14px] rounded-[24px] text-[15px] font-medium bg-white text-black active:scale-[0.97] transition-all"
                      >
                        Angebot einholen
                      </Link>
                    </div>

                    {/* Contacts Row */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.45, duration: 0.3 }}
                      className="flex flex-col items-center justify-center gap-3 pt-6 text-sm text-gray-500"
                    >
                      <a href="mailto:philipp@pauli-one.de" className="hover:text-white transition-colors">philipp@pauli-one.de</a>
                      <a href="tel:+4915563127126" className="hover:text-white transition-colors">+49 15563 127126</a>
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>
      </header>

      {/* Dimmed Overlay Background for Mobile */}
      <AnimatePresence>
         {mobileOpen && (
            <motion.div
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               transition={{ duration: 0.3 }}
               className="fixed inset-0 bg-black/60 z-[50] xl:hidden"
               onClick={() => setMobileOpen(false)}
            />
         )}
      </AnimatePresence>
    </>
  );
}
