import assert from "node:assert/strict";
import test from "node:test";
import path from "node:path";
import { readFileSync } from "node:fs";

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

test("sitemap.ts lists product and local routes", () => {
  const source = readFileSync(path.join(root, "app/sitemap.ts"), "utf8");
  assert.match(source, /seguros-en-mendoza/);
  assert.match(source, /sobre-agustin-montes/);
  assert.match(source, /\/recursos/);
  assert.match(source, /seguros\/\$\{product\.slug\}/);
});

test("product routes exist for each SEO slug", () => {
  const slugs = ["auto", "moto", "hogar", "consorcio", "bicicleta", "caucion-alquiler"];
  for (const slug of slugs) {
    const file = path.join(root, "app/seguros", slug, "page.tsx");
    const source = readFileSync(file, "utf8");
    assert.match(source, new RegExp(`slug = "${slug}"`));
  }
});
