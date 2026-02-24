"use client";
import Image from "next/image";

import { ChevronRight } from "lucide-react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

import hole2 from "@/assets/images/HoleGood.png";
import hole from "@/assets/images/HoleStar.png";
import logo from "@/assets/images/Logo.png";

const userData = [
  {
    name: "김우주",
    number: "010-12**-12**",
    ratePlan: "O플랜 미디엄",
    character: "우주 탐험가",
    characterHash: ["호기심", "도전정신"],
    call: 78,
    callMax: 100,
    sms: 100,
    smsMax: 100,
    totalData: 11,
    usedData: 3.8,
  },
];
const data = userData[0];
const remaining = parseFloat((data.totalData - data.usedData).toFixed(2));
const chartData = [
  { name: "Remaining", value: remaining, isHighlight: true },
  { name: "Used", value: data.usedData, isHighlight: false },
];

const callPercentage = (data.call / data.callMax) * 100;
const smsPercentage = (data.sms / data.smsMax) * 100;

export default function Home() {
  return (
    <div className="bg-neutral-0 flex min-h-full flex-col">
      <section className="font-display2 bg-primary-500 text-neutral-0 relative rounded-b-[40px] px-6 py-4">
        <div className="flex items-start justify-between">
          <div className="flex flex-col">
            <Image src={logo} alt="LG U+NIVERSE 로고" width={37} height={37} />
            <div className="pt-6 text-xl font-bold">
              {data.character}
              <span className="pl-3 text-lg">
                {data.name}
                <span className="text-md text-neutral-400">님</span>
              </span>
            </div>
            <div className="mt-2 flex gap-2 pb-3 text-sm text-neutral-400">
              <span>#{data.characterHash[0]}</span>
              <span>#{data.characterHash[1]}</span>
            </div>
          </div>
          <div className="justify-center">
            <Image src={hole} alt="character" width={150} height={150} />
          </div>
        </div>
      </section>
      <section className="mt-8 px-5">
        <h2 className="text-md mb-4 font-semibold">메뉴 바로가기</h2>
        <div className="no-scrollbar flex gap-3 overflow-x-auto">
          {["맞춤 요금제 추천", "상품 조회", "나의 요금제", "나의 가입 정보"].map((menu, idx) => (
            <button
              key={idx}
              className="border-secondary-300 bg-neutral-0 rounded-full border px-5 py-2 text-xs whitespace-nowrap">
              {menu}
            </button>
          ))}
        </div>
      </section>
      <section className="mt-8 px-5">
        <h2 className="text-md mb-4 font-semibold">나의 데이터 / 통화</h2>
        <div className="bg-neutral-0 rounded-lg p-4 shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm text-neutral-500">{data.number}</span>
            <span>{data.ratePlan}</span>
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

              {/* 도넛 표 중앙 텍스트 */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="flex items-baseline gap-1">
                  <span className="text-md font-bold">{remaining}GB</span>
                  <span className="text-xs font-medium text-neutral-500">남음</span>
                </div>
                <div className="mt-0.5 text-xs text-neutral-500">총 {userData[0].totalData}GB</div>
              </div>
            </div>

            {/* 데이터, 문자 사용량 막대바 */}
            <div className="flex-1 space-y-4 text-sm">
              <div>
                <div className="mb-1 flex justify-between">
                  <span className="font-medium">영상, 부가전화</span>
                  <span className="text-gray-500">
                    {data.call}분 / {data.callMax}분
                  </span>
                </div>
                <div className="h-2 w-full rounded-full bg-neutral-100">
                  <div
                    className="bg-chart-2 h-2 rounded-full"
                    style={{ width: `${callPercentage}%` }}></div>
                </div>
              </div>
              <div>
                <div className="mb-1 flex justify-between">
                  <span>
                    {data.sms === data.smsMax ? "기본제공" : `${data.sms} / ${data.smsMax}`}
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
      <section>
        <div className="mt-8 px-5">
          <div className="bg-secondary-50 flex items-center justify-between rounded-lg p-6 shadow-sm">
            <div>
              <p className="text-xs font-medium">놓치고 있는 쿠폰이 있어요!</p>
              <h3 className="text-secondary-500 mt-1 text-lg font-bold">생일 쿠폰 30% 할인</h3>
              <p className="mt-1 cursor-pointer text-xs text-neutral-500 underline">
                클릭해서 확인하러 가보세요!
              </p>
            </div>
            <Image src={hole} alt="character" width={130} height={130} className="justify-center" />
          </div>
        </div>

        <div className="my-8 px-5">
          <div className="bg-secondary-50 flex items-center justify-between rounded-lg p-6 shadow-sm">
            <div>
              <h3>{data.name} 님에게 맞는 상품 추천!</h3>
              <p className="text-xs text-neutral-500">
                기본 정보와 사용패턴을 조합해 추천해드려요!
              </p>
              <button className="bg-secondary-500 text-neutral-0 mt-3 flex rounded-full px-2 py-2 text-xs">
                확인하기
                <ChevronRight size={12} className="text-neutral-300" />
              </button>
            </div>
            <Image src={hole2} alt="character" width={76} height={76} className="justify-center" />
          </div>
        </div>
      </section>
    </div>
  );
}
