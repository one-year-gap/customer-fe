"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/home", label: "홈" },
  { href: "/products", label: "상품" },
  { href: "/characters", label: "유형" },
  { href: "/my", label: "마이" },
];

export function BottomNavbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed right-0 bottom-0 left-0 z-50 border-t bg-white">
      <ul className="mx-auto flex h-16 max-w-[402px]">
        {items.map((item) => {
          const active = pathname === item.href;
          return (
            <li key={item.href} className="flex-1">
              <Link
                href={item.href}
                className={`flex h-full flex-col items-center justify-center text-xs ${
                  active ? "font-semibold" : "opacity-60"
                }`}>
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
