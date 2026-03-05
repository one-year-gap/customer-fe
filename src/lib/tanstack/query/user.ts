import { useQuery } from "@tanstack/react-query";

import { getOnboardingMe, refreshAccessToken } from "@/services/domain/user";
import { useAuthStore } from "@/stores/useAuthStore";

export const useOnboardingMe = () => {
  return useQuery({
    queryKey: ["onboardingMe"],
    queryFn: async () => {
      const refreshResponse = await refreshAccessToken(); //refresh를 먼저 하고, onboarding 호출
      const { setAccessToken } = useAuthStore.getState();

      if (refreshResponse?.data.accessToken) {
        setAccessToken(refreshResponse.data.accessToken);
      }
      const response = await getOnboardingMe();

      return response.data;
    },
  });
};
