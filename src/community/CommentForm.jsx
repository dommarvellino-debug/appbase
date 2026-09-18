import { useState, useEffect } from 'react';
import { Send } from 'lucide-react';
import { base44 } from '@/api/base44Client';

export default function CommentForm({ onSubmit }) {
  const [content, setContent] = useState('');
  const [authorName, setAuthorName] = useState('');

  useEffect(() => {
    base44.auth.me()
      .then(u => setAuthorName(u.full_name || (u.email ? u.email.split('@')[0] : 'Anonymous')))
      .catch(() => setAuthorName('Anonymous'));
  }, []);

  const submit = e => {
    e.preventDefault();
    if (!content.trim()) return;
    onSubmit({ content, author_name: authorName });
    setContent('');
  };

  return (
    <form onSubmit={submit} className="flex items-end gap-2">
      <textarea required value={content} onChange={e => setContent(e.target.value)} rows={2} placeholder="Write a comment..." className="flex-1 resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50"/>
      <button type="submit" className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-indigo-600 text-white transition hover:bg-indigo-700"><Send size={17}/></button>
    </form>
  );
}