'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/store/useUserStore';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

export default function LoginPage() {
  const [nome, setNome] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [erro, setErro] = useState('');
  const [hydrated, setHydrated] = useState(false);

  const { setUser, nome: nomeSalvo } = useUserStore();
  const router = useRouter();

  useEffect(() => {
    setHydrated(true);
  }, []);

  const handleEntrar = () => {
    if (!nome.trim() || !dataNascimento.trim()) {
      setErro('Preencha todos os campos!');
      return;
    }
    setUser(nome.trim(), dataNascimento);
    router.push('/');
  };

  if (!hydrated) return null; // impede o 'flash'

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-100 to-white p-4 flex items-center justify-center">
      <div className="w-full max-w-md">
        <Card>
          <h1 className="text-2xl font-bold text-center mb-6">Bem-vindo! 🧑‍💻</h1>

          {nomeSalvo ? (
            <div className="text-center space-y-4">
              <p className="text-green-600 font-medium">
                Você já está logado como <strong>{nomeSalvo}</strong>.<br />
                Para acessar outra conta, deslogue primeiro.
              </p>
              <Button onClick={() => router.back()} className="bg-indigo-500 hover:bg-indigo-600 text-white">
                Voltar para tela anterior
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <Input
                type="text"
                placeholder="Seu nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
              <Input
                type="date"
                value={dataNascimento}
                onChange={(e) => setDataNascimento(e.target.value)}
              />
              {erro && <p className="text-red-600 text-sm font-medium">{erro}</p>}

              <Button onClick={handleEntrar} className="w-full text-lg">
                Entrar na aplicação
              </Button>
            </div>
          )}
        </Card>
      </div>
    </main>
  );
}
