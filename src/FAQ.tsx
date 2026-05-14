import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
  {
    question: "Do I need to create an account to use the tools?",
    answer: "No, all our basic tools run directly in your browser. This means you don't need to sign up or log in to use generators like invoices, quotes, or calculators."
  },
  {
    question: "Is my data secure?",
    answer: "Yes. The browser-based tools process your data locally on your device. We do not store your drafted invoices, quotes, financial calculations, or legal document drafts on our servers unless you specifically opt into a saved-data feature."
  },
  {
    question: "Can I customize the generated documents?",
    answer: "Yes, our document generators (like invoices, receipts, and legal policies) provide fields to enter your own branding details, company information, and custom terms before generating a PDF or copying the text."
  },
  {
    question: "Are the tax and VAT calculations accurate?",
    answer: "The calculations are designed to be accurate based on standard UK rates, but they should be used as guidance only. We always recommend consulting with an accountant or tax professional for your specific circumstances."
  },
  {
    question: "Are the legal templates (Privacy Policy, DPA, etc.) legally binding?",
    answer: "Our legal document generators produce standard templates suitable for many UK freelancers and SaaS businesses. However, they are provided for informational and guidance purposes only. We strongly recommend having them reviewed by a qualified legal professional before use to ensure they meet your specific needs."
  },
  {
    question: "Can you build a custom tool for my freelance business?",
    answer: "Yes! If you need a specific automation, dashboard, or internal tool, you can use our Contact Us page to send an enquiry about custom development."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleOpen = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="mt-32 mb-20 max-w-4xl mx-auto px-4">
      <div className="text-center mb-16">
        <div className="text-[10px] font-bold text-accent uppercase tracking-[0.3em] mb-4">
          SUPPORT & CLARITY
        </div>
        <h2 className="text-4xl md:text-6xl font-serif text-slate-900 mb-6 tracking-tighter">
          Frequently Asked <span className="italic text-accent">Questions</span>
        </h2>
        <p className="text-slate-500 text-lg font-light max-w-2xl mx-auto leading-relaxed">
          Operational details, security protocols, and everything else you need to know about navigating the studio.
        </p>
      </div>

      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <div 
            key={index}
            className={`group rounded-[2rem] border transition-all duration-500 ${
              openIndex === index 
                ? "bg-white border-slate-200 shadow-xl scale-[1.02]" 
                : "bg-slate-50/50 border-slate-100 hover:border-slate-200 hover:bg-white"
            }`}
          >
            <button
              onClick={() => toggleOpen(index)}
              className="w-full px-8 py-7 flex items-center justify-between text-left focus:outline-none"
            >
              <div className="flex items-center gap-6">
                <span className="text-[10px] font-bold text-accent font-mono opacity-40 group-hover:opacity-100 transition-opacity uppercase tracking-widest">
                  Q{(index + 1).toString().padStart(2, '0')}
                </span>
                <span className={`text-lg font-serif tracking-tight transition-colors ${
                  openIndex === index ? "text-slate-900" : "text-slate-700"
                }`}>
                  {faq.question}
                </span>
              </div>
              <div className={`p-2 rounded-full transition-all duration-300 ${
                openIndex === index ? "bg-accent text-white rotate-180" : "bg-white text-slate-400 group-hover:text-slate-600 shadow-sm"
              }`}>
                <ChevronDown className="w-4 h-4" />
              </div>
            </button>
            
            <div className={`overflow-hidden transition-all duration-500 ease-in-out ${
              openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}>
              <div className="px-20 pb-10 pt-0 text-slate-500 font-light leading-relaxed text-base">
                <div className="pt-4 border-t border-slate-50 italic">
                  {faq.answer}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-20 p-12 bg-slate-900 rounded-[3rem] text-center relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full translate-x-32 -translate-y-32 blur-3xl group-hover:bg-accent/20 transition-all duration-1000"></div>
        <h3 className="text-2xl font-serif text-white mb-4 relative z-10">Still seeking clarity?</h3>
        <p className="text-slate-400 font-light mb-8 relative z-10 max-w-lg mx-auto">
          Our specialized team is ready to assist with custom tool requirements or technical inquiries.
        </p>
        <button className="bg-white text-slate-900 px-10 py-4 font-bold text-[11px] uppercase tracking-widest rounded-full hover:bg-accent hover:text-white transition-all shadow-xl relative z-10">
          Enquire Now
        </button>
      </div>
    </div>
  );
}
