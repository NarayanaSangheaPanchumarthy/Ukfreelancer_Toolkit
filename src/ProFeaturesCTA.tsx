import React, { useState } from 'react';
import { Lock, Check } from 'lucide-react';

export default function ProFeaturesCTA() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setEmail('');
    }, 1000);
  };

  return (
    <div className="mt-20 bg-[#0f1418] text-white p-10 md:p-14 flex flex-col lg:flex-row items-center justify-between">
      <div className="max-w-xl mb-8 lg:mb-0 pr-0 lg:pr-8">
        <div className="flex items-center text-[#a67c52] text-[10px] font-bold uppercase tracking-widest mb-4">
          <Lock className="w-3 h-3 mr-2" />
          Pro Features Coming Soon
        </div>
        <h3 className="text-3xl md:text-[40px] font-serif mb-4 leading-tight tracking-tight">
          Save history, remove watermark, and use premium templates.
        </h3>
        <p className="text-slate-300 text-sm max-w-md">
          Join the early interest list for client records, recurring documents, and branded exports.
        </p>
      </div>
      
      <div className="w-full lg:w-auto flex-shrink-0 lg:ml-auto">
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input 
            type="email" 
            placeholder="you@example.co.uk" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isSubmitting || isSuccess}
            required
            className="bg-[#0f1418] border border-slate-600 text-white p-3 min-w-0 lg:min-w-[360px] focus:outline-none focus:border-slate-400 focus:bg-slate-800/30 transition-all text-sm rounded-none disabled:opacity-50"
          />
          <button 
            type="submit"
            disabled={isSubmitting || isSuccess || !email}
            className="bg-white text-gray-900 font-bold p-3 tracking-wide text-sm hover:bg-gray-100 transition-colors w-full rounded-none disabled:opacity-75 disabled:cursor-not-allowed flex items-center justify-center h-[46px]"
          >
            {isSubmitting ? (
              <span className="w-5 h-5 border-2 border-gray-900 border-t-transparent rounded-full animate-spin"></span>
            ) : isSuccess ? (
              <span className="flex items-center text-green-700"><Check className="w-4 h-4 mr-2" /> Subscribed successfully</span>
            ) : (
              'Notify me'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
