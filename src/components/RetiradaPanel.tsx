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
  modo = 'Retirada',
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

   
    if (modo === 'Retirada' && tipoPagamento === 'À Vista') {
      addRetirada({ nome, valor: Number(valor), pagamento: (tipoPagamento as 'À Vista' | 'Parcelado') ?? 'À Vista'
      });
    }

 
    onSalvar(nome, Number(valor));
  };


  return (
    <div
        className={`mt-8 p-4 border rounded-xl shadow-md space-y-4 animate-fade-in ${
          titulo === 'Novo Depósito'
            ? 'bg-green-50 border-green-200'
            : 'bg-rose-50 border-rose-200'
        }`}
    >

      <h2 className="text-lg font-bold text-center text-rose-600">{titulo}</h2>

      <Input
        type="text"
        placeholder={placeholderNome}
        value={nome}
        onChange={(e) => setNome(e.target.value)}
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
        className="px-4 py-2 border border-gray-300 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-rose-500"
      />

      <div className="flex justify-center gap-4 pt-2">
        <Button onClick={handleSalvar} className="bg-rose-500 hover:bg-rose-600">
          {labelBotaoSalvar}
        </Button>
        <Button onClick={onCancel} className="bg-gray-300 text-gray-800 hover:bg-gray-400">
          Cancelar
        </Button>
      </div>
    </div>
  );
};
