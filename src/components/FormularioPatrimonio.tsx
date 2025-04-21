'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { NumericFormat } from 'react-number-format';
import { FormularioPatrimonioProps } from '@/types/formularioPatrimonioProps';

export const FormularioPatrimonio = ({
  onSalvar,
  onCancelar,
  propriedadeInicial = '',
  valorInicial = '',
}: FormularioPatrimonioProps) => {
  const [propriedade, setPropriedade] = useState('');
  const [valor, setValor] = useState('');

  useEffect(() => {
    setPropriedade(propriedadeInicial);
    setValor(valorInicial.toString());
  }, [propriedadeInicial, valorInicial]);

  const handleSalvar = () => {
    if (!propriedade.trim() || isNaN(Number(valor))) {
      alert('Preencha corretamente os campos.');
      return;
    }

    onSalvar(propriedade.trim(), Number(valor));
    setPropriedade('');
    setValor('');
  };

  const modoEdicao = !!propriedadeInicial;

  return (
    <div className="mt-6 p-4 bg-black border border-yellow-500 rounded-xl text-yellow-400 shadow space-y-4 animate-fade-in">
      <h2 className="text-lg font-bold">
        {modoEdicao ? 'Editar Propriedade' : 'Nova Propriedade'}
      </h2>

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
        className="px-4 py-2 border border-yellow-500 bg-black text-yellow-400 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-yellow-500"
      />

      <div className="flex justify-end gap-4 pt-2">
        <Button onClick={handleSalvar}>
          {modoEdicao ? 'Salvar Alterações' : 'Salvar'}
        </Button>
        <Button onClick={onCancelar} className="bg-gray-300 text-gray-800 hover:bg-gray-400">
          Cancelar
        </Button>
      </div>
    </div>
  );
};
