import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MessageCircle } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import CommentForm from '@/components/community/CommentForm';
import CommentItem from '@/components/community/CommentItem';

export default function PostDetail() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    const [p, c] = await Promise.all([
      base44.entities.Post.get(postId),
      base44.entities.Comment.filter({ post_id: postId })
    ]);
    setPost(p);
    setComments(c.sort((a, b) => new Date(a.created_date) - new Date(b.created_date)));
    setLoading(false);
  };
  useEffect(() => { load(); }, [postId]);

  const addComment = async (data) => {
    const comment = await base44.entities.Comment.create({ ...data, post_id: postId });
    setComments(prev => [...prev, comment]);
  };

  if (loading) return <div className="grid min-h-screen place-items-center"><div className="h-9 w-9 animate-spin rounded-full border-4 border-indigo-100 border-t-indigo-600"/></div>;

  const date = new Date(post.created_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

  return (
    <div className="mx-auto max-w-2xl px-4 py-7 sm:px-8 sm:py-10">
      <Link to="/community" className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 transition hover:text-indigo-600"><ArrowLeft size={16}/>Back to community</Link>

      <article className="mt-6 rounded-3xl border border-slate-200/70 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">{post.category}</span>
          <span className="text-xs text-slate-400">{date}</span>
        </div>
        <h1 className="mt-3 text-2xl font-bold tracking-tight">{post.title}</h1>
        <p className="mt-1 text-sm text-slate-500">by {post.author_name || 'Anonymous'}</p>
        <p className="mt-4 whitespace-pre-wrap text-slate-700">{post.content}</p>
      </article>

      <section className="mt-6">
        <h2 className="flex items-center gap-2 font-bold"><MessageCircle size={18}/> Comments ({comments.length})</h2>
        <div className="mt-4">
          <CommentForm onSubmit={addComment}/>
        </div>
        <div className="mt-5 space-y-3">
          {comments.length ? comments.map(c => <CommentItem key={c.id} comment={c}/>)
          : <p className="py-8 text-center text-sm text-slate-400">No comments yet. Start the conversation!</p>}
        </div>
      </section>
    </div>
  );
}