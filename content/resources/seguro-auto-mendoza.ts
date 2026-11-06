import type { ResourceArticle } from "../resource-types";

export const article: ResourceArticle = {
    slug: "seguro-auto-mendoza",
    question: "¿Qué seguro necesita un auto en Mendoza?",
    title: "Qué seguro necesita un auto en Mendoza",
    metaDescription:
      "Guía orientativa sobre seguros de auto en Mendoza: responsabilidad civil, robo, daños y cómo cotizar. Asesoramiento de Agustín Montes.",
    formId: "auto",
    answer:
      "La Ley 24.449, artículo 68, exige que los automotores, acoplados y semiacoplados cuenten con seguro para cubrir daños eventuales a terceros, transportados o no; la misma obligación alcanza a las motocicletas. La autoridad aseguradora fija las condiciones del seguro obligatorio. Las coberturas adicionales sobre el propio vehículo —como robo, incendio o daños— dependen de la propuesta y de las condiciones de cada póliza.",
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
        a: "Sí. El artículo 68 de la Ley 24.449 exige que los automotores y las motocicletas cuenten con seguro que cubra daños eventuales a terceros, transportados o no, bajo las condiciones fijadas por la autoridad aseguradora. El artículo 40 también exige llevar el comprobante del seguro vigente. Revisá la normativa y las condiciones aplicables a tu vehículo."
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
    references: [
      { label: "Ley 24.449, artículo 68 — Seguro obligatorio", url: "https://www.argentina.gob.ar/normativa/nacional/ley-24449-818/actualizacion" },
      { label: "SSN — Seguro automotor", url: "https://www.argentina.gob.ar/node/494955" },
      { label: "SSN — Sujetos habilitados", url: "https://www.argentina.gob.ar/superintendencia-de-seguros/portal-ciudadano/sujetos-habilitados" },
      { label: "SSN — ¿Qué es un seguro?", url: "https://www.argentina.gob.ar/node/428978" }
    ],
    relatedSlugs: ["factores-precio-seguro-auto", "rc-vs-todo-riesgo"]
  };
