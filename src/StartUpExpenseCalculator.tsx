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

const COLORS = ['#1a1f24', '#eedfb4', '#a67c52', '#7d8a83', '#d6a54a', '#5c452e', '#dcd8cf', '#3d443e', '#7c867f'];

export default function StartUpExpenseCalculator() {
  const [budget, setBudget] = useState<string>('25000');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  React.useEffect(() => {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    if (clientId) {
      const timer = setTimeout(() => initAuth(clientId), 1500); // Wait for API script to load just in case
      return () => clearTimeout(timer);
    }
  }, []);

  const [expenses, setExpenses] = useState<Expense[]>([
    { id: '1', name: 'Company setup and legal', amount: 900 },
    { id: '2', name: 'Equipment', amount: 4200 },
    { id: '3', name: 'Website and brand', amount: 1800 },
    { id: '4', name: 'Initial marketing', amount: 3500 },
    { id: '5', name: 'Stock or materials', amount: 5000 },
    { id: '6', name: 'Software setup', amount: 900 },
    { id: '7', name: 'Professional services', amount: 1600 },
    { id: '8', name: 'First 3 months runway', amount: 5200 },
    { id: '9', name: 'Contingency', amount: 1900 },
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

  const startingBudget = parseFloat(budget) || 0;
  const totalRequired = expenses.reduce((sum, e) => sum + (e.amount || 0), 0);
  const remainingBuffer = startingBudget - totalRequired;
  const margin = startingBudget > 0 ? (totalRequired / startingBudget) * 100 : 0;

  const handleSaveToDrive = async () => {
    try {
      setIsSaving(true);
      setSaveSuccess(false);

      const header = "Category,Amount\\n";
      const csvStr = header + expenses.filter(e => e.amount > 0).map(e => `"${e.name}",${e.amount}`).join('\\n');
      
      const fileContent = `Startup Expense Summary\\nBudget: £${startingBudget}\\nTotal Required: £${totalRequired}\\nRemaining: £${remainingBuffer}\\n\\n` + csvStr;
      
      await saveFileToDrive('Startup_Expense_Plan.csv', fileContent, 'text/csv');
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      alert("Failed to save to Google Drive");
    } finally {
      setIsSaving(false);
    }
  };

  const chartData = expenses.filter(c => c.amount > 0).map((c, i) => ({
    name: c.name,
    value: c.amount,
    color: COLORS[i % COLORS.length]
  }));

  return (
    <div className="bg-[#fcfdfd] min-h-screen py-20 md:py-24">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
          <div>
            <div className="text-[11px] font-bold text-accent uppercase tracking-[0.4em] mb-6 flex items-center gap-2">
              <span className="w-8 h-[1px] bg-accent/30"></span>
              VENTURE ARCHITECTURE
            </div>
            <h1 className="text-5xl md:text-8xl font-serif text-slate-900 mb-8 tracking-tighter leading-[0.95]">
              Startup <span className="italic text-accent">Capital</span> Synthesis.
            </h1>
            <p className="text-slate-500 text-xl font-light max-w-2xl leading-relaxed">
              Deconstruct one-off launch costs—equipment, legal, marketing, and runway—into a high-integrity fiscal blueprint.
            </p>
          </div>
          <div className="flex gap-4 shrink-0 flex-wrap">
            <button 
              onClick={() => window.print()} 
              className="group bg-white border border-slate-100 text-slate-900 px-8 py-5 font-bold text-[11px] uppercase tracking-[0.2em] rounded-2xl hover:bg-slate-50 transition-all shadow-xl flex items-center gap-3 shrink-0"
            >
              <Download className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
              Export Summary
            </button>
            <button 
              onClick={handleSaveToDrive} 
              disabled={isSaving} 
              className="group bg-slate-900 text-white px-10 py-5 font-bold text-[11px] uppercase tracking-[0.2em] rounded-2xl hover:bg-accent transition-all shadow-2xl flex items-center gap-3 shrink-0 disabled:opacity-50"
            >
              <Cloud className={`w-4 h-4 ${isSaving ? 'animate-pulse' : 'group-hover:scale-110 transition-transform'}`} />
              {isSaving ? 'ARCHIVING...' : saveSuccess ? 'SYNTHESIZED!' : 'SAVE TO DRIVE'}
            </button>
          </div>
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
                <h3 className="text-xl font-serif text-slate-900 italic">Expense Registry</h3>
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
              <h2 className="text-4xl md:text-5xl font-serif text-slate-900 mb-12 tracking-tight italic relative z-10">Launch Summary</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12 relative z-10">
                <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 group/metric transition-all hover:bg-white hover:shadow-xl hover:scale-[1.02]">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Target Budget</div>
                  <div className="text-3xl md:text-4xl font-serif text-slate-900 tracking-tighter italic">£{startingBudget.toLocaleString('en-GB')}</div>
                </div>
                <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 group/metric transition-all hover:bg-white hover:shadow-xl hover:scale-[1.02]">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Planned Expenditure</div>
                  <div className="text-3xl md:text-4xl font-serif text-slate-900 tracking-tighter italic">£{totalRequired.toLocaleString('en-GB')}</div>
                </div>
                <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 group/metric transition-all hover:bg-white hover:shadow-xl hover:scale-[1.02]">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Remaining Buffer</div>
                  <div className={`text-3xl md:text-4xl font-serif tracking-tighter italic ${remainingBuffer >= 0 ? 'text-slate-900' : 'text-accent'}`}>
                    {remainingBuffer < 0 ? '-' : ''}£{Math.abs(remainingBuffer).toLocaleString('en-GB')}
                  </div>
                </div>
                <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 group/metric transition-all hover:bg-white hover:shadow-xl hover:scale-[1.02]">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Allocated %</div>
                  <div className="text-3xl md:text-4xl font-serif text-slate-900 tracking-tighter italic">{margin.toFixed(0)}%</div>
                </div>
              </div>

              <div className="bg-white border border-slate-100 p-12 rounded-[3.5rem] mb-12 flex items-center justify-center min-h-[420px] shadow-sm relative z-10 group/pie">
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
                        <div key={index} className="flex items-center text-[10px] text-slate-400 font-bold uppercase tracking-widest whitespace-nowrap">
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
                  <div className="text-slate-300 font-serif italic text-xl">Allocation data pending...</div>
                )}
              </div>
              
              <div className="bg-slate-50 p-10 rounded-[3rem] border border-slate-100 relative z-10">
                <h3 className="text-2xl font-serif text-slate-900 mb-6 tracking-tight italic flex items-center gap-4">
                  Strategic Feedback
                  <span className="w-12 h-[1px] bg-accent/20"></span>
                </h3>
                <div className="space-y-4 text-slate-500 font-light text-lg leading-relaxed">
                  <p>The allocation blueprint is workable but tightly constrained. Maintain a visible contingency line to absorb systemic irregularities without compromising mission objectives.</p>
                  <p>Verify that your operational runway line adequately covers projected duration before revenue normalization.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
