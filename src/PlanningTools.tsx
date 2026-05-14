import React from 'react';
import { 
  ArrowRight, 
  PiggyBank, 
  CalendarHeart, 
  Briefcase, 
  Rocket, 
  Flag, 
  BatteryCharging
} from 'lucide-react';

export default function PlanningTools({ setActiveTab }: { setActiveTab: (tab: string) => void }) {
  return (
    <div className="w-full bg-slate-50 min-h-screen">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-24 md:py-32 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-accent/5 to-transparent pointer-events-none"></div>
        <div className="flex flex-col lg:flex-row gap-24 items-center justify-between relative z-10">
          
          {/* Left Column */}
          <div className="max-w-2xl">
            <div className="text-[11px] font-bold text-accent uppercase tracking-[0.3em] mb-8 flex items-center gap-2">
              <span className="w-8 h-[1px] bg-accent"></span>
              STRATEGIC ASSETS
            </div>
            
            <h1 className="text-6xl md:text-8xl font-serif text-slate-900 mb-8 tracking-tighter leading-[0.9]">
              Plan money,<br />milestones, and<br /><span className="italic text-accent">extreme focus.</span>
            </h1>
            
            <p className="text-slate-500 text-xl font-light mb-12 max-w-xl leading-relaxed">
              Premium calculators for personal wealth, wedding logistics, and high-growth operational planning.
            </p>
            
            <div className="flex flex-wrap gap-6">
              <button 
                onClick={() => setActiveTab('UK Budget Planner')}
                className="flex items-center gap-3 bg-slate-900 text-white px-10 py-5 font-bold text-sm rounded-2xl hover:bg-black transition-all shadow-2xl scale-100 hover:scale-105 duration-300"
              >
                Launch Planner <ArrowRight className="w-4 h-4 ml-2" />
              </button>
              <button 
                onClick={() => setActiveTab('Goal & Productivity Calculator')}
                className="bg-white border border-slate-200 text-slate-900 px-10 py-5 font-bold text-sm rounded-2xl hover:bg-slate-50 transition-all shadow-sm"
              >
                Track Progress
              </button>
            </div>
          </div>

          {/* Right Column - Summary Card */}
          <div className="w-full max-w-sm lg:w-[420px] shrink-0 relative group">
            <div className="absolute inset-0 bg-accent/20 blur-3xl opacity-20 group-hover:opacity-30 transition-opacity duration-700"></div>
            <div className="bg-white border border-slate-100 p-10 rounded-[2.5rem] shadow-2xl relative z-10 overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="space-y-8">
                <div className="flex justify-between items-center border-b border-slate-50 pb-6">
                  <span className="text-slate-400 font-medium">Monthly Target</span>
                  <span className="text-3xl font-serif text-slate-900">£4,200</span>
                </div>
                <div className="flex justify-between items-center border-b border-slate-50 pb-6">
                  <span className="text-slate-400 font-medium">Allocated</span>
                  <span className="text-3xl font-serif text-slate-900">£3,140</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 font-medium">Safety Buffer</span>
                  <span className="text-3xl font-serif font-bold text-accent italic">£1,060</span>
                </div>
              </div>
              
              <div className="mt-10 bg-slate-900 p-6 rounded-2xl text-[11px] font-bold text-accent uppercase tracking-widest text-center">
                Financial Clarity Achieved
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Directory Section Header */}
      <div className="bg-white pt-32 pb-40 border-t border-slate-100 rounded-t-[3rem] shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="max-w-3xl mb-24">
            <h2 className="text-4xl md:text-6xl font-serif text-slate-900 tracking-tight leading-[1.1]">
              Architectural tools for<br />
              <span className="text-slate-400 italic">budgets & productivity.</span>
            </h2>
          </div>
          
          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Cell 1 */}
            <div 
              onClick={() => setActiveTab('UK Budget Planner')}
              className="p-10 bg-slate-50 border border-slate-100 rounded-3xl hover:border-accent hover:shadow-2xl transition-all group cursor-pointer flex flex-col min-h-[380px]"
            >
              <div className="flex justify-between items-start mb-12">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-all shadow-sm">
                  <PiggyBank className="w-6 h-6 stroke-[1.5]" />
                </div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest group-hover:text-accent transition-colors">FINANCIAL HEALTH</span>
              </div>
              <h3 className="text-3xl font-serif text-slate-900 mb-6 group-hover:text-accent transition-colors leading-tight">Monthly <br />Budget Planner</h3>
              <p className="text-slate-500 text-base font-light leading-relaxed mb-10 flex-grow">
                Professional category sweeps with chart visualizations and intelligent spending recommendations.
              </p>
              <div className="flex items-center text-[11px] font-bold text-slate-900 uppercase tracking-widest group-hover:translate-x-2 transition-all">
                Plan Wealth <ArrowRight className="w-4 h-4 ml-3 text-accent" />
              </div>
            </div>

            {/* Cell 2 */}
            <div 
              onClick={() => setActiveTab('Marriage Budget Calculator')}
              className="p-10 bg-slate-50 border border-slate-100 rounded-3xl hover:border-accent hover:shadow-2xl transition-all group cursor-pointer flex flex-col min-h-[380px]"
            >
              <div className="flex justify-between items-start mb-12">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-all shadow-sm">
                  <CalendarHeart className="w-6 h-6 stroke-[1.5]" />
                </div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest group-hover:text-accent transition-colors">LOGISTICAL MARVEL</span>
              </div>
              <h3 className="text-3xl font-serif text-slate-900 mb-6 group-hover:text-accent transition-colors leading-tight">Wedding <br />Budget Studio</h3>
              <p className="text-slate-500 text-base font-light leading-relaxed mb-10 flex-grow">
                Balance venue, catering, and aesthetic costs with a realistic approach to big-day finance.
              </p>
              <div className="flex items-center text-[11px] font-bold text-slate-900 uppercase tracking-widest group-hover:translate-x-2 transition-all">
                Plan Event <ArrowRight className="w-4 h-4 ml-3 text-accent" />
              </div>
            </div>

            {/* Cell 3 */}
            <div 
              onClick={() => setActiveTab('Business Budget Calculator')}
              className="p-10 bg-slate-50 border border-slate-100 rounded-3xl hover:border-accent hover:shadow-2xl transition-all group cursor-pointer flex flex-col min-h-[380px]"
            >
              <div className="flex justify-between items-start mb-12">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-all shadow-sm">
                  <Briefcase className="w-6 h-6 stroke-[1.5]" />
                </div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest group-hover:text-accent transition-colors">OPEX CLARITY</span>
              </div>
              <h3 className="text-3xl font-serif text-slate-900 mb-6 group-hover:text-accent transition-colors leading-tight">Business <br />Ops Budget</h3>
              <p className="text-slate-500 text-base font-light leading-relaxed mb-10 flex-grow">
                Model operating spend, tax set-aside requirements, and monthly profit reserves for SMEs.
              </p>
              <div className="flex items-center text-[11px] font-bold text-slate-900 uppercase tracking-widest group-hover:translate-x-2 transition-all">
                Plan Business <ArrowRight className="w-4 h-4 ml-3 text-accent" />
              </div>
            </div>

            {/* Cell 4 */}
            <div 
              onClick={() => setActiveTab('Start Up Expense Calculator')}
              className="p-10 bg-slate-50 border border-slate-100 rounded-3xl hover:border-accent hover:shadow-2xl transition-all group cursor-pointer flex flex-col min-h-[380px]"
            >
              <div className="flex justify-between items-start mb-12">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-all shadow-sm">
                  <Rocket className="w-6 h-6 stroke-[1.5]" />
                </div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest group-hover:text-accent transition-colors">CAPITAL DEPLOYMENT</span>
              </div>
              <h3 className="text-3xl font-serif text-slate-900 mb-6 group-hover:text-accent transition-colors leading-tight">Startup <br />Launch Costs</h3>
              <p className="text-slate-500 text-base font-light leading-relaxed mb-10 flex-grow">
                Map out the essential runway and pre-launch capital required to get your first customer.
              </p>
              <div className="flex items-center text-[11px] font-bold text-slate-900 uppercase tracking-widest group-hover:translate-x-2 transition-all">
                Estimate Launch <ArrowRight className="w-4 h-4 ml-3 text-accent" />
              </div>
            </div>

            {/* Cell 5 */}
            <div 
              onClick={() => setActiveTab('Goal & Productivity Calculator')}
              className="p-10 bg-slate-50 border border-slate-100 rounded-3xl hover:border-accent hover:shadow-2xl transition-all group cursor-pointer flex flex-col min-h-[380px]"
            >
              <div className="flex justify-between items-start mb-12">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-all shadow-sm">
                  <Flag className="w-6 h-6 stroke-[1.5]" />
                </div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest group-hover:text-accent transition-colors">PEAK PERFORMANCE</span>
              </div>
              <h3 className="text-3xl font-serif text-slate-900 mb-6 group-hover:text-accent transition-colors leading-tight">Goal <br />Architecture</h3>
              <p className="text-slate-500 text-base font-light leading-relaxed mb-10 flex-grow">
                Convert grand targets into daily sprints with performance scoring and focus tracking.
              </p>
              <div className="flex items-center text-[11px] font-bold text-slate-900 uppercase tracking-widest group-hover:translate-x-2 transition-all">
                Track Performance <ArrowRight className="w-4 h-4 ml-3 text-accent" />
              </div>
            </div>

            {/* Cell 6 */}
            <div 
              onClick={() => setActiveTab('Digital Detox Calculator')}
              className="p-10 bg-slate-50 border border-slate-100 rounded-3xl hover:border-accent hover:shadow-2xl transition-all group cursor-pointer flex flex-col min-h-[380px]"
            >
              <div className="flex justify-between items-start mb-12">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-all shadow-sm">
                  <BatteryCharging className="w-6 h-6 stroke-[1.5]" />
                </div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest group-hover:text-accent transition-colors">TIME RECLAMATION</span>
              </div>
              <h3 className="text-3xl font-serif text-slate-900 mb-6 group-hover:text-accent transition-colors leading-tight">Digital <br />Focus Audit</h3>
              <p className="text-slate-500 text-base font-light leading-relaxed mb-10 flex-grow">
                Audit your screen time and reclaim thousands of hours per year for deep work.
              </p>
              <div className="flex items-center text-[11px] font-bold text-slate-900 uppercase tracking-widest group-hover:translate-x-2 transition-all">
                Audit Screen Time <ArrowRight className="w-4 h-4 ml-3 text-accent" />
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
