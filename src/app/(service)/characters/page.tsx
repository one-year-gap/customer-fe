"use client";

import { useState } from "react";
import { PuffLoader } from "react-spinners";
import Image from "next/image";
import { useRouter } from "next/navigation";

import failImage from "@/assets/images/notfound.png";
import { CharacterBarChart } from "@/components/domain/characters/CharacterBarChart";
import { CharacterImage } from "@/components/domain/characters/CharacterImage";
import { CharacterModal } from "@/components/domain/characters/CharacterModal";
import { CharacterRadarChart } from "@/components/domain/characters/CharacterRadarChart";
import { useCharacterType } from "@/lib/tanstack/query/characters/useCharacterType";
import type { ChartSubject } from "@/models/characters/characterTypes";

export default function CharacterPage() {
  const router = useRouter();
  const [selectedSubject, setSelectedSubject] = useState<ChartSubject | null>(null);

  const { data, isLoading, isError, refetch } = useCharacterType();

  if (isLoading)
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <PuffLoader color="#132c5e" />
      </div>
    );

  if (!data) {
    return (
      <div className="flex h-[80vh] flex-col gap-4 p-4">
        <div className="font-display2 flex flex-col gap-3 pb-4">
          <span className="text-primary-500 text-lg">나의 고객 유형</span>
          <span className="text-xs text-neutral-500">MBTI처럼 알아보는 나의 통신 스타일</span>
        </div>

        <div className="bg-neutral-0 flex flex-1 flex-col items-center justify-center gap-4 rounded-2xl p-6 text-center">
          <Image src={failImage} alt={"notFound"} width={1024} height={1536} />

          <p className="text-hit-500 text-md font-medium">캐릭터 정보를 불러오지 못했습니다.</p>
          <p className="text-sm text-neutral-500">잠시 후 다시 시도해주세요.</p>
          <button
            type="button"
            onClick={() => refetch()}
            className="bg-primary-500 text-neutral-0 hover:bg-primary-900 cursor-pointer rounded-full px-4 py-2 text-sm font-medium">
            다시 시도
          </button>
        </div>
      </div>
    );
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
