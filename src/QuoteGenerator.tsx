import React, { useState, useMemo } from 'react';
import { Download, Plus, Trash2, Loader2, Cloud } from 'lucide-react';
import ProFeaturesCTA from './ProFeaturesCTA';
import { downloadPdf } from './pdfHelper';
import { initAuth } from './auth';
import { saveFileToDrive } from './drive';

interface LineItem {
  id: string;
  description: string;
  qty: number;
  rate: number;
}

export default function QuoteGenerator() {
  const [selectedTemplate, setSelectedTemplate] = useState<'Simple' | 'Detailed' | 'Legal'>('Simple');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  React.useEffect(() => {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    if (clientId) {
      const timer = setTimeout(() => initAuth(clientId), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const [milestones, setMilestones] = useState([
    { id: '1', task: 'Initial Consultation & Research', timing: 'Week 1' },
    { id: '2', task: 'Design & Prototyping', timing: 'Week 2-3' },
    { id: '3', task: 'Final Delivery & Handover', timing: 'Week 4' },
  ]);
  const [standardTerms, setStandardTerms] = useState(
    "1. Payment is required as per the schedule above.\n2. All intellectual property remains with the provider until final payment.\n3. This quote is valid for 30 calendar days."
  );

  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [quoteDetails, setQuoteDetails] = useState({
    quoteNumber: 'QUO-2026-001',
    issueDate: '2026-05-12',
    dueDate: '2026-06-11',
    paymentTerms: 'Valid for 30 days',
  });

  const [parties, setParties] = useState({
    businessName: 'Your Business Name',
    businessEmail: 'hello@example.co.uk',
    businessAddress: 'Your address\nUnited Kingdom',
    businessVat: 'GB 123 4567 89',
    clientName: 'Client Business Name',
    clientVat: '',
    clientAddress: 'Client address\nUnited Kingdom',
  });

  const [lineItems, setLineItems] = useState<LineItem[]>([
    { id: '1', description: 'Freelance consulting', qty: 1, rate: 750 },
  ]);

  const [vatTreatment, setVatTreatment] = useState('Standard 20%');

  const [paymentAndNotes, setPaymentAndNotes] = useState({
    paymentDetails: 'Bank: Your Bank\nSort code: 00-00-00\nAccount: 00000000',
    notes: 'Thank you for the opportunity to quote.',
  });

  const handleQuoteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setQuoteDetails({ ...quoteDetails, [name]: value });
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handlePartiesChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setParties({ ...parties, [name]: value });
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handlePaymentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPaymentAndNotes({ ...paymentAndNotes, [e.target.name]: e.target.value });
  };

  const addLineItem = () => {
    setLineItems([
      ...lineItems,
      { id: Date.now().toString(), description: '', qty: 1, rate: 0 },
    ]);
  };

  const updateLineItem = (id: string, field: keyof LineItem, value: string | number) => {
    setLineItems(
      lineItems.map((item) => {
        if (item.id === id) {
          return { ...item, [field]: value };
        }
        return item;
      })
    );
    if (errors.lineItems) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.lineItems;
        return newErrors;
      });
    }
  };

  const removeLineItem = (id: string) => {
    if (lineItems.length > 1) {
      setLineItems(lineItems.filter((item) => item.id !== id));
    }
  };

  const subtotal = useMemo(() => {
    return lineItems.reduce((sum, item) => sum + item.qty * item.rate, 0);
  }, [lineItems]);

  const vatAmount = useMemo(() => {
    if (vatTreatment === 'Standard 20%') {
      return subtotal * 0.2;
    } else if (vatTreatment === 'Reduced 5%') {
      return subtotal * 0.05;
    }
    return 0;
  }, [subtotal, vatTreatment]);

  const total = subtotal + vatAmount;

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    // Quote details
    if (!quoteDetails.quoteNumber.trim()) newErrors.quoteNumber = 'Required';
    if (!quoteDetails.issueDate) newErrors.issueDate = 'Required';
    if (!quoteDetails.dueDate) newErrors.dueDate = 'Required';

    // Parties
    if (!parties.businessName.trim()) newErrors.businessName = 'Required';
    if (!parties.businessEmail.trim()) {
      newErrors.businessEmail = 'Required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(parties.businessEmail)) {
      newErrors.businessEmail = 'Invalid email';
    }
    if (!parties.businessAddress.trim()) newErrors.businessAddress = 'Required';
    if (!parties.clientName.trim()) newErrors.clientName = 'Required';
    if (!parties.clientAddress.trim()) newErrors.clientAddress = 'Required';

    // Line items
    if (lineItems.length === 0) {
      newErrors.lineItems = 'At least one line item is required';
    } else {
      const hasIncompleteItems = lineItems.some(item => !item.description.trim() || item.qty <= 0 || item.rate <= 0);
      if (hasIncompleteItems) {
        newErrors.lineItems = 'Please complete all line items with valid description, quantity and rate';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleDownloadPdf = async () => {
    if (!validateForm()) {
      const firstError = document.querySelector('.error-text');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }
    await downloadPdf('quote-preview', quoteDetails.quoteNumber || 'quote', setIsGeneratingPdf);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleSaveToDrive = async () => {
    if (!validateForm()) {
      const firstError = document.querySelector('.error-text');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }
    try {
      setIsSaving(true);
      setSaveSuccess(false);

      const header = "Description,Qty,Rate,Amount\\n";
      const csvStr = header + lineItems.map(e => `"${e.description}",${e.qty},${e.rate},${(e.qty * e.rate).toFixed(2)}`).join('\\n');
      
      const fileContent = `Quote Summary: ${quoteDetails.quoteNumber}\\nSubtotal: £${subtotal.toFixed(2)}\\nVAT: £${vatAmount.toFixed(2)}\\nTotal: £${total.toFixed(2)}\\n\\n` + csvStr;
      
      await saveFileToDrive(`Quote_${quoteDetails.quoteNumber}.csv`, fileContent, 'text/csv');
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      alert("Failed to save to Google Drive");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-20 pb-40">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-20 gap-8 print:hidden">
        <div>
          <div className="text-[11px] font-bold text-accent uppercase tracking-[0.3em] mb-4 flex items-center gap-2">
            <span className="w-8 h-[1px] bg-accent"></span>
            PROPOSAL ENGINE
          </div>
          <h1 className="text-5xl md:text-7xl font-serif text-slate-900 mb-6 tracking-tight leading-[0.9]">
            Quote <span className="italic text-accent">Studio</span>
          </h1>
          <p className="text-slate-500 text-lg max-w-md font-light leading-relaxed">
            Architect professional work estimates with precise breakdowns.
          </p>
        </div>
        <div className="flex flex-wrap gap-4 scale-100 hover:scale-[1.02] transition-transform duration-500">
          <button 
            onClick={handleDownloadPdf}
            disabled={isGeneratingPdf}
            className="bg-slate-900 text-white font-bold flex items-center px-10 py-5 hover:bg-black transition-all text-[10px] uppercase tracking-widest disabled:opacity-70 disabled:cursor-not-allowed group shadow-2xl rounded-2xl"
          >
            {isGeneratingPdf ? (
              <Loader2 className="w-4 h-4 mr-3 animate-spin" />
            ) : (
              <Download className="w-4 h-4 mr-3" />
            )}
            {isGeneratingPdf ? 'Processing...' : 'Download PDF'}
          </button>
          <button 
            onClick={handleSaveToDrive}
            disabled={isSaving}
            className="bg-white text-slate-900 border border-slate-200 font-bold flex items-center px-10 py-5 hover:bg-slate-50 transition-all text-[10px] uppercase tracking-widest shadow-lg rounded-2xl group"
          >
            <Cloud className="w-4 h-4 mr-3 text-accent group-hover:scale-110 transition-transform" />
            {isSaving ? 'Syncing...' : 'Save to Drive'}
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-16 items-start">
        {/* Left Column: Form */}
        <div className="w-full lg:w-[500px] flex-shrink-0 space-y-12 print:hidden">
          
          {/* Template Selection */}
          <section className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
            <h2 className="text-xl font-serif text-slate-900 mb-8 flex items-center gap-3">
              <span className="w-2 h-2 bg-accent rounded-full"></span>
              Layout Protocol
            </h2>
            <div className="grid grid-cols-3 gap-3">
              {(['Simple', 'Detailed', 'Legal'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setSelectedTemplate(t)}
                  className={`py-4 text-[10px] font-bold tracking-widest uppercase transition-all rounded-2xl ${
                    selectedTemplate === t 
                      ? 'bg-slate-900 text-white shadow-xl scale-105' 
                      : 'bg-slate-50 text-slate-400 hover:text-slate-900 border border-transparent hover:border-slate-200'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </section>

          {/* Quote Details */}
          <section className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
            <h2 className="text-xl font-serif text-slate-900 mb-8 flex items-center gap-3">
              <span className="w-2 h-2 bg-accent rounded-full"></span>
              Timeline & Ref
            </h2>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400">Reference No.</label>
                <input
                  type="text"
                  name="quoteNumber"
                  value={quoteDetails.quoteNumber}
                  onChange={handleQuoteChange}
                  className="w-full bg-slate-50 border border-slate-100 rounded-xl p-3 text-sm focus:border-slate-400 transition-all outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400">Issue Date</label>
                <input
                  type="date"
                  name="issueDate"
                  value={quoteDetails.issueDate}
                  onChange={handleQuoteChange}
                  className="w-full bg-slate-50 border border-slate-100 rounded-xl p-3 text-sm focus:border-slate-400 transition-all outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400">Valid Until</label>
                <input
                  type="date"
                  name="dueDate"
                  value={quoteDetails.dueDate}
                  onChange={handleQuoteChange}
                  className="w-full bg-slate-50 border border-slate-100 rounded-xl p-3 text-sm focus:border-slate-400 transition-all outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400">Terms</label>
                <input
                  type="text"
                  name="paymentTerms"
                  value={quoteDetails.paymentTerms}
                  onChange={handleQuoteChange}
                  className="w-full bg-slate-50 border border-slate-100 rounded-xl p-3 text-sm focus:border-slate-400 transition-all outline-none"
                />
              </div>
            </div>
          </section>

          {/* Parties */}
          <section className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
            <h2 className="text-xl font-serif text-slate-900 mb-8 flex items-center gap-3">
              <span className="w-2 h-2 bg-accent rounded-full"></span>
              Stakeholders
            </h2>
            <div className="grid grid-cols-2 gap-x-6 gap-y-8">
              <div className="space-y-2">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400">Provider Entity</label>
                <input
                  type="text"
                  name="businessName"
                  value={parties.businessName}
                  onChange={handlePartiesChange}
                  className="w-full bg-slate-50 border border-slate-100 rounded-xl p-3 text-sm focus:border-slate-400 transition-all outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400">Official HQ</label>
                <textarea
                  name="businessAddress"
                  value={parties.businessAddress}
                  onChange={handlePartiesChange}
                  rows={2}
                  className="w-full bg-slate-50 border border-slate-100 rounded-xl p-3 text-sm focus:border-slate-400 transition-all outline-none resize-none"
                />
              </div>
              
              <div className="col-span-2 my-2 border-t border-slate-50"></div>

              <div className="space-y-2">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400">Client Entity</label>
                <input
                  type="text"
                  name="clientName"
                  value={parties.clientName}
                  onChange={handlePartiesChange}
                  className="w-full bg-slate-50 border border-slate-100 rounded-xl p-3 text-sm focus:border-slate-400 transition-all outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400">Client Address</label>
                <textarea
                  name="clientAddress"
                  value={parties.clientAddress}
                  onChange={handlePartiesChange}
                  rows={2}
                  className="w-full bg-slate-50 border border-slate-100 rounded-xl p-3 text-sm focus:border-slate-400 transition-all outline-none resize-none"
                />
              </div>
            </div>
          </section>

          {/* Line Items */}
          <section className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
            <div className="flex justify-between items-end mb-8">
              <h2 className="text-xl font-serif text-slate-900 flex items-center gap-3">
                <span className="w-2 h-2 bg-accent rounded-full"></span>
                Scope breakdown
              </h2>
              <button 
                onClick={addLineItem}
                className="text-[10px] font-bold text-accent uppercase tracking-widest flex items-center hover:text-slate-900 transition-colors"
              >
                <Plus className="w-3 h-3 mr-2" /> Add Phase
              </button>
            </div>
            
            <div className="space-y-4">
              {lineItems.map((item) => (
                <div key={item.id} className="flex gap-3 items-start animate-in fade-in slide-in-from-left-4 duration-300">
                  <div className="flex-grow">
                    <input
                      type="text"
                      value={item.description}
                      placeholder="Service / Product"
                      onChange={(e) => updateLineItem(item.id, 'description', e.target.value)}
                      className="w-full bg-slate-50 border border-slate-100 rounded-xl p-3 text-sm focus:border-slate-400 outline-none"
                    />
                  </div>
                  <div className="w-20">
                    <input
                      type="number"
                      value={item.qty}
                      onChange={(e) => updateLineItem(item.id, 'qty', Number(e.target.value))}
                      className="w-full bg-slate-50 border border-slate-100 rounded-xl p-3 text-sm focus:border-slate-400 outline-none"
                    />
                  </div>
                  <div className="w-28">
                    <input
                      type="number"
                      value={item.rate}
                      onChange={(e) => updateLineItem(item.id, 'rate', Number(e.target.value))}
                      className="w-full bg-slate-50 border border-slate-100 rounded-xl p-3 text-sm focus:border-slate-400 outline-none"
                    />
                  </div>
                  <button 
                    onClick={() => removeLineItem(item.id)}
                    className="p-3 text-slate-300 hover:text-red-500 transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-12 bg-slate-900 p-8 rounded-2xl text-sm text-white/60 space-y-4">
              <div className="flex justify-between">
                <span>Net Scope</span>
                <span className="text-white font-mono text-base">£{subtotal.toLocaleString('en-GB', { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-4">
                <span>Tax Component</span>
                <span className="text-accent font-mono text-base">£{vatAmount.toLocaleString('en-GB', { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between font-serif text-xl text-white pt-2">
                <span>Total Commitment</span>
                <span className="font-bold">£{total.toLocaleString('en-GB', { minimumFractionDigits: 2 })}</span>
              </div>
            </div>
          </section>

          {/* Legal Terms - Only for Legal Template */}
          {selectedTemplate === 'Legal' && (
            <section className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-xl font-serif text-slate-900 mb-8 flex items-center gap-3">
                <span className="w-2 h-2 bg-accent rounded-full"></span>
                Legal Provisions
              </h2>
              <div className="space-y-4">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400 underline underline-offset-4 decoration-accent/30">Contractual Clauses</label>
                <textarea
                  value={standardTerms}
                  onChange={(e) => setStandardTerms(e.target.value)}
                  rows={8}
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-6 text-sm focus:border-slate-400 transition-all outline-none resize-none leading-relaxed font-light text-slate-600"
                  placeholder="Enter standard terms and conditions..."
                />
                <p className="text-[10px] text-slate-400 italic">These clauses will appear at the base of the proposal document.</p>
              </div>
            </section>
          )}
        </div>

        {/* Right Column: Preview */}
        <div className="flex-1 w-full lg:sticky lg:top-32 bg-slate-100 rounded-3xl p-10 md:p-16 border border-slate-200 print:p-0 print:border-none print:bg-white print:static">
          <div id="quote-preview" className="bg-white p-12 md:p-20 shadow-2xl rounded-2xl min-h-[1000px] border border-slate-100 print:shadow-none print:border-none print:min-h-0 print:p-0 relative overflow-hidden flex flex-col">
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent opacity-[0.03] rounded-full -translate-y-16 translate-x-16"></div>
            
            {/* Quote Header */}
            <div className="flex justify-between items-start mb-24 relative z-10">
              <div>
                <div className="text-[10px] font-bold text-accent uppercase tracking-[0.4em] mb-4">Architecture Proposal</div>
                <h1 className="text-4xl font-serif text-slate-900 mb-6 tracking-tight">PROPOSAL</h1>
                <div className="flex items-center gap-3">
                  <span className="w-8 h-[1px] bg-slate-200"></span>
                  <div className="font-mono text-xs text-slate-400">{quoteDetails.quoteNumber}</div>
                </div>
              </div>
              <div className="text-right text-[13px] text-slate-500 leading-relaxed font-light">
                <div className="font-bold text-slate-900 mb-3 text-base uppercase">{parties.businessName}</div>
                <div className="whitespace-pre-wrap">{parties.businessAddress}</div>
                {parties.businessVat && <div className="mt-3 text-slate-400 text-[11px] font-bold tracking-widest uppercase">VAT: {parties.businessVat}</div>}
              </div>
            </div>

            {/* Bill To & Details */}
            <div className="flex justify-between items-start mb-24 relative z-10">
              <div className="text-[13px] text-slate-500 leading-relaxed font-light">
                <div className="text-[10px] font-bold uppercase tracking-widest text-slate-300 mb-4">Project Stakeholder</div>
                <div className="font-bold text-slate-900 mb-2 text-base leading-none">{parties.clientName}</div>
                <div className="whitespace-pre-wrap">{parties.clientAddress}</div>
                {parties.clientVat && <div className="mt-4 text-[11px] font-bold tracking-widest text-slate-300 uppercase">TAX ID: {parties.clientVat}</div>}
              </div>
              <div className="text-right text-[13px] text-slate-700 flex flex-col gap-4 font-light">
                <div className="flex justify-end gap-6 border-b border-slate-50 pb-4"><span className="text-slate-300 uppercase text-[10px] tracking-widest font-bold">Issue</span> <span className="font-medium text-slate-900">{quoteDetails.issueDate}</span></div>
                <div className="flex justify-end gap-6"><span className="text-slate-300 uppercase text-[10px] tracking-widest font-bold">Expiry</span> <span className="font-medium text-slate-900">{quoteDetails.dueDate}</span></div>
              </div>
            </div>

            {/* Table */}
            <div className="mb-24 relative z-10 flex-grow">
              <table className="w-full text-[14px] text-slate-600">
                <thead>
                  <tr className="border-b border-slate-100">
                    <th className="text-left font-bold text-[10px] uppercase tracking-[0.2em] text-slate-300 pb-6">Work Architecture</th>
                    <th className="text-right font-bold text-[10px] uppercase tracking-[0.2em] text-slate-300 pb-6 w-20">Volume</th>
                    <th className="text-right font-bold text-[10px] uppercase tracking-[0.2em] text-slate-300 pb-6 w-24">Rate</th>
                    <th className="text-right font-bold text-[10px] uppercase tracking-[0.2em] text-slate-300 pb-6 w-28">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {lineItems.map((item) => (
                    <tr key={item.id} className="group transition-colors hover:bg-slate-50/50">
                      <td className="py-8 font-light text-slate-800">{item.description || '...'}</td>
                      <td className="py-8 text-right font-mono text-[13px]">{item.qty}</td>
                      <td className="py-8 text-right font-mono text-[13px]">£{item.rate.toLocaleString('en-GB', { minimumFractionDigits: 2 })}</td>
                      <td className="py-8 text-right font-serif text-base text-slate-900">£{(item.qty * item.rate).toLocaleString('en-GB', { minimumFractionDigits: 2 })}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Totals */}
              <div className="flex justify-end mt-12 bg-slate-50 p-8 rounded-2xl">
                <div className="w-72 text-[14px]">
                  <div className="flex justify-between py-3 text-slate-500">
                    <span>Subtotal</span>
                    <span>£{subtotal.toLocaleString('en-GB', { minimumFractionDigits: 2 })}</span>
                  </div>
                  <div className="flex justify-between py-3 text-slate-500 border-b border-slate-200 pb-6 font-medium">
                    <span>Tax ({vatTreatment})</span>
                    <span className="text-accent">£{vatAmount.toLocaleString('en-GB', { minimumFractionDigits: 2 })}</span>
                  </div>
                  <div className="flex justify-between py-8 text-2xl font-bold text-slate-900 border-t border-slate-200 mt-6 leading-none tracking-tight">
                    <span>Total Commitment</span>
                    <span className="font-serif italic">£{total.toLocaleString('en-GB', { minimumFractionDigits: 2 })}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer / Notes */}
            <div className="text-[13px] pt-16 border-t border-slate-100 relative z-10 grid grid-cols-2 gap-12">
              <div className="space-y-4">
                <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-300">Strategy Memo</div>
                <div className="whitespace-pre-wrap text-slate-600 font-light leading-relaxed italic border-l-2 border-accent/20 pl-6">{paymentAndNotes.notes}</div>
              </div>
              <div className="text-right space-y-4">
                <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-300">Official Clearance</div>
                <div className="text-slate-400 font-serif italic">Authorized Document</div>
                <div className="h-[2px] w-32 bg-slate-100 ml-auto mt-8"></div>
              </div>
            </div>

            {/* Legal Terms section for PDF/Preview */}
            {selectedTemplate === 'Legal' && standardTerms && (
              <div className="mt-16 pt-16 border-t border-slate-100 relative z-10 animate-in fade-in duration-700">
                <div className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent mb-8">Terms & Conditions</div>
                <div className="whitespace-pre-wrap text-[11px] text-slate-500 font-light leading-loose column-count-2 gap-12">
                  {standardTerms}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-20 print:hidden text-center bg-white border border-slate-100 p-16 rounded-[3rem] shadow-sm">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-serif text-slate-900 mb-6 tracking-tight">Professional Quote Engine</h2>
          <p className="text-slate-500 text-lg font-light leading-relaxed mb-12">
            Perfect for creative professionals, consultants, and limited companies in the UK. Support for VAT, PDF export, and Google Drive syncing included.
          </p>
          <ProFeaturesCTA />
        </div>
      </div>
    </div>
  );
}
