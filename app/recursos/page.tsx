import type { Metadata } from "next";
import { resourceSeeds } from "../../content/resources";
import { SITE_URL } from "../../content/site";
import { Breadcrumb } from "../../components/seo/breadcrumb";
import { CtaQuote } from "../../components/seo/cta-quote";
import { JsonLd, breadcrumbList, webPageSchema } from "../../components/seo/json-ld";
import { SiteChrome } from "../../components/seo/site-chrome";

const path = "/recursos";

export const metadata: Metadata = {
  title: "Recursos y guías de seguros | CotizaTuSeguro Mendoza",
  description:
    "Guías orientativas sobre seguros en Mendoza: auto, hogar, consorcio, caución y más. Contenido para entender coberturas antes de cotizar.",
  alternates: { canonical: path },
  openGraph: {
    title: "Recursos | CotizaTuSeguro",
    description: "Respuestas claras a preguntas frecuentes sobre seguros en Mendoza.",
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
        "Contenido orientativo sobre seguros en Mendoza para entender coberturas antes de cotizar."
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
            Respuestas claras a preguntas frecuentes sobre coberturas en Mendoza.
            El contenido es orientativo y no reemplaza el asesoramiento personalizado
            ni las condiciones de cada póliza.
          </p>
          <div className="seo-actions">
            <CtaQuote />
          </div>
        </div>
      </section>

      <section className="section seo-section">
        <div className="container">
          <h2>Temas frecuentes</h2>
          <ul className="seo-resource-list">
            {resourceSeeds.map((item) => (
              <li key={item.slug}>
                <article className="seo-resource-card">
                  <h3>{item.question}</h3>
                  <p>
                    Contenido en preparación. Mientras tanto, podés solicitar una
                    cotización y te orientamos según tu caso.
                  </p>
                  <CtaQuote label="Cotizar ahora" />
                </article>
              </li>
            ))}
          </ul>
          <p className="seo-note">
            Próximamente publicaremos guías completas para cada tema (GEO content).
            Si tenés una consulta puntual, usá el formulario o escribinos por WhatsApp.
          </p>
        </div>
      </section>
    </SiteChrome>
  );
}
