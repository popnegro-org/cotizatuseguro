import type { Metadata } from "next";
import Link from "next/link";
import { resources } from "../../content/resources";
import { SITE_URL } from "../../content/site";
import { Breadcrumb } from "../../components/seo/breadcrumb";
import { CtaQuote } from "../../components/seo/cta-quote";
import { JsonLd, breadcrumbList, webPageSchema } from "../../components/seo/json-ld";
import { SiteChrome } from "../../components/seo/site-chrome";

const path = "/recursos";

export const metadata: Metadata = {
  title: "Recursos y guías de seguros | CotizaTuSeguro Mendoza",
  description:
    "Guías orientativas sobre seguros de auto, hogar, consorcio, caución y bicicleta. Información práctica para entender coberturas antes de cotizar.",
  alternates: { canonical: path },
  openGraph: {
    title: "Recursos | CotizaTuSeguro",
    description: "Guías prácticas y respuestas a preguntas frecuentes sobre seguros.",
    locale: "es_AR",
    url: `${SITE_URL}${path}`,
    type: "website"
  }
};

export default function RecursosPage() {
  const schemas = [
    webPageSchema({
      siteUrl: SITE_URL,
      path,
      name: "Recursos y guías de seguros",
      description:
        "Contenido orientativo sobre seguros para entender coberturas y preparar una cotización."
    }),
    breadcrumbList(
      [
        { name: "Inicio", path: "/" },
        { name: "Recursos", path }
      ],
      SITE_URL
    )
  ];

  return (
    <SiteChrome activePath={path}>
      <JsonLd data={schemas} />
      <section className="seo-hero">
        <div className="container seo-hero-inner">
          <Breadcrumb items={[{ href: "/", label: "Inicio" }, { label: "Recursos" }]} />
          <p className="seo-kicker">Guías orientativas</p>
          <h1>Recursos sobre seguros</h1>
          <p className="seo-lead">
            Guías sobre coberturas, datos necesarios para cotizar y condiciones que conviene revisar antes de contratar. El alcance real siempre surge de la propuesta y de la póliza.
          </p>
          <div className="seo-actions">
            <CtaQuote />
          </div>
        </div>
      </section>

      <section className="section seo-section">
        <div className="container">
          <h2>Consultá por tema</h2>
          <ul className="seo-resource-list">
            {resources.map((item) => (
              <li key={item.slug}>
                <article className="seo-resource-card">
                  <h3>
                    <Link href={`/recursos/${item.slug}`}>{item.question}</Link>
                  </h3>
                  <p>{item.answer}</p>
                  <Link className="seo-resource-link" href={`/recursos/${item.slug}`}>
                    Ver guía
                  </Link>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </SiteChrome>
  );
}
