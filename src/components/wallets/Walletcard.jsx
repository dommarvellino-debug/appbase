import { Trash2 } from 'lucide-react';

const walletStyles = {
  PayPal: 'bg-gradient-to-br from-blue-500 to-blue-600',
  Venmo: 'bg-gradient-to-br from-blue-400 to-purple-500',
  'Cash App': 'bg-gradient-to-br from-green-500 to-green-600',
  Wise: 'bg-gradient-to-br from-green-400 to-teal-500',
  Revolut: 'bg-gradient-to-br from-slate-700 to-slate-900',
  'Apple Pay': 'bg-gradient-to-br from-slate-800 to-slate-900',
  'Google Pay': 'bg-gradient-to-br from-blue-500 to-green-500',
  'Samsung Pay': 'bg-gradient-to-br from-blue-600 to-indigo-600',
  Paytm: 'bg-gradient-to-br from-blue-400 to-cyan-500',
  PhonePe: 'bg-gradient-to-br from-purple-500 to-purple-600',
  'Amazon Pay': 'bg-gradient-to-br from-orange-400 to-orange-500',
  GCash: 'bg-gradient-to-br from-blue-500 to-indigo-600',
  Maya: 'bg-gradient-to-br from-green-400 to-emerald-600',
  GoPay: 'bg-gradient-to-br from-teal-500 to-cyan-600',
  OVO: 'bg-gradient-to-br from-purple-500 to-lime-500',
  DANA: 'bg-gradient-to-br from-sky-500 to-blue-600',
  ShopeePay: 'bg-gradient-to-br from-orange-500 to-red-500',
  TrueMoney: 'bg-gradient-to-br from-orange-400 to-red-500',
  GrabPay: 'bg-gradient-to-br from-green-500 to-emerald-600',
  Alipay: 'bg-gradient-to-br from-blue-400 to-blue-600',
  'WeChat Pay': 'bg-gradient-to-br from-green-500 to-green-600',
  'Line Pay': 'bg-gradient-to-br from-green-400 to-green-500',
  PayNow: 'bg-gradient-to-br from-purple-500 to-purple-600',
  PromptPay: 'bg-gradient-to-br from-blue-500 to-indigo-600',
  MoMo: 'bg-gradient-to-br from-pink-500 to-purple-600',
  ZaloPay: 'bg-gradient-to-br from-blue-500 to-blue-600',
  MPesa: 'bg-gradient-to-br from-green-500 to-green-600',
  'Airtel Money': 'bg-gradient-to-br from-red-500 to-red-600',
  'MTN Mobile Money': 'bg-gradient-to-br from-yellow-400 to-yellow-500',
};

export default function WalletCard({ wallet, onUnlink }) {
  const style = walletStyles[wallet.wallet_type] || 'bg-gradient-to-br from-indigo-500 to-violet-500';
  return (
    <div className="rounded-3xl border border-slate-200/70 bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="flex items-center gap-3">
        <div className={`grid h-12 w-12 place-items-center rounded-2xl ${style} text-white text-sm font-bold`}>{wallet.wallet_type.slice(0, 2).toUpperCase()}</div>
        <div className="min-w-0 flex-1">
          <h3 className="font-bold">{wallet.wallet_name}</h3>
          <p className="truncate text-xs text-slate-400">{wallet.account_identifier}</p>
        </div>
        <button onClick={() => onUnlink(wallet.id)} className="p-1 text-slate-300 transition hover:text-rose-500"><Trash2 size={16}/></button>
      </div>
      <div className="mt-4 flex items-center gap-1.5 text-xs font-medium text-emerald-600"><span className="h-2 w-2 rounded-full bg-emerald-500"/>Linked</div>
    </div>
  );
}