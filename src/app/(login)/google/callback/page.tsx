"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useRefresh } from "@/lib/tanstack/mutation/user";

export default function GoogleCallbackPage() {
  const router = useRouter();
  const { mutateAsync: refresh } = useRefresh();

  useEffect(() => {
    const processCallback = async () => {
      try {
        await refresh();
        router.push("/");
      } catch (error) {
        router.push("/login");
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
