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

test("content/site exports six products with formId mapping", () => {
  const source = readFileSync(path.join(root, "content/site.ts"), "utf8");
  assert.match(source, /slug: "auto"/);
  assert.match(source, /formId: "bicicletas"/);
  assert.match(source, /slug: "caucion-alquiler"/);
  assert.match(source, /formId: "caucion_alquiler"/);
  const slugCount = (source.match(/slug: "/g) || []).length;
  assert.equal(slugCount, 6);
});

test("sitemap includes product, local, institutional and resource routes", () => {
  const source = readFileSync(path.join(root, "app/sitemap.ts"), "utf8");
  assert.match(source, /seguros-en-mendoza/);
  assert.match(source, /sobre-agustin-montes/);
  assert.match(source, /\\/recursos/);
  assert.match(source, /resources\\.map/);
  assert.match(source, /products\\.map/);
});

test("product routes exist for each SEO slug", () => {
  const slugs = ["auto", "moto", "hogar", "consorcio", "bicicleta", "caucion-alquiler"];
  for (const slug of slugs) {
    const file = path.join(root, "app/seguros", slug, "page.tsx");
    const source = readFileSync(file, "utf8");
    assert.match(source, new RegExp(`slug = "${slug}"`));
  }
});

test("resource catalogue exposes seven complete articles and stable slugs", () => {
  const catalogue = readFileSync(path.join(root, "content/resources.ts"), "utf8");
  assert.equal((catalogue.match(/from "\\.\\/resources\\//g) || []).length, 7);
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
    const file = path.join(root, "content/resources", `${slug}.ts`);
    const source = readFileSync(file, "utf8");
    assert.match(source, /answer:/);
    assert.match(source, /sections:/);
    assert.match(source, /faqs:/);
    assert.match(source, /references:/);
    assert.match(source, /https:\\/\\/www\\.argentina\\.gob\\.ar/);
    assert.match(source, /formId:/);
  }
});

test("resource article route is statically generated and includes canonical metadata", () => {
  const source = readFileSync(path.join(root, "app/recursos/[slug]/page.tsx"), "utf8");
  assert.match(source, /generateStaticParams/);
  assert.match(source, /getAllResourceSlugs/);
  assert.match(source, /alternates: \\{ canonical: path \\}/);
  assert.match(source, /"@type": "Article"/);
});

test("JSON-LD serialization escapes script-closing characters", () => {
  const serialized = serializeJsonLd({
    headline: "Coberturas",
    description: "</script><script>alert(1)</script>"
  });
  assert.doesNotMatch(serialized, /<\\/?script/i);
  assert.ok(serialized.includes("\\\\u003c/script>"));
});

test("homepage derives all product cards and form options from the shared catalogue", () => {
  const home = readFileSync(path.join(root, "app/page.tsx"), "utf8");
  const catalogue = readFileSync(path.join(root, "content/site.ts"), "utf8");
  assert.match(home, /import \\{ products, type FormProductId \\} from "\\.\\.\\/content\\/site"/);
  assert.match(home, /const landingProducts = products\\.map/);
  assert.doesNotMatch(home, /const products\\s*:/);
  assert.equal((catalogue.match(/^    landingDescription:/gm) || []).length, 6);
  assert.equal((catalogue.match(/^    landingShortDescription:/gm) || []).length, 6);
  assert.equal((catalogue.match(/^    category: "(?:VEHÍCULOS|VIVIENDA|EDIFICIOS|MOVILIDAD|GARANTÍAS)"/gm) || []).length, 6);
});

test("resource catalogue slugs are unique and related links resolve", () => {
  const source = readFileSync(path.join(root, "content/resources.ts"), "utf8");
  const slugs = [
    "seguro-auto-mendoza",
    "factores-precio-seguro-auto",
    "rc-vs-todo-riesgo",
    "datos-para-cotizar-hogar",
    "riesgos-consorcios",
    "documentacion-caucion-alquiler",
    "elegir-cobertura-bicicleta"
  ];
  assert.equal(new Set(slugs).size, slugs.length);
  for (const slug of slugs) {
    assert.ok(source.includes(`./resources/${slug}`));
  }
});
