import { motion, AnimatePresence } from 'framer-motion';
import { PiggyBank, TrendingUp, Wallet, CreditCard, Shield, Target, Check } from 'lucide-react';

const GOALS = [
  { value: 'Save money', icon: PiggyBank, gradient: 'from-emerald-400 to-teal-500' },
  { value: 'Track spending', icon: TrendingUp, gradient: 'from-indigo-400 to-blue-500' },
  { value: 'Budget better', icon: Wallet, gradient: 'from-violet-400 to-purple-500' },
  { value: 'Pay off debt', icon: CreditCard, gradient: 'from-rose-400 to-pink-500' },
  { value: 'Build emergency fund', icon: Shield, gradient: 'from-amber-400 to-orange-500' },
  { value: 'Save for something specific', icon: Target, gradient: 'from-sky-400 to-cyan-500' },
];

export default function GoalStep({ value, onChange }) {
  const selected = value.goal ? value.goal.split(',').filter(Boolean) : [];
  const toggle = (goal) => {
    const next = selected.includes(goal) ? selected.filter(g => g !== goal) : [...selected, goal];
    onChange({ ...value, goal: next.join(',') });
  };
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {GOALS.map(({ value: v, icon: Icon, gradient }) => {
        const isSelected = selected.includes(v);
        return (
          <motion.button
            key={v}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.92 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            onClick={() => toggle(v)}
            className={`relative flex items-center gap-3 rounded-2xl border-2 p-4 text-left transition-colors ${isSelected ? 'border-indigo-500 bg-indigo-50' : 'border-slate-200 bg-white'}`}
          >
            <motion.span
              animate={isSelected ? { scale: [1, 1.3, 1], rotate: [0, -12, 12, 0] } : { scale: 1, rotate: 0 }}
              transition={{ duration: 0.5 }}
              className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br text-white shadow-md ${gradient}`}
            >
              <Icon size={20}/>
            </motion.span>
            <span className="pr-6 text-sm font-semibold">{v}</span>
            <AnimatePresence>
              {isSelected && (
                <motion.span
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                  className="absolute right-3 top-3 grid h-5 w-5 place-items-center rounded-full bg-indigo-600 text-white"
                >
                  <Check size={12}/>
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        );
      })}
    </div>
  );
}