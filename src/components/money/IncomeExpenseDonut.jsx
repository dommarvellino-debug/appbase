import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { useCurrency } from '@/contexts/CurrencyContext';

export default function IncomeExpenseDonut({ income, spent }) {
  const { formatMoney: money } = useCurrency();
  const data = [
    { name: 'Income', value: income },
    { name: 'Expenses', value: spent },
  ];
  const net = income - spent;
  if (!income && !spent) return null;
  return (
    <section className="rounded-3xl border border-slate-200/70 bg-white p-5 shadow-sm">
      <div>
        <h2 className="font-bold">Income vs expenses</h2>
        <p className="text-sm text-slate-500">Your monthly cash flow at a glance</p>
      </div>
      <div className="mt-4 flex flex-col items-center gap-5 sm:flex-row">
        <div className="relative h-48 w-48 shrink-0">
          <ResponsiveContainer>
            <PieChart>
              <Pie data={data} dataKey="value" innerRadius={58} outerRadius={82} paddingAngle={3} startAngle={90} endAngle={-270}>
                <Cell fill="#10b981"/>
                <Cell fill="#f43f5e"/>
              </Pie>
              <Tooltip formatter={money}/>
            </PieChart>
          </ResponsiveContainer>
          <div className="pointer-events-none absolute inset-0 grid place-items-center text-center">
            <div>
              <span className="text-xs text-slate-400">Net left</span>
              <p className={`font-bold ${net < 0 ? 'text-rose-500' : ''}`}>{money(net)}</p>
            </div>
          </div>
        </div>
        <div className="grid w-full gap-3">
          <div className="flex items-center gap-3 rounded-2xl bg-emerald-50 px-4 py-3">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-emerald-500 text-white"><TrendingUp size={18}/></span>
            <div className="min-w-0">
              <p className="text-xs font-medium text-emerald-600">Income</p>
              <p className="font-bold">{money(income)}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-2xl bg-rose-50 px-4 py-3">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-rose-500 text-white"><TrendingDown size={18}/></span>
            <div className="min-w-0">
              <p className="text-xs font-medium text-rose-600">Expenses</p>
              <p className="font-bold">{money(spent)}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}