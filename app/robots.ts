import type { MetadataRoute } from "next";

const productionSiteUrl = "https://cotizatuseguro.com.ar";

export default function robots(): MetadataRoute.Robots {
  const isProduction = process.env.VERCEL_ENV === "production";

  if (!isProduction) {
    return {
      rules: [{ userAgent: "*", disallow: "/" }]
    };
  }

  return {
    rules: [{ userAgent: "*", allow: "/", disallow: "/api/" }],
    sitemap: `${productionSiteUrl}/sitemap.xml`
  };
}
