import { useQuery } from "@tanstack/react-query";

import { getRecentProducts } from "@/services/domain/my/getRecentProducts";

export const useRecentProducts = (limit: number = 3) => {
  return useQuery({
    queryKey: ["recentActivities", limit],
    queryFn: () => getRecentProducts(limit),
  });
};
