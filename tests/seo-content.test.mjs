import { serializeJsonLd } from "../components/seo/serialize-json-ld.ts";
import { articleSchema } from "../components/seo/article-schema.ts";
import robots from "../app/robots.ts";
import assert from "node:assert/strict";
import test from "node:test";
import path from "node:path";
import { readFileSync } from "node:fs";

const root = path.resolve(import.meta.dirname, "..");

test("robots blocks indexing outside production and exposes sitemap only in production", () => {
  const previous = process.env.VERCEL_ENV;
  try {
    process.env.VERCEL_ENV = "preview";
    assert.deepEqual(robots(), { rules: [{ userAgent: "*", disallow: "/" }] });
    process.env.VERCEL_ENV = "production";
    const productionRobots = robots();
    assert.deepEqual(productionRobots, {
      rules: [{ userAgent: "*", allow: "/", disallow: "/api/" }],
      sitemap: "https://cotizatuseguro.com.ar/sitemap.xml"
    });
    assert.equal("host" in productionRobots, false, "robots.txt must not emit the unsupported Host directive");
  } finally {
    if (previous === undefined) delete process.env.VERCEL_ENV;
    else process.env.VERCEL_ENV = previous;
  }
});

test("sitemap includes all major SEO route groups", () => {
  const source = readFileSync(path.join(root, "app/sitemap.ts"), "utf8");
  for (const fragment of ["seguros-en-mendoza", "sobre-agustin-montes", "/recursos", "resources.map", "products.map"]) {
    assert.ok(source.includes(fragment), "missing sitemap fragment: " + fragment);
  }
});

test("six product routes exist and resource catalogue has seven articles", () => {
  const slugs = ["auto", "moto", "hogar", "consorcio", "bicicleta", "caucion-alquiler"];
  for (const slug of slugs) {
    const source = readFileSync(path.join(root, "app/seguros", slug, "page.tsx"), "utf8");
    assert.ok(source.includes('slug = "' + slug + '"'));
  }
  const catalogue = readFileSync(path.join(root, "content/resources.ts"), "utf8");
  const resourceSlugs = [
    "seguro-auto-mendoza",
    "factores-precio-seguro-auto",
    "rc-vs-todo-riesgo",
    "datos-para-cotizar-hogar",
    "riesgos-consorcios",
    "documentacion-caucion-alquiler",
    "elegir-cobertura-bicicleta"
  ];
  for (const slug of resourceSlugs) {
    const source = readFileSync(path.join(root, "content/resources", slug + ".ts"), "utf8");
    for (const fragment of ["answer:", "sections:", "faqs:", "references:", "formId:"]) {
      assert.ok(source.includes(fragment), slug + " missing " + fragment);
    }
    assert.ok(catalogue.includes("./resources/" + slug));
  }
});

test("resource article route is statically generated with canonical Article metadata", () => {
  const source = readFileSync(path.join(root, "app/recursos/[slug]/page.tsx"), "utf8");
  for (const fragment of ["generateStaticParams", "getAllResourceSlugs", "canonical: path", "articleSchema(article, SITE_URL)", "breadcrumbList"]) {
    assert.ok(source.includes(fragment));
  }
});

test("JSON-LD serializer escapes script-closing characters", () => {
  const serialized = serializeJsonLd({ description: "</script><script>alert(1)</script>" });
  assert.equal(serialized.includes("<"), false);
});

test("homepage derives product cards from the shared catalogue", () => {
  const home = readFileSync(path.join(root, "app/page.tsx"), "utf8");
  const catalogue = readFileSync(path.join(root, "content/site.ts"), "utf8");
  assert.ok(home.includes("const landingProducts = products.map"));
  assert.ok(!home.includes("const products :"));
  assert.equal(catalogue.split("\n").filter((line) => line.startsWith("    landingDescription:")).length, 6);
  assert.equal(catalogue.split("\n").filter((line) => line.startsWith("    landingShortDescription:")).length, 6);
});


test("product content uses conditional language and does not promise unverified commercial terms", () => {
  const catalogue = readFileSync(path.join(root, "content/site.ts"), "utf8");
  const productPage = readFileSync(path.join(root, "components/seo/product-page.tsx"), "utf8");
  for (const slug of ["auto", "moto", "hogar", "consorcio", "bicicleta", "caucion-alquiler"]) {
    assert.ok(catalogue.includes('slug: "' + slug + '"'), "missing product: " + slug);
  }
  for (const unsupported of [
    "compañías líderes",
    "respuesta rápida",
    "sin costo de cotización",
    "te respondemos por WhatsApp",
    "garantía propietaria"
  ]) {
    assert.equal(catalogue.toLowerCase().includes(unsupported), false, "unsupported claim found: " + unsupported);
  }
  assert.match(productPage, /La solicitud no constituye una póliza ni confirma cobertura/);
  assert.ok(productPage.includes("La aseguradora") && productPage.includes("determina la aceptación"));
});

test("resource content avoids guaranteed acceptance and response-time claims", () => {
  const slugs = [
    "seguro-auto-mendoza",
    "factores-precio-seguro-auto",
    "rc-vs-todo-riesgo",
    "datos-para-cotizar-hogar",
    "riesgos-consorcios",
    "documentacion-caucion-alquiler",
    "elegir-cobertura-bicicleta"
  ];
  for (const slug of slugs) {
    const source = readFileSync(path.join(root, "content/resources", slug + ".ts"), "utf8");
    assert.ok(source.includes("La aseguradora") || source.includes("proveedor") || source.includes("póliza"), slug + " should explain the conditional nature of insurance");
    assert.doesNotMatch(source, /(?:se garantiza|garantizamos) la aprobación|respuesta en (minutos|horas)|aprobación automática/i);
  }
});

test("professional structured data reflects the confirmed national service area", () => {
  const page = readFileSync(path.join(root, "app/sobre-agustin-montes/page.tsx"), "utf8");
  assert.match(page, /jobTitle: "Productor Asesor de Seguros"/);
  assert.match(page, /"@type": "Country",[\s\S]*name: "Argentina"/);
  assert.match(page, /"@type": "InsuranceAgency"/);
  assert.match(page, /streetAddress: "Av\. San Martín Sur 6996"/);
  assert.match(page, /addressLocality: "Luján de Cuyo"/);
  for (const area of ["Ciudad de Mendoza", "Godoy Cruz", "Guaymallén", "Las Heras", "Luján de Cuyo", "Maipú"]) assert.ok(page.includes(area), "missing local service area: " + area);
  assert.doesNotMatch(page, /toda la provincia de Mendoza/i);
  assert.match(page, /maps\.app\.goo\.gl\/fLzqqbVNFxbpigTb8/);
  assert.match(page, /consultas de alcance nacional/i);
});


test("all resource articles declare grounded editorial dates and an attributed author", () => {
  const slugs = [
    "seguro-auto-mendoza",
    "factores-precio-seguro-auto",
    "rc-vs-todo-riesgo",
    "datos-para-cotizar-hogar",
    "riesgos-consorcios",
    "documentacion-caucion-alquiler",
    "elegir-cobertura-bicicleta"
  ];
  for (const slug of slugs) {
    const source = readFileSync(path.join(root, "content/resources", slug + ".ts"), "utf8");
    assert.match(source, /datePublished: "2026-11-06"/, slug + " publication date");
    assert.match(source, /dateModified: "2026-11-11"/, slug + " modification date");
    assert.match(source, /name: "Agustín Montes"/, slug + " author");
    assert.match(source, /jobTitle: "Productor Asesor de Seguros"/, slug + " author role");
    assert.match(source, /url: "\/sobre-agustin-montes"/, slug + " author profile");
  }
});

test("Article JSON-LD includes editorial dates, named author and canonical page identity", () => {
  const schema = articleSchema({
    slug: "guia-prueba",
    title: "Guía de prueba",
    metaDescription: "Descripción de prueba",
    datePublished: "2026-11-06",
    dateModified: "2026-11-11",
    author: {
      name: "Agustín Montes",
      jobTitle: "Productor Asesor de Seguros",
      url: "/sobre-agustin-montes"
    }
  }, "https://cotizatuseguro.com.ar");

  assert.equal(schema["@type"], "Article");
  assert.equal(schema["@id"], "https://cotizatuseguro.com.ar/recursos/guia-prueba#article");
  assert.equal(schema.datePublished, "2026-11-06");
  assert.equal(schema.dateModified, "2026-11-11");
  assert.equal(schema.author["@type"], "Person");
  assert.equal(schema.author["@id"], "https://cotizatuseguro.com.ar/#advisor");
  assert.equal(schema.author.name, "Agustín Montes");
  assert.equal(schema.author.url, "https://cotizatuseguro.com.ar/sobre-agustin-montes");
  assert.equal(schema.publisher["@type"], "Person");
  assert.equal(schema.publisher["@id"], "https://cotizatuseguro.com.ar/#advisor");
});
