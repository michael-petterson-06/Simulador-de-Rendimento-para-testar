'use client';

import { useSimuladorStore } from '@/store/useSimuladorStore';
import { useState } from 'react';
import { NumericFormat } from 'react-number-format';
import { Button } from '@/components/ui/Button';
import { formatarReal } from '@/utils/formatarReal';
import { ResultadoProps } from '@/types/props';




export const ResultadoHome = ({ onCopiar, avisoCopiado }: ResultadoProps) => {
  const { resultadoHome, setResultadoHome } = useSimuladorStore();
  const [desconto, setDesconto] = useState('');



  if (!resultadoHome) return null;

  const subtrairDoValorTotal = () => {
    const d = Number(desconto);
    if (isNaN(d)) {
      alert('Digite um valor válido para subtrair');
      return;
    }

    const novoFinal = resultadoHome.valorFinal - d;
    setResultadoHome({ ...resultadoHome, valorFinal: novoFinal });
    setDesconto('');
  };

  return (
    <div className="mt-8 space-y-4 text-center">
      <div className="bg-green-100 p-4 rounded-xl">
        <p className="text-lg font-medium">
          💰 Valor Depositado: <strong>{formatarReal(resultadoHome.totalDepositado)}</strong>
        </p>
      </div>
      <div className="bg-blue-100 p-4 rounded-xl">
        <p className="text-lg font-medium">
          📈 Valor dos Juros: <strong>{formatarReal(resultadoHome.totalJuros)}</strong>
        </p>
      </div>
      <div className="bg-yellow-100 p-4 rounded-xl">
        <p className="text-lg font-medium">
          🏆 Valor Total: <strong>{formatarReal(resultadoHome.valorFinal)}</strong>
        </p>
      </div>

      {onCopiar && (
        <div className="mt-4">
          <Button
            onClick={onCopiar}
            className="bg-indigo-500 hover:bg-indigo-600 text-white"
          >
            Usar Valor Total como Novo Valor Inicial
          </Button>
          {avisoCopiado && (
            <p className="mt-2 text-sm text-green-600 font-medium animate-fade-in-out">
              ✅ Valor copiado para Valor Inicial!
            </p>
          )}
        </div>
      )}

      <div className="mt-10 flex flex-col items-center gap-4">
        <NumericFormat
          value={desconto}
          thousandSeparator="."
          decimalSeparator=","
          prefix="R$ "
          decimalScale={2}
          fixedDecimalScale
          onValueChange={(values) => setDesconto(values.value)}
          placeholder="Subtrair valor"
          className="w-1/2 px-3 py-1.5 border-2 border-rose-400 focus:border-rose-600 focus:ring-2 focus:ring-rose-300 rounded-xl shadow-inner transition duration-300 outline-none text-center"
        />

        <Button
          onClick={subtrairDoValorTotal}
          className="bg-rose-500 hover:bg-rose-600 text-white"
        >
          Subtrair do Valor Total
        </Button>
      </div>
    </div>
  );
};
