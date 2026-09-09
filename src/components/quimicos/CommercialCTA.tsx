import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { company } from "@/lib/company";

/** CTA de contacto comercial da divisão Químicos. */
export function CommercialCTA() {
  return (
    <section id="contacto-comercial" className="py-24 sm:py-32">
      <Container>
        <Reveal className="relative overflow-hidden rounded-3xl border border-[var(--line)] bg-[var(--surface)] p-10 sm:p-16">
          <span
            aria-hidden
            className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full opacity-40 blur-3xl"
            style={{ backgroundColor: "var(--accent)" }}
          />
          <div className="relative grid gap-8 lg:grid-cols-[1.3fr_0.7fr] lg:items-center">
            <div>
              <h2 className="font-serif text-4xl leading-tight tracking-tight sm:text-5xl">
                Precisa de uma cotação por grosso?
              </h2>
              <p className="mt-5 max-w-lg text-[var(--ink-soft)]">
                Diga-nos o produto, o consumo estimado e o setor. Preparamos
                proposta com ficha técnica e condições de fornecimento.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <ButtonLink href={`mailto:${company.email.general}?subject=Pedido%20de%20cota%C3%A7%C3%A3o%20-%20Qu%C3%ADmicos`}>
                Enviar email comercial
              </ButtonLink>
              <ButtonLink href={`tel:${company.phone.href}`} variant="outline">
                {company.phone.display}
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
