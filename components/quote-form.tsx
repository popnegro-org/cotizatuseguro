"use client";

import { FormEvent, forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { products, type FormProductId } from "../content/site";
import { track, trackAndWait } from "../lib/analytics";

type Product = FormProductId;

type FormState = {
  name: string;
  email: string;
  phone: string;
  product: Product;
  make: string;
  model: string;
  year: string;
  version: string;
  usage: string;
  rooms: string;
  homeSqm: string;
  location: string;
  occupancy: string;
  constructionMaterial: string;
  activity: string;
  wheelSize: string;
  bikeMaterial: string;
  insuredAmount: string;
  monthlyRent: string;
  contractDuration: string;
  privacyAccepted: boolean;
};

const landingProducts = products.map((product) => ({
  id: product.formId,
  title: product.landingTitle
}));

const initialForm: FormState = {
  name: "", email: "", phone: "", product: "auto", make: "", model: "", year: "",
  version: "", usage: "", rooms: "", homeSqm: "", location: "", occupancy: "", constructionMaterial: "", activity: "", wheelSize: "",
  bikeMaterial: "", insuredAmount: "", monthlyRent: "", contractDuration: "", privacyAccepted: false
};

const emptyRiskFields = {
  make: "", model: "", year: "", version: "", usage: "", rooms: "", homeSqm: "", location: "", occupancy: "",
  constructionMaterial: "", activity: "", wheelSize: "", bikeMaterial: "",
  insuredAmount: "", monthlyRent: "", contractDuration: ""
};

export type QuoteFormHandle = {
  selectProduct: (product: Product) => void;
};

export const QuoteForm = forwardRef<QuoteFormHandle>(function QuoteForm(_props, ref) {
  const [form, setForm] = useState<FormState>(initialForm);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [formStep, setFormStep] = useState<1 | 2>(1);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});


  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const p = params.get("producto");
    if (p && ["auto", "moto", "hogar", "consorcio", "bicicleta", "bicicletas", "caucion_alquiler"].includes(p)) {
      const normalized = (p === "bicicletas" ? "bicicleta" : p) as Product;
      setForm((current) => ({ ...current, product: normalized }));
    }
  }, []);

  function selectProduct(product: Product) {
    setForm((current) => ({ ...current, product, ...emptyRiskFields }));
    setFieldErrors({});
    setError("");
    track("insurance_product_select", { insurance_product: product });
  }

  function chooseProduct(product: Product) {
    selectProduct(product);
    document.getElementById("cotizar")?.scrollIntoView({ behavior: "smooth" });
  }

  useImperativeHandle(ref, () => ({
    selectProduct: chooseProduct
  }));

  function validateRiskStep(): boolean {
    const errors: Record<string, string> = {};
    const required = form.product === "auto" || form.product === "moto"
      ? ["make", "model", "year"]
      : form.product === "hogar" ? ["occupancy"]
      : form.product === "consorcio" ? ["homeSqm", "constructionMaterial", "activity"]
      : form.product === "bicicleta" ? ["make", "model", "year", "wheelSize", "bikeMaterial", "insuredAmount"]
      : ["monthlyRent", "contractDuration"];
    for (const key of required) {
      if (!String(form[key as keyof FormState] ?? "").trim()) errors[key] = "Completá este dato para continuar.";
    }
    if (form.product === "hogar" && !form.homeSqm.trim() && !form.rooms.trim()) {
      errors.homeSqm = "Indicá los metros aproximados o la cantidad de ambientes.";
    }
    if (["auto", "moto", "bicicleta"].includes(form.product)) {
      const year = Number(form.year);
      if (!Number.isInteger(year) || year < 1900 || year > new Date().getFullYear() + 1) errors.year = "Ingresá un año válido.";
    }
    setFieldErrors(errors);
    const firstInvalid = Object.keys(errors)[0];
    if (firstInvalid) {
      const productFieldIds: Record<string, string> = {
        make: form.product + "-make", model: form.product + "-model", year: form.product + "-year",
        homeSqm: form.product + "-homeSqm", location: form.product + "-location",
        occupancy: "hogar-occupancy", constructionMaterial: "consorcio-constructionMaterial",
        activity: "consorcio-activity", wheelSize: "bicicleta-wheelSize",
        bikeMaterial: "bicicleta-bikeMaterial", insuredAmount: "bicicleta-insuredAmount",
        monthlyRent: "caucion-monthlyRent", contractDuration: "caucion-contractDuration"
      };
      const id = productFieldIds[firstInvalid] || firstInvalid;
      window.setTimeout(() => document.getElementById(id)?.focus(), 0);
    }
    return Object.keys(errors).length === 0;
  }

  function goToStep2() {
    setError("");
    if (!validateRiskStep()) {
      setError("Revisá los datos del riesgo para continuar.");
      return;
    }
    setFormStep(2);
    window.setTimeout(() => document.getElementById("quote-form-title")?.focus(), 0);
    track("form_step", { form_step: "2", insurance_product: form.product });
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSuccess("");
    if (formStep === 1) {
      goToStep2();
      return;
    }
    const contactErrors: Record<string, string> = {};
    if (!form.name.trim() || form.name.trim().split(/\s+/).length < 2) contactErrors.name = "Ingresá nombre y apellido.";
    const digits = form.phone.replace(/\D/g, "");
    if (digits.length < 8 || digits.length > 15) contactErrors.phone = "Ingresá un WhatsApp válido (8 a 15 dígitos).";
    if (form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) contactErrors.email = "Ingresá un email válido.";
    if (Object.keys(contactErrors).length) {
      setFieldErrors(contactErrors);
      setError("Revisá tus datos de contacto para continuar.");
      const firstInvalid = Object.keys(contactErrors)[0];
      window.setTimeout(() => document.getElementById(firstInvalid)?.focus(), 0);
      return;
    }
    if (!event.currentTarget.checkValidity()) {
      event.currentTarget.reportValidity();
      return;
    }
    if (!form.privacyAccepted) {
      setFieldErrors((prev) => ({ ...prev, privacy: "Confirmá la política de privacidad." }));
      setError("Leé la información de privacidad y confirmá para continuar.");
      window.setTimeout(() => document.getElementById("privacyAccepted")?.focus(), 0);
      return;
    }
    setFieldErrors({});
    setBusy(true);
    track("form_submit", { insurance_product: form.product });
    try {
      const honeypot = new FormData(event.currentTarget).get("website");
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          website: typeof honeypot === "string" ? honeypot : "",
          name: form.name,
          email: form.email.trim(),
          phone: form.phone.replace(/\D/g, ""),
          product: form.product,
          details:
            form.product === "auto" || form.product === "moto"
              ? { make: form.make, model: form.model, year: form.year, version: form.version, usage: form.usage }
              : form.product === "hogar"
                ? { homeSqm: form.homeSqm, rooms: form.rooms, location: form.location, occupancy: form.occupancy }
                : form.product === "consorcio"
                  ? {
                      homeSqm: form.homeSqm,
                      location: form.location,
                      constructionMaterial: form.constructionMaterial,
                      activity: form.activity
                    }
                  : form.product === "bicicleta"
                    ? {
                        make: form.make,
                        model: form.model,
                        year: form.year,
                        wheelSize: form.wheelSize,
                        bikeMaterial: form.bikeMaterial,
                        insuredAmount: form.insuredAmount
                      }
                    : form.product === "caucion_alquiler"
                      ? { monthlyRent: form.monthlyRent, contractDuration: form.contractDuration }
                      : {},
          attribution: (() => {
            const params = new URLSearchParams(window.location.search);
            const entries: Record<string, string> = {};
            for (const key of ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "gclid", "fbclid"]) {
              entries[key] = params.get(key) || "";
            }
            try {
              entries.page_url = window.location.origin + window.location.pathname;
            } catch {
            }
            try {
              const cookies = document.cookie.split(";").map((c) => c.trim());
              for (const name of ["_fbp", "_fbc"]) {
                const found = cookies.find((c) => c.startsWith(name + "="));
                if (found) entries[name] = decodeURIComponent(found.slice(name.length + 1));
              }
            } catch {
            }
            return entries;
          })()
        })
      });
      const data = await response.json();
      if (!response.ok) {
        if (data.fieldErrors && typeof data.fieldErrors === "object") {
          const mapped: Record<string, string> = {};
          for (const [key, message] of Object.entries(data.fieldErrors as Record<string, string>)) {
            const short = key.includes(".") ? key.split(".").pop()! : key;
            mapped[short] = message;
          }
          setFieldErrors(mapped);
        }
        throw new Error(data.error || "No pudimos registrar tu solicitud. Intentá nuevamente.");
      }
      track("generate_lead", { insurance_product: form.product, event_id: data.requestId || "" });
      const number = process.env.NEXT_PUBLIC_WHATSAPP_BUSINESS_NUMBER;
      if (!number) {
        setSuccess("Recibimos tu solicitud. En breve te vamos a contactar para continuar con la cotización.");
        return;
      }
      setSuccess("Solicitud registrada. Ahora podés continuar por WhatsApp.");
      const productLabels: Record<Product, string> = { auto: "Auto", moto: "Moto", hogar: "Hogar", consorcio: "Consorcio", bicicleta: "Bicicleta", caucion_alquiler: "Caución alquiler" };
      const label = productLabels[form.product] || landingProducts.find((item) => item.id === form.product)?.title || form.product;
      const detailLabels: Record<string, string> = {
        make: "Marca",
        model: "Modelo",
        year: "Año",
        version: "Versión o tipo",
        usage: "Uso",
        rooms: "Ambientes",
        homeSqm: "Superficie cubierta (m²)",
        location: "Ubicación",
        occupancy: "Tipo de vivienda",
        constructionMaterial: "Material de construcción",
        activity: "Actividad",
        wheelSize: "Rodado",
        bikeMaterial: "Material de la bicicleta",
        insuredAmount: "Suma asegurada (ARS)",
        monthlyRent: "Alquiler mensual (ARS)",
        contractDuration: "Duración del contrato (meses)"
      };
      const detailsByProduct =
        form.product === "auto" || form.product === "moto"
          ? { make: form.make, model: form.model, year: form.year, version: form.version, usage: form.usage }
          : form.product === "hogar"
            ? { homeSqm: form.homeSqm, rooms: form.rooms, location: form.location, occupancy: form.occupancy }
            : form.product === "consorcio"
              ? {
                  homeSqm: form.homeSqm,
                  location: form.location,
                  constructionMaterial: form.constructionMaterial,
                  activity: form.activity
                }
              : form.product === "bicicleta"
                ? {
                    make: form.make,
                    model: form.model,
                    year: form.year,
                    wheelSize: form.wheelSize,
                    bikeMaterial: form.bikeMaterial,
                    insuredAmount: form.insuredAmount
                  }
                : form.product === "caucion_alquiler"
                  ? { monthlyRent: form.monthlyRent, contractDuration: form.contractDuration }
                  : {};
      const detailLines = Object.entries(detailsByProduct)
        .filter(([, value]) => String(value ?? "").trim() !== "")
        .map(([key, value]) => `• ${detailLabels[key] || key}: ${value}`);
      const messageLines = [
        "Hola Agustín, completé el formulario de " + label + ".",
        ...(detailLines.length ? detailLines : ["Resumen del riesgo: pendiente de ampliar."]),
        "Quedo atento a tu cotización. Gracias!"
      ];
      const message = encodeURIComponent(messageLines.join("\n"));
      await trackAndWait("whatsapp_click", { insurance_product: form.product });
      window.location.href = `https://wa.me/${number.replace(/[^0-9]/g, "")}?text=${message}`;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ocurrió un error inesperado. Intentá nuevamente.");
    } finally {
      setBusy(false);
    }
  }

  return (
        <section className="section section-soft" id="cotizar"><div className="container quote-layout">
          <aside className="quote-aside">
            <span className="eyebrow">Solicitud de cotización</span>
            <h2>Empecemos por lo importante.</h2>
            <p>Completá los datos solicitados para registrar tu consulta. El asesor confirmará los pasos siguientes y las alternativas disponibles.</p>
            <ul>
              <li>Datos iniciales, sin documentación innecesaria.</li>
              <li>Producto identificado desde el inicio.</li>
              <li>Seguimiento comercial de tu solicitud.</li>
            </ul>
            <div className="quote-trust">
              <p><strong>Agustín Montes</strong> · Productor Asesor de Seguros</p>
              <p>Atención en Mendoza · Respuesta habitual en el día hábil</p>
              <p className="quote-trust-note">La cotización es personalizada: no hay precio automático en el sitio.</p>
            </div>
          </aside>
          <div className="quote-card">
            <span className="eyebrow">Formulario de cotización</span>
            <h2 id="quote-form-title" tabIndex={-1}>{formStep === 1 ? "¿Qué necesitás asegurar?" : "¿Cómo te contactamos?"}</h2>
            <ol className="form-stepper" aria-label="Progreso del formulario">
              <li>
                <span
                  className={formStep === 1 ? "step-pill is-active" : "step-pill is-done"}
                  aria-current={formStep === 1 ? "step" : undefined}
                  aria-label={formStep === 2 ? "1. Tu seguro, completado" : undefined}
                >
                  1. Tu seguro
                </span>
              </li>
              <li className="step-pill-sep" aria-hidden="true">→</li>
              <li>
                <span className={formStep === 2 ? "step-pill is-active" : "step-pill"} aria-current={formStep === 2 ? "step" : undefined}>
                  2. Tus datos
                </span>
              </li>
            </ol>
            <p className="help">{formStep === 1 ? "Completá los datos del bien. En el siguiente paso solo te pedimos WhatsApp." : "Te abro WhatsApp con el resumen de tu solicitud."}</p>
            {error && <div className="form-error" role="alert">{error}</div>}
            {success && <div className="form-success" role="status">{success}</div>}
            <form onSubmit={submit} noValidate>
              <div className="honeypot-field" aria-hidden="true"><input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" /></div>

              {formStep === 2 && (
              <fieldset className="form-grid">
                <legend className="sr-only">Paso 2: tus datos de contacto</legend>
                <div className={"field" + (fieldErrors.name ? " has-error" : "")}>
                  <label htmlFor="name">Nombre y apellido *</label>
                  <input id="name" name="name" required autoComplete="name" minLength={2} maxLength={100} value={form.name} onChange={(e) => { setForm({ ...form, name: e.target.value }); setFieldErrors((prev) => { const n = { ...prev }; delete n.name; return n; }); }} aria-invalid={!!fieldErrors.name} aria-describedby={fieldErrors.name ? "err-name" : undefined} />
                  {fieldErrors.name && <span className="field-error" id="err-name">{fieldErrors.name}</span>}
                </div>
                <div className={"field" + (fieldErrors.phone ? " has-error" : "")}>
                  <label htmlFor="phone">WhatsApp *</label>
                  <input id="phone" name="phone" type="tel" required autoComplete="tel" inputMode="tel" minLength={8} maxLength={30} placeholder="Ej. 261 555 1234" value={form.phone} onChange={(e) => { setForm({ ...form, phone: e.target.value }); setFieldErrors((prev) => { const n = { ...prev }; delete n.phone; return n; }); }} aria-invalid={!!fieldErrors.phone} aria-describedby={fieldErrors.phone ? "err-phone" : undefined} />
                  {fieldErrors.phone && <span className="field-error" id="err-phone">{fieldErrors.phone}</span>}
                </div>
                <div className={"field field-full" + (fieldErrors.email ? " has-error" : "")}>
                  <label htmlFor="email">Email (opcional)</label>
                  <input id="email" name="email" type="email" inputMode="email" autoComplete="email" maxLength={254} value={form.email} onChange={(e) => { setForm({ ...form, email: e.target.value }); setFieldErrors((prev) => { const n = { ...prev }; delete n.email; return n; }); }} aria-invalid={!!fieldErrors.email} aria-describedby={fieldErrors.email ? "err-email" : undefined} />
                  {fieldErrors.email && <span className="field-error" id="err-email">{fieldErrors.email}</span>}
                </div>
                <div className={"field field-full" + (fieldErrors.privacy ? " has-error" : "")}>
                  <label className="consent-row">
                    <input id="privacyAccepted" name="privacyAccepted" type="checkbox" checked={form.privacyAccepted} onChange={(e) => { setForm({ ...form, privacyAccepted: e.target.checked }); setFieldErrors((prev) => { const n = { ...prev }; delete n.privacy; return n; }); }} aria-invalid={!!fieldErrors.privacy} aria-describedby={fieldErrors.privacy ? "err-privacy" : undefined} required />
                    <span>Leí la <a href="/privacidad" target="_blank" rel="noreferrer">política de privacidad</a> y solicito que utilicen estos datos para gestionar mi cotización.</span>
                  </label>
                  {fieldErrors.privacy && <span className="field-error" id="err-privacy" role="alert">{fieldErrors.privacy}</span>}
                </div>
              </fieldset>
              )}

              {formStep === 1 && (
              <fieldset className="form-grid">
                <legend className="sr-only">Paso 1: datos del riesgo</legend>
                <div className="field field-full">
                  <label htmlFor="product">Tipo de seguro *</label>
                  <select id="product" value={form.product} onChange={(e) => selectProduct(e.target.value as Product)}>
                    {landingProducts.map((p) => <option value={p.id} key={p.id}>{p.title}</option>)}
                  </select>
                </div>
                {(form.product === "auto" || form.product === "moto") && <>
                  <div className="field"><label htmlFor={`${form.product}-make`}>Marca *</label><input id={`${form.product}-make`} name="make" required maxLength={80} value={form.make} onChange={(e) => setForm({ ...form, make: e.target.value })} aria-required="true" /></div>
                  <div className="field"><label htmlFor={`${form.product}-model`}>Modelo *</label><input id={`${form.product}-model`} name="model" required maxLength={80} value={form.model} onChange={(e) => setForm({ ...form, model: e.target.value })} aria-required="true" /></div>
                  <div className="field"><label htmlFor={`${form.product}-year`}>Año *</label><input id={`${form.product}-year`} name="year" required type="number" min="1900" max={new Date().getFullYear()+1} value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })} aria-required="true" /></div>
                  <div className="field"><label htmlFor={form.product + "-version"}>Versión o tipo (opcional)</label><input id={form.product + "-version"} name="version" maxLength={100} value={form.version} onChange={(e) => setForm({ ...form, version: e.target.value })} /></div>
                  <div className="field"><label htmlFor={form.product + "-usage"}>Uso (opcional)</label><select id={form.product + "-usage"} name="usage" value={form.usage} onChange={(e) => setForm({ ...form, usage: e.target.value })}><option value="">Seleccioná una opción</option><option value="particular">Particular</option><option value="comercial">Comercial</option></select></div>
                </>}
                {form.product === "hogar" && <>
                  <div className="field"><label htmlFor="hogar-homeSqm">Metros aproximados (opcional)</label><input id="hogar-homeSqm" name="homeSqm" type="number" min="1" step="1" value={form.homeSqm} onChange={(e) => setForm({ ...form, homeSqm: e.target.value })} aria-required="true" /></div>
                  <div className="field"><label htmlFor="hogar-location">Localidad (opcional)</label><input id="hogar-location" name="location" maxLength={160} value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} aria-required="true" /></div>
                  <div className="field"><label htmlFor="hogar-rooms">Ambientes (opcional)</label><input id="hogar-rooms" name="rooms" type="number" min="1" max="30" value={form.rooms} onChange={(e) => setForm({ ...form, rooms: e.target.value })} /></div>
                  <div className="field"><label htmlFor="hogar-occupancy">La vivienda es *</label><select id="hogar-occupancy" name="occupancy" required value={form.occupancy} onChange={(e) => setForm({ ...form, occupancy: e.target.value })} aria-required="true"><option value="">Seleccioná una opción</option><option value="propia">Propia</option><option value="alquiler">Alquiler</option></select></div>
                </>}
                {form.product === "consorcio" && <>
                  <div className="field"><label htmlFor="consorcio-homeSqm">Metros aproximados *</label><input id="consorcio-homeSqm" name="homeSqm" required type="number" min="1" step="1" value={form.homeSqm} onChange={(e) => setForm({ ...form, homeSqm: e.target.value })} aria-required="true" /></div>
                  <div className="field"><label htmlFor="consorcio-location">Localidad (opcional)</label><input id="consorcio-location" name="location" maxLength={160} value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} aria-required="true" /></div>
                  <div className="field"><label htmlFor="consorcio-constructionMaterial">Material de construcción *</label><input id="consorcio-constructionMaterial" name="constructionMaterial" required maxLength={100} value={form.constructionMaterial} onChange={(e) => setForm({ ...form, constructionMaterial: e.target.value })} aria-required="true" /></div>
                  <div className="field"><label htmlFor="consorcio-activity">Actividad *</label><input id="consorcio-activity" name="activity" required maxLength={120} value={form.activity} onChange={(e) => setForm({ ...form, activity: e.target.value })} aria-required="true" /></div>
                </>}
                {form.product === "bicicleta" && <>
                  <div className="field"><label htmlFor="bicicleta-make">Marca *</label><input id="bicicleta-make" name="make" required maxLength={80} value={form.make} onChange={(e) => setForm({ ...form, make: e.target.value })} aria-required="true" /></div>
                  <div className="field"><label htmlFor="bicicleta-model">Modelo *</label><input id="bicicleta-model" name="model" required maxLength={80} value={form.model} onChange={(e) => setForm({ ...form, model: e.target.value })} aria-required="true" /></div>
                  <div className="field"><label htmlFor="bicicleta-year">Año *</label><input id="bicicleta-year" name="year" required type="number" min="1900" max={new Date().getFullYear()+1} value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })} aria-required="true" /></div>
                  <div className="field"><label htmlFor="bicicleta-wheelSize">Rodado *</label><input id="bicicleta-wheelSize" name="wheelSize" required maxLength={30} placeholder="Ej. 29”" value={form.wheelSize} onChange={(e) => setForm({ ...form, wheelSize: e.target.value })} aria-required="true" /></div>
                  <div className="field"><label htmlFor="bicicleta-bikeMaterial">Material *</label><input id="bicicleta-bikeMaterial" name="bikeMaterial" required maxLength={80} value={form.bikeMaterial} onChange={(e) => setForm({ ...form, bikeMaterial: e.target.value })} aria-required="true" /></div>
                  <div className="field"><label htmlFor="bicicleta-insuredAmount">Suma asegurada (ARS) *</label><input id="bicicleta-insuredAmount" name="insuredAmount" required type="number" min="1" step="0.01" value={form.insuredAmount} onChange={(e) => setForm({ ...form, insuredAmount: e.target.value })} aria-required="true" /></div>
                </>}
                {form.product === "caucion_alquiler" && <>
                  <div className="field"><label htmlFor="caucion-monthlyRent">Alquiler mensual (ARS) *</label><input id="caucion-monthlyRent" name="monthlyRent" required type="number" min="1" step="0.01" value={form.monthlyRent} onChange={(e) => setForm({ ...form, monthlyRent: e.target.value })} aria-required="true" /></div>
                  <div className="field"><label htmlFor="caucion-contractDuration">Duración del contrato (meses) *</label><input id="caucion-contractDuration" name="contractDuration" required type="number" min="1" max="120" step="1" value={form.contractDuration} onChange={(e) => setForm({ ...form, contractDuration: e.target.value })} aria-required="true" /></div>
                </>}
              </fieldset>
              )}

              <div className="form-actions">
                {formStep === 2 && <button type="button" className="button-secondary" onClick={() => { setFormStep(1); setError(""); window.setTimeout(() => document.getElementById("quote-form-title")?.focus(), 0); }}>Volver a tu seguro</button>}
                {formStep === 1 ? (
                  <button className="button button-wide" type="submit">Continuar <span aria-hidden="true">→</span></button>
                ) : (
                  <button className="button button-wide" type="submit" disabled={busy}>{busy ? "Enviando solicitud…" : "Enviar y continuar por WhatsApp"} <span aria-hidden="true">→</span></button>
                )}
              </div>
              <p className="privacy-note">{formStep === 1 ? "Completá los datos del bien. En el siguiente paso solo te pedimos WhatsApp." : "Te abro WhatsApp con el resumen de tu solicitud. El mensaje queda listo para que lo envíes."}</p>
            </form>
          </div>
        </div></section>

  );
});
