'use client';

import { useState } from 'react';
import { useHistoricoStore } from '@/store/useHistoricoStore';
import { formatarReal } from '@/utils/formatarReal';
import { Trash2 } from 'lucide-react';
import { ModalRemoverHistorico } from '@/components/ModalRemoverHistorico';

export default function HistoricoPage() {
  const { historico, removerHistorico } = useHistoricoStore();
  const [indiceParaRemover, setIndiceParaRemover] = useState<number | null>(null);
  const [mensagemRemovido, setMensagemRemovido] = useState(false);

  const confirmarRemocao = () => {
    if (indiceParaRemover !== null) {
      removerHistorico(indiceParaRemover);
      setMensagemRemovido(true);
      setTimeout(() => setMensagemRemovido(false), 3000);
      setIndiceParaRemover(null);
    }
  };

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
            className="w-full sm:w-[340px] bg-white rounded-xl shadow-xl p-4 space-y-4 relative"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-indigo-700 flex items-center gap-2">
                Histórico de Renda Familiar
                <Trash2
                  onClick={() => setIndiceParaRemover(idx)}
                  className="h-5 w-5 text-red-500 hover:text-red-600 cursor-pointer transition"
                />
              </h2>
            </div>

            <div className="space-y-1 text-sm">
              <p><strong>Nome:</strong> {registro.usuario.nome}</p>
              <p><strong>Idade:</strong> {registro.usuario.idade}</p>
              <p>
                <strong>Ano:</strong> {registro.ano}
                <span className="ml-2 text-gray-500">
                  ({registro.mesInicial} – {registro.mesFinal})
                </span>
              </p>
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
              <p className="mt-2 font-bold text-rose-600 text-left">
                Total: {formatarReal(registro.totalGastos)}
              </p>
            </div>
          </div>
        ))}
      </div>
    
      {indiceParaRemover !== null && (
        <ModalRemoverHistorico
        onConfirmar={confirmarRemocao}
        onCancelar={() => setIndiceParaRemover(null)}
      />
      )}
      
      {mensagemRemovido && (
        <p className="fixed top-4 left-1/2 -translate-x-1/2 bg-green-100 text-green-700 px-4 py-2 rounded-xl shadow text-sm font-medium animate-fade-in-out z-50">
          ✅ Histórico removido com sucesso!
        </p>
      )}

    </main>
  );
}
