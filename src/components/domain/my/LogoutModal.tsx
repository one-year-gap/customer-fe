"use client";

import Image from "next/image";

import { X } from "lucide-react";

import logout from "@/assets/images/HoleSleep.png";

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function LogoutModal({ isOpen, onClose, onConfirm }: LogoutModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* 배경 */}
      <div className="absolute inset-0 bg-neutral-900 opacity-60" onClick={onClose} />

      {/* 모달창 */}
      <div className="bg-neutral-0 relative z-10 flex w-72 flex-col gap-4 rounded-2xl p-4 shadow-lg">
        <X
          onClick={onClose}
          className="absolute top-4 right-4 h-6 w-6 cursor-pointer text-neutral-500 hover:text-neutral-900"
        />
        <div className="flex justify-center">
          <Image src={logout} alt="로그아웃" width={90} height={55} className="mt-1" />
        </div>

        <p className="text-primary-500 text-center text-lg font-semibold">로그아웃 하시겠어요?</p>

        <div className="flex flex-col text-center text-sm text-neutral-500">
          <span>로그아웃하면 알림 수신이 중단되고,</span>
          <span>다시 로그인해야 서비스를 이용할 수 있어요.</span>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 cursor-pointer rounded-lg border border-neutral-300 py-2 text-sm font-semibold hover:opacity-60">
            취소
          </button>

          <button
            onClick={onConfirm}
            className="bg-hit-500 text-neutral-0 flex-1 cursor-pointer rounded-lg py-2 text-sm font-semibold hover:opacity-60">
            로그아웃
          </button>
        </div>
      </div>
    </div>
  );
}
