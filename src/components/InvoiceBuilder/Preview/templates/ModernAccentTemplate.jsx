import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { formatCurrency, formatDate, calculateInvoiceTotals, calculateLineTotal } from '../../../../utils/formatters';
import { getPaymentQrValue } from '../../../../utils/upi';
import { ACCENT_COLORS } from '../../../../constants/templates';

export const ModernAccentTemplate = ({ invoiceData }) => {
  const totals = calculateInvoiceTotals(invoiceData);
  const qrValue = getPaymentQrValue(invoiceData, totals.grandTotal);
  const isQuote = invoiceData.docType === 'quotation';

  // Get active accent color
  const activeColor = ACCENT_COLORS.find((c) => c.id === invoiceData.accentColor) || ACCENT_COLORS[0];

  return (
    <div className="text-slate-800 bg-white font-sans text-[13px] leading-relaxed min-h-[1050px] flex flex-col justify-between">
      <div>
        {/* Top Accent Color Bar */}
        <div style={{ backgroundColor: activeColor.hex }} className="h-3 w-full" />

        <div className="p-8 sm:p-12 pb-6">
          {/* Header Row */}
          <div className="flex justify-between items-start">
            <div className="max-w-[55%]">
              {invoiceData.business?.logo ? (
                <img
                  src={invoiceData.business.logo}
                  alt="Company Logo"
                  className="max-h-16 max-w-[200px] object-contain mb-3"
                />
              ) : null}
              <h1 className="text-2xl font-black tracking-tight text-slate-900">
                {invoiceData.business?.name || 'Apex Studio Labs'}
              </h1>
              <div className="text-slate-500 whitespace-pre-line text-xs mt-1 leading-normal">
                {invoiceData.business?.address}
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500 mt-2">
                {invoiceData.business?.email && <div>{invoiceData.business.email}</div>}
                {invoiceData.business?.phone && <div>{invoiceData.business.phone}</div>}
              </div>
              {invoiceData.business?.taxId && (
                <div className="text-xs font-mono font-semibold text-slate-700 mt-1">
                  Tax ID: {invoiceData.business.taxId}
                </div>
              )}
            </div>

            <div className="text-right">
              <span
                style={{ backgroundColor: `${activeColor.hex}15`, color: activeColor.hex }}
                className="inline-block px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider mb-2"
              >
                {isQuote ? 'Quotation' : 'Invoice'}
              </span>
              <div className="text-2xl font-extrabold text-slate-900 font-mono tracking-tight">
                #{invoiceData.invoiceNumber}
              </div>
              
              <div className="mt-4 space-y-1 text-xs">
                <div className="flex justify-end gap-3">
                  <span className="text-slate-400">Issue Date:</span>
                  <span className="font-semibold text-slate-800">{formatDate(invoiceData.issueDate)}</span>
                </div>
                <div className="flex justify-end gap-3">
                  <span className="text-slate-400">{isQuote ? 'Expiry Date:' : 'Due Date:'}</span>
                  <span className="font-semibold text-slate-800">{formatDate(invoiceData.dueDate)}</span>
                </div>
                {invoiceData.referencePo && (
                  <div className="flex justify-end gap-3">
                    <span className="text-slate-400">P.O. Reference:</span>
                    <span className="font-mono font-medium text-slate-800">{invoiceData.referencePo}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Client & Billing Info Card */}
          <div className="mt-8 p-4 rounded-xl bg-slate-50 border border-slate-200/80 grid grid-cols-2 gap-6 text-xs">
            <div>
              <div
                style={{ color: activeColor.hex }}
                className="uppercase text-[11px] font-bold tracking-wider mb-1"
              >
                {isQuote ? 'Quotation Recipient' : 'Invoice Recipient'}
              </div>
              <div className="font-bold text-sm text-slate-900">
                {invoiceData.client?.name || 'Client Name'}
              </div>
              {invoiceData.client?.contactPerson && (
                <div className="text-slate-700 font-medium">{invoiceData.client.contactPerson}</div>
              )}
              <div className="text-slate-500 whitespace-pre-line mt-1">
                {invoiceData.client?.address}
              </div>
            </div>

            <div className="flex flex-col justify-center text-slate-600 space-y-1 border-l border-slate-200 pl-6">
              {invoiceData.client?.email && (
                <div>
                  <span className="text-slate-400">Email: </span>
                  <span className="font-medium text-slate-800">{invoiceData.client.email}</span>
                </div>
              )}
              {invoiceData.client?.phone && (
                <div>
                  <span className="text-slate-400">Phone: </span>
                  <span className="font-medium text-slate-800">{invoiceData.client.phone}</span>
                </div>
              )}
              {invoiceData.client?.taxId && (
                <div>
                  <span className="text-slate-400">Tax ID / GST: </span>
                  <span className="font-mono font-medium text-slate-800">{invoiceData.client.taxId}</span>
                </div>
              )}
              <div>
                <span className="text-slate-400">Status: </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-slate-200 text-slate-800">
                  {invoiceData.status || 'Draft'}
                </span>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="mt-8 overflow-hidden rounded-lg border border-slate-200">
            <table className="w-full text-left">
              <thead>
                <tr
                  style={{ backgroundColor: `${activeColor.hex}10` }}
                  className="text-[11px] font-bold uppercase tracking-wider text-slate-700 border-b border-slate-200"
                >
                  <th className="py-3 px-4">Item Details</th>
                  <th className="py-3 px-3 text-center w-20">Qty</th>
                  <th className="py-3 px-4 text-right w-28">Rate</th>
                  <th className="py-3 px-4 text-right w-28">Line Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {invoiceData.items.map((item, idx) => (
                  <tr key={item.id || idx} className="hover:bg-slate-50/60 transition-colors avoid-break">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900">{item.name || 'Untitled Line Item'}</div>
                      {item.description && (
                        <div className="text-slate-500 text-[11px] mt-0.5 leading-snug whitespace-pre-line">
                          {item.description}
                        </div>
                      )}
                    </td>
                    <td className="py-3.5 px-3 text-center font-mono font-medium text-slate-700">
                      {item.quantity}
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono text-slate-700">
                      {formatCurrency(item.rate, invoiceData.currency)}
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono font-bold text-slate-900">
                      {formatCurrency(calculateLineTotal(item), invoiceData.currency)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals Section */}
          <div className="totals-section avoid-break mt-6 flex justify-end">
            <div className="w-80 space-y-2 text-xs">
              <div className="flex justify-between text-slate-600 px-2">
                <span>Subtotal</span>
                <span className="font-mono font-medium text-slate-900">
                  {formatCurrency(totals.subtotal, invoiceData.currency)}
                </span>
              </div>

              {totals.discountAmount > 0 && (
                <div className="flex justify-between text-emerald-600 px-2 font-medium">
                  <span>
                    Discount {invoiceData.discountType === 'percentage' ? `(${invoiceData.discountValue}%)` : ''}
                  </span>
                  <span className="font-mono">
                    -{formatCurrency(totals.discountAmount, invoiceData.currency)}
                  </span>
                </div>
              )}

              {invoiceData.taxType === 'standard' && (
                <div className="flex justify-between text-slate-600 px-2">
                  <span>Tax ({invoiceData.taxRate}%)</span>
                  <span className="font-mono text-slate-900">
                    +{formatCurrency(totals.taxBreakdown.standardTaxAmount, invoiceData.currency)}
                  </span>
                </div>
              )}

              {invoiceData.taxType === 'gst' && invoiceData.gstType === 'cgst_sgst' && (
                <>
                  <div className="flex justify-between text-slate-600 px-2">
                    <span>CGST ({invoiceData.gstRate / 2}%)</span>
                    <span className="font-mono text-slate-900">
                      +{formatCurrency(totals.taxBreakdown.cgstAmount, invoiceData.currency)}
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-600 px-2">
                    <span>SGST ({invoiceData.gstRate / 2}%)</span>
                    <span className="font-mono text-slate-900">
                      +{formatCurrency(totals.taxBreakdown.sgstAmount, invoiceData.currency)}
                    </span>
                  </div>
                </>
              )}

              {invoiceData.taxType === 'gst' && invoiceData.gstType === 'igst' && (
                <div className="flex justify-between text-slate-600 px-2">
                  <span>IGST ({invoiceData.gstRate}%)</span>
                  <span className="font-mono text-slate-900">
                    +{formatCurrency(totals.taxBreakdown.igstAmount, invoiceData.currency)}
                  </span>
                </div>
              )}

              {totals.shippingFee > 0 && (
                <div className="flex justify-between text-slate-600 px-2">
                  <span>Shipping & Handling</span>
                  <span className="font-mono text-slate-900">
                    +{formatCurrency(totals.shippingFee, invoiceData.currency)}
                  </span>
                </div>
              )}

              {/* Grand Total Pill Box */}
              <div
                style={{ backgroundColor: activeColor.hex }}
                className="p-3.5 rounded-xl text-white flex justify-between items-center shadow-sm"
              >
                <span className="font-bold text-xs uppercase tracking-wider">Total Amount Due</span>
                <span className="font-extrabold font-mono text-base tracking-tight">
                  {formatCurrency(totals.grandTotal, invoiceData.currency)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modern Footer with Banking & QR Code */}
      <div className="qr-section avoid-break p-8 sm:p-12 pt-0 mt-6">
        <div className="p-5 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row justify-between items-start gap-6">
          <div className="flex-1 text-xs space-y-2">
            {invoiceData.notes && (
              <div>
                <span className="font-bold text-slate-800 block mb-0.5">Special Instructions:</span>
                <p className="text-slate-600 whitespace-pre-line leading-relaxed">{invoiceData.notes}</p>
              </div>
            )}

            {invoiceData.paymentMethod === 'bank' && invoiceData.bankDetails?.accountNumber && (
              <div className="pt-2 text-[11px] text-slate-600 border-t border-slate-200/80">
                <span className="font-bold text-slate-800 block mb-1">Direct Deposit Bank Details:</span>
                <div className="grid grid-cols-2 gap-x-4 gap-y-0.5">
                  <div>Bank: <span className="font-medium text-slate-900">{invoiceData.bankDetails.bankName}</span></div>
                  <div>Name: <span className="font-medium text-slate-900">{invoiceData.bankDetails.accountName}</span></div>
                  <div>Account: <span className="font-mono font-medium text-slate-900">{invoiceData.bankDetails.accountNumber}</span></div>
                  {invoiceData.bankDetails.routingNumber && (
                    <div>Routing: <span className="font-mono font-medium text-slate-900">{invoiceData.bankDetails.routingNumber}</span></div>
                  )}
                </div>
              </div>
            )}

            {invoiceData.terms && (
              <p className="text-[10px] text-slate-400 italic pt-1">{invoiceData.terms}</p>
            )}
          </div>

          {/* QR Code */}
          {invoiceData.enableQrCode && qrValue && (
            <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-white border border-slate-200 shadow-sm shrink-0">
              <QRCodeSVG
                value={qrValue}
                size={88}
                level="M"
                includeMargin={false}
              />
              <span className="text-[10px] font-bold text-slate-700 mt-2 uppercase tracking-wide">
                {invoiceData.qrType === 'url' ? 'Scan & Pay Link' : 'Scan to Pay (UPI)'}
              </span>
              {invoiceData.qrType === 'upi' && invoiceData.upiDetails?.upiId && (
                <span className="text-[9px] font-mono text-slate-500 mt-0.5 max-w-[110px] truncate">
                  {invoiceData.upiDetails.upiId}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
