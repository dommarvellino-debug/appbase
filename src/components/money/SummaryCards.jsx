import { ArrowDownLeft, ArrowUpRight, Wallet } from 'lucide-react';
import { useCurrency } from '@/contexts/CurrencyContext';

export default function SummaryCards({ income, spent }) {
  const { formatMoney: money } = useCurrency();
  const cards = [
    { label: 'Available', value: income - spent, icon: Wallet, style: 'bg-indigo-600 text-white', sub: 'Left this month' },
    { label: 'Income', value: income, icon: ArrowDownLeft, style: 'bg-white text-slate-900', sub: 'Money coming in' },
    { label: 'Spent', value: spent, icon: ArrowUpRight, style: 'bg-white text-slate-900', sub: 'Money going out' }
  ];
  return <div className="grid gap-4 md:grid-cols-3">{cards.map(({label,value,icon:Icon,style,sub}) => <div key={label} className={`rounded-3xl border border-slate-200/70 p-5 shadow-sm ${style}`}><div className="flex items-center justify-between"><span className="text-sm font-medium opacity-70">{label}</span><Icon size={19} className="opacity-70"/></div><p className="mt-5 text-3xl font-bold tracking-tight">{money(value)}</p><p className="mt-1 text-xs opacity-60">{sub}</p></div>)}</div>;
}