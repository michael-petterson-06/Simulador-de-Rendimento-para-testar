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
      <div className="bg-black border border-yellow-500 p-6 rounded-xl shadow-xl max-w-sm w-full space-y-4 text-center animate-fade-in text-yellow-400">
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
            <h2 className="text-lg font-semibold text-yellow-400">O que deseja fazer?</h2>
            <div className="flex flex-col gap-4">
              <Button
                onClick={() => setMostrarFormularioEntradas(true)}
              
              >
                ➕ Inserir Entradas
              </Button>

              <Button
                onClick={() => setModoEdicao(true)}
              
              >
                ✏️ Editar Entrada
              </Button>

              <Button
                onClick={() => {
                  onFechar();
                  onExcluir();
                }}
              
              >
                ➖ Excluir Entradas
              </Button>

              <Button
                onClick={onFechar}
              
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
