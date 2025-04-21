'use client';

import { Input } from './ui/Input';
import { Button } from './ui/Button';
import { ModalGastoPercentualProps } from '@/types/modalGastoPercentual';
import { useEntradasStore } from '@/store/useEntradasStore';
import SelectEntrada from './ui/SelectEntrada';

export const ModalGastoPercentual = ({
  nome,
  percentual,
  tipoEntrada,
  setNome,
  setPercentual,
  setTipoEntrada,
  onAdicionar,
  onCancelar,
}: ModalGastoPercentualProps) => {
  const { nomes } = useEntradasStore();

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-black text-yellow-400 border border-yellow-600 rounded-xl shadow-xl p-6 w-full max-w-sm space-y-4">
        <h2 className="text-xl font-bold text-center border-b border-yellow-700 pb-2">
          Adicionar Gasto Percentual
        </h2>

        <SelectEntrada
          tipoEntrada={tipoEntrada}
          setTipoEntrada={setTipoEntrada}
          nomes={nomes}
        />

        <Input
          type="text"
          placeholder="Nome do Gasto"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="bg-black text-yellow-400 border-yellow-500 placeholder-yellow-300 focus:ring-yellow-500"
        />

        <Input
          type="number"
          placeholder="Valor em % (ex: 10)"
          value={percentual}
          onChange={(e) => setPercentual(e.target.value)}
          className="bg-black text-yellow-400 border-yellow-500 placeholder-yellow-300 focus:ring-yellow-500"
        />

        <div className="flex justify-center gap-4 pt-2">
          <Button
            onClick={onAdicionar}
         >
            Adicionar
          </Button>

          <Button
            onClick={onCancelar}
          >
            Cancelar
          </Button>
        </div>
      </div>
    </div>
  );
};
