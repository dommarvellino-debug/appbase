import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { COUNTRIES } from '@/lib/currency';
import { Search } from 'lucide-react';

export default function CountryStep({ value, onChange }) {
  const [search, setSearch] = useState('');
  const selected = COUNTRIES.find(c => c.code === value.country);
  const filtered = COUNTRIES.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.currency.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="grid gap-4">
      <AnimatePresence>
        {selected && (
          <motion.div initial={{ opacity: 0, y: 10, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, scale: 0.97 }} className="flex items-center gap-4 rounded-2xl bg-gradient-to-br from-indigo-50 to-violet-50 p-5">
            <motion.span initial={{ rotate: -20 }} animate={{ rotate: 0 }} className="text-4xl">{selected.flag}</motion.span>
            <div>
              <p className="font-bold">{selected.name}</p>
              <p className="text-sm text-slate-500">Currency: {selected.currency}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20}/>
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search country or currency..."
          className="w-full rounded-2xl border border-slate-200 bg-white py-4 pl-12 pr-4 text-base outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50"
        />
      </div>

      <div className="grid max-h-72 grid-cols-2 gap-2 overflow-y-auto pr-1">
        {filtered.map(c => {
          const isSelected = value.country === c.code;
          return (
            <motion.button
              key={c.code}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onChange({ ...value, country: c.code })}
              className={`flex items-center gap-2.5 rounded-xl border-2 p-3 text-left transition-colors ${isSelected ? 'border-indigo-500 bg-indigo-50' : 'border-slate-200 bg-white'}`}
            >
              <span className="text-2xl">{c.flag}</span>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">{c.name}</p>
                <p className="text-xs text-slate-400">{c.currency}</p>
              </div>
            </motion.button>
          );
        })}
        {filtered.length === 0 && (
          <p className="col-span-2 py-8 text-center text-sm text-slate-400">No countries found</p>
        )}
      </div>
    </div>
  );
}