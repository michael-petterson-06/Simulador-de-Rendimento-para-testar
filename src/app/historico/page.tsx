'use client';

import { useHistoricoStore } from '@/store/useHistoricoStore';
// import { formatarReal } from '@/utils/formatarReal';
// import { Trash2 } from 'lucide-react';
import { ModalRemoverHistorico } from '@/components/ModalRemoverHistorico';
import { ExportarHistorico } from '@/components/ExportarHistorico';
import { ListaHistoricoCards } from '@/components/ListaHistoricoCards';
import { Button } from '@/components/ui/Button';
import { useState } from 'react';

export default function HistoricoPage() {
  const {
    historico,
    removerHistorico,
    limparTodos,
    limparPorAno,
    anoSelecionado,
    setAnoSelecionado,
  } = useHistoricoStore();

  const [indiceParaRemover, setIndiceParaRemover] = useState<number | null>(null);
  const [mensagemRemovido, setMensagemRemovido] = useState(false);
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
            className={anoSelecionado === 'todos' ? 'underline' : ''}
          >
            Todos os Anos
          </Button>

          {anosDisponiveis.map(ano => (
            <Button
              key={ano}
              onClick={() => setAnoSelecionado(ano)}
              className={anoSelecionado === ano ? 'underline' : ''}
            >
              {ano}
          </Button>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-2">
          {historico.length > 0 && (
            <Button
              onClick={() => setLimparTodosAtivo(true)}
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

      <ListaHistoricoCards
        historicoFiltrado={historicoFiltrado}
        setIndiceParaRemover={setIndiceParaRemover}
      />

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
