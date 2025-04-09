import { EntradasState } from '@/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useEntradasStore = create<EntradasState>()(
  persist(
    (set) => ({
      quantidade: 0,
      nomes: [],
      setQuantidade: (qtd) => set({ quantidade: qtd }),
      setNomes: (nomes) => set({ nomes }),
      reset: () => set({ quantidade: 0, nomes: [] }),
    }),
    { name: 'entradas-store' }
  )
);
