"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { ChevronRight } from "lucide-react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

import hole3 from "@/assets/images/HoleFlag.png";
import hole from "@/assets/images/HoleStar.png";
import hole2 from "@/assets/images/HoleUniv.png";
import logo from "@/assets/images/Logo.png";
import { characterImages } from "@/constants/characterImages";
import { useCharacterType } from "@/lib/tanstack/query/characters/useCharacterType";
import { useCustomerProfile } from "@/lib/tanstack/query/profile/useCustomerProfile";

export default function Home() {
  const router = useRouter();

  const { data: me, isLoading: meLoading, isError: meError } = useCustomerProfile();
  const {
    data: character,
    isLoading: characterLoading,
    isError: characterError,
  } = useCharacterType();

  if (meLoading || characterLoading) return <div>로딩중...</div>;
  if (meError || characterError || !me || !character) return <div>에러</div>;

  /* 고객 기본 정보 */
  const formatPhoneNumber = (phone: string) => {
    return phone.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
  };

  // 데이터가 매일 공급되는 요금제인지
  const isDay = me?.mobilePlan.isDay;

  // 제공 데이터량
  const totalData = Number(me?.mobilePlan.dataAmount.replace("GB", ""));
  const usedData = me?.mobilePlan.usageDetails.dataGb ?? 0;
  const remaining = parseFloat((totalData - usedData).toFixed(2));
  const chartData = [
    { name: "Remaining", value: remaining, isHighlight: true },
    { name: "Used", value: usedData, isHighlight: false },
  ];

  // 제공통화량
  const callUsed = me?.mobilePlan.usageDetails.voiceMin ?? 0;
  const callMax = Number(me?.mobilePlan.benefitVoiceCall.match(/\d+/));
  const isCallInfi = me?.mobilePlan.benefitVoiceCall.includes("무제한");

  // 제공문자량
  const smsUsed = me?.mobilePlan.usageDetails.smsCnt ?? 0;
  const smsMax = Number(me?.mobilePlan.benefitSms.match(/\d+/));
  const isSmsInfi = me?.mobilePlan.benefitSms.includes("기본제공");

  const safePercent = (value: number, max: number) =>
    max > 0 ? Math.min(100, Math.max(0, (value / max) * 100)) : 0;
  const callPercentage = safePercent(callUsed, callMax);
  const smsPercentage = !!isSmsInfi ? 100 : safePercent(smsUsed, smsMax);

  /* 고객 캐릭터 유형 */
  const characterType = characterImages[character.characterName];

  return (
    <div className="bg-neutral-0 flex min-h-full flex-col">
      {/* 헤더 섹션 */}
      <section className="font-display2 bg-primary-500 text-neutral-0 relative rounded-b-[40px] px-6 py-4">
        <div className="flex items-start justify-between">
          <div className="flex flex-col">
            <Image src={logo} alt="LG U+NIVERSE 로고" width={95} height={95} className="h-9 w-9" />

            <div className="pt-6 text-xl">
              <span className="text-lg">
                <span className="pr-2">{characterType.name}</span>
                <span className="pr-1">{me.name}</span>
                <span className="text-md text-neutral-400">님</span>
              </span>
            </div>

            <div className="mt-2 flex gap-2 pb-3 text-sm text-neutral-400">
              {character.tags?.slice(0, 3).map((tag) => (
                <span key={tag}>#{tag}</span>
              ))}
            </div>
          </div>
          <div className="justify-center">
            <Image src={hole} alt="character" width={150} height={150} />
          </div>
        </div>
      </section>

      {/* 메뉴 바로가기 섹션 */}
      <section className="mt-6 px-5 text-neutral-900">
        <h2 className="text-md mb-4 font-semibold">메뉴 바로가기</h2>
        <div className="no-scrollbar flex gap-3 overflow-x-auto">
          {["맞춤 요금제 추천", "상품 조회", "나의 요금제", "나의 가입 정보"].map((menu, idx) => (
            <button
              type="button"
              key={idx}
              className="bg-neutral-0 rounded-full border border-neutral-300 px-5 py-2 text-xs font-medium whitespace-nowrap">
              {menu}
            </button>
          ))}
        </div>
      </section>

      {/* 데이터/통화 사용량 섹션 */}
      <section className="mt-8 px-5">
        <h2 className="text-md mb-4 font-semibold">나의 데이터 / 통화</h2>

        <div className="bg-neutral-0 rounded-lg p-4 shadow-sm">
          <div className="text-md mb-3 flex items-center justify-between font-medium">
            <span className="text-neutral-500">{formatPhoneNumber(me.phone)}</span>
            <span>{me.subscriptions?.[0]?.productName}</span>
          </div>

          <div className="flex items-center gap-8">
            {/* 도넛 차트 */}
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

              {/* 도넛 차트 중앙 텍스트 */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="flex items-baseline gap-1 text-neutral-900">
                  <span className="text-md font-bold">{remaining}GB</span>
                  <span className="text-xs font-medium text-neutral-500">남음</span>
                </div>
                <div className="mt-0.5 text-xs text-neutral-500">
                  {!!isDay ? "매일" : "총"} {totalData}GB
                </div>
              </div>
            </div>

            <div className="flex-1 space-y-4 text-sm">
              {/* 전화 사용량 막대바 */}
              <div>
                <div className="mb-1 flex items-center justify-between">
                  <span className="font-medium">{!!isCallInfi ? "부가통화량" : "제공통화량"}</span>
                  <span className="text-xs text-neutral-500">{`${callUsed}분/${callMax}분`}</span>
                </div>

                <div className="h-2 w-full rounded-full bg-neutral-100">
                  <div
                    className="bg-chart-2 h-2 rounded-full"
                    style={{ width: `${callPercentage}%` }}></div>
                </div>

                <div className="mt-1 flex items-center justify-end text-xs text-neutral-500">
                  {!!isCallInfi ? <span>기본 통화량 무제한</span> : <span></span>}
                </div>
              </div>

              {/* 문자 사용량 막대바 */}
              <div>
                <div className="mb-1 flex items-center justify-between">
                  <span className="font-medium">SMS/MMS</span>
                  <span className="text-xs text-neutral-500">
                    {!!isSmsInfi ? "기본제공" : `${smsUsed}건 / ${smsMax}건`}
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
      </section>

      {/* 쿠폰 배너 */}
      <section>
        <div className="mt-8 px-5">
          <div
            onClick={() => router.push("/coupons")}
            className="bg-secondary-50 flex items-center justify-between rounded-lg p-6 shadow-sm">
            <div className="flex flex-col gap-1 text-sm font-medium">
              <p className="text-neutral-900">놓치고 있는 쿠폰이 있어요!</p>
              <h3 className="text-secondary-500 text-lg font-bold">생일 쿠폰 30% 할인</h3>
              <p className="cursor-pointer text-neutral-500 underline">
                클릭해서 확인하러 가보세요!
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

        {/* 상품 추천 배너 */}
        <div className="my-8 px-5">
          <div className="bg-secondary-50 flex items-center justify-between rounded-lg p-6 shadow-sm">
            <div className="flex flex-col gap-1 font-medium">
              <h3 className="text-sm">{me.name} 님에게 맞는 상품 추천!</h3>
              <p className="text-xs text-neutral-500">사용패턴을 분석하여 추천해드려요!</p>
              <button
                type="button"
                className="bg-secondary-500 text-neutral-0 mt-1 flex w-fit cursor-pointer items-center justify-center rounded-full py-1 pr-1 pl-3 text-xs font-semibold">
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
