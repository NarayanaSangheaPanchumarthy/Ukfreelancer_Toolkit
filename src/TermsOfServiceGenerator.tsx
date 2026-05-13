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
    <div className="bg-[#f5f7f9] min-h-screen py-12 md:py-16">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        <div className="mb-12">
          <div className="text-[10px] font-bold text-[#a67c52] uppercase tracking-widest mb-4 flex items-center">
            <Scale className="w-3.5 h-3.5 mr-2" />
            COMPLIANCE & LEGAL
          </div>
          <h1 className="text-4xl md:text-5xl font-serif text-slate-900 mb-4 tracking-tight">
            Terms of Service Generator
          </h1>
          <p className="text-slate-600 text-lg mb-8 max-w-2xl">
            Standard terms covering use, payment, intellectual property, liability cap, and termination — for a UK SaaS or service website. Always have a UK-qualified lawyer review before publishing.
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
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest mb-6">Terms fields</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-[10px] font-bold text-slate-800 uppercase tracking-widest mb-2">COMPANY NAME</label>
              <input 
                type="text" name="companyName" value={formData.companyName} onChange={handleChange}
                className="w-full border border-slate-200 p-3 text-slate-900 focus:outline-none focus:border-blue-500 rounded-none text-sm"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-800 uppercase tracking-widest mb-2">COMPANIES HOUSE NO.</label>
              <input 
                type="text" name="companiesHouseNo" value={formData.companiesHouseNo} onChange={handleChange}
                className="w-full border border-slate-200 p-3 text-slate-900 focus:outline-none focus:border-blue-500 rounded-none text-sm"
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-[10px] font-bold text-slate-800 uppercase tracking-widest mb-2">COMPANY ADDRESS</label>
            <textarea 
              name="companyAddress" value={formData.companyAddress} onChange={handleChange} rows={2}
              className="w-full border border-slate-200 p-3 text-slate-900 focus:outline-none focus:border-blue-500 rounded-none text-sm resize-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-[10px] font-bold text-slate-800 uppercase tracking-widest mb-2">WEBSITE URL</label>
              <input 
                type="text" name="websiteUrl" value={formData.websiteUrl} onChange={handleChange}
                className="w-full border border-slate-200 p-3 text-slate-900 focus:outline-none focus:border-blue-500 rounded-none text-sm"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-800 uppercase tracking-widest mb-2">SUPPORT CONTACT EMAIL</label>
              <input 
                type="text" name="supportEmail" value={formData.supportEmail} onChange={handleChange}
                className="w-full border border-slate-200 p-3 text-slate-900 focus:outline-none focus:border-blue-500 rounded-none text-sm"
              />
            </div>
          </div>

          <div className="mb-6 border-b border-slate-200 pb-6">
            <label className="block text-[10px] font-bold text-slate-800 uppercase tracking-widest mb-2">EFFECTIVE DATE</label>
            <input 
              type="date" name="effectiveDate" value={formData.effectiveDate} onChange={handleChange}
              className="w-full border border-slate-200 p-3 text-slate-900 focus:outline-none focus:border-blue-500 rounded-none text-sm md:w-1/2"
            />
          </div>

          <div className="mb-6">
            <label className="block text-[10px] font-bold text-slate-800 uppercase tracking-widest mb-2">SERVICE DESCRIPTION</label>
            <textarea 
              name="serviceDescription" value={formData.serviceDescription} onChange={handleChange} rows={2}
              className="w-full border border-slate-200 p-3 text-slate-900 focus:outline-none focus:border-blue-500 rounded-none text-sm resize-y"
            />
          </div>

          <div className="mb-6">
            <label className="block text-[10px] font-bold text-slate-800 uppercase tracking-widest mb-2">ACCEPTANCE CLAUSE</label>
            <textarea 
              name="acceptanceClause" value={formData.acceptanceClause} onChange={handleChange} rows={2}
              className="w-full border border-slate-200 p-3 text-slate-900 focus:outline-none focus:border-blue-500 rounded-none text-sm resize-y"
            />
          </div>

          <div className="mb-6">
            <label className="block text-[10px] font-bold text-slate-800 uppercase tracking-widest mb-2">ACCOUNT TERMS</label>
            <textarea 
              name="accountTerms" value={formData.accountTerms} onChange={handleChange} rows={2}
              className="w-full border border-slate-200 p-3 text-slate-900 focus:outline-none focus:border-blue-500 rounded-none text-sm resize-y"
            />
          </div>

          <div className="mb-6">
            <label className="block text-[10px] font-bold text-slate-800 uppercase tracking-widest mb-2">PAYMENT TERMS</label>
            <textarea 
              name="paymentTerms" value={formData.paymentTerms} onChange={handleChange} rows={2}
              className="w-full border border-slate-200 p-3 text-slate-900 focus:outline-none focus:border-blue-500 rounded-none text-sm resize-y"
            />
          </div>

          <div className="mb-6">
            <label className="block text-[10px] font-bold text-slate-800 uppercase tracking-widest mb-2">INTELLECTUAL PROPERTY</label>
            <textarea 
              name="intellectualProperty" value={formData.intellectualProperty} onChange={handleChange} rows={2}
              className="w-full border border-slate-200 p-3 text-slate-900 focus:outline-none focus:border-blue-500 rounded-none text-sm resize-y"
            />
          </div>

          <div className="mb-6">
            <label className="block text-[10px] font-bold text-slate-800 uppercase tracking-widest mb-2">ACCEPTABLE USE</label>
            <textarea 
              name="acceptableUse" value={formData.acceptableUse} onChange={handleChange} rows={2}
              className="w-full border border-slate-200 p-3 text-slate-900 focus:outline-none focus:border-blue-500 rounded-none text-sm resize-y"
            />
          </div>

          <div className="mb-6">
            <label className="block text-[10px] font-bold text-slate-800 uppercase tracking-widest mb-2">TERMINATION</label>
            <textarea 
              name="termination" value={formData.termination} onChange={handleChange} rows={2}
              className="w-full border border-slate-200 p-3 text-slate-900 focus:outline-none focus:border-blue-500 rounded-none text-sm resize-y"
            />
          </div>

          <div className="mb-6">
            <label className="block text-[10px] font-bold text-slate-800 uppercase tracking-widest mb-2">LIABILITY</label>
            <textarea 
              name="liability" value={formData.liability} onChange={handleChange} rows={3}
              className="w-full border border-slate-200 p-3 text-slate-900 focus:outline-none focus:border-blue-500 rounded-none text-sm resize-y"
            />
          </div>

          <div className="mb-6">
            <label className="block text-[10px] font-bold text-slate-800 uppercase tracking-widest mb-2">WARRANTIES / DISCLAIMERS</label>
            <textarea 
              name="warranties" value={formData.warranties} onChange={handleChange} rows={2}
              className="w-full border border-slate-200 p-3 text-slate-900 focus:outline-none focus:border-blue-500 rounded-none text-sm resize-y"
            />
          </div>

          <div className="mb-6">
            <label className="block text-[10px] font-bold text-slate-800 uppercase tracking-widest mb-2">INDEMNITY</label>
            <textarea 
              name="indemnity" value={formData.indemnity} onChange={handleChange} rows={2}
              className="w-full border border-slate-200 p-3 text-slate-900 focus:outline-none focus:border-blue-500 rounded-none text-sm resize-y"
            />
          </div>

          <div className="mb-6">
            <label className="block text-[10px] font-bold text-slate-800 uppercase tracking-widest mb-2">GOVERNING LAW CLAUSE</label>
            <textarea 
              name="governingLaw" value={formData.governingLaw} onChange={handleChange} rows={2}
              className="w-full border border-slate-200 p-3 text-slate-900 focus:outline-none focus:border-blue-500 rounded-none text-sm resize-y"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-800 uppercase tracking-widest mb-2">NOTICES & CHANGES</label>
            <textarea 
              name="notices" value={formData.notices} onChange={handleChange} rows={2}
              className="w-full border border-slate-200 p-3 text-slate-900 focus:outline-none focus:border-blue-500 rounded-none text-sm resize-y"
            />
          </div>
        </div>

        <div>
          <h3 className="text-slate-600 font-medium mb-4 print:hidden">Terms preview</h3>
          
          <div className="bg-white border border-slate-200 p-10 md:p-12 shadow-sm print:shadow-none print:border-none print:p-0">
            <div className="text-[10px] font-bold text-[#a67c52] uppercase tracking-widest mb-4">TERMS OF SERVICE</div>
            <h2 className="text-3xl font-serif text-slate-900 mb-2">{formData.companyName} Terms of Service</h2>
            <p className="text-sm text-slate-500 mb-8 pb-8 border-b border-slate-200">
              Effective {formData.effectiveDate} · {formData.websiteUrl}
            </p>

            <div className="space-y-6 text-sm text-slate-800 leading-relaxed max-w-3xl">
              <div>
                <h4 className="font-semibold text-slate-900 mb-2 text-base">1. The Service</h4>
                <p>{formData.serviceDescription}</p>
              </div>

              <div>
                <h4 className="font-semibold text-slate-900 mb-2 mt-4 text-base">2. Acceptance</h4>
                <p>{formData.acceptanceClause}</p>
              </div>

              <div>
                <h4 className="font-semibold text-slate-900 mb-2 mt-4 text-base">3. Accounts</h4>
                <p>{formData.accountTerms}</p>
              </div>

              <div>
                <h4 className="font-semibold text-slate-900 mb-2 mt-4 text-base">4. Fees & payment</h4>
                <p>{formData.paymentTerms}</p>
              </div>

              <div>
                <h4 className="font-semibold text-slate-900 mb-2 mt-4 text-base">5. Intellectual property</h4>
                <p>{formData.intellectualProperty}</p>
              </div>

              <div>
                <h4 className="font-semibold text-slate-900 mb-2 mt-4 text-base">6. Acceptable use</h4>
                <p>{formData.acceptableUse}</p>
              </div>

              <div>
                <h4 className="font-semibold text-slate-900 mb-2 mt-4 text-base">7. Termination</h4>
                <p>{formData.termination}</p>
              </div>

              <div>
                <h4 className="font-semibold text-slate-900 mb-2 mt-4 text-base">8. Warranties & disclaimers</h4>
                <p>{formData.warranties}</p>
              </div>

              <div>
                <h4 className="font-semibold text-slate-900 mb-2 mt-4 text-base">9. Liability</h4>
                <p>{formData.liability}</p>
              </div>

              <div>
                <h4 className="font-semibold text-slate-900 mb-2 mt-4 text-base">10. Indemnity</h4>
                <p>{formData.indemnity}</p>
              </div>

              <div>
                <h4 className="font-semibold text-slate-900 mb-2 mt-4 text-base">11. Governing law & jurisdiction</h4>
                <p>{formData.governingLaw}</p>
              </div>

              <div>
                <h4 className="font-semibold text-slate-900 mb-2 mt-4 text-base">12. Notices & changes</h4>
                <p>{formData.notices}</p>
              </div>

              <div className="pt-4 mt-6">
                <p className="text-slate-600">
                  Contact: {formData.supportEmail} · {formData.companyName}{formData.companiesHouseNo ? `, company no. ${formData.companiesHouseNo}` : ''}, {formData.companyAddress.replace(/\n/g, ', ')}
                </p>
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
