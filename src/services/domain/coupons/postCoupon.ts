import { api } from "@/lib/axios";
import type { ApplyCouponRequest, ApplyCouponResponse } from "@/models/coupons/applyCoupon";

export async function postCoupon({
  memberCouponId,
  used_at,
}: ApplyCouponRequest): Promise<ApplyCouponResponse> {
  const body = used_at ? { used_at } : {};

  const res = await api.post("/api/v1/customer/coupons/use", body, {
    params: { memberCouponId },
  });

  return res.data;
}
