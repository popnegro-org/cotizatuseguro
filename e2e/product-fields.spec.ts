import { expect, test, type Page } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => window.localStorage.setItem("analytics-consent", "rejected"));
});

const productCases = [
  { product: "auto", label: "Autos", requiredFields: ["auto-make", "auto-model", "auto-year"], forbiddenFields: ["hogar-homeSqm", "consorcio-constructionMaterial", "bicicleta-wheelSize", "caucion-monthlyRent"] },
  { product: "moto", label: "Motos", requiredFields: ["moto-make", "moto-model", "moto-year"], forbiddenFields: ["hogar-homeSqm", "consorcio-constructionMaterial", "bicicleta-wheelSize", "caucion-monthlyRent"] },
  { product: "hogar", label: "Hogar", requiredFields: ["hogar-occupancy"], forbiddenFields: ["auto-make", "consorcio-constructionMaterial", "bicicleta-wheelSize", "caucion-monthlyRent"] },
  { product: "consorcio", label: "Consorcio", requiredFields: ["consorcio-homeSqm", "consorcio-constructionMaterial", "consorcio-activity"], forbiddenFields: ["auto-make", "hogar-occupancy", "bicicleta-wheelSize", "caucion-monthlyRent"] },
  { product: "bicicleta", label: "Bicicleta", requiredFields: ["bicicleta-make", "bicicleta-model", "bicicleta-year", "bicicleta-wheelSize", "bicicleta-bikeMaterial", "bicicleta-insuredAmount"], forbiddenFields: ["hogar-homeSqm", "consorcio-constructionMaterial", "caucion-monthlyRent"] },
  { product: "caucion_alquiler", label: "Caución alquiler", requiredFields: ["caucion-monthlyRent", "caucion-contractDuration"], forbiddenFields: ["auto-make", "hogar-homeSqm", "consorcio-constructionMaterial", "bicicleta-wheelSize"] }
] as const;

const riskValues: Record<string, string> = {
  "auto-make": "Toyota", "auto-model": "Corolla", "auto-year": "2022",
  "moto-make": "Honda", "moto-model": "Wave", "moto-year": "2021",
  "hogar-occupancy": "propia", "hogar-rooms": "3",
  "consorcio-homeSqm": "450", "consorcio-constructionMaterial": "Hormigón", "consorcio-activity": "Residencial",
  "bicicleta-make": "Trek", "bicicleta-model": "Marlin", "bicicleta-year": "2023",
  "bicicleta-wheelSize": "29", "bicicleta-bikeMaterial": "Aluminio", "bicicleta-insuredAmount": "1200000",
  "caucion-monthlyRent": "450000", "caucion-contractDuration": "24"
};

async function fillRiskFields(page: Page, fields: readonly string[]) {
  for (const id of fields) {
    const locator = page.locator("#" + id);
    const value = riskValues[id];
    if (await locator.evaluate((el: HTMLElement) => el.tagName === "SELECT")) await locator.selectOption(value);
    else await locator.fill(value);
  }
}

for (const productCase of productCases) {
  test("el producto " + productCase.label + " muestra sus campos en el paso Tu seguro", async ({ page }) => {
    let leadApiCalls = 0;
    await page.route("**/api/leads", async (route) => {
      leadApiCalls += 1;
      await route.fulfill({ status: 500, contentType: "application/json", body: JSON.stringify({ error: "blocked in product field test" }) });
    });
    await page.goto("/");
    await page.locator("#cotizar").scrollIntoViewIfNeeded();
    await page.getByLabel("Tipo de seguro *").selectOption(productCase.product);
    for (const fieldId of productCase.requiredFields) {
      await expect(page.locator("#" + fieldId)).toBeVisible();
    }
    for (const fieldId of productCase.forbiddenFields) {
      await expect(page.locator("#" + fieldId)).toHaveCount(0);
    }
    await expect(page.locator("#name")).toHaveCount(0);
    await expect(page.locator("#phone")).toHaveCount(0);
    await fillRiskFields(page, productCase.requiredFields);
    if (productCase.product === "hogar") await page.locator("#hogar-rooms").fill("3");
    await page.getByRole("button", { name: "Continuar" }).click();
    await expect(page.getByLabel("Nombre y apellido *")).toBeVisible();
    await expect(page.getByLabel("WhatsApp *")).toBeVisible();
    await expect(page.locator("#" + productCase.requiredFields[0])).toHaveCount(0);
    await expect(page.getByRole("button", { name: "Enviar y continuar por WhatsApp" })).toBeVisible();
    expect(leadApiCalls).toBe(0);
  });
}

for (const productCase of productCases) {
  test("el formulario de " + productCase.label + " no desborda en móvil (320 y 390 px)", async ({ page }) => {
    for (const width of [320, 390]) {
      await page.setViewportSize({ width, height: 844 });
      await page.goto("/");
      await page.locator("#cotizar").scrollIntoViewIfNeeded();
      await page.getByLabel("Tipo de seguro *").selectOption(productCase.product);
      const dimensions = await page.evaluate(() => ({
        viewport: document.documentElement.clientWidth,
        document: document.documentElement.scrollWidth
      }));
      expect(dimensions.document).toBeLessThanOrEqual(dimensions.viewport);
      await expect(page.locator("#" + productCase.requiredFields[0])).toBeVisible();
    }
  });
}

test("la solicitud conserva atribución UTM y gclid al registrar el lead", async ({ page }) => {
  let capturedPayload: Record<string, unknown> | null = null;
  await page.route("**/api/leads", async (route) => {
    capturedPayload = route.request().postDataJSON();
    await route.fulfill({ status: 201, contentType: "application/json", body: JSON.stringify({ ok: true, requestId: "SOL-QA123456" }) });
  });
  await page.route("https://wa.me/**", async (route) => {
    await route.fulfill({ status: 200, contentType: "text/html", body: "<title>WhatsApp navigation intercepted by Playwright</title>" });
  });
  await page.goto("/?utm_source=qa-source&utm_medium=qa-medium&utm_campaign=pmv-regression&utm_content=cta-form&utm_term=seguro-auto&gclid=GCLID-QA-123");
  await page.locator("#cotizar").scrollIntoViewIfNeeded();
  await fillRiskFields(page, ["auto-make", "auto-model", "auto-year"]);
  await page.getByRole("button", { name: "Continuar" }).click();
  await page.getByLabel("Nombre y apellido *").fill("QA Atribución");
  await page.getByLabel("WhatsApp *").fill("+54 261 555 0101");
  await page.getByLabel("Provincia *").fill("Mendoza");
  await page.getByLabel("Localidad o departamento *").fill("Godoy Cruz");
  await page.getByRole("checkbox").check();
  await page.getByRole("button", { name: "Enviar y continuar por WhatsApp" }).click();
  await expect.poll(() => capturedPayload).not.toBeNull();
  const payload = capturedPayload as unknown as { attribution: Record<string, string>; email: string };
  expect(payload.email).toBe("");
  expect(payload.attribution).toMatchObject({
    utm_source: "qa-source", utm_medium: "qa-medium", utm_campaign: "pmv-regression",
    utm_content: "cta-form", utm_term: "seguro-auto", gclid: "GCLID-QA-123"
  });
  await expect(page).toHaveURL(/https:\/\/wa\.me\//);
});

test("cambiar producto en Tu seguro reinicia los campos del riesgo", async ({ page }) => {
  await page.goto("/?producto=auto");
  await page.locator("#cotizar").scrollIntoViewIfNeeded();
  await page.locator("#auto-make").fill("Fiat");
  await page.locator("#auto-model").fill("Cronos");
  await page.locator("#auto-year").fill("2020");
  await page.locator("#product").selectOption("hogar");
  await expect(page.locator("#hogar-homeSqm")).toBeVisible();
  await expect(page.locator("#hogar-homeSqm")).toHaveValue("");
  await expect(page.locator("#auto-make")).toHaveCount(0);
  await page.locator("#hogar-rooms").fill("3");
  await page.locator("#hogar-occupancy").selectOption("propia");
  await page.getByRole("button", { name: "Continuar" }).click();
  await expect(page.getByLabel("Nombre y apellido *")).toBeVisible();
});

test("honeypot está oculto y no es obligatorio", async ({ page }) => {
  await page.goto("/");
  await page.locator("#cotizar").scrollIntoViewIfNeeded();
  const honeypot = page.locator("#website");
  const wrapper = page.locator(".honeypot-field");
  await expect(honeypot).toHaveCount(1);
  await expect(honeypot).toHaveAttribute("tabindex", "-1");
  await expect(honeypot).toHaveAttribute("autocomplete", "off");
  await expect(honeypot).not.toHaveAttribute("required", "");
  await expect(wrapper).toHaveAttribute("aria-hidden", "true");
  await expect(wrapper).not.toContainText(/dejá este campo vacío/i);
});
