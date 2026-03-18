"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { toast } from "sonner";

import { useRefresh } from "@/lib/tanstack/mutation/user";

export default function GoogleCallbackPage() {
  const router = useRouter();
  const { mutateAsync: refresh } = useRefresh();

  useEffect(() => {
    const processCallback = async () => {
      try {
        await refresh();
        toast.success("로그인 성공!");
        router.replace("/");
      } catch {
        toast.error("로그인에 실패했습니다.");
        router.replace("/login");
      }
    };

    processCallback();
  }, [refresh, router]);

  return (
    <div className="bg-background flex min-h-screen items-center justify-center">
      <p className="text-sm text-neutral-500">로그인 처리중입니다...</p>
    </div>
  );
}
