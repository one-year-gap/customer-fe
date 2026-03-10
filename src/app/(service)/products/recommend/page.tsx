"use client";

import { ChevronRight, Smartphone, Wifi } from "lucide-react";

import { ProductsHeader } from "@/components/domain/products/ProductsHeader";

const MOCK_PLANS = [
  {
    id: 1,
    name: "5G 프리미어 에센셜",
    price: 69000,
    data: "무제한 (일 2GB 후 3Mbps)",
    call: "무제한",
    reasons: [
      "무제한 데이터를 충분한 데이터를 원하는 분들께 추천",
      "넉넉한 데이터와 통화가 잦은 고객님께 무제한 통화 추천",
    ],
  },
  {
    id: 2,
    name: "5G 프리미어 에센셜",
    price: 69000,
    data: "무제한 (일 2GB 후 3Mbps)",
    call: "무제한",
    reasons: [
      "무제한 데이터를 충분한 데이터를 원하는 분들께 추천",
      "넉넉한 데이터와 통화가 잦은 고객님께 무제한 통화 추천",
    ],
  },
];

export default function RecommendPage() {
  return (
    <div className="space-y-6 px-4 pb-24">
      <ProductsHeader />

      <div className="space-y-4">
        {MOCK_PLANS.map((plan) => (
          <RecommendCard key={plan.id} plan={plan} />
        ))}
      </div>
    </div>
  );
}

interface Plan {
  id: number;
  name: string;
  price: number;
  data: string;
  call: string;
  reasons: string[];
}

function RecommendCard({ plan }: { plan: Plan }) {
  return (
    <div className="rounded-2xl border-2 border-blue-400 bg-white p-5">
      <span className="rounded-full bg-blue-500 px-3 py-1 text-xs font-semibold text-white">
        추천
      </span>
      <div className="mt-2 flex items-center justify-between">
        <h3 className="text-base font-bold text-gray-900">{plan.name}</h3>

        <p className="font-bold text-blue-600">
          {plan.price.toLocaleString()}
          <span className="ml-1 text-xs text-gray-500">원/월</span>
        </p>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-6">
        <div className="flex gap-2">
          <Wifi size={18} className="mt-1 text-blue-500" />
          <div>
            <p className="text-xs text-gray-500">데이터</p>
            <p className="text-sm font-bold">{plan.data}</p>
          </div>
        </div>

        <div className="flex gap-2">
          <Smartphone size={18} className="mt-1 text-blue-500" />
          <div>
            <p className="text-xs text-gray-500">통화</p>
            <p className="text-sm font-bold">{plan.call}</p>
          </div>
        </div>
      </div>

      <div className="mt-3 flex justify-end">
        <button className="flex items-center gap-1 text-xs font-bold text-blue-600">
          상세보기
          <ChevronRight size={16} />
        </button>
      </div>

      <div className="mt-4 border-t pt-3">
        <p className="text-sm font-semibold text-blue-600">추천이유</p>

        <ul className="mt-2 space-y-1 text-xs text-gray-600">
          {plan.reasons.map((r, i) => (
            <li key={i}>• {r}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
