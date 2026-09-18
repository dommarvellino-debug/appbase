import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const categoryColors = {
  'Budgeting Tips': 'bg-emerald-50 text-emerald-700',
  'Savings Goals': 'bg-indigo-50 text-indigo-700',
  'Student Life': 'bg-amber-50 text-amber-700',
  'Income Ideas': 'bg-sky-50 text-sky-700',
  'Questions': 'bg-rose-50 text-rose-700',
};

export default function PostCard({ post }) {
  const date = new Date(post.created_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  const colorClass = categoryColors[post.category] || 'bg-slate-100 text-slate-600';
  return (
    <Link to={`/community/${post.id}`} className="block rounded-3xl border border-slate-200/70 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-center gap-2">
        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${colorClass}`}>{post.category}</span>
        <span className="text-xs text-slate-400">{date}</span>
      </div>
      <h3 className="mt-3 font-bold">{post.title}</h3>
      <p className="mt-1.5 line-clamp-2 text-sm text-slate-500">{post.content}</p>
      <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
        <span>by {post.author_name || 'Anonymous'}</span>
        <span className="flex items-center gap-1 font-medium text-indigo-600">Read more <ArrowRight size={14}/></span>
      </div>
    </Link>
  );
}