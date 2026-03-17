import { api } from "@/lib/axios";
import type { GetCouponsResponse } from "@/models/coupons/coupon";

export async function getCoupon(): Promise<GetCouponsResponse> {
  const res = await api.get("/api/v1/customer/coupons");
  return res.data;
}
