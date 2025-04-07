import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { SimuladorState } from '@/types/simulador';
import { RendaFamiliarState } from '@/types/renda-familiar';

type StoreState = SimuladorState & RendaFamiliarState 

export const useSimuladorStore = create<StoreState>()(
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
    }),
    {
      name: 'simulador-storage',
    }
  )
);
