import { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { UserPlus, Check, X, Users } from 'lucide-react';
import AddFriendDialog from '@/components/friends/AddFriendDialog';
import FriendCard from '@/components/friends/FriendCard';

export default function Friends() {
  const [user, setUser] = useState(null);
  const [friendships, setFriendships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  const load = async () => {
    const me = await base44.auth.me();
    setUser(me);
    const email = me.email.toLowerCase();
    const [sent, received] = await Promise.all([
      base44.entities.Friendship.filter({ requester_email: email }),
      base44.entities.Friendship.filter({ addressee_email: email }),
    ]);
    setFriendships([...sent, ...received]);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const accept = async (id) => {
    await base44.entities.Friendship.update(id, { status: 'accepted' });
    setFriendships(prev => prev.map(f => f.id === id ? { ...f, status: 'accepted' } : f));
  };

  const decline = async (id) => {
    await base44.entities.Friendship.update(id, { status: 'declined' });
    setFriendships(prev => prev.filter(f => f.id !== id));
  };

  const remove = async (id) => {
    await base44.entities.Friendship.delete(id);
    setFriendships(prev => prev.filter(f => f.id !== id));
  };

  if (loading || !user) return <div className="grid min-h-[60vh] place-items-center"><div className="h-9 w-9 animate-spin rounded-full border-4 border-indigo-100 border-t-indigo-600"/></div>;

  const myEmail = user.email.toLowerCase();
  const pendingReceived = friendships.filter(f => f.addressee_email === myEmail && f.status === 'pending');
  const friends = friendships.filter(f => f.status === 'accepted' && (f.requester_email === myEmail || f.addressee_email === myEmail));

  return (
    <div className="mx-auto max-w-3xl px-4 py-7 sm:px-8 sm:py-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Friends</h1>
          <p className="text-sm text-slate-500">Manage your connections</p>
        </div>
        <button onClick={() => setOpen(true)} className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"><UserPlus size={18}/>Add Friend</button>
      </div>

      {pendingReceived.length > 0 && (
        <div className="mt-8">
          <h2 className="mb-3 text-sm font-bold uppercase tracking-wider text-slate-400">Pending Requests ({pendingReceived.length})</h2>
          <div className="space-y-3">
            {pendingReceived.map(f => (
              <div key={f.id} className="flex items-center gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-amber-100 text-amber-600"><UserPlus size={20}/></span>
                <div className="min-w-0 flex-1"><p className="truncate text-sm font-semibold">{f.requester_email}</p><p className="text-xs text-amber-500">Wants to be your friend</p></div>
                <button onClick={() => accept(f.id)} className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-emerald-500 text-white transition hover:bg-emerald-600"><Check size={18}/></button>
                <button onClick={() => decline(f.id)} className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-rose-100 text-rose-500 transition hover:bg-rose-200"><X size={18}/></button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-8">
        <h2 className="mb-3 text-sm font-bold uppercase tracking-wider text-slate-400">Your Friends ({friends.length})</h2>
        {friends.length ? (
          <div className="grid gap-3 sm:grid-cols-2">
            {friends.map(f => <FriendCard key={f.id} email={f.requester_email === myEmail ? f.addressee_email : f.requester_email} onRemove={() => remove(f.id)}/>)}
          </div>
        ) : (
          <div className="grid place-items-center rounded-3xl border border-dashed border-slate-200 py-16 text-center">
            <Users size={40} className="text-slate-300"/>
            <p className="mt-4 font-semibold text-slate-500">No friends yet</p>
            <p className="text-sm text-slate-400">Add friends to share your financial journey!</p>
          </div>
        )}
      </div>

      <AddFriendDialog open={open} onClose={() => setOpen(false)} currentUserEmail={user.email}/>
    </div>
  );
}