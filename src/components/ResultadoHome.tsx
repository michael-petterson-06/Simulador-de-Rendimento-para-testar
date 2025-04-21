'use client';

import { useState } from 'react';
import { useSimuladorStore } from '@/store/useSimuladorStore';
import { Button } from '@/components/ui/Button';
import { formatarReal } from '@/utils/formatarReal';
import { ResultadoProps } from '@/types/props';
import { RetiradaPanel } from '@/components/RetiradaPanel';

export const ResultadoHome = ({ onCopiar, avisoCopiado }: ResultadoProps) => {
  const { resultadoHome, setResultadoHome } = useSimuladorStore();
  const [mostrarRetirada, setMostrarRetirada] = useState(false);
  const [mostrarDeposito, setMostrarDeposito] = useState(false);
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

  const handleSalvarDeposito = (nome: string, valor: number) => {
    const novoFinal = resultadoHome.valorFinal + valor;
    setResultadoHome({ ...resultadoHome, valorFinal: novoFinal });
    setMostrarDeposito(false);
    setMensagemSucesso(`✅ Depósito "${nome}" realizado com sucesso!`);
    setTimeout(() => setMensagemSucesso(''), 3000);
  };

  return (
    <div className="mt-8 space-y-4 text-center text-yellow-400">
      <div className="bg-black border border-yellow-500 p-4 rounded-xl">
        <p className="text-lg font-medium">
          💰 Valor Depositado: <strong>{formatarReal(resultadoHome.totalDepositado)}</strong>
        </p>
      </div>

      <div className="bg-black border border-yellow-500 p-4 rounded-xl">
        <p className="text-lg font-medium">
          📈 Valor dos Juros: <strong>{formatarReal(resultadoHome.totalJuros)}</strong>
        </p>
      </div>

      <div className="bg-black border border-yellow-500 p-4 rounded-xl">
        <p className="text-lg font-medium">
          🏆 Valor Total: <strong>{formatarReal(resultadoHome.valorFinal)}</strong>
        </p>
      </div>

      {onCopiar && (
        <div className="mt-4">
          <Button
            onClick={onCopiar}
           
          >
            Usar Valor Total como Novo Valor Inicial
          </Button>
          {avisoCopiado && (
            <p className="mt-2 text-sm text-green-400 font-medium animate-fade-in-out">
              ✅ Valor copiado para Valor Inicial!
            </p>
          )}
        </div>
      )}

      {mensagemSucesso && (
        <p className="text-green-400 font-medium text-sm animate-fade-in-out">
          {mensagemSucesso}
        </p>
      )}

      <div className="mt-10 flex flex-col md:flex-row justify-center items-center gap-4">
        {!mostrarRetirada && !mostrarDeposito && (
          <>
            <Button
              onClick={() => setMostrarRetirada(true)}
            
            >
              Retirada
            </Button>
            <Button
              onClick={() => setMostrarDeposito(true)}
            
            >
              Depósito
            </Button>
          </>
        )}

        {mostrarRetirada && (
          <RetiradaPanel
            onCancel={() => setMostrarRetirada(false)}
            onSalvar={handleSalvarRetirada}
            tipoPagamento="À Vista"
            titulo="Nova Retirada"
            placeholderNome="Nome da Retirada"
            placeholderValor="Valor da Retirada"
            labelBotaoSalvar="Salvar Retirada"
          />
        )}

        {mostrarDeposito && (
          <RetiradaPanel
            onCancel={() => setMostrarDeposito(false)}
            onSalvar={handleSalvarDeposito}
            tipoPagamento="À Vista"
            titulo="Novo Depósito"
            placeholderNome="Nome do Depósito"
            placeholderValor="Valor do Depósito"
            labelBotaoSalvar="Depositar"
          />
        )}
      </div>
    </div>
  );
};
