'use client';

import { useState } from 'react';
import { useRetiradaStore } from '@/store/useRetiradaStore';
import { Input } from './ui/Input';
import { Button } from './ui/Button';
import { NumericFormat } from 'react-number-format';
import { RetiradaPanelProps } from '@/types';

export const RetiradaPanel = ({
  onCancel,
  onSalvar,
  tipoPagamento,
  titulo = 'Nova Retirada',
  placeholderNome = 'Nome da Retirada',
  placeholderValor = 'Valor da Retirada',
  labelBotaoSalvar = 'Salvar',
}: RetiradaPanelProps) => {
  const { addRetirada } = useRetiradaStore();
  const [nome, setNome] = useState('');
  const [valor, setValor] = useState('');

  const handleSalvar = () => {
    if (!nome.trim() || isNaN(Number(valor))) {
      alert('Preencha o nome e o valor corretamente.');
      return;
    }

    if (tipoPagamento === 'À Vista') {
      addRetirada({
        nome,
        valor: Number(valor),
        pagamento: 'À Vista',
        titulo,
      });
    }

    onSalvar(nome, Number(valor));
  };

  return (
    <div
      className={`mt-8 p-4 border rounded-xl shadow-md space-y-4 animate-fade-in
        bg-black border-yellow-500 text-yellow-400`}
    >
      <h2 className="text-lg font-bold text-center">{titulo}</h2>

      <Input
        type="text"
        placeholder={placeholderNome}
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        className="bg-black border-yellow-500 text-yellow-400 placeholder-yellow-300"
      />

      <NumericFormat
        value={valor}
        thousandSeparator="."
        decimalSeparator=","
        prefix="R$ "
        decimalScale={2}
        fixedDecimalScale
        onValueChange={(values) => setValor(values.value)}
        placeholder={placeholderValor}
        className="px-4 py-2 border border-yellow-500 rounded-xl w-full bg-black text-yellow-400 placeholder-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
      />

      <div className="flex justify-center gap-4 pt-2">
        <Button
          onClick={handleSalvar}
          className="bg-yellow-400 text-black border border-yellow-500 hover:bg-black hover:text-yellow-400 transition-all duration-500"
        >
          {labelBotaoSalvar}
        </Button>
        <Button
          onClick={onCancel}
          className="bg-gray-300 text-gray-800 hover:bg-gray-400"
        >
          Cancelar
        </Button>
      </div>
    </div>
  );
};
