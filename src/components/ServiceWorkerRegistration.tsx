"use client";

import { useEffect } from "react";

export function ServiceWorkerRegistration() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!("serviceWorker" in navigator)) return;
    const controller = new AbortController();
    navigator.serviceWorker
      .register("/sw.js")
      .catch(() => {})
      .finally(() => {});
    return () => controller.abort();
  }, []);
  return null;
}


