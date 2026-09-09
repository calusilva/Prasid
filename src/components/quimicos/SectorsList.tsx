"use client";

import { motion, useReducedMotion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { quimicosSetores } from "@/lib/divisions";

/** Áreas de atuação — lista técnica com linha de "scan" no hover. */
export function SectorsList() {
  const reduce = useReducedMotion();

  return (
    <section className="border-y border-[var(--line)] bg-[var(--bg-elev)] py-24 sm:py-32">
      <Container>
        <SectionHeading
          kicker="Áreas de atuação"
          title="Onde os nossos produtos entram"
        />

        <ul className="mt-14 divide-y divide-[var(--line)] border-y border-[var(--line)]">
          {quimicosSetores.map((s, i) => (
            <motion.li
              key={s.nome}
              initial={reduce ? false : { opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="group grid grid-cols-[3rem_1fr] items-baseline gap-4 py-6 sm:grid-cols-[4rem_0.9fr_1.1fr]"
            >
              <span className="font-mono text-xs text-[var(--accent-2)]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-serif text-2xl transition-colors group-hover:text-[var(--accent)] sm:text-3xl">
                {s.nome}
              </h3>
              <p className="col-span-2 text-sm text-[var(--ink-soft)] sm:col-span-1">
                {s.texto}
              </p>
            </motion.li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
