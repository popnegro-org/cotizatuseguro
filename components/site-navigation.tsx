"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { products } from "../content/site";

type SiteHeaderProps = {
  activePath?: string;
  quoteHref?: string;
  onQuoteClick?: () => void;
};

type SiteFooterProps = {
  quoteHref?: string;
  onQuoteClick?: () => void;
};

function ProductLinks({ onNavigate, activePath }: { onNavigate?: () => void; activePath?: string }) {
  return (
    <>
      {products.map((product) => (
        <Link key={product.slug} href={"/seguros/" + product.slug} aria-current={activePath === "/seguros/" + product.slug ? "page" : undefined} onClick={onNavigate}>
          {product.shortTitle}
        </Link>
      ))}
      <Link className="site-nav-all" href="/seguros-en-mendoza" onClick={onNavigate}>
        Ver todos los seguros
      </Link>
    </>
  );
}

export function SiteHeader({
  activePath,
  quoteHref = "/#cotizar",
  onQuoteClick
}: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);

  const isCurrent = (path: string) => activePath === path;

  return (
    <>
      <a className="skip-link" href="#contenido-principal">Ir al contenido</a>
      <header className="site-header">
        <div className="container header-inner">
          <Link className="brand" href="/" aria-label="CotizaTuSeguro, inicio">
            <span className="brand-mark" aria-hidden="true">🛡</span>
            <span className="brand-copy">
              COTIZA TU SEGURO
              <small>AGUSTÍN MONTES · PRODUCTOR ASESOR</small>
            </span>
          </Link>

          <nav className="main-nav" aria-label="Navegación principal">
            <details className="site-nav-dropdown">
              <summary className={`site-nav-trigger${activePath?.startsWith("/seguros/") ? " is-active" : ""}`}>Seguros</summary>
              <div className="site-nav-dropdown-menu"><ProductLinks activePath={activePath} /></div>
            </details>
            <Link href="/seguros-en-mendoza" aria-current={isCurrent("/seguros-en-mendoza") ? "page" : undefined}>Seguros en Mendoza</Link>
            <Link href="/sobre-agustin-montes" aria-current={isCurrent("/sobre-agustin-montes") ? "page" : undefined}>Sobre Agustín</Link>
            <Link href="/recursos" aria-current={isCurrent("/recursos") ? "page" : undefined}>Recursos</Link>
          </nav>

          <div className="header-actions">
            <Link className="header-cta" href={quoteHref} onClick={onQuoteClick}>
              Solicitar cotización <span aria-hidden="true">→</span>
            </Link>
            <button
              type="button"
              className={"menu-toggle" + (menuOpen ? " is-open" : "")}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
              onClick={() => setMenuOpen((open) => !open)}
            >
              <span aria-hidden="true" /><span aria-hidden="true" /><span aria-hidden="true" />
            </button>
          </div>
        </div>

        {menuOpen ? (
          <div className="mobile-nav-panel" id="mobile-nav">
            <nav className="mobile-nav" aria-label="Menú móvil">
              <details className="site-nav-dropdown">
                <summary className={`site-nav-trigger${activePath?.startsWith("/seguros/") ? " is-active" : ""}`}>Seguros</summary>
                <div className="site-nav-dropdown-menu">
                  <ProductLinks activePath={activePath} onNavigate={() => setMenuOpen(false)} />
                </div>
              </details>
              <Link href="/seguros-en-mendoza" aria-current={isCurrent("/seguros-en-mendoza") ? "page" : undefined} onClick={() => setMenuOpen(false)}>Seguros en Mendoza</Link>
              <Link href="/sobre-agustin-montes" aria-current={isCurrent("/sobre-agustin-montes") ? "page" : undefined} onClick={() => setMenuOpen(false)}>Sobre Agustín</Link>
              <Link href="/recursos" aria-current={isCurrent("/recursos") ? "page" : undefined} onClick={() => setMenuOpen(false)}>Recursos</Link>
              <Link className="mobile-nav-cta" href={quoteHref} onClick={() => {
                setMenuOpen(false);
                onQuoteClick?.();
              }}>Solicitar cotización</Link>
            </nav>
          </div>
        ) : null}
      </header>
    </>
  );
}

export function SiteFooter({
  quoteHref = "/#cotizar",
  onQuoteClick
}: SiteFooterProps) {
  return (
    <footer className="site-footer">
      <div className="container footer-layout">
        <div className="footer-about">
          <Link className="brand footer-brand" href="/" aria-label="CotizaTuSeguro, inicio">
            <span className="brand-mark" aria-hidden="true">🛡</span>
            <span className="brand-copy">
              COTIZA TU SEGURO
              <small>AGUSTÍN MONTES · PRODUCTOR ASESOR</small>
            </span>
          </Link>
          <p>Asesoramiento personalizado en seguros patrimoniales y de personas, con atención en Mendoza.</p>
          <Link className="footer-about-link" href="/sobre-agustin-montes">Conocé a Agustín</Link>
        </div>

        <nav className="footer-column" aria-label="Coberturas">
          <strong>Seguros</strong>
          <ProductLinks />
        </nav>

        <nav className="footer-column" aria-label="Información institucional">
          <strong>Institucional</strong>
          <Link href="/seguros-en-mendoza">Seguros en Mendoza</Link>
          <Link href="/sobre-agustin-montes">Sobre Agustín</Link>
          <Link href="/#aseguradoras">Aseguradoras</Link>
          <Link href="/#como-funciona">Cómo funciona</Link>
        </nav>

        <nav className="footer-column" aria-label="Información y contacto">
          <strong>Información</strong>
          <Link href="/recursos">Recursos y guías</Link>
          <Link href="/#faq">Preguntas frecuentes</Link>
          <Link href="/privacidad">Política de privacidad</Link>
          <Link className="footer-cta" href={quoteHref} onClick={onQuoteClick}>
            Solicitar cotización <span aria-hidden="true">→</span>
          </Link>
        </nav>
      </div>

      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} Agustín Montes · Mendoza, Argentina</span>
        <Link href="/privacidad">Política de privacidad</Link>
      </div>
      <div className="container footer-note">
        La información de este sitio es orientativa. Las coberturas, exclusiones y condiciones definitivas dependen de cada póliza y compañía.
      </div>
    </footer>
  );
}
