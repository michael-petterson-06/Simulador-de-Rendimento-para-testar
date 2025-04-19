'use client';

import { Button } from './ui/Button';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const ExportarHistorico = () => {
  const exportarParaPDF = async () => {
    const container = document.getElementById('historico-container');

    if (!container) return;

    const cards = Array.from(container.querySelectorAll('.historico-card'));

    const pdf = new jsPDF('p', 'pt', 'a4');
    const pageHeight = pdf.internal.pageSize.height;
    const pageWidth = pdf.internal.pageSize.width;
    const margin = 30;
    const cardsPorPagina = 1;
    const espacoEntreCards = 20;
    const larguraCanvasForcada = 1000; // <- Reduzir largura para caber bem no A4

    let yOffset = margin;
    let cardsNaPagina = 0;

    for (let i = 0; i < cards.length; i++) {
      const canvas = await html2canvas(cards[i] as HTMLElement, {
        scale: 1.9, // ← reduz escala para caber no PDF
        width: larguraCanvasForcada,
        windowWidth: larguraCanvasForcada,
      });

      const imgData = canvas.toDataURL('image/png');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pageWidth - margin * 2;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      if (yOffset + pdfHeight > pageHeight - margin || cardsNaPagina >= cardsPorPagina) {
        pdf.addPage();
        yOffset = margin;
        cardsNaPagina = 0;
      }

      pdf.addImage(imgData, 'PNG', margin, yOffset, pdfWidth, pdfHeight);
      yOffset += pdfHeight + espacoEntreCards;
      cardsNaPagina++;
    }

    pdf.save('historico.pdf');
  };

  return (
    <div className="text-center my-6">
      <Button onClick={exportarParaPDF} className="bg-indigo-600 text-white hover:bg-indigo-700">
        📄 Exportar Histórico em PDF
      </Button>
    </div>
  );
};
