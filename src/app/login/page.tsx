'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/store/useUserStore';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { FormularioEntradas } from '@/components/FormularioEntradas';

export default function LoginPage() {
  const [nome, setNome] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [erro, setErro] = useState('');
  const [mostrarEntradas, setMostrarEntradas] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  const { setUser, nome: nomeSalvo } = useUserStore();
  const router = useRouter();

  useEffect(() => {
    setHydrated(true);
  }, []);

  const handleAvancar = () => {
    if (!nome.trim() || !dataNascimento.trim()) {
      setErro('Preencha todos os campos!');
      return;
    }

    setUser(nome.trim(), dataNascimento);
    setMostrarEntradas(true);
  };

  if (!hydrated) return null;

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 p-4 flex items-center justify-center text-white">
      <div className="w-full max-w-md">
        <Card className="bg-gray-900 text-white">
          <h1 className="text-2xl font-bold text-center mb-6">Bem-vindo! </h1>

          {mostrarEntradas ? (
            <FormularioEntradas
              onFechar={() => setMostrarEntradas(false)}
              login="Login"
            />
          ) : nomeSalvo ? (
            <div className="text-center space-y-4">
              <p className="text-green-400 font-medium">
                Você já está logado como <strong>{nomeSalvo}</strong>.<br />
                Para acessar outra conta, deslogue primeiro.
              </p>
              <Button
                onClick={() => {
                  router.push('/renda-familiar');
                }}
                className="bg-yellow-500 hover:bg-yellow-600 text-black"
              >
                Voltar para aplicação
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <Input
                type="text"
                placeholder="Seu nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="bg-gray-800 text-white placeholder-gray-400"
              />
              <Input
                type="date"
                value={dataNascimento}
                onChange={(e) => setDataNascimento(e.target.value)}
                className="bg-gray-800 text-white placeholder-gray-400"
              />
              {erro && <p className="text-red-400 text-sm font-medium">{erro}</p>}

              <Button
                onClick={handleAvancar}
                className="w-full text-lg bg-yellow-500 hover:bg-yellow-600 text-black"
              >
                Avançar
              </Button>
            </div>
          )}
        </Card>
      </div>
    </main>
  );
}
