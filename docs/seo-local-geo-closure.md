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

La página /seguros-en-mendoza conserva WebPage, BreadcrumbList e ItemList. No se agregó LocalBusiness ni ProfessionalService: todavía no está acreditada la modalidad de atención ni la elegibilidad del establecimiento para un perfil local. No deben agregarse dirección postal, horarios, reseñas ni coordenadas por inferencia.

### SEO local

La página /seguros-en-mendoza ahora declara explícitamente:
- Actividad gestionada desde Mendoza.
- Recepción de consultas de alcance nacional.
- Evaluación de disponibilidad por riesgo, producto y aseguradora.

No se crearon páginas por localidad ni se declararon zonas de servicio adicionales sin confirmación. El contenido no implica que exista un local abierto al público.

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
- Si los clientes pueden visitar un establecimiento durante el horario publicado.
- Si existe atención presencial o a domicilio y cuál es el alcance real.
- Si la dirección corresponde a un lugar de atención apto para exhibirse públicamente o debe ocultarse como área de servicio.
- Categoría profesional y datos de contacto vigentes.
- Existencia y titularidad de un perfil anterior.

Hasta confirmar esos datos, mantener la estrategia local en la página de Mendoza y la identidad profesional existente. No crear reseñas, ubicaciones ni áreas de servicio ficticias.

## Criterios de aceptación de esta entrega

- Los siete artículos declaran autor, fecha de publicación y fecha de actualización.
- La autoría y las fechas son visibles en HTML y consistentes con Article JSON-LD.
- Los artículos publican BreadcrumbList.
- Las pruebas automatizadas comprueban estructura, autor, fechas y serialización.
- La página local incorpora únicamente el alcance geográfico confirmado.
- La documentación separa variables configuradas de datos efectivamente recibidos.
