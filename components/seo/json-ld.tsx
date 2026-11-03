type JsonLdProps = {
  data: Record<string, unknown> | Record<string, unknown>[];
};

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function breadcrumbList(items: { name: string; path: string }[], siteUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${item.path}`
    }))
  };
}

export function serviceSchema(opts: {
  siteUrl: string;
  name: string;
  description: string;
  path: string;
  serviceType?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: opts.name,
    description: opts.description,
    url: `${opts.siteUrl}${opts.path}`,
    serviceType: opts.serviceType || "Asesoramiento en seguros",
    provider: {
      "@type": "Person",
      "@id": `${opts.siteUrl}/#advisor`,
      name: "Agustín Montes",
      jobTitle: "Productor Asesor de Seguros"
    },
    areaServed: {
      "@type": "AdministrativeArea",
      name: "Mendoza"
    }
  };
}

export function webPageSchema(opts: {
  siteUrl: string;
  path: string;
  name: string;
  description: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${opts.siteUrl}${opts.path}#webpage`,
    url: `${opts.siteUrl}${opts.path}`,
    name: opts.name,
    description: opts.description,
    isPartOf: { "@id": `${opts.siteUrl}/#website` },
    about: { "@id": `${opts.siteUrl}/#advisor` },
    inLanguage: "es-AR"
  };
}

export function articleSchema(opts: {
  siteUrl: string;
  path: string;
  headline: string;
  description: string;
  datePublished?: string;
  dateModified?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: opts.headline,
    description: opts.description,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${opts.siteUrl}${opts.path}`
    },
    author: {
      "@type": "Person",
      "@id": `${opts.siteUrl}/#advisor`,
      name: "Agustín Montes"
    },
    publisher: {
      "@type": "Person",
      "@id": `${opts.siteUrl}/#advisor`,
      name: "Agustín Montes"
    },
    inLanguage: "es-AR",
    datePublished: opts.datePublished || "2026-11-03",
    dateModified: opts.dateModified || "2026-11-03"
  };
}

export function faqPageSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a
      }
    }))
  };
}
