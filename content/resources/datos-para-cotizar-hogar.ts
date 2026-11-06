import type { ResourceArticle } from "../resource-types";

export const article: ResourceArticle = {
    slug: "datos-para-cotizar-hogar",
    question: "¿Qué información se necesita para cotizar un seguro de hogar?",
    title: "Datos necesarios para cotizar un seguro de hogar",
    metaDescription:
      "Qué datos pedir para cotizar seguro de hogar en Mendoza: superficie, ubicación, tipo de vivienda y uso. Guía práctica y orientativa.",
    formId: "hogar",
    answer:
      "Para cotizar un seguro de hogar suelen pedir ubicación del inmueble, superficie aproximada, tipo de vivienda (casa o departamento), material de construcción cuando aplica, y si es de uso permanente o temporal. Con esos datos se pueden armar propuestas de incendio, contenidos, daños por agua y responsabilidad civil, según el producto de cada compañía.",
    sections: [
      {
        heading: "Datos del inmueble",
        body: [
          "La localidad o barrio, la superficie cubierta aproximada y el tipo de construcción ayudan a ubicar el riesgo. No hace falta una tasación formal para una cotización inicial, pero sí información coherente y verificable al momento de emitir.",
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
          "Con los datos básicos y el contacto del interesado se pueden comparar alternativas. La cotización no implica emisión: la póliza se confirma cuando aceptás condiciones y la aseguradora aprueba el riesgo.",
          "En Mendoza el asesoramiento local facilita alinear la propuesta con el tipo de vivienda y el uso real."
        ]
      }
    ],
    faqs: [
      {
        q: "¿Hace falta inventario de muebles?",
        a: "Para una cotización inicial no siempre. Para sumas altas de contenidos, algunas compañías piden más detalle o documentación al emitir."
      },
      {
        q: "¿El seguro de hogar cubre terremotos o granizo?",
        a: "Depende del producto y de las cláusulas contratadas. Hay que verificarlo en cada propuesta; no asumir cobertura automática."
      }
    ],
    relatedSlugs: ["riesgos-consorcios"]
  };
