import React from 'react';
import { ArrowRight, FileText, CheckCircle, PieChart, TrendingDown, Calculator, Layout, Shield, Boxes, Plus, Sparkles } from 'lucide-react';

interface StartupTool {
  title: string;
  description: string;
  tag: string;
  icon: React.ElementType;
  actionText: string;
  tabKey?: string;
}

interface StartupToolkitProps {
  setActiveTab: (tab: string) => void;
}

const startupTools: StartupTool[] = [
  {
    title: 'Startup Business Plan Generator',
    description: 'Create a polished multi-page business plan with guided prompts, live preview, PDF export, and editable Word download.',
    tag: 'EDITABLE PLANNER',
    icon: FileText,
    actionText: 'Create business plan'
  },
  {
    title: 'SEIS / EIS Eligibility Checker',
    description: 'Check whether your UK company qualifies for SEIS or EIS and estimate the income tax and CGT relief available to investors.',
    tag: 'FUNDING ELIGIBILITY',
    icon: CheckCircle,
    actionText: 'Check eligibility'
  },
  {
    title: 'Cap Table Builder',
    description: 'Model founder splits, options pool, SAFE conversions, and a priced round to see fully-diluted ownership update live.',
    tag: 'FOUNDER OWNERSHIP',
    icon: PieChart,
    actionText: 'Build cap table'
  },
  {
    title: 'Runway Calculator',
    description: 'Project monthly burn against revenue and cost growth to find the month your cash hits zero.',
    tag: 'CASH RUNWAY',
    icon: TrendingDown,
    actionText: 'Plan runway'
  },
  {
    title: 'Break-Even Calculator',
    description: 'Find the units and revenue you need to cover fixed costs and hit a target profit, with live contribution margin.',
    tag: 'PRICING FUNDAMENTALS',
    icon: Calculator,
    actionText: 'Find break-even'
  },
  {
    title: 'Pitch Deck Outline Generator',
    description: 'Fill in a 10-slide skeleton (problem, solution, market, traction, ask) and export the outline as a PDF or copy-paste text.',
    tag: 'INVESTOR PITCH',
    icon: Layout,
    actionText: 'Build pitch outline'
  },
  {
    title: 'Consulting Client Contract Generator',
    description: 'Create a branded consulting or freelance client contract with guided sections, PDF export, and editable Word download.',
    tag: 'CLIENT AGREEMENT',
    icon: Shield,
    actionText: 'Create contract'
  },
  {
    title: 'Product Business Management System',
    description: 'Explore an integrated product-business workspace with inventory, purchases, sales, recipes, reports, tasks, employees, and exportable PRD.',
    tag: 'ALL-IN-ONE TEMPLATE',
    icon: Boxes,
    actionText: 'Open system'
  },
  {
    title: 'More Startup Planners',
    description: 'Future startup tools can include funding pitch pages, launch checklists, customer discovery, and pricing playbooks.',
    tag: 'COMING NEXT',
    icon: Plus,
    actionText: 'Start with plan'
  }
];

export default function StartupToolkit({ setActiveTab }: StartupToolkitProps) {
  return (
    <div className="bg-[#fcfdfd] min-h-screen">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-32 pb-40 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-accent/[0.02] -skew-x-12 translate-x-24 pointer-events-none"></div>
        <div className="flex flex-col lg:flex-row items-center gap-24 relative z-10">
          <div className="lg:w-3/5">
            <div className="flex items-center text-accent text-[11px] font-bold uppercase tracking-[0.4em] mb-10">
              <Sparkles className="w-4 h-4 mr-3 animate-pulse" />
              NORTHSTAR ENGINE
            </div>
            
            <h1 className="text-6xl md:text-8xl font-serif text-slate-900 leading-[0.9] tracking-tighter mb-10">
              Architecture for <br />
              <span className="italic text-accent">Ambitious</span> Founders.
            </h1>
            
            <p className="text-slate-500 text-2xl mb-12 max-w-xl font-light leading-relaxed">
              Eliminate blank-page syndrome with a suite of professional document generators and strategic modeling tools.
            </p>
            
            <div className="flex flex-wrap items-center gap-6">
              <button 
                onClick={() => setActiveTab('Business Plan Generator')}
                className="bg-slate-900 text-white font-bold flex items-center px-12 py-6 hover:bg-accent transition-all text-[11px] uppercase tracking-[0.2em] rounded-2xl shadow-2xl scale-100 hover:scale-[1.02] active:scale-95 duration-300"
              >
                Launch Planner
                <ArrowRight className="w-4 h-4 ml-3" />
              </button>
              <button 
                onClick={() => setActiveTab('Start Up Expense Calculator')}
                className="bg-white text-slate-900 border border-slate-100 font-bold px-12 py-6 hover:bg-slate-50 transition-all text-[11px] uppercase tracking-[0.2em] rounded-2xl shadow-xl hover:scale-[1.02] active:scale-95 duration-300"
              >
                Burn Calculus
              </button>
            </div>
          </div>
          
          <div className="lg:w-2/5 relative hidden lg:block">
            <div className="relative w-full max-w-[440px] mx-auto h-[400px]">
              <div className="absolute top-0 -left-12 w-[340px] h-[240px] bg-white border border-slate-50 shadow-2xl rounded-[3rem] -rotate-[6deg] z-0 opacity-40 blur-[1px]"></div>
              <div className="absolute top-[40px] -right-12 w-[340px] h-[240px] bg-white border border-slate-50 shadow-2xl rounded-[3rem] rotate-[4deg] z-10 opacity-60"></div>
              <div className="absolute top-[100px] left-0 w-[420px] h-[280px] bg-white border border-slate-100 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.15)] rounded-[4rem] p-12 z-20 flex flex-col justify-between group overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full -translate-y-16 translate-x-16 group-hover:scale-[1.5] transition-transform duration-1000"></div>
                <div className="flex justify-between items-center relative z-10">
                  <div className="text-[11px] font-bold text-accent tracking-[0.4em] leading-none uppercase">CORE STACK 01</div>
                  <div className="p-3 rounded-2xl bg-accent/10 flex items-center justify-center">
                    <Layout className="w-5 h-5 text-accent" />
                  </div>
                </div>
                <div className="space-y-4 relative z-10">
                   <div className="h-1.5 w-full bg-slate-50 rounded-full"></div>
                   <div className="h-1.5 w-3/4 bg-slate-50 rounded-full"></div>
                </div>
                <div className="text-4xl font-serif text-slate-900 tracking-tight leading-tight relative z-10 italic">
                  Financial Integrity
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Directory Section */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 pb-40">
        <div className="max-w-3xl mb-24">
          <h2 className="text-4xl md:text-6xl font-serif text-slate-900 leading-[0.95] tracking-tighter italic">
            Strategic Infrastructure. <br />
            <span className="text-slate-300 not-italic">Synthesis Toolkit.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {startupTools.map((tool, index) => {
            const Icon = tool.icon;
            return (
              <div 
                key={index} 
                className="bg-white p-12 rounded-[3.5rem] border border-slate-50 flex flex-col min-h-[420px] hover:border-accent/30 hover:shadow-[0_30px_80px_-15px_rgba(0,0,0,0.08)] transition-all cursor-pointer group relative overflow-hidden"
                onClick={() => {
                  if (tool.title === 'Startup Business Plan Generator') {
                    setActiveTab('Business Plan Generator');
                  } else if (tool.title === 'Start Up Expense Calculator') {
                    setActiveTab('Start Up Expense Calculator');
                  }
                }}
              >
                <div className="absolute -top-16 -right-16 w-32 h-32 bg-accent/5 rounded-full group-hover:scale-[2.5] transition-transform duration-1000"></div>
                
                <div className="flex justify-between items-start mb-12 relative z-10">
                  <div className="w-16 h-16 bg-slate-50 rounded-3xl flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-all duration-500 shadow-sm">
                    <Icon className="w-7 h-7 stroke-[1.25]" />
                  </div>
                  <span className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.3em] group-hover:text-accent transition-colors">
                    {tool.tag}
                  </span>
                </div>
                
                <h3 className="font-serif text-3xl mb-6 text-slate-900 group-hover:text-accent transition-colors leading-[1.1] tracking-tight italic relative z-10">
                  {tool.title}
                </h3>
                
                <p className="text-slate-500 text-lg leading-relaxed mb-10 flex-grow font-light relative z-10 opacity-70 group-hover:opacity-100 transition-opacity">
                  {tool.description}
                </p>
                
                <div className="flex items-center text-[10px] font-bold uppercase tracking-[0.2em] text-slate-900 group-hover:translate-x-3 transition-all relative z-10">
                  {tool.actionText} 
                  <ArrowRight className="w-4 h-4 ml-4 text-accent" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
