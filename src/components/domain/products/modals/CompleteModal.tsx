"use client";

interface ChangeCompleteModalProps {
  open: boolean;
  onClose: () => void;
}

export default function ChangeCompleteModal({ open, onClose }: ChangeCompleteModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/40">
      <div className="w-[320px] rounded-2xl bg-white p-6 text-center">
        <h2 className="mb-3 text-lg font-bold">요금제 변경이 완료되었습니다 🎉</h2>

        <button
          onClick={onClose}
          className="mt-4 w-full rounded-xl bg-blue-600 py-2 font-semibold text-white">
          확인
        </button>
      </div>
    </div>
  );
}
