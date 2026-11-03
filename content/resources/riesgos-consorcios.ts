import type { ResourceArticle } from "../resource-types";

export const article: ResourceArticle = {
    slug: "riesgos-consorcios",
    question: "¿Qué riesgos deben considerar los administradores de consorcios?",
    title: "Riesgos que deben considerar los administradores de consorcios",
    metaDescription:
      "Riesgos habituales en consorcios y edificios en Mendoza: áreas comunes, responsabilidad civil e infraestructura. Guía para administradores.",
    formId: "consorcio",
    answer:
      "Los administradores de consorcios suelen evaluar riesgos de áreas comunes (incendios, daños estructurales, instalaciones), responsabilidad civil frente a terceros y ocupantes, y eventos que afecten la operatoria del edificio. El seguro de consorcio no reemplaza el reglamento interno ni las obligaciones legales del administrador, pero ayuda a transferir parte del riesgo económico según las condiciones de la póliza.",
    sections: [
      {
        heading: "Áreas comunes e infraestructura",
        body: [
          "Halls, ascensores, salas de máquinas, techos y cocheras comunes concentran riesgos de daño material y de interrupción de servicios. La superficie, la antigüedad y el material de construcción son datos típicos al cotizar.",
          "Cada compañía define qué bienes y qué eventos entran en cobertura; por eso la descripción del edificio debe ser precisa."
        ]
      },
      {
        heading: "Responsabilidad civil del consorcio",
        body: [
          "Daños a terceros o a unidades funcionales derivados de partes comunes son un punto sensible. Los límites de RC y las exclusiones deben revisarse con el consejo o la administración antes de contratar o renovar.",
          "Un siniestro mal dimensionado puede impactar las expensas; por eso conviene alinear suma y alcance con el tamaño del edificio."
        ]
      },
      {
        heading: "Rol del administrador en la cotización",
        body: [
          "El administrador o un representante autorizado suele reunir los datos del edificio y canalizar las propuestas al consorcio. La decisión de contratación corresponde a los órganos que fije el reglamento y la normativa aplicable.",
          "Contar con un productor que conozca el mercado local agiliza la comparación entre compañías con experiencia en edificios."
        ]
      }
    ],
    faqs: [
      {
        q: "¿El seguro del consorcio cubre cada departamento?",
        a: "En general se enfoca en partes comunes y responsabilidad del consorcio. Las unidades funcionales suelen requerir seguro de hogar propio, según lo que decida cada propietario."
      },
      {
        q: "¿Qué datos del edificio se necesitan?",
        a: "Ubicación, superficie aproximada, material de construcción, uso de áreas comunes y, cuando aplica, detalles de instalaciones relevantes."
      }
    ],
    relatedSlugs: ["datos-para-cotizar-hogar"]
  };
