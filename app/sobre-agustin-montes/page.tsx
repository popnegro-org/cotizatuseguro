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
    "Agustín Montes es Productor Asesor de Seguros en Mendoza y recibe consultas de alcance nacional para cotizar seguros de auto, moto, hogar, consorcio, bicicleta y caución de alquiler.",
  alternates: { canonical: path },
  openGraph: {
    title: "Sobre Agustín Montes | CotizaTuSeguro",
    description:
      "Información sobre el asesor, la atención desde Mendoza y las consultas de alcance nacional.",
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
        "Productor Asesor de Seguros con atención desde Mendoza y consultas de alcance nacional. La disponibilidad depende del riesgo y del producto."
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
        streetAddress: "Av. San Martín Sur 6996",
        addressLocality: "Luján de Cuyo",
        addressRegion: "Mendoza",
        postalCode: "M5505",
        addressCountry: "AR"
      },
      areaServed: {
        "@type": "Country",
        name: "Argentina"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "InsuranceAgency",
      "@id": SITE_URL + "/#local-business",
      name: "Agustín Montes",
      url: SITE_URL + path,
      address: {
        "@type": "PostalAddress",
        streetAddress: "Av. San Martín Sur 6996",
        addressLocality: "Luján de Cuyo",
        addressRegion: "Mendoza",
        postalCode: "M5505",
        addressCountry: "AR"
      },
      areaServed: ["Ciudad de Mendoza", "Godoy Cruz", "Guaymallén", "Las Heras", "Luján de Cuyo", "Maipú"].map((name) => ({
        "@type": "AdministrativeArea",
        name
      })),
      hasMap: "https://maps.app.goo.gl/fLzqqbVNFxbpigTb8"
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
            Soy Agustín Montes, Productor Asesor de Seguros. Atiendo desde Mendoza y recibo consultas de alcance nacional. La disponibilidad de cada producto se confirma según el riesgo y las condiciones de cada aseguradora.
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
          <h2>Atención presencial en Luján de Cuyo</h2>
          <address>Av. San Martín Sur 6996, M5505 Luján de Cuyo, Mendoza</address>
          <p>Los clientes pueden visitar el domicilio. También se coordinan visitas a clientes en Ciudad de Mendoza, Godoy Cruz, Guaymallén, Las Heras, Luján de Cuyo y Maipú. Las consultas de otras zonas se reciben por canales digitales, sujetas a evaluación del riesgo y disponibilidad del producto.</p>
          <p><a href="https://maps.app.goo.gl/fLzqqbVNFxbpigTb8" target="_blank" rel="noopener noreferrer">Cómo llegar en Google Maps</a></p>
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
