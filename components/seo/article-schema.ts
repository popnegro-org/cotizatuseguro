import type { ResourceArticle } from "../../content/resource-types";

export function articleSchema(article: ResourceArticle, siteUrl: string) {
  const path = "/recursos/" + article.slug;
  const authorUrl = article.author.url.startsWith("http")
    ? article.author.url
    : siteUrl + article.author.url;

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": siteUrl + path + "#article",
    headline: article.title,
    description: article.metaDescription,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": siteUrl + path
    },
    datePublished: article.datePublished,
    dateModified: article.dateModified,
    author: {
      "@type": "Person",
      "@id": siteUrl + "/#advisor",
      name: article.author.name,
      jobTitle: article.author.jobTitle,
      url: authorUrl
    },
    publisher: {
      "@type": "Person",
      "@id": siteUrl + "/#advisor",
      name: article.author.name,
      url: authorUrl
    },
    inLanguage: "es-AR"
  };
}
