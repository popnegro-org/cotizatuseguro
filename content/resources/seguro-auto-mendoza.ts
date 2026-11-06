import type { ResourceArticle } from "../resource-types";

export const article: ResourceArticle = {
    slug: "seguro-auto-mendoza",
    question: "¿Qué seguro necesita un auto en Mendoza?",
    title: "Qué seguro necesita un auto en Mendoza",
    metaDescription:
      "Guía orientativa sobre seguros de auto en Mendoza: responsabilidad civil, robo, daños y cómo cotizar. Asesoramiento de Agustín Montes.",
    formId: "auto",
    answer:
      "En la práctica, un auto en Mendoza suele cotizarse al menos con responsabilidad civil (daños a terceros) y, según el valor y el uso del vehículo, con coberturas de robo, incendio y daños parciales o totales. No existe una única póliza obligatoria igual para todos: las condiciones, exclusiones y precios dependen de cada compañía y de la evaluación del riesgo.",
    sections: [
      {
        heading: "Responsabilidad civil: el núcleo habitual",
        body: [
          "La responsabilidad civil cubre, dentro de los límites de la póliza, daños que el vehículo asegurado cause a terceros (personas o bienes). Es la base más consultada al armar una cotización, porque responde a un riesgo cotidiano de circulación.",
          "Los límites de cobertura, franquicias y exclusiones varían por producto. Por eso conviene comparar propuestas concretas y no solo el precio mensual."
        ]
      },
      {
        heading: "Robo, incendio y daños propios",
        body: [
          "Si el auto tiene un valor de reposición relevante, muchas personas evalúan sumar coberturas sobre el propio vehículo: robo total o parcial, incendio y daños por accidente. La disponibilidad y el alcance dependen de la compañía, del año del vehículo y de otras variables de suscripción.",
          "En Mendoza el uso urbano, los trayectos interurbanos y el estacionamiento influyen en cómo se analiza el riesgo, pero la decisión final de cada aseguradora se basa en su propia política de aceptación."
        ]
      },
      {
        heading: "Cómo cotizar de forma ordenada",
        body: [
          "Para armar propuestas útiles suelen pedir marca, modelo, año, uso del vehículo y datos de contacto con localidad. Con eso se pueden comparar alternativas de distintas compañías sin compromiso de contratación.",
          "La cotización es orientativa: la emisión y las condiciones definitivas se confirman recién al aceptar una propuesta y completar la documentación que requiera la aseguradora."
        ]
      }
    ],
    faqs: [
      {
        q: "¿Es obligatorio tener seguro de auto en Argentina?",
        a: "La circulación y la responsabilidad frente a terceros están reguladas por normas nacionales y provinciales. En la práctica, la responsabilidad civil es el punto de partida más consultado. Te conviene verificar la normativa vigente y las exigencias de tu caso particular."
      },
      {
        q: "¿Cuánto tarda una cotización?",
        a: "Con los datos básicos del vehículo y de contacto, suele poder orientarse en poco tiempo. La emisión de la póliza depende de la compañía y de la documentación."
      },
      {
        q: "¿Puedo cambiar de compañía después?",
        a: "Sí, al vencimiento o según las condiciones de cada contrato. Un productor puede ayudarte a comparar renovación versus alternativas nuevas."
      }
    ],
    relatedSlugs: ["factores-precio-seguro-auto", "rc-vs-todo-riesgo"]
  };
