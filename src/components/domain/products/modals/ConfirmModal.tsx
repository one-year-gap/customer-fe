"use client";

interface ConfirmChangeModalProps {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function ConfirmChangeModal({ open, onCancel, onConfirm }: ConfirmChangeModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/40">
      <div className="w-[320px] rounded-2xl bg-white p-6">
        <h2 className="mb-4 text-lg font-bold">요금제를 변경하시겠습니까?</h2>

        <div className="flex gap-3">
          <button onClick={onCancel} className="flex-1 rounded-xl bg-gray-200 py-2 font-semibold">
            취소
          </button>

          <button
            onClick={onConfirm}
            className="flex-1 rounded-xl bg-blue-600 py-2 font-semibold text-white">
            확인
          </button>
        </div>
      </div>
    </div>
  );
}
