"use client";

import { useRef } from "react";

import { useLogger } from "@/hooks/useLogger";
import type { ProductType } from "@/models/log";

interface ProductsFilterProps {
  selected: ProductType;
  onChange: (value: ProductType) => void;
}

const FILTERS: { label: string; value: ProductType }[] = [
  { label: "5G 요금제", value: "mobile" },
  { label: "스마트워치/태블릿", value: "tab-watch" },
  { label: "인터넷", value: "internet" },
  { label: "IPTV", value: "iptv" },
];

export function ProductsFilter({ selected, onChange }: ProductsFilterProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { trackClick } = useLogger();

  return (
    <div className="flex items-center gap-2 py-3">
      <div ref={ref} className="no-scrollbar flex flex-1 gap-2 overflow-x-auto whitespace-nowrap">
        {FILTERS.map((item) => {
          const isActive = selected === item.value;

          return (
            <button
              key={item.value}
              onClick={() => {
                trackClick("click_list_type", {
                  product_type: item.value,
                });
                onChange(item.value);
              }}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition ${
                isActive ? "bg-[#162C5B] text-white" : "bg-gray-200 text-gray-600"
              }`}>
              {item.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
