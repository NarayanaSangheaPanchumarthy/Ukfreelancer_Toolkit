import React from 'react';
import { Scale, ArrowRight, ShieldCheck, Cookie, FileText, Lock } from 'lucide-react';

interface LegalToolsProps {
  setActiveTab: (tab: string) => void;
}

export default function LegalTools({ setActiveTab }: LegalToolsProps) {
  return (
    <div className="bg-[#f5f7f9] min-h-screen font-sans pb-24">
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 pt-16 pb-20">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="flex-1">
            <div className="flex items-center text-[#a67c52] text-[10px] font-bold uppercase tracking-widest mb-6">
              <Scale className="w-3.5 h-3.5 mr-2" />
              COMPLIANCE & LEGAL
            </div>
            
            <h1 className="text-5xl md:text-[64px] font-serif text-slate-900 leading-[1.05] tracking-tight mb-6">
              UK GDPR-ready policies and processor agreements without the legal-page bloat.
            </h1>
            
            <p className="text-slate-500 text-lg mb-10 max-w-xl leading-relaxed">
              Privacy notices, cookie policies, terms of service, and Article 28 data processing agreements — generated from your details and ready to publish or send.
            </p>
            
            <div className="flex flex-wrap items-center gap-4">
              <button 
                onClick={() => setActiveTab('Privacy Policy Generator')}
                className="bg-[#1a1f24] text-white font-bold flex items-center px-6 py-4 hover:bg-black transition-colors text-sm rounded-none"
              >
                Generate privacy policy
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
              <button 
                onClick={() => setActiveTab('DPA Generator')}
                className="bg-transparent border border-slate-300 text-slate-800 font-bold px-6 py-4 hover:bg-white transition-colors text-sm rounded-none"
              >
                Open DPA template
              </button>
            </div>
          </div>

          <div className="flex-1 relative w-full max-w-md hidden lg:block h-[400px]">
            {/* Abstract Document Cards */}
            <div className="absolute top-0 right-10 w-64 h-48 bg-[#fffcf9] border border-[#f0e8df] shadow-sm transform rotate-[-5deg] p-6 z-10 transition-transform hover:rotate-[-2deg] hover:z-40">
              <div className="text-[#a67c52] text-xs font-bold mb-4">01</div>
              <div className="text-xl font-serif text-slate-800">Privacy</div>
            </div>
            <div className="absolute top-20 right-0 w-64 h-48 bg-[#fdfaf5] border border-[#eee2d3] shadow-md transform rotate-[5deg] p-6 z-20 transition-transform hover:rotate-[2deg] hover:z-40">
              <div className="text-[#a67c52] text-xs font-bold mb-4">02</div>
              <div className="text-xl font-serif text-slate-800">Cookie</div>
            </div>
            <div className="absolute top-40 right-20 w-80 h-48 bg-white border border-[#e8dccb] shadow-lg p-6 z-30 transition-transform hover:-translate-y-2 hover:z-40">
              <div className="text-[#a67c52] text-xs font-bold mb-4">03</div>
              <div className="mt-8 text-2xl font-serif text-slate-900">Terms + DPA</div>
            </div>
          </div>
        </div>
      </div>

      {/* Directory Section */}
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="flex justify-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif text-slate-900 leading-tight text-center max-w-2xl tracking-tight">
            The four documents most UK SaaS and service businesses need from day one.
          </h2>
        </div>

        <div className="text-[10px] font-bold text-[#a67c52] uppercase tracking-widest mb-6">
          LEGAL DIRECTORY
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-slate-200 bg-white">
          
          {/* Card 1 */}
          <div className="p-8 border-b md:border-r border-slate-200 hover:bg-slate-50 transition-colors group">
            <div className="flex justify-between items-start mb-6">
              <ShieldCheck className="w-5 h-5 text-[#a67c52]" />
              <span className="text-[10px] font-bold text-[#a67c52] uppercase tracking-widest">UK GDPR / GDPR</span>
            </div>
            <h3 className="text-2xl font-serif text-slate-900 mb-4 transition-colors">
              Privacy Policy Generator
            </h3>
            <p className="text-slate-500 text-sm leading-relaxed mb-8 min-h-[60px]">
              Draft a UK GDPR-compliant privacy notice covering data controller details, processing purposes, lawful bases, retention, and data subject rights.
            </p>
            <button 
              onClick={() => setActiveTab('Privacy Policy Generator')}
              className="text-slate-900 text-sm font-bold flex items-center hover:text-[#a67c52] transition-colors"
            >
              Generate policy <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          {/* Card 2 */}
          <div className="p-8 border-b border-slate-200 hover:bg-slate-50 transition-colors group">
            <div className="flex justify-between items-start mb-6">
              <Cookie className="w-5 h-5 text-[#a67c52]" />
              <span className="text-[10px] font-bold text-[#a67c52] uppercase tracking-widest">PECR + GDPR</span>
            </div>
            <h3 className="text-2xl font-serif text-slate-900 mb-4 transition-colors">
              Cookie Policy Generator
            </h3>
            <p className="text-slate-500 text-sm leading-relaxed mb-8 min-h-[60px]">
              Document the cookies your site uses, by category, with retention and purposes. Pair with your consent banner.
            </p>
            <button 
              onClick={() => setActiveTab('Cookie Policy Generator')}
              className="text-slate-900 text-sm font-bold flex items-center hover:text-[#a67c52] transition-colors"
            >
              Generate cookie policy <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          {/* Card 3 */}
          <div className="p-8 border-b md:border-b-0 md:border-r border-slate-200 hover:bg-slate-50 transition-colors group">
            <div className="flex justify-between items-start mb-6">
               <Scale className="w-5 h-5 text-[#a67c52]" />
              <span className="text-[10px] font-bold text-[#a67c52] uppercase tracking-widest">WEBSITE / SAAS</span>
            </div>
            <h3 className="text-2xl font-serif text-slate-900 mb-4 transition-colors">
              Terms of Service Generator
            </h3>
            <p className="text-slate-500 text-sm leading-relaxed mb-8 min-h-[60px]">
              Standard terms for a UK SaaS or service website covering use, payment, IP, liability, and termination.
            </p>
            <button 
              onClick={() => setActiveTab('Terms of Service Generator')}
              className="text-slate-900 text-sm font-bold flex items-center hover:text-[#a67c52] transition-colors"
            >
              Generate terms <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          {/* Card 4 */}
          <div className="p-8 hover:bg-slate-50 transition-colors group">
            <div className="flex justify-between items-start mb-6">
              <Lock className="w-5 h-5 text-[#a67c52]" />
              <span className="text-[10px] font-bold text-[#a67c52] uppercase tracking-widest">ARTICLE 28</span>
            </div>
            <h3 className="text-2xl font-serif text-slate-900 mb-4 transition-colors">
              Data Processing Agreement (DPA)
            </h3>
            <p className="text-slate-500 text-sm leading-relaxed mb-8 min-h-[60px]">
              Article 28 GDPR-style processor agreement with subject matter, duration, processing nature, sub-processors, and Annex A.
            </p>
            <button 
              onClick={() => setActiveTab('DPA Generator')}
              className="text-slate-900 text-sm font-bold flex items-center hover:text-[#a67c52] transition-colors"
            >
              Generate DPA <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
