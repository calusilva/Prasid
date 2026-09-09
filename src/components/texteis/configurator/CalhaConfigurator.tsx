"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import {
  ACABAMENTOS,
  LIMITES,
  MATERIAIS,
  TIPOS_CALHA,
  helperById,
} from "@/lib/configurator-options";
import { estimarProposta, formatEUR, PRECO_M2 } from "@/lib/pricing";
import { OptionCards } from "./OptionCards";
import { ProposalSummary } from "./ProposalSummary";
import { initialState, type ConfiguratorState, type PropostaPayload } from "./types";

type Submission = "idle" | "sending" | "success" | "error";

const STEPS = [
  { id: "calha", titulo: "Tipo de calha" },
  { id: "material", titulo: "Material" },
  { id: "acabamento", titulo: "Tecido" },
  { id: "medidas", titulo: "Medidas" },
  { id: "contacto", titulo: "Contacto" },
  { id: "resumo", titulo: "Resumo" },
] as const;

export function CalhaConfigurator() {
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);
  const [state, setState] = useState<ConfiguratorState>(initialState);
  const [submission, setSubmission] = useState<Submission>("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  const set = <K extends keyof ConfiguratorState>(
    key: K,
    value: ConfiguratorState[K],
  ) => setState((s) => ({ ...s, [key]: value }));

  // Estimativa recalculada a cada alteração relevante.
  const estimativa = useMemo(
    () =>
      estimarProposta({
        calha: state.calha,
        material: state.material,
        acabamento: state.acabamento,
        larguraM: state.larguraM,
        alturaM: state.alturaM,
        quantidade: state.quantidade,
      }),
    [
      state.calha,
      state.material,
      state.acabamento,
      state.larguraM,
      state.alturaM,
      state.quantidade,
    ],
  );

  // Validação por passo — controla o botão "Seguinte".
  const stepValid = useMemo(() => {
    switch (STEPS[step].id) {
      case "calha":
        return !!state.calha;
      case "material":
        return !!state.material;
      case "acabamento":
        return !!state.acabamento;
      case "medidas":
        return (
          state.larguraM >= LIMITES.larguraMin &&
          state.larguraM <= LIMITES.larguraMax &&
          state.alturaM >= LIMITES.alturaMin &&
          state.alturaM <= LIMITES.alturaMax &&
          state.quantidade >= LIMITES.quantidadeMin &&
          state.quantidade <= LIMITES.quantidadeMax
        );
      case "contacto":
        return (
          state.nome.trim().length > 1 &&
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.email) &&
          state.telefone.trim().length >= 6
        );
      default:
        return true;
    }
  }, [step, state]);

  const isLast = step === STEPS.length - 1;

  async function submit() {
    setSubmission("sending");
    setErrorMsg("");

    const payload: PropostaPayload = {
      ...state,
      calhaLabel: helperById(TIPOS_CALHA, state.calha)?.nome ?? state.calha,
      materialLabel: helperById(MATERIAIS, state.material)?.nome ?? state.material,
      acabamentoLabel:
        helperById(ACABAMENTOS, state.acabamento)?.nome ?? state.acabamento,
      areaTotalM2: estimativa.areaTotalM2,
      valorEstimado: estimativa.total,
      precoM2: PRECO_M2,
    };

    try {
      const res = await fetch("/api/proposta", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Falha no envio.");
      }
      setSubmission("success");
    } catch (err) {
      setSubmission("error");
      setErrorMsg(
        err instanceof Error ? err.message : "Ocorreu um erro inesperado.",
      );
    }
  }

  function reset() {
    setState(initialState);
    setStep(0);
    setSubmission("idle");
  }

  return (
    <section
      id="configurador"
      className="scroll-mt-24 border-y border-[var(--line)] bg-[var(--bg-elev)] py-24 sm:py-32"
    >
      <Container>
        <SectionHeading
          kicker="Configurador"
          title="Calcule o seu cortinado"
          intro="Cinco passos: tipo de calha, material, tecido, medidas do vão e o seu contacto. A estimativa atualiza em tempo real e no fim pode pedir a proposta."
        />

        {submission === "success" ? (
          <Confirmation state={state} total={estimativa.total} onReset={reset} />
        ) : (
          <div className="mt-14 grid gap-8 lg:grid-cols-[1.4fr_0.9fr] lg:items-start">
            {/* Coluna do wizard */}
            <div>
              <Stepper current={step} onJump={(i) => i < step && setStep(i)} />

              <div className="mt-8 min-h-[320px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={STEPS[step].id}
                    initial={reduce ? false : { opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={reduce ? undefined : { opacity: 0, x: -24 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {STEPS[step].id === "calha" && (
                      <OptionCards
                        name="Tipo de calha"
                        options={TIPOS_CALHA}
                        value={state.calha}
                        onChange={(v) => set("calha", v)}
                      />
                    )}
                    {STEPS[step].id === "material" && (
                      <OptionCards
                        name="Material"
                        options={MATERIAIS}
                        value={state.material}
                        onChange={(v) => set("material", v)}
                      />
                    )}
                    {STEPS[step].id === "acabamento" && (
                      <OptionCards
                        name="Tipo de tecido"
                        options={ACABAMENTOS}
                        value={state.acabamento}
                        onChange={(v) => set("acabamento", v)}
                      />
                    )}
                    {STEPS[step].id === "medidas" && (
                      <MeasuresStep state={state} set={set} />
                    )}
                    {STEPS[step].id === "contacto" && (
                      <ContactStep state={state} set={set} />
                    )}
                    {STEPS[step].id === "resumo" && (
                      <ProposalSummary state={state} estimativa={estimativa} />
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              {submission === "error" && (
                <p
                  role="alert"
                  className="mt-4 rounded-lg border border-[var(--accent)] bg-[var(--surface)] px-4 py-3 text-sm"
                >
                  {errorMsg} Tente novamente ou contacte-nos por telefone.
                </p>
              )}

              <div className="mt-8 flex items-center justify-between gap-4">
                <Button
                  variant="ghost"
                  onClick={() => setStep((s) => Math.max(0, s - 1))}
                  disabled={step === 0 || submission === "sending"}
                >
                  ← Voltar
                </Button>

                {isLast ? (
                  <Button onClick={submit} disabled={submission === "sending"}>
                    {submission === "sending" ? "A enviar…" : "Pedir proposta"}
                  </Button>
                ) : (
                  <Button
                    onClick={() => setStep((s) => s + 1)}
                    disabled={!stepValid}
                  >
                    Seguinte →
                  </Button>
                )}
              </div>
            </div>

            {/* Coluna da estimativa em tempo real (sticky em desktop) */}
            <aside className="lg:sticky lg:top-28">
              <LivePrice state={state} estimativa={estimativa} />
            </aside>
          </div>
        )}
      </Container>
    </section>
  );
}

/* ── Stepper ──────────────────────────────────────────────────────────────── */

function Stepper({
  current,
  onJump,
}: {
  current: number;
  onJump: (i: number) => void;
}) {
  return (
    <ol className="flex flex-wrap gap-x-2 gap-y-3">
      {STEPS.map((s, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <li key={s.id} className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onJump(i)}
              disabled={i >= current}
              className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-xs tracking-wide transition-colors ${
                active
                  ? "bg-[var(--accent)] text-[var(--accent-ink)]"
                  : done
                    ? "text-[var(--ink)] hover:bg-[var(--surface)]"
                    : "text-[var(--ink-soft)]"
              }`}
            >
              <span className="font-mono">{String(i + 1).padStart(2, "0")}</span>
              {s.titulo}
            </button>
            {i < STEPS.length - 1 && (
              <span aria-hidden className="text-[var(--line)]">
                —
              </span>
            )}
          </li>
        );
      })}
    </ol>
  );
}

/* ── Passo: Medidas ───────────────────────────────────────────────────────── */

function MeasuresStep({
  state,
  set,
}: {
  state: ConfiguratorState;
  set: <K extends keyof ConfiguratorState>(k: K, v: ConfiguratorState[K]) => void;
}) {
  return (
    <div className="space-y-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <NumberField
          label="Largura do vão (m)"
          value={state.larguraM}
          min={LIMITES.larguraMin}
          max={LIMITES.larguraMax}
          step={0.05}
          onChange={(v) => set("larguraM", v)}
          hint={`Entre ${LIMITES.larguraMin} e ${LIMITES.larguraMax} m`}
        />
        <NumberField
          label="Altura / pé-direito (m)"
          value={state.alturaM}
          min={LIMITES.alturaMin}
          max={LIMITES.alturaMax}
          step={0.05}
          onChange={(v) => set("alturaM", v)}
          hint={`Entre ${LIMITES.alturaMin} e ${LIMITES.alturaMax} m`}
        />
      </div>
      <NumberField
        label="Quantidade (nº de panos com estas medidas)"
        value={state.quantidade}
        min={LIMITES.quantidadeMin}
        max={LIMITES.quantidadeMax}
        step={1}
        onChange={(v) => set("quantidade", Math.round(v))}
        hint={`Entre ${LIMITES.quantidadeMin} e ${LIMITES.quantidadeMax}`}
      />
      <p className="text-sm text-[var(--ink-soft)]">
        Dica: para cortinado franzido, meça a largura real do vão — o cálculo de
        folga de tecido é feito por nós na confirmação.
      </p>
    </div>
  );
}

function NumberField({
  label,
  value,
  min,
  max,
  step,
  onChange,
  hint,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  hint?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium">{label}</span>
      <input
        type="number"
        inputMode="decimal"
        value={Number.isFinite(value) ? value : ""}
        min={min}
        max={max}
        step={step}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full rounded-xl border border-[var(--line)] bg-[var(--bg)] px-4 py-3 text-lg outline-none focus:border-[var(--accent)]"
      />
      {hint && <span className="mt-1 block text-xs text-[var(--ink-soft)]">{hint}</span>}
    </label>
  );
}

/* ── Passo: Contacto ──────────────────────────────────────────────────────── */

function ContactStep({
  state,
  set,
}: {
  state: ConfiguratorState;
  set: <K extends keyof ConfiguratorState>(k: K, v: ConfiguratorState[K]) => void;
}) {
  return (
    <div className="space-y-5">
      <TextField
        label="Nome"
        value={state.nome}
        onChange={(v) => set("nome", v)}
        autoComplete="name"
      />
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField
          label="Email"
          type="email"
          value={state.email}
          onChange={(v) => set("email", v)}
          autoComplete="email"
        />
        <TextField
          label="Telefone"
          type="tel"
          value={state.telefone}
          onChange={(v) => set("telefone", v)}
          autoComplete="tel"
        />
      </div>
      <label className="block">
        <span className="mb-2 block text-sm font-medium">
          Notas (opcional)
        </span>
        <textarea
          rows={3}
          value={state.notas}
          onChange={(e) => set("notas", e.target.value)}
          placeholder="Cor pretendida, prazo, morada de instalação…"
          className="w-full rounded-xl border border-[var(--line)] bg-[var(--bg)] px-4 py-3 outline-none focus:border-[var(--accent)]"
        />
      </label>
      <p className="text-xs text-[var(--ink-soft)]">
        Os dados são usados apenas para responder ao pedido de proposta.
      </p>
    </div>
  );
}

function TextField({
  label,
  value,
  onChange,
  type = "text",
  autoComplete,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  autoComplete?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium">{label}</span>
      <input
        type={type}
        value={value}
        autoComplete={autoComplete}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-[var(--line)] bg-[var(--bg)] px-4 py-3 text-lg outline-none focus:border-[var(--accent)]"
      />
    </label>
  );
}

/* ── Estimativa em tempo real ─────────────────────────────────────────────── */

function LivePrice({
  state,
  estimativa,
}: {
  state: ConfiguratorState;
  estimativa: ReturnType<typeof estimarProposta>;
}) {
  const rows: [string, string][] = [
    ["Calha", helperById(TIPOS_CALHA, state.calha)?.nome ?? "—"],
    ["Material", helperById(MATERIAIS, state.material)?.nome ?? "—"],
    ["Tecido", helperById(ACABAMENTOS, state.acabamento)?.nome ?? "—"],
    [
      "Medidas",
      state.larguraM && state.alturaM
        ? `${state.larguraM} × ${state.alturaM} m × ${state.quantidade}`
        : "—",
    ],
    ["Área total", `${estimativa.areaTotalM2.toLocaleString("pt-PT")} m²`],
  ];

  return (
    <div className="rounded-2xl border border-[var(--line)] bg-[var(--bg)] p-6">
      <p className="font-sans text-xs uppercase tracking-[0.24em] text-[var(--accent)]">
        Estimativa em tempo real
      </p>

      <dl className="mt-4 space-y-2 text-sm">
        {rows.map(([k, v]) => (
          <div key={k} className="flex justify-between gap-4">
            <dt className="text-[var(--ink-soft)]">{k}</dt>
            <dd className="text-right font-medium">{v}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-5 border-t border-[var(--line)] pt-4">
        <div className="flex items-baseline justify-between">
          <span className="text-sm text-[var(--ink-soft)]">Total estimado</span>
          <motion.span
            key={estimativa.total}
            initial={{ opacity: 0.4, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-3xl text-[var(--accent)]"
          >
            {formatEUR(estimativa.total)}
          </motion.span>
        </div>
        <p className="mt-2 text-xs text-[var(--ink-soft)]">
          Base {formatEUR(PRECO_M2)}/m²{estimativa.iva > 0 ? " · c/ IVA" : ""}.
          Valor indicativo.
        </p>
      </div>
    </div>
  );
}

/* ── Confirmação ──────────────────────────────────────────────────────────── */

function Confirmation({
  state,
  total,
  onReset,
}: {
  state: ConfiguratorState;
  total: number;
  onReset: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-14 rounded-2xl border border-[var(--line)] bg-[var(--bg)] p-8 sm:p-12"
    >
      <div
        aria-hidden
        className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--accent)] text-xl text-[var(--accent-ink)]"
      >
        ✓
      </div>
      <h3 className="font-serif text-3xl">Pedido enviado, {state.nome.split(" ")[0]}.</h3>
      <p className="mt-4 max-w-xl text-[var(--ink-soft)]">
        Recebemos a sua configuração com estimativa de{" "}
        <strong className="text-[var(--ink)]">{formatEUR(total)}</strong>. A nossa
        equipa da divisão têxtil entra em contacto por{" "}
        {state.email ? "email" : "telefone"} no próximo dia útil para confirmar
        medidas, tecido e preço final.
      </p>
      <div className="mt-8 flex flex-wrap gap-4">
        <Button variant="outline" onClick={onReset}>
          Fazer nova configuração
        </Button>
      </div>
    </motion.div>
  );
}
