'use client';

import { Input } from './ui/Input';
import { Button } from './ui/Button';
import { ModalGastoPercentualProps } from '@/types/modalGastoPercentual';

export const ModalGastoPercentual = ({
  nome,
  percentual,
  setNome,
  setPercentual,
  onAdicionar,
  onCancelar,
}: ModalGastoPercentualProps) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm space-y-4 animate-fade-in">
        <h2 className="text-xl font-semibold text-center text-indigo-600">Adicionar Gasto Percentual</h2>

        <Input
          type="text"
          placeholder="Nome do Gasto"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />

        <Input
          type="number"
          placeholder="Valor em % (ex: 10)"
          value={percentual}
          onChange={(e) => setPercentual(e.target.value)}
        />

        <div className="flex justify-center gap-4 pt-2">
          <Button onClick={onAdicionar} className="bg-indigo-500 hover:bg-indigo-600 text-white">
            Adicionar
          </Button>
          <Button onClick={onCancelar} className="bg-gray-300 text-gray-800 hover:bg-gray-400">
            Cancelar
          </Button>
        </div>
      </div>
    </div>
  );
};
