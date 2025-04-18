export type Patrimonio = {
  id: string;
  ano: number;
  idade: number;
  propriedade: string;
  valor: number;
};

export type PatrimonioState = {
  patrimonios: Patrimonio[];
  addPatrimonio: (patrimonio: Patrimonio) => void;
  removePatrimonio: (id: string) => void;
  updatePatrimonio: (patrimonio: Patrimonio) => void;
};