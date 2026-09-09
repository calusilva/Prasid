import { company, fullAddress } from "@/lib/company";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Bloco de contactos + localização. Usa as cores do tema envolvente,
 * por isso serve tanto a Home como as subsecções.
 */
export function ContactBlock({
  kicker = "Contactos",
  title = "Onde nos encontrar",
  intro,
}: {
  kicker?: string;
  title?: string;
  intro?: string;
}) {
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(
    company.address.mapsQuery,
  )}&output=embed`;

  return (
    <section id="contactos" className="py-24 sm:py-32">
      <Container>
        <SectionHeading kicker={kicker} title={title} intro={intro} />

        <div className="mt-14 grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal className="space-y-8">
            <div>
              <p className="font-sans text-xs uppercase tracking-[0.24em] text-[var(--accent)]">
                Morada
              </p>
              <p className="mt-2 text-lg leading-relaxed">{fullAddress}</p>
            </div>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <p className="font-sans text-xs uppercase tracking-[0.24em] text-[var(--accent)]">
                  Telefone
                </p>
                <a
                  href={`tel:${company.phone.href}`}
                  className="link-underline mt-2 block text-lg"
                >
                  {company.phone.display}
                </a>
              </div>
              <div>
                <p className="font-sans text-xs uppercase tracking-[0.24em] text-[var(--accent)]">
                  Email
                </p>
                <a
                  href={`mailto:${company.email.general}`}
                  className="link-underline mt-2 block break-all text-lg"
                >
                  {company.email.general}
                </a>
              </div>
            </div>
            <div>
              <p className="font-sans text-xs uppercase tracking-[0.24em] text-[var(--accent)]">
                Horário
              </p>
              <p className="mt-2 text-lg">{company.hours}</p>
            </div>
          </Reveal>

          <Reveal
            delay={0.1}
            className="overflow-hidden rounded-2xl border border-[var(--line)]"
          >
            <iframe
              title={`Mapa — ${company.shortName}`}
              src={mapSrc}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-[340px] w-full grayscale-[0.2] sm:h-[420px]"
            />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
