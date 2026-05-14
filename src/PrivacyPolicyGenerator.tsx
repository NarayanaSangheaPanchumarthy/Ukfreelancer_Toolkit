import React, { useState } from 'react';
import { Copy, Download } from 'lucide-react';
import ProFeaturesCTA from './ProFeaturesCTA';

export default function PrivacyPolicyGenerator() {
  const [formData, setFormData] = useState({
    brandName: 'Northstar Studio',
    websiteUrl: 'https://northstar.example.co.uk',
    legalName: 'Northstar Studio Ltd',
    companiesHouseNo: '12345678',
    address: '1 Practical Lane, London EC1A 1AA',
    email: 'privacy@example.co.uk',
    dpoStatus: 'Not appointed (no statutory requirement)',
    effectiveDate: '2026-05-12',
    dataWeCollect: 'Name, email, billing address, payment details (processed via Stripe), IP address, browser metadata, and any content you submit through forms.',
    purposes: 'To deliver the service you have asked for, manage your account, take payment, send transactional emails, respond to support requests, and (with consent) send marketing communications.',
    lawfulBases: 'Contract performance for service delivery; legitimate interests for security, analytics, and product improvement; consent for marketing emails and non-essential cookies; legal obligation for tax and accounting records.',
    recipients: 'Stripe (payments), Postmark (transactional email), AWS (hosting), our accountants, and HMRC where legally required.',
    internationalTransfers: 'Where personal data is transferred outside the UK or EEA, we rely on UK International Data Transfer Agreements or adequacy decisions to protect your data.',
    retention: 'Account data: for the life of your account plus 6 years for tax records. Marketing: until you unsubscribe. Support tickets: 24 months after closure.',
    rights: 'Access, rectification, erasure, restriction, objection, portability, and the right to withdraw consent. To exercise rights, contact us at the email above. You may also complain to the ICO at ico.org.uk.',
    cookies: 'We use essential cookies to deliver the site and, with consent, analytics cookies. See our Cookie Policy for details.',
    childrenData: 'Our services are not directed at children under 13 and we do not knowingly collect their data.',
    changes: 'We may update this notice. Material changes will be communicated by email or prominent notice at least 14 days before they take effect.'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const copyText = () => {
    const text = `
Privacy Policy
Effective ${formData.effectiveDate} · ${formData.websiteUrl}

1. Who we are
${formData.legalName} (${formData.companiesHouseNo ? `Companies House no. ${formData.companiesHouseNo}` : ''}) of ${formData.address.replace(/\n/g, ', ')} is the data controller responsible for your personal data. Contact: ${formData.email}.
Data Protection Officer: ${formData.dpoStatus}

2. What data we collect
${formData.dataWeCollect}

3. Why we process it
${formData.purposes}

4. Lawful bases
${formData.lawfulBases}

5. Who we share it with
${formData.recipients}

6. International transfers
${formData.internationalTransfers}

7. How long we keep it
${formData.retention}

8. Your rights
${formData.rights}

9. Cookies
${formData.cookies}

10. Children
${formData.childrenData}

11. Changes
${formData.changes}
    `.trim();
    navigator.clipboard.writeText(text);
    alert('Privacy Policy copied to clipboard!');
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
            LEGAL ARCHITECTURE
          </div>
          <h1 className="text-5xl md:text-8xl font-serif text-slate-900 mb-8 tracking-tighter leading-[0.9]">
            Privacy <span className="italic text-accent">Notice</span> Engine
          </h1>
          <p className="text-slate-500 text-xl font-light mb-12 max-w-2xl leading-relaxed">
            UK GDPR-compliant privacy notice covering data controllership, processing purposes, and lawful bases for the digital standard.
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
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="space-y-2">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Brand Identity</label>
                  <input 
                    type="text" name="brandName" value={formData.brandName} onChange={handleChange}
                    className="w-full bg-slate-50 border border-slate-100 p-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:bg-white rounded-xl text-sm transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Digital Domain</label>
                  <input 
                    type="text" name="websiteUrl" value={formData.websiteUrl} onChange={handleChange}
                    className="w-full bg-slate-50 border border-slate-100 p-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:bg-white rounded-xl text-sm transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="space-y-2">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Legal Entity</label>
                  <input 
                    type="text" name="legalName" value={formData.legalName} onChange={handleChange}
                    className="w-full bg-slate-50 border border-slate-100 p-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:bg-white rounded-xl text-sm transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Registry No.</label>
                  <input 
                    type="text" name="companiesHouseNo" value={formData.companiesHouseNo} onChange={handleChange}
                    className="w-full bg-slate-50 border border-slate-100 p-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:bg-white rounded-xl text-sm transition-all"
                  />
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Controller Location</label>
                  <textarea 
                    name="address" value={formData.address} onChange={handleChange} rows={2}
                    className="w-full bg-slate-50 border border-slate-100 p-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:bg-white rounded-xl text-sm transition-all resize-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Privacy Channel</label>
                  <input 
                    type="text" name="email" value={formData.email} onChange={handleChange}
                    className="w-full bg-slate-50 border border-slate-100 p-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:bg-white rounded-xl text-sm transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Data protection Officer</label>
                  <textarea 
                    name="dpoStatus" value={formData.dpoStatus} onChange={handleChange} rows={2}
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
                    name="dataWeCollect" value={formData.dataWeCollect} onChange={handleChange} rows={3}
                    className="w-full bg-slate-50 border border-slate-100 p-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:bg-white rounded-xl text-sm transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Processing Intent</label>
                  <textarea 
                    name="purposes" value={formData.purposes} onChange={handleChange} rows={3}
                    className="w-full bg-slate-50 border border-slate-100 p-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:bg-white rounded-xl text-sm transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Regulatory Basis</label>
                  <textarea 
                    name="lawfulBases" value={formData.lawfulBases} onChange={handleChange} rows={3}
                    className="w-full bg-slate-50 border border-slate-100 p-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:bg-white rounded-xl text-sm transition-all"
                  />
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
                  <div className="text-[11px] font-bold text-accent uppercase tracking-[0.3em] mb-6">OFFICIAL DOCUMENT</div>
                  <h2 className="text-4xl font-serif text-slate-900 mb-2 tracking-tight">{formData.brandName}</h2>
                  <p className="text-slate-400 font-serif italic text-lg">Privacy Policy</p>
                </div>
                <div className="text-right">
                  <div className="text-[10px] font-bold text-slate-300 uppercase tracking-widest mb-2">LAST MODIFIED</div>
                  <div className="text-slate-900 font-medium font-mono text-xs">{formData.effectiveDate}</div>
                </div>
              </div>

              <div className="space-y-12 text-slate-600 font-light leading-relaxed relative z-10">
                <section>
                  <h4 className="text-[10px] font-bold text-accent uppercase tracking-[0.2em] mb-4">01 controllership</h4>
                  <p className="text-sm">
                    <span className="font-bold text-slate-900">{formData.legalName}</span> {formData.companiesHouseNo && `(Companies House no. ${formData.companiesHouseNo})`} of {formData.address.replace(/\n/g, ', ')} is the data controller responsible for your personal data. 
                  </p>
                  <div className="mt-4 p-4 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-4">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Inquiries</div>
                    <div className="text-slate-900 font-mono text-xs">{formData.email}</div>
                  </div>
                </section>

                <section>
                  <h4 className="text-[10px] font-bold text-accent uppercase tracking-[0.2em] mb-4">02 retrieval scope</h4>
                  <p className="text-sm italic border-l-2 border-accent/20 pl-6">{formData.dataWeCollect}</p>
                </section>

                <section>
                  <h4 className="text-[10px] font-bold text-accent uppercase tracking-[0.2em] mb-4">03 intentionality</h4>
                  <p className="text-sm">{formData.purposes}</p>
                </section>

                <section className="pt-8 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.2em] mb-4">Jurisdiction</h4>
                    <p className="text-xs">United Kingdom · UK GDPR · PECR</p>
                  </div>
                  <div className="text-right">
                    <h4 className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.2em] mb-4">Authorization</h4>
                    <p className="text-slate-400 font-serif italic">Verified Architecture</p>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-20 print:hidden text-center bg-white border border-slate-100 p-16 rounded-[3rem] shadow-sm">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-4xl font-serif text-slate-900 mb-6 tracking-tight">Enterprise Standard Compliance</h2>
            <p className="text-slate-500 text-lg font-light leading-relaxed mb-12">
              Our generators are built for UK professionals who need to meet GDPR standards without the overhead of expensive legal retainers.
            </p>
            <ProFeaturesCTA />
          </div>
        </div>
      </div>
    </div>
  );
}
