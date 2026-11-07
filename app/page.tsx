"use client";

import { useEffect, useRef, useState } from "react";
import { QuoteForm, type QuoteFormHandle } from "../components/quote-form";
import { SiteFooter, SiteHeader } from "../components/site-navigation";
import { products, type FormProductId } from "../content/site";
import { track } from "../lib/analytics";

const landingProducts = products.map((product) => ({
  id: product.formId,
  title: product.landingTitle,
  desc: product.landingDescription,
  shortDesc: product.landingShortDescription,
  icon: product.icon,
  category: product.category
}));

const companies = [
  "Triunfo",
  "Mercantil Andina",
  "Allianz",
  "Sancor",
  "San Cristóbal",
  "Galicia",
  "Rivadavia"
];

export default function Home() {
  const quoteRef = useRef<QuoteFormHandle>(null);
  const [selectedProduct, setSelectedProduct] = useState<FormProductId>("auto");
  const [consent, setConsent] = useState<"unknown" | "accepted" | "rejected">("unknown");
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    let saved: string | null = null;
    try {
      saved = window.localStorage.getItem("analytics-consent");
    } catch {
    }
    if (saved === "accepted" || saved === "rejected") setConsent(saved);
    const params = new URLSearchParams(window.location.search);
    const p = params.get("producto");
    if (p && ["auto", "moto", "hogar", "consorcio", "bicicleta", "bicicletas", "caucion_alquiler"].includes(p)) {
      setSelectedProduct((p === "bicicletas" ? "bicicleta" : p) as FormProductId);
    }
  }, []);

  useEffect(() => {
    if (consent !== "unknown") {
      setShowConsent(false);
      return;
    }
    const id = window.setTimeout(() => setShowConsent(true), 1800);
    return () => window.clearTimeout(id);
  }, [consent]);

  useEffect(() => {
    if (consent !== "accepted") return;

    const metaPixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
    if (metaPixelId && !document.getElementById("meta-pixel-loader")) {
      type MetaPixelFunction = ((...args: unknown[]) => void) & {
        callMethod?: (...args: unknown[]) => void;
        queue: unknown[][];
        push: (...args: unknown[]) => void;
        loaded?: boolean;
        version?: string;
      };
      const w = window as Window & { fbq?: MetaPixelFunction; _fbq?: MetaPixelFunction };
      if (!w.fbq) {
        const fbq = function (...args: unknown[]) {
          if (fbq.callMethod) fbq.callMethod(...args);
          else fbq.queue.push(args);
        } as MetaPixelFunction;
        fbq.queue = [];
        fbq.push = fbq;
        fbq.loaded = true;
        fbq.version = "2.0";
        w.fbq = fbq;
        w._fbq = fbq;
      }
      w.fbq("init", metaPixelId);
      w.fbq("track", "PageView");
      const pixelScript = document.createElement("script");
      pixelScript.id = "meta-pixel-loader";
      pixelScript.async = true;
      pixelScript.src = "https://connect.facebook.net/en_US/fbevents.js";
      document.head.appendChild(pixelScript);
    }

    const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
    if (!gtmId || document.getElementById("gtm-loader")) return;
    const w = window as Window & { dataLayer?: Record<string, unknown>[] };
    w.dataLayer = w.dataLayer || [];
    w.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });
    const script = document.createElement("script");
    script.id = "gtm-loader";
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(gtmId)}`;
    document.head.appendChild(script);
  }, [consent]);

  function acceptConsent(value: "accepted" | "rejected") {
    try {
      window.localStorage.setItem("analytics-consent", value);
    } catch {
    }
    setConsent(value);
    track("consent_choice", { consent_choice: value });
  }

  function chooseProduct(product: FormProductId) {
    setSelectedProduct(product);
    quoteRef.current?.selectProduct(product);
  }

  return (
    <>
      <SiteHeader
        activePath="/"
        quoteHref="#cotizar"
        onQuoteClick={() => track("cta_click", { cta_location: "header" })}
        onMobileQuoteClick={() => track("cta_click", { cta_location: "mobile_nav" })}
        onProductClick={(productId) => chooseProduct(productId)}
      />

      {consent === "unknown" && showConsent && (
        <aside className="consent-banner" aria-label="Preferencias de privacidad">
          <p>Usamos medición del sitio. Las etiquetas solo se activan si aceptás. <a href="/privacidad">Más info</a>.</p>
          <div className="consent-actions">
            <button type="button" onClick={() => acceptConsent("rejected")}>Rechazar</button>
            <button className="accept" type="button" onClick={() => acceptConsent("accepted")}>Aceptar</button>
          </div>
        </aside>
      )}

      <main id="contenido-principal">
        <section className="hero"><div className="container hero-grid">
          <div>
            <span className="eyebrow">Productor asesor · Mendoza</span>
            <h1>Cotizá tu seguro con asesoramiento personalizado.</h1>
            <p className="lead">Solicitá una cotización para tu auto, moto, hogar, consorcio, bicicleta o caución de alquiler. Registrá tus datos y continuá la consulta por WhatsApp. La solicitud no implica la emisión de una póliza ni garantiza la aprobación de una cobertura.</p>
            <div className="hero-actions"><a className="button" href="#cotizar" onClick={() => track("cta_click", { cta_location: "hero" })}>Solicitar cotización <span aria-hidden="true">→</span></a><a className="secondary" href="#seguros">Ver coberturas</a></div>
            <ul className="trustline trust-list"><li>Asesor PAS</li><li>Cotización por WhatsApp</li><li>Sin tarifa automática en web</li></ul>
          </div>
          <div className="hero-card"><div className="hero-card-top"><strong>Elegí un producto</strong><p>Seleccioná y saltás al formulario de cotización.</p></div>
            <div className="product-grid">{landingProducts.map((p) => <button className={`product-link${selectedProduct === p.id ? " is-selected" : ""}`} key={p.id} onClick={() => chooseProduct(p.id)} type="button" aria-pressed={selectedProduct === p.id}><span className="product-icon" aria-hidden="true">{p.icon}</span><strong>{p.title}</strong><span>{p.shortDesc}</span></button>)}</div>
          </div>
        </div></section>

        <section className="section" id="seguros"><div className="container">
          <div className="section-intro"><span className="eyebrow">Coberturas disponibles</span><h2>Qué podemos cotizar</h2><p>Elegí el producto y el formulario se precarga con los datos del riesgo que necesitamos para cotizar.</p></div>
          <div className="coverage-grid">{landingProducts.map((p) => <article className="coverage-card" key={p.id}>
            <div className="coverage-card-top"><span className="product-icon" aria-hidden="true">{p.icon}</span><span className="coverage-category">{p.category}</span></div>
            <h3>{p.title}</h3><p>{p.desc}</p><button className="coverage-action" type="button" onClick={() => chooseProduct(p.id)}>Cotizar {p.title.toLowerCase()} <span aria-hidden="true">→</span></button>
          </article>)}</div>
        </div></section>

        <section className="section assurance-section" id="aseguradoras"><div className="container">
          <div className="section-intro"><span className="eyebrow">Respaldo asegurador</span><h2>Compañías con las que trabajo</h2><p>La disponibilidad de cada aseguradora y producto debe confirmarse para tu solicitud; las alternativas dependen del riesgo y de las condiciones vigentes.</p></div>
          <ul className="company-strip" aria-label="Compañías aseguradoras">
            {companies.map((name) => (<li className="company-chip" key={name}>{name}</li>))}
          </ul>
          <div className="assurance-grid">
            <article className="assurance-card"><span aria-hidden="true">🏢</span><h3>Opciones reales</h3><p>La posibilidad de cotizar con cada compañía se confirma según el producto, el riesgo y la disponibilidad vigente.</p></article>
            <article className="assurance-card"><span aria-hidden="true">🗺️</span><h3>Alcance nacional</h3><p>Atención desde Mendoza. El alcance territorial y la disponibilidad de cada producto se confirman al evaluar la solicitud.</p></article>
            <article className="assurance-card"><span aria-hidden="true">⚡</span><h3>Gestión ágil</h3><p>Un canal directo para organizar la solicitud, resolver dudas y acompañar los siguientes pasos.</p></article>
            <article className="assurance-card"><span aria-hidden="true">🤝</span><h3>Trato personalizado</h3><p>Seguimiento humano por WhatsApp, sin perder el contexto de tu solicitud.</p></article>
          </div>
        </div></section>

        <QuoteForm ref={quoteRef} />

        <section className="section" id="como-funciona"><div className="container"><div className="section-intro"><span className="eyebrow">Paso a paso</span><h2>De la solicitud a la cotización</h2><p>Un proceso corto: datos de contacto, detalle del riesgo y seguimiento por WhatsApp con un productor asesor.</p></div><div className="steps">
          <article className="step"><div className="step-number">1</div><h3>Contacto y producto</h3><p>Indicás qué querés asegurar y cómo contactarte.</p></article>
          <article className="step"><div className="step-number">2</div><h3>Detalle del riesgo</h3><p>Completás solo los datos necesarios para cotizar ese producto.</p></article>
          <article className="step"><div className="step-number">3</div><h3>Seguimiento por WhatsApp</h3><p>Registramos la solicitud y continuás con el asesoramiento personalizado.</p></article>
        </div></div></section>

        <section className="section section-soft" id="faq"><div className="container"><div className="section-intro"><span className="eyebrow">Dudas habituales</span><h2>Preguntas frecuentes</h2><p>Respuestas claras sobre el proceso de cotización y asesoramiento.</p></div><div className="faq-list">
          <details className="faq" open><summary>¿Cómo solicito una cotización?</summary><p>Completá los datos de contacto y el tipo de seguro; luego agregá los detalles del riesgo. La solicitud queda registrada y podés continuar la consulta por WhatsApp.</p></details>
          <details className="faq"><summary>¿La cotización es automática o personalizada?</summary><p>El formulario inicia el proceso; no emite una póliza ni confirma una tarifa automática. La propuesta depende del producto y de la evaluación correspondiente.</p></details>
          <details className="faq"><summary>¿Por qué el contacto continúa por WhatsApp?</summary><p>WhatsApp permite continuar la conversación directamente con el asesor. La apertura de la aplicación no confirma que el mensaje se haya enviado.</p></details>
          <details className="faq"><summary>¿Qué información necesito para cotizar?</summary><p>El formulario solicita datos de contacto y detalles que varían según el producto, como datos del vehículo, características del inmueble o información del alquiler. El asesor puede solicitar información adicional si es necesaria para evaluar el riesgo.</p></details>
          <details className="faq"><summary>¿De qué depende el precio de un seguro?</summary><p>Depende del producto, las características del bien o riesgo, la suma asegurada, las coberturas solicitadas, los criterios de evaluación y las condiciones ofrecidas por cada aseguradora. El precio se confirma en la propuesta correspondiente.</p></details>
          <details className="faq"><summary>¿La solicitud garantiza que me otorguen la cobertura?</summary><p>No. Enviar el formulario inicia una consulta y no equivale a contratar un seguro. La aceptación, el precio, los límites, las exclusiones y la vigencia dependen de la evaluación y de la documentación contractual aplicable.</p></details>
          <details className="faq"><summary>¿Puedo consultar por más de un seguro?</summary><p>Sí. Podés generar una solicitud por cada producto para mantener cada consulta identificada.</p></details>
          <details className="faq"><summary>¿Cómo se tratan mis datos personales?</summary><p>Consultá la <a href="/privacidad">política de privacidad</a> antes de enviar tus datos. La solicitud se procesa para gestionar la cotización.</p></details>
        </div></div></section>
      </main>

      <SiteFooter
        quoteHref="#cotizar"
        onQuoteClick={() => track("cta_click", { cta_location: "footer" })}
        onProductClick={(productId) => chooseProduct(productId)}
      />

      {!(consent === "unknown" && showConsent) && (
        <a className="floating-cta" href="#cotizar" onClick={() => track("cta_click", { cta_location: "floating_cta" })}><span aria-hidden="true">↓</span> Ir a cotizar</a>
      )}


    </>
  );
}
