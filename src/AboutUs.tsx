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
    <div className="max-w-6xl mx-auto px-4 md:px-8 py-12 pt-8">
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 mb-24">
        {/* Left Column (Profile info) */}
        <div className="w-full lg:w-[320px] flex-shrink-0">
          <div className="bg-white border border-slate-200 p-8 shadow-sm flex flex-col items-center text-center lg:items-start lg:text-left">
            <div 
              className={`w-48 h-48 lg:w-full lg:h-auto aspect-square bg-slate-100 mb-6 overflow-hidden rounded-full border-4 shadow-sm flex items-center justify-center mx-auto lg:mx-0 relative group cursor-pointer transition-all ${isDragging ? 'border-blue-500 transform scale-105' : 'border-white'}`}
              onClick={() => fileInputRef.current?.click()}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              title="Click or drag and drop to upload image"
            >
              <img 
                src={profileImage} 
                alt="Narayana Sanghea Panchumarthy" 
                className="w-full h-full object-cover"
                id="profile-image"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png';
                }}
              />
              <div className={`absolute inset-0 bg-black flex flex-col items-center justify-center transition-opacity duration-200 ${isDragging ? 'bg-opacity-70 opacity-100' : 'bg-opacity-40 opacity-0 group-hover:opacity-100'}`}>
                <Camera className="w-8 h-8 text-white mb-2" />
                <span className="text-white text-xs font-medium px-4 text-center leading-tight">
                  {isDragging ? 'Drop Image Here' : 'Click or Drag Image'}
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
            <div className="text-[10px] font-bold text-[#a67c52] uppercase tracking-widest mb-3">FOUNDER</div>
            <h2 className="text-2xl font-serif text-slate-900 mb-2 leading-tight">Narayana Sanghea Panchumarthy</h2>
            <div className="text-slate-600 text-sm font-medium mb-6">Business Professional & Data Strategist</div>
            <a 
              href="https://www.linkedin.com/in/narayana-sanghea-panchumarthy-446b61305" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center w-full py-3 border border-slate-200 text-slate-700 font-bold text-sm hover:bg-slate-50 transition-colors"
            >
              <Linkedin className="w-4 h-4 mr-2" />
              LinkedIn
            </a>
          </div>
        </div>

        {/* Right Column (Hero intro) */}
        <div className="flex-1 pt-4">
          <div className="text-[10px] font-bold text-[#a67c52] uppercase tracking-widest mb-6">ABOUT NARAYANA SANGHEA PANCHUMARTHY</div>
          <h1 className="text-5xl md:text-6xl font-serif text-slate-900 leading-[1.05] tracking-tight mb-8">
            I build practical web apps and automations for business admin, data, and operations.
          </h1>
          <div className="space-y-6 text-slate-500 text-base leading-relaxed mb-10 max-w-2xl">
            <p>
              UK Freelancer Toolkit is my live product lab and portfolio. It shows how manual work like invoices, contracts, plans, dashboards, policies, product documents, and business reports can become guided tools that save time for freelancers, founders, and small businesses.
            </p>
            <p>
              My background combines business analysis, data strategy, research, and hands-on product building. The goal is simple: understand the workflow, remove repeated admin, and turn it into a clean system people can actually use.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <button className="bg-[#1a1f24] text-white font-bold flex items-center px-6 py-3 border border-[#1a1f24] hover:bg-black transition-colors text-sm">
              Discuss a custom app
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
            <button className="bg-transparent border border-slate-200 text-slate-800 font-bold px-6 py-3 hover:bg-slate-50 transition-colors text-sm">
              View dashboard demo
            </button>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-200 pt-16 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-slate-200 bg-white shadow-sm">
          <div className="p-10 border-b md:border-b-0 md:border-r border-slate-200">
            <div className="flex items-center text-[10px] font-bold text-[#a67c52] uppercase tracking-widest mb-4">
              <span className="mr-2">🎓</span> EDUCATION
            </div>
            <h3 className="text-3xl font-serif text-slate-900 mb-4 tracking-tight">University Of Leicester</h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              Academic foundation connected with business, data, Management and applied problem-solving, now used to design practical tools for real operational workflows.
            </p>
          </div>
          <div className="p-10">
            <div className="text-[10px] font-bold text-[#a67c52] uppercase tracking-widest mb-4">CURRENT FOCUS</div>
            <h3 className="text-3xl font-serif text-slate-900 mb-4 tracking-tight">Business automation for small teams</h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              I help turn spreadsheets, repeated documents, manual calculations, and disconnected admin steps into lightweight web apps, dashboards, and automation systems.
            </p>
          </div>
        </div>
      </div>

      <div className="mb-24 flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
        <div className="w-full lg:w-[240px] flex-shrink-0 pt-2">
          <div className="text-[10px] font-bold text-[#a67c52] uppercase tracking-widest mb-4">SKILLS</div>
        </div>
        <div className="flex-1">
          <h3 className="text-4xl md:text-5xl font-serif text-slate-900 mb-8 tracking-tight max-w-2xl leading-tight">
            Where analysis meets practical build work.
          </h3>
          <div className="flex flex-wrap gap-3">
            {[
              'Business Analysis', 'Data Strategy', 'Process Mapping', 
              'Requirements Gathering', 'Product Documentation', 'Dashboard Design',
              'Workflow Automation', 'AI Adoption Research', 'Small Business Systems'
            ].map(skill => (
              <span key={skill} className="px-4 py-2 border border-slate-200 bg-white text-slate-800 text-sm font-bold shadow-sm">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start border-t border-slate-200 pt-16 mb-16">
        <div className="w-full lg:w-[240px] flex-shrink-0 pt-2">
          <div className="text-[10px] font-bold text-[#a67c52] uppercase tracking-widest mb-4">RESEARCH PAPERS</div>
        </div>
        <div className="flex-1">
          <h3 className="text-4xl md:text-5xl font-serif text-slate-900 mb-10 tracking-tight max-w-2xl leading-tight">
            Research that supports the toolkit's automation mindset.
          </h3>
          
          <div className="bg-white border border-slate-200 p-8 md:p-10 shadow-sm flex gap-6 items-start group">
            <div className="text-[#a67c52] mt-1 shrink-0">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-2xl font-serif text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">
                Algorithmic Logistics and Labor Economics in the On-Demand Delivery Ecosystem
              </h4>
              <p className="text-slate-500 text-sm leading-relaxed mb-6">
                The transition of urban food delivery from a localized service to a globalized, platform-mediated industry represents one of the most significant shifts in contemporary logistics. Platforms such as Uber Eats and Deliveroo have replaced traditional human-mediated dispatch systems with highly complex algorithmic architectures that synchronize millions of concurrent interactions across three independent sets of actors: consumers, merchants, and couriers.
              </p>
              <a 
                href="https://papers.ssrn.com/sol3/papers.cfm?abstract_id=6717839" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm font-bold text-slate-900 hover:text-blue-600 transition-colors"
              >
                View research profile
                <ExternalLink className="w-4 h-4 ml-2" />
              </a>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
}
