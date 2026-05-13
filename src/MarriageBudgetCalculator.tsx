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
    <div className="bg-[#f5f7f9] min-h-screen py-12 md:py-16">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
          <div>
            <div className="text-[10px] font-bold text-[#a67c52] uppercase tracking-widest mb-4">
              WEDDING COSTS
            </div>
            <h1 className="text-4xl md:text-6xl font-serif text-slate-900 mb-4 tracking-tight">
              Marriage Budget Calculator
            </h1>
            <p className="text-slate-600 text-lg max-w-2xl">
              Estimate ceremony, venue, outfits, suppliers, honeymoon, and contingency in one view.
            </p>
          </div>
          <button onClick={handleDownload} className="mt-6 md:mt-0 flex items-center bg-[#1a1f24] text-white px-6 py-3 font-bold text-sm hover:bg-black transition-colors shrink-0">
            <Download className="w-4 h-4 mr-2" />
            Download summary
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-1/3 space-y-6">
            <div className="bg-white border border-slate-200 p-8 shadow-sm">
              <div className="mb-8">
                <label className="block text-[10px] font-bold text-slate-800 uppercase tracking-widest mb-3">
                  TOTAL WEDDING BUDGET
                </label>
                <input 
                  type="number" value={budget} onChange={(e) => setBudget(e.target.value)}
                  className="w-full border border-slate-200 p-3 text-slate-900 focus:outline-none rounded-none font-medium"
                />
              </div>

              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-serif text-slate-900">Categories</h3>
                <button onClick={addExpense} className="text-[#a67c52] text-sm font-bold flex items-center hover:text-[#8c6b2e]">
                  <Plus className="w-4 h-4 mr-1 stroke-[3]" /> Add category
                </button>
              </div>

              <div className="space-y-3">
                {expenses.map(exp => (
                  <div key={exp.id} className="flex gap-2">
                    <input type="text" value={exp.name} onChange={(e) => handleExpenseChange(exp.id, 'name', e.target.value)} className="flex-grow border border-slate-200 p-3 text-slate-900 focus:outline-none focus:border-blue-500 rounded-none w-1/2" />
                    <input type="number" value={exp.amount || ''} onChange={(e) => handleExpenseChange(exp.id, 'amount', e.target.value)} className="w-24 border border-slate-200 p-3 text-slate-900 focus:outline-none focus:border-blue-500 rounded-none text-right" />
                    <button onClick={() => removeExpense(exp.id)} className="p-3 border border-slate-200 text-slate-400 hover:text-red-500 hover:border-red-200 hover:bg-red-50 transition-colors flex items-center justify-center shrink-0">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="w-full lg:w-2/3">
            <div className="bg-white border border-slate-200 p-8 shadow-sm print:shadow-none print:p-0">
              <div className="text-[10px] font-bold text-[#a67c52] uppercase tracking-widest mb-4">EVENT SUMMARY</div>
              <h2 className="text-4xl font-serif text-slate-900 mb-8 tracking-tight">Marriage Budget Calculator</h2>

              <div className="grid grid-cols-2 border border-slate-200 mb-8">
                <div className="p-6 border-b border-r border-slate-200">
                  <div className="text-[10px] font-bold text-slate-800 uppercase tracking-widest mb-2">BUDGET</div>
                  <div className="text-3xl font-bold font-serif text-slate-900 tracking-tight">£{totalBudget.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                </div>
                <div className="p-6 border-b border-slate-200">
                  <div className="text-[10px] font-bold text-slate-800 uppercase tracking-widest mb-2">PLANNED</div>
                  <div className="text-3xl font-bold font-serif text-slate-900 tracking-tight">£{totalPlanned.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                </div>
                <div className="p-6 border-r border-slate-200">
                  <div className="text-[10px] font-bold text-slate-800 uppercase tracking-widest mb-2">REMAINING</div>
                  <div className={`text-3xl font-bold font-serif tracking-tight ${remaining >= 0 ? 'text-[#2a8b5e]' : 'text-red-600'}`}>
                    {remaining < 0 ? '-' : ''}£{Math.abs(remaining).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                </div>
                <div className="p-6">
                  <div className="text-[10px] font-bold text-slate-800 uppercase tracking-widest mb-2">USED</div>
                  <div className="text-3xl font-bold font-serif text-slate-900 tracking-tight">{margin.toFixed(0)}%</div>
                </div>
              </div>

              <div className="border border-slate-200 p-8 mb-8 flex items-center justify-center min-h-[360px] relative">
                {chartData.length > 0 ? (
                  <div className="w-full flex justify-center items-center flex-col">
                    <div style={{ width: '100%', height: 260 }}>
                      <ResponsiveContainer>
                        <PieChart>
                          <Pie
                            data={chartData}
                            cx="50%"
                            cy="50%"
                            innerRadius={70}
                            outerRadius={100}
                            paddingAngle={2}
                            dataKey="value"
                            stroke="none"
                          >
                            {chartData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip 
                            formatter={(value: number) => [`£${value.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, '']}
                            contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    {/* Compact Legend */}
                    <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mt-4 px-4 w-full">
                      {chartData.map((entry, index) => (
                        <div key={index} className="flex items-center text-xs text-slate-500 font-medium">
                          <span 
                            className="w-2.5 h-2.5 mr-1.5 flex-shrink-0 bg-slate-200" 
                            style={{ backgroundColor: entry.color }}
                          ></span>
                          {entry.name}
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-slate-400 font-medium">No planned expenses to display</div>
                )}
              </div>
              
              <div>
                <h3 className="text-xl font-serif mb-4 pb-2 border-b border-slate-200">Recommendations</h3>
                <div className="space-y-3 text-slate-600">
                  {remaining < 0 ? (
                    <p>Your planned costs exceed the available budget. Reduce the largest category first or increase the budget before committing.</p>
                  ) : (
                    <p>Venues and catering generally consume 40-50% of the budget. Don't forget to keep at least 5-10% of your total budget untouched as a contingency fund for last-minute emergencies.</p>
                  )}
                  <p>For wedding planning, agree the must-have categories first, then trim lower-priority supplier lines.</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
