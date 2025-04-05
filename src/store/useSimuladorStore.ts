import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type SimuladorState = {
  // Simulador de Rendimento
  valorInicial: string;
  aporteMensal: string;
  anos: string;
  juros: string;
  tempoPoupancaTipo: 'anos' | 'meses';

  resultadoHome: {
    totalDepositado: number;
    totalJuros: number;
    valorFinal: number;
  } | null;

  // Renda Familiar
  salarioMichael: string;
  salarioFernanda: string;
  outrasMichael: string;
  outrasFernanda: string;
  gastos: string;

  resultadoRenda: {
    totalEntradas: number;
    saldoFinal: number;
  } | null;

  // Setters
  setValorInicial: (v: string) => void;
  setAporteMensal: (v: string) => void;
  setAnos: (v: string) => void;
  setJuros: (v: string) => void;
  setTempoPoupancaTipo: (tipo: 'anos' | 'meses') => void;
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
          resultadoRenda: null,
        }),
    }),
    {
      name: 'simulador-storage',
    }
  )
);
