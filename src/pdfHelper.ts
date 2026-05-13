import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export const downloadPdf = async (elementId: string, filename: string, setIsGeneratingPdf: (isGenerating: boolean) => void) => {
  const element = document.getElementById(elementId);
  if (!element) return;

  try {
    setIsGeneratingPdf(true);
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#ffffff',
      onclone: (clonedDoc) => {
        const elements = clonedDoc.querySelectorAll('*');
        elements.forEach((el) => {
          const htmlEl = el as HTMLElement;
          const style = window.getComputedStyle(htmlEl);
          const props = [
            'color', 'background-color', 'border-color', 'border-top-color', 'border-right-color', 
            'border-bottom-color', 'border-left-color', 'text-decoration-color', 'outline-color', 'box-shadow'
          ];
          
          props.forEach(prop => {
            const val = style.getPropertyValue(prop);
            if (val && val.includes('oklch')) {
              if (prop === 'box-shadow') {
                htmlEl.style.setProperty(prop, 'none', 'important');
              } else if (prop.includes('border') || prop.includes('outline')) {
                htmlEl.style.setProperty(prop, '#e2e8f0', 'important');
              } else if (prop === 'background-color') {
                htmlEl.style.setProperty(prop, '#ffffff', 'important');
              } else if (prop === 'color') {
                htmlEl.style.setProperty(prop, '#0f172a', 'important');
              } else {
                htmlEl.style.setProperty(prop, '#e2e8f0', 'important');
              }
            }
          });
        });
      }
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${filename}.pdf`);
  } catch (error) {
    console.error('Error generating PDF:', error);
  } finally {
    setIsGeneratingPdf(false);
  }
};
