'use client';

import { useSimuladorStore } from '@/store/useSimuladorStore';
import { formatarReal } from '@/utils/formatarReal';
import { Pencil, Trash2 } from 'lucide-react';
import { Button } from './ui/Button';
import { ModalGasto } from './ModalGasto';
import { useState } from 'react';

export const ListaGastos = () => {
  const { listaGastos, removerGasto, editarGasto } = useSimuladorStore();
  const [mostrarModal, setMostrarModal] = useState(false);
  const [indexEdicao, setIndexEdicao] = useState<number | null>(null);
  const [nomeGasto, setNomeGasto] = useState('');
  const [valorGasto, setValorGasto] = useState('');

  const abrirEdicao = (index: number) => {
    const gasto = listaGastos[index];
    setIndexEdicao(index);
    setNomeGasto(gasto.nome);
    setValorGasto(gasto.valor.toString());
    setMostrarModal(true);
  };

  const salvarEdicao = () => {
    if (indexEdicao === null) return;
    const valor = Number(valorGasto);
    if (!nomeGasto.trim() || isNaN(valor)) {
      alert('Preencha corretamente o nome e valor do gasto.');
      return;
    }
    editarGasto(indexEdicao, { nome: nomeGasto, valor });
    setIndexEdicao(null);
    setNomeGasto('');
    setValorGasto('');
    setMostrarModal(false);
  };

  if (!listaGastos || listaGastos.length === 0) return null;

  return (
    <div className="mt-8 mb-4 space-y-4">
      <h2 className="text-md font-semibold text-yellow-500">💸 Gastos:</h2>

      <ul className="divide-y divide-yellow-200 border border-yellow-500 rounded-xl overflow-hidden">
        {listaGastos.map((gasto, i) => (
          <li
            key={i}
            className="flex justify-between items-center text-sm py-3 px-4 bg-black text-yellow-300"
          >
            <div className="flex flex-col">
              <span className="font-semibold">{gasto.nome}</span>
              <span className="text-yellow-500">{formatarReal(gasto.valor)}</span>
            </div>

            <div className="flex items-center gap-2">
              <Button
                title="Editar gasto"
                
                onClick={() => abrirEdicao(i)}
              >
                <Pencil size={16} />
              </Button>

              <Button
                title="Remover gasto"
                
                onClick={() => removerGasto(i)}
              >
                <Trash2 size={16} />
              </Button>
            </div>
          </li>
        ))}
      </ul>

      {mostrarModal && (
        <ModalGasto
          nomeGasto={nomeGasto}
          valorGasto={valorGasto}
          setNomeGasto={setNomeGasto}
          setValorGasto={setValorGasto}
          onAdicionar={salvarEdicao}
          onCancelar={() => {
            setMostrarModal(false);
            setIndexEdicao(null);
          }}
          isEditing
        />
      )}
    </div>
  );
};
