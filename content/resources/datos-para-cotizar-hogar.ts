import type { ResourceArticle } from "../resource-types";

export const article: ResourceArticle = {
    slug: "datos-para-cotizar-hogar",
    question: "¿Qué información se necesita para cotizar un seguro de hogar?",
    title: "Datos necesarios para cotizar un seguro de hogar",
    metaDescription:
      "Qué datos pedir para cotizar seguro de hogar en Mendoza: superficie, ubicación, tipo de vivienda y uso. Guía práctica y orientativa.",
    formId: "hogar",
    datePublished: "2026-11-06",
    dateModified: "2026-11-11",
    author: {
      name: "Agustín Montes",
      jobTitle: "Productor Asesor de Seguros",
      url: "/sobre-agustin-montes"
    },
    answer:
      "Para cotizar un seguro de hogar suelen pedir ubicación del inmueble, superficie aproximada, tipo de vivienda (casa o departamento), material de construcción cuando aplica, y si es de uso permanente o temporal. Con esos datos se puede iniciar una consulta. Los riesgos que pueden incluirse —por ejemplo incendio, contenidos, daños por agua o responsabilidad civil— dependen del producto y de las condiciones ofrecidas.",
    sections: [
      {
        heading: "Datos del inmueble",
        body: [
          "La localidad o barrio, la superficie cubierta aproximada y el tipo de construcción ayudan a ubicar el riesgo. La aseguradora puede solicitar documentación o información adicional para evaluar el inmueble y determinar las condiciones de contratación.",
          "Si el hogar es de fin de semana o alquiler temporario, conviene aclararlo: cambia el análisis de ocupación."
        ]
      },
      {
        heading: "Edificio, contenidos o ambos",
        body: [
          "Algunas personas buscan proteger la estructura; otras, los bienes dentro de la vivienda; otras, ambos. Dejarlo explícito evita cotizar un producto que no responde a la necesidad real.",
          "Los límites de contenidos y las exclusiones (por ejemplo joyas o equipos específicos) varían mucho entre pólizas."
        ]
      },
      {
        heading: "Proceso de cotización",
        body: [
          "Con los datos iniciales se puede consultar por una propuesta. La solicitud no implica emisión ni aceptación: la aseguradora debe evaluar el riesgo y confirmar las condiciones.",
          "Informar correctamente la ubicación y el uso del inmueble ayuda a que la consulta corresponda al riesgo que se busca asegurar."
        ]
      }
    ],
    faqs: [
      {
        q: "¿Hace falta inventario de muebles?",
        a: "El inventario y los comprobantes pueden ser requeridos según el valor declarado, el producto y los criterios de la aseguradora."
      },
      {
        q: "¿El seguro de hogar cubre terremotos o granizo?",
        a: "No debe suponerse que esos eventos están cubiertos. Revisá si aparecen expresamente incluidos y cuáles son sus límites, franquicias y exclusiones."
      }
    ],
    references: [
      { label: "SSN — Sujetos habilitados", url: "https://www.argentina.gob.ar/superintendencia-de-seguros/portal-ciudadano/sujetos-habilitados" },
      { label: "SSN — ¿Qué es un seguro?", url: "https://www.argentina.gob.ar/node/428978" }
    ],
    relatedSlugs: ["riesgos-consorcios"]
  };
