import { Flame } from 'lucide-react';

export default function StreakBadge({ streak }) {
  if (!streak) return null;
  return (
    <div className="grid h-10 w-10 place-items-center rounded-xl bg-orange-400/15 text-sm font-bold text-orange-600 sm:flex sm:h-auto sm:w-auto sm:gap-1.5 sm:px-3 sm:py-2">
      <Flame size={18} className={streak >= 3 ? 'animate-pulse' : ''} />
      <span className="hidden sm:inline">{streak}</span>
      <span className="hidden text-xs font-medium text-orange-400 sm:inline">day{streak !== 1 ? 's' : ''}</span>
    </div>
  );
}