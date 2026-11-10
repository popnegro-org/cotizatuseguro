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
          "Monto de alquiler, plazo, domicilio del inmueble y datos del locatario son el mínimo para cotizar y canalizar una solicitud. Si el alquiler es comercial, pueden pedir información adicional de la actividad.",
          "La caución es una alternativa a otros esquemas de garantía; no implica que la aprobación sea automática."
        ]
      },
      {
        heading: "Documentación personal o laboral",
        body: [
          "Ingresos, antigüedad laboral, referencias o constancias son ejemplos frecuentes, pero varían por proveedor. Conviene preparar documentación actualizada para evitar idas y vueltas.",
          "Si hay codeudores o garantías adicionales, también se informa desde el inicio."
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
        a: "Muchas cauciones contemplan ambos usos, con requisitos distintos. Hay que cotizar según el tipo de contrato."
      },
      {
        q: "¿Reemplaza el depósito de garantía?",
        a: "Es una alternativa frecuente al depósito en efectivo o a la garantía de un tercero, sujeta a aceptación del locador y del proveedor de la caución."
      }
    ],
    references: [
      { label: "SSN — Sujetos habilitados", url: "https://www.argentina.gob.ar/superintendencia-de-seguros/portal-ciudadano/sujetos-habilitados" },
      { label: "SSN — ¿Qué es un seguro?", url: "https://www.argentina.gob.ar/node/428978" }
    ],
    relatedSlugs: []
  };
