# Cotizá tu Seguro — Agustín Montes

Sitio de captación y asesoramiento para seis categorías de seguros: auto, moto, hogar, consorcio, bicicleta y caución de alquiler.

## Stack
- Next.js App Router + TypeScript
- HubSpot CRM API
- Upstash Redis para persistencia durable y rate limiting distribuido
- WhatsApp click-to-chat
- GA4 / Google Tag Manager / Meta Pixel / Meta Conversions API (según configuración y consentimiento)
- Vercel

## Desarrollo local
Requiere Node.js 22 o superior.
```bash
npm ci
cp .env.example .env.local
npm run dev
```
Configurar variables reales en `.env.local` para desarrollo y en Vercel para cada ambiente. No subir secretos al repositorio.

## Variables de entorno
- `UPSTASH_REDIS_REST_URL` y `UPSTASH_REDIS_REST_TOKEN`: Redis compartido para rate limit y persistencia durable de solicitudes.
- `LEAD_RETRY_SECRET`: secreto privado para autorizar el procesamiento de la cola con `POST /api/leads/retry`; no se expone al navegador.
- `HUBSPOT_ACCESS_TOKEN`: token privado de HubSpot con permisos mínimos para crear y reconciliar contactos.
- `NEXT_PUBLIC_WHATSAPP_BUSINESS_NUMBER`: número internacional de WhatsApp Business, solo dígitos.
- `NEXT_PUBLIC_GTM_ID`: contenedor GTM, cargado tras aceptar medición.
- `NEXT_PUBLIC_SITE_URL`: URL pública usada como origen de eventos Meta CAPI; la URL canónica del sitio se define en metadata y sitemap.
- `META_PIXEL_ID` (o `NEXT_PUBLIC_META_PIXEL_ID` como fallback) y `META_CAPI_ACCESS_TOKEN`: configuración server-side de Meta Conversions API (opcional). Si falta el Pixel ID o el token, el lead sigue funcionando y el evento server-side no se envía.
- `NEXT_PUBLIC_META_PIXEL_ID`: alternativa pública para identificar el Pixel del navegador y, como fallback, el Pixel ID de CAPI. El token CAPI nunca debe usar el prefijo `NEXT_PUBLIC_`.

## Captación y entrega de leads
La API valida cada solicitud y primero la guarda en Upstash (retención de 30 días); después intenta registrarla en HubSpot. Si la persistencia falla, no contacta al CRM y responde `503`.

Los errores transitorios (HTTP 429/5xx, timeout o red) quedan en `pending` y se reintentan con backoff exponencial, limitado a 60 segundos. Los rechazos permanentes (por ejemplo, HTTP 4xx distinto de 429 o credencial ausente) pasan a `failed`, se retiran de la cola automática y la API responde `202` con `status: "needs_review"`; deben reconciliarse manualmente.

El workflow `.github/workflows/lead-retry.yml` intenta llamar `POST /api/leads/retry` cada 5 minutos, pero solo ejecuta el job cuando la variable de repositorio `LEAD_RETRY_ENABLED=true`. Requiere el secret de GitHub Actions `LEAD_RETRY_SECRET`, con el mismo valor que el secret de Vercel. Si falta el secret o la variable no está habilitada, no se procesa la cola. No activar el scheduler hasta validar Preview, autorización, persistencia y recuperación con datos sintéticos.

Cada ejecución procesa como máximo **3 solicitudes** de forma secuencial para conservar margen dentro del límite de 60 segundos de la función, considerando reconciliación, entrega a HubSpot y envío best-effort a Meta.

Si Upstash no está configurado o falla la persistencia, el lead no se envía a HubSpot y la API responde `503`.

La API utiliza las propiedades personalizadas de HubSpot `insurance_product`, `insurance_request_id`, `insurance_request_details`, `lead_source`, `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`, `gclid` y `fbclid`. Crear/verificar las propiedades antes de probar el endpoint; HubSpot rechazará propiedades inexistentes.

## Endpoint
`POST /api/leads` valida los datos del formulario y registra la solicitud. Por defecto, usa Upstash Redis para aplicar un límite distribuido. `LEADS_RATE_LIMIT_MODE=infrastructure` omite ese límite de aplicación y solo debe activarse después de configurar y probar reglas de rate limiting en Vercel Firewall para `POST /api/leads`; cambiar la variable por sí solo no activa protección.

## Contenidos SEO

La página `/recursos` publica siete guías orientativas con páginas estáticas individuales en `/recursos/<slug>`. Cada guía mantiene su contenido, preguntas frecuentes, CTA contextual y referencias oficiales cuando corresponden. Las URLs de recursos se incorporan al sitemap desde el mismo catálogo editorial. Revisar las fuentes y actualizar los textos antes de cambios regulatorios o de producto; no publicar coberturas, requisitos ni disponibilidad no confirmados.

El catálogo `content/site.ts` es la fuente única para las seis categorías comerciales: landing, navegación de cotización y páginas SEO consumen los mismos identificadores, categorías y descripciones de producto.


## Meta Conversions API

Cuando un lead queda `sent`, el servidor puede enviar un evento `Lead` a Meta con `event_id = requestId`. La integración es best-effort: un fallo de Meta no revierte la entrega a HubSpot ni modifica la respuesta del formulario. Ver [docs/meta-conversions-api.md](docs/meta-conversions-api.md).

La deduplicación con el Pixel requiere que GTM envíe el mismo `eventID` en el evento de navegador. No enviar PII en parámetros de analítica.

## Estado de integraciones
Las cuentas y credenciales de HubSpot, WhatsApp Business, GA4, GTM y Meta deben configurarse por separado. Un indicador de configuración en `GET /api/health` confirma presencia de variables, no conectividad, permisos ni recepción de eventos en plataformas externas. El consentimiento requiere QA de etiquetas y revisión legal antes del lanzamiento.

## Validación
```bash
npm run typecheck
npm test
npm run lint
npm run build
npm run test:e2e
```

## Puertas de lanzamiento
No activar campañas pagas hasta verificar en Preview:
1. Registro correcto en HubSpot con producto y atribución.
2. Reintentos, idempotencia y tratamiento de duplicados.
3. Scheduler autenticado, limitado y probado con datos sintéticos.
4. Apertura de WhatsApp con el producto correcto.
5. Eventos GA4, Meta y Google Ads sin duplicación ni datos personales.
6. Consentimiento, privacidad y QA visual en móvil/escritorio.
7. Si CAPI está configurada: `metaCapiConfigured: true` en `/api/health` y un `Lead` en Meta Test Events.
