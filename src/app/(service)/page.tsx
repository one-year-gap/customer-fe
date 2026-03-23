"use client";

import { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { ChevronRight } from "lucide-react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import { toast } from "sonner";

import hole3 from "@/assets/images/HoleFlag.png";
import hole from "@/assets/images/HoleStar.png";
import hole2 from "@/assets/images/HoleUniv.png";
import logo from "@/assets/images/Logo.png";
import HomeCharacterError from "@/components/domain/home/HomeCharacterError";
import HomeProfileErrorCard from "@/components/domain/home/HomeProfileErrorCard";
import { characterImages } from "@/constants/characterImages";
import { useCharacterType } from "@/lib/tanstack/query/characters/useCharacterType";
import { useCustomerProfile } from "@/lib/tanstack/query/profile/useCustomerProfile";
import { cn } from "@/lib/utils";

export default function Home() {
  const router = useRouter();

  const { data: me, isLoading: meLoading, isError: meError } = useCustomerProfile();
  const {
    data: character,
    isLoading: characterLoading,
    isError: characterError,
  } = useCharacterType();

  useEffect(() => {
    if (meError) {
      toast.error("프로필 정보를 불러오지 못했습니다.");
    }
  }, [meError]);

  if (meLoading || characterLoading) return <HomeSkeleton />;

  const hasProfileError = meError || !me;
  const hasCharacterError = characterError || !character;

  const UNLIMITED_SERVICE = "무제한";
  const ADD_SERVICE = "부가";
  const BASIC_SERVICE = "기본제공";

  const menus = [
    { label: "맞춤 요금제 추천", path: "/products/recommend" },
    { label: "상품 조회", path: "/products" },
    { label: "내 가입 정보", path: "/my/info" },
  ];

  const formatPhoneNumber = (phone?: string) => {
    if (!phone) return "-";
    return phone.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
  };

  const isDay = me?.mobilePlan?.isDay ?? false;

  const dataAmount = me?.mobilePlan?.dataAmount ?? "";
  const isDataInfinite = dataAmount.includes(UNLIMITED_SERVICE);
  const totalData = isDataInfinite ? 0 : Number(dataAmount.replace("GB", ""));

  const usedData = me?.mobilePlan?.usageDetails?.dataGb ?? 0;
  const remaining = isDataInfinite ? 0 : Math.max(0, parseFloat((totalData - usedData).toFixed(2)));
  const chartData = isDataInfinite
    ? [{ name: "Remaining", value: 1, isHighlight: true }]
    : [
        { name: "Remaining", value: remaining, isHighlight: true },
        { name: "Used", value: usedData, isHighlight: false },
      ];

  const callUsed = me?.mobilePlan?.usageDetails?.voiceMin ?? 0;
  const callMax = Number(me?.mobilePlan?.benefitVoiceCall?.match(/\d+/)?.[0] ?? 0);
  const isCallInfi =
    me?.mobilePlan?.benefitVoiceCall?.includes(UNLIMITED_SERVICE) ||
    me?.mobilePlan?.benefitVoiceCall?.includes(ADD_SERVICE) ||
    false;

  const smsUsed = me?.mobilePlan?.usageDetails?.smsCnt ?? 0;
  const smsMax = Number(me?.mobilePlan?.benefitSms?.match(/\d+/)?.[0] ?? 0);
  const isSmsInfi = me?.mobilePlan?.benefitSms?.includes(BASIC_SERVICE) ?? false;

  const safePercent = (value: number, max: number) =>
    max > 0 ? Math.min(100, Math.max(0, (value / max) * 100)) : 0;
  const callPercentage = isCallInfi ? 100 : safePercent(callUsed, callMax);
  const smsPercentage = isSmsInfi ? 100 : safePercent(smsUsed, smsMax);

  const characterType = character ? characterImages[character.characterName] : null;
  const mobileSubscription = me?.subscriptions.find(
    (subscription) => subscription.productType === "MOBILE_PLAN",
  );

  return (
    <div className="bg-neutral-0 flex min-h-full flex-col">
      <section className="font-display2 bg-primary-500 text-neutral-0 pb- relative rounded-b-[30px] px-6 pt-4 pb-1">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <Image src={logo} alt="LG U+NIVERSE 로고" width={95} height={95} className="h-9 w-9" />

            <div className="pt-6 text-xl">
              <div className="text-lg">
                <span className="pr-2">{characterType?.name ?? "U+NIVERSE"}</span>
                <div>
                  <span className="pr-1">{me?.name ?? "고객"}</span>
                  <span className="text-md text-neutral-400">님</span>
                </div>
              </div>
            </div>

            <div className="mt-2 flex gap-2 pb-3 text-sm text-neutral-400">
              {hasCharacterError ? (
                <HomeCharacterError />
              ) : (
                character?.tags?.slice(0, 3).map((tag) => <span key={tag}>#{tag}</span>)
              )}
            </div>
          </div>
          <div className="flex items-center justify-center">
            <Image src={hole} alt="character" width={150} height={150} className="animate-float" />
          </div>
        </div>
      </section>

      <section className="mt-6 px-5 text-neutral-900">
        <h2 className="text-md mb-4 font-semibold">메뉴 바로가기</h2>
        <div className="no-scrollbar flex gap-3 overflow-x-auto">
          {menus.map((menu, idx) => (
            <button
              type="button"
              key={idx}
              onClick={() => router.push(menu.path)}
              className={cn(
                "bg-neutral-0 rounded-full border border-neutral-300 px-4 py-1 text-sm font-medium whitespace-nowrap",
                "hover:bg-primary-500 hover:text-neutral-0 hover:border-primary-500 cursor-pointer",
              )}>
              {menu.label}
            </button>
          ))}
        </div>
      </section>

      <section className="mt-8 px-5">
        <h2 className="text-md mb-4 font-semibold">나의 데이터 / 통화</h2>

        {hasProfileError ? (
          <HomeProfileErrorCard onRetry={() => router.refresh()} />
        ) : (
          <div className="bg-neutral-0 rounded-lg p-4 shadow-sm">
            <div className="text-md mb-3 flex items-center justify-between font-medium">
              <span className="text-neutral-500">{formatPhoneNumber(me?.phone)}</span>
              <span>
                {mobileSubscription?.productName ?? me?.subscriptions?.[0]?.productName ?? "-"}
              </span>
            </div>

            <div className="flex items-center gap-8">
              <div className="relative h-32 w-32">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      innerRadius="82%"
                      outerRadius="100%"
                      startAngle={90}
                      endAngle={450}
                      dataKey="value"
                      stroke="none">
                      {chartData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={entry.isHighlight ? "#5A68E2" : "#F5F5F5"}
                        />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>

                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  {isDataInfinite ? (
                    <>
                      <div className="flex items-baseline gap-1 text-neutral-900">
                        <span className="text-sm font-bold">데이터</span>
                      </div>
                      <div className="text-md mt-0.5 font-bold">무제한</div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-baseline gap-1 text-neutral-900">
                        <span className="text-md font-bold">{remaining}GB</span>
                        <span className="text-xs font-medium text-neutral-500">남음</span>
                      </div>
                      <div className="mt-0.5 text-xs text-neutral-500">
                        {isDay ? "매일" : "총"} {totalData}GB
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className="flex-1 space-y-4 text-sm">
                <div>
                  <div className="mb-1 flex items-center justify-between">
                    <span className="font-medium">제공통화</span>
                    <span className="text-xs text-neutral-500">
                      {isCallInfi ? "무제한" : `${callUsed}분 / ${callMax}분`}
                    </span>
                  </div>

                  <div className="h-2 w-full rounded-full bg-neutral-100">
                    <div
                      className="bg-chart-2 h-2 rounded-full"
                      style={{ width: `${callPercentage}%` }}></div>
                  </div>
                </div>

                <div>
                  <div className="mb-1 flex items-center justify-between">
                    <span className="font-medium">SMS/MMS</span>
                    <span className="text-xs text-neutral-500">
                      {isSmsInfi ? "기본제공" : `${smsUsed}건 / ${smsMax}건`}
                    </span>
                  </div>

                  <div className="h-2 w-full rounded-full bg-neutral-100">
                    <div
                      className="bg-chart-1 h-2 rounded-full"
                      style={{ width: `${smsPercentage}%` }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      <section>
        <div className="mt-8 px-5">
          <div
            onClick={() => router.push("/coupons")}
            className="bg-secondary-50 flex cursor-pointer items-center justify-between gap-2 rounded-lg p-6 shadow-sm">
            <div className="flex flex-col gap-1 text-sm font-medium">
              <p className="text-neutral-900">놓치고 있는 쿠폰이 있을지도 몰라요.</p>
              <h3 className="text-secondary-500 text-lg font-bold">나만을 위한 쿠폰 확인!</h3>
              <p
                onClick={() => {
                  router.push("/coupons");
                }}
                className="cursor-pointer text-neutral-500 underline">
                쿠폰함 가기
              </p>
            </div>
            <Image
              src={hole3}
              alt="character"
              width={130}
              height={130}
              className="justify-center"
            />
          </div>
        </div>

        <div className="my-8 px-5">
          <div
            onClick={() => {
              router.push("/products/recommend");
            }}
            className="bg-secondary-50 flex cursor-pointer items-center justify-between rounded-lg p-6 shadow-sm">
            <div className="flex flex-col gap-1 font-medium">
              <h3 className="text-md">{me?.name ?? "고객"} 님에게 맞는 상품 추천!</h3>
              <p className="mb-2 text-xs text-neutral-500">사용패턴을 분석해서 추천해드려요!</p>
              <button
                type="button"
                onClick={() => {
                  router.push("/products/recommend");
                }}
                className="bg-secondary-500 text-neutral-0 flex w-fit cursor-pointer items-center justify-center rounded-full py-1 pr-1 pl-3 text-xs font-semibold">
                확인하기
                <ChevronRight className="h-4 w-4 text-neutral-100" />
              </button>
            </div>
            <Image
              src={hole2}
              alt="character"
              width={116}
              height={109}
              className="justify-center"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function HomeSkeleton() {
  return (
    <div className="bg-neutral-0 flex min-h-full flex-col">
      {/* 헤더 섹션 스켈레톤 */}
      <section className="bg-primary-500 relative rounded-b-[40px] px-6 py-4">
        <div className="flex items-start justify-between">
          <div className="flex flex-col">
            <div className="h-9 w-9 rounded bg-white/20" />
            <div className="pt-6">
              <div className="h-6 w-32 rounded bg-white/20" />
            </div>
            <div className="mt-2 flex gap-2 pb-3">
              <div className="h-4 w-12 rounded bg-white/20" />
              <div className="h-4 w-12 rounded bg-white/20" />
              <div className="h-4 w-12 rounded bg-white/20" />
            </div>
          </div>
          <div className="justify-center">
            <div className="h-[150px] w-[150px] rounded-full bg-white/20" />
          </div>
        </div>
      </section>

      {/* 메뉴 바로가기 스켈레톤 */}
      <section className="mt-6 px-5">
        <div className="mb-4 h-5 w-24" />
        <div className="flex gap-3">
          <div className="h-7 w-24 rounded-full bg-neutral-200" />
          <div className="h-7 w-20 rounded-full bg-neutral-200" />
          <div className="h-7 w-28 rounded-full bg-neutral-200" />
        </div>
      </section>

      {/* 데이터/통화 사용량 스켈레톤 */}
      <section className="mt-8 px-5">
        <div className="mb-4 h-5 w-32" />
        <div className="bg-neutral-0 rounded-lg border border-neutral-100 p-4 shadow-sm">
          <div className="mb-3 flex justify-between">
            <div className="h-5 w-28 rounded bg-neutral-200" />
            <div className="h-5 w-24 rounded bg-neutral-200" />
          </div>
          <div className="flex items-center gap-8">
            <div className="h-32 w-32 rounded-full bg-neutral-200" />
            <div className="flex-1 space-y-4">
              <div>
                <div className="mb-1 flex justify-between">
                  <div className="h-4 w-16 rounded bg-neutral-200" />
                  <div className="h-4 w-12 rounded bg-neutral-200" />
                </div>
                <div className="h-2 w-full rounded-full bg-neutral-200" />
              </div>
              <div>
                <div className="mb-1 flex justify-between">
                  <div className="h-4 w-16 rounded bg-neutral-200" />
                  <div className="h-4 w-12 rounded bg-neutral-200" />
                </div>
                <div className="h-2 w-full rounded-full bg-neutral-200" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 배너 2개 스켈레톤 */}
      <section className="mt-8 space-y-8 px-5 pb-8">
        <div className="h-[130px] rounded-lg bg-neutral-100" />
        <div className="h-[109px] rounded-lg bg-neutral-100" />
      </section>
    </div>
  );
}
