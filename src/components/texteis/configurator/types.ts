/** Estado partilhado pelo wizard do configurador. */
export interface ConfiguratorState {
  // técnico
  calha: string;
  material: string;
  acabamento: string;
  larguraM: number;
  alturaM: number;
  quantidade: number;
  // contacto
  nome: string;
  email: string;
  telefone: string;
  notas: string;
}

export const initialState: ConfiguratorState = {
  calha: "",
  material: "",
  acabamento: "",
  larguraM: 2,
  alturaM: 2.6,
  quantidade: 1,
  nome: "",
  email: "",
  telefone: "",
  notas: "",
};

/** Payload enviado para /api/proposta. */
export interface PropostaPayload extends ConfiguratorState {
  // rótulos legíveis (para o email não depender dos ids)
  calhaLabel: string;
  materialLabel: string;
  acabamentoLabel: string;
  // números calculados
  areaTotalM2: number;
  valorEstimado: number;
  precoM2: number;
}
