import { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { X, UserPlus, Loader2 } from 'lucide-react';

export default function AddFriendDialog({ open, onClose, currentUserEmail }) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  if (!open) return null;

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    const trimmed = email.trim().toLowerCase();
    if (!trimmed) return;
    if (trimmed === currentUserEmail?.toLowerCase()) { setError("You can't add yourself!"); return; }
    setLoading(true);
    try {
      const sent = await base44.entities.Friendship.filter({ requester_email: currentUserEmail.toLowerCase(), addressee_email: trimmed });
      const received = await base44.entities.Friendship.filter({ requester_email: trimmed, addressee_email: currentUserEmail.toLowerCase() });
      if (sent.length || received.length) {
        const existing = sent[0] || received[0];
        setError(existing.status === 'accepted' ? 'You are already friends!' : 'A request is already pending.');
        setLoading(false);
        return;
      }
      await base44.entities.Friendship.create({ requester_email: currentUserEmail.toLowerCase(), addressee_email: trimmed, status: 'pending' });
      setSuccess(`Request sent to ${trimmed}!`);
      setEmail('');
    } catch (err) {
      setError(err.message || 'Failed to send request');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-slate-900/40 p-4 backdrop-blur-sm" onClick={onClose}>
      <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-indigo-600 text-white"><UserPlus size={20}/></span>
            <h2 className="font-bold">Add Friend</h2>
          </div>
          <button onClick={onClose} className="grid h-8 w-8 place-items-center rounded-lg text-slate-400 hover:bg-slate-100"><X size={18}/></button>
        </div>
        <form onSubmit={submit} className="mt-5">
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="friend@example.com" className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-50" autoFocus/>
          {error && <p className="mt-3 text-sm text-rose-500">{error}</p>}
          {success && <p className="mt-3 text-sm text-emerald-600">{success}</p>}
          <button type="submit" disabled={loading || !email.trim()} className="mt-4 w-full rounded-xl bg-indigo-600 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:opacity-50">
            {loading ? <Loader2 size={18} className="mx-auto animate-spin"/> : 'Send Request'}
          </button>
        </form>
      </div>
    </div>
  );
}