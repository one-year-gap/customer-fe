"use client";
import { useState } from "react";

import { CharacterBarChart } from "@/components/domain/characters/CharacterBarChart";
import { CharacterImage } from "@/components/domain/characters/CharacterImage";
import { CharacterModal } from "@/components/domain/characters/CharacterModal";
import { CharacterRadarChart } from "@/components/domain/characters/CharacterRadarChart";
import { useCharacterType } from "@/lib/tanstack/query/characters/useCharacterType";
import type { ChartSubject } from "@/models/characters/characterTypes";

export default function CharacterPage() {
  const [selectedSubject, setSelectedSubject] = useState<ChartSubject | null>(null);

  const { data, isLoading } = useCharacterType();

  if (isLoading) return <div>캐릭터 배정중...</div>;

  if (!data) {
    return <div>에러</div>;
  }

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="font-display2 flex flex-col gap-3 pb-4">
        <span className="text-primary-500 text-lg">나의 고객 유형</span>
        <span className="text-xs text-neutral-500">MBTI처럼 알아보는 나의 통신 스타일</span>
      </div>

      <CharacterImage character={data} />

      <CharacterBarChart tscoreIndex={data.tscoreIndex} onSubjectClick={setSelectedSubject} />

      <CharacterRadarChart tscoreIndex={data.tscoreIndex} onSubjectClick={setSelectedSubject} />

      <CharacterModal subject={selectedSubject} onClose={() => setSelectedSubject(null)} />
    </div>
  );
}
