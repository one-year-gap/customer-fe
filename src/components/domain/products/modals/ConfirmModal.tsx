"use client";

import { AlertTriangle } from "lucide-react";

interface ConfirmChangeModalProps {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function ConfirmChangeModal({ open, onCancel, onConfirm }: ConfirmChangeModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-200 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="animate-in fade-in zoom-in-95 bg-background w-90 rounded-3xl p-6 shadow-2xl">
        <div className="flex flex-col items-center text-center">
          <div className="bg-secondary-300 mb-3 flex h-12 w-12 items-center justify-center rounded-full">
            <AlertTriangle className="text-hit-500 h-6 w-6" />
          </div>

          <h2 className="text-lg font-bold text-neutral-900">요금제를 변경하시겠습니까?</h2>

          <p className="mt-2 text-sm text-neutral-700">변경 시 기존 혜택이 사라질 수 있습니다.</p>
        </div>

        <div className="mt-6 flex gap-3">
          <button
            onClick={onCancel}
            className="bg-background flex-1 rounded-xl border border-neutral-200 py-2.5 text-sm font-semibold text-neutral-600 transition hover:bg-neutral-100">
            취소
          </button>

          <button
            onClick={onConfirm}
            className="bg-secondary-500 flex-1 rounded-xl py-2.5 text-sm font-semibold text-white shadow-md transition hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]">
            변경하기
          </button>
        </div>
      </div>
    </div>
  );
}
