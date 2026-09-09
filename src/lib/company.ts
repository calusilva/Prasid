/**
 * Dados institucionais da Prasid Ibérica.
 * Ponto único de verdade — alterar aqui reflete em todo o site
 * (Header, Footer, blocos de contacto, metadata, email de propostas).
 */

export const company = {
  legalName: "Prasid Ibérica – Comércio de Químicos e Têxteis, Lda",
  shortName: "Prasid Ibérica",
  tagline: "Duas áreas, uma casa. Químicos e têxteis por grosso desde 1986.",

  founded: 1986,

  address: {
    street: "R. dos Mourões 757",
    postalCode: "4410-137",
    locality: "São Félix da Marinha",
    municipality: "V. N. de Gaia",
    country: "Portugal",
    /** Consulta pública — usado no embed do mapa (sem API key). */
    mapsQuery: "R. dos Mourões 757, 4410-137 São Félix da Marinha",
  },

  phone: {
    display: "22 733 0750",
    href: "+351227330750",
  },

  email: {
    /** Endereço comercial mostrado ao público. */
    general: "geral@prasidiberica.pt",
  },

  hours: "Segunda a sexta, 9h00 – 18h00",

  /** Linha do tempo apresentada na Home. */
  timeline: [
    {
      year: "1986",
      title: "David Andrade, Lda",
      text: "A empresa nasce dedicada ao comércio grossista de tecidos e acessórios de decoração.",
    },
    {
      year: "2006",
      title: "Expansão para químicos",
      text: "Alargamos a atividade a produtos químicos industriais, higiene e limpeza, servindo indústria e hotelaria.",
    },
    {
      year: "Hoje",
      title: "Prasid Ibérica, Lda",
      text: "Duas divisões complementares sob o mesmo teto, com quase quatro décadas de relações comerciais.",
    },
  ],

  mission:
    "Abastecer a indústria e os serviços com produtos químicos e têxteis de confiança, mantendo a proximidade e o rigor técnico de uma empresa familiar.",

  values: [
    {
      title: "Continuidade",
      text: "Décadas ao lado dos mesmos clientes e fornecedores. O que prometemos, cumprimos.",
    },
    {
      title: "Rigor técnico",
      text: "Fichas de produto, dosagens e compatibilidades — informação clara antes da venda.",
    },
    {
      title: "Proximidade",
      text: "Uma equipa pequena que conhece cada encomenda pelo nome.",
    },
  ],
} as const;

export const fullAddress = `${company.address.street}, ${company.address.postalCode} ${company.address.locality}, ${company.address.municipality}`;
