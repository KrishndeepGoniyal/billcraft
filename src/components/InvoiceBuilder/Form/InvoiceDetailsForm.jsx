import React from 'react';
import { Calendar, Hash, RefreshCw, FileSpreadsheet, DollarSign } from 'lucide-react';
import { CURRENCIES } from '../../../constants/currencies';
import { useInvoice } from '../../../context/InvoiceContext';

export const InvoiceDetailsForm = ({ invoiceData, onUpdate }) => {
  const { getNextInvoiceNumber } = useInvoice();

  const handleDocTypeChange = (type) => {
    const prefix = type === 'quotation' ? 'QUO' : 'INV';
    onUpdate({
      docType: type,
      invoiceNumber: getNextInvoiceNumber(prefix),
    });
  };

  const handleAutoNumber = () => {
    const prefix = invoiceData.docType === 'quotation' ? 'QUO' : 'INV';
    onUpdate({ invoiceNumber: getNextInvoiceNumber(prefix) });
  };

  const handleCurrencyChange = (e) => {
    const code = e.target.value;
    const selected = CURRENCIES.find((c) => c.code === code) || CURRENCIES[0];
    onUpdate({ currency: selected });
  };

  return (
    <div className="space-y-4">
      {/* Document Type Selector (Invoice vs Quotation) */}
      <div>
        <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5 uppercase tracking-wider">
          Document Type
        </label>
        <div className="grid grid-cols-2 gap-2 bg-slate-100 dark:bg-slate-900 p-1 rounded-xl border border-slate-200 dark:border-slate-800 transition-colors">
          <button
            type="button"
            onClick={() => handleDocTypeChange('invoice')}
            className={`py-2 px-3 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-2 ${
              invoiceData.docType === 'invoice'
                ? 'bg-sky-600 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            Tax Invoice
          </button>
          <button
            type="button"
            onClick={() => handleDocTypeChange('quotation')}
            className={`py-2 px-3 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-2 ${
              invoiceData.docType === 'quotation'
                ? 'bg-sky-600 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            Project Quotation / Estimate
          </button>
        </div>
      </div>

      {/* Invoice Number & Auto-generate */}
      <div>
        <div className="flex justify-between items-center mb-1">
          <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">
            {invoiceData.docType === 'quotation' ? 'Quotation #' : 'Invoice #'}
          </label>
          <button
            type="button"
            onClick={handleAutoNumber}
            className="text-[11px] text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 flex items-center gap-1 transition-colors"
            title="Auto-increment document number"
          >
            <RefreshCw className="w-3 h-3" />
            Auto-generate
          </button>
        </div>
        <div className="relative">
          <Hash className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3 top-3" />
          <input
            type="text"
            value={invoiceData.invoiceNumber || ''}
            onChange={(e) => onUpdate({ invoiceNumber: e.target.value })}
            placeholder="INV-2026-001"
            className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:border-sky-500 rounded-lg pl-9 pr-3 py-2 text-sm font-mono text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none transition-colors"
          />
        </div>
      </div>

      {/* Currency Selector */}
      <div>
        <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
          Currency ({invoiceData.currency?.symbol})
        </label>
        <div className="relative">
          <DollarSign className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3 top-3" />
          <select
            value={invoiceData.currency?.code || 'USD'}
            onChange={handleCurrencyChange}
            className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:border-sky-500 rounded-lg pl-9 pr-3 py-2 text-sm text-slate-900 dark:text-slate-100 focus:outline-none transition-colors"
          >
            {CURRENCIES.map((c) => (
              <option key={c.code} value={c.code}>
                {c.code} — {c.name} ({c.symbol})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Dates: Issue Date & Due Date */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
            Issue Date
          </label>
          <div className="relative">
            <Calendar className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3 top-3" />
            <input
              type="date"
              value={invoiceData.issueDate || ''}
              onChange={(e) => onUpdate({ issueDate: e.target.value })}
              className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:border-sky-500 rounded-lg pl-9 pr-3 py-2 text-sm text-slate-900 dark:text-slate-100 focus:outline-none transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
            {invoiceData.docType === 'quotation' ? 'Expiry Date' : 'Payment Due Date'}
          </label>
          <div className="relative">
            <Calendar className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3 top-3" />
            <input
              type="date"
              value={invoiceData.dueDate || ''}
              onChange={(e) => onUpdate({ dueDate: e.target.value })}
              className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:border-sky-500 rounded-lg pl-9 pr-3 py-2 text-sm text-slate-900 dark:text-slate-100 focus:outline-none transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Reference PO */}
      <div>
        <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
          Purchase Order / Reference # (Optional)
        </label>
        <input
          type="text"
          value={invoiceData.referencePo || ''}
          onChange={(e) => onUpdate({ referencePo: e.target.value })}
          placeholder="e.g. PO-7890"
          className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:border-sky-500 rounded-lg px-3 py-2 text-sm font-mono text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none transition-colors"
        />
      </div>
    </div>
  );
};
