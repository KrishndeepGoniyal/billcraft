export const CURRENCIES = [
  { code: 'USD', symbol: '$', name: 'US Dollar (USD)', position: 'before' },
  { code: 'INR', symbol: '₹', name: 'Indian Rupee (INR)', position: 'before' },
  { code: 'EUR', symbol: '€', name: 'Euro (EUR)', position: 'before' },
  { code: 'GBP', symbol: '£', name: 'British Pound (GBP)', position: 'before' },
  { code: 'CAD', symbol: 'CA$', name: 'Canadian Dollar (CAD)', position: 'before' },
  { code: 'AUD', symbol: 'AU$', name: 'Australian Dollar (AUD)', position: 'before' },
  { code: 'SGD', symbol: 'SG$', name: 'Singapore Dollar (SGD)', position: 'before' },
  { code: 'AED', symbol: 'AED ', name: 'UAE Dirham (AED)', position: 'before' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen (JPY)', position: 'before' },
];

export const DEFAULT_CURRENCY = CURRENCIES[0]; // USD default, easy 1-click toggle to INR
