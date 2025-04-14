import { RetiradaState } from '@/types/retirada';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useUserStore } from './useUserStore';
import { useSimuladorStore } from './useSimuladorStore'; 

export const useRetiradaStore = create<RetiradaState>()(
  persist(
    (set, get) => ({
      anoAtual: new Date().getFullYear(),
      retiradas: [],
      
      setAnoAtual: (ano) => set({ anoAtual: ano }),

      addRetirada: ({ nome, valor, pagamento, titulo }) => {
        const { retiradas } = get();
        const { ano } = useSimuladorStore.getState();
        const idade = useUserStore.getState().idade;
   
        set({
          retiradas: [...retiradas, { nome, valor, ano, idade, pagamento, titulo }],
        });
      },

      removerHistorico: (index: number) => {
        const state = get();
        const retiradaRemovida = state.retiradas[index];
      
        if (!retiradaRemovida) return;
      
        const { resultadoHome, setResultadoHome } = useSimuladorStore.getState();
      
        if (resultadoHome) {
        
          const novoValor =
            retiradaRemovida.titulo === 'Novo Depósito'
              ? resultadoHome.valorFinal - retiradaRemovida.valor
              : resultadoHome.valorFinal + retiradaRemovida.valor;
      
          setResultadoHome({ ...resultadoHome, valorFinal: novoValor });
        }
      
        set({
          retiradas: state.retiradas.filter((_, i) => i !== index),
        });
      },
      

      resetAll: () =>
        set({
          anoAtual: new Date().getFullYear(),
          retiradas: [],
        }),
    }),
    {
      name: 'retirada-store',
    }
  )
);
