"use client";

import { useState } from "react";

import { Check, ChevronRight, Shield, Smartphone, Tv, Wifi } from "lucide-react";

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
        const content = plan.content as any;

        const brandBenefits = content?.benefitBrands?.split("|") ?? [];

        return (
          <div
            key={plan.productId}
            onClick={() => setSelectedPlanId(plan.productId)}
            className={`relative cursor-pointer rounded-2xl border bg-white p-5 transition ${
              isSelected ? "border-2 border-blue-500" : "border-gray-200"
            }`}>
            {plan.isBest && (
              <div className="absolute -top-2 left-3 rounded-full bg-red-500 px-3 py-1 text-xs font-bold text-white shadow">
                인기
              </div>
            )}

            <div className="flex items-start justify-between">
              <h3 className="text-base font-extrabold text-gray-900">{plan.name}</h3>

              <div className="text-right">
                <p className="text-base font-extrabold text-blue-600">
                  {formatPrice(plan.salePrice ?? plan.price)}
                  <span className="ml-1 text-xs font-semibold text-gray-500">원/월</span>
                </p>
              </div>
            </div>

            {plan.productType === "MOBILE_PLAN" && (
              <div className="mt-4 grid grid-cols-2 gap-6">
                <div className="flex gap-2">
                  <Wifi size={18} className="mt-1 text-blue-500" />
                  <div>
                    <p className="text-xs font-semibold text-gray-500">데이터</p>
                    <p className="text-sm font-extrabold">{content.dataAmount}</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Smartphone size={18} className="mt-1 text-blue-500" />
                  <div>
                    <p className="text-xs font-semibold text-gray-500">통화</p>
                    <p className="text-sm font-bold">{content.benefitVoiceCall}</p>
                  </div>
                </div>
              </div>
            )}

            {plan.productType === "INTERNET" && (
              <div className="mt-4 flex gap-2">
                <Wifi size={18} className="mt-1 text-blue-500" />
                <div>
                  <p className="text-xs font-semibold text-gray-500">인터넷 속도</p>
                  <p className="text-sm font-extrabold">{content.speed}</p>
                </div>
              </div>
            )}

            {plan.productType === "IPTV" && (
              <div className="mt-4 flex gap-2">
                <Tv size={18} className="mt-1 text-blue-500" />
                <div>
                  <p className="text-xs font-semibold text-gray-500">채널 수</p>
                  <p className="text-sm font-extrabold">{content.channelCount}개</p>
                </div>
              </div>
            )}

            {plan.productType === "ADDON" && (
              <div className="mt-4 flex gap-2">
                <Shield size={18} className="mt-1 text-blue-500" />
                <div>
                  <p className="text-xs font-semibold text-gray-500">서비스 유형</p>
                  <p className="text-sm font-extrabold">{content.addonType}</p>
                </div>
              </div>
            )}

            {brandBenefits.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-x-3 gap-y-1 text-xs text-blue-600">
                {brandBenefits.map((brand: string, index: number) => (
                  <div key={index} className="flex items-center gap-1">
                    <Check size={14} />
                    {brand.trim()}
                  </div>
                ))}
              </div>
            )}

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
