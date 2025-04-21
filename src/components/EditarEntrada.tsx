'use client';

import { useState } from 'react';
import { useEntradasStore } from '@/store/useEntradasStore';
import { Input } from './ui/Input';
import { Button } from './ui/Button';
// import { useRouter } from 'next/navigation';
import { EditarEntradaProps } from '@/types/editarEntradaProps';

export const EditarEntrada = ({ entrada, onCancelar }: EditarEntradaProps) => {
  const [novoNome, setNovoNome] = useState(entrada.nome);
  const { nomes, setNomes } = useEntradasStore();
  // const router = useRouter();

  const salvarEdicao = () => {
    const novosNomes = [...nomes];
    novosNomes[entrada.index] = novoNome;
    setNomes(novosNomes);
    onCancelar();
    // router.push('/renda-familiar');
  };

  return (
    <div className="space-y-4 text-center">
      <h2 className="text-lg font-bold text-indigo-700">Editar Entrada</h2>
      <Input
        type="text"
        value={novoNome}
        onChange={(e) => setNovoNome(e.target.value)}
        placeholder="Novo nome da entrada"
      />
      <div className="flex justify-center gap-4">
        <Button onClick={salvarEdicao} className="bg-green-500 text-white hover:bg-green-600">
          Salvar
        </Button>
        <Button onClick={onCancelar} className="bg-gray-300 text-gray-800 hover:bg-gray-400">
          Cancelar
        </Button>
      </div>
    </div>
  );
};
