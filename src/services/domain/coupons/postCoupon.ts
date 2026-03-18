import { api } from "@/lib/axios";
import type { ApplyCouponRequest, ApplyCouponResponse } from "@/models/coupons/applyCoupon";

export async function postCoupon({
  memberCouponId,
  used_at,
}: ApplyCouponRequest): Promise<ApplyCouponResponse> {
  const res = await api.post(
    "/api/v1/customer/coupons/use",
    { used_at },
    {
      params: { memberCouponId },
    },
  );

  return res.data;
}
