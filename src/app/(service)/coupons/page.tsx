"use client";

import { useState } from "react";
import { PuffLoader } from "react-spinners";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { ChevronLeft, Gift, Wifi } from "lucide-react";
import { toast } from "sonner";

import hole from "@/assets/images/HoleUniv.png";
import { ConfirmModal } from "@/components/domain/coupons/CouponModal";
import { useApplyCoupon } from "@/lib/tanstack/mutation/useApplyCoupon";
import { useCoupon } from "@/lib/tanstack/query/coupons/useCoupon";
import type { Coupon } from "@/models/coupons/coupon";

export default function Coupon() {
  const router = useRouter();
  // const [activeCouponId, setActiveCouponId] = useState<number | null>(null);
  const [selectedCouponId, setSelectedCouponId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: coupons, isLoading, isError } = useCoupon();
  const { mutate: applyCoupon, isPending } = useApplyCoupon();

  const mappedCoupons =
    coupons?.map((c) => ({
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

  const handleApplyCoupon = () => {
    if (!selectedCouponId) return;

    applyCoupon(
      {
        memberCouponId: selectedCouponId,
        used_at: new Date().toISOString(),
      },
      {
        onSuccess: () => {
          toast.success("쿠폰을 사용하였습니다.");
          setIsModalOpen(false);
          setSelectedCouponId(null);
        },
      },
    );
  };

  const selectedCoupon = mappedCoupons.find((c) => c.id === selectedCouponId);

  if (isLoading)
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <PuffLoader color="#132c5e" />
      </div>
    );

  if (isError) return <div className="text-danger-500 p-6">쿠폰 불러오기 실패</div>;

  return (
    <div className="flex h-full min-h-screen flex-col items-center">
      <div className="bg-neutral-0 relative w-full overflow-hidden">
        {/* 헤더 */}
        <header className="font-display2 text-primary-500 p-4">
          <div className="mb-6 flex items-center justify-start gap-2">
            <ChevronLeft size={24} className="cursor-pointer" onClick={() => router.back()} />
            <h2 className="text-primary-500 text-lg">내 쿠폰</h2>
          </div>
          <div className="relative flex items-end justify-between">
            <div>
              <p className="mb-1 text-xs">보유중인 쿠폰을 확인하세요</p>
              <h1 className="text-lg">우주에서 온 특별한 혜택</h1>
            </div>
            <div className="absolute -top-16 -right-2">
              <div className="relative flex h-32 w-32 items-center justify-center">
                <Image className="z-10" src={hole} alt="holeMan image" width={100} height={100} />
              </div>
            </div>
          </div>
          <div className="my-4 h-px w-full bg-neutral-300" />
        </header>

        {/* 쿠폰함 */}
        <main className="space-y-5 px-5 py-2 text-neutral-500">
          {mappedCoupons.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-neutral-400">
              <Gift className="mb-3 h-8 w-8 opacity-50" />
              <p className="text-sm">쿠폰함이 비어있습니다.</p>
            </div>
          ) : (
            mappedCoupons.map((coupon) => {
              const isActive = coupon.is_used;
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
                      setSelectedCouponId(coupon.id);
                      setIsModalOpen(true);
                    }}
                    className={`text-md w-full rounded-3xl py-2 transition-all ${
                      isActive
                        ? "text-neutral-0 border-2 border-neutral-500 bg-neutral-300 shadow-lg"
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
      <ConfirmModal
        open={isModalOpen}
        couponType={`${selectedCoupon?.title}`}
        description="사용 후에는 되돌릴 수 없습니다."
        confirmText="확인"
        cancelText="취소"
        isLoading={isPending}
        onConfirm={handleApplyCoupon}
        onCancel={() => {
          setIsModalOpen(false);
          setSelectedCouponId(null);
        }}
      />
    </div>
  );
}
