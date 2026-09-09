"use client";

import { motion, useReducedMotion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { company } from "@/lib/company";

/**
 * Hero da Home. Tipografia serif enorme, layout assimétrico: o título ocupa
 * a coluna esquerda larga, a linha do tempo condensada encosta à direita.
 */
export function Hero() {
  const reduce = useReducedMotion();

  const words = ["Químicos", "e", "têxteis", "sob", "o", "mesmo", "teto."];

  return (
    <section className="relative overflow-hidden pt-16 pb-24 sm:pt-24 sm:pb-32">
      <Container>
        <p className="font-sans text-xs uppercase tracking-[0.3em] text-[var(--accent)]">
          {company.legalName}
        </p>

        <h1 className="mt-8 max-w-[14ch] font-serif text-[13vw] leading-[0.95] tracking-tight sm:text-[9vw] lg:text-[7.5rem]">
          {words.map((w, i) => (
            <motion.span
              key={i}
              className="mr-[0.25em] inline-block"
              initial={reduce ? false : { opacity: 0, y: "0.4em" }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.06 * i,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {w}
            </motion.span>
          ))}
        </h1>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <motion.p
            className="max-w-xl text-lg leading-relaxed text-[var(--ink-soft)]"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            {company.tagline} Duas divisões complementares — uma para a indústria
            e os serviços, outra para a decoração — geridas com a proximidade de
            uma empresa familiar.
          </motion.p>

          {/* Linha do tempo condensada */}
          <motion.ol
            className="flex flex-col gap-4 border-l border-[var(--line)] pl-6"
            initial={reduce ? false : { opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            {company.timeline.map((t) => (
              <li key={t.year} className="grid grid-cols-[4rem_1fr] gap-4">
                <span className="font-serif text-xl text-[var(--accent)]">
                  {t.year}
                </span>
                <span className="text-sm leading-snug text-[var(--ink-soft)]">
                  <strong className="font-medium text-[var(--ink)]">
                    {t.title}.
                  </strong>{" "}
                  {t.text}
                </span>
              </li>
            ))}
          </motion.ol>
        </div>

        <motion.div
          className="mt-14 flex flex-wrap gap-4"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <ButtonLink href="/quimicos" variant="outline">
            Divisão Químicos
          </ButtonLink>
          <ButtonLink href="/texteis" variant="outline">
            Divisão Têxteis
          </ButtonLink>
        </motion.div>
      </Container>
    </section>
  );
}
