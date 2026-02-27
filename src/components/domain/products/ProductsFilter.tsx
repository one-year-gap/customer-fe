"use client";

import { useRef, useState } from "react";

const FILTERS = ["5G 요금제", "스마트워치/태블릿", "인터넷", "IPTV"];

export function ProductsFilter() {
  const [selected, setSelected] = useState("5G 요금제");
  const ref = useRef<HTMLDivElement | null>(null);

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;

    const startX = e.pageX;
    const startLeft = el.scrollLeft;

    const onMove = (ev: MouseEvent) => {
      el.scrollLeft = startLeft - (ev.pageX - startX);
    };
    const onUp = () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  };

  return (
    <div className="flex items-center gap-2 py-3">
      <div
        ref={ref}
        onMouseDown={onMouseDown}
        className="flex flex-1 gap-2 overflow-x-auto whitespace-nowrap"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}>
        {FILTERS.map((item) => {
          const isActive = selected === item;
          return (
            <button
              key={item}
              onClick={() => setSelected(item)}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold ${
                isActive ? "bg-[#162C5B] text-white" : "bg-gray-200 text-gray-600"
              }`}>
              {item}
            </button>
          );
        })}
      </div>

      <button className="shrink-0 rounded-full bg-[#162C5B] px-4 py-2 text-sm font-semibold text-white">
        추천
      </button>

      <style jsx>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
