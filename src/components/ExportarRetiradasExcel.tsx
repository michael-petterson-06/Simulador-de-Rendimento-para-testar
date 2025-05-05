'use client';

import { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { useRetiradaStore } from '@/store/useRetiradaStore';
import { Button } from './ui/Button';
import { FileSpreadsheet } from 'lucide-react';



export function ExportarRetiradasExcel() {
  const { retiradas } = useRetiradaStore();
  const [gerandoExcel, setGerandoExcel] = useState(false);
  const [progresso, setProgresso] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (gerandoExcel) {
      setProgresso(0);
      interval = setInterval(() => {
        setProgresso((prev) => (prev < 90 ? prev + 1 : prev));
      }, 30);
    }

    return () => clearInterval(interval);
  }, [gerandoExcel]);

  const exportar = async () => {
    if (retiradas.length === 0) return;

    setGerandoExcel(true);

    await new Promise((resolve) => setTimeout(resolve, 300));
    const dados = retiradas.map((r, i) => ({
      '#': i + 1,
      Nome: r.nome,
      Valor: r.valor,
      Ano: r.ano,
      Idade: r.idade,
      Pagamento: r.pagamento ?? 'À Vista',
      Tipo: r.titulo,
    }));

    const planilha = XLSX.utils.json_to_sheet(dados);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, planilha, 'Retiradas');

    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });

    setProgresso(100);
    setTimeout(() => {
      saveAs(blob, 'relatorio_retiradas.xlsx');
      setGerandoExcel(false);
    }, 500);
  };

  return (
    <div className="text-center my-6">
      {gerandoExcel && (
        <div className="w-full max-w-sm mx-auto mb-4">
          <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-yellow-400 transition-all duration-300"
              style={{ width: `${progresso}%` }}
            />
          </div>
          <p className="text-sm text-yellow-400 mt-2">Gerando Excel... {progresso}%</p>
        </div>
      )}

        <div className="my-6 text-center">
        <Button
            onClick={exportar}
            disabled={gerandoExcel}
            className={`inline-flex items-center justify-center gap-2
            bg-yellow-400 text-black border border-yellow-400 
            hover:bg-black hover:text-yellow-400 
            transition-all duration-500 ${
                gerandoExcel ? 'opacity-50 cursor-not-allowed' : ''
            }`}
        >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Exportar Retiradas para Excel</span>
        </Button>
        </div>

    </div>
  );
}
