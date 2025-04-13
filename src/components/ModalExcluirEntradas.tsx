'use client';

import { useState } from 'react';
import { Button } from './ui/Button';
import { useEntradasStore } from '@/store/useEntradasStore';
import { ModalExcluirEntradasProps } from '@/types/modalExcluirEntradasProps';

export const ModalExcluirEntradas = ({ onCancelar }: ModalExcluirEntradasProps) => {
  const { nomes, valores, setNomes, setValores, setQuantidade } = useEntradasStore();
  const [selecionados, setSelecionados] = useState<string[]>([]);

  const toggleSelecionado = (nome: string) => {
    setSelecionados((prev) =>
      prev.includes(nome)
        ? prev.filter((n) => n !== nome)
        : [...prev, nome]
    );
  };

  const handleExcluir = () => {
    const novosNomes = nomes.filter((nome) => !selecionados.includes(nome));
    const novosValores = nomes
      .map((nome, index) => ({ nome, valor: valores[index] }))
      .filter((item) => !selecionados.includes(item.nome))
      .map((item) => item.valor);

    setNomes(novosNomes);
    setValores(novosValores);
    setQuantidade(novosNomes.length);
    onCancelar(); // Fecha o modal
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-xl max-w-sm w-full space-y-4 text-center animate-fade-in">
        <h2 className="text-lg font-semibold text-rose-600">Excluir Entradas</h2>

        <div className="text-left max-h-48 overflow-y-auto space-y-2">
          {nomes.map((nome, index) => (
            <label key={index} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={selecionados.includes(nome)}
                onChange={() => toggleSelecionado(nome)}
              />
              {nome}
            </label>
          ))}
        </div>

        <div className="flex justify-center gap-4 pt-4">
          <Button
            onClick={handleExcluir}
            className="bg-rose-500 hover:bg-rose-600 text-white"
            disabled={selecionados.length === 0}
          >
            Excluir selecionados
          </Button>
          <Button
            onClick={onCancelar}
            className="bg-gray-300 text-gray-800 hover:bg-gray-400"
          >
            Cancelar
          </Button>
        </div>
      </div>
    </div>
  );
};
