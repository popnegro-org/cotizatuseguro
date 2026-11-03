import { expect, test } from "@playwright/test";

const productLinks = [
  ["Auto", "/seguros/auto"],
  ["Moto", "/seguros/moto"],
  ["Hogar", "/seguros/hogar"],
  ["Consorcio", "/seguros/consorcio"],
  ["Bicicleta", "/seguros/bicicleta"],
  ["Caución alquiler", "/seguros/caucion-alquiler"]
] as const;

test("desktop navigation exposes all products and institutional destinations", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/");

  const navigation = page.getByRole("navigation", { name: "Navegación principal" });
  await expect(navigation).toBeVisible();
  await navigation.getByText("Seguros", { exact: true }).click();

  for (const [label, href] of productLinks) {
    const link = navigation.getByRole("link", { name: label, exact: true });
    await expect(link).toHaveAttribute("href", href);
    await expect(link).toBeVisible();
  }

  await expect(navigation.getByRole("link", { name: "Seguros en Mendoza" })).toHaveAttribute("href", "/seguros-en-mendoza");
  await expect(navigation.getByRole("link", { name: "Sobre Agustín" })).toHaveAttribute("href", "/sobre-agustin-montes");
  await expect(navigation.getByRole("link", { name: "Recursos" })).toHaveAttribute("href", "/recursos");

  const footerProducts = page.getByRole("navigation", { name: "Coberturas" });
  await expect(footerProducts.locator('a[href^="/seguros/"]')).toHaveCount(6);
  await expect(page.getByRole("navigation", { name: "Información y contacto" }).getByRole("link", { name: /solicitar cotización/i })).toHaveAttribute("href", "#cotizar");
});

test("mobile menu expands products, closes with Escape and restores focus", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/seguros/auto");

  const header = page.locator("header.site-header");
  const toggle = header.getByRole("button", { name: "Abrir menú" });
  await expect(toggle).toBeVisible();
  await toggle.click();
  await expect(toggle).toHaveAttribute("aria-expanded", "true");

  const navigation = page.getByRole("navigation", { name: "Menú móvil" });
  await navigation.getByText("Seguros", { exact: true }).click();
  const autoLink = navigation.getByRole("link", { name: "Auto", exact: true });
  await expect(autoLink).toHaveAttribute("aria-current", "page");

  await page.keyboard.press("Escape");
  await expect(header.getByRole("button", { name: "Abrir menú" })).toHaveAttribute("aria-expanded", "false");
  await expect(header.getByRole("button", { name: "Abrir menú" })).toBeFocused();

  await header.getByRole("button", { name: "Abrir menú" }).click();
  await page.getByRole("navigation", { name: "Menú móvil" }).getByText("Seguros", { exact: true }).click();
  await page.getByRole("navigation", { name: "Menú móvil" }).getByRole("link", { name: "Moto", exact: true }).click();
  await expect(page).toHaveURL(/\/seguros\/moto$/);
  await expect(page.getByRole("navigation", { name: "Menú móvil" })).toHaveCount(0);
});

test("shared header does not overflow at mobile, tablet and desktop breakpoints", async ({ page }) => {
  await page.goto("/");
  for (const width of [320, 375, 390, 560, 768, 900, 901, 1024, 1280]) {
    await page.setViewportSize({ width, height: 844 });
    const dimensions = await page.locator("header.site-header").evaluate((header) => ({
      clientWidth: header.clientWidth,
      scrollWidth: header.scrollWidth
    }));
    expect(dimensions.scrollWidth, "header overflow at " + width + "px").toBeLessThanOrEqual(dimensions.clientWidth);
  }
});
