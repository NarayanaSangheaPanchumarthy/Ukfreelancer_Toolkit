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
import BusinessPlanGenerator from './BusinessPlanGenerator';
import SearchModal from './SearchModal';
import ProjectManager from './ProjectManager';
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
  'Templates', 'Business Analyst', 'Project Manager', 'Strategy', 'Startup Toolkit', 'Hiring & Contracts', 
  'Legal', 'Ops & Growth', 'Product'
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
    
    // Read tab from URL on load
    const params = new URLSearchParams(window.location.search);
    const tabParam = params.get('tab');
    if (tabParam) {
      setActiveTab(tabParam);
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
      {/* Top Navigation Bar */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200 flex flex-col xl:flex-row xl:items-center justify-between sticky top-0 z-50 print:hidden shadow-sm">
        <div className="px-8 py-4 xl:py-5 flex-shrink-0 border-b border-slate-100 xl:border-none min-w-[280px]">
          <div 
            className="font-display font-bold text-xl tracking-tight text-slate-900 cursor-pointer flex items-center gap-2" 
            onClick={() => setActiveTab('Home')}
          >
            <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
              <Rocket className="w-5 h-5 text-white" />
            </div>
            <span>UK Freelancer Toolkit</span>
          </div>
        </div>
        <div className="px-6 py-4 xl:py-5 flex items-center space-x-8 text-[13px] font-medium text-slate-500 overflow-x-auto w-full xl:w-auto flex-1 whitespace-nowrap scrollbar-hide xl:pr-8">
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => {
                trackButtonClick('Nav Click', item);
                setActiveTab(item);
              }}
              className={`inline-block pb-1 transition-all duration-300 relative group ${
                activeTab === item
                  ? 'text-slate-900 font-bold'
                  : 'hover:text-slate-900'
              }`}
            >
              {item}
              <span className={`absolute bottom-0 left-0 h-[2px] bg-accent transition-all duration-300 ${activeTab === item ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
            </button>
          ))}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="inline-block p-1.5 bg-slate-50 border border-slate-200 rounded-full text-slate-500 hover:text-slate-900 transition-colors ml-2 shrink-0"
            aria-label="Search"
          >
            <Search className="w-4 h-4" />
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
          <div className="relative pt-32 pb-40 mb-20 overflow-hidden bg-slate-950 border-b border-slate-800">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-accent/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>
            
            <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 flex flex-col lg:flex-row items-center gap-16">
              <div className="flex-1 max-w-3xl text-center lg:text-left">
                <div className="inline-flex items-center text-accent text-[11px] font-bold uppercase tracking-[0.2em] mb-8 bg-accent/10 border border-accent/20 px-4 py-2 rounded-full">
                  <Sparkles className="w-3.5 h-3.5 mr-2" />
                  Premium Toolkit for UK Professionals
                </div>
                
                <h1 className="text-5xl md:text-7xl font-serif text-white leading-[1.05] tracking-tight mb-8">
                  Focus on your work.<br className="hidden md:block" />
                  We'll handle the <span className="text-accent italic">boring stuff</span>.
                </h1>
                
                <p className="text-slate-400 text-xl mb-12 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light">
                  Professional grade invoices, quotes, and financial planning tools designed for the modern UK independent. Zero bloat, maximum efficiency.
                </p>
                
                <div className="flex flex-wrap justify-center lg:justify-start items-center gap-5">
                  <button 
                    onClick={() => { trackButtonClick('Hero Action', 'Create VAT invoice'); setActiveTab('Invoices'); }}
                    className="bg-accent text-white font-bold flex items-center px-8 py-4 hover:bg-accent-dark transition-all scale-100 hover:scale-105 duration-300 text-sm shadow-xl rounded-xl"
                  >
                    Get Started Free
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
                  <button 
                    onClick={() => { trackButtonClick('Hero Action', 'Open VAT calculator'); setActiveTab('VAT Calculator'); }}
                    className="bg-white/5 backdrop-blur-md border border-white/10 text-white font-bold px-8 py-4 hover:bg-white/10 transition-all text-sm rounded-xl"
                  >
                    View All Tools
                  </button>
                </div>
              </div>
              
              <div className="flex-1 w-full flex justify-center lg:justify-end relative hidden lg:flex">
                <div className="relative w-full max-w-[420px]">
                  {/* Floating cards for visual interest */}
                  <div className="absolute -top-12 -left-12 w-48 bg-white p-4 rounded-xl shadow-2xl border border-slate-100 rotate-[-8deg] z-30 animate-float">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center">
                        <FileText className="w-4 h-4 text-blue-600" />
                      </div>
                      <div className="h-2 w-16 bg-slate-100 rounded"></div>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded mb-2"></div>
                    <div className="h-2 w-[80%] bg-slate-100 rounded"></div>
                  </div>

                  <div className="absolute -bottom-8 -right-12 w-56 bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-3xl rotate-[4deg] z-30">
                    <div className="text-[10px] text-slate-500 uppercase tracking-widest mb-2 font-bold">Total Revenue</div>
                    <div className="text-2xl font-display font-bold text-white">£12,450.00</div>
                    <div className="mt-3 h-1 w-full bg-slate-800 rounded">
                      <div className="h-full w-[70%] bg-accent rounded"></div>
                    </div>
                  </div>

                  {/* Main mockup card */}
                  <div className="relative bg-white border border-slate-100 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5)] rounded-2xl py-12 px-10 z-20 w-full aspect-[3/4] flex flex-col">
                    <div className="w-12 h-1 bg-accent mb-12"></div>
                    <div className="text-4xl font-serif text-slate-800 tracking-tight mb-2">INVOICE</div>
                    <div className="text-sm text-slate-400 mb-12 font-medium">INV-2026-X42</div>
                    
                    <div className="space-y-6 flex-grow">
                      <div className="flex justify-between items-center border-b border-slate-50 pb-4">
                        <div className="h-3 w-32 bg-slate-100 rounded"></div>
                        <div className="h-3 w-16 bg-slate-100 rounded"></div>
                      </div>
                      <div className="flex justify-between items-center border-b border-slate-50 pb-4">
                        <div className="h-3 w-24 bg-slate-100 rounded"></div>
                        <div className="h-3 w-16 bg-slate-100 rounded"></div>
                      </div>
                      <div className="flex justify-between items-center border-b border-slate-50 pb-4">
                        <div className="h-3 w-40 bg-slate-100 rounded"></div>
                        <div className="h-3 w-16 bg-slate-100 rounded"></div>
                      </div>
                    </div>

                    <div className="pt-8 border-t border-slate-100">
                      <div className="flex justify-between items-end">
                        <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Total Amount</div>
                        <div className="text-3xl font-display font-bold text-slate-900 tracking-tight border-b-2 border-accent/20">£2,400.00</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 md:px-8 -mt-16 relative z-30">
            {/* Stats Overlap */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
              {[
                { label: 'Active Users', value: '12,000+' },
                { label: 'Documents Created', value: '850k+' },
                { label: 'Time Saved', value: '25,000 hrs' },
                { label: 'User Rating', value: '4.9/5.0' },
              ].map((stat, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl shadow-xl border border-slate-100 text-center">
                  <div className="text-2xl font-display font-bold text-slate-900 mb-1">{stat.value}</div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Section Header */}
            <div className="text-center mb-20 max-w-3xl mx-auto">
              <div className="inline-block text-accent text-[11px] font-bold uppercase tracking-[0.2em] mb-4">Precision Engineering</div>
              <h2 className="text-4xl md:text-5xl font-serif tracking-tight text-slate-900 leading-tight mb-6">
                Single-purpose tools for professionals.
              </h2>
              <p className="text-slate-500 text-lg font-light leading-relaxed">
                We believe in tools that do one thing perfectly. No complex enterprise software, just fast, reliable admin for the independent workforce.
              </p>
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
                  
                  <h3 className="font-bold text-lg mb-2 text-slate-900 tracking-tight group-hover:text-accent transition-colors">
                    {tool.title}
                  </h3>
                  
                  <p className="text-slate-500 text-sm mb-6 flex-grow leading-relaxed font-light">
                    {tool.description}
                  </p>
                  
                  <div className="flex items-center text-[11px] font-bold text-slate-900 uppercase tracking-widest mt-auto group-hover:text-accent transition-colors">
                    {tool.actionText} 
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
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
      ) : activeTab === 'Business Plan Generator' ? (
        <BusinessPlanGenerator />
      ) : activeTab === 'Project Manager' ? (
        <ProjectManager />
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
