'use client';

import { useEntradasStore } from '@/store/useEntradasStore';
import { Button } from './ui/Button';
import { SelecionarEntradaParaEdicaoProps } from '@/types/selecionarEntradaParaEdicaoProps';


export const SelecionarEntradaParaEdicao = ({
  onSelecionarEntrada,
  onCancelar,
}: SelecionarEntradaParaEdicaoProps) => {
  const { nomes } = useEntradasStore();

  return (
    <div className="space-y-4 text-center">
      <h2 className="text-lg font-semibold text-indigo-700">Selecione uma entrada</h2>
      <div className="flex flex-col gap-2">
        {nomes.map((nome, index) => (
          <Button
            key={index}
            className="bg-indigo-500 text-white hover:bg-indigo-600"
            onClick={() => onSelecionarEntrada({ nome, index })}
          >
            {nome}
          </Button>
        ))}
      </div>
      <Button onClick={onCancelar} className="mt-4 bg-gray-300 hover:bg-gray-400 text-gray-800">
        Cancelar
      </Button>
    </div>
  );
};
