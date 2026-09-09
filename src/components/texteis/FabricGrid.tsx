import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { texteisMateriais } from "@/lib/divisions";

/**
 * Tipos de tecido / materiais disponíveis. Cada cartão tem a classe
 * `hover-ripple` — ondulação suave de tecido ao passar o rato.
 */
export function FabricGrid() {
  // Amostras de cor aproximadas (placeholder até haver fotografia real).
  const swatches = ["#c9ad88", "#b4632f", "#7c5a43", "#d9a441", "#8a6f52", "#e7dccb"];

  return (
    <section id="materiais" className="py-24 sm:py-32">
      <Container>
        <SectionHeading
          kicker="Materiais"
          title="Tecidos que trabalhamos"
          intro="Uma seleção transversal, de transparentes leves a blackout técnico. As amostras físicas são enviadas a pedido."
        />

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {texteisMateriais.map((m, i) => (
            <Reveal key={m.titulo} delay={i * 0.06}>
              <article className="hover-ripple flex h-full flex-col rounded-2xl border border-[var(--line)] bg-[var(--bg-elev)] p-6">
                <div
                  aria-hidden
                  className="mb-5 h-24 rounded-lg"
                  style={{
                    background: `linear-gradient(135deg, ${swatches[i % swatches.length]}, ${
                      swatches[(i + 2) % swatches.length]
                    })`,
                  }}
                />
                <h3 className="font-serif text-xl">{m.titulo}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--ink-soft)]">
                  {m.descricao}
                </p>
                <ul className="mt-4 space-y-1 text-xs text-[var(--ink-soft)]">
                  {m.exemplos.map((ex) => (
                    <li key={ex} className="flex items-center gap-2">
                      <span className="h-1 w-1 rounded-full bg-[var(--accent)]" />
                      {ex}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
