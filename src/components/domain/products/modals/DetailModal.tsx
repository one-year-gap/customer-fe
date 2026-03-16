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
        className="flex max-h-[90vh] w-full max-w-100.5 flex-col rounded-t-3xl bg-white">
        <div className="flex-1 overflow-y-auto px-5 pt-5">
          <div className="mb-4 flex items-center justify-between">
            <span className="rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white">
              요금제
            </span>
            <button onClick={onClose} className="rounded-full bg-gray-200 p-2">
              <X size={18} />
            </button>
          </div>

          <h2 className="text-xl font-bold text-gray-900">{d.name}</h2>

          <div className="mt-2 mb-6 flex items-end gap-1">
            <span className="text-3xl font-extrabold text-blue-700">
              {(d.salePrice ?? d.price).toLocaleString("ko-KR")}
            </span>
            <span className="text-sm text-gray-500">원/월</span>
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

          <h3 className="mb-3 text-sm font-bold text-gray-700">상세 정보</h3>

          <div className="space-y-3 pb-6">
            {[
              d.content.benefitBrands,
              d.content.benefitMedia,
              d.content.benefitPremium,
              d.content.benefitSignatureFamilyDiscount,
            ]
              .filter(Boolean)
              .map((item, i) => (
                <div key={i} className="rounded-xl bg-gray-100 px-4 py-3 text-sm">
                  ✓ {item}
                </div>
              ))}
          </div>
        </div>

        <div className="border-t bg-white p-4">
          <button
            onClick={onCompare}
            className="w-full rounded-3xl bg-blue-600 py-4 text-sm font-semibold text-white shadow-md transition hover:bg-blue-700">
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
    <div className="rounded-2xl border bg-gray-50 p-4 shadow-sm">
      <div className="mb-2 flex items-center gap-2 text-gray-500">
        <Icon size={16} />
        <p className="text-xs">{label}</p>
      </div>
      <p className="text-sm font-semibold text-gray-900">{value}</p>
    </div>
  );
}
