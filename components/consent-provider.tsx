"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { readAnalyticsConsent, writeAnalyticsConsent, type AnalyticsConsent } from "../lib/analytics-consent";

type ConsentContextValue = {
  consent: AnalyticsConsent;
  bannerVisible: boolean;
  accept: () => void;
  reject: () => void;
  openPreferences: () => void;
};

const ConsentContext = createContext<ConsentContextValue | null>(null);

function loadGoogleTagManager(): void {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
  if (!gtmId || document.getElementById("gtm-loader")) return;

  const windowWithDataLayer = window as Window & { dataLayer?: Record<string, unknown>[] };
  windowWithDataLayer.dataLayer = windowWithDataLayer.dataLayer || [];
  windowWithDataLayer.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });

  const script = document.createElement("script");
  script.id = "gtm-loader";
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${gtmId}`;
  document.head.appendChild(script);
}

export function ConsentProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [consent, setConsent] = useState<AnalyticsConsent>("unknown");
  const [bannerVisible, setBannerVisible] = useState(false);
  const [initialized, setInitialized] = useState(false);

  // The landing page still owns its existing consent UI. Refresh the shared
  // state on navigation so a choice made there enables GTM across the site.
  useEffect(() => {
    setConsent(readAnalyticsConsent());
    setInitialized(true);
  }, [pathname]);

  useEffect(() => {
    if (!initialized) return;
    if (consent === "unknown") {
      const timeoutId = window.setTimeout(() => setBannerVisible(true), 1800);
      return () => window.clearTimeout(timeoutId);
    }
    setBannerVisible(false);
  }, [consent, initialized]);

  useEffect(() => {
    if (initialized && consent === "accepted") loadGoogleTagManager();
  }, [consent, initialized]);

  const chooseConsent = useCallback((value: Exclude<AnalyticsConsent, "unknown">) => {
    writeAnalyticsConsent(value);
    setConsent(value);
    setBannerVisible(false);
  }, []);

  const accept = useCallback(() => chooseConsent("accepted"), [chooseConsent]);
  const reject = useCallback(() => chooseConsent("rejected"), [chooseConsent]);
  const openPreferences = useCallback(() => setBannerVisible(true), []);

  const value = useMemo(() => ({ consent, bannerVisible, accept, reject, openPreferences }), [consent, bannerVisible, accept, reject, openPreferences]);
  // Avoid rendering a second banner over the landing page's legacy banner.
  const showProviderBanner = bannerVisible && (pathname !== "/" || consent !== "unknown");

  return (
    <ConsentContext.Provider value={value}>
      {children}
      {showProviderBanner ? (
        <aside className="consent-banner" aria-label="Preferencias de privacidad">
          <p>Usamos medición del sitio. Las etiquetas solo se activan si aceptás. <a href="/privacidad">Más info</a>.</p>
          <div className="consent-actions">
            <button type="button" onClick={reject}>Rechazar</button>
            <button className="accept" type="button" onClick={accept}>Aceptar</button>
          </div>
        </aside>
      ) : null}
    </ConsentContext.Provider>
  );
}

export function useAnalyticsConsent(): ConsentContextValue {
  const context = useContext(ConsentContext);
  if (!context) throw new Error("useAnalyticsConsent debe usarse dentro de ConsentProvider");
  return context;
}

export function useAnalyticsConsentOptional(): ConsentContextValue | null {
  return useContext(ConsentContext);
}
