import { serializeJsonLd } from "../components/seo/serialize-json-ld.ts";
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
    assert.deepEqual(robots(), {
      rules: [{ userAgent: "*", allow: "/", disallow: "/api/" }],
      sitemap: "https://cotizatuseguro.com.ar/sitemap.xml",
      host: "https://cotizatuseguro.com.ar"
    });
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
  for (const fragment of ["generateStaticParams", "getAllResourceSlugs", "canonical: path", '"@type": "Article"']) {
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
  assert.match(productPage, /La aseguradora determina la aceptación/);
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
    assert.doesNotMatch(source, /garantiza la aprobación|respuesta en (minutos|horas)|aprobación automática/i);
  }
});

test("professional structured data does not assert an unverified service territory", () => {
  const layout = readFileSync(path.join(root, "app/layout.tsx"), "utf8");
  assert.match(layout, /jobTitle: "Productor Asesor de Seguros"/);
  assert.doesNotMatch(layout, /areaServed:/);
});
