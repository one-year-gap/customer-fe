import { useQuery } from "@tanstack/react-query";

import { getOnboardingMe } from "@/services/domain/user";

import { useRefresh } from "../mutation/user";

export const useOnboardingMe = () => {
  const { mutateAsync: refresh } = useRefresh();
  return useQuery({
    queryKey: ["onboardingMe"],
    queryFn: async () => {
      await refresh();
      const response = await getOnboardingMe(); //refresh를 먼저 하고, onboarding 호출
      return response.data;
    },
  });
};
