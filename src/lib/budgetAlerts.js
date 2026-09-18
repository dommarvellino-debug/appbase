import { base44 } from '@/api/base44Client';

export function getMonthKey(date = new Date()) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
}

export async function checkBudgetAlerts() {
  const now = new Date();
  const monthKey = getMonthKey(now);

  const budgets = await base44.entities.Budget.filter({ month: monthKey });
  if (!budgets.length) return;

  const transactions = await base44.entities.Transaction.list('-date', 500);
  const spending = {};
  transactions.forEach(t => {
    if (t.type !== 'expense') return;
    const d = new Date(`${t.date}T00:00:00`);
    if (d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()) {
      spending[t.category] = (spending[t.category] || 0) + t.amount;
    }
  });

  const existing = await base44.entities.Notification.filter({ month: monthKey, type: 'budget_alert' });

  for (const budget of budgets) {
    const spent = spending[budget.category] || 0;
    const pct = budget.limit > 0 ? (spent / budget.limit) * 100 : 0;
    if (pct < 80) continue;
    if (existing.some(n => n.category === budget.category)) continue;
    const exceeded = pct >= 100;
    await base44.entities.Notification.create({
      title: exceeded ? `${budget.category} budget exceeded` : `${budget.category} budget warning`,
      message: exceeded
        ? `You've exceeded your ${budget.category} budget this month.`
        : `You've used ${Math.round(pct)}% of your ${budget.category} budget limit.`,
      type: 'budget_alert',
      category: budget.category,
      month: monthKey,
      read: false,
    });
  }
}