"use client";

import { CheckCircle2 } from "lucide-react";

import { useLogger } from "@/hooks/useLogger";

interface ChangeCompleteModalProps {
  open: boolean;
  onClose: () => void;
}

export default function ChangeCompleteModal({ open, onClose }: ChangeCompleteModalProps) {
  const { trackClick } = useLogger();
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-200 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="animate-in fade-in zoom-in-95 bg-background w-90 rounded-3xl p-6 text-center shadow-2xl">
        <div className="flex justify-center">
          <div className="bg-background flex h-14 w-14 items-center justify-center rounded-full">
            <CheckCircle2 className="text-recent-500 h-7 w-7" />
          </div>
        </div>
        <h2 className="mt-4 text-lg font-bold text-neutral-900">요금제 변경 완료</h2>

        <p className="mt-2 text-sm text-neutral-500">
          새로운 요금제가 정상적으로 적용되었습니다 🎉
        </p>

        <button
          onClick={() => {
            trackClick("click_change_success", {
              is_success: true,
            });
            onClose();
          }}
          className="bg-secondary-500 text-neutral-0 hover:bg-secondary-700 mt-6 w-full cursor-pointer rounded-xl py-2.5 text-sm font-semibold shadow-md transition">
          확인
        </button>
      </div>
    </div>
  );
}
