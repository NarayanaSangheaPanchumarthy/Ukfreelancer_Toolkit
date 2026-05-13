import React, { useState, useMemo } from 'react';
import { Download, Plus, Trash2, Loader2 } from 'lucide-react';
import ProFeaturesCTA from './ProFeaturesCTA';
import { downloadPdf } from './pdfHelper';

interface LineItem {
  id: string;
  description: string;
  qty: number;
  rate: number;
}

export default function QuoteGenerator() {
  const [selectedTemplate, setSelectedTemplate] = useState<'Simple' | 'Detailed' | 'Legal'>('Simple');
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

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 pt-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6 print:hidden">
        <div>
          <div className="text-[10px] font-bold text-[#a67c52] uppercase tracking-widest mb-3">
            BEFORE THE WORK
          </div>
          <div className="flex flex-col gap-1 mb-6">
            <label className="block text-[10px] font-bold uppercase tracking-widest text-[#a67c52] mb-1">Form Layout / Template</label>
            <select
              value={selectedTemplate}
              onChange={(e) => setSelectedTemplate(e.target.value as any)}
              className="bg-white border-2 border-slate-200 text-slate-800 text-sm font-bold px-4 py-2 hover:border-slate-300 transition-colors focus:outline-none focus:border-[#a67c52] rounded-none shadow-sm"
            >
              <option value="Simple">Modern Simple</option>
              <option value="Detailed">Executive Detailed</option>
              <option value="Legal">Legal (with T&Cs)</option>
            </select>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif text-slate-900 mb-4 tracking-tight">
            Quote / Estimate <br /> Generator
          </h1>
          {showSuccess && (
            <div className="mb-4 p-2 bg-green-50 border border-green-200 text-green-700 text-xs font-bold rounded animate-fade-in flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              Quote PDF generated successfully!
            </div>
          )}
          <p className="text-slate-500 text-sm max-w-md leading-relaxed">
            Create a professional quote with line items, VAT treatment, live totals, and PDF export.
          </p>
        </div>
        <button 
          onClick={handleDownloadPdf}
          disabled={isGeneratingPdf}
          className="bg-[#1a1f24] text-white font-bold flex items-center px-6 py-3 border border-[#1a1f24] hover:bg-black transition-colors text-sm shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isGeneratingPdf ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <Download className="w-4 h-4 mr-2" />
          )}
          {isGeneratingPdf ? 'Generating PDF...' : 'Download PDF'}
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Left Column: Form */}
        <div className="w-full lg:w-[500px] flex-shrink-0 space-y-8 print:hidden">
          {/* Quote Details */}
          <section>
            <h2 className="text-lg font-serif text-slate-800 mb-4 border-b border-slate-200 pb-2">Quote details</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">Quote Number</label>
                <input
                  type="text"
                  name="quoteNumber"
                  value={quoteDetails.quoteNumber}
                  onChange={handleQuoteChange}
                  className={`w-full border ${errors.quoteNumber ? 'border-red-500' : 'border-slate-300'} rounded p-2 text-sm focus:border-slate-500 focus:outline-none`}
                />
                {errors.quoteNumber && <p className="text-red-500 text-[10px] mt-1 font-bold error-text">{errors.quoteNumber}</p>}
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">Issue Date</label>
                <input
                  type="date"
                  name="issueDate"
                  value={quoteDetails.issueDate}
                  onChange={handleQuoteChange}
                  className={`w-full border ${errors.issueDate ? 'border-red-500' : 'border-slate-300'} rounded p-2 text-sm focus:border-slate-500 focus:outline-none`}
                />
                {errors.issueDate && <p className="text-red-500 text-[10px] mt-1 font-bold error-text">{errors.issueDate}</p>}
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">Valid Until</label>
                <input
                  type="date"
                  name="dueDate"
                  value={quoteDetails.dueDate}
                  onChange={handleQuoteChange}
                  className={`w-full border ${errors.dueDate ? 'border-red-500' : 'border-slate-300'} rounded p-2 text-sm focus:border-slate-500 focus:outline-none`}
                />
                {errors.dueDate && <p className="text-red-500 text-[10px] mt-1 font-bold error-text">{errors.dueDate}</p>}
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">Terms</label>
                <input
                  type="text"
                  name="paymentTerms"
                  value={quoteDetails.paymentTerms}
                  onChange={handleQuoteChange}
                  className="w-full border border-slate-300 rounded p-2 text-sm focus:border-slate-500 focus:outline-none"
                />
              </div>
            </div>
          </section>

          {/* Parties */}
          <section>
            <h2 className="text-lg font-serif text-slate-800 mb-4 border-b border-slate-200 pb-2">Parties</h2>
            <div className="grid grid-cols-2 gap-x-4 gap-y-6">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">Your Business Name</label>
                <input
                  type="text"
                  name="businessName"
                  value={parties.businessName}
                  onChange={handlePartiesChange}
                  className={`w-full border ${errors.businessName ? 'border-red-500' : 'border-slate-300'} rounded p-2 text-sm focus:border-slate-500 focus:outline-none`}
                />
                {errors.businessName && <p className="text-red-500 text-[10px] mt-1 font-bold error-text">{errors.businessName}</p>}
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">Your Email</label>
                <input
                  type="email"
                  name="businessEmail"
                  value={parties.businessEmail}
                  onChange={handlePartiesChange}
                  className={`w-full border ${errors.businessEmail ? 'border-red-500' : 'border-slate-300'} rounded p-2 text-sm focus:border-slate-500 focus:outline-none`}
                />
                {errors.businessEmail && <p className="text-red-500 text-[10px] mt-1 font-bold error-text">{errors.businessEmail}</p>}
              </div>
              <div className="col-span-1">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">Your Address</label>
                <textarea
                  name="businessAddress"
                  value={parties.businessAddress}
                  onChange={handlePartiesChange}
                  rows={3}
                  className={`w-full border ${errors.businessAddress ? 'border-red-500' : 'border-slate-300'} rounded p-2 text-sm focus:border-slate-500 focus:outline-none resize-none`}
                />
                {errors.businessAddress && <p className="text-red-500 text-[10px] mt-1 font-bold error-text">{errors.businessAddress}</p>}
              </div>
              <div className="col-span-1">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">VAT Number</label>
                <input
                  type="text"
                  name="businessVat"
                  value={parties.businessVat}
                  onChange={handlePartiesChange}
                  className="w-full border border-slate-300 rounded p-2 text-sm focus:border-slate-500 focus:outline-none"
                />
              </div>
              
              <div className="col-span-2 my-2 border-t border-slate-100"></div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">Client Name</label>
                <input
                  type="text"
                  name="clientName"
                  value={parties.clientName}
                  onChange={handlePartiesChange}
                  placeholder="e.g. Acme Corp"
                  className={`w-full border ${errors.clientName ? 'border-red-500' : 'border-slate-300'} rounded p-2 text-sm focus:border-slate-500 focus:outline-none`}
                />
                {errors.clientName && <p className="text-red-500 text-[10px] mt-1 font-bold error-text">{errors.clientName}</p>}
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">Client VAT Number</label>
                <input
                  type="text"
                  name="clientVat"
                  value={parties.clientVat}
                  onChange={handlePartiesChange}
                  placeholder="e.g. GB 123 4567 89"
                  className="w-full border border-slate-300 rounded p-2 text-sm focus:border-slate-500 focus:outline-none"
                />
              </div>
              <div className="col-span-1">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">Client Address</label>
                <textarea
                  name="clientAddress"
                  value={parties.clientAddress}
                  onChange={handlePartiesChange}
                  rows={3}
                  placeholder="Street, City, Postcode"
                  className={`w-full border ${errors.clientAddress ? 'border-red-500' : 'border-slate-300'} rounded p-2 text-sm focus:border-slate-500 focus:outline-none resize-none`}
                />
                {errors.clientAddress && <p className="text-red-500 text-[10px] mt-1 font-bold error-text">{errors.clientAddress}</p>}
              </div>
            </div>
          </section>

          {/* Milestones (Only for Detailed) */}
          {selectedTemplate === 'Detailed' && (
            <section>
              <div className="flex justify-between items-end border-b border-slate-200 pb-2 mb-4">
                <h2 className="text-lg font-serif text-slate-800">Milestones & Timeline</h2>
                <button 
                  onClick={() => setMilestones([...milestones, { id: Date.now().toString(), task: '', timing: '' }])}
                  className="text-[10px] font-bold text-[#a67c52] uppercase tracking-widest flex items-center hover:text-slate-800 transition-colors"
                >
                  <Plus className="w-3 h-3 mr-1" /> Add phase
                </button>
              </div>
              <div className="space-y-3">
                {milestones.map((m) => (
                  <div key={m.id} className="flex gap-2 items-start">
                    <div className="flex-grow">
                      <input
                        type="text"
                        value={m.task}
                        placeholder="Phase or task description"
                        onChange={(e) => setMilestones(milestones.map(x => x.id === m.id ? { ...x, task: e.target.value } : x))}
                        className="w-full border border-slate-300 rounded p-2 text-sm focus:border-slate-500 focus:outline-none"
                      />
                    </div>
                    <div className="w-32">
                      <input
                        type="text"
                        value={m.timing}
                        placeholder="e.g. Week 1"
                        onChange={(e) => setMilestones(milestones.map(x => x.id === m.id ? { ...x, timing: e.target.value } : x))}
                        className="w-full border border-slate-300 rounded p-2 text-sm focus:border-slate-500 focus:outline-none"
                      />
                    </div>
                    <button 
                      onClick={() => setMilestones(milestones.filter(x => x.id !== m.id))}
                      className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Line Items */}
          <section>
            <div className="flex justify-between items-end border-b border-slate-200 pb-2 mb-4">
              <h2 className="text-lg font-serif text-slate-800">Line items</h2>
              <button 
                onClick={addLineItem}
                className="text-[10px] font-bold text-[#a67c52] uppercase tracking-widest flex items-center hover:text-slate-800 transition-colors"
              >
                <Plus className="w-3 h-3 mr-1" /> Add item
              </button>
            </div>
            
            <div className="space-y-3">
              {lineItems.map((item, index) => (
                <div key={item.id} className="flex gap-2 items-start">
                  <div className="flex-grow">
                    <input
                      type="text"
                      value={item.description}
                      placeholder="Service or product description"
                      onChange={(e) => updateLineItem(item.id, 'description', e.target.value)}
                      className={`w-full border ${errors.lineItems ? 'border-red-500' : 'border-slate-300'} rounded p-2 text-sm focus:border-slate-500 focus:outline-none`}
                    />
                  </div>
                  <div className="w-16">
                    <input
                      type="number"
                      value={item.qty}
                      placeholder="Qty"
                      onChange={(e) => updateLineItem(item.id, 'qty', Number(e.target.value))}
                      className={`w-full border ${errors.lineItems ? 'border-red-500' : 'border-slate-300'} rounded p-2 text-sm focus:border-slate-500 focus:outline-none`}
                    />
                  </div>
                  <div className="w-24">
                    <input
                      type="number"
                      value={item.rate}
                      placeholder="Rate"
                      onChange={(e) => updateLineItem(item.id, 'rate', Number(e.target.value))}
                      className={`w-full border ${errors.lineItems ? 'border-red-500' : 'border-slate-300'} rounded p-2 text-sm focus:border-slate-500 focus:outline-none`}
                    />
                  </div>
                  <div className="w-20 pt-2 text-sm font-bold text-slate-800 text-right pr-2">
                    £{(item.qty * item.rate).toFixed(2)}
                  </div>
                  <button 
                    onClick={() => removeLineItem(item.id)}
                    className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
              {errors.lineItems && <p className="text-red-500 text-[10px] mt-1 font-bold error-text">{errors.lineItems}</p>}
            </div>

            <div className="mt-8 flex justify-between items-start gap-8">
              <div className="w-1/2">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">VAT Treatment</label>
                <select
                  value={vatTreatment}
                  onChange={(e) => setVatTreatment(e.target.value)}
                  className="w-full border border-slate-300 rounded p-2 text-sm bg-white focus:border-slate-500 focus:outline-none"
                >
                  <option value="Standard 20%">Standard 20%</option>
                  <option value="Reduced 5%">Reduced 5%</option>
                  <option value="Zero 0%">Zero 0%</option>
                  <option value="No VAT">No VAT</option>
                </select>
              </div>

              <div className="w-1/2 bg-slate-50 border border-slate-200 p-4 rounded text-sm">
                <div className="flex justify-between mb-2">
                  <span className="text-slate-600">Subtotal</span>
                  <span className="font-medium">£{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-3 border-b border-slate-200 pb-2">
                  <span className="text-slate-600">VAT ({vatTreatment === 'No VAT' ? '£0.00' : vatTreatment})</span>
                  <span className="font-medium">£{vatAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-slate-900">
                  <span>Total</span>
                  <span>£{total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </section>

          {/* Payment and notes */}
          <section>
            <h2 className="text-lg font-serif text-slate-800 mb-4 border-b border-slate-200 pb-2">Quote details</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">Payment Details</label>
                <textarea
                  name="paymentDetails"
                  value={paymentAndNotes.paymentDetails}
                  onChange={handlePaymentChange}
                  rows={3}
                  className="w-full border border-slate-300 rounded p-2 text-sm focus:border-slate-500 focus:outline-none resize-none"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">Document Notes</label>
                <textarea
                  name="notes"
                  value={paymentAndNotes.notes}
                  onChange={handlePaymentChange}
                  rows={2}
                  className="w-full border border-slate-300 rounded p-2 text-sm focus:border-slate-500 focus:outline-none resize-none"
                />
              </div>

              {selectedTemplate === 'Legal' && (
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-[#a67c52] mb-2 font-serif">Standard Terms & Conditions</label>
                  <textarea
                    value={standardTerms}
                    onChange={(e) => setStandardTerms(e.target.value)}
                    rows={4}
                    className="w-full border border-[#a67c52]/30 bg-[#a67c52]/5 rounded p-3 text-sm focus:border-[#a67c52] focus:outline-none resize-none text-slate-800 italic"
                  />
                </div>
              )}
            </div>
          </section>
        </div>

        {/* Right Column: Preview */}
        <div className="flex-1 w-full lg:sticky lg:top-24 bg-slate-200/50 p-6 md:p-10 border border-slate-200 print:p-0 print:border-none print:bg-white print:static">
          <div id="quote-preview" className="bg-white p-8 md:p-12 shadow-sm min-h-[842px] border border-slate-200 print:shadow-none print:border-none print:min-h-0 print:p-0">
            {/* Invoice Header */}
            <div className="flex justify-between items-start mb-16">
              <div>
                <h1 className="text-3xl font-serif text-slate-900 mb-4 tracking-tight">QUOTE</h1>
                <div className="text-sm text-slate-600">{quoteDetails.quoteNumber}</div>
              </div>
              <div className="text-right text-sm text-slate-700">
                <div className="font-bold text-slate-900 mb-1">{parties.businessName}</div>
                <div className="whitespace-pre-wrap">{parties.businessAddress}</div>
                {parties.businessVat && <div className="mt-1">VAT: {parties.businessVat}</div>}
              </div>
            </div>

            {/* Bill To & Details */}
            <div className="flex justify-between items-start mb-16">
              <div className="text-sm text-slate-700">
                <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Quote For</div>
                <div className="font-bold text-slate-900 mb-1">{parties.clientName}</div>
                <div className="whitespace-pre-wrap">{parties.clientAddress}</div>
                {parties.clientVat && <div className="mt-1">VAT: {parties.clientVat}</div>}
              </div>
              <div className="text-right text-sm text-slate-700 flex flex-col gap-2">
                <div className="flex justify-end gap-4"><span className="text-slate-400">Date:</span> {quoteDetails.issueDate}</div>
                <div className="flex justify-end gap-4"><span className="text-slate-400">Valid Until:</span> {quoteDetails.dueDate}</div>
                <div className="flex justify-end gap-4 text-slate-500">{quoteDetails.paymentTerms}</div>
              </div>
            </div>

            {/* Table */}
            <div className="mb-12">
              <table className="w-full text-sm text-slate-700 printable-table">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left font-bold text-[10px] uppercase tracking-widest text-slate-500 pb-3 font-sans">Description</th>
                    <th className="text-right font-bold text-[10px] uppercase tracking-widest text-slate-500 pb-3 font-sans w-20">Qty</th>
                    <th className="text-right font-bold text-[10px] uppercase tracking-widest text-slate-500 pb-3 font-sans w-24">Rate</th>
                    <th className="text-right font-bold text-[10px] uppercase tracking-widest text-slate-500 pb-3 font-sans w-28">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {lineItems.map((item) => (
                    <tr key={item.id}>
                      <td className="py-4">{item.description || '...'}</td>
                      <td className="py-4 text-right">{item.qty}</td>
                      <td className="py-4 text-right">£{item.rate.toFixed(2)}</td>
                      <td className="py-4 text-right">£{(item.qty * item.rate).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {selectedTemplate === 'Detailed' && milestones.length > 0 && (
                <div className="mt-12 pt-8 border-t border-slate-100 animate-fade-in">
                  <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-4">Milestones & Phase Timeline</h3>
                  <div className="grid grid-cols-1 gap-2">
                    {milestones.map((m) => (
                      <div key={m.id} className="flex justify-between items-center py-2 border-b border-slate-50 text-xs">
                        <span className="text-slate-800 font-medium">{m.task}</span>
                        <span className="text-slate-500 italic">{m.timing}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Totals */}
              <div className="flex justify-end mt-6">
                <div className="w-64 text-sm">
                  <div className="flex justify-between py-2 text-slate-600">
                    <span>Subtotal</span>
                    <span>£{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between py-2 text-slate-600 border-b border-slate-200">
                    <span>VAT ({vatTreatment})</span>
                    <span>£{vatAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between py-4 text-lg font-bold text-slate-900 border-t border-slate-200 mt-2">
                    <span>Total</span>
                    <span>£{total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer / Notes */}
            <div className="grid grid-cols-2 gap-8 text-sm mt-24">
              <div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Payment Details</div>
                <div className="whitespace-pre-wrap text-slate-600">{paymentAndNotes.paymentDetails}</div>
              </div>
              <div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Notes</div>
                <div className="whitespace-pre-wrap text-slate-600">{paymentAndNotes.notes}</div>
              </div>
            </div>

            {selectedTemplate === 'Legal' && standardTerms && (
              <div className="mt-12 pt-8 border-t border-slate-100 animate-fade-in">
                <div className="text-[10px] font-bold uppercase tracking-widest text-[#a67c52] mb-3">Terms & Conditions of Service</div>
                <div className="text-[10px] leading-relaxed text-slate-500 whitespace-pre-wrap italic">
                  {standardTerms}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-20 print:hidden">
        <div className="border-t border-slate-200 pt-10 mb-8 max-w-3xl">
          <h2 className="text-3xl font-serif text-slate-800 mb-4">UK Quote generator</h2>
          <p className="text-slate-500 text-sm leading-relaxed">
            Create professional work estimates or formal quotes before beginning the project. Includes support for VAT breakdowns if you are registered.
          </p>
        </div>
        <ProFeaturesCTA />
      </div>
    </div>
  );
}
