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
    <div className="bg-slate-50 min-h-screen py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="mb-20">
          <div className="text-[11px] font-bold text-accent uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
            <span className="w-8 h-[1px] bg-accent"></span>
            CONSENT ARCHITECTURE
          </div>
          <h1 className="text-5xl md:text-8xl font-serif text-slate-900 mb-8 tracking-tighter leading-[0.9]">
            Cookie <span className="italic text-accent">Policy</span> Engine
          </h1>
          <p className="text-slate-500 text-xl font-light mb-12 max-w-2xl leading-relaxed">
            PECR & UK GDPR-compliant cookie notice covering preference management, retention periods, and categorization for the digital standard.
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

        <div className="bg-white border border-slate-100 p-10 md:p-16 rounded-[3rem] shadow-2xl mb-20 print:hidden overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full -translate-y-32 translate-x-32"></div>
          
          <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-12 text-center relative z-10">Module Configuration</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10 relative z-10">
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10 relative z-10">
            <div className="space-y-2">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Privacy Channel</label>
              <input 
                type="text" name="email" value={formData.email} onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-100 p-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:bg-white rounded-xl text-sm transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Active Timestamp</label>
              <input 
                type="date" name="effectiveDate" value={formData.effectiveDate} onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-100 p-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:bg-white rounded-xl text-sm transition-all"
              />
            </div>
          </div>

          <div className="mb-12 relative z-10">
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 ml-1">Consent Mechanism</label>
            <textarea 
              name="consentMechanism" value={formData.consentMechanism} onChange={handleChange} rows={2}
              className="w-full bg-slate-50 border border-slate-100 p-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:bg-white rounded-xl text-sm transition-all resize-none"
            />
          </div>

          <div className="border-t border-slate-100 pt-12 relative z-10">
            <div className="flex justify-between items-center mb-10">
              <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Inventory Management</h3>
              <button 
                onClick={addCookie}
                className="bg-slate-900 text-white text-[10px] font-bold uppercase tracking-widest flex items-center px-6 py-3 hover:bg-black transition-all rounded-xl shadow-lg group"
              >
                <Plus className="w-4 h-4 mr-2 text-accent group-hover:rotate-90 transition-transform" /> Add Token
              </button>
            </div>
            
            <div className="space-y-4">
              {cookies.map((cookie) => (
                <div key={cookie.id} className="flex flex-col md:flex-row gap-4 p-4 bg-slate-50 border border-slate-100 rounded-2xl group/item hover:bg-white hover:border-slate-200 transition-all">
                  <div className="flex-1 space-y-1">
                    <label className="block text-[8px] font-bold text-slate-300 uppercase tracking-widest">Token Name</label>
                    <input 
                      type="text" value={cookie.name} onChange={(e) => handleCookieChange(cookie.id, 'name', e.target.value)} 
                      className="w-full bg-transparent border-none p-0 text-slate-900 focus:outline-none text-sm font-medium"
                    />
                  </div>
                  <div className="flex-1 space-y-1 border-l border-slate-200 pl-4">
                    <label className="block text-[8px] font-bold text-slate-300 uppercase tracking-widest">Classification</label>
                    <input 
                      type="text" value={cookie.category} onChange={(e) => handleCookieChange(cookie.id, 'category', e.target.value)} 
                      className="w-full bg-transparent border-none p-0 text-slate-900 focus:outline-none text-sm"
                    />
                  </div>
                  <div className="flex-[2] space-y-1 border-l border-slate-200 pl-4">
                    <label className="block text-[8px] font-bold text-slate-300 uppercase tracking-widest">Intent</label>
                    <input 
                      type="text" value={cookie.purpose} onChange={(e) => handleCookieChange(cookie.id, 'purpose', e.target.value)} 
                      className="w-full bg-transparent border-none p-0 text-slate-900 focus:outline-none text-sm"
                    />
                  </div>
                  <div className="flex-1 space-y-1 border-l border-slate-200 pl-4">
                    <label className="block text-[8px] font-bold text-slate-300 uppercase tracking-widest">Retention</label>
                    <input 
                      type="text" value={cookie.retention} onChange={(e) => handleCookieChange(cookie.id, 'retention', e.target.value)} 
                      className="w-full bg-transparent border-none p-0 text-slate-900 focus:outline-none text-sm"
                    />
                  </div>
                  <button 
                    onClick={() => removeCookie(cookie.id)} 
                    className="p-3 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all rounded-xl"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="lg:sticky lg:top-32 bg-white border border-slate-100 p-12 md:p-20 rounded-[3rem] shadow-2xl overflow-hidden relative print:shadow-none print:border-none print:p-0">
            <div className="absolute top-0 left-0 w-full h-2 bg-accent/20"></div>
            
            <div className="flex justify-between items-start mb-20">
              <div>
                <div className="text-[11px] font-bold text-accent uppercase tracking-[0.3em] mb-6 flex items-center">
                  <Cookie className="w-3.5 h-3.5 mr-2" />
                  CONSENT PROTOCOL
                </div>
                <h2 className="text-4xl font-serif text-slate-900 mb-2 tracking-tight">{formData.brandName}</h2>
                <div className="text-slate-400 font-serif italic text-lg">Cookie Policy</div>
              </div>
              <div className="text-right">
                <div className="text-[10px] font-bold text-slate-300 uppercase tracking-widest mb-2">LAST MODIFIED</div>
                <div className="text-slate-900 font-medium font-mono text-xs">{formData.effectiveDate}</div>
              </div>
            </div>

            <div className="space-y-12 text-slate-600 font-light leading-relaxed max-w-3xl">
              <section>
                <h4 className="text-[10px] font-bold text-accent uppercase tracking-[0.2em] mb-4">01 foundational basis</h4>
                <p className="text-sm">Cookies are small text files placed on your device that allow a website to recognise you, remember your preferences, and measure how the site is used.</p>
              </section>

              <section>
                <h4 className="text-[10px] font-bold text-accent uppercase tracking-[0.2em] mb-4">02 consent architecture</h4>
                <p className="text-sm italic border-l-2 border-accent/20 pl-6">{formData.consentMechanism}</p>
              </section>

              <section>
                <h4 className="text-[10px] font-bold text-accent uppercase tracking-[0.2em] mb-4">03 token inventory</h4>
                {cookies.length > 0 ? (
                  <div className="overflow-x-auto rounded-2xl border border-slate-100 bg-slate-50/50 mt-6">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr>
                          <th className="p-4 border-b border-slate-100 font-bold text-slate-900 text-[10px] uppercase tracking-widest">Name</th>
                          <th className="p-4 border-b border-slate-100 font-bold text-slate-900 text-[10px] uppercase tracking-widest">Category</th>
                          <th className="p-4 border-b border-slate-100 font-bold text-slate-900 text-[10px] uppercase tracking-widest">Purpose</th>
                          <th className="p-4 border-b border-slate-100 font-bold text-slate-900 text-[10px] uppercase tracking-widest">Retention</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {cookies.map(cookie => (
                          <tr key={cookie.id} className="text-[11px] text-slate-600">
                            <td className="p-4 font-mono">{cookie.name}</td>
                            <td className="p-4">{cookie.category}</td>
                            <td className="p-4 leading-relaxed">{cookie.purpose}</td>
                            <td className="p-4">{cookie.retention}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-slate-400 italic text-sm">No tokens active in repository.</p>
                )}
              </section>

              <section className="pt-8 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.2em] mb-4">Jurisdiction</h4>
                  <p className="text-xs">United Kingdom · PECR · UK GDPR</p>
                </div>
                <div className="text-right">
                  <h4 className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.2em] mb-4">Authorization</h4>
                  <div className="text-slate-900 font-mono text-[10px] mb-1">{formData.email}</div>
                  <p className="text-slate-400 font-serif italic text-xs">Verified Engine</p>
                </div>
              </section>
            </div>
          </div>
        </div>
        
        <div className="mt-20 text-center bg-white border border-slate-100 p-16 rounded-[3rem] shadow-sm">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-4xl font-serif text-slate-900 mb-6 tracking-tight">Digital Transparency Standards</h2>
            <p className="text-slate-500 text-lg font-light leading-relaxed mb-12">
              Our generators ensure you meet the highest standards of PECR and GDPR compliance with minimal friction.
            </p>
            <ProFeaturesCTA />
          </div>
        </div>
      </div>
    </div>
  );
}
