/**
 * Conteúdo editorial das duas divisões (Químicos e Têxteis).
 * Textos e categorias num só sítio para facilitar manutenção.
 */

export interface Categoria {
  titulo: string;
  descricao: string;
  exemplos: string[];
}

/* ── QUÍMICOS ─────────────────────────────────────────────────────────────── */

export const quimicosCategorias: Categoria[] = [
  {
    titulo: "Químicos industriais",
    descricao:
      "Matérias-primas e produtos de processo para linhas de produção e manutenção fabril.",
    exemplos: ["Ácidos e bases", "Solventes técnicos", "Aditivos de processo"],
  },
  {
    titulo: "Auxiliares têxteis",
    descricao:
      "Produtos químicos de apoio às fases de tinturaria, acabamento e lavandaria industrial.",
    exemplos: ["Detergentes de tinturaria", "Amaciadores", "Fixadores e igualizadores"],
  },
  {
    titulo: "Higiene",
    descricao:
      "Gamas de higiene pessoal e coletiva para hotelaria, restauração e unidades de saúde.",
    exemplos: ["Sabonete líquido", "Gel desinfetante", "Higiene de mãos e superfícies"],
  },
  {
    titulo: "Limpeza profissional",
    descricao:
      "Detergentes e desinfetantes concentrados para empresas de limpeza e facility services.",
    exemplos: ["Desengordurantes", "Multiusos concentrado", "Pavimentos e sanitários"],
  },
];

export const quimicosSetores = [
  {
    nome: "Indústria têxtil",
    texto: "Auxiliares para tinturaria, estamparia e acabamento.",
  },
  {
    nome: "Hotelaria e restauração",
    texto: "Higiene, lavandaria e limpeza de cozinha em regime profissional.",
  },
  {
    nome: "Limpeza profissional",
    texto: "Fornecimento a granel e em concentrado para diluição controlada.",
  },
  {
    nome: "Lavandarias industriais",
    texto: "Ciclos de lavagem, branqueamento e neutralização.",
  },
  {
    nome: "Unidades de saúde e lares",
    texto: "Desinfeção de superfícies e higiene de mãos com registo.",
  },
  {
    nome: "Indústria alimentar",
    texto: "Detergência CIP e higienização de zonas de produção.",
  },
];

/* ── TÊXTEIS ──────────────────────────────────────────────────────────────── */

export const texteisMateriais: Categoria[] = [
  {
    titulo: "Tecidos de decoração",
    descricao:
      "Panos para cortinados, reposteiros e estofo leve, lisos ou com padrão.",
    exemplos: ["Linho e misturas", "Algodão", "Jacquard decorativo"],
  },
  {
    titulo: "Voil e transparentes",
    descricao: "Tecidos leves que filtram a luz sem escurecer o espaço.",
    exemplos: ["Voil liso", "Voil bordado", "Linho translúcido"],
  },
  {
    titulo: "Blackout e técnicos",
    descricao: "Forros e tecidos de escurecimento total ou térmico.",
    exemplos: ["Blackout 3 passagens", "Forro térmico", "Acústico"],
  },
  {
    titulo: "Acessórios e ferragens",
    descricao:
      "Tudo o que sustenta e remata o cortinado: calhas, varões e fitas.",
    exemplos: ["Calhas e varões", "Fitas franzir", "Argolas, ganchos e abraçadeiras"],
  },
];
