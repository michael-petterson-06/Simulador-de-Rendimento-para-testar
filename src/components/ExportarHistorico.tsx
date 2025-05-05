'use client';

import { useEffect, useState } from 'react';
import { Button } from './ui/Button';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { FileSpreadsheet } from 'lucide-react';

export const ExportarHistorico = () => {
  const [gerandoPDF, setGerandoPDF] = useState(false);
  const [progresso, setProgresso] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (gerandoPDF) {
      setProgresso(0);
      interval = setInterval(() => {
        setProgresso((prev) => (prev < 90 ? prev + 1 : prev));
      }, 30);
    }

    return () => clearInterval(interval);
  }, [gerandoPDF]);

  const exportarParaPDF = async () => {
    const container = document.getElementById('historico-container');
    if (!container) return;

    setGerandoPDF(true);

    const cards = Array.from(container.querySelectorAll('.historico-card'));
    const pdf = new jsPDF('p', 'pt', 'a4');
    const margin = 30;
    const spacing = 20;
    const cardWidth = 240;
    const cardsPerRow = 2;

    let x = margin;
    let y = margin;

    for (let i = 0; i < cards.length; i++) {
      cards[i].classList.add('pdf-export');
      await new Promise((resolve) => setTimeout(resolve, 100));

      const canvas = await html2canvas(cards[i] as HTMLElement, {
        scale: 2,
        backgroundColor: '#ffffff',
        useCORS: true,
      });

      const imgData = canvas.toDataURL('image/png');
      const imgProps = pdf.getImageProperties(imgData);
      const ratio = cardWidth / imgProps.width;
      const finalHeight = imgProps.height * ratio;

      if (i > 0 && i % cardsPerRow === 0) {
        pdf.addPage();
        x = margin;
        y = margin;
      }

      pdf.addImage(imgData, 'PNG', x, y, cardWidth, finalHeight);
      x += cardWidth + spacing;

      cards[i].classList.remove('pdf-export');

      setProgresso(Math.min(90, Math.round(((i + 1) / cards.length) * 90)));
    }

    setProgresso(100);
    setTimeout(() => {
      pdf.save('historico.pdf');
      setGerandoPDF(false);
    }, 500);
  };

  return (
    <div className="text-center my-6">
      {gerandoPDF && (
        <div className="w-full max-w-sm mx-auto mb-4">
          <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-yellow-400 transition-all duration-300"
              style={{ width: `${progresso}%` }}
            />
          </div>
          <p className="text-sm text-yellow-400 mt-2">Gerando PDF... {progresso}%</p>
        </div>
      )}

      <div className="my-6 text-center">
        <Button
          onClick={exportarParaPDF}
          disabled={gerandoPDF}
          className={`inline-flex items-center justify-center gap-2
            bg-yellow-400 text-black border border-yellow-400 
            hover:bg-black hover:text-yellow-400 
            transition-all duration-500 ${
              gerandoPDF ? 'opacity-50 cursor-not-allowed' : ''
            }`}
        >
          <FileSpreadsheet className="w-4 h-4" />
          <span>Exportar Histórico em PDF</span>
        </Button>
      </div>

    </div>
  );
};
