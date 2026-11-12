import type { FormProductId } from "./site";

export type ResourceArticle = {
  slug: string;
  question: string;
  title: string;
  metaDescription: string;
  formId: FormProductId;
  datePublished: string;
  dateModified: string;
  author: {
    name: string;
    jobTitle: string;
    url: string;
  };
  answer: string;
  sections: { heading: string; body: string[] }[];
  faqs: { q: string; a: string }[];
  references: { label: string; url: string }[];
  relatedSlugs?: string[];
};
