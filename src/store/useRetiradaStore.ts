import { RetiradaState } from '@/types/retirada';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useUserStore } from './useUserStore';

export const useRetiradaStore = create<RetiradaState>()(
  persist(
    (set, get) => ({
      anoAtual: new Date().getFullYear(),
      retiradas: [],
      setAnoAtual: (ano) => set({ anoAtual: ano }),

      addRetirada: ({ nome, valor, pagamento }) => {
        const { anoAtual, retiradas } = get();
        const idade = useUserStore.getState().idade;

        set({
          retiradas: [...retiradas, { nome, valor, pagamento, ano: anoAtual, idade }],
        });
      },
    }),
    {
      name: 'retirada-store',
    }
  )
);