import type { ResourceArticle } from "../resource-types";

export const article: ResourceArticle = {
    slug: "rc-vs-todo-riesgo",
    question: "¿Qué diferencia existe entre responsabilidad civil y todo riesgo?",
    title: "Responsabilidad civil vs. todo riesgo en el seguro de auto",
    metaDescription:
      "Diferencia entre responsabilidad civil y coberturas amplias (todo riesgo) en seguros de auto. Qué cubre cada enfoque y cómo cotizar en Mendoza.",
    formId: "auto",
    answer:
      "La responsabilidad civil se refiere a la responsabilidad por daños a terceros dentro de los límites de la póliza. Las coberturas que se comercializan como amplias pueden incorporar riesgos sobre el propio vehículo, pero su alcance varía. El nombre comercial no reemplaza la lectura de las condiciones contractuales.",
    sections: [
      {
        heading: "Qué apunta la responsabilidad civil",
        body: [
          "La responsabilidad civil cubre los daños a terceros que estén contemplados en la póliza. No debe confundirse con una cobertura de daños propios del vehículo asegurado.",
          "Es importante revisar los límites, exclusiones y demás condiciones aplicables a esta cobertura."
        ]
      },
      {
        heading: "Qué se entiende por coberturas amplias",
        body: [
          "Los productos más amplios pueden incluir daños totales o parciales al vehículo, incendio y robo, con franquicias y exclusiones propias de cada compañía. No existe un “todo riesgo” único e idéntico en el mercado: cada póliza define eventos cubiertos, límites y condiciones.",
          "La conveniencia de una cobertura más amplia depende del vehículo, el uso, las necesidades del titular, el precio y las condiciones concretas ofrecidas."
        ]
      },
      {
        heading: "Cómo decidir en una cotización",
        body: [
          "Definí primero qué querés proteger: solo terceros, o también el capital del propio auto. Después compará propuestas reales con el mismo set de datos del vehículo.",
          "Podés solicitar que te expliquen las diferencias entre propuestas, límites, franquicias y exclusiones antes de decidir."
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
        a: "Un cambio de cobertura puede requerir una nueva evaluación o aceptación de la aseguradora. Consultá las condiciones del contrato vigente."
      }
    ],
    references: [
      { label: "SSN — Seguro automotor", url: "https://www.argentina.gob.ar/node/494955" },
      { label: "SSN — Sujetos habilitados", url: "https://www.argentina.gob.ar/superintendencia-de-seguros/portal-ciudadano/sujetos-habilitados" },
      { label: "SSN — ¿Qué es un seguro?", url: "https://www.argentina.gob.ar/node/428978" }
    ],
    relatedSlugs: ["seguro-auto-mendoza", "factores-precio-seguro-auto"]
  };
