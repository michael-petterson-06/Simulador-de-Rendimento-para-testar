export type Historico = {
  usuario: { nome: string; idade: number };
  ano: number;
  mesInicial: string;
  mesFinal: string;
  entradas: { nome: string; valor: string }[];
  gastos: { nome: string; valor: number }[];
  totalEntradas: number;
  totalGastos: number;
  saldoFinal: number;
  valorPoupado: number;
};

export type HistoricoState = {
  historico: Historico[];
  anoSelecionado: number | 'todos';
  setAnoSelecionado: (ano: number | 'todos') => void;
  adicionarHistorico: (dados: Historico) => void;
  removerHistorico: (index: number) => void;
  limparTodos: () => void;
  limparPorAno: (ano: number) => void;
  resetAll: () => void;
};

export type Props = {
    historicoFiltrado: Historico[];
    setIndiceParaRemover: (index: number) => void;
  };
  