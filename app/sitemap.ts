import type { MetadataRoute } from "next";
import { resources } from "../content/resources";
import { products } from "../content/site";

const productionSiteUrl = "https://cotizatuseguro.com.ar";

export default function sitemap(): MetadataRoute.Sitemap {
  const productEntries = products.map((product) => ({
    url: `${productionSiteUrl}/seguros/${product.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.8
  }));

  const resourceEntries = resources.map((article) => ({
    url: `${productionSiteUrl}/recursos/${article.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.65
  }));

  return [
    { url: productionSiteUrl, changeFrequency: "weekly", priority: 1 },
    { url: `${productionSiteUrl}/seguros-en-mendoza`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${productionSiteUrl}/sobre-agustin-montes`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${productionSiteUrl}/recursos`, changeFrequency: "weekly", priority: 0.7 },
    ...productEntries,
    ...resourceEntries,
    { url: `${productionSiteUrl}/privacidad`, changeFrequency: "yearly", priority: 0.3 }
  ];
}
