import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { formatCurrency, formatDate, calculateInvoiceTotals, calculateLineTotal } from '../../../../utils/formatters';
import { getPaymentQrValue } from '../../../../utils/upi';

export const MinimalistTemplate = ({ invoiceData }) => {
  const totals = calculateInvoiceTotals(invoiceData);
  const qrValue = getPaymentQrValue(invoiceData, totals.grandTotal);
  const isQuote = invoiceData.docType === 'quotation';

  return (
    <div className="p-8 sm:p-12 text-slate-800 bg-white font-sans text-[13px] leading-relaxed min-h-[1050px] flex flex-col justify-between">
      <div>
        {/* Top Header */}
        <div className="flex justify-between items-start border-b border-slate-200 pb-8">
          <div>
            {invoiceData.business?.logo ? (
              <img
                src={invoiceData.business.logo}
                alt="Logo"
                className="max-h-14 max-w-[180px] object-contain mb-3"
              />
            ) : null}
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              {invoiceData.business?.name || 'Your Company'}
            </h1>
            <div className="text-slate-500 whitespace-pre-line mt-1 text-xs">
              {invoiceData.business?.address}
            </div>
            {invoiceData.business?.email && (
              <div className="text-slate-500 text-xs mt-0.5">{invoiceData.business.email}</div>
            )}
            {invoiceData.business?.phone && (
              <div className="text-slate-500 text-xs">{invoiceData.business.phone}</div>
            )}
            {invoiceData.business?.taxId && (
              <div className="text-slate-600 text-xs font-mono font-medium mt-1">
                Tax ID / GSTIN: {invoiceData.business.taxId}
              </div>
            )}
          </div>

          <div className="text-right">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
              {isQuote ? 'Quotation' : 'Tax Invoice'}
            </span>
            <div className="text-xl font-bold text-slate-900 font-mono mt-0.5">
              {invoiceData.invoiceNumber}
            </div>
            {invoiceData.referencePo && (
              <div className="text-xs text-slate-500 mt-1">
                Ref PO: <span className="font-mono">{invoiceData.referencePo}</span>
              </div>
            )}
            <div className="mt-3 text-xs space-y-1">
              <div>
                <span className="text-slate-400">Issued: </span>
                <span className="font-medium text-slate-700">{formatDate(invoiceData.issueDate)}</span>
              </div>
              <div>
                <span className="text-slate-400">{isQuote ? 'Valid Until: ' : 'Due Date: '}</span>
                <span className="font-medium text-slate-700">{formatDate(invoiceData.dueDate)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bill To */}
        <div className="grid grid-cols-2 gap-8 my-8 text-xs">
          <div>
            <span className="uppercase text-[11px] font-semibold tracking-wider text-slate-400 block mb-1.5">
              {isQuote ? 'Prepared For' : 'Billed To'}
            </span>
            <div className="font-bold text-sm text-slate-900">
              {invoiceData.client?.name || 'Client Name'}
            </div>
            {invoiceData.client?.contactPerson && (
              <div className="text-slate-600">{invoiceData.client.contactPerson}</div>
            )}
            <div className="text-slate-500 whitespace-pre-line mt-1">
              {invoiceData.client?.address}
            </div>
            {invoiceData.client?.email && (
              <div className="text-slate-500 mt-0.5">{invoiceData.client.email}</div>
            )}
            {invoiceData.client?.taxId && (
              <div className="text-slate-600 font-mono mt-1 font-medium">
                Client Tax ID: {invoiceData.client.taxId}
              </div>
            )}
          </div>
        </div>

        {/* Items Table */}
        <div className="mt-6">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-300 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                <th className="py-2.5 w-1/2">Description</th>
                <th className="py-2.5 text-center w-20">Qty / Hrs</th>
                <th className="py-2.5 text-right w-28">Rate</th>
                <th className="py-2.5 text-right w-28">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {invoiceData.items.map((item, idx) => (
                <tr key={item.id || idx} className="avoid-break">
                  <td className="py-3 pr-4">
                    <div className="font-semibold text-slate-900">{item.name || 'Untitled Item'}</div>
                    {item.description && (
                      <div className="text-slate-500 text-[11px] mt-0.5 leading-snug whitespace-pre-line">
                        {item.description}
                      </div>
                    )}
                  </td>
                  <td className="py-3 text-center text-slate-700 font-mono">{item.quantity}</td>
                  <td className="py-3 text-right text-slate-700 font-mono">
                    {formatCurrency(item.rate, invoiceData.currency)}
                  </td>
                  <td className="py-3 text-right font-medium text-slate-900 font-mono">
                    {formatCurrency(calculateLineTotal(item), invoiceData.currency)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totals Section */}
        <div className="mt-6 flex justify-end border-t border-slate-200 pt-4">
          <div className="w-72 space-y-2 text-xs">
            <div className="flex justify-between text-slate-600">
              <span>Subtotal</span>
              <span className="font-mono text-slate-900">
                {formatCurrency(totals.subtotal, invoiceData.currency)}
              </span>
            </div>

            {totals.discountAmount > 0 && (
              <div className="flex justify-between text-emerald-600">
                <span>
                  Discount {invoiceData.discountType === 'percentage' ? `(${invoiceData.discountValue}%)` : ''}
                </span>
                <span className="font-mono">
                  -{formatCurrency(totals.discountAmount, invoiceData.currency)}
                </span>
              </div>
            )}

            {invoiceData.taxType === 'standard' && (
              <div className="flex justify-between text-slate-600">
                <span>Tax ({invoiceData.taxRate}%)</span>
                <span className="font-mono text-slate-900">
                  +{formatCurrency(totals.taxBreakdown.standardTaxAmount, invoiceData.currency)}
                </span>
              </div>
            )}

            {invoiceData.taxType === 'gst' && invoiceData.gstType === 'cgst_sgst' && (
              <>
                <div className="flex justify-between text-slate-600">
                  <span>CGST ({invoiceData.gstRate / 2}%)</span>
                  <span className="font-mono text-slate-900">
                    +{formatCurrency(totals.taxBreakdown.cgstAmount, invoiceData.currency)}
                  </span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>SGST ({invoiceData.gstRate / 2}%)</span>
                  <span className="font-mono text-slate-900">
                    +{formatCurrency(totals.taxBreakdown.sgstAmount, invoiceData.currency)}
                  </span>
                </div>
              </>
            )}

            {invoiceData.taxType === 'gst' && invoiceData.gstType === 'igst' && (
              <div className="flex justify-between text-slate-600">
                <span>IGST ({invoiceData.gstRate}%)</span>
                <span className="font-mono text-slate-900">
                  +{formatCurrency(totals.taxBreakdown.igstAmount, invoiceData.currency)}
                </span>
              </div>
            )}

            {totals.shippingFee > 0 && (
              <div className="flex justify-between text-slate-600">
                <span>Shipping / Extra</span>
                <span className="font-mono text-slate-900">
                  +{formatCurrency(totals.shippingFee, invoiceData.currency)}
                </span>
              </div>
            )}

            <div className="border-t border-slate-300 pt-2 flex justify-between font-bold text-sm text-slate-900">
              <span>Total Due</span>
              <span className="font-mono">
                {formatCurrency(totals.grandTotal, invoiceData.currency)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer / Payment & Notes */}
      <div className="border-t border-slate-200 pt-6 mt-8">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-6">
          <div className="flex-1 text-xs space-y-3">
            {invoiceData.notes && (
              <div>
                <span className="font-semibold text-slate-700 block mb-0.5">Notes:</span>
                <p className="text-slate-500 whitespace-pre-line">{invoiceData.notes}</p>
              </div>
            )}

            {invoiceData.terms && (
              <div>
                <span className="font-semibold text-slate-700 block mb-0.5">Terms & Conditions:</span>
                <p className="text-slate-500 whitespace-pre-line text-[11px]">{invoiceData.terms}</p>
              </div>
            )}

            {invoiceData.paymentMethod === 'bank' && invoiceData.bankDetails?.accountNumber && (
              <div className="bg-slate-50 p-2.5 rounded border border-slate-200/80 text-[11px] leading-relaxed">
                <span className="font-semibold text-slate-800 block mb-1">Direct Bank Wire:</span>
                <div>Bank: <span className="font-medium text-slate-700">{invoiceData.bankDetails.bankName}</span></div>
                <div>Account Name: <span className="font-medium text-slate-700">{invoiceData.bankDetails.accountName}</span></div>
                <div>A/C Number: <span className="font-mono font-medium text-slate-900">{invoiceData.bankDetails.accountNumber}</span></div>
                {invoiceData.bankDetails.routingNumber && (
                  <div>IFSC / Routing: <span className="font-mono font-medium text-slate-900">{invoiceData.bankDetails.routingNumber}</span></div>
                )}
                {invoiceData.bankDetails.swiftBic && (
                  <div>SWIFT / BIC: <span className="font-mono font-medium text-slate-900">{invoiceData.bankDetails.swiftBic}</span></div>
                )}
              </div>
            )}
          </div>

          {/* QR Code Container */}
          {invoiceData.enableQrCode && qrValue && (
            <div className="flex flex-col items-center justify-center p-3 rounded-lg border border-slate-200 bg-slate-50 shrink-0">
              <QRCodeSVG
                value={qrValue}
                size={88}
                level="M"
                includeMargin={false}
              />
              <span className="text-[10px] font-semibold text-slate-600 mt-1.5 uppercase tracking-wide">
                {invoiceData.qrType === 'url' ? 'Scan to Pay' : 'Scan via UPI'}
              </span>
              {invoiceData.qrType === 'upi' && invoiceData.upiDetails?.upiId && (
                <span className="text-[9px] font-mono text-slate-500 mt-0.5 max-w-[100px] truncate text-center">
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
