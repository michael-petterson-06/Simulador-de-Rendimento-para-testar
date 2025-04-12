'use client';

import { Button } from './ui/Button';

interface ModalExcluirEntradasProps {
  onCancelar: () => void;
}

export const ModalExcluirEntradas = ({ onCancelar }: ModalExcluirEntradasProps) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-xl max-w-sm w-full space-y-4 text-center animate-fade-in">
        <h2 className="text-lg font-semibold text-rose-600">Excluir Entradas</h2>
        <p className="text-sm text-gray-700">Funcionalidade em construção.</p>
        <Button onClick={onCancelar} className="bg-gray-300 text-gray-800 hover:bg-gray-400">
          Fechar
        </Button>
      </div>
    </div>
  );
};
