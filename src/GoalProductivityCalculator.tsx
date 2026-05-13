import React, { useState } from 'react';
import { Download } from 'lucide-react';
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
    <div className="bg-[#f5f7f9] min-h-screen py-12 md:py-16">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
          <div>
            <div className="text-[10px] font-bold text-[#a67c52] uppercase tracking-widest mb-4">
              EXECUTION PLAN
            </div>
            <h1 className="text-4xl md:text-6xl font-serif text-slate-900 mb-4 tracking-tight">
              Goal & Productivity<br />Calculator
            </h1>
            <p className="text-slate-600 text-lg max-w-2xl">
              Turn a target into daily and weekly milestones, then score focus quality, distractions, and completion rate.
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
          <div className="w-full lg:w-1/3 space-y-6">
            <div className="border border-slate-200 bg-transparent p-6 space-y-6">
              
              <div>
                <label className="block text-[10px] font-bold text-slate-800 uppercase tracking-widest mb-2">
                  GOAL NAME
                </label>
                <input 
                  type="text"
                  value={goalName}
                  onChange={(e) => setGoalName(e.target.value)}
                  className="w-full border border-slate-300 bg-white p-3 text-slate-900 focus:outline-none focus:border-blue-500 rounded-none text-sm font-medium"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-800 uppercase tracking-widest mb-2">
                  DEADLINE
                </label>
                <input 
                  type="date"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  className="w-full border border-slate-300 bg-white p-3 text-slate-900 focus:outline-none focus:border-blue-500 rounded-none text-sm font-medium"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-800 uppercase tracking-widest mb-2">
                  TARGET UNITS
                </label>
                <input 
                  type="number"
                  value={targetUnits}
                  onChange={(e) => setTargetUnits(e.target.value)}
                  className="w-full border border-slate-300 bg-white p-3 text-slate-900 focus:outline-none focus:border-blue-500 rounded-none text-sm font-medium"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-800 uppercase tracking-widest mb-2">
                  CURRENT PROGRESS
                </label>
                <input 
                  type="number"
                  value={currentProgress}
                  onChange={(e) => setCurrentProgress(e.target.value)}
                  className="w-full border border-slate-300 bg-white p-3 text-slate-900 focus:outline-none focus:border-blue-500 rounded-none text-sm font-medium"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-800 uppercase tracking-widest mb-2">
                  WEEKLY FOCUS HOURS
                </label>
                <input 
                  type="number"
                  value={weeklyFocusHours}
                  onChange={(e) => setWeeklyFocusHours(e.target.value)}
                  className="w-full border border-slate-300 bg-white p-3 text-slate-900 focus:outline-none focus:border-blue-500 rounded-none text-sm font-medium"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-800 uppercase tracking-widest mb-2">
                  FOCUS QUALITY /10
                </label>
                <input 
                  type="number"
                  max="10"
                  min="0"
                  value={focusQuality}
                  onChange={(e) => setFocusQuality(e.target.value)}
                  className="w-full border border-slate-300 bg-white p-3 text-slate-900 focus:outline-none focus:border-blue-500 rounded-none text-sm font-medium"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-800 uppercase tracking-widest mb-2">
                  DISTRACTIONS PER DAY
                </label>
                <input 
                  type="number"
                  value={distractions}
                  onChange={(e) => setDistractions(e.target.value)}
                  className="w-full border border-slate-300 bg-white p-3 text-slate-900 focus:outline-none focus:border-blue-500 rounded-none text-sm font-medium"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-800 uppercase tracking-widest mb-2">
                  COMPLETION RATE %
                </label>
                <input 
                  type="number"
                  max="100"
                  min="0"
                  value={completionRate}
                  onChange={(e) => setCompletionRate(e.target.value)}
                  className="w-full border border-slate-300 bg-white p-3 text-slate-900 focus:outline-none focus:border-blue-500 rounded-none text-sm font-medium"
                />
              </div>
            </div>
          </div>

          {/* Right Column - Summary */}
          <div className="w-full lg:w-2/3">
            <div className="bg-white border border-slate-200 p-8 shadow-sm print:shadow-none print:p-0">
              <div className="text-[10px] font-bold text-[#a67c52] uppercase tracking-widest mb-4">
                GOAL SUMMARY
              </div>
              <h2 className="text-4xl font-serif text-slate-900 mb-8 tracking-tight">
                {goalName || 'Unnamed goal'}
              </h2>

              <div className="grid grid-cols-2 border border-slate-200 mb-0">
                <div className="p-6 border-b border-r border-slate-200">
                  <div className="text-[10px] font-bold text-slate-800 uppercase tracking-widest mb-2">DAYS LEFT</div>
                  <div className="text-4xl font-bold font-serif text-slate-900 tracking-tight">{daysLeft}</div>
                </div>
                <div className="p-6 border-b border-slate-200">
                  <div className="text-[10px] font-bold text-slate-800 uppercase tracking-widest mb-2">DAILY TARGET</div>
                  <div className="text-4xl font-bold font-serif text-slate-900 tracking-tight">{dailyTarget.toFixed(1)}</div>
                </div>
                <div className="p-6 border-r border-slate-200">
                  <div className="text-[10px] font-bold text-slate-800 uppercase tracking-widest mb-2">WEEKLY TARGET</div>
                  <div className="text-4xl font-bold font-serif text-slate-900 tracking-tight">{weeklyTarget.toFixed(1)}</div>
                </div>
                <div className="p-6">
                  <div className="text-[10px] font-bold text-slate-800 uppercase tracking-widest mb-2">PRODUCTIVITY SCORE</div>
                  <div className={`text-4xl font-bold font-serif tracking-tight ${productivityScore < 65 ? 'text-red-700' : 'text-slate-900'}`}>
                    {productivityScore}/100
                  </div>
                </div>
              </div>

              <div className="bg-[#1a1f24] p-6 mb-8 mt-0">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">
                  EFFECTIVE WEEKLY FOCUS TIME
                </div>
                <div className="text-3xl font-bold font-serif text-white tracking-tight">
                  {effectiveFocus.toFixed(1)} hrs
                </div>
              </div>

              <div className="border border-slate-200 p-8 mb-8 h-[300px]">
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
                    <Bar dataKey="value" fill="#a67c52" maxBarSize={120} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div>
                <h3 className="text-xl font-serif text-slate-900 mb-4 tracking-tight border-b border-slate-200 pb-2">
                  Recommendations
                </h3>
                <div className="space-y-3 text-slate-600">
                  <p>Work backwards from the weekly target and block focus sessions before reactive tasks.</p>
                  <p>If the productivity score is under 65, reduce distractions before increasing hours.</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
