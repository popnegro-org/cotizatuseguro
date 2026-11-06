import type { ResourceArticle } from "../resource-types";

export const article: ResourceArticle = {
    slug: "elegir-cobertura-bicicleta",
    question: "¿Cómo elegir una cobertura para una bicicleta?",
    title: "Cómo elegir una cobertura para bicicleta",
    metaDescription:
      "Cómo orientarte al cotizar seguro de bicicleta: valor, uso, robo y daños. Guía práctica para Mendoza.",
    formId: "bicicletas",
    answer:
      "Para elegir una cobertura de bicicleta conviene partir del valor de reposición, del uso (urbano, deportivo o mixto) y del riesgo que más te preocupa, habitualmente el robo. Las condiciones, límites y exclusiones dependen de cada compañía; no hay un único producto estándar para todas las bicicletas.",
    sections: [
      {
        heading: "Valor y características de la bici",
        body: [
          "Marca, modelo, año aproximado, rodado, material y suma asegurada orientativa ayudan a cotizar. Bicicletas de alto valor o eléctricas pueden tener reglas de suscripción más estrictas.",
          "Declarar un valor realista evita tanto un subaseguro como una prima desalineada."
        ]
      },
      {
        heading: "Robo, daños y exclusiones",
        body: [
          "El robo suele ser el evento más consultado. Los daños por accidente o transporte, si existen en el producto, traen franquicias y exclusiones propias. Hay que leer qué queda fuera (por ejemplo uso profesional o competencias, si aplica).",
          "Las medidas de guarda y seguridad pueden influir en la aceptación o en las condiciones."
        ]
      },
      {
        heading: "Cotización simple",
        body: [
          "Con los datos de la bicicleta y el contacto del interesado se pueden armar alternativas. La cotización es orientativa hasta la emisión y la aceptación formal de la compañía.",
          "Si también tenés auto u hogar, a veces conviene revisar el conjunto de coberturas con el mismo asesor para evitar solapamientos innecesarios."
        ]
      }
    ],
    faqs: [
      {
        q: "¿Las bicicletas eléctricas se aseguran igual?",
        a: "No siempre. Algunas compañías las tratan con reglas distintas o las limitan. Hay que cotizar con el modelo y la potencia a mano."
      },
      {
        q: "¿Hace falta factura de compra?",
        a: "Para cotizar no siempre. Para emitir o para un siniestro, la documentación de valor y titularidad puede ser necesaria según la compañía."
      }
    ],
    references: [
      { label: "SSN — Sujetos habilitados", url: "https://www.argentina.gob.ar/superintendencia-de-seguros/portal-ciudadano/sujetos-habilitados" },
      { label: "SSN — ¿Qué es un seguro?", url: "https://www.argentina.gob.ar/node/428978" }
    ],
    relatedSlugs: []
};
