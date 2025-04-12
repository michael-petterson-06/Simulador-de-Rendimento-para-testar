'use client';

import { useState } from 'react';
import { Button } from './ui/Button';
import { FormularioEntradas } from './FormularioEntradas';
import { ModalAcoesEntradasProps } from '@/types';

export const ModalAcoesEntradas = ({ onFechar, onExcluir }: ModalAcoesEntradasProps) => {

  const [mostrarFormularioEntradas, setMostrarFormularioEntradas] = useState(false);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
     <div className="bg-white p-6 rounded-xl shadow-xl max-w-sm w-full space-y-4 text-center animate-fade-in">
        {mostrarFormularioEntradas ? (
          <FormularioEntradas   onFechar={onFechar} fecharFormulario={setMostrarFormularioEntradas}  />
        ) : (
          <>
            <h2 className="text-lg font-semibold text-indigo-700">O que deseja fazer?</h2>
            <div className="flex flex-col gap-4">
              <Button
                onClick={() => setMostrarFormularioEntradas(true)}
                className="bg-green-500 hover:bg-green-600 text-white flex items-center justify-center gap-2"
              >
                <span>➕</span>
                <span>Modificar Entradas</span>
              </Button>

              <Button
                onClick={() => {
                  onFechar();
                  onExcluir();
                }}
                className="bg-rose-500 hover:bg-rose-600 text-white flex items-center justify-center gap-2"
              >
                <span>➖</span>
                <span>Excluir entradas</span>
              </Button>

              <Button
                onClick={onFechar}
                className="bg-gray-300 text-gray-800 hover:bg-gray-400"
              >
                Cancelar
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
