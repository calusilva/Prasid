"use client";

import { useEffect, useRef } from "react";

/**
 * Fundo animado da secção Químicos: "gotas" fluidas que derivam, reagem ao
 * rato (repulsão) e ao scroll (aceleração vertical), com aspeto técnico/frio.
 *
 * - Canvas 2D leve, sem dependências.
 * - Pausa quando fora do viewport (IntersectionObserver).
 * - Desligado quando prefers-reduced-motion está ativo.
 */
export function FluidCanvas({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    // consts não-nulas para as closures internas (resize/frame/etc.)
    const el = canvas;
    const c = ctx;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let raf = 0;
    let running = false;

    const pointer = { x: -9999, y: -9999 };
    let scrollBoost = 0;
    let lastScrollY = window.scrollY;

    type Drop = {
      x: number;
      y: number;
      r: number;
      vx: number;
      vy: number;
      hue: number;
    };
    let drops: Drop[] = [];

    function resize() {
      const rect = el.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      el.width = width * dpr;
      el.height = height * dpr;
      c.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    }

    function seed() {
      const count = Math.max(
        10,
        Math.min(26, Math.round((width * height) / 52000)),
      );
      drops = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: 26 + Math.random() * 84,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        // roxo (265) → ciano (190)
        hue: 190 + Math.random() * 80,
      }));
    }

    function frame() {
      c.clearRect(0, 0, width, height);
      c.globalCompositeOperation = "lighter";

      scrollBoost *= 0.92;

      for (const d of drops) {
        // repulsão do rato
        const dx = d.x - pointer.x;
        const dy = d.y - pointer.y;
        const dist2 = dx * dx + dy * dy;
        if (dist2 < 22000) {
          const f = (22000 - dist2) / 22000;
          d.vx += (dx / Math.sqrt(dist2 + 1)) * f * 0.6;
          d.vy += (dy / Math.sqrt(dist2 + 1)) * f * 0.6;
        }

        d.x += d.vx;
        d.y += d.vy + scrollBoost;
        d.vx *= 0.98;
        d.vy *= 0.98;

        // envolve nas bordas
        if (d.x < -d.r) d.x = width + d.r;
        if (d.x > width + d.r) d.x = -d.r;
        if (d.y < -d.r) d.y = height + d.r;
        if (d.y > height + d.r) d.y = -d.r;

        const g = c.createRadialGradient(d.x, d.y, 0, d.x, d.y, d.r);
        g.addColorStop(0, `hsla(${d.hue}, 85%, 62%, 0.28)`);
        g.addColorStop(1, `hsla(${d.hue}, 85%, 40%, 0)`);
        c.fillStyle = g;
        c.beginPath();
        c.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        c.fill();
      }

      c.globalCompositeOperation = "source-over";
      raf = requestAnimationFrame(frame);
    }

    function start() {
      if (running || reduce) return;
      running = true;
      raf = requestAnimationFrame(frame);
    }
    function stop() {
      running = false;
      cancelAnimationFrame(raf);
    }

    function onPointerMove(e: PointerEvent) {
      const rect = el.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
    }
    function onPointerLeave() {
      pointer.x = -9999;
      pointer.y = -9999;
    }
    function onScroll() {
      const dy = window.scrollY - lastScrollY;
      lastScrollY = window.scrollY;
      scrollBoost = Math.max(-2, Math.min(2, scrollBoost + dy * 0.03));
    }

    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { threshold: 0.01 },
    );

    resize();
    if (reduce) {
      // desenha um quadro estático
      frame();
      stop();
    }
    io.observe(el);
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointerMove);
    el.addEventListener("pointerleave", onPointerLeave);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      stop();
      io.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      el.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={`pointer-events-none block h-full w-full ${className}`}
    />
  );
}
