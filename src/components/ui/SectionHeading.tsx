import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

/**
 * Cabeçalho de bloco: número/etiqueta pequena em sans + título grande em serif.
 * Layout deliberadamente assimétrico — a etiqueta "solta-se" à esquerda.
 */
export function SectionHeading({
  kicker,
  title,
  intro,
  align = "left",
}: {
  kicker?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
}) {
  return (
    <header
      className={
        align === "center"
          ? "mx-auto max-w-2xl text-center"
          : "max-w-2xl"
      }
    >
      {kicker && (
        <Reveal>
          <p className="mb-4 font-sans text-xs uppercase tracking-[0.28em] text-[var(--accent)]">
            {kicker}
          </p>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <h2 className="font-serif text-4xl leading-[1.05] tracking-tight sm:text-5xl">
          {title}
        </h2>
      </Reveal>
      {intro && (
        <Reveal delay={0.1}>
          <p className="mt-6 text-lg leading-relaxed text-[var(--ink-soft)]">
            {intro}
          </p>
        </Reveal>
      )}
    </header>
  );
}
