"use client";

import { useLocalStorage } from "@/lib/useLocalStorage";
import { toYMD } from "@/lib/date";

type HabitKey = "sleep" | "meals" | "medicine" | "fluids" | "rest";

type Habit = {
  key: HabitKey;
  name: string;
  description: string;
};

const HABITS: Habit[] = [
  { key: "sleep", name: "Sleep 9–11h", description: "Helps your immune system fight mono." },
  { key: "meals", name: "Eat gentle meals", description: "Small, balanced meals for energy." },
  { key: "medicine", name: "Take medicine", description: "As prescribed for symptoms." },
  { key: "fluids", name: "Hydrate often", description: "Water, broths, electrolyte drinks." },
  { key: "rest", name: "Light rest", description: "Avoid strenuous activity while recovering." },
];

type DayState = Record<HabitKey, boolean>;

function getInitialDayState(): DayState {
  return { sleep: false, meals: false, medicine: false, fluids: false, rest: false };
}

export default function Home() {
  const todayKey = toYMD(new Date());
  const [days, setDays] = useLocalStorage<Record<string, DayState>>("habit-days", {});
  const today = days[todayKey] ?? getInitialDayState();

  const toggleHabit = (key: HabitKey) => {
    const updated: DayState = { ...today, [key]: !today[key] };
    setDays({ ...days, [todayKey]: updated });
  };

  const completedCount = Object.values(today).filter(Boolean).length;

  return (
    <div className="space-y-4">
      <header className="px-1">
        <h1 className="text-xl font-semibold tracking-tight">Today</h1>
        <p className="text-sm opacity-80">Gentle habits while you recover</p>
      </header>

      <div className="grid grid-cols-1 gap-3">
        {HABITS.map((h) => {
          const done = today[h.key];
          return (
            <button
              key={h.key}
              onClick={() => toggleHabit(h.key)}
              className={`card flex items-center justify-between ${done ? "border-blue-600/30 bg-blue-50 dark:bg-blue-950/30" : ""}`}
              aria-label={`${done ? "Unmark" : "Mark"} ${h.name} as done`}
            >
              <div>
                <div className="text-base font-medium">{h.name}</div>
                <div className="text-xs opacity-70">{h.description}</div>
              </div>
              <div
                className={`h-6 w-6 rounded-full border-2 ${
                  done ? "border-blue-600 bg-blue-600" : "border-black/30 dark:border-white/30"
                }`}
                aria-hidden
              />
            </button>
          );
        })}
      </div>

      <div className="card flex items-center justify-between">
        <span className="text-sm">Progress</span>
        <span className="text-sm font-semibold">
          {completedCount}/{HABITS.length}
        </span>
      </div>
    </div>
  );
}
