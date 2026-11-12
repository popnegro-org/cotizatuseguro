import type { Metadata } from "next";
import Link from "next/link";
import { products, SITE_URL } from "../../content/site";
import { Breadcrumb } from "../../components/seo/breadcrumb";
import { CtaQuote } from "../../components/seo/cta-quote";
import { JsonLd, breadcrumbList, webPageSchema } from "../../components/seo/json-ld";
import { SiteChrome } from "../../components/seo/site-chrome";

const path = "/seguros-en-mendoza";
const localServiceAreas = [
  "Ciudad de Mendoza",
  "Godoy Cruz",
  "Guaymallén",
  "Las Heras",
  "Luján de Cuyo",
  "Maipú"
];

export const metadata: Metadata = {
  title: "Seguros en Mendoza | CotizaTuSeguro — Agustín Montes",
  description:
    "Asesoramiento en seguros desde Luján de Cuyo y atención presencial o a domicilio en Gran Mendoza: Capital, Godoy Cruz, Guaymallén, Las Heras, Luján de Cuyo y Maipú.",
  alternates: { canonical: path },
  openGraph: {
    title: "Seguros en Mendoza | CotizaTuSeguro",
    description:
      "Atención presencial en Luján de Cuyo y visitas coordinadas en Gran Mendoza. Consultas nacionales sujetas a evaluación del riesgo.",
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
        "Atención presencial en Luján de Cuyo y visitas coordinadas en seis departamentos de Gran Mendoza. Consultas nacionales sujetas a evaluación."
    }),
    {
      "@context": "https://schema.org",
      "@type": "InsuranceAgency",
      "@id": SITE_URL + "/#local-business",
      name: "Agustín Montes",
      url: SITE_URL + "/sobre-agustin-montes",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Av. San Martín Sur 6996",
        addressLocality: "Luján de Cuyo",
        addressRegion: "Mendoza",
        postalCode: "M5505",
        addressCountry: "AR"
      },
      areaServed: localServiceAreas.map((name) => ({
        "@type": "AdministrativeArea",
        name
      })),
      hasMap: "https://maps.app.goo.gl/fLzqqbVNFxbpigTb8"
    },
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
            Solicitá una cotización de seguro en Mendoza para auto, moto, hogar, consorcio, bicicleta o caución de alquiler. La propuesta se prepara según los datos del riesgo y las condiciones disponibles de cada aseguradora.
          </p>
          <div className="seo-actions">
            <CtaQuote />
          </div>
        </div>
      </section>

      <section className="section seo-section">
        <div className="container">
          <h2>Elegí qué necesitás asegurar</h2>
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
          <h2>Atención presencial y visitas en Gran Mendoza</h2>
          <p>
            Agustín Montes atiende presencialmente en Av. San Martín Sur 6996, M5505 Luján de Cuyo,
            Mendoza. También coordina visitas a clientes en Ciudad de Mendoza, Godoy Cruz,
            Guaymallén, Las Heras, Luján de Cuyo y Maipú.
          </p>
          <p>
            Se reciben consultas de otras zonas de Argentina por los canales digitales. La
            posibilidad de cotizar cada producto se confirma según las características del riesgo
            y las condiciones de cada aseguradora; las consultas nacionales no implican visitas
            presenciales fuera del área local indicada.
          </p>
          <p>
            <a href="https://maps.app.goo.gl/fLzqqbVNFxbpigTb8" target="_blank" rel="noopener noreferrer">
              Cómo llegar en Google Maps
            </a>
          </p>
          <p>
            Para conocer al asesor y cómo gestiona las solicitudes, visitá
            {" "}<Link href="/sobre-agustin-montes">la página profesional de Agustín Montes</Link>.
          </p>
        </div>
      </section>

      <section className="section seo-section">
        <div className="container seo-prose">
          <h2>Cómo se gestiona tu cotización</h2>
          <ul className="seo-list">
            <li>Indicás qué bien o riesgo querés asegurar.</li>
            <li>Completás los datos necesarios para evaluar la solicitud.</li>
            <li>El asesor revisa las alternativas disponibles y continúa el contacto por WhatsApp.</li>
            <li>Antes de decidir, revisás precio, límites, franquicias, exclusiones y vigencia de la propuesta.</li>
          </ul>
          <p>
            La solicitud no emite una póliza ni garantiza aceptación. La cobertura, el precio y las condiciones se confirman en la propuesta de la aseguradora.
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
