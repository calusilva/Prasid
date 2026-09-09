import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

/** Apresentação da área têxtil — texto editorial, layout assimétrico. */
export function TexteisIntro() {
  return (
    <section className="py-24 sm:py-32">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <Reveal>
            <p className="font-sans text-xs uppercase tracking-[0.28em] text-[var(--accent)]">
              A área
            </p>
            <p className="mt-4 font-serif text-3xl leading-tight">
              Tecidos e acessórios de decoração — o negócio com que tudo começou,
              em 1986.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="space-y-5 text-lg leading-relaxed text-[var(--ink-soft)]">
            <p>
              Fornecemos retalhistas, decoradores e instaladores de cortinados com
              tecidos de metro, forros técnicos e todas as ferragens necessárias —
              calhas, varões, fitas de franzir, argolas e abraçadeiras.
            </p>
            <p>
              Mantemos stock das referências correntes e encomendamos coleções
              específicas a fornecedores nacionais e europeus. Amostras físicas
              são enviadas a pedido, sem compromisso.
            </p>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
