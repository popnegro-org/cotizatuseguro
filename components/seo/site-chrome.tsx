import { SiteFooter, SiteHeader } from "../site-navigation";

export function SiteChrome({
  children,
  activePath
}: {
  children: React.ReactNode;
  activePath?: string;
}) {
  return (
    <div className="seo-shell">
      <SiteHeader activePath={activePath} quoteHref="/#cotizar" />
      <main id="contenido-principal">{children}</main>
      <SiteFooter quoteHref="/#cotizar" />
    </div>
  );
}
