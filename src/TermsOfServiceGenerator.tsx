import React, { useState } from 'react';
import { Copy, Download, Scale } from 'lucide-react';
import ProFeaturesCTA from './ProFeaturesCTA';

export default function TermsOfServiceGenerator() {
  const [formData, setFormData] = useState({
    companyName: 'Northstar Studio Ltd',
    companiesHouseNo: '12345678',
    companyAddress: '1 Practical Lane, London EC1A 1AA',
    websiteUrl: 'https://northstar.example.co.uk',
    supportEmail: 'hello@example.co.uk',
    effectiveDate: '2026-05-12',
    serviceDescription: 'Northstar Studio provides web-based business planning, document generation, and template tools to small businesses and freelancers in the United Kingdom.',
    acceptanceClause: 'By accessing or using the Service you agree to these Terms. If you do not agree, do not use the Service.',
    accountTerms: 'You must provide accurate registration details, keep your password confidential, and notify us of any unauthorised account use. You are responsible for all activity under your account.',
    paymentTerms: 'Paid plans are billed monthly or annually in advance. We do not refund partial months unless required by UK consumer law. Prices may change with 30 days\' written notice for ongoing plans.',
    intellectualProperty: 'All Service content, software, branding, and templates are owned by Northstar Studio Ltd or its licensors. You retain ownership of content you submit, but grant us a non-exclusive licence to host and display it for the purpose of delivering the Service.',
    acceptableUse: 'You must not use the Service to break the law, infringe rights, distribute malware, scrape automated content, or interfere with the Service\'s operation.',
    termination: 'We may suspend or terminate your account for material breach with reasonable notice. You may cancel anytime; we\'ll close your account at the end of the paid period.',
    liability: 'To the fullest extent permitted by law, our total liability is capped at the fees you paid in the 12 months before the claim. We exclude indirect and consequential losses. Nothing limits liability for death, personal injury caused by negligence, or fraud.',
    warranties: 'The Service is provided \'as is\'. We do not guarantee uninterrupted or error-free operation but will use reasonable care to maintain availability.',
    indemnity: 'You agree to indemnify us against third-party claims arising from your unlawful use of the Service or breach of these Terms.',
    governingLaw: 'These Terms are governed by the laws of England and Wales. Disputes are subject to the exclusive jurisdiction of the courts of England and Wales.',
    notices: 'Notices may be sent to the contact email above. We may update these Terms from time to time; material changes will be communicated at least 14 days before they take effect.'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const copyText = () => {
    const text = `
TERMS OF SERVICE
${formData.companyName} Terms of Service
Effective ${formData.effectiveDate} · ${formData.websiteUrl}

1. The Service
${formData.serviceDescription}

2. Acceptance
${formData.acceptanceClause}

3. Accounts
${formData.accountTerms}

4. Fees & payment
${formData.paymentTerms}

5. Intellectual property
${formData.intellectualProperty}

6. Acceptable use
${formData.acceptableUse}

7. Termination
${formData.termination}

8. Warranties & disclaimers
${formData.warranties}

9. Liability
${formData.liability}

10. Indemnity
${formData.indemnity}

11. Governing law & jurisdiction
${formData.governingLaw}

12. Notices & changes
${formData.notices}

Contact: ${formData.supportEmail} · ${formData.companyName}${formData.companiesHouseNo ? `, company no. ${formData.companiesHouseNo}` : ''}, ${formData.companyAddress.replace(/\n/g, ', ')}
    `.trim();
    navigator.clipboard.writeText(text);
    alert('Terms of Service copied to clipboard!');
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
            GOVERNANCE FRAMEWORK
          </div>
          <h1 className="text-5xl md:text-8xl font-serif text-slate-900 mb-8 tracking-tighter leading-[0.9]">
            Terms of <span className="italic text-accent">Service</span> Builder
          </h1>
          <p className="text-slate-500 text-xl font-light mb-12 max-w-2xl leading-relaxed">
            Scalable legal frameworks for UK SaaS and digital entities. Covering liability, IP ownership, and operational standards with precision.
          </p>
          
          <div className="flex flex-wrap gap-4 print:hidden">
            <button 
              onClick={copyText}
              className="bg-white border border-slate-200 text-slate-800 px-10 py-5 font-bold text-[11px] uppercase tracking-widest hover:bg-slate-50 transition-all rounded-2xl shadow-sm flex items-center"
            >
              <Copy className="w-4 h-4 mr-3" />
              Copy Terms
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

        <div className="bg-white border border-slate-100 p-10 md:p-16 rounded-[3rem] shadow-2xl mb-20 print:hidden overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full -translate-y-32 translate-x-32"></div>
          
          <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-12 text-center relative z-10">Entity Configuration</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10 relative z-10">
            <div className="space-y-2">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Legal Entity Name</label>
              <input 
                type="text" name="companyName" value={formData.companyName} onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-100 p-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:bg-white rounded-xl text-sm transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Companies House No.</label>
              <input 
                type="text" name="companiesHouseNo" value={formData.companiesHouseNo} onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-100 p-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:bg-white rounded-xl text-sm transition-all"
              />
            </div>
          </div>

          <div className="mb-10 relative z-10">
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 ml-1">Registered Office</label>
            <textarea 
              name="companyAddress" value={formData.companyAddress} onChange={handleChange} rows={2}
              className="w-full bg-slate-50 border border-slate-100 p-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:bg-white rounded-xl text-sm transition-all resize-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10 relative z-10">
            <div className="space-y-2">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Digital Domain</label>
              <input 
                type="text" name="websiteUrl" value={formData.websiteUrl} onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-100 p-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:bg-white rounded-xl text-sm transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Support Channel</label>
              <input 
                type="text" name="supportEmail" value={formData.supportEmail} onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-100 p-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:bg-white rounded-xl text-sm transition-all"
              />
            </div>
          </div>

          <div className="mb-12 border-b border-slate-100 pb-12 relative z-10">
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 ml-1">Active Timestamp</label>
            <input 
              type="date" name="effectiveDate" value={formData.effectiveDate} onChange={handleChange}
              className="w-full bg-slate-50 border border-slate-100 p-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:bg-white rounded-xl text-sm transition-all md:w-1/2"
            />
          </div>

          <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-10 relative z-10">Clause Specification</h3>

          <div className="space-y-8 relative z-10">
            <div className="space-y-3">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                <span className="w-4 h-[1px] bg-accent/30"></span> Operational Scope
              </label>
              <textarea 
                name="serviceDescription" value={formData.serviceDescription} onChange={handleChange} rows={2}
                className="w-full bg-slate-50 border border-slate-100 p-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:bg-white rounded-xl text-sm transition-all resize-none"
              />
            </div>

            <div className="space-y-3">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                <span className="w-4 h-[1px] bg-accent/30"></span> Acceptance Protocol
              </label>
              <textarea 
                name="acceptanceClause" value={formData.acceptanceClause} onChange={handleChange} rows={2}
                className="w-full bg-slate-50 border border-slate-100 p-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:bg-white rounded-xl text-sm transition-all resize-none"
              />
            </div>

            <div className="space-y-3">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                <span className="w-4 h-[1px] bg-accent/30"></span> Account Integrity
              </label>
              <textarea 
                name="accountTerms" value={formData.accountTerms} onChange={handleChange} rows={2}
                className="w-full bg-slate-50 border border-slate-100 p-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:bg-white rounded-xl text-sm transition-all resize-none"
              />
            </div>

            <div className="space-y-3">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                <span className="w-4 h-[1px] bg-accent/30"></span> Financial Obligations
              </label>
              <textarea 
                name="paymentTerms" value={formData.paymentTerms} onChange={handleChange} rows={2}
                className="w-full bg-slate-50 border border-slate-100 p-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:bg-white rounded-xl text-sm transition-all resize-none"
              />
            </div>

            <div className="space-y-3">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                <span className="w-4 h-[1px] bg-accent/30"></span> IP Stewardship
              </label>
              <textarea 
                name="intellectualProperty" value={formData.intellectualProperty} onChange={handleChange} rows={2}
                className="w-full bg-slate-50 border border-slate-100 p-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:bg-white rounded-xl text-sm transition-all resize-none"
              />
            </div>

            <div className="space-y-3">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                <span className="w-4 h-[1px] bg-accent/30"></span> Usage Boundaries
              </label>
              <textarea 
                name="acceptableUse" value={formData.acceptableUse} onChange={handleChange} rows={2}
                className="w-full bg-slate-50 border border-slate-100 p-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:bg-white rounded-xl text-sm transition-all resize-none"
              />
            </div>

            <div className="space-y-3">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                <span className="w-4 h-[1px] bg-accent/30"></span> Off-boarding Protocol
              </label>
              <textarea 
                name="termination" value={formData.termination} onChange={handleChange} rows={2}
                className="w-full bg-slate-50 border border-slate-100 p-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:bg-white rounded-xl text-sm transition-all resize-none"
              />
            </div>

            <div className="space-y-3">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                <span className="w-4 h-[1px] bg-accent/30"></span> Liability Indemnification
              </label>
              <textarea 
                name="liability" value={formData.liability} onChange={handleChange} rows={3}
                className="w-full bg-slate-50 border border-slate-100 p-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:bg-white rounded-xl text-sm transition-all resize-none"
              />
            </div>

            <div className="space-y-3">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                <span className="w-4 h-[1px] bg-accent/30"></span> Jurisdictional Law
              </label>
              <textarea 
                name="governingLaw" value={formData.governingLaw} onChange={handleChange} rows={2}
                className="w-full bg-slate-50 border border-slate-100 p-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:bg-white rounded-xl text-sm transition-all resize-none"
              />
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="bg-white border border-slate-100 p-12 md:p-20 rounded-[3rem] shadow-2xl overflow-hidden relative print:shadow-none print:border-none print:p-0">
            <div className="absolute top-0 left-0 w-full h-2 bg-accent/20"></div>
            
            <div className="flex justify-between items-start mb-20">
              <div>
                <div className="text-[11px] font-bold text-accent uppercase tracking-[0.3em] mb-6 flex items-center">
                  <Scale className="w-3.5 h-3.5 mr-2" />
                  LEGAL INSTRUMENT
                </div>
                <h2 className="text-4xl font-serif text-slate-900 mb-2 tracking-tight">{formData.companyName}</h2>
                <div className="text-slate-400 font-serif italic text-lg text-accent">Terms of Service Agreement</div>
              </div>
              <div className="text-right">
                <div className="text-[10px] font-bold text-slate-300 uppercase tracking-widest mb-2">VERSION PROTOCOL</div>
                <div className="text-slate-900 font-medium font-mono text-xs tracking-widest">v{formData.effectiveDate.replace(/-/g, '.')}</div>
              </div>
            </div>

            <div className="space-y-16 text-slate-600 font-light leading-relaxed max-w-4xl mx-auto">
              {[
                { title: "operational scope", content: formData.serviceDescription },
                { title: "acceptance protocol", content: formData.acceptanceClause },
                { title: "account integrity", content: formData.accountTerms },
                { title: "financial obligations", content: formData.paymentTerms },
                { title: "ip stewardship", content: formData.intellectualProperty },
                { title: "usage boundaries", content: formData.acceptableUse },
                { title: "off-boarding protocol", content: formData.termination },
                { title: "liability & risk", content: formData.liability },
                { title: "jurisdictional law", content: formData.governingLaw }
              ].map((section, idx) => (
                <section key={idx} className="relative group/section">
                  <div className="absolute -left-12 top-0 text-[10px] font-bold text-slate-200 uppercase tracking-widest group-hover/section:text-accent transition-colors">
                    {(idx + 1).toString().padStart(2, '0')}
                  </div>
                  <h4 className="text-[11px] font-bold text-slate-900 uppercase tracking-[0.2em] mb-6 flex items-center gap-4">
                    {section.title}
                    <span className="flex-1 h-[1px] bg-slate-100"></span>
                  </h4>
                  <p className="text-sm leading-[1.8] text-slate-600">{section.content}</p>
                </section>
              ))}

              <div className="pt-16 mt-16 border-t border-slate-100">
                <div className="bg-slate-50 p-10 rounded-2xl border border-slate-100 flex flex-col md:flex-row justify-between items-center gap-8">
                  <div>
                    <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Entity Authorization</h5>
                    <p className="text-sm text-slate-900 font-medium">
                      {formData.companyName}{formData.companiesHouseNo ? ` (Reg. ${formData.companiesHouseNo})` : ''}
                    </p>
                    <p className="text-[11px] text-slate-400 font-mono mt-1">{formData.companyAddress.replace(/\n/g, ', ')}</p>
                  </div>
                  <div className="text-center md:text-right">
                    <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Communication Channel</h5>
                    <div className="text-accent font-bold font-mono text-sm uppercase tracking-tight">{formData.supportEmail}</div>
                    <p className="text-[10px] text-slate-400 font-serif italic mt-1">Direct Governance Line</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-20 text-center bg-white border border-slate-100 p-16 rounded-[3rem] shadow-sm">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-serif text-slate-900 mb-6 tracking-tight italic">Legal Standards for Modern Enterprise</h2>
            <p className="text-slate-500 text-lg font-light leading-relaxed mb-12">
              Our framework generation ensures your digital operations are protected by industry-standard governance models. Use with professional legal review for maximum efficacy.
            </p>
            <ProFeaturesCTA />
          </div>
        </div>
      </div>
    </div>
  );
}
