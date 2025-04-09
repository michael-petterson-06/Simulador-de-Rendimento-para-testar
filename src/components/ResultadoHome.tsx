'use client';

import { useSimuladorStore } from '@/store/useSimuladorStore';
import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { formatarReal } from '@/utils/formatarReal';
import { ResultadoProps } from '@/types/props';
import { RetiradaPanel } from '@/components/RetiradaPanel';

export const ResultadoHome = ({ onCopiar, avisoCopiado }: ResultadoProps) => {
  const { resultadoHome, setResultadoHome } = useSimuladorStore();
  const [mostrarRetirada, setMostrarRetirada] = useState(false);
  const [mensagemSucesso, setMensagemSucesso] = useState('');

  if (!resultadoHome) return null;

  const handleSalvarRetirada = (nome: string, valor: number) => {
    if (valor > resultadoHome.valorFinal) {
      const confirmar = window.confirm(
        '⚠️ A retirada excede o valor total. Sua conta ficará negativa. Deseja continuar?'
      );
      if (!confirmar) return;
    }

    const novoFinal = resultadoHome.valorFinal - valor;
    setResultadoHome({ ...resultadoHome, valorFinal: novoFinal });
    setMostrarRetirada(false);
    setMensagemSucesso(`✅ Retirada "${nome}" realizada com sucesso!`);
    setTimeout(() => setMensagemSucesso(''), 3000);
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

      {mensagemSucesso && (
        <p className="text-green-600 font-medium text-sm animate-fade-in-out">
          {mensagemSucesso}
        </p>
      )}

      <div className="mt-10 flex flex-col items-center gap-4">
        {!mostrarRetirada ? (
          <Button
            onClick={() => setMostrarRetirada(true)}
            className="bg-rose-500 hover:bg-rose-600 text-white"
          >
            Retirada
          </Button>
        ) : (
          <RetiradaPanel
            onCancel={() => setMostrarRetirada(false)}
            onSalvar={handleSalvarRetirada}
            tipoPagamento='A Vista'
          />
        )}
      </div>
    </div>
  );
};
