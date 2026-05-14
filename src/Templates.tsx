import React, { useState } from 'react';
import ProFeaturesCTA from './ProFeaturesCTA';
import TemplateDetails from './TemplateDetails';
import { templatesData } from './templatesData';

interface TemplatesProps {
  setActiveTab: (tab: string) => void;
}

export default function Templates({ setActiveTab }: TemplatesProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  if (selectedTemplate && templatesData[selectedTemplate]) {
    return (
      <TemplateDetails
        template={templatesData[selectedTemplate]}
        setActiveTab={setActiveTab}
        onBack={() => setSelectedTemplate(null)}
      />
    );
  }

  return (
    <div className="bg-[#fcfdfd] min-h-screen py-20 md:py-24">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="mb-20">
          <div className="text-[11px] font-bold text-accent uppercase tracking-[0.4em] mb-6 flex items-center gap-2">
            <span className="w-8 h-[1px] bg-accent/30"></span>
            STATIC ASSETS
          </div>
          <h1 className="text-5xl md:text-8xl font-serif text-slate-900 mb-8 tracking-tighter leading-[0.95]">
            Freelancer <span className="italic text-accent">Templates</span> UK.
          </h1>
          <p className="text-slate-500 text-xl font-light max-w-2xl leading-relaxed">
            Download high-fidelity document blueprints for immediate deployment or transition to live synthesis tools for automated logic.
          </p>
        </div>

        {/* Grid container */}
        <div className="bg-white border border-slate-100 rounded-[3rem] shadow-xl overflow-hidden mb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-100">
            
            <div 
              onClick={() => setSelectedTemplate('vat-invoice')}
              className="p-12 cursor-pointer hover:bg-slate-50 transition-all group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-accent/5 rounded-full -translate-y-12 translate-x-12 blur-2xl group-hover:bg-accent/10 transition-all duration-700"></div>
              <div className="text-[10px] font-bold text-accent uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                <span className="w-4 h-[1px] bg-accent/30"></span>
                FISCAL EXCISE
              </div>
              <h3 className="text-2xl font-serif text-slate-900 mb-4 group-hover:italic transition-all">UK VAT Invoice Blueprint</h3>
              <p className="text-slate-500 text-sm leading-relaxed font-light">
                Required for VAT-registered entities seeking precise excise documentation and deduction clarity.
              </p>
            </div>

            <div 
              onClick={() => setSelectedTemplate('quote')}
              className="p-12 cursor-pointer hover:bg-slate-50 transition-all group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-accent/5 rounded-full -translate-y-12 translate-x-12 blur-2xl group-hover:bg-accent/10 transition-all duration-700"></div>
              <div className="text-[10px] font-bold text-accent uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                <span className="w-4 h-[1px] bg-accent/30"></span>
                PROPOSAL VECTOR
              </div>
              <h3 className="text-2xl font-serif text-slate-900 mb-4 group-hover:italic transition-all">Freelance Quote Blueprint</h3>
              <p className="text-slate-500 text-sm leading-relaxed font-light">
                Formalize scope, pricing vectors, and temporal validity prior to initiation of service protocols.
              </p>
            </div>

            <div 
              onClick={() => setSelectedTemplate('invoice')}
              className="p-12 cursor-pointer hover:bg-slate-50 transition-all group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-accent/5 rounded-full -translate-y-12 translate-x-12 blur-2xl group-hover:bg-accent/10 transition-all duration-700"></div>
              <div className="text-[10px] font-bold text-accent uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                <span className="w-4 h-[1px] bg-accent/30"></span>
                INDEPENDENT BILLING
              </div>
              <h3 className="text-2xl font-serif text-slate-900 mb-4 group-hover:italic transition-all">Self-Employed Blueprint</h3>
              <p className="text-slate-500 text-sm leading-relaxed font-light">
                A high-integrity billing blueprint for sole traders and systemic service providers within the UK.
              </p>
            </div>
            
            <div 
              onClick={() => setSelectedTemplate('receipt')}
              className="p-12 cursor-pointer hover:bg-slate-50 transition-all group relative overflow-hidden md:border-t border-slate-100"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-accent/5 rounded-full -translate-y-12 translate-x-12 blur-2xl group-hover:bg-accent/10 transition-all duration-700"></div>
              <div className="text-[10px] font-bold text-accent uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                <span className="w-4 h-[1px] bg-accent/30"></span>
                VERIFICATION DATA
              </div>
              <h3 className="text-2xl font-serif text-slate-900 mb-4 group-hover:italic transition-all">Receipt Protocol Blueprint</h3>
               <p className="text-slate-500 text-sm leading-relaxed font-light">
                Validated proof of capital transfer for client reconciliation and internal audit trails.
              </p>
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
