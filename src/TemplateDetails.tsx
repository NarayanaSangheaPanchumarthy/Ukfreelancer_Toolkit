import React, { useState } from 'react';
import { Download, Loader2 } from 'lucide-react';
import ProFeaturesCTA from './ProFeaturesCTA';
import { downloadPdf } from './pdfHelper';

export interface TemplateData {
  id: string;
  tag: string;
  title: string;
  description: string;
  whenToUse: string;
  liveTool: string;
  liveToolName: string;
  previewContent: React.ReactNode;
}

interface TemplateDetailsProps {
  template: TemplateData;
  setActiveTab: (tab: string) => void;
  onBack: () => void;
}

export default function TemplateDetails({ template, setActiveTab, onBack }: TemplateDetailsProps) {
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  const handleDownload = async () => {
    await downloadPdf('template-preview', template.id, setIsGeneratingPdf);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 pt-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6 pb-6 border-b border-slate-200">
        <div>
          <button 
            onClick={onBack}
            className="text-sm font-bold text-slate-500 hover:text-slate-800 mb-6 flex items-center transition-colors"
          >
            ← Back to templates
          </button>
          <div className="text-[10px] font-bold text-[#a67c52] uppercase tracking-widest mb-3">
            {template.tag}
          </div>
          <h1 className="text-4xl md:text-5xl font-serif text-slate-900 mb-4 tracking-tight">
            {template.title}
          </h1>
          <p className="text-slate-500 text-sm max-w-xl">
            {template.description}
          </p>
        </div>
        <button 
          onClick={handleDownload}
          disabled={isGeneratingPdf}
          className="bg-[#1a1f24] text-white font-bold flex items-center px-6 py-3 border border-[#1a1f24] hover:bg-black transition-colors text-sm shadow-sm disabled:opacity-70 disabled:cursor-not-allowed mt-4 md:mt-0"
        >
          {isGeneratingPdf ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <Download className="w-4 h-4 mr-2" />
          )}
          {isGeneratingPdf ? 'Generating PDF...' : 'Download PDF'}
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start mb-20">
        {/* Left Column: Info */}
        <div className="w-full lg:w-[400px] flex-shrink-0 bg-white border border-slate-200 p-8 md:p-10 shadow-sm print:hidden">
          <h2 className="text-3xl font-serif text-slate-900 mb-6">When to use it</h2>
          <p className="text-slate-600 text-sm mb-10 leading-relaxed">
            {template.whenToUse}
          </p>
          <button
            onClick={() => setActiveTab(template.liveTool)}
            className="w-full bg-slate-50 border border-slate-200 text-slate-900 font-bold px-6 py-4 text-sm hover:bg-slate-100 transition-colors"
          >
            Use live {template.liveToolName}
          </button>
        </div>

        {/* Right Column: Preview */}
        <div className="flex-1 w-full bg-slate-200/50 p-6 md:p-10 border border-slate-200 print:p-0 print:border-none print:bg-white overflow-x-auto">
          <div id="template-preview" className="bg-white p-8 md:p-12 shadow-sm min-h-[842px] border border-slate-200 print:shadow-none print:border-none print:min-h-0 print:p-0 min-w-[600px]">
             {template.previewContent}
          </div>
        </div>
      </div>

      <ProFeaturesCTA />
    </div>
  );
}
