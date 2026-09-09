/**
 * Opções do configurador de calhas.
 *
 * Listas puramente declarativas — adicionar/remover entradas aqui atualiza
 * automaticamente o wizard. Os `id` têm de coincidir com as chaves usadas
 * nos multiplicadores de `pricing.ts`.
 */

export interface Opcao {
  id: string;
  nome: string;
  descricao: string;
}

export const TIPOS_CALHA: Opcao[] = [
  {
    id: "calha-simples",
    nome: "Calha simples",
    descricao: "Um pano de cortinado. Solução mais económica e comum.",
  },
  {
    id: "calha-dupla",
    nome: "Calha dupla",
    descricao: "Dois panos — voil translúcido à frente, opaco atrás.",
  },
  {
    id: "varao-decorativo",
    nome: "Varão decorativo",
    descricao: "Varão à vista com ponteiras, para ambientes mais clássicos.",
  },
  {
    id: "calha-motorizada",
    nome: "Calha motorizada",
    descricao: "Abertura elétrica com comando ou automação. Inclui motor.",
  },
  {
    id: "calha-teto",
    nome: "Calha de teto",
    descricao: "Perfil embutido no teto, cortinado a cair do topo do vão.",
  },
];

export const MATERIAIS: Opcao[] = [
  {
    id: "poliester",
    nome: "Poliéster",
    descricao: "Resistente, fácil de lavar, boa relação qualidade/preço.",
  },
  {
    id: "algodao",
    nome: "Algodão",
    descricao: "Toque natural e mate, ligeiro caimento.",
  },
  {
    id: "linho",
    nome: "Linho",
    descricao: "Textura natural marcada, caimento fluido e elegante.",
  },
  {
    id: "veludo",
    nome: "Veludo",
    descricao: "Denso e encorpado, excelente escurecimento e isolamento.",
  },
  {
    id: "blackout",
    nome: "Blackout",
    descricao: "Forro técnico que bloqueia a luz — quartos e salas de projeção.",
  },
  {
    id: "voil-transparente",
    nome: "Voil transparente",
    descricao: "Tecido leve e translúcido, filtra a luz sem escurecer.",
  },
];

export const ACABAMENTOS: Opcao[] = [
  {
    id: "liso",
    nome: "Liso / cor sólida",
    descricao: "Uma cor única, sem padrão.",
  },
  {
    id: "padrao-estampado",
    nome: "Padrão estampado",
    descricao: "Motivos impressos sobre o tecido base.",
  },
  {
    id: "texturado",
    nome: "Texturado / relevo",
    descricao: "Trama com relevo tátil, jogo de luz na superfície.",
  },
  {
    id: "fio-tingido",
    nome: "Fio tingido",
    descricao: "Padrão criado na tecelagem — riscas, xadrez, espinha.",
  },
];

/** Limites usados na validação do passo das medidas. */
export const LIMITES = {
  larguraMin: 0.3,
  larguraMax: 12,
  alturaMin: 0.3,
  alturaMax: 6,
  quantidadeMin: 1,
  quantidadeMax: 50,
};

export const helperById = (lista: Opcao[], id: string) =>
  lista.find((o) => o.id === id);
