'use client';

import { NumericFormat } from 'react-number-format';
import { Button } from './ui/Button';
import { ModalGastoProps } from '@/types';
import { Input } from './ui/Input';

export const ModalGasto = ({
  nomeGasto,
  valorGasto,
  setNomeGasto,
  setValorGasto,
  onAdicionar,
  onCancelar,
  isEditing = false,
}: ModalGastoProps) => {
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md space-y-4">
        <h2 className="text-xl font-bold text-center">
          {isEditing ? 'Editar Gasto' : 'Novo Gasto'}
        </h2>

        <Input
          type="text"
          placeholder="Nome do gasto"
          value={nomeGasto}
          onChange={(e) => setNomeGasto(e.target.value)}
          className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <NumericFormat
          value={valorGasto}
          thousandSeparator="."
          decimalSeparator=","
          prefix="R$ "
          decimalScale={2}
          fixedDecimalScale
          onValueChange={(values) => setValorGasto(values.value)}
          placeholder="Valor do gasto"
          className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <div className="flex justify-center gap-4 pt-2">
          <Button onClick={onAdicionar} className="bg-indigo-600 hover:bg-indigo-700 text-white">
            {isEditing ? 'Salvar' : 'Adicionar'}
          </Button>
          <Button onClick={onCancelar} className="bg-gray-300 text-gray-800 hover:bg-gray-400">
            Cancelar
          </Button>
        </div>
      </div>
    </div>
  );
};
