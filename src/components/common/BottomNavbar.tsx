"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { House, ShoppingBag, User, Users } from "lucide-react";

const items = [
  { href: "/home", label: "홈", icon: House },
  { href: "/products", label: "상품", icon: ShoppingBag },
  { href: "/characters", label: "유형", icon: Users },
  { href: "/my", label: "마이", icon: User },
];

export function BottomNavbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed right-0 bottom-0 left-0 z-50 border-t border-neutral-300 bg-neutral-50">
      <ul className="mx-auto flex h-16 max-w-120">
        {items.map((item) => {
          const Icon = item.icon;

          const active =
            item.href === "/"
              ? pathname === "/"
              : pathname === item.href || pathname.startsWith(item.href + "/");

          return (
            <li key={item.href} className="flex-1">
              <Link
                href={item.href}
                aria-label={item.label}
                className="flex h-full flex-col items-center justify-center">
                <Icon
                  className={`h-5 w-5 ${active ? "text-secondary-500 opacity-100" : "opacity-60"}`}
                />

                <span
                  className={`mt-1 text-xs ${active ? "text-secondary-500 font-semibold" : "opacity-60"}`}>
                  {item.label}
                </span>

                {active && (
                  <span
                    className="bg-secondary-500 mt-1 h-0.5 w-3 rounded-full"
                    aria-hidden="true"
                  />
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
