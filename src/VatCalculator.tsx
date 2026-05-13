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
    <div className="max-w-4xl mx-auto px-4 md:px-8 py-12 pt-8">
      {/* Header */}
      <div className="mb-12">
        <div className="text-[10px] font-bold text-[#a67c52] uppercase tracking-widest mb-3">
          FAST SINGLE-SCREEN UTILITY
        </div>
        <h1 className="text-4xl md:text-5xl font-serif text-slate-900 mb-4 tracking-tight">
          UK VAT Calculator
        </h1>
        <p className="text-slate-500 text-sm max-w-xl leading-relaxed">
          Add VAT to a net amount or remove VAT from a gross amount with an instant breakdown.
        </p>
      </div>

      <div className="bg-white border border-slate-200 p-8 shadow-sm mb-16">
        {/* Toggle */}
        <div className="flex border border-slate-200 mb-8">
          <button 
            onClick={() => setMode('add')}
            className={`flex-1 py-4 text-sm font-bold transition-colors ${mode === 'add' ? 'bg-[#1a1f24] text-white' : 'bg-white text-slate-800 hover:bg-slate-50'}`}
          >
            Add VAT
          </button>
          <button 
            onClick={() => setMode('remove')}
            className={`flex-1 py-4 text-sm font-bold transition-colors ${mode === 'remove' ? 'bg-[#1a1f24] text-white' : 'bg-white text-slate-800 hover:bg-slate-50'}`}
          >
            Remove VAT
          </button>
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full border border-slate-300 p-3 text-sm focus:border-slate-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">VAT Rate %</label>
            <input
              type="number"
              value={vatRate}
              onChange={(e) => setVatRate(e.target.value)}
              className="w-full border border-slate-300 p-3 text-sm focus:border-slate-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Outputs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 border-y border-slate-200 py-8">
          <div className="md:border-r border-slate-200">
            <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">Net Amount</div>
            <div className="text-3xl font-serif text-slate-900">£{net.toFixed(2)}</div>
          </div>
          <div className="md:border-r border-slate-200">
            <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">VAT Amount</div>
            <div className="text-3xl font-serif text-slate-900">£{vat.toFixed(2)}</div>
          </div>
          <div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">Gross Amount</div>
            <div className="text-3xl font-serif text-slate-900">£{gross.toFixed(2)}</div>
          </div>
        </div>

        {/* Copy Result */}
        <button 
          onClick={handleCopy}
          className="w-full bg-[#1a1f24] text-white font-bold flex items-center justify-center px-6 py-4 hover:bg-black transition-colors text-sm"
        >
          <Copy className="w-4 h-4 mr-2" />
          {copied ? 'Copied to clipboard!' : 'Copy result'}
        </button>
      </div>

      {/* Description below calculator */}
      <div className="border-t border-slate-200 pt-10 mb-8 max-w-3xl">
        <h2 className="text-3xl font-serif text-slate-800 mb-4">VAT calculator UK</h2>
        <p className="text-slate-500 text-sm leading-relaxed">
          The default VAT rate is 20%, the UK standard rate. Change the rate if you need to model another VAT treatment.
        </p>
      </div>

      <ProFeaturesCTA />
    </div>
  );
}
