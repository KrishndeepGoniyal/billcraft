import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { QrCode, Landmark, FileText, CheckCircle2 } from 'lucide-react';
import { getPaymentQrValue } from '../../../utils/upi';
import { calculateInvoiceTotals } from '../../../utils/formatters';

export const PaymentDetailsForm = ({ invoiceData, onUpdate }) => {
  const { paymentMethod, bankDetails, enableQrCode, qrType, upiDetails, paymentUrl, notes, terms } = invoiceData;
  const totals = calculateInvoiceTotals(invoiceData);
  const liveQrValue = getPaymentQrValue(invoiceData, totals.grandTotal);

  const updateBankDetails = (field, value) => {
    onUpdate({
      bankDetails: {
        ...bankDetails,
        [field]: value,
      },
    });
  };

  const updateUpiDetails = (field, value) => {
    onUpdate({
      upiDetails: {
        ...upiDetails,
        [field]: value,
      },
    });
  };

  return (
    <div className="space-y-5">
      {/* QR Code Payment Generator Section */}
      <div className="p-4 bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-xl space-y-3 transition-colors">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-slate-800 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <QrCode className="w-4 h-4 text-sky-600 dark:text-sky-400" />
            Client-Side Payment QR Code
          </label>
          <label className="relative inline-flex items-center cursor-pointer" aria-label="Toggle QR Code">
            <input
              type="checkbox"
              checked={enableQrCode}
              onChange={(e) => onUpdate({ enableQrCode: e.target.checked })}
              className="sr-only peer"
            />
            <div className="w-9 h-5 bg-slate-300 dark:bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-sky-600"></div>
          </label>
        </div>

        {enableQrCode && (
          <div className="space-y-3 pt-2 border-t border-slate-200 dark:border-slate-800">
            {/* QR Type Selection */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => onUpdate({ qrType: 'upi' })}
                className={`py-1.5 px-3 rounded-lg border font-medium transition-all ${
                  qrType === 'upi'
                    ? 'border-sky-500 bg-sky-50 dark:bg-sky-950/30 text-sky-800 dark:text-sky-300'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-600 dark:text-slate-400'
                }`}
              >
                UPI ID (India)
              </button>
              <button
                type="button"
                onClick={() => onUpdate({ qrType: 'url' })}
                className={`py-1.5 px-3 rounded-lg border font-medium transition-all ${
                  qrType === 'url'
                    ? 'border-sky-500 bg-sky-50 dark:bg-sky-950/30 text-sky-800 dark:text-sky-300'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-600 dark:text-slate-400'
                }`}
              >
                Custom Payment Link URL
              </button>
            </div>

            {/* UPI Inputs */}
            {qrType === 'upi' ? (
              <div className="space-y-2.5">
                <div>
                  <label className="block text-xs text-slate-600 dark:text-slate-400 mb-1">
                    UPI ID / VPA (e.g. yourname@oksbi, user@paytm) *
                  </label>
                  <input
                    type="text"
                    value={upiDetails?.upiId || ''}
                    onChange={(e) => updateUpiDetails('upiId', e.target.value)}
                    placeholder="freelancer@okhdfcbank"
                    className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-sky-500 rounded-lg px-3 py-1.5 text-sm font-mono text-slate-900 dark:text-slate-100 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-600 dark:text-slate-400 mb-1">
                    Payee / Beneficiary Name
                  </label>
                  <input
                    type="text"
                    value={upiDetails?.payeeName || ''}
                    onChange={(e) => updateUpiDetails('payeeName', e.target.value)}
                    placeholder="Your Name or Business Legal Name"
                    className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-sky-500 rounded-lg px-3 py-1.5 text-sm text-slate-900 dark:text-slate-100 focus:outline-none"
                  />
                </div>
              </div>
            ) : (
              <div>
                <label className="block text-xs text-slate-600 dark:text-slate-400 mb-1">
                  Payment Link URL (Stripe, Razorpay, PayPal, Wise) *
                </label>
                <input
                  type="url"
                  value={paymentUrl || ''}
                  onChange={(e) => onUpdate({ paymentUrl: e.target.value })}
                  placeholder="https://buy.stripe.com/... or https://paypal.me/..."
                  className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-sky-500 rounded-lg px-3 py-1.5 text-sm text-slate-900 dark:text-slate-100 focus:outline-none"
                />
              </div>
            )}

            {/* Mini preview */}
            {liveQrValue && (
              <div className="flex items-center gap-3 p-2 bg-white dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800/80">
                <div className="bg-white p-1 rounded border border-slate-200 dark:border-transparent">
                  <QRCodeSVG value={liveQrValue} size={48} level="M" />
                </div>
                <div className="text-[11px] text-slate-600 dark:text-slate-400 truncate">
                  <div className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    QR ready to render
                  </div>
                  <div className="truncate font-mono text-[10px] text-slate-500">{liveQrValue}</div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bank Account Details */}
      <div className="p-4 bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-xl space-y-3 transition-colors">
        <label className="block text-xs font-semibold text-slate-800 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
          <Landmark className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          Bank Wire / Direct Deposit Details
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs text-slate-600 dark:text-slate-400 mb-1">Bank Name</label>
            <input
              type="text"
              value={bankDetails?.bankName || ''}
              onChange={(e) => updateBankDetails('bankName', e.target.value)}
              placeholder="e.g. HDFC Bank or Chase"
              className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-sky-500 rounded-lg px-3 py-1.5 text-sm text-slate-900 dark:text-slate-100 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs text-slate-600 dark:text-slate-400 mb-1">Account Holder Name</label>
            <input
              type="text"
              value={bankDetails?.accountName || ''}
              onChange={(e) => updateBankDetails('accountName', e.target.value)}
              placeholder="Account legal name"
              className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-sky-500 rounded-lg px-3 py-1.5 text-sm text-slate-900 dark:text-slate-100 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs text-slate-600 dark:text-slate-400 mb-1">Account Number / IBAN</label>
            <input
              type="text"
              value={bankDetails?.accountNumber || ''}
              onChange={(e) => updateBankDetails('accountNumber', e.target.value)}
              placeholder="987654321098"
              className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-sky-500 rounded-lg px-3 py-1.5 text-sm font-mono text-slate-900 dark:text-slate-100 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs text-slate-600 dark:text-slate-400 mb-1">IFSC / Routing Number</label>
            <input
              type="text"
              value={bankDetails?.routingNumber || ''}
              onChange={(e) => updateBankDetails('routingNumber', e.target.value)}
              placeholder="HDFC0001234 or ROUT-121"
              className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-sky-500 rounded-lg px-3 py-1.5 text-sm font-mono text-slate-900 dark:text-slate-100 focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs text-slate-600 dark:text-slate-400 mb-1">SWIFT / BIC (for International Wires)</label>
          <input
            type="text"
            value={bankDetails?.swiftBic || ''}
            onChange={(e) => updateBankDetails('swiftBic', e.target.value)}
            placeholder="HDFCINBB or CHASUS33"
            className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-sky-500 rounded-lg px-3 py-1.5 text-sm font-mono text-slate-900 dark:text-slate-100 focus:outline-none"
          />
        </div>
      </div>

      {/* Notes & Terms */}
      <div className="p-4 bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-xl space-y-3 transition-colors">
        <label className="block text-xs font-semibold text-slate-800 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
          <FileText className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          Notes & Terms of Service
        </label>

        <div>
          <label className="block text-xs text-slate-600 dark:text-slate-400 mb-1">Notes / Instructions</label>
          <textarea
            rows={2}
            value={notes || ''}
            onChange={(e) => onUpdate({ notes: e.target.value })}
            placeholder="Thank you for your business! Please include the invoice number on your payment receipt."
            className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-sky-500 rounded-lg px-3 py-2 text-xs text-slate-900 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs text-slate-600 dark:text-slate-400 mb-1">Terms & Conditions</label>
          <textarea
            rows={2}
            value={terms || ''}
            onChange={(e) => onUpdate({ terms: e.target.value })}
            placeholder="Payment is due within 14 calendar days. Late payments are subject to a 1.5% fee per month."
            className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-sky-500 rounded-lg px-3 py-2 text-xs text-slate-900 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
};
