import React, { useState } from 'react';
import { Download, CheckCircle2, Circle, Rocket } from 'lucide-react';
import { motion } from 'motion/react';

export default function BusinessPlanGenerator() {
  const [formData, setFormData] = useState({
    companyName: '',
    tagline: '',
    founderName: '',
    executiveSummary: '',
    vision: '',
    mission: '',
    productsServices: '',
    targetClient: '',
    marketingChannels: '',
    startupCosts: '',
    revenueGoal: '',
    actionChecklist: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const renderInput = (label: string, name: string) => (
    <div className="flex flex-col gap-3 mb-8">
      <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">{label}</label>
      <input 
        type="text" 
        name={name}
        value={formData[name as keyof typeof formData]}
        onChange={handleInputChange}
        className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-5 text-base font-light text-slate-800 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:bg-white transition-all shadow-sm"
      />
    </div>
  );

  const renderTextarea = (label: string, name: string) => (
    <div className="flex flex-col gap-3 mb-8">
      <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">{label}</label>
      <textarea 
        name={name}
        value={formData[name as keyof typeof formData]}
        onChange={handleInputChange}
        className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-5 text-base font-light text-slate-800 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:bg-white min-h-[160px] transition-all shadow-sm resize-none"
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 py-24 pb-48">
      <div className="max-w-5xl mx-auto px-4 md:px-8">
        <div className="mb-20">
           <div className="flex items-center text-accent text-[11px] font-bold uppercase tracking-[0.3em] mb-6">
              <span className="w-8 h-[1px] bg-accent mr-3"></span>
              VENTURE ARCHITECTURE
            </div>
          <h1 className="text-6xl md:text-8xl font-serif text-slate-900 mb-8 tracking-tighter leading-[0.9]">
            Business <br /><span className="italic text-accent">Plan Studio</span>
          </h1>
          <p className="text-slate-500 text-xl max-w-xl font-light leading-relaxed">
            Eliminate blank-page syndrome with a professional multi-page blueprint framework.
          </p>
        </div>

        <div className="bg-white border border-slate-100 shadow-2xl rounded-[3rem] p-12 md:p-20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full -translate-y-32 translate-x-32"></div>
          
          <div className="mb-20">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-10 h-10 bg-slate-900 text-white rounded-full flex items-center justify-center font-serif text-lg italic">1</div>
              <h2 className="text-3xl font-serif text-slate-900 tracking-tight">Identity & Foundations</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
              {renderInput('Company Name', 'companyName')}
              {renderInput('Founder Name', 'founderName')}
              <div className="md:col-span-2">
                {renderInput('Tagline / North Star', 'tagline')}
              </div>
            </div>
          </div>

          <div className="mb-20">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-10 h-10 bg-slate-900 text-white rounded-full flex items-center justify-center font-serif text-lg italic">2</div>
              <h2 className="text-3xl font-serif text-slate-900 tracking-tight">Strategic Vision</h2>
            </div>
            {renderTextarea('Executive Summary', 'executiveSummary')}
            {renderTextarea('Mission & Vision Statements', 'vision')}
          </div>

          <div className="mb-20">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-10 h-10 bg-slate-900 text-white rounded-full flex items-center justify-center font-serif text-lg italic">3</div>
              <h2 className="text-3xl font-serif text-slate-900 tracking-tight">Market Positioning</h2>
            </div>
            {renderTextarea('Primary Offerings', 'productsServices')}
            {renderTextarea('Target Client Persona', 'targetClient')}
          </div>

          <div className="mb-20">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-10 h-10 bg-slate-900 text-white rounded-full flex items-center justify-center font-serif text-lg italic">4</div>
              <h2 className="text-3xl font-serif text-slate-900 tracking-tight">Growth Mechanics</h2>
            </div>
            {renderTextarea('Acquisition Channels', 'marketingChannels')}
            {renderTextarea('Primary Revenue Objectives', 'revenueGoal')}
          </div>

          <div className="mb-12">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-10 h-10 bg-slate-900 text-white rounded-full flex items-center justify-center font-serif text-lg italic">5</div>
              <h2 className="text-3xl font-serif text-slate-900 tracking-tight">Financial Execution</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
              {renderTextarea('Projected Setup Costs', 'startupCosts')}
              {renderTextarea('Immediate Action Checklist', 'actionChecklist')}
            </div>
          </div>

          <button className="w-full bg-slate-900 text-white font-bold py-8 px-10 hover:bg-black transition-all text-sm uppercase tracking-widest flex items-center justify-center gap-4 rounded-2xl shadow-xl scale-100 hover:scale-[1.02] duration-300 group">
            <Download className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
            Finalize & Download Plan (.docx)
          </button>
        </div>
      </div>
    </div>
  );
}
