import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductBySlug } from "../../../content/site";
import { ProductPageView } from "../../../components/seo/product-page";

const slug = "moto";
const product = getProductBySlug(slug);

export const metadata: Metadata = {
  title: product ? `${product.title} | CotizaTuSeguro` : "Seguro | CotizaTuSeguro",
  description: product?.metaDescription,
  alternates: { canonical: `/seguros/${slug}` },
  openGraph: {
    title: product ? `${product.title} | CotizaTuSeguro` : "Seguro",
    description: product?.metaDescription,
    locale: "es_AR",
    url: `https://cotizatuseguro.com.ar/seguros/${slug}`,
    type: "website"
  }
};

export default function Page() {
  const current = getProductBySlug(slug);
  if (!current) notFound();
  return <ProductPageView product={current} />;
}
