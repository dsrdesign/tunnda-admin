"use client";

import {
  BarChart3,
  MessageCircle,
  ScrollText,
  TreePine,
  Users,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLogout } from "@/features/auth";

const ITEMS: { href: string; label: string; icon: LucideIcon }[] = [
  { href: "/", label: "Vue d’ensemble", icon: BarChart3 },
  { href: "/utilisateurs", label: "Utilisateurs", icon: Users },
  { href: "/familles", label: "Familles", icon: TreePine },
  { href: "/messagerie", label: "Messagerie", icon: MessageCircle },
  { href: "/audit", label: "Journal d’audit", icon: ScrollText },
];

export function Nav() {
  const pathname = usePathname();
  return (
    <nav
      aria-label="Navigation principale"
      className="-mx-1 flex gap-1 overflow-x-auto px-1 md:flex-col md:overflow-visible"
    >
      {ITEMS.map(({ href, label, icon: Icon }) => {
        const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            aria-current={active ? "page" : undefined}
            className={`flex shrink-0 items-center gap-2.5 rounded-full px-3.5 py-2.5 text-sm font-medium transition duration-300 ease-spring focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-forest ${
              active
                ? "bg-forest-soft text-forest"
                : "text-fg/75 hover:bg-fg/[0.05] hover:text-fg"
            }`}
          >
            <Icon size={17} aria-hidden />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}

export function LogoutButton() {
  const logout = useLogout();
  return (
    <button
      type="button"
      onClick={() => logout.mutate()}
      disabled={logout.isPending}
      className="h-10 w-full rounded-full text-sm font-medium text-muted ring-1 ring-line transition hover:text-forest hover:ring-forest active:scale-[0.98] disabled:opacity-60"
    >
      Se déconnecter
    </button>
  );
}
