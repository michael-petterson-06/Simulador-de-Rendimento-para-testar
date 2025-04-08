import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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

  salarioMichael: string;
  salarioFernanda: string;
  outrasMichael: string;
  outrasFernanda: string;
  gastos: string;
  listaGastos: Gasto[];
  resultadoRenda: ResultadoRenda | null;

  setValorInicial: (v: string) => void;
  setAporteMensal: (v: string) => void;
  setAnos: (v: string) => void;
  setJuros: (v: string) => void;
  setTempoPoupancaTipo: (tipo: 'anos' | 'meses') => void;
  setResultadoHome: (r: ResultadoHome | null) => void;

  setSalarioMichael: (v: string) => void;
  setSalarioFernanda: (v: string) => void;
  setOutrasMichael: (v: string) => void;
  setOutrasFernanda: (v: string) => void;
  setGastos: (v: string) => void;
  addGasto: (gasto: Gasto) => void;
  setResultadoRenda: (r: ResultadoRenda | null) => void;

  resetAll: () => void;
};

export const useSimuladorStore = create<SimuladorState>()(
  persist(
    (set, get) => ({
      valorInicial: '',
      aporteMensal: '',
      anos: '',
      juros: '',
      tempoPoupancaTipo: 'anos',
      resultadoHome: null,

      salarioMichael: '',
      salarioFernanda: '',
      outrasMichael: '',
      outrasFernanda: '',
      gastos: '',
      listaGastos: [],
      resultadoRenda: null,

      setValorInicial: (v) => set({ valorInicial: v }),
      setAporteMensal: (v) => set({ aporteMensal: v }),
      setAnos: (v) => set({ anos: v }),
      setJuros: (v) => set({ juros: v }),
      setTempoPoupancaTipo: (tipo) => set({ tempoPoupancaTipo: tipo }),
      setResultadoHome: (r) => set({ resultadoHome: r }),

      setSalarioMichael: (v) => set({ salarioMichael: v }),
      setSalarioFernanda: (v) => set({ salarioFernanda: v }),
      setOutrasMichael: (v) => set({ outrasMichael: v }),
      setOutrasFernanda: (v) => set({ outrasFernanda: v }),
      setGastos: (v) => set({ gastos: v }),
      addGasto: (gasto) => {
        const listaAtual = get().listaGastos;
        const novoTotal = listaAtual.reduce((acc, cur) => acc + cur.valor, 0) + gasto.valor;
        set({
          listaGastos: [...listaAtual, gasto],
          gastos: novoTotal.toString(),
        });
      },
      setResultadoRenda: (r) => set({ resultadoRenda: r }),

      resetAll: () =>
        set({
          valorInicial: '',
          aporteMensal: '',
          anos: '',
          juros: '',
          tempoPoupancaTipo: 'anos',
          resultadoHome: null,
          salarioMichael: '',
          salarioFernanda: '',
          outrasMichael: '',
          outrasFernanda: '',
          gastos: '',
          listaGastos: [],
          resultadoRenda: null,
        }),
    }),
    {
      name: 'simulador-storage',
    }
  )
);
