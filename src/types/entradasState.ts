export type EntradasState = {
  quantidade: number;
  nomes: string[];
  setQuantidade: (qtd: number) => void;
  setNomes: (nomes: string[]) => void;
  reset: () => void;
};