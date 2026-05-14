import React, { useState, useRef } from 'react';
import { Linkedin, ArrowRight, FileText, ExternalLink, Camera } from 'lucide-react';

export default function AboutUs() {
  const [profileImage, setProfileImage] = useState<string>('/profile.jpg');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isDragging, setIsDragging] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const imageUrl = URL.createObjectURL(e.target.files[0]);
      setProfileImage(imageUrl);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const imageUrl = URL.createObjectURL(e.dataTransfer.files[0]);
      setProfileImage(imageUrl);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-20 pt-16">
      <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 mb-32 items-center lg:items-start">
        {/* Left Column (Profile info) */}
        <div className="w-full lg:w-[400px] flex-shrink-0">
          <div className="bg-white border border-slate-100 p-10 md:p-12 rounded-[3.5rem] shadow-2xl flex flex-col items-center text-center lg:items-start lg:text-left relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full -translate-y-16 translate-x-16"></div>
            
            <div 
              className={`w-64 h-64 lg:w-full lg:h-auto aspect-square bg-slate-50 mb-10 overflow-hidden rounded-[2.5rem] border-8 shadow-xl flex items-center justify-center mx-auto lg:mx-0 relative group/avatar cursor-pointer transition-all duration-500 ease-out ${isDragging ? 'border-accent ring-8 ring-accent/10 transform scale-[1.02]' : 'border-white'}`}
              onClick={() => fileInputRef.current?.click()}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              title="Click or drag and drop to upload image"
            >
              <img 
                src={profileImage} 
                alt="Narayana Sanghea Panchumarthy" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover/avatar:scale-110"
                id="profile-image"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png';
                }}
              />
              <div className={`absolute inset-0 bg-slate-900/40 backdrop-blur-[2px] flex flex-col items-center justify-center transition-all duration-300 ${isDragging ? 'opacity-100' : 'opacity-0 group-hover/avatar:opacity-100'}`}>
                <div className="bg-white/20 p-4 rounded-full backdrop-blur-md mb-4 border border-white/30 transform transition-transform group-hover/avatar:scale-110">
                  <Camera className="w-6 h-6 text-white" />
                </div>
                <span className="text-white text-[10px] uppercase font-bold tracking-[0.2em] px-4 text-center leading-tight">
                  {isDragging ? 'Relinquish Image' : 'Update Identity'}
                </span>
              </div>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleImageChange} 
                accept="image/*" 
                className="hidden" 
              />
            </div>

            <div className="space-y-4 w-full">
              <div>
                <div className="text-[11px] font-bold text-accent uppercase tracking-[0.3em] mb-3 flex items-center justify-center lg:justify-start gap-2">
                  <span className="w-4 h-[1px] bg-accent/40"></span>
                  PRINCIPAL FOUNDER
                </div>
                <h2 className="text-3xl font-serif text-slate-900 mb-2 tracking-tight leading-tight italic">Narayana Sanghea <span className="text-accent opacity-50 block lg:inline">Panchumarthy</span></h2>
              </div>
              
              <div className="text-slate-400 font-serif italic text-lg leading-snug">Managing Strategist & Product Engineer</div>
              
              <div className="pt-8 w-full">
                <a 
                  href="https://www.linkedin.com/in/narayana-sanghea-panchumarthy-446b61305" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-full py-5 bg-slate-50 border border-slate-100 text-slate-900 font-bold text-[11px] uppercase tracking-[0.2em] hover:bg-slate-900 hover:text-white transition-all rounded-2xl shadow-sm group/link"
                >
                  <Linkedin className="w-4 h-4 mr-3 text-accent group-hover/link:scale-110 transition-transform" />
                  Request Access
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (Hero intro) */}
        <div className="flex-1 pt-4 max-w-3xl">
          <div className="text-[11px] font-bold text-accent uppercase tracking-[0.4em] mb-10 flex items-center gap-4">
            <span className="w-12 h-[1px] bg-accent/30"></span>
            MANUAL TO <span className="italic">SYSTEMIC</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-serif text-slate-900 leading-[0.95] tracking-tighter mb-12">
            Translating complex <span className="italic text-accent">workflows</span> into precise digital instruments.
          </h1>
          <div className="space-y-10 text-slate-500 text-xl font-light leading-relaxed mb-16 max-w-2xl">
            <p>
              UK Freelancer Toolkit serves as a specialized laboratory for operational autonomy. We demonstrate how the friction of manual administration—invoices, strategic plans, and legal compliance—can be refactored into high-performance, guided systems.
            </p>
            <p>
              Synthesizing deep business analysis with agile product engineering, my objective remains constant: identify the core logic, eliminate systemic repetition, and deliver interfaces that resonate with technical clarity.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <button className="group bg-slate-900 text-white font-bold flex items-center px-10 py-5 rounded-2xl hover:bg-accent transition-all text-[11px] uppercase tracking-[0.2em] shadow-2xl relative overflow-hidden">
              <span className="relative z-10 flex items-center">
                INITIATE CUSTOM BUILD
                <ArrowRight className="w-4 h-4 ml-4 group-hover:translate-x-2 transition-transform" />
              </span>
            </button>
            <button className="bg-white border border-slate-200 text-slate-800 font-bold px-10 py-5 rounded-2xl hover:bg-slate-50 transition-all text-[11px] uppercase tracking-[0.2em] shadow-sm">
              EXPLORE ARCHITECTURE
            </button>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-100 pt-24 mb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-slate-100 bg-white shadow-2xl rounded-[4rem] overflow-hidden">
          <div className="p-16 border-b md:border-b-0 md:border-r border-slate-100 relative group hover:bg-slate-50 transition-all">
            <div className="absolute top-8 left-8 text-[10px] font-bold text-accent/20 uppercase tracking-[0.5em] group-hover:text-accent transition-colors">ACADEMIC BASIS</div>
            <div className="flex items-center text-[10px] font-bold text-accent uppercase tracking-widest mb-6 pt-8">
              <span className="mr-3 bg-accent text-white p-2 rounded-full scale-75 uppercase">EDU</span> UNIVERSITY OF LEICESTER
            </div>
            <h3 className="text-4xl font-serif text-slate-900 mb-6 tracking-tight leading-tight italic">Advanced Management & Data Synthesis</h3>
            <p className="text-slate-500 text-lg font-light leading-relaxed">
              Leveraging a rigorous foundation in organizational behavior and data strategy to refactor modern operational workflows into scalable browser-based utilities.
            </p>
          </div>
          <div className="p-16 relative group hover:bg-slate-50 transition-all">
            <div className="absolute top-8 left-8 text-[10px] font-bold text-accent/20 uppercase tracking-[0.5em] group-hover:text-accent transition-colors">STRATEGIC FOCUS</div>
            <div className="text-[10px] font-bold text-accent uppercase tracking-widest mb-6 pt-8">
              OPERATIONAL AUTONOMY FOR TEAMS
            </div>
            <h3 className="text-4xl font-serif text-slate-900 mb-6 tracking-tight leading-tight italic">Deterministic Process Automation</h3>
            <p className="text-slate-500 text-lg font-light leading-relaxed">
              Specializing in the conversion of fragmented spreadsheets and manual document drafting into unified, high-integrity dashboard ecosystems and intelligent generators.
            </p>
          </div>
        </div>
      </div>

      <div className="mb-32 flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
        <div className="w-full lg:w-[240px] flex-shrink-0 pt-2">
          <div className="text-[11px] font-bold text-accent uppercase tracking-[0.3em] mb-4 flex items-center gap-2">
            <span className="w-8 h-[1px] bg-accent/30"></span> COMPETENCIES
          </div>
        </div>
        <div className="flex-1">
          <h3 className="text-4xl md:text-7xl font-serif text-slate-900 mb-12 tracking-tighter max-w-3xl leading-[0.95]">
            Where analytical <span className="italic text-accent underline underline-offset-[12px] decoration-accent/20">rigour</span> meets functional engineering.
          </h3>
          <div className="flex flex-wrap gap-4">
            {[
              'Strategic Business Analysis', 'System Data Architecture', 'Operational Process Refactoring', 
              'Deterministic Logic Mapping', 'Technical Product Documentation', 'UX Dashboard Synthesis',
              'Middleware Workflow Automation', 'Experimental AI Integration', 'Enterprise Legal Frameworks'
            ].map(skill => (
              <span key={skill} className="px-8 py-4 border border-slate-100 bg-white text-slate-900 text-[11px] font-bold uppercase tracking-widest shadow-sm rounded-2xl hover:border-accent hover:text-accent transition-all cursor-default">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start border-t border-slate-100 pt-24 mb-20">
        <div className="w-full lg:w-[240px] flex-shrink-0 pt-2">
          <div className="text-[11px] font-bold text-accent uppercase tracking-[0.3em] mb-4 flex items-center gap-2">
            <span className="w-8 h-[1px] bg-accent/30"></span> INVESTIGATIONS
          </div>
        </div>
        <div className="flex-1">
          <h3 className="text-4xl md:text-6xl font-serif text-slate-900 mb-12 tracking-tight max-w-3xl leading-tight">
            Published research supporting a <span className="italic text-accent">systemic</span> mindset.
          </h3>
          
          <div className="bg-white border border-slate-100 p-12 md:p-16 rounded-[4rem] shadow-2xl flex flex-col md:flex-row gap-10 items-start group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-2 bg-accent opacity-20"></div>
            <div className="bg-slate-50 p-6 rounded-3xl text-accent group-hover:bg-accent group-hover:text-white transition-all duration-500 shrink-0">
              <FileText className="w-8 h-8" />
            </div>
            <div>
              <div className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.3em] mb-6">SSRN RESEARCH ARCHIVE · 2024</div>
              <h4 className="text-3xl md:text-4xl font-serif text-slate-900 mb-6 group-hover:text-accent transition-colors leading-tight italic">
                Algorithmic Logistics and Labor Economics in the On-Demand Delivery Ecosystem
              </h4>
              <p className="text-slate-500 text-lg font-light leading-relaxed mb-10 max-w-2xl">
                An investigation into the transition of urban logistics from human-mediated dispatch to platform-mediated, highly complex algorithmic architectures—synchronizing millions of concurrent interactions across three independent sets of actors.
              </p>
              <a 
                href="https://papers.ssrn.com/sol3/papers.cfm?abstract_id=6717839" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center text-[11px] font-bold text-slate-900 hover:text-accent transition-all uppercase tracking-widest gap-3"
              >
                Access Full Publication
                <ExternalLink className="w-4 h-4 group-hover:rotate-45 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
}
