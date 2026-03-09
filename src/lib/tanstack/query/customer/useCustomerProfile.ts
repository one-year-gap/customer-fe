import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/lib/tanstack/query/common/keys";
import { getCustomerProfile } from "@/services/domain/customer/getCustomerProfile";

export function useCustomerProfile() {
  return useQuery({
    queryKey: queryKeys.customerProfile,
    queryFn: getCustomerProfile,
    staleTime: 60 * 1000,
    gcTime: 5 * 60 * 1000,
    retry: 0,
  });
}
