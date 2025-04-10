import { HistoricoState } from '@/types/historico';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useHistoricoStore = create<HistoricoState>()(
  persist(
    (set, get) => ({
      historico: [],
      adicionarHistorico: (dados) =>
        set({ historico: [...get().historico, dados] }),
    }),
    { name: 'historico-simulador' }
  )
);
