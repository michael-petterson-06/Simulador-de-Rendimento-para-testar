'use client';

import { useState } from 'react';
import { Button } from './ui/Button';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const ExportarHistorico = () => {
  const [gerandoPDF, setGerandoPDF] = useState(false);

  const exportarParaPDF = async () => {
    const container = document.getElementById('historico-container');
    if (!container) return;

    setGerandoPDF(true); // Inicia o carregamento

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

      // Aguarda um pouco para garantir renderização correta (ajuda com efeitos visuais)
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
    }

    pdf.save('historico.pdf');
    setGerandoPDF(false); // Finaliza o carregamento
  };

  return (
    <div className="text-center my-6">
      {gerandoPDF && (
        <div className="w-full max-w-sm mx-auto mb-4">
          <div className="w-full h-2 bg-gray-300 rounded-full overflow-hidden">
            <div className="h-full bg-indigo-600 animate-pulse w-full" />
          </div>
          <p className="text-sm text-gray-600 mt-2">Gerando PDF, aguarde...</p>
        </div>
      )}

      <Button
        onClick={exportarParaPDF}
        disabled={gerandoPDF}
        className={`bg-indigo-600 text-white hover:bg-indigo-700 ${
          gerandoPDF ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        📄 Exportar Histórico em PDF
      </Button>
    </div>
  );
};
