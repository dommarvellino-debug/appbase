import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { useCurrency } from '@/contexts/CurrencyContext';
const colors = ['#6366f1','#2dd4bf','#fb7185','#fbbf24','#8b5cf6','#38bdf8','#94a3b8'];
export default function SpendingChart({ data }) {
  const { formatMoney: money } = useCurrency();
  const total = data.reduce((sum, item) => sum + item.value, 0);
  return <section className="rounded-3xl border border-slate-200/70 bg-white p-5 shadow-sm"><div><h2 className="font-bold">Spending breakdown</h2><p className="text-sm text-slate-500">Where your money went this month</p></div>
    {data.length ? <div className="mt-4 flex flex-col items-center gap-3 sm:flex-row"><div className="relative h-48 w-48 shrink-0"><ResponsiveContainer><PieChart><Pie data={data} dataKey="value" innerRadius={58} outerRadius={82} paddingAngle={3}>{data.map((_,i)=><Cell key={i} fill={colors[i%colors.length]}/>)}</Pie><Tooltip formatter={money}/></PieChart></ResponsiveContainer><div className="pointer-events-none absolute inset-0 grid place-items-center text-center"><div><span className="text-xs text-slate-400">Total</span><p className="font-bold">{money(total)}</p></div></div></div><div className="grid w-full grid-cols-2 gap-3">{data.map((item,i)=><div key={item.name} className="flex items-center gap-2 text-sm"><span className="h-2.5 w-2.5 rounded-full" style={{backgroundColor:colors[i%colors.length]}}/><span className="truncate text-slate-500">{item.name}</span><b className="ml-auto">{money(item.value)}</b></div>)}</div></div> : <div className="grid h-48 place-items-center text-sm text-slate-400">Add an expense to see your breakdown.</div>}
  </section>;
}