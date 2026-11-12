import type { ResourceArticle } from "../resource-types";

export const article: ResourceArticle = {
    slug: "elegir-cobertura-bicicleta",
    question: "¿Cómo elegir una cobertura para una bicicleta?",
    title: "Cómo elegir una cobertura para bicicleta",
    metaDescription:
      "Cómo orientarte al cotizar seguro de bicicleta: valor, uso, robo y daños. Guía práctica para Mendoza.",
    formId: "bicicleta",
    datePublished: "2026-11-06",
    dateModified: "2026-11-11",
    author: {
      name: "Agustín Montes",
      jobTitle: "Productor Asesor de Seguros",
      url: "/sobre-agustin-montes"
    },
    answer:
      "Para elegir una cobertura de bicicleta conviene partir del valor de reposición, del uso (urbano, deportivo o mixto) y del riesgo que más te preocupa, habitualmente el robo. Las condiciones, límites y exclusiones dependen de cada compañía; no hay un único producto estándar para todas las bicicletas.",
    sections: [
      {
        heading: "Valor y características de la bici",
        body: [
          "Para consultar se pueden solicitar marca, modelo, año, rodado, material, valor y tipo de bicicleta. La aseguradora puede aplicar requisitos distintos según el producto y las características declaradas.",
          "El valor declarado debe corresponderse con la documentación y las reglas de valuación que establezca la aseguradora."
        ]
      },
      {
        heading: "Robo, daños y exclusiones",
        body: [
          "Revisá si la propuesta incluye robo, daños accidentales o transporte. Cada riesgo puede tener condiciones, límites, franquicias y exclusiones diferentes. No supongas que el uso profesional o la participación en competencias están incluidos.",
          "La aseguradora puede solicitar información sobre medidas de guarda y seguridad. Su efecto depende de las condiciones de suscripción."
        ]
      },
      {
        heading: "Cotización simple",
        body: [
          "Con los datos de la bicicleta se puede iniciar una consulta. La cotización no implica aceptación del riesgo ni emisión de la póliza.",
          "Si ya tenés otras pólizas, revisá sus alcances para identificar si existen coberturas relacionadas. La existencia de una cobertura en otra póliza debe confirmarse en sus condiciones."
        ]
      }
    ],
    faqs: [
      {
        q: "¿Las bicicletas eléctricas se aseguran igual?",
        a: "La aceptación y las condiciones para bicicletas eléctricas dependen de la aseguradora y del producto. Informá marca, modelo y características técnicas para consultar."
      },
      {
        q: "¿Hace falta factura de compra?",
        a: "La documentación requerida para cotizar, emitir o gestionar un siniestro depende de la aseguradora y de las condiciones de la póliza."
      }
    ],
    references: [
      { label: "SSN — Sujetos habilitados", url: "https://www.argentina.gob.ar/superintendencia-de-seguros/portal-ciudadano/sujetos-habilitados" },
      { label: "SSN — ¿Qué es un seguro?", url: "https://www.argentina.gob.ar/node/428978" }
    ],
    relatedSlugs: []
};
