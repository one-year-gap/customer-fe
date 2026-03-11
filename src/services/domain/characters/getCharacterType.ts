import { api } from "@/lib/axios";
import type { CharaterTypeResponse } from "@/models/characters/characterTypes";

export async function getCharacterType() {
  const res = await api.get<CharaterTypeResponse>("/api/v1/customer/persona-types/me");

  return res.data.data;
}
