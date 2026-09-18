import { base44 } from '@/api/base44Client';
import { checkStreakAchievements } from './achievements';

function todayStr() {
  return new Date().toISOString().split('T')[0];
}

function yesterdayStr() {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().split('T')[0];
}

export async function checkAndUpdateStreak() {
  const user = await base44.auth.me();
  const today = todayStr();

  if (user.last_login_date === today) {
    return user.login_streak || 0;
  }

  let newStreak = 1;
  if (user.last_login_date === yesterdayStr()) {
    newStreak = (user.login_streak || 0) + 1;
  }

  await base44.auth.updateMe({ last_login_date: today, login_streak: newStreak });
  await checkStreakAchievements(newStreak);
  return newStreak;
}