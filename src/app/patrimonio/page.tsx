'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Pencil, Trash2 } from 'lucide-react';
import { formatarReal } from '@/utils/formatarReal';
import { usePatrimonioStore } from '@/store/usePatrimonioStore';
import { useUserStore } from '@/store/useUserStore';
import { useSimuladorStore } from '@/store/useSimuladorStore';
import { FormularioPatrimonio } from '@/components/FormularioPatrimonioProps';
import { ModalRemoverHistorico } from '@/components/ModalRemoverHistorico';
import { v4 as uuid } from 'uuid';

export default function PatrimonioPage() {
  const { patrimonios, addPatrimonio, removePatrimonio } = usePatrimonioStore();
  const { idade } = useUserStore(); // idade atual
  const { ano } = useSimuladorStore(); // ano atual

  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [idParaRemover, setIdParaRemover] = useState<string | null>(null);

  const total = patrimonios.reduce((acc, item) => acc + item.valor, 0);

  const confirmarRemocao = () => {
    if (idParaRemover) {
      removePatrimonio(idParaRemover);
      setIdParaRemover(null);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-100 to-white p-4 flex items-center justify-center">
      <div className="w-full max-w-4xl">
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold">Patrimônio</h1>
            <Button
              onClick={() => setMostrarFormulario(true)}
              className="bg-indigo-500 hover:bg-indigo-600 text-white"
            >
              Novo Cadastro
            </Button>
          </div>

          {mostrarFormulario && (
            <FormularioPatrimonio
              onCancelar={() => setMostrarFormulario(false)}
              onSalvar={(propriedade, valor) => {
                const novoPatrimonio = {
                  id: uuid(),
                  ano,
                  idade,
                  propriedade,
                  valor,
                };
                addPatrimonio(novoPatrimonio);
                setMostrarFormulario(false);
              }}
            />
          )}

          {patrimonios.length === 0 ? (
            <p className="text-center text-gray-500">Nenhum bem cadastrado ainda.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border border-gray-300 rounded-xl overflow-hidden text-left">
                <thead className="bg-blue-200 text-blue-900">
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
                    <tr key={item.id} className="odd:bg-white even:bg-blue-50">
                      <td className="px-4 py-2 text-sm">{item.ano}</td>
                      <td className="px-4 py-2 text-sm">{item.idade}</td>
                      <td className="px-4 py-2 text-sm">{item.propriedade}</td>
                      <td className="px-4 py-2 text-sm font-semibold text-blue-600">
                        {formatarReal(item.valor)}
                      </td>
                      <td className="px-4 py-2 text-center">
                        <div className="flex justify-center gap-3">
                          <Pencil className="h-5 w-5 text-gray-500 cursor-pointer hover:text-gray-700" />
                          <Trash2
                            onClick={() => setIdParaRemover(item.id)}
                            className="h-5 w-5 text-red-500 hover:text-red-600 cursor-pointer transition"
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-blue-100 font-semibold">
                    <td colSpan={3} className="px-4 py-2 text-right">
                      Total:
                    </td>
                    <td className="px-4 py-2 text-blue-700">{formatarReal(total)}</td>
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
