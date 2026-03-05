"use client";

import { ArrowRight, ArrowUpDown, ArrowUpRight, X } from "lucide-react";

import { usePlanCompare } from "@/lib/tanstack/query/usePlanCompare";

interface CompareModalProps {
  open: boolean;
  targetPlanId: number | null;
  onClose: () => void;
  onChangePlan: () => void;
}

export default function CompareModal({
  open,
  targetPlanId,
  onClose,
  onChangePlan,
}: CompareModalProps) {
  const { data, isLoading, isError } = usePlanCompare(targetPlanId, open);

  if (!open) return null;

  if (isLoading) {
    return <div className="fixed inset-0 bg-black/40">로딩중...</div>;
  }

  if (isError || !data) {
    return <div className="fixed inset-0 bg-black/40">비교 API 에러</div>;
  }

  const current = data.current_plan;
  const target = data.target_plan;
  const comparison = data.comparison;

  const priceDiff = comparison?.price_diff ?? 0;
  const absPriceDiff = Math.abs(priceDiff);

  const diffColor =
    priceDiff > 0 ? "text-red-500" : priceDiff < 0 ? "text-blue-500" : "text-gray-500";

  const changedItems = comparison?.benefit_changes?.filter((b: any) => b.is_changed) ?? [];

  return (
    <div className="fixed inset-0 z-60 flex items-end justify-center bg-black/40" onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-100.5 rounded-t-3xl bg-white">
        <div className="max-h-[90vh] overflow-y-auto px-5 pt-5 pb-6">
          {/* header */}
          <div className="flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-lg font-bold">
              <ArrowUpDown size={20} />
              요금제 비교하기
            </h2>

            <button onClick={onClose} className="rounded-full bg-gray-200 p-2">
              <X size={18} />
            </button>
          </div>

          {/* 월 요금 차이 */}
          <div className="mt-6 rounded-xl bg-red-50 p-4">
            <p className="text-xs text-gray-500">월 요금 차이</p>

            <div className="mt-1 flex items-center justify-between">
              <p className={`text-lg font-bold ${diffColor}`}>
                {priceDiff === 0
                  ? "동일"
                  : `${priceDiff > 0 ? "+" : "-"}${absPriceDiff.toLocaleString()}원`}
              </p>

              <ArrowUpRight size={18} className={diffColor} />
            </div>
          </div>

          {/* 변경되는 혜택 */}
          {changedItems.length > 0 && (
            <div className="mt-6 rounded-xl bg-gray-50 p-4">
              <p className="mb-2 text-sm font-semibold">변경되는 혜택</p>

              <ul className="space-y-1 text-xs text-gray-700">
                {changedItems.map((b: any, i: number) => (
                  <li key={i}>
                    <span className="font-semibold">{b.item}</span> : {b.desc}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* 요금제 카드 */}
          <div className="mt-6 grid grid-cols-2 gap-4">
            <PlanCard title="현재" plan={current} />
            <PlanCard title="변경" plan={target} highlight />
          </div>

          {/* 버튼 */}
          <div className="mt-8">
            <button
              onClick={onChangePlan}
              className="flex w-full items-center justify-center gap-2 rounded-3xl bg-blue-600 py-4 text-sm font-semibold text-white shadow-md hover:bg-blue-700">
              <ArrowRight size={18} />
              요금제 바꾸기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function PlanCard({ title, plan, highlight }: any) {
  const price = plan?.salePrice ?? 0;
  const dataAmount = plan?.content?.dataAmount ?? "-";

  const brands = plan?.content?.benefitBrands ? plan.content.benefitBrands.split("|") : [];

  return (
    <div
      className={`rounded-2xl border p-4 ${
        highlight ? "border-2 border-blue-500 bg-blue-50" : "bg-gray-50"
      }`}>
      <p className="mb-1 text-xs text-gray-500">{title}</p>

      <h3 className="text-sm font-bold">{plan?.name}</h3>

      <p className={`mt-1 text-sm font-semibold ${highlight ? "text-blue-700" : ""}`}>
        {price.toLocaleString()} 원
      </p>

      <div className="mt-4 space-y-2 text-xs">
        <Spec label="데이터" value={dataAmount} highlight={highlight} />
        <Spec label="통화" value="무제한" highlight={highlight} />
        <Spec label="속도" value="최대 10Gbps" highlight={highlight} />

        <div>
          <p className={`mb-1 ${highlight ? "text-blue-600" : "text-gray-500"}`}>혜택</p>

          <ul className={`space-y-1 ${highlight ? "text-blue-600" : "text-gray-600"}`}>
            {brands.length > 0 ? (
              brands.map((b: string, i: number) => <li key={i}>- {b.trim()}</li>)
            ) : (
              <li>- 없음</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

function Spec({ label, value, highlight }: any) {
  return (
    <div className={`rounded-lg p-2 ${highlight ? "bg-blue-100" : ""}`}>
      <p className="mb-0.5 text-gray-500">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  );
}
