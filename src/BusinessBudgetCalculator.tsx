import React, { useState } from 'react';
import { Download, Plus, Trash2, Cloud } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { initAuth } from './auth';
import { saveFileToDrive } from './drive';

interface Expense {
  id: string;
  name: string;
  amount: number;
}

const COLORS = ['#a67c52', '#d6a54a', '#dcd8cf', '#eedfb4', '#1a1f24', '#7d8a83', '#5c452e', '#3d443e', '#7c867f'];

export default function BusinessBudgetCalculator() {
  const [revenue, setRevenue] = useState<string>('12000');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  React.useEffect(() => {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    if (clientId) {
      const timer = setTimeout(() => initAuth(clientId), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const [expenses, setExpenses] = useState<Expense[]>([
    { id: '1', name: 'Payroll or owner pay', amount: 4200 },
    { id: '2', name: 'Software', amount: 480 },
    { id: '3', name: 'Marketing', amount: 1200 },
    { id: '4', name: 'Premises', amount: 1500 },
    { id: '5', name: 'Professional fees', amount: 450 },
    { id: '6', name: 'Insurance', amount: 180 },
    { id: '7', name: 'Travel', amount: 350 },
    { id: '8', name: 'Tax set-aside', amount: 1800 },
    { id: '9', name: 'Profit reserve', amount: 1400 },
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
    setExpenses([...expenses, { id: Date.now().toString(), name: 'New category', amount: 0 }]);
  };

  const removeExpense = (id: string) => {
    setExpenses(cats => cats.filter(c => c.id !== id));
  };

  const grossRevenue = parseFloat(revenue) || 0;
  const totalPlanned = expenses.reduce((sum, e) => sum + (e.amount || 0), 0);
  const remaining = grossRevenue - totalPlanned;
  const margin = grossRevenue > 0 ? (totalPlanned / grossRevenue) * 100 : 0;

  const chartData = expenses.filter(c => c.amount > 0).map((c, i) => ({
    name: c.name,
    value: c.amount,
    color: COLORS[i % COLORS.length]
  }));

  const handleDownload = () => window.print();

  const handleSaveToDrive = async () => {
    try {
      setIsSaving(true);
      setSaveSuccess(false);

      const header = "Category,Amount\\n";
      const csvStr = header + expenses.filter(e => e.amount > 0).map(e => `"${e.name}",${e.amount}`).join('\\n');
      
      const fileContent = `Business Budget Summary\\nRevenue: £${grossRevenue}\\nTotal Planned: £${totalPlanned}\\nRemaining: £${remaining}\\nUsed: ${margin.toFixed(0)}%\\n\\n` + csvStr;
      
      await saveFileToDrive('Business_Budget_Plan.csv', fileContent, 'text/csv');
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      alert("Failed to save to Google Drive");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-20 gap-12">
          <div className="max-w-3xl">
            <div className="text-[11px] font-bold text-accent uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
              <span className="w-8 h-[1px] bg-accent"></span>
              CASHFLOW ARCHITECTURE
            </div>
            <h1 className="text-5xl md:text-8xl font-serif text-slate-900 mb-8 tracking-tighter leading-[0.9]">
              Operations <span className="italic text-accent">Budgeting</span>
            </h1>
            <p className="text-slate-500 text-xl font-light max-w-2xl leading-relaxed">
              Model your monthly Opex—payroll, marketing, premises, and tax set-aside—against revenue targets.
            </p>
          </div>
          <div className="flex gap-4 shrink-0 flex-wrap w-full lg:w-auto">
            <button onClick={handleDownload} className="flex-1 lg:flex-none flex items-center justify-center bg-white border border-slate-200 text-slate-800 px-10 py-5 font-bold text-[11px] uppercase tracking-widest hover:bg-slate-50 transition-all rounded-2xl shadow-sm">
              <Download className="w-4 h-4 mr-3" />
              Summary
            </button>
            <button onClick={handleSaveToDrive} disabled={isSaving} className="flex-1 lg:flex-none flex items-center justify-center bg-slate-900 text-white px-10 py-5 font-bold text-[11px] uppercase tracking-widest hover:bg-black transition-all rounded-2xl shadow-xl disabled:opacity-50 group">
              <Cloud className="w-4 h-4 mr-3 text-accent group-hover:scale-110 transition-transform" />
              {isSaving ? 'Syncing...' : 'Save to Drive'}
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Inputs */}
          <div className="w-full lg:w-1/3 xl:w-[400px] space-y-8">
            <div className="bg-white border border-slate-100 rounded-[2.5rem] p-10 shadow-2xl">
              <div className="mb-12">
                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-4 ml-1">
                  Monthly Target Revenue
                </label>
                <div className="relative">
                  <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 font-serif text-xl italic">£</span>
                  <input 
                    type="number" value={revenue} onChange={(e) => setRevenue(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-100 p-5 pl-10 text-slate-900 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:bg-white rounded-2xl font-serif text-2xl transition-all"
                  />
                </div>
              </div>

              <div className="flex justify-between items-center mb-8 px-1">
                <h3 className="text-2xl font-serif text-slate-900 italic">Allocation</h3>
                <button onClick={addExpense} className="w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center hover:bg-slate-900 transition-all shadow-lg scale-100 hover:scale-110">
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-4">
                {expenses.map(exp => (
                  <div key={exp.id} className="group relative flex flex-col gap-2 p-4 bg-slate-50 border border-slate-100 rounded-2xl hover:border-accent/40 transition-all">
                    <div className="flex gap-2 items-center">
                      <input type="text" value={exp.name} onChange={(e) => handleExpenseChange(exp.id, 'name', e.target.value)} className="flex-grow bg-transparent text-sm font-medium text-slate-700 focus:outline-none" />
                      <button onClick={() => removeExpense(exp.id)} className="opacity-0 group-hover:opacity-100 p-1 text-slate-300 hover:text-red-500 transition-all">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="relative">
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 text-slate-400 text-xs">£</span>
                      <input type="number" value={exp.amount || ''} onChange={(e) => handleExpenseChange(exp.id, 'amount', e.target.value)} className="w-full bg-transparent pl-4 pr-2 py-1 text-base font-serif text-slate-900 focus:outline-none border-b border-transparent focus:border-accent/20" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="flex-1">
            <div className="bg-white border border-slate-100 p-12 md:p-16 rounded-[3rem] shadow-2xl relative overflow-hidden print:shadow-none print:p-0">
              <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full -translate-y-32 translate-x-32"></div>
              
              <div className="text-[11px] font-bold text-accent uppercase tracking-[0.3em] mb-6">LIVE COMPOSITION</div>
              <h2 className="text-4xl font-serif text-slate-900 mb-12 tracking-tight">Financial Projection</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-slate-100 rounded-3xl overflow-hidden border border-slate-100 mb-12 shadow-inner">
                <div className="bg-white p-10">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">REVENUE TARGET</div>
                  <div className="text-4xl font-bold font-serif text-slate-900 tracking-tight leading-none">£{grossRevenue.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                </div>
                <div className="bg-white p-10">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">OPERATIONAL SPEND</div>
                  <div className="text-4xl font-bold font-serif text-slate-900 tracking-tight leading-none">£{totalPlanned.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                </div>
                <div className="bg-white p-10">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">NET REMAINDER</div>
                  <div className={`text-4xl font-bold font-serif tracking-tight leading-none ${remaining >= 0 ? 'text-accent italic' : 'text-red-500'}`}>
                    {remaining < 0 ? '-' : ''}£{Math.abs(remaining).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                </div>
                <div className="bg-white p-10">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">EFFICIENCY MARGIN</div>
                  <div className="text-4xl font-bold font-serif text-slate-900 tracking-tight leading-none">{(100 - margin).toFixed(1)}%</div>
                </div>
              </div>
              
              <div className="border border-slate-50 bg-slate-50/50 rounded-3xl p-10 mb-12 flex flex-col md:flex-row items-center gap-12">
                {chartData.length > 0 ? (
                  <>
                    <div className="w-full md:w-1/2 aspect-square max-w-[300px]">
                      <ResponsiveContainer>
                        <PieChart>
                          <Pie
                            data={chartData}
                            cx="50%"
                            cy="50%"
                            innerRadius={70}
                            outerRadius={100}
                            paddingAngle={4}
                            dataKey="value"
                            stroke="none"
                          >
                            {chartData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip 
                            formatter={(value: number) => [`£${value.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, '']}
                            contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.25)', padding: '16px' }}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="w-full md:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {chartData.map((entry, index) => (
                        <div key={index} className="flex items-center text-[11px] text-slate-500 font-bold tracking-widest uppercase truncate bg-white p-3 rounded-xl shadow-sm border border-slate-100">
                          <span 
                            className="w-3 h-3 mr-3 rounded-full flex-shrink-0 shadow-sm" 
                            style={{ backgroundColor: entry.color }}
                          ></span>
                          <span className="truncate">{entry.name}</span>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="w-full py-20 text-center text-slate-300 font-serif italic text-xl">Enter figures to generate visualization</div>
                )}
              </div>

              <div className="border-t border-slate-100 pt-12 grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                  <h3 className="text-[11px] font-bold uppercase tracking-[0.3em] text-accent mb-6">STRATEGIC COUNSEL</h3>
                  <div className="space-y-6 text-slate-500 font-light leading-relaxed text-sm">
                    <p className="italic border-l-2 border-accent/20 pl-6">"Business budgeting is most effective when tax set-aside and profit reserves are treated as fixed non-negotiable costs."</p>
                    <p>Observe the margin carefully. An efficiency score below 20% suggests a high-pressure operational environment.</p>
                  </div>
                </div>
                <div className="bg-slate-900 rounded-2xl p-8 text-white relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16 group-hover:scale-125 transition-transform duration-700"></div>
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-accent mb-6">QUICK TIP</h4>
                  <p className="text-white/80 font-light text-sm italic">Always maintain a 15% safety buffer for unexpected Opex variance.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
