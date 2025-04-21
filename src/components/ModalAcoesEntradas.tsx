'use client';

import { useState } from 'react';
import { Button } from './ui/Button';
import { FormularioEntradas } from './FormularioEntradas';
import { ModalAcoesEntradasProps } from '@/types';
import { SelecionarEntradaParaEdicao } from './SelecionarEntradaParaEdicao';
import { EditarEntrada } from './EditarEntrada';

export const ModalAcoesEntradas = ({ onFechar, onExcluir }: ModalAcoesEntradasProps) => {
  const [mostrarFormularioEntradas, setMostrarFormularioEntradas] = useState(false);
  const [modoEdicao, setModoEdicao] = useState(false);
  const [entradaSelecionada, setEntradaSelecionada] = useState<{ nome: string; index: number } | null>(null);

  const resetar = () => {
    setModoEdicao(false);
    setEntradaSelecionada(null);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-xl max-w-sm w-full space-y-4 text-center animate-fade-in">
        {mostrarFormularioEntradas ? (
          <FormularioEntradas
            onFechar={onFechar}
            fecharFormulario={setMostrarFormularioEntradas}
          />
        ) : entradaSelecionada ? (
          <EditarEntrada
            entrada={entradaSelecionada}
            onCancelar={() => {
              resetar();
              onFechar();
            }}
          />
        ) : modoEdicao ? (
          <SelecionarEntradaParaEdicao
            onSelecionarEntrada={(entrada) => setEntradaSelecionada(entrada)}
            onCancelar={() => setModoEdicao(false)}
          />
        ) : (
          <>
            <h2 className="text-lg font-semibold text-indigo-700">O que deseja fazer?</h2>
            <div className="flex flex-col gap-4">
              <Button
                onClick={() => setMostrarFormularioEntradas(true)}
                className="bg-green-500 hover:bg-green-600 text-white flex items-center justify-center gap-2"
              >
                <span>➕</span>
                <span>Inserir Entradas</span>
              </Button>

              <Button
                onClick={() => setModoEdicao(true)}
                className="bg-yellow-400 hover:bg-yellow-500 text-white flex items-center justify-center gap-2"
              >
                <span>✏️</span>
                <span>Editar Entrada</span>
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
