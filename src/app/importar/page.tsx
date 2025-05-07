'use client';

import * as XLSX from 'xlsx';
import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { DadoImportado } from '@/types/importTypes';

export default function ImportarPage() {

  const [dados, setDados] = useState<DadoImportado[]>([]);

  const handleImportar = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: 'array' });

      const primeiraPlanilha = workbook.SheetNames[0];
      const planilha = workbook.Sheets[primeiraPlanilha];

      const json = XLSX.utils.sheet_to_json(planilha, { defval: '' });

      const dadosValidados = (json as Record<string, unknown>[]).map((item) => ({
        nome: item['Nome'] as string,
        valor: Number(item['Valor']),
        ano: Number(item['Ano']),
        idade: Number(item['Idade']),
        pagamento: item['Pagamento'] as 'À Vista' | 'Parcelado',
        tipo: item['Tipo'] as 'Nova Retirada' | 'Novo Depósito',
      }));
      

      
      setDados(dadosValidados);
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <main className="min-h-screen bg-black p-6 text-yellow-400 flex flex-col items-center">
      <Card className="w-full max-w-3xl border border-yellow-500 bg-black p-6 space-y-4">
        <h1 className="text-2xl font-bold text-center">📥 Importar Arquivo Excel</h1>

        <input
          type="file"
          accept=".xlsx, .xls"
          onChange={handleImportar}
          className="w-full text-yellow-300 file:bg-yellow-400 file:text-black file:font-semibold file:px-4 file:py-2 file:rounded-lg file:border file:border-yellow-500"
        />

        {dados.length > 0 && (
          <div className="overflow-x-auto mt-6">
            <table className="w-full text-sm border border-yellow-500 text-left">
              <thead className="bg-yellow-300 text-black">
                <tr>
                  {Object.keys(dados[0]).map((chave, i) => (
                    <th key={i} className="px-4 py-2">{chave}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {dados.map((linha, i) => (
                  <tr key={i} className="odd:bg-black even:bg-[#111111] text-yellow-300">
                    {Object.values(linha).map((valor, j) => (
                      <td key={j} className="px-4 py-2">{String(valor)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </main>
  );
}
