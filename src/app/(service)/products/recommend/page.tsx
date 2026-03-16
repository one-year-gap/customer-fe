"use client";

import { useState } from "react";

import { ChevronRight } from "lucide-react";

import CompareModal from "@/components/domain/products/modals/CompareModal";
import DetailModal from "@/components/domain/products/modals/DetailModal";
import { ProductsHeader } from "@/components/domain/products/ProductsHeader";
import { useRecommendPlan } from "@/lib/tanstack/query/useRecommendPlan";

type ModalType = "none" | "detail" | "compare";

export default function RecommendPage() {
  const memberId = 1;

  const profileText = "사용자 프로필 텍스트";

  const { data, isLoading, isError } = useRecommendPlan(memberId, profileText);

  const [modal, setModal] = useState<ModalType>("none");
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const plans = data?.recommendedProducts ?? [];

  if (isLoading) return <div className="px-4">추천 요금제 불러오는 중...</div>;
  if (isError) return <div className="px-4">추천 요금제 불러오기 실패</div>;
  if (plans.length === 0) return <div className="px-4">추천 요금제가 없습니다.</div>;

  return (
    <div className="space-y-6 px-4 pb-24">
      <ProductsHeader />

      <div className="space-y-4">
        {plans.map((plan) => (
          <RecommendCard
            key={plan.productId}
            planId={plan.productId}
            name={plan.productName}
            price={plan.productPrice}
            salePrice={plan.salePrice}
            reason={plan.reason}
            onOpenDetail={(id) => {
              setSelectedId(id);
              setModal("detail");
            }}
          />
        ))}
      </div>

      <DetailModal
        open={modal === "detail"}
        productId={selectedId}
        onClose={() => setModal("none")}
        onCompare={() => setModal("compare")}
      />

      <CompareModal
        open={modal === "compare"}
        targetPlanId={selectedId}
        onClose={() => setModal("none")}
      />
    </div>
  );
}

interface RecommendCardProps {
  planId: number;
  name: string;
  price: number;
  salePrice: number;
  reason: string;
  onOpenDetail: (id: number) => void;
}

function RecommendCard({
  planId,
  name,
  price,
  salePrice,
  reason,
  onOpenDetail,
}: RecommendCardProps) {
  const savings = price - salePrice;

  return (
    <div className="border-primary-200 bg-background rounded-2xl border-2 p-5 shadow-sm">
      <span className="bg-primary-500 text-neutral-0 rounded-full px-3 py-1 text-xs font-semibold">
        추천
      </span>

      <div className="mt-2 flex items-center justify-between">
        <div className="text-base font-bold text-neutral-800">{name}</div>

        <p className="text-primary-500 font-bold">
          {savings.toLocaleString()}
          <span className="ml-1 text-xs">원 절약</span>
        </p>
      </div>

      <div className="mt-3 flex justify-end">
        <button
          onClick={() => onOpenDetail(planId)}
          className="text-secondary-700 flex items-center gap-1 text-xs font-bold">
          상세보기
          <ChevronRight size={16} />
        </button>
      </div>

      <div className="mt-4 border-t pt-3">
        <p className="text-secondary-700 text-sm font-semibold">추천 이유</p>
        <p className="mt-2 text-xs text-neutral-700">{reason}</p>
      </div>
    </div>
  );
}
