export type CouponType = "DISCOUNT" | "DATA";

export interface Coupon {
  coupon_id: string;
  name: string;
  type: CouponType;
  is_used: boolean;
}

export interface GetCouponsResponse {
  status: string;
  data: { coupons: Coupon[] };
}
