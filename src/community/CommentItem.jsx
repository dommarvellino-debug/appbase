export default function CommentItem({ comment }) {
  const initials = (comment.author_name || '?').split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
  const date = new Date(comment.created_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  return (
    <div className="flex gap-3 rounded-2xl border border-slate-200/70 bg-white p-4 shadow-sm">
      <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gradient-to-br from-indigo-400 to-violet-400 text-xs font-bold text-white">{initials}</div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold">{comment.author_name || 'Anonymous'}</p>
          <span className="text-xs text-slate-400">{date}</span>
        </div>
        <p className="mt-1 text-sm text-slate-600">{comment.content}</p>
      </div>
    </div>
  );
}