import { NextResponse } from "next/server";
import { promises as fs } from "node:fs";
import path from "node:path";
import { z } from "zod";
import { company, fullAddress } from "@/lib/company";
import { formatEUR } from "@/lib/pricing";

/**
 * Recebe o pedido de proposta do configurador de calhas e:
 *  1. valida os dados;
 *  2. se RESEND_API_KEY estiver definida → envia email formatado para a empresa;
 *  3. caso contrário (ou em falha) → grava o pedido em ./proposals/*.json
 *     para não se perder nenhum lead.
 *
 * Variáveis de ambiente (ver .env.example):
 *   RESEND_API_KEY        chave da API Resend
 *   PROPOSAL_TO_EMAIL     destinatário na empresa
 *   PROPOSAL_FROM_EMAIL   remetente verificado no Resend
 */

const payloadSchema = z.object({
  calha: z.string().min(1),
  material: z.string().min(1),
  acabamento: z.string().min(1),
  larguraM: z.number().positive().max(20),
  alturaM: z.number().positive().max(10),
  quantidade: z.number().int().positive().max(100),
  nome: z.string().min(2).max(120),
  email: z.string().email().max(160),
  telefone: z.string().min(6).max(40),
  notas: z.string().max(2000).optional().default(""),
  calhaLabel: z.string().min(1),
  materialLabel: z.string().min(1),
  acabamentoLabel: z.string().min(1),
  areaTotalM2: z.number().nonnegative(),
  valorEstimado: z.number().nonnegative(),
  precoM2: z.number().nonnegative(),
});

type Payload = z.infer<typeof payloadSchema>;

function buildEmailHtml(p: Payload) {
  const row = (k: string, v: string) =>
    `<tr><td style="padding:6px 14px 6px 0;color:#6b4a34;">${k}</td><td style="padding:6px 0;font-weight:600;">${v}</td></tr>`;

  return `
  <div style="font-family:Inter,Arial,sans-serif;color:#3a2417;max-width:560px;">
    <h2 style="font-family:Georgia,serif;margin:0 0 4px;">Novo pedido de proposta — Calhas / Cortinados</h2>
    <p style="margin:0 0 20px;color:#6b4a34;">Recebido através do configurador do site.</p>

    <h3 style="font-family:Georgia,serif;margin:20px 0 6px;">Cliente</h3>
    <table style="border-collapse:collapse;font-size:14px;">
      ${row("Nome", p.nome)}
      ${row("Email", `<a href="mailto:${p.email}">${p.email}</a>`)}
      ${row("Telefone", `<a href="tel:${p.telefone}">${p.telefone}</a>`)}
      ${p.notas ? row("Notas", p.notas) : ""}
    </table>

    <h3 style="font-family:Georgia,serif;margin:24px 0 6px;">Configuração</h3>
    <table style="border-collapse:collapse;font-size:14px;">
      ${row("Tipo de calha", p.calhaLabel)}
      ${row("Material", p.materialLabel)}
      ${row("Tipo de tecido", p.acabamentoLabel)}
      ${row("Largura do vão", `${p.larguraM} m`)}
      ${row("Altura", `${p.alturaM} m`)}
      ${row("Quantidade", `${p.quantidade}`)}
      ${row("Área total", `${p.areaTotalM2} m²`)}
    </table>

    <h3 style="font-family:Georgia,serif;margin:24px 0 6px;">Estimativa</h3>
    <table style="border-collapse:collapse;font-size:14px;">
      ${row("Preço base", `${formatEUR(p.precoM2)}/m²`)}
      ${row("Valor total estimado", `<span style="font-size:18px;color:#b4632f;">${formatEUR(p.valorEstimado)}</span>`)}
    </table>

    <p style="margin:24px 0 0;font-size:12px;color:#6b4a34;">
      ${company.legalName} · ${fullAddress} · ${company.phone.display}
    </p>
  </div>`;
}

function buildEmailText(p: Payload) {
  return [
    "NOVO PEDIDO DE PROPOSTA — CALHAS / CORTINADOS",
    "",
    "CLIENTE",
    `  Nome:     ${p.nome}`,
    `  Email:    ${p.email}`,
    `  Telefone: ${p.telefone}`,
    p.notas ? `  Notas:    ${p.notas}` : "",
    "",
    "CONFIGURAÇÃO",
    `  Tipo de calha:  ${p.calhaLabel}`,
    `  Material:       ${p.materialLabel}`,
    `  Tipo de tecido: ${p.acabamentoLabel}`,
    `  Largura:        ${p.larguraM} m`,
    `  Altura:         ${p.alturaM} m`,
    `  Quantidade:     ${p.quantidade}`,
    `  Área total:     ${p.areaTotalM2} m²`,
    "",
    "ESTIMATIVA",
    `  Preço base:     ${formatEUR(p.precoM2)}/m²`,
    `  Valor estimado: ${formatEUR(p.valorEstimado)}`,
  ]
    .filter(Boolean)
    .join("\n");
}

async function saveLocally(p: Payload) {
  const dir = path.join(process.cwd(), "proposals");
  await fs.mkdir(dir, { recursive: true });
  const stamp = new Date().toISOString().replace(/[:.]/g, "-");
  const safeName = p.nome.toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 40);
  const file = path.join(dir, `${stamp}_${safeName}.json`);
  await fs.writeFile(
    file,
    JSON.stringify({ recebidoEm: new Date().toISOString(), ...p }, null, 2),
    "utf8",
  );
  return file;
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido." }, { status: 400 });
  }

  const parsed = payloadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Dados incompletos ou inválidos.", detail: parsed.error.flatten() },
      { status: 422 },
    );
  }
  const p = parsed.data;

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.PROPOSAL_TO_EMAIL || company.email.general;
  const from =
    process.env.PROPOSAL_FROM_EMAIL || "Prasid Ibérica <onboarding@resend.dev>";

  // Caminho principal: enviar email via Resend.
  if (apiKey) {
    try {
      const { Resend } = await import("resend");
      const resend = new Resend(apiKey);
      const { error } = await resend.emails.send({
        from,
        to: [to],
        replyTo: p.email,
        subject: `Proposta de calhas — ${p.nome} (${formatEUR(p.valorEstimado)})`,
        html: buildEmailHtml(p),
        text: buildEmailText(p),
      });
      if (error) throw new Error(error.message);
      return NextResponse.json({ ok: true, via: "email" });
    } catch (err) {
      // Não perde o lead: grava localmente e devolve sucesso parcial.
      console.error("[proposta] Falha no envio de email:", err);
      try {
        await saveLocally(p);
        return NextResponse.json({ ok: true, via: "ficheiro-fallback" });
      } catch (fsErr) {
        console.error("[proposta] Falha no fallback local:", fsErr);
        return NextResponse.json(
          { error: "Não foi possível registar o pedido." },
          { status: 502 },
        );
      }
    }
  }

  // Sem chave configurada (dev / pré-produção): grava localmente.
  try {
    const file = await saveLocally(p);
    console.info("[proposta] Pedido guardado em", file);
    return NextResponse.json({ ok: true, via: "ficheiro-local" });
  } catch (err) {
    console.error("[proposta] Falha ao guardar localmente:", err);
    return NextResponse.json(
      { error: "Não foi possível registar o pedido." },
      { status: 500 },
    );
  }
}
