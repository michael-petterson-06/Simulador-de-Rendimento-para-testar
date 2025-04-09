'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/store/useUserStore';
import { useSimuladorStore } from '@/store/useSimuladorStore';
import { Nav } from './ui/Nav';
import { Button } from './ui/Button';

export const ClientHeader = () => {
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

  if (!hydrated || !nome) return null;

  const handleLogout = () => {
    setSaindo(true);
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

  return (
    <div className="flex justify-between items-center px-6 pt-4 mb-6">
      <Nav />
      <div className="flex items-center gap-4 text-sm text-gray-600 whitespace-nowrap">
        <span>
          👤 {nome} — {idade} anos ({ano})
        </span>

        <div className="flex gap-2">
          <Button
            onClick={decrementarAnoEIdade}
            className="bg-yellow-300 hover:bg-yellow-400 text-black px-2 py-1 text-xs"
          >
            -1
          </Button>
          <Button
            onClick={incrementarAnoEIdade}
            className="bg-green-400 hover:bg-green-500 text-white px-2 py-1 text-xs"
          >
            +1
          </Button>
        </div>

        {saindo ? (
          <span className="text-rose-600 animate-pulse">Saindo...</span>
        ) : (
          <Button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 text-sm"
          >
            Sair
          </Button>
        )}
      </div>
    </div>
  );
};
