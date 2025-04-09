export interface EntradasState {
  quantidade: number;
  nomes: string[];
  valores: string[];
  formularioPreenchido: boolean;
  setQuantidade: (qtd: number) => void;
  setNomes: (nomes: string[]) => void;
  setValores: (valores: string[]) => void;
  setFormularioPreenchido: (preenchido: boolean) => void;
  resetAll: () => void;
}
