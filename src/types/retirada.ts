export type Retirada = {
  nome: string;
  valor: number;
  ano: number;
  idade: number;
  pagamento: string
};

export type RetiradaState = {
  anoAtual: number;
  retiradas: Retirada[];
  setAnoAtual: (ano: number) => void;
  addRetirada: (retirada: Omit<Retirada, 'ano' | 'idade'>) => void;
};


export interface RetiradaPanelProps {
  onCancel: () => void;
  onSalvar: (nome: string, valor: number) => void;
  tipoPagamento?: string;
}
