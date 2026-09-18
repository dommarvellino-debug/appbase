import { useState, useEffect, useRef } from 'react';
import { base44 } from '@/api/base44Client';
import { Bell, Check, AlertTriangle } from 'lucide-react';
import { checkBudgetAlerts } from '@/lib/budgetAlerts';

export default function NotificationButton() {
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const load = async () => {
    try { setNotifications(await base44.entities.Notification.list('-created_date', 20)); } catch {}
  };

  useEffect(() => {
    const runCheck = () => checkBudgetAlerts().then(load).catch(() => {});
    runCheck();
    const unsubNotifs = base44.entities.Notification.subscribe((event) => {
      if (event.type === 'create') setNotifications(prev => [event.data, ...prev].slice(0, 20));
      if (event.type === 'update') setNotifications(prev => prev.map(n => n.id === event.data.id ? event.data : n));
      if (event.type === 'delete') setNotifications(prev => prev.filter(n => n.id !== event.data.id));
    });
    const unsubTx = base44.entities.Transaction.subscribe((event) => {
      if (event.type === 'create' || event.type === 'delete') runCheck();
    });
    const unsubBudget = base44.entities.Budget.subscribe(() => runCheck());
    return () => { unsubNotifs(); unsubTx(); unsubBudget(); };
  }, []);

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const unread = notifications.filter(n => !n.read).length;

  const markAllRead = async () => {
    const unreadNotifs = notifications.filter(n => !n.read);
    if (!unreadNotifs.length) return;
    await base44.entities.Notification.bulkUpdate(unreadNotifs.map(n => ({ id: n.id, read: true })));
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const markRead = async (id) => {
    await base44.entities.Notification.update(id, { read: true });
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  return (
    <div className="relative" ref={ref}>
      <button onClick={() => setOpen(o => !o)} className="relative grid h-10 w-10 place-items-center rounded-xl text-slate-500 transition hover:bg-white/30 hover:text-slate-900">
        <Bell size={20}/>
        {unread > 0 && <span className="absolute right-1.5 top-1.5 grid h-4 min-w-4 place-items-center rounded-full bg-rose-500 px-1 text-[10px] font-bold text-white">{unread}</span>}
      </button>
      {open && (
        <div className="fixed inset-x-4 top-[4.5rem] z-50 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl sm:absolute sm:inset-x-auto sm:right-0 sm:top-12 sm:w-80">
          <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
            <h3 className="font-bold">Notifications</h3>
            {unread > 0 && <button onClick={markAllRead} className="text-xs font-medium text-indigo-600 hover:underline">Mark all read</button>}
          </div>
          <div className="max-h-[calc(100vh-13rem)] overflow-y-auto sm:max-h-80">
            {notifications.length ? notifications.map(n => (
              <div key={n.id} className={`flex gap-3 border-b border-slate-50 px-4 py-3 ${!n.read ? 'bg-indigo-50/40' : ''}`}>
                <span className={`mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg ${n.type === 'budget_alert' ? 'bg-amber-100 text-amber-600' : 'bg-slate-100 text-slate-500'}`}>
                  {n.type === 'budget_alert' ? <AlertTriangle size={16}/> : <Bell size={16}/>}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold">{n.title}</p>
                  <p className="text-xs text-slate-500">{n.message}</p>
                </div>
                {!n.read && <button onClick={() => markRead(n.id)} className="shrink-0 text-slate-300 transition hover:text-indigo-600"><Check size={14}/></button>}
              </div>
            )) : <p className="px-4 py-10 text-center text-sm text-slate-400">No notifications yet</p>}
          </div>
        </div>
      )}
    </div>
  );
}