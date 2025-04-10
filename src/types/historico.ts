type Historico = {
  usuario: { nome: string; idade: number };
  ano: number;
  entradas: { nome: string; valor: string }[];
  gastos: { nome: string; valor: number }[];
  totalEntradas: number;
  totalGastos: number;
  saldoFinal: number;
};

export type HistoricoState = {
  historico: Historico[];
  adicionarHistorico: (dados: Historico) => void;
};