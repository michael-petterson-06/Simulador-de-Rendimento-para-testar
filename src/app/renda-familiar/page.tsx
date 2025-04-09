'use client';

import { useState } from 'react';
import { NumericFormat } from 'react-number-format';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { useSimuladorStore } from '@/store/useSimuladorStore';
import { useEntradasStore } from '@/store/useEntradasStore';
import { ResultadoRenda } from '@/components/ResultadoRenda';
import { ListaGastos } from '@/components/ListaGastos';
import { ModalGasto } from '@/components/ModalGasto';
import { ModalGastoPercentual } from '@/components/ModalGastoPercentual';
import { formatarReal } from '@/utils/formatarReal';

export default function RendaFamiliar() {
  const {
    gastos,
    setGastos,
    resultadoRenda,
    setResultadoRenda,
    setAporteMensal,
    addGasto,
    resetGastos,
  } = useSimuladorStore();

  const {
    nomes: nomesEntradas,
    valores: valoresEntradas,
    setValores: setValoresEntradas
  } = useEntradasStore();

  const [avisoCopiado, setAvisoCopiado] = useState(false);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [nomeGasto, setNomeGasto] = useState('');
  const [valorGasto, setValorGasto] = useState('');

  const [mostrarModalPercentual, setMostrarModalPercentual] = useState(false);
  const [nomePercentual, setNomePercentual] = useState('');
  const [percentual, setPercentual] = useState('');

  const handleValorEntrada = (index: number, valor: string) => {
    const novosValores = [...valoresEntradas];
    novosValores[index] = valor;
    setValoresEntradas(novosValores);
  };

  const calcular = () => {
    const entradasNumericas = valoresEntradas.map((v) => Number(v));
    const g = Number(gastos);

    if (entradasNumericas.some(isNaN) || isNaN(g)) {
      alert('Preencha todos os campos corretamente!');
      return;
    }

    const totalEntradas = entradasNumericas.reduce((acc, v) => acc + v, 0);
    const saldoFinal = totalEntradas - g;

    setResultadoRenda({ totalEntradas, saldoFinal });
  };

  const limpar = () => {
    setValoresEntradas(new Array(nomesEntradas.length).fill(''));
    setGastos('');
    setResultadoRenda(null);
    resetGastos();
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

  const adicionarGastoPercentual = () => {
    const valor = parseFloat(percentual);
    const entradasNumericas = valoresEntradas.map(Number);
    const totalEntradas = entradasNumericas.reduce((acc, val) => acc + val, 0);
    const valorCalculado = (valor / 100) * totalEntradas;

    if (!nomePercentual.trim() || isNaN(valorCalculado)) {
      alert('Preencha corretamente o nome e percentual.');
      return;
    }

    addGasto({ nome: nomePercentual, valor: valorCalculado });
    setNomePercentual('');
    setPercentual('');
    setMostrarModalPercentual(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-100 to-white p-4 flex items-center justify-center">
      <div className="w-full max-w-xl">
        <Card>
          <h1 className="text-3xl font-bold text-center mb-6">Renda Familiar</h1>

          <div className="grid gap-4 md:grid-cols-2">
            {nomesEntradas.map((nome, index) => (
              <NumericFormat
                key={index}
                value={valoresEntradas[index]}
                thousandSeparator="."
                decimalSeparator="," 
                prefix="R$ "
                decimalScale={2}
                fixedDecimalScale
                onValueChange={(values) => handleValorEntrada(index, values.value)}
                placeholder={nome}
                className="px-4 py-2 border border-gray-300 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            ))}
          </div>

          <div className="mt-8">
            <ListaGastos />
          </div>

          <div className="md:col-span-2 text-left text-sm font-medium text-gray-700 mt-4">
            <span className="inline-block text-lg text-rose-600 font-bold">
              {formatarReal(gastos)}
            </span>
          </div>

          <div className="mt-6 flex flex-col md:flex-row items-center justify-center gap-4">
            <Button
              onClick={calcular}
              className="w-full md:w-auto text-base px-4 py-2"
            >
              Calcular
            </Button>
            <Button
              onClick={limpar}
              className="w-full md:w-auto text-base px-4 py-2 bg-gray-300 text-gray-800 hover:bg-gray-400"
            >
              Limpar
            </Button>
            <Button
              onClick={() => setMostrarModal(true)}
              className="w-full md:w-auto text-base px-4 py-2 bg-rose-500 text-white hover:bg-rose-600"
            >
              Gasto 💸
            </Button>
            <Button
              onClick={() => setMostrarModalPercentual(true)}
              className="w-full md:w-auto text-base px-4 py-2 bg-indigo-500 text-white hover:bg-indigo-600"
            >
            Gasto %
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

          {mostrarModalPercentual && (
            <ModalGastoPercentual
              nome={nomePercentual}
              percentual={percentual}
              setNome={setNomePercentual}
              setPercentual={setPercentual}
              onAdicionar={adicionarGastoPercentual}
              onCancelar={() => setMostrarModalPercentual(false)}
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
