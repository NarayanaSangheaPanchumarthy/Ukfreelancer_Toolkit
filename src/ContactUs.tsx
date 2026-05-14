import React from 'react';
import { MessageSquare, Sparkles, Mail } from 'lucide-react';

export default function ContactUs() {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-20 pt-16">
      {/* Header */}
      <div className="mb-20">
        <div className="text-[11px] font-bold text-accent uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
          <span className="w-8 h-[1px] bg-accent/40"></span>
          DIRECT GOVERNANCE LINE
        </div>
        <h1 className="text-5xl md:text-8xl font-serif text-slate-900 mb-10 tracking-tighter leading-[0.95]">
          Enquire for <span className="italic text-accent">Custom</span> Systems.
        </h1>
        <p className="text-slate-500 text-xl font-light max-w-2xl leading-relaxed">
          Operational refactoring for higher standards. Enquire about bespoke dashboards, deterministic document automation, or unified CRM protocols for your enterprise.
        </p>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-32 items-stretch">
        <div className="bg-white border border-slate-100 p-12 rounded-[3.5rem] shadow-2xl flex flex-col relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full -translate-y-16 translate-x-16"></div>
          
          <div className="mb-10">
            <div className="flex items-center text-4xl font-serif text-slate-900 mb-8 tracking-tight italic">
              <div className="bg-slate-50 p-4 rounded-3xl mr-6 group-hover:bg-accent group-hover:text-white transition-all duration-500">
                <MessageSquare className="w-8 h-8" />
              </div>
              Project Specification
            </div>
            <p className="text-slate-500 text-lg font-light leading-relaxed mb-12">
              Submit your operational logic, current procedural friction, and desired systemic output. We refactor fragmented workflows into unified digital entities.
            </p>
          </div>
          
          <div className="mt-auto">
            <a
              href="mailto:panchumarthy756@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-full py-6 bg-slate-900 text-white font-bold text-[11px] uppercase tracking-[0.2em] hover:bg-accent transition-all rounded-3xl shadow-xl group/btn overflow-hidden relative"
            >
              <Mail className="w-4 h-4 mr-3 text-accent group-hover/btn:scale-110 transition-transform" />
              panchumarthy756@gmail.com
            </a>
          </div>
        </div>
        
        <div className="bg-slate-900 p-12 rounded-[3.5rem] shadow-2xl flex flex-col relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-accent/10 rounded-full blur-3xl opacity-50"></div>
          
          <div className="flex items-center text-4xl font-serif text-white mb-10 tracking-tight italic">
            <div className="bg-white/10 p-4 rounded-3xl mr-6 backdrop-blur-sm">
              <Sparkles className="w-8 h-8 text-accent" />
            </div>
            Development Registry
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 mb-12">
            {[
              "Enterprise Dashboards", "Document Refactoring", 
              "Deterministic Generators", "CRM Data Architecture",
              "Inventory Sovereignty", "High-Fidelity Reporting"
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-4 text-slate-300">
                <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2 shrink-0"></div>
                <span className="text-sm font-light uppercase tracking-widest">{item}</span>
              </div>
            ))}
          </div>

          <div className="mt-auto pt-10 border-t border-white/5">
            <p className="text-slate-400 font-serif italic text-lg leading-relaxed max-w-sm">
              Typical refactoring engagements start as localized prototypes and scale into integrated cloud ecosystems with complete lifecycle management.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
