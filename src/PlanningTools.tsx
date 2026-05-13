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
    <div className="w-full">
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-16 md:py-24">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-8 items-start justify-between">
          
          {/* Left Column */}
          <div className="max-w-2xl">
            <div className="text-[10px] font-bold text-[#a67c52] uppercase tracking-widest mb-6 flex items-center gap-2">
              <span className="grid grid-cols-2 gap-0.5">
                <span className="w-1.5 h-1.5 bg-[#a67c52]"></span>
                <span className="w-1.5 h-1.5 bg-[#a67c52]"></span>
                <span className="w-1.5 h-1.5 bg-[#a67c52]"></span>
                <span className="w-1.5 h-1.5 bg-[#a67c52]"></span>
              </span>
              BUDGET & PLANNING TOOLKIT
            </div>
            
            <h1 className="text-5xl md:text-7xl font-serif text-slate-900 mb-6 tracking-tight leading-[1.05]">
              Plan money,<br />milestones, and<br />focus before the<br />week gets messy.
            </h1>
            
            <p className="text-slate-600 text-lg md:text-xl font-serif mb-10 max-w-xl leading-relaxed">
              A separate toolkit for everyday budgeting, wedding planning, business costs, startup expenses, goal execution, and screen-time reduction.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => setActiveTab('UK Budget Planner')}
                className="flex items-center gap-2 bg-[#1a1f24] text-white px-6 py-3 font-bold text-sm hover:bg-black transition-colors"
              >
                Open UK budget planner <ArrowRight className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setActiveTab('Goal & Productivity Calculator')}
                className="bg-white border border-slate-300 text-slate-900 px-6 py-3 font-bold text-sm hover:bg-slate-50 transition-colors"
              >
                Plan a goal
              </button>
              <button 
                onClick={() => setActiveTab('Digital Detox Calculator')}
                className="bg-white border border-slate-300 text-slate-900 px-6 py-3 font-bold text-sm hover:bg-slate-50 transition-colors"
              >
                Calculate detox time
              </button>
            </div>
          </div>

          {/* Right Column - Summary Card */}
          <div className="w-full max-w-sm lg:w-[400px] shrink-0 bg-transparent border border-slate-200 p-2 shadow-sm">
            <div className="bg-white border border-slate-200 p-8 shadow-sm">
              <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-slate-200 pb-4">
                  <span className="text-slate-500 font-medium">Budget</span>
                  <span className="text-3xl font-serif font-bold text-slate-900 tracking-tight">£3,200</span>
                </div>
                <div className="flex justify-between items-center border-b border-slate-200 pb-4">
                  <span className="text-slate-500 font-medium">Planned</span>
                  <span className="text-3xl font-serif font-bold text-slate-900 tracking-tight">£2,940</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 font-medium">Remaining</span>
                  <span className="text-3xl font-serif font-bold text-[#2a8b5e] tracking-tight">£260</span>
                </div>
              </div>
              
              <div className="mt-8 bg-[#fdf5d3] border border-[#d6a54a] p-4 text-sm font-bold text-[#8c6b2e]">
                Downloadable summaries included
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Directory Section Header */}
      <div className="bg-[#f5f7f9] pt-24 pb-12 border-t border-slate-200">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="max-w-3xl mb-12">
            <h2 className="text-4xl md:text-5xl font-serif text-slate-900 tracking-tight leading-tight">
              Focused calculators for<br />budgets, goals, productivity,<br />and digital detox.
            </h2>
          </div>
          
          <div className="text-[10px] font-bold text-[#a67c52] uppercase tracking-widest mb-6">
            PLANNING DIRECTORY
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 bg-white border border-slate-200">
            {/* Cell 1 */}
            <div 
              onClick={() => setActiveTab('UK Budget Planner')}
              className="p-8 border-b md:border-b-0 md:border-r border-slate-200 hover:bg-slate-50 transition-colors group cursor-pointer lg:border-b"
            >
              <div className="flex justify-between flex-row-reverse items-center mb-6">
                <span className="text-[10px] font-bold text-[#a67c52] uppercase tracking-widest">PERSONAL BUDGET</span>
                <PiggyBank className="w-5 h-5 text-[#a67c52]" />
              </div>
              <h3 className="text-xl font-serif text-slate-900 mb-4 tracking-tight">UK Budget Planner</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-8 min-h-[4rem]">
                Build a monthly UK budget with spending categories, chart breakdowns, and recommendations.
              </p>
              <div className="flex items-center text-xs font-bold text-slate-900 uppercase tracking-wide group-hover:text-blue-600 transition-colors">
                Plan budget <ArrowRight className="w-4 h-4 ml-2" />
              </div>
            </div>

            {/* Cell 2 */}
            <div 
              onClick={() => setActiveTab('Marriage Budget Calculator')}
              className="p-8 border-b lg:border-r border-slate-200 hover:bg-slate-50 transition-colors group cursor-pointer lg:border-b"
            >
              <div className="flex justify-between flex-row-reverse items-center mb-6">
                <span className="text-[10px] font-bold text-[#a67c52] uppercase tracking-widest">WEDDING PLANNER</span>
                <CalendarHeart className="w-5 h-5 text-[#a67c52]" />
              </div>
              <h3 className="text-xl font-serif text-slate-900 mb-4 tracking-tight">Marriage Budget Calculator</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-8 min-h-[4rem]">
                Estimate wedding costs by category and see where the budget is tight or flexible.
              </p>
              <div className="flex items-center text-xs font-bold text-slate-900 uppercase tracking-wide group-hover:text-blue-600 transition-colors">
                Calculate wedding <ArrowRight className="w-4 h-4 ml-2" />
              </div>
            </div>

            {/* Cell 3 */}
            <div 
              onClick={() => setActiveTab('Business Budget Calculator')}
              className="p-8 border-b border-slate-200 hover:bg-slate-50 transition-colors group cursor-pointer md:border-r lg:border-r-0"
            >
              <div className="flex justify-between flex-row-reverse items-center mb-6">
                <span className="text-[10px] font-bold text-[#a67c52] uppercase tracking-widest">OPERATING PLAN</span>
                <Briefcase className="w-5 h-5 text-[#a67c52]" />
              </div>
              <h3 className="text-xl font-serif text-slate-900 mb-4 tracking-tight">Business Budget Calculator</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-8 min-h-[4rem]">
                Compare monthly revenue with operating spend, tax set-aside, and profit reserve.
              </p>
              <div className="flex items-center text-xs font-bold text-slate-900 uppercase tracking-wide group-hover:text-blue-600 transition-colors">
                Plan business <ArrowRight className="w-4 h-4 ml-2" />
              </div>
            </div>

            {/* Cell 4 */}
            <div 
              onClick={() => setActiveTab('Start Up Expense Calculator')}
              className="p-8 border-b md:border-b-0 lg:border-r border-slate-200 hover:bg-slate-50 transition-colors group cursor-pointer"
            >
              <div className="flex justify-between flex-row-reverse items-center mb-6">
                <span className="text-[10px] font-bold text-[#a67c52] uppercase tracking-widest">LAUNCH PLAN</span>
                <Rocket className="w-5 h-5 text-[#a67c52]" />
              </div>
              <h3 className="text-xl font-serif text-slate-900 mb-4 tracking-tight">Start Up Expense Calculator</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-8 min-h-[4rem]">
                Estimate the cash needed to launch and identify gaps before committing spend.
              </p>
              <div className="flex items-center text-xs font-bold text-slate-900 uppercase tracking-wide group-hover:text-blue-600 transition-colors">
                Estimate startup <ArrowRight className="w-4 h-4 ml-2" />
              </div>
            </div>

            {/* Cell 5 */}
            <div 
              onClick={() => setActiveTab('Goal & Productivity Calculator')}
              className="p-8 border-b md:border-b-0 md:border-r border-slate-200 hover:bg-slate-50 transition-colors group cursor-pointer"
            >
              <div className="flex justify-between flex-row-reverse items-center mb-6">
                <span className="text-[10px] font-bold text-[#a67c52] uppercase tracking-widest">EXECUTION PLAN</span>
                <Flag className="w-5 h-5 text-[#a67c52]" />
              </div>
              <h3 className="text-xl font-serif text-slate-900 mb-4 tracking-tight">Goal & Productivity Calculator</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-8 min-h-[4rem]">
                Turn a target into daily milestones and score focus quality, distractions, and output.
              </p>
              <div className="flex items-center text-xs font-bold text-slate-900 uppercase tracking-wide group-hover:text-blue-600 transition-colors">
                Plan goal <ArrowRight className="w-4 h-4 ml-2" />
              </div>
            </div>

            {/* Cell 6 */}
            <div 
              onClick={() => setActiveTab('Digital Detox Calculator')}
              className="p-8 hover:bg-slate-50 transition-colors group cursor-pointer"
            >
              <div className="flex justify-between flex-row-reverse items-center mb-6">
                <span className="text-[10px] font-bold text-[#a67c52] uppercase tracking-widest">TIME RECLAIMED</span>
                <BatteryCharging className="w-5 h-5 text-[#a67c52]" />
              </div>
              <h3 className="text-xl font-serif text-slate-900 mb-4 tracking-tight">Digital Detox Calculator</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-8 min-h-[4rem]">
                Calculate how much time you can save each week, month, and year by cutting screen time.
              </p>
              <div className="flex items-center text-xs font-bold text-slate-900 uppercase tracking-wide group-hover:text-blue-600 transition-colors">
                Calculate detox <ArrowRight className="w-4 h-4 ml-2" />
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
