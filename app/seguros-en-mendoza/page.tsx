import type { Metadata } from "next";
import Link from "next/link";
import { products, SITE_URL } from "../../content/site";
import { Breadcrumb } from "../../components/seo/breadcrumb";
import { CtaQuote } from "../../components/seo/cta-quote";
import { JsonLd, breadcrumbList, webPageSchema } from "../../components/seo/json-ld";
import { SiteChrome } from "../../components/seo/site-chrome";

const path = "/seguros-en-mendoza";

export const metadata: Metadata = {
  title: "Seguros en Mendoza | CotizaTuSeguro — Agustín Montes",
  description:
    "Cotizá seguros en Mendoza: auto, moto, hogar, consorcio, bicicleta y caución de alquiler. Asesoramiento local de Agustín Montes, Productor Asesor de Seguros.",
  alternates: { canonical: path },
  openGraph: {
    title: "Seguros en Mendoza | CotizaTuSeguro",
    description:
      "Asesoramiento local en Mendoza para cotizar seguros con compañías líderes. Respuesta por WhatsApp.",
    locale: "es_AR",
    url: `${SITE_URL}${path}`,
    type: "website"
  }
};

export default function SegurosEnMendozaPage() {
  const schemas = [
    webPageSchema({
      siteUrl: SITE_URL,
      path,
      name: "Seguros en Mendoza",
      description:
        "Cotizá seguros en Mendoza con asesoramiento local. Auto, moto, hogar, consorcio, bicicleta y caución de alquiler."
    }),
    breadcrumbList(
      [
        { name: "Inicio", path: "/" },
        { name: "Seguros en Mendoza", path }
      ],
      SITE_URL
    ),
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Seguros en Mendoza",
      itemListElement: products.map((p, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: p.title,
        url: `${SITE_URL}/seguros/${p.slug}`
      }))
    }
  ];

  return (
    <SiteChrome activePath={path}>
      <JsonLd data={schemas} />
      <section className="seo-hero">
        <div className="container seo-hero-inner">
          <Breadcrumb
            items={[{ href: "/", label: "Inicio" }, { label: "Seguros en Mendoza" }]}
          />
          <p className="seo-kicker">Asesoramiento local</p>
          <h1>Seguros en Mendoza</h1>
          <p className="seo-lead">
            Cotizá con un Productor Asesor de Seguros en Mendoza. Compará opciones
            de auto, moto, hogar, consorcio, bicicleta y caución de alquiler con
            información clara y seguimiento por WhatsApp.
          </p>
          <div className="seo-actions">
            <CtaQuote />
          </div>
        </div>
      </section>

      <section className="section seo-section">
        <div className="container">
          <h2>Coberturas disponibles</h2>
          <ul className="seo-product-grid seo-product-grid-large">
            {products.map((p) => (
              <li key={p.slug}>
                <Link href={`/seguros/${p.slug}`}>
                  <span className="seo-product-icon" aria-hidden="true">
                    {p.icon}
                  </span>
                  <strong>{p.shortTitle}</strong>
                  <span className="seo-product-desc">{p.metaDescription.slice(0, 110)}…</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section seo-section">
        <div className="container seo-prose">
          <h2>Por qué cotizar en Mendoza con nosotros</h2>
          <ul className="seo-list">
            <li>Enfoque local: conocemos el mercado y las compañías con presencia en la región.</li>
            <li>Proceso simple: datos básicos y respuesta por WhatsApp.</li>
            <li>Sin costo de cotización ni compromiso de contratación.</li>
            <li>Acompañamiento en la emisión y orientación ante siniestros.</li>
          </ul>
          <p>
            La información de estas páginas es orientativa. Las condiciones
            definitivas dependen de cada póliza y de la evaluación de la compañía.
          </p>
          <div className="seo-actions">
            <CtaQuote label="Solicitar cotización ahora" />
            <Link className="button-secondary" href="/sobre-agustin-montes">
              Conocer a Agustín
            </Link>
          </div>
        </div>
      </section>
    </SiteChrome>
  );
}
