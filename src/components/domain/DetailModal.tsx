"use client";

import { BarChart3, Gauge, Mail, Phone, X } from "lucide-react";

export default function DetailModal() {
  const d = {
    name: "5G 프리미어 슈퍼",
    price: 89000,
    data: "완전 무제한",
    call: "무제한",
    speed: "최대 10Gbps",
    text: "무제한",
    details: [
      "데이터 완전 무제한 (속도 제한 없음)",
      "테더링/핫스팟 무제한",
      "해외 로밍 데이터 3GB 제공",
      "프리미엄 OTT 4종 포함",
      "VIP 전용 고객센터 이용",
    ],
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-neutral-900/40">
      <div className="animate-in slide-in-from-bottom bg-background w-full max-w-100.5 rounded-t-3xl p-5 pb-6">
        <div className="mb-4 flex items-center justify-between">
          <span className="bg-hit-500 text-neutral-0 rounded-md px-2 py-1 text-xs font-semibold">
            인기
          </span>
          <button className="rounded-full bg-neutral-100 p-1 text-neutral-700 transition-colors hover:bg-neutral-300">
            <X size={18} />
          </button>
        </div>

        <h2 className="text-foreground text-lg font-bold">{d.name}</h2>

        <div className="mt-2 mb-5 flex items-end gap-1">
          <span className="text-primary-500 text-2xl font-extrabold">
            {d.price.toLocaleString()}
          </span>
          <span className="text-sm text-neutral-500">원/월</span>
        </div>

        <div className="mb-5 grid grid-cols-2 gap-3">
          <SpecBox label="데이터" value={d.data} icon={BarChart3} />
          <SpecBox label="통화" value={d.call} icon={Phone} />
          <SpecBox label="속도" value={d.speed} icon={Gauge} />
          <SpecBox label="문자" value={d.text} icon={Mail} />
        </div>

        <div className="mb-5 space-y-2">
          {d.details.map((item, i) => (
            <div key={i} className="rounded-xl bg-neutral-100 px-4 py-3 text-sm text-neutral-900">
              ✓ {item}
            </div>
          ))}
        </div>

        <button className="bg-secondary-500 text-secondary-foreground hover:bg-secondary-700 w-full rounded-3xl py-3 font-semibold transition-colors">
          내 현재 요금과 가격 비교하기
        </button>
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
    <div className="border-border bg-muted rounded-2xl border p-4">
      <div className="text-muted-foreground mb-2 flex items-center gap-2">
        <Icon size={16} />
        <p className="text-xs">{label}</p>
      </div>
      <p className="text-foreground text-sm font-semibold">{value}</p>
    </div>
  );
}
