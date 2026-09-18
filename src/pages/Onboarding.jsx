import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { base44 } from '@/api/base44Client';
import { ArrowLeft, ArrowRight, Loader2, Check } from 'lucide-react';
import Logo from '@/components/Logo';
import { getCurrencyForCountry } from '@/lib/currency';
import CountryStep from '@/components/onboarding/CountryStep';
import GoalStep from '@/components/onboarding/GoalStep';
import ProfileStep from '@/components/onboarding/ProfileStep';
import WalletStep from '@/components/onboarding/WalletStep';
import NeedsStep from '@/components/onboarding/NeedsStep';

const STEPS = [
  { title: 'Where are you located?', subtitle: "We'll format your currency based on your country", component: CountryStep },
  { title: "What's your main goal?", subtitle: 'Pick all that apply — we\u2019ll tailor your experience', component: GoalStep },
  { title: 'Which best describes you?', subtitle: 'So we can personalize your experience', component: ProfileStep },
  { title: 'Which e-wallets do you use?', subtitle: 'Select all that apply — or skip', component: WalletStep },
  { title: 'Anything else?', subtitle: 'Tell us what else you need help with', component: NeedsStep },
];

export default function Onboarding() {
  const [step, setStep] = useState(0);
  const [saving, setSaving] = useState(false);
  const [data, setData] = useState({ country: '', goal: '', user_type: '', preferred_wallets: '', additional_needs: '' });

  const StepComponent = STEPS[step].component;
  const isLast = step === STEPS.length - 1;
  const goalsSelected = data.goal ? data.goal.split(',').filter(Boolean).length > 0 : false;
  const canProceed = step === 0 ? !!data.country : step === 1 ? goalsSelected : step === 2 ? !!data.user_type : true;

  const finish = async () => {
    setSaving(true);
    try {
      const currency = getCurrencyForCountry(data.country);
      await base44.auth.updateMe({ ...data, currency, onboarding_completed: true });
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 }, colors: ['#6366f1', '#2dd4bf', '#fbbf24', '#f472b6'] });
      setTimeout(() => { window.location.href = '/'; }, 1500);
    } catch {
      setSaving(false);
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-violet-50">
      <motion.div className="pointer-events-none absolute -left-20 top-0 h-96 w-96 rounded-full bg-indigo-300/30 blur-3xl" animate={{ x: [0, 60, 0], y: [0, 40, 0] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}/>
      <motion.div className="pointer-events-none absolute right-0 top-1/3 h-96 w-96 rounded-full bg-violet-300/25 blur-3xl" animate={{ x: [0, -50, 0], y: [0, 30, 0] }} transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}/>
      <motion.div className="pointer-events-none absolute bottom-0 left-1/3 h-96 w-96 rounded-full bg-teal-300/25 blur-3xl" animate={{ x: [0, 30, 0], y: [0, -40, 0] }} transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 2 }}/>

      <div className="relative z-10 border-b border-white/40 backdrop-blur-sm">
        <div className="mx-auto flex max-w-2xl items-center gap-3 px-6 py-4">
          <motion.span initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: 'spring', stiffness: 260, damping: 20 }} className="grid place-items-center rounded-2xl shadow-lg shadow-indigo-500/30">
            <Logo className="h-10 w-10"/>
          </motion.span>
          <span className="text-lg font-bold">Mowise</span>
          <div className="ml-auto flex gap-1.5">
            {STEPS.map((_, i) => <motion.span key={i} animate={{ width: i === step ? 32 : 8, backgroundColor: i <= step ? '#6366f1' : '#e2e8f0' }} transition={{ type: 'spring', stiffness: 300, damping: 25 }} className="block h-2 rounded-full"/>)}
          </div>
        </div>
      </div>

      <div className="relative z-10 flex flex-1 items-center justify-center px-4 py-8">
        <div className="w-full max-w-2xl">
          <AnimatePresence mode="wait">
            <motion.div key={step} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.3, ease: 'easeOut' }}>
              <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-3xl font-bold tracking-tight">{STEPS[step].title}</motion.h1>
              <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="mt-2 text-slate-500">{STEPS[step].subtitle}</motion.p>
              <div className="mt-8"><StepComponent value={data} onChange={setData}/></div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="relative z-10 border-t border-white/40 bg-white/50 backdrop-blur-sm">
        <div className="mx-auto flex max-w-2xl items-center justify-between px-6 py-4">
          <motion.button whileTap={{ scale: 0.95 }} onClick={() => setStep(s => s - 1)} disabled={step === 0} className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-500 transition hover:bg-white/60 disabled:opacity-0"><ArrowLeft size={18}/> Back</motion.button>
          {isLast ? (
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={finish} disabled={saving} className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30">
              {saving ? <><Loader2 size={18} className="animate-spin"/> Saving...</> : <><Check size={18}/> Get started</>}
            </motion.button>
          ) : (
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => setStep(s => s + 1)} disabled={!canProceed} className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 disabled:opacity-40 disabled:shadow-none">Continue <ArrowRight size={18}/></motion.button>
          )}
        </div>
      </div>
    </div>
  );
}