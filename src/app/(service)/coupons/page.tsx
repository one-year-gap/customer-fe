"use client";

import { useState } from "react";
import Image from "next/image";

import { ChevronLeft,Gift, Wifi } from "lucide-react";

import hole from "@/assets/images/HoleUniv.png";
const initialCoupons = [
  {
    id: 1,
    type: "요금 할인",
    title: "신규 가입 감사 쿠폰",
    desc: "첫 달 요금 할인",
    value: "10,000원",
    unit: "할인",
    date: "~2026.03.30",
    code: "WELCOME 2026",
    icon: Gift,
  },
  {
    id: 2,
    type: "생일 선물",
    title: "생일 축하 쿠폰",
    desc: "요금 할인",
    value: "20,000원",
    unit: "할인",
    date: "~2026.03.30",
    code: "BIRTHDAY 2026",
    icon: Gift,
  },
  {
    id: 3,
    type: "데이터",
    title: "데이터 추가 쿠폰",
    desc: "이번 달 데이터 2GB 추가",
    value: "2GB",
    unit: "",
    date: "~2026.03.30",
    code: "DATA 2026",
    icon: Wifi,
  },
];
export default function Coupon() {
  const [activeCouponId, setActiveCouponId] = useState<number | null>(null);

  return (
    <div className="flex min-h-screen flex-col items-center">
      <div className="bg-neutral-0 relative w-full overflow-hidden">
        <ChevronLeft size={24} className="mt-4" />
        <header className="font-display2 text-primary-500 px-6 pt-2">
          <h2 className="text-primary-500 mb-6 text-lg">내 쿠폰</h2>
          <div className="relative flex items-end justify-between">
            <div>
              <p className="mb-1 text-xs">보유중인 쿠폰을 확인하세요</p>
              <h1 className="text-lg">우주에서 온 특별한 혜택</h1>
              <button className="bg-primary-500 text-neutral-0 mt-4 rounded-full px-4 py-1 font-sans text-xs">
                전체
              </button>
            </div>
            <div className="absolute -top-12 -right-4">
              <div className="relative flex h-32 w-32 items-center justify-center">
                <Image className="z-10" src={hole} alt="holeMan image" width={100} height={100} />
              </div>
            </div>
          </div>
          <div className="my-4 h-[1px] w-full bg-neutral-300" />
        </header>

        {/* Coupon List */}
        <main className="space-y-5 px-5 py-2 text-neutral-500">
          {initialCoupons.map((coupon) => {
            const isActive = activeCouponId === coupon.id;
            const Icon = coupon.icon;

            return (
              <div
                key={coupon.id}
                className="bg-neutral-0 rounded-lg border border-neutral-300 p-6 shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
                <div className="mb-6 flex items-start justify-between">
                  <div className="flex gap-3">
                    <div className="mt-1">
                      <Icon size={28} className="text-secondary-500" />
                    </div>
                    <div>
                      <p className="mb-0.5 text-xs font-medium">{coupon.type}</p>
                      <h3 className="text-md font-semibold text-neutral-900">{coupon.title}</h3>
                      <p className="mt-0.5 text-xs">{coupon.desc}</p>
                      <div className="mt-3 flex items-center space-x-2 text-xs">
                        <span>{coupon.date}</span>
                        <span>|</span>
                        <span>{coupon.code}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-secondary-500 text-md">{coupon.value}</span>
                    <p className="text-xs">{coupon.unit}</p>
                  </div>
                </div>

                <button
                  onClick={() => setActiveCouponId(coupon.id)}
                  className={`text-md w-full rounded-3xl py-2 transition-all ${
                    isActive
                      ? "bg-secondary-500 border-secondary-500 text-neutral-0 border-2 shadow-lg" // 클릭 시
                      : "border-secondary-500 text-secondary-500 border-2 bg-white"
                  }`}>
                  {isActive ? "사용완료" : "사용하기"}
                </button>
              </div>
            );
          })}
        </main>
      </div>
    </div>
  );
}
