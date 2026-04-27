"use client";

import { useState, useEffect } from "react";
import "./cookie-banner.css";

export const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem("cookie-consent", "declined");
    setIsVisible(false);
  };

  if (!isVisible && typeof window !== "undefined" && localStorage.getItem("cookie-consent")) {
    return null;
  }

  return (
    <div className={`cookie-banner ${isVisible ? "visible" : ""}`}>
      <div className="cookie-content">
        <h3>Cookie-Einstellungen</h3>
        <p>
          Wir nutzen Cookies, um Ihre Erfahrung auf unserer Website zu verbessern. 
          Einige sind essenziell, während andere uns helfen, diese Website zu optimieren.
        </p>
      </div>
      <div className="cookie-actions">
        <button className="cookie-btn cookie-btn--primary" onClick={handleAccept}>
          Akzeptieren
        </button>
        <button className="cookie-btn cookie-btn--ghost" onClick={handleDecline}>
          Ablehnen
        </button>
      </div>
    </div>
  );
};
