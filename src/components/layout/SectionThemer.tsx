import type { ReactNode } from "react";
import { getTheme, type SectionName } from "@/lib/themes";

/**
 * Envolve uma página/secção e aplica a sua paleta (via classe de tema) e a
 * textura de fundo correspondente. Todos os componentes filhos passam a ler
 * as cores por CSS custom properties — ver globals.css.
 */
export function SectionThemer({
  section,
  children,
  className = "",
}: {
  section: SectionName;
  children: ReactNode;
  className?: string;
}) {
  const theme = getTheme(section);
  return (
    <div
      data-section={section}
      className={`section-themed ${theme.className} ${className}`}
    >
      <div className={theme.texture}>{children}</div>
    </div>
  );
}
