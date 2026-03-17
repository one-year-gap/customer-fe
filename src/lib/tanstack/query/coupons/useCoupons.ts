import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/lib/tanstack/query/common/keys";
import type { Coupon, GetCouponsResponse } from "@/models/coupons/coupon";
import { getCoupons } from "@/services/domain/coupons/getCoupons";

export function useCoupons() {
  return useQuery<GetCouponsResponse, Error, Coupon[]>({
    queryKey: queryKeys.coupons,
    queryFn: getCoupons,
    select: (data) => data.data.coupons,
    staleTime: 60 * 1000,
    gcTime: 5 * 60 * 1000,
    retry: 1,
  });
}
