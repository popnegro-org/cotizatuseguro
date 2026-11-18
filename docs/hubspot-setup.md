# Configuración de HubSpot

## Variables de entorno
Configurar `UPSTASH_REDIS_REST_URL` y `UPSTASH_REDIS_REST_TOKEN` en Preview y Production para persistencia durable y rate limiting. Configurar `LEAD_RETRY_SECRET` como secreto privado independiente para autorizar el endpoint de reintentos; no incluir su valor en el repositorio ni en URLs. Las solicitudes se conservan hasta 30 días. Los errores transitorios (429/5xx, timeout o red) permanecen en la cola `pending`; los rechazos permanentes pasan a `failed` y requieren reconciliación manual. Programar `POST /api/leads/retry` con `Authorization: Bearer <LEAD_RETRY_SECRET>` y verificar el resultado antes de depender de la recuperación automática.

Configurar `HUBSPOT_ACCESS_TOKEN` como variable **privada** en Vercel para Preview y Production según corresponda. Nunca usar el prefijo `NEXT_PUBLIC_`, commitear el token ni pegarlo en logs.

Crear una Private App de HubSpot con los permisos mínimos:

- `crm.objects.contacts.write`: crear contactos mediante `POST /crm/v3/objects/contacts`.
- `crm.objects.contacts.read`: reconciliar entregas cuyo resultado anterior pudo perderse, mediante búsqueda por `insurance_request_id` en `POST /crm/v3/objects/contacts/search`.

**Ambos permisos son necesarios para el flujo de reintentos.** Si falta `crm.objects.contacts.read`, HubSpot puede responder HTTP 403 durante la reconciliación y la solicitud permanecerá en `pending` por seguridad: la aplicación no repetirá un POST de creación cuando no pueda descartar que el contacto ya exista. Tras cambiar los scopes de la Private App, actualizar el token de Vercel en el entorno correspondiente. No copiar tokens a logs, comentarios ni repositorio.

## Propiedades del contacto

El endpoint envía estas propiedades estándar de contacto:

- `email`: email ingresado; HubSpot lo usa como identificador habitual del contacto.
- `firstname` y `lastname`: nombre y apellido separados.
- `phone`: WhatsApp con espacios, paréntesis, puntos y guiones eliminados.
- `state`: provincia ingresada en el paso 2 del formulario.
- `city`: localidad o departamento ingresado en el paso 2 del formulario.
- `lifecyclestage`: `lead`.

Antes de probar, confirmar en el portal de HubSpot que existan las propiedades personalizadas con estos **nombres internos** (no solo las etiquetas visibles):

- `insurance_product`: lista desplegable. En el portal actual, el valor interno para bicicleta es `bicicletas`; la aplicación lo normaliza desde `bicicleta`. Los demás valores internos incluyen `auto`, `moto`, `hogar`, `consorcio` y `caucion_alquiler`.
- `insurance_request_id`: texto.
- `insurance_request_details`: texto de varias líneas legible en la ficha del contacto. Incluye producto, provincia, localidad y los datos específicos del riesgo con etiquetas en español; límite de 900 caracteres.
- `lead_source`: texto o lista con opción `direct` y las fuentes que la organización use.
- `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`, `gclid`, `fbclid`: propiedades de texto si se desea conservar esta atribución. Los valores vacíos se omiten.
- `privacy_consent`: casilla booleana; la API solo acepta solicitudes con aceptación explícita y envía `true`.
- `privacy_consent_at`: fecha y hora ISO 8601 generada por el servidor al recibir la solicitud.
- `privacy_policy_version`: versión de la política publicada al momento del consentimiento. Actualmente `2026-10` (última actualización: octubre de 2026).

La disponibilidad y los tipos de las propiedades deben confirmarse en el portal; este repositorio no puede verificar la configuración de una cuenta HubSpot.

## Tipologías y validación

El frontend y la API requieren nombre y apellido, WhatsApp, provincia, localidad y aceptación explícita de la política de privacidad; el email es opcional. La API vuelve a validar el consentimiento en el servidor y rechaza solicitudes directas que no lo incluyan como `true`. La fecha y la versión de política se generan en el servidor; no se confía en marcas de tiempo ni versiones enviadas por el navegador. También valida los detalles específicos de Autos, Motos, Hogar, Consorcio, Bicicleta y Caución alquiler. Los detalles se guardan en `insurance_request_details`; no se crean automáticamente propiedades individuales por cada detalle.

## Verificación segura

1. Usar un contacto ficticio claramente identificado como QA y un entorno de Preview autorizado.
2. Confirmar que una entrega efectivamente creada en HubSpot responde `201`, `status: "sent"` e incluye `requestId` y `contactId`. Las respuestas `202` con estado `pending` o `needs_review` significan que la solicitud quedó persistida, pero todavía no confirman la creación del contacto.
3. Buscar el contacto en HubSpot y verificar email, nombre, apellido, teléfono, provincia (`state`), localidad (`city`), producto, resumen legible del riesgo y atribución. Los campos estándar se muestran en Propiedades del contacto; el resumen se muestra en “Detalles de solicitud de seguro”.
4. No usar datos de clientes reales para pruebas ni desactivar la protección del deployment para sortear restricciones de acceso.
5. Las pruebas automatizadas simulan `fetch`: no crean contactos en HubSpot y no validan que las propiedades existan en el portal. El evento de conversión `generate_lead` solo se dispara cuando la API confirma `status: "sent"`; las respuestas pendientes o para revisión no se cuentan como leads entregados.
