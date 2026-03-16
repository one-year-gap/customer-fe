"use client";

import { BarChart3, Gauge, Mail, Phone, X } from "lucide-react";

import { usePlanDetail } from "@/lib/tanstack/query/usePlanDetail";

interface DetailModalProps {
  open: boolean;
  productId: number | null;
  onClose: () => void;
  onCompare: () => void;
}

export default function DetailModal({ open, productId, onClose, onCompare }: DetailModalProps) {
  const { data, isLoading } = usePlanDetail(productId);

  if (!open) return null;
  if (isLoading) return <div className="fixed inset-0 bg-black/40">로딩중...</div>;
  if (!data) return null;

  const d = data;

  return (
    <div
      className="fixed inset-0 z-100 flex items-end justify-center bg-black/40"
      onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-background flex max-h-[90vh] w-full max-w-100.5 flex-col rounded-t-3xl">
        <div className="flex-1 overflow-y-auto px-5 pt-5">
          <div className="mb-4 flex items-center justify-between">
            <span className="bg-secondary-500 rounded-full px-3 py-1 text-xs font-semibold text-white">
              요금제
            </span>
            <button onClick={onClose} className="rounded-full bg-neutral-200 p-2">
              <X size={18} />
            </button>
          </div>

          <h2 className="text-xl font-bold text-neutral-800">{d.name}</h2>

          <div className="mt-2 mb-6 flex items-end gap-1">
            <span className="text-secondary-500 text-3xl font-extrabold">
              {(d.salePrice ?? d.price).toLocaleString("ko-KR")}
            </span>
            <span className="text-sm text-neutral-600">원/월</span>
          </div>

          <div className="mb-6 grid grid-cols-2 gap-3">
            <SpecBox label="데이터" value={d.content.dataAmount ?? "-"} icon={BarChart3} />
            <SpecBox label="통화" value={d.content.benefitVoiceCall ?? "-"} icon={Phone} />
            <SpecBox
              label="테더링"
              value={d.content.tetheringSharingData ? `${d.content.tetheringSharingData}GB` : "-"}
              icon={Gauge}
            />
            <SpecBox label="문자" value={d.content.benefitSms ?? "-"} icon={Mail} />
          </div>

          <h3 className="mb-3 text-sm font-bold text-neutral-600">상세 정보</h3>

          <div className="space-y-3 pb-6">
            {[
              d.content.benefitBrands,
              d.content.benefitMedia,
              d.content.benefitPremium,
              d.content.benefitSignatureFamilyDiscount,
            ]
              .filter(Boolean)
              .map((item, i) => (
                <div key={i} className="rounded-xl bg-neutral-100 px-4 py-3 text-sm">
                  ✓ {item}
                </div>
              ))}
          </div>
        </div>

        <div className="bg-background border-t p-4">
          <button
            onClick={onCompare}
            className="bg-secondary-500 hover:bg-secondary-600 w-full rounded-3xl py-4 text-sm font-semibold text-white shadow-md transition">
            ↓↑ 내 현재 요금과 가격 비교하기
          </button>
        </div>
      </div>
    </div>
  );
}

function SpecBox({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon: React.ElementType;
}) {
  return (
    <div className="rounded-2xl border bg-neutral-50 p-4 shadow-sm">
      <div className="mb-2 flex items-center gap-2 text-neutral-500">
        <Icon size={16} />
        <p className="text-xs">{label}</p>
      </div>
      <p className="text-sm font-semibold text-neutral-800">{value}</p>
    </div>
  );
}
