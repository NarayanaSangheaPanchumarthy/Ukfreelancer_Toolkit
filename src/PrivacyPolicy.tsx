import React from 'react';

export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto px-4 md:px-8 py-12 pt-8">
      {/* Header */}
      <div className="mb-12 border-b border-slate-200 pb-12">
        <div className="text-[10px] font-bold text-[#a67c52] uppercase tracking-widest mb-4">
          PRIVACY POLICY
        </div>
        <h1 className="text-4xl md:text-6xl font-serif text-slate-900 mb-6 tracking-tight leading-[1.1]">
          We keep the toolkit<br />simple and privacy-<br />conscious.
        </h1>
        <p className="text-slate-500 text-base max-w-2xl leading-relaxed">
          This page explains how UK Freelancer Toolkit handles information when you use the
          website, contact us, or register interest in future services.
        </p>
      </div>

      {/* Content */}
      <div className="bg-white border border-slate-200 p-8 md:p-12 shadow-sm mb-20 text-slate-700">
        <section className="mb-10">
          <h2 className="text-3xl font-serif text-slate-900 mb-4">Information we collect</h2>
          <p className="leading-relaxed text-sm">
            Most tools run in your browser and use local storage so your draft information can remain on your device. If you submit a contact form, waitlist form, or enquiry, we may collect your name, email address, message, business details, and the page or service you asked about.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-3xl font-serif text-slate-900 mb-4">How we use information</h2>
          <p className="leading-relaxed text-sm">
            We use submitted information to respond to enquiries, provide requested services, improve the toolkit, manage customer interest, and prepare custom web app or automation proposals.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-3xl font-serif text-slate-900 mb-4">Documents and generated content</h2>
          <p className="leading-relaxed text-sm">
            Document generators are intended to help you create draft business documents. You are responsible for reviewing generated content before using it. Legal, tax, funding, and business outputs are guidance only and are not professional advice.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-3xl font-serif text-slate-900 mb-4">Storage and third parties</h2>
          <p className="leading-relaxed text-sm">
            Browser-saved drafts may stay on your own device until you clear site data. If online forms, hosting, analytics, payments, or email tools are added, relevant providers may process data on our behalf to operate the service.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-serif text-slate-900 mb-4">Your choices</h2>
          <p className="leading-relaxed text-sm">
            You can avoid submitting personal information by using the free tools without contacting us. You can also clear your browser storage at any time. For questions or deletion requests, use the contact page.
          </p>
        </section>

        <div className="pt-8 border-t border-slate-200 text-sm font-bold text-slate-800">
          Last updated: 8 May 2026
        </div>
      </div>
    </div>
  );
}
