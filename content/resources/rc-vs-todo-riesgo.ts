import type { ResourceArticle } from "../resource-types";

export const article: ResourceArticle = {
    slug: "rc-vs-todo-riesgo",
    question: "¿Qué diferencia existe entre responsabilidad civil y todo riesgo?",
    title: "Responsabilidad civil vs. todo riesgo en el seguro de auto",
    metaDescription:
      "Diferencia entre responsabilidad civil y coberturas amplias (todo riesgo) en seguros de auto. Qué cubre cada enfoque y cómo cotizar en Mendoza.",
    formId: "auto",
    answer:
      "La responsabilidad civil se enfoca en los daños que tu vehículo pueda causar a terceros. Las coberturas amplias —a menudo llamadas de forma genérica “todo riesgo”— suman protección sobre el propio auto (por ejemplo daños e incendio, según el producto). En la práctica el nombre comercial varía: lo importante es el detalle de la póliza, no la etiqueta.",
    sections: [
      {
        heading: "Qué apunta la responsabilidad civil",
        body: [
          "Busca responder, dentro de los límites contratados, por daños a personas o bienes de terceros derivados del uso del vehículo asegurado. No está pensada para reparar tu propio auto tras un choque o un robo.",
          "Suele ser el punto de partida de casi todas las cotizaciones de auto."
        ]
      },
      {
        heading: "Qué se entiende por coberturas amplias",
        body: [
          "Los productos más amplios pueden incluir daños totales o parciales al vehículo, incendio y robo, con franquicias y exclusiones propias de cada compañía. No existe un “todo riesgo” único e idéntico en el mercado: cada póliza define eventos cubiertos, límites y condiciones.",
          "Elegir un producto más amplio tiene sentido cuando el valor del vehículo y tu exposición al riesgo justifican el costo adicional."
        ]
      },
      {
        heading: "Cómo decidir en una cotización",
        body: [
          "Definí primero qué querés proteger: solo terceros, o también el capital del propio auto. Después compará propuestas reales con el mismo set de datos del vehículo.",
          "Un productor asesor puede traducir las diferencias de redacción de cada compañía a un lenguaje claro antes de que decidas."
        ]
      }
    ],
    faqs: [
      {
        q: "¿El todo riesgo cubre cualquier daño?",
        a: "No. Siempre hay exclusiones, límites y franquicias. Hay que leer la propuesta y las condiciones generales del producto."
      },
      {
        q: "¿Puedo empezar con RC y ampliar después?",
        a: "En muchos casos sí, al renovar o mediante endoso, sujeto a aceptación de la compañía y a las reglas del producto."
      }
    ],
    references: [
      { label: "SSN — Seguro automotor", url: "https://www.argentina.gob.ar/node/494955" },
      { label: "SSN — Sujetos habilitados", url: "https://www.argentina.gob.ar/superintendencia-de-seguros/portal-ciudadano/sujetos-habilitados" },
      { label: "SSN — ¿Qué es un seguro?", url: "https://www.argentina.gob.ar/node/428978" }
    ],
    relatedSlugs: ["seguro-auto-mendoza", "factores-precio-seguro-auto"]
  };
