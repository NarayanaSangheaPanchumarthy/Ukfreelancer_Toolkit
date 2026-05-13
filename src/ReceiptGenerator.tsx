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
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 pt-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6 print:hidden">
        <div>
          <div className="text-[10px] font-bold text-[#a67c52] uppercase tracking-widest mb-3">
            AFTER PAYMENT
          </div>
          <h1 className="text-4xl md:text-5xl font-serif text-slate-900 mb-4 tracking-tight">
            Receipt Generator
          </h1>
          <p className="text-slate-500 text-sm max-w-md leading-relaxed">
            Generate simple digital receipts for paid invoices or upfront deposits.
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
            <h2 className="text-lg font-serif text-slate-800 mb-4 border-b border-slate-200 pb-2">Receipt details</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">Receipt Number</label>
                <input
                  type="text"
                  name="receiptNumber"
                  value={receiptDetails.receiptNumber}
                  onChange={handleReceiptChange}
                  className="w-full border border-slate-300 rounded p-2 text-sm focus:border-slate-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">Issue Date</label>
                <input
                  type="date"
                  name="issueDate"
                  value={receiptDetails.issueDate}
                  onChange={handleReceiptChange}
                  className="w-full border border-slate-300 rounded p-2 text-sm focus:border-slate-500 focus:outline-none"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">Payment Method</label>
                <input
                  type="text"
                  name="paymentMethod"
                  value={receiptDetails.paymentMethod}
                  onChange={handleReceiptChange}
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
                  className="w-full border border-slate-300 rounded p-2 text-sm focus:border-slate-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">Your Email</label>
                <input
                  type="email"
                  name="businessEmail"
                  value={parties.businessEmail}
                  onChange={handlePartiesChange}
                  className="w-full border border-slate-300 rounded p-2 text-sm focus:border-slate-500 focus:outline-none"
                />
              </div>
              <div className="col-span-1">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">Your Address</label>
                <textarea
                  name="businessAddress"
                  value={parties.businessAddress}
                  onChange={handlePartiesChange}
                  rows={3}
                  className="w-full border border-slate-300 rounded p-2 text-sm focus:border-slate-500 focus:outline-none resize-none"
                />
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
                  className="w-full border border-slate-300 rounded p-2 text-sm focus:border-slate-500 focus:outline-none"
                />
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
                  className="w-full border border-slate-300 rounded p-2 text-sm focus:border-slate-500 focus:outline-none resize-none"
                />
              </div>
            </div>
          </section>

          {/* Line Items */}
          <section>
            <div className="flex justify-between items-end border-b border-slate-200 pb-2 mb-4">
              <h2 className="text-lg font-serif text-slate-800">Paid Items</h2>
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
                      className="w-full border border-slate-300 rounded p-2 text-sm focus:border-slate-500 focus:outline-none"
                    />
                  </div>
                  <div className="w-16">
                    <input
                      type="number"
                      value={item.qty}
                      onChange={(e) => updateLineItem(item.id, 'qty', Number(e.target.value))}
                      className="w-full border border-slate-300 rounded p-2 text-sm focus:border-slate-500 focus:outline-none"
                    />
                  </div>
                  <div className="w-24">
                    <input
                      type="number"
                      value={item.rate}
                      onChange={(e) => updateLineItem(item.id, 'rate', Number(e.target.value))}
                      className="w-full border border-slate-300 rounded p-2 text-sm focus:border-slate-500 focus:outline-none"
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
                  <span>Total Paid</span>
                  <span>£{total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </section>

          {/* Payment and notes */}
          <section>
            <h2 className="text-lg font-serif text-slate-800 mb-4 border-b border-slate-200 pb-2">Notes & Attachments</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">Document Notes</label>
                <textarea
                  name="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={2}
                  className="w-full border border-slate-300 rounded p-2 text-sm focus:border-slate-500 focus:outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">Receipt Image (Optional)</label>
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
                    className="w-full border-2 border-dashed border-slate-300 rounded-lg p-6 flex flex-col items-center justify-center text-slate-400 hover:text-slate-600 hover:border-slate-400 transition-all group"
                  >
                    <Upload className="w-8 h-8 mb-2 group-hover:scale-110 transition-transform" />
                    <span className="text-sm font-medium">Upload scan or photo</span>
                    <span className="text-[10px] uppercase tracking-wider mt-1 opacity-60">JPG, PNG up to 5MB</span>
                  </button>
                ) : (
                  <div className="relative group">
                    <img 
                      src={receiptImage} 
                      alt="Uploaded receipt" 
                      className="w-full h-32 object-cover rounded-lg border border-slate-200"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="p-2 bg-white rounded-full text-slate-700 hover:text-black transition-colors"
                        title="Change image"
                      >
                        <ImageIcon className="w-4 h-4" />
                      </button>
                      <button
                        onClick={removeImage}
                        className="p-2 bg-white rounded-full text-red-500 hover:text-red-700 transition-colors"
                        title="Remove image"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>

        {/* Right Column: Preview */}
        <div className="flex-1 w-full lg:sticky lg:top-24 bg-slate-200/50 p-6 md:p-10 border border-slate-200 print:p-0 print:border-none print:bg-white print:static">
          <div id="receipt-preview" className="bg-white p-8 md:p-12 shadow-sm min-h-[842px] border border-slate-200 print:shadow-none print:border-none print:min-h-0 print:p-0">
            {/* Invoice Header */}
            <div className="flex justify-between items-start mb-16">
              <div>
                <h1 className="text-3xl font-serif text-slate-900 mb-4 tracking-tight">RECEIPT</h1>
                <div className="text-sm text-slate-600">{receiptDetails.receiptNumber}</div>
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
                <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Paid By</div>
                <div className="font-bold text-slate-900 mb-1">{parties.clientName}</div>
                <div className="whitespace-pre-wrap">{parties.clientAddress}</div>
                {parties.clientVat && <div className="mt-1">VAT: {parties.clientVat}</div>}
              </div>
              <div className="text-right text-sm text-slate-700 flex flex-col gap-2">
                <div className="flex justify-end gap-4"><span className="text-slate-400">Date Paid:</span> {receiptDetails.issueDate}</div>
                <div className="flex justify-end gap-4"><span className="text-slate-400">Method:</span> {receiptDetails.paymentMethod}</div>
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

              {/* Totals */}
              <div className="flex justify-end mt-6">
                <div className="w-64 text-sm">
                  <div className="flex justify-between py-2 text-slate-600">
                    <span>Subtotal</span>
                    <span>£{subtotal.toFixed(2)}</span>
                  </div>
                  {vatTreatment !== 'No VAT' && (
                    <div className="flex justify-between py-2 text-slate-600 border-b border-slate-200">
                      <span>{vatTreatment}</span>
                      <span>£{vatAmount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between py-4 text-lg font-bold text-slate-900 border-t border-slate-200 mt-2">
                    <span>Total Paid</span>
                    <span>£{total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer / Notes */}
            <div className={`grid ${receiptImage ? 'grid-cols-2' : 'grid-cols-1'} gap-8 text-sm mt-12 pt-12 border-t border-slate-100`}>
              <div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Notes</div>
                <div className="whitespace-pre-wrap text-slate-600">{notes}</div>
              </div>
              {receiptImage && (
                <div className="text-right flex flex-col items-end">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Reference Attachment</div>
                  <div className="border border-slate-200 p-1 rounded inline-block bg-slate-50">
                    <img src={receiptImage} alt="Receipt reference" className="max-h-32 rounded w-auto" />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-20 print:hidden">
        <div className="border-t border-slate-200 pt-10 mb-8 max-w-3xl">
          <h2 className="text-3xl font-serif text-slate-800 mb-4">UK Receipt generator</h2>
          <p className="text-slate-500 text-sm leading-relaxed">
            Record payments properly to keep your accounting paper trail secure. Essential for HMRC when accepting cash or non-invoiced payments.
          </p>
        </div>
        <ProFeaturesCTA />
      </div>
    </div>
  );
}
