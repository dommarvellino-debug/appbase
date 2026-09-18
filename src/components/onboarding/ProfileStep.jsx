import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, School, Briefcase, Laptop, Clock, User, Check } from 'lucide-react';

const TYPES = [
  { value: 'College student', icon: GraduationCap, gradient: 'from-indigo-400 to-blue-500' },
  { value: 'Graduate student', icon: School, gradient: 'from-violet-400 to-purple-500' },
  { value: 'Working professional', icon: Briefcase, gradient: 'from-emerald-400 to-teal-500' },
  { value: 'Freelancer', icon: Laptop, gradient: 'from-amber-400 to-orange-500' },
  { value: 'Part-time worker', icon: Clock, gradient: 'from-rose-400 to-pink-500' },
  { value: 'Other', icon: User, gradient: 'from-slate-400 to-slate-500' },
];

export default function ProfileStep({ value, onChange }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {TYPES.map(({ value: v, icon: Icon, gradient }) => {
        const selected = value.user_type === v;
        return (
          <motion.button
            key={v}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.92 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            onClick={() => onChange({ ...value, user_type: v })}
            className={`relative flex items-center gap-3 rounded-2xl border-2 p-4 text-left transition-colors ${selected ? 'border-indigo-500 bg-indigo-50' : 'border-slate-200 bg-white'}`}
          >
            <motion.span
              animate={selected ? { scale: [1, 1.3, 1], rotate: [0, -12, 12, 0] } : { scale: 1, rotate: 0 }}
              transition={{ duration: 0.5 }}
              className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br text-white shadow-md ${gradient}`}
            >
              <Icon size={20}/>
            </motion.span>
            <span className="pr-6 text-sm font-semibold">{v}</span>
            <AnimatePresence>
              {selected && (
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