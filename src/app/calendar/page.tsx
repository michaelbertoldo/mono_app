"use client";

import { getMonthDays, getWeekdayIndex, toYMD } from "@/lib/date";
import { useLocalStorage } from "@/lib/useLocalStorage";
import { useMemo, useState } from "react";

type DayState = Record<"sleep" | "meals" | "medicine" | "fluids" | "rest", boolean>;

export default function CalendarPage() {
  const [refDate, setRefDate] = useState(new Date());
  const [days] = useLocalStorage<Record<string, DayState>>("habit-days", {});

  const monthDays = useMemo(() => getMonthDays(refDate), [refDate]);
  const monthLabel = refDate.toLocaleString(undefined, { month: "long", year: "numeric" });

  return (
    <div className="space-y-4">
      <header className="flex items-center justify-between">
        <button
          className="rounded-lg px-3 py-2 text-sm hover:bg-black/[.05] dark:hover:bg-white/[.06]"
          onClick={() => setRefDate(new Date(refDate.getFullYear(), refDate.getMonth() - 1, 1))}
        >
          ←
        </button>
        <h1 className="text-lg font-semibold">{monthLabel}</h1>
        <button
          className="rounded-lg px-3 py-2 text-sm hover:bg-black/[.05] dark:hover:bg-white/[.06]"
          onClick={() => setRefDate(new Date(refDate.getFullYear(), refDate.getMonth() + 1, 1))}
        >
          →
        </button>
      </header>

      <div className="grid grid-cols-7 gap-2 text-center text-xs opacity-70">
        <div>Sun</div><div>Mon</div><div>Tue</div><div>Wed</div><div>Thu</div><div>Fri</div><div>Sat</div>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {Array.from({ length: getWeekdayIndex(monthDays[0]) }).map((_, i) => (
          <div key={`pad-${i}`} />
        ))}
        {monthDays.map((d) => {
          const key = toYMD(d);
          const state = days[key];
          const completed = state ? Object.values(state).filter(Boolean).length : 0;
          const intensity = completed / 5; // 5 habits
          const bg = intensity === 0 ? "bg-black/[.04] dark:bg-white/[.06]" : intensity < 0.4 ? "bg-blue-200/60 dark:bg-blue-900/40" : intensity < 0.8 ? "bg-blue-400/70 dark:bg-blue-800/60" : "bg-blue-600/80 dark:bg-blue-700/80";
          return (
            <div key={key} className="aspect-square rounded-xl p-1 text-center">
              <div className={`flex h-full w-full items-center justify-center rounded-lg text-xs font-medium ${bg}`}>
                {d.getDate()}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}


