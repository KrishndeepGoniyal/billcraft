/**
 * UPI & QR Code URL builder for instant client-side payment generation
 */

export const generateUpiUri = ({
  upiId,
  payeeName,
  amount,
  currency = 'INR',
  invoiceNumber = '',
  note = '',
}) => {
  if (!upiId) return '';

  const cleanUpiId = encodeURIComponent(upiId.trim());
  const cleanPayee = encodeURIComponent((payeeName || 'Freelance Service').trim());
  const cleanNote = encodeURIComponent(
    (note || `Invoice ${invoiceNumber || 'Payment'}`).trim()
  );
  
  // Format amount to 2 decimal places if provided
  let amountParam = '';
  if (amount && Number(amount) > 0) {
    amountParam = `&am=${Number(amount).toFixed(2)}`;
  }

  // Standard NPCI UPI URI Scheme
  return `upi://pay?pa=${cleanUpiId}&pn=${cleanPayee}&cu=${currency || 'INR'}${amountParam}&tn=${cleanNote}`;
};

export const getPaymentQrValue = (invoiceData, totalAmount) => {
  if (!invoiceData.enableQrCode) return '';

  if (invoiceData.qrType === 'url') {
    return invoiceData.paymentUrl?.trim() || '';
  }

  // Default to UPI
  const { upiDetails, invoiceNumber, currency } = invoiceData;
  return generateUpiUri({
    upiId: upiDetails?.upiId,
    payeeName: upiDetails?.payeeName,
    amount: totalAmount,
    currency: currency?.code === 'INR' ? 'INR' : 'INR', // UPI standard
    invoiceNumber,
    note: `Invoice ${invoiceNumber}`,
  });
};
