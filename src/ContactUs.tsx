import React from 'react';
import { MessageSquare, Sparkles, Mail } from 'lucide-react';

export default function ContactUs() {
  return (
    <div className="max-w-4xl mx-auto px-4 md:px-8 py-12 pt-8">
      {/* Header */}
      <div className="mb-12 border-b border-slate-200 pb-12">
        <div className="text-[10px] font-bold text-[#a67c52] uppercase tracking-widest mb-4">
          CONTACT US
        </div>
        <h1 className="text-5xl md:text-6xl font-serif text-slate-900 mb-6 tracking-tight leading-[1.05]">
          Tell us what admin you<br />want to automate.
        </h1>
        <p className="text-slate-500 text-base max-w-2xl leading-relaxed">
          Use this page to enquire about a custom web app, business dashboard, document<br/>generator, or automation package for your business.
        </p>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 bg-white border border-slate-200 shadow-sm mb-20">
        <div className="p-10 border-b md:border-b-0 md:border-r border-slate-200">
          <div className="flex items-center text-3xl font-serif text-slate-900 mb-6">
            <MessageSquare className="w-6 h-6 mr-3 text-slate-700" />
            Project enquiry
          </div>
          <p className="text-slate-600 text-sm leading-relaxed mb-8">
            Email us with your business type, current process, and the result you want. For example: "I run a product business and need stock, sales, invoices, tasks, and reports in one place."
          </p>
          <a
            href="mailto:panchumarthy756@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-full py-4 bg-[#1a1f24] text-white font-bold text-sm hover:bg-black transition-colors"
          >
            <Mail className="w-4 h-4 mr-2" />
            panchumarthy756@gmail.com
          </a>
        </div>
        
        <div className="p-10">
          <div className="flex items-center text-3xl font-serif text-slate-900 mb-6">
            <Sparkles className="w-6 h-6 mr-3 text-slate-700" />
            What we can build
          </div>
          <ul className="space-y-4 mb-8 text-sm text-slate-600">
            <li className="flex items-start">
              <span className="mr-2">•</span> Custom business dashboards
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span> Document and PDF automation
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span> Invoice, quote, CRM, and stock systems
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span> Weekly improvements and support plans
            </li>
          </ul>
          <div className="pt-6 border-t border-slate-200">
            <p className="text-slate-500 text-sm leading-relaxed">
              Typical projects can start as a focused prototype, then grow into a hosted system with database, authentication, reporting, and CI/CD updates.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
