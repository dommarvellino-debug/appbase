import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const categories = ['Food', 'Housing', 'Transport', 'Study', 'Fun', 'Health', 'Income', 'Other'];

export default function TransactionDialog({ open, onClose, onSave }) {
  const [form, setForm] = useState({ title: '', amount: '', type: 'expense', category: 'Food', date: new Date().toISOString().slice(0, 10) });
  const submit = (e) => { e.preventDefault(); onSave({ ...form, amount: Number(form.amount) }); setForm({ ...form, title: '', amount: '' }); };
  const field = 'w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50';

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 z-50 grid place-items-center bg-slate-950/40 p-4 backdrop-blur-sm"
        >
          <motion.form
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.92, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 8 }}
            transition={{ type: 'spring', stiffness: 300, damping: 26 }}
            onSubmit={submit}
            className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">Add transaction</h2>
              <motion.button whileTap={{ scale: 0.85 }} type="button" onClick={onClose} className="rounded-full p-2 text-slate-500 transition hover:bg-slate-100"><X size={19} /></motion.button>
            </div>
            <div className="mt-5 grid gap-4">
              <input required placeholder="What was it for?" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className={field} />
              <input required min="0.01" step="0.01" type="number" placeholder="Amount" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} className={field} />
              <div className="grid grid-cols-2 gap-3">
                <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value, category: e.target.value === 'income' ? 'Income' : 'Food' })} className={field}><option value="expense">Expense</option><option value="income">Income</option></select>
                <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className={field}>{categories.map((c) => <option key={c}>{c}</option>)}</select>
              </div>
              <input required type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className={field} />
              <motion.button whileTap={{ scale: 0.96 }} type="submit" className="rounded-xl bg-indigo-600 py-3 font-semibold text-white transition hover:bg-indigo-700">Save transaction</motion.button>
            </div>
          </motion.form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}