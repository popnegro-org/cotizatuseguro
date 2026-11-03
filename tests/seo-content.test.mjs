import assert from "node:assert/strict";
import test from "node:test";
import path from "node:path";
import { readFileSync, readdirSync } from "node:fs";

const root = path.resolve(import.meta.dirname, "..");

test("content/site exports six products with formId mapping", async () => {
  const source = readFileSync(path.join(root, "content/site.ts"), "utf8");
  assert.match(source, /slug: "auto"/);
  assert.match(source, /formId: "bicicletas"/);
  assert.match(source, /slug: "caucion-alquiler"/);
  assert.match(source, /formId: "caucion_alquiler"/);
  const slugCount = (source.match(/slug: "/g) || []).length;
  assert.equal(slugCount, 6);
});

test("sitemap.ts lists product, local and resource routes", () => {
  const source = readFileSync(path.join(root, "app/sitemap.ts"), "utf8");
  assert.match(source, /seguros-en-mendoza/);
  assert.match(source, /sobre-agustin-montes/);
  assert.match(source, /\/recursos/);
  assert.match(source, /seguros\/\$\{product\.slug\}/);
  assert.match(source, /recursos\/\$\{article\.slug\}/);
});

test("product routes exist for each SEO slug", () => {
  const slugs = ["auto", "moto", "hogar", "consorcio", "bicicleta", "caucion-alquiler"];
  for (const slug of slugs) {
    const file = path.join(root, "app/seguros", slug, "page.tsx");
    const source = readFileSync(file, "utf8");
    assert.match(source, new RegExp(`slug = "${slug}"`));
  }
});

test("GEO resources export seven full articles with formId and answer", () => {
  const dir = path.join(root, "content/resources");
  const files = readdirSync(dir).filter((f) => f.endsWith(".ts"));
  assert.equal(files.length, 7);
  for (const file of files) {
    const source = readFileSync(path.join(dir, file), "utf8");
    assert.match(source, /slug: "/);
    assert.match(source, /formId: "/);
    assert.match(source, /answer:/);
    assert.match(source, /export const article/);
  }
  const index = readFileSync(path.join(root, "content/resources.ts"), "utf8");
  assert.match(index, /getResourceBySlug/);
  assert.match(index, /getAllResourceSlugs/);
});

test("resource article dynamic route exists", () => {
  const file = path.join(root, "app/recursos/[slug]/page.tsx");
  const source = readFileSync(file, "utf8");
  assert.match(source, /generateStaticParams/);
  assert.match(source, /getResourceBySlug/);
  assert.match(source, /faqPageSchema/);
  assert.match(source, /articleSchema/);
});
