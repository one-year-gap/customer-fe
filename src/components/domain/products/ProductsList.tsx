"use client";

import { useState } from "react";

import { ChevronRight, Smartphone, Wifi } from "lucide-react";

import { usePlans } from "@/lib/tanstack/query/usePlan";

interface ProductsListProps {
  category: string;
  onOpenDetail: (planId: number) => void;
}

const formatPrice = (price?: number) => (price ? price.toLocaleString("ko-KR") : "0");

export function ProductsList({ category, onOpenDetail }: ProductsListProps) {
  const [selectedPlanId, setSelectedPlanId] = useState<number | null>(null);

  const { data, isLoading, isError } = usePlans(category);

  if (isLoading) return <div>로딩중...</div>;
  if (isError) return <div>요금제 불러오기 실패</div>;

  const plans = data?.content ?? [];

  if (plans.length === 0) {
    return <div>등록된 요금제가 없습니다.</div>;
  }

  return (
    <div className="space-y-4">
      {plans.map((plan) => {
        const isSelected = selectedPlanId === plan.productId;

        return (
          <div
            key={plan.productId}
            onClick={() => setSelectedPlanId(plan.productId)}
            className={`relative cursor-pointer rounded-2xl border bg-white p-5 transition ${
              isSelected ? "border-2 border-blue-500" : "border-gray-200"
            }`}>
            <div className="flex items-start justify-between">
              <h3 className="text-base font-extrabold text-gray-900">{plan.name}</h3>

              <div className="text-right">
                <p className="text-base font-extrabold text-blue-600">
                  {formatPrice(plan.salePrice ?? plan.price)}
                  <span className="ml-1 text-xs font-semibold text-gray-500">원/월</span>
                </p>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-6">
              <div className="flex gap-2">
                <Wifi size={18} className="mt-1 text-blue-500" />
                <div>
                  <p className="text-xs font-semibold text-gray-500">데이터</p>
                  <p className="text-sm font-extrabold">{plan.content.dataAmount}</p>
                </div>
              </div>

              <div className="flex gap-2">
                <Smartphone size={18} className="mt-1 text-blue-500" />
                <div>
                  <p className="text-xs font-semibold text-gray-500">통화</p>
                  <p className="text-sm font-bold">{plan.content.benefitVoiceCall}</p>
                </div>
              </div>
            </div>

            <div className="mt-3 flex justify-end">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenDetail(plan.productId);
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
  );
}
