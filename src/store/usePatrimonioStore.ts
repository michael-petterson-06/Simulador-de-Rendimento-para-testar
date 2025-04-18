// src/store/usePatrimonioStore.ts
import { PatrimonioState } from '@/types/patrimonioState';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const usePatrimonioStore = create<PatrimonioState>()(
  persist(
    (set, get) => ({
    
      patrimonios: [],
    
      addPatrimonio: (patrimonio) =>
        set({ patrimonios: [...get().patrimonios, patrimonio] }),
    
      removePatrimonio: (id) =>
        set({ patrimonios: get().patrimonios.filter((p) => p.id !== id) }),
    
      updatePatrimonio: (novoPatrimonio) =>
        set({
          patrimonios: get().patrimonios.map((p) =>
            p.id === novoPatrimonio.id ? novoPatrimonio : p
          ),
        }),
    }),
    { name: 'patrimonio-store' }
  )
);
