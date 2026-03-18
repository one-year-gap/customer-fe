import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/lib/tanstack/query/common/keys";
import type { Coupon, GetCouponsResponse } from "@/models/coupons/coupon";
import { getCoupon } from "@/services/domain/coupons/getCoupon";

export function useCoupon() {
  return useQuery<GetCouponsResponse, Error, Coupon[]>({
    queryKey: queryKeys.coupons,
    queryFn: getCoupon,
    select: (data) => data.data.coupons,
    staleTime: 60 * 1000,
    gcTime: 5 * 60 * 1000,
    retry: 1,
  });
}
