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
          "Autos más nuevos o de mayor valor de reposición suelen tener primas más altas en coberturas sobre el propio bien. Modelos con mayor siniestralidad estadística o repuestos costosos también pueden encarecer la propuesta.",
          "El año, la versión y si el vehículo tiene rastreador u otros elementos de seguridad son datos que algunas compañías consideran al cotizar."
        ]
      },
      {
        heading: "Coberturas y franquicias",
        body: [
          "Una póliza centrada en responsabilidad civil no se compara de forma lineal con un producto que incluye robo y daños totales. Ampliar coberturas o bajar franquicias suele aumentar el costo; lo inverso puede bajarlo, a cambio de mayor exposición del asegurado.",
          "Por eso es importante leer qué está incluido y qué queda fuera, no solo el valor de la cuota."
        ]
      },
      {
        heading: "Uso, zona y perfil",
        body: [
          "El uso particular versus laboral, los kilómetros aproximados y la zona de guarda o circulación influyen en la tarifa según el modelo de cada aseguradora. En Mendoza, como en el resto del país, la suscripción combina reglas automáticas y revisión caso a caso.",
          "La mejor forma de conocer el precio real es cotizar con datos concretos: sin eso, cualquier cifra genérica es solo una referencia débil."
        ]
      }
    ],
    faqs: [
      {
        q: "¿Por qué cambió el precio en la renovación?",
        a: "Puede deberse a actualización de suma asegurada, siniestralidad, cambios de tarifa de la compañía o modificación de coberturas. Conviene pedir el detalle al renovar."
      },
      {
        q: "¿Conviene el plan más barato?",
        a: "No siempre. Un precio bajo con límites estrechos o muchas exclusiones puede no resolver el riesgo que querés cubrir. Compará condiciones, no solo la cuota."
      }
    ],
    relatedSlugs: ["seguro-auto-mendoza", "rc-vs-todo-riesgo"]
  };
