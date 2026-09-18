import { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { X, PiggyBank } from 'lucide-react';
import { useCurrency } from '@/contexts/CurrencyContext';
import { getMonthKey } from '@/lib/budgetAlerts';

const CATEGORIES = ['Food', 'Housing', 'Transport', 'Study', 'Fun', 'Health', 'Other'];

export default function BudgetModal({ open, onClose }) {
  const { formatMoney: money } = useCurrency();
  const [limits, setLimits] = useState({});
  const [existing, setExisting] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const monthKey = getMonthKey();

  useEffect(() => {
    if (!open) return;
    setLoading(true);
    base44.entities.Budget.filter({ month: monthKey }).then(budgets => {
      const map = {};
      budgets.forEach(b => { map[b.category] = b.limit; });
      setLimits(map);
      setExisting(budgets);
    }).finally(() => setLoading(false));
  }, [open, monthKey]);

  const total = CATEGORIES.reduce((sum, cat) => sum + (Number(limits[cat]) || 0), 0);

  const save = async () => {
    setSaving(true);
    setError('');
    try {
      for (const cat of CATEGORIES) {
        const limit = Number(limits[cat]) || 0;
        const existingBudget = existing.find(b => b.category === cat);
        if (limit > 0 && existingBudget) await base44.entities.Budget.update(existingBudget.id, { limit });
        else if (limit > 0) await base44.entities.Budget.create({ category: cat, limit, month: monthKey });
        else if (existingBudget) await base44.entities.Budget.delete(existingBudget.id);
      }
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to save budget');
    } finally {
      setSaving(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-slate-900/40 p-4 backdrop-blur-sm" onClick={onClose}>
      <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-indigo-600 text-white"><PiggyBank size={20}/></span>
            <div>
              <h2 className="font-bold">Monthly Budget</h2>
              <p className="text-xs text-slate-400">Set spending limits per category</p>
            </div>
          </div>
          <button onClick={onClose} className="grid h-8 w-8 place-items-center rounded-lg text-slate-400 hover:bg-slate-100"><X size={18}/></button>
        </div>
        {error && <div className="mt-4 rounded-xl bg-rose-50 p-3 text-sm text-rose-600">{error}</div>}
        <div className="mt-6 space-y-3">
          {loading ? <div className="py-8 text-center text-sm text-slate-400">Loading...</div> : CATEGORIES.map(cat => (
            <div key={cat} className="flex items-center justify-between gap-3">
              <label className="text-sm font-medium text-slate-700">{cat}</label>
              <input type="number" min="0" step="any" value={limits[cat] || ''} onChange={e => setLimits(prev => ({ ...prev, [cat]: e.target.value }))} placeholder="0" className="w-32 rounded-xl border border-slate-200 py-2 px-3 text-right text-sm outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-50"/>
            </div>
          ))}
        </div>
        {!loading && <p className="mt-4 text-right text-sm text-slate-500">Total budget: <b className="text-slate-900">{money(total)}</b></p>}
        <button onClick={save} disabled={saving} className="mt-6 w-full rounded-xl bg-indigo-600 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:opacity-50">{saving ? 'Saving...' : 'Save Budget'}</button>
      </div>
    </div>
  );
}