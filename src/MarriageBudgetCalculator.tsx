import React, { useState } from 'react';
import { Download, Plus, Trash2 } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface Expense {
  id: string;
  name: string;
  amount: number;
}

const COLORS = ['#a67c52', '#d6a54a', '#dcd8cf', '#eedfb4', '#1a1f24', '#7d8a83', '#5c452e', '#3d443e', '#7c867f'];

export default function MarriageBudgetCalculator() {
  const [budget, setBudget] = useState<string>('18000');
  const [expenses, setExpenses] = useState<Expense[]>([
    { id: '1', name: 'Venue', amount: 6500 },
    { id: '2', name: 'Catering', amount: 4200 },
    { id: '3', name: 'Photography', amount: 1800 },
    { id: '4', name: 'Outfits', amount: 1600 },
    { id: '5', name: 'Flowers and decor', amount: 900 },
    { id: '6', name: 'Entertainment', amount: 1200 },
    { id: '7', name: 'Stationery', amount: 300 },
    { id: '8', name: 'Honeymoon', amount: 2500 },
    { id: '9', name: 'Contingency', amount: 1000 },
  ]);

  const handleExpenseChange = (id: string, field: 'name' | 'amount', value: string) => {
    setExpenses(cats => cats.map(cat => {
      if (cat.id === id) {
        if (field === 'amount') return { ...cat, amount: parseFloat(value) || 0 };
        return { ...cat, name: value };
      }
      return cat;
    }));
  };

  const addExpense = () => {
    setExpenses([...expenses, { id: Date.now().toString(), name: 'New expense', amount: 0 }]);
  };

  const removeExpense = (id: string) => {
    setExpenses(cats => cats.filter(c => c.id !== id));
  };

  const totalBudget = parseFloat(budget) || 0;
  const totalPlanned = expenses.reduce((sum, e) => sum + (e.amount || 0), 0);
  const remaining = totalBudget - totalPlanned;
  const margin = totalBudget > 0 ? (totalPlanned / totalBudget) * 100 : 0;

  const chartData = expenses.filter(c => c.amount > 0).map((c, i) => ({
    name: c.name,
    value: c.amount,
    color: COLORS[i % COLORS.length]
  }));

  const handleDownload = () => window.print();

  return (
    <div className="bg-[#fcfdfd] min-h-screen py-20 md:py-24">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
          <div>
            <div className="text-[11px] font-bold text-accent uppercase tracking-[0.4em] mb-6 flex items-center gap-2">
              <span className="w-8 h-[1px] bg-accent/30"></span>
              FISCAL PLANNING
            </div>
            <h1 className="text-5xl md:text-8xl font-serif text-slate-900 mb-8 tracking-tighter leading-[0.95]">
              Marriage <span className="italic text-accent">Budget</span> Synthesis.
            </h1>
            <p className="text-slate-500 text-xl font-light max-w-2xl leading-relaxed">
              Orchestrate ceremony, venue, and operational costs into a high-integrity financial blueprint.
            </p>
          </div>
          <button onClick={handleDownload} className="group bg-slate-900 text-white px-10 py-5 font-bold text-[11px] uppercase tracking-[0.2em] rounded-2xl hover:bg-accent transition-all shadow-2xl flex items-center gap-3 shrink-0">
            <Download className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
            Export Blueprint
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          <div className="w-full lg:w-[450px] space-y-10">
            <div className="bg-white border border-slate-100 p-10 rounded-[2.5rem] shadow-xl">
              <div className="mb-10">
                <label className="block text-[10px] font-bold text-slate-800 uppercase tracking-[0.2em] mb-3 ml-1">
                  TOTAL CAPITAL ALLOCATION
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-serif">£</span>
                  <input 
                    type="number" value={budget} onChange={(e) => setBudget(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-100 p-4 pl-8 rounded-xl text-slate-900 focus:outline-none focus:border-accent focus:bg-white transition-all font-medium shadow-sm"
                  />
                </div>
              </div>

              <div className="flex justify-between items-center mb-8 border-b border-slate-50 pb-4">
                <h3 className="text-xl font-serif text-slate-900 italic">Cost Registry</h3>
                <button onClick={addExpense} className="text-accent text-[10px] font-bold uppercase tracking-widest flex items-center hover:opacity-70 transition-opacity">
                  <Plus className="w-3 h-3 mr-2 bg-accent text-white rounded-full p-0.5" /> Add category
                </button>
              </div>

              <div className="space-y-4">
                {expenses.map(exp => (
                  <div key={exp.id} className="group flex gap-3 items-center">
                    <div className="flex-grow relative">
                      <input 
                        type="text" 
                        value={exp.name} 
                        onChange={(e) => handleExpenseChange(exp.id, 'name', e.target.value)} 
                        className="w-full bg-slate-50 border border-slate-100 p-4 rounded-xl text-slate-900 focus:outline-none focus:border-accent focus:bg-white transition-all text-sm font-medium shadow-sm" 
                      />
                    </div>
                    <div className="w-32 relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300 text-xs font-serif">£</span>
                      <input 
                        type="number" 
                        value={exp.amount || ''} 
                        onChange={(e) => handleExpenseChange(exp.id, 'amount', e.target.value)} 
                        className="w-full bg-slate-50 border border-slate-100 p-4 pl-6 rounded-xl text-slate-900 focus:outline-none focus:border-accent focus:bg-white transition-all text-sm font-medium text-right shadow-sm" 
                      />
                    </div>
                    <button onClick={() => removeExpense(exp.id)} className="p-3 text-slate-300 hover:text-accent transition-colors shrink-0">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex-1">
            <div className="bg-white border border-slate-100 p-12 md:p-16 rounded-[4rem] shadow-2xl print:shadow-none print:p-0 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full -translate-y-48 translate-x-48 blur-3xl group-hover:bg-accent/10 transition-all duration-1000"></div>
              
              <div className="text-[11px] font-bold text-accent uppercase tracking-[0.3em] mb-6 relative z-10 flex items-center gap-3">
                FINANCIAL MATRIX
                <span className="w-12 h-[1px] bg-accent/20"></span>
              </div>
              <h2 className="text-4xl md:text-5xl font-serif text-slate-900 mb-12 tracking-tight italic relative z-10">Allocation Summary</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12 relative z-10">
                <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 group/metric transition-all hover:bg-white hover:shadow-xl hover:scale-[1.02]">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Total Allocation</div>
                  <div className="text-3xl md:text-4xl font-serif text-slate-900 tracking-tighter italic">£{totalBudget.toLocaleString('en-GB')}</div>
                </div>
                <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 group/metric transition-all hover:bg-white hover:shadow-xl hover:scale-[1.02]">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Committed Capital</div>
                  <div className="text-3xl md:text-4xl font-serif text-slate-900 tracking-tighter italic">£{totalPlanned.toLocaleString('en-GB')}</div>
                </div>
                <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 group/metric transition-all hover:bg-white hover:shadow-xl hover:scale-[1.02]">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Remaining Buffer</div>
                  <div className={`text-3xl md:text-4xl font-serif tracking-tighter italic ${remaining >= 0 ? 'text-slate-900' : 'text-accent'}`}>
                    {remaining < 0 ? '-' : ''}£{Math.abs(remaining).toLocaleString('en-GB')}
                  </div>
                </div>
                <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 group/metric transition-all hover:bg-white hover:shadow-xl hover:scale-[1.02]">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Utilisation Quotient</div>
                  <div className="text-3xl md:text-4xl font-serif text-slate-900 tracking-tighter italic">{margin.toFixed(0)}%</div>
                </div>
              </div>

              <div className="bg-white border border-slate-100 p-12 rounded-[3.5rem] mb-12 flex items-center justify-center min-h-[420px] shadow-sm relative z-10 group/chart">
                {chartData.length > 0 ? (
                  <div className="w-full flex justify-center items-center flex-col">
                    <div style={{ width: '100%', height: 300 }}>
                      <ResponsiveContainer>
                        <PieChart>
                          <Pie
                            data={chartData}
                            cx="50%"
                            cy="50%"
                            innerRadius={80}
                            outerRadius={120}
                            paddingAngle={4}
                            dataKey="value"
                            stroke="none"
                          >
                            {chartData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip 
                            formatter={(value: number) => [`£${value.toLocaleString('en-GB')}`, '']}
                            contentStyle={{ 
                              borderRadius: '24px', 
                              border: '1px solid #f1f5f9', 
                              boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
                              padding: '16px' 
                            }}
                            itemStyle={{ fontWeight: 600, fontSize: '12px' }}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    {/* Compact Legend */}
                    <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 mt-10 px-4 w-full">
                      {chartData.map((entry, index) => (
                        <div key={index} className="flex items-center text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                          <span 
                            className="w-2.5 h-2.5 mr-2 rounded-full flex-shrink-0" 
                            style={{ backgroundColor: entry.color }}
                          ></span>
                          {entry.name}
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-slate-300 font-serif italic text-xl">Operational data pending...</div>
                )}
              </div>
              
              <div className="bg-slate-50 p-10 rounded-[3rem] border border-slate-100 relative z-10">
                <h3 className="text-2xl font-serif text-slate-900 mb-6 tracking-tight italic flex items-center gap-4">
                  Deterministic Feedback
                  <span className="w-12 h-[1px] bg-accent/20"></span>
                </h3>
                <div className="space-y-4 text-slate-500 font-light text-lg leading-relaxed">
                  {remaining < 0 ? (
                    <p className="text-accent underline decoration-accent/20 underline-offset-8">Critical Warning: Projected expenditure exceeds capital allocation. Neutralize highest-friction expense lines immediately.</p>
                  ) : (
                    <p>Conventional benchmarks suggest venue and catering should not exceed 50% of total allocation. Maintain a minimum 7.5% contingency buffer for systemic irregularities.</p>
                  )}
                  <p>Synthesize must-have categories first, thereafter optimizing lower-priority supplier protocols.</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
