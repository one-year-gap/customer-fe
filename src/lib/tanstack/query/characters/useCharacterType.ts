"use client";

import { useQuery } from "@tanstack/react-query";

import { getCharacterType } from "@/services/domain/characters/getCharacterType";

export function useCharacterType() {
  return useQuery({
    queryKey: ["personaType", "me"],
    queryFn: getCharacterType,
  });
}
