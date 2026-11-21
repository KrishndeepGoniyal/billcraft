export const getTodayDateString = () => {
  const today = new Date();
  return today.toISOString().split('T')[0];
};

export const getDueDateString = (daysAhead = 14) => {
  const target = new Date();
  target.setDate(target.getDate() + daysAhead);
  return target.toISOString().split('T')[0];
};

export const DEFAULT_INVOICE_DATA = {
  id: 'draft-default',
  docType: 'invoice', // 'invoice' | 'quotation'
  invoiceNumber: 'INV-2026-001',
  referencePo: 'PO-99421',
  issueDate: getTodayDateString(),
  dueDate: getDueDateString(14),
  status: 'Draft', // 'Draft' | 'Sent' | 'Paid'
  
  // Business Info
  business: {
    name: 'Apex Studio Labs',
    email: 'billing@apexstudio.io',
    phone: '+1 (555) 234-5678',
    website: 'https://apexstudio.io',
    address: '100 Innovation Way, Suite 400\nSan Francisco, CA 94107',
    taxId: 'US-EIN-987654321', // GSTIN or Tax ID
    logo: '', // Base64 data URI
  },

  // Client Info
  client: {
    name: 'Acme Corporation',
    contactPerson: 'Sarah Jenkins',
    email: 'sarah@acmecorp.com',
    phone: '+1 (555) 876-5432',
    address: '742 Evergreen Blvd, Floor 12\nNew York, NY 10001',
    taxId: 'ACME-NY-88219',
  },

  // Currency
  currency: {
    code: 'USD',
    symbol: '$',
    name: 'US Dollar (USD)',
    position: 'before'
  },

  // Line Items
  items: [
    {
      id: 'item-1',
      name: 'Full-Stack Web App Development',
      description: 'Custom React & Tailwind dashboard with zero-backend architecture',
      quantity: 40,
      rate: 85,
    },
    {
      id: 'item-2',
      name: 'UI/UX Design Systems & Interactive Prototypes',
      description: 'Figma components library, mobile design flows, and export assets',
      quantity: 16,
      rate: 75,
    },
    {
      id: 'item-3',
      name: 'Cloud Infrastructure & High-Availability CI/CD',
      description: 'Automated build pipeline, SSL configuration, and domain routing',
      quantity: 6,
      rate: 110,
    }
  ],

  // Tax & Discount
  taxType: 'standard', // 'none' | 'standard' | 'gst'
  taxRate: 8.5,        // Standard Tax % (e.g. VAT or Sales Tax)
  gstType: 'cgst_sgst', // 'cgst_sgst' (split 50/50) | 'igst' (full)
  gstRate: 18,         // GST % (e.g. 18% in India)
  
  discountType: 'percentage', // 'percentage' | 'flat'
  discountValue: 5,           // 5% or flat amount
  shippingFee: 0,

  // Payment Details & QR Code
  paymentMethod: 'bank', // 'bank' | 'upi' | 'custom'
  bankDetails: {
    bankName: 'Silicon Valley Bank / JPMorgan Chase',
    accountName: 'Apex Studio Labs LLC',
    accountNumber: '987654321098',
    routingNumber: 'ROUT-121000358',
    swiftBic: 'CHASUS33',
  },
  
  // UPI QR & Payment link options
  enableQrCode: true,
  qrType: 'upi', // 'upi' | 'url'
  upiDetails: {
    upiId: 'apexstudio@oksbi',
    payeeName: 'Apex Studio Labs',
  },
  paymentUrl: 'https://buy.stripe.com/demo-billcraft-invoice',

  // Notes & Terms
  notes: 'Thank you for your business! Please quote the invoice number on your payment transfer.',
  terms: 'Payment is due within 14 calendar days from the date of issue. Late payments will incur a 1.5% compounding fee per month.',
  
  // Customization
  template: 'modern', // 'modern' | 'minimalist' | 'classic'
  accentColor: 'sky',  // 'sky' | 'indigo' | 'emerald' | 'rose' | 'amber' | 'slate'
};
