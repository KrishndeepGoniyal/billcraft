/**
 * Formatting and Financial Calculation Utilities for BillCraft
 */

export const formatCurrency = (amount = 0, currency = { symbol: '$', position: 'before' }) => {
  const num = Number(amount) || 0;
  const formattedNum = num.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  if (currency.position === 'after') {
    return `${formattedNum} ${currency.symbol}`;
  }
  return `${currency.symbol}${formattedNum}`;
};

export const calculateLineTotal = (item) => {
  const qty = Number(item.quantity) || 0;
  const rate = Number(item.rate) || 0;
  return qty * rate;
};

export const calculateSubtotal = (items = []) => {
  return items.reduce((sum, item) => sum + calculateLineTotal(item), 0);
};

export const calculateDiscount = (subtotal = 0, discountType = 'percentage', discountValue = 0) => {
  const val = Number(discountValue) || 0;
  if (val <= 0) return 0;
  
  if (discountType === 'percentage') {
    return (subtotal * val) / 100;
  }
  return Math.min(val, subtotal);
};

export const roundTo2 = (num) => Math.round((Number(num) + Number.EPSILON) * 100) / 100;

export const calculateTaxBreakdown = (taxableAmount = 0, { taxType, taxRate, gstType, gstRate }) => {
  const result = {
    taxType,
    taxRate: Number(taxRate) || 0,
    gstType,
    gstRate: Number(gstRate) || 0,
    totalTax: 0,
    cgstAmount: 0,
    sgstAmount: 0,
    igstAmount: 0,
    standardTaxAmount: 0,
  };

  if (taxType === 'standard') {
    const rate = Number(taxRate) || 0;
    const taxAmt = roundTo2((taxableAmount * rate) / 100);
    result.standardTaxAmount = taxAmt;
    result.totalTax = taxAmt;
  } else if (taxType === 'gst') {
    const rate = Number(gstRate) || 0;
    const totalGstAmt = roundTo2((taxableAmount * rate) / 100);
    result.totalTax = totalGstAmt;

    if (gstType === 'cgst_sgst') {
      const half = roundTo2(totalGstAmt / 2);
      result.cgstAmount = half;
      result.sgstAmount = half;
    } else {
      result.igstAmount = totalGstAmt;
    }
  }

  return result;
};

export const calculateInvoiceTotals = (invoiceData) => {
  const subtotal = roundTo2(calculateSubtotal(invoiceData.items || []));
  const discountAmount = roundTo2(calculateDiscount(
    subtotal,
    invoiceData.discountType,
    invoiceData.discountValue
  ));
  
  const taxableAmount = roundTo2(Math.max(0, subtotal - discountAmount));
  const taxBreakdown = calculateTaxBreakdown(taxableAmount, invoiceData);
  const shippingFee = roundTo2(Number(invoiceData.shippingFee) || 0);
  
  const grandTotal = roundTo2(taxableAmount + taxBreakdown.totalTax + shippingFee);

  return {
    subtotal,
    discountAmount,
    taxableAmount,
    taxBreakdown,
    shippingFee,
    grandTotal,
  };
};

export const formatDate = (dateStr) => {
  if (!dateStr) return '';
  try {
    const [year, month, day] = dateStr.split('-');
    if (!year || !month || !day) return dateStr;
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  } catch {
    return dateStr;
  }
};
