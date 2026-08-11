import { CurrencyCode, CurrencyConfig } from './types';

export const CURRENCIES: Record<CurrencyCode, CurrencyConfig> = {
  USD: { code: 'USD', symbol: '$', name: 'US Dollar', rateToUSD: 1 },
  INR: { code: 'INR', symbol: '₹', name: 'Indian Rupee', rateToUSD: 83.25 },
  EUR: { code: 'EUR', symbol: '€', name: 'Euro', rateToUSD: 0.92 },
  GBP: { code: 'GBP', symbol: '£', name: 'British Pound', rateToUSD: 0.78 },
  AED: { code: 'AED', symbol: 'AED ', name: 'UAE Dirham', rateToUSD: 3.67 },
};

export function convertFromUSD(amountInUSD: number, targetCurrency: CurrencyCode): number {
  const config = CURRENCIES[targetCurrency] || CURRENCIES.USD;
  return amountInUSD * config.rateToUSD;
}

export function formatCurrency(
  amountInUSD: number,
  currency: CurrencyCode = 'USD',
  decimals = 2
): string {
  const config = CURRENCIES[currency] || CURRENCIES.USD;
  const converted = amountInUSD * config.rateToUSD;

  // INR uses Indian numbering system formatting if needed, or standard locale
  let formattedNumber = '';
  if (currency === 'INR') {
    formattedNumber = new Intl.NumberFormat('en-IN', {
      maximumFractionDigits: decimals,
      minimumFractionDigits: decimals,
    }).format(converted);
  } else {
    formattedNumber = new Intl.NumberFormat('en-US', {
      maximumFractionDigits: decimals,
      minimumFractionDigits: decimals,
    }).format(converted);
  }

  return `${config.symbol}${formattedNumber}`;
}

export function formatNumber(val: number, decimals = 2): string {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(val);
}
