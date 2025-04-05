'use client';

import { useState } from 'react';
import { NumericFormat } from 'react-number-format';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { useSimuladorStore } from '@/store/useSimuladorStore';

export default function Home() {
  const {
    valorInicial,
    aporteMensal,
    anos,
    juros,
    tempoPoupancaTipo,
    setValorInicial,
    setAporteMensal,
    setAnos,
    setJuros,
    setTempoPoupancaTipo,
    resultadoHome,
    setResultadoHome,
  } = useSimuladorStore();

  const [desconto, setDesconto] = useState('');
  const [avisoCopiado, setAvisoCopiado] = useState(false);

  const formatarReal = (valor: number | string) =>
    new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(Number(valor));

  const calcular = () => {
    const vi = Number(valorInicial);
    const am = Number(aporteMensal);
    const j = Number(juros);
    const t = Number(anos);

    if (isNaN(vi) || isNaN(am) || isNaN(j) || isNaN(t)) {
      alert('Preencha todos os campos corretamente!');
      return;
    }

    const meses = tempoPoupancaTipo === 'anos' ? t * 12 : t;
    const jurosMensal = j / 100;

    let montante = vi;
    let totalDepositado = vi;

    for (let i = 0; i < meses; i++) {
      montante *= 1 + jurosMensal;
      montante += am;
      totalDepositado += am;
    }

    const valorFinal = montante;
    const totalJuros = valorFinal - totalDepositado;

    setResultadoHome({ totalDepositado, totalJuros, valorFinal });
  };

  const limpar = () => {
    setValorInicial('');
    setAporteMensal('');
    setJuros('');
    setAnos('');
    setResultadoHome(null);
    setDesconto('');
  };

  const subtrairDoValorTotal = () => {
    if (!resultadoHome) return;
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
    <main className="min-h-screen bg-gradient-to-br from-indigo-100 to-white p-4 flex items-center justify-center">
      <div className="w-full max-w-xl">
        <Card>
          <h1 className="text-3xl font-bold text-center mb-6">Simulador de Rendimento Mike</h1>

          <div className="grid gap-4 md:grid-cols-2">
            <NumericFormat
              value={valorInicial}
              thousandSeparator="."
              decimalSeparator=","
              prefix="R$ "
              decimalScale={2}
              fixedDecimalScale
              onValueChange={(values) => setValorInicial(values.value)}
              placeholder="Valor Inicial (R$)"
              className="px-4 py-2 border border-gray-300 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <NumericFormat
              value={aporteMensal}
              thousandSeparator="."
              decimalSeparator=","
              prefix="R$ "
              decimalScale={2}
              fixedDecimalScale
              onValueChange={(values) => setAporteMensal(values.value)}
              placeholder="Aporte Mensal (R$)"
              className="px-4 py-2 border border-gray-300 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <div className="flex gap-2 items-center md:col-span-2">
              <select
                value={tempoPoupancaTipo}
                onChange={(e) => setTempoPoupancaTipo(e.target.value as 'anos' | 'meses')}
                className="border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="anos">Anos</option>
                <option value="meses">Meses</option>
              </select>

              <Input
                type="number"
                placeholder={tempoPoupancaTipo === 'anos' ? 'Anos Poupando' : 'Meses Poupando'}
                value={anos}
                onChange={(e) => setAnos(e.target.value)}
                className="w-full"
              />
            </div>

            <Input
              type="number"
              placeholder="Rendimento Mensal (%)"
              value={juros}
              onChange={(e) => setJuros(e.target.value)}
              className="w-full md:col-span-2"
            />
          </div>

          <div className="mt-6 flex flex-col md:flex-row items-center justify-center gap-4">
            <Button onClick={calcular} className="w-full md:w-auto text-lg px-6 py-2">
              Calcular
            </Button>
            <Button
              onClick={limpar}
              className="w-full md:w-auto text-lg px-6 py-2 bg-gray-300 text-gray-800 hover:bg-gray-400"
            >
              Limpar
            </Button>
          </div>

          {resultadoHome && (
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

              <div className="mt-4">
                <Button
                  onClick={() => {
                    setValorInicial(resultadoHome.valorFinal.toString());
                    setAvisoCopiado(true);
                    setTimeout(() => setAvisoCopiado(false), 3000);
                  }}
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
          )}
        </Card>
      </div>
    </main>
  );
}
