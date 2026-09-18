import { useState, useRef, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { Send, Sparkles, Bot, User as UserIcon, Loader2 } from 'lucide-react';

const suggestions = [
  'How can I save money on groceries as a student?',
  'What is a good monthly budget breakdown?',
  'Tips for building an emergency fund in college?',
  'How do I stop impulse spending?',
];

function MessageBubble({ role, content }) {
  const isUser = role === 'user';
  return (
    <div className={`flex gap-2.5 sm:gap-3 ${isUser ? 'flex-row-reverse' : ''}`}>
      <div className={`grid h-8 w-8 shrink-0 place-items-center rounded-full ${isUser ? 'bg-slate-900 text-white' : 'bg-gradient-to-br from-indigo-500 to-violet-500 text-white'}`}>
        {isUser ? <UserIcon size={16}/> : <Bot size={16}/>}
      </div>
      <div className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed sm:px-4 sm:py-3 ${isUser ? 'bg-slate-900 text-white' : 'bg-white border border-slate-200 text-slate-700 shadow-sm'}`}>
        {content}
      </div>
    </div>
  );
}

export default function AIConsultant() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    base44.auth.me().then(setUser).catch(() => {});
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
  }, [messages, loading]);

  const send = async (text) => {
    const trimmed = (text ?? input).trim();
    if (!trimmed || loading) return;
    const userMsg = { role: 'user', content: trimmed };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);
    try {
      const res = await base44.integrations.Core.InvokeLLM({
        prompt: `You are a friendly, practical financial advisor for college students living on their own. The user's name is ${user?.full_name || 'a student'}. Give clear, actionable, encouraging advice. Keep responses concise (3-5 short paragraphs max). Use simple language a student can relate to.\n\nUser question: ${trimmed}`,
        model: 'gemini_3_flash',
        add_context_from_internet: true,
      });
      setMessages(prev => [...prev, { role: 'assistant', content: res.response || res }]);
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I had trouble answering that. Please try again in a moment.' }]);
    }
    setLoading(false);
  };

  return (
    <div className="mx-auto flex h-[calc(100vh-4.5rem)] max-w-3xl flex-col px-4 py-4 sm:px-8 sm:py-7 lg:h-[calc(100vh-0rem)] lg:py-10">
      <div className="flex items-center gap-3">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-500 text-white shadow-lg shadow-indigo-500/20 sm:h-11 sm:w-11"><Sparkles size={20}/></span>
        <div>
          <p className="text-xs font-semibold text-indigo-600 sm:text-sm">AI CONSULTANT</p>
          <h1 className="text-xl font-bold tracking-tight sm:text-2xl">Ask Mowise, your money coach</h1>
        </div>
      </div>

      <div ref={scrollRef} className="mt-3 flex-1 space-y-3 overflow-y-auto rounded-3xl border border-white/30 bg-white/20 p-3 shadow-xl shadow-black/5 backdrop-blur-2xl sm:mt-6 sm:space-y-4 sm:p-5">
        {messages.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center gap-4 text-center sm:gap-5">
            <p className="max-w-sm text-sm text-slate-500">Ask me anything about budgeting, saving, spending habits, or managing money as a student. I'm here to help!</p>
            <div className="grid w-full max-w-md gap-2">
              {suggestions.map(s => (
                <button key={s} onClick={() => send(s)} className="flex items-center gap-2.5 rounded-xl border border-indigo-200 bg-indigo-50 px-3.5 py-2.5 text-left text-sm font-medium text-indigo-700 shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-300 hover:bg-indigo-100 sm:px-4 sm:py-3"><Sparkles size={14} className="shrink-0 text-indigo-400"/>{s}</button>
              ))}
            </div>
          </div>
        ) : (
          messages.map((m, i) => <MessageBubble key={i} {...m}/>)
        )}
        {loading && <div className="flex gap-2.5 sm:gap-3"><div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 text-white"><Bot size={16}/></div><div className="flex items-center gap-1 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 shadow-sm"><Loader2 size={16} className="animate-spin text-indigo-500"/></div></div>}
      </div>

      <form onSubmit={e => { e.preventDefault(); send(); }} className="mt-3 flex items-end gap-2">
        <textarea rows={1} value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); } }} placeholder="Ask about budgeting, saving, spending..." className="max-h-32 flex-1 resize-none rounded-2xl border border-slate-200 bg-white px-3.5 py-3 text-sm outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50"/>
        <button type="submit" disabled={loading || !input.trim()} className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-500/20 transition hover:bg-indigo-700 disabled:opacity-40"><Send size={18}/></button>
      </form>
    </div>
  );
}