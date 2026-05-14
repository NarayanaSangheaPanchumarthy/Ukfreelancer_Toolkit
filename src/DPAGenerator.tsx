import React, { useState } from 'react';
import { Copy, Download, Lock } from 'lucide-react';
import ProFeaturesCTA from './ProFeaturesCTA';

export default function DPAGenerator() {
  const [formData, setFormData] = useState({
    controllerName: 'Customer Ltd',
    controllerAddress: 'Customer registered office',
    processorName: 'Northstar Studio Ltd',
    processorAddress: '1 Practical Lane, London EC1A 1AA',
    effectiveDate: '2026-05-12',
    subjectMatter: 'Processing of personal data necessary for the Processor to provide the Northstar Studio service to the Controller, as set out in the underlying Service Agreement.',
    duration: 'For the term of the Service Agreement and for any period of post-termination assistance required.',
    natureOfProcessing: 'Hosting, storing, transmitting, and processing personal data to deliver the agreed services, including authentication, document storage, support, and analytics.',
    purposeOfProcessing: 'To enable the Controller to use the Service in line with the Service Agreement and provide support and incident response.',
    categoriesOfData: 'Identification data (name, email), contact data, usage data, support correspondence, and any personal data the Controller submits to the Service.',
    dataSubjects: 'Controller\'s employees, contractors, and end customers whose personal data is submitted to the Service.',
    subProcessors: 'AWS (hosting, EU/UK regions), Stripe (payments), Postmark (transactional email), Sentry (error monitoring).',
    securityMeasures: 'Encryption at rest (AES-256) and in transit (TLS 1.2+), least-privilege access controls, MFA on admin accounts, automated backups with 30-day retention, annual penetration testing, and documented incident response plan.',
    breachNotification: 'The Processor will notify the Controller without undue delay and within 72 hours of becoming aware of a personal data breach affecting the Controller\'s data.',
    internationalTransfers: 'Where personal data is transferred outside the UK or EEA, the parties will use the UK International Data Transfer Agreement or applicable Standard Contractual Clauses.',
    auditRights: 'The Controller may audit the Processor\'s compliance once per year on 30 days\' written notice, during business hours, at the Controller\'s cost.',
    returnOrDeletion: 'Upon termination of the Service Agreement, the Processor will, at the Controller\'s choice, return or delete all personal data within 30 days, save where retention is required by law.',
    governingLaw: 'England and Wales',
    controllerSigner: 'Controller Signer',
    controllerTitle: 'Director',
    processorSigner: 'Founder Name',
    processorTitle: 'Director',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const copyText = () => {
    const text = `
DATA PROCESSING AGREEMENT
${formData.controllerName} ↔ ${formData.processorName}
Effective ${formData.effectiveDate} · governed by ${formData.governingLaw}

This Agreement supplements the underlying Service Agreement between ${formData.controllerName} ("Controller") and ${formData.processorName} ("Processor") and sets out the terms on which the Processor processes personal data on behalf of the Controller in accordance with Article 28 of the UK GDPR.

1. Subject matter
${formData.subjectMatter}

2. Duration
${formData.duration}

3. Nature & purpose of processing
${formData.natureOfProcessing}
${formData.purposeOfProcessing}

4. Categories of personal data
${formData.categoriesOfData}

5. Data subjects
${formData.dataSubjects}

6. Sub-processors
The Controller authorises the use of the following sub-processors: ${formData.subProcessors}. The Processor will give the Controller at least 30 days' prior notice of changes and the Controller may object on reasonable grounds.

7. Security measures
${formData.securityMeasures}

8. Personal data breach
${formData.breachNotification}

9. International transfers
${formData.internationalTransfers}

10. Audit rights
${formData.auditRights}

11. Return or deletion
${formData.returnOrDeletion}

12. Governing law
This Agreement is governed by the laws of ${formData.governingLaw}.

Annex A — Processing details
Subject matter: ${formData.subjectMatter}
Duration: ${formData.duration}
Nature & purpose: ${formData.natureOfProcessing} ${formData.purposeOfProcessing}
Data categories: ${formData.categoriesOfData}
Data subjects: ${formData.dataSubjects}

Signed for ${formData.controllerName}
${formData.controllerSigner}, ${formData.controllerTitle}

Signed for ${formData.processorName}
${formData.processorSigner}, ${formData.processorTitle}
    `.trim();
    navigator.clipboard.writeText(text);
    alert('DPA copied to clipboard!');
  };

  const downloadPdf = () => {
    window.print();
  };

  return (
    <div className="bg-slate-50 min-h-screen py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="mb-20">
          <div className="text-[11px] font-bold text-accent uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
            <span className="w-8 h-[1px] bg-accent"></span>
            COMPLIANCE ARCHITECTURE
          </div>
          <h1 className="text-5xl md:text-8xl font-serif text-slate-900 mb-8 tracking-tighter leading-[0.9]">
            Data Processing <br />
            <span className="italic text-accent">Agreement</span> (DPA)
          </h1>
          <p className="text-slate-500 text-xl font-light mb-12 max-w-2xl leading-relaxed">
            Article 28 GDPR-compliant processor agreement covering subject matter, duration, security architectures, and retrieval protocols.
          </p>
          
          <div className="flex flex-wrap gap-4 print:hidden">
            <button 
              onClick={copyText}
              className="bg-white border border-slate-200 text-slate-800 px-10 py-5 font-bold text-[11px] uppercase tracking-widest hover:bg-slate-50 transition-all rounded-2xl shadow-sm flex items-center"
            >
              <Copy className="w-4 h-4 mr-3" />
              Copy Plan
            </button>
            <button 
              onClick={downloadPdf}
              className="bg-slate-900 text-white px-10 py-5 font-bold text-[11px] uppercase tracking-widest hover:bg-black transition-all rounded-2xl shadow-xl flex items-center group"
            >
              <Download className="w-4 h-4 mr-3 text-accent group-hover:scale-110 transition-transform" />
              Export PDF
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-start mb-20">
          {/* Inputs */}
          <div className="w-full lg:w-1/2 space-y-8 print:hidden">
            <div className="bg-white border border-slate-100 p-10 rounded-[2.5rem] shadow-2xl">
              <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-10 text-center">Module Configuration</h3>
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Controller Entity</label>
                  <input 
                    type="text" name="controllerName" value={formData.controllerName} onChange={handleChange}
                    className="w-full bg-slate-50 border border-slate-100 p-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:bg-white rounded-xl text-sm transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Controller Location</label>
                  <textarea 
                    name="controllerAddress" value={formData.controllerAddress} onChange={handleChange} rows={2}
                    className="w-full bg-slate-50 border border-slate-100 p-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:bg-white rounded-xl text-sm transition-all resize-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Processor Entity</label>
                  <input 
                    type="text" name="processorName" value={formData.processorName} onChange={handleChange}
                    className="w-full bg-slate-50 border border-slate-100 p-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:bg-white rounded-xl text-sm transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Processor Location</label>
                  <textarea 
                    name="processorAddress" value={formData.processorAddress} onChange={handleChange} rows={2}
                    className="w-full bg-slate-50 border border-slate-100 p-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:bg-white rounded-xl text-sm transition-all resize-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Active Timestamp</label>
                  <input 
                    type="date" name="effectiveDate" value={formData.effectiveDate} onChange={handleChange}
                    className="w-full bg-slate-50 border border-slate-100 p-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:bg-white rounded-xl text-sm transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Scope of Retrieval</label>
                  <textarea 
                    name="subjectMatter" value={formData.subjectMatter} onChange={handleChange} rows={2}
                    className="w-full bg-slate-50 border border-slate-100 p-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:bg-white rounded-xl text-sm transition-all resize-y"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Security Architecture</label>
                  <textarea 
                    name="securityMeasures" value={formData.securityMeasures} onChange={handleChange} rows={2}
                    className="w-full bg-slate-50 border border-slate-100 p-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:bg-white rounded-xl text-sm transition-all resize-y"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Processor Signer</label>
                    <input 
                      type="text" name="processorSigner" value={formData.processorSigner} onChange={handleChange}
                      className="w-full bg-slate-50 border border-slate-100 p-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:bg-white rounded-xl text-sm transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Processor Title</label>
                    <input 
                      type="text" name="processorTitle" value={formData.processorTitle} onChange={handleChange}
                      className="w-full bg-slate-50 border border-slate-100 p-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:bg-white rounded-xl text-sm transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Preview */}
          <div className="flex-1 w-full relative">
            <div className="lg:sticky lg:top-32 bg-white border border-slate-100 p-12 md:p-20 rounded-[3rem] shadow-2xl relative overflow-hidden print:shadow-none print:border-none print:p-0">
              <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full -translate-y-32 translate-x-32"></div>
              
              <div className="flex justify-between items-start mb-20 relative z-10">
                <div>
                  <div className="text-[11px] font-bold text-accent uppercase tracking-[0.3em] mb-6 flex items-center">
                    <Lock className="w-3.5 h-3.5 mr-2" />
                    PROTOCOL ARTICLE 28
                  </div>
                  <h2 className="text-4xl font-serif text-slate-900 mb-2 tracking-tight line-clamp-1">{formData.controllerName}</h2>
                  <div className="text-accent text-lg font-serif italic">↔ {formData.processorName}</div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] font-bold text-slate-300 uppercase tracking-widest mb-2">LAST MODIFIED</div>
                  <div className="text-slate-900 font-medium font-mono text-xs">{formData.effectiveDate}</div>
                </div>
              </div>

              <div className="space-y-12 text-slate-600 font-light leading-relaxed relative z-10">
                <section>
                  <h4 className="text-[10px] font-bold text-accent uppercase tracking-[0.2em] mb-4">01 foundational basis</h4>
                  <p className="text-sm">
                    This Agreement supplements the underlying Service Agreement between <span className="font-bold text-slate-900">{formData.controllerName}</span> ("Controller") and <span className="font-bold text-slate-900">{formData.processorName}</span> ("Processor") and sets out the terms on which the Processor processes personal data in accordance with Article 28 of the UK GDPR.
                  </p>
                </section>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <section>
                    <h4 className="text-[10px] font-bold text-accent uppercase tracking-[0.2em] mb-4">02 retrieval scope</h4>
                    <p className="text-xs italic border-l border-accent/20 pl-4">{formData.subjectMatter}</p>
                  </section>
                  <section>
                    <h4 className="text-[10px] font-bold text-accent uppercase tracking-[0.2em] mb-4">03 security architecture</h4>
                    <p className="text-xs">{formData.securityMeasures}</p>
                  </section>
                </div>

                <section className="bg-slate-50 p-8 rounded-2xl border border-slate-100">
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-4">04 sub-processors</h4>
                  <p className="text-xs mb-4">{formData.subProcessors}</p>
                  <p className="text-[10px] text-slate-400 font-serif italic">Processor will provide 30 days notice for changes.</p>
                </section>

                <section className="pt-8 border-t border-slate-100">
                  <div className="flex justify-between items-end gap-12">
                    <div className="flex-1 border-b border-slate-900 pb-2">
                       <div className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.2em] mb-2">{formData.controllerName} signer</div>
                       <p className="text-slate-400 font-serif italic">Pending Signature</p>
                    </div>
                    <div className="flex-1 border-b border-slate-900 pb-2">
                       <div className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.2em] mb-2">{formData.processorName} signer</div>
                       <p className="text-slate-900 font-serif italic">{formData.processorSigner}</p>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-20 print:hidden text-center bg-white border border-slate-100 p-16 rounded-[3rem] shadow-sm">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-4xl font-serif text-slate-900 mb-6 tracking-tight">Technical Compliance Protocols</h2>
            <p className="text-slate-500 text-lg font-light leading-relaxed mb-12">
              Our DPA architecture is designed for modern SaaS companies who need rigorous Article 28 compliance without the friction of manual drafting.
            </p>
            <ProFeaturesCTA />
          </div>
        </div>
      </div>
    </div>
  );
}
