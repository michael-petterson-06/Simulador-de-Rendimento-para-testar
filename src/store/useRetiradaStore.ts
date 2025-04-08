import { RetiradaState } from '@/types/retirada';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';



export const useRetiradaStore = create<RetiradaState>()(
  persist(
    (set, get) => ({
      anoAtual: new Date().getFullYear(),
      retiradas: [],
      setAnoAtual: (ano) => set({ anoAtual: ano }),
      addRetirada: ({ nome, valor }) => {
        const { anoAtual, retiradas } = get();
        set({
          retiradas: [...retiradas, { nome, valor, ano: anoAtual }],
        });
      },
    }),
    {
      name: 'retirada-store',
    }
  )
);