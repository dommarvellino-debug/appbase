import { base44 } from '@/api/base44Client';

const STREAK_MILESTONES = [3, 7, 30, 100];

export async function checkSavingsAchievements(goals) {
  const completed = goals.filter(g => g.saved_amount >= g.target_amount);
  if (!completed.length) return;

  const existing = await base44.entities.Achievement.list('-created_date', 100);

  const awards = [
    { count: 1, type: 'first_goal', title: 'First Goal Completed!', desc: 'You reached your first savings goal.', icon: '🎯' },
    { count: 3, type: 'three_goals', title: 'Goal Getter', desc: 'You completed 3 savings goals.', icon: '🏆' },
    { count: 5, type: 'five_goals', title: 'Savings Master', desc: 'You completed 5 savings goals.', icon: '💎' },
  ];

  for (const award of awards) {
    if (completed.length >= award.count && !existing.some(a => a.type === award.type)) {
      await base44.entities.Achievement.create({ title: award.title, description: award.desc, type: award.type, icon: award.icon });
    }
  }
}

export async function checkStreakAchievements(streak) {
  const existing = await base44.entities.Achievement.list('-created_date', 100);
  for (const milestone of STREAK_MILESTONES) {
    if (streak >= milestone && !existing.some(a => a.type === `streak_${milestone}`)) {
      await base44.entities.Achievement.create({
        title: `${milestone}-Day Streak!`,
        description: `You logged in ${milestone} days in a row.`,
        type: `streak_${milestone}`,
        icon: '🔥',
      });
    }
  }
}