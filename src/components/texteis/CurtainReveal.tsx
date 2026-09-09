"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

/**
 * Animação de cortina a abrir. Dois painéis de "tecido" (com pregas simuladas
 * por gradientes repetidos) deslizam para os lados ao montar, revelando o
 * conteúdo por baixo. Em prefers-reduced-motion, os painéis já entram abertos.
 */
export function CurtainReveal({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();

  const pleats =
    "repeating-linear-gradient(90deg, rgba(0,0,0,0.18) 0 2px, rgba(255,255,255,0.06) 2px 22px, rgba(0,0,0,0.14) 22px 24px)";

  const panel = (side: "left" | "right") => (
    <motion.div
      aria-hidden
      className="absolute top-0 z-20 h-full w-1/2"
      style={{
        [side]: 0,
        backgroundColor: "var(--accent)",
        backgroundImage: pleats,
        transformOrigin: side === "left" ? "left center" : "right center",
      }}
      initial={reduce ? { scaleX: 0 } : { scaleX: 1 }}
      animate={{ scaleX: 0 }}
      transition={{
        duration: 1.5,
        delay: 0.2,
        ease: [0.7, 0, 0.2, 1],
      }}
    />
  );

  return (
    <div className="relative overflow-hidden">
      {panel("left")}
      {panel("right")}

      {/* barra da calha */}
      <motion.div
        aria-hidden
        className="absolute left-0 top-0 z-30 h-[6px] w-full"
        style={{ backgroundColor: "var(--ink)" }}
        initial={reduce ? false : { opacity: 0, y: -8 }}
        animate={{ opacity: 0.5, y: 0 }}
        transition={{ duration: 0.6 }}
      />

      <motion.div
        initial={reduce ? false : { opacity: 0, scale: 1.04 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
}
