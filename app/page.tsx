"use client";

import { useEffect, useRef, useState } from "react";
import { QuoteForm, type QuoteFormHandle } from "../components/quote-form";
import { SiteFooter, SiteHeader } from "../components/site-navigation";
import { useAnalyticsConsent } from "../components/consent-provider";
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
  "Rivadavia",
  "HY Broker de Seguros"
];

export default function Home() {
  const quoteRef = useRef<QuoteFormHandle>(null);
  const [hasStartedQuote, setHasStartedQuote] = useState(false);
  const { bannerVisible, accept, reject } = useAnalyticsConsent();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const p = params.get("producto");
    if (p && ["auto", "moto", "hogar", "consorcio", "bicicleta", "bicicletas", "caucion_alquiler"].includes(p)) {
      setHasStartedQuote(true);
    }
  }, []);

  function chooseProduct(product: FormProductId) {
    setHasStartedQuote(true);
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

      {bannerVisible ? (
        <aside className="consent-banner" aria-label="Preferencias de privacidad">
          <p>
            Usamos medición del sitio. Las etiquetas solo se activan si aceptás.{" "}
            <a href="/privacidad">Más info</a>.
          </p>
          <div className="consent-actions">
            <button type="button" onClick={reject}>Rechazar</button>
            <button className="accept" type="button" onClick={accept}>Aceptar</button>
          </div>
        </aside>
      ) : null}

      <main id="contenido-principal">
        <section className="hero hero-redesign"><div className="container hero-grid hero-grid-redesign">
          <div className="hero-copy">
            <span className="eyebrow">ASESORAMIENTO EN SEGUROS · MENDOZA</span>
            <h1>La cobertura adecuada empieza con <span>una buena conversación.</span></h1>
            <p className="lead">Contame qué necesitás proteger. Analizo tu solicitud y te contacto personalmente para acercarte alternativas de cobertura.</p>
            <div className="hero-actions"><a className="button" href="#cotizar" onClick={() => { setHasStartedQuote(true); track("cta_click", { cta_location: "hero" }); }}>Solicitar cotización <span aria-hidden="true">→</span></a><a className="secondary" href="#seguros">Explorar seguros</a></div>
            <div className="hero-proof" aria-label="Cómo te acompaño">
              <div><strong>01</strong><span>Contás qué necesitás</span></div>
              <div><strong>02</strong><span>Reviso alternativas</span></div>
              <div><strong>03</strong><span>Seguimos por WhatsApp</span></div>
            </div>
            <p className="hero-disclaimer">La solicitud no implica contratación ni garantiza la aceptación del riesgo.</p>
          </div>
          <div className="hero-form-shell"><div className="hero-form-heading"><span className="form-kicker">EMPEZÁ POR ACÁ</span><strong>Pedí tu cotización</strong><span>Completá los datos iniciales. Te acompaño en el proceso.</span></div><QuoteForm ref={quoteRef} embedded /></div>
        </div></section>

        <section className="section assurance-section assurance-section-redesign" id="aseguradoras"><div className="container">
          <div className="section-intro"><span className="eyebrow">Respaldo asegurador</span><h2>Aseguradoras y operadores con los que trabajo</h2><p>La disponibilidad de cada aseguradora y producto debe confirmarse para tu solicitud; las alternativas dependen del riesgo y de las condiciones vigentes.</p></div>
          <ul className="company-strip" aria-label="Aseguradoras y operadores con los que trabajo">
            {companies.map((name) => (<li className="company-chip" key={name}>{name}</li>))}
          </ul>
          <div className="assurance-grid">
            <article className="assurance-card"><span aria-hidden="true">🏢</span><h3>Opciones reales</h3><p>La posibilidad de cotizar con cada compañía se confirma según el producto, el riesgo y la disponibilidad vigente.</p></article>
            <article className="assurance-card"><span aria-hidden="true">🗺️</span><h3>Alcance nacional</h3><p>Atención desde Mendoza. El alcance territorial y la disponibilidad de cada producto se confirman al evaluar la solicitud.</p></article>
            <article className="assurance-card"><span aria-hidden="true">⚡</span><h3>Gestión ágil</h3><p>Un canal directo para organizar la solicitud, resolver dudas y acompañar los siguientes pasos.</p></article>
            <article className="assurance-card"><span aria-hidden="true">🤝</span><h3>Trato personalizado</h3><p>Seguimiento humano por WhatsApp, sin perder el contexto de tu solicitud.</p></article>
          </div>
        </div></section>

        <section className="section coverage-section-redesign" id="seguros"><div className="container">
          <div className="section-heading-redesign"><div><span className="eyebrow">PROTECCIÓN PARA CADA ETAPA</span><h2>¿Qué querés proteger hoy?</h2></div><p>Elegí el tipo de seguro. Vamos a pedirte solo la información necesaria para iniciar la consulta.</p></div>
          <div className="coverage-grid coverage-grid-redesign">{landingProducts.map((p, index) => <article className="coverage-card coverage-card-redesign" key={p.id}>
            <div className="coverage-card-top"><span className="product-icon" aria-hidden="true">{p.icon}</span><span className="coverage-category">{p.category}</span><span className="coverage-index">{String(index + 1).padStart(2,"0")}</span></div>
            <h3>{p.title}</h3><p>{p.desc}</p><button className="coverage-action" type="button" onClick={() => chooseProduct(p.id)}>Cotizar esta cobertura <span aria-hidden="true">↗</span></button>
          </article>)}</div>
        </div></section>

        <section className="section section-soft" id="faq"><div className="container"><div className="section-intro"><span className="eyebrow">Dudas habituales</span><h2>Preguntas frecuentes</h2><p>Respuestas claras sobre el proceso de cotización y asesoramiento.</p></div><div className="faq-list">
          <details name="faq" className="faq" open><summary>¿Cómo solicito una cotización?</summary>
            <div className="faq-answer"><p>Primero completás los datos del bien y después tus datos de contacto, provincia y localidad. La solicitud queda registrada para continuar por WhatsApp.</p></div>
          </details>
          <details name="faq" className="faq"><summary>¿La cotización es automática o personalizada?</summary>
            <div className="faq-answer"><p>El formulario inicia el proceso; no emite una póliza ni confirma una tarifa automática. La propuesta depende del producto y de la evaluación correspondiente.</p></div>
          </details>
          <details name="faq" className="faq"><summary>¿Por qué el contacto continúa por WhatsApp?</summary>
            <div className="faq-answer"><p>WhatsApp permite continuar la conversación directamente con el asesor. La apertura de la aplicación no confirma que el mensaje se haya enviado.</p></div>
          </details>
          <details name="faq" className="faq"><summary>¿Qué información necesito para cotizar?</summary>
            <div className="faq-answer"><p>El formulario solicita datos de contacto y detalles que varían según el producto, como datos del vehículo, características del inmueble o información del alquiler. El asesor puede solicitar información adicional si es necesaria para evaluar el riesgo.</p></div>
          </details>
          <details name="faq" className="faq"><summary>¿De qué depende el precio de un seguro?</summary>
            <div className="faq-answer"><p>Depende del producto, las características del bien o riesgo, la suma asegurada, las coberturas solicitadas, los criterios de evaluación y las condiciones ofrecidas por cada aseguradora. El precio se confirma en la propuesta correspondiente.</p></div>
          </details>
          <details name="faq" className="faq"><summary>¿La solicitud garantiza que me otorguen la cobertura?</summary>
            <div className="faq-answer"><p>No. Enviar el formulario inicia una consulta y no equivale a contratar un seguro. La aceptación, el precio, los límites, las exclusiones y la vigencia dependen de la evaluación y de la documentación contractual aplicable.</p></div>
          </details>
          <details name="faq" className="faq"><summary>¿Puedo consultar por más de un seguro?</summary>
            <div className="faq-answer"><p>Sí. Podés generar una solicitud por cada producto para mantener cada consulta identificada.</p></div>
          </details>
          <details name="faq" className="faq"><summary>¿Cómo se tratan mis datos personales?</summary>
            <div className="faq-answer"><p>Consultá la <a href="/privacidad">política de privacidad</a> antes de enviar tus datos. La solicitud se procesa para gestionar la cotización.</p></div>
          </details>
        </div></div></section>
      </main>

      <SiteFooter
        quoteHref="#cotizar"
        onQuoteClick={() => track("cta_click", { cta_location: "footer" })}
        onProductClick={(productId) => chooseProduct(productId)}
      />

      {!bannerVisible ? (
        <a
          className={"floating-cta" + (hasStartedQuote ? " is-whatsapp" : "")}
          href="#cotizar"
          onClick={() => track("cta_click", { cta_location: "floating_cta" })}
        >
          <span aria-hidden="true">{hasStartedQuote ? "↗" : "↓"}</span>{" "}
          {hasStartedQuote ? "WhatsApp · Cotizar" : "Ir a cotizar"}
        </a>
      ) : null}
    </>
  );
}
