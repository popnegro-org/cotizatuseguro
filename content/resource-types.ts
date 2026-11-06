import type { FormProductId } from "./site";

export type ResourceArticle = {
  slug: string;
  question: string;
  title: string;
  metaDescription: string;
  formId: FormProductId;
  answer: string;
  sections: { heading: string; body: string[] }[];
  faqs: { q: string; a: string }[];
  relatedSlugs?: string[];
};
