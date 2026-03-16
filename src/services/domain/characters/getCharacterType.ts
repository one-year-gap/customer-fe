import { api } from "@/lib/axios";
import type { CharacterTypeResponse } from "@/models/characters/characterTypes";

export async function getCharacterType() {
  const res = await api.get<CharacterTypeResponse>("/api/v1/customer/persona-types/me");

  return res.data.data;
}
