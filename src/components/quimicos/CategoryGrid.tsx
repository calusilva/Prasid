import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { quimicosCategorias } from "@/lib/divisions";

/** Categorias de produto — grelha técnica, numeração visível. */
export function CategoryGrid() {
  return (
    <section id="categorias" className="py-24 sm:py-32">
      <Container>
        <SectionHeading
          kicker="Categorias"
          title="Quatro famílias de produto"
          intro="Trabalhamos por grosso, com marcas próprias e de fornecedores europeus de referência. As imagens de produto são adicionadas caso a caso à ficha comercial."
        />

        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--line)] sm:grid-cols-2">
          {quimicosCategorias.map((cat, i) => (
            <Reveal
              key={cat.titulo}
              delay={i * 0.06}
              className="group relative bg-[var(--bg-elev)] p-8 transition-colors hover:bg-[var(--surface)] sm:p-10"
            >
              <span className="font-mono text-xs text-[var(--accent-2)]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 font-serif text-2xl">{cat.titulo}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--ink-soft)]">
                {cat.descricao}
              </p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {cat.exemplos.map((ex) => (
                  <li
                    key={ex}
                    className="rounded-full border border-[var(--line)] px-3 py-1 font-mono text-[11px] tracking-wide text-[var(--ink-soft)]"
                  >
                    {ex}
                  </li>
                ))}
              </ul>
              {/* placeholder de imagem */}
              <div
                aria-hidden
                className="mt-6 h-28 rounded-lg border border-dashed border-[var(--line)] bg-gradient-to-br from-[var(--surface)] to-transparent"
              />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
