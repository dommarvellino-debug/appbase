import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { TrendingUp } from 'lucide-react';
import { useCurrency } from '@/contexts/CurrencyContext';

export default function ProgressChart({ transactions }) {
  const { formatMoney } = useCurrency();
  const months = [];
  const now = new Date();
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    months.push({ key: `${d.getFullYear()}-${d.getMonth()}`, label: d.toLocaleDateString('en-US', { month: 'short' }), income: 0, spent: 0 });
  }
  transactions.forEach(t => {
    const d = new Date(`${t.date}T00:00:00`);
    const key = `${d.getFullYear()}-${d.getMonth()}`;
    const month = months.find(m => m.key === key);
    if (month) {
      if (t.type === 'income') month.income += t.amount;
      else month.spent += t.amount;
    }
  });

  return (
    <section className="rounded-3xl border border-slate-200/70 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-2">
        <TrendingUp size={18} className="text-indigo-600"/>
        <div>
          <h2 className="font-bold">6-month progress</h2>
          <p className="text-sm text-slate-500">Track your income vs spending trend</p>
        </div>
      </div>
      <div className="mt-4 h-64">
        <ResponsiveContainer>
          <BarChart data={months} barGap={4}>
            <XAxis dataKey="label" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false}/>
            <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} tickFormatter={v => formatMoney(v)} width={60}/>
            <Tooltip formatter={v => formatMoney(v)} contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0', fontSize: 13 }}/>
            <Legend iconType="circle" wrapperStyle={{ fontSize: 12, paddingTop: 8 }}/>
            <Bar dataKey="income" name="Income" fill="#2dd4bf" radius={[6, 6, 0, 0]} maxBarSize={28}/>
            <Bar dataKey="spent" name="Spent" fill="#6366f1" radius={[6, 6, 0, 0]} maxBarSize={28}/>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}