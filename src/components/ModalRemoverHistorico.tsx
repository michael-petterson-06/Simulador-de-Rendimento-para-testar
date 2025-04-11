'use client';

import { ModalRemoverHistoricoProps } from '@/types/modalRemoverHistoricoProps';
import { Button } from './ui/Button';

export const ModalRemoverHistorico = ({ onConfirmar, onCancelar }: ModalRemoverHistoricoProps) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-xl max-w-sm w-full space-y-4 text-center animate-fade-in">
        <div className="flex justify-center text-4xl text-red-600">🗑️</div>
        <h2 className="text-lg font-semibold text-rose-600">Remover Histórico</h2>
        <p className="text-gray-700 text-sm">
          Tem certeza que deseja apagar este histórico?
        </p>
        <div className="flex justify-center gap-4 pt-2">
          <Button
            onClick={onConfirmar}
            className="bg-red-500 hover:bg-red-600 text-white"
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
