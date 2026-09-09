import { formatEUR, type EstimativaCalha } from "@/lib/pricing";
import { helperById, TIPOS_CALHA, MATERIAIS, ACABAMENTOS } from "@/lib/configurator-options";
import type { ConfiguratorState } from "./types";

/** Resumo visual da proposta antes da submissão. */
export function ProposalSummary({
  state,
  estimativa,
}: {
  state: ConfiguratorState;
  estimativa: EstimativaCalha;
}) {
  const linhas: [string, string][] = [
    ["Tipo de calha", helperById(TIPOS_CALHA, state.calha)?.nome ?? "—"],
    ["Material", helperById(MATERIAIS, state.material)?.nome ?? "—"],
    ["Acabamento", helperById(ACABAMENTOS, state.acabamento)?.nome ?? "—"],
    ["Largura do vão", `${state.larguraM.toLocaleString("pt-PT")} m`],
    ["Altura", `${state.alturaM.toLocaleString("pt-PT")} m`],
    ["Quantidade", `${state.quantidade} ${state.quantidade === 1 ? "pano" : "panos"}`],
    ["Área total", `${estimativa.areaTotalM2.toLocaleString("pt-PT")} m²`],
  ];

  return (
    <div className="rounded-2xl border border-[var(--line)] bg-[var(--bg-elev)] p-6 sm:p-8">
      <h3 className="font-serif text-2xl">Resumo da proposta</h3>

      <dl className="mt-6 divide-y divide-[var(--line)]">
        {linhas.map(([k, v]) => (
          <div key={k} className="flex items-center justify-between py-3 text-sm">
            <dt className="text-[var(--ink-soft)]">{k}</dt>
            <dd className="font-medium">{v}</dd>
          </div>
        ))}
      </dl>

      {(state.nome || state.email || state.telefone) && (
        <div className="mt-4 rounded-xl bg-[var(--surface)] p-4 text-sm">
          <p className="font-sans text-xs uppercase tracking-[0.2em] text-[var(--accent)]">
            Contacto
          </p>
          <p className="mt-2">{state.nome || "—"}</p>
          <p className="text-[var(--ink-soft)]">
            {[state.email, state.telefone].filter(Boolean).join(" · ") || "—"}
          </p>
          {state.notas && (
            <p className="mt-2 text-[var(--ink-soft)]">“{state.notas}”</p>
          )}
        </div>
      )}

      <div className="mt-6 border-t border-[var(--line)] pt-5">
        <div className="flex items-center justify-between text-sm text-[var(--ink-soft)]">
          <span>Estimativa (sem IVA)</span>
          <span>{formatEUR(estimativa.subtotal)}</span>
        </div>
        {estimativa.iva > 0 && (
          <div className="mt-1 flex items-center justify-between text-sm text-[var(--ink-soft)]">
            <span>IVA</span>
            <span>{formatEUR(estimativa.iva)}</span>
          </div>
        )}
        <div className="mt-3 flex items-baseline justify-between">
          <span className="font-serif text-lg">Total estimado</span>
          <span className="font-serif text-3xl text-[var(--accent)]">
            {formatEUR(estimativa.total)}
          </span>
        </div>
        <p className="mt-3 text-xs leading-relaxed text-[var(--ink-soft)]">
          Valor indicativo, calculado automaticamente a partir das opções
          escolhidas. Não é uma proposta comercial vinculativa — a Prasid Ibérica
          confirma medidas, tecido e preço final antes de qualquer encomenda.
        </p>
      </div>
    </div>
  );
}
