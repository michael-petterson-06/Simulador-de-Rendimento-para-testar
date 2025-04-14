'use client';

import { useState } from 'react';
import { useRetiradaStore } from '@/store/useRetiradaStore';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { RetiradaPanel } from '@/components/RetiradaPanel';
import { Trash2 } from 'lucide-react';


export default function RetiradasPage() {
  
  const { retiradas, removerHistorico } = useRetiradaStore();
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  
  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-100 to-white p-4 flex items-center justify-center">
      <div className="w-full max-w-4xl">
        <Card>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
            <h1 className="text-3xl font-bold text-center md:text-left">
              Histórico de Retiradas
            </h1>
            <Button
              onClick={() => setMostrarFormulario(true)}
              className="bg-rose-500 hover:bg-rose-600 text-white w-full md:w-auto"
            >
              Nova Retirada
            </Button>
          </div>

          {mostrarFormulario && (
            <RetiradaPanel
              onCancel={() => setMostrarFormulario(false)}
              onSalvar={(nome, valor) => {
                useRetiradaStore.getState().addRetirada({
                  nome,
                  valor,
                  pagamento: 'Parcelado',
                  titulo: 'Nova Retirada',
                })
                setMostrarFormulario(false);
              }}
            />
          )}

          {retiradas.length === 0 && !mostrarFormulario ? (
            <p className="text-center text-gray-500">Nenhuma retirada registrada até o momento.</p>
          ) : retiradas.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full border border-gray-300 rounded-xl overflow-hidden text-left">
                <thead className="bg-purple-200 text-purple-900">
                  <tr>
                    <th className="px-4 py-2">#</th>
                    <th className="px-4 py-2">Nome</th>
                    <th className="px-4 py-2">Valor</th>
                    <th className="px-4 py-2">Ano</th>
                    <th className="px-4 py-2">Idade</th>
                    <th className="px-4 py-2">Pagamento</th>
                    <th className="px-4 py-2 text-center">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {retiradas.map((r, i) => (
                    <tr key={i} className="odd:bg-white even:bg-purple-50">
                      <td className="px-4 py-2 font-medium text-sm">{i + 1}</td>
                      <td className="px-4 py-2 text-sm">{r.nome}</td>
                      <td className={`px-4 py-2 text-sm font-semibold ${r.titulo === 'Novo Depósito' ? 'text-green-600' : 'text-rose-600'}`}>
                        {r.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                      </td>
                      <td className="px-4 py-2 text-sm">{r.ano}</td>
                      <td className="px-4 py-2 text-sm">{r.idade}</td>
                      <td className="px-4 py-2 text-sm">{r.pagamento ?? 'À Vista'}</td>
                      <td className="px-4 py-2 text-center">
                      <Trash2
                          onClick={() => removerHistorico(i)}
                          className="h-5 w-5 text-red-500 hover:text-red-600 cursor-pointer transition"
                        >
                          <title>Remover retirada</title>
                        </Trash2>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : null}
        </Card>
      </div>
    </main>
  );
}
