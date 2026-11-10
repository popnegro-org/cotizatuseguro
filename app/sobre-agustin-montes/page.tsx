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
    "Agustín Montes es Productor Asesor de Seguros en Mendoza. Brinda asesoramiento para cotizar seguros de auto, moto, hogar, consorcio, bicicleta y caución de alquiler.",
  alternates: { canonical: path },
  openGraph: {
    title: "Sobre Agustín Montes | CotizaTuSeguro",
    description:
      "Información sobre el asesor y los tipos de seguros que podés consultar en Mendoza.",
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
            Soy Agustín Montes, Productor Asesor de Seguros en Mendoza. Recibo consultas para cotizar seguros y explico las condiciones de cada propuesta antes de que tomes una decisión.
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
            El trabajo consiste en relevar los datos del riesgo, solicitar alternativas disponibles y explicar las diferencias entre coberturas, límites, franquicias y exclusiones. La aceptación y las condiciones finales dependen de cada aseguradora.
          </p>
          <ul className="seo-list">
            <li>Recepción de consultas y datos para cotizar.</li>
            <li>Revisión de alternativas disponibles según el riesgo.</li>
            <li>Explicación de las condiciones incluidas en cada propuesta.</li>
            <li>Seguimiento de la solicitud por WhatsApp.</li>
          </ul>
          <h2>Coberturas que asesoro</h2>
          <p>
            Las consultas disponibles son auto, moto, hogar, consorcio, bicicleta y caución de alquiler. Cada página explica qué información se solicita y permite iniciar una cotización.
          </p>
          <div className="seo-actions">
            <CtaQuote label="Solicitar cotización" />
          </div>
        </div>
      </section>
    </SiteChrome>
  );
}
