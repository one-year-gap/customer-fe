"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import notFoundImg from "@/assets/images/notfound.png";
import CommonButton from "@/components/common/CommonButton";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6">
      <div className="mb-6">
        <Image src={notFoundImg} alt="not found" priority />
      </div>

      <p className="text-center text-sm leading-relaxed text-neutral-500">
        앗! 홀맨이 길을 잃었어요.
        <br />
        잠시 후 다시 시도해주세요
      </p>

      <div className="mt-8">
        <CommonButton variant="primary" size="main" onClick={() => router.push("/")}>
          홈으로 돌아가기
        </CommonButton>
      </div>
    </div>
  );
}
