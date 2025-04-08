'use client';

import { useSimuladorStore } from '@/store/useSimuladorStore';
import { formatarReal } from '@/utils/formatarReal';

export const ListaGastos = () => {
  const { listaGastos } = useSimuladorStore();

  if (!listaGastos || listaGastos.length === 0) return null;

  return (
    <div className="mb-4 space-y-2">
      <h2 className="text-md font-semibold text-gray-700">Gastos Cadastrados:</h2>
      <ul className="divide-y divide-gray-200">
        {listaGastos.map((gasto, i) => (
          <li key={i} className="flex justify-between text-sm py-1">
            <span className="text-gray-800">{gasto.nome}</span>
            <span className="text-rose-600 font-medium">{formatarReal(gasto.valor)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
