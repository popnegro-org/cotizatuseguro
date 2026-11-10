export type FormProductId =
  | "auto"
  | "moto"
  | "hogar"
  | "consorcio"
  | "bicicleta"
  | "caucion_alquiler";

export type ProductSeo = {
  slug: string;
  formId: FormProductId;
  title: string;
  shortTitle: string;
  landingTitle: string;
  landingDescription: string;
  landingShortDescription: string;
  category: "VEHÍCULOS" | "VIVIENDA" | "EDIFICIOS" | "MOVILIDAD" | "GARANTÍAS";
  metaDescription: string;
  h1: string;
  intro: string;
  benefits: string[];
  faqs: { q: string; a: string }[];
  icon: string;
};

export const SITE_URL = "https://cotizatuseguro.com.ar";

export const products: ProductSeo[] = [
  {
    slug: "auto",
    formId: "auto",
    title: "Seguro de auto en Mendoza",
    shortTitle: "Auto",
    landingTitle: "Autos",
    landingDescription: "Consultá alternativas de responsabilidad civil, robo y daños. La cobertura disponible depende de la propuesta y de las condiciones de la póliza.",
    landingShortDescription: "Consultá por responsabilidad civil, robo y daños.",
    category: "VEHÍCULOS",
    metaDescription:
      "Cotizá seguro de auto en Mendoza con Agustín Montes. Consultá alternativas de responsabilidad civil, robo y daños. Las condiciones dependen de cada propuesta.",
    h1: "Seguro de auto en Mendoza",
    intro:
      "Asesoramiento personalizado para cotizar la cobertura de tu auto o camioneta en Mendoza. Evaluamos uso, antigüedad y necesidades para proponerte opciones claras, sin compromiso de compra.",
    benefits: [
      "Revisión de alternativas disponibles según los datos del vehículo",
      "Orientación sobre responsabilidad civil, robo y daños parciales o totales",
      "Proceso simple: datos básicos y seguimiento por WhatsApp",
      "Orientación durante la gestión de la solicitud"
    ],
    faqs: [
      {
        q: "¿Qué datos necesito para cotizar un seguro de auto?",
        a: "Marca, modelo, año y uso del vehículo, más tus datos de contacto y localidad. Con eso armamos propuestas orientativas."
      },
      {
        q: "¿Trabajan con varias aseguradoras?",
        a: "La disponibilidad de aseguradoras y coberturas se confirma al revisar los datos del riesgo. La propuesta permite conocer las condiciones y el precio antes de decidir."
      },
      {
        q: "¿La cotización tiene costo?",
        a: "El costo y las condiciones de la cobertura se informan en la propuesta antes de contratar."
      }
    ],
    icon: "🚘"
  },
  {
    slug: "moto",
    formId: "moto",
    title: "Seguro de moto en Mendoza",
    shortTitle: "Moto",
    landingTitle: "Motos",
    landingDescription: "Solicitá alternativas para tu moto o ciclomotor. Los servicios adicionales, como auxilio mecánico, dependen del producto y sus condiciones.",
    landingShortDescription: "Alternativas según el tipo de moto y cobertura.",
    category: "VEHÍCULOS",
    metaDescription:
      "Cotizá seguro de moto o ciclomotor en Mendoza. Opciones de RC, robo y daños según tipo de moto. Asesoramiento de Agustín Montes.",
    h1: "Seguro de moto en Mendoza",
    intro:
      "Cotizá coberturas para motos y ciclomotores en Mendoza. Te orientamos según cilindrada, uso y presupuesto para encontrar alternativas claras.",
    benefits: [
      "Opciones adaptadas a motos de baja, media y alta cilindrada",
      "Evaluación de responsabilidad civil y coberturas adicionales",
      "Seguimiento de la consulta por WhatsApp",
      "Atención de consultas desde Mendoza"
    ],
    faqs: [
      {
        q: "¿Puedo asegurar una moto usada?",
        a: "Sí. La aceptabilidad y las condiciones dependen de la compañía, el año y el estado del vehículo."
      },
      {
        q: "¿Qué cubre un seguro de moto básico?",
        a: "En general la responsabilidad civil es el núcleo. Robo, daños y auxilio dependen del producto contratado."
      }
    ],
    icon: "🏍️"
  },
  {
    slug: "hogar",
    formId: "hogar",
    title: "Seguro de hogar en Mendoza",
    shortTitle: "Hogar",
    landingTitle: "Hogar",
    landingDescription: "Consultá por opciones relacionadas con incendio, robo de contenidos, daños por agua y responsabilidad civil, según las condiciones de cada póliza.",
    landingShortDescription: "Consultá por riesgos del hogar.",
    category: "VIVIENDA",
    metaDescription:
      "Cotizá seguro de hogar en Mendoza: incendio, robo de contenidos, daños por agua y responsabilidad civil. Asesoramiento personalizado.",
    h1: "Seguro de hogar en Mendoza",
    intro:
      "Protegé tu vivienda y contenidos con opciones claras. Cotizamos seguros de hogar en Mendoza considerando superficie, ubicación y tipo de ocupación.",
    benefits: [
      "Coberturas orientadas a incendio, robo y daños por agua",
      "Evaluación de responsabilidad civil del hogar",
      "Propuestas según vivienda permanente o de uso temporal",
      "Asesoramiento para revisar alternativas de cobertura"
    ],
    faqs: [
      {
        q: "¿Qué información se necesita para cotizar?",
        a: "Superficie aproximada, ubicación, tipo de vivienda (casa o departamento) y si es de uso permanente o temporal."
      },
      {
        q: "¿Cubre el contenido o solo el edificio?",
        a: "Depende de la póliza. Podemos cotizar edificio, contenidos o ambos según lo que necesites."
      }
    ],
    icon: "🏡"
  },
  {
    slug: "consorcio",
    formId: "consorcio",
    title: "Seguro de consorcio en Mendoza",
    shortTitle: "Consorcio",
    landingTitle: "Consorcio",
    landingDescription: "Solicitá una evaluación para el edificio, las áreas comunes y las características del consorcio. Las coberturas dependen de la propuesta.",
    landingShortDescription: "Opciones para edificios y espacios comunes.",
    category: "EDIFICIOS",
    metaDescription:
      "Seguro de consorcio y edificios en Mendoza. Evaluación de áreas comunes, responsabilidad civil y riesgos del edificio. Asesoramiento para administradores.",
    h1: "Seguro de consorcio en Mendoza",
    intro:
      "Asesoramos a administradores y consorcistas para cotizar coberturas de edificios y áreas comunes en Mendoza, con foco en riesgos reales del inmueble.",
    benefits: [
      "Evaluación de riesgos de áreas comunes e infraestructura",
      "Orientación para administradores de consorcio",
      "Revisión de alternativas disponibles para el edificio",
      "Seguimiento local y respuesta por WhatsApp"
    ],
    faqs: [
      {
        q: "¿Quién puede solicitar la cotización?",
        a: "Administradores, miembros del consejo o representantes autorizados del consorcio."
      },
      {
        q: "¿Qué datos del edificio se necesitan?",
        a: "Ubicación, superficie aproximada, material de construcción y tipo de actividad o uso de las áreas comunes."
      }
    ],
    icon: "🏢"
  },
  {
    slug: "bicicleta",
    formId: "bicicleta",
    title: "Seguro de bicicleta en Mendoza",
    shortTitle: "Bicicleta",
    landingTitle: "Bicicleta",
    landingDescription: "Consultá alternativas para asegurar tu bicicleta y revisá los riesgos, límites y condiciones ofrecidos en cada propuesta.",
    landingShortDescription: "Alternativas para bicicletas.",
    category: "MOVILIDAD",
    metaDescription:
      "Cotizá seguro para bicicleta en Mendoza. Coberturas orientadas a robo y daños según valor y uso. Asesoramiento de Agustín Montes.",
    h1: "Seguro de bicicleta en Mendoza",
    intro:
      "Cotizá opciones para proteger tu bicicleta en Mendoza. Evaluamos valor, rodado y material para proponerte alternativas acordes.",
    benefits: [
      "Coberturas orientadas a bicicletas de uso urbano o deportivo",
      "Evaluación según valor asegurado y características",
      "Proceso simple de cotización",
      "Asesoramiento para consultas desde Mendoza"
    ],
    faqs: [
      {
        q: "¿Qué datos de la bicicleta se piden?",
        a: "Marca, modelo, año aproximado, rodado, material y suma asegurada orientativa."
      },
      {
        q: "¿Sirve para bicicletas eléctricas?",
        a: "Depende de la compañía y del producto. Consultanos con los datos y te orientamos."
      }
    ],
    icon: "🚲"
  },
  {
    slug: "caucion-alquiler",
    formId: "caucion_alquiler",
    title: "Caución de alquiler en Mendoza",
    shortTitle: "Caución alquiler",
    landingTitle: "Caución alquiler",
    landingDescription: "Consultá por una garantía de caución para alquiler de vivienda o comercio. La aprobación y los requisitos dependen de la evaluación del proveedor.",
    landingShortDescription: "Consulta por caución de alquiler.",
    category: "GARANTÍAS",
    metaDescription:
      "Cotizá caución de alquiler en Mendoza para vivienda o comercio. Consultá requisitos y condiciones de una garantía de caución para alquiler.",
    h1: "Caución de alquiler en Mendoza",
    intro:
      "Consultá por una garantía de caución para alquiler de vivienda o local comercial en Mendoza. Evaluamos requisitos y te orientamos en el proceso.",
    benefits: [
      "Alternativa a depósito en efectivo o garantía de un tercero",
      "Orientación sobre documentación habitual",
      "Evaluación para vivienda y comercio",
      "Seguimiento de la consulta por WhatsApp"
    ],
    faqs: [
      {
        q: "¿Qué documentación suele pedirse?",
        a: "Datos del inquilino, del contrato (monto y duración) y documentación personal o laboral según el proveedor."
      },
      {
        q: "¿La aprobación es automática?",
        a: "No. Depende de la evaluación del proveedor de la caución y de la documentación presentada."
      }
    ],
    icon: "🔑"
  }
];

export function getProductBySlug(slug: string): ProductSeo | undefined {
  return products.find((p) => p.slug === slug);
}

export const seoNav = [
  { href: "/seguros-en-mendoza", label: "Seguros en Mendoza" },
  { href: "/sobre-agustin-montes", label: "Sobre Agustín" },
  { href: "/recursos", label: "Recursos" },
  { href: "/#cotizar", label: "Cotizar" }
] as const;
