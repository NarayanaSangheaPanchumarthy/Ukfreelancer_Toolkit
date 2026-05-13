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
    <div className="max-w-4xl mx-auto px-4 md:px-8 py-12 pt-8">
      {/* Header */}
      <div className="mb-12">
        <div className="text-[10px] font-bold text-[#a67c52] uppercase tracking-widest mb-3">
          PLANNING ESTIMATE
        </div>
        <h1 className="text-4xl md:text-5xl font-serif text-slate-900 mb-4 tracking-tight">
          UK Self-Employed Tax <br/> Estimator
        </h1>
        <p className="text-slate-500 text-sm max-w-xl leading-relaxed">
          Estimate taxable profit, income tax, and National Insurance from annual freelance income and expenses.
        </p>
      </div>

      <div className="bg-white border border-slate-200 shadow-sm mb-16">
        
        <div className="grid grid-cols-1 md:grid-cols-2 p-8 md:p-10 gap-8 border-b border-slate-200">
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">ANNUAL INCOME</label>
            <input
              type="number"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
              className="w-full border border-slate-300 p-3 text-sm focus:border-slate-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">ALLOWABLE EXPENSES</label>
            <input
              type="number"
              value={expenses}
              onChange={(e) => setExpenses(e.target.value)}
              className="w-full border border-slate-300 p-3 text-sm focus:border-slate-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="p-8 md:p-10 border-b md:border-b-0 md:border-r border-slate-200">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-4">ESTIMATED PROFIT</h3>
            <div className="text-3xl font-serif font-bold text-slate-900">£{results.profit.toFixed(2)}</div>
          </div>
          <div className="p-8 md:p-10 border-b border-slate-200">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-4">TAXABLE INCOME</h3>
            <div className="text-3xl font-serif font-bold text-slate-900">£{results.taxableIncome.toFixed(2)}</div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="p-8 md:p-10 border-b md:border-b-0 md:border-r border-slate-200">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-4">INCOME TAX</h3>
            <div className="text-3xl font-serif font-bold text-slate-900">£{results.incomeTax.toFixed(2)}</div>
          </div>
          <div className="p-8 md:p-10">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-4">NATIONAL INSURANCE</h3>
            <div className="text-3xl font-serif font-bold text-slate-900">£{results.class4NIC.toFixed(2)}</div>
          </div>
        </div>
        
        <div className="bg-[#12181c] p-8 md:p-10 text-white">
          <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-300 mb-4">ESTIMATED TOTAL SET ASIDE</h3>
          <div className="text-3xl lg:text-4xl font-serif font-bold">£{results.totalTax.toFixed(2)}</div>
        </div>
      </div>

      <div className="border border-slate-200 bg-white p-8 md:p-10 mb-8 max-w-4xl">
        <h2 className="text-3xl font-serif text-slate-900 mb-6 tracking-tight">How this estimate works</h2>
        <p className="text-slate-800 text-sm leading-relaxed mb-6">
          This uses a simplified England/Wales/Northern Ireland style calculation: income minus expenses, personal
          allowance, income tax bands, and Class 4 National Insurance. It is a rough estimate, not tax advice.
        </p>
        <p className="text-red-600 font-bold text-sm">
          Always check current HMRC rules or speak to an accountant before making tax decisions.
        </p>
      </div>
      
      <ProFeaturesCTA />
    </div>
  );
}
