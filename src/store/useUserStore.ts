import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserState } from '@/types/user';

function calcularIdade(dataNascimento: string): number {
  const hoje = new Date();
  const nascimento = new Date(dataNascimento);
  let idade = hoje.getFullYear() - nascimento.getFullYear();
  const m = hoje.getMonth() - nascimento.getMonth();
  if (m < 0 || (m === 0 && hoje.getDate() < nascimento.getDate())) {
    idade--;
  }
  return idade;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      nome: '',
      dataNascimento: '',
      idade: 0,
      setUser: (nome, dataNascimento) =>
        set({ nome, dataNascimento, idade: calcularIdade(dataNascimento) }),
      logout: () =>
        set({
          nome: '',
          dataNascimento: '',
          idade: 0,
        }),
    }),
    { name: 'user-store' }
  )
);
