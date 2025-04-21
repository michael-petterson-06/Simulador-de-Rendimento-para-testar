'use client';

import { useState } from 'react';
import { useEntradasStore } from '@/store/useEntradasStore';
import { Input } from './ui/Input';
import { Button } from './ui/Button';
import { EditarEntradaProps } from '@/types/editarEntradaProps';

export const EditarEntrada = ({ entrada, onCancelar }: EditarEntradaProps) => {
  const [novoNome, setNovoNome] = useState(entrada.nome);
  const { updateNomeEntrada } = useEntradasStore();

  const salvarEdicao = () => {
    updateNomeEntrada(entrada.index, novoNome);
    onCancelar();
  };

  return (
    <div className="space-y-4 text-center text-yellow-400">
      <h2 className="text-lg font-bold">Editar Entrada</h2>

      <Input
        type="text"
        value={novoNome}
        onChange={(e) => setNovoNome(e.target.value)}
        placeholder="Novo nome da entrada"
        className="bg-black text-yellow-400 border-yellow-500 focus:ring-yellow-500 placeholder-yellow-300"
      />

      <div className="flex justify-center gap-4">
        <Button
          onClick={salvarEdicao}
          className="bg-yellow-400 text-black hover:bg-black hover:text-yellow-400 border border-yellow-400 transition-all duration-500"
        >
          Salvar
        </Button>
        <Button
          onClick={onCancelar}
          className="bg-gray-300 text-black hover:bg-gray-400 transition-all duration-300"
        >
          Cancelar
        </Button>
      </div>
    </div>
  );
};
