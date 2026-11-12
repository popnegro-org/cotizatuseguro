# Cierre técnico — SEO Local y GEO

## Alcance implementado

Esta entrega completa la capa editorial y semántica de las siete guías existentes y amplía la página local sin alterar el formulario, la API de leads, HubSpot, WhatsApp ni el modelo de consentimiento.

### Metadatos editoriales

- Fecha de publicación: 2026-11-06, basada en la integración de las siete guías mediante PR #52.
- Fecha de última actualización editorial: 2026-11-11, basada en la revisión de los siete archivos mediante PR #59.
- Autor visible y estructurado: Agustín Montes — Productor Asesor de Seguros.
- La atribución no declara una revisión independiente ni credenciales adicionales no verificadas.
- Las fechas son metadatos editoriales, no fechas de compilación ni de despliegue. Deben actualizarse cuando el contenido se revise sustancialmente.

### Schema.org

Cada guía publica:
- Article, con headline, description, mainEntityOfPage, datePublished, dateModified, author, publisher e idioma.
- BreadcrumbList, coherente con la ruta visible.
- El autor referencia el Person global https://cotizatuseguro.com.ar/#advisor.

La página /seguros-en-mendoza conserva WebPage, BreadcrumbList e ItemList. La página profesional declara además InsuranceAgency con dirección postal y área de servicio provincial. La dirección visible se incorporó porque el titular confirmó que los clientes pueden visitar el domicilio. No se agregaron horarios, reseñas ni coordenadas sin datos verificables.

### SEO local

La página /seguros-en-mendoza y el perfil profesional declaran:
- Dirección de atención presencial: Av. San Martín Sur 6996, M5505 Luján de Cuyo, Mendoza, Argentina.
- Los clientes pueden visitar el domicilio.
- Atención a domicilio en toda la provincia de Mendoza.
- Recepción de consultas de alcance nacional.
- Disponibilidad de cada producto sujeta a evaluación del riesgo y condiciones de cada aseguradora.
- Enlace de ubicación proporcionado por el titular: https://maps.app.goo.gl/fLzqqbVNFxbpigTb8.

No se crearon páginas por localidad. El domicilio se declara como ubicación de atención en el sitio; la visibilidad de la dirección en Google Business Profile requiere verificar además que el establecimiento cumpla las reglas de señalización permanente y personal presente durante los horarios publicados, si se desea mostrar como híbrido.

## Medición: estado técnico y límites de evidencia

### Configuración observada en Vercel

Los metadatos de variables del proyecto muestran identificadores configurados para Preview y Production:
- NEXT_PUBLIC_GTM_ID
- NEXT_PUBLIC_GA4_MEASUREMENT_ID

La aplicación carga GTM únicamente después de aceptar el consentimiento. La variable NEXT_PUBLIC_GA4_MEASUREMENT_ID no es consumida directamente por el código Next.js; la transmisión de GA4 depende de que el contenedor GTM tenga una etiqueta GA4 correctamente configurada.

La presencia de variables no demuestra que el navegador descargue GTM, que GA4 reciba eventos ni que las conversiones estén marcadas como eventos clave.

### Eventos emitidos por el código

| Evento | Semántica | Parámetros de negocio observados |
|---|---|---|
| cta_click | Clic en CTA | cta_location |
| insurance_product_select | Selección de producto | insurance_product |
| form_step | Avance al paso de contacto | form_step, insurance_product |
| form_submit | Intento de envío, antes de la respuesta de API | insurance_product |
| generate_lead | Solicitud registrada con respuesta API exitosa | insurance_product, event_id |
| whatsapp_click | Intento de abrir WhatsApp luego del registro | insurance_product |
| consent_choice | Decisión de consentimiento | consent_choice |

Todos los eventos de cliente pasan por track() y se descartan si no existe consentimiento de medición aceptado. consent_choice solo se envía cuando la persona acepta; el rechazo no se transmite a GA4. form_submit no debe configurarse como conversión de lead porque registra un intento; generate_lead es el evento de éxito de registro. whatsapp_click se emite tras el registro exitoso y antes de abrir wa.me: mide la intención de abrir el canal, no la entrega ni lectura del mensaje.

### Verificación externa pendiente

El acceso de lectura a Google Search Console y GA4 desde GSC Wizard no pudo ejecutarse porque la cuenta conectada respondió payment_required (suscripción o trial vencido). Por eso no se dispone de una línea de base real ni de confirmación de recepción de eventos.

Para cerrar la medición:
1. Restablecer una suscripción activa de GSC Wizard y reconectar Search Console.
2. Vincular la propiedad GA4 correcta a https://cotizatuseguro.com.ar/.
3. Aceptar consentimiento en un navegador de QA y verificar la carga de GTM-K2BSJ2W6 en Tag Assistant.
4. Confirmar en DebugView/Realtime que cta_click, insurance_product_select, form_step, form_submit, generate_lead y whatsapp_click llegan con parámetros no personales.
5. Marcar generate_lead como evento clave en GA4 y validar una solicitud sintética controlada, sin enviar comunicaciones reales ni crear leads productivos.
6. Consultar Search Console para registrar clics, impresiones, CTR, posición, consultas, páginas y cobertura de indexación en una ventana asentada de 28 días.

## Requisitos de decisión del cliente para Google Business Profile

Antes de crear o modificar un perfil local, confirmar documentalmente:
- Confirmado por el titular: los clientes pueden visitar el domicilio y existe atención a domicilio en toda Mendoza.
- Pendiente para mostrar la dirección en Google Business Profile como negocio híbrido: confirmar señalización fija y permanente con el nombre comercial en el domicilio y personal del negocio presente para recibir clientes durante los horarios publicados.
- Pendiente: horarios de atención, teléfono comercial principal y titularidad/estado de un perfil de Google existente.
- Categoría sugerida para revisar en GBP: Insurance agency / Agencia de seguros, según las categorías disponibles en la interfaz de Google.

No crear reseñas ni horarios ficticios. Si no se cumplen las condiciones de señalización y personal para mostrar la dirección, configurar el perfil como negocio de área de servicio y ocultar el domicilio en el perfil de Google, aunque la web pueda publicar la dirección si el titular desea hacerlo.

## Criterios de aceptación de esta entrega

- Los siete artículos declaran autor, fecha de publicación y fecha de actualización.
- La autoría y las fechas son visibles en HTML y consistentes con Article JSON-LD.
- Los artículos publican BreadcrumbList.
- Las pruebas automatizadas comprueban estructura, autor, fechas y serialización.
- La página local incorpora únicamente el alcance geográfico confirmado.
- La documentación separa variables configuradas de datos efectivamente recibidos.
