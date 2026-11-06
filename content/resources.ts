import type { ResourceArticle } from "./resource-types";
import { article as auto } from "./resources/seguro-auto-mendoza";
import { article as autoPrice } from "./resources/factores-precio-seguro-auto";
import { article as rcVsAllRisk } from "./resources/rc-vs-todo-riesgo";
import { article as home } from "./resources/datos-para-cotizar-hogar";
import { article as building } from "./resources/riesgos-consorcios";
import { article as rentalBond } from "./resources/documentacion-caucion-alquiler";
import { article as bicycle } from "./resources/elegir-cobertura-bicicleta";

export type { ResourceArticle } from "./resource-types";

export const resources: ResourceArticle[] = [
  auto,
  autoPrice,
  rcVsAllRisk,
  home,
  building,
  rentalBond,
  bicycle
];

export function getResourceBySlug(slug: string): ResourceArticle | undefined {
  return resources.find((resource) => resource.slug === slug);
}

export function getAllResourceSlugs(): string[] {
  return resources.map((resource) => resource.slug);
}
