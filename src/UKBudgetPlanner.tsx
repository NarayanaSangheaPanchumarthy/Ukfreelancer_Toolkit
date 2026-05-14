import React, { useState } from 'react';
import { Download, Plus, Trash2 } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';
import { motion } from 'motion/react';

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
    <div className="bg-[#fcfdfd] min-h-screen py-20 md:py-24">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
          <div>
            <div className="text-[11px] font-bold text-accent uppercase tracking-[0.4em] mb-6 flex items-center gap-2">
              <span className="w-8 h-[1px] bg-accent/30"></span>
              HOUSEHOLD ECONOMICS
            </div>
            <h1 className="text-5xl md:text-8xl font-serif text-slate-900 mb-8 tracking-tighter leading-[0.95]">
              Budget <span className="italic text-accent">Synthesis</span> UK.
            </h1>
            <p className="text-slate-500 text-xl font-light max-w-2xl leading-relaxed">
              Plan monthly income, essential expenditures, and lifestyle capital into a high-integrity financial blueprint.
            </p>
          </div>
          <button 
            onClick={handleDownload}
            className="group bg-slate-900 text-white px-10 py-5 font-bold text-[11px] uppercase tracking-[0.2em] rounded-2xl hover:bg-accent transition-all shadow-2xl flex items-center gap-3 shrink-0"
          >
            <Download className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
            Export Blueprint
          </button>
        </div>

        {/* Content Grid */}
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Left Column - Inputs */}
          <div className="w-full lg:w-[450px] space-y-10">
            <div className="bg-white border border-slate-100 p-10 rounded-[2.5rem] shadow-xl">
              <div className="mb-10">
                <label className="block text-[10px] font-bold text-slate-800 uppercase tracking-[0.2em] mb-3 ml-1">
                  MONTHLY NET INCOME
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-serif">£</span>
                  <input 
                    type="number"
                    value={income}
                    onChange={handleIncomeChange}
                    className="w-full bg-slate-50 border border-slate-100 p-4 pl-8 rounded-xl text-slate-900 focus:outline-none focus:border-accent focus:bg-white transition-all font-medium shadow-sm"
                  />
                </div>
              </div>

              <div className="flex justify-between items-center mb-8 border-b border-slate-50 pb-4">
                <h3 className="text-xl font-serif text-slate-900 italic">Expenditure Registry</h3>
                <button 
                  onClick={addCategory}
                  className="text-accent text-[10px] font-bold uppercase tracking-widest flex items-center hover:opacity-70 transition-opacity"
                >
                  <Plus className="w-3 h-3 mr-2 bg-accent text-white rounded-full p-0.5" /> Add category
                </button>
              </div>

              <div className="space-y-4">
                {categories.map(cat => (
                  <div key={cat.id} className="group flex gap-3 items-center">
                    <div className="flex-grow relative">
                      <input 
                        type="text"
                        value={cat.name}
                        onChange={(e) => handleCategoryChange(cat.id, 'name', e.target.value)}
                        className="w-full bg-slate-50 border border-slate-100 p-4 rounded-xl text-slate-900 focus:outline-none focus:border-accent focus:bg-white transition-all text-sm font-medium shadow-sm"
                      />
                    </div>
                    <div className="w-32 relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300 text-xs font-serif">£</span>
                      <input 
                        type="number"
                        value={cat.amount || ''}
                        onChange={(e) => handleCategoryChange(cat.id, 'amount', e.target.value)}
                        className="w-full bg-slate-50 border border-slate-100 p-4 pl-6 rounded-xl text-slate-900 focus:outline-none focus:border-accent focus:bg-white transition-all text-sm font-medium text-right shadow-sm"
                      />
                    </div>
                    <button 
                      onClick={() => removeCategory(cat.id)}
                      className="p-3 text-slate-300 hover:text-accent transition-colors shrink-0"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Summary & Chart */}
          <div className="flex-1 space-y-12">
            <div className="bg-white border border-slate-100 p-12 md:p-16 rounded-[4rem] shadow-2xl print:shadow-none print:p-0 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full -translate-y-48 translate-x-48 blur-3xl group-hover:bg-accent/10 transition-all duration-1000"></div>
              
              <div className="text-[11px] font-bold text-accent uppercase tracking-[0.3em] mb-6 relative z-10 flex items-center gap-3">
                FISCAL SNAPSHOT
                <span className="w-12 h-[1px] bg-accent/20"></span>
              </div>
              <h2 className="text-4xl md:text-5xl font-serif text-slate-900 mb-12 tracking-tight italic relative z-10">
                Monthly Synthesis
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12 relative z-10">
                <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 group/metric transition-all hover:bg-white hover:shadow-xl hover:scale-[1.02]">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Net Capital</div>
                  <div className="text-3xl md:text-4xl font-serif text-slate-900 tracking-tighter italic">£{budget.toLocaleString('en-GB')}</div>
                </div>
                <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 group/metric transition-all hover:bg-white hover:shadow-xl hover:scale-[1.02]">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Planned Outflow</div>
                  <div className="text-3xl md:text-4xl font-serif text-slate-900 tracking-tighter italic">£{planned.toLocaleString('en-GB')}</div>
                </div>
                <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 group/metric transition-all hover:bg-white hover:shadow-xl hover:scale-[1.02]">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Remaining Buffer</div>
                  <div className={`text-3xl md:text-4xl font-serif tracking-tighter italic ${remaining > 0 ? 'text-slate-900' : remaining < 0 ? 'text-accent' : 'text-slate-900'}`}>
                    £{remaining.toLocaleString('en-GB')}
                  </div>
                </div>
                <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 group/metric transition-all hover:bg-white hover:shadow-xl hover:scale-[1.02]">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Utilisation Quotient</div>
                  <div className="text-3xl md:text-4xl font-serif text-slate-900 tracking-tighter italic">{usedPercentage}%</div>
                </div>
              </div>

              <div className="bg-white border border-slate-100 p-12 rounded-[3.5rem] mb-12 flex items-center justify-center min-h-[420px] shadow-sm relative z-10 group/pie">
                {chartData.length > 0 ? (
                  <div className="w-full flex justify-center items-center flex-col">
                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-8 self-center w-full text-center italic opacity-60">
                      Capital Allocation Vectors
                    </div>
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        viewport={{ once: true }}
                        style={{ width: '100%', height: 300 }}>
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
                    </motion.div>
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
                  <div className="text-slate-300 font-serif italic text-xl">Allocation data pending...</div>
                )}
              </div>

              <div className="bg-white border border-slate-100 p-12 rounded-[3.5rem] mb-12 flex items-center justify-center min-h-[460px] shadow-sm relative z-10 group/bar">
                {chartData.length > 0 ? (
                  <div className="w-full h-full flex flex-col">
                     <div className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-10 w-full text-center italic opacity-60">
                      Septenary Spending Dynamics (Daily Projection)
                    </div>
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        viewport={{ once: true }}
                        style={{ width: '100%', height: 320 }}>
                      <ResponsiveContainer>
                        <BarChart data={weeklyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="8 8" vertical={false} stroke="#f1f5f9" />
                          <XAxis 
                            dataKey="day" 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 700, letterSpacing: '0.1em' }}
                            dy={15}
                          />
                          <YAxis 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{ fill: '#94a3b8', fontSize: 10 }}
                          />
                          <Tooltip 
                            cursor={{ fill: '#f8fafc' }}
                            contentStyle={{ 
                              borderRadius: '24px', 
                              border: '1px solid #f1f5f9', 
                              boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
                              padding: '16px' 
                            }}
                            formatter={(value: number) => `£${value.toFixed(2)}`}
                          />
                          <Legend 
                            verticalAlign="top" 
                            align="right" 
                            iconType="circle"
                            iconSize={10}
                            wrapperStyle={{ fontSize: '9px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', paddingBottom: '30px', color: '#94a3b8' }}
                          />
                          {categories.map((cat, index) => (
                            <Bar 
                              key={cat.id} 
                              dataKey={cat.name} 
                              stackId="a" 
                              fill={COLORS[index % COLORS.length]} 
                              radius={index === categories.length - 1 ? [6, 6, 0, 0] : [0, 0, 0, 0]}
                            />
                          ))}
                        </BarChart>
                      </ResponsiveContainer>
                    </motion.div>
                  </div>
                ) : (
                  <div className="text-slate-300 font-serif italic text-xl">Projection data pending...</div>
                )}
              </div>

              <div className="bg-slate-50 p-10 rounded-[3rem] border border-slate-100 relative z-10">
                <h3 className="text-2xl font-serif text-slate-900 mb-6 tracking-tight italic flex items-center gap-4">
                  Strategic Feedback
                  <span className="w-12 h-[1px] bg-accent/20"></span>
                </h3>
                <p className="text-slate-500 text-lg font-light leading-relaxed">
                  Automate capital preservation into savings protocols prior to discretionary allocation. Re-evaluate lifestyle vectors Monthly to ensure long-term fiscal integrity.
                </p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
