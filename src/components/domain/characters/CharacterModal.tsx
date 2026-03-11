import Image from "next/image";

import { X } from "lucide-react";

import { characterImages } from "@/constants/characterImages";
import type { ChartData, ChartSubject } from "@/models/characters/characterTypes";

interface Props {
  subject: ChartSubject | null;
  onClose: () => void;
}

const subjectCharacterMap: Record<ChartSubject, keyof typeof characterImages> = {
  탐색: "SPACE_SURFER",
  혜택: "SPACE_SHERLOCK",
  멀티: "SPACE_OCTOPUS",
  가족: "SPACE_GRAVITY",
  보안: "SPACE_GUARDIAN",
  안정: "SPACE_EXPLORER",
};

const subjectDescription: Record<ChartData["subject"], string> = {
  탐색: "새로운 서비스 탐색 및 요금제 변경에 대한 행동 성향",
  혜택: "혜택/트렌드 및 디지털 서비스에 대한 민감도가 높은 성향",
  멀티: "여러가지 디바이스 활용 및 데이터 쉐어링 소진율이 높은 성향",
  가족: "가족/홈 가족도가 높고, 유아 자녀 보유 가구의 성향",
  보안: "보안 서비스 및 인터넷/가족 가족도가 높은 성향",
  안정: "상품 탐색률이 낮거나, 요금제를 장기 유지하는 안정성을 추구하는 성향",
};

export function CharacterModal({ subject, onClose }: Props) {
  if (!subject) return null;

  const characterKey = subjectCharacterMap[subject];
  const character = characterImages[characterKey];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* 배경 */}
      <div className="absolute inset-0" onClick={onClose}></div>

      {/* 모달창 */}
      <div className="relative z-10 w-full rounded-xl border border-neutral-300 bg-neutral-50 p-4 shadow-lg">
        {/* <div className="flex items-center justify-end"> */}
        <button
          className="text-neutral-0 absolute top-3 right-3 cursor-pointer rounded-full bg-neutral-300 p-0.5 hover:bg-neutral-500"
          onClick={onClose}>
          <X className="h-6 w-6" />
        </button>
        {/* </div> */}

        <div className="flex flex-col gap-3">
          <p className="text-primary-500 text-center text-lg font-semibold">{`나는 ${character.name}!`}</p>
          <div className="mt-4 flex justify-center">
            <Image src={character.image} alt={character.name} width={140} height={140} />
          </div>
          <div className="flex items-center justify-center gap-3">
            {character.tags.map((tag) => (
              <span key={tag} className="text-sm font-medium text-neutral-700">
                #{tag}
              </span>
            ))}
          </div>
          <p className="text-sm font-medium text-neutral-700">{character.description}</p>
        </div>
      </div>
    </div>
  );
}
