import React, { useState, useMemo, useRef } from 'react';
import { Download, Plus, Trash2, Loader2, Upload, X, Image as ImageIcon } from 'lucide-react';
import ProFeaturesCTA from './ProFeaturesCTA';
import { downloadPdf } from './pdfHelper';

interface LineItem {
  id: string;
  description: string;
  qty: number;
  rate: number;
}

export default function ReceiptGenerator() {
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [receiptImage, setReceiptImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [receiptDetails, setReceiptDetails] = useState({
    receiptNumber: 'REC-2026-001',
    issueDate: '2026-05-12',
    paymentMethod: 'Bank Transfer',
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

  const [notes, setNotes] = useState('Payment received with thanks.');

  const handleReceiptChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReceiptDetails({ ...receiptDetails, [e.target.name]: e.target.value });
  };

  const handlePartiesChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setParties({ ...parties, [e.target.name]: e.target.value });
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

  const handleDownloadPdf = async () => {
    await downloadPdf('receipt-preview', receiptDetails.receiptNumber || 'receipt', setIsGeneratingPdf);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setReceiptImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setReceiptImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-20 pb-40">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-8 print:hidden">
        <div>
          <div className="text-[11px] font-bold text-accent uppercase tracking-[0.3em] mb-4 flex items-center gap-2">
            <span className="w-8 h-[1px] bg-accent"></span>
            POST-PAYMENT UTILITY
          </div>
          <h1 className="text-5xl md:text-7xl font-serif text-slate-900 mb-6 tracking-tight leading-[0.9]">
            Receipt <span className="italic text-accent">Studio</span>
          </h1>
          <p className="text-slate-500 text-lg max-w-md font-light leading-relaxed">
            Professional receipts for deposits and closed invoices.
          </p>
        </div>
        <button 
          onClick={handleDownloadPdf}
          disabled={isGeneratingPdf}
          className="bg-slate-900 text-white font-bold flex items-center px-10 py-5 hover:bg-black transition-all text-[10px] uppercase tracking-widest disabled:opacity-70 disabled:cursor-not-allowed group"
        >
          {isGeneratingPdf ? (
            <Loader2 className="w-4 h-4 mr-3 animate-spin" />
          ) : (
            <Download className="w-4 h-4 mr-3" />
          )}
          {isGeneratingPdf ? 'Processing PDF...' : 'Download Document'}
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-16 items-start">
        {/* Left Column: Form */}
        <div className="w-full lg:w-[500px] flex-shrink-0 space-y-12 print:hidden backdrop-blur-sm">
          {/* Quote Details */}
          <section className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
            <h2 className="text-xl font-serif text-slate-900 mb-8 flex items-center gap-3">
              <span className="w-2 h-2 bg-accent rounded-full"></span>
              Document Metadata
            </h2>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400">Receipt Ref.</label>
                <input
                  type="text"
                  name="receiptNumber"
                  value={receiptDetails.receiptNumber}
                  onChange={handleReceiptChange}
                  className="w-full bg-slate-50 border border-slate-200 p-3 text-sm focus:border-slate-400 transition-all outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400">Transaction Date</label>
                <input
                  type="date"
                  name="issueDate"
                  value={receiptDetails.issueDate}
                  onChange={handleReceiptChange}
                  className="w-full bg-slate-50 border border-slate-200 p-3 text-sm focus:border-slate-400 transition-all outline-none"
                />
              </div>
              <div className="col-span-2 space-y-2">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400">Payment Protocol</label>
                <input
                  type="text"
                  name="paymentMethod"
                  value={receiptDetails.paymentMethod}
                  onChange={handleReceiptChange}
                  className="w-full bg-slate-50 border border-slate-200 p-3 text-sm focus:border-slate-400 transition-all outline-none"
                />
              </div>
            </div>
          </section>

          {/* Parties */}
          <section className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
            <h2 className="text-xl font-serif text-slate-900 mb-8 flex items-center gap-3">
              <span className="w-2 h-2 bg-accent rounded-full"></span>
              Entities
            </h2>
            <div className="grid grid-cols-2 gap-x-6 gap-y-8">
              <div className="space-y-2">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400">Issuer Entity</label>
                <input
                  type="text"
                  name="businessName"
                  value={parties.businessName}
                  onChange={handlePartiesChange}
                  className="w-full bg-slate-50 border border-slate-200 p-3 text-sm focus:border-slate-400 transition-all outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400">Public Contact</label>
                <input
                  type="email"
                  name="businessEmail"
                  value={parties.businessEmail}
                  onChange={handlePartiesChange}
                  className="w-full bg-slate-50 border border-slate-200 p-3 text-sm focus:border-slate-400 transition-all outline-none"
                />
              </div>
              <div className="col-span-1 space-y-2">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400">Issuer HQ</label>
                <textarea
                  name="businessAddress"
                  value={parties.businessAddress}
                  onChange={handlePartiesChange}
                  rows={3}
                  className="w-full bg-slate-50 border-none rounded-xl p-3 text-sm focus:ring-2 focus:ring-accent/20 transition-all outline-none resize-none"
                />
              </div>
              <div className="col-span-1 space-y-2">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400">Tax ID / VAT</label>
                <input
                  type="text"
                  name="businessVat"
                  value={parties.businessVat}
                  onChange={handlePartiesChange}
                  className="w-full bg-slate-50 border border-slate-200 p-3 text-sm focus:border-slate-400 transition-all outline-none"
                />
              </div>
              
              <div className="col-span-2 my-2 border-t border-slate-100"></div>

              <div className="space-y-2">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400">Recipient Entity</label>
                <input
                  type="text"
                  name="clientName"
                  value={parties.clientName}
                  onChange={handlePartiesChange}
                  className="w-full bg-slate-50 border border-slate-200 p-3 text-sm focus:border-slate-400 transition-all outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400">Recipient VAT</label>
                <input
                  type="text"
                  name="clientVat"
                  value={parties.clientVat}
                  onChange={handlePartiesChange}
                  className="w-full bg-slate-50 border border-slate-200 p-3 text-sm focus:border-slate-400 transition-all outline-none"
                />
              </div>
            </div>
          </section>

          {/* Line Items */}
          <section className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
            <div className="flex justify-between items-end mb-8">
              <h2 className="text-xl font-serif text-slate-900 flex items-center gap-3">
                <span className="w-2 h-2 bg-accent rounded-full"></span>
                Settled Items
              </h2>
              <button 
                onClick={addLineItem}
                className="text-[10px] font-bold text-accent uppercase tracking-widest flex items-center hover:text-slate-900 transition-colors"
              >
                <Plus className="w-3 h-3 mr-2" /> Add Entry
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
                      className="w-full bg-slate-50 border border-slate-200 p-3 text-sm focus:border-slate-400 outline-none"
                    />
                  </div>
                  <div className="w-20">
                    <input
                      type="number"
                      value={item.qty}
                      onChange={(e) => updateLineItem(item.id, 'qty', Number(e.target.value))}
                      className="w-full bg-slate-50 border border-slate-200 p-3 text-sm focus:border-slate-400 outline-none"
                    />
                  </div>
                  <div className="w-28">
                    <input
                      type="number"
                      value={item.rate}
                      onChange={(e) => updateLineItem(item.id, 'rate', Number(e.target.value))}
                      className="w-full bg-slate-50 border border-slate-200 p-3 text-sm focus:border-slate-400 outline-none"
                    />
                  </div>
                  <button 
                    onClick={() => removeLineItem(item.id)}
                    className="p-3 text-slate-300 hover:text-red-500 transition-all rounded-xl hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-12 space-y-6">
              <div className="space-y-2">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400">VAT Treatment</label>
                <select
                  value={vatTreatment}
                  onChange={(e) => setVatTreatment(e.target.value)}
                  className="w-full bg-slate-50 border-none rounded-xl p-4 text-sm focus:ring-2 focus:ring-accent/20 outline-none"
                >
                  <option value="Standard 20%">Standard 20%</option>
                  <option value="Reduced 5%">Reduced 5%</option>
                  <option value="Zero 0%">Zero 0%</option>
                  <option value="No VAT">No VAT</option>
                </select>
              </div>

              <div className="bg-slate-900 p-8 rounded-2xl text-sm text-white/60 space-y-4">
                <div className="flex justify-between">
                  <span>Net Ledger</span>
                  <span className="text-white font-mono text-base">£{subtotal.toLocaleString('en-GB', { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-4">
                  <span>VAT Component</span>
                  <span className="text-accent font-mono text-base">£{vatAmount.toLocaleString('en-GB', { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between font-serif text-xl text-white pt-2">
                  <span>Total Settled</span>
                  <span className="font-bold">£{total.toLocaleString('en-GB', { minimumFractionDigits: 2 })}</span>
                </div>
              </div>
            </div>
          </section>

          {/* Payment and notes */}
          <section className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
            <h2 className="text-xl font-serif text-slate-900 mb-8 flex items-center gap-3">
              <span className="w-2 h-2 bg-accent rounded-full"></span>
              Closing Memo
            </h2>
            <div className="space-y-8">
              <div className="space-y-2">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400">Official Notes</label>
                <textarea
                  name="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={4}
                  className="w-full bg-slate-50 border-none rounded-xl p-4 text-sm focus:ring-2 focus:ring-accent/20 outline-none resize-none font-light leading-relaxed"
                />
              </div>

              <div className="space-y-4">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400">Evidence Upload</label>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  accept="image/*"
                  className="hidden"
                />
                {!receiptImage ? (
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full border-2 border-dashed border-slate-200 rounded-3xl p-12 flex flex-col items-center justify-center text-slate-400 hover:text-accent hover:border-accent hover:bg-accent/5 transition-all group group-hover:shadow-lg"
                  >
                    <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-accent group-hover:text-white transition-all">
                      <Upload className="w-6 h-6 stroke-1" />
                    </div>
                    <span className="text-sm font-bold uppercase tracking-widest">Upload Resource</span>
                    <span className="text-[10px] uppercase mt-2 opacity-60">High Resolution Recommended</span>
                  </button>
                ) : (
                  <div className="relative group overflow-hidden rounded-3xl aspect-[4/3] border border-slate-100">
                    <img 
                      src={receiptImage} 
                      alt="Uploaded receipt" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-6">
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="w-12 h-12 bg-white rounded-2xl text-slate-900 hover:bg-accent hover:text-white transition-all flex items-center justify-center shadow-2xl"
                      >
                        <ImageIcon className="w-5 h-5" />
                      </button>
                      <button
                        onClick={removeImage}
                        className="w-12 h-12 bg-white rounded-2xl text-red-500 hover:bg-red-500 hover:text-white transition-all flex items-center justify-center shadow-2xl"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>

        {/* Right Column: Preview */}
        <div className="flex-1 w-full lg:sticky lg:top-32 bg-slate-100 rounded-3xl p-10 md:p-16 border border-slate-200 print:p-0 print:border-none print:bg-white print:static">
          <div id="receipt-preview" className="bg-white p-12 md:p-20 shadow-2xl rounded-2xl min-h-[1000px] border border-slate-100 print:shadow-none print:border-none print:min-h-0 print:p-0 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent opacity-[0.03] rounded-full -translate-y-16 translate-x-16"></div>
            
            {/* Receipt Header */}
            <div className="flex justify-between items-start mb-24 relative z-10">
              <div>
                <div className="text-[10px] font-bold text-accent uppercase tracking-[0.4em] mb-4">Official Document</div>
                <h1 className="text-4xl font-serif text-slate-900 mb-6 tracking-tight">RECEIPT</h1>
                <div className="flex items-center gap-3">
                  <span className="w-8 h-[1px] bg-slate-200"></span>
                  <div className="font-mono text-xs text-slate-400">{receiptDetails.receiptNumber}</div>
                </div>
              </div>
              <div className="text-right text-[13px] text-slate-500 leading-relaxed font-light">
                <div className="font-bold text-slate-900 mb-3 text-base">{parties.businessName}</div>
                <div className="whitespace-pre-wrap">{parties.businessAddress}</div>
                {parties.businessVat && <div className="mt-3 text-slate-400 text-[11px] font-bold tracking-widest uppercase">VAT: {parties.businessVat}</div>}
              </div>
            </div>

            {/* Bill To & Details */}
            <div className="flex justify-between items-start mb-24 relative z-10">
              <div className="text-[13px] text-slate-500 leading-relaxed font-light">
                <div className="text-[10px] font-bold uppercase tracking-widest text-slate-300 mb-4">Transaction Party</div>
                <div className="font-bold text-slate-900 mb-2 text-base leading-none">{parties.clientName}</div>
                <div className="whitespace-pre-wrap">{parties.clientAddress}</div>
                {parties.clientVat && <div className="mt-4 text-[11px] font-bold tracking-widest text-slate-300 uppercase">TAX ID: {parties.clientVat}</div>}
              </div>
              <div className="text-right text-[13px] text-slate-700 flex flex-col gap-4 font-light">
                <div className="flex justify-end gap-6 border-b border-slate-50 pb-4"><span className="text-slate-300 uppercase text-[10px] tracking-widest font-bold">Date</span> <span className="font-medium text-slate-900">{receiptDetails.issueDate}</span></div>
                <div className="flex justify-end gap-6"><span className="text-slate-300 uppercase text-[10px] tracking-widest font-bold">Protocol</span> <span className="font-medium text-slate-900">{receiptDetails.paymentMethod}</span></div>
              </div>
            </div>

            {/* Table */}
            <div className="mb-24 relative z-10">
              <table className="w-full text-[14px] text-slate-600">
                <thead>
                  <tr className="border-b border-slate-100">
                    <th className="text-left font-bold text-[10px] uppercase tracking-[0.2em] text-slate-300 pb-6 font-sans">Service Breakdown</th>
                    <th className="text-right font-bold text-[10px] uppercase tracking-[0.2em] text-slate-300 pb-6 font-sans w-20">Volume</th>
                    <th className="text-right font-bold text-[10px] uppercase tracking-[0.2em] text-slate-300 pb-6 font-sans w-24">Unit Rate</th>
                    <th className="text-right font-bold text-[10px] uppercase tracking-[0.2em] text-slate-300 pb-6 font-sans w-28">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {lineItems.map((item) => (
                    <tr key={item.id} className="group transition-colors hover:bg-slate-50/50">
                      <td className="py-8 font-light">{item.description || '...'}</td>
                      <td className="py-8 text-right font-mono text-[13px]">{item.qty}</td>
                      <td className="py-8 text-right font-mono text-[13px]">£{item.rate.toLocaleString('en-GB', { minimumFractionDigits: 2 })}</td>
                      <td className="py-8 text-right font-serif text-base text-slate-900">£{(item.qty * item.rate).toLocaleString('en-GB', { minimumFractionDigits: 2 })}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Totals */}
              <div className="flex justify-end mt-12 bg-slate-50 p-8">
                <div className="w-72 text-[14px]">
                  <div className="flex justify-between py-3 text-slate-500">
                    <span>Subtotal</span>
                    <span>£{subtotal.toLocaleString('en-GB', { minimumFractionDigits: 2 })}</span>
                  </div>
                  {vatTreatment !== 'No VAT' && (
                    <div className="flex justify-between py-3 text-slate-500 border-b border-slate-200 pb-6">
                      <span>VAT ({vatTreatment})</span>
                      <span className="text-accent">£{vatAmount.toLocaleString('en-GB', { minimumFractionDigits: 2 })}</span>
                    </div>
                  )}
                  <div className="flex justify-between py-8 text-2xl font-bold text-slate-900 border-t border-slate-200 mt-6 leading-none uppercase tracking-tight">
                    <span>Total</span>
                    <span>£{total.toLocaleString('en-GB', { minimumFractionDigits: 2 })}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer / Notes */}
            <div className={`grid ${receiptImage ? 'grid-cols-2' : 'grid-cols-1'} gap-16 text-[13px] mt-24 pt-16 border-t border-slate-100 relative z-10`}>
              <div className="space-y-4">
                <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-300">Certified Memo</div>
                <div className="whitespace-pre-wrap text-slate-600 font-light leading-relaxed italic border-l-2 border-accent/20 pl-6">{notes}</div>
              </div>
              {receiptImage && (
                <div className="text-right flex flex-col items-end space-y-4 group">
                  <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-300">Transaction Evidence</div>
                  <div className="border border-slate-100 p-2 rounded-2xl inline-block bg-white shadow-xl group-hover:-translate-y-2 transition-transform duration-500">
                    <img src={receiptImage} alt="Receipt reference" className="max-h-48 rounded-xl w-auto grayscale group-hover:grayscale-0 transition-all duration-700" />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-20 print:hidden">
        <div className="border-t border-slate-200 pt-10 mb-8 max-w-3xl">
          <h2 className="text-2xl font-bold text-slate-800 mb-4 uppercase tracking-tight italic">UK Receipt generator</h2>
          <p className="text-slate-500 text-sm leading-relaxed">
            Record payments properly to keep your accounting paper trail secure. 
          </p>
        </div>
        <ProFeaturesCTA />
      </div>
    </div>
  );
}
