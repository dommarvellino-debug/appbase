import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import PostCard from '@/components/community/PostCard';
import PostComposer from '@/components/community/PostComposer';

const categories = ['All', 'Budgeting Tips', 'Savings Goals', 'Student Life', 'Income Ideas', 'Questions'];

export default function Community() {
  const [posts, setPosts] = useState([]);
  const [active, setActive] = useState('All');
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    const data = await base44.entities.Post.list('-created_date');
    setPosts(data);
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const filtered = active === 'All' ? posts : posts.filter(p => p.category === active);
  const create = async (data) => {
    const post = await base44.entities.Post.create(data);
    setPosts(prev => [post, ...prev]);
    setOpen(false);
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-7 sm:px-8 sm:py-10">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-indigo-600">COMMUNITY</p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">Student money talk.</h1>
          <p className="mt-2 text-slate-500">Share tips, ask questions, learn from peers.</p>
        </div>
        <button onClick={() => setOpen(true)} className="flex shrink-0 items-center gap-2 rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/10 transition hover:-translate-y-0.5 hover:bg-indigo-600">
          <Plus size={18}/><span className="hidden sm:inline">New post</span>
        </button>
      </div>

      <div className="mt-8 flex gap-2 overflow-x-auto pb-1">
        {categories.map(cat => (
          <button key={cat} onClick={() => setActive(cat)} className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition ${active === cat ? 'bg-indigo-600 text-white' : 'border border-slate-200 bg-white text-slate-500 hover:bg-slate-50'}`}>{cat}</button>
        ))}
      </div>

      <div className="mt-6 space-y-4">
        {loading ? <div className="grid place-items-center py-20"><div className="h-9 w-9 animate-spin rounded-full border-4 border-indigo-100 border-t-indigo-600"/></div>
        : filtered.length ? filtered.map(p => <PostCard key={p.id} post={p}/>)
        : <div className="rounded-3xl border-2 border-dashed border-slate-200 py-16 text-center text-sm text-slate-400">No posts yet. Be the first to share!</div>}
      </div>

      <PostComposer open={open} onClose={() => setOpen(false)} onSave={create}/>
    </div>
  );
}