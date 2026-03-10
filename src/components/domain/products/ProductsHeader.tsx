import Image from "next/image";

import { Smartphone } from "lucide-react";

import holeStar from "@/assets/images/HoleStar.png";

export function ProductsHeader() {
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-col gap-6">
        <div className="text-primary-500 flex items-center gap-2">
          <Smartphone className="h-6 w-6" />

          <span className="font-display2 text-lg">상품</span>
        </div>

        <div className="text-primary-500 flex flex-col">
          <span className="text-[14px] font-semibold">나에게 맞는 요금제를 찾아보세요</span>

          <span className="font-display2 my-2 text-[16.5px]">우주 탐험가를 위한 추천 상품!</span>
        </div>
      </div>
      <Image
        src={holeStar}
        alt="우주탐험가"
        width={171}
        height={147}
        className="h-auto w-30 shrink-0"
      />
    </div>
  );
}
