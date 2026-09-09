/**
 * Sistema de temas por secção.
 *
 * Cada secção do site tem a sua paleta, textura e "temperatura" de animação.
 * O <SectionThemer> aplica estas variáveis como CSS custom properties num
 * wrapper; os componentes leem-nas via classes utilitárias tipo
 * `bg-[var(--bg)]` / `text-[var(--ink)]` — nunca cores hardcoded.
 */

export type SectionName = "home" | "texteis" | "quimicos";

export interface SectionTheme {
  name: SectionName;
  label: string;
  /** Classe aplicada no wrapper (define as vars — ver globals.css). */
  className: string;
  /** Textura de fundo associada (classe utilitária de globals.css). */
  texture: string;
  /** Cor de destaque, útil para JS (ex.: canvas de partículas). */
  accent: string;
  /** Esquema de cor do browser para a secção. */
  colorScheme: "light" | "dark";
}

export const sectionThemes: Record<SectionName, SectionTheme> = {
  home: {
    name: "home",
    label: "Prasid Ibérica",
    className: "theme-home",
    texture: "texture-paper",
    accent: "#8a8578",
    colorScheme: "light",
  },
  texteis: {
    name: "texteis",
    label: "Têxteis",
    className: "theme-texteis",
    texture: "texture-weave",
    accent: "#b4632f",
    colorScheme: "light",
  },
  quimicos: {
    name: "quimicos",
    label: "Químicos",
    className: "theme-quimicos",
    texture: "texture-grid",
    accent: "#7c4dff",
    colorScheme: "dark",
  },
};

export function getTheme(name: SectionName): SectionTheme {
  return sectionThemes[name];
}
