'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { NumericFormat } from 'react-number-format';
import { FormularioPatrimonioProps } from '@/types/formularioPatrimonioProps';

export const FormularioPatrimonio = ({ onSalvar, onCancelar }: FormularioPatrimonioProps) => {
  const [propriedade, setPropriedade] = useState('');
  const [valor, setValor] = useState('');

  const handleSalvar = () => {
    if (!propriedade.trim() || isNaN(Number(valor))) {
      alert('Preencha corretamente os campos.');
      return;
    }
    onSalvar(propriedade.trim(), Number(valor));
    setPropriedade('');
    setValor('');
  };

  return (
    <div className="mt-6 p-4 bg-white border rounded-xl shadow space-y-4 animate-fade-in">
      <h2 className="text-lg font-bold text-indigo-600">Nova Propriedade</h2>
      <Input
        type="text"
        placeholder="Propriedade (ex: Carro, Casa)"
        value={propriedade}
        onChange={(e) => setPropriedade(e.target.value)}
      />
      <NumericFormat
        value={valor}
        thousandSeparator="."
        decimalSeparator="," 
        prefix="R$ "
        decimalScale={2}
        fixedDecimalScale
        onValueChange={(values) => setValor(values.value)}
        placeholder="Valor"
        className="px-4 py-2 border border-gray-300 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <div className="flex justify-end gap-4">
        <Button onClick={handleSalvar} className="bg-green-500 hover:bg-green-600 text-white">
          Salvar
        </Button>
        <Button onClick={onCancelar} className="bg-gray-300 text-gray-800 hover:bg-gray-400">
          Cancelar
        </Button>
      </div>
    </div>
  );
};
