'use client';

import { Trash2 } from 'lucide-react';
import { formatarReal } from '@/utils/formatarReal';
import { useHistoricoStore } from '@/store/useHistoricoStore';
import { Props } from '@/types/historico';

export function ListaHistoricoCards({ historicoFiltrado, setIndiceParaRemover }: Props) {

  const { historico } = useHistoricoStore();

  return (
    <div id="historico-container" className="flex flex-wrap justify-center gap-4">
      {historicoFiltrado.map((registro, idx) => {
        const indiceReal = historico.findIndex(
          (h) =>
            h.ano === registro.ano &&
            h.usuario.nome === registro.usuario.nome &&
            h.usuario.idade === registro.usuario.idade &&
            h.valorPoupado === registro.valorPoupado
        );

        return (
          <div
            key={idx}
            className="historico-card w-full sm:w-[340px] bg-black border border-yellow-500 rounded-xl shadow-xl p-4 space-y-4 relative"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold flex items-center gap-2">
                Histórico de Renda Familiar
                <Trash2
                  onClick={() => setIndiceParaRemover(indiceReal)}
                  className="h-5 w-5 text-yellow-400 hover:text-white cursor-pointer transition-all duration-300"
                />
              </h2>
            </div>

            <div className="space-y-1 text-sm">
              <p><strong>Nome:</strong> {registro.usuario.nome}</p>
              <p><strong>Idade:</strong> {registro.usuario.idade}</p>
              <p>
                <strong>Ano:</strong> {registro.ano}
                <span className="ml-2 text-yellow-300">
                  ({registro.mesInicial} – {registro.mesFinal})
                </span>
              </p>
            </div>

            <div className="border border-yellow-500 p-3 rounded-xl text-sm">
              <p className="font-semibold mb-2">💼 Entradas:</p>
              <ul className="list-disc list-inside space-y-1">
                {registro.entradas.map((entrada, eIdx) => (
                  <li key={eIdx}>
                    {entrada.nome} — <strong>{formatarReal(Number(entrada.valor))}</strong>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border border-blue-400 p-3 rounded-xl text-sm text-blue-300">
              <p>
                📅 <strong>Total de Entradas:</strong> {formatarReal(registro.totalEntradas)}
              </p>
            </div>

            <div className="border border-green-400 p-3 rounded-xl text-sm text-green-300">
              <p>
                🧾 <strong>Saldo Final:</strong> {formatarReal(registro.saldoFinal)}
              </p>
            </div>

            <div className="border border-rose-500 p-3 rounded-xl text-sm text-rose-300">
              <p className="font-semibold mb-2">📉 Gastos:</p>
              <ul className="list-disc list-inside space-y-1">
                {registro.gastos.map((gasto, gIdx) => (
                  <li key={gIdx}>
                    {gasto.nome} — <strong>{formatarReal(gasto.valor)}</strong>
                  </li>
                ))}
              </ul>
              <p className="mt-2 font-bold text-left">
                Total: {formatarReal(registro.totalGastos)}
              </p>
            </div>

            <div className="border border-yellow-500 p-3 rounded-xl text-sm">
              <p>
                🏆 <strong>Valor Poupado:</strong> {formatarReal(registro.valorPoupado)}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
