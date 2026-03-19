"use client";

import { useState } from "react";

import { ArrowDown, ArrowRight, ArrowUp, ArrowUpDown, X } from "lucide-react";

import { LogProvider } from "@/context/LogContext";
import { useLogger } from "@/hooks/useLogger";
import { useChangePlan } from "@/lib/tanstack/mutation/useChangePlan";
import { usePlanCompare } from "@/lib/tanstack/query/usePlanCompare";

import CompleteModal from "./CompleteModal";
import ConfirmModal from "./ConfirmModal";

interface CompareModalProps {
  open: boolean;
  targetPlanId: number | null;
  onClose: () => void;
}

export default function CompareModal({ open, targetPlanId, onClose }: CompareModalProps) {
  const { data, isLoading, isError } = usePlanCompare(targetPlanId, open);
  const { mutateAsync } = useChangePlan();

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [completeOpen, setCompleteOpen] = useState(false);
  const { trackClick } = useLogger();

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
    priceDiff > 0 ? "text-hit-500" : priceDiff < 0 ? "text-secondary-500" : "text-gray-500";
  const diffBackground =
    priceDiff > 0 ? "bg-hit-100" : priceDiff < 0 ? "bg-secondary-50" : "bg-neutral-200";

  const changedItems = comparison?.benefit_changes?.filter((b) => b.is_changed) ?? [];

  const handleConfirmChange = async () => {
    if (!targetPlanId) return;

    try {
      await mutateAsync({
        targetProductId: targetPlanId,
      });

      setConfirmOpen(false);
      setCompleteOpen(true);
    } catch (error) {
      console.error("요금제 변경 실패", error);
    }
  };

  return (
    <LogProvider value={{ from_plan_id: current?.productId, to_plan_id: target?.productId }}>
      <div
        className="fixed inset-0 z-60 flex items-end justify-center bg-black/40"
        onClick={onClose}>
        <div
          onClick={(e) => e.stopPropagation()}
          className="bg-neutral-0 relative w-full max-w-100.5 rounded-t-3xl">
          <div className="max-h-[90vh] overflow-y-auto px-5 pt-5 pb-6">
            <div className="flex items-center justify-between">
              <h2 className="flex items-center gap-2 text-lg font-bold">
                <ArrowUpDown size={20} />
                요금제 비교하기
              </h2>

              <button
                onClick={onClose}
                className="cursor-pointer rounded-full bg-neutral-200 p-2 hover:bg-neutral-300">
                <X size={18} />
              </button>
            </div>

            {/* 가격 차이 */}
            <div className={`${diffBackground} mt-6 rounded-xl p-4`}>
              <p className="text-xs text-neutral-500">월 요금 차이</p>

              <div className="mt-1 flex items-center justify-between">
                <p className={`text-lg font-bold ${diffColor}`}>
                  {priceDiff === 0
                    ? "동일"
                    : `${priceDiff > 0 ? "+" : "-"}${absPriceDiff.toLocaleString()}원`}
                </p>

                {priceDiff > 0 ? (
                  <ArrowUp size={18} className={diffColor} />
                ) : priceDiff < 0 ? (
                  <ArrowDown size={18} className={diffColor} />
                ) : (
                  <span className={`text-lg font-bold ${diffColor}`}>-</span>
                )}
              </div>
            </div>

            {/* 변경 혜택 */}
            {changedItems.length > 0 && (
              <div className="mt-6 rounded-xl bg-neutral-50 p-4">
                <p className="mb-2 text-sm font-semibold">변경되는 혜택</p>

                <ul className="space-y-1 text-xs text-neutral-700">
                  {changedItems.map((b, i) => (
                    <li key={i}>
                      <span className="font-semibold">{b.item}</span> : {b.desc}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-6 grid grid-cols-2 gap-4">
              <PlanCard title="현재" plan={current} />
              <PlanCard title="변경" plan={target} highlight />
            </div>

            <div className="mt-8">
              <CompareTrigger onTrigger={() => setConfirmOpen(true)} />
            </div>
          </div>
        </div>
      </div>

      <ConfirmModal
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={handleConfirmChange}
      />

      <CompleteModal
        open={completeOpen}
        onClose={() => {
          setCompleteOpen(false);
          onClose();
        }}
      />
    </LogProvider>
  );
}
function CompareTrigger({ onTrigger }: { onTrigger: () => void }) {
  const { trackClick } = useLogger();
  return (
    <button
      onClick={() => {
        trackClick("click_change", {
          is_success: false,
        });
        onTrigger();
      }}
      className="bg-secondary-500 text-neutral-0 hover:bg-secondary-700 flex w-full cursor-pointer items-center justify-center gap-2 rounded-3xl py-4 text-sm font-semibold shadow-md">
      <ArrowRight size={18} />
      요금제 바꾸기
    </button>
  );
}

interface PlanCardProps {
  title: string;
  plan: any;
  highlight?: boolean;
}

function PlanCard({ title, plan, highlight }: PlanCardProps) {
  const price = plan?.salePrice ?? 0;
  const dataAmount = plan?.content?.dataAmount ?? "-";

  const brands = plan?.content?.benefitBrands ? plan.content.benefitBrands.split("|") : [];

  return (
    <div
      className={`rounded-2xl border p-4 ${
        highlight ? "bg-secondary-50 border-secondary-500 border-2" : "bg-neutral-50"
      }`}>
      <p className="mb-1 text-xs text-neutral-500">{title}</p>

      <h3 className="text-sm font-bold">{plan?.name}</h3>

      <p className={`mt-1 text-sm font-semibold ${highlight ? "text-secondary-500" : ""}`}>
        {price.toLocaleString()} 원
      </p>

      <div className="mt-4 space-y-2 text-xs">
        <Spec label="데이터" value={dataAmount} highlight={highlight} />
        <Spec label="통화" value="무제한" highlight={highlight} />
        <Spec label="속도" value="최대 10Gbps" highlight={highlight} />

        <div>
          <p className={`${highlight ? "text-secondary-500" : "text-neutral-500"} mb-1`}>혜택</p>

          <ul className={`${highlight ? "text-secondary-500" : "text-neutral-00"} space-y-1`}>
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

interface SpecProps {
  label: string;
  value: string;
  highlight?: boolean;
}

function Spec({ label, value, highlight }: SpecProps) {
  return (
    <div className={`rounded-lg p-2 ${highlight ? "bg-secindary-50" : ""}`}>
      <p className="mb-0.5 text-neutral-500">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  );
}
