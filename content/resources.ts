import type { ResourceArticle } from "./resource-types";
import { article as a0 } from "./resources/seguro-auto-mendoza";
import { article as a1 } from "./resources/factores-precio-seguro-auto";
import { article as a2 } from "./resources/rc-vs-todo-riesgo";
import { article as a3 } from "./resources/datos-para-cotizar-hogar";
import { article as a4 } from "./resources/riesgos-consorcios";
import { article as a5 } from "./resources/documentacion-caucion-alquiler";
import { article as a6 } from "./resources/elegir-cobertura-bicicleta";

export type { ResourceArticle } from "./resource-types";

export const resources: ResourceArticle[] = [a0, a1, a2, a3, a4, a5, a6];

/** @deprecated Use `resources` */
export const resourceSeeds = resources.map(({ slug, question }) => ({ slug, question }));

export function getResourceBySlug(slug: string): ResourceArticle | undefined {
  return resources.find((r) => r.slug === slug);
}

export function getAllResourceSlugs(): string[] {
  return resources.map((r) => r.slug);
}
