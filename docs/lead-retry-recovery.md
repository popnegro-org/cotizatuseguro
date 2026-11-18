# Recuperación segura de leads pendientes

## Estado y objetivo

El worker procesa hasta 3 solicitudes vencidas por ejecución, de forma secuencial. Cada solicitud usa un lease Redis por `requestId`; la entrega vuelve a consultar HubSpot antes de crear un contacto cuando `attempts > 0`. La búsqueda usa `insurance_request_id`.

La cola productiva debe mantenerse sin reintentos hasta confirmar los scopes reales de la Private App que corresponde al token `HUBSPOT_ACCESS_TOKEN` de Vercel.

## Scopes mínimos

- `crm.objects.contacts.write`: creación de contactos.
- `crm.objects.contacts.read`: búsqueda/reconciliación previa a un reintento.

La autorización OAuth del conector HubSpot no demuestra los scopes de la Private App configurada en Vercel. Verificar la Private App en HubSpot directamente. No copiar tokens a terminales compartidas, logs, issues o chat.

## Procedimiento para los registros existentes

1. Mantener desactivada la variable de repositorio `LEAD_RETRY_ENABLED`.
2. Confirmar en la Private App los dos scopes anteriores. Si falta `contacts.read`, agregar solo ese permiso; renovar el token únicamente si HubSpot lo exige y actualizarlo directamente en Vercel Production/Preview.
3. Validar la credencial con una operación autenticada de solo lectura sobre el endpoint de búsqueda de contactos. No llamar a `POST /crm/v3/objects/contacts` ni al formulario público.
4. Para cada registro pendiente, consultar por su `insurance_request_id`:
   - **HTTP 200 y exactamente un resultado:** registrar la coincidencia y el ID del contacto; reconciliar el estado a `sent` y quitarlo del índice pendiente.
   - **HTTP 200 y cero resultados:** conservarlo como `pending`. No crear durante esta fase de auditoría; el worker normal podrá procesarlo luego de una nueva búsqueda exitosa.
   - **Más de un resultado:** detener ese registro y derivarlo a revisión manual; no elegir un contacto automáticamente.
   - **HTTP 401/403, timeout, 429 o 5xx:** detener toda la recuperación. No interpretar un error de búsqueda como ausencia de contacto.
5. Comparar el total inicial con los resultados clasificados. No revelar propiedades personales en reportes; registrar únicamente conteos, códigos HTTP, estados y referencias internas protegidas.
6. Solo después de que los cinco registros tengan una búsqueda concluyente, habilitar la ejecución programada. La entrega sigue protegida por la búsqueda previa del worker, el lease Redis y el lote secuencial.

## Controles del scheduler

El workflow requiere simultáneamente:

- `LEAD_RETRY_ENABLED=true`
- `HUBSPOT_CONTACTS_READ_SCOPE_VERIFIED=true`
- Secreto `LEAD_RETRY_SECRET` configurado.

La segunda variable es un bloqueo de liberación explícito: no configurarla como `true` hasta verificar los scopes reales y validar la búsqueda de solo lectura. La ejecución manual también respeta ambas condiciones.

El cron es cada cinco minutos; GitHub Actions serializa ejecuciones con `cancel-in-progress: false`. El endpoint procesa como máximo tres registros por llamada y tiene un límite HTTP de 60 segundos. Los errores de reconciliación mantienen el registro pendiente y no permiten crear un posible duplicado.

## Límites

- Este procedimiento no autoriza enviar leads reales, crear contactos de QA, alterar los cinco registros ni reactivar producción.
- No ejecutar reconciliación masiva ni modificar Redis manualmente sin evidencia individual y respaldo del estado anterior.
- El merge del PR y cualquier habilitación de las variables de producción requieren autorización humana.
