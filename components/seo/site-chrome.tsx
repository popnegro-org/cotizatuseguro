import Link from "next/link";
import { seoNav } from "../../content/site";

export function SiteChrome({
  children,
  activePath
}: {
  children: React.ReactNode;
  activePath?: string;
}) {
  return (
    <div className="seo-shell">
      <a className="skip-link" href="#contenido-principal">
        Ir al contenido
      </a>
      <header className="site-header">
        <div className="container header-inner">
          <Link
            className="brand"
            href="/"
            aria-label="CotizaTuSeguro, inicio"
          >
            <span className="brand-mark" aria-hidden="true">
              🛡
            </span>
            <span className="brand-copy">
              COTIZA TU SEGURO
              <small>AGUSTÍN MONTES · PRODUCTOR ASESOR</small>
            </span>
          </Link>
          <nav className="main-nav seo-nav" aria-label="Navegación principal">
            {seoNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={activePath === item.href ? "page" : undefined}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="header-actions">
            <Link className="header-cta" href="/#cotizar">
              Solicitar cotización <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </header>
      <main id="contenido-principal">{children}</main>
      <footer className="site-footer">
        <div className="container footer-inner">
          <p>
            <strong>Agustín Montes</strong> · Productor Asesor de Seguros · Mendoza
          </p>
          <nav className="footer-nav" aria-label="Enlaces del pie">
            <Link href="/seguros-en-mendoza">Seguros en Mendoza</Link>
            <Link href="/sobre-agustin-montes">Sobre Agustín</Link>
            <Link href="/recursos">Recursos</Link>
            <Link href="/privacidad">Privacidad</Link>
            <Link href="/#cotizar">Cotizar</Link>
          </nav>
          <p className="footer-note">
            La información de este sitio es orientativa. Las coberturas, exclusiones y
            condiciones definitivas dependen de cada póliza y compañía.
          </p>
        </div>
      </footer>
    </div>
  );
}
