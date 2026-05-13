import React, { useState } from 'react';
import { Download, Plus, Trash2 } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';

interface Category {
  id: string;
  name: string;
  amount: number;
}

const COLORS = ['#a67c52', '#d6a54a', '#dcd8cf', '#eedfb4', '#1a1f24', '#7d8a83', '#5c452e', '#3d443e', '#7c867f'];

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export default function UKBudgetPlanner() {
  const [income, setIncome] = useState<string>('3200');
  const [categories, setCategories] = useState<Category[]>([
    { id: '1', name: 'Rent or mortgage', amount: 1100 },
    { id: '2', name: 'Council tax', amount: 160 },
    { id: '3', name: 'Utilities', amount: 220 },
    { id: '4', name: 'Groceries', amount: 420 },
    { id: '5', name: 'Transport', amount: 240 },
    { id: '6', name: 'Insurance', amount: 95 },
    { id: '7', name: 'Subscriptions', amount: 55 },
    { id: '8', name: 'Savings', amount: 350 },
    { id: '9', name: 'Lifestyle', amount: 300 },
  ]);

  const handleIncomeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIncome(e.target.value);
  };

  const handleCategoryChange = (id: string, field: 'name' | 'amount', value: string) => {
    setCategories(cats => cats.map(cat => {
      if (cat.id === id) {
        if (field === 'amount') {
          return { ...cat, amount: parseFloat(value) || 0 };
        }
        return { ...cat, name: value };
      }
      return cat;
    }));
  };

  const addCategory = () => {
    setCategories([...categories, { id: Date.now().toString(), name: 'New category', amount: 0 }]);
  };

  const removeCategory = (id: string) => {
    setCategories(cats => cats.filter(c => c.id !== id));
  };

  const budget = parseFloat(income) || 0;
  const planned = categories.reduce((sum, cat) => sum + (cat.amount || 0), 0);
  const remaining = budget - planned;
  const usedPercentage = budget > 0 ? ((planned / budget) * 100).toFixed(0) : 0;

  const chartData = categories.filter(c => c.amount > 0).map((c, i) => ({
    name: c.name,
    value: c.amount,
    color: COLORS[i % COLORS.length]
  }));

  // Generate 7-day data based on daily averages
  const weeklyData = DAYS.map((day, dayIndex) => {
    const dailySpend: any = { day };
    categories.forEach((cat) => {
      // Monthly amount to daily (approx)
      // We add some slight variation for "Lifestyle", "Groceries", "Transport" to make it look realistic
      let dailyAmount = (cat.amount || 0) / 30;
      
      const variableCats = ['Groceries', 'Transport', 'Lifestyle'];
      if (variableCats.includes(cat.name)) {
        // Higher spend on weekends (Fri, Sat, Sun are indices 4, 5, 6)
        const isWeekend = dayIndex >= 4;
        const multiplier = isWeekend ? 1.4 : 0.8;
        dailyAmount *= multiplier;
      }
      
      dailySpend[cat.name] = parseFloat(dailyAmount.toFixed(2));
    });
    return dailySpend;
  });

  const handleDownload = () => {
    window.print();
  };

  return (
    <div className="bg-[#f5f7f9] min-h-screen py-12 md:py-16">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
          <div>
            <div className="text-[10px] font-bold text-[#a67c52] uppercase tracking-widest mb-4">
              HOUSEHOLD PLANNING
            </div>
            <h1 className="text-4xl md:text-6xl font-serif text-slate-900 mb-4 tracking-tight">
              UK Budget Planner
            </h1>
            <p className="text-slate-600 text-lg">
              Plan monthly income, essential spending, lifestyle costs, savings, and remaining money.
            </p>
          </div>
          <button 
            onClick={handleDownload}
            className="mt-6 md:mt-0 flex items-center bg-[#1a1f24] text-white px-6 py-3 font-bold text-sm hover:bg-black transition-colors"
          >
            <Download className="w-4 h-4 mr-2" />
            Download summary
          </button>
        </div>

        {/* Content Grid */}
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left Column - Inputs */}
          <div className="w-full lg:w-1/3 space-y-8">
            <div className="bg-white border border-slate-200 p-8 shadow-sm">
              <div className="mb-8">
                <label className="block text-[10px] font-bold text-slate-800 uppercase tracking-widest mb-3">
                  MONTHLY TAKE-HOME INCOME
                </label>
                <input 
                  type="number"
                  value={income}
                  onChange={handleIncomeChange}
                  className="w-full border border-slate-200 p-3 text-slate-900 focus:outline-none focus:border-blue-500 rounded-none shadow-sm font-medium"
                />
              </div>

              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-serif text-slate-900">Categories</h3>
                <button 
                  onClick={addCategory}
                  className="text-[#a67c52] text-sm font-bold flex items-center hover:text-[#8c6b2e]"
                >
                  <Plus className="w-4 h-4 mr-1 stroke-[3]" /> Add category
                </button>
              </div>

              <div className="space-y-3">
                {categories.map(cat => (
                  <div key={cat.id} className="flex gap-2">
                    <input 
                      type="text"
                      value={cat.name}
                      onChange={(e) => handleCategoryChange(cat.id, 'name', e.target.value)}
                      className="flex-grow border border-slate-200 p-3 text-slate-900 focus:outline-none focus:border-blue-500 rounded-none w-1/2"
                    />
                    <input 
                      type="number"
                      value={cat.amount || ''}
                      onChange={(e) => handleCategoryChange(cat.id, 'amount', e.target.value)}
                      className="w-24 border border-slate-200 p-3 text-slate-900 focus:outline-none focus:border-blue-500 rounded-none text-right"
                    />
                    <button 
                      onClick={() => removeCategory(cat.id)}
                      className="p-3 border border-slate-200 text-slate-400 hover:text-red-500 hover:border-red-200 hover:bg-red-50 transition-colors flex items-center justify-center shrink-0"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Summary & Chart */}
          <div className="w-full lg:w-2/3 space-y-8">
            <div className="bg-white border border-slate-200 p-8 shadow-sm print:shadow-none print:p-0">
              <div className="text-[10px] font-bold text-[#a67c52] uppercase tracking-widest mb-4">
                MONTH SUMMARY
              </div>
              <h2 className="text-4xl font-serif text-slate-900 mb-8 tracking-tight">
                UK Budget Planner
              </h2>

              <div className="grid grid-cols-2 border border-slate-200 mb-8">
                <div className="p-6 border-b border-r border-slate-200">
                  <div className="text-[10px] font-bold text-slate-800 uppercase tracking-widest mb-2">BUDGET</div>
                  <div className="text-3xl font-bold font-serif text-slate-900 tracking-tight">£{budget.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                </div>
                <div className="p-6 border-b border-slate-200">
                  <div className="text-[10px] font-bold text-slate-800 uppercase tracking-widest mb-2">PLANNED</div>
                  <div className="text-3xl font-bold font-serif text-slate-900 tracking-tight">£{planned.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                </div>
                <div className="p-6 border-r border-slate-200">
                  <div className="text-[10px] font-bold text-slate-800 uppercase tracking-widest mb-2">REMAINING</div>
                  <div className={`text-3xl font-bold font-serif tracking-tight ${remaining > 0 ? 'text-[#2a8b5e]' : remaining < 0 ? 'text-red-600' : 'text-slate-900'}`}>
                    £{remaining.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                </div>
                <div className="p-6">
                  <div className="text-[10px] font-bold text-slate-800 uppercase tracking-widest mb-2">USED</div>
                  <div className="text-3xl font-bold font-serif text-slate-900 tracking-tight">{usedPercentage}%</div>
                </div>
              </div>

              <div className="border border-slate-200 p-8 mb-8 flex items-center justify-center min-h-[360px] relative transition-all">
                {chartData.length > 0 ? (
                  <div className="w-full flex justify-center items-center flex-col">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6 self-start w-full text-center border-b border-slate-100 pb-4">
                      Allocation breakdown
                    </div>
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

              <div className="border border-slate-200 p-8 mb-8 flex items-center justify-center min-h-[360px] relative">
                {chartData.length > 0 ? (
                  <div className="w-full h-full flex flex-col">
                     <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6 w-full text-center border-b border-slate-100 pb-4">
                      7-day spending perspective (Daily Average)
                    </div>
                    <div style={{ width: '100%', height: 300 }}>
                      <ResponsiveContainer>
                        <BarChart data={weeklyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                          <XAxis 
                            dataKey="day" 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 600 }}
                            dy={10}
                          />
                          <YAxis 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{ fill: '#94a3b8', fontSize: 10 }}
                          />
                          <Tooltip 
                            cursor={{ fill: '#f8fafc' }}
                            contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontSize: '12px' }}
                            formatter={(value: number) => `£${value.toFixed(2)}`}
                          />
                          <Legend 
                            verticalAlign="top" 
                            align="right" 
                            iconType="circle"
                            iconSize={8}
                            wrapperStyle={{ fontSize: '10px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', paddingBottom: '20px' }}
                          />
                          {categories.map((cat, index) => (
                            <Bar 
                              key={cat.id} 
                              dataKey={cat.name} 
                              stackId="a" 
                              fill={COLORS[index % COLORS.length]} 
                              radius={index === categories.length - 1 ? [4, 4, 0, 0] : [0, 0, 0, 0]}
                            />
                          ))}
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                ) : (
                  <div className="text-slate-400 font-medium">No projection data available</div>
                )}
              </div>

              <div>
                <h3 className="text-xl font-serif text-slate-900 mb-4 tracking-tight border-b border-slate-200 pb-2">Recommendations</h3>
                <p className="text-slate-600">
                  For personal budgets, automate savings before discretionary spending where possible.
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
