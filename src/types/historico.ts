type Historico = {
  usuario: { nome: string; idade: number };
  ano: number;
  mesInicial: string;
  mesFinal: string;
  entradas: { nome: string; valor: string }[];
  gastos: { nome: string; valor: number }[];
  totalEntradas: number;
  totalGastos: number;
  saldoFinal: number;
};

export type HistoricoState = {
  historico: Historico[];
  adicionarHistorico: (dados: Historico) => void;
  removerHistorico: (index: number) => void
  resetAll: () => void;
};