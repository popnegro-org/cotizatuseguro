import { expect, test, type Page } from "@playwright/test";

declare global {
  interface Window { __metaCalls?: unknown[][]; }
}

async function waitForConsentBanner(page: Page) {
  await expect(page.getByLabel("Preferencias de privacidad")).toBeVisible({ timeout: 5000 });
}

async function completeAutoRisk(page: Page) {
  await page.getByLabel("Tipo de seguro *").selectOption("auto");
  await page.getByLabel("Marca *").fill("Toyota");
  await page.getByLabel("Modelo *").fill("Etios");
  await page.getByLabel("Año *").fill("2022");
}

test("landing presenta el flujo de dos pasos en orden riesgo y contacto", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Cotizá tu seguro con un asesor real" })).toBeVisible();
  await expect(page.getByText("PRODUCTOR ASESOR · MENDOZA")).toBeVisible();
  await expect(page.getByText("Te respondo personalmente por WhatsApp. Sin tarifa automática en la web.")).toBeVisible();
  await expect(page.getByText("Sin tarifa automática", { exact: true })).toBeVisible();
  await expect(page.locator("#cotizar")).toBeVisible();
  await expect(page.locator("#seguros .coverage-card")).toHaveCount(6);
  await expect(page.locator("#aseguradoras .company-chip")).toHaveCount(7);
  await expect(page.getByRole("list", { name: "Progreso del formulario" })).toBeVisible();
  await expect(page.getByText("1. Tu seguro")).toBeVisible();
  await expect(page.getByText("2. Tus datos")).toBeVisible();
  await expect(page.getByLabel("Tipo de seguro *")).toBeVisible();
  await expect(page.getByLabel("Marca *")).toBeVisible();
  await expect(page.locator("#name")).toHaveCount(0);
  await expect(page.locator("#phone")).toHaveCount(0);
  await expect(page.locator("#email")).toHaveCount(0);
  await expect(page.locator("#province")).toHaveCount(0);
  await expect(page.locator("#city")).toHaveCount(0);
  await expect(page.getByRole("button", { name: "Continuar" })).toBeVisible();
  await expect(page.locator("#como-funciona")).toHaveCount(0);
  await expect(page.getByText("Completá los datos del bien. En el siguiente paso completás tus datos de contacto, provincia y localidad.", { exact: true })).toHaveCount(0);
});

test("el formulario simplifica Auto, conserva Uso para Moto y muestra SmartWeb en el footer", async ({ page }) => {
  await page.goto("/");
  await page.getByLabel("Tipo de seguro *").selectOption("auto");
  await expect(page.getByLabel("Uso (opcional)")).toHaveCount(0);
  await page.getByLabel("Tipo de seguro *").selectOption("moto");
  await expect(page.getByLabel("Uso (opcional)")).toBeVisible();

  const smartWeb = page.locator(".footer-bottom-links a", { hasText: "Powered by SmartWeb" });
  await expect(smartWeb).toHaveAttribute("href", "https://wa.me/5492616706710");
  await expect(smartWeb).toHaveAttribute("target", "_blank");
  await expect(smartWeb).toHaveAttribute("rel", "noopener noreferrer");
  await expect(page.locator(".footer-bottom-links").getByRole("link", { name: "Política de privacidad" })).toBeVisible();
});

test("rechazar consentimiento mantiene bloqueadas las etiquetas de medición", async ({ page }) => {
  const analyticsRequests: string[] = [];
  page.on("request", (request) => {
    if (/googletagmanager\.com|google-analytics\.com|connect\.facebook\.net|facebook\.com\/tr/i.test(request.url())) analyticsRequests.push(request.url());
  });
  await page.goto("/");
  await waitForConsentBanner(page);
  await page.getByRole("button", { name: "Rechazar" }).click();
  await expect(page.getByLabel("Preferencias de privacidad")).toHaveCount(0);
  await page.waitForTimeout(500);
  expect(analyticsRequests).toEqual([]);
  expect(await page.evaluate(() => localStorage.getItem("analytics-consent"))).toBe("rejected");
});

test("aceptar consentimiento carga Meta Pixel y encola PageView", async ({ page }) => {
  await page.route("https://connect.facebook.net/en_US/fbevents.js", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/javascript",
      body: "window.__metaCalls = window.fbq?.queue?.map((args) => [...args]) || []; if (window.fbq) { window.fbq.callMethod = (...args) => window.__metaCalls.push(args); window.fbq.queue = []; }"
    });
  });
  await page.goto("/");
  await waitForConsentBanner(page);
  await page.getByRole("button", { name: "Aceptar" }).click();
  await expect(page.getByLabel("Preferencias de privacidad")).toHaveCount(0);
  await expect(page.locator("#meta-pixel-loader")).toHaveCount(1);
  await expect.poll(async () => page.evaluate(() => window.__metaCalls?.length || 0)).toBeGreaterThanOrEqual(2);
});

test("el paso 1 valida el riesgo y no envía leads incompletos", async ({ page }) => {
  let leadApiCalls = 0;
  await page.route("**/api/leads", async (route) => {
    leadApiCalls += 1;
    await route.fulfill({ status: 500, contentType: "application/json", body: JSON.stringify({ error: "blocked in test" }) });
  });
  await page.goto("/");
  await page.locator("#cotizar").scrollIntoViewIfNeeded();
  await page.getByRole("button", { name: "Continuar" }).click();
  await expect(page.getByRole("alert").first()).toContainText("datos del riesgo");
  await expect(page.getByLabel("Marca *")).toBeFocused();
  expect(leadApiCalls).toBe(0);
});

test("el paso 2 pide contacto, provincia y localidad, y permite omitir email", async ({ page }) => {
  let leadPayload: Record<string, unknown> | undefined;
  await page.route("**/api/leads", async (route) => {
    leadPayload = route.request().postDataJSON();
    await route.fulfill({ status: 201, contentType: "application/json", body: JSON.stringify({ ok: true, requestId: "SOL-QA123456" }) });
  });
  await page.route("https://wa.me/**", async (route) => {
    await route.fulfill({ status: 200, contentType: "text/html", body: "<title>WhatsApp intercepted</title>" });
  });

  await page.goto("/");
  await page.locator("#cotizar").scrollIntoViewIfNeeded();
  await completeAutoRisk(page);
  await page.getByRole("button", { name: "Continuar" }).click();

  await expect(page.locator("#quote-form-title")).toBeFocused();
  await expect(page.getByRole("heading", { name: "¿Cómo te contactamos?" })).toBeVisible();
  await expect(page.getByText("Te abro WhatsApp con el resumen de tu solicitud.", { exact: true })).toBeVisible();
  await expect(page.getByText("Dejás tu nombre, WhatsApp, provincia y localidad para que podamos responderte.")).toBeVisible();
  await expect(page.getByLabel("Nombre y apellido *")).toBeVisible();
  await expect(page.getByLabel("WhatsApp *")).toBeVisible();
  await expect(page.getByLabel("Email (opcional)")).toBeVisible();
  await expect(page.getByLabel("Provincia *")).toBeVisible();
  await expect(page.locator("#province")).toHaveJSProperty("tagName", "SELECT");
  await expect(page.locator("#province option")).toHaveCount(25);
  await expect(page.getByLabel("Localidad o departamento *")).toBeVisible();
  await expect(page.locator("#phone")).toHaveAttribute("inputmode", "tel");
  await expect(page.locator("#email")).toHaveAttribute("inputmode", "email");

  await page.getByLabel("Nombre y apellido *").fill("QA Playwright");
  await page.getByLabel("WhatsApp *").fill("+54 261 555 0101");
  await page.getByLabel("Provincia *").selectOption("Mendoza");
  await page.getByLabel("Localidad o departamento *").fill("Godoy Cruz");
  await page.getByRole("checkbox").check();
  await page.getByRole("button", { name: "Enviar y continuar por WhatsApp" }).click();

  await expect.poll(() => leadPayload).toBeTruthy();
  expect(leadPayload).toMatchObject({
    name: "QA Playwright",
    email: "",
    phone: "542615550101",
    province: "Mendoza",
    city: "Godoy Cruz",
    product: "auto",
    website: ""
  });

  await expect(page).toHaveURL(/https:\/\/wa\.me\//);
  const message = new URL(page.url()).searchParams.get("text") || "";
  expect(message).toContain("Hola Agustín, completé el formulario de Auto.");
  expect(message).toContain("Toyota");
  expect(message).toContain("Etios");
  expect(message).toContain("Quedo atento a tu cotización. Gracias!");
});

test("el honeypot no tiene texto visible ni entra en el orden de foco", async ({ page }) => {
  await page.goto("/");
  const wrapper = page.locator(".honeypot-field");
  const honeypot = page.locator("#website");
  await expect(wrapper).toHaveAttribute("aria-hidden", "true");
  await expect(honeypot).toHaveAttribute("tabindex", "-1");
  await expect(honeypot).toHaveAttribute("autocomplete", "off");
  await expect(wrapper).not.toContainText(/dejá este campo vacío/i);
  const position = await wrapper.evaluate((element) => getComputedStyle(element).position);
  expect(position).toBe("absolute");
  const clip = await wrapper.evaluate((element) => getComputedStyle(element).clip);
  expect(clip).toBe("rect(0px, 0px, 0px, 0px)");
});

test("hogar acepta metros o ambientes y solicita provincia y localidad en el paso 2", async ({ page }) => {
  await page.goto("/");
  await page.locator("#cotizar").scrollIntoViewIfNeeded();
  await page.getByLabel("Tipo de seguro *").selectOption("hogar");
  await page.getByLabel("Ambientes (opcional)").fill("3");
  await page.getByLabel("La vivienda es *").selectOption("propia");
  await page.getByRole("button", { name: "Continuar" }).click();
  await expect(page.getByLabel("Provincia *")).toBeVisible();
  await expect(page.locator("#province")).toHaveJSProperty("tagName", "SELECT");
  await expect(page.locator("#province option")).toHaveCount(25);
  await expect(page.getByLabel("Localidad o departamento *")).toBeVisible();
});

test("el stepper y el botón permanecen accesibles en mobile", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await waitForConsentBanner(page);
  await page.getByRole("button", { name: "Rechazar" }).click();
  await page.locator("#cotizar").scrollIntoViewIfNeeded();
  const progress = page.getByRole("list", { name: "Progreso del formulario" });
  await expect(progress.locator('[aria-current="step"]')).toHaveText("1. Tu seguro");
  const progressPosition = await progress.evaluate((element) => getComputedStyle(element).position);
  expect(progressPosition).toBe("sticky");
  const stickyPosition = await page.locator(".form-actions").evaluate((element) => getComputedStyle(element).position);
  expect(stickyPosition).toBe("sticky");
  await completeAutoRisk(page);
  await page.getByRole("button", { name: "Continuar" }).click();
  await expect(progress.locator('[aria-current="step"]')).toHaveText("2. Tus datos");
  await expect(page.locator("#quote-form-title")).toBeFocused();
  await expect(page.getByRole("button", { name: "Enviar y continuar por WhatsApp" })).toBeVisible();

  // Simulate the viewport reduction caused by an on-screen keyboard on mobile.
  await page.setViewportSize({ width: 390, height: 500 });
  await page.getByLabel("WhatsApp *").scrollIntoViewIfNeeded();
  await page.getByLabel("WhatsApp *").focus();
  const stickyButton = page.getByRole("button", { name: "Enviar y continuar por WhatsApp" });
  await expect(stickyButton).toBeVisible();
  const buttonBox = await stickyButton.boundingBox();
  expect(buttonBox).not.toBeNull();
  expect(buttonBox!.y + buttonBox!.height).toBeLessThanOrEqual(500);

  await page.setViewportSize({ width: 320, height: 844 });
  await expect(page.locator(".form-actions .button-secondary")).toBeVisible();
  const narrowViewport = await page.evaluate(() => ({
    viewport: window.innerWidth,
    document: document.documentElement.scrollWidth,
    actionRight: document.querySelector(".form-actions")!.getBoundingClientRect().right
  }));
  expect(narrowViewport.document).toBe(narrowViewport.viewport);
  expect(narrowViewport.actionRight).toBeLessThanOrEqual(narrowViewport.viewport);
});

test("la pagina de privacidad se abre y contiene informacion de tratamiento", async ({ page }) => {
  await page.goto("/privacidad");
  await expect(page.locator("body")).toContainText(/privacidad|datos personales|cotización/i);
  await expect(page.locator(".legal-shell")).toBeVisible();
  await expect(page.locator("header.site-header")).toBeVisible();
  await expect(page.locator("footer.site-footer")).toBeVisible();
  await expect(page.getByRole("heading", { name: /política de privacidad/i })).toBeVisible();
  await expect(page.getByRole("navigation", { name: "Navegación principal" })).toBeVisible();
});

test("la navegación compartida no desborda en móvil", async ({ page }) => {
  for (const width of [320, 390, 560, 768, 900, 901, 1024]) {
    await page.setViewportSize({ width, height: 844 });
    await page.goto("/");
    const dimensions = await page.evaluate(() => ({
      viewport: document.documentElement.clientWidth,
      document: document.documentElement.scrollWidth,
      header: document.querySelector("header.site-header")?.scrollWidth ?? 0
    }));
    expect(dimensions.document).toBeLessThanOrEqual(dimensions.viewport);
    expect(dimensions.header).toBeLessThanOrEqual(dimensions.viewport);
  }
});


test("el formulario principal está integrado en la columna derecha del hero", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  const hero = page.locator(".hero");
  const form = page.locator("#cotizar");
  await expect(form).toHaveClass(/quote-hero/);
  await expect(hero.locator("#cotizar")).toBeVisible();
  await expect(page.locator("main > #cotizar")).toHaveCount(0);
  await expect(page.locator(".quote-layout")).toHaveCount(0);
  const columns = await page.locator(".hero-grid").evaluate((element) => getComputedStyle(element).gridTemplateColumns.split(" ").length);
  expect(columns).toBe(2);
  await expect(page.getByLabel("Tipo de seguro *")).toBeVisible();
});

test("el consentimiento flota abajo a la izquierda en desktop y en el bottom en mobile", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  const banner = page.getByLabel("Preferencias de privacidad");
  await expect(banner).toBeVisible();
  let placement = await banner.evaluate((element) => {
    const rect = element.getBoundingClientRect();
    return { position: getComputedStyle(element).position, left: rect.left, right: window.innerWidth - rect.right, bottom: window.innerHeight - rect.bottom };
  });
  expect(placement.position).toBe("fixed");
  expect(placement.left).toBeLessThan(32);
  expect(placement.bottom).toBeGreaterThanOrEqual(20);
  expect(placement.bottom).toBeLessThanOrEqual(28);

  await page.setViewportSize({ width: 390, height: 844 });
  await page.waitForTimeout(0);
  placement = await banner.evaluate((element) => {
    const rect = element.getBoundingClientRect();
    return { position: getComputedStyle(element).position, left: rect.left, right: window.innerWidth - rect.right, bottom: window.innerHeight - rect.bottom };
  });
  expect(placement.position).toBe("fixed");
  expect(placement.left).toBeGreaterThanOrEqual(8);
  expect(placement.right).toBeGreaterThanOrEqual(8);
  expect(placement.bottom).toBeGreaterThanOrEqual(8);
  expect(placement.bottom).toBeLessThanOrEqual(40);

});

test("FAQ en una columna centrada y solo un collapse abierto", async ({ page }) => {
  await page.goto("/");
  const list = page.locator(".faq-list");
  const items = list.locator(":scope > details");
  await expect(items).toHaveCount(8);
  const tracks = await list.evaluate((element) => getComputedStyle(element).gridTemplateColumns.split(" ").length);
  expect(tracks).toBe(1);
  await expect(items.nth(0)).toHaveAttribute("open", "");
  await items.nth(1).locator("summary").click();
  await expect(items.nth(1)).toHaveAttribute("open", "");
  await expect(items.nth(0)).not.toHaveAttribute("open", "");
  await expect(page.getByText("La información de este sitio es orientativa.", { exact: false })).toHaveCount(0);
});
