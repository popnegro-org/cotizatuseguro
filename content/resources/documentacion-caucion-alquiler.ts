import type { ResourceArticle } from "../resource-types";

export const article: ResourceArticle = {
    slug: "documentacion-caucion-alquiler",
    question: "¿Qué documentación se necesita para solicitar una caución de alquiler?",
    title: "Documentación para solicitar una caución de alquiler",
    metaDescription:
      "Documentación habitual para caución de alquiler en Mendoza: datos del inquilino, contrato y requisitos del proveedor. Guía orientativa.",
    formId: "caucion_alquiler",
    answer:
      "Para solicitar una caución de alquiler suele pedirse identificación del inquilino, datos del contrato (monto de alquiler y duración) y documentación personal o laboral que el proveedor de la garantía utilice para evaluar el riesgo. La lista exacta no es universal: cada entidad de caución define sus requisitos y criterios de aprobación.",
    sections: [
      {
        heading: "Datos del contrato y de las partes",
        body: [
          "Para iniciar una consulta pueden solicitarse monto y plazo del alquiler, domicilio del inmueble y datos del locatario. Si el contrato es comercial, el proveedor puede requerir información adicional.",
          "La caución es un instrumento de garantía. Su aceptación por el locador y la aprobación por el proveedor deben confirmarse para cada contrato."
        ]
      },
      {
        heading: "Documentación personal o laboral",
        body: [
          "El proveedor puede solicitar comprobantes de ingresos, información laboral u otros documentos para evaluar al solicitante. Los requisitos no son universales: deben confirmarse con la entidad que emite la garantía.",
          "Si el contrato prevé codeudores u otras garantías, informá esa condición al realizar la consulta."
        ]
      },
      {
        heading: "Tiempos y resultado de la evaluación",
        body: [
          "La evaluación corre por cuenta del proveedor de la caución. El productor asesora en el armado de la solicitud y en la lectura de condiciones, pero no garantiza la aprobación.",
          "En Mendoza, tener claros el monto, el plazo y los datos del inmueble permite iniciar la consulta con información concreta."
        ]
      }
    ],
    faqs: [
      {
        q: "¿Sirve para vivienda y comercio?",
        a: "La disponibilidad para vivienda o uso comercial depende del producto y del proveedor. Confirmá el destino del inmueble antes de iniciar la solicitud."
      },
      {
        q: "¿Reemplaza el depósito de garantía?",
        a: "Puede proponerse como garantía para un contrato de alquiler, pero no reemplaza automáticamente otras garantías. Su aceptación depende del locador, del contrato y del proveedor."
      }
    ],
    references: [
      { label: "SSN — Sujetos habilitados", url: "https://www.argentina.gob.ar/superintendencia-de-seguros/portal-ciudadano/sujetos-habilitados" },
      { label: "SSN — ¿Qué es un seguro?", url: "https://www.argentina.gob.ar/node/428978" }
    ],
    relatedSlugs: []
  };
