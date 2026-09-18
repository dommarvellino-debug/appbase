import { Outlet, NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, Users, User, LogOut, Sparkles, Wallet, UserPlus } from 'lucide-react';
import Logo from '@/components/Logo';
import { base44 } from '@/api/base44Client';
import { CurrencyProvider } from '@/contexts/CurrencyContext';
import NotificationButton from '@/components/notifications/NotificationButton';
import BudgetModal from '@/components/budget/BudgetModal';
import StreakBadge from '@/components/streak/StreakBadge';
import SettingsButton from '@/components/settings/SettingsButton';
import { checkAndUpdateStreak } from '@/lib/streak';
import { useLanguage } from '@/contexts/LanguageContext';
import AnimatedBackground from '@/components/AnimatedBackground';
import MobileNav from '@/components/money/MobileNav';
import TapFeedback from '@/components/TapFeedback';

const navItems = [
  { to: '/', labelKey: 'overview', icon: LayoutDashboard, end: true },
  { to: '/wallets', labelKey: 'wallets', icon: Wallet },
  { to: '/friends', labelKey: 'friends', icon: UserPlus },
  { to: '/community', labelKey: 'community', icon: Users },
  { to: '/profile', labelKey: 'profile', icon: User },
];

export default function AppShell() {
  const navigate = useNavigate();
  const location = useLocation();
  const [checking, setChecking] = useState(true);
  const [budgetOpen, setBudgetOpen] = useState(false);
  const [streak, setStreak] = useState(0);
  const { t } = useLanguage();
  useEffect(() => {
    base44.auth.me().then(u => {
      if (!u.onboarding_completed) navigate('/onboarding', { replace: true });
      else {
        setChecking(false);
        checkAndUpdateStreak().then(s => setStreak(s)).catch(() => {});
      }
    }).catch(() => setChecking(false));
  }, []);
  const logout = () => base44.auth.logout('/login');
  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 rounded-xl px-4 py-3 font-medium transition-all duration-200 ease-out ${isActive ? 'bg-indigo-500/15 text-indigo-600 ring-1 ring-inset ring-indigo-400/20' : 'text-slate-500 hover:bg-slate-50'}`;
  if (checking) return <div className="grid min-h-screen place-items-center"><div className="h-9 w-9 animate-spin rounded-full border-4 border-indigo-100 border-t-indigo-600"/></div>;
  return (
    <CurrencyProvider>
    <div className="relative min-h-screen text-slate-900">
      <AnimatedBackground/>
      <aside className="fixed inset-y-0 left-0 z-20 hidden w-64 flex-col border-r border-white/30 bg-white/20 px-5 py-7 shadow-xl shadow-black/5 backdrop-blur-2xl lg:flex dark:border-white/10 dark:bg-slate-900/30">
        <Link to="/" className="flex items-center gap-3 px-2">
          <Logo className="h-11 w-11"/>
          <span className="text-xl font-bold tracking-tight">Mowise</span>
        </Link>
        <nav className="mt-12 space-y-1.5">
          {navItems.map(({ to, labelKey, icon: Icon, end }) => (
            <TapFeedback key={to} className="rounded-xl">
              <NavLink to={to} end={end} className={linkClass}><Icon size={19}/>{t(labelKey)}</NavLink>
            </TapFeedback>
          ))}
        </nav>
        <TapFeedback className="mt-auto rounded-xl">
          <button onClick={logout} className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-500 transition-all duration-200 ease-out hover:bg-slate-50 hover:text-slate-900"><LogOut size={18}/>{t('logOut')}</button>
        </TapFeedback>
      </aside>

      <main className="lg:pl-64">
        <header className="sticky top-3 z-40 mx-3 flex items-center justify-end gap-2 rounded-2xl border border-white/30 bg-white/20 px-2.5 py-2 shadow-xl shadow-black/5 backdrop-blur-2xl lg:mx-6">
          <TapFeedback className="rounded-xl"><StreakBadge streak={streak}/></TapFeedback>
          <TapFeedback className="rounded-xl"><button onClick={() => setBudgetOpen(true)} className="grid h-10 w-10 place-items-center rounded-xl bg-white/15 text-slate-600 transition hover:bg-white/30 sm:flex sm:h-auto sm:w-auto sm:gap-2 sm:px-3 sm:py-2"><Wallet size={16}/><span className="hidden text-sm font-medium sm:inline">{t('budget')}</span></button></TapFeedback>
          <TapFeedback className="rounded-xl"><NotificationButton/></TapFeedback>
          <TapFeedback className="rounded-xl"><SettingsButton/></TapFeedback>
        </header>
        <div className="pb-20 lg:pb-0"><AnimatePresence mode="wait"><motion.div key={location.pathname} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.25, ease: 'easeOut' }}><Outlet/></motion.div></AnimatePresence></div>
      </main>

      <MobileNav items={navItems}/>
      {location.pathname !== '/consultant' && (
        <Link to="/consultant" className="fixed bottom-24 right-4 z-30 flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 transition hover:scale-105 lg:bottom-6 lg:right-6">
          <Sparkles size={20}/>
          <span className="hidden sm:inline">{t('aiConsultant')}</span>
        </Link>
      )}
    </div>
    <BudgetModal open={budgetOpen} onClose={() => setBudgetOpen(false)}/>
    </CurrencyProvider>
  );
}