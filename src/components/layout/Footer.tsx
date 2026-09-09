import Link from "next/link";
import { company, fullAddress } from "@/lib/company";

/** Rodapé partilhado — neutro (tema Home) em todas as páginas. */
export function Footer() {
  return (
    <footer className="theme-home border-t border-[var(--line)] bg-[var(--bg-elev)] text-[var(--ink)]">
      <div className="mx-auto grid max-w-[1400px] gap-12 px-6 py-16 sm:px-10 lg:grid-cols-[1.4fr_1fr_1fr] lg:px-16">
        <div>
          <p className="font-serif text-2xl leading-tight">
            Prasid Ibérica
          </p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-[var(--ink-soft)]">
            {company.legalName}
          </p>
          <p className="mt-6 text-sm text-[var(--ink-soft)]">
            Comércio por grosso · desde {company.founded}
          </p>
        </div>

        <div className="text-sm">
          <p className="mb-4 font-sans text-xs uppercase tracking-[0.24em] text-[var(--accent)]">
            Contactos
          </p>
          <address className="not-italic leading-relaxed text-[var(--ink-soft)]">
            {fullAddress}
            <br />
            <a
              className="link-underline text-[var(--ink)]"
              href={`tel:${company.phone.href}`}
            >
              {company.phone.display}
            </a>
            <br />
            <a
              className="link-underline text-[var(--ink)]"
              href={`mailto:${company.email.general}`}
            >
              {company.email.general}
            </a>
          </address>
          <p className="mt-4 text-[var(--ink-soft)]">{company.hours}</p>
        </div>

        <div className="text-sm">
          <p className="mb-4 font-sans text-xs uppercase tracking-[0.24em] text-[var(--accent)]">
            Navegação
          </p>
          <ul className="space-y-2 text-[var(--ink-soft)]">
            <li>
              <Link className="link-underline hover:text-[var(--ink)]" href="/">
                Empresa
              </Link>
            </li>
            <li>
              <Link
                className="link-underline hover:text-[var(--ink)]"
                href="/quimicos"
              >
                Divisão Químicos
              </Link>
            </li>
            <li>
              <Link
                className="link-underline hover:text-[var(--ink)]"
                href="/texteis"
              >
                Divisão Têxteis
              </Link>
            </li>
            <li>
              <Link
                className="link-underline hover:text-[var(--ink)]"
                href="/texteis#configurador"
              >
                Configurador de calhas
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-[var(--line)]">
        <div className="mx-auto flex max-w-[1400px] flex-col justify-between gap-2 px-6 py-6 text-xs text-[var(--ink-soft)] sm:flex-row sm:px-10 lg:px-16">
          <p>
            © {new Date().getFullYear()} {company.legalName}. Todos os direitos
            reservados.
          </p>
          <p>São Félix da Marinha · Vila Nova de Gaia</p>
        </div>
      </div>
    </footer>
  );
}
