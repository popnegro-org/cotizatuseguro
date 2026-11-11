import type { ResourceArticle } from "../resource-types";

export const article: ResourceArticle = {
    slug: "factores-precio-seguro-auto",
    question: "¿Qué factores influyen en el precio de un seguro de auto?",
    title: "Factores que influyen en el precio del seguro de auto",
    metaDescription:
      "Qué variables suelen impactar el precio de un seguro de auto: vehículo, uso, ubicación, coberturas y compañía. Guía orientativa para Mendoza.",
    formId: "auto",
    answer:
      "El precio de un seguro de auto no es fijo: depende del vehículo (marca, modelo, año y valor), del tipo de cobertura elegida, de la ubicación y uso, del perfil del asegurado según cada compañía y de la política comercial del momento. Dos cotizaciones para el mismo auto pueden diferir porque cada aseguradora pondera el riesgo de forma distinta.",
    sections: [
      {
        heading: "Características del vehículo",
        body: [
          "El valor declarado del vehículo y los costos asociados a su reparación o reposición pueden influir en la evaluación y en el precio. La ponderación de estas variables depende del modelo de cada aseguradora.",
          "El año, la versión y los dispositivos de seguridad son datos que la aseguradora puede solicitar. Su efecto sobre el precio o la aceptación depende de sus criterios de suscripción."
        ]
      },
      {
        heading: "Coberturas y franquicias",
        body: [
          "Una póliza centrada en responsabilidad civil no se compara de forma lineal con un producto que incluye robo y daños totales. El alcance de las coberturas y el importe de la franquicia inciden en el precio de acuerdo con las condiciones de cada producto. Una franquicia implica que una parte del daño queda a cargo del asegurado, según lo pactado.",
          "Por eso es importante leer qué está incluido y qué queda fuera, no solo el valor de la cuota."
        ]
      },
      {
        heading: "Uso, zona y perfil",
        body: [
          "El uso declarado, la zona de guarda o circulación y otros datos del riesgo pueden ser considerados por la aseguradora. No todas las compañías utilizan las mismas variables ni les asignan el mismo peso.",
          "La mejor forma de conocer el precio real es cotizar con datos concretos: sin eso, cualquier cifra genérica es solo una referencia débil."
        ]
      }
    ],
    faqs: [
      {
        q: "¿Por qué cambió el precio en la renovación?",
        a: "El cambio puede relacionarse con modificaciones de tarifa, suma asegurada, coberturas, datos del riesgo u otros criterios de la aseguradora. Solicitá el detalle de los conceptos que cambiaron."
      },
      {
        q: "¿Conviene el plan más barato?",
        a: "El precio por sí solo no permite evaluar una póliza. Revisá riesgos cubiertos, sumas, límites, franquicias, exclusiones y condiciones de contratación."
      }
    ],
    references: [
      { label: "SSN — Seguro automotor", url: "https://www.argentina.gob.ar/node/494955" },
      { label: "SSN — Sujetos habilitados", url: "https://www.argentina.gob.ar/superintendencia-de-seguros/portal-ciudadano/sujetos-habilitados" },
      { label: "SSN — ¿Qué es un seguro?", url: "https://www.argentina.gob.ar/node/428978" }
    ],
    relatedSlugs: ["seguro-auto-mendoza", "rc-vs-todo-riesgo"]
  };
