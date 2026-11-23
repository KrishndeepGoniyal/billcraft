import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { formatCurrency, formatDate, calculateInvoiceTotals, calculateLineTotal } from '../../../../utils/formatters';
import { getPaymentQrValue } from '../../../../utils/upi';

export const ClassicAgencyTemplate = ({ invoiceData }) => {
  const totals = calculateInvoiceTotals(invoiceData);
  const qrValue = getPaymentQrValue(invoiceData, totals.grandTotal);
  const isQuote = invoiceData.docType === 'quotation';

  return (
    <div className="p-8 sm:p-12 text-slate-800 bg-white font-serif text-[12px] leading-relaxed min-h-[1050px] flex flex-col justify-between border-8 border-slate-900 m-2">
      <div>
        {/* Formal Header */}
        <div className="border-b-2 border-slate-900 pb-6 mb-6">
          <div className="flex justify-between items-end">
            <div>
              {invoiceData.business?.logo ? (
                <img
                  src={invoiceData.business.logo}
                  alt="Company Logo"
                  className="max-h-14 max-w-[180px] object-contain mb-3"
                />
              ) : null}
              <h1 className="text-3xl font-bold uppercase tracking-wider text-slate-900 font-sans">
                {invoiceData.business?.name || 'Company Name'}
              </h1>
              <div className="text-slate-600 font-sans text-xs mt-1 whitespace-pre-line">
                {invoiceData.business?.address}
              </div>
              <div className="text-slate-600 font-sans text-xs mt-1">
                {invoiceData.business?.email} | {invoiceData.business?.phone}
              </div>
              {invoiceData.business?.taxId && (
                <div className="font-mono text-xs font-semibold text-slate-800 mt-1">
                  GSTIN / TAX REG: {invoiceData.business.taxId}
                </div>
              )}
            </div>

            <div className="text-right font-sans">
              <div className="text-2xl font-black uppercase tracking-widest text-slate-900">
                {isQuote ? 'OFFICIAL QUOTATION' : 'COMMERCIAL INVOICE'}
              </div>
              <table className="mt-3 border-collapse text-xs ml-auto text-left">
                <tbody>
                  <tr className="border border-slate-300">
                    <td className="bg-slate-100 font-bold px-3 py-1 text-slate-700">Document No.</td>
                    <td className="px-3 py-1 font-mono font-bold text-slate-900">{invoiceData.invoiceNumber}</td>
                  </tr>
                  <tr className="border border-slate-300">
                    <td className="bg-slate-100 font-bold px-3 py-1 text-slate-700">Date of Issue</td>
                    <td className="px-3 py-1">{formatDate(invoiceData.issueDate)}</td>
                  </tr>
                  <tr className="border border-slate-300">
                    <td className="bg-slate-100 font-bold px-3 py-1 text-slate-700">
                      {isQuote ? 'Valid Till' : 'Payment Due'}
                    </td>
                    <td className="px-3 py-1 font-semibold">{formatDate(invoiceData.dueDate)}</td>
                  </tr>
                  {invoiceData.referencePo && (
                    <tr className="border border-slate-300">
                      <td className="bg-slate-100 font-bold px-3 py-1 text-slate-700">P.O. Reference</td>
                      <td className="px-3 py-1 font-mono">{invoiceData.referencePo}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Bill To Grid */}
        <div className="border border-slate-900 mb-6 font-sans">
          <div className="bg-slate-900 text-white px-3 py-1 text-[11px] font-bold uppercase tracking-wider">
            {isQuote ? 'Quotation Prepared For' : 'Invoice Recipient Information'}
          </div>
          <div className="p-3 text-xs grid grid-cols-2 gap-4">
            <div>
              <div className="font-bold text-sm text-slate-900">{invoiceData.client?.name || 'Client Name'}</div>
              {invoiceData.client?.contactPerson && (
                <div className="text-slate-700 font-medium">Attn: {invoiceData.client.contactPerson}</div>
              )}
              <div className="text-slate-600 whitespace-pre-line mt-1">{invoiceData.client?.address}</div>
            </div>
            <div className="text-right text-slate-600 space-y-0.5">
              {invoiceData.client?.email && <div>Email: {invoiceData.client.email}</div>}
              {invoiceData.client?.phone && <div>Tel: {invoiceData.client.phone}</div>}
              {invoiceData.client?.taxId && (
                <div className="font-mono font-medium text-slate-800">Tax ID: {invoiceData.client.taxId}</div>
              )}
            </div>
          </div>
        </div>

        {/* Formal Table */}
        <div className="border border-slate-900 font-sans">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900 text-white text-[11px] uppercase tracking-wider">
                <th className="py-2 px-3 border-r border-slate-700 w-12 text-center">#</th>
                <th className="py-2 px-3 border-r border-slate-700">Particulars / Service Description</th>
                <th className="py-2 px-3 border-r border-slate-700 text-center w-20">Quantity</th>
                <th className="py-2 px-3 border-r border-slate-700 text-right w-28">Unit Rate</th>
                <th className="py-2 px-3 text-right w-32">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-300 text-xs">
              {invoiceData.items.map((item, idx) => (
                <tr key={item.id || idx} className="avoid-break">
                  <td className="py-2.5 px-3 text-center border-r border-slate-300 font-mono text-slate-500">
                    {idx + 1}
                  </td>
                  <td className="py-2.5 px-3 border-r border-slate-300">
                    <div className="font-bold text-slate-900">{item.name || 'Untitled Line Item'}</div>
                    {item.description && (
                      <div className="text-slate-600 text-[11px] mt-0.5 whitespace-pre-line">{item.description}</div>
                    )}
                  </td>
                  <td className="py-2.5 px-3 text-center border-r border-slate-300 font-mono">
                    {item.quantity}
                  </td>
                  <td className="py-2.5 px-3 text-right border-r border-slate-300 font-mono">
                    {formatCurrency(item.rate, invoiceData.currency)}
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono font-bold text-slate-900">
                    {formatCurrency(calculateLineTotal(item), invoiceData.currency)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Bottom Calculations */}
        <div className="totals-section avoid-break mt-4 flex justify-end font-sans">
          <table className="w-72 border border-slate-900 border-collapse text-xs">
            <tbody>
              <tr className="border-b border-slate-200">
                <td className="py-1.5 px-3 bg-slate-100 font-semibold text-slate-700">Sub Total</td>
                <td className="py-1.5 px-3 text-right font-mono font-medium text-slate-900">
                  {formatCurrency(totals.subtotal, invoiceData.currency)}
                </td>
              </tr>
              {totals.discountAmount > 0 && (
                <tr className="border-b border-slate-200 text-emerald-700 font-medium">
                  <td className="py-1.5 px-3 bg-slate-100">
                    Less Discount {invoiceData.discountType === 'percentage' ? `(${invoiceData.discountValue}%)` : ''}
                  </td>
                  <td className="py-1.5 px-3 text-right font-mono">
                    -{formatCurrency(totals.discountAmount, invoiceData.currency)}
                  </td>
                </tr>
              )}
              {invoiceData.taxType === 'standard' && (
                <tr className="border-b border-slate-200">
                  <td className="py-1.5 px-3 bg-slate-100 text-slate-700">Tax ({invoiceData.taxRate}%)</td>
                  <td className="py-1.5 px-3 text-right font-mono">
                    +{formatCurrency(totals.taxBreakdown.standardTaxAmount, invoiceData.currency)}
                  </td>
                </tr>
              )}
              {invoiceData.taxType === 'gst' && invoiceData.gstType === 'cgst_sgst' && (
                <>
                  <tr className="border-b border-slate-200">
                    <td className="py-1.5 px-3 bg-slate-100 text-slate-700">CGST ({invoiceData.gstRate / 2}%)</td>
                    <td className="py-1.5 px-3 text-right font-mono">
                      +{formatCurrency(totals.taxBreakdown.cgstAmount, invoiceData.currency)}
                    </td>
                  </tr>
                  <tr className="border-b border-slate-200">
                    <td className="py-1.5 px-3 bg-slate-100 text-slate-700">SGST ({invoiceData.gstRate / 2}%)</td>
                    <td className="py-1.5 px-3 text-right font-mono">
                      +{formatCurrency(totals.taxBreakdown.sgstAmount, invoiceData.currency)}
                    </td>
                  </tr>
                </>
              )}
              {invoiceData.taxType === 'gst' && invoiceData.gstType === 'igst' && (
                <tr className="border-b border-slate-200">
                  <td className="py-1.5 px-3 bg-slate-100 text-slate-700">IGST ({invoiceData.gstRate}%)</td>
                  <td className="py-1.5 px-3 text-right font-mono">
                    +{formatCurrency(totals.taxBreakdown.igstAmount, invoiceData.currency)}
                  </td>
                </tr>
              )}
              {totals.shippingFee > 0 && (
                <tr className="border-b border-slate-200">
                  <td className="py-1.5 px-3 bg-slate-100 text-slate-700">Shipping / Extra</td>
                  <td className="py-1.5 px-3 text-right font-mono">
                    +{formatCurrency(totals.shippingFee, invoiceData.currency)}
                  </td>
                </tr>
              )}
              <tr className="border-t-2 border-slate-900 bg-slate-100 font-bold text-sm">
                <td className="py-2 px-3 text-slate-900">Total Payable</td>
                <td className="py-2 px-3 text-right font-mono text-slate-900">
                  {formatCurrency(totals.grandTotal, invoiceData.currency)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer with Signature and Stamp zone */}
      <div className="qr-section avoid-break border-t-2 border-slate-900 pt-6 mt-6 font-sans">
        <div className="grid grid-cols-12 gap-6 items-end">
          <div className="col-span-7 text-xs space-y-2">
            {invoiceData.bankDetails?.accountNumber && (
              <div className="border border-slate-300 p-2 text-[11px] leading-tight">
                <span className="font-bold block mb-1">Remittance Instructions:</span>
                <div>Bank: {invoiceData.bankDetails.bankName}</div>
                <div>A/C Name: {invoiceData.bankDetails.accountName}</div>
                <div>A/C No: <span className="font-mono font-bold">{invoiceData.bankDetails.accountNumber}</span></div>
                {invoiceData.bankDetails.routingNumber && (
                  <div>IFSC/Routing: <span className="font-mono">{invoiceData.bankDetails.routingNumber}</span></div>
                )}
              </div>
            )}
            {invoiceData.terms && (
              <p className="text-[10px] text-slate-500 leading-normal">{invoiceData.terms}</p>
            )}
          </div>

          <div className="col-span-5 flex justify-end gap-4 items-end">
            {invoiceData.enableQrCode && qrValue && (
              <div className="flex flex-col items-center border border-slate-300 p-2 shrink-0">
                <QRCodeSVG value={qrValue} size={76} level="M" />
                <span className="text-[9px] font-bold uppercase mt-1">Scan to Pay</span>
              </div>
            )}

            <div className="w-36 text-center border-t border-slate-900 pt-1 shrink-0">
              <div className="h-10"></div>
              <span className="text-[10px] font-bold uppercase tracking-wider block text-slate-700">
                Authorized Signatory
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
