import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type SimuladorState = {
  // home
  valorInicial: string;
  aporteMensal: string;
  jurosAnual: string;
  anos: string;

  // resultado home
  resultadoHome: {
    totalDepositado: number;
    totalJuros: number;
    valorFinal: number;
  } | null;

  // renda familiar
  salarioMichael: string;
  salarioFernanda: string;
  outrasMichael: string;
  outrasFernanda: string;
  gastos: string;

  // resultado renda
  resultadoRenda: {
    totalEntradas: number;
    saldoFinal: number;
  } | null;

  // setters
  setValorInicial: (v: string) => void;
  setAporteMensal: (v: string) => void;
  setJurosAnual: (v: string) => void;
  setAnos: (v: string) => void;
  setResultadoHome: (r: SimuladorState['resultadoHome']) => void;

  setSalarioMichael: (v: string) => void;
  setSalarioFernanda: (v: string) => void;
  setOutrasMichael: (v: string) => void;
  setOutrasFernanda: (v: string) => void;
  setGastos: (v: string) => void;
  setResultadoRenda: (r: SimuladorState['resultadoRenda']) => void;

  resetAll: () => void;
};

export const useSimuladorStore = create<SimuladorState>()(
  persist(
    (set) => ({
      // valores home
      valorInicial: '',
      aporteMensal: '',
      jurosAnual: '',
      anos: '',
      resultadoHome: null,

      // valores renda
      salarioMichael: '',
      salarioFernanda: '',
      outrasMichael: '',
      outrasFernanda: '',
      gastos: '',
      resultadoRenda: null,

      // setters home
      setValorInicial: (v) => set({ valorInicial: v }),
      setAporteMensal: (v) => set({ aporteMensal: v }),
      setJurosAnual: (v) => set({ jurosAnual: v }),
      setAnos: (v) => set({ anos: v }),
      setResultadoHome: (r) => set({ resultadoHome: r }),

      // setters renda
      setSalarioMichael: (v) => set({ salarioMichael: v }),
      setSalarioFernanda: (v) => set({ salarioFernanda: v }),
      setOutrasMichael: (v) => set({ outrasMichael: v }),
      setOutrasFernanda: (v) => set({ outrasFernanda: v }),
      setGastos: (v) => set({ gastos: v }),
      setResultadoRenda: (r) => set({ resultadoRenda: r }),

      // reset tudo
      resetAll: () =>
        set({
          valorInicial: '',
          aporteMensal: '',
          jurosAnual: '',
          anos: '',
          resultadoHome: null,
          salarioMichael: '',
          salarioFernanda: '',
          outrasMichael: '',
          outrasFernanda: '',
          gastos: '',
          resultadoRenda: null,
        }),
    }),
    {
      name: 'simulador-storage', // nome da key no localStorage
    }
  )
);
