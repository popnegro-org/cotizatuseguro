import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const read = (path) => readFile(new URL(path, import.meta.url), "utf8");

test("homepage, SEO pages and privacy share the same site navigation", async () => {
  const [home, chrome, privacy] = await Promise.all([
    read("../app/page.tsx"),
    read("../components/seo/site-chrome.tsx"),
    read("../app/privacidad/page.tsx")
  ]);

  for (const source of [home, chrome, privacy]) {
    assert.match(source, /<SiteHeader\b/);
    assert.match(source, /<SiteFooter\b/);
  }
  assert.doesNotMatch(home, /<nav className="main-nav"/);
  assert.doesNotMatch(privacy, /<nav className="main-nav"/);
});

test("shared navigation exposes every product route and institutional destination", async () => {
  const [navigation, sitemap] = await Promise.all([
    read("../components/site-navigation.tsx"),
    read("../app/sitemap.ts")
  ]);

  assert.match(navigation, /products\.map\(\(product\) =>/);
  assert.match(navigation, /href=\{"\/seguros\/" \+ product\.slug\}/);
  assert.ok(sitemap.includes("const productEntries = products.map"), "Sitemap should derive product URLs from the shared catalog");
  assert.ok(sitemap.includes("/seguros/${product.slug}"), "Sitemap should expose each product detail route");
  for (const path of ["/seguros-en-mendoza", "/sobre-agustin-montes", "/recursos", "/privacidad"]) {
    assert.ok(navigation.includes(path), "Missing navigation destination: " + path);
  }
});

test("mobile navigation exposes accessible state and Escape dismissal", async () => {
  const navigation = await read("../components/site-navigation.tsx");

  assert.match(navigation, /aria-expanded={menuOpen}/);
  assert.match(navigation, /aria-controls="mobile-nav"/);
  assert.match(navigation, /aria-label={menuOpen \? "Cerrar menú" : "Abrir menú"}/);
  assert.match(navigation, /event\.key === "Escape"/);
  assert.match(navigation, /aria-label="Menú móvil"/);
});
