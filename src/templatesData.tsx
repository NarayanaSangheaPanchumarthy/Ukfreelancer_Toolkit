import React from 'react';
import { TemplateData } from './TemplateDetails';

export const templatesData: Record<string, TemplateData> = {
  'vat-invoice': {
    id: 'vat-invoice',
    tag: 'FREE UK VAT INVOICE TEMPLATE',
    title: 'Free UK VAT Invoice Template',
    description: 'Use this template when you are VAT registered and need VAT shown clearly.',
    whenToUse: 'Use this template when you are VAT registered and need VAT shown clearly. If you need calculations, VAT handling, or a finished document, use the live tool instead.',
    liveTool: 'Invoices',
    liveToolName: 'live invoice generator',
    previewContent: (
      <div className="text-sm text-slate-700">
        <div className="flex justify-between items-start mb-16">
          <h1 className="text-4xl font-serif text-slate-900 leading-tight w-1/2">VAT INVOICE<br/>TEMPLATE</h1>
          <div className="text-right">
            <div className="font-bold text-slate-900 mb-1">Your Business Name</div>
            <div className="whitespace-pre-wrap">Your address{'\n'}United Kingdom</div>
          </div>
        </div>
        
        <div className="mb-16">
          <div className="text-slate-900 mb-8">DOC-001</div>
          <div className="flex justify-between items-start">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-[#a67c52] mb-2">CLIENT</div>
              <div className="font-bold text-slate-900 mb-1">Client Name</div>
              <div className="whitespace-pre-wrap">Client address{'\n'}United Kingdom</div>
            </div>
            <div className="text-right flex flex-col gap-2">
              <div className="flex justify-end gap-4"><span className="text-slate-500">Issue date:</span> YYYY-MM-DD</div>
              <div className="flex justify-end gap-4"><span className="text-slate-500">Reference:</span> _________</div>
            </div>
          </div>
        </div>

        <table className="w-full text-sm text-slate-700 mb-12">
          <thead>
            <tr className="border-b border-slate-200">
              <th className="text-left font-bold text-[10px] uppercase tracking-widest text-slate-500 pb-3">Description</th>
              <th className="text-right font-bold text-[10px] uppercase tracking-widest text-slate-500 pb-3 w-16">Qty</th>
              <th className="text-right font-bold text-[10px] uppercase tracking-widest text-slate-500 pb-3 w-24">Rate</th>
              <th className="text-right font-bold text-[10px] uppercase tracking-widest text-slate-500 pb-3 w-28">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            <tr>
              <td className="py-4">Service description</td>
              <td className="py-4 text-right">1</td>
              <td className="py-4 text-right">£0.00</td>
              <td className="py-4 text-right">£0.00</td>
            </tr>
            <tr>
              <td className="py-4">Additional work</td>
              <td className="py-4 text-right">1</td>
              <td className="py-4 text-right">£0.00</td>
              <td className="py-4 text-right">£0.00</td>
            </tr>
          </tbody>
        </table>

        <div className="flex justify-end mt-6">
          <div className="w-64 text-sm">
            <div className="flex justify-between py-2 text-slate-600">
              <span>Subtotal</span>
              <span>£0.00</span>
            </div>
            <div className="flex justify-between py-2 text-slate-600 border-b border-slate-200">
              <span>VAT</span>
              <span>£0.00</span>
            </div>
            <div className="flex justify-between py-4 text-lg font-bold text-slate-900 border-t border-slate-200 mt-2">
              <span>Total</span>
              <span>£0.00</span>
            </div>
          </div>
        </div>
      </div>
    )
  },
  'quote': {
    id: 'quote',
    tag: 'FREELANCE QUOTE GENERATOR UK',
    title: 'Free Freelance Quote Template UK',
    description: 'Use this before work starts to confirm scope, pricing, and validity dates.',
    whenToUse: 'Use a quote or estimate to set clear expectations before a project begins. If you want to automatically calculate totals, generate PDFs, and save your details, try the live quote generator tool.',
    liveTool: 'Quotes',
    liveToolName: 'live quote generator',
    previewContent: (
      <div className="text-sm text-slate-700">
        <div className="flex justify-between items-start mb-16">
          <h1 className="text-4xl font-serif text-slate-900 leading-tight w-1/2">FREELANCE<br/>QUOTE</h1>
          <div className="text-right">
            <div className="font-bold text-slate-900 mb-1">Your Business Name</div>
            <div className="whitespace-pre-wrap">Your address{'\n'}United Kingdom</div>
          </div>
        </div>
        
        <div className="mb-16">
          <div className="text-slate-900 mb-8">QTE-001</div>
          <div className="flex justify-between items-start">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-[#a67c52] mb-2">CLIENT</div>
              <div className="font-bold text-slate-900 mb-1">Client Name</div>
              <div className="whitespace-pre-wrap">Client address{'\n'}United Kingdom</div>
            </div>
            <div className="text-right flex flex-col gap-2">
              <div className="flex justify-end gap-4"><span className="text-slate-500">Issue date:</span> YYYY-MM-DD</div>
              <div className="flex justify-end gap-4"><span className="text-slate-500">Valid until:</span> YYYY-MM-DD</div>
            </div>
          </div>
        </div>

        <table className="w-full text-sm text-slate-700 mb-12">
          <thead>
            <tr className="border-b border-slate-200">
              <th className="text-left font-bold text-[10px] uppercase tracking-widest text-slate-500 pb-3">Description</th>
              <th className="text-right font-bold text-[10px] uppercase tracking-widest text-slate-500 pb-3 w-16">Qty</th>
              <th className="text-right font-bold text-[10px] uppercase tracking-widest text-slate-500 pb-3 w-24">Rate</th>
              <th className="text-right font-bold text-[10px] uppercase tracking-widest text-slate-500 pb-3 w-28">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            <tr>
              <td className="py-4">Project phase 1</td>
              <td className="py-4 text-right">1</td>
              <td className="py-4 text-right">£0.00</td>
              <td className="py-4 text-right">£0.00</td>
            </tr>
          </tbody>
        </table>

        <div className="flex justify-end mt-6">
          <div className="w-64 text-sm">
            <div className="flex justify-between py-2 text-slate-600">
              <span>Subtotal</span>
              <span>£0.00</span>
            </div>
            <div className="flex justify-between py-4 text-lg font-bold text-slate-900 border-t border-slate-200 mt-2">
              <span>Total</span>
              <span>£0.00</span>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-slate-200">
          <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">TERMS & CONDITIONS</div>
          <p className="text-slate-600 text-xs">Standard terms and conditions apply. Quote is valid for 30 days.</p>
        </div>
      </div>
    )
  },
  'invoice': {
    id: 'invoice',
    tag: 'SELF-EMPLOYED INVOICE TEMPLATE UK',
    title: 'Self-Employed Invoice Template UK',
    description: 'A clean invoice template for sole traders and independent UK service providers.',
    whenToUse: 'This template is perfect for sole traders who are not legally registered for VAT. If you want to avoid manual math and easily produce PDF invoices, the live invoice generator is recommended.',
    liveTool: 'Invoices',
    liveToolName: 'live invoice generator',
    previewContent: (
      <div className="text-sm text-slate-700">
        <div className="flex justify-between items-start mb-16">
          <h1 className="text-4xl font-serif text-slate-900 leading-tight w-1/2">INVOICE</h1>
          <div className="text-right">
            <div className="font-bold text-slate-900 mb-1">Your Business Name</div>
            <div className="whitespace-pre-wrap">Your address{'\n'}United Kingdom</div>
          </div>
        </div>
        
        <div className="mb-16">
          <div className="text-slate-900 mb-8">INV-001</div>
          <div className="flex justify-between items-start">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-[#a67c52] mb-2">CLIENT</div>
              <div className="font-bold text-slate-900 mb-1">Client Name</div>
              <div className="whitespace-pre-wrap">Client address{'\n'}United Kingdom</div>
            </div>
            <div className="text-right flex flex-col gap-2">
              <div className="flex justify-end gap-4"><span className="text-slate-500">Issue date:</span> YYYY-MM-DD</div>
              <div className="flex justify-end gap-4"><span className="text-slate-500">Due date:</span> YYYY-MM-DD</div>
            </div>
          </div>
        </div>

        <table className="w-full text-sm text-slate-700 mb-12">
          <thead>
            <tr className="border-b border-slate-200">
              <th className="text-left font-bold text-[10px] uppercase tracking-widest text-slate-500 pb-3">Description</th>
              <th className="text-right font-bold text-[10px] uppercase tracking-widest text-slate-500 pb-3 w-16">Qty</th>
              <th className="text-right font-bold text-[10px] uppercase tracking-widest text-slate-500 pb-3 w-24">Rate</th>
              <th className="text-right font-bold text-[10px] uppercase tracking-widest text-slate-500 pb-3 w-28">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            <tr>
              <td className="py-4">Services rendered</td>
              <td className="py-4 text-right">1</td>
              <td className="py-4 text-right">£0.00</td>
              <td className="py-4 text-right">£0.00</td>
            </tr>
          </tbody>
        </table>

        <div className="flex justify-end mt-6">
          <div className="w-64 text-sm">
            <div className="flex justify-between py-2 text-slate-600">
              <span>Subtotal</span>
              <span>£0.00</span>
            </div>
            <div className="flex justify-between py-4 text-lg font-bold text-slate-900 border-t border-slate-200 mt-2">
              <span>Total</span>
              <span>£0.00</span>
            </div>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-slate-200">
          <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">PAYMENT DETAILS</div>
          <p className="text-slate-600 text-xs">Bank: _________<br/>Account Name: _________<br/>Sort Code: __-__-__<br/>Account Number: _________</p>
        </div>
      </div>
    )
  },
  'receipt': {
    id: 'receipt',
    tag: 'RECEIPT GENERATOR UK',
    title: 'Receipt Template UK',
    description: 'Use this after payment to give clients a concise proof of payment.',
    whenToUse: 'Issue a receipt when a client has paid their invoice, or paid a deposit upfront. For an automated process that exports cleanly to PDF, use the live receipt generator tool.',
    liveTool: 'Receipts',
    liveToolName: 'live receipt generator',
    previewContent: (
      <div className="text-sm text-slate-700">
        <div className="flex justify-between items-start mb-16">
          <h1 className="text-4xl font-serif text-slate-900 leading-tight w-1/2">PAYMENT<br/>RECEIPT</h1>
          <div className="text-right">
            <div className="font-bold text-slate-900 mb-1">Your Business Name</div>
            <div className="whitespace-pre-wrap">Your address{'\n'}United Kingdom</div>
          </div>
        </div>
        
        <div className="mb-16">
          <div className="text-slate-900 mb-8">RCT-001</div>
          <div className="flex justify-between items-start">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-[#a67c52] mb-2">RECEIVED FROM</div>
              <div className="font-bold text-slate-900 mb-1">Client Name</div>
              <div className="whitespace-pre-wrap">Client address{'\n'}United Kingdom</div>
            </div>
            <div className="text-right flex flex-col gap-2">
              <div className="flex justify-end gap-4"><span className="text-slate-500">Payment date:</span> YYYY-MM-DD</div>
              <div className="flex justify-end gap-4"><span className="text-slate-500">Payment method:</span> _________</div>
            </div>
          </div>
        </div>

        <table className="w-full text-sm text-slate-700 mb-12">
          <thead>
            <tr className="border-b border-slate-200">
              <th className="text-left font-bold text-[10px] uppercase tracking-widest text-slate-500 pb-3">Payment for</th>
              <th className="text-right font-bold text-[10px] uppercase tracking-widest text-slate-500 pb-3 w-28">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            <tr>
              <td className="py-4">Invoice INV-001</td>
              <td className="py-4 text-right">£0.00</td>
            </tr>
          </tbody>
        </table>

        <div className="flex justify-end mt-6">
          <div className="w-64 text-sm border-t border-slate-200 pt-6">
            <div className="flex justify-between items-center bg-emerald-50 text-emerald-800 p-4 border border-emerald-200">
              <span className="font-bold">Total Paid</span>
              <span className="text-lg font-bold">£0.00</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
};
