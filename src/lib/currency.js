export const COUNTRIES = [
  { code: 'US', name: 'United States', currency: 'USD', flag: '🇺🇸' },
  { code: 'GB', name: 'United Kingdom', currency: 'GBP', flag: '🇬🇧' },
  { code: 'DE', name: 'Germany', currency: 'EUR', flag: '🇩🇪' },
  { code: 'FR', name: 'France', currency: 'EUR', flag: '🇫🇷' },
  { code: 'ES', name: 'Spain', currency: 'EUR', flag: '🇪🇸' },
  { code: 'IT', name: 'Italy', currency: 'EUR', flag: '🇮🇹' },
  { code: 'NL', name: 'Netherlands', currency: 'EUR', flag: '🇳🇱' },
  { code: 'JP', name: 'Japan', currency: 'JPY', flag: '🇯🇵' },
  { code: 'CN', name: 'China', currency: 'CNY', flag: '🇨🇳' },
  { code: 'IN', name: 'India', currency: 'INR', flag: '🇮🇳' },
  { code: 'ID', name: 'Indonesia', currency: 'IDR', flag: '🇮🇩' },
  { code: 'PH', name: 'Philippines', currency: 'PHP', flag: '🇵🇭' },
  { code: 'TH', name: 'Thailand', currency: 'THB', flag: '🇹🇭' },
  { code: 'VN', name: 'Vietnam', currency: 'VND', flag: '🇻🇳' },
  { code: 'MY', name: 'Malaysia', currency: 'MYR', flag: '🇲🇾' },
  { code: 'SG', name: 'Singapore', currency: 'SGD', flag: '🇸🇬' },
  { code: 'KR', name: 'South Korea', currency: 'KRW', flag: '🇰🇷' },
  { code: 'AU', name: 'Australia', currency: 'AUD', flag: '🇦🇺' },
  { code: 'CA', name: 'Canada', currency: 'CAD', flag: '🇨🇦' },
  { code: 'BR', name: 'Brazil', currency: 'BRL', flag: '🇧🇷' },
  { code: 'MX', name: 'Mexico', currency: 'MXN', flag: '🇲🇽' },
  { code: 'NG', name: 'Nigeria', currency: 'NGN', flag: '🇳🇬' },
  { code: 'ZA', name: 'South Africa', currency: 'ZAR', flag: '🇿🇦' },
  { code: 'EG', name: 'Egypt', currency: 'EGP', flag: '🇪🇬' },
  { code: 'TR', name: 'Turkey', currency: 'TRY', flag: '🇹🇷' },
  { code: 'SA', name: 'Saudi Arabia', currency: 'SAR', flag: '🇸🇦' },
  { code: 'AE', name: 'UAE', currency: 'AED', flag: '🇦🇪' },
  { code: 'PK', name: 'Pakistan', currency: 'PKR', flag: '🇵🇰' },
  { code: 'BD', name: 'Bangladesh', currency: 'BDT', flag: '🇧🇩' },
  { code: 'CO', name: 'Colombia', currency: 'COP', flag: '🇨🇴' },
  { code: 'AR', name: 'Argentina', currency: 'ARS', flag: '🇦🇷' },
  { code: 'KE', name: 'Kenya', currency: 'KES', flag: '🇰🇪' },
  { code: 'GH', name: 'Ghana', currency: 'GHS', flag: '🇬🇭' },
  { code: 'NZ', name: 'New Zealand', currency: 'NZD', flag: '🇳🇿' },
  { code: 'SE', name: 'Sweden', currency: 'SEK', flag: '🇸🇪' },
  { code: 'NO', name: 'Norway', currency: 'NOK', flag: '🇳🇴' },
  { code: 'CH', name: 'Switzerland', currency: 'CHF', flag: '🇨🇭' },
  { code: 'PL', name: 'Poland', currency: 'PLN', flag: '🇵🇱' },
];

export function formatMoney(value, currencyCode = 'USD') {
  try {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: currencyCode, maximumFractionDigits: 0 }).format(value || 0);
  } catch {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value || 0);
  }
}

export function getCurrencyForCountry(countryCode) {
  return COUNTRIES.find(c => c.code === countryCode)?.currency || 'USD';
}