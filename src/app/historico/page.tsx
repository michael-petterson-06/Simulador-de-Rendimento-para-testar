'use client';

import { useState } from 'react';
import { useHistoricoStore } from '@/store/useHistoricoStore';
import { formatarReal } from '@/utils/formatarReal';
import { Trash2 } from 'lucide-react';
import { ModalRemoverHistorico } from '@/components/ModalRemoverHistorico';
import { ExportarHistorico } from '@/components/ExportarHistorico';
import { Button } from '@/components/ui/Button';

export default function HistoricoPage() {
  const { historico, removerHistorico, limparTodos, limparPorAno } = useHistoricoStore();

  const [indiceParaRemover, setIndiceParaRemover] = useState<number | null>(null);
  const [mensagemRemovido, setMensagemRemovido] = useState(false);
  const [anoSelecionado, setAnoSelecionado] = useState<number | 'todos'>('todos');
  const [limparTodosAtivo, setLimparTodosAtivo] = useState(false);
  const [anoParaLimpar, setAnoParaLimpar] = useState<number | null>(null);

  const anosDisponiveis = Array.from(new Set(historico.map(h => h.ano))).sort((a, b) => b - a);

  const historicoFiltrado = anoSelecionado === 'todos'
    ? historico
    : historico.filter(h => h.ano === anoSelecionado);

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
      <main className="min-h-screen p-8 flex items-center justify-center text-gray-500">
        Nenhum histórico salvo ainda.
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-yellow-400 p-6">
      <ExportarHistorico />

      <div id="inicio-tabela" className="mb-6 space-y-4">
        <div className="flex flex-wrap justify-center gap-2">
          <Button
            onClick={() => setAnoSelecionado('todos')}
            
          >
            Todos os Anos
          </Button>
          {anosDisponiveis.map(ano => (
            <Button
              key={ano}
              onClick={() => setAnoSelecionado(ano)}
            >
              {ano}
            </Button>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-2">
          {historico.length > 0 && (
            <Button
              onClick={() => setLimparTodosAtivo(true)}
              // className="bg-yellow-400 text-black hover:bg-red-700 border border-red-600"
               className="hover:bg-red-700 border border-red-600"
            >
              Limpar Todos os Históricos
            </Button>
          )}

          {anoSelecionado !== 'todos' && (
            <Button
              onClick={() => setAnoParaLimpar(anoSelecionado)}
              className="bg-yellow-400 text-black hover:bg-rose-700 border border-rose-600"
            >
              Limpar Ano {anoSelecionado}
            </Button>
          )}
        </div>
      </div>

      <div id="historico-container" className="flex flex-wrap justify-center gap-4">
        {historicoFiltrado.map((registro, idx) => (
          <div
            key={idx}
            className="historico-card w-full sm:w-[340px] bg-black border border-yellow-500 rounded-xl shadow-xl p-4 space-y-4 relative"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold flex items-center gap-2">
                Histórico de Renda Familiar
                <Trash2
                  onClick={() => setIndiceParaRemover(idx)}
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
                📥 <strong>Total de Entradas:</strong> {formatarReal(registro.totalEntradas)}
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
        ))}
      </div>

      <div className="mt-8 text-center">
        <button
          onClick={() =>
            document.getElementById('inicio-tabela')?.scrollIntoView({ behavior: 'smooth' })
          }
          className="text-sm text-yellow-400 underline hover:text-white transition"
        >
          🔝 Voltar ao início
        </button>
      </div>

      {indiceParaRemover !== null && (
        <ModalRemoverHistorico
          onConfirmar={confirmarRemocao}
          onCancelar={() => setIndiceParaRemover(null)}
          titulo="Remover Histórico"
          paragrafo="histórico"
        />
      )}

      {limparTodosAtivo && (
        <ModalRemoverHistorico
          onConfirmar={() => {
            limparTodos();
            setLimparTodosAtivo(false);
          }}
          onCancelar={() => setLimparTodosAtivo(false)}
          titulo="Limpar Todos os Históricos"
          paragrafo="todos os históricos"
        />
      )}

      {anoParaLimpar !== null && (
        <ModalRemoverHistorico
          onConfirmar={() => {
            limparPorAno(anoParaLimpar);
            setAnoParaLimpar(null);
          }}
          onCancelar={() => setAnoParaLimpar(null)}
          titulo={`Limpar Histórico do Ano ${anoParaLimpar}`}
          paragrafo={`todos os históricos do ano ${anoParaLimpar}`}
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
