import { useEffect, useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Plus, Wallet } from 'lucide-react';
import WalletCard from '@/components/wallets/WalletCard';
import WalletLinkDialog from '@/components/wallets/WalletLinkDialog';

export default function Wallets() {
  const [wallets, setWallets] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    const data = await base44.entities.EWalletConnection.list('-created_date');
    setWallets(data);
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const link = async (data) => {
    const wallet = await base44.entities.EWalletConnection.create({ ...data, status: 'linked' });
    setWallets(prev => [wallet, ...prev]);
    setOpen(false);
  };
  const unlink = async (id) => {
    await base44.entities.EWalletConnection.delete(id);
    setWallets(prev => prev.filter(w => w.id !== id));
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-7 sm:px-8 sm:py-10">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-indigo-600">E-WALLETS</p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">Linked wallets</h1>
          <p className="mt-2 text-slate-500">Connect your favorite e-wallets to track all your money in one place.</p>
        </div>
        <button onClick={() => setOpen(true)} className="flex shrink-0 items-center gap-2 rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/10 transition hover:-translate-y-0.5 hover:bg-indigo-600">
          <Plus size={18}/><span className="hidden sm:inline">Link wallet</span>
        </button>
      </div>

      <div className="mt-8">
        {loading ? <div className="grid place-items-center py-20"><div className="h-9 w-9 animate-spin rounded-full border-4 border-indigo-100 border-t-indigo-600"/></div>
        : wallets.length ? <div className="grid gap-4 sm:grid-cols-2">{wallets.map(w => <WalletCard key={w.id} wallet={w} onUnlink={unlink}/>)}</div>
        : <div className="rounded-3xl border-2 border-dashed border-slate-200 py-16 text-center"><Wallet size={40} className="mx-auto text-slate-300"/><p className="mt-4 text-sm text-slate-400">No wallets linked yet. Link your first e-wallet to get started!</p></div>}
      </div>

      <WalletLinkDialog open={open} onClose={() => setOpen(false)} onSave={link}/>
    </div>
  );
}