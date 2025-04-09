import { SimuladorState } from '@/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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

      ano: new Date().getFullYear(),

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

      editarGasto: (index, novoGasto) => {
        const novaLista = [...get().listaGastos];
        novaLista[index] = novoGasto;
        const novoTotal = novaLista.reduce((acc, g) => acc + g.valor, 0);
        set({
          listaGastos: novaLista,
          gastos: novoTotal.toString(),
        });
      },

      removerGasto: (index) => {
        const novaLista = get().listaGastos.filter((_, i) => i !== index);
        const novoTotal = novaLista.reduce((acc, g) => acc + g.valor, 0);
        set({
          listaGastos: novaLista,
          gastos: novoTotal.toString(),
        });
      },

      setResultadoRenda: (r) => set({ resultadoRenda: r }),

      setAno: (ano) => set({ ano }),
      // incrementar: () => set((state) => ({ ano: state.ano + 1 })),
      // decrementar: () => set((state) => ({ ano: state.ano - 1 })),

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
          ano: new Date().getFullYear(),
        }),
    }),
    {
      name: 'simulador-storage',
    }
  )
);