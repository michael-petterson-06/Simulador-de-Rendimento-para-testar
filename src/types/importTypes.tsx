export type DadoImportado = {
    nome: string;
    valor: number;
    ano: number;
    idade: number;
    pagamento: 'À Vista' | 'Parcelado';
    tipo: 'Nova Retirada' | 'Novo Depósito';
  };
  