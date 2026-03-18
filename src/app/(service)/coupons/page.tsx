"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { ChevronLeft, Gift, Wifi } from "lucide-react";
import { toast } from "sonner";

import hole from "@/assets/images/HoleUniv.png";
import { useApplyCoupon } from "@/lib/tanstack/query/coupons/useApplyCoupon";
import { useCoupon } from "@/lib/tanstack/query/coupons/useCoupon";
import type { Coupon } from "@/models/coupons/coupon";

export default function Coupon() {
  const router = useRouter();
  const [activeCouponId, setActiveCouponId] = useState<number | null>(null);

  const { data: coupons, isLoading, isError } = useCoupon();
  const { mutate: applyCoupon, isPending } = useApplyCoupon();

  const mappedCoupons =
    coupons
      ?.filter((c) => c.usable)
      .map((c) => ({
        id: c.memberCouponId,
        type: c.categoryLabel,
        title: c.title,
        desc: c.subTitle,
        value: c.subTitle,
        unit: "",
        date: c.expiredDate,
        code: c.memberCouponId,
        icon: c.categoryLabel === "요금 할인" ? Gift : Wifi,
        is_used: !c.usable,
      })) ?? [];

  if (isLoading) return <div className="p-6">로딩중...</div>;

  if (isError) return <div className="text-danger-500 p-6">쿠폰 불러오기 실패</div>;

  return (
    <div className="flex h-full min-h-screen flex-col items-center">
      <div className="bg-neutral-0 relative w-full overflow-hidden">
        <ChevronLeft size={24} className="mt-4 cursor-pointer" onClick={() => router.back()} />
        <header className="font-display2 text-primary-500 px-6 pt-2">
          <h2 className="text-primary-500 mb-6 text-lg">내 쿠폰</h2>
          <div className="relative flex items-end justify-between">
            <div>
              <p className="mb-1 text-xs">보유중인 쿠폰을 확인하세요</p>
              <h1 className="text-lg">우주에서 온 특별한 혜택</h1>
              <button
                type="button"
                className="bg-primary-500 text-neutral-0 mt-4 rounded-full px-4 py-1 font-sans text-xs">
                전체
              </button>
            </div>
            <div className="absolute -top-12 -right-4">
              <div className="relative flex h-32 w-32 items-center justify-center">
                <Image className="z-10" src={hole} alt="holeMan image" width={100} height={100} />
              </div>
            </div>
          </div>
          <div className="my-4 h-px w-full bg-neutral-300" />
        </header>

        {/* Coupon List */}
        <main className="space-y-5 px-5 py-2 text-neutral-500">
          {mappedCoupons.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-neutral-400">
              <Gift className="mb-3 h-8 w-8 opacity-50" />
              <p className="text-sm">쿠폰함이 비어있습니다.</p>
            </div>
          ) : (
            mappedCoupons.map((coupon) => {
              const isActive = activeCouponId === coupon.id || coupon.is_used;
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
                    type="button"
                    disabled={coupon.is_used || isPending}
                    onClick={() => {
                      if (coupon.is_used) return;

                      applyCoupon(
                        {
                          memberCouponId: coupon.id,
                          used_at: new Date().toISOString(),
                        },
                        {
                          onSuccess: (data) => {
                            toast.success(data.data.appliedBenefitSummary);
                            setActiveCouponId(coupon.id);
                          },
                        },
                      );
                    }}
                    className={`text-md w-full rounded-3xl py-2 transition-all ${
                      isActive
                        ? "bg-secondary-500 border-secondary-500 text-neutral-0 border-2 shadow-lg"
                        : "border-secondary-500 text-secondary-500 bg-neutral-0 border-2"
                    }`}>
                    {isActive ? "사용완료" : "사용하기"}
                  </button>
                </div>
              );
            })
          )}
        </main>
      </div>
    </div>
  );
}
