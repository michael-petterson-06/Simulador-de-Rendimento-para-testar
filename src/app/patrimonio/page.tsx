'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Pencil, Trash2 } from 'lucide-react';
import { formatarReal } from '@/utils/formatarReal';
import { usePatrimonioStore } from '@/store/usePatrimonioStore';
import { useUserStore } from '@/store/useUserStore';
import { useSimuladorStore } from '@/store/useSimuladorStore';
import { ModalRemoverHistorico } from '@/components/ModalRemoverHistorico';
import { v4 as uuid } from 'uuid';
import { Patrimonio } from '@/types/patrimonioState';
import { FormularioPatrimonio } from '@/components/FormularioPatrimonio';

export default function PatrimonioPage() {
  const {
    patrimonios,
    addPatrimonio,
    removePatrimonio,
    updatePatrimonio,
  } = usePatrimonioStore();
  const { idade } = useUserStore();
  const { ano } = useSimuladorStore();

  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [idParaRemover, setIdParaRemover] = useState<string | null>(null);
  const [patrimonioEmEdicao, setPatrimonioEmEdicao] = useState<Patrimonio | null>(null);

  const total = patrimonios.reduce((acc, item) => acc + item.valor, 0);

  const confirmarRemocao = () => {
    if (idParaRemover) {
      removePatrimonio(idParaRemover);
      setIdParaRemover(null);
    }
  };

  const iniciarEdicao = (item: Patrimonio) => {
    setPatrimonioEmEdicao(item);
    setMostrarFormulario(true);
  };

  const salvarFormulario = (propriedade: string, valor: number) => {
    if (patrimonioEmEdicao) {
      updatePatrimonio({
        ...patrimonioEmEdicao,
        propriedade,
        valor,
      });
    } else {
      addPatrimonio({
        id: uuid(),
        ano,
        idade,
        propriedade,
        valor,
      });
    }

    setMostrarFormulario(false);
    setPatrimonioEmEdicao(null);
  };

  return (
    <main className="min-h-screen bg-black text-yellow-400 p-4 flex items-center justify-center">
      <div className="w-full max-w-4xl">
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold">Patrimônio</h1>
            <Button
              onClick={() => {
                setMostrarFormulario(true);
                setPatrimonioEmEdicao(null);
              }}
            >
              Novo Cadastro
            </Button>
          </div>

          {mostrarFormulario && (
            <FormularioPatrimonio
              onCancelar={() => {
                setMostrarFormulario(false);
                setPatrimonioEmEdicao(null);
              }}
              onSalvar={salvarFormulario}
              propriedadeInicial={patrimonioEmEdicao?.propriedade}
              valorInicial={patrimonioEmEdicao?.valor}
            />
          )}

          {patrimonios.length === 0 ? (
            <p className="text-center text-yellow-300">Nenhum bem cadastrado ainda.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border border-yellow-500 rounded-xl overflow-hidden text-left">
                <thead className="bg-yellow-500 text-black">
                  <tr>
                    <th className="px-4 py-2">Ano</th>
                    <th className="px-4 py-2">Idade</th>
                    <th className="px-4 py-2">Propriedade</th>
                    <th className="px-4 py-2">Valor</th>
                    <th className="px-4 py-2 text-center">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {patrimonios.map((item) => (
                    <tr key={item.id} className="odd:bg-black even:bg-gray-900">
                      <td className="px-4 py-2 text-sm">{item.ano}</td>
                      <td className="px-4 py-2 text-sm">{item.idade}</td>
                      <td className="px-4 py-2 text-sm">{item.propriedade}</td>
                      <td className="px-4 py-2 text-sm font-semibold text-yellow-400">
                        {formatarReal(item.valor)}
                      </td>
                      <td className="px-4 py-2 text-center">
                        <div className="flex justify-center gap-3">
                          <Pencil
                            onClick={() => iniciarEdicao(item)}
                            className="h-5 w-5 text-yellow-400 hover:text-white cursor-pointer transition"
                          />
                          <Trash2
                            onClick={() => setIdParaRemover(item.id)}
                            className="h-5 w-5 text-yellow-400 hover:text-white cursor-pointer transition"
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-yellow-700 text-black font-bold">
                    <td colSpan={3} className="px-4 py-2 text-right">
                      Total:
                    </td>
                    <td className="px-4 py-2">{formatarReal(total)}</td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </div>

      {idParaRemover && (
        <ModalRemoverHistorico
          onConfirmar={confirmarRemocao}
          onCancelar={() => setIdParaRemover(null)}
          titulo="Remover Propriedade"
          paragrafo="registro de patrimônio"
        />
      )}
    </main>
  );
}
