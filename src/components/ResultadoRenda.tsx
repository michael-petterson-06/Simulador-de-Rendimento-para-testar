'use client';

import { useState } from 'react';
import { useSimuladorStore } from '@/store/useSimuladorStore';
import { useUserStore } from '@/store/useUserStore';
import { useEntradasStore } from '@/store/useEntradasStore';
import { useHistoricoStore } from '@/store/useHistoricoStore';
import { Button } from './ui/Button';
import { formatarReal } from '@/utils/formatarReal';
import { ResultadoProps } from '@/types/props';

export const ResultadoRenda = ({ onCopiar, avisoCopiado }: ResultadoProps) => {
  const { resultadoRenda, gastos, listaGastos, ano, mesInicial, mesFinal } = useSimuladorStore();
  const { nome, idade } = useUserStore();
  const { nomes, valores } = useEntradasStore();
  const { adicionarHistorico } = useHistoricoStore();

  const [avisoSalvo, setAvisoSalvo] = useState(false);

  if (!resultadoRenda) return null;

  const handleSalvar = () => {
    const dados = {
      usuario: {
        nome,
        idade,
      },
      ano,
      mesInicial,
      mesFinal,
      entradas: nomes.map((nome, index) => ({
        nome,
        valor: valores[index],
      })),
      gastos: listaGastos,
      totalEntradas: resultadoRenda.totalEntradas,
      totalGastos: Number(gastos),
      saldoFinal: resultadoRenda.saldoFinal,
    };

    adicionarHistorico(dados);
    setAvisoSalvo(true);

    setTimeout(() => setAvisoSalvo(false), 3000);
  };

  return (
    <div className="mt-8 space-y-4 text-center">
      <div className="bg-blue-100 p-4 rounded-xl">
        <p className="text-lg font-medium">
          📅 Total de Entradas: <strong>{formatarReal(resultadoRenda.totalEntradas)}</strong>
        </p>
      </div>
      <div className="bg-green-100 p-4 rounded-xl">
        <p className="text-lg font-medium">
          💾 Saldo Final: <strong>{formatarReal(resultadoRenda.saldoFinal)}</strong>
        </p>
      </div>

      <div className="mt-4 flex flex-col md:flex-row justify-center gap-4">
        {onCopiar && (
          <Button
            onClick={onCopiar}
            className="bg-indigo-500 hover:bg-indigo-600 text-white"
          >
            Usar Saldo Final como Aporte Mensal
          </Button>
        )}
        <Button
          onClick={handleSalvar}
          className="bg-green-600 hover:bg-green-700 text-white"
        >
          Salvar
        </Button>
      </div>

      {avisoCopiado && (
        <p className="mt-2 text-sm text-green-600 font-medium animate-fade-in-out">
          ✅ Valor copiado para Aporte Mensal!
        </p>
      )}

      {avisoSalvo && (
        <p className="mt-2 text-sm text-green-600 font-medium animate-fade-in-out">
          💾 Dados salvos com sucesso no histórico!
        </p>
      )}
    </div>
  );
};
