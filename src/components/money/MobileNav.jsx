import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

const MotionNavLink = motion(NavLink);

export default function MobileNav({ items }) {
  const { t } = useLanguage();
  return (
    <nav className="fixed bottom-5 left-1/2 z-30 flex -translate-x-1/2 items-center gap-0.5 rounded-3xl border border-white/30 bg-white/20 px-1.5 py-1.5 shadow-2xl shadow-black/10 backdrop-blur-2xl lg:hidden dark:border-white/10 dark:bg-slate-900/30">
      {items.map(({ to, labelKey, icon: Icon, end }) => (
        <MotionNavLink
          key={to}
          to={to}
          end={end}
          whileTap={{ scale: 0.85 }}
          transition={{ type: 'spring', stiffness: 600, damping: 14 }}
          className={({ isActive }) =>
            `relative flex flex-col items-center gap-0.5 overflow-hidden rounded-2xl px-3 py-1.5 text-[10px] font-medium transition-colors ${isActive ? 'text-indigo-600' : 'text-slate-500'}`
          }
        >
          {({ isActive }) => (
            <>
              {isActive && (
                <motion.span
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-400/25 to-violet-400/25 ring-1 ring-inset ring-indigo-400/30 dark:from-indigo-500/25 dark:to-violet-500/25"
                />
              )}
              <motion.span
                className="pointer-events-none absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-400/40"
                initial={{ scale: 0, opacity: 0 }}
                whileTap={{ scale: 2.6, opacity: [0.5, 0] }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              />
              <motion.span
                animate={isActive ? { scale: [1, 1.3, 1], y: [0, -2, 0] } : { scale: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="relative z-10"
              >
                <Icon size={18} />
              </motion.span>
              <span className="relative z-10">{t(labelKey)}</span>
            </>
          )}
        </MotionNavLink>
      ))}
    </nav>
  );
}