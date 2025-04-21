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
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-black text-yellow-400 border border-yellow-600 rounded-xl shadow-xl p-6 w-full max-w-md space-y-4">
        <h2 className="text-xl font-bold text-center border-b border-yellow-700 pb-2">
          {isEditing ? 'Editar Gasto' : 'Novo Gasto'}
        </h2>

        <Input
          type="text"
          placeholder="Nome do gasto"
          value={nomeGasto}
          onChange={(e) => setNomeGasto(e.target.value)}
          className="bg-black text-yellow-400 border-yellow-500 placeholder-yellow-300 focus:ring-yellow-500"
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
          className="bg-black text-yellow-400 border border-yellow-500 rounded-xl px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-yellow-500 placeholder-yellow-300"
        />

        <div className="flex justify-center gap-4 pt-2">
          <Button
            onClick={onAdicionar}
          
          >
            {isEditing ? 'Salvar' : 'Adicionar'}
          </Button>

          <Button
            onClick={onCancelar}
          
          >
            Cancelar
          </Button>
        </div>
      </div>
    </div>
  );
};
