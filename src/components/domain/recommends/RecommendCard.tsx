"use client";

import { ChevronRight } from "lucide-react";

interface RecommendCardProps {
  planId: number;
  name: string;
  savings: number;
  reason: string;
  onOpenDetail: (id: number) => void;
}

export default function RecommendCard({
  planId,
  name,
  savings,
  reason,
  onOpenDetail,
}: RecommendCardProps) {
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
