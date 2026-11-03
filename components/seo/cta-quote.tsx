import Link from "next/link";
import type { FormProductId } from "../../content/site";

export function CtaQuote({
  product,
  label = "Solicitar cotización"
}: {
  product?: FormProductId;
  label?: string;
}) {
  const href = product ? `/#cotizar?producto=${product}` : "/#cotizar";
  return (
    <Link className="button header-cta" href={href}>
      {label} <span aria-hidden="true">→</span>
    </Link>
  );
}
