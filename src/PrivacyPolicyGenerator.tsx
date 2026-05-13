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
    <div className="bg-[#f5f7f9] min-h-screen py-12 md:py-16">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        <div className="mb-12">
          <div className="text-[10px] font-bold text-[#a67c52] uppercase tracking-widest mb-4">
            COMPLIANCE & LEGAL
          </div>
          <h1 className="text-4xl md:text-5xl font-serif text-slate-900 mb-4 tracking-tight">
            Privacy Policy Generator
          </h1>
          <p className="text-slate-600 text-lg mb-8 max-w-2xl">
            UK GDPR / GDPR-compliant privacy notice covering controller details, processing purposes, lawful bases, retention, rights, and the ICO complaint route.
          </p>
          
          <div className="flex flex-wrap gap-4 print:hidden">
            <button 
              onClick={copyText}
              className="bg-white border border-slate-300 text-slate-800 px-6 py-3 font-bold text-sm hover:bg-slate-50 transition-colors flex items-center"
            >
              <Copy className="w-4 h-4 mr-2" />
              Copy text
            </button>
            <button 
              onClick={downloadPdf}
              className="bg-[#1a1f24] text-white px-6 py-3 font-bold text-sm hover:bg-black transition-colors flex items-center"
            >
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </button>
          </div>
        </div>

        <div className="bg-white border border-slate-200 p-8 shadow-sm mb-12 print:hidden">
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest mb-6">Policy fields</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-[10px] font-bold text-slate-800 uppercase tracking-widest mb-2">WEBSITE / BRAND NAME</label>
              <input 
                type="text" name="brandName" value={formData.brandName} onChange={handleChange}
                className="w-full border border-slate-200 p-3 text-slate-900 focus:outline-none focus:border-blue-500 rounded-none text-sm"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-800 uppercase tracking-widest mb-2">WEBSITE URL</label>
              <input 
                type="text" name="websiteUrl" value={formData.websiteUrl} onChange={handleChange}
                className="w-full border border-slate-200 p-3 text-slate-900 focus:outline-none focus:border-blue-500 rounded-none text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-[10px] font-bold text-slate-800 uppercase tracking-widest mb-2">CONTROLLER LEGAL NAME</label>
              <input 
                type="text" name="legalName" value={formData.legalName} onChange={handleChange}
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
            <label className="block text-[10px] font-bold text-slate-800 uppercase tracking-widest mb-2">CONTROLLER ADDRESS</label>
            <textarea 
              name="address" value={formData.address} onChange={handleChange} rows={2}
              className="w-full border border-slate-200 p-3 text-slate-900 focus:outline-none focus:border-blue-500 rounded-none text-sm resize-none"
            />
          </div>

          <div className="mb-6">
            <label className="block text-[10px] font-bold text-slate-800 uppercase tracking-widest mb-2">PRIVACY CONTACT EMAIL</label>
            <input 
              type="text" name="email" value={formData.email} onChange={handleChange}
              className="w-full border border-slate-200 p-3 text-slate-900 focus:outline-none focus:border-blue-500 rounded-none text-sm md:w-1/2"
            />
          </div>

          <div className="mb-6">
            <label className="block text-[10px] font-bold text-slate-800 uppercase tracking-widest mb-2">DPO CONTACT / STATUS</label>
            <textarea 
              name="dpoStatus" value={formData.dpoStatus} onChange={handleChange} rows={2}
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
            <label className="block text-[10px] font-bold text-slate-800 uppercase tracking-widest mb-2">DATA WE COLLECT</label>
            <textarea 
              name="dataWeCollect" value={formData.dataWeCollect} onChange={handleChange} rows={3}
              className="w-full border border-slate-200 p-3 text-slate-900 focus:outline-none focus:border-blue-500 rounded-none text-sm resize-y"
            />
          </div>

          <div className="mb-6">
            <label className="block text-[10px] font-bold text-slate-800 uppercase tracking-widest mb-2">PURPOSES OF PROCESSING</label>
            <textarea 
              name="purposes" value={formData.purposes} onChange={handleChange} rows={3}
              className="w-full border border-slate-200 p-3 text-slate-900 focus:outline-none focus:border-blue-500 rounded-none text-sm resize-y"
            />
          </div>

          <div className="mb-6">
            <label className="block text-[10px] font-bold text-slate-800 uppercase tracking-widest mb-2">LAWFUL BASES</label>
            <textarea 
              name="lawfulBases" value={formData.lawfulBases} onChange={handleChange} rows={3}
              className="w-full border border-slate-200 p-3 text-slate-900 focus:outline-none focus:border-blue-500 rounded-none text-sm resize-y"
            />
          </div>

          <div className="mb-6">
            <label className="block text-[10px] font-bold text-slate-800 uppercase tracking-widest mb-2">RECIPIENTS / PROCESSORS</label>
            <textarea 
              name="recipients" value={formData.recipients} onChange={handleChange} rows={2}
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
            <label className="block text-[10px] font-bold text-slate-800 uppercase tracking-widest mb-2">RETENTION PERIODS</label>
            <textarea 
              name="retention" value={formData.retention} onChange={handleChange} rows={2}
              className="w-full border border-slate-200 p-3 text-slate-900 focus:outline-none focus:border-blue-500 rounded-none text-sm resize-y"
            />
          </div>

          <div className="mb-6">
            <label className="block text-[10px] font-bold text-slate-800 uppercase tracking-widest mb-2">DATA SUBJECT RIGHTS</label>
            <textarea 
              name="rights" value={formData.rights} onChange={handleChange} rows={3}
              className="w-full border border-slate-200 p-3 text-slate-900 focus:outline-none focus:border-blue-500 rounded-none text-sm resize-y"
            />
          </div>

          <div className="mb-6">
            <label className="block text-[10px] font-bold text-slate-800 uppercase tracking-widest mb-2">COOKIES NOTE</label>
            <textarea 
              name="cookies" value={formData.cookies} onChange={handleChange} rows={2}
              className="w-full border border-slate-200 p-3 text-slate-900 focus:outline-none focus:border-blue-500 rounded-none text-sm resize-y"
            />
          </div>

          <div className="mb-6">
            <label className="block text-[10px] font-bold text-slate-800 uppercase tracking-widest mb-2">CHILDREN'S DATA</label>
            <textarea 
              name="childrenData" value={formData.childrenData} onChange={handleChange} rows={2}
              className="w-full border border-slate-200 p-3 text-slate-900 focus:outline-none focus:border-blue-500 rounded-none text-sm resize-y"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-800 uppercase tracking-widest mb-2">CHANGES TO THIS NOTICE</label>
            <textarea 
              name="changes" value={formData.changes} onChange={handleChange} rows={2}
              className="w-full border border-slate-200 p-3 text-slate-900 focus:outline-none focus:border-blue-500 rounded-none text-sm resize-y"
            />
          </div>
        </div>

        <div>
          <h3 className="text-slate-600 font-medium mb-4 print:hidden">Privacy policy preview</h3>
          
          <div className="bg-white border border-slate-200 p-8 shadow-sm print:shadow-none print:border-none print:p-0">
            <div className="text-[10px] font-bold text-[#a67c52] uppercase tracking-widest mb-4">PRIVACY NOTICE</div>
            <h2 className="text-3xl font-serif text-slate-900 mb-2">{formData.brandName} Privacy Policy</h2>
            <p className="text-sm text-slate-500 mb-8 border-b border-slate-200 pb-8">
              Effective {formData.effectiveDate} · {formData.websiteUrl}
            </p>

            <div className="space-y-6 text-sm text-slate-800 leading-relaxed max-w-3xl">
              <div>
                <h4 className="font-semibold text-slate-900 mb-2">1. Who we are</h4>
                <p>
                  {formData.legalName} {formData.companiesHouseNo && `(Companies House no. ${formData.companiesHouseNo})`} of {formData.address.replace(/\n/g, ', ')} is the data controller responsible for your personal data. Contact: {formData.email}.
                </p>
                <p className="mt-2">
                  Data Protection Officer: {formData.dpoStatus}
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-slate-900 mb-2">2. What data we collect</h4>
                <p>{formData.dataWeCollect}</p>
              </div>

              <div>
                <h4 className="font-semibold text-slate-900 mb-2">3. Why we process it</h4>
                <p>{formData.purposes}</p>
              </div>

              <div>
                <h4 className="font-semibold text-slate-900 mb-2">4. Lawful bases</h4>
                <p>{formData.lawfulBases}</p>
              </div>

              <div>
                <h4 className="font-semibold text-slate-900 mb-2">5. Who we share it with</h4>
                <p>{formData.recipients}</p>
              </div>

              <div>
                <h4 className="font-semibold text-slate-900 mb-2">6. International transfers</h4>
                <p>{formData.internationalTransfers}</p>
              </div>

              <div>
                <h4 className="font-semibold text-slate-900 mb-2">7. How long we keep it</h4>
                <p>{formData.retention}</p>
              </div>

              <div>
                <h4 className="font-semibold text-slate-900 mb-2">8. Your rights</h4>
                <p>{formData.rights}</p>
              </div>

              <div>
                <h4 className="font-semibold text-slate-900 mb-2">9. Cookies</h4>
                <p>{formData.cookies}</p>
              </div>

              <div>
                <h4 className="font-semibold text-slate-900 mb-2">10. Children</h4>
                <p>{formData.childrenData}</p>
              </div>

              <div>
                <h4 className="font-semibold text-slate-900 mb-2">11. Changes</h4>
                <p>{formData.changes}</p>
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
