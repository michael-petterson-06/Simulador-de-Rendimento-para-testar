'use client';

import { ModalRemoverHistoricoProps } from '@/types/modalRemoverHistoricoProps';
import { Button } from './ui/Button';

export const ModalRemoverHistorico = ({
  onConfirmar,
  onCancelar,
  titulo,
  paragrafo,
}: ModalRemoverHistoricoProps) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-black border border-yellow-500 p-6 rounded-xl shadow-xl max-w-sm w-full space-y-4 text-center animate-fade-in">
        <div className="flex justify-center text-4xl text-yellow-400">🗑️</div>
        <h2 className="text-lg font-semibold text-yellow-400">{titulo}</h2>
        <p className="text-yellow-300 text-sm">
          {`Tem certeza que deseja apagar este ${paragrafo}?`}
        </p>
        <div className="flex justify-center gap-4 pt-2">
          <Button
            onClick={onConfirmar}
            className="bg-yellow-400 hover:bg-white text-black hover:text-yellow-500 border border-yellow-400 transition-all duration-500"
          >
            Apagar
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
