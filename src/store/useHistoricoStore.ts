import { HistoricoState } from '@/types/historico';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useHistoricoStore = create<HistoricoState>()(
  persist(
    (set, get) => ({
      historico: [],
      adicionarHistorico: (dados) =>
        set({ historico: [...get().historico, dados] }),
      removerHistorico: (index) => {
        const novaLista = get().historico.filter((_, i) => i !== index);
        set({ historico: novaLista });
      },
      resetAll: () => set({ historico: [] }),
    }),
    { name: 'historico-simulador' }
  )
);
