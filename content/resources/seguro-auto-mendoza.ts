import type { ResourceArticle } from "../resource-types";

export const article: ResourceArticle = {
    slug: "seguro-auto-mendoza",
    question: "¿Qué seguro necesita un auto en Mendoza?",
    title: "Qué seguro necesita un auto en Mendoza",
    metaDescription:
      "Guía orientativa sobre seguros de auto en Mendoza: responsabilidad civil, robo, daños y cómo cotizar. Asesoramiento de Agustín Montes.",
    formId: "auto",
    answer:
      "El artículo 68 de la Ley 24.449 establece la obligación de contar con un seguro que cubra daños a terceros, transportados o no, para los vehículos alcanzados por la norma. El alcance exigible y las condiciones deben consultarse en el texto legal y en las disposiciones vigentes de la autoridad de control. Las coberturas sobre el propio vehículo, como robo, incendio o daños, dependen de la póliza contratada.",
    sections: [
      {
        heading: "Responsabilidad civil: el núcleo habitual",
        body: [
          "La cobertura de responsabilidad civil contempla, dentro de los límites y condiciones de la póliza, la responsabilidad por daños a terceros derivados del uso del vehículo. El alcance exacto se determina en el contrato.",
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
          "Para iniciar una consulta suelen solicitar marca, modelo, año, versión, uso del vehículo y datos de contacto y localidad. La aseguradora puede requerir información adicional para evaluar el riesgo.",
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
        a: "El tiempo de evaluación y emisión depende de la aseguradora, de los datos declarados y de la documentación que solicite."
      },
      {
        q: "¿Puedo cambiar de compañía después?",
        a: "La posibilidad de cambiar de aseguradora depende de la vigencia, las condiciones del contrato y los trámites aplicables. Revisá las condiciones antes de solicitar el cambio."
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
