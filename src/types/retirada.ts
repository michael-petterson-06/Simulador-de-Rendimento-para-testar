export type Retirada = {
  nome: string;
  valor: number;
  ano: number;
};

export type RetiradaState = {
  anoAtual: number;
  retiradas: Retirada[];
  setAnoAtual: (ano: number) => void;
  addRetirada: (retirada: Omit<Retirada, 'ano'>) => void;
};
