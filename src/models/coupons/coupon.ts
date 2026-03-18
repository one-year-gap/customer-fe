export type CouponType = "DISCOUNT" | "DATA";

export interface Coupon {
  memberCouponId: number;
  categoryLabel: string;
  title: string;
  subTitle: string;
  expiredDate: string;
  usable: boolean;
}

export interface GetCouponsResponse {
  status: string;
  data: { coupons: Coupon[] };
}
