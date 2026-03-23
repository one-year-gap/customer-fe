"use client";

import { type ReactNode } from "react";
import { useRouter } from "next/navigation";

import { X } from "lucide-react";

import { useCustomerProfile } from "@/lib/tanstack/query/profile/useCustomerProfile";

function InfoRow({
  label,
  value,
  multiline = false,
}: {
  label: string;
  value: ReactNode;
  multiline?: boolean;
}) {
  const displayValue = value ?? "-";

  return (
    <div className="text-md grid w-full grid-cols-4 items-center gap-3 border-b border-neutral-300 px-3 py-2 font-medium">
      <div className="text-primary-500 col-span-1">{label}</div>
      <div className="col-span-3 overflow-hidden text-neutral-900">
        <span
          className={
            multiline ? "block w-full break-words whitespace-normal" : "block w-full truncate"
          }
          title={typeof displayValue === "string" ? displayValue : undefined}>
          {displayValue}
        </span>
      </div>
    </div>
  );
}

type SubscriptionMap = {
  MOBILE_PLAN: string;
  TAB_WATCH_PLAN: string;
  INTERNET: string;
  IPTV: string;
  ADDON: string[];
};

const formatPhoneNumber = (phone?: string) => {
  if (!phone) {
    return "-";
  }

  return phone.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
};

const formatDate = (date?: string | null) => (date ? date.replaceAll("-", ".") : "-");

export default function MyInfoPage() {
  const router = useRouter();

  const { data: profile, isLoading, isError } = useCustomerProfile();

  if (isLoading) {
    return <div className="p-6">로딩중...</div>;
  }

  if (isError || !profile) {
    return (
      <div className="relative flex flex-col gap-4">
        <header className="bg-primary-500 font-display2 flex flex-col gap-2 px-6 py-4">
          <span className="text-neutral-0 text-lg">회원 정보</span>
          <span className="text-xs text-neutral-500">내 정보를 확인하는 곳입니다.</span>
          <X
            onClick={() => router.back()}
            className="text-neutral-0 absolute top-7 right-7 h-8 w-8 cursor-pointer hover:text-neutral-300"
          />
        </header>

        <section className="px-6 py-2">
          <p className="text-sm font-medium text-red-500">데이터를 불러오는데 실패했습니다.</p>
        </section>
      </div>
    );
  }

  const subscriptionMap: SubscriptionMap = {
    MOBILE_PLAN: "-",
    TAB_WATCH_PLAN: "-",
    INTERNET: "-",
    IPTV: "-",
    ADDON: [],
  };

  profile.subscriptions.forEach((subscription) => {
    if (subscription.productType === "ADDON") {
      subscriptionMap.ADDON.push(subscription.productName);
      return;
    }

    if (subscription.productType in subscriptionMap) {
      subscriptionMap[subscription.productType as Exclude<keyof SubscriptionMap, "ADDON">] =
        subscription.productName;
    }
  });

  const addonContent =
    subscriptionMap.ADDON.length > 0 ? (
      <div className="flex flex-wrap gap-2 py-1">
        {subscriptionMap.ADDON.map((addon) => (
          <span
            key={addon}
            className="bg-primary-50 text-primary-600 inline-flex rounded-full px-3 py-1 text-sm font-semibold">
            {addon}
          </span>
        ))}
      </div>
    ) : (
      "-"
    );

  return (
    <div className="relative flex flex-col gap-4">
      <header className="bg-primary-500 font-display2 flex flex-col gap-2 px-6 py-4">
        <span className="text-neutral-0 text-lg">회원 정보</span>
        <span className="text-xs text-neutral-500">내 정보를 확인하는 곳입니다.</span>
        <X
          onClick={() => router.back()}
          className="text-neutral-0 absolute top-7 right-7 h-8 w-8 cursor-pointer hover:text-neutral-300"
        />
      </header>

      <section className="flex flex-col px-6">
        <div className="flex items-center justify-between border-b border-neutral-500 p-2 text-lg font-semibold">
          <span>내 가입 정보</span>
        </div>
        <InfoRow label="이름" value={profile.name} />
        <InfoRow label="이메일" value={profile.email} />
        <InfoRow label="전화번호" value={formatPhoneNumber(profile.phone)} />
        <InfoRow label="주소" value={profile.address} multiline />
        <InfoRow label="생년월일" value={formatDate(profile.birthDate)} />
        <InfoRow
          label="약정여부"
          value={
            profile.contract?.contractMonths ? `${profile.contract.contractMonths}개월` : "없음"
          }
        />
        <InfoRow
          label="약정기간"
          value={
            profile.contract?.contractStartDate && profile.contract?.contractEndDate
              ? `${formatDate(profile.contract.contractStartDate)} - ${formatDate(profile.contract.contractEndDate)}`
              : "-"
          }
        />
      </section>

      <section className="flex flex-col px-6">
        <div className="border-b border-neutral-500 p-2 text-lg font-semibold">가입 요금제</div>
        <InfoRow label="모바일" value={subscriptionMap.MOBILE_PLAN} />
        <InfoRow label="태블릿/스마트워치" value={subscriptionMap.TAB_WATCH_PLAN} />
        <InfoRow label="인터넷" value={subscriptionMap.INTERNET} />
        <InfoRow label="IPTV" value={subscriptionMap.IPTV} />
        <InfoRow label="부가서비스" value={addonContent} multiline />
      </section>
    </div>
  );
}
