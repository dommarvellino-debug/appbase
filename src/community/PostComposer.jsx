import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { base44 } from '@/api/base44Client';

const categories = ['Budgeting Tips', 'Savings Goals', 'Student Life', 'Income Ideas', 'Questions'];

export default function PostComposer({ open, onClose, onSave }) {
  const [form, setForm] = useState({ title: '', content: '', category: 'Budgeting Tips' });
  const [authorName, setAuthorName] = useState('');

  useEffect(() => {
    if (open) {
      base44.auth.me()
        .then(u => setAuthorName(u.full_name || (u.email ? u.email.split('@')[0] : 'Anonymous')))
        .catch(() => setAuthorName('Anonymous'));
    }
  }, [open]);

  if (!open) return null;
  const submit = e => { e.preventDefault(); onSave({ ...form, author_name: authorName }); setForm({ title: '', content: '', category: 'Budgeting Tips' }); };
  const field = 'w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50';

  return (
    <div className="fixed inset-0 z-50 grid place-items-end bg-slate-950/40 backdrop-blur-sm sm:place-items-center sm:p-4">
      <form onSubmit={submit} className="w-full max-w-md rounded-t-3xl bg-white p-6 shadow-2xl sm:rounded-3xl">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Start a discussion</h2>
          <button type="button" onClick={onClose} className="rounded-full p-2 hover:bg-slate-100"><X size={19}/></button>
        </div>
        <div className="mt-5 grid gap-4">
          <input required placeholder="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className={field}/>
          <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className={field}>
            {categories.map(c => <option key={c}>{c}</option>)}
          </select>
          <textarea required rows={4} placeholder="Share your thoughts..." value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} className={`${field} resize-none`}/>
          <button className="rounded-xl bg-indigo-600 py-3 font-semibold text-white transition hover:bg-indigo-700">Post to community</button>
        </div>
      </form>
    </div>
  );
}