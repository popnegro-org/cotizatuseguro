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
      "Información para cotizar un seguro de auto en Mendoza: datos del vehículo, uso y alternativas sujetas a evaluación de la aseguradora.",
    h1: "Seguro de auto en Mendoza",
    intro:
      "Para consultar por un seguro de auto o camioneta en Mendoza, se consideran datos como marca, modelo, año y uso del vehículo. Las coberturas, el precio y la aceptación dependen de la evaluación de cada aseguradora.",
    benefits: [
      "Datos habituales: marca, modelo, año, versión y uso del vehículo",
      "Revisión de las coberturas, límites, franquicias y exclusiones de cada propuesta",
      "La solicitud permite iniciar la evaluación; no equivale a una póliza",
      "La aseguradora confirma requisitos y condiciones antes de la emisión"
    ],
    faqs: [
      {
        q: "¿Qué datos necesito para cotizar un seguro de auto?",
        a: "Se solicitan datos del vehículo —como marca, modelo, año y uso— y datos de contacto y localidad. La información adicional depende de la aseguradora."
      },
      {
        q: "¿Trabajan con varias aseguradoras?",
        a: "La disponibilidad de aseguradoras y coberturas se confirma al revisar los datos del riesgo. La propuesta permite conocer las condiciones y el precio antes de decidir."
      },
      {
        q: "¿La cotización tiene costo?",
        a: "El sitio no informa una tarifa fija. El precio se conoce al recibir una propuesta para los datos declarados."
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
      "Información para consultar por un seguro de moto en Mendoza. La disponibilidad y el alcance de las coberturas dependen de la evaluación de cada aseguradora.",
    h1: "Seguro de moto en Mendoza",
    intro:
      "Para cotizar un seguro de moto o ciclomotor se revisan sus características y el uso declarado. Cada aseguradora define sus requisitos, coberturas disponibles y condiciones.",
    benefits: [
      "Datos de referencia: tipo, marca, modelo, cilindrada y año de la moto",
      "Revisión de responsabilidad civil y coberturas adicionales incluidas en cada propuesta",
      "Canal de contacto y seguimiento de la solicitud",
      "Página orientada a consultas de seguros en Mendoza"
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
      "Consultá por un seguro de hogar en Mendoza. Los riesgos, límites y exclusiones dependen de las condiciones de cada póliza.",
    h1: "Seguro de hogar en Mendoza",
    intro:
      "Para consultar por un seguro de hogar se consideran la ubicación, el tipo de vivienda, su superficie y el uso del inmueble. La cobertura del edificio y de los contenidos depende de cada propuesta.",
    benefits: [
      "Revisión de riesgos y coberturas disponibles para el inmueble",
      "Revisión de límites, exclusiones y requisitos de la propuesta",
      "Información sobre ocupación y uso habitual o temporal de la vivienda",
      "Comparación de condiciones únicamente cuando existan propuestas disponibles"
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
      "Consultas sobre seguro de consorcio en Mendoza. Los bienes, riesgos, límites y condiciones cubiertos se determinan en cada póliza.",
    h1: "Seguro de consorcio en Mendoza",
    intro:
      "La cotización de un seguro de consorcio requiere información del edificio, sus áreas comunes y las características constructivas. La aceptación y las coberturas dependen de la aseguradora.",
    benefits: [
      "Datos del edificio y descripción de áreas comunes e instalaciones",
      "Información para administradores y representantes autorizados",
      "Revisión de las condiciones incluidas en cada propuesta recibida",
      "Canal de contacto para consultas sobre el edificio"
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
      "Consultá por un seguro de bicicleta en Mendoza. La aceptación, los riesgos cubiertos y los requisitos dependen de cada aseguradora.",
    h1: "Seguro de bicicleta en Mendoza",
    intro:
      "Para solicitar una cotización de bicicleta se pueden requerir marca, modelo, año, valor y características de uso. La cobertura depende de las condiciones del producto disponible.",
    benefits: [
      "Información de uso declarado: urbano, recreativo, deportivo u otro",
      "Revisión del valor declarado y de las características de la bicicleta",
      "Datos necesarios para iniciar una consulta de cotización",
      "Información para consultas desde Mendoza"
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
      "Consultá los requisitos para una garantía de caución de alquiler. La disponibilidad y aprobación dependen del proveedor y de la evaluación del solicitante.",
    h1: "Caución de alquiler en Mendoza",
    intro:
      "La caución de alquiler es una garantía cuyo alcance y aceptación dependen del proveedor, del contrato y de la evaluación del solicitante. La consulta inicial permite conocer los requisitos aplicables.",
    benefits: [
      "Consulta sobre una posible garantía de caución para el contrato de alquiler",
      "Información sobre documentación que puede solicitar el proveedor",
      "Revisión del tipo de contrato: vivienda o uso comercial",
      "Canal de contacto para consultar requisitos y condiciones"
    ],
    faqs: [
      {
        q: "¿Qué documentación suele pedirse?",
        a: "Pueden solicitarse datos del inquilino y del contrato, además de documentación personal o laboral. La lista exacta la define el proveedor."
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
