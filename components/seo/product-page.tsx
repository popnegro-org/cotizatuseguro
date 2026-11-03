import Link from "next/link";
import type { ProductSeo } from "../../content/site";
import { SITE_URL, products } from "../../content/site";
import { Breadcrumb } from "./breadcrumb";
import { CtaQuote } from "./cta-quote";
import { JsonLd, breadcrumbList, serviceSchema, webPageSchema } from "./json-ld";
import { SiteChrome } from "./site-chrome";

export function ProductPageView({ product }: { product: ProductSeo }) {
  const path = `/seguros/${product.slug}`;
  const crumbs = [
    { href: "/", label: "Inicio" },
    { href: "/seguros-en-mendoza", label: "Seguros en Mendoza" },
    { label: product.shortTitle }
  ];

  const schemas = [
    webPageSchema({
      siteUrl: SITE_URL,
      path,
      name: product.title,
      description: product.metaDescription
    }),
    serviceSchema({
      siteUrl: SITE_URL,
      name: product.title,
      description: product.metaDescription,
      path,
      serviceType: product.title
    }),
    breadcrumbList(
      [
        { name: "Inicio", path: "/" },
        { name: "Seguros en Mendoza", path: "/seguros-en-mendoza" },
        { name: product.shortTitle, path }
      ],
      SITE_URL
    )
  ];

  const otherProducts = products.filter((p) => p.slug !== product.slug);

  return (
    <SiteChrome activePath={path}>
      <JsonLd data={schemas} />
      <section className="seo-hero">
        <div className="container seo-hero-inner">
          <Breadcrumb items={crumbs} />
          <p className="seo-kicker">{product.icon} Seguro · Mendoza</p>
          <h1>{product.h1}</h1>
          <p className="seo-lead">{product.intro}</p>
          <div className="seo-actions">
            <CtaQuote product={product.formId} />
            <Link className="button-secondary" href="/seguros-en-mendoza">
              Ver todos los seguros
            </Link>
          </div>
        </div>
      </section>

      <section className="section seo-section">
        <div className="container seo-grid">
          <div>
            <h2>Beneficios de cotizar con nosotros</h2>
            <ul className="seo-list">
              {product.benefits.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="seo-note">
              La cotización es orientativa y sin compromiso. Las condiciones finales
              las define cada compañía en la propuesta formal.
            </p>
          </div>
          <aside className="seo-aside">
            <h2>Solicitá tu cotización</h2>
            <p>
              Completá el formulario con datos básicos. Te respondemos por WhatsApp
              con opciones claras para {product.shortTitle.toLowerCase()}.
            </p>
            <CtaQuote product={product.formId} label="Ir a cotizar" />
          </aside>
        </div>
      </section>

      {product.faqs.length > 0 ? (
        <section className="section seo-section seo-faq">
          <div className="container">
            <h2>Preguntas frecuentes</h2>
            <div className="seo-faq-list">
              {product.faqs.map((faq) => (
                <details key={faq.q} className="seo-faq-item">
                  <summary>{faq.q}</summary>
                  <p>{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="section seo-section">
        <div className="container">
          <h2>Otras coberturas</h2>
          <ul className="seo-product-grid">
            {otherProducts.map((p) => (
              <li key={p.slug}>
                <Link href={`/seguros/${p.slug}`}>
                  <span aria-hidden="true">{p.icon}</span>
                  <strong>{p.shortTitle}</strong>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </SiteChrome>
  );
}
