'use client';

import { useSimuladorStore } from '@/store/useSimuladorStore';

type Props = {
  onCopiar?: () => void;
  avisoCopiado?: boolean;
};

export const ResultadoRenda = ({ onCopiar, avisoCopiado }: Props) => {
  const { resultadoRenda } = useSimuladorStore();

  const formatarReal = (valor: number | string) =>
    new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(Number(valor));

  if (!resultadoRenda) return null;

  return (
    <div className="mt-8 space-y-4 text-center">
      <div className="bg-blue-100 p-4 rounded-xl">
        <p className="text-lg font-medium">
          📥 Total de Entradas: <strong>{formatarReal(resultadoRenda.totalEntradas)}</strong>
        </p>
      </div>
      <div className="bg-green-100 p-4 rounded-xl">
        <p className="text-lg font-medium">
          🧾 Saldo Final: <strong>{formatarReal(resultadoRenda.saldoFinal)}</strong>
        </p>
      </div>

      {onCopiar && (
        <div className="mt-4">
          <button
            onClick={onCopiar}
            className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-xl"
          >
            Usar Saldo Final como Aporte Mensal
          </button>
          {avisoCopiado && (
            <p className="mt-2 text-sm text-green-600 font-medium animate-fade-in-out">
              ✅ Valor copiado para Aporte Mensal!
            </p>
          )}
        </div>
      )}
    </div>
  );
};
