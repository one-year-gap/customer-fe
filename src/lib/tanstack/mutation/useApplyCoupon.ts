import { useMutation, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/lib/tanstack/query/common/keys";
import type { ApplyCouponRequest, ApplyCouponResponse } from "@/models/coupons/applyCoupon";
import { postCoupon } from "@/services/domain/coupons/postCoupon";

export function useApplyCoupon() {
  const queryClient = useQueryClient();

  return useMutation<ApplyCouponResponse, Error, ApplyCouponRequest>({
    mutationFn: (data: ApplyCouponRequest) => postCoupon(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.coupons,
      });
    },
  });
}
