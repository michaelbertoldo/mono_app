"use client";

import { useEffect, useState } from "react";

type Toast = { id: string; message: string };

let externalPush: ((msg: string) => void) | null = null;

export function ToastHost() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    externalPush = (msg: string) => {
      const id = Math.random().toString(36).slice(2);
      setToasts((t) => [...t, { id, message: msg }]);
      setTimeout(() => {
        setToasts((t) => t.filter((x) => x.id !== id));
      }, 3500);
    };
    return () => {
      externalPush = null;
    };
  }, []);

  return (
    <div className="fixed inset-x-0 top-3 z-[60] mx-auto flex max-w-[480px] flex-col items-center gap-2 px-4">
      {toasts.map((t) => (
        <div
          key={t.id}
          className="w-full rounded-xl border border-black/[.08] dark:border-white/[.12] bg-background/95 px-4 py-3 text-sm shadow-lg backdrop-blur supports-[backdrop-filter]:bg-background/75"
        >
          {t.message}
        </div>
      ))}
    </div>
  );
}

export function pushToast(message: string) {
  if (externalPush) externalPush(message);
}


