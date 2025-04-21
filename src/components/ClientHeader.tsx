'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/store/useUserStore';
import { useSimuladorStore } from '@/store/useSimuladorStore';
import { Nav } from './ui/Nav';
import { Button } from './ui/Button';
import { useRetiradaStore } from '@/store/useRetiradaStore';
import { useEntradasStore } from '@/store/useEntradasStore';
import { useHistoricoStore } from '@/store/useHistoricoStore';
import { usePatrimonioStore } from '@/store/usePatrimonioStore';

export const ClientHeader = () => {
  const { formularioPreenchido } = useEntradasStore();
  const [hydrated, setHydrated] = useState(false);
  const [saindo, setSaindo] = useState(false);

  const { nome, idade, logout, setIdade } = useUserStore();
  const { ano, setAno } = useSimuladorStore();
  const router = useRouter();

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated && !nome) {
      router.replace('/login');
    }
  }, [hydrated, nome, router]);

  useEffect(() => {
    if (nome && hydrated) {
      setSaindo(false);
    }
  }, [nome, hydrated]);

  if (!formularioPreenchido) return null;
  if (!hydrated || !nome) return null;

  const handleLogout = () => {
    setSaindo(true);
    limparTudo();
    setTimeout(() => {
      logout();
      router.push('/login');
    }, 1500);
  };

  const incrementarAnoEIdade = () => {
    setAno(ano + 1);
    setIdade(idade + 1);
  };

  const decrementarAnoEIdade = () => {
    setAno(ano - 1);
    setIdade(idade - 1);
  };

  const limparTudo = () => {
    if (confirm('Tem certeza que deseja limpar todos os dados da aplicação?')) {
      useSimuladorStore.getState().resetAll();
      useUserStore.getState().resetAll();
      useRetiradaStore.getState().resetAll();
      useEntradasStore.getState().resetAll();
      useHistoricoStore.getState().resetAll();
      usePatrimonioStore.getState().resetAll();
      router.push('/login');
    }
  };

  return (
    <header className="w-full px-4 pt-4 mb-6">
      <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-4">
 
        <div className="flex justify-center md:justify-start w-full md:w-auto">
          <Nav />
        </div>

        <div className="flex flex-wrap justify-center md:justify-end items-center gap-2 text-sm text-yellow-400 font-medium whitespace-nowrap">
          <span className="text-yellow-400"> {nome} — {idade} anos ({ano})</span>

          <div className="flex gap-2">
            <Button
              onClick={decrementarAnoEIdade}
              className="bg-yellow-400 hover:bg-yellow-500 text-black px-2 py-1 text-xs border border-yellow-500 transition duration-300"
            >
              -1
            </Button>
            <Button
              onClick={incrementarAnoEIdade}
              className="bg-yellow-400 hover:bg-yellow-500 text-black px-2 py-1 text-xs border border-yellow-500 transition duration-300"
            >
              +1
            </Button>

            {saindo ? (
              <span className="text-rose-600 animate-pulse">Saindo...</span>
            ) : (
              <Button
                onClick={handleLogout}
                className="bg-black hover:bg-red-600 border border-yellow-400 px-3 py-1 text-sm transition duration-300"
              >
                Sair
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
