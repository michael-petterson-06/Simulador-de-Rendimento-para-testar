export type ResultadoHome = {
  totalDepositado: number;
  totalJuros: number;
  valorFinal: number;
};

export type SimuladorState = {
  valorInicial: string;
  aporteMensal: string;
  anos: string;
  juros: string;
  tempoPoupancaTipo: 'anos' | 'meses';
  resultadoHome: ResultadoHome | null;

  setValorInicial: (v: string) => void;
  setAporteMensal: (v: string) => void;
  setAnos: (v: string) => void;
  setJuros: (v: string) => void;
  setTempoPoupancaTipo: (tipo: 'anos' | 'meses') => void;
  setResultadoHome: (r: ResultadoHome | null) => void;
};