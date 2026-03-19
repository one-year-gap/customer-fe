"use client";

import { TicketPercent, X } from "lucide-react";

interface CouponModalProps {
  open: boolean;
  couponType: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmModal({
  open,
  couponType,
  description,
  confirmText = "확인",
  cancelText = "취소",
  isLoading = false,
  onConfirm,
  onCancel,
}: CouponModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* 배경 */}
      <div className="absolute inset-0" onClick={onCancel}></div>

      {/* 모달창 */}
      <div
        role="dialog"
        aria-modal="true"
        tabIndex={0}
        autoFocus
        onKeyDown={(e) => {
          if (e.key === "Escape") onCancel();
        }}
        className="relative z-10 flex w-[360px] flex-col items-center justify-center gap-4 rounded-xl border border-neutral-300 bg-neutral-50 p-4 shadow-lg">
        <div className="bg-secondary-100 border-secondary-500 flex items-center justify-center rounded-full border-2 p-2">
          <TicketPercent className="text-secondary-500 h-8 w-8" />
        </div>
        <button
          className="text-neutral-0 absolute top-3 right-4 cursor-pointer rounded-full bg-neutral-300 p-0.5 hover:bg-neutral-500 hover:opacity-60"
          onClick={onCancel}>
          <X className="h-6 w-6" />
        </button>

        <h3 className="text-md text-center font-semibold text-neutral-900">
          {couponType}
          <span className="font-normal">을 사용하시겠습니까?</span>
        </h3>

        {description && <p className="text-center text-sm text-neutral-500">{description}</p>}

        <div className="flex gap-4">
          <button
            onClick={onCancel}
            className="bg-neutral-0 flex-1 cursor-pointer rounded-md border border-neutral-300 px-4 py-1 text-xs font-medium hover:opacity-60">
            {cancelText}
          </button>

          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="bg-secondary-500 text-neutral-0 w-fit flex-1 cursor-pointer rounded-md px-4 py-1 text-xs font-medium hover:opacity-60">
            {isLoading ? "처리중..." : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
