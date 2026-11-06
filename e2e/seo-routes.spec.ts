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
