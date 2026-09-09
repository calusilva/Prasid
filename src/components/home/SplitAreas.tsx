"use client";

import Link from "next/link";
import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { Container } from "@/components/ui/Container";

/**
 * "As nossas áreas".
 *
 * Duas metades — Têxteis (quente) e Químicos (frio) — que ao entrar no
 * viewport se separam a partir do centro, dividindo o ecrã. Cada metade
 * já mostra a paleta da sua secção e é um link para a subpágina.
 */
export function SplitAreas() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });

  // Distância de separação entre as duas metades.
  const gap = useTransform(scrollYProgress, [0, 1], [0, 28]);
  const leftX = useTransform(gap, (g) => -g);
  const rightX = useTransform(gap, (g) => g);
  const skew = useTransform(scrollYProgress, [0, 1], [6, 0]);
  const negSkew = useTransform(skew, (s) => -s);

  return (
    <section ref={ref} className="py-24 sm:py-32">
      <Container>
        <p className="mb-4 font-sans text-xs uppercase tracking-[0.28em] text-[var(--accent)]">
          As nossas áreas
        </p>
        <h2 className="max-w-3xl font-serif text-4xl leading-[1.05] tracking-tight sm:text-5xl">
          Uma casa, dois ofícios que raramente se cruzam — e aqui convivem.
        </h2>
      </Container>

      <div className="mt-16 grid gap-4 overflow-x-clip md:grid-cols-2 md:gap-0">
        <motion.div
          style={reduce ? undefined : { x: leftX, skewY: skew }}
          className="md:pr-2"
        >
          <AreaCard
            href="/texteis"
            theme="theme-texteis texture-weave"
            eyebrow="Divisão 1986"
            title="Têxteis"
            desc="Tecidos e acessórios de decoração. Configure calhas e cortinados com estimativa imediata."
            cta="Ver têxteis"
          />
        </motion.div>

        <motion.div
          style={reduce ? undefined : { x: rightX, skewY: negSkew }}
          className="md:pl-2"
        >
          <AreaCard
            href="/quimicos"
            theme="theme-quimicos texture-grid"
            eyebrow="Divisão 2006"
            title="Químicos"
            desc="Químicos industriais, produtos têxteis auxiliares, higiene e limpeza profissional, por grosso."
            cta="Ver químicos"
          />
        </motion.div>
      </div>
    </section>
  );
}

function AreaCard({
  href,
  theme,
  eyebrow,
  title,
  desc,
  cta,
}: {
  href: string;
  theme: string;
  eyebrow: string;
  title: string;
  desc: string;
  cta: string;
}) {
  return (
    <Link
      href={href}
      className={`${theme} group relative flex min-h-[420px] flex-col justify-between overflow-hidden p-8 text-[var(--ink)] transition-transform duration-500 hover:-translate-y-1 sm:p-12`}
      style={{ backgroundColor: "var(--bg)" }}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full opacity-40 blur-2xl transition-opacity duration-500 group-hover:opacity-70"
        style={{ backgroundColor: "var(--accent)" }}
      />
      <span className="relative font-sans text-xs uppercase tracking-[0.28em] text-[var(--accent)]">
        {eyebrow}
      </span>
      <div className="relative">
        <h3 className="font-serif text-6xl tracking-tight sm:text-7xl">
          {title}
        </h3>
        <p className="mt-5 max-w-sm text-[var(--ink-soft)]">{desc}</p>
        <span className="mt-8 inline-flex items-center gap-2 font-sans text-sm tracking-wide text-[var(--ink)]">
          {cta}
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </span>
      </div>
    </Link>
  );
}
