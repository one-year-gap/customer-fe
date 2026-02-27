"use client";

import { ArrowRight, ArrowUpDown, ArrowUpRight, X } from "lucide-react";

interface CompareModalProps {
  open: boolean;
  onClose: () => void;
  onChangePlan: () => void;
}

export default function CompareModal({ open, onClose, onChangePlan }: CompareModalProps) {
  if (!open) return null;

  const d = {
    priceDiff: 20000,
    current: {
      name: "5G 프리미어 에센셜",
      price: 69000,
      data: "무제한 (일 2GB 후 3Mbps)",
      call: "무제한",
      speed: "최대 10Gbps",
      benefits: ["넷플릭스 스탠다드", "지니 뮤직"],
    },
    target: {
      name: "5G 프리미어 슈퍼",
      price: 89000,
      data: "완전 무제한",
      call: "무제한",
      speed: "최대 10Gbps",
      benefits: ["넷플릭스 프리미엄", "디즈니+ 프리미엄", "지니 뮤직", "U+모바일tv"],
    },
  };

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center bg-black/40"
      onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-[402px] rounded-t-3xl bg-white">
        <div className="max-h-[90vh] overflow-y-auto px-5 pt-5 pb-6">
          <div className="flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-lg font-bold">
              <ArrowUpDown size={20} />
              요금제 비교하기
            </h2>
            <button onClick={onClose} className="rounded-full bg-gray-200 p-2">
              <X size={18} />
            </button>
          </div>

          <div className="mt-6 rounded-xl bg-red-50 p-4">
            <p className="text-xs text-gray-500">월 요금 차이</p>
            <div className="mt-1 flex items-center justify-between">
              <p className="text-lg font-bold text-red-500">+{d.priceDiff.toLocaleString()}원</p>
              <ArrowUpRight size={18} className="text-red-500" />
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="rounded-2xl border bg-gray-50 p-4">
              <p className="mb-1 text-xs text-gray-500">현재</p>
              <h3 className="text-sm font-bold">{d.current.name}</h3>
              <p className="mt-1 text-sm font-semibold">{d.current.price.toLocaleString()}원</p>

              <div className="mt-4 space-y-3 text-xs">
                <Spec label="데이터" value={d.current.data} />
                <Spec label="통화" value={d.current.call} />
                <Spec label="속도" value={d.current.speed} />
                <div>
                  <p className="mb-1 text-gray-500">혜택</p>
                  <ul className="space-y-1 text-gray-600">
                    {d.current.benefits.map((b, i) => (
                      <li key={i}>- {b}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border-2 border-blue-500 bg-blue-50 p-4">
              <span className="mb-1 inline-block rounded-md bg-blue-600 px-2 py-0.5 text-[10px] font-semibold text-white">
                변경
              </span>

              <h3 className="text-sm font-bold">{d.target.name}</h3>
              <p className="mt-1 text-sm font-semibold text-blue-700">
                {d.target.price.toLocaleString()}원
              </p>

              <div className="mt-4 space-y-3 text-xs">
                <Spec label="데이터" value={d.target.data} highlight />
                <Spec label="통화" value={d.target.call} highlight />
                <Spec label="속도" value={d.target.speed} highlight />
                <div>
                  <p className="mb-1 text-blue-600">혜택</p>
                  <ul className="space-y-1 text-blue-600">
                    {d.target.benefits.map((b, i) => (
                      <li key={i}>- {b}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <button
              onClick={onChangePlan}
              className="flex w-full items-center justify-center gap-2 rounded-3xl bg-blue-600 py-4 text-sm font-semibold text-white shadow-md transition hover:bg-blue-700">
              <ArrowRight size={18} />
              요금제 바꾸기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Spec({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className={`rounded-lg p-2 ${highlight ? "bg-blue-100" : ""}`}>
      <p className="mb-0.5 text-gray-500">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  );
}
