import type { MetadataRoute } from "next";
import { resources } from "../content/resources";
import { products, SITE_URL } from "../content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const productEntries = products.map((product) => ({
    url: `${SITE_URL}/seguros/${product.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.8
  }));
  const resourceEntries = resources.map((resource) => ({
    url: `${SITE_URL}/recursos/${resource.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.6
  }));

  return [
    { url: SITE_URL, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/seguros-en-mendoza`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/sobre-agustin-montes`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/recursos`, changeFrequency: "monthly", priority: 0.7 },
    ...productEntries,
    ...resourceEntries,
    { url: `${SITE_URL}/privacidad`, changeFrequency: "yearly", priority: 0.3 }
  ];
}
