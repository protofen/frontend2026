import { useCallback } from 'react';
import { createRoot } from 'react-dom/client';
import { flushSync } from 'react-dom';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import type { Presentation } from '../types/presentation.js';
import { SlidePreview } from '../components/SlidePreview.js';

const SLIDE_WIDTH = 800;
const SLIDE_HEIGHT = 600;

function usePdfExport() {
  const exportToPdf = useCallback(async (presentation: Presentation) => {
    if (presentation.slides.length === 0) return;

    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.left = '-10000px';
    container.style.top = '0';
    container.style.width = `${SLIDE_WIDTH}px`;
    container.style.height = `${SLIDE_HEIGHT}px`;
    container.style.backgroundColor = '#ffffff';
    document.body.appendChild(container);

    const root = createRoot(container);

    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'px',
      format: [SLIDE_WIDTH, SLIDE_HEIGHT],
      compress: true,
    });

    try {
      for (let i = 0; i < presentation.slides.length; i++) {
        const slide = presentation.slides[i];

        flushSync(() => {
          root.render(<SlidePreview slide={slide} />);
        });

        const canvas = await html2canvas(container, {
          width: SLIDE_WIDTH,
          height: SLIDE_HEIGHT,
          scale: 2,
          backgroundColor: '#ffffff',
          useCORS: true,
          logging: false,
        });

        const imgData = canvas.toDataURL('image/png');

        if (i > 0) {
          pdf.addPage([SLIDE_WIDTH, SLIDE_HEIGHT], 'landscape');
        }
        pdf.addImage(imgData, 'PNG', 0, 0, SLIDE_WIDTH, SLIDE_HEIGHT);
      }

      pdf.save(`${presentation.name}.pdf`);
    } finally {
      root.unmount();
      document.body.removeChild(container);
    }
  }, []);

  return { exportToPdf };
}

export { usePdfExport };