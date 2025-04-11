export type ResultadoHome = {
  totalDepositado: number;
  totalJuros: number;
  valorFinal: number;
};

export type ResultadoRenda = {
  totalEntradas: number;
  saldoFinal: number;
};

export type Gasto = {
  nome: string;
  valor: number;
};

export type SimuladorState = {
  valorInicial: string;
  aporteMensal: string;
  anos: string;
  juros: string;
  tempoPoupancaTipo: 'anos' | 'meses';
  resultadoHome: ResultadoHome | null;
  mesInicial: string;
  mesFinal: string;
  

  gastos: string;
  listaGastos: Gasto[];
  resultadoRenda: ResultadoRenda | null;

  ano: number;
  setAno: (ano: number) => void;
  
  setValorInicial: (v: string) => void;
  setAporteMensal: (v: string) => void;
  setAnos: (v: string) => void;
  setJuros: (v: string) => void;
  setTempoPoupancaTipo: (tipo: 'anos' | 'meses') => void;
  setResultadoHome: (r: ResultadoHome | null) => void;

  setGastos: (v: string) => void;

  addGasto: (gasto: Gasto) => void;
  editarGasto: (index: number, novoGasto: Gasto) => void;
  removerGasto: (index: number) => void;

  setMesInicial: (mes: string) => void;
  setMesFinal: (mes: string) => void;

  setResultadoRenda: (r: ResultadoRenda | null) => void;
  resetGastos: () => void;
  resetAll: () => void;
};
