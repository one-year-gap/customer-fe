"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";

import type { LucideIcon } from "lucide-react";
import { Funnel, Signal, Smartphone, Tv, Watch } from "lucide-react";

import { useLogger } from "@/hooks/useLogger";
import type { ProductType } from "@/models/log";

interface ProductsFilterProps {
  selected: ProductType;
  onChange: (value: ProductType) => void;
}

const FILTERS: { label: string; value: ProductType; icon: LucideIcon }[] = [
  { label: "추천", value: "recommend", icon: Funnel },
  { label: "5G 요금제", value: "mobile", icon: Signal },
  { label: "스마트워치/태블릿", value: "tab-watch", icon: Smartphone },
  { label: "인터넷", value: "internet", icon: Watch },
  { label: "IPTV", value: "iptv", icon: Tv },
];

export function ProductsFilter({ selected, onChange }: ProductsFilterProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  const { trackClick } = useLogger();
  const router = useRouter();

  return (
    <div className="flex items-center gap-2 py-3">
      <div ref={ref} className="no-scrollbar flex flex-1 gap-2 overflow-x-auto whitespace-nowrap">
        {FILTERS.map((item) => {
          const isActive = selected === item.value;
          const Icon = item.icon;

          return (
            <button
              key={item.value}
              onClick={() => {
                trackClick("click_list_type", {
                  product_type: item.value,
                });

                onChange(item.value);

                if (item.value === "recommend") {
                  router.push("/products/recommend");
                } else {
                  router.push(`/products?type=${item.value}`); // ✅ 수정
                }
              }}
              className={`flex shrink-0 items-center justify-center gap-2 rounded-full px-4 py-1 text-sm font-semibold transition ${
                isActive ? "bg-primary-700 text-neutral-0" : "bg-neutral-200 text-neutral-500"
              }`}>
              <Icon size={14} />
              {item.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
