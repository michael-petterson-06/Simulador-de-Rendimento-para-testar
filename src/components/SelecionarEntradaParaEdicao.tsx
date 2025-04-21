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
    <div className="space-y-4 text-center text-yellow-400">
      <h2 className="text-lg font-semibold">Selecione uma entrada</h2>

      <ul className="flex flex-col gap-2 text-left">
        {nomes.map((nome, index) => (
          <li
            key={index}
            onClick={() => onSelecionarEntrada({ nome, index })}
            className="cursor-pointer px-4 py-2 rounded-xl border border-yellow-400 bg-yellow-300 text-black hover:border-yellow-500 hover:underline underline-offset-4 hover:bg-yellow-400 transition-all duration-300"
          >
            {nome}
          </li>
        ))}
      </ul>

      <Button
        onClick={onCancelar}
       
      >
        Cancelar
      </Button>
    </div>
  );
};
