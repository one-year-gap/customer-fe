"use client";

import { useQuery } from "@tanstack/react-query";

import { getRecommendPlan } from "@/services/getRecommendPlan";

export function useRecommendPlan(memberId: number, profileText: string) {
  return useQuery({
    queryKey: ["recommendPlan", memberId],
    queryFn: () =>
      getRecommendPlan({
        member_id: memberId,
        profile_text: profileText,
      }),
    retry: false,
  });
}
