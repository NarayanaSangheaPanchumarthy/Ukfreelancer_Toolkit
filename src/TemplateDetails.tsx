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
    <div className="bg-[#fcfdfd] min-h-screen py-20 md:py-24">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-12 pb-12 border-b border-slate-100">
          <div>
            <button 
              onClick={onBack}
              className="text-[10px] font-bold text-accent uppercase tracking-widest mb-8 flex items-center gap-2 hover:opacity-70 transition-opacity"
            >
              <span className="w-6 h-[1px] bg-accent/30"></span>
              Back to blueprints
            </button>
            <div className="text-[11px] font-bold text-accent uppercase tracking-[0.4em] mb-6 flex items-center gap-2">
              <span className="w-8 h-[1px] bg-accent/30"></span>
              {template.tag}
            </div>
            <h1 className="text-5xl md:text-7xl font-serif text-slate-900 mb-8 tracking-tighter leading-[0.95]">
              {template.title.split(' ').map((word, i) => i === template.title.split(' ').length - 1 ? <span key={i} className="italic text-accent">{word}</span> : word + ' ')}
            </h1>
            <p className="text-slate-500 text-xl font-light max-w-2xl leading-relaxed">
              {template.description}
            </p>
          </div>
          <button 
            onClick={handleDownload}
            disabled={isGeneratingPdf}
            className="group bg-slate-900 text-white px-10 py-5 font-bold text-[11px] uppercase tracking-[0.2em] rounded-2xl hover:bg-accent transition-all shadow-2xl flex items-center gap-3 shrink-0 disabled:opacity-70"
          >
            {isGeneratingPdf ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Download className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
            )}
            {isGeneratingPdf ? 'Synthesizing...' : 'Export Blueprint'}
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-16 items-start mb-24">
          {/* Left Column: Info */}
          <div className="w-full lg:w-[450px] flex-shrink-0 bg-white border border-slate-100 p-12 rounded-[3.5rem] shadow-xl print:hidden relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-48 h-48 bg-accent/5 rounded-full -translate-y-24 translate-x-24 blur-3xl group-hover:bg-accent/10 transition-all duration-1000"></div>
            
            <div className="text-[11px] font-bold text-accent uppercase tracking-[0.3em] mb-6 relative z-10 flex items-center gap-3">
              CONTEXT
              <span className="w-12 h-[1px] bg-accent/20"></span>
            </div>
            <h2 className="text-3xl font-serif text-slate-900 mb-8 italic relative z-10">Application Guide</h2>
            <p className="text-slate-500 text-lg font-light leading-relaxed mb-12 relative z-10">
              {template.whenToUse}
            </p>
            <button
              onClick={() => setActiveTab(template.liveTool)}
              className="w-full bg-slate-50 border border-slate-100 text-slate-900 font-bold px-8 py-5 rounded-2xl text-[11px] uppercase tracking-[0.2em] hover:bg-slate-900 hover:text-white transition-all shadow-sm relative z-10"
            >
              Transition to Live {template.liveToolName}
            </button>
          </div>

          {/* Right Column: Preview */}
          <div className="flex-1 w-full bg-slate-50 p-6 md:p-16 rounded-[4rem] border border-slate-100 shadow-sm print:p-0 print:border-none print:bg-white overflow-x-auto relative">
             <div className="absolute top-6 left-16 text-[9px] font-bold text-slate-300 uppercase tracking-widest print:hidden">
              Blueprint Interface Preview
            </div>
            <div id="template-preview" className="bg-white p-12 md:p-24 shadow-2xl min-h-[842px] border border-slate-50 rounded-lg print:shadow-none print:border-none print:min-h-0 print:p-0 min-w-[700px] mt-8">
               {template.previewContent}
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <ProFeaturesCTA />
        </div>
      </div>
    </div>
  );
}
