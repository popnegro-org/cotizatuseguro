import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getAllResourceSlugs,
  getResourceBySlug
} from "../../../content/resources";
import { SITE_URL } from "../../../content/site";
import { Breadcrumb } from "../../../components/seo/breadcrumb";
import { CtaQuote } from "../../../components/seo/cta-quote";
import {
  JsonLd,
  articleSchema,
  breadcrumbList,
  faqPageSchema,
  webPageSchema
} from "../../../components/seo/json-ld";
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
  const related = (article.relatedSlugs || [])
    .map((s) => getResourceBySlug(s))
    .filter(Boolean);

  const schemas = [
    webPageSchema({
      siteUrl: SITE_URL,
      path,
      name: article.title,
      description: article.metaDescription
    }),
    articleSchema({
      siteUrl: SITE_URL,
      path,
      headline: article.title,
      description: article.metaDescription
    }),
    faqPageSchema(article.faqs),
    breadcrumbList(
      [
        { name: "Inicio", path: "/" },
        { name: "Recursos", path: "/recursos" },
        { name: article.title, path }
      ],
      SITE_URL
    )
  ];

  return (
    <SiteChrome activePath="/recursos">
      <JsonLd data={schemas} />
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
              <div key={section.heading} className="seo-article-block">
                <h2>{section.heading}</h2>
                {section.body.map((paragraph) => (
                  <p key={paragraph.slice(0, 48)}>{paragraph}</p>
                ))}
              </div>
            ))}

            <div className="seo-article-block">
              <h2>Preguntas frecuentes</h2>
              <div className="seo-faq-list">
                {article.faqs.map((item) => (
                  <details key={item.q} className="seo-faq-item">
                    <summary>{item.q}</summary>
                    <p>{item.a}</p>
                  </details>
                ))}
              </div>
            </div>

            <p className="seo-note">
              Este contenido es orientativo y no constituye una oferta de seguro ni
              garantiza cobertura. Las condiciones definitivas dependen de cada
              póliza y compañía.
            </p>
          </article>

          <aside className="seo-aside">
            <h2>Cotizar con datos reales</h2>
            <p>
              Si esta guía responde en parte a tu consulta, el siguiente paso es una
              cotización con los datos de tu caso. Sin compromiso de contratación.
            </p>
            <CtaQuote product={article.formId} label="Solicitar cotización" />
            {related.length > 0 ? (
              <div className="seo-related">
                <h3>También te puede interesar</h3>
                <ul>
                  {related.map((item) =>
                    item ? (
                      <li key={item.slug}>
                        <Link href={`/recursos/${item.slug}`}>{item.question}</Link>
                      </li>
                    ) : null
                  )}
                </ul>
              </div>
            ) : null}
            <p className="seo-note" style={{ marginTop: 16 }}>
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
