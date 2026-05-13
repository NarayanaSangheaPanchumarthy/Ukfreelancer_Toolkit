import React, { useState } from 'react';
import { Copy, Download, Cookie, Plus, Trash2 } from 'lucide-react';
import ProFeaturesCTA from './ProFeaturesCTA';

interface CookieData {
  id: string;
  name: string;
  category: string;
  purpose: string;
  retention: string;
}

export default function CookiePolicyGenerator() {
  const [formData, setFormData] = useState({
    brandName: 'Northstar Studio',
    websiteUrl: 'https://northstar.example.co.uk',
    email: 'privacy@example.co.uk',
    effectiveDate: '2026-05-12',
    consentMechanism: 'On first visit you see a banner where you can Accept all, Reject all, or manage preferences. You can change your choice anytime via the Cookie Settings link in the footer.',
  });

  const [cookies, setCookies] = useState<CookieData[]>([
    { id: '1', name: 'session', category: 'Strictly necessary', purpose: 'Maintains your login session.', retention: 'Session' },
    { id: '2', name: 'csrf_token', category: 'Strictly necessary', purpose: 'Prevents cross-site request forgery.', retention: 'Session' },
    { id: '3', name: '_ga', category: 'Analytics', purpose: 'Google Analytics — measures page views and user journeys.', retention: '13 months' },
    { id: '4', name: '_gid', category: 'Analytics', purpose: 'Google Analytics — distinguishes users.', retention: '24 hours' },
    { id: '5', name: 'marketing_consent', category: 'Marketing', purpose: "Records marketing consent so we don't ask again.", retention: '12 months' },
  ]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCookieChange = (id: string, field: keyof CookieData, value: string) => {
    setCookies(cookies.map(c => c.id === id ? { ...c, [field]: value } : c));
  };

  const addCookie = () => {
    setCookies([...cookies, { id: Date.now().toString(), name: '', category: '', purpose: '', retention: '' }]);
  };

  const removeCookie = (id: string) => {
    setCookies(cookies.filter(c => c.id !== id));
  };

  const copyText = () => {
    const cookiesText = cookies.map(c => `- ${c.name} (${c.category}): ${c.purpose} [Retention: ${c.retention}]`).join('\n');
    
    const text = `
COOKIE POLICY
${formData.brandName} Cookie Policy
Effective ${formData.effectiveDate} · ${formData.websiteUrl}

1. What cookies are
Cookies are small text files placed on your device that allow a website to recognise you, remember your preferences, and measure how the site is used.

2. Consent
${formData.consentMechanism}

3. Cookies we use
${cookiesText}

4. Managing cookies
You can change your consent at any time using the Cookie Settings link in our footer, or by clearing cookies in your browser. Most browsers also allow you to block cookies entirely — note that this may break functionality.

5. Contact
Questions about cookies: ${formData.email}.
    `.trim();
    navigator.clipboard.writeText(text);
    alert('Cookie Policy copied to clipboard!');
  };

  const downloadPdf = () => {
    window.print();
  };

  return (
    <div className="bg-[#f5f7f9] min-h-screen py-12 md:py-16">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        <div className="mb-12">
          <div className="text-[10px] font-bold text-[#a67c52] uppercase tracking-widest mb-4 flex items-center">
            <Cookie className="w-3.5 h-3.5 mr-2" />
            COMPLIANCE & LEGAL
          </div>
          <h1 className="text-4xl md:text-5xl font-serif text-slate-900 mb-4 tracking-tight">
            Cookie Policy Generator
          </h1>
          <p className="text-slate-600 text-lg mb-8 max-w-2xl">
            List the cookies your site uses by category with purpose and retention. Pair with a banner that captures consent for non-essential cookies under PECR + UK GDPR.
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
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest mb-6">Site details</h3>
          
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
              <label className="block text-[10px] font-bold text-slate-800 uppercase tracking-widest mb-2">PRIVACY CONTACT EMAIL</label>
              <input 
                type="text" name="email" value={formData.email} onChange={handleChange}
                className="w-full border border-slate-200 p-3 text-slate-900 focus:outline-none focus:border-blue-500 rounded-none text-sm"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-800 uppercase tracking-widest mb-2">EFFECTIVE DATE</label>
              <input 
                type="date" name="effectiveDate" value={formData.effectiveDate} onChange={handleChange}
                className="w-full border border-slate-200 p-3 text-slate-900 focus:outline-none focus:border-blue-500 rounded-none text-sm"
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-[10px] font-bold text-slate-800 uppercase tracking-widest mb-2">CONSENT MECHANISM</label>
            <textarea 
              name="consentMechanism" value={formData.consentMechanism} onChange={handleChange} rows={2}
              className="w-full border border-slate-200 p-3 text-slate-900 focus:outline-none focus:border-blue-500 rounded-none text-sm resize-y"
            />
          </div>

          <div className="border-t border-slate-200 pt-8 mt-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest">Cookies in use</h3>
              <button 
                onClick={addCookie}
                className="text-slate-900 font-bold text-sm flex items-center border border-slate-300 px-4 py-2 hover:bg-slate-50 transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" /> Add cookie
              </button>
            </div>
            
            <div className="space-y-3">
              {cookies.map((cookie) => (
                <div key={cookie.id} className="flex flex-col md:flex-row gap-2">
                  <input 
                    type="text" value={cookie.name} onChange={(e) => handleCookieChange(cookie.id, 'name', e.target.value)} 
                    placeholder="Name (e.g., _ga)"
                    className="w-full md:w-1/6 border border-slate-200 p-3 text-slate-900 focus:outline-none focus:border-blue-500 rounded-none text-sm"
                  />
                  <input 
                    type="text" value={cookie.category} onChange={(e) => handleCookieChange(cookie.id, 'category', e.target.value)} 
                    placeholder="Category"
                    className="w-full md:w-1/5 border border-slate-200 p-3 text-slate-900 focus:outline-none focus:border-blue-500 rounded-none text-sm"
                  />
                  <input 
                    type="text" value={cookie.purpose} onChange={(e) => handleCookieChange(cookie.id, 'purpose', e.target.value)} 
                    placeholder="Purpose"
                    className="w-full md:w-[40%] border border-slate-200 p-3 text-slate-900 focus:outline-none focus:border-blue-500 rounded-none text-sm"
                  />
                  <input 
                    type="text" value={cookie.retention} onChange={(e) => handleCookieChange(cookie.id, 'retention', e.target.value)} 
                    placeholder="Retention"
                    className="w-full md:w-1/6 border border-slate-200 p-3 text-slate-900 focus:outline-none focus:border-blue-500 rounded-none text-sm"
                  />
                  <button 
                    onClick={() => removeCookie(cookie.id)} 
                    className="p-3 border border-slate-200 text-slate-400 hover:text-red-500 hover:border-red-200 hover:bg-red-50 transition-colors flex items-center justify-center shrink-0"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-slate-600 font-medium mb-4 print:hidden">Cookie policy preview</h3>
          
          <div className="bg-white border border-slate-200 p-10 md:p-12 shadow-sm print:shadow-none print:border-none print:p-0">
            <div className="text-[10px] font-bold text-[#a67c52] uppercase tracking-widest mb-4">COOKIE POLICY</div>
            <h2 className="text-3xl font-serif text-slate-900 mb-4">{formData.brandName} Cookie Policy</h2>
            <p className="text-sm text-slate-500 mb-8 border-b border-slate-200 pb-8">
              Effective {formData.effectiveDate} · {formData.websiteUrl}
            </p>

            <div className="space-y-6 text-sm text-slate-800 leading-relaxed max-w-3xl">
              <div>
                <h4 className="font-semibold text-slate-900 mb-2 mt-4 text-base">1. What cookies are</h4>
                <p>Cookies are small text files placed on your device that allow a website to recognise you, remember your preferences, and measure how the site is used.</p>
              </div>

              <div>
                <h4 className="font-semibold text-slate-900 mb-2 mt-4 text-base">2. Consent</h4>
                <p>{formData.consentMechanism}</p>
              </div>

              <div>
                <h4 className="font-semibold text-slate-900 mb-4 mt-4 text-base">3. Cookies we use</h4>
                {cookies.length > 0 ? (
                  <div className="overflow-x-auto border-t border-l border-slate-200">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-50">
                          <th className="p-3 border-b border-r border-slate-200 font-semibold text-slate-900 text-xs">Name</th>
                          <th className="p-3 border-b border-r border-slate-200 font-semibold text-slate-900 text-xs">Category</th>
                          <th className="p-3 border-b border-r border-slate-200 font-semibold text-slate-900 text-xs">Purpose</th>
                          <th className="p-3 border-b border-r border-slate-200 font-semibold text-slate-900 text-xs">Retention</th>
                        </tr>
                      </thead>
                      <tbody>
                        {cookies.map(cookie => (
                          <tr key={cookie.id} className="text-xs">
                            <td className="p-3 border-b border-r border-slate-200">{cookie.name}</td>
                            <td className="p-3 border-b border-r border-slate-200">{cookie.category}</td>
                            <td className="p-3 border-b border-r border-slate-200">{cookie.purpose}</td>
                            <td className="p-3 border-b border-r border-slate-200">{cookie.retention}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-slate-500 italic">No cookies defined.</p>
                )}
              </div>

              <div>
                <h4 className="font-semibold text-slate-900 mb-2 mt-4 text-base">4. Managing cookies</h4>
                <p>You can change your consent at any time using the Cookie Settings link in our footer, or by clearing cookies in your browser. Most browsers also allow you to block cookies entirely — note that this may break functionality.</p>
              </div>

              <div>
                <h4 className="font-semibold text-slate-900 mb-2 mt-4 text-base">5. Contact</h4>
                <p>Questions about cookies: {formData.email}.</p>
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
