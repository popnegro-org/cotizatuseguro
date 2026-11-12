import { expect, test } from "@playwright/test";

const routes = [
  "/sobre-agustin-montes",
  "/seguros-en-mendoza",
  "/recursos",
  "/seguros/auto",
  "/seguros/moto",
  "/seguros/hogar",
  "/seguros/consorcio",
  "/seguros/bicicleta",
  "/seguros/caucion-alquiler",
  "/recursos/seguro-auto-mendoza",
  "/recursos/factores-precio-seguro-auto",
  "/recursos/rc-vs-todo-riesgo",
  "/recursos/datos-para-cotizar-hogar",
  "/recursos/riesgos-consorcios",
  "/recursos/documentacion-caucion-alquiler",
  "/recursos/elegir-cobertura-bicicleta"
];

for (const route of routes) {
  test(`SEO route ${route} renders shell and H1`, async ({ page }) => {
    const response = await page.goto(route);
    expect(response?.ok()).toBeTruthy();
    await expect(page.locator("header.site-header")).toBeVisible();
    await expect(page.locator("footer.site-footer")).toBeVisible();
    await expect(page.locator("h1")).toBeVisible();
    await expect(page.getByRole("link", { name: /solicitar cotización/i }).first()).toBeVisible();
  });
}

test("resource cards link to full guides", async ({ page }) => {
  await page.goto("/recursos");
  const links = page.locator('a[href^="/recursos/"]');
  await expect(links).toHaveCount(14);
  await expect(links.first()).toBeVisible();
});

test("product CTA deep-links to form product query", async ({ page }) => {
  await page.goto("/seguros/auto");
  const cta = page.locator('main a[href*="producto=auto"]').first();
  await expect(cta).toBeVisible();
  await expect(cta).toHaveAttribute("href", "/?producto=auto#cotizar");
});


test("resource guide exposes official references and a contextual product CTA", async ({ page }) => {
  await page.goto("/recursos/seguro-auto-mendoza");
  await expect(page.getByRole("heading", { name: "Fuentes oficiales para ampliar" })).toBeVisible();
  await expect(page.getByRole("link", { name: /Ley 24\.449/ })).toHaveAttribute(
    "href",
    "https://www.argentina.gob.ar/normativa/nacional/ley-24449-818/actualizacion"
  );
  const cta = page.locator('main a[href*="producto=auto"]').first();
  await expect(cta).toBeVisible();
  await expect(cta).toHaveAttribute("href", "/?producto=auto#cotizar");
});


test("all product and resource pages expose canonical metadata and a single primary heading", async ({ page }) => {
  for (const route of routes) {
    await page.goto(route);
    const canonical = await page.locator('link[rel="canonical"]').getAttribute("href");
    expect(canonical, route + " canonical").toBe("https://cotizatuseguro.com.ar" + route);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("main")).toBeVisible();
    await expect(page.getByRole("link", { name: "Ir al contenido" })).toHaveAttribute("href", "#contenido-principal");
  }
});

test("product and resource pages remain usable without horizontal overflow on mobile", async ({ page }) => {
  for (const route of routes) {
    await page.goto(route);
    await page.setViewportSize({ width: 375, height: 812 });
    const dimensions = await page.evaluate(() => ({
      viewport: document.documentElement.clientWidth,
      document: document.documentElement.scrollWidth
    }));
    expect(dimensions.document, route + " horizontal overflow").toBeLessThanOrEqual(dimensions.viewport);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.locator("footer.site-footer")).toBeVisible();
  }
});

test("product and resource CTAs have descriptive accessible names", async ({ page }) => {
  for (const route of routes) {
    await page.goto(route);
    const quoteLinks = page.locator('main a[href*="#cotizar"]');
    await expect(quoteLinks.first()).toBeVisible();
    await expect(quoteLinks.first()).toHaveAccessibleName(/cotiz|solicitar/i);
  }
});


test("resource guides show editorial attribution and matching Article/Breadcrumb JSON-LD", async ({ page }) => {
  const resourceRoutes = routes.filter((route) => route.startsWith("/recursos/"));
  for (const route of resourceRoutes) {
    await page.goto(route);
    await expect(page.locator(".seo-article-meta")).toContainText("Agustín Montes");
    await expect(page.locator('time[datetime="2026-11-06"]')).toContainText("Publicado");
    await expect(page.locator('time[datetime="2026-11-11"]')).toContainText("Actualizado");

    const schemas = await page.locator('script[type="application/ld+json"]').evaluateAll((nodes) =>
      nodes.flatMap((node) => {
        const parsed = JSON.parse(node.textContent || "null");
        return Array.isArray(parsed) ? parsed : [parsed];
      })
    );
    const article = schemas.find((schema) => schema["@type"] === "Article");
    expect(article, route + " Article schema").toBeTruthy();
    expect(article.datePublished).toBe("2026-11-06");
    expect(article.dateModified).toBe("2026-11-11");
    expect(article.author).toMatchObject({
      "@type": "Person",
      "@id": "https://cotizatuseguro.com.ar/#advisor",
      name: "Agustín Montes",
      jobTitle: "Productor Asesor de Seguros"
    });
    expect(schemas.some((schema) => schema["@type"] === "BreadcrumbList")).toBeTruthy();
  }
});

test("Mendoza landing describes the verified in-person and home-visit service scope", async ({ page }) => {
  await page.goto("/seguros-en-mendoza");
  await expect(page.getByRole("heading", { name: "Atención presencial y visitas en Gran Mendoza" })).toBeVisible();
  await expect(page.getByText(/Av\. San Martín Sur 6996/)).toBeVisible();
  await expect(page.getByRole("link", { name: "Cómo llegar en Google Maps" })).toHaveAttribute("href", "https://maps.app.goo.gl/fLzqqbVNFxbpigTb8");

  const schemas = await page.locator('script[type="application/ld+json"]').evaluateAll((nodes) =>
    nodes.flatMap((node) => {
        const parsed = JSON.parse(node.textContent || "null");
        return Array.isArray(parsed) ? parsed : [parsed];
      })
  );
  const types = schemas.map((schema) => schema["@type"]);
  expect(types).toContain("WebPage");
  expect(types).toContain("BreadcrumbList");
  expect(types).toContain("ItemList");
  expect(types).toContain("InsuranceAgency");
});

test("professional profile displays the confirmed address and restricted Gran Mendoza service area", async ({ page }) => {
  await page.goto("/sobre-agustin-montes");
  await expect(page.getByRole("heading", { name: "Atención presencial en Luján de Cuyo" })).toBeVisible();
  await expect(page.locator("address")).toContainText("Av. San Martín Sur 6996");
  await expect(page.getByText(/Ciudad de Mendoza, Godoy Cruz, Guaymallén, Las Heras, Luján de Cuyo y Maipú/)).toBeVisible();
  const schemas = await page.locator('script[type="application/ld+json"]').evaluateAll((nodes) =>
    nodes.flatMap((node) => {
      const parsed = JSON.parse(node.textContent || "null");
      return Array.isArray(parsed) ? parsed : [parsed];
    })
  );
  const business = schemas.find((schema) => schema["@type"] === "InsuranceAgency");
  expect(business).toMatchObject({
    "@id": "https://cotizatuseguro.com.ar/#local-business",
    name: "Agustín Montes",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Av. San Martín Sur 6996",
      addressLocality: "Luján de Cuyo",
      addressRegion: "Mendoza",
      postalCode: "M5505",
      addressCountry: "AR"
    },
    areaServed: [
      { "@type": "AdministrativeArea", name: "Ciudad de Mendoza" },
      { "@type": "AdministrativeArea", name: "Godoy Cruz" },
      { "@type": "AdministrativeArea", name: "Guaymallén" },
      { "@type": "AdministrativeArea", name: "Las Heras" },
      { "@type": "AdministrativeArea", name: "Luján de Cuyo" },
      { "@type": "AdministrativeArea", name: "Maipú" }
    ]
  });
});
