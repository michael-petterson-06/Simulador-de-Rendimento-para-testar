'use client';

import { useState } from 'react';
import { useRetiradaStore } from '@/store/useRetiradaStore';
import { Input } from './ui/Input';
import { Button } from './ui/Button';
import { NumericFormat } from 'react-number-format';

interface RetiradaPanelProps {
  onCancel: () => void;
  onSalvar: (nome: string, valor: number) => void;
}

export const RetiradaPanel = ({ onCancel, onSalvar }: RetiradaPanelProps) => {
  const { addRetirada } = useRetiradaStore();
  const [nome, setNome] = useState('');
  const [valor, setValor] = useState('');

  const handleSalvar = () => {
    if (!nome.trim() || isNaN(Number(valor))) {
      alert('Preencha o nome e o valor corretamente.');
      return;
    }

    addRetirada({ nome, valor: Number(valor) });
    onSalvar(nome, Number(valor));
  };

  return (
    <div className="mt-8 p-4 bg-rose-50 border border-rose-200 rounded-xl shadow-md space-y-4 animate-fade-in">
      <h2 className="text-lg font-bold text-center text-rose-600">Nova Retirada</h2>

      <Input
        type="text"
        placeholder="Nome da Retirada"
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
        placeholder="Valor da Retirada"
        className="px-4 py-2 border border-gray-300 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-rose-500"
      />

      <div className="flex justify-center gap-4 pt-2">
        <Button onClick={handleSalvar} className="bg-rose-500 hover:bg-rose-600">
          Salvar
        </Button>
        <Button onClick={onCancel} className="bg-gray-300 text-gray-800 hover:bg-gray-400">
          Cancelar
        </Button>
      </div>
    </div>
  );
};