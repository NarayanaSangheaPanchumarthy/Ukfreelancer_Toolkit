import React from 'react';

export default function PrivacyPolicy() {
  return (
    <div className="bg-[#fcfdfd] min-h-screen py-20 md:py-24">
      <div className="max-w-5xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="mb-20">
          <div className="text-[11px] font-bold text-accent uppercase tracking-[0.4em] mb-6 flex items-center gap-2">
            <span className="w-8 h-[1px] bg-accent/30"></span>
            DATA GOVERNANCE
          </div>
          <h1 className="text-5xl md:text-8xl font-serif text-slate-900 mb-8 tracking-tighter leading-[0.95]">
            Privacy <span className="italic text-accent">Protocol</span>.
          </h1>
          <p className="text-slate-500 text-xl font-light max-w-2xl leading-relaxed">
            We maintain a high-integrity, transparency-first approach to data governance and privacy-conscious architecture.
          </p>
        </div>

        {/* Content */}
        <div className="bg-white border border-slate-100 p-12 md:p-20 rounded-[4rem] shadow-2xl mb-24 text-slate-700 relative overflow-hidden group/policy">
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full -translate-y-48 translate-x-48 blur-3xl group-hover/policy:bg-accent/10 transition-all duration-1000"></div>
          
          <section className="mb-16 relative z-10">
            <h2 className="text-4xl font-serif text-slate-900 mb-6 italic tracking-tight">Information Synthesis</h2>
            <p className="leading-relaxed text-lg font-light text-slate-500">
              The majority of our synthesis tools operate within the client-side browser environment, utilizing local storage to ensure your operational data remains within your personal digital perimeter. Primary collection occurs only during active engagement with contact protocols or registration of interest.
            </p>
          </section>

          <section className="mb-16 relative z-10">
            <h2 className="text-4xl font-serif text-slate-900 mb-6 italic tracking-tight">Utilization Vectors</h2>
            <p className="leading-relaxed text-lg font-light text-slate-500">
              Synthesized information is deployed strictly to facilitate response protocols, enhance toolkit integrity, and structure bespoke automation proposals requested by the user.
            </p>
          </section>

          <section className="mb-16 relative z-10">
            <h2 className="text-4xl font-serif text-slate-900 mb-6 italic tracking-tight">Document Integrity</h2>
            <p className="leading-relaxed text-lg font-light text-slate-500">
              Generative outputs are engineered to assist in the creation of high-fidelity business blueprints. The end-user maintains absolute responsibility for the validation of synthesized content prior to deployment.
            </p>
          </section>

          <section className="mb-16 relative z-10">
            <h2 className="text-4xl font-serif text-slate-900 mb-6 italic tracking-tight">Archival Protocols</h2>
            <p className="leading-relaxed text-lg font-light text-slate-500">
              Local drafts persist within your browser environment until manual data clearance occurs. Third-party processing is limited to essential operational infrastructure—hosting, analytics, and messaging protocols.
            </p>
          </section>

          <section className="mb-16 relative z-10">
            <h2 className="text-4xl font-serif text-slate-900 mb-6 italic tracking-tight">User Agency</h2>
            <p className="leading-relaxed text-lg font-light text-slate-500">
              You maintain absolute agency over your data footprint. Accessing tools without submitting contact protocols ensures a zero-collection experience. For formal deletion requests, utilize the contact interface.
            </p>
          </section>

          <div className="pt-12 border-t border-slate-50 text-[11px] font-bold text-accent uppercase tracking-widest relative z-10 flex items-center justify-between">
            <span>Last Updated: 14 May 2026</span>
            <span className="opacity-30 italic font-serif text-sm normal-case">UK Freelancer Toolkit</span>
          </div>
        </div>
      </div>
    </div>
  );
}
