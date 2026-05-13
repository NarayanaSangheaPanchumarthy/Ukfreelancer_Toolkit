import React, { useState, useEffect, useRef } from 'react';
import { Download } from 'lucide-react';

const PreviewBox = ({ label, title, text, themeProps, dark = false, className = "" }: any) => {
  if (dark) {
    return (
      <div className={`p-5 lg:p-6 flex items-center justify-center overflow-hidden flex-shrink-0 ${className}`} style={{ backgroundColor: themeProps.font, color: themeProps.doc }}>
        <h3 className="text-xl font-serif text-center leading-tight" dangerouslySetInnerHTML={{__html: title}}></h3>
      </div>
    );
  }

  return (
    <div className={`p-4 lg:p-6 border bg-white flex flex-col overflow-hidden min-h-0 ${className}`} style={{ borderColor: `color-mix(in srgb, ${themeProps.accent} 30%, transparent)` }}>
      {label && <div className="text-[9px] font-bold tracking-[0.15em] uppercase mb-3 flex-shrink-0 inline-block" style={{ color: themeProps.accent }}>{label}</div>}
      {title && <h3 className="text-lg lg:text-xl font-serif mb-3 leading-tight flex-shrink-0 break-words" style={{ color: themeProps.font }}>{title}</h3>}
      <div className="text-[12px] lg:text-[13px] leading-relaxed opacity-85 whitespace-pre-wrap flex-1 overflow-hidden min-h-0">{text}</div>
    </div>
  );
};

const PreviewTableRow = ({ label, text, themeProps }: any) => (
  <div className="flex border-b py-4" style={{ borderColor: `color-mix(in srgb, ${themeProps.accent} 30%, transparent)` }}>
    <div className="w-1/3 text-[9px] font-bold tracking-[0.15em] uppercase mt-1" style={{ color: themeProps.accent }}>{label}</div>
    <div className="w-2/3 text-sm font-semibold opacity-90" style={{ color: themeProps.font }}>{text}</div>
  </div>
);

export default function BusinessPlanGenerator() {
  const [activeSidebarTab, setActiveSidebarTab] = useState('Overview');
  const [colorTheme, setColorTheme] = useState('Blush');
  const previewRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    if (previewRefs.current[activeSidebarTab]) {
      previewRefs.current[activeSidebarTab]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [activeSidebarTab]);
  
  const [formData, setFormData] = useState({
    // Overview
    companyName: 'Northstar Studio',
    tagline: 'A focused launch plan for a practical, profitable small business',
    founderName: 'Your Name',
    planYear: '2026',
    preparedFor: 'Founders, lenders, partners, and advisors',
    contactEmail: 'panchumarthy756@gmail.com',
    executiveSummary: 'Northstar Studio helps independent brands turn specialist knowledge into clear digital products and premium service offers. The business will launch with a lean operating model, a focused client segment, and a practical marketing system designed to generate predictable leads.',
    
    // Summary Offer & Revenue Model (can be edited under Marketing / Business Structure, but let's keep them accessible here for the page)
    launchOffer: 'A fixed-price Startup Clarity Sprint that creates the first business plan and 90-day launch roadmap.',
    revenueModelText: 'Project fees, packaged services, and monthly retainers.',

    // Vision & Mission
    vision: 'To become a trusted small-business partner for founders who want clarity, calm execution, and commercially useful strategy.',
    mission: 'To help clients define their offer, launch faster, and build repeatable systems without unnecessary complexity.',
    values: 'Clarity, usefulness, consistency, honest communication, and sustainable growth.',

    // Business Structure
    legalStructure: 'Sole trader or limited company',
    location: 'United Kingdom / remote-first',
    productsServices: 'Business planning workshops, launch strategy, digital templates, and ongoing advisory retainers.',
    revenueModel: 'Project fees, packaged services, and monthly retainers.',

    // Ideal Client
    targetClient: 'Early-stage founders, freelancers, and small service businesses who need structured planning before investing in marketing or operations.',
    clientPain: 'Unclear offer, inconsistent leads, lack of confidence in pricing, scattered planning documents, and too many competing priorities.',
    clientOutcome: 'A focused plan, clear next actions, and a more professional story to share with customers, lenders, or partners.',

    // Marketing
    marketingChannels: 'SEO content, LinkedIn posts, referral partners, email newsletter, and downloadable lead magnets.',
    marketingOffer: 'A fixed-price Startup Clarity Sprint that creates the first business plan and 90-day launch roadmap.',
    pricingStrategy: 'Start with accessible packaged pricing, then introduce premium advisory support as demand grows.',

    // Competition
    competitors: 'Generic template sellers, local consultants, online courses, and do-it-yourself planning resources.',
    competitiveAdvantage: 'A practical planning system that turns founder ideas into investor-ready and action-ready documents without bloated software.',
    swotStrengths: 'Clear positioning, low overheads, founder expertise, fast delivery, and reusable planning assets.',
    swotWeaknesses: 'Limited brand awareness at launch and reliance on founder-led sales.',
    swotOpportunities: 'Growing demand for lean startup support, digital templates, and specialist advisory services.',
    swotThreats: 'Low-cost template competitors, changing marketing channels, and slower client buying cycles.',

    // Financials
    startupCosts: 'Website and brand: £1,800\nSoftware setup: £600\nLegal and accounting: £900\nLaunch marketing: £2,000\nContingency: £1,200',
    monthlyCosts: 'Software: £250\nMarketing: £600\nProfessional fees: £200\nInsurance: £80\nFounder salary reserve: £2,000',
    fundingNeeded: '£8,000 initial launch budget plus three months operating runway.',
    revenueGoal: 'Reach £8,000 monthly revenue by month six through a mix of projects and retainers.',

    // Future Plan
    milestones: 'Month 1: Finalise offer and brand\nMonth 2: Launch website and lead magnet\nMonth 3: Secure first five clients\nMonth 6: Reach consistent monthly revenue target\nMonth 12: Add scalable template products',
    smartGoals: 'Specific: Sell 20 Startup Clarity Sprints in 6 months\nMeasurable: Track discovery calls, proposals, and closed deals\nAchievable: Use weekly content and referrals\nRelevant: Validates the core offer\nTime-bound: Review at the end of month six',

    // Team & Actions
    team: 'Founder: strategy, delivery, sales\nFreelance designer: brand and templates\nAccountant: finance and compliance\nAdvisor: commercial review',
    actionChecklist: 'Validate the offer with 10 conversations\nCreate service page and lead magnet\nSet up email capture\nPublish first 6 educational articles\nBuild referral partner list\nReview pricing after first 5 clients',
    closingNote: 'Thank you for reviewing this plan. The next step is to validate the offer, secure early customers, and update this document with real market feedback.',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const renderInput = (label: string, name: string) => (
    <div className="flex flex-col gap-1.5 focus-within:z-10 relative mb-4">
      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{label}</label>
      <input 
        type="text" 
        name={name}
        value={formData[name as keyof typeof formData]}
        onChange={handleInputChange}
        className="w-full border border-slate-200 p-3 text-sm font-medium text-slate-800 rounded-sm focus:outline-none focus:border-slate-400"
      />
    </div>
  );

  const renderTextarea = (label: string, name: string) => (
    <div className="flex flex-col gap-1.5 focus-within:z-10 relative mb-4">
      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{label}</label>
      <textarea 
        name={name}
        value={formData[name as keyof typeof formData]}
        onChange={handleInputChange}
        className="w-full border border-slate-200 p-3 text-sm font-medium text-slate-800 rounded-sm focus:outline-none focus:border-slate-400 min-h-[120px]"
      />
    </div>
  );

  const sidebarTabs = [
    'Overview',
    'Vision & Mission',
    'Business Structure',
    'Ideal Client',
    'Marketing',
    'Competition',
    'Financials',
    'Future Plan',
    'Team & Actions'
  ];

  const colorThemes = [
    { name: 'Blush', doc: '#fdf5f3', font: '#1c1917', accent: '#cb9e8e' },
    { name: 'Coral', doc: '#fff1f0', font: '#291c19', accent: '#fd8771' },
    { name: 'Sage', doc: '#f4f7f4', font: '#1d271e', accent: '#8ead8e' },
    { name: 'Navy', doc: '#f0f4f8', font: '#0f172a', accent: '#3b82f6' },
    { name: 'Mono', doc: '#ffffff', font: '#000000', accent: '#737373' },
  ];

  const activeThemeProps = colorThemes.find(t => t.name === colorTheme) || colorThemes[0];

  return (
    <div className="min-h-screen bg-[#f5f7f9] pt-12 pb-24">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-12">
          <div>
            <div className="text-[10px] font-bold tracking-[0.2em] text-[#a67c52] uppercase mb-4">
              STARTUP TOOLKIT
            </div>
            <h1 className="text-4xl md:text-5xl font-serif text-slate-800 mb-4 tracking-tight">
              Startup Business Plan<br />Document Generator
            </h1>
            <p className="text-slate-500 max-w-xl">
              Create a full editable business plan with guided fields, page-by-page preview, PDF export, and a real Word '.docx' download.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <button className="flex items-center justify-center bg-white border border-slate-200 text-slate-800 font-bold px-6 py-3 rounded text-sm hover:bg-slate-50 transition-colors shadow-sm">
              <Download className="w-4 h-4 mr-2" />
              Download Word
            </button>
            <button className="flex items-center justify-center bg-[#1a1f24] text-white font-bold px-6 py-3 rounded text-sm hover:bg-black transition-colors shadow-sm">
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </button>
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left Column: Form & Sidebar */}
          <div className="flex flex-col sm:flex-row gap-0 bg-white border border-slate-200 rounded-sm shadow-sm lg:w-[45%] h-[800px] overflow-hidden">
            
            {/* Sidebar Tabs */}
            <div className="w-full sm:w-1/3 bg-[#fdfdfd] border-r border-slate-200 overflow-y-auto hidden sm:block">
              {sidebarTabs.map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveSidebarTab(tab)}
                  className={`w-full text-left px-5 py-4 text-sm font-semibold transition-colors border-b border-slate-100 ${
                    activeSidebarTab === tab 
                    ? 'bg-[#1a1f24] text-white border-[#1a1f24]' 
                    : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Form Area */}
            <div className="w-full sm:w-2/3 p-6 overflow-y-auto scrollbar-hide pb-12">
              <div className="flex justify-between items-center mb-8 border-b border-slate-100 pb-4">
                <h2 className="text-lg font-medium text-slate-800">{activeSidebarTab}</h2>
                <span className="text-xs text-slate-400">Saved locally as you type</span>
              </div>

              {/* Customise colours */}
              <div className="border border-slate-200 p-5 rounded-sm mb-8">
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-lg font-serif text-slate-800">Customize<br/>colours</h3>
                  <p className="text-[10px] text-slate-500 max-w-[120px] text-right">Applies to preview, PDF, and Word</p>
                </div>
                
                <div className="flex flex-wrap gap-3 mb-6">
                  {colorThemes.map(theme => (
                    <button
                      key={theme.name}
                      onClick={() => setColorTheme(theme.name)}
                      className={`flex flex-col items-center gap-1.5 p-2 rounded ${colorTheme === theme.name ? 'bg-slate-100 ring-1 ring-slate-300' : 'hover:bg-slate-50'}`}
                    >
                      <div className="flex border border-slate-200 shadow-sm rounded-sm overflow-hidden w-10">
                        <div className="w-1/2 h-5" style={{backgroundColor: theme.doc}}></div>
                        <div className="w-1/2 h-5" style={{backgroundColor: theme.accent}}></div>
                      </div>
                      <span className="text-[10px] font-medium text-slate-600">{theme.name}</span>
                    </button>
                  ))}
                </div>

                <div className="flex gap-4">
                  <div className="flex flex-col gap-1 w-1/3">
                    <span className="text-[8px] font-bold text-slate-500 uppercase tracking-wider">Document Colour</span>
                    <div className="h-8 border border-slate-200 rounded-sm w-full" style={{backgroundColor: activeThemeProps.doc}}></div>
                  </div>
                  <div className="flex flex-col gap-1 w-1/3">
                    <span className="text-[8px] font-bold text-slate-500 uppercase tracking-wider">Font Colour</span>
                    <div className="h-8 border border-slate-200 rounded-sm w-full" style={{backgroundColor: activeThemeProps.font}}></div>
                  </div>
                  <div className="flex flex-col gap-1 w-1/3">
                    <span className="text-[8px] font-bold text-slate-500 uppercase tracking-wider">Accent Colour</span>
                    <div className="h-8 border border-slate-200 rounded-sm w-full" style={{backgroundColor: activeThemeProps.accent}}></div>
                  </div>
                </div>
              </div>

              {activeSidebarTab === 'Overview' && (
                <div className="space-y-4">
                  {renderInput('Company Name', 'companyName')}
                  {renderInput('Tagline', 'tagline')}
                  {renderInput('Founder Name', 'founderName')}
                  {renderInput('Plan Year', 'planYear')}
                  {renderInput('Prepared For', 'preparedFor')}
                  {renderInput('Contact Email', 'contactEmail')}
                  {renderTextarea('Executive Summary (01)', 'executiveSummary')}
                </div>
              )}

              {activeSidebarTab === 'Vision & Mission' && (
                <div className="space-y-4">
                  {renderTextarea('Vision', 'vision')}
                  {renderTextarea('Mission', 'mission')}
                  {renderTextarea('Values', 'values')}
                </div>
              )}

              {activeSidebarTab === 'Business Structure' && (
                <div className="space-y-4">
                  {renderInput('Legal Structure', 'legalStructure')}
                  {renderInput('Location', 'location')}
                  {renderTextarea('Products / Services', 'productsServices')}
                  {renderTextarea('Revenue Model', 'revenueModel')}
                </div>
              )}

              {activeSidebarTab === 'Ideal Client' && (
                <div className="space-y-4">
                  {renderTextarea('Target Client', 'targetClient')}
                  {renderTextarea('Client Pain Points', 'clientPain')}
                  {renderTextarea('Client Outcome', 'clientOutcome')}
                </div>
              )}

              {activeSidebarTab === 'Marketing' && (
                <div className="space-y-4">
                  {renderTextarea('Marketing Channels', 'marketingChannels')}
                  {renderTextarea('Launch Offer', 'marketingOffer')}
                  {renderTextarea('Pricing Strategy', 'pricingStrategy')}
                </div>
              )}

              {activeSidebarTab === 'Competition' && (
                <div className="space-y-4">
                  {renderTextarea('Competitors', 'competitors')}
                  {renderTextarea('Competitive Advantage', 'competitiveAdvantage')}
                  {renderTextarea('Strengths', 'swotStrengths')}
                  {renderTextarea('Weaknesses', 'swotWeaknesses')}
                  {renderTextarea('Opportunities', 'swotOpportunities')}
                  {renderTextarea('Threats', 'swotThreats')}
                </div>
              )}

              {activeSidebarTab === 'Financials' && (
                <div className="space-y-4">
                  {renderTextarea('Startup Costs', 'startupCosts')}
                  {renderTextarea('Monthly Costs', 'monthlyCosts')}
                  {renderTextarea('Funding Needed', 'fundingNeeded')}
                  {renderTextarea('Revenue Goal', 'revenueGoal')}
                </div>
              )}

              {activeSidebarTab === 'Future Plan' && (
                <div className="space-y-4">
                  {renderTextarea('Milestones', 'milestones')}
                  {renderTextarea('SMART Goals', 'smartGoals')}
                </div>
              )}

              {activeSidebarTab === 'Team & Actions' && (
                <div className="space-y-4">
                  {renderTextarea('Team', 'team')}
                  {renderTextarea('Action Checklist', 'actionChecklist')}
                  {renderTextarea('Closing Note', 'closingNote')}
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Preview */}
          <div className="flex-1 bg-[#dcdedf] p-6 lg:p-12 h-[800px] overflow-y-auto flex flex-col gap-12 border border-slate-200 shadow-inner rounded-sm relative scroll-smooth" style={{scrollbarWidth: 'thin'}}>
            {/* The continuous preview pages */}
            <div ref={el => (previewRefs.current['Overview'] = el)} className="flex flex-col gap-12 w-full">
              {/* 00 COVER */}
              <div 
                className="bg-white shadow-md relative w-full flex-shrink-0 transition-colors duration-300" 
                style={{ aspectRatio: '1 / 1.414', backgroundColor: activeThemeProps.doc, padding: '8% 10%' }}
              >
                <div className="h-full flex flex-col relative z-10">
                  <div className="text-[10px] font-bold tracking-[0.2em] uppercase mb-12" style={{color: activeThemeProps.accent}}>COVER</div>
                  <h1 className="text-6xl lg:text-[72px] font-serif mb-8 leading-[1.0] tracking-tight" style={{color: activeThemeProps.font}}>{formData.companyName || 'Company Name'}</h1>
                  <p className="text-base sm:text-lg opacity-85 max-w-[85%]" style={{color: activeThemeProps.font}}>{formData.tagline || 'Tagline'}</p>
                  <div className="mt-auto w-full">
                    <div className="w-full flex border-b border-t py-4" style={{borderColor: `color-mix(in srgb, ${activeThemeProps.font} 15%, transparent)`}}>
                      <div className="flex-1 font-semibold text-[13px]" style={{color: activeThemeProps.font}}>Business Plan</div>
                      <div className="flex-1 font-semibold text-[13px] pl-4" style={{color: activeThemeProps.font}}>{formData.planYear || 'Year'}</div>
                      <div className="flex-1 font-semibold text-[13px] pl-4" style={{color: activeThemeProps.font}}>Prepared by {formData.founderName || 'Founder'}</div>
                    </div>
                    <div className="w-full mt-6 p-5 text-sm font-semibold opacity-90 shadow-sm" style={{ backgroundColor: activeThemeProps.accent, color: activeThemeProps.name === 'Mono' ? '#ffffff' : activeThemeProps.font, mixBlendMode: activeThemeProps.name === 'Mono' || activeThemeProps.name === 'Navy' ? 'normal' : 'multiply' }}>
                      Prepared for: {formData.preparedFor || 'Stakeholders'}
                    </div>
                  </div>
                </div>
              </div>

              {/* 01 EXECUTIVE SUMMARY */}
              <div 
                className="bg-white shadow-md relative w-full flex-shrink-0 transition-colors duration-300" 
                style={{ aspectRatio: '1 / 1.414', backgroundColor: activeThemeProps.doc, padding: '8% 10%' }}
              >
                <div className="h-full flex flex-col relative z-10">
                  <div className="text-[10px] font-bold tracking-[0.2em] uppercase mb-4" style={{color: activeThemeProps.accent}}>01</div>
                  <h2 className="text-[44px] font-serif mb-8 leading-[1.1] tracking-tight" style={{color: activeThemeProps.font}}>Executive Summary</h2>
                  <p className="text-[15px] opacity-90 leading-relaxed mb-10" style={{color: activeThemeProps.font}}>{formData.executiveSummary}</p>
                  <div className="grid grid-cols-2 gap-6 w-full mt-auto mb-auto">
                    <PreviewBox label="OFFER" title="Launch Offer" text={formData.launchOffer} themeProps={activeThemeProps} />
                    <PreviewBox label="REVENUE" title="Revenue Model" text={formData.revenueModelText} themeProps={activeThemeProps} />
                  </div>
                </div>
              </div>
            </div>

            {/* 02 Vision & Mission */}
            <div ref={el => (previewRefs.current['Vision & Mission'] = el)} className="bg-white shadow-md relative w-full flex-shrink-0 transition-colors duration-300" style={{ aspectRatio: '1 / 1.414', backgroundColor: activeThemeProps.doc, padding: '8% 10%' }}>
              <div className="h-full flex flex-col relative z-10">
                <div className="text-[10px] font-bold tracking-[0.2em] uppercase mb-4" style={{color: activeThemeProps.accent}}>02</div>
                <h2 className="text-[44px] font-serif mb-10 leading-[1.1] tracking-tight" style={{color: activeThemeProps.font}}>Vision & Mission</h2>
                <div className="flex gap-6 w-full flex-1 min-h-0">
                  <div className="w-1/2 flex flex-col gap-6 min-h-0">
                    <PreviewBox label="VISION" title="Where the business is going" text={formData.vision} themeProps={activeThemeProps} className="flex-1" />
                    <PreviewBox label="VALUES" title="Operating principles" text={formData.values} themeProps={activeThemeProps} className="flex-1" />
                  </div>
                  <div className="w-1/2 min-h-0">
                    <PreviewBox label="MISSION" title="What the business does" text={formData.mission} themeProps={activeThemeProps} className="h-full" />
                  </div>
                </div>
              </div>
            </div>

            {/* 03 Business Structure */}
            <div ref={el => (previewRefs.current['Business Structure'] = el)} className="bg-white shadow-md relative w-full flex-shrink-0 transition-colors duration-300" style={{ aspectRatio: '1 / 1.414', backgroundColor: activeThemeProps.doc, padding: '8% 10%' }}>
              <div className="h-full flex flex-col relative z-10">
                <div className="text-[10px] font-bold tracking-[0.2em] uppercase mb-4" style={{color: activeThemeProps.accent}}>03</div>
                <h2 className="text-[44px] font-serif mb-10 leading-[1.1] tracking-tight" style={{color: activeThemeProps.font}}>Business Structure</h2>
                <div className="w-full flex-1 border-t" style={{ borderColor: `color-mix(in srgb, ${activeThemeProps.accent} 30%, transparent)` }}>
                  <PreviewTableRow label="LEGAL STRUCTURE" text={formData.legalStructure} themeProps={activeThemeProps} />
                  <PreviewTableRow label="LOCATION" text={formData.location} themeProps={activeThemeProps} />
                  <PreviewTableRow label="PRODUCTS / SERVICES" text={formData.productsServices} themeProps={activeThemeProps} />
                  <PreviewTableRow label="REVENUE MODEL" text={formData.revenueModel} themeProps={activeThemeProps} />
                </div>
              </div>
            </div>

            {/* 04 Ideal Client */}
            <div ref={el => (previewRefs.current['Ideal Client'] = el)} className="bg-white shadow-md relative w-full flex-shrink-0 transition-colors duration-300" style={{ aspectRatio: '1 / 1.414', backgroundColor: activeThemeProps.doc, padding: '8% 10%' }}>
              <div className="h-full flex flex-col relative z-10">
                <div className="text-[10px] font-bold tracking-[0.2em] uppercase mb-4" style={{color: activeThemeProps.accent}}>04</div>
                <h2 className="text-[44px] font-serif mb-10 leading-[1.1] tracking-tight" style={{color: activeThemeProps.font}}>Ideal Client</h2>
                <div className="grid grid-cols-3 gap-6 flex-1 min-h-0">
                  <div className="flex flex-col gap-6 h-full min-h-0">
                    <PreviewBox dark={true} title="Ideal<br/>Client" text="" themeProps={activeThemeProps} className="flex-1" />
                    <PreviewBox label="OUTCOME" title="Client transformation" text={formData.clientOutcome} themeProps={activeThemeProps} className="flex-1" />
                  </div>
                  <div className="flex flex-col col-span-2 gap-6 h-full min-h-0">
                    <div className="grid grid-cols-2 gap-6 flex-1">
                      <PreviewBox label="AUDIENCE" title="Target client" text={formData.targetClient} themeProps={activeThemeProps} className="h-full" />
                      <PreviewBox label="PAIN" title="Problems to solve" text={formData.clientPain} themeProps={activeThemeProps} className="h-full" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 05 Marketing Strategy */}
            <div ref={el => (previewRefs.current['Marketing'] = el)} className="bg-white shadow-md relative w-full flex-shrink-0 transition-colors duration-300" style={{ aspectRatio: '1 / 1.414', backgroundColor: activeThemeProps.doc, padding: '8% 10%' }}>
              <div className="h-full flex flex-col relative z-10">
                <div className="text-[10px] font-bold tracking-[0.2em] uppercase mb-4" style={{color: activeThemeProps.accent}}>05</div>
                <h2 className="text-[44px] font-serif mb-10 leading-[1.1] tracking-tight" style={{color: activeThemeProps.font}}>Marketing Strategy</h2>
                <div className="grid grid-cols-2 gap-6 flex-1 min-h-0">
                  <PreviewBox label="CHANNELS" title="How clients find us" text={formData.marketingChannels} themeProps={activeThemeProps} className="h-full" />
                  <div className="flex flex-col gap-6 h-full min-h-0">
                    <PreviewBox label="OFFER" title="Launch offer" text={formData.marketingOffer} themeProps={activeThemeProps} className="flex-1" />
                    <PreviewBox label="PRICING" title="Pricing strategy" text={formData.pricingStrategy} themeProps={activeThemeProps} className="flex-1" />
                  </div>
                </div>
              </div>
            </div>

            {/* 06 Competitive Analysis */}
            <div ref={el => (previewRefs.current['Competition'] = el)} className="bg-white shadow-md relative w-full flex-shrink-0 transition-colors duration-300" style={{ aspectRatio: '1 / 1.414', backgroundColor: activeThemeProps.doc, padding: '8% 10%' }}>
              <div className="h-full flex flex-col relative z-10">
                <div className="text-[10px] font-bold tracking-[0.2em] uppercase mb-4" style={{color: activeThemeProps.accent}}>06</div>
                <h2 className="text-[44px] font-serif mb-6 leading-[1.1] tracking-tight" style={{color: activeThemeProps.font}}>Competitive Analysis</h2>
                <div className="grid grid-cols-2 gap-6 mb-6 flex-1 min-h-0">
                  <PreviewBox label="MARKET" title="Competitors" text={formData.competitors} themeProps={activeThemeProps} className="h-full" />
                  <PreviewBox label="EDGE" title="Competitive advantage" text={formData.competitiveAdvantage} themeProps={activeThemeProps} className="h-full" />
                </div>
                <div className="text-xl font-serif mb-4 flex-shrink-0" style={{color: activeThemeProps.accent}}>SWOT</div>
                <div className="grid grid-cols-2 gap-6 flex-1 min-h-0">
                  <PreviewBox label="s" title="Strengths" text={formData.swotStrengths} themeProps={activeThemeProps} className="h-full" />
                  <PreviewBox label="w" title="Weaknesses" text={formData.swotWeaknesses} themeProps={activeThemeProps} className="h-full" />
                  <PreviewBox label="o" title="Opportunities" text={formData.swotOpportunities} themeProps={activeThemeProps} className="h-full" />
                  <PreviewBox label="t" title="Threats" text={formData.swotThreats} themeProps={activeThemeProps} className="h-full" />
                </div>
              </div>
            </div>

            {/* 07 Financial Outlook */}
            <div ref={el => (previewRefs.current['Financials'] = el)} className="bg-white shadow-md relative w-full flex-shrink-0 transition-colors duration-300" style={{ aspectRatio: '1 / 1.414', backgroundColor: activeThemeProps.doc, padding: '8% 10%' }}>
              <div className="h-full flex flex-col relative z-10">
                <div className="text-[10px] font-bold tracking-[0.2em] uppercase mb-4" style={{color: activeThemeProps.accent}}>07</div>
                <h2 className="text-[44px] font-serif mb-10 leading-[1.1] tracking-tight" style={{color: activeThemeProps.font}}>Financial Outlook</h2>
                <div className="grid grid-cols-2 gap-6 mb-8 flex-1 min-h-0">
                  <PreviewBox title="Startup costs" text={formData.startupCosts} themeProps={activeThemeProps} className="h-full" />
                  <PreviewBox title="Monthly costs" text={formData.monthlyCosts} themeProps={activeThemeProps} className="h-full" />
                </div>
                <div className="p-8 border mt-auto shadow-sm flex flex-col gap-4" style={{ backgroundColor: `color-mix(in srgb, ${activeThemeProps.accent} 20%, transparent)`, borderColor: `color-mix(in srgb, ${activeThemeProps.accent} 40%, transparent)` }}>
                  <div className="text-[15px] font-bold leading-relaxed whitespace-pre-wrap" style={{ color: activeThemeProps.font }}>{formData.fundingNeeded}</div>
                  <div className="text-[22px] font-serif leading-tight whitespace-pre-wrap" style={{ color: activeThemeProps.font }}>{formData.revenueGoal}</div>
                </div>
              </div>
            </div>

            {/* 08 Future Plan & SMART Goals */}
            <div ref={el => (previewRefs.current['Future Plan'] = el)} className="bg-white shadow-md relative w-full flex-shrink-0 transition-colors duration-300" style={{ aspectRatio: '1 / 1.414', backgroundColor: activeThemeProps.doc, padding: '8% 10%' }}>
              <div className="h-full flex flex-col relative z-10">
                <div className="text-[10px] font-bold tracking-[0.2em] uppercase mb-4" style={{color: activeThemeProps.accent}}>08</div>
                <h2 className="text-[44px] font-serif mb-10 leading-[1.1] tracking-tight" style={{color: activeThemeProps.font}}>Future Plan & SMART Goals</h2>
                <div className="grid grid-cols-2 gap-6 flex-1 min-h-0">
                  <PreviewBox title="Milestones" text={formData.milestones} themeProps={activeThemeProps} className="h-full" />
                  <PreviewBox title="SMART goals" text={formData.smartGoals} themeProps={activeThemeProps} className="h-full" />
                </div>
              </div>
            </div>

            {/* 09 & 10 Team & Actions */}
            <div ref={el => (previewRefs.current['Team & Actions'] = el)} className="flex flex-col gap-12 w-full">
              {/* 09 TEAM & ACTION CHECKLIST */}
              <div className="bg-white shadow-md relative w-full flex-shrink-0 transition-colors duration-300" style={{ aspectRatio: '1 / 1.414', backgroundColor: activeThemeProps.doc, padding: '8% 10%' }}>
                <div className="h-full flex flex-col relative z-10">
                  <div className="text-[10px] font-bold tracking-[0.2em] uppercase mb-4" style={{color: activeThemeProps.accent}}>09</div>
                  <h2 className="text-[44px] font-serif mb-10 leading-[1.1] tracking-tight" style={{color: activeThemeProps.font}}>Team & Action<br/>Checklist</h2>
                  <div className="grid grid-cols-2 gap-6 flex-1 min-h-0">
                    <PreviewBox title="Team" text={formData.team} themeProps={activeThemeProps} className="h-full" />
                    <PreviewBox title="Action checklist" text={formData.actionChecklist} themeProps={activeThemeProps} className="h-full" />
                  </div>
                </div>
              </div>
              
              {/* 10 THANK YOU */}
              <div className="bg-white shadow-md relative w-full flex-shrink-0 transition-colors duration-300" style={{ aspectRatio: '1 / 1.414', backgroundColor: activeThemeProps.doc, padding: '8% 10%' }}>
                <div className="h-full flex flex-col items-center justify-center relative z-10">
                  <div className="text-[10px] font-bold tracking-[0.2em] uppercase mb-4" style={{color: activeThemeProps.accent}}>10</div>
                  <h2 className="text-[56px] font-serif mb-8 leading-[1.1] tracking-tight text-center" style={{color: activeThemeProps.font}}>Thank You</h2>
                  <p className="text-[15px] opacity-90 leading-relaxed text-center max-w-[80%] mb-12" style={{color: activeThemeProps.font}}>
                    {formData.closingNote}
                  </p>
                  <div className="w-full max-w-[80%] p-5 text-sm font-bold text-center shadow-sm" style={{ backgroundColor: `color-mix(in srgb, ${activeThemeProps.accent} 25%, transparent)`, borderColor: `color-mix(in srgb, ${activeThemeProps.accent} 50%, transparent)`, border: '1px solid', color: activeThemeProps.font }}>
                    Contact: {formData.contactEmail}
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
