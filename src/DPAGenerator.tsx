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
    <div className="bg-[#f5f7f9] min-h-screen py-12 md:py-16">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        <div className="mb-12">
          <div className="text-[10px] font-bold text-[#a67c52] uppercase tracking-widest mb-4 flex items-center">
            <Lock className="w-3.5 h-3.5 mr-2" />
            COMPLIANCE & LEGAL
          </div>
          <h1 className="text-4xl md:text-5xl font-serif text-slate-900 mb-4 tracking-tight">
            Data Processing Agreement (DPA)
          </h1>
          <p className="text-slate-600 text-lg mb-8 max-w-2xl">
            Article 28 GDPR-style processor agreement covering subject matter, duration, security, sub-processors, breach notification, audits, and data return / deletion. Add as a schedule to your master service agreement.
          </p>
          
          <div className="flex flex-wrap gap-4 print:hidden">
            <button 
              onClick={copyText}
              className="bg-white border border-slate-300 text-slate-800 px-6 py-3 font-bold text-sm hover:bg-slate-50 transition-colors flex items-center shadow-sm"
            >
              <Copy className="w-4 h-4 mr-2" />
              Copy text
            </button>
            <button 
              onClick={downloadPdf}
              className="bg-[#1a1f24] text-white px-6 py-3 font-bold text-sm hover:bg-black transition-colors flex items-center shadow-sm"
            >
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </button>
          </div>
        </div>

        <div className="bg-white border border-slate-200 p-8 shadow-sm mb-12 print:hidden">
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest mb-6">DPA fields</h3>
          
          <div className="mb-6">
            <label className="block text-[10px] font-bold text-slate-800 uppercase tracking-widest mb-2">CONTROLLER NAME</label>
            <input 
              type="text" name="controllerName" value={formData.controllerName} onChange={handleChange}
              className="w-full border border-slate-200 p-3 text-slate-900 focus:outline-none focus:border-blue-500 rounded-none text-sm md:w-1/2"
            />
          </div>

          <div className="mb-6">
            <label className="block text-[10px] font-bold text-slate-800 uppercase tracking-widest mb-2">CONTROLLER ADDRESS</label>
            <textarea 
              name="controllerAddress" value={formData.controllerAddress} onChange={handleChange} rows={2}
              className="w-full border border-slate-200 p-3 text-slate-900 focus:outline-none focus:border-blue-500 rounded-none text-sm resize-none"
            />
          </div>

          <div className="mb-6">
            <label className="block text-[10px] font-bold text-slate-800 uppercase tracking-widest mb-2">PROCESSOR NAME</label>
            <input 
              type="text" name="processorName" value={formData.processorName} onChange={handleChange}
              className="w-full border border-slate-200 p-3 text-slate-900 focus:outline-none focus:border-blue-500 rounded-none text-sm md:w-1/2"
            />
          </div>

          <div className="mb-6">
            <label className="block text-[10px] font-bold text-slate-800 uppercase tracking-widest mb-2">PROCESSOR ADDRESS</label>
            <textarea 
              name="processorAddress" value={formData.processorAddress} onChange={handleChange} rows={2}
              className="w-full border border-slate-200 p-3 text-slate-900 focus:outline-none focus:border-blue-500 rounded-none text-sm resize-none"
            />
          </div>

          <div className="mb-6">
            <label className="block text-[10px] font-bold text-slate-800 uppercase tracking-widest mb-2">EFFECTIVE DATE</label>
            <input 
              type="date" name="effectiveDate" value={formData.effectiveDate} onChange={handleChange}
              className="w-full border border-slate-200 p-3 text-slate-900 focus:outline-none focus:border-blue-500 rounded-none text-sm md:w-1/2"
            />
          </div>

          <div className="mb-6">
            <label className="block text-[10px] font-bold text-slate-800 uppercase tracking-widest mb-2">SUBJECT MATTER</label>
            <textarea 
              name="subjectMatter" value={formData.subjectMatter} onChange={handleChange} rows={2}
              className="w-full border border-slate-200 p-3 text-slate-900 focus:outline-none focus:border-blue-500 rounded-none text-sm resize-y"
            />
          </div>

          <div className="mb-6">
            <label className="block text-[10px] font-bold text-slate-800 uppercase tracking-widest mb-2">DURATION</label>
            <textarea 
              name="duration" value={formData.duration} onChange={handleChange} rows={2}
              className="w-full border border-slate-200 p-3 text-slate-900 focus:outline-none focus:border-blue-500 rounded-none text-sm resize-y"
            />
          </div>

          <div className="mb-6">
            <label className="block text-[10px] font-bold text-slate-800 uppercase tracking-widest mb-2">NATURE OF PROCESSING</label>
            <textarea 
              name="natureOfProcessing" value={formData.natureOfProcessing} onChange={handleChange} rows={2}
              className="w-full border border-slate-200 p-3 text-slate-900 focus:outline-none focus:border-blue-500 rounded-none text-sm resize-y"
            />
          </div>

          <div className="mb-6">
            <label className="block text-[10px] font-bold text-slate-800 uppercase tracking-widest mb-2">PURPOSE OF PROCESSING</label>
            <textarea 
              name="purposeOfProcessing" value={formData.purposeOfProcessing} onChange={handleChange} rows={2}
              className="w-full border border-slate-200 p-3 text-slate-900 focus:outline-none focus:border-blue-500 rounded-none text-sm resize-y"
            />
          </div>

          <div className="mb-6">
            <label className="block text-[10px] font-bold text-slate-800 uppercase tracking-widest mb-2">CATEGORIES OF PERSONAL DATA</label>
            <textarea 
              name="categoriesOfData" value={formData.categoriesOfData} onChange={handleChange} rows={2}
              className="w-full border border-slate-200 p-3 text-slate-900 focus:outline-none focus:border-blue-500 rounded-none text-sm resize-y"
            />
          </div>

          <div className="mb-6">
            <label className="block text-[10px] font-bold text-slate-800 uppercase tracking-widest mb-2">DATA SUBJECTS</label>
            <textarea 
              name="dataSubjects" value={formData.dataSubjects} onChange={handleChange} rows={2}
              className="w-full border border-slate-200 p-3 text-slate-900 focus:outline-none focus:border-blue-500 rounded-none text-sm resize-y"
            />
          </div>

          <div className="mb-6">
            <label className="block text-[10px] font-bold text-slate-800 uppercase tracking-widest mb-2">APPROVED SUB-PROCESSORS</label>
            <textarea 
              name="subProcessors" value={formData.subProcessors} onChange={handleChange} rows={2}
              className="w-full border border-slate-200 p-3 text-slate-900 focus:outline-none focus:border-blue-500 rounded-none text-sm resize-y"
            />
          </div>

          <div className="mb-6">
            <label className="block text-[10px] font-bold text-slate-800 uppercase tracking-widest mb-2">SECURITY MEASURES</label>
            <textarea 
              name="securityMeasures" value={formData.securityMeasures} onChange={handleChange} rows={2}
              className="w-full border border-slate-200 p-3 text-slate-900 focus:outline-none focus:border-blue-500 rounded-none text-sm resize-y"
            />
          </div>

          <div className="mb-6">
            <label className="block text-[10px] font-bold text-slate-800 uppercase tracking-widest mb-2">BREACH NOTIFICATION</label>
            <textarea 
              name="breachNotification" value={formData.breachNotification} onChange={handleChange} rows={2}
              className="w-full border border-slate-200 p-3 text-slate-900 focus:outline-none focus:border-blue-500 rounded-none text-sm resize-y"
            />
          </div>

          <div className="mb-6">
            <label className="block text-[10px] font-bold text-slate-800 uppercase tracking-widest mb-2">INTERNATIONAL TRANSFERS</label>
            <textarea 
              name="internationalTransfers" value={formData.internationalTransfers} onChange={handleChange} rows={2}
              className="w-full border border-slate-200 p-3 text-slate-900 focus:outline-none focus:border-blue-500 rounded-none text-sm resize-y"
            />
          </div>

          <div className="mb-6">
            <label className="block text-[10px] font-bold text-slate-800 uppercase tracking-widest mb-2">AUDIT RIGHTS</label>
            <textarea 
              name="auditRights" value={formData.auditRights} onChange={handleChange} rows={2}
              className="w-full border border-slate-200 p-3 text-slate-900 focus:outline-none focus:border-blue-500 rounded-none text-sm resize-y"
            />
          </div>

          <div className="mb-6">
            <label className="block text-[10px] font-bold text-slate-800 uppercase tracking-widest mb-2">RETURN OR DELETION</label>
            <textarea 
              name="returnOrDeletion" value={formData.returnOrDeletion} onChange={handleChange} rows={2}
              className="w-full border border-slate-200 p-3 text-slate-900 focus:outline-none focus:border-blue-500 rounded-none text-sm resize-y"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-[10px] font-bold text-slate-800 uppercase tracking-widest mb-2">GOVERNING LAW</label>
              <input 
                type="text" name="governingLaw" value={formData.governingLaw} onChange={handleChange}
                className="w-full border border-slate-200 p-3 text-slate-900 focus:outline-none focus:border-blue-500 rounded-none text-sm"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-800 uppercase tracking-widest mb-2">CONTROLLER SIGNER</label>
              <input 
                type="text" name="controllerSigner" value={formData.controllerSigner} onChange={handleChange}
                className="w-full border border-slate-200 p-3 text-slate-900 focus:outline-none focus:border-blue-500 rounded-none text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-[10px] font-bold text-slate-800 uppercase tracking-widest mb-2">CONTROLLER TITLE</label>
              <input 
                type="text" name="controllerTitle" value={formData.controllerTitle} onChange={handleChange}
                className="w-full border border-slate-200 p-3 text-slate-900 focus:outline-none focus:border-blue-500 rounded-none text-sm"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-800 uppercase tracking-widest mb-2">PROCESSOR SIGNER</label>
              <input 
                type="text" name="processorSigner" value={formData.processorSigner} onChange={handleChange}
                className="w-full border border-slate-200 p-3 text-slate-900 focus:outline-none focus:border-blue-500 rounded-none text-sm"
              />
            </div>
          </div>

          <div className="md:w-1/2 pr-3">
             <label className="block text-[10px] font-bold text-slate-800 uppercase tracking-widest mb-2">PROCESSOR TITLE</label>
              <input 
                type="text" name="processorTitle" value={formData.processorTitle} onChange={handleChange}
                className="w-full border border-slate-200 p-3 text-slate-900 focus:outline-none focus:border-blue-500 rounded-none text-sm"
              />
          </div>
        </div>

        <div>
          <h3 className="text-slate-600 font-medium mb-4 print:hidden">DPA preview</h3>
          
          <div className="bg-white border border-slate-200 p-10 md:p-12 shadow-sm print:shadow-none print:border-none print:p-0">
            <div className="text-[10px] font-bold text-[#a67c52] uppercase tracking-widest mb-4">DATA PROCESSING AGREEMENT</div>
            <h2 className="text-3xl font-serif text-slate-900 mb-4">{formData.controllerName} ↔ {formData.processorName}</h2>
            <p className="text-sm text-slate-500 mb-8 pb-8">
              Effective {formData.effectiveDate} · governed by {formData.governingLaw}
            </p>

            <div className="space-y-6 text-sm text-slate-800 leading-relaxed max-w-3xl">
              <p>
                This Agreement supplements the underlying Service Agreement between <strong>{formData.controllerName}</strong> ("Controller") and <strong>{formData.processorName}</strong> ("Processor") and sets out the terms on which the Processor processes personal data on behalf of the Controller in accordance with Article 28 of the UK GDPR.
              </p>

              <div>
                <h4 className="font-semibold text-slate-900 mb-2 mt-4 text-base">1. Subject matter</h4>
                <p>{formData.subjectMatter}</p>
              </div>

              <div>
                <h4 className="font-semibold text-slate-900 mb-2 mt-4 text-base">2. Duration</h4>
                <p>{formData.duration}</p>
              </div>

              <div>
                <h4 className="font-semibold text-slate-900 mb-2 mt-4 text-base">3. Nature & purpose of processing</h4>
                <p>{formData.natureOfProcessing}</p>
                <p className="mt-2">{formData.purposeOfProcessing}</p>
              </div>

              <div>
                <h4 className="font-semibold text-slate-900 mb-2 mt-4 text-base">4. Categories of personal data</h4>
                <p>{formData.categoriesOfData}</p>
              </div>

              <div>
                <h4 className="font-semibold text-slate-900 mb-2 mt-4 text-base">5. Data subjects</h4>
                <p>{formData.dataSubjects}</p>
              </div>

              <div>
                <h4 className="font-semibold text-slate-900 mb-2 mt-4 text-base">6. Sub-processors</h4>
                <p>
                  The Controller authorises the use of the following sub-processors: {formData.subProcessors}. The Processor will give the Controller at least 30 days' prior notice of changes and the Controller may object on reasonable grounds.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-slate-900 mb-2 mt-4 text-base">7. Security measures</h4>
                <p>{formData.securityMeasures}</p>
              </div>

              <div>
                <h4 className="font-semibold text-slate-900 mb-2 mt-4 text-base">8. Personal data breach</h4>
                <p>{formData.breachNotification}</p>
              </div>

              <div>
                <h4 className="font-semibold text-slate-900 mb-2 mt-4 text-base">9. International transfers</h4>
                <p>{formData.internationalTransfers}</p>
              </div>

              <div>
                <h4 className="font-semibold text-slate-900 mb-2 mt-4 text-base">10. Audit rights</h4>
                <p>{formData.auditRights}</p>
              </div>

              <div>
                <h4 className="font-semibold text-slate-900 mb-2 mt-4 text-base">11. Return or deletion</h4>
                <p>{formData.returnOrDeletion}</p>
              </div>

              <div>
                <h4 className="font-semibold text-slate-900 mb-2 mt-4 text-base">12. Governing law</h4>
                <p>This Agreement is governed by the laws of {formData.governingLaw}.</p>
              </div>

              <div className="pt-8 mt-8 border-t border-slate-200">
                 <h4 className="font-semibold text-slate-900 mb-4 text-base">Annex A — Processing details</h4>
                 <p className="mb-2"><strong className="text-slate-900">Subject matter:</strong> {formData.subjectMatter}</p>
                 <p className="mb-2"><strong className="text-slate-900">Duration:</strong> {formData.duration}</p>
                 <p className="mb-2"><strong className="text-slate-900">Nature & purpose:</strong> {formData.natureOfProcessing} {formData.purposeOfProcessing}</p>
                 <p className="mb-2"><strong className="text-slate-900">Data categories:</strong> {formData.categoriesOfData}</p>
                 <p className="mb-2"><strong className="text-slate-900">Data subjects:</strong> {formData.dataSubjects}</p>
              </div>

              <div className="grid grid-cols-2 gap-12 pt-12 mt-12 mb-8">
                <div>
                   <h5 className="font-semibold text-slate-900 mb-4 text-sm border-b border-slate-900 pb-2 border-solid w-full">Signed for {formData.controllerName}</h5>
                   <p className="text-sm mt-2">{formData.controllerSigner}, {formData.controllerTitle}</p>
                </div>
                <div>
                   <h5 className="font-semibold text-slate-900 mb-4 text-sm border-b border-slate-900 pb-2 border-solid w-full">Signed for {formData.processorName}</h5>
                   <p className="text-sm mt-2">{formData.processorSigner}, {formData.processorTitle}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-16 print:hidden">
            <ProFeaturesCTA />
        </div>
      </div>
    </div>
  );
}
