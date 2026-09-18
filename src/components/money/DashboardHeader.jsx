import { Plus } from 'lucide-react';
import Logo from '@/components/Logo';

export default function DashboardHeader({ onAdd }) {
  return <header className="flex items-start justify-between gap-4">
    <div><div className="mb-4 flex items-center gap-2 font-bold lg:hidden"><Logo className="h-9 w-9"/>Mowise</div><p className="text-sm font-semibold text-indigo-600">MY MONEY</p><h1 className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">Make every dollar count.</h1><p className="mt-2 text-slate-500">Your monthly finances, made simple.</p></div>
    <button onClick={onAdd} className="mt-1 flex shrink-0 items-center gap-2 rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/10 transition hover:-translate-y-0.5 hover:bg-indigo-600"><Plus size={18}/><span className="hidden sm:inline">Add transaction</span></button>
  </header>;
}