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

      addRetirada: ({ nome, valor, pagamento }) => {
        const { retiradas } = get();
        const { ano } = useSimuladorStore.getState();
        const idade = useUserStore.getState().idade;

        set({
          retiradas: [...retiradas, { nome, valor, pagamento, ano, idade }],
        });
      },

      removerHistorico: (index: number) =>
        set((state) => ({
          retiradas: state.retiradas.filter((_, i) => i !== index),
        })),
      

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
