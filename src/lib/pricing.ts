/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  MOTOR DE ESTIMATIVA DO CONFIGURADOR DE CALHAS / CORTINADOS
 * ─────────────────────────────────────────────────────────────────────────────
 *
 *  ⚠️  TODOS OS VALORES ABAIXO SÃO DE EXEMPLO.
 *  Quando a empresa fornecer a tabela de preços real, basta ajustar:
 *    - PRECO_M2                (preço base do tecido + confeção, por m²)
 *    - MULT_CALHA              (multiplicador por tipo de calha)
 *    - MULT_MATERIAL           (multiplicador por material/tecido)
 *    - MULT_ACABAMENTO         (multiplicador por padrão/textura)
 *    - TAXA_IVA                (para mostrar valor com IVA, se se quiser)
 *
 *  A fórmula está isolada em `estimarProposta()` — a UI nunca calcula nada
 *  diretamente, chama sempre esta função.
 */

/** Preço base por metro quadrado de cortinado, em euros (tecido + confeção). */
export const PRECO_M2 = 45;

/** Taxa de IVA aplicada (Portugal continental). Usar 0 para esconder o IVA. */
export const TAXA_IVA = 0.23;

/** Multiplicador consoante o tipo de calha escolhido. Chave = id da opção. */
export const MULT_CALHA: Record<string, number> = {
  "calha-simples": 1,
  "calha-dupla": 1.35,
  "varao-decorativo": 1.2,
  "calha-motorizada": 2.1,
  "calha-teto": 1.15,
};

/** Multiplicador consoante o material / tecido base. */
export const MULT_MATERIAL: Record<string, number> = {
  poliester: 1,
  algodao: 1.25,
  linho: 1.45,
  veludo: 1.85,
  blackout: 1.6,
  "voil-transparente": 0.85,
};

/** Multiplicador consoante o acabamento do tecido (padrão / cor / textura). */
export const MULT_ACABAMENTO: Record<string, number> = {
  liso: 1,
  "padrao-estampado": 1.18,
  texturado: 1.3,
  "fio-tingido": 1.22,
};

export interface ConfiguracaoCalha {
  /** id do tipo de calha (ver configurator-options.ts) */
  calha: string;
  /** id do material */
  material: string;
  /** id do acabamento */
  acabamento: string;
  /** largura do vão, em metros */
  larguraM: number;
  /** altura / pé-direito do cortinado, em metros */
  alturaM: number;
  /** nº de janelas/panos com estas medidas */
  quantidade: number;
}

export interface EstimativaCalha {
  /** área de um pano (largura × altura), em m² */
  areaUnitariaM2: number;
  /** área total (× quantidade), em m² */
  areaTotalM2: number;
  /** fator combinado dos multiplicadores aplicados */
  fator: number;
  /** valor sem IVA, arredondado ao euro */
  subtotal: number;
  /** montante de IVA, arredondado ao euro */
  iva: number;
  /** valor final estimado (subtotal + IVA), arredondado ao euro */
  total: number;
}

/** Arredonda a 2 casas para evitar ruído de vírgula flutuante nas áreas. */
const r2 = (n: number) => Math.round(n * 100) / 100;

/**
 * Calcula a estimativa de preço para uma configuração de calha.
 * Devolve sempre um objeto válido — valores em falta são tratados como 0
 * e os multiplicadores desconhecidos assumem 1.
 */
export function estimarProposta(cfg: ConfiguracaoCalha): EstimativaCalha {
  const largura = Math.max(0, Number(cfg.larguraM) || 0);
  const altura = Math.max(0, Number(cfg.alturaM) || 0);
  const qtd = Math.max(0, Math.floor(Number(cfg.quantidade) || 0));

  const areaUnitariaM2 = r2(largura * altura);
  const areaTotalM2 = r2(areaUnitariaM2 * qtd);

  const fator =
    (MULT_CALHA[cfg.calha] ?? 1) *
    (MULT_MATERIAL[cfg.material] ?? 1) *
    (MULT_ACABAMENTO[cfg.acabamento] ?? 1);

  const subtotal = Math.round(areaTotalM2 * PRECO_M2 * fator);
  const iva = Math.round(subtotal * TAXA_IVA);
  const total = subtotal + iva;

  return {
    areaUnitariaM2,
    areaTotalM2,
    fator: r2(fator),
    subtotal,
    iva,
    total,
  };
}

/** Formata um valor em euros para apresentação (pt-PT). */
export function formatEUR(value: number): string {
  return new Intl.NumberFormat("pt-PT", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}
