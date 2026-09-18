import { MessageSquare } from 'lucide-react';

export default function NeedsStep({ value, onChange }) {
  return (
    <div className="grid gap-3">
      <div className="relative">
        <MessageSquare className="absolute left-4 top-4 text-slate-400" size={20}/>
        <textarea value={value.additional_needs} onChange={e => onChange({ ...value, additional_needs: e.target.value })} rows={5} placeholder="e.g. I want help with student loan planning, finding side income, tracking subscriptions..." className="w-full resize-none rounded-2xl border border-slate-200 bg-white py-4 pl-12 pr-4 text-base outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50"/>
      </div>
      <p className="text-sm text-slate-400">Optional — skip this if you just want to get started!</p>
    </div>
  );
}