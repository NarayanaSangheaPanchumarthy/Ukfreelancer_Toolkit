import React, { useState, useMemo } from 'react';
import { Copy } from 'lucide-react';
import ProFeaturesCTA from './ProFeaturesCTA';

export default function VatCalculator() {
  const [mode, setMode] = useState<'add' | 'remove'>('add');
  const [amount, setAmount] = useState<string>('100');
  const [vatRate, setVatRate] = useState<string>('20');
  const [copied, setCopied] = useState(false);

  const { net, vat, gross } = useMemo(() => {
    const numAmount = parseFloat(amount) || 0;
    const numRate = parseFloat(vatRate) || 0;
    
    if (mode === 'add') {
      const net = numAmount;
      const vat = net * (numRate / 100);
      const gross = net + vat;
      return { net, vat, gross };
    } else {
      const gross = numAmount;
      const net = gross / (1 + (numRate / 100));
      const vat = gross - net;
      return { net, vat, gross };
    }
  }, [mode, amount, vatRate]);

  const handleCopy = () => {
    const text = `Net Amount: £${net.toFixed(2)}\nVAT Amount: £${vat.toFixed(2)}\nGross Amount: £${gross.toFixed(2)}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-[#fcfdfd] min-h-screen py-20 md:py-24">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8">
          <div>
            <div className="text-[11px] font-bold text-accent uppercase tracking-[0.4em] mb-6 flex items-center gap-2">
              <span className="w-8 h-[1px] bg-accent/30"></span>
              FISCAL EXCISE
            </div>
            <h1 className="text-5xl md:text-8xl font-serif text-slate-900 mb-8 tracking-tighter leading-[0.95]">
              VAT <span className="italic text-accent">Synthesis</span>.
            </h1>
            <p className="text-slate-500 text-xl font-light max-w-2xl leading-relaxed">
              Add or remove UK VAT with instant structural breakdown. High-integrity accounting for modern enterprise.
            </p>
          </div>
          <button 
            onClick={handleCopy}
            className="group bg-slate-900 text-white px-10 py-5 font-bold text-[11px] uppercase tracking-[0.2em] rounded-2xl hover:bg-accent transition-all shadow-2xl flex items-center gap-3 shrink-0"
          >
            <Copy className="w-4 h-4 group-hover:rotate-12 transition-transform" />
            {copied ? 'SYNTHESIZED!' : 'COPY BREAKDOWN'}
          </button>
        </div>

        <div className="bg-white border border-slate-100 p-12 md:p-16 rounded-[4rem] shadow-2xl mb-24 overflow-hidden relative group">
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full -translate-y-48 translate-x-48 blur-3xl group-hover:bg-accent/10 transition-all duration-1000"></div>
          
          <div className="text-[11px] font-bold text-accent uppercase tracking-[0.3em] mb-10 relative z-10 flex items-center gap-3">
            CALCULATION PROTOCOL
            <span className="w-12 h-[1px] bg-accent/20"></span>
          </div>

          {/* Toggle */}
          <div className="flex bg-slate-50 p-2 rounded-3xl mb-16 max-w-lg mx-auto relative z-10 shadow-sm border border-slate-100">
            <button 
              onClick={() => setMode('add')}
              className={`flex-1 py-4 text-[10px] font-bold uppercase tracking-[0.2em] transition-all rounded-[1.25rem] ${mode === 'add' ? 'bg-white text-slate-900 shadow-xl ring-1 ring-slate-100' : 'text-slate-400 hover:text-slate-600'}`}
            >
              Add VAT
            </button>
            <button 
              onClick={() => setMode('remove')}
              className={`flex-1 py-4 text-[10px] font-bold uppercase tracking-[0.2em] transition-all rounded-[1.25rem] ${mode === 'remove' ? 'bg-white text-slate-900 shadow-xl ring-1 ring-slate-100' : 'text-slate-400 hover:text-slate-600'}`}
            >
              Remove VAT
            </button>
          </div>

          {/* Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 relative z-10">
            <div className="space-y-6">
              <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 ml-1">PRINCIPAL CAPITAL</label>
              <div className="relative">
                <span className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 font-serif text-3xl">£</span>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full bg-slate-50 border-none rounded-3xl p-8 pl-14 text-4xl font-serif focus:ring-2 focus:ring-accent/10 focus:bg-white transition-all outline-none shadow-sm"
                />
              </div>
            </div>
            <div className="space-y-6">
              <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 ml-1">EXCISE RATE (%)</label>
              <div className="relative">
                <span className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-300 font-serif text-3xl">%</span>
                <input
                  type="number"
                  value={vatRate}
                  onChange={(e) => setVatRate(e.target.value)}
                  className="w-full bg-slate-50 border-none rounded-3xl p-8 pr-14 text-4xl font-serif focus:ring-2 focus:ring-accent/10 focus:bg-white transition-all outline-none shadow-sm"
                />
              </div>
            </div>
          </div>

          {/* Outputs */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16 relative z-10">
            <div className="p-10 bg-slate-50 rounded-[2.5rem] border border-slate-100 group/metric transition-all hover:bg-white hover:shadow-xl hover:scale-[1.02]">
              <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-4">Net Capital</div>
              <div className="text-4xl md:text-5xl font-serif text-slate-900 tracking-tighter italic">£{net.toLocaleString('en-GB')}</div>
            </div>
            <div className="p-10 bg-slate-50 rounded-[2.5rem] border border-slate-100 group/metric transition-all hover:bg-white hover:shadow-xl hover:scale-[1.02]">
              <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-4">Excise Component</div>
              <div className="text-4xl md:text-5xl font-serif text-accent tracking-tighter italic">£{vat.toLocaleString('en-GB')}</div>
            </div>
            <div className="p-10 bg-slate-50 rounded-[2.5rem] border border-slate-100 group/metric transition-all hover:bg-white hover:shadow-xl hover:scale-[1.02]">
              <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-4">Gross Total</div>
              <div className="text-4xl md:text-5xl font-serif text-slate-900 tracking-tighter italic">£{gross.toLocaleString('en-GB')}</div>
            </div>
          </div>

          <div className="bg-slate-50 p-10 rounded-[3rem] border border-slate-100 relative z-10">
            <h3 className="text-2xl font-serif text-slate-900 mb-6 tracking-tight italic flex items-center gap-4">
              Strategic Insight
              <span className="w-12 h-[1px] bg-accent/20"></span>
            </h3>
            <p className="text-slate-500 text-lg font-light leading-relaxed">
              The default excise protocol is set to 20%, reflecting the standard UK standard. Reconfigure the rate vector if your specific operational domain requires alternate tax treatment.
            </p>
          </div>
        </div>

        <ProFeaturesCTA />
      </div>
    </div>
  );
}
