import React from 'react';
import { ArrowRight, FileText, CheckCircle, PieChart, TrendingDown, Calculator, Layout, Shield, Boxes, Plus } from 'lucide-react';

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
    <div className="bg-[#fdfcfb] min-h-screen">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-20 pb-32">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-3/5">
            <div className="flex items-center text-[#a67c52] text-[11px] font-bold uppercase tracking-[0.2em] mb-6">
              <span className="mr-2">✨</span>
              Startup Toolkit
            </div>
            
            <h1 className="text-5xl md:text-7xl font-serif text-slate-900 leading-[1.05] tracking-tight mb-8">
              Turn a business idea into a polished plan you can edit, export, and share.
            </h1>
            
            <p className="text-slate-500 text-lg mb-10 max-w-xl leading-relaxed">
              A focused toolkit for founders who need structured documents, not blank pages. Start with the business plan generator.
            </p>
            
            <div className="flex flex-wrap items-center gap-4">
              <button 
                onClick={() => setActiveTab('Start Up Expense Calculator')}
                className="bg-[#1a1f24] text-white font-bold flex items-center px-8 py-4 px hover:bg-black transition-all text-sm rounded shadow-lg"
              >
                Create business plan
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
              <button 
                onClick={() => setActiveTab('Start Up Expense Calculator')}
                className="bg-white text-slate-800 border border-slate-200 font-bold px-8 py-4 hover:border-slate-400 transition-all text-sm rounded shadow-sm"
              >
                Open expense calculator
              </button>
            </div>
          </div>
          
          <div className="lg:w-2/5 relative">
            <div className="relative w-full max-w-md mx-auto">
              {/* Decorative stacked cards */}
              <div className="absolute top-0 right-0 w-64 h-80 bg-white border border-slate-100 shadow-xl rounded-lg rotate-6 translate-x-12 -translate-y-8 z-0">
                <div className="p-6">
                  <div className="text-[10px] font-bold text-slate-300 mb-2">01</div>
                  <div className="w-12 h-1 bg-slate-100 mb-4"></div>
                  <div className="text-xl font-serif text-slate-400 leading-tight">Vision & Market Analysis</div>
                </div>
              </div>
              
              <div className="absolute top-12 right-0 w-64 h-80 bg-white border border-slate-100 shadow-xl rounded-lg -rotate-3 translate-x-4 z-10">
                <div className="p-6">
                  <div className="text-[10px] font-bold text-slate-300 mb-2">02</div>
                  <div className="w-12 h-1 bg-slate-100 mb-4"></div>
                  <div className="text-xl font-serif text-slate-800 leading-tight">Product / Market Fit Strategy</div>
                </div>
              </div>
              
              <div className="relative mt-24 mr-12 bg-white border border-slate-100 shadow-2xl rounded-lg p-8 z-20 aspect-[4/3] flex flex-col justify-center">
                <div className="text-[10px] font-bold text-[#a67c52] mb-4">03</div>
                <div className="w-16 h-1.5 bg-[#a67c52] mb-6"></div>
                <div className="text-3xl font-serif text-slate-900 leading-tight tracking-tight">
                  Financial Outlook
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Directory Section */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 pb-32">
        <div className="max-w-3xl mb-20 text-center lg:text-left">
          <h2 className="text-3xl md:text-5xl font-serif text-slate-800 leading-[1.2] tracking-tight">
            Document generators and planning tools for early-stage founders.
          </h2>
        </div>

        <div className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#a67c52] mb-8 border-b border-slate-100 pb-4">
          Startup Directory
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-slate-200 border border-slate-200 shadow-sm">
          {startupTools.map((tool, index) => {
            const Icon = tool.icon;
            return (
              <div 
                key={index} 
                className="bg-white p-8 flex flex-col min-h-[320px] hover:bg-slate-50 transition-all cursor-pointer group"
                onClick={() => {
                  if (tool.title === 'Startup Business Plan Generator' || tool.title === 'Start Up Expense Calculator') {
                    setActiveTab('Start Up Expense Calculator');
                  }
                }}
              >
                <div className="flex justify-between items-start mb-10">
                  <div className="text-[#a67c52]">
                    <Icon className="w-6 h-6 stroke-[1.5]" />
                  </div>
                  <span className="text-[9px] font-bold text-[#a67c52] uppercase tracking-[0.15em]">
                    {tool.tag}
                  </span>
                </div>
                
                <h3 className="font-serif text-xl mb-4 text-slate-900 group-hover:text-[#a67c52] transition-colors leading-tight">
                  {tool.title}
                </h3>
                
                <p className="text-slate-500 text-sm leading-relaxed mb-8 flex-grow">
                  {tool.description}
                </p>
                
                <div className="flex items-center text-[11px] font-bold uppercase tracking-widest text-slate-800 group-hover:text-[#a67c52] transition-colors mt-auto">
                  {tool.actionText} 
                  <ArrowRight className="w-3.5 h-3.5 ml-2 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
