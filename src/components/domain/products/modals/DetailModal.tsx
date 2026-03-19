"use client";

import { BarChart3, Gauge, Mail, Phone, Shield, Tv, Wifi, X } from "lucide-react";

import { useLogger } from "@/hooks/useLogger";
import { usePlanDetail } from "@/lib/tanstack/query/usePlanDetail";

interface DetailModalProps {
  open: boolean;
  productId: number | null;
  onClose: () => void;
  onCompare: () => void;
}

export default function DetailModal({ open, productId, onClose, onCompare }: DetailModalProps) {
  const { data, isLoading } = usePlanDetail(productId);
  const { trackClick } = useLogger();

  if (!open) return null;
  if (isLoading)
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/40 text-white">
        로딩중...
      </div>
    );
  if (!data) return null;

  const d = data;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-black/40"
      onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-neutral-0 flex max-h-[90vh] w-full max-w-[402px] flex-col rounded-t-3xl">
        <div className="flex-1 overflow-y-auto px-5 pt-5">
          <div className="mb-4 flex items-center justify-between">
            <span className="bg-secondary-500 text-neutral-0 rounded-full px-3 py-1 text-xs font-semibold">
              상품 상세
            </span>

            <button onClick={onClose} className="rounded-full bg-neutral-200 p-2">
              <X size={18} />
            </button>
          </div>

          <h2 className="text-xl font-bold text-neutral-900">{d.name}</h2>

          <div className="mt-2 mb-6 flex items-end gap-1">
            <span className="text-secondary-500 text-3xl font-extrabold">
              {(d.salePrice ?? d.price).toLocaleString("ko-KR")}
            </span>
            <span className="text-sm text-gray-500">원/월</span>
          </div>

          {d.productType === "MOBILE_PLAN" && <MobilePlanDetail d={d} />}
          {d.productType === "TAB_WATCH_PLAN" && <TabWatchDetail d={d} />}
          {d.productType === "INTERNET" && <InternetDetail d={d} />}
          {d.productType === "IPTV" && <IptvDetail d={d} />}
          {d.productType === "ADDON" && <AddonDetail d={d} />}
        </div>

        {d.productType === "MOBILE_PLAN" && (
          <div className="bg-neutral-0 border-t p-4">
            <button
              onClick={() => {
                trackClick("click_compare", {
                  target_id: d.productId,
                  target_tags: d.tags,
                });
                onCompare();
              }}
              className="bg-secondary-500 text-neutral-0 hover:bg-secondary-700 w-full rounded-3xl py-4 text-sm font-semibold shadow-md transition">
              ↓↑ 내 현재 요금과 가격 비교하기
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function MobilePlanDetail({ d }: { d: any }) {
  const c = d.content;

  return (
    <>
      <div className="mb-6 grid grid-cols-2 gap-3">
        <SpecBox label="데이터" value={c.dataAmount} icon={BarChart3} />
        <SpecBox label="통화" value={c.benefitVoiceCall} icon={Phone} />
        <SpecBox
          label="테더링"
          value={c.tetheringSharingData ? `${c.tetheringSharingData}GB` : "-"}
          icon={Gauge}
        />
        <SpecBox label="문자" value={c.benefitSms} icon={Mail} />
      </div>

      <h3 className="mb-3 text-sm font-bold text-gray-700">상세 정보</h3>

      <div className="space-y-3 pb-6">
        {[c.benefitBrands, c.benefitMedia, c.benefitPremium, c.benefitSignatureFamilyDiscount]
          .filter(Boolean)
          .map((item: string, i: number) => (
            <div key={i} className="rounded-xl bg-neutral-100 px-4 py-3 text-sm">
              ✓ {item}
            </div>
          ))}
      </div>
    </>
  );
}

function TabWatchDetail({ d }: { d: any }) {
  const c = d.content;

  return (
    <div className="mb-6 grid grid-cols-2 gap-3">
      <SpecBox label="데이터" value={c.dataAmount} icon={BarChart3} />
      <SpecBox label="통화" value={c.benefitVoiceCall} icon={Phone} />
      <SpecBox label="문자" value={c.benefitSms} icon={Mail} />
    </div>
  );
}

function InternetDetail({ d }: { d: any }) {
  const c = d.content;

  return (
    <div className="space-y-4 pb-6">
      <div className="rounded-xl bg-neutral-100 p-4 text-sm">{c.planTitle}</div>

      <SpecBox label="인터넷 속도" value={c.speed} icon={Wifi} />

      <div className="rounded-xl bg-neutral-100 p-4 text-sm whitespace-pre-line">{c.benefits}</div>
    </div>
  );
}

function IptvDetail({ d }: { d: any }) {
  const c = d.content;

  return (
    <div className="space-y-4 pb-6">
      <div className="rounded-xl bg-neutral-100 p-4 text-sm">{c.planTitle}</div>

      <SpecBox label="채널 수" value={`${c.channelCount}개`} icon={Tv} />

      <div className="rounded-xl bg-neutral-100 p-4 text-sm whitespace-pre-line">{c.benefits}</div>
    </div>
  );
}

function AddonDetail({ d }: { d: any }) {
  const c = d.content;

  return (
    <div className="space-y-4 pb-6">
      <SpecBox label="서비스 유형" value={c.addonType} icon={Shield} />

      <div className="rounded-xl bg-neutral-100 p-4 text-sm whitespace-pre-line">
        {c.description}
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
  value: string | number | null;
  icon: React.ElementType;
}) {
  return (
    <div className="rounded-2xl border bg-neutral-50 p-4 shadow-sm">
      <div className="mb-2 flex items-center gap-2 text-neutral-500">
        <Icon size={16} />
        <p className="text-xs">{label}</p>
      </div>

      <p className="text-sm font-semibold text-neutral-900">{value ?? "-"}</p>
    </div>
  );
}
