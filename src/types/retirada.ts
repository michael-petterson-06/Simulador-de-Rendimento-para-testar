export type Retirada = {
  nome: string;
  valor: number;
  ano: number;
  idade: number;
  pagamento: 'À Vista' | 'Parcelado';
};

export type RetiradaState = {
  anoAtual: number;
  retiradas: Retirada[];
  setAnoAtual: (ano: number) => void;
  addRetirada: (retirada: Omit<Retirada, 'ano' | 'idade'>) => void;
  resetAll: () => void;
};


export interface RetiradaPanelProps {
  onCancel: () => void;
  onSalvar: (nome: string, valor: number) => void;
  modo?: 'Retirada' | 'Novo Depósito';
  tipoPagamento?: 'À Vista' | 'Parcelado';
  titulo?: string;
  placeholderNome?: string;
  placeholderValor?: string;
  labelBotaoSalvar?: string;
}
