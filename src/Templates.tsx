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
    <div className="max-w-6xl mx-auto px-4 md:px-8 py-12 pt-8">
      {/* Header */}
      <div className="mb-12 border-b border-transparent pb-4">
        <div className="text-[10px] font-bold text-[#a67c52] uppercase tracking-widest mb-3">
          DOWNLOAD PAGES
        </div>
        <h1 className="text-4xl md:text-6xl font-serif text-slate-900 mb-6 tracking-tight leading-[1.1]">
          Free UK freelancer<br />templates
        </h1>
        <p className="text-slate-500 text-sm max-w-xl leading-relaxed">
          Download clean document templates or move straight into the live generators when you
          need totals and PDF output.
        </p>
      </div>

      {/* Grid container with top and bottom borders that span the full width */}
      <div className="bg-transparent border-y border-slate-200 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3">
          
          <div 
            onClick={() => setSelectedTemplate('vat-invoice')}
            className="p-8 md:p-10 border-b lg:border-b-0 lg:border-r border-slate-200 cursor-pointer hover:bg-white transition-colors group"
          >
            <div className="text-[10px] font-bold text-[#a67c52] uppercase tracking-widest mb-4">FREE UK VAT INVOICE TEMPLATE</div>
            <h3 className="text-2xl font-serif text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">Free UK VAT Invoice Template</h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              Use this template when you are VAT registered and need VAT shown clearly.
            </p>
          </div>

          <div 
            onClick={() => setSelectedTemplate('quote')}
            className="p-8 md:p-10 border-b lg:border-b-0 lg:border-r border-slate-200 cursor-pointer hover:bg-white transition-colors group"
          >
            <div className="text-[10px] font-bold text-[#a67c52] uppercase tracking-widest mb-4">FREELANCE QUOTE GENERATOR UK</div>
            <h3 className="text-2xl font-serif text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">Free Freelance Quote Template UK</h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              Use this before work starts to confirm scope, pricing, and validity dates.
            </p>
          </div>

          <div 
            onClick={() => setSelectedTemplate('invoice')}
            className="p-8 md:p-10 cursor-pointer hover:bg-white transition-colors group border-b lg:border-b-0"
          >
            <div className="text-[10px] font-bold text-[#a67c52] uppercase tracking-widest mb-4">SELF-EMPLOYED INVOICE TEMPLATE UK</div>
            <h3 className="text-2xl font-serif text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">Self-Employed Invoice Template UK</h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              A clean invoice template for sole traders and independent UK service providers.
            </p>
          </div>
          
          <div 
            onClick={() => setSelectedTemplate('receipt')}
            className="p-8 md:p-10 lg:border-t lg:border-r border-slate-200 cursor-pointer hover:bg-white transition-colors group col-span-1"
          >
            <div className="text-[10px] font-bold text-[#a67c52] uppercase tracking-widest mb-4">RECEIPT GENERATOR UK</div>
            <h3 className="text-2xl font-serif text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">Receipt Template UK</h3>
             <p className="text-slate-500 text-sm leading-relaxed">
              Use this after payment to give clients a concise proof of payment.
            </p>
          </div>
          
        </div>
      </div>
      
      <ProFeaturesCTA />
    </div>
  );
}
