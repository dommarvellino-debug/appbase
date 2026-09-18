import { useEffect, useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Award } from 'lucide-react';

const ALL_ACHIEVEMENTS = [
  { type: 'first_goal', title: 'First Goal!', icon: '🎯', desc: 'Reach your first savings goal' },
  { type: 'three_goals', title: 'Goal Getter', icon: '🏆', desc: 'Complete 3 savings goals' },
  { type: 'five_goals', title: 'Savings Master', icon: '💎', desc: 'Complete 5 savings goals' },
  { type: 'streak_3', title: '3-Day Streak', icon: '🔥', desc: 'Log in 3 days in a row' },
  { type: 'streak_7', title: '7-Day Streak', icon: '🔥', desc: 'Log in 7 days in a row' },
  { type: 'streak_30', title: '30-Day Streak', icon: '🔥', desc: 'Log in 30 days in a row' },
];

export default function AchievementList() {
  const [earned, setEarned] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    base44.entities.Achievement.list('-created_date', 50).then(a => { setEarned(a); setLoading(false); }).catch(() => setLoading(false));
    const unsub = base44.entities.Achievement.subscribe((event) => {
      if (event.type === 'create') setEarned(prev => [event.data, ...prev]);
    });
    return unsub;
  }, []);

  const earnedTypes = new Set(earned.map(a => a.type));

  return (
    <section className="rounded-3xl border border-slate-200/70 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-2">
        <Award size={20} className="text-indigo-600" />
        <h2 className="font-bold">Achievements</h2>
        <span className="ml-auto text-sm text-slate-400">{earnedTypes.size}/{ALL_ACHIEVEMENTS.length}</span>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {ALL_ACHIEVEMENTS.map(a => {
          const isEarned = earnedTypes.has(a.type);
          return (
            <div key={a.type} className={`rounded-2xl border-2 p-4 text-center transition ${isEarned ? 'border-indigo-200 bg-gradient-to-br from-indigo-50 to-violet-50' : 'border-slate-100 bg-slate-50 opacity-60'}`}>
              <div className="text-3xl">{isEarned ? a.icon : '🔒'}</div>
              <p className="mt-2 text-xs font-bold">{a.title}</p>
              <p className="text-[10px] text-slate-400">{a.desc}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}