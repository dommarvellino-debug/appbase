import { createContext, useContext, useEffect, useState } from 'react';
import { base44 } from '@/api/base44Client';
import { formatMoney as fmt } from '@/lib/currency';

const CurrencyContext = createContext({ currency: 'USD', setCurrency: () => {}, formatMoney: v => fmt(v, 'USD') });

export function CurrencyProvider({ children }) {
  const [currency, setCurrency] = useState('USD');
  useEffect(() => {
    base44.auth.me().then(u => { if (u.currency) setCurrency(u.currency); }).catch(() => {});
  }, []);
  const formatMoney = (value) => fmt(value, currency);
  return <CurrencyContext.Provider value={{ currency, setCurrency, formatMoney }}>{children}</CurrencyContext.Provider>;
}

export const useCurrency = () => useContext(CurrencyContext);