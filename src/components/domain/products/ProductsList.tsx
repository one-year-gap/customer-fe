"use client";

import { useState } from "react";

import { ChevronRight, Smartphone, Wifi } from "lucide-react";

import CompareModal from "@/components/domain/CompareModal";
import DetailModal from "@/components/domain/DetailModal";

type Product = {
  badge?: "BEST" | "인기";
  title: string;
  price: number;
  dataText: string;
  callText: string;
  benefits: string[];
};

const PRODUCTS: Product[] = [
  {
    badge: "인기",
    title: "5G 프리미어 에센셜",
    price: 69000,
    dataText: "무제한 (월 2GB 후 3Mbps)",
    callText: "무제한",
    benefits: ["넷플릭스 프리미엄", "지니뮤직"],
  },
  {
    badge: "BEST",
    title: "5G 프리미어 슈퍼",
    price: 89000,
    dataText: "완전 무제한",
    callText: "무제한",
    benefits: ["넷플릭스 프리미엄", "디즈니+ 프리미엄", "지니뮤직", "U+모바일tv"],
  },
];

const formatPrice = (price: number) => price.toLocaleString("ko-KR");

export function ProductsList() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [compareOpen, setCompareOpen] = useState(false);

  return (
    <>
      <div className="space-y-4">
        {PRODUCTS.map((product, idx) => {
          const isSelected = selectedIndex === idx;

          return (
            <div
              key={idx}
              onClick={() => setSelectedIndex(idx)}
              className={`relative cursor-pointer rounded-2xl border bg-white p-5 transition ${
                isSelected ? "border-2 border-blue-500" : "border-gray-200"
              }`}>
              {product.badge && (
                <div
                  className={`absolute top-4 left-4 rounded-full px-2 py-1 text-[11px] font-bold ${
                    product.badge === "BEST"
                      ? "bg-orange-500 text-white"
                      : "bg-blue-100 text-blue-600"
                  }`}>
                  {product.badge}
                </div>
              )}

              <div className="mt-6 flex items-start justify-between">
                <h3 className="text-base font-extrabold text-gray-900">{product.title}</h3>

                <div className="text-right">
                  <p className="text-base font-extrabold text-blue-600">
                    {formatPrice(product.price)}
                    <span className="ml-1 text-xs font-semibold text-gray-500">원/월</span>
                  </p>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-6">
                <div className="flex gap-2">
                  <Wifi size={18} className="mt-1 text-blue-500" />
                  <div>
                    <p className="text-xs font-semibold text-gray-500">데이터</p>
                    <p className="text-sm font-extrabold">{product.dataText}</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Smartphone size={18} className="mt-1 text-blue-500" />
                  <div>
                    <p className="text-xs font-semibold text-gray-500">통화</p>
                    <p className="text-sm font-extrabold">{product.callText}</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 space-y-1">
                {product.benefits.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-1 text-xs font-semibold text-blue-600">
                    ✓ {item}
                  </div>
                ))}
              </div>

              <div className="mt-3 flex justify-end">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setDetailOpen(true);
                  }}
                  className="flex items-center gap-1 text-xs font-bold text-blue-600">
                  상세보기
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <DetailModal
        open={detailOpen}
        onClose={() => setDetailOpen(false)}
        onCompare={() => {
          setDetailOpen(false);
          setTimeout(() => setCompareOpen(true), 0);
        }}
      />

      <CompareModal open={compareOpen} onClose={() => setCompareOpen(false)} />
    </>
  );
}
