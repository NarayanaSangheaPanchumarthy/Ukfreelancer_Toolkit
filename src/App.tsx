import React, { useState } from 'react';
import {
  FileText,
  FileEdit,
  Calculator,
  PieChart,
  Receipt,
  Download,
  Calendar,
  ArrowRight,
  Sparkles,
  Wallet,
  Briefcase,
  Rocket,
  Heart,
  Target,
  Smartphone,
  Search,
  Github,
  LogOut,
  User
} from 'lucide-react';
import InvoiceGenerator from './InvoiceGenerator';
import VatCalculator from './VatCalculator';
import ProFeaturesCTA from './ProFeaturesCTA';
import QuoteGenerator from './QuoteGenerator';
import ReceiptGenerator from './ReceiptGenerator';
import TaxEstimator from './TaxEstimator';
import Templates from './Templates';
import AboutUs from './AboutUs';
import PrivacyPolicy from './PrivacyPolicy';
import ContactUs from './ContactUs';
import ConsultationBooking from './ConsultationBooking';
import Chatbot from './Chatbot';
import FAQ from './FAQ';
import PlanningTools from './PlanningTools';
import UKBudgetPlanner from './UKBudgetPlanner';
import GoalProductivityCalculator from './GoalProductivityCalculator';
import DigitalDetoxCalculator from './DigitalDetoxCalculator';
import BusinessBudgetCalculator from './BusinessBudgetCalculator';
import StartUpExpenseCalculator from './StartUpExpenseCalculator';
import StartupToolkit from './StartupToolkit';
import MarriageBudgetCalculator from './MarriageBudgetCalculator';
import LegalTools from './LegalTools';
import PrivacyPolicyGenerator from './PrivacyPolicyGenerator';
import DPAGenerator from './DPAGenerator';
import CookiePolicyGenerator from './CookiePolicyGenerator';
import TermsOfServiceGenerator from './TermsOfServiceGenerator';
import SearchModal from './SearchModal';
import ReactGA from 'react-ga4';

const tools = [
  {
    title: 'Invoice Generator',
    description: 'Create a professional VAT invoice with live totals and one-click PDF export.',
    tag: 'FLAGSHIP TOOL',
    icon: FileText,
    actionText: 'Create Invoice'
  },
  {
    title: 'Quote / Estimate Generator',
    description: 'Send a polished quote or estimate using the same fast document flow.',
    tag: 'BEFORE THE WORK',
    icon: FileEdit,
    actionText: 'Create quote'
  },
  {
    title: 'VAT Calculator',
    description: 'Add or remove VAT at 20% and copy the breakdown instantly.',
    tag: 'INSTANT UTILITY',
    icon: Calculator,
    actionText: 'Calculate VAT'
  },
  {
    title: 'Tax Estimator',
    description: 'Estimate income tax and National Insurance from annual freelance profit.',
    tag: 'ROUGH PLANNING',
    icon: PieChart,
    actionText: 'Estimate tax'
  },
  {
    title: 'Receipt Generator',
    description: 'Generate a simple receipt for paid work, deposits, and client records.',
    tag: 'AFTER PAYMENT',
    icon: Receipt,
    actionText: 'Create receipt'
  },
  {
    title: 'Templates Library',
    description: 'Free invoice, quote, self-employed invoice, and receipt template pages.',
    tag: 'DOWNLOAD PAGES',
    icon: Download,
    actionText: 'Browse templates'
  },
  {
    title: 'Consultation Booking',
    description: 'Schedule 1-on-1 consultations and manage your appointments seamlessly.',
    tag: 'APPOINTMENT BOOKING',
    icon: Calendar,
    actionText: 'Book consultation'
  },
  {
    title: 'UK Budget Planner',
    description: 'Manage personal finances with a 50/30/20 rule planner tailored for the UK.',
    tag: 'PERSONAL FINANCE',
    icon: Wallet,
    actionText: 'Plan budget'
  },
  {
    title: 'Business Budget Calculator',
    description: 'Plan monthly revenue against operating expenses and profit reserve.',
    tag: 'BUSINESS PLANNING',
    icon: Briefcase,
    actionText: 'Calculate business budget'
  },
  {
    title: 'Startup Toolkit',
    description: 'Turn a business idea into a polished plan you can edit, export, and share.',
    tag: 'STARTUP HUB',
    icon: Rocket,
    actionText: 'Explore toolkit'
  },
  {
    title: 'Marriage Budget Calculator',
    description: 'Plan out wedding expenses against overall budget goals and identify remaining funds.',
    tag: 'LIFESTYLE',
    icon: Heart,
    actionText: 'Plan wedding budget'
  },
  {
    title: 'Goal & Productivity',
    description: 'Calculate weekly workload, break down tasks, and track productivity goals.',
    tag: 'PRODUCTIVITY',
    icon: Target,
    actionText: 'Calculate productivity'
  },
  {
    title: 'Digital Detox Calculator',
    description: 'Analyze screen time, see potential reclaimed days, and plan mindful activities.',
    tag: 'WELLBEING',
    icon: Smartphone,
    actionText: 'Plan detox'
  }
];

const navItems = [
  'Home', 'Invoices', 'Quotes', 'VAT Calculator', 'Tax Estimator', 'Receipts', 
  'Templates', 'Planning Tools', 'Startup Toolkit', 'Hiring & Contracts', 
  'Legal', 'Ops & Growth', 'Product', 'Strategy', 'Business Analyst', 'Project Manager'
];

export default function App() {
  const [activeTab, setActiveTab] = useState('Home');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [githubUser, setGithubUser] = useState<any>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  React.useEffect(() => {
    const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;
    if (measurementId) {
      ReactGA.initialize(measurementId);
    }
  }, []);

  React.useEffect(() => {
    const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;
    if (measurementId) {
      ReactGA.send({ hitType: "pageview", page: `/${activeTab.toLowerCase().replace(/ /g, '-')}`, title: activeTab });
    }
  }, [activeTab]);

  const trackButtonClick = (action: string, label: string) => {
    const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;
    if (measurementId) {
      ReactGA.event({
        category: 'Interactions',
        action,
        label,
      });
    }
  };

  React.useEffect(() => {
    fetchGithubUser();

    const handleMessage = (event: MessageEvent) => {
      const origin = event.origin;
      if (!origin.endsWith('.run.app') && !origin.includes('localhost')) return;
      if (event.data?.type === 'OAUTH_AUTH_SUCCESS') {
        fetchGithubUser();
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const fetchGithubUser = async () => {
    try {
      const res = await fetch('/api/auth/github/user');
      if (res.ok) {
        const data = await res.json();
        setGithubUser(data);
      } else {
        setGithubUser(null);
      }
    } catch (err) {
      console.error('Error fetching github user', err);
    }
  };

  const handleGithubConnect = async () => {
    setIsConnecting(true);
    try {
      const res = await fetch('/api/auth/github/url');
      const { url } = await res.json();
      const width = 600;
      const height = 700;
      const left = window.screenX + (window.outerWidth - width) / 2;
      const top = window.screenY + (window.outerHeight - height) / 2;
      
      window.open(url, 'github_oauth', `width=${width},height=${height},left=${left},top=${top}`);
    } catch (err) {
      console.error('Error starting github oauth', err);
    } finally {
      setIsConnecting(false);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/auth/github/logout', { method: 'POST' });
    setGithubUser(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-24 print:pb-0 print:bg-white">
      <SearchModal 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
        onNavigate={setActiveTab}
        tools={tools}
        navItems={navItems}
      />
      {/* Top Navigation Bar Simulation */}
      <nav className="bg-white border-b border-slate-200 flex flex-col xl:flex-row xl:items-center justify-between sticky top-0 z-50 print:hidden">
        <div className="px-8 py-4 xl:py-6 flex-shrink-0 border-b border-slate-100 xl:border-none min-w-[280px]">
          <div 
            className="font-serif font-bold text-xl tracking-tight text-slate-900 cursor-pointer" 
            onClick={() => setActiveTab('Home')}
          >
            UK Freelancer Toolkit
          </div>
          <div className="text-[10px] text-slate-400 uppercase tracking-widest mt-1 font-sans">
            Fast Admin Tools
          </div>
        </div>
        <div className="px-6 py-4 xl:py-6 flex items-center space-x-6 text-[13px] font-semibold text-slate-500 overflow-x-auto w-full xl:w-auto flex-1 whitespace-nowrap scrollbar-hide xl:pr-8">
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => {
                trackButtonClick('Nav Click', item);
                setActiveTab(item);
              }}
              className={`inline-block pb-1 transition-colors ${
                activeTab === item
                  ? 'text-slate-900 border-b-[3px] border-[#a67c52]'
                  : 'hover:text-slate-900 border-b-[3px] border-transparent'
              }`}
            >
              {item}
            </button>
          ))}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="inline-block p-1 text-slate-500 hover:text-slate-900 transition-colors ml-2 shrink-0"
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </button>
          
          <div className="ml-4 pl-4 border-l border-slate-200 hidden md:flex items-center">
            {githubUser ? (
              <div className="flex items-center gap-3">
                <img src={githubUser.avatar_url} alt={githubUser.login} className="w-8 h-8 rounded-full border border-slate-200" />
                <div className="flex flex-col">
                  <span className="text-[11px] font-bold text-slate-900 leading-none">{githubUser.name || githubUser.login}</span>
                  <button onClick={handleLogout} className="text-[10px] text-slate-500 hover:text-red-600 transition-colors flex items-center gap-1 mt-1">
                    <LogOut className="w-3 h-3" /> Logout
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={handleGithubConnect}
                disabled={isConnecting}
                className="flex items-center gap-2 bg-slate-900 text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-black transition-all disabled:opacity-50"
              >
                <Github className="w-4 h-4" />
                {isConnecting ? 'Opening...' : 'Connect GitHub'}
              </button>
            )}
          </div>
        </div>
      </nav>

      {activeTab === 'Home' ? (
        <main className="w-full">
          
          {/* Hero Section */}
          <div className="relative pt-24 pb-32 mb-20 overflow-hidden bg-gradient-to-b from-[#4facfe] to-[#e0f2fe] border-b border-blue-100">
            {/* Cloud shapes */}
            <div className="absolute top-10 left-10 w-48 h-16 bg-white/40 rounded-full blur-xl pointer-events-none"></div>
            <div className="absolute top-20 right-20 w-64 h-24 bg-white/40 rounded-full blur-2xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-1/4 w-96 h-32 bg-white/50 rounded-full blur-3xl pointer-events-none"></div>

            {/* Left Side Decoration: Polished Sunset Arch */}
            <div className="hidden lg:block absolute left-[-4%] xl:left-[2%] top-[5%] bottom-[5%] w-[340px] xl:w-[420px] pointer-events-none z-0 transition-transform duration-700 hover:scale-[1.02]">
              <div className="relative w-full h-full flex flex-col justify-end items-center group">
                {/* Glow behind */}
                <div className="absolute inset-0 bg-fuchsia-500/20 blur-[80px] rounded-full mix-blend-screen transition-opacity duration-700 group-hover:opacity-100 opacity-60"></div>
                
                {/* Main Outer Arch Stone */}
                <div className="absolute bottom-0 w-[85%] h-[95%] bg-gradient-to-br from-[#1c1d29] via-[#0f111a] to-black rounded-t-[200px] rounded-b-2xl border-[1.5px] border-[#383a54] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] flex flex-col items-center justify-end overflow-hidden">
                   {/* Arch Inner Glow/Bevel */}
                   <div className="absolute inset-[3px] rounded-t-[190px] rounded-b-[14px] border-[2px] border-white/5 shadow-[inset_0_0_30px_rgba(0,0,0,0.9)] pointer-events-none z-20"></div>
                   
                   {/* Left Pillar Segment */}
                   <div className="absolute left-[12px] bottom-0 w-[18px] top-[180px] bg-gradient-to-r from-black/80 via-white/5 to-black/80 border-l border-r border-[#383a54]/50 z-20"></div>
                   <div className="absolute left-[34px] bottom-0 w-[12px] top-[180px] bg-gradient-to-r from-black/60 via-white/3 to-black/60 border-r border-[#383a54]/30 z-20"></div>
                   
                   {/* Right Pillar Segment */}
                   <div className="absolute right-[12px] bottom-0 w-[18px] top-[180px] bg-gradient-to-r from-black/80 via-white/5 to-black/80 border-l border-r border-[#383a54]/50 z-20"></div>
                   <div className="absolute right-[34px] bottom-0 w-[12px] top-[180px] bg-gradient-to-r from-black/60 via-white/3 to-black/60 border-l border-[#383a54]/30 z-20"></div>

                   {/* Portal / Inner Arch */}
                   <div className="absolute bottom-0 left-[50px] right-[50px] top-[46px] rounded-t-[160px] overflow-hidden shadow-[inset_0_0_40px_rgba(0,0,0,1)] bg-slate-900 z-10 border-t border-[rgba(255,255,255,0.05)]">
                      
                      {/* Sunset Sky Background */}
                      <div className="absolute inset-0 bg-gradient-to-b from-[#10143c] via-[#482073] to-[#f07b99] pointer-events-none"></div>
                      
                      {/* Glowing Sun */}
                      <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-0">
                         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[#ff5e8c] rounded-full blur-[45px] opacity-60"></div>
                         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-[#ffe8b5] rounded-full blur-[6px]"></div>
                         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full blur-[1px]"></div>
                      </div>
                      
                      {/* Distant Mountains / Hills */}
                      <div className="absolute top-[45%] left-0 right-0 bottom-0 pointer-events-none overflow-hidden z-10">
                         {/* Back Mountains */}
                         <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute w-[200%] h-[120%] fill-[#30165a] -left-[40%] top-[0%] opacity-90 drop-shadow-[0_-5px_15px_rgba(255,0,128,0.3)]">
                            <path d="M0,45 L15,25 L35,40 L55,10 L75,35 L100,20 L100,100 L0,100 Z" />
                         </svg>
                         {/* Mid Mountains */}
                         <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute w-[200%] h-[120%] fill-[#1f0d3d] -left-[20%] top-[20%] drop-shadow-[0_-5px_10px_rgba(0,0,0,0.5)]">
                            <path d="M0,35 L20,15 L40,30 L60,10 L80,35 L100,15 L100,100 L0,100 Z" />
                         </svg>
                      </div>
                      
                      {/* Ambient glow from bottom */}
                      <div className="absolute bottom-0 left-0 right-0 h-[50%] bg-gradient-to-t from-[#e93e96]/30 to-transparent pointer-events-none z-10"></div>

                      {/* Pink/Magenta fog overlay over the mountains */}
                      <div className="absolute top-[40%] bottom-[20%] left-0 right-0 bg-gradient-to-b from-transparent via-[#f07b99]/30 to-transparent mix-blend-overlay z-10 blur-xl"></div>

                      {/* Fog near stairs */}
                      <div className="absolute bottom-[20%] left-0 right-0 h-[20%] bg-[#e93e96]/10 blur-xl z-20 pointer-events-none"></div>

                      {/* Stairs */}
                      <div className="absolute bottom-0 left-[-20%] right-[-20%] h-[38%] flex flex-col justify-end perspective-1000 z-20">
                        {[...Array(14)].map((_, i) => {
                          const widthStr = `${50 + (i * 3.5)}%`;
                          return (
                          <div 
                            key={i} 
                            className="mx-auto border-t border-t-[#f07b99]/40 border-b border-b-black/90 relative"
                            style={{
                              width: widthStr,
                              height: `${6 + i * 1.5}%`,
                              background: `linear-gradient(to bottom, #501d6d ${0}%, #1a0e35 ${100}%)`,
                              transform: `translateY(${i * 1.2}px)`,
                              boxShadow: 'inset 0 1px 2px rgba(244, 114, 182, 0.4), 0 5px 8px -2px rgba(0, 0, 0, 0.8)',
                              zIndex: 30 + i
                            }}
                          >
                            {/* Highlight on stair edge */}
                            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#f9a8d4]/50 to-transparent"></div>
                            {/* Inner shadow/ambient occlusion */}
                            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60"></div>
                          </div>
                        )})}
                      </div>

                      {/* Floor in front of stairs */}
                      <div className="absolute bottom-[-10px] left-[-10px] right-[-10px] h-[15%] bg-gradient-to-b from-[#1a0e35] via-black to-black z-40 blur-sm"></div>

                      {/* Portal inner top shadow */}
                      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-black/80 to-transparent z-40 rounded-t-[160px] pointer-events-none"></div>
                   </div>
                </div>
              </div>
            </div>

            {/* Right Side Decoration: Colourful floating boxes */}
            <div className="hidden lg:flex absolute right-[2%] xl:right-[6%] top-[15%] bottom-[15%] w-[240px] flex-col justify-around pointer-events-none z-0 py-4">
              {/* Project Box */}
              <div className="bg-gradient-to-br from-indigo-500 to-purple-500 rounded-3xl p-6 shadow-2xl border-4 border-white/50 rotate-[6deg] transform transition-transform duration-500 self-end mr-4">
                <span className="block text-white font-serif font-black text-3xl tracking-wider drop-shadow-md">Project</span>
              </div>
              
              {/* Business Box */}
              <div className="bg-gradient-to-br from-blue-400 to-teal-400 rounded-3xl p-6 shadow-2xl border-4 border-white/50 -rotate-[4deg] transform transition-transform duration-500 self-start ml-2">
                <span className="block text-white font-serif font-black text-3xl tracking-wider drop-shadow-md">Business</span>
              </div>
              
              {/* Legal Box */}
              <div className="bg-gradient-to-br from-amber-400 to-orange-500 rounded-3xl p-6 shadow-2xl border-4 border-white/50 rotate-[8deg] transform transition-transform duration-500 self-end mr-8">
                <span className="block text-white font-serif font-black text-3xl tracking-wider drop-shadow-md">Legal</span>
              </div>
            </div>
            
            <div className="max-w-5xl mx-auto px-4 md:px-8 relative z-10 flex flex-col md:flex-row items-center gap-12 lg:gap-8">
              <div className="flex-1 max-w-2xl">
                <div className="flex items-center text-white text-[11px] font-bold uppercase tracking-widest mb-6 bg-blue-500/20 px-3 py-1.5 rounded-full w-fit">
                  <Sparkles className="w-3.5 h-3.5 mr-2" />
                  UK-Specific Freelancer Admin
                </div>
                
                <h1 className="text-5xl md:text-[64px] font-serif text-white leading-[1.05] tracking-tight mb-8 drop-shadow-md">
                  Invoices, quotes, <br className="hidden md:block" />
                  VAT and tax <br className="hidden md:block" />
                  estimates without <br className="hidden md:block" />
                  accounting <br className="hidden md:block" />
                  software.
                </h1>
                
                <p className="text-white/90 text-lg mb-10 max-w-xl leading-relaxed font-medium">
                  A fast, clean toolkit for UK freelancers who need to open a tool, enter details, download or copy the result, and move on.
                </p>
                
                <div className="flex flex-wrap items-center gap-4">
                  <button 
                    onClick={() => { trackButtonClick('Hero Action', 'Create VAT invoice'); setActiveTab('Invoices'); }}
                    className="bg-white text-blue-900 font-bold flex items-center px-6 py-4 hover:bg-slate-50 transition-colors text-sm shadow-lg rounded-lg"
                  >
                    Create VAT invoice
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
                  <button 
                    onClick={() => { trackButtonClick('Hero Action', 'Open VAT calculator'); setActiveTab('VAT Calculator'); }}
                    className="bg-blue-600/30 backdrop-blur-sm border border-white/20 text-white font-bold px-6 py-4 hover:bg-blue-600/40 transition-colors text-sm rounded-lg"
                  >
                    Open VAT calculator
                  </button>
                  <button 
                    onClick={() => { trackButtonClick('Hero Action', 'Create quote'); setActiveTab('Quotes'); }}
                    className="bg-blue-600/30 backdrop-blur-sm border border-white/20 text-white font-bold px-6 py-4 hover:bg-blue-600/40 transition-colors text-sm rounded-lg"
                  >
                    Create quote
                  </button>
                </div>
              </div>
              
              <div className="flex-1 w-full flex justify-center lg:justify-end relative mr-8 lg:mr-4 hidden md:flex">
                <div className="relative w-full max-w-[360px]">
                  {/* Decorative background outline */}
                  <div className="absolute top-[20%] -bottom-4 -left-12 -right-12 border border-blue-200/50 rounded-2xl z-0 backdrop-blur-sm"></div>
                  
                  {/* Back card */}
                  <div className="absolute top-0 right-0 bottom-0 left-8 bg-blue-50/90 rounded-2xl border border-blue-100 z-10 backdrop-blur-md"></div>
                  
                  {/* Main invoice card */}
                  <div className="relative bg-white border border-slate-100 shadow-2xl rounded-2xl p-8 z-20 w-full aspect-[3/4] flex flex-col items-center">
                    <div className="text-2xl font-serif text-slate-800 tracking-wide mt-8 mb-auto w-full text-left pl-2">INVOICE</div>
                    
                    <div className="w-full text-left pl-2 pb-16">
                      <div className="text-3xl font-bold text-slate-900 mb-2 font-sans tracking-tight">£1,800.00</div>
                      <div className="text-[10px] text-slate-400 font-medium tracking-wide">VAT included •</div>
                    </div>
                    
                    {/* Yellow badge overlapping */}
                    <div className="absolute -bottom-6 -right-6 md:-right-12 bg-white text-blue-600 text-sm font-bold px-6 py-4 shadow-xl border border-blue-50 rounded-xl z-30 tracking-tight">
                      Under 60 seconds for repeat use
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            {/* Section Header */}
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-slate-800 leading-tight">
                Single-purpose tools for one<br className="hidden md:block" /> freelance workflow.
              </h2>
            </div>
  
            {/* Grid Label */}
            <div className="text-sm font-bold tracking-widest uppercase text-slate-400 mb-6 pl-2">
              Toolkit Directory
            </div>

          {/* Directory Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool, index) => {
              const Icon = tool.icon;
              return (
                <div 
                  key={index} 
                  onClick={() => {
                    trackButtonClick('Tool Click', tool.title);
                    const mappedTab: Record<string, string> = {
                      'Invoice Generator': 'Invoices',
                      'Quote / Estimate Generator': 'Quotes',
                      'VAT Calculator': 'VAT Calculator',
                      'Tax Estimator': 'Tax Estimator',
                      'Receipt Generator': 'Receipts',
                      'Templates Library': 'Templates',
                      'Consultation Booking': 'Consultation Booking',
                      'UK Budget Planner': 'UK Budget Planner',
                      'Business Budget Calculator': 'Business Budget Calculator',
                      'Startup Toolkit': 'Startup Toolkit',
                      'Marriage Budget Calculator': 'Marriage Budget Calculator',
                      'Goal & Productivity': 'Goal & Productivity Calculator',
                      'Digital Detox Calculator': 'Digital Detox Calculator'
                    };
                    setActiveTab(mappedTab[tool.title] || 'Home');
                  }}
                  className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm flex flex-col min-h-[260px] hover:border-blue-500 hover:shadow-md transition-all cursor-pointer group"
                >
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                      <Icon className="text-slate-600 w-6 h-6 stroke-[2] group-hover:text-blue-600 transition-colors" />
                    </div>
                    <span className="bg-slate-100 text-slate-600 text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-widest group-hover:bg-blue-100 group-hover:text-blue-700 transition-colors">
                      {tool.tag}
                    </span>
                  </div>
                  
                  <h3 className="font-semibold text-lg mb-2 text-slate-800 leading-tight">
                    {tool.title}
                  </h3>
                  
                  <p className="text-slate-500 text-sm mb-6 flex-grow leading-relaxed">
                    {tool.description}
                  </p>
                  
                  <div className="flex items-center text-sm font-bold text-slate-700 mt-auto group-hover:text-blue-600 transition-colors">
                    {tool.actionText} 
                    <ArrowRight className="w-4 h-4 ml-2 opacity-0 -translate-x-2 group-hover:translate-x-0 group-hover:opacity-100 transition-all text-blue-600" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* FAQ Section */}
          <FAQ />

          {/* Bottom CTA Block */}
          <ProFeaturesCTA />
          </div>
        </main>
      ) : activeTab === 'Invoices' ? (
        <InvoiceGenerator />
      ) : activeTab === 'Quotes' ? (
        <QuoteGenerator />
      ) : activeTab === 'VAT Calculator' ? (
        <VatCalculator />
      ) : activeTab === 'Tax Estimator' ? (
        <TaxEstimator />
      ) : activeTab === 'Receipts' ? (
        <ReceiptGenerator />
      ) : activeTab === 'Templates' ? (
        <Templates setActiveTab={setActiveTab} />
      ) : activeTab === 'About Us' ? (
        <AboutUs />
      ) : activeTab === 'Privacy policy' ? (
        <PrivacyPolicy />
      ) : activeTab === 'Contact us' ? (
        <ContactUs />
      ) : activeTab === 'Consultation Booking' ? (
        <ConsultationBooking />
      ) : activeTab === 'Planning Tools' ? (
        <div className="bg-[#f5f7f9] min-h-screen"><PlanningTools setActiveTab={setActiveTab} /></div>
      ) : activeTab === 'Startup Toolkit' ? (
        <StartupToolkit setActiveTab={setActiveTab} />
      ) : activeTab === 'UK Budget Planner' ? (
        <UKBudgetPlanner />
      ) : activeTab === 'Goal & Productivity Calculator' ? (
        <GoalProductivityCalculator />
      ) : activeTab === 'Digital Detox Calculator' ? (
        <DigitalDetoxCalculator />
      ) : activeTab === 'Business Budget Calculator' ? (
        <BusinessBudgetCalculator />
      ) : activeTab === 'Start Up Expense Calculator' ? (
        <StartUpExpenseCalculator />
      ) : activeTab === 'Marriage Budget Calculator' ? (
        <MarriageBudgetCalculator />
      ) : activeTab === 'Privacy Policy Generator' ? (
        <PrivacyPolicyGenerator />
      ) : activeTab === 'DPA Generator' ? (
        <DPAGenerator />
      ) : activeTab === 'Cookie Policy Generator' ? (
        <CookiePolicyGenerator />
      ) : activeTab === 'Terms of Service Generator' ? (
        <TermsOfServiceGenerator />
      ) : activeTab === 'Legal' ? (
        <LegalTools setActiveTab={setActiveTab} />
      ) : (
        <main className="max-w-5xl mx-auto px-4 md:px-8 py-24 flex items-center justify-center min-h-[50vh]">
          <div className="text-center p-12 bg-white border border-slate-200 rounded-3xl shadow-sm max-w-lg w-full">
            <h2 className="text-2xl font-serif text-slate-900 mb-4">{activeTab}</h2>
            <p className="text-slate-500 mb-8">This module will be developed in the upcoming phases based on specific internal requirements.</p>
            <button 
              onClick={() => setActiveTab('Home')}
              className="bg-slate-100 text-slate-800 font-bold px-6 py-3 rounded-xl hover:bg-slate-200 transition-colors text-sm"
            >
              Return Home
            </button>
          </div>
        </main>
      )}
      
      {/* Footer Simulation */}
      <footer className="mt-24 border-t border-slate-200 py-8 px-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 gap-4">
        <div className="flex items-center space-x-2 font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="font-semibold text-slate-800">Systems operational</span>
        </div>
        <div className="flex gap-6 font-medium">
          <button onClick={() => setActiveTab('About Us')} className="hover:text-slate-800 transition-colors">About Us</button>
          <button onClick={() => setActiveTab('Privacy policy')} className="hover:text-slate-800 transition-colors">Privacy policy</button>
          <button onClick={() => setActiveTab('Contact us')} className="hover:text-slate-800 transition-colors">Contact us</button>
        </div>
      </footer>
      <Chatbot />
    </div>
  );
}
