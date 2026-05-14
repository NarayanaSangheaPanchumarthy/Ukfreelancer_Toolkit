import React, { useState, useEffect, useCallback } from 'react';
import { Download, Play, Pause, RefreshCw } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';

export default function GoalProductivityCalculator() {
  const [goalName, setGoalName] = useState('Launch client outreach campaign');
  const [deadline, setDeadline] = useState('2026-06-26');
  const [targetUnits, setTargetUnits] = useState('100');
  const [currentProgress, setCurrentProgress] = useState('25');
  const [weeklyFocusHours, setWeeklyFocusHours] = useState('8');
  const [focusQuality, setFocusQuality] = useState('7');
  const [distractions, setDistractions] = useState('3');
  const [completionRate, setCompletionRate] = useState('72');

  // Focus Mode Timer State
  const [isFocusMode, setIsFocusMode] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(25 * 60);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isFocusMode && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0) {
      setIsFocusMode(false);
      alert('Focus session complete!');
      setTimerSeconds(25 * 60);
    }
    return () => clearInterval(interval);
  }, [isFocusMode, timerSeconds]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const today = new Date('2026-05-12');
  const d = new Date(deadline);
  const diffTime = d.getTime() - today.getTime();
  const daysLeft = Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));

  const tUnits = parseFloat(targetUnits) || 0;
  const cProgress = parseFloat(currentProgress) || 0;
  const remaining = Math.max(0, tUnits - cProgress);
  const dailyTarget = daysLeft > 0 ? remaining / daysLeft : 0;
  const weeklyTarget = dailyTarget * 7;

  const fq = parseFloat(focusQuality) || 0;
  const cr = parseFloat(completionRate) || 0;
  const dist = parseFloat(distractions) || 0;

  // Formula: ((focusQuality * 10) + completionRate) / 2 - (distractions * 4)
  const calcScore = Math.round(((fq * 10) + cr) / 2 - (dist * 4));
  const productivityScore = Math.max(0, Math.min(100, calcScore));

  const wfh = parseFloat(weeklyFocusHours) || 0;
  const effectiveFocus = wfh * (productivityScore / 100);

  const chartData = [
    { name: 'Current', value: parseFloat(cProgress.toFixed(1)) },
    { name: 'Remaining', value: parseFloat(remaining.toFixed(1)) },
    { name: 'Weekly target', value: parseFloat(weeklyTarget.toFixed(1)) }
  ];

  const handleDownload = () => window.print();

  return (
    <div className="bg-[#fcfdfd] min-h-screen py-20 md:py-24">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
          <div>
            <div className="text-[11px] font-bold text-accent uppercase tracking-[0.4em] mb-6 flex items-center gap-2">
              <span className="w-8 h-[1px] bg-accent/30"></span>
              EXECUTION DYNAMICS
            </div>
            <h1 className="text-5xl md:text-8xl font-serif text-slate-900 mb-8 tracking-tighter leading-[0.95]">
              Goal & <span className="italic text-accent">Productivity</span> Synthesis.
            </h1>
            <p className="text-slate-500 text-xl font-light max-w-2xl leading-relaxed">
              Deconstruct objectives into precise daily target vectors, then evaluate focus integrity and systemic output markers.
            </p>
          </div>
          <button 
            onClick={handleDownload}
            className="group bg-slate-900 text-white px-10 py-5 font-bold text-[11px] uppercase tracking-[0.2em] rounded-2xl hover:bg-accent transition-all shadow-2xl flex items-center gap-3"
          >
            <Download className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
            Export Insights
          </button>
        </div>

        {/* Content Grid */}
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Left Column - Inputs */}
          <div className="w-full lg:w-[400px] space-y-10">
            <div className="bg-white border border-slate-100 p-10 rounded-[2.5rem] shadow-xl space-y-8">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2 border-b border-slate-50 pb-4">Focus Mode</div>
              <div className="flex flex-col items-center gap-4">
                <div className="text-6xl font-mono font-light tracking-tighter text-slate-900">{formatTime(timerSeconds)}</div>
                <div className="flex gap-4">
                  <button onClick={() => setIsFocusMode(!isFocusMode)} className="p-4 bg-slate-100 rounded-full hover:bg-accent hover:text-white transition-colors">
                    {isFocusMode ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                  </button>
                  <button onClick={() => { setIsFocusMode(false); setTimerSeconds(25 * 60); }} className="p-4 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors">
                    <RefreshCw className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white border border-slate-100 p-10 rounded-[2.5rem] shadow-xl space-y-8">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2 border-b border-slate-50 pb-4">Calibration Interface</div>
              
              <div className="space-y-6">
              <div className="space-y-3">
                <label className="block text-[10px] font-bold text-slate-800 uppercase tracking-[0.2em] ml-1">
                  OBJECTIVE DESIGNATION
                </label>
                <input 
                  type="text"
                  value={goalName}
                  onChange={(e) => setGoalName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-100 p-4 rounded-xl text-slate-900 focus:outline-none focus:border-accent focus:bg-white transition-all text-sm font-medium shadow-sm"
                />
              </div>

              <div className="space-y-3">
                <label className="block text-[10px] font-bold text-slate-800 uppercase tracking-[0.2em] ml-1">
                  TEMPORAL DEADLINE
                </label>
                <input 
                  type="date"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-100 p-4 rounded-xl text-slate-900 focus:outline-none focus:border-accent focus:bg-white transition-all text-sm font-medium shadow-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label className="block text-[10px] font-bold text-slate-800 uppercase tracking-[0.2em] ml-1">
                    TARGET UNITS
                  </label>
                  <input 
                    type="number"
                    value={targetUnits}
                    onChange={(e) => setTargetUnits(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-100 p-4 rounded-xl text-slate-900 focus:outline-none focus:border-accent focus:bg-white transition-all text-sm font-medium shadow-sm"
                  />
                </div>

                <div className="space-y-3">
                  <label className="block text-[10px] font-bold text-slate-800 uppercase tracking-[0.2em] ml-1">
                    PROGRESS
                  </label>
                  <input 
                    type="number"
                    value={currentProgress}
                    onChange={(e) => setCurrentProgress(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-100 p-4 rounded-xl text-slate-900 focus:outline-none focus:border-accent focus:bg-white transition-all text-sm font-medium shadow-sm"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="block text-[10px] font-bold text-slate-800 uppercase tracking-[0.2em] ml-1">
                  WEEKLY FOCUS QUOTA (HRS)
                </label>
                <input 
                  type="number"
                  value={weeklyFocusHours}
                  onChange={(e) => setWeeklyFocusHours(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-100 p-4 rounded-xl text-slate-900 focus:outline-none focus:border-accent focus:bg-white transition-all text-sm font-medium shadow-sm"
                />
              </div>

              <div className="space-y-3">
                <label className="block text-[10px] font-bold text-slate-800 uppercase tracking-[0.2em] ml-1">
                  FOCUS INTENSITY /10
                </label>
                <input 
                  type="number"
                  max="10"
                  min="0"
                  value={focusQuality}
                  onChange={(e) => setFocusQuality(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-100 p-4 rounded-xl text-slate-900 focus:outline-none focus:border-accent focus:bg-white transition-all text-sm font-medium shadow-sm"
                />
              </div>

              <div className="space-y-3">
                <label className="block text-[10px] font-bold text-slate-800 uppercase tracking-[0.2em] ml-1">
                  DIURNAL DISRUPTIONS
                </label>
                <input 
                  type="number"
                  value={distractions}
                  onChange={(e) => setDistractions(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-100 p-4 rounded-xl text-slate-900 focus:outline-none focus:border-accent focus:bg-white transition-all text-sm font-medium shadow-sm"
                />
              </div>

              <div className="space-y-3">
                <label className="block text-[10px] font-bold text-slate-800 uppercase tracking-[0.2em] ml-1">
                  COMPLETION VELOCITY %
                </label>
                <input 
                  type="number"
                  max="100"
                  min="0"
                  value={completionRate}
                  onChange={(e) => setCompletionRate(e.target.value)}
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
                PROJECTED METRICS
                <span className="w-12 h-[1px] bg-accent/20"></span>
              </div>
              <h2 className="text-4xl md:text-5xl font-serif text-slate-900 mb-12 tracking-tight italic relative z-10">
                {goalName || 'Undefined Objective'}
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12 relative z-10">
                <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 group/metric transition-all hover:bg-white hover:shadow-xl hover:scale-[1.02]">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Temporal Buffer</div>
                  <div className="text-5xl font-serif text-slate-900 tracking-tighter italic">{daysLeft} <span className="text-lg text-slate-400 not-italic uppercase tracking-widest">Days</span></div>
                </div>
                <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 group/metric transition-all hover:bg-white hover:shadow-xl hover:scale-[1.02]">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Diurnal Vector</div>
                  <div className="text-5xl font-serif text-slate-900 tracking-tighter italic">{dailyTarget.toFixed(1)} <span className="text-lg text-slate-400 not-italic uppercase tracking-widest">Units</span></div>
                </div>
                <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 group/metric transition-all hover:bg-white hover:shadow-xl hover:scale-[1.02]">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Septenary Load</div>
                  <div className="text-5xl font-serif text-slate-900 tracking-tighter italic">{weeklyTarget.toFixed(1)} <span className="text-lg text-slate-400 not-italic uppercase tracking-widest">Units</span></div>
                </div>
                <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 group/metric transition-all hover:bg-white hover:shadow-xl hover:scale-[1.02]">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Integrity Rating</div>
                  <div className={`text-5xl font-serif tracking-tighter italic ${productivityScore < 65 ? 'text-accent' : 'text-slate-900'}`}>
                    {productivityScore}<span className="text-lg text-slate-400 not-italic uppercase tracking-widest ml-1">/100</span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-900 p-10 rounded-[3rem] mb-12 relative overflow-hidden group/focus">
                <div className="absolute inset-0 bg-accent/10 opacity-0 group-hover/focus:opacity-100 transition-opacity"></div>
                <div className="text-[11px] font-bold text-accent uppercase tracking-[0.3em] mb-4 relative z-10 flex items-center gap-3">
                  EFFECTIVE FOCUS THROUGHPUT
                  <span className="w-12 h-[1px] bg-accent/40"></span>
                </div>
                <div className="text-4xl md:text-5xl font-serif text-white tracking-tighter italic relative z-10">
                  {effectiveFocus.toFixed(1)} <span className="text-xl not-italic uppercase tracking-widest text-slate-400">Hours / Week</span>
                </div>
              </div>

              <div className="bg-white border border-slate-100 p-10 rounded-[3rem] mb-12 h-[400px] shadow-sm">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} margin={{ top: 20, right: 20, left: -10, bottom: 0 }}>
                    <defs>
                      <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#a67c52" stopOpacity={1} />
                        <stop offset="100%" stopColor="#a67c52" stopOpacity={0.6} />
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
                      itemStyle={{ color: '#a67c52', fontWeight: 600, fontSize: '12px' }}
                    />
                    <Bar 
                      dataKey="value" 
                      fill="url(#barGradient)" 
                      radius={[12, 12, 4, 4]} 
                      maxBarSize={80} 
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-slate-50 p-10 rounded-[3rem] border border-slate-100">
                <h3 className="text-2xl font-serif text-slate-900 mb-6 tracking-tight italic flex items-center gap-4">
                  Operational Guidelines
                  <span className="w-12 h-[1px] bg-accent/20"></span>
                </h3>
                <div className="space-y-4 text-slate-500 font-light text-lg leading-relaxed">
                  <div className="flex gap-4">
                    <span className="text-accent font-bold">01.</span>
                    <p>Construct work septenaries around high-intensity focus sessions before initiating reactive protocols.</p>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-accent font-bold">02.</span>
                    <p>If Integrity Rating descends below 65, neutralize diurnal disruptions before expanding session quotas.</p>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
