import React, { useState, useMemo } from 'react';
import ProFeaturesCTA from './ProFeaturesCTA';

export default function TaxEstimator() {
  const [income, setIncome] = useState<string>('55000');
  const [expenses, setExpenses] = useState<string>('8000');
  
  const results = useMemo(() => {
    const inc = parseFloat(income) || 0;
    const exp = parseFloat(expenses) || 0;
    const p = inc - exp;
    
    // 2024/25 Rough Tax Calculation
    const personalAllowance = 12570;
    const taxableIncome = Math.max(0, p - personalAllowance);
    
    // Income Tax
    let incomeTax = 0;
    if (p > personalAllowance) {
      const basicM = Math.min(p, 50270) - personalAllowance;
      if (basicM > 0) incomeTax += basicM * 0.20;
      
      const higherM = Math.min(p, 125140) - 50270;
      if (higherM > 0) incomeTax += higherM * 0.40;
      
      const additionalM = p - 125140;
      if (additionalM > 0) incomeTax += additionalM * 0.45;
    }

    // Class 4 National Insurance (2024/25 is roughly 6% between 12,570 and 50,270, then 2% above)
    let class4NIC = 0;
    if (p > personalAllowance) {
      const mainNIC = Math.min(p, 50270) - personalAllowance;
      if (mainNIC > 0) class4NIC += mainNIC * 0.06;
      
      const upperNIC = p - 50270;
      if (upperNIC > 0) class4NIC += upperNIC * 0.02;
    }

    const totalTax = incomeTax + class4NIC;

    return {
      profit: p,
      taxableIncome,
      incomeTax,
      class4NIC,
      totalTax
    }
  }, [income, expenses]);

  return (
    <div className="bg-[#fcfdfd] min-h-screen py-20 md:py-24">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8">
          <div>
            <div className="text-[11px] font-bold text-accent uppercase tracking-[0.4em] mb-6 flex items-center gap-2">
              <span className="w-8 h-[1px] bg-accent/30"></span>
              FISCAL PROJECTION
            </div>
            <h1 className="text-5xl md:text-8xl font-serif text-slate-900 mb-8 tracking-tighter leading-[0.95]">
              Tax <span className="italic text-accent">Forecasting</span> UK.
            </h1>
            <p className="text-slate-500 text-xl font-light max-w-2xl leading-relaxed">
              Model potential UK self-employed tax liability with instant structural feedback. Engineering precision for independent enterprise.
            </p>
          </div>
        </div>

        <div className="bg-white border border-slate-100 rounded-[4rem] shadow-2xl mb-24 overflow-hidden relative group">
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full -translate-y-48 translate-x-48 blur-3xl group-hover:bg-accent/10 transition-all duration-1000"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 p-12 md:p-16 gap-12 bg-slate-50 relative z-10">
            <div className="space-y-6">
              <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 ml-1">GROSS ANNUAL REVENUE</label>
              <div className="relative">
                <span className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 font-serif text-3xl">£</span>
                <input
                  type="number"
                  value={income}
                  onChange={(e) => setIncome(e.target.value)}
                  className="w-full bg-white border border-slate-100 rounded-3xl p-8 pl-14 text-4xl font-serif focus:ring-2 focus:ring-accent/10 focus:border-accent/10 transition-all outline-none shadow-sm"
                />
              </div>
            </div>
            <div className="space-y-6">
              <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 ml-1">ALLOWABLE DISBURSEMENTS</label>
              <div className="relative">
                <span className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 font-serif text-3xl">£</span>
                <input
                  type="number"
                  value={expenses}
                  onChange={(e) => setExpenses(e.target.value)}
                  className="w-full bg-white border border-slate-100 rounded-3xl p-8 pl-14 text-4xl font-serif focus:ring-2 focus:ring-accent/10 focus:border-accent/10 transition-all outline-none shadow-sm"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 bg-white relative z-10">
            <div className="p-12 md:p-16 border-b md:border-b-0 md:border-r border-slate-50 group/metric transition-all hover:bg-slate-50">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-6">Net Fiscal Profit</h3>
              <div className="text-4xl md:text-5xl font-serif text-slate-900 tracking-tighter italic">£{results.profit.toLocaleString('en-GB')}</div>
            </div>
            <div className="p-12 md:p-16 border-b md:border-b-0 group/metric transition-all hover:bg-slate-50">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-6">Taxable Exposure</h3>
              <div className="text-4xl md:text-5xl font-serif text-slate-900 tracking-tighter italic opacity-60">£{results.taxableIncome.toLocaleString('en-GB')}</div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 bg-white border-t border-slate-50 relative z-10">
            <div className="p-12 md:p-16 border-b md:border-b-0 md:border-r border-slate-50 group/metric transition-all hover:bg-slate-50">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-6">Income Tax Calculus</h3>
              <div className="text-4xl md:text-5xl font-serif text-slate-900 tracking-tighter italic">£{results.incomeTax.toLocaleString('en-GB')}</div>
            </div>
            <div className="p-12 md:p-16 group/metric transition-all hover:bg-slate-50">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-6">NI Contribution (Class 4)</h3>
              <div className="text-4xl md:text-5xl font-serif text-slate-900 tracking-tighter italic">£{results.class4NIC.toLocaleString('en-GB')}</div>
            </div>
          </div>
          
          <div className="bg-slate-900 p-16 md:p-20 text-white relative group/total overflow-hidden z-20">
            <div className="absolute top-0 right-0 w-96 h-full bg-accent/20 -skew-x-12 translate-x-48 group-hover/total:translate-x-32 transition-transform duration-1000"></div>
            <h3 className="text-[11px] font-bold uppercase tracking-[0.3em] text-slate-400 mb-8 relative z-10 flex items-center gap-3">
              LIABILITY SYNTHESIS
              <span className="w-12 h-[1px] bg-accent/30"></span>
            </h3>
            <div className="text-6xl lg:text-8xl font-serif font-bold text-accent relative z-10 tracking-[ -0.04em] italic">
              £{results.totalTax.toLocaleString('en-GB')}
            </div>
          </div>
        </div>

        <div className="bg-slate-50 p-12 md:p-16 rounded-[4rem] border border-slate-100 mb-16 relative overflow-hidden group/intel">
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-accent/5 rounded-full translate-y-32 translate-x-32 blur-3xl group-hover/intel:bg-accent/10 transition-all duration-1000"></div>
          <h2 className="text-3xl font-serif text-slate-900 mb-8 tracking-tight italic flex items-center gap-4 relative z-10">
            Methodology
            <span className="w-12 h-[1px] bg-accent/20"></span>
          </h2>
          <div className="space-y-6 text-slate-500 font-light text-lg leading-relaxed relative z-10 max-w-4xl">
            <p>
              This synthesis utilizes a model reflecting 2024/25 UK tax protocols, incorporating personal allowance thresholds, graduated income tax bands, and Class 4 National Insurance vectors. 
            </p>
            <p className="text-accent font-bold italic">
              Crucial: This is a high-level model, not professional fiscal advice. Consult HMRC or a certified accountant prior to executing tax strategy.
            </p>
          </div>
        </div>
        
        <ProFeaturesCTA />
      </div>
    </div>
  );
}
