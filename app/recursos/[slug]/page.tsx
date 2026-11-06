import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getAllResourceSlugs,
  getResourceBySlug,
  type ResourceArticle
} from "../../../content/resources";
import { SITE_URL } from "../../../content/site";
import { Breadcrumb } from "../../../components/seo/breadcrumb";
import { CtaQuote } from "../../../components/seo/cta-quote";
import { JsonLd } from "../../../components/seo/json-ld";
import { SiteChrome } from "../../../components/seo/site-chrome";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllResourceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getResourceBySlug(slug);
  if (!article) return { title: "Recurso | CotizaTuSeguro" };

  const path = `/recursos/${article.slug}`;
  return {
    title: `${article.title} | CotizaTuSeguro`,
    description: article.metaDescription,
    alternates: { canonical: path },
    openGraph: {
      title: `${article.title} | CotizaTuSeguro`,
      description: article.metaDescription,
      locale: "es_AR",
      url: `${SITE_URL}${path}`,
      type: "article"
    }
  };
}

export default async function ResourceArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getResourceBySlug(slug);
  if (!article) notFound();

  const path = `/recursos/${article.slug}`;
  const related = (article.relatedSlugs ?? [])
    .map((relatedSlug) => getResourceBySlug(relatedSlug))
    .filter((resource): resource is ResourceArticle => Boolean(resource));

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${SITE_URL}${path}#article`,
    headline: article.title,
    description: article.metaDescription,
    mainEntityOfPage: `${SITE_URL}${path}`,
    inLanguage: "es-AR",
    author: {
      "@type": "Person",
      "@id": `${SITE_URL}/#advisor`,
      name: "Agustín Montes"
    },
    publisher: {
      "@type": "Organization",
      name: "CotizaTuSeguro",
      url: SITE_URL
    }
  };

  return (
    <SiteChrome activePath="/recursos">
      <JsonLd data={schema} />
      <section className="seo-hero">
        <div className="container seo-hero-inner">
          <Breadcrumb
            items={[
              { href: "/", label: "Inicio" },
              { href: "/recursos", label: "Recursos" },
              { label: article.question }
            ]}
          />
          <p className="seo-kicker">Guía orientativa</p>
          <h1>{article.question}</h1>
          <p className="seo-lead">{article.answer}</p>
          <div className="seo-actions">
            <CtaQuote product={article.formId} />
            <Link className="button-secondary" href="/recursos">
              Ver todos los recursos
            </Link>
          </div>
        </div>
      </section>

      <section className="section seo-section">
        <div className="container seo-grid">
          <article className="seo-prose">
            {article.sections.map((section) => (
              <section key={section.heading} className="seo-article-block">
                <h2>{section.heading}</h2>
                {section.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </section>
            ))}

            <section className="seo-article-block">
              <h2>Preguntas frecuentes</h2>
              <div className="seo-faq-list">
                {article.faqs.map((item) => (
                  <details key={item.q} className="seo-faq-item">
                    <summary>{item.q}</summary>
                    <p>{item.a}</p>
                  </details>
                ))}
              </div>
            </section>

            <p className="seo-note">
              Este contenido es orientativo y no constituye una oferta de seguro ni
              garantiza cobertura. Las condiciones definitivas dependen de cada
              póliza, la evaluación de la compañía y la documentación presentada.
            </p>
          </article>

          <aside className="seo-aside">
            <h2>Cotizar con datos reales</h2>
            <p>
              Una cotización requiere revisar los datos y las necesidades de tu caso.
              La solicitud no implica aprobación ni compromiso de contratación.
            </p>
            <CtaQuote product={article.formId} label="Solicitar cotización" />
            {related.length > 0 ? (
              <div className="seo-related">
                <h3>También te puede interesar</h3>
                <ul>
                  {related.map((item) => (
                    <li key={item.slug}>
                      <Link href={`/recursos/${item.slug}`}>{item.question}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            <p className="seo-note">
              <Link href="/sobre-agustin-montes">Sobre Agustín Montes</Link>
              {" · "}
              <Link href="/seguros-en-mendoza">Seguros en Mendoza</Link>
            </p>
          </aside>
        </div>
      </section>
    </SiteChrome>
  );
}
