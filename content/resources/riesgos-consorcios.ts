import type { ResourceArticle } from "../resource-types";

export const article: ResourceArticle = {
    slug: "riesgos-consorcios",
    question: "¿Qué riesgos deben considerar los administradores de consorcios?",
    title: "Riesgos que deben considerar los administradores de consorcios",
    metaDescription:
      "Riesgos habituales en consorcios y edificios en Mendoza: áreas comunes, responsabilidad civil e infraestructura. Guía para administradores.",
    formId: "consorcio",
    answer:
      "Al consultar por un seguro de consorcio conviene describir el edificio, las áreas comunes, las instalaciones y los riesgos que se desean evaluar. La póliza puede contemplar determinados daños materiales y responsabilidades, pero el alcance depende de las coberturas contratadas, sus límites y exclusiones.",
    sections: [
      {
        heading: "Áreas comunes e infraestructura",
        body: [
          "Para describir el inmueble pueden solicitarse superficie, antigüedad, materiales, cantidad de plantas, instalaciones y características de los espacios comunes. La información requerida depende de la aseguradora.",
          "Cada compañía define qué bienes y qué eventos entran en cobertura; por eso la descripción del edificio debe ser precisa."
        ]
      },
      {
        heading: "Responsabilidad civil del consorcio",
        body: [
          "La responsabilidad civil del consorcio debe analizarse según los supuestos incluidos en la póliza, los límites y las exclusiones. No toda responsabilidad ni todo daño a una unidad funcional queda automáticamente cubierto.",
          "La suma asegurada y los límites deben revisarse en relación con las características y valores declarados del edificio. La definición requiere evaluar las condiciones concretas de la propuesta."
        ]
      },
      {
        heading: "Rol del administrador en la cotización",
        body: [
          "El administrador o un representante autorizado suele reunir los datos del edificio y canalizar las propuestas al consorcio. La autorización para contratar debe seguir el reglamento de propiedad horizontal y las decisiones válidas del consorcio. Ante dudas, corresponde consultar a la administración o asesoría legal.",
          "Un productor puede ayudarte a ordenar los datos del edificio y revisar las diferencias entre las propuestas disponibles."
        ]
      }
    ],
    faqs: [
      {
        q: "¿El seguro del consorcio cubre cada departamento?",
        a: "El alcance sobre partes comunes y unidades funcionales depende de lo que describa y cubra la póliza. No supongas que el seguro del consorcio reemplaza el seguro individual de cada unidad: revisá las condiciones contratadas."
      },
      {
        q: "¿Qué datos del edificio se necesitan?",
        a: "Ubicación, superficie aproximada, material de construcción, uso de áreas comunes y, cuando aplica, detalles de instalaciones relevantes."
      }
    ],
    references: [
      { label: "SSN — Sujetos habilitados", url: "https://www.argentina.gob.ar/superintendencia-de-seguros/portal-ciudadano/sujetos-habilitados" },
      { label: "SSN — ¿Qué es un seguro?", url: "https://www.argentina.gob.ar/node/428978" }
    ],
    relatedSlugs: ["datos-para-cotizar-hogar"]
  };
