import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "../../content/site";
import { Breadcrumb } from "../../components/seo/breadcrumb";
import { CtaQuote } from "../../components/seo/cta-quote";
import { JsonLd, breadcrumbList, webPageSchema } from "../../components/seo/json-ld";
import { SiteChrome } from "../../components/seo/site-chrome";

const path = "/sobre-agustin-montes";

export const metadata: Metadata = {
  title: "Sobre Agustín Montes | Productor Asesor de Seguros en Mendoza",
  description:
    "Agustín Montes, Productor Asesor de Seguros en Mendoza. Asesoramiento personalizado para auto, moto, hogar, consorcio, bicicleta y caución de alquiler.",
  alternates: { canonical: path },
  openGraph: {
    title: "Sobre Agustín Montes | CotizaTuSeguro",
    description:
      "Productor Asesor de Seguros en Mendoza. Cotizaciones claras y seguimiento por WhatsApp.",
    locale: "es_AR",
    url: `${SITE_URL}${path}`,
    type: "profile"
  }
};

export default function SobreAgustinPage() {
  const schemas = [
    webPageSchema({
      siteUrl: SITE_URL,
      path,
      name: "Sobre Agustín Montes",
      description:
        "Productor Asesor de Seguros en Mendoza. Asesoramiento personalizado en seguros."
    }),
    {
      "@context": "https://schema.org",
      "@type": "Person",
      "@id": `${SITE_URL}/#advisor`,
      name: "Agustín Montes",
      jobTitle: "Productor Asesor de Seguros",
      url: `${SITE_URL}${path}`,
      worksFor: {
        "@type": "Organization",
        name: "CotizaTuSeguro",
        url: SITE_URL
      },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Mendoza",
        addressRegion: "Mendoza",
        addressCountry: "AR"
      },
      areaServed: {
        "@type": "AdministrativeArea",
        name: "Mendoza"
      }
    },
    breadcrumbList(
      [
        { name: "Inicio", path: "/" },
        { name: "Sobre Agustín Montes", path }
      ],
      SITE_URL
    )
  ];

  return (
    <SiteChrome activePath={path}>
      <JsonLd data={schemas} />
      <section className="seo-hero">
        <div className="container seo-hero-inner">
          <Breadcrumb
            items={[{ href: "/", label: "Inicio" }, { label: "Sobre Agustín Montes" }]}
          />
          <p className="seo-kicker">Productor Asesor de Seguros</p>
          <h1>Agustín Montes</h1>
          <p className="seo-lead">
            Productor Asesor de Seguros en Mendoza. Acompaño a personas y empresas a
            cotizar coberturas con información clara, sin presión comercial y con
            seguimiento cercano por WhatsApp.
          </p>
          <div className="seo-actions">
            <CtaQuote />
            <Link className="button-secondary" href="/seguros-en-mendoza">
              Ver coberturas en Mendoza
            </Link>
          </div>
        </div>
      </section>

      <section className="section seo-section">
        <div className="container seo-prose">
          <h2>Cómo trabajo</h2>
          <p>
            El objetivo es que entiendas qué estás contratando. Cotizo con compañías
            reconocidas, explico diferencias de cobertura y te ayudo a elegir según
            tu uso real del riesgo, no según el producto más caro.
          </p>
          <ul className="seo-list">
            <li>Respuesta ágil y seguimiento por WhatsApp</li>
            <li>Comparación de propuestas de varias aseguradoras</li>
            <li>Orientación en emisión y en caso de siniestro</li>
            <li>Enfoque local en Mendoza y alrededores</li>
          </ul>
          <h2>Coberturas que asesoro</h2>
          <p>
            Auto, moto, hogar, consorcio, bicicleta y caución de alquiler. Cada
            producto tiene su propia página con información orientativa y un acceso
            directo al formulario de cotización.
          </p>
          <div className="seo-actions">
            <CtaQuote label="Solicitar cotización" />
          </div>
        </div>
      </section>
    </SiteChrome>
  );
}
