export interface ApplyCouponRequest {
  memberCouponId: number;
  used_at: string;
}

export interface ApplyCouponResponse {
  status: string;
  data: {
    success: boolean;
    remainingCouponCount: number;
    appliedBenefitSummary: string;
  };
  timestamp: string;
}
