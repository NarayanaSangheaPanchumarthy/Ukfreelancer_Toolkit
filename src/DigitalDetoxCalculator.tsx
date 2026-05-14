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
    <div className="bg-[#fcfdfd] min-h-screen py-20 md:py-24">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8">
          <div>
            <div className="text-[11px] font-bold text-accent uppercase tracking-[0.4em] mb-6 flex items-center gap-2">
              <span className="w-8 h-[1px] bg-accent/30"></span>
              TEMPORAL RECLAMATION
            </div>
            <h1 className="text-5xl md:text-8xl font-serif text-slate-900 mb-8 tracking-tighter leading-[0.95]">
              Digital <span className="italic text-accent">Detox</span> Synthesis.
            </h1>
            <p className="text-slate-500 text-xl font-light max-w-2xl leading-relaxed">
              Calculate precisely how much lifespan you can reclaim by neutralizing excessive screen engagement.
            </p>
          </div>
          <button 
            onClick={handleDownload}
            className="group bg-slate-900 text-white px-10 py-5 font-bold text-[11px] uppercase tracking-[0.2em] rounded-2xl hover:bg-accent transition-all shadow-2xl flex items-center gap-3 shrink-0"
          >
            <Download className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
            Export Synthesis
          </button>
        </div>

        {/* Content Grid */}
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Left Column - Inputs */}
          <div className="w-full lg:w-[400px]">
            <div className="bg-white border border-slate-100 p-10 rounded-[2.5rem] shadow-xl space-y-8">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2 border-b border-slate-50 pb-4">Detox Calibration</div>
              
              <div className="space-y-6">
              <div className="space-y-3">
                <label className="block text-[10px] font-bold text-slate-800 uppercase tracking-[0.2em] ml-1">
                  CURRENT DIURNAL USAGE
                </label>
                <input 
                  type="number"
                  value={currentDaily}
                  onChange={(e) => setCurrentDaily(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-100 p-4 rounded-xl text-slate-900 focus:outline-none focus:border-accent focus:bg-white transition-all text-sm font-medium shadow-sm"
                />
              </div>

              <div className="space-y-3">
                <label className="block text-[10px] font-bold text-slate-800 uppercase tracking-[0.2em] ml-1">
                  TARGET DIURNAL USAGE
                </label>
                <input 
                  type="number"
                  value={targetDaily}
                  onChange={(e) => setTargetDaily(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-100 p-4 rounded-xl text-slate-900 focus:outline-none focus:border-accent focus:bg-white transition-all text-sm font-medium shadow-sm"
                />
              </div>

              <div className="space-y-3">
                <label className="block text-[10px] font-bold text-slate-800 uppercase tracking-[0.2em] ml-1">
                  SEPTENARY FREQUENCY
                </label>
                <input 
                  type="number"
                  max="7"
                  min="1"
                  value={daysPerWeek}
                  onChange={(e) => setDaysPerWeek(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-100 p-4 rounded-xl text-slate-900 focus:outline-none focus:border-accent focus:bg-white transition-all text-sm font-medium shadow-sm"
                />
              </div>

              <div className="space-y-3">
                <label className="block text-[10px] font-bold text-slate-800 uppercase tracking-[0.2em] ml-1">
                  HOURLY VALUATION
                </label>
                <input 
                  type="number"
                  value={hourlyValue}
                  onChange={(e) => setHourlyValue(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-100 p-4 rounded-xl text-slate-900 focus:outline-none focus:border-accent focus:bg-white transition-all text-sm font-medium shadow-sm"
                />
              </div>
              </div>

            </div>
          </div>

          {/* Right Column - Summary */}
          <div className="flex-1">
            <div className="bg-white border border-slate-100 p-12 md:p-16 rounded-[4rem] shadow-2xl print:shadow-none print:p-0 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full -translate-y-48 translate-x-48 blur-3xl group-hover:bg-accent/10 transition-all duration-1000"></div>
              
              <div className="text-[11px] font-bold text-accent uppercase tracking-[0.3em] mb-6 relative z-10 flex items-center gap-3">
                AUTONOMY METRICS
                <span className="w-12 h-[1px] bg-accent/20"></span>
              </div>
              <h2 className="text-4xl md:text-5xl font-serif text-slate-900 mb-12 tracking-tight italic relative z-10">
                Llife-time Restoration
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12 relative z-10">
                <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 group/metric transition-all hover:bg-white hover:shadow-xl hover:scale-[1.02]">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Diurnal Reclamation</div>
                  <div className="text-4xl font-serif text-slate-900 tracking-tighter italic">{dailySaved.toFixed(1)} <span className="text-lg text-slate-400 not-italic uppercase tracking-widest">Hrs</span></div>
                </div>
                <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 group/metric transition-all hover:bg-white hover:shadow-xl hover:scale-[1.02]">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Septenary Reclamation</div>
                  <div className="text-4xl font-serif text-slate-900 tracking-tighter italic">{weeklySaved.toFixed(1)} <span className="text-lg text-slate-400 not-italic uppercase tracking-widest">Hrs</span></div>
                </div>
                <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 group/metric transition-all hover:bg-white hover:shadow-xl hover:scale-[1.02]">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Mensal Reclamation</div>
                  <div className="text-4xl font-serif text-slate-900 tracking-tighter italic">{monthlySaved.toFixed(1)} <span className="text-lg text-slate-400 not-italic uppercase tracking-widest">Hrs</span></div>
                </div>
                <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 group/metric transition-all hover:bg-white hover:shadow-xl hover:scale-[1.02]">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Annual Reclamation</div>
                  <div className="text-4xl font-serif text-slate-900 tracking-tighter italic">
                    {yearlySaved.toLocaleString('en-GB')} <span className="text-lg text-slate-400 not-italic uppercase tracking-widest">Hrs</span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-900 p-10 rounded-[3rem] mb-12 relative overflow-hidden group/value">
                <div className="absolute inset-0 bg-accent/10 opacity-0 group-hover/value:opacity-100 transition-opacity"></div>
                <div className="text-[11px] font-bold text-accent uppercase tracking-[0.3em] mb-4 relative z-10 flex items-center gap-3">
                  ESTIMATED ANNUAL CAPITAL VALUE
                  <span className="w-12 h-[1px] bg-accent/40"></span>
                </div>
                <div className="text-4xl md:text-5xl font-serif text-white tracking-tighter italic relative z-10">
                  £{yearlyValue.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
              </div>

              <div className="bg-white border border-slate-100 p-10 rounded-[3rem] mb-12 h-[350px] shadow-sm">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} margin={{ top: 20, right: 20, left: -10, bottom: 0 }}>
                    <defs>
                      <linearGradient id="detoxGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#0f172a" stopOpacity={1} />
                        <stop offset="100%" stopColor="#0f172a" stopOpacity={0.7} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="8 8" vertical={false} stroke="#f1f5f9" />
                    <XAxis 
                      dataKey="name" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 600, letterSpacing: '0.1em' }} 
                      dy={15}
                    />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: '#94a3b8', fontSize: 10 }} 
                    />
                    <Tooltip 
                       cursor={{fill: '#f8fafc'}}
                       contentStyle={{ 
                        borderRadius: '24px', 
                        border: '1px solid #f1f5f9', 
                        boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
                        padding: '16px' 
                      }}
                      itemStyle={{ color: '#0f172a', fontWeight: 600, fontSize: '12px' }}
                    />
                    <Bar 
                      dataKey="value" 
                      fill="url(#detoxGradient)" 
                      radius={[12, 12, 4, 4]} 
                      maxBarSize={80} 
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-slate-50 p-10 rounded-[3rem] border border-slate-100">
                <h3 className="text-2xl font-serif text-slate-900 mb-6 tracking-tight italic flex items-center gap-4">
                  Deterministic Feedback
                  <span className="w-12 h-[1px] bg-accent/20"></span>
                </h3>
                <p className="text-slate-500 text-lg font-light leading-relaxed italic">
                  Initiate the protocol by neutralizing the highest-friction temporal leak: nocturnal scrolling, morning reactivity, or passive application cycles.
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
