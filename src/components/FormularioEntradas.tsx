'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from './ui/Input';
import { Button } from './ui/Button';
import { useEntradasStore } from '@/store/useEntradasStore';


export const FormularioEntradas = () => {
  const [quantidadeEntradas, setQuantidadeEntradas] = useState('');
  const [nomesEntradas, setNomesEntradas] = useState('');
  const [erro, setErro] = useState('');

  const { setQuantidade, setNomes, setFormularioPreenchido } = useEntradasStore();
  const router = useRouter();

  const handleFinalizar = () => {
    const qtd = parseInt(quantidadeEntradas);

    if (isNaN(qtd) || qtd <= 0) {
      setErro('Insira uma quantidade válida.');
      return;
    }

    const nomesArray = nomesEntradas
      .split(',')
      .map((n) => n.trim())
      .filter(Boolean);

    if (nomesArray.length !== qtd) {
      setErro('A quantidade de nomes deve ser igual à quantidade informada.');
      return;
    }

    setQuantidade(qtd);
    setNomes(nomesArray);
    setFormularioPreenchido(true);
    router.push('/renda-familiar');
  };

  return (
    <div className="space-y-4">
      <Input
        type="number"
        placeholder="Quantas entradas de renda existem?"
        value={quantidadeEntradas}
        onChange={(e) => setQuantidadeEntradas(e.target.value)}
      />

      <Input
        type="text"
        placeholder="Digite os nomes das entradas separadas por vírgulas"
        value={nomesEntradas}
        onChange={(e) => setNomesEntradas(e.target.value)}
      />

      {erro && <p className="text-red-600 text-sm font-medium">{erro}</p>}

      <Button onClick={handleFinalizar} className="w-full text-lg">
        Entrar na aplicação
      </Button>
    </div>
  );
};
