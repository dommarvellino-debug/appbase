import { User, Trash2 } from 'lucide-react';

export default function FriendCard({ email, onRemove }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-slate-200/70 bg-white p-4">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-indigo-100 text-indigo-600"><User size={20}/></span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold">{email}</p>
        <p className="text-xs text-emerald-500">Friends</p>
      </div>
      <button onClick={onRemove} className="shrink-0 rounded-lg p-2 text-slate-300 transition hover:bg-rose-50 hover:text-rose-500"><Trash2 size={16}/></button>
    </div>
  );
}