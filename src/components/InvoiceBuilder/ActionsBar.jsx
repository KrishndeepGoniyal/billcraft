import React, { useState } from 'react';
import { Download, Printer, Save, Copy, RotateCcw, Plus, Loader2 } from 'lucide-react';
import { generatePdfFromElement, triggerBrowserPrint } from '../../utils/pdfGenerator';
import { useInvoice } from '../../context/InvoiceContext';

export const ActionsBar = () => {
  const {
    invoiceData,
    saveInvoice,
    duplicateInvoice,
    resetToDefaults,
    createNewBlank,
    showToast,
  } = useInvoice();

  const [isExporting, setIsExporting] = useState(false);
  const [progressMsg, setProgressMsg] = useState('');

  const handleDownloadPdf = async () => {
    try {
      setIsExporting(true);
      const filename = `${invoiceData.docType === 'quotation' ? 'Quotation' : 'Invoice'}-${
        invoiceData.invoiceNumber || 'draft'
      }.pdf`;

      await generatePdfFromElement('invoice-printable', filename, (percent, msg) => {
        setProgressMsg(msg);
      });

      showToast(`Exported "${filename}" successfully!`, 'success');
    } catch (err) {
      console.error(err);
      showToast('Failed to export PDF. Try using native Print button instead.', 'error');
    } finally {
      setIsExporting(false);
      setProgressMsg('');
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 p-3 sm:px-6 flex flex-wrap items-center justify-between gap-3 no-print transition-colors">
      {/* Primary Actions */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Download PDF */}
        <button
          type="button"
          onClick={handleDownloadPdf}
          disabled={isExporting}
          className="bg-sky-600 hover:bg-sky-500 disabled:bg-sky-800 text-white font-semibold text-xs px-4 py-2 rounded-xl flex items-center gap-2 shadow-lg shadow-sky-600/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
          title="Download sharp A4 vector-like PDF"
          aria-label="Download PDF"
        >
          {isExporting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>{progressMsg || 'Generating PDF...'}</span>
            </>
          ) : (
            <>
              <Download className="w-4 h-4" />
              <span>Download PDF</span>
            </>
          )}
        </button>

        {/* Print / Native PDF */}
        <button
          type="button"
          onClick={triggerBrowserPrint}
          className="bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white font-medium text-xs px-3.5 py-2 rounded-xl flex items-center gap-1.5 border border-slate-200 dark:border-slate-700/80 transition-colors"
          title="Print or Save via Chrome/Safari/Firefox Print dialog"
          aria-label="Print invoice"
        >
          <Printer className="w-3.5 h-3.5" />
          <span>Print</span>
        </button>

        {/* Save to History */}
        <button
          type="button"
          onClick={() => saveInvoice(invoiceData.status || 'Draft')}
          className="bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-600/20 dark:hover:bg-emerald-600/30 text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 border border-emerald-300 dark:border-emerald-500/30 font-medium text-xs px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition-colors"
          title="Save draft to local history"
          aria-label="Save draft"
        >
          <Save className="w-3.5 h-3.5" />
          <span>Save Draft</span>
        </button>
      </div>

      {/* Secondary Tools */}
      <div className="flex items-center gap-1.5">
        {/* Duplicate */}
        <button
          type="button"
          onClick={() => duplicateInvoice(invoiceData)}
          className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 p-2 rounded-lg text-xs flex items-center gap-1 transition-colors"
          title="Duplicate this invoice with next invoice number"
          aria-label="Duplicate invoice"
        >
          <Copy className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Duplicate</span>
        </button>

        {/* New Blank */}
        <button
          type="button"
          onClick={createNewBlank}
          className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 p-2 rounded-lg text-xs flex items-center gap-1 transition-colors"
          title="Start fresh with a blank document"
          aria-label="Create new blank invoice"
        >
          <Plus className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">New Blank</span>
        </button>

        {/* Reset to sample */}
        <button
          type="button"
          onClick={resetToDefaults}
          className="text-slate-600 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-500/10 p-2 rounded-lg text-xs flex items-center gap-1 transition-colors"
          title="Reset to sample demo data"
          aria-label="Reset invoice"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Reset</span>
        </button>
      </div>
    </div>
  );
};
