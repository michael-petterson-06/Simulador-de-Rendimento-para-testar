// src/store/useEntradasStore.ts

import { EntradasState } from '@/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useEntradasStore = create<EntradasState>()(
  persist(
    (set, get) => ({
      quantidade: 0,
      nomes: [],
      valores: [],
      formularioPreenchido: false,

      setQuantidade: (qtd) => set({ quantidade: qtd }),

      setNomes: (novosNomes) => {
        
        const { nomes: nomesAtuais, valores: valoresAtuais } = get();
        
        const novosValores = novosNomes.map((nome) => {
          const indexExistente = nomesAtuais.findIndex(
            (nomeAntigo) => nomeAntigo.trim().toLowerCase() === nome.trim().toLowerCase()
          );

          return indexExistente !== -1 ? valoresAtuais[indexExistente] : '';
        });

        set({
          nomes: novosNomes,
          valores: novosValores,
        });
      },

      setValores: (valores) => set({ valores }),

      setFormularioPreenchido: (preenchido) => set({ formularioPreenchido: preenchido }),

      resetAll: () =>
        set({
          quantidade: 0,
          nomes: [],
          valores: [],
          formularioPreenchido: false,
        }),
    }),
    {
      name: 'entradas-store',
    }
  )
);
