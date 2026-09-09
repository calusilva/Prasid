import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { company } from "@/lib/company";

/** "Sobre nós" — missão + valores + décadas de experiência. */
export function About() {
  const anos = new Date().getFullYear() - company.founded;

  return (
    <section id="empresa" className="border-y border-[var(--line)] py-24 sm:py-32">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionHeading
            kicker="Sobre nós"
            title={
              <>
                {anos} anos a<br />
                abastecer quem produz.
              </>
            }
            intro={company.mission}
          />

          <div className="grid gap-px overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--line)] sm:grid-cols-3">
            {company.values.map((v, i) => (
              <Reveal
                key={v.title}
                delay={i * 0.08}
                className="bg-[var(--bg-elev)] p-7"
              >
                <p className="font-serif text-2xl">{v.title}</p>
                <p className="mt-3 text-sm leading-relaxed text-[var(--ink-soft)]">
                  {v.text}
                </p>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal className="mt-16 grid gap-8 border-t border-[var(--line)] pt-10 sm:grid-cols-3">
          <Stat n={`${company.founded}`} label="Ano de fundação, como David Andrade, Lda" />
          <Stat n="2" label="Divisões complementares: químicos e têxteis" />
          <Stat n={`${anos}+`} label="Anos de relações comerciais contínuas" />
        </Reveal>
      </Container>
    </section>
  );
}

function Stat({ n, label }: { n: string; label: string }) {
  return (
    <div>
      <p className="font-serif text-5xl tracking-tight text-[var(--accent)]">
        {n}
      </p>
      <p className="mt-2 max-w-[24ch] text-sm text-[var(--ink-soft)]">{label}</p>
    </div>
  );
}
