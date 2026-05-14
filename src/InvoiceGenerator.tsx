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

export default function InvoiceGenerator() {
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [invoiceDetails, setInvoiceDetails] = useState({
    invoiceNumber: 'INV-2026-001',
    issueDate: '2026-05-12',
    dueDate: '2026-06-11',
    paymentTerms: 'Net 30',
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
    notes: 'Thank you for your business.',
  });

  const handleInvoiceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInvoiceDetails({ ...invoiceDetails, [name]: value });
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

  const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    if (name === 'businessAddress' && !value.trim()) {
      setErrors(prev => ({ ...prev, businessAddress: 'Required' }));
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
    
    // Invoice details
    if (!invoiceDetails.invoiceNumber.trim()) newErrors.invoiceNumber = 'Required';
    if (!invoiceDetails.issueDate) newErrors.issueDate = 'Required';
    if (!invoiceDetails.dueDate) newErrors.dueDate = 'Required';

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

    // VAT Check
    if (vatTreatment !== 'No VAT' && !parties.businessVat.trim()) {
      newErrors.businessVat = 'VAT number required for VAT invoices';
    }

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
    await downloadPdf('invoice-preview', invoiceDetails.invoiceNumber || 'invoice', setIsGeneratingPdf);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 pt-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6 print:hidden">
        <div>
          <div className="text-[11px] font-bold text-accent uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
            <span className="w-8 h-[1px] bg-accent"></span>
            FLAGSHIP TOOL
          </div>
          <h1 className="text-5xl md:text-6xl font-serif text-slate-900 mb-6 tracking-tight leading-[0.95]">
            UK VAT <br />
            <span className="italic text-accent">Professional Billing</span>
          </h1>
          <p className="text-slate-500 text-sm max-w-md leading-relaxed font-light">
            Craft a high-end VAT compliant document with precise calculations and elegant typography.
          </p>
        </div>
        <button 
          onClick={handleDownloadPdf}
          disabled={isGeneratingPdf}
          className="bg-accent text-white font-bold flex items-center px-8 py-4 hover:bg-accent-dark transition-all scale-100 hover:scale-105 duration-300 text-sm shadow-xl rounded-xl disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isGeneratingPdf ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <Download className="w-4 h-4 mr-2" />
          )}
          {isGeneratingPdf ? 'Generating...' : 'Export Invoice'}
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Left Column: Form */}
        <div className="w-full lg:w-[500px] flex-shrink-0 space-y-8 print:hidden">
          {/* Invoice Details */}
          <section>
            <h2 className="text-lg font-serif text-slate-800 mb-4 border-b border-slate-200 pb-2">Invoice details</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">Invoice Number</label>
                <input
                  type="text"
                  name="invoiceNumber"
                  value={invoiceDetails.invoiceNumber}
                  onChange={handleInvoiceChange}
                  className={`w-full border ${errors.invoiceNumber ? 'border-red-500' : 'border-slate-300'} rounded p-2 text-sm focus:border-slate-500 focus:outline-none`}
                />
                {errors.invoiceNumber && <p className="text-red-500 text-[10px] mt-1 font-bold error-text">{errors.invoiceNumber}</p>}
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">Issue Date</label>
                <input
                  type="date"
                  name="issueDate"
                  value={invoiceDetails.issueDate}
                  onChange={handleInvoiceChange}
                  className={`w-full border ${errors.issueDate ? 'border-red-500' : 'border-slate-300'} rounded p-2 text-sm focus:border-slate-500 focus:outline-none`}
                />
                {errors.issueDate && <p className="text-red-500 text-[10px] mt-1 font-bold error-text">{errors.issueDate}</p>}
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">Due Date</label>
                <input
                  type="date"
                  name="dueDate"
                  value={invoiceDetails.dueDate}
                  onChange={handleInvoiceChange}
                  className={`w-full border ${errors.dueDate ? 'border-red-500' : 'border-slate-300'} rounded p-2 text-sm focus:border-slate-500 focus:outline-none`}
                />
                {errors.dueDate && <p className="text-red-500 text-[10px] mt-1 font-bold error-text">{errors.dueDate}</p>}
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">Payment Terms</label>
                <input
                  type="text"
                  name="paymentTerms"
                  value={invoiceDetails.paymentTerms}
                  onChange={handleInvoiceChange}
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
                  onBlur={handleBlur}
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
                  className={`w-full border ${errors.businessVat ? 'border-red-500' : 'border-slate-300'} rounded p-2 text-sm focus:border-slate-500 focus:outline-none`}
                />
                {errors.businessVat && <p className="text-red-500 text-[10px] mt-1 font-bold error-text">{errors.businessVat}</p>}
              </div>
              
              <div className="col-span-2 my-2 border-t border-slate-100"></div>
 
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">Client Name</label>
                <input
                  type="text"
                  name="clientName"
                  value={parties.clientName}
                  onChange={handlePartiesChange}
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
                  className={`w-full border ${errors.clientAddress ? 'border-red-500' : 'border-slate-300'} rounded p-2 text-sm focus:border-slate-500 focus:outline-none resize-none`}
                />
                {errors.clientAddress && <p className="text-red-500 text-[10px] mt-1 font-bold error-text">{errors.clientAddress}</p>}
              </div>
            </div>
          </section>

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
                      placeholder="Description"
                      onChange={(e) => updateLineItem(item.id, 'description', e.target.value)}
                      className={`w-full border ${errors.lineItems ? 'border-red-500' : 'border-slate-300'} rounded p-2 text-sm focus:border-slate-500 focus:outline-none`}
                    />
                  </div>
                  <div className="w-16">
                    <input
                      type="number"
                      value={item.qty}
                      onChange={(e) => updateLineItem(item.id, 'qty', Number(e.target.value))}
                      className={`w-full border ${errors.lineItems ? 'border-red-500' : 'border-slate-300'} rounded p-2 text-sm focus:border-slate-500 focus:outline-none`}
                    />
                  </div>
                  <div className="w-24">
                    <input
                      type="number"
                      value={item.rate}
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
                  <span className="text-slate-600">VAT</span>
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
            <h2 className="text-lg font-serif text-slate-800 mb-4 border-b border-slate-200 pb-2">Payment and notes</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">Bank Details</label>
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
            </div>
          </section>
        </div>

        {/* Right Column: Preview */}
        <div className="flex-1 w-full lg:sticky lg:top-24 bg-slate-100 p-6 md:p-12 border border-slate-200 shadow-inner rounded-2xl print:p-0 print:border-none print:bg-white print:static">
          <div id="invoice-preview" className="bg-white p-12 md:p-16 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] min-h-[1123px] border border-slate-100 print:shadow-none print:border-none print:min-h-0 print:p-0 flex flex-col">
            {/* Invoice Header */}
            <div className="flex justify-between items-start mb-24 relative">
              <div className="absolute -top-16 left-0 w-32 h-[2px] bg-accent"></div>
              <div>
                <h1 className="text-4xl font-serif text-slate-900 mb-6 tracking-tight">FINAL INVOICE</h1>
                <div className="text-xs font-display font-medium text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  Document No. <span className="text-slate-900">{invoiceDetails.invoiceNumber}</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-[10px] font-bold text-accent uppercase tracking-[0.2em] mb-4">REMIT TO</div>
                <div className="font-serif text-lg text-slate-900 mb-2 leading-none uppercase">{parties.businessName}</div>
                <div className="text-[11px] leading-relaxed text-slate-500 whitespace-pre-wrap font-sans opacity-80">{parties.businessAddress}</div>
                {parties.businessVat && <div className="text-[10px] font-bold text-slate-400 mt-2">VAT {parties.businessVat}</div>}
              </div>
            </div>

            {/* Bill To & Details */}
            <div className="flex flex-col md:flex-row justify-between gap-16 mb-24">
              <div className="flex-1">
                <div className="text-[10px] font-bold text-accent uppercase tracking-[0.2em] mb-6 border-b border-accent/10 pb-2">BILLED TO</div>
                <div className="font-serif text-2xl text-slate-900 mb-3">{parties.clientName}</div>
                <div className="text-xs leading-relaxed text-slate-500 whitespace-pre-wrap font-sans opacity-80">{parties.clientAddress}</div>
                {parties.clientVat && <div className="text-[10px] font-bold text-slate-400 mt-3 italic underline decoration-accent/30 tracking-wider">VAT {parties.clientVat}</div>}
              </div>
              <div className="w-px bg-slate-100 hidden md:block"></div>
              <div className="md:text-right flex flex-col gap-6">
                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-1">ISSUE DATE</div>
                  <div className="text-sm font-display font-bold text-slate-900">{invoiceDetails.issueDate}</div>
                </div>
                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-1">PAYMENT DUE</div>
                  <div className="text-sm font-display font-bold text-slate-900">{invoiceDetails.dueDate}</div>
                </div>
                <div className="px-4 py-2 bg-slate-50 rounded text-[11px] font-bold text-slate-500 tracking-wider inline-block">
                  TERMS: {invoiceDetails.paymentTerms}
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="mb-auto">
              <table className="w-full text-sm text-slate-800 printable-table border-collapse">
                <thead>
                  <tr className="border-b-2 border-slate-900">
                    <th className="text-left font-display font-bold text-[10px] uppercase tracking-[0.2em] text-slate-900 py-4">Service Description</th>
                    <th className="text-right font-display font-bold text-[10px] uppercase tracking-[0.2em] text-slate-900 py-4 w-20">Qty</th>
                    <th className="text-right font-display font-bold text-[10px] uppercase tracking-[0.2em] text-slate-900 py-4 w-28">Rate</th>
                    <th className="text-right font-display font-bold text-[10px] uppercase tracking-[0.2em] text-slate-900 py-4 w-32">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {lineItems.map((item) => (
                    <tr key={item.id} className="group transition-colors hover:bg-slate-50/50">
                      <td className="py-6 font-medium text-slate-700 leading-snug">{item.description || 'Service not specified'}</td>
                      <td className="py-6 text-right font-display text-slate-500">{item.qty}</td>
                      <td className="py-6 text-right font-display text-slate-500">£{item.rate.toLocaleString('en-GB', { minimumFractionDigits: 2 })}</td>
                      <td className="py-6 text-right font-display font-bold text-slate-900">£{(item.qty * item.rate).toLocaleString('en-GB', { minimumFractionDigits: 2 })}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Totals */}
              <div className="flex justify-end mt-12 bg-slate-50 p-8 rounded-xl border border-slate-100">
                <div className="w-full max-w-[240px] text-sm">
                  <div className="flex justify-between py-2 text-slate-500 font-medium">
                    <span>Subtotal</span>
                    <span>£{subtotal.toLocaleString('en-GB', { minimumFractionDigits: 2 })}</span>
                  </div>
                  {vatTreatment !== 'No VAT' && (
                    <div className="flex justify-between py-2 text-slate-500 border-b border-slate-200 mb-4 pb-4 font-medium">
                      <span>VAT ({vatTreatment})</span>
                      <span>£{vatAmount.toLocaleString('en-GB', { minimumFractionDigits: 2 })}</span>
                    </div>
                  )}
                  <div className="flex justify-between py-2 text-xl font-display font-bold text-slate-900">
                    <span className="text-accent underline decoration-accent/30 underline-offset-8">Total Due</span>
                    <span>£{total.toLocaleString('en-GB', { minimumFractionDigits: 2 })}</span>
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
          </div>
        </div>
      </div>

      <div className="mt-20 print:hidden">
        <div className="border-t border-slate-200 pt-10 mb-8 max-w-3xl">
          <h2 className="text-3xl font-serif text-slate-800 mb-4">UK VAT invoice generator</h2>
          <p className="text-slate-500 text-sm leading-relaxed">
            Use a VAT invoice when you are VAT registered and need a clear subtotal, VAT amount, and total due for a UK client.
          </p>
        </div>
        <ProFeaturesCTA />
      </div>
    </div>
  );
}
