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
    <div className="mt-24 mb-8 max-w-3xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-serif text-slate-900 mb-4 tracking-tight">
          Frequently asked questions
        </h2>
        <p className="text-slate-500 text-base">
          Everything you need to know about the UK Freelancer Toolkit.
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div 
            key={index}
            className="border border-slate-200 bg-white hover:border-slate-300 transition-colors"
          >
            <button
              onClick={() => toggleOpen(index)}
              className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
            >
              <span className="font-semibold text-slate-800 pr-8">{faq.question}</span>
              {openIndex === index ? (
                <ChevronUp className="w-5 h-5 text-slate-400 flex-shrink-0" />
              ) : (
                <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />
              )}
            </button>
            
            {openIndex === index && (
              <div className="px-6 pb-6 pt-0 text-slate-600 leading-relaxed text-sm border-t border-slate-100 mt-2">
                <div className="pt-4">
                  {faq.answer}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
