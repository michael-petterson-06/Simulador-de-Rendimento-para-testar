'use client';

import { useState } from 'react';
import { NumericFormat } from 'react-number-format';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { useSimuladorStore } from '@/store/useSimuladorStore';
import { ResultadoHome } from '@/components/ResultadoHome';

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

  const [avisoCopiado, setAvisoCopiado] = useState(false);

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
            <Button onClick={calcular} className="w-full md:w-auto text-lg px-6 py-2 bg-indigo-500 hover:bg-indigo-600 text-white">
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
            <ResultadoHome
              onCopiar={() => {
                setValorInicial(resultadoHome.valorFinal.toString());
                setAvisoCopiado(true);
                setTimeout(() => setAvisoCopiado(false), 3000);
              }}
              avisoCopiado={avisoCopiado}
            />
          )}
        </Card>
      </div>
    </main>
  );
}
