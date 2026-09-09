"use client";

import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";

// Canvas pesado — carregado apenas no cliente, depois do conteúdo.
const FluidCanvas = dynamic(
  () => import("./FluidCanvas").then((m) => m.FluidCanvas),
  { ssr: false },
);

export function QuimicosHero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative min-h-[88vh] overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <FluidCanvas />
      </div>
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-60"
        style={{
          background:
            "radial-gradient(80% 60% at 70% 10%, rgba(124,77,255,0.18), transparent 70%)",
        }}
      />

      <Container className="flex min-h-[88vh] flex-col justify-center py-24">
        <motion.p
          className="font-mono text-xs uppercase tracking-[0.32em] text-[var(--accent-2)]"
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Divisão Químicos · desde 2006
        </motion.p>

        <motion.h1
          className="mt-6 max-w-[18ch] font-serif text-5xl leading-[1.02] tracking-tight sm:text-7xl lg:text-[5.5rem]"
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          Química de processo, higiene e limpeza — por grosso.
        </motion.h1>

        <motion.p
          className="mt-8 max-w-xl text-lg leading-relaxed text-[var(--ink-soft)]"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Fornecemos indústria têxtil, hotelaria e empresas de limpeza
          profissional com produtos químicos industriais, auxiliares têxteis e
          gamas de higiene — com ficha técnica, dosagem e apoio à aplicação.
        </motion.p>

        <motion.div
          className="mt-12 flex flex-wrap gap-4"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <ButtonLink href="#contacto-comercial">Contacto comercial</ButtonLink>
          <ButtonLink href="#categorias" variant="outline">
            Ver categorias
          </ButtonLink>
        </motion.div>
      </Container>
    </section>
  );
}
