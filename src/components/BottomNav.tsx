"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function NavItem({ href, label, emoji }: { href: string; label: string; emoji: string }) {
  const pathname = usePathname();
  const isActive = pathname === href;
  return (
    <Link
      href={href}
      className={`flex flex-col items-center justify-center gap-1 rounded-xl px-3 py-2 text-xs ${
        isActive ? "bg-black/[.06] dark:bg-white/[.08]" : "hover:bg-black/[.04] dark:hover:bg-white/[.06]"
      }`}
      aria-current={isActive ? "page" : undefined}
    >
      <span aria-hidden className="text-lg leading-none">
        {emoji}
      </span>
      <span className={`leading-none ${isActive ? "font-semibold" : "opacity-80"}`}>{label}</span>
    </Link>
  );
}

export function BottomNav() {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-black/[.08] dark:border-white/[.12] bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/75 safe-bottom"
    >
      <div className="mx-auto max-w-[480px] px-2 py-2">
        <div className="grid grid-cols-4 gap-1">
          <NavItem href="/" label="Today" emoji="🏠" />
          <NavItem href="/calendar" label="Calendar" emoji="🗓️" />
          <NavItem href="/reminders" label="Reminders" emoji="⏰" />
          <NavItem href="/why" label="Why" emoji="💡" />
        </div>
      </div>
    </nav>
  );
}


