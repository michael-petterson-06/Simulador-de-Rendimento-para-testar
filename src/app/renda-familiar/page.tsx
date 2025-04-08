'use client';

import { NumericFormat } from 'react-number-format';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { useSimuladorStore } from '@/store/useSimuladorStore';
import { useState } from 'react';
import { ResultadoRenda } from '@/components/ResultadoRenda';
import { ListaGastos } from '@/components/ListaGastos';
import { ModalGasto } from '@/components/ModalGasto';

export default function RendaFamiliar() {
  const {
    salarioMichael,
    salarioFernanda,
    outrasMichael,
    outrasFernanda,
    gastos,
    setSalarioMichael,
    setSalarioFernanda,
    setOutrasMichael,
    setOutrasFernanda,
    setGastos,
    resultadoRenda,
    setResultadoRenda,
    setAporteMensal,
    addGasto,
  } = useSimuladorStore();

  const [avisoCopiado, setAvisoCopiado] = useState(false);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [nomeGasto, setNomeGasto] = useState('');
  const [valorGasto, setValorGasto] = useState('');

  const formatarReal = (valor: number | string) =>
    new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(Number(valor));

  const calcular = () => {
    const sm = Number(salarioMichael);
    const sf = Number(salarioFernanda);
    const om = Number(outrasMichael);
    const of = Number(outrasFernanda);
    const g = Number(gastos);

    if ([sm, sf, om, of, g].some((v) => isNaN(v))) {
      alert('Preencha todos os campos corretamente!');
      return;
    }

    const totalEntradas = sm + sf + om + of;
    const saldoFinal = totalEntradas - g;

    setResultadoRenda({ totalEntradas, saldoFinal });
  };

  const limpar = () => {
    setSalarioMichael('');
    setSalarioFernanda('');
    setOutrasMichael('');
    setOutrasFernanda('');
    setGastos('');
    setResultadoRenda(null);
  };

  const adicionarGasto = () => {
    const valor = Number(valorGasto);
    if (!nomeGasto.trim() || isNaN(valor)) {
      alert('Preencha corretamente o nome e valor do gasto.');
      return;
    }

    addGasto({ nome: nomeGasto, valor });
    setNomeGasto('');
    setValorGasto('');
    setMostrarModal(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-100 to-white p-4 flex items-center justify-center">
      <div className="w-full max-w-xl">
        <Card>
          <h1 className="text-3xl font-bold text-center mb-6">Renda Familiar</h1>

          <div className="grid gap-4 md:grid-cols-2">
            <NumericFormat
              value={salarioMichael}
              thousandSeparator="."
              decimalSeparator="," 
              prefix="R$ "
              decimalScale={2}
              fixedDecimalScale
              onValueChange={(values) => setSalarioMichael(values.value)}
              placeholder="Salário Michael"
              className="px-4 py-2 border border-gray-300 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <NumericFormat
              value={salarioFernanda}
              thousandSeparator="."
              decimalSeparator="," 
              prefix="R$ "
              decimalScale={2}
              fixedDecimalScale
              onValueChange={(values) => setSalarioFernanda(values.value)}
              placeholder="Salário Fernanda"
              className="px-4 py-2 border border-gray-300 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <NumericFormat
              value={outrasMichael}
              thousandSeparator="."
              decimalSeparator="," 
              prefix="R$ "
              decimalScale={2}
              fixedDecimalScale
              onValueChange={(values) => setOutrasMichael(values.value)}
              placeholder="Outras Entradas Michael"
              className="px-4 py-2 border border-gray-300 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <NumericFormat
              value={outrasFernanda}
              thousandSeparator="."
              decimalSeparator="," 
              prefix="R$ "
              decimalScale={2}
              fixedDecimalScale
              onValueChange={(values) => setOutrasFernanda(values.value)}
              placeholder="Outras Entradas Fernanda"
              className="px-4 py-2 border border-gray-300 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="mt-8">
            <ListaGastos />
          </div>

          <div className="md:col-span-2 text-left text-sm font-medium text-gray-700 mt-4">
            {/* <span className="block mt-2">Gastos Familiares:</span> */}
            <span className="inline-block text-lg text-rose-600 font-bold">
              {formatarReal(gastos)}
            </span>
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
            <Button
              onClick={() => setMostrarModal(true)}
              className="w-full md:w-auto text-lg px-6 py-2 bg-rose-500 text-white hover:bg-rose-600"
            >
              Adicionar Gasto
            </Button>
          </div>

          {mostrarModal && (
            <ModalGasto
              nomeGasto={nomeGasto}
              valorGasto={valorGasto}
              setNomeGasto={setNomeGasto}
              setValorGasto={setValorGasto}
              onAdicionar={adicionarGasto}
              onCancelar={() => setMostrarModal(false)}
            />
          )}

          {resultadoRenda && (
            <ResultadoRenda
              onCopiar={() => {
                setAporteMensal(resultadoRenda.saldoFinal.toString());
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
