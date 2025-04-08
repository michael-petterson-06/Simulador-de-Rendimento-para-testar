'use client';

import { useSimuladorStore } from '@/store/useSimuladorStore';
import { formatarReal } from '@/utils/formatarReal';
import { Pencil, Trash2 } from 'lucide-react';
import { Button } from './ui/Button';

export const ListaGastos = () => {
  const { listaGastos, removerGasto } = useSimuladorStore();

  if (!listaGastos || listaGastos.length === 0) return null;

  return (
    <div className="mt-8 mb-4 space-y-2">
      <h2 className="text-md font-semibold text-gray-700">Gastos:</h2>
      <ul className="divide-y divide-gray-200">
        {listaGastos.map((gasto, i) => (
          <li key={i} className="flex justify-between items-center text-sm py-2">
            <div className="flex flex-col">
              <span className="text-gray-800">{gasto.nome}</span>
              <span className="text-rose-600 font-medium">{formatarReal(gasto.valor)}</span>
            </div>

            <div className="flex items-center gap-2">
              <Button
                title="Editar gasto"
                className="text-blue-500 hover:text-blue-700 transition"
                onClick={() => alert(`Editar gasto: ${gasto.nome}`)}
              >
                <Pencil size={16} />
              </Button>

              <Button
                title="Remover gasto"
                className="text-rose-500 hover:text-rose-700 transition"
                onClick={() => removerGasto(i)}
              >
                <Trash2 size={16} />
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
