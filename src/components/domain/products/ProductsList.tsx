"use client";

import { useState } from "react";

import { Check, ChevronRight, Shield, Smartphone, Tv, Wifi } from "lucide-react";

import { useLogger } from "@/hooks/useLogger";
import { usePlans } from "@/lib/tanstack/query/usePlan";
import type { ProductType } from "@/models/log";

interface ProductsListProps {
  category: ProductType;
  onOpenDetail: (planId: number) => void;
}

const formatPrice = (price?: number) => (price ? price.toLocaleString("ko-KR") : "0");

export function ProductsList({ category, onOpenDetail }: ProductsListProps) {
  const { trackClick } = useLogger();
  const [selectedPlanId, setSelectedPlanId] = useState<number | null>(null);

  const { data, isLoading, isError } = usePlans(category);

  if (isLoading) return <ProductsListSkeleton />;
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
            className={`bg-neutral-0 relative rounded-2xl border p-5 transition ${
              isSelected ? "border-secondary-500 border-2" : "border-neutral-300"
            }`}>
            {plan.isBest && (
              <div className="bg-hit-500 absolute -top-2 left-3 rounded-full px-3 py-1 text-xs font-bold text-white shadow">
                인기
              </div>
            )}

            <div className="flex items-start justify-between">
              <h3 className="text-base font-extrabold text-neutral-900">{plan.name}</h3>

              <div className="text-right">
                <p className="text-secondary-500 text-base font-extrabold">
                  {formatPrice(plan.salePrice ?? plan.price)}
                  <span className="ml-1 text-xs font-semibold text-neutral-500">원/월</span>
                </p>
              </div>
            </div>

            {plan.productType === "MOBILE_PLAN" && (
              <div className="mt-4 grid grid-cols-2 gap-6">
                <div className="flex gap-2">
                  <Wifi size={18} className="text-secondary-500 mt-1" />
                  <div>
                    <p className="text-xs font-semibold text-neutral-500">데이터</p>
                    <p className="text-sm font-extrabold">{content.dataAmount}</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Smartphone size={18} className="text-secondary-500 mt-1" />
                  <div>
                    <p className="text-xs font-semibold text-neutral-500">통화</p>
                    <p className="text-sm font-bold">{content.benefitVoiceCall}</p>
                  </div>
                </div>
              </div>
            )}

            {plan.productType === "INTERNET" && (
              <div className="mt-4 flex gap-2">
                <Wifi size={18} className="text-secondary-500 mt-1" />
                <div>
                  <p className="text-xs font-semibold text-neutral-500">인터넷 속도</p>
                  <p className="text-sm font-extrabold">{content.speed}</p>
                </div>
              </div>
            )}

            {plan.productType === "IPTV" && (
              <div className="mt-4 flex gap-2">
                <Tv size={18} className="text-secondary-500 mt-1" />
                <div>
                  <p className="text-xs font-semibold text-neutral-500">채널 수</p>
                  <p className="text-sm font-extrabold">{content.channelCount}개</p>
                </div>
              </div>
            )}

            {plan.productType === "ADDON" && (
              <div className="mt-4 flex gap-2">
                <Shield size={18} className="text-secondary-500 mt-1" />
                <div>
                  <p className="text-xs font-semibold text-neutral-500">서비스 유형</p>
                  <p className="text-sm font-extrabold">{content.addonType}</p>
                </div>
              </div>
            )}

            {brandBenefits.length > 0 && (
              <div className="text-secondary-500 mt-4 flex flex-wrap gap-x-3 gap-y-1 text-xs">
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
                  trackClick("click_product_detail", {
                    product_id: plan.productId,
                    product_name: plan.name,
                    product_type: category,
                    tags: plan.tags,
                  });
                  onOpenDetail(plan.productId);
                }}
                className="text-secondary-500 hover:text-secondary-700 flex cursor-pointer items-center gap-1 text-xs font-bold">
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

function ProductsListSkeleton() {
  return (
    <div className="animate-pulse space-y-4">
      {[1, 2, 3].map((key) => (
        <div key={key} className="bg-neutral-0 relative rounded-2xl border border-neutral-300 p-5">
          <div className="flex items-start justify-between">
            <div className="h-5 w-32 rounded bg-neutral-200" />
            <div className="h-5 w-24 rounded bg-neutral-200" />
          </div>

          <div className="mt-6 grid grid-cols-2 gap-6"></div>
          <div className="mt-3 flex justify-end">
            <div className="h-4 w-20 rounded bg-neutral-200" />
          </div>
        </div>
      ))}
    </div>
  );
}
