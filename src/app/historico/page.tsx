'use client';

import { useHistoricoStore } from '@/store/useHistoricoStore';
import { formatarReal } from '@/utils/formatarReal';

export default function HistoricoPage() {
  const { historico } = useHistoricoStore();

  if (historico.length === 0) {
    return (
      <main className="min-h-screen p-8 flex items-center justify-center text-gray-600">
        Nenhum histórico salvo ainda.
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-100 to-white p-6">
    <div className="flex flex-wrap justify-center gap-4">
      {historico.map((registro, idx) => (
        <div
          key={idx}
          className="w-full sm:w-[340px] bg-white rounded-xl shadow-xl p-4 space-y-4"
        >
          <h2 className="text-lg font-bold text-center text-indigo-700">Histórico de Renda Familiar</h2>
  
          <div className="space-y-1 text-sm">
            <p><strong>Nome:</strong> {registro.usuario.nome}</p>
            <p><strong>Idade:</strong> {registro.usuario.idade}</p>
            <p><strong>Ano:</strong> {registro.ano}</p>
          </div>
  
          <div className="bg-blue-50 p-3 rounded-xl text-sm">
            <p>
              📥 <strong>Total de Entradas:</strong> {formatarReal(registro.totalEntradas)}
            </p>
          </div>
  
          <div className="bg-green-50 p-3 rounded-xl text-sm">
            <p>
              🧾 <strong>Saldo Final:</strong> {formatarReal(registro.saldoFinal)}
            </p>
          </div>
  
          <div className="bg-red-50 p-3 rounded-xl text-sm">
            <p className="font-semibold mb-2">📉 Gastos:</p>
            <ul className="list-disc list-inside space-y-1">
              {registro.gastos.map((gasto, gIdx) => (
                <li key={gIdx}>
                  {gasto.nome} — <strong className="text-rose-600">{formatarReal(gasto.valor)}</strong>
                </li>
              ))}
            </ul>
            <p className="mt-2 font-bold text-rose-600">
              Total: {formatarReal(registro.totalGastos)}
            </p>
          </div>
        </div>
      ))}
    </div>
  </main>
  
  );
}
