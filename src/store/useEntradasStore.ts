import { EntradasState } from '@/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useEntradasStore = create<EntradasState>()(
  persist(
    (set) => ({
      quantidade: 0,
      nomes: [],
      valores: [],
      formularioPreenchido: false,
      setQuantidade: (qtd) => set({ quantidade: qtd }),
     
     
      setNomes: (novosNomes) =>
        set({
          nomes: novosNomes,
          valores: novosNomes.map(() => ''),
        }),
     
      setFormularioPreenchido: (preenchido) => set({ formularioPreenchido: preenchido }),
      setValores: (valores) => set({ valores }),
      resetAll: () => set({ quantidade: 0, nomes: [], formularioPreenchido: false, valores: [] }),
    }),
    { name: 'entradas-store' }
  )

);
