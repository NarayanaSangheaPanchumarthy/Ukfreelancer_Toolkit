import React, { useState } from 'react';
import { Download } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';

export default function DigitalDetoxCalculator() {
  const [currentDaily, setCurrentDaily] = useState('5');
  const [targetDaily, setTargetDaily] = useState('2');
  const [daysPerWeek, setDaysPerWeek] = useState('7');
  const [hourlyValue, setHourlyValue] = useState('18');

  const curr = parseFloat(currentDaily) || 0;
  const target = parseFloat(targetDaily) || 0;
  const days = parseFloat(daysPerWeek) || 0;
  const value = parseFloat(hourlyValue) || 0;

  const dailySaved = Math.max(0, curr - target);
  const weeklySaved = dailySaved * days;
  const monthlySaved = (weeklySaved / 7) * 30.4; // Average days in month
  const yearlySaved = weeklySaved * 52;
  const yearlyValue = yearlySaved * value;

  const chartData = [
    { name: 'Week', value: parseFloat(weeklySaved.toFixed(1)) },
    { name: 'Month', value: parseFloat(monthlySaved.toFixed(1)) },
    { name: 'Year', value: parseFloat(yearlySaved.toFixed(0)) }
  ];

  const handleDownload = () => window.print();

  return (
    <div className="bg-[#f5f7f9] min-h-screen py-12 md:py-16">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 border-b border-slate-200 pb-8">
          <div>
            <div className="text-[10px] font-bold text-[#a67c52] uppercase tracking-widest mb-4">
              TIME RECLAIMED
            </div>
            <h1 className="text-4xl md:text-6xl font-serif text-slate-900 mb-4 tracking-tight">
              Digital Detox Calculator
            </h1>
            <p className="text-slate-600 text-lg max-w-2xl">
              Calculate the weekly, monthly, and yearly time you can reclaim by reducing daily screen time.
            </p>
          </div>
          <button 
            onClick={handleDownload}
            className="mt-6 md:mt-0 flex items-center bg-[#1a1f24] text-white px-6 py-3 font-bold text-sm hover:bg-black transition-colors shrink-0"
          >
            <Download className="w-4 h-4 mr-2" />
            Download summary
          </button>
        </div>

        {/* Content Grid */}
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left Column - Inputs */}
          <div className="w-full lg:w-1/3">
            <div className="border border-slate-200 bg-transparent p-6 grid grid-cols-2 gap-6">
              
              <div className="col-span-2">
                <label className="block text-[10px] font-bold text-slate-800 uppercase tracking-widest mb-2">
                  CURRENT DAILY SCREEN TIME
                </label>
                <input 
                  type="number"
                  value={currentDaily}
                  onChange={(e) => setCurrentDaily(e.target.value)}
                  className="w-full border border-slate-300 bg-white p-3 text-slate-900 focus:outline-none focus:border-blue-500 rounded-none text-sm font-medium"
                />
              </div>

              <div className="col-span-2">
                <label className="block text-[10px] font-bold text-slate-800 uppercase tracking-widest mb-2">
                  TARGET DAILY SCREEN TIME
                </label>
                <input 
                  type="number"
                  value={targetDaily}
                  onChange={(e) => setTargetDaily(e.target.value)}
                  className="w-full border border-slate-300 bg-white p-3 text-slate-900 focus:outline-none focus:border-blue-500 rounded-none text-sm font-medium"
                />
              </div>

              <div className="col-span-2">
                <label className="block text-[10px] font-bold text-slate-800 uppercase tracking-widest mb-2">
                  DAYS PER WEEK
                </label>
                <input 
                  type="number"
                  max="7"
                  min="1"
                  value={daysPerWeek}
                  onChange={(e) => setDaysPerWeek(e.target.value)}
                  className="w-full border border-slate-300 bg-white p-3 text-slate-900 focus:outline-none focus:border-blue-500 rounded-none text-sm font-medium"
                />
              </div>

              <div className="col-span-2">
                <label className="block text-[10px] font-bold text-slate-800 uppercase tracking-widest mb-2">
                  OPTIONAL HOURLY VALUE
                </label>
                <input 
                  type="number"
                  value={hourlyValue}
                  onChange={(e) => setHourlyValue(e.target.value)}
                  className="w-full border border-slate-300 bg-white p-3 text-slate-900 focus:outline-none focus:border-blue-500 rounded-none text-sm font-medium"
                />
              </div>

            </div>
          </div>

          {/* Right Column - Summary */}
          <div className="w-full lg:w-2/3">
            <div className="bg-white border border-slate-200 p-8 shadow-sm print:shadow-none print:p-0">
              <div className="text-[10px] font-bold text-[#a67c52] uppercase tracking-widest mb-4">
                DETOX SUMMARY
              </div>
              <h2 className="text-4xl font-serif text-slate-900 mb-8 tracking-tight">
                Screen-time savings
              </h2>

              <div className="grid grid-cols-2 border border-slate-200 mb-0">
                <div className="p-6 border-b border-r border-slate-200">
                  <div className="text-[10px] font-bold text-slate-800 uppercase tracking-widest mb-2">DAILY SAVED</div>
                  <div className="text-3xl font-bold font-serif text-slate-900 tracking-tight">{dailySaved.toFixed(1)} hrs</div>
                </div>
                <div className="p-6 border-b border-slate-200">
                  <div className="text-[10px] font-bold text-slate-800 uppercase tracking-widest mb-2">WEEKLY SAVED</div>
                  <div className="text-3xl font-bold font-serif text-slate-900 tracking-tight">{weeklySaved.toFixed(1)} hrs</div>
                </div>
                <div className="p-6 border-r border-slate-200">
                  <div className="text-[10px] font-bold text-slate-800 uppercase tracking-widest mb-2">MONTHLY SAVED</div>
                  <div className="text-3xl font-bold font-serif text-slate-900 tracking-tight">{monthlySaved.toFixed(1)} hrs</div>
                </div>
                <div className="p-6">
                  <div className="text-[10px] font-bold text-slate-800 uppercase tracking-widest mb-2">YEARLY SAVED</div>
                  <div className="text-3xl font-bold font-serif text-slate-900 tracking-tight">
                    {yearlySaved.toLocaleString('en-GB')} hrs
                  </div>
                </div>
              </div>

              <div className="bg-[#1a1f24] p-6 mb-8 mt-0">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
                  OPTIONAL YEARLY VALUE
                </div>
                <div className="text-3xl font-bold font-serif text-white tracking-tight">
                  £{yearlyValue.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
              </div>

              <div className="border border-slate-200 p-8 mb-8 h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis 
                      dataKey="name" 
                      axisLine={{ stroke: '#94a3b8' }} 
                      tickLine={true} 
                      tick={{ fill: '#64748b', fontSize: 12 }} 
                    />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: '#64748b', fontSize: 12 }} 
                    />
                    <Tooltip 
                       cursor={{fill: '#f8fafc'}}
                       contentStyle={{ borderRadius: '4px', border: '1px solid #e2e8f0', boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)' }}
                    />
                    <Bar dataKey="value" fill="#1a1f24" maxBarSize={120} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div>
                <h3 className="text-xl font-serif text-slate-900 mb-4 tracking-tight border-b border-slate-200 pb-2">
                  Recommendation
                </h3>
                <p className="text-slate-600">
                  Start by removing the highest-friction hour first: late-night scrolling, morning checking, or idle app switching.
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
