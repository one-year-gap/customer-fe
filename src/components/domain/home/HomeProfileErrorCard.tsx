"use client";

type HomeProfileErrorCardProps = {
  onRetry: () => void;
};

export default function HomeProfileErrorCard({ onRetry }: HomeProfileErrorCardProps) {
  return (
    <div className="bg-neutral-0 rounded-lg p-4 shadow-sm">
      <div className="flex flex-col items-start gap-3">
        <div className="h-5 w-40 rounded bg-neutral-100" />
        <div className="h-32 w-full rounded-xl bg-neutral-50" />
        <div className="space-y-1">
          <p className="text-hit-500 text-sm font-medium">가입 정보를 불러오지 못했어요.</p>
          <p className="text-xs text-neutral-500">
            잠시 후 다시 시도하거나 네트워크 상태를 확인해주세요.
          </p>
        </div>
        <button
          type="button"
          onClick={onRetry}
          className="bg-primary-500 text-neutral-0 hover:bg-primary-900 cursor-pointer rounded-full px-4 py-2 text-sm font-medium">
          다시 시도
        </button>
      </div>
    </div>
  );
}
