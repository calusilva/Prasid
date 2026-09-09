"use client";

import { motion, useReducedMotion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { CurtainReveal } from "./CurtainReveal";

export function TexteisHero() {
  const reduce = useReducedMotion();

  return (
    <CurtainReveal>
      <section className="relative min-h-[86vh] overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 opacity-70"
          style={{
            background:
              "radial-gradient(70% 60% at 20% 20%, rgba(217,164,65,0.28), transparent 70%)",
          }}
        />
        {/* pregas de tecido de fundo, muito suaves */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 -z-10 w-1/2"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, rgba(58,36,23,0.08) 0 1px, transparent 1px 46px)",
          }}
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1.2 }}
        />

        <Container className="flex min-h-[86vh] flex-col justify-center py-24">
          <p className="font-sans text-xs uppercase tracking-[0.32em] text-[var(--accent)]">
            Divisão Têxteis · desde 1986
          </p>

          <h1 className="mt-6 max-w-[16ch] font-serif text-5xl leading-[1] tracking-tight sm:text-7xl lg:text-[5.5rem]">
            Tecidos e decoração, medida a medida.
          </h1>

          <p className="mt-8 max-w-xl text-lg leading-relaxed text-[var(--ink-soft)]">
            A atividade original da casa: comércio de tecidos e acessórios de
            decoração. Escolha o tecido, dê as medidas do vão e receba uma
            estimativa de cortinado em segundos, com o nosso configurador.
          </p>

          <div className="mt-12 flex flex-wrap gap-4">
            <ButtonLink href="#configurador">Configurar calhas</ButtonLink>
            <ButtonLink href="#materiais" variant="outline">
              Ver materiais
            </ButtonLink>
          </div>
        </Container>
      </section>
    </CurtainReveal>
  );
}
