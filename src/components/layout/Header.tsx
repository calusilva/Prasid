"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { company } from "@/lib/company";
import { sectionThemes, type SectionName } from "@/lib/themes";

const NAV: { href: string; label: string; section: SectionName }[] = [
  { href: "/", label: "Empresa", section: "home" },
  { href: "/quimicos", label: "Químicos", section: "quimicos" },
  { href: "/texteis", label: "Têxteis", section: "texteis" },
];

/** Deriva a secção ativa a partir do pathname (sem contexto extra). */
function sectionFromPath(pathname: string): SectionName {
  if (pathname.startsWith("/quimicos")) return "quimicos";
  if (pathname.startsWith("/texteis")) return "texteis";
  return "home";
}

export function Header() {
  const pathname = usePathname();
  const active = sectionFromPath(pathname);
  const theme = sectionThemes[active];
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`${theme.className} sticky top-0 z-50 transition-colors duration-500`}
      style={{
        backgroundColor: scrolled ? "var(--bg-elev)" : "transparent",
        borderBottom: scrolled ? "1px solid var(--line)" : "1px solid transparent",
      }}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4 sm:px-10 lg:px-16">
        <Link
          href="/"
          className="font-serif text-lg leading-none tracking-tight text-[var(--ink)]"
        >
          Prasid
          <span className="text-[var(--accent)]"> Ibérica</span>
        </Link>

        {/* Navegação desktop */}
        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((item) => {
            const isActive =
              item.section === active &&
              (item.href === "/" ? pathname === "/" : true);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`link-underline font-sans text-sm tracking-wide transition-colors ${
                  isActive
                    ? "text-[var(--ink)]"
                    : "text-[var(--ink-soft)] hover:text-[var(--ink)]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <a
            href={`tel:${company.phone.href}`}
            className="rounded-full border border-[var(--line)] px-4 py-2 font-sans text-sm text-[var(--ink)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
          >
            {company.phone.display}
          </a>
        </nav>

        {/* Botão mobile */}
        <button
          type="button"
          aria-label="Abrir menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center md:hidden"
        >
          <span className="relative block h-3 w-6">
            <span
              className="absolute left-0 block h-[1.5px] w-6 bg-[var(--ink)] transition-transform"
              style={{ top: open ? 5 : 0, transform: open ? "rotate(45deg)" : "none" }}
            />
            <span
              className="absolute left-0 top-[5px] block h-[1.5px] w-6 bg-[var(--ink)] transition-opacity"
              style={{ opacity: open ? 0 : 1 }}
            />
            <span
              className="absolute left-0 block h-[1.5px] w-6 bg-[var(--ink)] transition-transform"
              style={{ top: open ? 5 : 10, transform: open ? "rotate(-45deg)" : "none" }}
            />
          </span>
        </button>
      </div>

      {/* Painel mobile */}
      {open && (
        <div className="border-t border-[var(--line)] bg-[var(--bg-elev)] md:hidden">
          <nav className="mx-auto flex max-w-[1400px] flex-col gap-1 px-6 py-4 sm:px-10">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 font-sans text-base text-[var(--ink)] hover:bg-[var(--surface)]"
              >
                {item.label}
              </Link>
            ))}
            <a
              href={`tel:${company.phone.href}`}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-3 font-sans text-base text-[var(--accent)]"
            >
              {company.phone.display}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
