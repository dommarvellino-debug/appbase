import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';

const WALLETS = [
  { name: 'PayPal', gradient: 'from-blue-500 to-blue-700' },
  { name: 'Venmo', gradient: 'from-cyan-400 to-blue-500' },
  { name: 'Cash App', gradient: 'from-green-500 to-green-600' },
  { name: 'Wise', gradient: 'from-teal-400 to-emerald-500' },
  { name: 'Revolut', gradient: 'from-indigo-500 to-violet-600' },
  { name: 'Apple Pay', gradient: 'from-slate-700 to-slate-900' },
  { name: 'Google Pay', gradient: 'from-blue-500 to-emerald-500' },
  { name: 'Samsung Pay', gradient: 'from-blue-600 to-indigo-700' },
  { name: 'Paytm', gradient: 'from-sky-500 to-blue-600' },
  { name: 'PhonePe', gradient: 'from-purple-500 to-indigo-600' },
  { name: 'Amazon Pay', gradient: 'from-orange-400 to-amber-500' },
  { name: 'GCash', gradient: 'from-blue-500 to-teal-500' },
  { name: 'Maya', gradient: 'from-green-400 to-emerald-500' },
  { name: 'GoPay', gradient: 'from-green-500 to-emerald-600' },
  { name: 'OVO', gradient: 'from-purple-500 to-violet-600' },
  { name: 'DANA', gradient: 'from-blue-500 to-cyan-600' },
  { name: 'ShopeePay', gradient: 'from-orange-500 to-red-500' },
  { name: 'TrueMoney', gradient: 'from-yellow-400 to-orange-500' },
  { name: 'GrabPay', gradient: 'from-green-500 to-green-600' },
  { name: 'Alipay', gradient: 'from-blue-400 to-blue-600' },
  { name: 'WeChat Pay', gradient: 'from-green-400 to-green-600' },
  { name: 'Line Pay', gradient: 'from-green-400 to-green-500' },
  { name: 'PayNow', gradient: 'from-blue-500 to-purple-600' },
  { name: 'PromptPay', gradient: 'from-blue-500 to-indigo-600' },
  { name: 'MoMo', gradient: 'from-pink-500 to-rose-600' },
  { name: 'ZaloPay', gradient: 'from-blue-500 to-cyan-600' },
  { name: 'MPesa', gradient: 'from-green-500 to-emerald-600' },
  { name: 'Airtel Money', gradient: 'from-red-500 to-rose-600' },
  { name: 'MTN Mobile Money', gradient: 'from-yellow-400 to-amber-500' },
];

export default function WalletStep({ value, onChange }) {
  const selected = value.preferred_wallets ? value.preferred_wallets.split(',').filter(Boolean) : [];
  const toggle = (wallet) => {
    const next = selected.includes(wallet) ? selected.filter(w => w !== wallet) : [...selected, wallet];
    onChange({ ...value, preferred_wallets: next.join(',') });
  };
  return (
    <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
      {WALLETS.map(w => {
        const isSelected = selected.includes(w.name);
        return (
          <motion.button
            key={w.name}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.93 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            onClick={() => toggle(w.name)}
            className={`relative flex items-center gap-2 rounded-xl border-2 px-3 py-2.5 text-xs font-semibold transition-colors ${isSelected ? 'border-indigo-500 bg-indigo-50 text-indigo-700' : 'border-slate-200 bg-white text-slate-600'}`}
          >
            <motion.span
              animate={isSelected ? { scale: [1, 1.25, 1] } : { scale: 1 }}
              transition={{ duration: 0.4 }}
              className={`grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-gradient-to-br text-[10px] font-bold text-white shadow-sm ${w.gradient}`}
            >
              {w.name[0]}
            </motion.span>
            <span className="truncate">{w.name}</span>
            <AnimatePresence>
              {isSelected && (
                <motion.span
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                  className="absolute -right-1.5 -top-1.5 grid h-4 w-4 place-items-center rounded-full bg-indigo-600 text-white shadow-sm"
                >
                  <Check size={10}/>
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        );
      })}
    </div>
  );
}