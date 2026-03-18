"use client";

import { type ReactNode } from "react";
import { useRouter } from "next/navigation";

import { X } from "lucide-react";

import { useCustomerProfile } from "@/lib/tanstack/query/profile/useCustomerProfile";

function InfoRow({
  label,
  value,
}: {
  label: string;
  value: ReactNode;
  editable?: boolean;
  isEditing?: boolean;
}) {
  return (
    <div className="text-md grid w-full grid-cols-4 items-center gap-3 border-b border-neutral-300 px-3 py-2 font-medium">
      <div className="text-primary-500 col-span-1">{label}</div>
      <div className="overflow-hidde col-span-3 text-neutral-900">
        <span className="block w-full truncate" title={String(value)}>
          {value ?? "-"}
        </span>
      </div>
    </div>
  );
}

export default function MyInfoPage() {
  const router = useRouter();

  const { data: profile, isLoading, isError } = useCustomerProfile();

  const formatPhoneNumber = (phone: string) => {
    return phone.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
  };

  const subscriptionMap = {
    MOBILE_PLAN: "-",
    TABLET_WATCH: "-",
    INTERNET: "-",
    IPTV: "-",
    ADDON: "-",
  };

  profile?.subscriptions.forEach((s) => {
    if (s.productType === "MOBILE_PLAN") {
      subscriptionMap.MOBILE_PLAN = s.productName;
    }
    if (s.productType === "TABLET_WATCH") {
      subscriptionMap.TABLET_WATCH = s.productName;
    }
    if (s.productType === "INTERNET") {
      subscriptionMap.INTERNET = s.productName;
    }
    if (s.productType === "IPTV") {
      subscriptionMap.IPTV = s.productName;
    }
    if (s.productType === "ADDON") {
      subscriptionMap.ADDON = s.productName;
    }
  });

  if (isLoading) {
    return <div className="p-6">로딩중...</div>;
  }

  if (isError || !profile) {
    return <div className="text-danger-500 p-6">회원 정보 불러오기 실패</div>;
  }

  return (
    <div className="relative flex flex-col gap-4">
      <header className="bg-primary-500 font-display2 flex flex-col gap-2 px-6 py-4">
        <span className="text-neutral-0 text-lg">회원 정보</span>
        <span className="text-xs text-neutral-500">내 정보를 확인하고 수정하는 곳입니다.</span>
        <X
          onClick={() => router.back()}
          className="text-neutral-0 absolute top-7 right-7 h-8 w-8"
        />
      </header>

      <section className="flex flex-col px-6">
        <div className="flex items-center justify-between border-b border-neutral-500 p-2 text-lg font-semibold">
          <span>내 가입 정보</span>
        </div>
        <InfoRow label="이름" value={profile.name} />
        <InfoRow label="이메일" value="asdf@gmail.com" />
        <InfoRow label="전화번호" value={formatPhoneNumber(profile.phone)} />
        <InfoRow label="주소" value="서울시 강남구 역삼동 000-11" />
        <InfoRow label="생년월일" value="1998.08.25" />
        <InfoRow label="약정여부" value="24개월" />
        <InfoRow label="약정기간" value="2025.03.10 - 2027.03.10" />
      </section>

      <section className="flex flex-col px-6">
        <div className="border-b border-neutral-500 p-2 text-lg font-semibold">가입 요금제</div>
        <InfoRow label="모바일" value={subscriptionMap.MOBILE_PLAN} />
        <InfoRow label="태블릿/스마트워치" value={subscriptionMap.TABLET_WATCH} />
        <InfoRow label="인터넷" value={subscriptionMap.INTERNET} />
        <InfoRow label="IPTV" value={subscriptionMap.IPTV} />
        <InfoRow label="부가서비스" value={subscriptionMap.ADDON} />
      </section>
    </div>
  );
}
