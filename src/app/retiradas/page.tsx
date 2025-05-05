'use client';

import { useState } from 'react';
import { useRetiradaStore } from '@/store/useRetiradaStore';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { RetiradaPanel } from '@/components/RetiradaPanel';
import { Trash2 } from 'lucide-react';
import { ModalRemoverHistorico } from '@/components/ModalRemoverHistorico';

export default function RetiradasPage() {
  const { retiradas, removerHistorico, resetRetiradas } = useRetiradaStore();
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [indiceParaRemover, setIndiceParaRemover] = useState<number | null>(null);
  const [limparTodas, setLimparTodas] = useState(false); // novo estado

  const confirmarRemocao = () => {
    if (indiceParaRemover !== null) {
      removerHistorico(indiceParaRemover);
      setIndiceParaRemover(null);
    }
  };

  const confirmarLimpezaTotal = () => {
    resetRetiradas();
    setLimparTodas(false);
  };

  return (
    <main className="min-h-screen bg-black p-4 flex items-center justify-center text-yellow-400">
      <div className="w-full max-w-4xl">
        <Card className="bg-black border border-yellow-500 text-yellow-400">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2 gap-4">
            <h1 className="text-3xl font-bold text-center md:text-left">Histórico de Retiradas</h1>
            <Button
              onClick={() => setMostrarFormulario(true)}
              className="bg-yellow-400 text-black border border-yellow-500 hover:bg-black hover:text-yellow-400 transition-all duration-500 w-full md:w-auto"
            >
              Nova Retirada
            </Button>
          </div>

          {retiradas.length > 0 && (
            <div className="flex justify-center md:justify-start mt-2 mb-4">
              <Button
                onClick={() => setLimparTodas(true)}
                className=""
              >
                Limpar Todas as Retiradas
              </Button>
            </div>
          )}

          {mostrarFormulario && (
            <RetiradaPanel
              onCancel={() => setMostrarFormulario(false)}
              onSalvar={(nome, valor) => {
                useRetiradaStore.getState().addRetirada({
                  nome,
                  valor,
                  pagamento: 'Parcelado',
                  titulo: 'Nova Retirada',
                });
                setMostrarFormulario(false);
              }}
            />
          )}

          {retiradas.length === 0 && !mostrarFormulario ? (
            <p className="text-center text-yellow-500">Nenhuma retirada registrada até o momento.</p>
          ) : retiradas.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full border border-yellow-500 rounded-xl overflow-hidden text-left text-sm">
                <thead className="bg-yellow-300 text-black">
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
                    <tr
                      key={i}
                      className="odd:bg-black even:bg-[#111111] text-yellow-300"
                    >
                      <td className="px-4 py-2">{i + 1}</td>
                      <td className="px-4 py-2">{r.nome}</td>
                      <td className={`px-4 py-2 font-semibold ${r.titulo === 'Novo Depósito' ? 'text-green-400' : 'text-rose-400'}`}>
                        {r.valor.toLocaleString('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                        })}
                      </td>
                      <td className="px-4 py-2">{r.ano}</td>
                      <td className="px-4 py-2">{r.idade}</td>
                      <td className="px-4 py-2">{r.pagamento ?? 'À Vista'}</td>
                      <td className="px-4 py-2 text-center">
                        <Trash2
                          onClick={() => setIndiceParaRemover(i)}
                          className="h-5 w-5 text-yellow-400 hover:text-white cursor-pointer transition"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : null}
        </Card>

        {indiceParaRemover !== null && (
          <ModalRemoverHistorico
            onConfirmar={confirmarRemocao}
            onCancelar={() => setIndiceParaRemover(null)}
            titulo="Remover Registro"
            paragrafo="este registro"
          />
        )}

        {limparTodas && (
          <ModalRemoverHistorico
            onConfirmar={confirmarLimpezaTotal}
            onCancelar={() => setLimparTodas(false)}
            titulo="Limpar Todas as Retiradas"
            paragrafo="todas as retiradas"
          />
        )}
      </div>
    </main>
  );
}
