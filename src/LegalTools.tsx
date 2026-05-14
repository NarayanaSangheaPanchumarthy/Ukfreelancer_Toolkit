import React from 'react';
import { Scale, ArrowRight, ShieldCheck, Cookie, FileText, Lock } from 'lucide-react';

interface LegalToolsProps {
  setActiveTab: (tab: string) => void;
}

export default function LegalTools({ setActiveTab }: LegalToolsProps) {
  return (
    <div className="bg-slate-50 min-h-screen pb-40">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-32 pb-40 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-accent/5 to-transparent pointer-events-none"></div>
        <div className="flex flex-col lg:flex-row gap-24 items-center relative z-10">
          <div className="flex-1">
            <div className="flex items-center text-accent text-[11px] font-bold uppercase tracking-[0.3em] mb-10">
              <ShieldCheck className="w-4 h-4 mr-3 animate-pulse" />
              COMPLIANCE UNIT
            </div>
            
            <h1 className="text-6xl md:text-8xl font-serif text-slate-900 leading-[0.9] tracking-tighter mb-10">
              Protection for the <br />
              <span className="italic text-accent">Digital</span> Standard.
            </h1>
            
            <p className="text-slate-500 text-xl mb-12 max-w-xl font-light leading-relaxed">
              Generate UK GDPR-ready policies and agreements without the friction. Drafted for clarity, built for compliance.
            </p>
            
            <div className="flex flex-wrap items-center gap-6">
              <button 
                onClick={() => setActiveTab('Privacy Policy Generator')}
                className="bg-slate-900 text-white font-bold flex items-center px-10 py-5 hover:bg-black transition-all text-sm rounded-2xl shadow-2xl scale-100 hover:scale-105 duration-300"
              >
                Privacy Engine
                <ArrowRight className="w-4 h-4 ml-3" />
              </button>
              <button 
                onClick={() => setActiveTab('DPA Generator')}
                className="bg-white text-slate-800 border border-slate-200 font-bold px-10 py-5 hover:bg-slate-50 transition-all text-sm rounded-2xl shadow-sm"
              >
                Legal Templates
              </button>
            </div>
          </div>

          <div className="flex-1 relative w-full max-w-md hidden lg:block h-[400px]">
            {/* Abstract Document Cards */}
            <div className="absolute top-0 right-10 w-[300px] h-[220px] bg-white border border-slate-100 shadow-2xl rounded-2xl -rotate-[8deg] p-10 z-10 group hover:rotate-[-4deg] hover:z-40 transition-all duration-500">
              <div className="text-accent text-[10px] font-bold mb-8 uppercase tracking-widest">PROTOCOL 01</div>
              <div className="text-3xl font-serif text-slate-900">Privacy</div>
            </div>
            <div className="absolute top-24 right-0 w-[300px] h-[220px] bg-white border border-slate-100 shadow-2xl rounded-2xl rotate-[6deg] p-10 z-20 group hover:rotate-[2deg] hover:z-40 transition-all duration-500">
              <div className="text-accent text-[10px] font-bold mb-8 uppercase tracking-widest">PROTOCOL 02</div>
              <div className="text-3xl font-serif text-slate-900">Cookie</div>
            </div>
            <div className="absolute top-48 right-12 w-[340px] h-[240px] bg-white border border-slate-200 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.2)] rounded-3xl p-12 z-30 group hover:-translate-y-4 hover:z-40 transition-all duration-500">
              <div className="text-accent text-[10px] font-bold mb-8 uppercase tracking-widest">PROTOCOL 03</div>
              <div className="mt-8 text-4xl font-serif text-slate-900 italic tracking-tight">Terms + DPA</div>
            </div>
          </div>
        </div>
      </div>

      {/* Directory Section */}
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="mb-24">
          <h2 className="text-4xl md:text-5xl font-serif text-slate-900 leading-[1.1] tracking-tight">
            Essential Documentation <br />
            <span className="text-slate-400 italic">Day One Compliance</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Card 1 */}
          <div className="bg-white p-12 rounded-3xl border border-slate-200 hover:border-accent hover:shadow-2xl transition-all cursor-pointer group flex flex-col min-h-[380px]"
               onClick={() => setActiveTab('Privacy Policy Generator')}>
            <div className="flex justify-between items-start mb-12">
              <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-all duration-300">
                <ShieldCheck className="w-7 h-7 stroke-[1.5]" />
              </div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest group-hover:text-accent transition-colors">GDPR COMPLIANT</span>
            </div>
            <h3 className="text-3xl font-serif text-slate-900 mb-6 transition-colors group-hover:text-accent leading-tight">
              Privacy Policy <br /> Generator
            </h3>
            <p className="text-slate-500 text-base font-light leading-relaxed mb-12 flex-grow">
              Draft comprehensive notices covering controller details, processing purposes, and lawful bases.
            </p>
            <div className="flex items-center text-[11px] font-bold uppercase tracking-widest text-slate-900 group-hover:translate-x-2 transition-all">
              Initialize Policy <ArrowRight className="w-4 h-4 ml-3 text-accent" />
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-12 rounded-3xl border border-slate-200 hover:border-accent hover:shadow-2xl transition-all cursor-pointer group flex flex-col min-h-[380px]"
               onClick={() => setActiveTab('Cookie Policy Generator')}>
            <div className="flex justify-between items-start mb-12">
              <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-all duration-300">
                <Cookie className="w-7 h-7 stroke-[1.5]" />
              </div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest group-hover:text-accent transition-colors">PECR READY</span>
            </div>
            <h3 className="text-3xl font-serif text-slate-900 mb-6 transition-colors group-hover:text-accent leading-tight">
              Cookie Policy <br /> Generator
            </h3>
            <p className="text-slate-500 text-base font-light leading-relaxed mb-12 flex-grow">
              Document trackers by category with explicit purposes and retention periods.
            </p>
            <div className="flex items-center text-[11px] font-bold uppercase tracking-widest text-slate-900 group-hover:translate-x-2 transition-all">
              Launch Generator <ArrowRight className="w-4 h-4 ml-3 text-accent" />
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-12 rounded-3xl border border-slate-200 hover:border-accent hover:shadow-2xl transition-all cursor-pointer group flex flex-col min-h-[380px]"
               onClick={() => setActiveTab('Terms of Service Generator')}>
            <div className="flex justify-between items-start mb-12">
              <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-all duration-300">
                <Scale className="w-7 h-7 stroke-[1.5]" />
              </div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest group-hover:text-accent transition-colors">SAAS FOUNDATION</span>
            </div>
            <h3 className="text-3xl font-serif text-slate-900 mb-6 transition-colors group-hover:text-accent leading-tight">
              Terms of <br /> Service
            </h3>
            <p className="text-slate-500 text-base font-light leading-relaxed mb-12 flex-grow">
              Standard terms covering usage right, IP protection, liability limits, and termination.
            </p>
            <div className="flex items-center text-[11px] font-bold uppercase tracking-widest text-slate-900 group-hover:translate-x-2 transition-all">
              Draft Terms <ArrowRight className="w-4 h-4 ml-3 text-accent" />
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-white p-12 rounded-3xl border border-slate-200 hover:border-accent hover:shadow-2xl transition-all cursor-pointer group flex flex-col min-h-[380px]"
               onClick={() => setActiveTab('DPA Generator')}>
            <div className="flex justify-between items-start mb-12">
              <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-all duration-300">
                <Lock className="w-7 h-7 stroke-[1.5]" />
              </div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest group-hover:text-accent transition-colors">ARTICLE 28</span>
            </div>
            <h3 className="text-3xl font-serif text-slate-900 mb-6 transition-colors group-hover:text-accent leading-tight">
              Data Processing <br /> Agreement
            </h3>
            <p className="text-slate-500 text-base font-light leading-relaxed mb-12 flex-grow">
              Generate processor agreements with full subject matter detail and sub-processor lists.
            </p>
            <div className="flex items-center text-[11px] font-bold uppercase tracking-widest text-slate-900 group-hover:translate-x-2 transition-all">
              Initialize DPA <ArrowRight className="w-4 h-4 ml-3 text-accent" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
