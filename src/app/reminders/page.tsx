"use client";

import { useLocalStorage } from "@/lib/useLocalStorage";
import { pushToast, ToastHost } from "@/components/Toast";
import { useEffect, useState } from "react";

type Reminder = { id: string; label: string; time: string; habit: string };

export default function RemindersPage() {
  const [reminders, setReminders] = useLocalStorage<Reminder[]>("reminders", []);
  const [label, setLabel] = useState("");
  const [time, setTime] = useState("");
  const [habit, setHabit] = useState("medicine");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const hh = String(now.getHours()).padStart(2, "0");
      const mm = String(now.getMinutes()).padStart(2, "0");
      const current = `${hh}:${mm}`;
      reminders.forEach((r) => {
        if (r.time === current) {
          pushToast(`${r.label || r.habit} — it's time (${r.time})`);
        }
      });
    }, 30 * 1000);
    return () => clearInterval(interval);
  }, [reminders]);

  function addReminder() {
    if (!time) return;
    const id = Math.random().toString(36).slice(2);
    setReminders([...reminders, { id, label, time, habit }]);
    setLabel("");
    setTime("");
  }

  function removeReminder(id: string) {
    setReminders(reminders.filter((r) => r.id !== id));
  }

  return (
    <div className="space-y-4">
      <ToastHost />
      <header>
        <h1 className="text-xl font-semibold">Reminders</h1>
        <p className="text-sm opacity-80">In-app pings to keep you on track</p>
      </header>

      <div className="card space-y-3">
        <div className="grid grid-cols-1 gap-2">
          <input
            className="rounded-xl border border-black/10 dark:border-white/15 bg-background px-3 py-2 text-sm"
            placeholder="Label (optional)"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
          />
          <div className="flex items-center gap-2">
            <input
              type="time"
              className="flex-1 rounded-xl border border-black/10 dark:border-white/15 bg-background px-3 py-2 text-sm"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              aria-label="Reminder time"
            />
            <select
              className="rounded-xl border border-black/10 dark:border-white/15 bg-background px-3 py-2 text-sm"
              value={habit}
              onChange={(e) => setHabit(e.target.value)}
              aria-label="Habit"
            >
              <option value="medicine">Medicine</option>
              <option value="meals">Meals</option>
              <option value="sleep">Sleep</option>
              <option value="fluids">Fluids</option>
              <option value="rest">Rest</option>
            </select>
          </div>
          <button className="btn-primary" onClick={addReminder}>Add reminder</button>
        </div>
      </div>

      <div className="space-y-2">
        {reminders.length === 0 && (
          <div className="text-sm opacity-70">No reminders yet. Add one above.</div>
        )}
        {reminders.map((r) => (
          <div key={r.id} className="card flex items-center justify-between">
            <div>
              <div className="text-sm font-medium">{r.label || r.habit}</div>
              <div className="text-xs opacity-70">{r.time}</div>
            </div>
            <button
              className="rounded-lg px-3 py-1 text-sm hover:bg-black/[.05] dark:hover:bg-white/[.06]"
              onClick={() => removeReminder(r.id)}
              aria-label="Remove reminder"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <p className="text-xs opacity-70">
        Notifications are in-app only. For system notifications, add these times to your iOS Reminders or Calendar.
      </p>
    </div>
  );
}


