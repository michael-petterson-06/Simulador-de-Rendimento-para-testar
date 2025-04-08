'use client';

import { useRetiradaStore } from '@/store/useRetiradaStore';
import { Card } from '@/components/ui/Card';

export default function RetiradasPage() {
  const { retiradas } = useRetiradaStore();

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-100 to-white p-4 flex items-center justify-center">
      <div className="w-full max-w-4xl">
        <Card>
          <h1 className="text-3xl font-bold text-center mb-6">Histórico de Retiradas</h1>

          {retiradas.length === 0 ? (
            <p className="text-center text-gray-500">Nenhuma retirada registrada até o momento.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border border-gray-300 rounded-xl overflow-hidden text-left">
                <thead className="bg-purple-200 text-purple-900">
                  <tr>
                    <th className="px-4 py-2">#</th>
                    <th className="px-4 py-2">Nome</th>
                    <th className="px-4 py-2">Valor</th>
                    <th className="px-4 py-2">Ano</th>
                  </tr>
                </thead>
                <tbody>
                  {retiradas.map((r, i) => (
                    <tr key={i} className="odd:bg-white even:bg-purple-50">
                      <td className="px-4 py-2 font-medium text-sm">{i + 1}</td>
                      <td className="px-4 py-2 text-sm">{r.nome}</td>
                      <td className="px-4 py-2 text-sm text-rose-600 font-semibold">
                        {r.valor.toLocaleString('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                        })}
                      </td>
                      <td className="px-4 py-2 text-sm">{r.ano}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </div>
    </main>
  );
}
