"use client";

import { motion, useReducedMotion } from "motion/react";
import type { Opcao } from "@/lib/configurator-options";

/** Grelha de cartões selecionáveis (radio group acessível). */
export function OptionCards({
  name,
  options,
  value,
  onChange,
}: {
  name: string;
  options: Opcao[];
  value: string;
  onChange: (id: string) => void;
}) {
  const reduce = useReducedMotion();

  return (
    <div role="radiogroup" aria-label={name} className="grid gap-3 sm:grid-cols-2">
      {options.map((opt) => {
        const selected = value === opt.id;
        return (
          <motion.button
            key={opt.id}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(opt.id)}
            whileTap={reduce ? undefined : { scale: 0.98 }}
            className={`hover-ripple rounded-xl border p-5 text-left transition-colors ${
              selected
                ? "border-[var(--accent)] bg-[var(--surface)]"
                : "border-[var(--line)] bg-[var(--bg-elev)] hover:border-[var(--accent)]"
            }`}
          >
            <span className="flex items-center justify-between">
              <span className="font-serif text-lg">{opt.nome}</span>
              <span
                aria-hidden
                className={`h-3 w-3 rounded-full border ${
                  selected
                    ? "border-[var(--accent)] bg-[var(--accent)]"
                    : "border-[var(--line)]"
                }`}
              />
            </span>
            <span className="mt-2 block text-sm leading-relaxed text-[var(--ink-soft)]">
              {opt.descricao}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}
