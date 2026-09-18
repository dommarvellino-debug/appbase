import { useState } from 'react';
import { X } from 'lucide-react';

const WALLET_TYPES = [
  'PayPal', 'Venmo', 'Cash App', 'Wise', 'Revolut',
  'Apple Pay', 'Google Pay', 'Samsung Pay',
  'Paytm', 'PhonePe', 'Amazon Pay',
  'GCash', 'Maya', 'GoPay', 'OVO', 'DANA', 'ShopeePay', 'TrueMoney', 'GrabPay',
  'Alipay', 'WeChat Pay', 'Line Pay', 'PayNow', 'PromptPay',
  'MoMo', 'ZaloPay',
  'MPesa', 'Airtel Money', 'MTN Mobile Money',
];

const field = 'w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50';

export default function WalletLinkDialog({ open, onClose, onSave }) {
  const [walletType, setWalletType] = useState('PayPal');
  const [account, setAccount] = useState('');
  if (!open) return null;
  const submit = e => { e.preventDefault(); onSave({ wallet_name: walletType, account_identifier: account, wallet_type: walletType }); setAccount(''); };
  return (
    <div className="fixed inset-0 z-50 grid place-items-end bg-slate-950/40 backdrop-blur-sm sm:place-items-center sm:p-4">
      <form onSubmit={submit} className="w-full max-w-md rounded-t-3xl bg-white p-6 shadow-2xl sm:rounded-3xl">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Link e-wallet</h2>
          <button type="button" onClick={onClose} className="rounded-full p-2 hover:bg-slate-100"><X size={19}/></button>
        </div>
        <p className="mt-1 text-sm text-slate-500">Select your wallet and enter the email or phone linked to it.</p>
        <div className="mt-5 grid gap-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">E-wallet provider</label>
            <select value={walletType} onChange={e => setWalletType(e.target.value)} className={field}>
              {WALLET_TYPES.map(w => <option key={w}>{w}</option>)}
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Account email or phone</label>
            <input required value={account} onChange={e => setAccount(e.target.value)} className={field} placeholder="e.g. you@email.com"/>
          </div>
          <button className="rounded-xl bg-indigo-600 py-3 font-semibold text-white transition hover:bg-indigo-700">Link wallet</button>
        </div>
      </form>
    </div>
  );
}