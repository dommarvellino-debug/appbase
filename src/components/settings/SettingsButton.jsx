import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Settings, Sun, Moon, Globe, Check } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage, LANGUAGES } from '@/contexts/LanguageContext';

export default function SettingsButton() {
  const [open, setOpen] = useState(false);
  const [spinKey, setSpinKey] = useState(0);
  const ref = useRef(null);
  const { theme, setTheme } = useTheme();
  const { lang, setLang, t } = useLanguage();

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button onClick={() => { setSpinKey(k => k + 1); setOpen(o => !o); }} className="grid h-10 w-10 place-items-center rounded-xl text-slate-500 transition hover:bg-white/30 hover:text-slate-900">
        <motion.div animate={{ rotate: 360 * spinKey }} transition={{ duration: 0.6, ease: 'easeInOut' }} className="grid place-items-center">
          <Settings size={20}/>
        </motion.div>
      </button>
      {open && (
        <div className="fixed inset-x-4 top-[4.5rem] z-50 max-h-[calc(100vh-7rem)] overflow-y-auto rounded-2xl border border-slate-200 bg-white shadow-xl sm:absolute sm:inset-x-auto sm:right-0 sm:top-12 sm:max-h-[calc(100vh-8rem)] sm:w-72">
          <div className="border-b border-slate-100 p-4">
            <p className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400"><Sun size={14}/>{t('theme')}</p>
            <div className="grid grid-cols-2 gap-2">
              <button onClick={() => setTheme('light')} className={`flex items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium transition ${theme === 'light' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'}`}><Sun size={16}/>{t('light')}</button>
              <button onClick={() => setTheme('dark')} className={`flex items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium transition ${theme === 'dark' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'}`}><Moon size={16}/>{t('dark')}</button>
            </div>
          </div>
          <div className="p-4">
            <p className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400"><Globe size={14}/>{t('language')}</p>
            <div className="max-h-56 overflow-y-auto">
              {LANGUAGES.map(l => (
                <button key={l.code} onClick={() => setLang(l.code)} className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition ${lang === l.code ? 'bg-indigo-50 font-semibold text-indigo-600' : 'text-slate-600 hover:bg-slate-50'}`}>
                  <span className="text-lg">{l.flag}</span>
                  <span className="flex-1 text-left">{l.name}</span>
                  {lang === l.code && <Check size={16}/>}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}